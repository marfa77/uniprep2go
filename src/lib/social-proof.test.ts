import { describe, expect, it } from "vitest";
import {
  formatCompactDeckPurchases,
  formatCompactMockStarts,
  socialProofFloor,
  socialProofTier,
  withSocialProofFloor,
} from "./social-proof";
import { publicMockStartCount } from "./mock-exams/mock-start-count";
import { publicDeckPurchaseCount } from "./deck-purchase-count";

describe("social-proof floors", () => {
  it("tiers flagship money above thin state RE", () => {
    expect(socialProofTier("ptcb-pharmacy-technician-mock")).toBe("S");
    expect(socialProofTier("series-63-anki-deck")).toBe("S");
    expect(socialProofTier("ardms-spi-anki-deck")).toBe("B");
    expect(socialProofTier("wyoming-real-estate-anki-deck")).toBe("C");
  });

  it("gives deterministic varied floors in-range", () => {
    const a = socialProofFloor("mockStarts", "ptcb-pharmacy-technician-mock");
    const b = socialProofFloor("mockStarts", "ptcb-pharmacy-technician-mock");
    expect(a).toBe(b);
    expect(a).toBeGreaterThanOrEqual(260);
    expect(a).toBeLessThanOrEqual(480);

    const weak = socialProofFloor("mockStarts", "wyoming-real-estate-readiness-check");
    expect(weak).toBeGreaterThanOrEqual(14);
    expect(weak).toBeLessThanOrEqual(36);
    expect(a).toBeGreaterThan(weak);
  });

  it("lets real counts beat the floor", () => {
    const floor = socialProofFloor("deckPurchases", "ardms-spi-anki-deck");
    expect(withSocialProofFloor("deckPurchases", "ardms-spi-anki-deck", floor + 40)).toBe(
      floor + 40,
    );
    expect(withSocialProofFloor("deckPurchases", "ardms-spi-anki-deck", 1)).toBe(floor);
  });

  it("publishes mock/deck counts from floors when redis/sales are empty", () => {
    expect(publicMockStartCount(0, "sie-full-mock")).toBeGreaterThanOrEqual(260);
    expect(publicDeckPurchaseCount("medical-scribe-anki-deck")).toBeGreaterThanOrEqual(22);
    expect(publicDeckPurchaseCount("ardms-spi-anki-deck")).toBeGreaterThanOrEqual(9);
  });

  it("formats compact homepage tile labels", () => {
    expect(formatCompactMockStarts(337)).toBe("337 started");
    expect(formatCompactDeckPurchases(85)).toBe("85 purchased");
  });
});
