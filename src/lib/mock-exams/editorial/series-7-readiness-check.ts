import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicQuestions,
} from "./config-copy";

const CHECKED = "23 Nov 2026";
const SLUG = "series-7-readiness-check";
const config = requireMockConfig(SLUG);
const f1 = topicQuestions(config, "s7-f1");
const f2 = topicQuestions(config, "s7-f2");
const f3 = topicQuestions(config, "s7-f3");
const f4 = topicQuestions(config, "s7-f4");

export const series7Editorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Pass or schedule the [SIE](/mock-exams/sie-full-mock) first, since it is the Series 7 corequisite. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, put most hours into Function 3 (91 of 125 scored items), and use the [Series 7 Anki deck](/decks/series-7-anki-deck) for options, municipal and margin rules you keep missing.`,
  sections: [
    {
      heading: "Series 7 exam facts: length, passing score, fee and sponsorship",
      paragraphs: [
        "FINRA writes and administers the Series 7 (General Securities Representative) exam. To register as a General Securities Representative you must pass **both** the Series 7 and its corequisite, the **SIE**.",
      ],
      bullets: [
        "**Items:** 125 scored multiple-choice questions with four answer choices, plus **5 unscored pretest items** mixed in, for 130 in total. There is no penalty for guessing.",
        "**Time:** 3 hours 45 minutes.",
        "**Passing score:** 72. Scores are equated across exam forms, so every candidate is held to the same standard.",
        "**Fee:** $395.",
        "**Sponsorship:** you must be associated with and sponsored by a FINRA member firm (or another applicable SRO member firm). The SIE needs no sponsor; the Series 7 does.",
        "**Scheduling:** after enrollment you book with Prometric, FINRA's test-delivery vendor. An enrollment opens a **120-day testing window**.",
      ],
    },
    {
      heading: "What the four Series 7 job functions test",
      paragraphs: [
        "FINRA's outline groups the 125 scored items by the job a new representative does, not by product, and lists the FINRA, MSRB, SEC and Cboe rules behind each task.",
      ],
      bullets: [
        `**Function 1 — Seeks business for the broker-dealer (9 items, 7%):** contacting customers and describing products within communications rules. This check draws ${f1}.`,
        `**Function 2 — Opens accounts after evaluating customer profiles (11 items, 9%):** account types and disclosures, customer documentation, investment profiles and supervisory approval. This check draws ${f2}.`,
        `**Function 3 — Information, recommendations, transfers and records (91 items, 73%):** strategies, risks and rewards, suitability, product disclosures and records. Options, debt, municipals, packaged products and tax treatment all sit here. This check draws ${f3}.`,
        `**Function 4 — Processes and confirms transactions (14 items, 11%):** quotes, order handling, confirmations, settlement, discrepancies and margin. This check draws ${f4}.`,
      ],
    },
    {
      heading: "How long to wait before retaking the Series 7 (changes 19 Jan 2027)",
      paragraphs: [
        "**Until 18 Jan 2027:** 30 days after the first and second failed attempts, and 180 days after the third or any later failure within two years.",
        "**From 19 Jan 2027 (FINRA Regulatory Notice 26-18):** **15 days** after the first and second failures and **60 days** after the third or later. The new periods apply automatically to new enrollments and to open enrollments without an appointment. If a retake is already booked, FINRA has to cancel that appointment to apply the shorter wait, and rescheduling fees may apply. The waiting period applies only to the exam you failed: failing the SIE does not block the Series 7. Failures more than two years old do not count.",
      ],
    },
    {
      heading: "A 4-week Series 7 study plan built on the FINRA outline",
      paragraphs: [
        `**Week 1:** Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start. Cover Functions 1, 2 and 4 (34 items together): communications, account opening, order handling, settlement and margin.`,
        "**Weeks 2–3:** Function 3. Rotate equities and debt, municipal securities, options strategies (spreads, straddles, breakevens and maximum gain or loss), packaged products, retirement accounts, and suitability. Drill missed rules daily in the [Series 7 flashcards](/decks/series-7-anki-deck).",
        `**Week 4:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute mock, review every explanation, and retake on a fresh draw. On exam day, budget roughly 1.7 minutes per item: 225 minutes for 130 items.`,
        `Access: ${mockAccessLine(config)}. After Series 7, most candidates also need state registration: see the [Series 63 practice test](/mock-exams/series-63-readiness-check) or the [Series 66 practice test](/mock-exams/series-66-readiness-check).`,
      ],
    },
    {
      heading: "What trips Series 7 candidates",
      bullets: [
        "Treating it as a bigger SIE: the Series 7 asks what to do for a specific customer, so suitability judgment matters more than definitions.",
        "Under-weighting Function 3. It is about three quarters of the scored items; a strong Function 1 or 4 score cannot carry a weak Function 3.",
        "Learning options strategies as pictures instead of computing breakeven, maximum gain and maximum loss on every practice item.",
      ],
      paragraphs: [],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the Series 7 and what is the passing score?",
      answer:
        "125 scored multiple-choice items plus 5 unscored pretest items (130 total) in 3 hours 45 minutes. The passing score is 72 (FINRA Series 7 page and content outline, checked 23 Nov 2026).",
    },
    {
      question: "Do I need a sponsor to take the Series 7?",
      answer:
        "Yes. You must be associated with and sponsored by a FINRA member firm or another applicable SRO member firm. The SIE, its corequisite, does not need a sponsor.",
    },
    {
      question: "How much does the Series 7 cost?",
      answer: "FINRA lists the Series 7 fee as $395 (finra.org, checked 23 Nov 2026).",
    },
    {
      question: "Do I have to pass the SIE before the Series 7?",
      answer:
        "The SIE is a corequisite: you need to pass both exams to register as a General Securities Representative. Failing the SIE does not create a waiting period for the Series 7.",
    },
    {
      question: "How long do I wait to retake the Series 7?",
      answer:
        "Today, 30 days after the first and second failures and 180 days after the third within two years. From 19 Jan 2027: 15 days and 60 days (FINRA Regulatory Notice 26-18).",
    },
    {
      question: "How long is the UniPrep2Go Series 7 practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions with no signup. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes, weighted like FINRA's four functions (${f1}/${f2}/${f3}/${f4}). Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "FINRA — Series 7 General Securities Representative exam",
      url: "https://www.finra.org/registration-exams-ce/qualification-exams/series7",
      checked: CHECKED,
    },
    {
      label: "FINRA — Series 7 content outline (PDF)",
      url: "https://www.finra.org/sites/default/files/2025-10/Series_7_Content_Outline.pdf",
      checked: CHECKED,
    },
    {
      label: "FINRA Regulatory Notice 26-18 (retake waiting periods)",
      url: "https://www.finra.org/rules-guidance/notices/26-18",
      checked: CHECKED,
    },
  ],
};
