import type { PlannedDeck } from "./decks";

type PlannedCivicsSpec = {
  slug: string;
  shortName: string;
  title: string;
  subtitle: string;
  audience: string;
  examLabel: string;
  mockSlug: string;
  topics: string[];
  searchNote: string;
};

function plannedCivicsDeck(spec: PlannedCivicsSpec): PlannedDeck {
  return {
    slug: spec.slug,
    category: "language",
    status: "planned",
    title: spec.title,
    shortName: spec.shortName,
    subtitle: spec.subtitle,
    directAnswer: `The ${spec.shortName} Anki Deck is a planned UniPrep2Go product. It is not yet available for purchase. Take the free ${spec.shortName} readiness check to benchmark weak topics, then request waitlist notification on this page.`,
    lastUpdated: "2026-07-26",
    audience: spec.audience,
    format: ".apkg",
    coverImage: `/covers/${spec.slug}.webp`,
    facts: {
      cards: "Planned",
      topics: spec.topics.join("; "),
      formulas: "Planned high-yield recall cards from the readiness-check bank",
      examYear: "Current naturalisation / citizenship cycles",
      delivery: "Not currently for sale — waitlist notify",
    },
    topicCoverage: spec.topics.map((name) => ({
      name,
      examWeight: "25%",
      cards: "Planned",
    })),
    sampleCards: [],
    faqs: [
      {
        question: "Is this deck available for purchase?",
        answer: "No. Use Notify me when Anki launches on this page.",
      },
      {
        question: `Is there a free ${spec.shortName} practice test?`,
        answer: `Yes. Take the 60-question readiness check (free 25-question version) at /mock-exams/${spec.mockSlug}.`,
      },
      {
        question: "Is this official government exam material?",
        answer: `No. Independent UniPrep2Go study aid — not affiliated with or endorsed by ${spec.examLabel}. ${spec.searchNote}`,
      },
    ],
  };
}

/**
 * Waitlist templates that the wave launcher flips to available.
 * Live $9.99 civic SKUs live in civic-sold-decks.ts — do not duplicate them here.
 */
export const citizenshipPlannedDecks: PlannedDeck[] = [
  plannedCivicsDeck({
    slug: "belgium-flanders-mo-anki-deck",
    shortName: "Belgium Flanders MO",
    title: "Belgium Flanders MO Anki Deck — Maatschappelijke Oriëntatie",
    subtitle: "Anki deck for Flanders maatschappelijke oriëntatie (165 Dutch civics cards).",
    audience: "Applicants preparing Flanders maatschappelijke oriëntatie / integration civics.",
    examLabel: "Flemish integration / citizenship authorities",
    mockSlug: "belgium-flanders-mo-readiness-check",
    topics: [
      "Institutions & orientation",
      "History, geography & EU",
      "Rights & nationality",
      "Society & daily life",
    ],
    searchNote: "Pair with official Flanders MO materials.",
  }),
  plannedCivicsDeck({
    slug: "luxembourg-vivre-ensemble-anki-deck",
    shortName: "Luxembourg Vivre ensemble",
    title: "Luxembourg Vivre ensemble Anki Deck — Citizenship Civics",
    subtitle:
      "Anki deck for Luxembourg Vivre ensemble civics — 239 French + 239 English cards in subdecks for the 3 official exam modules.",
    audience: "Applicants preparing Luxembourg Vivre ensemble / nationality civics.",
    examLabel: "Luxembourg nationality / Vivre ensemble authorities",
    mockSlug: "luxembourg-vivre-ensemble-readiness-check",
    topics: [
      "Institutions & vivre ensemble",
      "History, geography & EU",
      "Rights & nationality",
      "Society & daily life",
    ],
    searchNote: "Pair with official Vivre ensemble materials.",
  }),
];
