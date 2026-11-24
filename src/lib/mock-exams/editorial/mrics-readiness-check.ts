import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
} from "./config-copy";

const CHECKED = "23 Nov 2026";
const SLUG = "mrics-readiness-check";
const config = requireMockConfig(SLUG);

export const mricsEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `The APC is a written submission plus a 60-minute interview, not a multiple-choice exam. Use the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start to test the knowledge assessors probe: mandatory competencies, the Rules of Conduct and Level 1 technical knowledge. Then write your submission with your counsellor and rehearse the interview.`,
  sections: [
    {
      heading: "How the RICS APC is assessed",
      paragraphs: [
        "The Assessment of Professional Competence (APC) leads to MRICS, the chartered grade. RICS assesses it in two stages: a **written submission** and a **final assessment interview**. You can make up to **five attempts** to pass; attempts before 1 January 2026 do not count.",
      ],
      bullets: [
        "**Summary of experience:** a statement for each competency at the level your pathway requires. Mandatory competencies are limited to **1,500 words**, and technical (core and optional) competencies to **4,000 words maximum**.",
        "**Case study:** **3,000 words maximum**, on a project you were personally involved in during the **24 months** before your submission date. RICS counts words from the introduction to the end of the conclusion.",
        "**CPD record:** at least **50% formal** on every route. APC with 24 months' structured training needs **96 hours** (48 a year); the 12-month, non-structured and preliminary-review routes need **48 hours**.",
        "**Professionalism module:** must be completed before the assessment.",
        "**Proposer and seconders:** three Chartered Surveyors (MRICS or FRICS) support your election, at least one from a different firm.",
        "**Work experience record:** diary and logbook for APC 12 and APC 24 candidates.",
      ],
    },
    {
      heading: "Which APC route fits your experience",
      paragraphs: [
        "RICS sets a minimum experience for each route. **APC 24** (structured training) needs at least **2 years** of experience at final assessment; **APC 12** and **APC Preliminary** need at least **5 years**; **APC Non-Structured Training** needs at least **10 years** on enrolment. Competencies are assessed at three levels: **Level 1** knowledge and understanding, **Level 2** application of knowledge, and **Level 3** reasoned advice and depth of technical knowledge.",
        "Comparing chartered and associate grades, or the cost of each? See [AssocRICS vs MRICS](/blog/mrics-apc-vs-assocrics-pathway-cost).",
      ],
    },
    {
      heading: "What happens in the 60-minute final assessment interview",
      bullets: [
        "**10 minutes:** your presentation on the case study. RICS asks for exactly 10 minutes.",
        "**10 minutes:** questions on the presentation.",
        "**30 minutes:** discussion of your overall experience, including CPD, technical competencies, the Rules of Conduct and professional practice.",
        "**10 minutes:** the chair's questions, which may cover professional and technical matters, CPD, the Rules of Conduct and mandatory competencies, and close.",
      ],
      paragraphs: [],
    },
    {
      heading: "An 8-week APC interview preparation plan",
      paragraphs: [
        `**Weeks 1–2:** Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start. Re-read your summary of experience competency by competency and list three questions an assessor could ask on each Level 2 and Level 3 claim.`,
        "**Weeks 3–4:** Ethics and the Rules of Conduct: conflicts of interest, client money, complaints handling and professional indemnity. Drill definitions and scenarios in the [MRICS Anki deck](/decks/mrics-anki-deck).",
        "**Weeks 5–6:** Write and time the 10-minute case study presentation. Rehearse it out loud until it lands within the limit without rushing.",
        `**Weeks 7–8:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check, review every explanation, then hold two mock interviews with your counsellor using the 10/10/30/10 structure. Access: ${mockAccessLine(config)}. On the Quantity Surveying pathway? Add the [MRICS QS practice test](/mock-exams/mrics-quantity-surveying-readiness-check).`,
      ],
    },
    {
      heading: "What trips APC candidates",
      paragraphs: [],
      bullets: [
        "Writing \"we\" instead of \"I\" in the summary, so assessors cannot see your own role.",
        "Claiming Level 3 without examples of advice you gave and the options you weighed.",
        "Running short or long on the 10-minute presentation.",
        "Going over the word limits or using a case study outside the 24-month window.",
      ],
    },
  ],
  faqs: [
    {
      question: "How long is the RICS APC final assessment interview?",
      answer:
        "60 minutes: a 10-minute case study presentation, 10 minutes of questions on it, 30 minutes on your wider experience, CPD and ethics, and 10 minutes with the chair (RICS, checked 23 Nov 2026).",
    },
    {
      question: "What is the APC case study word limit?",
      answer:
        "3,000 words maximum, on a project from the 24 months before your submission. The summary of experience allows 1,500 words for mandatory competencies and up to 4,000 for technical competencies.",
    },
    {
      question: "How much CPD do I need for the APC?",
      answer:
        "48 hours on most routes and 96 hours (48 a year) on APC 24 structured training, with at least 50% formal CPD.",
    },
    {
      question: "How many times can I attempt the RICS assessment?",
      answer: "Up to five attempts. Attempts made before 1 January 2026 do not count toward the total.",
    },
    {
      question: "Is the APC a multiple-choice exam?",
      answer:
        "No. It is a written submission and a final interview. A practice test helps with the knowledge assessors probe, but not with writing your submission.",
    },
    {
      question: "How long is the UniPrep2Go MRICS practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes across mandatory, ethics, technical, Level 2–3 and interview topics. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "RICS — APC submissions and assessment",
      url: "https://www.rics.org/candidates/assessment-information/apc-submissions-assessment",
      checked: CHECKED,
    },
    {
      label: "RICS — plan and record CPD (candidates)",
      url: "https://www.rics.org/candidates/recording-cpd-activities-for-candidates",
      checked: CHECKED,
    },
  ],
};
