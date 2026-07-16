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
    subtitle: `A planned spaced-repetition deck for ${shortName} candidates — join the waitlist and study the free exam guide meanwhile.`,
    directAnswer:
      explainer?.whatIsExam ??
      `The ${shortName} Anki Deck is a planned UniPrep2Go product. It is not yet available for purchase. Use Notify me when Anki launches on this page, and study the linked readiness-check guide at /mock-exams/${config.slug}.`,
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
        answer: `A free timed readiness check is coming soon at /mock-exams/${config.slug}. Use Notify me when this launches on the mock page.`,
      },
      {
        question: "Is this official exam material?",
        answer: `No. Independent UniPrep2Go study aid — not affiliated with or endorsed by ${config.examBody}.`,
      },
      {
        question: "When will the Anki deck launch?",
        answer:
          "After the free mock waitlist shows traction we build the .apkg. Use Notify me when Anki launches on this page to ping the founder on Telegram.",
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
          `Review the official ${config.examBody} outline and the topic guide on the mock page, then notify for launch updates.`,
      },
    ],
  };
}

export const wave4PlannedDecks: PlannedDeck[] = wave4MockExamConfigs.map(plannedFromMock);
