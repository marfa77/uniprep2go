import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const waRealEstateDeckEditorial: DeckEditorialBundle = {
  slug: "wa-real-estate-anki-deck",
  mockSlug: "wa-real-estate-readiness-check",
  sections: [
    {
      heading: "What the Washington cards are built for",
      paragraphs: [
        "**Washington only.** The Washington State Department of Licensing (DOL) requires **90 hours** of approved education before the broker exam: a 60-hour Real Estate Fundamentals course and a 30-hour Real Estate Practices course. PSI delivers the exams, and there are two of them, a **state exam** and a **national exam**. The exam fee is **$210**, and so is each retake.",
        "The state exam is where Washington-specific rules decide the answer, from licence law to brokerage practice. The cards are tagged state or national, and each puts a rule or situation on the front and the Washington requirement on the back, so you can review the two exams' topics separately. You must be at least 18 and have a high school diploma or equivalent to apply, and fingerprints are submitted after you pass.",
      ],
    },
    {
      heading: "Studying against Washington's deadlines",
      paragraphs: [
        "**Plan:** take the free start of the [Washington real estate practice test](/mock-exams/wa-real-estate-readiness-check) to see which exam needs more work. Add 15 to 20 new cards a day, starting with the weaker tag, and review every day. In the final week, stop adding cards and take timed runs.",
        "Washington's timing rules shape the plan. DOL says you must pass both the state and national exams **within 6 months of each other**, exam results are valid for **1 year**, your exam approval expires **2 years** after you complete your courses, and you must apply for your licence within 1 year of passing. The original broker licence costs $233. Schedule both exams close together so the earlier result does not run out.",
      ],
    },
  ],
  sources: [
    { label: "Washington DOL — Get your real estate broker license", url: "https://dol.wa.gov/professional-licenses/real-estate-brokers/get-your-license-real-estate-brokers", checked: CHECKED },
    { label: "Washington DOL — Real estate broker exam", url: "https://dol.wa.gov/professional-licenses/real-estate-brokers/exam-real-estate-brokers", checked: CHECKED },
    { label: "Washington DOL — Real estate fees", url: "https://dol.wa.gov/professional-licenses/real-estate-brokers/fees-real-estate", checked: CHECKED },
  ],
};
