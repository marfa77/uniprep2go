import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const eaDeckEditorial: DeckEditorialBundle = {
  slug: "enrolled-agent-anki-deck",
  mockSlug: "enrolled-agent-readiness-check",
  sections: [
    {
      heading: "How the EA cards map to the three SEE parts",
      paragraphs: [
        "Each part of the IRS Special Enrollment Examination has 100 questions, 85 of them scored, and the parts can be taken in any order. The cards are tagged by part and domain from PSI's Candidate Information Bulletin:",
      ],
      bullets: [
        "**Part 1, Individuals:** taxpayer data, income and assets, deductions and credits, taxation, advising individuals and specialized returns.",
        "**Part 2, Businesses:** business entities, business tax preparation, and specialized returns and taxpayers.",
        "**Part 3, Representation, Practices and Procedures:** practices and procedures, representation before the IRS, specific areas of representation and the filing process.",
        "The exam tests law as amended through 31 Dec 2025, so the cards use those rules and thresholds.",
      ],
    },
    {
      heading: "Spaced repetition across a multi-part exam",
      paragraphs: [
        "Because a passed part carries over for three years, you can study one part at a time. Filter the deck to the part you are sitting next and keep a short daily review of earlier parts so the knowledge carries into Part 3.",
        "**Plan:** take the free start of the [Enrolled Agent practice test](/mock-exams/enrolled-agent-readiness-check), then add 20 cards a day from your next part's largest domains: income, deductions and credits for Part 1; entities and business tax preparation for Part 2. Write each missed question as a card for the rule or threshold involved.",
        "Part 3 rewards procedure recall: deadlines, forms, who can represent a taxpayer and what each IRS notice means. Give those cards their own tag and review them daily once you start that part, because they are easy to confuse under time pressure.",
        "Testing windows, fees, the three-year carryover and the PSI scheduling details are on the practice test page.",
      ],
    },
  ],
  sources: [
    { label: "IRS — Enrolled agents frequently asked questions", url: "https://www.irs.gov/tax-professionals/enrolled-agents/enrolled-agents-frequently-asked-questions", checked: CHECKED },
  ],
};
