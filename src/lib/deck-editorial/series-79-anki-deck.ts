import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const series79DeckEditorial: DeckEditorialBundle = {
  slug: "series-79-anki-deck",
  mockSlug: "series-79-readiness-check",
  sections: [
    {
      heading: "How the Series 79 cards follow FINRA's three job functions",
      paragraphs: [
        "The Series 79 (Investment Banking Representative) exam has 75 scored items split across three job functions, and the SIE is a corequisite: you need both for the registration. The cards are tagged by function so you can weight your study the same way:",
      ],
      bullets: [
        "**Function 1, collection, analysis and evaluation of data (37 items):** financial statements, valuation methods and the data behind them. Almost half the exam.",
        "**Function 2, underwriting and new financing transactions, types of offerings and registration of securities (20 items):** offering types, registration and exemptions, and the underwriting process.",
        "**Function 3, mergers and acquisitions, tender offers and financial restructuring (18 items):** deal process, disclosure and the rules that govern each step.",
      ],
    },
    {
      heading: "Using spaced repetition for an investment banking exam",
      paragraphs: [
        "Function 1 rewards fast, accurate method recall: which valuation approach fits, what a ratio tells you, how a metric is calculated. Function 2 and 3 cards are mostly rules and sequences, which spaced repetition holds well once learned. FINRA lists the activities the registration covers, from debt and equity offerings to tender offers, restructurings, asset sales and divestitures, and the cards cover each of them.",
        "**Plan:** take the free start of the [Series 79 practice test](/mock-exams/series-79-readiness-check), then add 15 to 20 new cards a day, starting with Function 1. Review every day, and in the last week stop adding cards and take timed runs. If you have not passed the SIE yet, start with the [SIE deck](/decks/sie-exam-anki-deck). FINRA's retake waits shorten on 19 January 2027 to 15 days after a first or second failed attempt and 60 days after a third.",
      ],
    },
  ],
  sources: [
    {
      label: "FINRA — Series 79 Investment Banking Representative exam",
      url: "https://www.finra.org/registration-exams-ce/qualification-exams/series79",
      checked: CHECKED,
    },
  ],
};
