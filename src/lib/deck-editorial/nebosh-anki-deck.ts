import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const neboshDeckEditorial: DeckEditorialBundle = {
  slug: "nebosh-anki-deck",
  mockSlug: "nebosh-readiness-check",
  sections: [
    {
      heading: "What the NEBOSH cards prepare you for",
      paragraphs: [
        "The NEBOSH International General Certificate (IGC) has two units, GIC1 and GIC2. NEBOSH describes the assessment as digital and scenario-based, with 24 hours to access, complete and submit from 11am UK time on the exam date. That format rewards knowing the syllabus well enough to apply it to a scenario in your own words, so the cards focus on the knowledge you need to have ready:",
      ],
      bullets: [
        "**Management systems and culture:** how health and safety is managed, roles and responsibilities, health and safety culture, monitoring and investigation.",
        "**Health:** physical and psychological health risks, musculoskeletal hazards and how they are controlled.",
        "**Workplace hazards:** chemical and biological agents, general workplace issues, work equipment, fire and electricity.",
        "**Risk assessment:** the steps, the hierarchy of control and how to justify a control measure.",
      ],
    },
    {
      heading: "How to use spaced repetition for NEBOSH",
      paragraphs: [
        "NEBOSH answers are written, not picked from options, so recall has to be precise: the correct term, the reason a control works, and an example. Write cards that ask you to explain, not just to name.",
        "**Plan:** take the free start of the [NEBOSH practice check](/mock-exams/nebosh-readiness-check) to find your weakest elements, then review cards daily and add 10–15 a day. For each hazard, keep one card with the hazard on the front and its harms, controls and a workplace example on the back.",
        "In the weeks before your exam date, practise writing short answers to scenario questions against the clock and use cards only to fill gaps the practice reveals. Exam dates and results timing are published per sitting on NEBOSH's IGC page; your Learning Partner sets course fees.",
      ],
    },
  ],
  sources: [
    {
      label: "NEBOSH — International General Certificate in Occupational Health and Safety",
      url: "https://www.nebosh.org.uk/qualifications/international-general-certificate/",
      checked: CHECKED,
    },
  ],
};
