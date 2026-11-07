import { beforeEach, describe, expect, it, vi } from "vitest";

const redis = vi.hoisted(() => ({
  set: vi.fn(),
}));

vi.mock("@/lib/redis", () => ({
  getRedisClient: () => redis,
}));

import { claimFreeAttemptIp } from "./free-attempt-ip-store";
import {
  FREE_ATTEMPT_IP_TTL_SECONDS,
  freeAttemptIpKey,
  interpretFreeStartHttp,
  trustedClientIp,
} from "./free-attempt-ip";

describe("trusted client ip for the free diagnostic", () => {
  it("uses the Vercel address and ignores a spoofed forwarded-for", () => {
    const headers = new Headers({
      "x-forwarded-for": "1.1.1.1",
      "x-vercel-forwarded-for": "203.0.113.10, 198.51.100.1",
    });
    expect(trustedClientIp(headers)).toBe("203.0.113.10");
  });

  it("falls back to x-real-ip when Vercel did not set its own chain", () => {
    const headers = new Headers({
      "x-forwarded-for": "1.1.1.1",
      "x-real-ip": "203.0.113.20",
    });
    expect(trustedClientIp(headers)).toBe("203.0.113.20");
  });

  it("does not trust x-forwarded-for by itself", () => {
    expect(trustedClientIp(new Headers({ "x-forwarded-for": "1.1.1.1" }))).toBeNull();
  });

  it("does not lock loopback", () => {
    expect(trustedClientIp(new Headers({ "x-real-ip": "127.0.0.1" }))).toBeNull();
    expect(trustedClientIp(new Headers({ "x-real-ip": "::1" }))).toBeNull();
  });

  it("folds an ipv4-mapped address onto the same key as the plain address", () => {
    expect(trustedClientIp(new Headers({ "x-real-ip": "::ffff:203.0.113.10" }))).toBe("203.0.113.10");
    expect(freeAttemptIpKey("203.0.113.10")).toBe(
      freeAttemptIpKey(trustedClientIp(new Headers({ "x-real-ip": "::ffff:203.0.113.10" })) ?? ""),
    );
  });
});

describe("free diagnostic ip claim", () => {
  beforeEach(() => {
    redis.set.mockReset();
  });

  it("claims an address once for 24 hours and stores a hash, not the raw ip", async () => {
    redis.set.mockResolvedValueOnce("OK");
    await expect(claimFreeAttemptIp("203.0.113.10")).resolves.toBe("claimed");
    expect(redis.set).toHaveBeenCalledWith(freeAttemptIpKey("203.0.113.10"), "1", {
      nx: true,
      ex: FREE_ATTEMPT_IP_TTL_SECONDS,
    });
    expect(FREE_ATTEMPT_IP_TTL_SECONDS).toBe(60 * 60 * 24);
    expect(freeAttemptIpKey("203.0.113.10")).not.toContain("203.0.113.10");
  });

  it("treats a second claim from the same address as already used", async () => {
    redis.set.mockResolvedValueOnce(null);
    await expect(claimFreeAttemptIp("203.0.113.10")).resolves.toBe("used");
  });

  it("leaves the start open when Redis throws", async () => {
    redis.set.mockRejectedValueOnce(new Error("down"));
    await expect(claimFreeAttemptIp("203.0.113.10")).resolves.toBe("unavailable");
  });
});

describe("free start http", () => {
  it("opens the paywall only when this address already took the diagnostic", () => {
    expect(interpretFreeStartHttp(402, "free_used")).toBe("paywall");
    expect(interpretFreeStartHttp(200, undefined)).toBe("start");
    expect(interpretFreeStartHttp(503, "store")).toBe("start");
  });
});
