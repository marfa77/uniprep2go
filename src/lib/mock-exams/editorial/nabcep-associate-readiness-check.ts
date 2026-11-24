import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "nabcep-associate-readiness-check";
const config = requireMockConfig(SLUG);

export const nabcepAssociateEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Start with safety and core knowledge, the domains NABCEP added on 7 April 2026. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start to see where you stand, then work through design, installation, and operations and maintenance with the NEC and your training provider's material open beside you.`,
  sections: [
    {
      heading: "What is the NABCEP PV Associate?",
      paragraphs: [
        "The PV Associate (PVA) is NABCEP's entry-level solar credential. On **7 April 2026** NABCEP updated it with new content domains on **safety** and **core knowledge**, keeping the design, sales and economics, installation, and operations and maintenance domains. NABCEP's PV Associate job task analysis lists six domains: safety, core knowledge, sales and economics, design, installation, and operations and maintenance.",
      ],
    },
    {
      heading: "How do you qualify?",
      paragraphs: ["NABCEP lists three pathways:"],
      bullets: [
        "**Education:** complete a course with a NABCEP Associate Registered Training Provider, then pass the exam. Your training provider registers you.",
        "**Experience:** document at least **six months** of full-time-equivalent work in a directly related job, then pass the exam.",
        "**Entry Level conversion:** for holders of a NABCEP Entry Level Achievement Award; if it is more than three years old, you also need 12 hours of CE from the last three years.",
      ],
    },
    {
      heading: "Fees, delivery and renewal",
      paragraphs: [
        "NABCEP's fee table lists a **$25** application fee and a **$125** exam fee (education-pathway candidates may be charged $125 to $180 for a first attempt), a $125 re-exam fee, and $150 for renewal. Exams taken outside the US and Canada cost an extra $75. Fees are non-refundable.",
        "You can test on paper (education pathway only), on computer at a Meazure Learning test centre, or with live remote proctoring from your own computer; retakes must be on computer or remote. You have six months from approval to schedule. The credential runs for **three years**, and renewal needs **12 contact hours** of related CE in that period.",
      ],
    },
    {
      heading: "What this check covers",
      paragraphs: ["This check groups its questions into four areas:"],
      bullets: [
        `**${topicLabel(config, "pv-basics")}:** irradiance, cell and module behaviour, and how a PV system produces energy.`,
        `**${topicLabel(config, "safety")}:** electrical hazards, working at height and safe work practices.`,
        `**${topicLabel(config, "design")}:** modules, inverters, mounting and balance-of-system parts, and how they fit together.`,
        `**${topicLabel(config, "codes")}:** code requirements and common system applications.`,
      ],
    },
    {
      heading: "A 4-week plan",
      paragraphs: [
        `**Week 1:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then safety and core knowledge, the newest domains.`,
        "**Week 2:** Components and design: string sizing, inverter types and system configurations.",
        "**Week 3:** Installation, operations and maintenance, plus sales and economics basics.",
        `**Week 4:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws and review every miss. Access: ${mockAccessLine(config)}.`,
      ],
    },
  ],
  faqs: [
    {
      question: "How much does the NABCEP PV Associate exam cost?",
      answer: `A $25 application fee plus a $125 exam fee; education-pathway candidates may be charged $125 to $180 for a first attempt (NABCEP, checked ${CHECKED}).`,
    },
    {
      question: "What changed in the PV Associate in 2026?",
      answer: "On 7 April 2026 NABCEP added content domains on safety and core knowledge, keeping design, sales and economics, installation, and operations and maintenance.",
    },
    {
      question: "Can I take the PV Associate exam online?",
      answer: "Yes, with live remote proctoring through Meazure Learning, or at a Meazure test centre. Paper exams are only for the education pathway.",
    },
    {
      question: "Do I need training to qualify?",
      answer: "Not necessarily. You can qualify through a registered training course, or with six months of full-time-equivalent related work experience.",
    },
    {
      question: "How long does the credential last?",
      answer: "Three years. Renewal needs 12 contact hours of related CE in that period and a $150 fee.",
    },
    {
      question: "How long is the UniPrep2Go PV Associate practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes; it is independent practice, not NABCEP material. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    { label: "NABCEP — Associate program", url: "https://www.nabcep.org/certifications/associate-program/", checked: CHECKED },
    { label: "NABCEP — Fees", url: "https://www.nabcep.org/certifications/nabcep-fees/", checked: CHECKED },
    { label: "NABCEP — Exam formats and scheduling", url: "https://www.nabcep.org/certifications/exam-formats-how-to-schedule-2/", checked: CHECKED },
    { label: "NABCEP — PV Associate job task analysis", url: "https://www.nabcep.org/resource/pv-associate-jta/", checked: CHECKED },
    { label: "NABCEP — Recertification and renewal", url: "https://www.nabcep.org/recertification-renewal/", checked: CHECKED },
  ],
};
