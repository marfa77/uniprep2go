import type { PlannedDeck } from "./decks";
import { wave4MockExamConfigs } from "./mock-exams/wave4-configs";
import { getNicheExamExplainer } from "./mock-exams/niche-exam-explainers";

function plannedFromMock(config: (typeof wave4MockExamConfigs)[number]): PlannedDeck {
  const deckSlug = config.linkedDeckSlug;
  const shortName = config.shortTitle;
  const explainer = getNicheExamExplainer(config.slug);
  return {
    slug: deckSlug,
    category: "professional",
    status: "planned",
    coverImage: `/covers/${deckSlug}.webp`,
    title: `${shortName} Anki Deck`,
    shortName,
    subtitle: `A planned spaced-repetition deck for ${shortName} candidates — take the free timed mock now and notify when Anki launches.`,
    directAnswer:
      explainer?.whatIsExam ??
      `The ${shortName} Anki Deck is a planned UniPrep2Go product. It is not yet available for purchase. Take the free timed readiness check at /mock-exams/${config.slug}, then use Notify me when Anki launches.`,
    lastUpdated: "2026-07-16",
    audience:
      explainer?.whoFor ??
      `Candidates preparing for the ${config.examBody} ${shortName} pathway who want spaced repetition after a free timed readiness check.`,
    format: ".apkg",
    facts: {
      cards: "Planned",
      topics: config.topics.map((t) => t.label).join("; "),
      formulas: "Planned high-yield recall cards aligned to the readiness-check topic outline",
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
        answer: `Yes — take the free timed readiness check at /mock-exams/${config.slug} for topic scoring and answer review.`,
      },
      {
        question: "Is this official exam material?",
        answer: `No. Independent UniPrep2Go study aid — not affiliated with or endorsed by ${config.examBody}.`,
      },
      {
        question: "When will the Anki deck launch?",
        answer:
          "The free timed mock is live now. Use Notify me when Anki launches on this page to ping the founder on Telegram when the .apkg ships.",
      },
      {
        question: `Who is the ${shortName} Anki deck for?`,
        answer:
          explainer?.whoFor ??
          `Candidates studying for ${shortName} who want spaced repetition after a diagnostic mock.`,
      },
      {
        question: "How should I prepare while waiting?",
        answer:
          explainer?.howToPrepare ??
          `Take the free timed mock at /mock-exams/${config.slug}, review the official ${config.examBody} outline, and notify for Anki launch updates.`,
      },
    ],
  };
}

export const wave4PlannedDecks: PlannedDeck[] = wave4MockExamConfigs.map(plannedFromMock);
