import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "cda-childcare-readiness-check";
const config = requireMockConfig(SLUG);

export const cdaChildcareEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `The CDA has two parts, so prepare for both: practise exam questions here, starting with the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, and build your Professional Portfolio alongside so it is ready for the Verification Visit.`,
  sections: [
    {
      heading: "What is the CDA credential?",
      paragraphs: [
        "The Child Development Associate (CDA) credential is awarded by the Council for Professional Recognition to early childhood educators. The Council's assessment has **two parts**: the **CDA Exam** and the **Verification Visit**.",
      ],
      bullets: [
        "**CDA Exam:** a **65-question**, computer-based exam taken at a local **Pearson VUE** testing site.",
        "**Verification Visit:** a Professional Development (PD) Specialist observes you working as lead teacher, reviews your Professional Portfolio, and holds a reflective dialogue with you.",
      ],
    },
    {
      heading: "What does it cost, and how do you renew?",
      paragraphs: [
        "From **1 August 2025**, the Council's initial application fee is **$525** online or **$600** on paper, and renewal is **$250** online or **$300** on paper. The Council says it will review pricing every three years.",
        "Renewal changed on the same date: the First Aid and CPR requirement was removed, renewal is automatic once a complete application and payment are received (with random audits), and an Early Childhood Education reviewer confirms **at least 80 hours** of work with children in the past year. You can submit your renewal up to six months before your credential expires.",
      ],
    },
    {
      heading: "Which setting will you be observed in?",
      paragraphs: [
        "The Council sets observation rules by setting. For example, a preschool observation needs at least eight children aged 3 to 5. Check the requirements for your setting on the Council's educator pathways page before you book the visit, so the observation can go ahead as planned.",
      ],
    },
    {
      heading: "How should you prepare for the exam?",
      paragraphs: [
        "Exam questions usually describe a classroom situation and ask what a skilled educator would do. Think about the child's development, safety, and the family relationship together, not just the activity in front of you. Your portfolio work helps here: writing your reflective statements forces you to explain why you make the choices you do.",
      ],
    },
    {
      heading: "What this check covers",
      paragraphs: ["This check groups its questions into four areas:"],
      bullets: [
        `**${topicLabel(config, "safe-healthy")}:** safety, health and the learning environment.`,
        `**${topicLabel(config, "physical-cog")}:** supporting physical and cognitive development.`,
        `**${topicLabel(config, "social-communication")}:** social and emotional development and communication.`,
        `**${topicLabel(config, "families-professional")}:** working with families and professional practice.`,
      ],
    },
    {
      heading: "A 4-week plan",
      paragraphs: [
        `**Week 1:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then safe and healthy learning environments.`,
        "**Week 2:** Physical and cognitive development, with portfolio work alongside.",
        "**Week 3:** Social and emotional development, communication, and working with families.",
        `**Week 4:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws and review every miss. Access: ${mockAccessLine(config)}.`,
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the CDA exam?",
      answer: `65 questions on computer at a Pearson VUE testing site (Council for Professional Recognition, checked ${CHECKED}).`,
    },
    {
      question: "What is the CDA Verification Visit?",
      answer: "A PD Specialist observes you as lead teacher, reviews your Professional Portfolio and holds a reflective dialogue with you.",
    },
    {
      question: "How much does the CDA cost?",
      answer: "From 1 August 2025, the initial application is $525 online or $600 on paper.",
    },
    {
      question: "How much does CDA renewal cost?",
      answer: "$250 online or $300 on paper. You can submit up to six months before your credential expires.",
    },
    {
      question: "Do I still need First Aid and CPR to renew?",
      answer: "No. The Council removed that renewal requirement from 1 August 2025.",
    },
    {
      question: "How long is the UniPrep2Go CDA practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes; it is independent practice, not Council material. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    { label: "Council for Professional Recognition — Learn about the CDA", url: "https://www.cdacouncil.org/en/about/learn-about-the-cda/", checked: CHECKED },
    { label: "Council for Professional Recognition — 2025 pricing update", url: "https://www.cdacouncil.org/en/2025-pricing-update/", checked: CHECKED },
    { label: "Council for Professional Recognition — Renewal process updates", url: "https://www.cdacouncil.org/en/cda-renewal-process-updates-enhancing-efficiency-accessibility/", checked: CHECKED },
    { label: "Council for Professional Recognition — Educator pathways", url: "https://www.cdacouncil.org/en/educator-pathways/", checked: CHECKED },
  ],
};
