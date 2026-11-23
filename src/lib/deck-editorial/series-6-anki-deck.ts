import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const series6DeckEditorial: DeckEditorialBundle = {
  slug: "series-6-anki-deck",
  mockSlug: "series-6-readiness-check",
  sections: [
    {
      heading: "How the Series 6 cards follow FINRA's job functions",
      paragraphs: [
        "The Series 6 has 50 items in 1 hour 30 minutes, with a passing score of 70, and the SIE is its corequisite. FINRA splits the items across four job functions, and the cards are tagged the same way:",
      ],
      bullets: [
        "**Function 3, information, recommendations and records (25 items):** mutual funds, variable annuities, variable life insurance, unit investment trusts and 529 plans, plus suitability and disclosures. Half the exam, so the largest share of cards.",
        "**Function 1, seeking business (12 items):** communications with the public and solicitation rules.",
        "**Function 2, opening accounts (8 items):** account types and the customer information you must collect.",
        "**Function 4, processing transactions (5 items):** orders, pricing and confirmations.",
      ],
    },
    {
      heading: "Using spaced repetition for the Series 6",
      paragraphs: [
        "FINRA limits a Series 6 representative to mutual funds, variable annuities, variable life insurance, unit investment trusts and municipal fund securities such as 529 plans. Each product has a short list of features, costs, risks and suitability points, which suits cards well.",
        "**Plan:** take the free start of the [Series 6 practice test](/mock-exams/series-6-readiness-check), then add 15–20 cards a day starting with Function 3. Keep one card per product share class or fee type, and turn each missed practice question into a card stating the rule.",
        "Variable products deserve extra cards: separate accounts, sub-accounts, surrender charges and death benefits are easy to confuse with mutual fund features, and the exam asks you to tell them apart in recommendations.",
        "In the last week, stop adding cards and switch to timed runs. If you have not taken the SIE yet, the [SIE deck](/decks/sie-exam-anki-deck) covers the corequisite; FINRA's retake waits shorten from 19 Jan 2027 for both.",
      ],
    },
  ],
  sources: [
    { label: "FINRA — Series 6", url: "https://www.finra.org/registration-exams-ce/qualification-exams/series6", checked: CHECKED },
  ],
};
