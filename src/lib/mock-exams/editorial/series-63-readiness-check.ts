import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicQuestions,
} from "./config-copy";

const CHECKED = "23 Nov 2026";
const SLUG = "series-63-readiness-check";
const config = requireMockConfig(SLUG);
const ethics = topicQuestions(config, "s63-ethics");
const comm = topicQuestions(config, "s63-comm");
const agents = topicQuestions(config, "s63-agent");
const bd = topicQuestions(config, "s63-bd");
const remedies = topicQuestions(config, "s63-remedies");
const securities = topicQuestions(config, "s63-securities");
const advisers = topicQuestions(config, "s63-ia") + topicQuestions(config, "s63-iar");

export const series63Editorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start to find which Uniform Securities Act area is weakest, then study ethics and communications first, since they are the largest blocks in this check. Use the [Series 63 Anki deck](/decks/series-63-anki-deck) for definitions and exclusions. The Series 63 is short, so finish with full timed runs rather than more reading.`,
  sections: [
    {
      heading: "Series 63 exam facts: who writes it, length, passing score and fee",
      paragraphs: [
        "The Series 63 (Uniform Securities Agent State Law Examination) is a **NASAA exam administered by FINRA**. It tests the state-law side of working as a securities agent: the Uniform Securities Act and the rules state administrators enforce. Candidates commonly sit it alongside the [SIE](/mock-exams/sie-full-mock) and the [Series 7](/mock-exams/series-7-readiness-check); check which state exams your firm's registration requires.",
      ],
      bullets: [
        "**Items:** 60 scored multiple-choice questions plus 5 unscored ones (65 in total).",
        "**Time:** 75 minutes.",
        "**Passing score:** at least **43 of the 60 scored questions** correct.",
        "**Fee:** $147.",
        "**Corequisite:** none.",
        "**Content outline:** published on NASAA's exams page. FINRA's Series 63 page points candidates there.",
      ],
    },
    {
      heading: "What the Series 63 covers",
      paragraphs: [
        "The exam is about **who must register, what is prohibited, and what the state administrator can do**, not about products. Questions are scenarios: an agent, a firm or a client does something, and you decide whether it is allowed under state law. Here is how this check's session lines up with those areas:",
      ],
      bullets: [
        `**Ethical practices and obligations (${ethics} questions here):** unethical business practices for agents, broker-dealers and advisers, such as unauthorized trading, misrepresentation, guarantees, borrowing from or lending to clients, and handling of customer funds.`,
        `**Communications, records and sales practices (${comm}):** advertising and correspondence, social media, disclosure of conflicts, and books and records.`,
        `**Agents and broker-dealers (${agents} + ${bd}):** who is an agent or broker-dealer, exclusions and exemptions, registration steps, succession, and when a registration becomes effective or is withdrawn.`,
        `**Enforcement, remedies and penalties (${remedies}):** the administrator's investigative and subpoena powers, stop orders, denial and revocation, civil liability and criminal penalties.`,
        `**Securities and issuers (${securities}):** what counts as a security, registration by coordination or qualification, and exempt securities and transactions.`,
        `**Investment advisers and IARs (${advisers}):** basic state-level rules for advisers and their representatives.`,
      ],
    },
    {
      heading: "How long to wait before retaking the Series 63 (changes 4 Jan 2027)",
      paragraphs: [
        "NASAA sets the retake rules for its own exams; FINRA's 15-day change in Regulatory Notice 26-18 covers FINRA exams only, not the Series 63.",
        "**From 4 Jan 2027:** 30 days after the first and second failed attempts (unchanged) and **60 days** (down from 180) after the third. The new periods apply to enrollments opened on or after 4 Jan 2027. A window opened before that date follows the old rules, so a candidate who opens a third window in two years before 4 Jan 2027 still waits 180 days.",
      ],
    },
    {
      heading: "A 2-week Series 63 study plan",
      paragraphs: [
        `**Days 1–3:** Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start. Learn the definitions first: agent, broker-dealer, investment adviser, IAR, issuer, and the exclusions for each. Most later questions depend on getting the definition right.`,
        "**Days 4–9:** Ethics and communications, then registration and the administrator's powers. Write out the prohibited-practice lists in your own words and drill them daily in the [Series 63 flashcards](/decks/series-63-anki-deck).",
        `**Days 10–14:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute mock (the same length and time as the scored part of the real exam), review every explanation, and repeat on a fresh draw until you clear 43 of 60 comfortably.`,
        `Access: ${mockAccessLine(config)}. If you also need adviser registration, compare the [Series 66 practice test](/mock-exams/series-66-readiness-check) and the [Series 65 practice test](/mock-exams/series-65-readiness-check).`,
      ],
    },
    {
      heading: "What trips Series 63 candidates",
      paragraphs: [],
      bullets: [
        "Answering with federal (FINRA or SEC) rules when the question asks what the state administrator can do.",
        "Mixing up exclusions (not an agent at all) with exemptions (an agent, but registration is not required).",
        "Missing absolute words such as always, never and only in ethics scenarios.",
        "Pacing: 75 minutes for 65 questions leaves little time to reread long scenarios.",
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the Series 63 and what is the passing score?",
      answer:
        "60 scored and 5 unscored questions in 75 minutes. You pass with at least 43 of the 60 scored questions correct (FINRA Series 63 page, checked 23 Nov 2026).",
    },
    {
      question: "Who writes the Series 63 exam?",
      answer:
        "NASAA (the North American Securities Administrators Association). FINRA administers it, and the content outline is on NASAA's exams page.",
    },
    {
      question: "How much does the Series 63 cost?",
      answer: "FINRA lists the Series 63 fee as $147 (checked 23 Nov 2026).",
    },
    {
      question: "Does the FINRA 15-day retake rule apply to the Series 63?",
      answer:
        "No. Regulatory Notice 26-18 covers FINRA exams only. For NASAA exams, from 4 Jan 2027 the wait stays 30 days after the first and second failures and drops from 180 to 60 days after the third.",
    },
    {
      question: "Does the Series 63 have a corequisite?",
      answer:
        "No. FINRA's Series 63 page lists the corequisite as none. Your firm tells you which other qualification exams your role needs.",
    },
    {
      question: "How long is the UniPrep2Go Series 63 practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions with no signup. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes, the same as the scored part of the real exam. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "FINRA — Series 63 Uniform Securities Agent State Law Exam",
      url: "https://www.finra.org/registration-exams-ce/qualification-exams/series63",
      checked: CHECKED,
    },
    {
      label: "FINRA Regulatory Notice 26-18 (FINRA exams only; NASAA exams may differ)",
      url: "https://www.finra.org/rules-guidance/notices/26-18",
      checked: CHECKED,
    },
  ],
};
