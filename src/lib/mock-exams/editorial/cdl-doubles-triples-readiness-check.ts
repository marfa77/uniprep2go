import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "cdl-doubles-triples-readiness-check";
const config = requireMockConfig(SLUG);

export const cdlDoublesTriplesEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Read the doubles and triples section of your state's CDL manual first; your state writes the test from the federally approved question pool. Then take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, drill coupling steps and handling terms in the [doubles/triples Anki deck](/decks/cdl-doubles-triples-anki-deck), and aim well above the 80% federal minimum.`,
  sections: [
    {
      heading: "What is the double/triple trailers endorsement?",
      paragraphs: [
        "To drive a commercial vehicle pulling double or triple trailers, you need the **double/triple trailers endorsement** (shown as **T**) on your CDL. Federal rules in 49 CFR 383.93 list it as one of five CDL endorsements, and the state issues it only to drivers who pass the required test.",
      ],
      bullets: [
        "**Test required:** a **knowledge test only**. Unlike the passenger and school bus endorsements, there is no separate skills test for T (49 CFR 383.93(c)).",
        "**Not on a learner's permit:** the only endorsements allowed on a commercial learner's permit (CLP) are passenger, school bus and tank vehicle, so T is added to a full CDL.",
        "**Passing score:** at least **80%** correct, the federal minimum for every CDL knowledge test (49 CFR 383.135).",
      ],
    },
    {
      heading: "What must you know for the T endorsement?",
      paragraphs: ["49 CFR 383.115 lists the knowledge every applicant must have:"],
      bullets: [
        "procedures for **assembly and hookup** of the units;",
        "proper **placement of the heaviest trailer**;",
        "**handling and stability**: off-tracking, response to steering, sensory feedback, braking, oscillatory sway, rollover in steady turns and yaw stability in steady turns;",
        "**problems in traffic** the vehicle creates for other motorists: slower speeds on steep grades, longer passing times, blocking entry on freeways, splash and spray, aerodynamic buffeting, view blockages and lateral placement;",
        "other operating practices and procedures.",
      ],
    },
    {
      heading: "How are CDL knowledge tests built?",
      paragraphs: [
        "Your state gives the test, but federal rules set how it is built: questions come from an FMCSA pre-approved pool, each test has multiple-choice questions with three answer options, and each new version must contain at least 25% new questions. That is why your state's CDL manual is the best study source: it is written to the same federal knowledge list. For the general knowledge test that comes first, see the [CDL General Knowledge guide](/blog/cdl-general-knowledge-test-50-questions-what-to-expect).",
      ],
    },
    {
      heading: "What this check covers",
      paragraphs: ["This check groups its questions into four areas that follow the federal list:"],
      bullets: [
        `**${topicLabel(config, "coupling")}:** coupling and uncoupling sequence, converter dollies, and checking the hookup.`,
        `**${topicLabel(config, "handling")}:** off-tracking, crack-the-whip and rollover risk, braking and following distance.`,
        `**${topicLabel(config, "inspection")}:** what to check on the extra trailers, air lines and shut-off valves.`,
        `**${topicLabel(config, "safety")}:** traffic problems, weather and the limits of a longer combination.`,
      ],
    },
    {
      heading: "A 2-week plan",
      paragraphs: [
        `**Days 1–3:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then your state manual's doubles/triples section. Write out the coupling sequence from memory.`,
        "**Days 4–9:** One area a day, with daily review in the [Anki deck](/decks/cdl-doubles-triples-anki-deck). Spend extra time on handling and stability; it is the longest item on the federal list.",
        `**Days 10–14:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws until you score comfortably above 80%. Access: ${mockAccessLine(config)}.`,
      ],
    },
  ],
  faqs: [
    {
      question: "Is there a skills test for the doubles/triples endorsement?",
      answer: `No. Federal rules require only a knowledge test for the double/triple trailers endorsement (49 CFR 383.93, checked ${CHECKED}).`,
    },
    {
      question: "What score do I need on the doubles/triples test?",
      answer: "At least 80% correct, the federal minimum for CDL knowledge tests (49 CFR 383.135).",
    },
    {
      question: "Can I get the T endorsement on my learner's permit?",
      answer: "No. Only the passenger, school bus and tank vehicle endorsements are allowed on a commercial learner's permit.",
    },
    {
      question: "What does the doubles/triples test cover?",
      answer: "Hooking up the units, where to place the heaviest trailer, handling and stability, the traffic problems a longer combination creates, and other operating practices (49 CFR 383.115).",
    },
    {
      question: "How many questions are on the doubles/triples test?",
      answer: "Each state sets the length, using the federally approved question pool. Check your state's CDL manual.",
    },
    {
      question: "How long is the UniPrep2Go doubles/triples practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes; it is independent practice, not a state test. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    { label: "49 CFR 383.93 — Endorsements", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-383/subpart-F/section-383.93", checked: CHECKED },
    { label: "49 CFR 383.115 — Double/triple trailers endorsement", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-383/subpart-G/section-383.115", checked: CHECKED },
    { label: "49 CFR 383.133 — Test methods", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-383/subpart-H/section-383.133", checked: CHECKED },
    { label: "49 CFR 383.135 — Passing knowledge and skills tests", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-383/subpart-H/section-383.135", checked: CHECKED },
  ],
};
