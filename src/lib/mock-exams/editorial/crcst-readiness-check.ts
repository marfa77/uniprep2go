import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "crcst-readiness-check";
const config = requireMockConfig(SLUG);

export const crcstEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Plan your 400 hands-on hours alongside your study: HSPA requires them for full certification. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, work through the seven content domains in order, and focus extra time on decontamination and sterilization, the areas you will also practise most on the job.`,
  sections: [
    {
      heading: "What is the CRCST exam?",
      paragraphs: [
        "The Certified Registered Central Service Technician (CRCST) credential comes from the Healthcare Sterile Processing Association (HSPA). HSPA gives these exam details:",
      ],
      bullets: [
        "**150 multiple-choice questions** in **three hours**, on computer, in English.",
        "A 15-minute on-screen tutorial comes first; you can mark questions for review.",
        "Delivered at **Prometric** test centres year-round. You have **120 days** from approval to test, with no extensions.",
        "**Fee:** **$140** for the application and one attempt; a retake is another $140.",
      ],
    },
    {
      heading: "What are the 400 hours, and what is provisional certification?",
      paragraphs: [
        "HSPA requires **400 hours** of hands-on experience in a sterile processing department, paid or volunteer: 120 in decontamination, 120 in preparation and packaging, 120 in sterilization and disinfection, 24 in storage and distribution, and 16 in quality assurance. A manager or supervisor who physically witnessed the hours must document them.",
      ],
      bullets: [
        "**Full certification:** complete the 400 hours within the five years before you apply.",
        "**Provisional certification:** pass the exam first, then complete the 400 hours within **six months**. If you miss the deadline, provisional status is forfeited and you must retest; a one-time two-month extension can be requested by your supervisor before it expires.",
      ],
    },
    {
      heading: "Retakes and renewal",
      paragraphs: [
        "If you fail, HSPA requires a **six-week** wait before your next attempt. Once certified, you renew **every year**: CRCST holders need **12 technical CE credits** per renewal year, with a $50 renewal fee ($60 with membership). There is a six-week grace period after expiry, during which you are not certified; after that, you must retest.",
      ],
    },
    {
      heading: "What this check covers",
      paragraphs: [
        "HSPA's CRCST outline has seven domains, from departmental considerations to patient care equipment and professional development. This check concentrates on the four technical areas:",
      ],
      bullets: [
        `**${topicLabel(config, "decontamination")}:** point-of-use care, cleaning chemistry and mechanical cleaning.`,
        `**${topicLabel(config, "assembly-packaging")}:** inspection, instrument sets and packaging systems.`,
        `**${topicLabel(config, "sterilization")}:** steam and low-temperature methods, monitoring and load release.`,
        `**${topicLabel(config, "storage-distribution")}:** sterile storage, event-related sterility, transport and inventory.`,
      ],
    },
    {
      heading: "A 4-week plan",
      paragraphs: [
        `**Week 1:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then cleaning and decontamination.`,
        "**Week 2:** Inspection, assembly and packaging, linking each step to what you see in the department. Ask your supervisor to sign off hours as you complete them, rather than all at the end.",
        "**Week 3:** Sterilization methods and monitoring, then storage and distribution.",
        `**Week 4:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws and review every miss. Access: ${mockAccessLine(config)}.`,
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the CRCST exam?",
      answer: `150 multiple-choice questions in three hours (HSPA, checked ${CHECKED}).`,
    },
    {
      question: "How much does the CRCST exam cost?",
      answer: "$140 for the application and one attempt; each retake is another $140.",
    },
    {
      question: "Do I need the 400 hours before taking the exam?",
      answer: "Not necessarily. You can pass the exam first and complete the 400 hours within six months for provisional certification, or complete them first for full certification.",
    },
    {
      question: "How long must I wait to retake the CRCST exam?",
      answer: "Six weeks between attempts.",
    },
    {
      question: "How do I keep my CRCST certification?",
      answer: "Renew every year with 12 technical CE credits and a $50 renewal fee ($60 with membership).",
    },
    {
      question: "How long is the UniPrep2Go CRCST practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes; it is independent practice, not HSPA material. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    { label: "HSPA — CRCST certification", url: "https://myhspa.org/certification/certification-overview/certified-registered-central-service-technician-crcst/", checked: CHECKED },
    { label: "HSPA — Become certified (FAQ)", url: "https://myhspa.org/certification/become-certified/", checked: CHECKED },
    { label: "HSPA — Renew your certification", url: "https://myhspa.org/certification/renew-your-certification/", checked: CHECKED },
  ],
};
