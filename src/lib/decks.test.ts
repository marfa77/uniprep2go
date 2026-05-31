import { describe, expect, it } from "vitest";
import { getDeckBySlug, primaryDeck } from "./decks";

describe("deck catalog", () => {
  it("exposes the CFA Level 1 Anki deck as reusable product data", () => {
    expect(primaryDeck.slug).toBe("cfa-level-1-anki-deck");
    expect(primaryDeck.checkoutUrl).toBe("https://pixidstudio.gumroad.com/l/ivjmuu");
    expect(primaryDeck.checkoutProvider).toBe("Gumroad");
    expect(primaryDeck.checkoutSeller).toBe("PixID Studio");
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

  it("uses Lemon Squeezy as the primary checkout for language decks", () => {
    const cipleDeck = getDeckBySlug("ciple-a2-european-portuguese-anki-deck");

    expect(cipleDeck?.status).toBe("available");
    expect(cipleDeck).toMatchObject({
      checkoutProvider: "Lemon Squeezy",
      checkoutSeller: "Prep2Go",
      checkoutUrl:
        "https://ciple-a2.lemonsqueezy.com/checkout/buy/6f688637-f5ce-440f-8d2a-7614379ee3ca",
      price: { amount: 24.99, currency: "USD" },
    });
  });

  it("includes the FRM Part 1 deck with three Gumroad preview cards", () => {
    const frmDeck = getDeckBySlug("frm-part-1-anki-deck");

    expect(frmDeck?.status).toBe("available");
    expect(frmDeck).toMatchObject({
      category: "finance",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/eeyvu",
      checkoutProvider: "Gumroad",
      checkoutSeller: "PixID Studio",
      price: { amount: 11, currency: "USD" },
    });
    expect(frmDeck?.facts.cards).toBe("444");
    expect(frmDeck?.sampleCards).toHaveLength(3);
    expect(frmDeck?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/frm-part-1-anki-deck-sample-1.png",
      "/samples/frm-part-1-anki-deck-sample-2.png",
      "/samples/frm-part-1-anki-deck-sample-3.png",
    ]);
  });
});
