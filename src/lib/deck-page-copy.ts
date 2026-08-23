import type { Deck } from "./decks";
import { getDeckSeoProfile } from "./deck-seo";
import { pitchOverrides, longDescriptionOverrides } from "./deck-money-page-content";

/** Hero one-liner — distinct from audience and longDescription. */
export function getDeckShortPitch(deck: Deck): string {
  return pitchOverrides[deck.slug] ?? deck.subtitle;
}

/** Overview block — 2–3 sentences; not repeated elsewhere on the page. */
export function getDeckLongDescription(deck: Deck): string {
  if (longDescriptionOverrides[deck.slug]) {
    return longDescriptionOverrides[deck.slug]!;
  }
  return getDeckSeoProfile(deck).intro;
}

/** Short noun for CTAs and compare tables — PDF guides are not Anki decks. */
export function formatProductNoun(deck: Pick<Deck, "format">): "PDF" | "app" | "deck" {
  if (deck.format === "PDF") return "PDF";
  if (deck.format === "App") return "app";
  return "deck";
}

/** Bullet label for exam-focused content size (fixes "{count}+ of …" grammar). */
export function formatExamFocusedContent(deck: Deck): string {
  const { cards } = deck.facts;

  if (deck.format === "PDF") {
    if (/pages?|questions/i.test(cards)) return cards;
    return `${cards} of printable study material`;
  }

  if (deck.format === "App") {
    return `${cards} study modules`;
  }

  if (/\bflashcards?\b/i.test(cards)) {
    return cards;
  }

  if (/\bcards?\b/i.test(cards)) {
    return cards;
  }

  return `${cards} exam-focused flashcards`;
}
