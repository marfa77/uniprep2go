import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
  topicQuestions,
} from "./config-copy";

const CHECKED = "23 Nov 2026";
const SLUG = "series-65-readiness-check";
const config = requireMockConfig(SLUG);

export const series65Editorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start to see whether economics, products, client recommendations or law and ethics is weakest. The Series 65 is long, so build stamina with full-length timed runs, and drill rules in the [Series 65 Anki deck](/decks/series-65-anki-deck).`,
  sections: [
    {
      heading: "Series 65 exam facts: length, passing score, fee and corequisites",
      paragraphs: [
        "The Series 65 (Uniform Investment Adviser Law Examination) is a **NASAA exam administered by FINRA**. It tests the knowledge investment adviser representatives need: economics, products, client recommendations, and adviser law and ethics.",
      ],
      bullets: [
        "**Items:** 130 scored multiple-choice questions plus 10 unscored (140 in total).",
        "**Time:** 180 minutes.",
        "**Passing score:** at least **92 of the 130 scored questions** correct.",
        "**Fee:** $187.",
        "**Corequisite:** none. You do not need the SIE or Series 7 first.",
        "**Content outline:** on NASAA's exams page; FINRA's Series 65 page links there.",
      ],
    },
    {
      heading: "Series 65 vs Series 66: which one you need",
      paragraphs: [
        "The **Series 66** (Uniform Combined State Law) is 100 scored plus 10 unscored questions in 150 minutes, passed with 73 of 100, for $177. FINRA lists the **Series 7 as a corequisite** for the Series 66. The Series 65 has no corequisite, so it is the route that does not depend on holding a Series 7. Your firm's registration needs decide which path applies; see the [Series 66 practice test](/mock-exams/series-66-readiness-check) if that is your route.",
      ],
    },
    {
      heading: "How long to wait before retaking the Series 65 (changes 4 Jan 2027)",
      paragraphs: [
        "NASAA sets its own retake rules; FINRA's 15-day change covers FINRA exams only. From **4 Jan 2027**, the wait is **30 days** after the first and second failed attempts (unchanged) and **60 days** (down from 180) after the third. Exam windows opened before 4 Jan 2027 follow the rules in place when they were opened.",
      ],
    },
    {
      heading: "What this Series 65 check covers",
      paragraphs: [
        "The check splits evenly across four areas so you can compare them on one report:",
      ],
      bullets: [
        `**${topicLabel(config, "economics")} (${topicQuestions(config, "economics")}):** economic indicators, financial statements, and quantitative measures like returns and risk.`,
        `**${topicLabel(config, "products")} (${topicQuestions(config, "products")}):** equities, fixed income, funds, options, insurance and alternative investments.`,
        `**${topicLabel(config, "client")} (${topicQuestions(config, "client")}):** client profiles, portfolio construction, suitability and tax considerations.`,
        `**${topicLabel(config, "ethics")} (${topicQuestions(config, "ethics")}):** state and federal adviser regulation, fiduciary duty and prohibited practices.`,
      ],
    },
    {
      heading: "A 4-week Series 65 study plan",
      paragraphs: [
        `**Week 1:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then laws and ethics: who is an investment adviser or IAR, exclusions and exemptions, custody, and unethical practices.`,
        "**Week 2:** Investment products and their risks. For each product, note who it suits and what can go wrong.",
        "**Week 3:** Economics and client recommendations: return measures, bond pricing, asset allocation and tax treatment of accounts. Drill formulas daily in the [Anki deck](/decks/series-65-anki-deck).",
        `**Week 4:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check, review every explanation and retake on a fresh draw. On exam day you have about 77 seconds per question (180 minutes for 140). Access: ${mockAccessLine(config)}. Also registering as an agent? See the [Series 63 practice test](/mock-exams/series-63-readiness-check).`,
      ],
    },
    {
      heading: "What trips Series 65 candidates",
      paragraphs: [],
      bullets: [
        "Treating it as a law-only exam; products, economics and client recommendations carry much of the test.",
        "Mixing up federal (SEC) and state adviser registration thresholds.",
        "Losing focus in the last hour of a three-hour exam.",
        "Applying FINRA's shorter retake waits to a NASAA exam.",
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the Series 65 and what is the passing score?",
      answer:
        "130 scored and 10 unscored questions in 180 minutes. You pass with at least 92 of the 130 scored questions correct (FINRA Series 65 page, checked 23 Nov 2026).",
    },
    {
      question: "How much does the Series 65 cost?",
      answer: "FINRA lists the Series 65 fee as $187.",
    },
    {
      question: "Do I need the Series 7 to take the Series 65?",
      answer:
        "No. The Series 65 has no corequisite. The Series 66 is different: FINRA lists the Series 7 as its corequisite.",
    },
    {
      question: "How long do I wait to retake the Series 65?",
      answer:
        "From 4 Jan 2027: 30 days after the first and second failures and 60 days after the third (previously 180). FINRA's 15-day rule does not apply to NASAA exams.",
    },
    {
      question: "Should I take the Series 65 or the Series 66?",
      answer:
        "If you hold or will take the Series 7, the Series 66 (which needs it) may fit. Without a Series 7, the Series 65 is the route with no corequisite. Your firm decides which registrations you need.",
    },
    {
      question: "How long is the UniPrep2Go Series 65 practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes across four equal topic areas. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "FINRA — Series 65 Uniform Investment Adviser Law Exam",
      url: "https://www.finra.org/registration-exams-ce/qualification-exams/series65",
      checked: CHECKED,
    },
    {
      label: "FINRA — Series 66 Uniform Combined State Law Exam",
      url: "https://www.finra.org/registration-exams-ce/qualification-exams/series66",
      checked: CHECKED,
    },
  ],
};
