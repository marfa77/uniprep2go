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
const SLUG = "leed-ap-om-readiness-check";
const config = requireMockConfig(SLUG);

export const leedApOmEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Decide whether you are sitting the specialty exam alone (you already hold LEED Green Associate) or the combined exam. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then work through the O+M rating system by credit category and drill thresholds in the [LEED AP O+M Anki deck](/decks/leed-ap-om-anki-deck).`,
  sections: [
    {
      heading: "LEED AP O+M exam facts: format, score, fee and prerequisites",
      paragraphs: [
        "GBCI administers the LEED AP with specialty credentials for USGBC. LEED AP Operations + Maintenance (O+M) is for professionals who run and improve existing buildings.",
      ],
      bullets: [
        "**Two ways to sit it:** the **specialty-only** exam (100 multiple-choice questions) if you already hold LEED Green Associate, or the **combined** exam, which adds the Green Associate section (100 questions per section).",
        "**Passing score:** **170 out of 200**.",
        "**Fees:** specialty only $350 ($250 for USGBC members); combined $550 ($400 for members).",
        "**Prerequisites:** a current LEED Green Associate credential, or passing that exam at the same sitting, and age 18 or older. USGBC strongly recommends experience on LEED-registered projects.",
        "**Delivery:** at a Prometric test center or remotely proctored online from home.",
        "**Rescheduling:** permitted up to 3 days before the exam; fees may apply.",
        "**Languages:** translation aids are available for the O+M exam in Arabic, Brazilian Portuguese, Chinese, French and Spanish.",
      ],
    },
    {
      heading: "What the O+M exam tests",
      paragraphs: [
        "The specialty exam goes deeper than Green Associate into how an existing building earns and keeps certification through its operations: performance data, policies, and ongoing improvement. This check groups its questions into five areas, led by " +
          `${largestTopicsLine(config)}:`,
      ],
      bullets: [
        `**${topicLabel(config, "process-integrative")}:** certification process, performance periods and team roles in an operating building.`,
        `**${topicLabel(config, "location-sites")}:** transportation performance, site management and maintenance practices.`,
        `**${topicLabel(config, "water-efficiency")}:** water metering, indoor and outdoor use, and performance tracking.`,
        `**${topicLabel(config, "energy-atmosphere")}:** energy performance, metering, commissioning of existing systems and refrigerant management.`,
        `**${topicLabel(config, "materials-ieq")}:** purchasing and waste policies, cleaning, air quality and occupant comfort.`,
      ],
    },
    {
      heading: "Keeping your LEED AP credential",
      paragraphs: [
        "LEED APs must earn **30 continuing education hours within 2 years** of earning the credential to keep it active.",
      ],
    },
    {
      heading: "A 4-week LEED AP O+M study plan",
      paragraphs: [
        `**Week 1:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start. If you are taking the combined exam, refresh the Green Associate basics with the [LEED Green Associate practice test](/mock-exams/leed-green-associate-readiness-check).`,
        "**Week 2:** Energy and atmosphere, the area with the most at stake in operating buildings: metering, benchmarking, commissioning and refrigerant management.",
        "**Week 3:** Water, sites, materials and indoor environmental quality: the policies, plans and tracking an existing building needs. Drill thresholds in the [Anki deck](/decks/leed-ap-om-anki-deck).",
        `**Week 4:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check twice on fresh draws and review every explanation. Access: ${mockAccessLine(config)}.`,
      ],
    },
    {
      heading: "What trips LEED AP O+M candidates",
      paragraphs: [],
      bullets: [
        "Answering with new-construction (BD+C) logic when the question is about an operating building.",
        "Mixing up prerequisites, which every project must meet, with credits that earn points.",
        "Booking the specialty-only exam without a current Green Associate credential.",
        "Skipping the system check before a remotely proctored exam.",
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the LEED AP O+M exam?",
      answer:
        "The specialty-only exam has 100 multiple-choice questions. The combined exam has two sections of 100: Green Associate and the O+M specialty (USGBC, checked 23 Nov 2026).",
    },
    {
      question: "What score do I need to pass LEED AP O+M?",
      answer: "170 out of 200.",
    },
    {
      question: "How much does the LEED AP O+M exam cost?",
      answer: "Specialty only: $350, or $250 for USGBC members. Combined with Green Associate: $550, or $400 for members.",
    },
    {
      question: "Do I need LEED Green Associate first?",
      answer:
        "You need a current LEED Green Associate credential, or you can pass that exam at the same sitting by taking the combined exam.",
    },
    {
      question: "How do I maintain the LEED AP credential?",
      answer: "Earn 30 continuing education hours within 2 years of earning the credential.",
    },
    {
      question: "How long is the UniPrep2Go LEED AP O+M practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes across five areas. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "USGBC — LEED AP with specialty",
      url: "https://www.usgbc.org/credentials/leed-ap",
      checked: CHECKED,
    },
    {
      label: "USGBC — LEED Green Associate",
      url: "https://www.usgbc.org/credentials/leed-green-associate",
      checked: CHECKED,
    },
  ],
};
