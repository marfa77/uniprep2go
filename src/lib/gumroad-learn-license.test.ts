import { describe, expect, it } from "vitest";
import { isFreeLearnLicenseKey, verifyGumroadLearnLicense } from "./gumroad-learn-license";

describe("gumroad learn license", () => {
  it("recognizes FREE demo keys", () => {
    expect(isFreeLearnLicenseKey("FREE")).toBe(true);
    expect(isFreeLearnLicenseKey("free")).toBe(true);
    expect(isFreeLearnLicenseKey("paid-key")).toBe(false);
  });

  it("verifies FREE key without Gumroad product id", async () => {
    const result = await verifyGumroadLearnLicense("FREE");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.initialCredits).toBeGreaterThan(1);
      expect(result.test).toBe(true);
    }
  });

  it("rejects empty keys", async () => {
    const result = await verifyGumroadLearnLicense("   ");
    expect(result.ok).toBe(false);
  });
});
