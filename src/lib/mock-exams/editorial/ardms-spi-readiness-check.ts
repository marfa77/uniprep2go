import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "ardms-spi-readiness-check";
const config = requireMockConfig(SLUG);

export const ardmsSpiEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `SPI is physics, so understanding beats memorising. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, rebuild weak areas from first principles (wavelength, frequency, resolution, Doppler), and drill formulas and terms in the [SPI Anki deck](/decks/ardms-spi-anki-deck).`,
  sections: [
    {
      heading: "What is the SPI exam?",
      paragraphs: [
        "The Sonography Principles and Instrumentation (SPI) exam is the physics exam behind every ARDMS credential. ARDMS is now a member community of Inteleos, which runs the exam. Inteleos says certification in sonography starts with SPI, and that the SPI exam is required for all ARDMS certification tracks.",
      ],
      bullets: [
        "**Format:** approximately **110 multiple-choice questions** in a little over **two hours**, plus a short survey.",
        "**Scoring:** pass/fail on a **300–700** scale; **555 or better** passes. Inteleos says it is not percentage or curve based.",
        "**Fee:** **$275**.",
        "**Availability:** you can apply and test year-round; results are posted to your Inteleos portal within about a week.",
      ],
    },
    {
      heading: "How does SPI fit with the specialty exams?",
      paragraphs: [
        "To earn an ARDMS credential you must pass both SPI and the matching specialty exam **within five years of each other**, in either order. Once you have passed SPI, you can add further ARDMS credentials without retaking it, as long as you keep your certification active.",
        "If you do not pass, Inteleos says you can reapply after three days, but you must wait **60 days** before retaking the exam.",
      ],
    },
    {
      heading: "What does SPI assess?",
      paragraphs: ["Inteleos lists these areas:"],
      bullets: [
        "physics of ultrasound, and clinical safety",
        "quality assurance",
        "knowledge of instrumentation and managing the transducer",
        "performing ultrasound exams and optimising sonographic images",
        "applying Doppler concepts",
      ],
    },
    {
      heading: "What trips SPI candidates",
      paragraphs: [
        "Most SPI mistakes come from treating physics as a list of facts instead of a set of relationships. If you know that frequency and wavelength are inversely related in a given medium, you can work out what happens to resolution and penetration without memorising each case separately. Learn the relationships first, then the numbers.",
      ],
      bullets: [
        "Mixing up axial and lateral resolution, and what improves each.",
        "Confusing the effects of changing frequency, depth and pulse repetition frequency on aliasing.",
        "Recognising an artifact by name but not knowing which assumption of the machine it breaks.",
      ],
    },
    {
      heading: "What this check covers",
      paragraphs: ["This check groups its questions into four areas:"],
      bullets: [
        `**${topicLabel(config, "physics-basics")}:** sound waves, propagation, attenuation and the parameters that link them.`,
        `**${topicLabel(config, "transducers-beam")}:** transducer construction, focusing, resolution and beam formation.`,
        `**${topicLabel(config, "doppler-hemodynamics")}:** the Doppler equation, spectral and colour Doppler, aliasing and flow.`,
        `**${topicLabel(config, "artifacts-safety")}:** common artifacts, quality assurance and bioeffects.`,
      ],
    },
    {
      heading: "A 6-week plan",
      paragraphs: [
        `**Weeks 1–2:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then wave parameters and propagation until you can explain each relationship in words.`,
        "**Weeks 3–4:** Transducers, resolution and image optimisation, with daily formula review in the [Anki deck](/decks/ardms-spi-anki-deck).",
        "**Week 5:** Doppler and haemodynamics, then artifacts and safety.",
        `**Week 6:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws and rework every miss. Access: ${mockAccessLine(config)}.`,
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the SPI exam?",
      answer: `Approximately 110 multiple-choice questions, taking a little over two hours (Inteleos, checked ${CHECKED}).`,
    },
    {
      question: "What score do I need to pass SPI?",
      answer: "555 or better on a 300–700 scale. Inteleos says the score is not percentage or curve based.",
    },
    {
      question: "How much does the SPI exam cost?",
      answer: "$275.",
    },
    {
      question: "Do I have to pass SPI before the specialty exam?",
      answer: "No. You must pass SPI and the matching specialty exam within five years of each other, in either order.",
    },
    {
      question: "How long must I wait to retake SPI?",
      answer: "You can reapply after three days, but you must wait 60 days before retaking the exam.",
    },
    {
      question: "How long is the UniPrep2Go SPI practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes; it is independent practice, not Inteleos material. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    { label: "Inteleos — Sonography Principles and Instrumentation (SPI)", url: "https://www.inteleos.org/exam/sonography-principles-and-instrumentation/", checked: CHECKED },
    { label: "Inteleos — ARDMS community", url: "https://www.inteleos.org/about/community/ardms/", checked: CHECKED },
  ],
};
