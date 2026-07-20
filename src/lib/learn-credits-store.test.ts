import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./redis", () => ({
  getRedisClient: () => null,
}));

import {
  consumeLearnCredit,
  hashLearnLicenseKey,
  redeemLearnLicense,
  resetLearnCreditsMemoryForTests,
} from "./learn-credits-store";
import { signLearnSession, verifyLearnSession } from "./learn-access-token";

describe("learn credits store (memory)", () => {
  beforeEach(() => {
    resetLearnCreditsMemoryForTests();
  });

  it("grants credits once and does not double-grant on re-redeem", async () => {
    const licenseHash = hashLearnLicenseKey("test-key-abc");
    const first = await redeemLearnLicense({
      licenseHash,
      purchaserEmail: "a@example.com",
      gumroadSaleId: "sale_1",
      initialCredits: 3,
    });
    expect(first.alreadyRedeemed).toBe(false);
    expect(first.remaining).toBe(3);

    const second = await redeemLearnLicense({
      licenseHash,
      purchaserEmail: "a@example.com",
      gumroadSaleId: "sale_1",
      initialCredits: 3,
    });
    expect(second.alreadyRedeemed).toBe(true);
    expect(second.remaining).toBe(3);
  });

  it("consumes one credit per Learn start until empty", async () => {
    const licenseHash = hashLearnLicenseKey("consume-key");
    await redeemLearnLicense({
      licenseHash,
      purchaserEmail: null,
      gumroadSaleId: null,
      initialCredits: 2,
    });

    const one = await consumeLearnCredit(licenseHash);
    expect(one).toEqual({ ok: true, remaining: 1 });
    const two = await consumeLearnCredit(licenseHash);
    expect(two).toEqual({ ok: true, remaining: 0 });
    const three = await consumeLearnCredit(licenseHash);
    expect(three).toEqual({ ok: false, reason: "empty" });
  });

  it("does not re-grant after credits are exhausted", async () => {
    const licenseHash = hashLearnLicenseKey("spent-key");
    await redeemLearnLicense({
      licenseHash,
      purchaserEmail: null,
      gumroadSaleId: null,
      initialCredits: 1,
    });
    await consumeLearnCredit(licenseHash);

    const again = await redeemLearnLicense({
      licenseHash,
      purchaserEmail: null,
      gumroadSaleId: null,
      initialCredits: 5,
    });
    expect(again.alreadyRedeemed).toBe(true);
    expect(again.remaining).toBe(0);
  });
});

describe("learn access token", () => {
  it("signs and verifies a session bound to license hash", () => {
    const hash = hashLearnLicenseKey("session-key");
    const token = signLearnSession(hash);
    expect(token).toBeTruthy();
    expect(verifyLearnSession(token)).toEqual({ licenseHash: hash });
    expect(verifyLearnSession("bogus")).toBeNull();
  });
});
