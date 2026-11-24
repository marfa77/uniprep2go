import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const arRealEstateDeckEditorial: DeckEditorialBundle = {
  slug: "ar-real-estate-anki-deck",
  mockSlug: "ar-real-estate-readiness-check",
  sections: [
    {
      heading: "What the Arkansas cards are built for",
      paragraphs: [
        "**Arkansas only.** The Arkansas Real Estate Commission requires **60 classroom hours** of real estate education, 30 of them in basic principles, before you can be approved for the salesperson exam. Pearson VUE runs the exam in two portions, a **general** portion with **80 scored items** and an **Arkansas law** portion with **30 scored items** plus 10 unscored pretest items. You need a scaled score of **70** on each, and the exam fee is **$75**, paid when you book.",
        "The cards are tagged general or state, so you can review the two portions separately. The state tag covers Arkansas licence law and Commission regulations; the general tag covers agency, contracts, property ownership, finance and valuation. Each card puts a rule, term or situation on the front and the answer on the back, so you practise recalling the rule rather than spotting it among four options. Pretest items look exactly like scored ones, so treat every question on exam day as if it counts.",
      ],
    },
    {
      heading: "Studying both portions with spaced repetition",
      paragraphs: [
        "**Plan:** take the free start of the [Arkansas real estate practice test](/mock-exams/ar-real-estate-readiness-check) to find your weaker portion. Add 15 to 20 new cards a day, starting with that tag, and review every day. In the final week, stop adding cards and take timed runs on fresh questions.",
        "Keep an eye on the deadlines. Once you pass, the forms and fees must reach the Commission **within 90 days**, and a new salesperson then has **18 hours** of post-licence education to finish by the end of the sixth month after licensing. The Commission also asks you not to get fingerprinted until it emails you to do so, so follow its order rather than booking everything at once.",
      ],
    },
  ],
  sources: [
    { label: "Arkansas Real Estate Commission — New applicant", url: "https://arec.arkansas.gov/licensing/new-applicant/", checked: CHECKED },
    { label: "Arkansas Real Estate Commission — Exam information", url: "https://arec.arkansas.gov/licensing/exam-information/", checked: CHECKED },
    { label: "Arkansas Real Estate Commission — Exam content outlines (PDF)", url: "https://arec.arkansas.gov/wp-content/uploads/Exam-Content-Outlines.pdf", checked: CHECKED },
    { label: "Arkansas Real Estate Commission — Candidate handbook (PDF)", url: "https://arec.arkansas.gov/wp-content/uploads/Candidate-Handbook.pdf", checked: CHECKED },
    { label: "Arkansas Real Estate Commission — Education", url: "https://arec.arkansas.gov/education/", checked: CHECKED },
  ],
};
