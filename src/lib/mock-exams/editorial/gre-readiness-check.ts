import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "gre-readiness-check";
const config = requireMockConfig(SLUG);

export const greEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Start with ETS's free POWERPREP practice tests to see the real interface, then use the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start here to find whether Verbal or Quant needs more work. Drill vocabulary and formulas in the [GRE Anki deck](/decks/gre-anki-deck), and practise the Issue essay under a 30-minute timer.`,
  sections: [
    {
      heading: "How is the GRE General Test structured?",
      paragraphs: [
        "Since 22 September 2023, ETS gives the GRE General Test in five sections, with an overall time of about **1 hour 58 minutes**:",
      ],
      bullets: [
        "**Analytical Writing:** one \"Analyze an Issue\" task in **30 minutes**. It always comes first.",
        "**Verbal Reasoning:** two sections, **12 questions in 18 minutes** and **15 questions in 23 minutes**.",
        "**Quantitative Reasoning:** two sections, **12 questions in 21 minutes** and **15 questions in 26 minutes**.",
        "After the essay, the Verbal and Quant sections can come in any order.",
      ],
    },
    {
      heading: "What does section-level adaptation mean for you?",
      paragraphs: [
        "ETS says Verbal and Quant are **section-level adaptive**. The first section of each measure is of average difficulty; the difficulty of the second depends on how you did on the first. Your score takes into account both the number of questions you got right across the two sections and the difficulty of those sections.",
        "Within a section you can skip questions, mark them for review, go back and change answers, and use an on-screen calculator in Quant. Pacing matters: a strong first section earns you a harder second one, which is where higher scores come from.",
      ],
    },
    {
      heading: "What does it cost, and how are scores sent?",
      paragraphs: [
        "From 1 August 2026, ETS lists the test fee as **$249** in all areas except China ($237.86) and India (see ETS India). Rescheduling or changing your test centre costs $55, and each additional score report costs $40. Eligible candidates can apply for a fee reduction voucher, which brings the General Test fee to $100.",
        "With **ScoreSelect**, you choose which scores to send, on test day or whenever you order score reports. You can test at a test centre or at home.",
      ],
    },
    {
      heading: "What this check covers",
      paragraphs: [
        "This check covers the two multiple-choice measures. It does not score the essay and it is not adaptive, so treat it as a knowledge and pacing check, not a score predictor.",
      ],
      bullets: [
        `**${topicLabel(config, "verbal")}:** reading comprehension, text completion and sentence equivalence.`,
        `**${topicLabel(config, "quant")}:** arithmetic, algebra, geometry and data analysis, including quantitative comparison.`,
      ],
    },
    {
      heading: "A 4-week plan",
      paragraphs: [
        `**Week 1:** Take an official POWERPREP test and the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start; list your weakest question types.`,
        "**Week 2:** Verbal: 20 new vocabulary cards a day in the [Anki deck](/decks/gre-anki-deck) and daily reading-comprehension sets. Write one Issue essay in 30 minutes.",
        "**Week 3:** Quant: work by topic, then mixed sets at the real pace, about 1.5 to 1.75 minutes per question.",
        `**Week 4:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws, review every miss, and take a second POWERPREP test. Access: ${mockAccessLine(config)}.`,
      ],
    },
  ],
  faqs: [
    {
      question: "How long is the GRE General Test?",
      answer: `About 1 hour 58 minutes in five sections: one 30-minute Issue essay, two Verbal sections and two Quant sections (ETS, checked ${CHECKED}).`,
    },
    {
      question: "How many questions are in each GRE section?",
      answer:
        "Verbal and Quant each have two sections of 12 and 15 questions. Verbal sections take 18 and 23 minutes; Quant sections take 21 and 26 minutes.",
    },
    {
      question: "Is the GRE adaptive?",
      answer: "Section by section. The second Verbal and Quant sections are easier or harder depending on how you did on the first.",
    },
    {
      question: "How much does the GRE cost?",
      answer: "$249 in most of the world from 1 August 2026 and $237.86 in China; India has its own pricing through ETS India.",
    },
    {
      question: "Can I choose which GRE scores schools see?",
      answer: "Yes. ETS's ScoreSelect option lets you choose which scores to send, on test day or later.",
    },
    {
      question: "How long is the UniPrep2Go GRE practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes across Verbal and Quant; it is not adaptive and does not score the essay. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "ETS — GRE General Test structure",
      url: "https://www.ets.org/gre/test-takers/general-test/prepare/test-structure.html",
      checked: CHECKED,
    },
    {
      label: "ETS — GRE General Test content",
      url: "https://www.ets.org/gre/test-takers/general-test/prepare/content.html",
      checked: CHECKED,
    },
    {
      label: "ETS — GRE fees",
      url: "https://www.ets.org/gre/test-takers/general-test/register/fees.html",
      checked: CHECKED,
    },
    {
      label: "ETS — GRE scores and ScoreSelect",
      url: "https://www.ets.org/gre/test-takers/general-test/scores.html",
      checked: CHECKED,
    },
  ],
};
