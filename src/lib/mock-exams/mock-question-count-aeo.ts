import { getExamFactsProfileForDeck } from "../exam-facts";
import type { MockExamConfig } from "./types";
import { getNicheExamExplainer } from "./niche-exam-explainers";

export type MockQuestionCountAeo = {
  h2: string;
  faq: { question: string; answer: string };
};

const QUESTION_COUNT_MOCK_SLUGS = [
  "abo-optician-readiness-check",
  "nbrc-tmc-readiness-check",
  "ardms-spi-readiness-check",
  "medical-scribe-readiness-check",
] as const;

function answerFromExamFacts(deckSlug: string): string | null {
  const profile = getExamFactsProfileForDeck(deckSlug);
  if (!profile) return null;
  const qa = profile.candidate_qa.find((item) =>
    /how many questions/i.test(item.q),
  );
  if (qa) return qa.a;
  const f = profile.exam_facts;
  if (f.question_count && f.time_limit) {
    return `Official form: ${f.question_count}; time ${f.time_limit}. Confirm at the official source before you schedule.`;
  }
  return null;
}

const overrides: Partial<Record<(typeof QUESTION_COUNT_MOCK_SLUGS)[number], MockQuestionCountAeo>> = {
  "nbrc-tmc-readiness-check": {
    h2: "NBRC TMC practice test",
    faq: {
      question: "How many questions are on the NBRC TMC exam?",
      answer:
        "The Therapist Multiple-Choice (TMC) Examination has 160 multiple-choice items (140 scored, 20 pretest) in 3 hours, per NBRC’s published exam description in repo exam explainers. UniPrep2Go’s check is a shorter 60-question diagnostic from a 120-question bank.",
    },
  },
};

export function getMockQuestionCountAeo(config: MockExamConfig): MockQuestionCountAeo | null {
  if (!QUESTION_COUNT_MOCK_SLUGS.includes(config.slug as (typeof QUESTION_COUNT_MOCK_SLUGS)[number])) {
    return null;
  }
  const override = overrides[config.slug as (typeof QUESTION_COUNT_MOCK_SLUGS)[number]];
  if (override) return override;

  const niche = getNicheExamExplainer(config.slug);
  const practiceLabel =
    niche?.practiceTestName?.replace(/^Free\s+/i, "") ?? `${config.shortTitle} Practice Test`;
  const examName = practiceLabel.replace(/ practice test$/i, "");
  const h2 = `${examName} practice test`;
  const answer =
    answerFromExamFacts(config.linkedDeckSlug) ??
    niche?.examFaqs?.find((item) => /how many questions/i.test(item.question))?.answer;

  if (!answer) return null;
  return {
    h2,
    faq: {
      question: `How many questions are on the ${examName}?`,
      answer,
    },
  };
}

export function questionCountFaqForSchema(config: MockExamConfig) {
  return getMockQuestionCountAeo(config)?.faq ?? null;
}