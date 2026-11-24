import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const satDeckEditorial: DeckEditorialBundle = {
  slug: "sat-anki-deck",
  mockSlug: "sat-readiness-check",
  sections: [
    {
      heading: "What the SAT cards cover against College Board's domains",
      paragraphs: [
        "The digital SAT has two sections, Reading and Writing (54 questions in two 32-minute modules) and Math (44 questions in two 35-minute modules). The cards are split the same way and tagged to College Board's content domains:",
      ],
      bullets: [
        "**Reading and Writing:** Information and Ideas, Craft and Structure, Expression of Ideas, and Standard English Conventions. Grammar and punctuation rules (Standard English Conventions) and transition words (Expression of Ideas) suit flashcards best, because each question is one short passage of 25–150 words with one answer.",
        "**Math:** Algebra and Advanced Math, which together make up most of the section (13–15 questions each), plus Problem-Solving and Data Analysis and Geometry and Trigonometry (5–7 each). Cards hold the formulas, setups and common traps; they do not replace working full problems.",
      ],
    },
    {
      heading: "How to use spaced repetition for the SAT",
      paragraphs: [
        "Because the second module of each section adapts to how you did on the first, early accuracy matters. Use cards to remove slow, avoidable misses on rules and formulas, so the first module goes cleanly.",
        "**Plan:** take the free start of the [SAT readiness check](/mock-exams/sat-readiness-check) to see which axis is weaker. Add 15–25 new cards a day from that section, review daily, and filter by domain tag when one area keeps showing up in your misses. In the final two weeks, stop adding cards and switch to full-length adaptive practice tests in College Board's Bluebook app, which mirror the real exam.",
        "Section timing and domain breakdowns are on the readiness check page.",
      ],
    },
  ],
  sources: [
    { label: "College Board — SAT structure", url: "https://satsuite.collegeboard.org/sat/whats-on-the-test/structure", checked: CHECKED },
    { label: "College Board — SAT Reading and Writing", url: "https://satsuite.collegeboard.org/sat/whats-on-the-test/reading-writing", checked: CHECKED },
    { label: "College Board — SAT Math overview", url: "https://satsuite.collegeboard.org/sat/whats-on-the-test/math/overview", checked: CHECKED },
  ],
};
