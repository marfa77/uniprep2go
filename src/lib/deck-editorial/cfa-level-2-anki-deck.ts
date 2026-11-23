import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const cfaL2DeckEditorial: DeckEditorialBundle = {
  slug: "cfa-level-2-anki-deck",
  mockSlug: "cfa-level-2-readiness-check",
  sections: [
    {
      heading: "What the CFA Level II cards are for",
      paragraphs: [
        "Level II is 88 multiple-choice questions in 22 vignettes, with about 12 minutes per item set. That leaves little time to rebuild a formula or recall a rule from scratch, so the cards target exactly that recall:",
      ],
      bullets: [
        "**Formulas with their inputs:** valuation models, fixed income and derivatives pricing, and the ratios Financial Statement Analysis vignettes ask you to compute.",
        "**Accounting treatment:** IFRS is the default unless a vignette states U.S. GAAP, so many cards contrast the two where they differ.",
        "**Ethics:** the Code and Standards as short scenarios, because Level II tests them inside vignettes rather than as stand-alone facts.",
        "**Interpretation:** what a result means, for example what a given sign or size says about a company, since item sets usually ask you to draw a conclusion, not only to calculate.",
      ],
    },
    {
      heading: "Using spaced repetition alongside vignette practice",
      paragraphs: [
        "Cards build speed on the pieces; vignettes build the skill of finding which piece a question needs. Do both every week rather than finishing cards first.",
        "**Plan:** take the free start of the [CFA Level II practice test](/mock-exams/cfa-level-2-readiness-check) to find weak topics. Review cards daily and add 20–30 new ones a day from your two weakest topics. Each time you miss a vignette question, write a card for the step you got wrong, phrased as \"given X, compute or conclude Y\".",
        "In the last three weeks, stop adding cards, keep reviews daily, and move most study time to timed item sets. Exam format, fees and windows are on the practice test page.",
      ],
    },
  ],
  sources: [
    { label: "CFA Institute — Level II exam", url: "https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-ii-exam", checked: CHECKED },
  ],
};
