import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const leedGaDeckEditorial: DeckEditorialBundle = {
  slug: "leed-green-associate-anki-deck",
  mockSlug: "leed-green-associate-readiness-check",
  sections: [
    {
      heading: "What the LEED Green Associate cards cover",
      paragraphs: [
        "USGBC says the Green Associate exam is currently based on LEED v5. It has 100 multiple-choice questions in two hours and needs 170 out of 200. The cards follow the rating system's structure:",
      ],
      bullets: [
        "**LEED process and integrative process:** certification levels, project roles, and how prerequisites differ from credits.",
        "**Location and transportation, sustainable sites and water efficiency:** credit intents, key thresholds and terms.",
        "**Energy and atmosphere:** commissioning, energy performance, renewables and refrigerant management.",
        "**Materials, resources and indoor environmental quality:** life-cycle thinking, waste, ventilation and occupant comfort.",
      ],
    },
    {
      heading: "How to use spaced repetition for LEED GA",
      paragraphs: [
        "Most LEED GA questions test whether you know what a credit is for and which requirement applies, so cards are written intent-first: the credit or concept on the front, its purpose and key requirement on the back.",
        "**Plan:** take the free start of the [LEED Green Associate practice test](/mock-exams/leed-green-associate-readiness-check), then add 15–20 cards a day across the rating system, weakest category first, and review daily. Check that any outside material you use is for LEED v5, not v4.",
        "Make a separate card for each prerequisite, since every project must meet them, and tag credits by category so you can review one category at a time when it scores low in practice.",
        "Measurements on the exam show imperial first and metric in parentheses, so learn thresholds in imperial units with metric on the same card. Exam fees, delivery and credential maintenance are on the practice test page; for study materials, see [whether free resources are enough for LEED GA](/blog/can-you-pass-leed-ga-free-resources-only).",
      ],
    },
  ],
  sources: [
    { label: "USGBC — LEED Green Associate", url: "https://www.usgbc.org/credentials/leed-green-associate", checked: CHECKED },
    { label: "USGBC Help Center — Preparing for the LEED Green Associate exam", url: "https://usgbc.my.site.com/support/s/article/Preparing-for-the-LEED-Green-Associate-exam", checked: CHECKED },
  ],
};
