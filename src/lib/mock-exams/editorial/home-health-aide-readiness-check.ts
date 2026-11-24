import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "home-health-aide-readiness-check";
const config = requireMockConfig(SLUG);

export const homeHealthAideEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `The federal competency evaluation includes hands-on skills, so practise them with a partner, not just on screen. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start for the written side, then rehearse the observed skills (vital signs, personal care, transfers and range of motion) until each step is automatic.`,
  sections: [
    {
      heading: "What does federal law require of home health aides?",
      paragraphs: [
        "For home health agencies that take part in Medicare, the federal rule is **42 CFR 484.80**. It says a qualified home health aide has completed one of these: a training and competency evaluation programme, a competency evaluation programme alone, a state-approved nurse aide training and competency programme with a listing in good standing on the state nurse aide registry, or a state licensure programme that meets the federal standards. States can add their own rules, so check yours too.",
        "If you go **24 consecutive months** without paid home health aide work, you must complete a programme again before providing services.",
      ],
    },
    {
      heading: "How long is the training?",
      paragraphs: [
        "Federal rules require at least **75 hours** of classroom and supervised practical training, and at least **16 hours** of classroom training must come before at least **16 hours** of supervised practical training. The training must be led by a registered nurse with at least 2 years of nursing experience, 1 of them in home health care, or by others under that nurse's general supervision.",
      ],
    },
    {
      heading: "How does the competency evaluation work?",
      paragraphs: [
        "A registered nurse runs the evaluation. Some subjects must be **observed** with a patient or pseudo-patient: communication skills; reading and recording temperature, pulse and respiration; personal hygiene and grooming; safe transfer and ambulation; and range of motion and positioning. The other subjects can be tested in writing, orally, or by observation.",
        "An aide marked unsatisfactory in a task may not perform it without direct supervision until retrained and re-evaluated. An aide with **unsatisfactory ratings in more than one** required area has not passed. Once working, aides need at least **12 hours of in-service training** every 12 months.",
      ],
    },
    {
      heading: "What this check covers",
      paragraphs: ["This check covers the written side of the federal subject list:"],
      bullets: [
        `**${topicLabel(config, "adls")}:** bathing, grooming, toileting, nutrition and fluid intake.`,
        `**${topicLabel(config, "safety")}:** infection prevention, a safe home environment and emergencies.`,
        `**${topicLabel(config, "obs")}:** observing, recording and reporting changes to the supervisor.`,
        `**${topicLabel(config, "ethics")}:** respecting patients' privacy, property and needs.`,
      ],
    },
    {
      heading: "A 3-week plan",
      paragraphs: [
        `**Week 1:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then the observed skills: practise vital signs and one personal care task every day.`,
        "**Week 2:** Transfers, ambulation, range of motion and positioning, plus infection control and emergencies.",
        `**Week 3:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws and run full skills practice with a partner. Access: ${mockAccessLine(config)}. Training as a nursing assistant instead? See the [NNAAP CNA practice test](/mock-exams/nnaap-cna-readiness-check).`,
      ],
    },
  ],
  faqs: [
    {
      question: "How many training hours does a home health aide need?",
      answer: `At least 75 hours of classroom and supervised practical training under federal rule 42 CFR 484.80, with at least 16 hours of classroom training before at least 16 hours of supervised practice (checked ${CHECKED}).`,
    },
    {
      question: "Which skills are observed in the competency evaluation?",
      answer: "Communication; reading and recording temperature, pulse and respiration; personal hygiene and grooming; safe transfers and ambulation; and range of motion and positioning.",
    },
    {
      question: "Can I fail one skill and still pass?",
      answer: "An unsatisfactory rating in more than one required area means you have not passed. A single unsatisfactory task must be retrained and re-evaluated before you do it unsupervised.",
    },
    {
      question: "Does a CNA count as a home health aide?",
      answer: "A state-approved nurse aide training and competency evaluation programme counts, if you are listed in good standing on the state nurse aide registry.",
    },
    {
      question: "How much ongoing training do home health aides need?",
      answer: "At least 12 hours of in-service training in every 12-month period.",
    },
    {
      question: "How long is the UniPrep2Go home health aide practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes on the written subjects; it does not test hands-on skills. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "42 CFR 484.80 — Home health aide services",
      url: "https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-G/part-484/subpart-B/section-484.80",
      checked: CHECKED,
    },
    {
      label: "42 CFR 484.80(c) — Competency evaluation",
      url: "https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-G/part-484/subpart-B/section-484.80#p-484.80(c)",
      checked: CHECKED,
    },
  ],
};
