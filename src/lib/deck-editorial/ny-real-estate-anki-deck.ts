import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const nyRealEstateDeckEditorial: DeckEditorialBundle = {
  slug: "ny-real-estate-anki-deck",
  mockSlug: "ny-real-estate-readiness-check",
  sections: [
    {
      heading: "What the New York cards are built for",
      paragraphs: [
        "**New York only.** The New York Department of State requires **77 hours** of approved salesperson qualifying education, which ends with a school-administered exam. You then sit the state's own written exam: multiple choice, based on the 77-hour curriculum, with **1 hour 30 minutes** to finish. The exam fee is **$15**, and you schedule it through your eAccessNY account at one of the Department's exam sites around the state.",
        "Because the exam follows the 77-hour curriculum closely, the cards are organised the same way: licence law and agency, contracts and closings, finance, and the New York-specific rules on disclosure and fair housing. Each card puts a rule, term or situation on the front and the New York requirement or definition on the back. Bring current photo ID on exam day; the Department allows only silent, non-printing battery or solar calculators.",
      ],
    },
    {
      heading: "Studying with spaced repetition before the state exam",
      paragraphs: [
        "**Plan:** take the free start of the [New York real estate practice test](/mock-exams/ny-real-estate-readiness-check) to see which topics are weakest. Add 15 to 20 new cards a day, in the order of your course, and review every day so earlier units stay fresh while you finish the course.",
        "New York reports exam results as passed or failed, without a numerical score, so aim to know the material comfortably rather than to scrape a mark. Passed exam results are valid for **two years**, so apply for your licence within that time. In the final week, stop adding cards and take timed runs at the real pace of the 90-minute exam.",
      ],
    },
  ],
  sources: [
    { label: "NY Department of State — Real estate agent", url: "https://dos.ny.gov/real-estate-agent", checked: CHECKED },
    { label: "NY Department of State — Salesperson FAQ", url: "https://dos.ny.gov/real-estate-salesperson-frequently-asked-questions", checked: CHECKED },
    { label: "NY Department of State — Exam sites", url: "https://dos.ny.gov/real-estate-salesperson-exam-sites", checked: CHECKED },
  ],
};
