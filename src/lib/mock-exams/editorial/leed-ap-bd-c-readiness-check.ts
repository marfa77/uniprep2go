import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "leed-ap-bd-c-readiness-check";
const config = requireMockConfig(SLUG);

export const leedApBdcEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `First confirm which LEED version your exam covers in the specialty candidate handbook linked from USGBC's LEED AP page. Then take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, study prerequisites before credits, and drill requirements in the [LEED AP BD+C Anki deck](/decks/leed-ap-bd-c-anki-deck).`,
  sections: [
    {
      heading: "What is the LEED AP BD+C exam?",
      paragraphs: [
        "LEED AP Building Design + Construction is a LEED AP specialty from the U.S. Green Building Council (USGBC). It covers new construction and major renovations. USGBC gives these details:",
      ],
      bullets: [
        "**Prerequisite:** a current LEED Green Associate credential, or passing that exam at the same time, and age **18 or older**. Experience on LEED-registered projects is strongly recommended.",
        "**Format:** **100 multiple-choice questions** per exam section; you need **170 out of 200** to pass.",
        "**Delivery:** at a **Prometric** test centre or from home with remote proctoring. Translation aids are available for the BD+C exam.",
        "**Rescheduling:** allowed up to 3 days before the exam; fees may apply.",
      ],
    },
    {
      heading: "What does it cost?",
      paragraphs: [
        "USGBC lists two options. The **combined exam** (Green Associate plus specialty) costs **$550**, or **$400** for USGBC members. The **specialty-only** exam, for current Green Associates, costs **$350**, or **$250** for members.",
      ],
    },
    {
      heading: "Which LEED version is tested?",
      paragraphs: [
        "USGBC says LEED v5 is currently available for BD+C, ID+C and O+M, and that exams are now available for LEED v5. USGBC's public pages do not give a date for retiring older exams, so check the specialty candidate handbook for the version your exam uses before you buy study material.",
      ],
    },
    {
      heading: "What this check covers",
      paragraphs: ["This check groups BD+C content into five areas:"],
      bullets: [
        `**${topicLabel(config, "process-location")}:** the integrative process, site selection, density, and transportation.`,
        `**${topicLabel(config, "sites-water")}:** site assessment, rainwater management, and indoor and outdoor water use.`,
        `**${topicLabel(config, "energy-atmosphere")}:** commissioning, energy performance, metering and refrigerant management.`,
        `**${topicLabel(config, "materials-resources")}:** storage and collection of recyclables, construction waste and life-cycle impacts.`,
        `**${topicLabel(config, "indoor-environmental-quality")}:** indoor air quality, low-emitting materials, daylight and comfort.`,
      ],
    },
    {
      heading: "A 6-week plan",
      paragraphs: [
        `**Weeks 1–2:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then the handbook and all prerequisites; they apply to every project.`,
        "**Weeks 3–4:** Energy and atmosphere, then water and sites, with daily review in the [Anki deck](/decks/leed-ap-bd-c-anki-deck).",
        "**Week 5:** Materials, indoor environmental quality, and the integrative process.",
        `**Week 6:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws and review every miss by credit category. Access: ${mockAccessLine(config)}.`,
      ],
    },
    {
      heading: "After you pass",
      paragraphs: [
        "USGBC requires LEED APs with specialty to earn and report **30 continuing education hours**, 6 of them LEED-specific, in each two-year reporting period. If you still need the Green Associate, see [can you pass LEED GA with free resources](/blog/can-you-pass-leed-ga-free-resources-only).",
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the LEED AP BD+C exam?",
      answer: `100 multiple-choice questions per exam section, with 170 out of 200 needed to pass (USGBC, checked ${CHECKED}).`,
    },
    {
      question: "Do I need the LEED Green Associate first?",
      answer: "You need a current LEED Green Associate credential, or you can pass it at the same time with the combined exam.",
    },
    {
      question: "How much does the LEED AP BD+C exam cost?",
      answer: "The combined exam is $550 ($400 for members); the specialty-only exam is $350 ($250 for members).",
    },
    {
      question: "Can I take the LEED AP BD+C exam online?",
      answer: "Yes. USGBC offers remote proctored online exams as well as Prometric test centres.",
    },
    {
      question: "How do I maintain the credential?",
      answer: "Earn and report 30 continuing education hours, 6 of them LEED-specific, every two years.",
    },
    {
      question: "How long is the UniPrep2Go LEED AP BD+C practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes across five content areas; it is independent practice, not USGBC or GBCI material. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    { label: "USGBC — LEED AP with specialty", url: "https://www.usgbc.org/credentials/leed-ap", checked: CHECKED },
    { label: "USGBC — LEED credentials and maintenance", url: "https://www.usgbc.org/credentials", checked: CHECKED },
    { label: "USGBC — LEED v5", url: "https://www.usgbc.org/leed/v5", checked: CHECKED },
  ],
};
