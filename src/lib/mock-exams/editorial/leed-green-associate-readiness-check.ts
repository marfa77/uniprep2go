import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  largestTopicsLine,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "23 Nov 2026";
const SLUG = "leed-green-associate-readiness-check";
const config = requireMockConfig(SLUG);

export const leedGreenAssociateEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `The exam is now based on LEED v5, so check that your study materials are too. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then work through the Exam Specifications and Exam References in GBCI's candidate handbook. Drill credit names, thresholds and definitions in the [LEED Green Associate Anki deck](/decks/leed-green-associate-anki-deck).`,
  sections: [
    {
      heading: "LEED Green Associate exam facts: length, score, fee and delivery",
      paragraphs: [
        "GBCI (Green Business Certification Inc.) administers the LEED Green Associate credential for USGBC. It is the foundational LEED credential and, for many, the step before a LEED AP with specialty.",
      ],
      bullets: [
        "**Length:** **100 multiple-choice questions** in **two hours**.",
        "**Passing score:** **170 out of 200**.",
        "**Fee:** $250, or $200 for USGBC members and $100 for verified students. One registration covers one attempt.",
        "**Eligibility:** none. The exam is open to all; GBCI recommends some exposure to LEED and green building first.",
        "**Delivery:** at a Prometric test center or remotely proctored online through Prometric's ProProctor.",
        "**Rules:** closed-book. You can change answers, skip questions and flag them for review. Rescheduling is allowed up to 3 days before the exam (fees may apply).",
        "**Language and units:** English only for now; GBCI expects translated versions in mid-2027. Measurements show imperial first with metric in parentheses.",
      ],
    },
    {
      heading: "Which LEED version the exam covers, and what it tests",
      paragraphs: [
        "USGBC states that the Green Associate exam is **currently based on LEED v5**. The candidate handbook's Exam Specifications set out the topics; its Exam References list the sources the questions were written from.",
        "The exam follows the structure of the rating system. This check groups items into these areas, led by " +
          `${largestTopicsLine(config)}:`,
      ],
      bullets: [
        `**${topicLabel(config, "integrative-process")}:** how LEED certification works, project roles and the integrative design process.`,
        `**${topicLabel(config, "location-transportation")}:** site selection, density, transit access and reducing car dependence.`,
        `**${topicLabel(config, "sites-water")}:** rainwater management, heat island reduction, and indoor, outdoor and process water use.`,
        `**${topicLabel(config, "energy-atmosphere")}:** commissioning, energy performance, renewable energy and refrigerant management.`,
        `**${topicLabel(config, "materials-ieq")}:** life-cycle impacts, waste, ventilation, daylight and occupant comfort.`,
      ],
    },
    {
      heading: "Keeping the credential after you pass",
      paragraphs: [
        "LEED Green Associates must earn **15 continuing education hours within 2 years** of earning the credential to keep it active.",
      ],
    },
    {
      heading: "A 3-week LEED Green Associate study plan",
      paragraphs: [
        `**Week 1:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then the LEED process and integrative process: certification levels, roles, and how credits and prerequisites differ.`,
        "**Week 2:** Location and transportation, sustainable sites, water efficiency, and energy and atmosphere. Make one card per credit intent and key threshold and drill them in the [Anki deck](/decks/leed-green-associate-anki-deck).",
        `**Week 3:** Materials, resources and indoor environmental quality, then the full ${config.questionCount}-question / ${config.durationMinutes}-minute check twice on fresh draws. Access: ${mockAccessLine(config)}. Before paying for extra materials, read [whether free resources are enough for LEED GA](/blog/can-you-pass-leed-ga-free-resources-only).`,
      ],
    },
    {
      heading: "What trips LEED Green Associate candidates",
      paragraphs: [],
      bullets: [
        "Studying from LEED v4 materials when the exam is based on LEED v5.",
        "Memorizing credit names without knowing each credit's intent.",
        "Mixing up prerequisites, which every project must meet, with optional credits that earn points.",
        "Skipping the system check before a remotely proctored exam.",
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the LEED Green Associate exam?",
      answer:
        "100 multiple-choice questions in two hours. The passing score is 170 out of 200 (USGBC, checked 23 Nov 2026).",
    },
    {
      question: "How much does the LEED Green Associate exam cost?",
      answer: "$250, or $200 for USGBC members and $100 for verified students. The fee covers one attempt.",
    },
    {
      question: "Is the LEED Green Associate exam based on LEED v4 or v5?",
      answer: "USGBC says the exam is currently based on LEED v5.",
    },
    {
      question: "Can I take the LEED Green Associate exam online?",
      answer: "Yes. You can test at a Prometric center or remotely proctored online with Prometric's ProProctor.",
    },
    {
      question: "How do I keep my LEED Green Associate credential?",
      answer: "Earn 15 continuing education hours within 2 years of earning the credential.",
    },
    {
      question: "How long is the UniPrep2Go LEED Green Associate practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "USGBC — LEED Green Associate credential",
      url: "https://www.usgbc.org/credentials/leed-green-associate",
      checked: CHECKED,
    },
    {
      label: "USGBC Help Center — About the LEED Green Associate exam",
      url: "https://usgbc.my.site.com/support/s/article/About-the-LEED-Green-Associate-exam",
      checked: CHECKED,
    },
    {
      label: "USGBC Help Center — Preparing for the LEED Green Associate exam (LEED v5)",
      url: "https://usgbc.my.site.com/support/s/article/Preparing-for-the-LEED-Green-Associate-exam",
      checked: CHECKED,
    },
  ],
};
