import { describe, expect, it } from "vitest";
import {
  feederDeckSlugForPassPack,
  passPackOfferForDeck,
} from "./pass-pack-for-deck";

describe("pass-pack-for-deck", () => {
  it("maps CFA L1 Anki deck to Pass Pack offer", () => {
    const offer = passPackOfferForDeck("cfa-level-1-anki-deck");
    expect(offer?.packSlug).toBe("cfa-level-1-pass-pack");
    expect(offer?.savingsNote).toContain("$38");
  });

  it("maps Pass Pack back to feeder Anki deck", () => {
    expect(feederDeckSlugForPassPack("cfa-level-1-pass-pack")).toBe("cfa-level-1-anki-deck");
    expect(feederDeckSlugForPassPack("ptcb-2026-pass-pack")).toBe(
      "ptcb-pharmacy-technician-anki-deck",
    );
  });
});
