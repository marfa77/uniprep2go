import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const wellApDeckEditorial: DeckEditorialBundle = {
  slug: "well-ap-anki-deck",
  mockSlug: "well-ap-readiness-check",
  sections: [
    {
      heading: "What the WELL AP cards are built for",
      paragraphs: [
        "IWBI's WELL AP exam has 115 questions across 11 domains: every WELL concept, plus WELL Certification and WELL at scale. It is closed book, so you need the intent of each concept and feature in your head, even though the exam embeds some reference tables. IWBI recommends 2 to 3 months of preparation.",
        "The cards put a feature or a design situation on the front and its intent, the main requirement and the concept it belongs to on the back. That mirrors how the exam asks: not just what a feature is called, but why it exists and which part of a project it affects.",
        "With 2.5 hours for 115 questions, you have a little over a minute per question, and the passing score is 170 on a 125–200 range. Quick recall of intents is what leaves time for the questions that need a reference table.",
      ],
    },
    {
      heading: "Studying WELL with spaced repetition",
      paragraphs: [
        "**Plan:** take the free start of the [WELL AP practice test](/mock-exams/well-ap-readiness-check) to find your weakest concepts. Learn one concept at a time, adding 15 to 20 new cards a day, and review every day so earlier concepts stay fresh while you add new ones. Keep the certification process cards in daily review from the start; they apply to every project question.",
        "In the last two weeks, stop adding cards, read the reference tables IWBI says the exam embeds so you can use them quickly, and take timed runs. After you pass, the credential needs 30 continuing education hours every two years. To compare healthy-building credentials, see [WELL AP vs Fitwel](/blog/well-ap-vs-fitwel-certification-2026).",
      ],
    },
  ],
  sources: [
    { label: "IWBI — Explore the WELL AP exam", url: "https://www.wellcertified.com/well-ap-exam/", checked: CHECKED },
    { label: "IWBI — WELL AP", url: "https://www.wellcertified.com/well-ap/", checked: CHECKED },
  ],
};
