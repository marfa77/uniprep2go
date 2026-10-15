import { getBuildingCompanionDeckSlug } from "./building-cert-clusters";
import { getCatalogDeckBySlug, type CatalogAvailableDeck } from "./decks";
import { getDeckLinkedMock } from "./deck-seo";
import { getMockExamConfig } from "./mock-exams/configs";
import type { MockExamConfig } from "./mock-exams/types";

/** Same-exam practice test when the mock's linkedDeckSlug points at a sibling product. */
const COMPANION_MOCK_BY_DECK: Record<string, string> = {
  "cfa-level-1-formula-reference-2026": "cfa-level-1-readiness-check",
  "cfa-level-2-formula-reference-2026": "cfa-level-2-readiness-check",
  "ptcb-study-guide-2026": "ptcb-pharmacy-technician-mock",
};

/** Cross-sell pair: PDF ↔ Anki, etc. */
const COMPANION_DECK_BY_SLUG: Record<string, string> = {
  "cfa-level-1-formula-reference-2026": "cfa-level-1-anki-deck",
  "cfa-level-1-anki-deck": "cfa-level-1-formula-reference-2026",
  "cfa-level-2-formula-reference-2026": "cfa-level-2-anki-deck",
  "cfa-level-2-anki-deck": "cfa-level-2-formula-reference-2026",
  "ptcb-pharmacy-technician-anki-deck": "ptcb-study-guide-2026",
  "ptcb-study-guide-2026": "ptcb-pharmacy-technician-anki-deck",
};

export function getDeckPracticeMock(deckSlug: string): MockExamConfig | undefined {
  const direct = getDeckLinkedMock(deckSlug);
  if (direct) {
    return direct;
  }

  const companionSlug = COMPANION_MOCK_BY_DECK[deckSlug];
  if (!companionSlug) {
    return undefined;
  }

  return getMockExamConfig(companionSlug);
}

/** Pairs whose Anki deck is authored separately from the PDF (different content, not one bank). */
const SEPARATE_CONTENT_COMPANION: Record<string, string> = {
  "cfa-level-1-anki-deck": "Formula lookup tables to go with these scenario cards",
  "cfa-level-1-formula-reference-2026": "Separate scenario deck weighted to the 2026 topic ranges",
};

export function isSameBankCompanion(deckSlug: string): boolean {
  return deckSlug in COMPANION_DECK_BY_SLUG && !(deckSlug in SEPARATE_CONTENT_COMPANION);
}

export function getCompanionNote(deckSlug: string): string | undefined {
  return SEPARATE_CONTENT_COMPANION[deckSlug];
}

export function getCompanionDeck(deckSlug: string): CatalogAvailableDeck | undefined {
  const companionSlug =
    COMPANION_DECK_BY_SLUG[deckSlug] ?? getBuildingCompanionDeckSlug(deckSlug);
  if (!companionSlug) {
    return undefined;
  }

  return getCatalogDeckBySlug(companionSlug);
}

/** Deck pages with a linked or companion practice test — lead with free mock CTA. */
export function isMockFirstDeckPage(deckSlug: string): boolean {
  return Boolean(getDeckPracticeMock(deckSlug));
}
