import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "sat-readiness-check";
const config = requireMockConfig(SLUG);

export const satEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Install College Board's Bluebook app well ahead of test day and take its full practice tests for the real adaptive experience. Use the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start here to see whether Reading and Writing or Math needs more work, and drill vocabulary and formulas in the [SAT Anki deck](/decks/sat-anki-deck).`,
  sections: [
    {
      heading: "How is the digital SAT structured?",
      paragraphs: ["College Board gives the digital SAT in two sections, each split into two equal modules:"],
      bullets: [
        "**Reading and Writing:** **54 questions** in **64 minutes** (two 32-minute modules).",
        "**Math:** **44 questions** in **70 minutes** (two 35-minute modules). Most questions are multiple choice; some ask you to enter your own answer.",
        "**Total:** **98 questions** in **2 hours 14 minutes**, plus a 10-minute break between the sections.",
      ],
    },
    {
      heading: "What does adaptive mean on the SAT?",
      paragraphs: [
        "College Board says the test adapts by module: based on how you do on the first module of a section, the second module is either more or less difficult. That means a strong first module matters. Accuracy early in each section opens the harder second module, which is where the higher scores are.",
        "Because of this, a fixed practice test like this one cannot predict your SAT score. Use it to find weak skills, and use Bluebook's full adaptive practice tests to estimate your score.",
      ],
    },
    {
      heading: "Scores, fees and dates",
      paragraphs: [
        "The SAT total score runs from **400 to 1600**, with **200–800** for each section. Through June 2027, College Board lists the registration fee as **$68**, with a $38 late registration fee; fee waivers are available.",
        "College Board's weekend test dates for the rest of the year are **5 December 2026**, then **6 March**, **1 May** and **5 June 2027**. Registration closes about two weeks before each date. You test in the Bluebook app on a Windows laptop or tablet, a Mac laptop, an iPad or a school-managed Chromebook, but not on a personal Chromebook or a phone. College Board recommends downloading Bluebook at least 30 days before test day.",
      ],
    },
    {
      heading: "What this check covers",
      paragraphs: ["This check follows the two SAT sections:"],
      bullets: [
        `**${topicLabel(config, "reading-and-writing")}:** craft and structure, information and ideas, standard English conventions, and expression of ideas.`,
        `**${topicLabel(config, "math")}:** algebra, advanced math, problem-solving and data analysis, and geometry and trigonometry.`,
      ],
    },
    {
      heading: "A 6-week plan",
      paragraphs: [
        `**Week 1:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start and one full Bluebook practice test; list the question types you miss most, by section.`,
        "**Weeks 2–3:** Reading and Writing: short passages daily, plus grammar rules and vocabulary in the [Anki deck](/decks/sat-anki-deck).",
        "**Weeks 4–5:** Math by topic, then mixed sets at the real pace of about a minute and a half per question.",
        `**Week 6:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws, then a second Bluebook test. Access: ${mockAccessLine(config)}.`,
      ],
    },
  ],
  faqs: [
    {
      question: "How long is the digital SAT?",
      answer: `2 hours 14 minutes for 98 questions, plus a 10-minute break (College Board, checked ${CHECKED}).`,
    },
    {
      question: "How many questions are in each SAT section?",
      answer: "Reading and Writing has 54 questions in 64 minutes; Math has 44 questions in 70 minutes.",
    },
    {
      question: "Is the SAT adaptive?",
      answer: "Yes, by module. Your performance on the first module of each section decides whether the second is more or less difficult.",
    },
    {
      question: "How much does the SAT cost?",
      answer: "$68 through June 2027, with a $38 late registration fee. Fee waivers are available.",
    },
    {
      question: "What is the SAT score range?",
      answer: "400–1600 in total, with 200–800 for each section.",
    },
    {
      question: "How long is the UniPrep2Go SAT practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes across both sections; it is not adaptive and is not College Board material. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    { label: "College Board — SAT structure", url: "https://satsuite.collegeboard.org/sat/whats-on-the-test/structure", checked: CHECKED },
    { label: "College Board — Understanding SAT scores", url: "https://satsuite.collegeboard.org/sat/scores/understanding-scores", checked: CHECKED },
    { label: "College Board — SAT test fees", url: "https://satsuite.collegeboard.org/sat/registration/fees-refunds/test-fees", checked: CHECKED },
    { label: "College Board — SAT dates and deadlines", url: "https://satsuite.collegeboard.org/sat/dates-deadlines", checked: CHECKED },
    { label: "College Board — Device readiness (Bluebook)", url: "https://satsuite.collegeboard.org/sat/device-readiness", checked: CHECKED },
  ],
};
