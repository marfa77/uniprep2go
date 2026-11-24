import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const sieDeckEditorial: DeckEditorialBundle = {
  slug: "sie-exam-anki-deck",
  mockSlug: "sie-full-mock",
  sections: [
    {
      heading: "How the SIE cards follow FINRA's four sections",
      paragraphs: [
        "Anyone 18 or older can sit the SIE without a firm sponsor. The cards are tagged to FINRA's four content sections, weighted toward the largest:",
      ],
      bullets: [
        "**Understanding Products and Their Risks (the largest section):** equities, debt, options, packaged products and the risks attached to each.",
        "**Understanding Trading, Customer Accounts and Prohibited Activities:** order types, account types, settlement and prohibited practices.",
        "**Knowledge of Capital Markets:** market structure, offerings and economic factors.",
        "**Overview of the Regulatory Framework:** the roles of FINRA, the SEC, the MSRB and SIPC.",
      ],
    },
    {
      heading: "A spaced-repetition plan for the SIE",
      paragraphs: [
        "Much of the SIE turns on knowing exact terms and definitions, which suits daily card reviews. Terms learned for the SIE carry into the Series 7, which uses the SIE as its corequisite.",
        "**Plan:** run the free start of the [SIE practice test](/mock-exams/sie-full-mock) to find your weakest section. Add 20 new cards a day from it, review daily, and turn each practice miss into a card stating the rule. In the final week, stop adding cards and take full timed runs.",
        "For products, keep one card per security type with its main risks on the back, and one card per order type with an example. For regulation, write each organization on the front and its role on the back, since questions often hinge on which body does what.",
        "Fee, enrollment, Prometric scheduling and the retake changes from 19 Jan 2027 are on the practice test page. Moving on to the Series 7? Continue with the [Series 7 deck](/decks/series-7-anki-deck).",
      ],
    },
  ],
  sources: [
    { label: "FINRA — Securities Industry Essentials (SIE) exam", url: "https://www.finra.org/registration-exams-ce/qualification-exams/securities-industry-essentials-exam", checked: CHECKED },
  ],
};
