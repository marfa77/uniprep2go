import { describe, expect, it } from "vitest";
import { applySoldSamplesToDeck } from "./apply-sold-samples";
import { getDeckBySlug } from "./decks";

describe("applySoldSamplesToDeck", () => {
  it("keeps screenshot-faithful finance questions", () => {
    const cfa = getDeckBySlug("cfa-level-1-anki-deck");
    expect(cfa?.sampleCards.map((card) => card.question)).toEqual([
      "An option-free bond has annual modified duration 7.2 and annual convexity 64. If its yield rises by 100 bps, what is the estimated percentage price change?",
      "A US GAAP firm on LIFO reports inventory of $800k and COGS of $3,000k; its LIFO reserve rose from $150k to $200k as prices rose. What are FIFO inventory and FIFO COGS?",
      "A non-dividend stock trades at $52. A 1-year European call with a $50 strike costs $6.00 and the risk-free rate is 5%. What is the no-arbitrage price of the matching European put?",
    ]);
  });

  it("never overlays sold-sample text on a real card screenshot", () => {
    const sie = getDeckBySlug("sie-exam-anki-deck");
    expect(sie?.sampleCards[0]).toMatchObject({
      question: "How do you find the conversion ratio and parity price of a convertible bond?",
      imageUrl: "/samples/sie-exam-anki-deck-sample-1.webp",
    });
    const nebosh = getDeckBySlug("nebosh-anki-deck");
    expect(nebosh?.sampleCards[0]).toMatchObject({
      question: expect.stringMatching(/^A warehouse operative reports lower back pain/),
      imageUrl: "/samples/nebosh-anki-deck-sample-1.webp",
    });
  });

  it("uses sold samples only over cover images", () => {
    const deck = applySoldSamplesToDeck({
      slug: "sie-exam-anki-deck",
      category: "finance",
      coverImage: "/covers/sie.webp",
      sampleCards: [{ question: "Old", answer: "Old", imageUrl: "/covers/sie.webp" }],
    });
    expect(deck.sampleCards).toHaveLength(3);
    expect(deck.sampleCards.every((card) => card.imageUrl === "/covers/sie.webp")).toBe(true);
    expect(deck.sampleCards[0]?.question).not.toBe("Old");
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
