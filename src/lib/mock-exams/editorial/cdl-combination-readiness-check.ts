import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "cdl-combination-readiness-check";
const config = requireMockConfig(SLUG);

export const cdlCombinationEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Read the combination vehicles section of your state's CDL manual, then take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start. The combination knowledge test decides whether you can hold a Group A licence at all, so aim well above the 80% federal minimum before you book.`,
  sections: [
    {
      heading: "Why does the combination test matter so much?",
      paragraphs: [
        "Federal rules make the combination vehicles knowledge test the gate to a **Group A** CDL. Under 49 CFR 383.135, an applicant who scores less than 80% on the combination vehicle portion **must not be issued a Group A CLP or CDL**. Pass it, and you can go on to train and test in a combination vehicle; fail it, and the highest licence open to you is Group B or C.",
      ],
      bullets: [
        "**Group A (combination vehicle):** any combination with a gross combination weight rating of **26,001 pounds or more**, where the towed vehicle or vehicles have a GVWR of **more than 10,000 pounds** (49 CFR 383.91).",
        "**Passing score:** at least **80%** on each knowledge test.",
        "**Questions:** your state builds the test from the FMCSA pre-approved question pool, so your state's CDL manual is the right study source.",
      ],
    },
    {
      heading: "Which restrictions can end up on a Group A licence?",
      paragraphs: [
        "How you test affects what you may drive. 49 CFR 383.95 lists the restrictions states must add:",
      ],
      bullets: [
        "**Air brake:** if you fail the air brake knowledge portion, or take the skills test in a vehicle without air brakes, you are restricted from driving a CMV with any type of air brakes.",
        "**Manual transmission:** if you take the skills test with an automatic transmission, you are restricted from vehicles with a manual transmission.",
        "**Tractor-trailer:** if you take the Group A skills test in a combination connected by a pintle hook or other non-fifth-wheel connection, you are restricted from tractor-trailers connected by a fifth wheel.",
      ],
    },
    {
      heading: "Doubles, triples and the next step",
      paragraphs: [
        "Pulling double or triple trailers needs the separate **T endorsement**, which is a knowledge test only and cannot be added to a learner's permit; see the [doubles/triples practice test](/mock-exams/cdl-doubles-triples-readiness-check). For the general knowledge test that comes first, read the [CDL General Knowledge guide](/blog/cdl-general-knowledge-test-50-questions-what-to-expect).",
      ],
    },
    {
      heading: "What this check covers",
      paragraphs: ["This check groups its questions into four combination-vehicle areas:"],
      bullets: [
        `**${topicLabel(config, "coupling")}:** coupling and uncoupling steps, checking the fifth wheel, kingpin and locking jaws.`,
        `**${topicLabel(config, "handling")}:** off-tracking, braking with a trailer, turning and backing.`,
        `**${topicLabel(config, "inspection")}:** air lines, glad hands, the tractor protection valve and the trailer supply valve.`,
        `**${topicLabel(config, "safety")}:** rollover risk, jackknifing and trailer skids, and how to prevent them.`,
      ],
    },
    {
      heading: "A 2-week plan",
      paragraphs: [
        `**Days 1–3:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then read the combination vehicles section of your state's manual. Write out the coupling sequence from memory.`,
        "**Days 4–9:** One area a day. Spend extra time on the air system of a combination (supply and emergency lines, the tractor protection valve), which is where many questions come from.",
        `**Days 10–14:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws until you score comfortably above 80%. Access: ${mockAccessLine(config)}.`,
      ],
    },
  ],
  faqs: [
    {
      question: "What happens if I fail the combination vehicles test?",
      answer: `You cannot be issued a Group A CLP or CDL. Federal rules bar Group A for anyone scoring under 80% on the combination vehicle portion (49 CFR 383.135, checked ${CHECKED}).`,
    },
    {
      question: "What score do I need on the combination test?",
      answer: "At least 80% correct, the federal minimum for every CDL knowledge test.",
    },
    {
      question: "What counts as a Group A vehicle?",
      answer: "Any combination with a gross combination weight rating of 26,001 pounds or more, towing a vehicle or vehicles with a GVWR over 10,000 pounds.",
    },
    {
      question: "What is the tractor-trailer restriction?",
      answer: "If you take the Group A skills test in a combination connected by a pintle hook or other non-fifth-wheel connection, you cannot drive fifth-wheel tractor-trailers that require Group A.",
    },
    {
      question: "How many questions are on the combination test?",
      answer: "Each state sets the length, using the FMCSA pre-approved question pool. Check your state's CDL manual.",
    },
    {
      question: "How long is the UniPrep2Go combination vehicles practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes; it is independent practice, not a state test. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    { label: "49 CFR 383.91 — Commercial motor vehicle groups", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-383/subpart-F/section-383.91", checked: CHECKED },
    { label: "49 CFR 383.95 — Restrictions", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-383/subpart-F/section-383.95", checked: CHECKED },
    { label: "49 CFR 383.133 — Test methods", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-383/subpart-H/section-383.133", checked: CHECKED },
    { label: "49 CFR 383.135 — Passing knowledge and skills tests", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-383/subpart-H/section-383.135", checked: CHECKED },
  ],
};
