import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const series66DeckEditorial: DeckEditorialBundle = {
  slug: "series-66-anki-deck",
  mockSlug: "series-66-readiness-check",
  sections: [
    {
      heading: "What the Series 66 cards cover",
      paragraphs: [
        "The Series 66 is NASAA's combined state law exam: 100 scored questions plus 10 unscored in 150 minutes, passed with 73 correct. FINRA lists the Series 7 as its corequisite. The cards focus on the law and ethics the exam combines from agent and adviser regulation:",
      ],
      bullets: [
        "**Who must register:** agents, broker-dealers, investment advisers and their representatives, with exclusions and exemptions.",
        "**Ethics and fiduciary duty:** prohibited practices, conflicts of interest, custody and disclosure.",
        "**Regulatory powers and remedies:** the administrator's authority, civil liability and penalties.",
        "**Client and product context:** the economics, product and suitability points that appear in adviser scenarios.",
      ],
    },
    {
      heading: "How to use spaced repetition for the Series 66",
      paragraphs: [
        "Because you also hold or are taking the Series 7, many product facts are already familiar. Use cards for the state-law and adviser rules that the Series 7 does not cover, especially pairs that are easy to mix up.",
        "**Plan:** take the free start of the [Series 66 practice test](/mock-exams/series-66-readiness-check), then add 15–20 cards a day on registration and ethics. Write exclusion-versus-exemption cards as a person or security on the front and the answer with its reason on the back.",
        "Add a small set of adviser-specific cards on custody, discretionary authority, fee arrangements and disclosure to clients. Adviser rules are the part of the Series 66 that Series 7 study does not prepare you for, so give them a daily slot.",
        "Keep daily reviews going until the exam. NASAA's retake waits from 4 Jan 2027 are 30, 30 and then 60 days. For a route with no corequisite, compare the [Series 65 deck](/decks/series-65-anki-deck).",
      ],
    },
  ],
  sources: [
    { label: "FINRA — Series 66", url: "https://www.finra.org/registration-exams-ce/qualification-exams/series66", checked: CHECKED },
  ],
};
