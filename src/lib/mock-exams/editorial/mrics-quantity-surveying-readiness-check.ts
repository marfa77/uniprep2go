import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "23 Nov 2026";
const SLUG = "mrics-quantity-surveying-readiness-check";
const config = requireMockConfig(SLUG);

export const mricsQsEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Open your pathway guide and your summary of experience side by side. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start to find which Quantity Surveying competency you would struggle to defend under questioning, then build interview answers from your own project examples.`,
  sections: [
    {
      heading: "What the APC asks of a Quantity Surveying candidate",
      paragraphs: [
        "Quantity Surveying and Construction candidates go through the same RICS APC as every pathway: a written submission (summary of experience, 3,000-word case study, CPD record and the Professionalism module), then a 60-minute final interview. The full submission rules and interview timings are on the [MRICS APC practice test](/mock-exams/mrics-readiness-check) page.",
        "What changes for QS candidates is the technical content. Assessors expect you to explain **your own** cost advice, measurement and contract decisions, and to defend them under questioning. Your technical competencies share a **4,000-word** limit in the summary of experience, so each claim has to be specific.",
      ],
    },
    {
      heading: "How competency levels apply to QS work",
      paragraphs: [
        "RICS assesses each competency at one of three levels, and you must reach them in order:",
      ],
      bullets: [
        "**Level 1 — knowledge and understanding:** for example, the measurement rules you work to and the main forms of building contract, with the training you took to learn them.",
        "**Level 2 — application:** projects where you did the work yourself, such as preparing a cost plan, measuring quantities or valuing variations, written as \"I carried out\", not \"we\".",
        "**Level 3 — reasoned advice:** advice you gave a client or employer, the options you considered and the outcome, with you responsible for the recommendation.",
        "Your pathway guide lists which competencies are core or optional for Quantity Surveying and Construction, and the level each needs. Choose them with your counsellor before you write.",
      ],
    },
    {
      heading: "What this QS check covers",
      paragraphs: [
        "The check is split into five equal topic groups so you can see which competency area needs work before interview:",
      ],
      bullets: [
        `**${topicLabel(config, "commercial-cost-planning")}:** cost plans, estimates, cost reporting and value engineering.`,
        `**${topicLabel(config, "quantification-measurement")}:** measurement, bills and schedules, and pricing.`,
        `**${topicLabel(config, "contracts-procurement")}:** procurement routes, tendering, contract administration, variations and final accounts.`,
        `**${topicLabel(config, "project-finance-construction")}:** cash flow, funding and the building technology behind the costs.`,
        `**${topicLabel(config, "mandatory-ethics-optional")}:** the mandatory competencies, the Rules of Conduct and common optional competencies.`,
      ],
    },
    {
      heading: "A 6-week QS interview preparation plan",
      paragraphs: [
        `**Weeks 1–2:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start. For each technical competency, write the one project example you would lead with and the follow-up question you fear most.`,
        "**Weeks 3–4:** Contracts and measurement: walk through a variation, a payment application and a final account you handled, step by step. Drill terms in the [MRICS QS Anki deck](/decks/mrics-quantity-surveying-anki-deck).",
        "**Week 5:** Cost planning and project finance: explain how your estimates moved from early budget to tender, and what you advised when they changed.",
        `**Week 6:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check, review every explanation and retake on a fresh draw. Then run a mock interview on your case study. Access: ${mockAccessLine(config)}. Unsure whether to aim for MRICS or AssocRICS first? See [AssocRICS vs MRICS](/blog/mrics-apc-vs-assocrics-pathway-cost).`,
      ],
    },
    {
      heading: "Where QS candidates lose marks",
      paragraphs: [],
      bullets: [
        "Describing what the project team did rather than your own measurement or advice.",
        "Quoting contract clauses from memory without explaining how you applied them on a real job.",
        "Choosing a case study where the key decision was made by someone more senior.",
        "Leaving ethics and mandatory competencies until the last week; they come up in every interview.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is the APC different for Quantity Surveying candidates?",
      answer:
        "The process is the same as other pathways: written submission, then a 60-minute final interview. The technical competencies and the questions you face are specific to Quantity Surveying and Construction (RICS, checked 23 Nov 2026).",
    },
    {
      question: "What does Level 3 mean for a quantity surveyor?",
      answer:
        "Reasoned advice: you explain the advice you gave a client or employer, the options you considered and the outcome, with the recommendation being your own responsibility.",
    },
    {
      question: "How many words can I use for QS technical competencies?",
      answer:
        "Technical competencies share a 4,000-word maximum in the summary of experience; mandatory competencies have 1,500 words. The case study is a separate 3,000 words.",
    },
    {
      question: "Which competencies are core on the QS pathway?",
      answer:
        "Your RICS pathway guide for Quantity Surveying and Construction lists the core and optional competencies and the level each needs. Choose them with your counsellor before writing.",
    },
    {
      question: "How long is the UniPrep2Go MRICS QS practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes across five QS competency groups. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "RICS — APC submissions and assessment (levels, word limits, interview)",
      url: "https://www.rics.org/candidates/assessment-information/apc-submissions-assessment",
      checked: CHECKED,
    },
    {
      label: "RICS — getting started (candidate and pathway guides)",
      url: "https://www.rics.org/candidates/getting-started",
      checked: CHECKED,
    },
  ],
};
