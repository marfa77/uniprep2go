import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const paRealEstateDeckEditorial: DeckEditorialBundle = {
  slug: "pa-real-estate-anki-deck",
  mockSlug: "pa-real-estate-readiness-check",
  sections: [
    {
      heading: "What the Pennsylvania cards are built for",
      paragraphs: [
        "**Pennsylvania only.** The State Real Estate Commission requires **75 hours** of basic real estate education: Real Estate Fundamentals (30 hours) and Real Estate Practice (45 hours), completed within five years before you pass the exam. Pearson VUE runs the salesperson exam, which has two portions, a **national** portion and a **Pennsylvania state** portion, and you must pass both. A salesperson licensed in another state within the last five years can have the national portion waived.",
        "The cards are tagged national or state. The state tag covers Pennsylvania licence law, Commission rules, agency relationships and disclosure. Each card puts a rule or situation on the front and the Pennsylvania requirement on the back, so you can drill the state portion on its own. If the national portion is waived for you, suspend the national tag and spend all your review time on Pennsylvania rules.",
      ],
    },
    {
      heading: "Studying both portions with spaced repetition",
      paragraphs: [
        "**Plan:** take the free start of the [Pennsylvania real estate practice test](/mock-exams/pa-real-estate-readiness-check) to see which portion is weaker. Add 15 to 20 new cards a day, starting with that tag, and review every day so national topics stay fresh while you add Pennsylvania rules. In the final week, stop adding cards and take timed runs.",
        "Keep your cards after you pass: to renew or reactivate, the Commission requires **14 hours** of approved continuing education, and first-time renewals include specific continuing education modules. The Commission's pages do not publish the question counts or pass marks; check the Pearson VUE candidate handbook for the current format.",
      ],
    },
  ],
  sources: [
    { label: "PA State Real Estate Commission", url: "https://www.pa.gov/agencies/dos/department-and-offices/bpoa/boards-commissions/real-estate-commission", checked: CHECKED },
    { label: "PA Department of State — Real Estate Commission licensure guide", url: "https://www.pa.gov/agencies/dos/resources/professional-licensing-resources/licensure-processing-guides-and-timelines/real-estate-commission-guide", checked: CHECKED },
    { label: "PA State Real Estate Commission — Education information", url: "https://www.pa.gov/agencies/dos/department-and-offices/bpoa/boards-commissions/real-estate-commission/education-information", checked: CHECKED },
  ],
};
