import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const frmDeckEditorial: DeckEditorialBundle = {
  slug: "frm-part-1-anki-deck",
  mockSlug: "frm-part-1-readiness-check",
  sections: [
    {
      heading: "How the FRM Part I cards follow GARP's four topics",
      paragraphs: [
        "FRM Part I is 100 equally weighted multiple-choice questions in four hours, and all four topics appear on every sitting. The cards are tagged by topic:",
      ],
      bullets: [
        "**Foundations of Risk Management:** risk governance, the main risk types and well-known risk failures.",
        "**Quantitative Analysis:** probability, statistics, regression and simulation, with the formulas written out.",
        "**Financial Markets and Products:** derivatives, interest rates, bonds and how the products are priced and hedged.",
        "**Valuation and Risk Models:** VaR, expected shortfall, option pricing and credit and operational risk measures.",
      ],
    },
    {
      heading: "Spaced repetition for a formula-heavy exam",
      paragraphs: [
        "GARP reports that Part I candidates spend about 240 hours preparing on average. Much of that is formulas and their conditions, which is where spaced repetition saves the most time compared with re-reading.",
        "**Plan:** take the free start of the [FRM Part I practice test](/mock-exams/frm-part-1-readiness-check), then add 20–30 cards a day, weakest topic first, and review daily. For each formula, put the inputs on the front and the formula plus when it applies on the back, then work one number example from memory.",
        "Foundations of Risk Management is more conceptual than the other three topics, so write those cards as short questions about why a risk event happened and what control failed, rather than as definitions to memorize.",
        "In the final weeks, keep reviews daily and move most study time to timed practice and GARP's official practice exams. 2027 windows, fees and results timing are on the practice test page; comparing credentials? See [CFA Level 1 vs FRM Part 1](/blog/cfa-level-1-vs-frm-part-1-which-to-choose).",
      ],
    },
  ],
  sources: [
    { label: "GARP — FRM program and exams", url: "https://www.garp.org/frm/program-exams", checked: CHECKED },
  ],
};
