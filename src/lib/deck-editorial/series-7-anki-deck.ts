import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const series7DeckEditorial: DeckEditorialBundle = {
  slug: "series-7-anki-deck",
  mockSlug: "series-7-readiness-check",
  sections: [
    {
      heading: "How the Series 7 cards map to FINRA's four job functions",
      paragraphs: [
        "FINRA's content outline sorts the 125 scored items by what a new representative does. The cards follow the same four functions, weighted the way the exam is:",
      ],
      bullets: [
        "**Function 3 (91 items):** most of the deck. Options strategies and their breakeven, maximum gain and maximum loss; bond yields and pricing; municipal securities; packaged products; retirement accounts; tax treatment; suitability.",
        "**Function 4 (14 items):** order types, settlement dates, confirmations and margin calculations, the facts you need exactly right.",
        "**Function 2 (11 items):** account types, required customer information and approvals.",
        "**Function 1 (9 items):** communications and solicitation rules.",
      ],
    },
    {
      heading: "A spaced-repetition routine that fits Series 7 study",
      paragraphs: [
        "Flashcards work for the Series 7 when they hold the rules and numbers you otherwise look up mid-question, so you can spend exam time on the customer scenario. Keep a daily review even on days you work practice questions.",
        "**Weeks 1–2:** after the free start of the [Series 7 practice test](/mock-exams/series-7-readiness-check), add 15–20 new cards a day from your weakest function. **Weeks 3–4:** keep reviews daily and suspend cards you answer instantly. **Final week:** stop adding cards and switch to full timed practice.",
        "Options deserve their own daily block: make one card per strategy with the position, the market outlook it suits, and the breakeven formula, then check yourself by working one number example from memory before flipping the card.",
        "Write a card for every practice question you miss, phrased as the rule you broke, not the question itself. Exam facts, the 19 Jan 2027 retake change and a study plan are on the practice test page; state law is a separate exam, covered by the [Series 63 deck](/decks/series-63-anki-deck).",
      ],
    },
  ],
  sources: [
    { label: "FINRA — Series 7 content outline (PDF)", url: "https://www.finra.org/sites/default/files/2025-10/Series_7_Content_Outline.pdf", checked: CHECKED },
  ],
};
