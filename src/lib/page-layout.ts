import type { Deck, DeckFaq } from "./decks";
import { getDeckPracticeMock } from "./deck-funnel";

/** Primary FAQ count before "More questions" collapse. */
export const VISIBLE_FAQ_COUNT = 3;

/** Show more primary FAQs when the deck has an exam-facts Q&A layer (PAA / AEO). */
export const VISIBLE_FAQ_COUNT_WITH_EXAM = 6;

export function splitFaqs(faqs: DeckFaq[], visibleCount = VISIBLE_FAQ_COUNT) {
  return {
    primary: faqs.slice(0, visibleCount),
    extra: faqs.slice(visibleCount),
  };
}

/** Show the practice-mock promo whenever a linked or companion mock exists. */
export function shouldShowDeckPracticeMockSection(deckSlug: string) {
  return Boolean(getDeckPracticeMock(deckSlug));
}

export function deckMoreAboutHint(deck: Deck) {
  return `Study tips, positioning, and how this ${deck.format === "PDF" ? "PDF" : "deck"} compares`;
}
