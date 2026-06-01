import { describe, expect, it } from "vitest";
import { availableDecks } from "./decks";
import {
  PREP2GO_APP_STORE_URL,
  prep2GoAppDecks,
} from "./prep2go-app-decks";

describe("prep2go app decks", () => {
  it("lists survival and citizenship decks from Prep2Go Immigration without language test prep", () => {
    expect(prep2GoAppDecks).toHaveLength(18);

    const slugs = prep2GoAppDecks.map((deck) => deck.slug).sort();
    expect(slugs).toEqual([
      "australia-survival-guide-prep2go-app",
      "australian-citizenship-prep2go-app",
      "canada-survival-guide-prep2go-app",
      "canadian-citizenship-prep2go-app",
      "germany-survival-guide-prep2go-app",
      "japan-survival-guide-prep2go-app",
      "leben-in-deutschland-prep2go-app",
      "life-in-the-uk-prep2go-app",
      "naturalisation-francaise-prep2go-app",
      "netherlands-survival-guide-prep2go-app",
      "portugal-survival-guide-prep2go-app",
      "saudi-arabia-survival-guide-prep2go-app",
      "singapore-survival-guide-prep2go-app",
      "south-africa-survival-guide-prep2go-app",
      "uae-survival-guide-prep2go-app",
      "uk-survival-guide-prep2go-app",
      "us-adaptation-english-prep2go-app",
      "us-citizenship-test-prep2go-app",
    ]);

    for (const deck of prep2GoAppDecks) {
      expect(deck.category).toBe("immigration");
      expect(deck.checkoutProvider).toBe("App Store");
      expect(deck.checkoutUrl).toBe(PREP2GO_APP_STORE_URL);
      expect(deck.format).toBe("App");
      expect(deck.coverImage).toMatch(/^\/covers\/.*\.webp$/);
      expect(deck.slug).not.toMatch(/ciple|dele|delf|goethe|celi|inburgering|norsk|grammar|anki-deck$/i);
      expect(deck.sampleCards).toHaveLength(3);
      expect(deck.sampleCards.every((card) => card.imageUrl.startsWith("/samples/prep2go-immigration/"))).toBe(
        true,
      );
      expect(deck.sampleCards.every((card) => card.question && card.answer.length > 20)).toBe(true);
    }
  });

  it("exposes app decks in the public catalog", () => {
    for (const slug of prep2GoAppDecks.map((deck) => deck.slug)) {
      expect(availableDecks.some((deck) => deck.slug === slug)).toBe(true);
    }
  });
});
