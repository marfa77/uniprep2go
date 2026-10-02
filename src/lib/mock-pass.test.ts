import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./redis", () => ({
  getRedisClient: () => null,
}));

import {
  consumeMockPassAttempt,
  getMockPassState,
  redeemMockPass,
  resetMockPassMemoryForTests,
} from "./mock-pass-store";
import { hashMockPassKey, verifyMockPassLicense } from "./gumroad-mock-pass-license";
import { signMockPassSession, verifyMockPassSession } from "./mock-pass-token";
import {
  MOCK_ACCESS_RULE,
  MOCK_PASS_CHECKOUT_URL,
  decideMockStart,
  isMockPaywallEnabled,
  mockPassAttemptsForQuantity,
} from "./mock-exams/mock-pass";
import { FREE_MOCK_STORAGE_KEY, markFreeAttemptUsed, readFreeAttempt } from "./mock-exams/free-attempt";

describe("mock pass rules", () => {
  afterEach(() => {
    delete process.env.MOCK_PAYWALL;
  });

  it("is on by default and has an env kill switch", () => {
    expect(isMockPaywallEnabled()).toBe(true);
    process.env.MOCK_PAYWALL = "off";
    expect(isMockPaywallEnabled()).toBe(false);
  });

  it("gives one free mock, then needs paid attempts", () => {
    expect(decideMockStart({ paywallEnabled: true, freeAttemptUsed: false, remaining: 0 })).toBe("free");
    expect(decideMockStart({ paywallEnabled: true, freeAttemptUsed: true, remaining: 3 })).toBe("paid");
    expect(decideMockStart({ paywallEnabled: true, freeAttemptUsed: true, remaining: 0 })).toBe("paywall");
    expect(decideMockStart({ paywallEnabled: false, freeAttemptUsed: true, remaining: 0 })).toBe("open");
  });

  it("grants 5 attempts per $5 unit and checks out directly", () => {
    expect(mockPassAttemptsForQuantity(1)).toBe(5);
    expect(mockPassAttemptsForQuantity(2)).toBe(10);
    expect(mockPassAttemptsForQuantity(undefined)).toBe(5);
    expect(MOCK_PASS_CHECKOUT_URL).toContain("wanted=true");
    expect(MOCK_ACCESS_RULE).toMatch(/first UniPrep2Go mock is free/);
    expect(MOCK_ACCESS_RULE).toMatch(/\$5/);
  });
});

describe("free attempt storage", () => {
  it("remembers the first free mock per browser", () => {
    const data = new Map<string, string>();
    const storage = {
      getItem: (key: string) => data.get(key) ?? null,
      setItem: (key: string, value: string) => void data.set(key, value),
    };
    expect(readFreeAttempt(storage)).toBeNull();
    markFreeAttemptUsed(storage, { slug: "series-63-readiness-check", mode: "learn", at: "2026-10-02T00:00:00Z" });
    expect(readFreeAttempt(storage)).toEqual({
      slug: "series-63-readiness-check",
      mode: "learn",
      at: "2026-10-02T00:00:00Z",
    });
    data.set(FREE_MOCK_STORAGE_KEY, "not-json");
    expect(readFreeAttempt(storage)).not.toBeNull();
  });
});

describe("mock pass store (memory)", () => {
  beforeEach(() => {
    resetMockPassMemoryForTests();
  });

  it("grants once and keeps the balance on re-redeem (second device)", async () => {
    const licenseHash = hashMockPassKey("ABCD-1234-EFGH-5678");
    const first = await redeemMockPass({ licenseHash, attempts: 5, email: "a@example.com", saleId: "s1" });
    expect(first).toEqual({ remaining: 5, granted: 5, alreadyRedeemed: false });

    await consumeMockPassAttempt(licenseHash);
    const second = await redeemMockPass({ licenseHash, attempts: 5, email: "a@example.com", saleId: "s1" });
    expect(second.alreadyRedeemed).toBe(true);
    expect(second.remaining).toBe(4);
  });

  it("consumes one attempt per start until empty", async () => {
    const licenseHash = hashMockPassKey("consume-key-0001");
    await redeemMockPass({ licenseHash, attempts: 2, email: null, saleId: null });
    expect(await consumeMockPassAttempt(licenseHash)).toEqual({ ok: true, remaining: 1 });
    expect(await consumeMockPassAttempt(licenseHash)).toEqual({ ok: true, remaining: 0 });
    expect(await consumeMockPassAttempt(licenseHash)).toEqual({ ok: false, reason: "empty" });
    expect(await getMockPassState(licenseHash)).toEqual({ remaining: 0, granted: 2, exists: true });
  });

  it("refuses attempts for keys that were never redeemed", async () => {
    expect(await consumeMockPassAttempt(hashMockPassKey("never-redeemed-key"))).toEqual({
      ok: false,
      reason: "missing",
    });
  });
});

describe("mock pass license", () => {
  afterEach(() => {
    delete process.env.MOCK_PASS_UNLIMITED_KEYS;
    vi.unstubAllGlobals();
  });

  it("has no hardcoded free key", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ success: false, message: "nope" }))),
    );
    const result = await verifyMockPassLicense("FREE");
    expect(result.ok).toBe(false);
  });

  it("honors internal keys only from env", async () => {
    process.env.MOCK_PASS_UNLIMITED_KEYS = "internal-demo-key-xyz";
    const result = await verifyMockPassLicense("internal-demo-key-xyz");
    expect(result.ok && result.unlimited).toBe(true);
  });

  it("rejects refunded purchases and maps quantity to attempts", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ success: true, purchase: { refunded: true } })))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ success: true, purchase: { quantity: 2, email: "b@example.com", sale_id: "s2" } })),
      );
    vi.stubGlobal("fetch", fetchMock);

    expect((await verifyMockPassLicense("refunded-key-1")).ok).toBe(false);
    const ok = await verifyMockPassLicense("paid-key-2");
    expect(ok.ok && ok.attempts).toBe(10);
  });

  it("rejects empty keys", async () => {
    expect((await verifyMockPassLicense("   ")).ok).toBe(false);
  });
});

describe("mock pass session token", () => {
  it("signs and verifies a session bound to the license hash", () => {
    const hash = hashMockPassKey("session-key-0001");
    const token = signMockPassSession(hash);
    expect(token).toBeTruthy();
    expect(verifyMockPassSession(token)).toEqual({ licenseHash: hash });
    expect(verifyMockPassSession("bogus")).toBeNull();
    expect(verifyMockPassSession(`${token}x`)).toBeNull();
  });
});
