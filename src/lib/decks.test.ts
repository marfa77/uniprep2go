import { describe, expect, it } from "vitest";
import { getDeckBySlug, primaryDeck } from "./decks";

describe("deck catalog", () => {
  it("exposes the CFA Level 1 Anki deck as reusable product data", () => {
    expect(primaryDeck.slug).toBe("cfa-level-1-anki-deck");
    expect(primaryDeck.checkoutUrl).toBe("https://pixidstudio.gumroad.com/l/ivjmuu");
    expect(primaryDeck.price).toEqual({ amount: 11, currency: "USD" });
    expect(primaryDeck.facts.cards).toBe("342+");
    expect(primaryDeck.format).toBe(".apkg");
    expect(primaryDeck.topicCoverage).toHaveLength(10);
    expect(primaryDeck.sampleCards).toHaveLength(3);
    expect(primaryDeck.sampleCards[0]?.imageUrl).toContain("/samples/");
    expect(primaryDeck.faqs.length).toBeGreaterThanOrEqual(5);
  });

  it("can resolve future product pages by slug", () => {
    expect(getDeckBySlug("cfa-level-1-anki-deck")).toBe(primaryDeck);
    expect(getDeckBySlug("missing-deck")).toBeUndefined();
  });
});
