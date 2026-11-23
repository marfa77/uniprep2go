import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const servsafeDeckEditorial: DeckEditorialBundle = {
  slug: "servsafe-manager-anki-deck",
  mockSlug: "servsafe-manager-mock",
  sections: [
    {
      heading: "What the ServSafe Manager cards drill",
      paragraphs: [
        "The ServSafe Manager exam counts 80 of its 90 questions and needs 70%, meaning 56 correct, to pass. Many of those questions turn on an exact number or the right order of steps, which is what these cards hold:",
      ],
      bullets: [
        "**Time and temperature:** minimum internal cooking temperatures, hot- and cold-holding limits, and cooling steps.",
        "**Foodborne illness:** major pathogens, their sources and symptoms, and which conditions require excluding or restricting a food handler.",
        "**Contamination and hygiene:** handwashing steps, glove rules and allergen cross-contact.",
        "**Receiving, storage, cleaning and sanitizing:** storage order in the cooler, and the difference between cleaning and sanitizing.",
        "**HACCP and manager duties:** the seven principles in order, and corrective actions.",
      ],
    },
    {
      heading: "A spaced-repetition routine for ServSafe",
      paragraphs: [
        "Short daily reviews suit food-safety numbers better than a long cram the night before. Ten to fifteen minutes a day, on breaks or before a shift, is enough for this deck.",
        "**Plan:** take the free start of the [ServSafe Manager practice test](/mock-exams/servsafe-manager-mock), then add 15–20 new cards a day starting with your weakest area. Build one card per temperature fact with the food on the front and the number and unit on the back, so you can't mix up cooking and holding temperatures.",
        "Keep the HACCP principles as one ordered card plus one card per principle, so you can recall both the sequence and what each step means in a kitchen scenario.",
        "Two days before the exam, stop adding cards and clear your reviews. Exam format, the passing score, retake limits and proctoring rules are on the practice test page; for a reading plan, see the [ServSafe Manager study guide](/blog/servsafe-manager-exam-study-guide-2026).",
      ],
    },
  ],
  sources: [
    { label: "ServSafe — Manager FAQs", url: "https://www.servsafe.com/ServSafe-Manager/FAQs", checked: CHECKED },
  ],
};
