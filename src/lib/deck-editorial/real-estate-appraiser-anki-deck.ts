import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const realEstateAppraiserDeckEditorial: DeckEditorialBundle = {
  slug: "real-estate-appraiser-anki-deck",
  mockSlug: "real-estate-appraiser-readiness-check",
  sections: [
    {
      heading: "What the appraiser cards are built for",
      paragraphs: [
        "States license appraisers, but their rules can be no less strict than the Appraiser Qualifications Board's Criteria. For a **Licensed Residential** credential the AQB sets **150 hours** of qualifying education and **1,000 hours** of experience over at least six months; **Certified Residential** needs 200 hours and 1,500 hours over 12 months, plus college-level education; **Certified General** needs 300 hours, a bachelor's degree and 3,000 hours over 18 months. Every licence or certification requires passing an AQB-issued or endorsed exam, and each credential has its own.",
        "The cards cover the shared core of those exams: appraisal principles, the three approaches to value, market analysis, finance and USPAP rules. Each card puts a term, rule or calculation on the front and the answer on the back, so you practise recalling definitions and formulas rather than recognising them among options.",
      ],
    },
    {
      heading: "Studying with spaced repetition before the national exam",
      paragraphs: [
        "The Appraisal Foundation gives **four hours** for the Licensed Residential and Certified Residential exams and **six hours** for Certified General, so stamina matters as much as recall. Calculations take the longest, so give the income and cost approach cards extra reviews.",
        "**Plan:** take the free start of the [real estate appraiser practice test](/mock-exams/real-estate-appraiser-readiness-check) to see which areas are weakest. Add 15 to 20 new cards a day, starting there, and review every day. In the final week, stop adding cards and take timed runs. Your state board sets fees and application steps, so check them before you book. The AQB has adopted changes to the Criteria that take effect on 1 July 2027, so confirm which rules will apply when you apply.",
      ],
    },
  ],
  sources: [
    { label: "The Appraisal Foundation — Real property appraisal", url: "https://www.appraisalfoundation.org/pages/real-property-appraisal", checked: CHECKED },
    { label: "The Appraisal Foundation — Qualification Criteria", url: "https://www.appraisalfoundation.org/pages/criteria", checked: CHECKED },
    {
      label: "The Appraisal Foundation — National Uniform Licensing and Certification Examination",
      url: "https://www.appraisalfoundation.org/pages/national-uniform-licensing-and-certification-examination",
      checked: CHECKED,
    },
  ],
};
