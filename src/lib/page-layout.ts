import type { CatalogAvailableDeck, DeckFaq } from "./decks";

/** Primary FAQ count before "More questions" collapse. */
export const VISIBLE_FAQ_COUNT = 3;

export function splitFaqs(faqs: DeckFaq[]) {
  return {
    primary: faqs.slice(0, VISIBLE_FAQ_COUNT),
    extra: faqs.slice(VISIBLE_FAQ_COUNT),
  };
}

/** Companion-mock decks already promote practice in the hero — skip the extra promo block. */
export function shouldShowDeckPracticeMockSection(deckSlug: string, mockFirst: boolean) {
  return mockFirst;
}

export function deckMoreAboutHint(deck: CatalogAvailableDeck) {
  return `Exam format, study tips, and how this ${deck.format === "PDF" ? "PDF" : "deck"} compares`;
}
