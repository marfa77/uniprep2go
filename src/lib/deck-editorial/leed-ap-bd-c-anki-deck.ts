import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const leedApBdcDeckEditorial: DeckEditorialBundle = {
  slug: "leed-ap-bd-c-anki-deck",
  mockSlug: "leed-ap-bd-c-readiness-check",
  sections: [
    {
      heading: "What the LEED AP BD+C cards are built for",
      paragraphs: [
        "LEED AP BD+C is a specialty credential: USGBC requires a current LEED Green Associate credential, or passing that exam at the same time, and you must be 18 or older. Each exam section has 100 multiple-choice questions, and you need 170 out of 200. You can test at a Prometric centre or from home with remote proctoring.",
        "The specialty exam is about applying credits to new construction and major renovation projects, so the cards focus on what a project team decides: which prerequisite applies, what a credit requires, how points are earned, and what documentation proves it. Each card puts a project situation or credit name on the front and the requirement and its purpose on the back.",
      ],
    },
    {
      heading: "Studying with spaced repetition, and the v5 question",
      paragraphs: [
        "USGBC says LEED v5 is available for BD+C, ID+C and O+M, and that exams are now available for LEED v5. Before you start, open the specialty candidate handbook linked from USGBC's LEED AP page and confirm which version your exam covers, then study cards for that version only.",
        "**Plan:** take the free start of the [LEED AP BD+C practice test](/mock-exams/leed-ap-bd-c-readiness-check) to find weak credit categories. Add 15 to 20 new cards a day, starting with prerequisites, because they are required on every project, then move through the credit categories. Review every day, and in the final week stop adding cards and take timed runs. If you have not passed the Green Associate yet, review the [LEED Green Associate deck](/decks/leed-green-associate-anki-deck) first, or plan for the combined exam.",
        "After you pass, USGBC requires 30 continuing education hours every two years, 6 of them LEED-specific.",
      ],
    },
  ],
  sources: [
    { label: "USGBC — LEED AP with specialty", url: "https://www.usgbc.org/credentials/leed-ap", checked: CHECKED },
    { label: "USGBC — LEED credentials and maintenance", url: "https://www.usgbc.org/credentials", checked: CHECKED },
    { label: "USGBC — LEED v5", url: "https://www.usgbc.org/leed/v5", checked: CHECKED },
  ],
};
