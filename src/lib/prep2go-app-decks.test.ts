import { describe, expect, it } from "vitest";
import { availableDecks, getCatalogDeckBySlug, getDeckBySlug } from "./decks";
import {
  PREP2GO_APP_STORE_URL,
  prep2GoAppDecks,
  prep2GoCitizenshipAppDecks,
} from "./prep2go-app-decks";

const CITIZENSHIP_APP_SLUGS = [
  "australian-citizenship-prep2go-app",
  "canadian-citizenship-prep2go-app",
  "leben-in-deutschland-prep2go-app",
  "life-in-the-uk-prep2go-app",
  "naturalisation-francaise-prep2go-app",
  "us-citizenship-test-prep2go-app",
] as const;

describe("prep2go app decks", () => {
  it("lists only survival decks as available App Store products", () => {
    expect(prep2GoAppDecks).toHaveLength(12);

    const slugs = prep2GoAppDecks.map((deck) => deck.slug).sort();
    expect(slugs).toEqual([
      "australia-survival-guide-prep2go-app",
      "canada-survival-guide-prep2go-app",
      "germany-survival-guide-prep2go-app",
      "japan-survival-guide-prep2go-app",
      "netherlands-survival-guide-prep2go-app",
      "portugal-survival-guide-prep2go-app",
      "saudi-arabia-survival-guide-prep2go-app",
      "singapore-survival-guide-prep2go-app",
      "south-africa-survival-guide-prep2go-app",
      "uae-survival-guide-prep2go-app",
      "uk-survival-guide-prep2go-app",
      "us-adaptation-english-prep2go-app",
    ]);

    for (const deck of prep2GoAppDecks) {
      expect(deck.category).toBe("immigration");
      expect(deck.status).toBe("available");
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

  it("keeps citizenship App Store decks planned and out of the public catalog", () => {
    expect(prep2GoCitizenshipAppDecks).toHaveLength(6);
    expect(prep2GoCitizenshipAppDecks.map((deck) => deck.slug).sort()).toEqual([...CITIZENSHIP_APP_SLUGS]);

    for (const slug of CITIZENSHIP_APP_SLUGS) {
      expect(getDeckBySlug(slug)?.status).toBe("planned");
      expect(getCatalogDeckBySlug(slug)).toBeUndefined();
      expect(availableDecks.some((deck) => deck.slug === slug)).toBe(false);
    }
  });

  it("exposes survival app decks in the public catalog", () => {
    for (const slug of prep2GoAppDecks.map((deck) => deck.slug)) {
      expect(availableDecks.some((deck) => deck.slug === slug)).toBe(true);
    }
  });
});
