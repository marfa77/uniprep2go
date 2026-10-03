import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { civicSoldDecks } from "./civic-sold-decks";

describe("civicSoldDecks samples", () => {
  it("show real card screenshots, not the cover", () => {
    for (const deck of civicSoldDecks) {
      expect(deck.sampleCards, deck.slug).toHaveLength(3);
      deck.sampleCards.forEach((card, index) => {
        expect(card.imageUrl, deck.slug).toBe(`/samples/${deck.slug}-sample-${index + 1}.webp`);
        expect(existsSync(join(process.cwd(), "public", card.imageUrl)), card.imageUrl).toBe(true);
      });
    }
  });

  it("uses the US citizenship card text from the screenshot", () => {
    const us = civicSoldDecks.find((deck) => deck.slug === "us-citizenship-anki-deck");
    expect(us?.sampleCards[0]?.question).toBe("Why does each state have two senators?");
  });
});
