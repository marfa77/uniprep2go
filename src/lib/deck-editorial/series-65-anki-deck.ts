import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const series65DeckEditorial: DeckEditorialBundle = {
  slug: "series-65-anki-deck",
  mockSlug: "series-65-readiness-check",
  sections: [
    {
      heading: "What the Series 65 cards cover",
      paragraphs: [
        "The Series 65 is a NASAA exam of 130 scored questions in 180 minutes, passed with 92 correct, and it has no corequisite. The cards cover the four areas the readiness check scores:",
      ],
      bullets: [
        "**Economics and analysis:** economic indicators, financial statements, and return and risk measures.",
        "**Investment products:** equities, fixed income, funds, options, insurance-based and alternative products, each with its risks.",
        "**Client recommendations:** client profiles, asset allocation, portfolio strategies and tax considerations.",
        "**Laws and ethics:** state and federal adviser regulation, fiduciary duty, custody and prohibited practices.",
      ],
    },
    {
      heading: "Spaced repetition for a three-hour exam",
      paragraphs: [
        "The Series 65 is long and broad, so recall speed matters: about 77 seconds per question across 140 questions. Cards build fast recall of formulas, definitions and rules so your time goes on the scenarios.",
        "**Plan:** take the free start of the [Series 65 practice test](/mock-exams/series-65-readiness-check), then add 20–25 cards a day across your two weakest areas while reviewing everything daily. Keep formula cards paired with a one-line worked example, and law cards phrased as a short scenario with the rule on the back.",
        "Tag every card by area so you can filter to economics, products, recommendations or law when one of them scores low. Review the law cards daily to the end, because adviser rules change less often than product details and are easy points to secure.",
        "Keep timed practice going alongside cards to build stamina for the full three hours. Exam facts and NASAA's retake rule from 4 Jan 2027 are on the practice test page; if you also need the Series 66, see the [Series 66 deck](/decks/series-66-anki-deck).",
      ],
    },
  ],
  sources: [
    { label: "FINRA — Series 65", url: "https://www.finra.org/registration-exams-ce/qualification-exams/series65", checked: CHECKED },
  ],
};
