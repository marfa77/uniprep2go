import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const vaRealEstateDeckEditorial: DeckEditorialBundle = {
  slug: "va-real-estate-anki-deck",
  mockSlug: "va-real-estate-readiness-check",
  sections: [
    {
      heading: "What the Virginia cards are built for",
      paragraphs: [
        "**Virginia only.** The Virginia Real Estate Board (part of DPOR) requires **60 class hours** of a Board-approved pre-licence course, Principles of Real Estate, before you can sit the exam. PSI is the exam vendor, testing runs daily, and the exam fee is **$60**, paid to PSI. To be licensed as a salesperson you must pass both the **state** and **national** portions.",
        "The cards are tagged state or national. The state tag covers Virginia licence law, Board regulations, agency and disclosure duties, and fair housing. Each card puts a rule or situation on the front and the Virginia requirement on the back, so you can review the two portions separately and see which one needs more work. The Board's FAQ refers to the course as Principles of Real Estate, and the cards follow its order.",
      ],
    },
    {
      heading: "Studying both portions with spaced repetition",
      paragraphs: [
        "**Plan:** take the free start of the [Virginia real estate practice test](/mock-exams/va-real-estate-readiness-check) to find your weaker portion. Add 15 to 20 new cards a day, starting with that tag, and review every day. In the final week, stop adding cards and take timed runs on fresh questions.",
        "DPOR says to allow about two weeks for your exam application to be processed, so start that while you study rather than after. The Board's pages do not publish the question counts or pass marks; PSI's Virginia real estate candidate information bulletin, linked from DPOR's pre-licence page, sets out the current format, so read it before you book.",
      ],
    },
  ],
  sources: [
    { label: "DPOR — Real Estate Board", url: "https://www.dpor.virginia.gov/Boards/Real-Estate", checked: CHECKED },
    { label: "DPOR — Real estate pre-licence and exam", url: "https://www.dpor.virginia.gov/Boards/Real-Estate/Pre-License/", checked: CHECKED },
  ],
};
