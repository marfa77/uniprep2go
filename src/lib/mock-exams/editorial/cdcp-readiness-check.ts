import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "23 Nov 2026";
const SLUG = "cdcp-readiness-check";
const config = requireMockConfig(SLUG);

export const cdcpMockEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `CDCP training is mandatory, so book the course first and use this check before and after it. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start to see which infrastructure area is weakest, then drill terms in the [CDCP Anki deck](/decks/cdcp-anki-deck).`,
  sections: [
    {
      heading: "CDCP exam facts: format, pass mark and training",
      paragraphs: [
        "The Certified Data Centre Professional (CDCP) is EPI's foundation data centre credential, accredited by EXIN, which lists it as the EXIN EPI CDCP. It is designed to test understanding of the key components of a data centre.",
      ],
      bullets: [
        "**Exam:** **40 multiple-choice questions** in **1 hour**, closed book, with no electronic equipment allowed.",
        "**Pass mark:** **27 of 40**; EXIN lists it as 68%.",
        "**Training:** mandatory. EPI's CDCP course runs for **2 days**, delivered instructor-led, as virtual instructor-led training, or on demand. Course material comes from the trainer.",
        "**Prerequisites:** none. EPI suggests the course suits people with one or two years in a data centre or facilities role.",
        "**Validity:** **3 years**, after which recertification is required through EPI's recertification program.",
        "**Level:** EXIN classes it as Foundation level (2 ECTS credits). Exam languages listed by EXIN include English, Chinese, Danish, Dutch, German, Italian, Japanese, Spanish and Portuguese.",
      ],
    },
    {
      heading: "What the CDCP course and exam cover",
      paragraphs: [
        "CDCP is broad rather than deep: enough to work in or alongside a data centre and understand why each system is designed the way it is. This check matches the exam's 40 questions and splits them evenly across five areas:",
      ],
      bullets: [
        `**${topicLabel(config, "site-standards-building")}:** site selection, building considerations and the standards a facility is designed to.`,
        `**${topicLabel(config, "power-emf-distribution")}:** utility feeds, UPS, generators, distribution and redundancy.`,
        `**${topicLabel(config, "cooling-water-thermal")}:** heat load, airflow, cooling systems and thermal management.`,
        `**${topicLabel(config, "fire-security-network")}:** detection and suppression, physical security and cabling.`,
        `**${topicLabel(config, "operations-management")}:** monitoring, maintenance and operating practice.`,
      ],
    },
    {
      heading: "CDCP or DCDC: which comes first?",
      paragraphs: [
        "CDCP has no prerequisites, while BICSI's Data Center Design Consultant (DCDC) requires a current RCDD, or two years of relevant work plus a BICSI credential or relevant degree, or three years of relevant work within the past seven. If you are new to data centres, CDCP is the one you can start without meeting an eligibility option. The full comparison is in [CDCP vs DCDC](/blog/cdcp-vs-dcdc-data-center-certification-first-step).",
      ],
    },
    {
      heading: "A 2-week plan around the CDCP course",
      paragraphs: [
        `**Before the course:** take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start and learn the vocabulary for power and cooling so the trainer's material lands on day one. Review [CDCP flashcards](/decks/cdcp-anki-deck) daily.`,
        "**During the course:** after each day, write a one-page summary of what each system does and how it fails.",
        `**Before the exam:** sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check, which mirrors the official length and time, and aim comfortably above 27 of 40. Access: ${mockAccessLine(config)}.`,
      ],
    },
    {
      heading: "What trips CDCP candidates",
      paragraphs: [],
      bullets: [
        "Treating redundancy levels as labels to memorize rather than understanding what each protects against.",
        "Leaving operations and maintenance until last; they are part of the exam, not an add-on.",
        "Running out of time: 40 questions in 60 minutes is about 90 seconds each.",
        "Relying on general IT knowledge for facility questions about power, cooling and fire protection.",
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the CDCP exam?",
      answer: "40 multiple-choice questions in 1 hour, closed book (EXIN and EPI, checked 23 Nov 2026).",
    },
    {
      question: "What is the CDCP pass mark?",
      answer: "27 of 40. EXIN lists the pass mark as 68%.",
    },
    {
      question: "Is CDCP training mandatory?",
      answer: "Yes. EXIN lists training as mandatory; EPI's CDCP course is 2 days, instructor-led, virtual or on demand.",
    },
    {
      question: "Does CDCP have prerequisites?",
      answer: "No. EPI suggests one or two years of data centre or facilities experience is helpful but not required.",
    },
    {
      question: "How long is CDCP valid?",
      answer: "3 years, after which recertification is required.",
    },
    {
      question: "How long is the UniPrep2Go CDCP practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes, the same length as the official exam. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "EXIN — EXIN EPI Certified Data Centre Professional",
      url: "https://www.exin.com/data-protection-security/certified-data-centre-professional/",
      checked: CHECKED,
    },
    {
      label: "EPI — data centre training and certification",
      url: "https://www.epi-ap.com/",
      checked: CHECKED,
    },
    {
      label: "BICSI — DCDC certification",
      url: "https://www.bicsi.org/education-certification/certification/dcdc",
      checked: CHECKED,
    },
  ],
};
