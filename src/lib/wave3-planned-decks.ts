import type { PlannedDeck } from "./decks";
import { wave3MockExamConfigs } from "./mock-exams/wave3-configs";

function plannedFromMock(config: (typeof wave3MockExamConfigs)[number]): PlannedDeck {
  const deckSlug = config.linkedDeckSlug;
  const shortName = config.shortTitle;
  return {
    slug: deckSlug,
    category: "professional",
    status: "planned",
    coverImage: `/covers/${deckSlug}.webp`,
    title: `${shortName} Anki Deck`,
    shortName,
    subtitle: `A planned spaced-repetition deck for ${shortName} candidates after the free readiness check.`,
    directAnswer: `The ${shortName} Anki Deck is a planned UniPrep2Go product. It is not yet available for purchase. Take the free ${shortName} readiness check to benchmark weak topics, then request waitlist notification on this page.`,
    lastUpdated: "2026-07-16",
    audience: `Candidates preparing for the ${config.examBody} ${shortName} pathway who want spaced repetition after a free timed readiness check.`,
    format: ".apkg",
    facts: {
      cards: "Planned",
      topics: config.topics.map((t) => t.label).join("; "),
      formulas: "Planned high-yield recall cards from the readiness-check bank",
      examYear: "Current exam cycle",
      delivery: "Digital download (planned)",
    },
    topicCoverage: config.topics.map((t) => ({
      name: t.label,
      examWeight: `${t.weightPercent ?? 25}%`,
      cards: "Planned",
    })),
    sampleCards: [],
    faqs: [
      {
        question: `Is there a free ${shortName} practice test?`,
        answer: `Yes. Take the free ${config.questionCount}-question readiness check at /mock-exams/${config.slug}.`,
      },
      {
        question: "Is this official exam material?",
        answer: `No. Independent UniPrep2Go study aid — not affiliated with or endorsed by ${config.examBody}.`,
      },
      {
        question: "When will the Anki deck launch?",
        answer:
          "After the free mock shows traction we build the .apkg. Use Notify me when Anki launches on this page to ping the founder.",
      },
    ],
  };
}

export const wave3PlannedDecks: PlannedDeck[] = wave3MockExamConfigs.map(plannedFromMock);
