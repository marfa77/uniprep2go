import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
} from "./config-copy";

const CHECKED = "23 Nov 2026";
const SLUG = "cfp-certification-readiness-check";
const config = requireMockConfig(SLUG);
const perTopic = config.topics.map((t) => `${t.label} (${t.questionCount ?? 0})`).join(", ");

export const cfpEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Register early: CFP Board offers three testing windows a year and recommends booking 60 days or more ahead. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then weight your study to the Principal Knowledge Topics. Retirement, investments and general principles together are half the exam. Drill rules and limits in the [CFP Anki deck](/decks/cfp-certification-anki-deck).`,
  sections: [
    {
      heading: "CFP exam facts: format, scoring and who can sit",
      paragraphs: ["CFP Board sets and administers the CFP® certification exam."],
      bullets: [
        "**Format:** **170 multiple-choice questions** in **two 3-hour sections** of 85 questions each, with a 40-minute break between sections and optional shorter breaks inside them.",
        "**Question types:** stand-alone questions with four options, scenarios with typically three questions, and case studies with typically 8–12 questions.",
        "**Scoring:** pass or fail on your total score across all sections, one point per question. CFP Board does not publish a fixed percentage needed to pass; the standard is set by CFP® professionals.",
        "**Results:** preliminary result right after the exam; official result by email about 4 weeks after the window closes. Candidates who fail get a diagnostic report by topic.",
        "**Where:** at Prometric test centers (more than 265 nationwide).",
        "**Eligibility:** finish CFP Board's coursework requirement, verified by the Education Verification Deadline. The bachelor's degree can be completed within 5 years after passing.",
        "**Attempts:** a lifetime limit of 5. After 3 failures within 24 months you wait 3 exam cycles (1 full year) before a fourth attempt.",
      ],
    },
    {
      heading: "CFP exam dates and fees in 2027",
      bullets: [
        "**March 2027:** window 16–23 Mar 2027; education verification deadline 23 Feb 2027. Fees: early bird $825 (to 19 Jan 2027), standard $925 (20 Jan–23 Feb 2027), late $1,025 (24 Feb–2 Mar 2027).",
        "**July 2027:** window 13–20 Jul 2027; registration opens 17 Feb 2027; education verification deadline 22 Jun 2027.",
        "**October/November 2027:** window 25 Oct–1 Nov 2027; registration opens 2 Jun 2027; education verification deadline 5 Oct 2027.",
        "Missing the verification deadline withdraws your registration with a **$500 postponement fee**. Registration includes CFP Board's 170-question practice exam.",
      ],
      paragraphs: [],
    },
    {
      heading: "What the CFP exam covers",
      paragraphs: ["Each question links to at least one Principal Knowledge Topic. Approximate coverage:"],
      bullets: [
        "Retirement Savings and Income Planning **18%**; Investment Planning **17%**; General Principles of Financial Planning **15%**; Tax Planning **14%**.",
        "Risk Management and Insurance Planning **11%**; Estate Planning **10%**; Professional Conduct and Regulation **8%**; Psychology of Financial Planning **7%**.",
        `This check groups items into four areas: ${perTopic}.`,
      ],
    },
    {
      heading: "A 4-week CFP review plan on the topic weights",
      paragraphs: [
        `**Week 1:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then retirement planning (18%): plan types, contribution and distribution rules, and Social Security.`,
        "**Week 2:** Investment planning and general principles: risk and return measures, asset allocation, time value of money and the financial planning process.",
        "**Week 3:** Tax, insurance and estate planning, plus professional conduct and the psychology of financial planning. Drill limits and rules in the [Anki deck](/decks/cfp-certification-anki-deck).",
        `**Week 4:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check, review every explanation, then CFP Board's included practice exam under exam timing. Access: ${mockAccessLine(config)}. Also considering tax representation? See the [Enrolled Agent practice test](/mock-exams/enrolled-agent-readiness-check).`,
      ],
    },
    {
      heading: "What trips CFP candidates",
      paragraphs: [],
      bullets: [
        "Studying topics evenly instead of weighting retirement, investments and general principles.",
        "Running out of energy in case studies late in a six-hour exam day.",
        "Registering before coursework is done and missing the education verification deadline.",
        "Answering a scenario from product knowledge alone when the question asks for the client's best interest as a fiduciary.",
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the CFP exam?",
      answer:
        "170 multiple-choice questions in two 3-hour sections of 85 questions each, with a 40-minute break between them (CFP Board, checked 23 Nov 2026).",
    },
    {
      question: "When are the 2027 CFP exam dates?",
      answer: "16–23 March 2027, 13–20 July 2027 and 25 October–1 November 2027.",
    },
    {
      question: "How much does the March 2027 CFP exam cost?",
      answer: "$825 early bird until 19 Jan 2027, $925 standard and $1,025 late registration (CFP Board).",
    },
    {
      question: "What score do I need to pass the CFP exam?",
      answer:
        "CFP Board does not publish a fixed percentage. The exam is pass/fail on your total score against a standard set by CFP® professionals.",
    },
    {
      question: "How many times can I take the CFP exam?",
      answer:
        "Five times in your lifetime. If you fail three times within 24 months, you wait one full year (three exam cycles) before a fourth attempt.",
    },
    {
      question: "How long is the UniPrep2Go CFP practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes across four topic areas. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "CFP Board — exam format",
      url: "https://www.cfp.net/certification-process/exam-requirement/about-the-cfp-exam/exam-format",
      checked: CHECKED,
    },
    {
      label: "CFP Board — what you'll be tested on",
      url: "https://www.cfp.net/certification-process/exam-requirement/about-the-cfp-exam/what-youll-be-tested-on",
      checked: CHECKED,
    },
    {
      label: "CFP Board — upcoming exam dates and registration",
      url: "https://www.cfp.net/certification-process/exam-requirement/registration/upcoming-exam-dates-and-registration-process",
      checked: CHECKED,
    },
    {
      label: "CFP Board — exam eligibility and attempt limits",
      url: "https://www.cfp.net/certification-process/exam-requirement/registration/eligibility",
      checked: CHECKED,
    },
    {
      label: "CFP Board — scoring and results",
      url: "https://www.cfp.net/certification-process/exam-requirement/about-the-cfp-exam/scoring-and-results",
      checked: CHECKED,
    },
  ],
};
