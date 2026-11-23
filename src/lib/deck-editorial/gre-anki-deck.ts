import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const greDeckEditorial: DeckEditorialBundle = {
  slug: "gre-anki-deck",
  mockSlug: "gre-readiness-check",
  sections: [
    {
      heading: "What the GRE cards cover against ETS's sections",
      paragraphs: [
        "The current GRE General Test takes about 1 hour 58 minutes: one Analytical Writing task (30 minutes), then two Verbal Reasoning sections (12 and 15 questions) and two Quantitative Reasoning sections (12 and 15 questions) in any order. The cards cover the two scored multiple-choice measures:",
      ],
      bullets: [
        "**Verbal Reasoning:** word meanings and relationships between words and concepts, plus the reading skills ETS lists, such as identifying an author's assumptions and distinguishing major from minor points. Vocabulary in context is where spaced repetition helps most.",
        "**Quantitative Reasoning:** the arithmetic, algebra, geometry and data-analysis concepts ETS says the measure applies, as formulas, definitions and common setups. An on-screen calculator is available in this measure, so cards favour concepts and setups over long arithmetic.",
        "Analytical Writing is not a flashcard skill; practise it with timed essays instead.",
      ],
    },
    {
      heading: "How to study the GRE with spaced repetition",
      paragraphs: [
        "Both scored measures are section-level adaptive: your first Verbal or Quant section decides the difficulty of the second. That makes a strong first section valuable, and quick recall of words and formulas is what keeps it strong.",
        "**Plan:** take the free start of the [GRE practice test](/mock-exams/gre-readiness-check) to see which measure is weaker. Add 20 new cards a day from that measure and review daily. Learn words in short phrases rather than alone, and attach a one-line example to every formula card.",
        "In the last two weeks, stop adding cards and take ETS's free POWERPREP Online practice tests, which use the real test's design features, including mark and review and editing answers within a section. Test structure details are on the practice test page.",
      ],
    },
  ],
  sources: [
    { label: "ETS — GRE General Test structure", url: "https://www.ets.org/gre/test-takers/general-test/prepare/test-structure.html", checked: CHECKED },
    { label: "ETS — GRE General Test content", url: "https://www.ets.org/gre/test-takers/general-test/prepare/content.html", checked: CHECKED },
  ],
};
