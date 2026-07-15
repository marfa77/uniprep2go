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

export function getCompanionDeck(deckSlug: string): CatalogAvailableDeck | undefined {
  const companionSlug =
    COMPANION_DECK_BY_SLUG[deckSlug] ?? getBuildingCompanionDeckSlug(deckSlug);
  if (!companionSlug) {
    return undefined;
  }

  return getCatalogDeckBySlug(companionSlug);
}

/** PDF / guide pages without a direct mock link — lead with free practice test. */
export function isMockFirstDeckPage(deckSlug: string): boolean {
  return Boolean(getDeckPracticeMock(deckSlug) && !getDeckLinkedMock(deckSlug));
}
