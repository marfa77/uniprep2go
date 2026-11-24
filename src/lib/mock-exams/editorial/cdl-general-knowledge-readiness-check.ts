import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "cdl-general-knowledge-readiness-check";
const config = requireMockConfig(SLUG);

export const cdlGeneralKnowledgeEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Read the general knowledge chapters of your state's CDL manual first; your state writes the test from the federally approved question pool. Then take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, work on your weakest area, and aim well above the 80% federal minimum before you book.`,
  sections: [
    {
      heading: "What does federal law require for the general knowledge test?",
      paragraphs: [
        "Every state gives its own CDL knowledge tests, but federal rules in 49 CFR part 383 set the floor for all of them:",
      ],
      bullets: [
        "**Passing score:** at least **80%** correct on each knowledge test (49 CFR 383.135).",
        "**Questions:** states must build their tests from the **FMCSA pre-approved question pool** (49 CFR 383.133).",
        "**Length and time:** set by your state, so check your state's CDL manual.",
      ],
    },
    {
      heading: "How does it lead to a learner's permit?",
      paragraphs: [
        "Passing the general knowledge test is the first step to a **commercial learner's permit (CLP)**, which you need before your first CDL (49 CFR 383.25). Federal rules say:",
      ],
      bullets: [
        "you must be **18 or older** and hold a valid driver's licence from the state issuing the CLP;",
        "a CLP is valid for **no more than one year** from first issue without retaking the knowledge tests;",
        "you cannot take the CDL skills test in the **first 14 days** after your CLP is first issued;",
        "the only endorsements allowed on a CLP are passenger, school bus and tank vehicle (49 CFR 383.93).",
      ],
    },
    {
      heading: "Which separate tests matter for your licence?",
      paragraphs: [
        "Air brakes and combination vehicles have their own knowledge portions, each scored at 80%. If you fail air brakes and are still issued a CLP or CDL, it carries an **air brake restriction**; if you fail combination vehicles, you **cannot be issued a Group A** CLP or CDL (49 CFR 383.135). Plan those tests with the general knowledge test, and see the [combination vehicles practice test](/mock-exams/cdl-combination-readiness-check).",
      ],
    },
    {
      heading: "What this check covers",
      paragraphs: ["This check groups general knowledge questions into four areas:"],
      bullets: [
        `**${topicLabel(config, "vehicle-systems")}:** pre-trip inspection and the systems you must check.`,
        `**${topicLabel(config, "safe-driving")}:** seeing, communicating, speed and space management.`,
        `**${topicLabel(config, "cargo")}:** securing cargo and weight rules.`,
        `**${topicLabel(config, "emergencies-rules")}:** hazards, emergencies and driving rules.`,
      ],
    },
    {
      heading: "A 2-week plan",
      paragraphs: [
        `**Days 1–3:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then the general knowledge chapters of your state manual.`,
        "**Days 4–10:** One area a day, starting with your weakest; spend extra time on inspection, which runs through the whole manual, and say each inspection step out loud.",
        `**Days 11–14:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws until you score comfortably above 80%. Access: ${mockAccessLine(config)}. More detail is in the [CDL General Knowledge guide](/blog/cdl-general-knowledge-test-50-questions-what-to-expect).`,
      ],
    },
  ],
  faqs: [
    {
      question: "What score do I need on the CDL general knowledge test?",
      answer: `At least 80% correct, under federal rule 49 CFR 383.135 (checked ${CHECKED}).`,
    },
    {
      question: "How many questions are on the CDL general knowledge test?",
      answer: "Your state sets the length, using the FMCSA pre-approved question pool. Check your state's CDL manual.",
    },
    {
      question: "How long is a CDL learner's permit valid?",
      answer: "No more than one year from first issue without retaking the knowledge tests.",
    },
    {
      question: "How soon can I take the skills test?",
      answer: "Not in the first 14 days after your CLP is first issued.",
    },
    {
      question: "Are air brakes on the general knowledge test?",
      answer: "Air brakes are tested separately. Failing that portion means an air brake restriction on your CLP or CDL.",
    },
    {
      question: "How long is the UniPrep2Go CDL general knowledge practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes; it is independent practice, not a state test. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    { label: "49 CFR 383.25 — Commercial learner's permit", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-383/subpart-B/section-383.25", checked: CHECKED },
    { label: "49 CFR 383.93 — Endorsements", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-383/subpart-F/section-383.93", checked: CHECKED },
    { label: "49 CFR 383.133 — Test methods", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-383/subpart-H/section-383.133", checked: CHECKED },
    { label: "49 CFR 383.135 — Passing knowledge and skills tests", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-383/subpart-H/section-383.135", checked: CHECKED },
  ],
};
