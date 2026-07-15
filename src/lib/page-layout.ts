import type { CatalogAvailableDeck, DeckFaq } from "./decks";
import { getDeckPracticeMock } from "./deck-funnel";

/** Primary FAQ count before "More questions" collapse. */
export const VISIBLE_FAQ_COUNT = 3;

export function splitFaqs(faqs: DeckFaq[]) {
  return {
    primary: faqs.slice(0, VISIBLE_FAQ_COUNT),
    extra: faqs.slice(VISIBLE_FAQ_COUNT),
  };
}

/** Show the practice-mock promo whenever a linked or companion mock exists. */
export function shouldShowDeckPracticeMockSection(deckSlug: string) {
  return Boolean(getDeckPracticeMock(deckSlug));
}

export function deckMoreAboutHint(deck: CatalogAvailableDeck) {
  return `Exam format, study tips, and how this ${deck.format === "PDF" ? "PDF" : "deck"} compares`;
}
