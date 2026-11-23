import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicQuestions,
} from "./config-copy";

const CHECKED = "23 Nov 2026";
const SLUG = "epa-608-readiness-check";
const config = requireMockConfig(SLUG);
const perGroup = topicQuestions(config, "core");

export const epa608Editorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Decide which certification your work needs, since Universal requires all four groups. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, learn Core first (every test includes it), then study the type groups you need. Drill dates, pressures and leak-rate thresholds in the [EPA 608 Anki deck](/decks/hvac-epa-608-anki-deck).`,
  sections: [
    {
      heading: "Which EPA 608 certification you need",
      paragraphs: [
        "Under the Clean Air Act Section 608 rules (40 CFR 82.161), anyone who could reasonably be expected to open the refrigerant circuit while maintaining, servicing, repairing or disposing of appliances must pass a certification test from an **EPA-approved certifying program**. EPA does not test technicians or issue cards itself.",
      ],
      bullets: [
        "**Type I:** small appliances.",
        "**Type II:** medium-, high- and very-high-pressure appliances (except small appliances and MVACs).",
        "**Type III:** low-pressure appliances.",
        "**Universal:** all of the above.",
        "Apprentices are exempt while closely and continually supervised by a certified technician.",
      ],
    },
    {
      heading: "EPA 608 test format and passing scores",
      paragraphs: [
        "Appendix D to Subpart F sets the standards every certifying program must follow:",
      ],
      bullets: [
        "**Questions:** each test includes **25 questions from the Core group** and **25 from each relevant technical group**. A Universal test has **100 questions**: 25 Core plus 25 each from Types I, II and III.",
        "**Passing score:** **70%** for closed-book Type I, Type II, Type III and Universal tests; **84%** for Type I tests taken in the mail-in format.",
        "**Proctoring:** Type II, Type III and Universal require a **closed-book, proctored** test in a secure environment. Type I-only programs may use an on-site or mail-in format, but a mail-in Type I test cannot count toward Universal. A Core test taken open-book cannot be used for Universal either.",
        "**Building up to Universal:** you can take it all at once or combine passing scores on separate Type I, II and III tests.",
        "**Card and records:** the program must issue a wallet-sized card within 30 days of the test. Keep a copy of your certificate at your place of business until three years after you stop working as a technician.",
        "**Validity:** Section 608 technician certifications **do not expire**.",
      ],
    },
    {
      heading: "What the Core and type sections cover",
      paragraphs: [],
      bullets: [
        "**Core:** ozone depletion, the Clean Air Act and Montreal Protocol, Section 608 rules and the venting prohibition, substitute refrigerants and oils, refrigeration basics, recover / recycle / reclaim, recovery and evacuation techniques, safety and shipping.",
        "**Type I:** recovery requirements and techniques for small appliances.",
        "**Type II:** leak detection, leak repair and recovery requirements for high-pressure equipment, including the 15 lb and 200 lb thresholds.",
        "**Type III:** leak detection, leak repair, recovery, recharging and safety for low-pressure equipment.",
        `This check gives each group the same weight as the real test: ${perGroup} questions per group.`,
      ],
    },
    {
      heading: "A 1-week EPA 608 study plan",
      paragraphs: [
        `**Days 1–2:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then Core. Core counts on every test and blocks Universal if you take it open-book.`,
        "**Days 3–5:** The type groups you need. For each, write the recovery requirements and leak-repair rules on one page, and drill them in the [Anki deck](/decks/hvac-epa-608-anki-deck).",
        `**Days 6–7:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check and aim well above 70% in every group, not just overall. Access: ${mockAccessLine(config)}. For what test day looks like, read [EPA 608 practice test: what to expect](/blog/epa-608-practice-test-what-to-expect).`,
      ],
    },
    {
      heading: "What trips EPA 608 candidates",
      paragraphs: [],
      bullets: [
        "Passing overall but failing one group; each group is scored separately.",
        "Taking an open-book Core or mail-in Type I test and expecting it to count for Universal.",
        "Confusing recover, recycle and reclaim.",
        "Studying only one type when the job needs Universal.",
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the EPA 608 exam?",
      answer:
        "25 Core questions plus 25 for each technical type you test for. A Universal test has 100 questions (40 CFR Part 82, Subpart F, Appendix D; checked 23 Nov 2026).",
    },
    {
      question: "What is the passing score for EPA 608?",
      answer:
        "70% on closed-book Type I, Type II, Type III and Universal tests. Mail-in Type I tests require 84%.",
    },
    {
      question: "Does EPA 608 certification expire?",
      answer: "No. EPA states that Section 608 technician certification credentials do not expire.",
    },
    {
      question: "Can I take the EPA 608 test open-book?",
      answer:
        "Only Type I-only programs may use a mail-in format. Type II, Type III and Universal require a closed-book, proctored test, and an open-book Core or mail-in Type I test cannot count toward Universal.",
    },
    {
      question: "Who gives the EPA 608 test?",
      answer: "EPA-approved certifying organizations. EPA itself does not administer tests or issue certification cards.",
    },
    {
      question: "How long is the UniPrep2Go EPA 608 practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes across Core and Types I–III. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "eCFR — 40 CFR 82.161 Technician certification",
      url: "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-F/section-82.161",
      checked: CHECKED,
    },
    {
      label: "eCFR — Appendix D to Subpart F of Part 82 (test standards and passing scores)",
      url: "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-F/appendix-Appendix%20D%20to%20Subpart%20F%20of%20Part%2082",
      checked: CHECKED,
    },
    {
      label: "US EPA — Section 608 technician certification requirements",
      url: "https://www.epa.gov/section608/section-608-technician-certification-requirements",
      checked: CHECKED,
    },
    {
      label: "US EPA — Section 608 test topics",
      url: "https://www.epa.gov/section608/test-topics",
      checked: CHECKED,
    },
  ],
};
