import { describe, expect, it } from "vitest";
import { applySoldSamplesToDeck } from "./apply-sold-samples";
import { getDeckBySlug } from "./decks";

describe("applySoldSamplesToDeck", () => {
  it("keeps screenshot-faithful finance questions", () => {
    const cfa = getDeckBySlug("cfa-level-1-anki-deck");
    expect(cfa?.sampleCards.map((card) => card.question)).toEqual([
      "What is a forward contract?",
      "What is the no-arbitrage forward price for an asset with no income?",
      "What is the forward price for an asset that pays income?",
    ]);
  });

  it("replaces weak SIE definition stems", () => {
    const sie = getDeckBySlug("sie-exam-anki-deck");
    expect(sie?.sampleCards.map((card) => card.question)).not.toContain("What is the SEC?");
    expect(sie?.sampleCards[0]?.question.length).toBeGreaterThan(28);
    expect(sie?.sampleCards[0]?.imageUrl).toContain("/samples/sie-exam-anki-deck-sample-1");
  });

  it("does not rewrite language-exam shop samples", () => {
    const deck = applySoldSamplesToDeck({
      slug: "ciple-a2-european-portuguese-anki-deck",
      category: "language",
      sampleCards: [
        { question: "a universidade", answer: "university", imageUrl: "/shop-preview-media/x.webp" },
        { question: "o escritório", answer: "office", imageUrl: "/shop-preview-media/y.webp" },
        { question: "o mercado", answer: "market", imageUrl: "/shop-preview-media/z.webp" },
      ],
    });
    expect(deck.sampleCards.map((card) => card.question)).toEqual([
      "a universidade",
      "o escritório",
      "o mercado",
    ]);
  });
});
