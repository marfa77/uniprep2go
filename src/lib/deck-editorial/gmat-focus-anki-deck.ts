import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const gmatDeckEditorial: DeckEditorialBundle = {
  slug: "gmat-focus-anki-deck",
  mockSlug: "gmat-focus-readiness-check",
  sections: [
    {
      heading: "How the GMAT cards split across the three sections",
      paragraphs: [
        "GMAC's exam has three sections of equal weight in your total score. The cards are tagged by section and question type so you can filter to what you miss:",
      ],
      bullets: [
        "**Quantitative Reasoning (21 Problem Solving questions, no calculator):** number properties, ratios, rates, percentages and algebra shortcuts that save time when you can't use a calculator.",
        "**Verbal Reasoning (23 questions):** Critical Reasoning argument patterns (assumption, strengthen, weaken, flaw) and Reading Comprehension question types such as main idea, inference and structure.",
        "**Data Insights (20 questions, on-screen calculator):** the decision rules for Data Sufficiency, and how to approach Multi-Source Reasoning, Table Analysis, Graphics Interpretation and Two-Part Analysis.",
      ],
    },
    {
      heading: "How to use spaced repetition for the GMAT",
      paragraphs: [
        "The GMAT rewards fast recognition: spotting the argument type, the sufficiency trap or the shortcut in the first seconds. Spaced repetition trains that recognition; timed sets train applying it.",
        "**Plan:** run the free start of the [GMAT practice test](/mock-exams/gmat-focus-readiness-check), then add 15–25 cards a day from your weakest section and review daily. Turn every practice miss into a card that names the pattern you didn't see, not the specific numbers.",
        "For Quant, put a short problem on the front and the fastest method on the back, so reviews train choosing an approach. For Critical Reasoning, put the argument on the front and its conclusion, assumption and argument type on the back.",
        "In your final two weeks, stop adding cards and take GMAC's free official practice exams in the section order you plan to use. Section timing, the review-and-edit rule and retake limits are on the practice test page.",
      ],
    },
  ],
  sources: [
    { label: "GMAC (mba.com) — GMAT exam content", url: "https://www.mba.com/exams/gmat-exam/about/exam-content", checked: CHECKED },
  ],
};
