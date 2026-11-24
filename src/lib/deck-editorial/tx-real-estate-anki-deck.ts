import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const txRealEstateDeckEditorial: DeckEditorialBundle = {
  slug: "tx-real-estate-anki-deck",
  mockSlug: "tx-real-estate-readiness-check",
  sections: [
    {
      heading: "What the Texas real estate cards are built for",
      paragraphs: [
        "**Texas only.** The Texas Real Estate Commission (TREC) licenses sales agents, and Pearson VUE delivers the licence exam, which has a national portion and a state portion. TREC requires 180 classroom hours of qualifying education first: Principles of Real Estate I and II, Law of Agency, Law of Contracts, Promulgated Contract Forms, and Real Estate Finance.",
        "The state portion is where Texas-specific rules decide the answer: TREC licence law, agency disclosures, and which promulgated contract form applies. The cards are tagged national or state, and each one puts a rule, form or situation on the front and the Texas requirement on the back, so you can review the two portions separately and spot which one needs more work.",
      ],
    },
    {
      heading: "Studying for both portions with spaced repetition",
      paragraphs: [
        "**Plan:** take the free start of the [Texas real estate practice test](/mock-exams/tx-real-estate-readiness-check) to see whether license law, contracts and agency, or finance needs most work. Add 15 to 20 new cards a day, starting with the state tag if your national knowledge is already solid, and review every day.",
        "Pass both portions well before your deadlines: Pearson VUE says that after three failed attempts you must complete an extra 30 classroom hours of qualifying education for each failed portion before you can retest. TREC also says your application expires one year after you file it, and a passing result for each portion is valid for one year. In the final week, stop adding cards and take timed runs on fresh questions.",
      ],
    },
  ],
  sources: [
    { label: "TREC — Become a sales agent", url: "https://www.trec.texas.gov/become-licensed/sales-agent", checked: CHECKED },
    { label: "Pearson VUE — Texas Real Estate Commission exams", url: "https://www.pearsonvue.com/us/en/tx/realestate.html", checked: CHECKED },
  ],
};
