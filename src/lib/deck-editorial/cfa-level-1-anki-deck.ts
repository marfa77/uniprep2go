import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const cfaL1DeckEditorial: DeckEditorialBundle = {
  slug: "cfa-level-1-anki-deck",
  mockSlug: "cfa-level-1-readiness-check",
  sections: [
    {
      heading: "How the CFA Level I cards line up with the topic weights",
      paragraphs: [
        "CFA Institute publishes a weight range for each of the ten Level I topics. The cards are tagged by topic so your daily reviews can follow those ranges for 2027 exams:",
      ],
      bullets: [
        "**Ethical and Professional Standards (10–15%):** the Code and Standards as short case prompts. The largest single topic, and one where wording matters.",
        "**Quantitative Methods, Financial Statement Analysis, Equity Investments and Fixed Income (11–14% each):** formulas with when to use them, ratio definitions, and bond and equity valuation steps.",
        "**Portfolio Construction (8–12%):** risk, return and portfolio management basics.",
        "**Economics, Corporate Issuers, Derivatives and Alternative Investments (6–9% each):** definitions and the few calculations each topic repeats.",
      ],
    },
    {
      heading: "Spaced repetition for a 180-question exam",
      paragraphs: [
        "Level I rewards fast, accurate recall across ten topics, which is what spaced repetition is good at. Use cards for formulas, definitions and Standards; use timed questions to practise applying them.",
        "**Plan:** run the free start of the [CFA Level I practice test](/mock-exams/cfa-level-1-readiness-check) to find weak topics, then add 20–30 cards a day across your weakest two or three topics while reviewing everything daily. Give Ethics a daily slot to the end; it is the largest topic and the one most often decided by small wording differences.",
        "For formula cards, put the inputs on the front and the formula plus a worked one-line example on the back. For Ethics cards, put a short scenario on the front and the Standard plus the reason on the back, so you practise the judgment rather than the label.",
        "The 2027 weight table, exam format, dates, fees and results policy are on the practice test page.",
      ],
    },
  ],
  sources: [
    { label: "CFA Institute — Level I exam", url: "https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-i-exam", checked: CHECKED },
  ],
};
