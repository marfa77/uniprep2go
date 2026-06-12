import type { CatalogAvailableDeck } from "./decks";
import { positioningOverrides } from "./deck-money-page-content";
import { getDeckLinkedMock } from "./deck-seo";

export type DeckPositioningAlternative = {
  type: string;
  cards: string;
  tradeoffs: string[];
};

export type DeckPositioning = {
  alternatives: [DeckPositioningAlternative, DeckPositioningAlternative];
  ourEdge: string[];
  summaryProse: string;
};

const DEFAULT_COMMUNITY: DeckPositioningAlternative = {
  type: "Free community decks",
  cards: "1,000–3,000",
  tradeoffs: [
    "Unknown accuracy and mixed exam cycles in one download",
    "Card dumps not weighted to official topic tables",
    "No linked practice test to show what to drill next",
  ],
};

const DEFAULT_MEGA: DeckPositioningAlternative = {
  type: "Budget mega-packs",
  cards: "1,000+",
  tradeoffs: [
    "Volume over signal — daily review time balloons",
    "Weak alignment to exam topic weights",
    "No validation gate before cards ship",
  ],
};

function examCycleLabel(deck: CatalogAvailableDeck): string {
  const year = deck.facts.examYear;
  if (/2026/i.test(year)) return "2026";
  if (/current/i.test(year)) return "current";
  return year.replace(/ preparation cycle$/i, "").trim();
}

function contentUnit(deck: CatalogAvailableDeck): string {
  if (deck.format === "PDF") return "pages and practice items";
  if (deck.format === "App") return "study modules";
  return "flashcards";
}

function buildDefaultSummary(deck: CatalogAvailableDeck, cardLabel: string): string {
  const mock = getDeckLinkedMock(deck.slug);
  const mockNote = mock
    ? ` Start with the free ${mock.questionCount}-question ${deck.shortName} practice test, then drill weak rows from the table.`
    : "";

  return `${cardLabel} for ${deck.shortName} matches the ${examCycleLabel(deck)} ${deck.facts.topics.toLowerCase()} in the coverage table — sized for daily review, not maximum download size.${mockNote}`;
}

/** Comparison block for money pages — generic alternative categories only. */
export function buildDeckPositioning(
  deck: CatalogAvailableDeck,
  overrides?: Partial<Pick<DeckPositioning, "ourEdge" | "summaryProse">>,
): DeckPositioning {
  const mock = getDeckLinkedMock(deck.slug);
  const cycle = examCycleLabel(deck);
  const cardLabel = deck.format === "PDF" ? deck.facts.cards : `${deck.facts.cards} cards`;

  const defaultEdge = [
    `Every ${contentUnit(deck).replace(/s$/, "")} checked against a scripted item bank before release`,
    `${cycle} ${deck.shortName} scope only — see the topic table for weights and counts`,
    `Coverage follows ${deck.facts.topics.toLowerCase()}`,
    mock
      ? `Linked free ${deck.shortName} practice test highlights weak topics before you buy`
      : `Sample ${contentUnit(deck)} and topic matrix on this page — verifiable before checkout`,
  ];

  return {
    alternatives: [DEFAULT_COMMUNITY, DEFAULT_MEGA],
    ourEdge: overrides?.ourEdge ?? defaultEdge,
    summaryProse: overrides?.summaryProse ?? buildDefaultSummary(deck, cardLabel),
  };
}

export function getDeckPositioning(deck: CatalogAvailableDeck): DeckPositioning {
  return buildDeckPositioning(deck, positioningOverrides[deck.slug]);
}
