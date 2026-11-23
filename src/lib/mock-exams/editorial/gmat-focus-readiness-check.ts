import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicQuestions,
} from "./config-copy";

const CHECKED = "23 Nov 2026";
const SLUG = "gmat-focus-readiness-check";
const config = requireMockConfig(SLUG);
const quant = topicQuestions(config, "quant");
const verbal = topicQuestions(config, "verbal");
const di = topicQuestions(config, "data-insights");

export const gmatFocusEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start to see which of the three GMAT sections is weakest, then study by question type rather than by topic list. Drill rules and Critical Reasoning patterns in the [GMAT Anki deck](/decks/gmat-focus-anki-deck), and finish with GMAC's free full-length practice exams for adaptive timing.`,
  sections: [
    {
      heading: "GMAT exam facts: sections, timing and scoring",
      paragraphs: [
        "GMAC (Graduate Management Admission Council) owns the GMAT. The current exam replaced the 10th Edition on 1 February 2024.",
      ],
      bullets: [
        "**Length:** 64 questions in **2 hours 15 minutes**, plus one optional 10-minute break.",
        "**Sections:** Quantitative Reasoning (21 questions, 45 minutes), Verbal Reasoning (23 questions, 45 minutes) and Data Insights (20 questions, 45 minutes).",
        "**Section order:** you choose the order of all three sections, and take the break after the first or second section.",
        "**Question Review & Edit:** bookmark questions as you go; after answering every question in a section you can review any of them and change up to three answers. If time runs out first, you skip the review screen.",
        "**Score:** total scale **205–805**; the three section scores count equally. Scores are valid for **five years**.",
        "**Delivery:** online or at a test center.",
        "**Results:** the Official Score Report usually arrives within 3–5 days (occasionally up to 20) and breaks performance down by section, content domain, question type and timing.",
      ],
    },
    {
      heading: "What each GMAT section tests",
      paragraphs: [],
      bullets: [
        `**Quantitative Reasoning:** 21 Problem Solving questions on arithmetic and elementary algebra. GMAC stresses logic and analysis over advanced math. **No calculator.** This check draws ${quant}.`,
        `**Verbal Reasoning:** 23 Reading Comprehension and Critical Reasoning questions. Reading questions test main idea, inference, application, logical structure and style. Critical Reasoning uses short passages, usually under 100 words, and asks what strengthens, weakens or flaws an argument. This check draws ${verbal}.`,
        `**Data Insights:** 20 questions combining graphic, numeric and verbal information, with an **on-screen calculator**. Types: Data Sufficiency, Multi-Source Reasoning, Table Analysis, Graphics Interpretation and Two-Part Analysis. This check draws ${di}.`,
      ],
    },
    {
      heading: "How often you can retake the GMAT",
      paragraphs: [
        "You can take the GMAT up to **five times in any rolling 12-month period**, online and test-center attempts combined, with **at least 16 days** between attempts and no lifetime limit. With **GMAT Superscore**, your strongest eligible section scores across attempts can be combined. Plan your first sitting early enough to leave room for a retake before application deadlines.",
      ],
    },
    {
      heading: "A 4-week GMAT plan built on the three sections",
      paragraphs: [
        `**Week 1:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then GMAC's free Official Starter Kit (more than 70 sample questions and two full-length practice exams) for a baseline. List the question types you miss most.`,
        "**Week 2:** Quant without a calculator: number properties, ratios, rates, percentages and algebra. Do timed sets of 21 to build the pace of about two minutes per question.",
        "**Week 3:** Verbal and Data Insights. Practise Critical Reasoning by naming the conclusion and the assumption before reading answers. For Data Sufficiency, decide whether each statement alone is enough before doing any arithmetic.",
        `**Week 4:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check, review every explanation, then take the second official practice exam in your chosen section order. Access: ${mockAccessLine(config)}. Deciding between tests? Compare with the [GRE practice test](/mock-exams/gre-readiness-check).`,
      ],
    },
    {
      heading: "What trips GMAT candidates",
      paragraphs: [],
      bullets: [
        "Practising Quant with a calculator, which is only allowed in Data Insights.",
        "Solving Data Sufficiency problems fully instead of deciding whether the data is enough.",
        "Spending the three edits on low-value questions, or running out of time and losing the review screen.",
        "Treating the 205–805 total like the old 200–800 scale when comparing scores.",
      ],
    },
  ],
  faqs: [
    {
      question: "How long is the GMAT and how many questions does it have?",
      answer:
        "2 hours 15 minutes for 64 questions: Quantitative Reasoning 21, Verbal Reasoning 23 and Data Insights 20, each 45 minutes, plus an optional 10-minute break (mba.com, checked 23 Nov 2026).",
    },
    {
      question: "Can I use a calculator on the GMAT?",
      answer: "Only in Data Insights, which has an on-screen calculator. Quantitative Reasoning does not allow one.",
    },
    {
      question: "How many times can I take the GMAT?",
      answer:
        "Up to five times in a rolling 12-month period, with at least 16 days between attempts and no lifetime limit.",
    },
    {
      question: "What is the GMAT score range?",
      answer: "205 to 805 in total, with all three section scores contributing equally. Scores stay valid for five years.",
    },
    {
      question: "Can I change answers on the GMAT?",
      answer:
        "Yes, within limits. After answering every question in a section you can review all of them and edit up to three answers, if time remains.",
    },
    {
      question: "How long is the UniPrep2Go GMAT practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes (${quant} Quant, ${verbal} Verbal, ${di} Data Insights). It is not adaptive. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "GMAC (mba.com) — GMAT exam structure",
      url: "https://www.mba.com/exams/gmat-exam/about/exam-structure",
      checked: CHECKED,
    },
    {
      label: "GMAC (mba.com) — GMAT exam content",
      url: "https://www.mba.com/exams/gmat-exam/about/exam-content",
      checked: CHECKED,
    },
    {
      label: "GMAC (mba.com) — GMAT FAQs (retakes, score scale, validity)",
      url: "https://www.mba.com/exams/gmat-exam/faqs",
      checked: CHECKED,
    },
  ],
};
