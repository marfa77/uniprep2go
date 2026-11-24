import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const californiaRealEstateDeckEditorial: DeckEditorialBundle = {
  slug: "california-real-estate-exam-anki-deck",
  mockSlug: "california-real-estate-readiness-check",
  sections: [
    {
      heading: "What the California real estate cards are built for",
      paragraphs: [
        "**California only.** The DRE salesperson exam has 150 questions, and DRE publishes how they are spread across seven areas. Two areas carry the most weight: practice of real estate and disclosures (25%) and laws of agency and fiduciary duties (17%). The cards are tagged by DRE area so you can weight your daily reviews the same way.",
        "Much of what costs points in California is state-specific: which disclosures apply and when, how agency relationships must be confirmed, and how trust funds must be handled. Each card puts a situation or rule on the front and the California requirement, deadline or duty on the back, because recalling the exact detail is harder than recognising it in a list of answers.",
      ],
    },
    {
      heading: "Studying for the DRE exam with spaced repetition",
      paragraphs: [
        "**Plan:** take the free start of the [California real estate practice test](/mock-exams/california-real-estate-readiness-check) to see which DRE areas are weakest. Add 15 to 20 new cards a day, beginning with practice and disclosures, then agency, and review every day so earlier areas stay fresh. Leave financing and transfer of property, the two smallest areas at 9% and 8%, for later weeks.",
        "In the last week, stop adding cards and take timed runs. If you do not pass, DRE gives you your score and the percentage you scored in each area; use that to choose which card tags to review before your re-examination, which you can take as often as needed within two years of your original application. For test-centre logistics, see the [DRE test centres guide](/blog/california-real-estate-exam-dre-test-centers).",
      ],
    },
  ],
  sources: [
    { label: "California DRE — Salesperson exam content", url: "https://www.dre.ca.gov/examinees/SalesExamContent.html", checked: CHECKED },
    { label: "California DRE — Taking the exam", url: "https://www.dre.ca.gov/Examinees/TakingExam.html", checked: CHECKED },
  ],
};
