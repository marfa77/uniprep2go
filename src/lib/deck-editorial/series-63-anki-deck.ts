import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const series63DeckEditorial: DeckEditorialBundle = {
  slug: "series-63-anki-deck",
  mockSlug: "series-63-readiness-check",
  sections: [
    {
      heading: "What the Series 63 cards drill",
      paragraphs: [
        "The Series 63 is a NASAA exam on state securities law: 60 scored questions in 75 minutes, passed with 43 correct. Most questions describe a situation and ask whether it is allowed, so the cards focus on the rules behind those calls:",
      ],
      bullets: [
        "**Definitions:** agent, broker-dealer, investment adviser, investment adviser representative and issuer, with the exclusions for each.",
        "**Registration:** who must register, exemptions, and when registration becomes effective or ends.",
        "**Ethics:** prohibited practices for agents and advisers, such as unauthorized trading, guarantees and misusing client funds.",
        "**The administrator's powers:** investigations, stop orders, denial and revocation, and penalties.",
      ],
    },
    {
      heading: "Using spaced repetition for state law",
      paragraphs: [
        "State-law questions often turn on one word: an exclusion versus an exemption, or always versus sometimes. Cards that contrast close pairs train exactly that distinction.",
        "**Plan:** take the free start of the [Series 63 practice test](/mock-exams/series-63-readiness-check), learn the definition cards first, then add 15–20 cards a day on ethics and registration. Write each missed practice question as a card stating the rule and the deciding word.",
        "Make a dedicated set of exclusion and exemption cards: the person or security on the front, and on the back whether it is excluded from the definition or exempt from registration and why. Mixing these two up is one of the easiest ways to lose points.",
        "The exam is short, so a week or two of daily reviews alongside timed runs is usually enough to tighten recall. Exam facts and NASAA's retake rule from 4 Jan 2027 are on the practice test page; for Series 7 rules, use the [Series 7 deck](/decks/series-7-anki-deck).",
      ],
    },
  ],
  sources: [
    { label: "FINRA — Series 63", url: "https://www.finra.org/registration-exams-ce/qualification-exams/series63", checked: CHECKED },
  ],
};
