import type { PlannedDeck, SampleCard } from "./decks";
import { getNicheExamExplainer } from "./mock-exams/niche-exam-explainers";
import { getQuestionBankForExam } from "./mock-exams/question-bank";
import type { MockExamConfig } from "./mock-exams/types";

/** Expand short examBody labels so audience copy is human-readable. */
const EXAM_BODY_EXPANSIONS: Record<string, string> = {
  ACE: "American Council on Exercise (ACE)",
  NASM: "National Academy of Sports Medicine (NASM)",
  ISSA: "International Sports Sciences Association (ISSA)",
  NHA: "National Healthcareer Association (NHA)",
  PTCB: "Pharmacy Technician Certification Board (PTCB)",
  FINRA: "FINRA",
};

export function expandExamBodyLabel(examBody: string): string {
  return EXAM_BODY_EXPANSIONS[examBody] ?? examBody;
}

/** Avoid "ACE ACE CPT" when shortTitle already includes the examBody token. */
export function formatExamPathwayLabel(examBody: string, shortName: string): string {
  const expanded = expandExamBodyLabel(examBody);
  const body = examBody.trim();
  const short = shortName.trim();
  if (!body) return short;

  if (
    short.toUpperCase() === body.toUpperCase() ||
    short.toUpperCase() === expanded.toUpperCase()
  ) {
    return expanded;
  }

  if (short.toUpperCase().startsWith(`${body.toUpperCase()} `)) {
    return `${expanded} ${short.slice(body.length).trim()}`;
  }

  const parenAcronym = expanded.match(/\(([A-Za-z0-9]+)\)\s*$/);
  if (parenAcronym) {
    const acronym = parenAcronym[1];
    if (short.toUpperCase() === acronym.toUpperCase()) {
      return expanded;
    }
    if (short.toUpperCase().startsWith(`${acronym.toUpperCase()} `)) {
      return `${expanded} ${short.slice(acronym.length).trim()}`;
    }
  }

  if (expanded.toUpperCase().includes(short.toUpperCase())) {
    return expanded;
  }

  return `${expanded} ${short}`;
}

function topicWeightLabel(config: MockExamConfig, weightPercent: number | undefined): string {
  const weights = config.topics.map((t) => t.weightPercent ?? 25);
  const allEqual = weights.every((w) => w === weights[0]);
  if (allEqual) {
    return "Diagnostic topic (equal mock share — not official domain weight)";
  }
  return `${weightPercent ?? 25}%`;
}

function sampleCardsFromMockBank(mockSlug: string): SampleCard[] {
  try {
    const { questions, errors } = getQuestionBankForExam(mockSlug);
    if (errors.length || questions.length === 0) return [];
    return questions.slice(0, 3).map((q) => {
      const correct = q.options.find((o) => o.id === q.correctOptionId)?.text ?? "";
      return {
        question: q.prompt,
        answer: correct,
        imageUrl: "",
      };
    });
  } catch {
    return [];
  }
}

type PlannedFromMockOptions = {
  /** Prefer niche explainer prose when present (Wave 4 style). */
  preferExplainer?: boolean;
};

export function plannedDeckFromMock(
  config: MockExamConfig,
  options: PlannedFromMockOptions = {},
): PlannedDeck {
  const deckSlug = config.linkedDeckSlug;
  const shortName = config.shortTitle;
  const explainer = getNicheExamExplainer(config.slug);
  const pathway = formatExamPathwayLabel(config.examBody, shortName);
  const preferExplainer = options.preferExplainer ?? false;

  return {
    slug: deckSlug,
    category: "professional",
    status: "planned",
    coverImage: `/covers/${deckSlug}.webp`,
    title: `${shortName} Anki Deck`,
    shortName,
    subtitle: `A planned spaced-repetition deck for ${shortName} candidates after the free readiness check.`,
    directAnswer: preferExplainer
      ? (explainer?.whatIsExam ??
        `The ${shortName} Anki Deck is a planned UniPrep2Go product. It is not yet available for purchase. Take the free ${shortName} readiness check at /mock-exams/${config.slug} to benchmark weak topics, then request waitlist notification on this page.`)
      : `The ${shortName} Anki Deck is a planned UniPrep2Go product for the ${pathway} pathway. It is not yet available for purchase. Take the free ${config.questionCount}-question ${shortName} readiness check at /mock-exams/${config.slug} to benchmark weak topics, then request waitlist notification on this page.`,
    lastUpdated: "2026-08-13",
    audience:
      (preferExplainer ? explainer?.whoFor : undefined) ??
      `Candidates preparing for the ${pathway} pathway who want spaced repetition after a free timed readiness check.`,
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
      examWeight: topicWeightLabel(config, t.weightPercent),
      cards: "Planned",
    })),
    sampleCards: sampleCardsFromMockBank(config.slug),
    faqs: [
      {
        question: `Is there a free ${shortName} practice test?`,
        answer: `Yes. Take the free ${config.questionCount}-question readiness check at /mock-exams/${config.slug}.`,
      },
      {
        question: "Is this official exam material?",
        answer: `No. Independent UniPrep2Go study aid — not affiliated with or endorsed by ${expandExamBodyLabel(config.examBody)}.`,
      },
      {
        question: "When will the Anki deck launch?",
        answer:
          "After the free mock shows traction we build the .apkg. Use Notify me when Anki launches on this page to ping the founder.",
      },
      ...(preferExplainer && explainer?.howToPrepare
        ? [
            {
              question: "How should I prepare while waiting?",
              answer: explainer.howToPrepare,
            },
          ]
        : []),
    ],
  };
}
