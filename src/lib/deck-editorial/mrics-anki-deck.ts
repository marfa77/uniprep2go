import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const mricsDeckEditorial: DeckEditorialBundle = {
  slug: "mrics-anki-deck",
  mockSlug: "mrics-readiness-check",
  sections: [
    {
      heading: "What the MRICS cards prepare you for",
      paragraphs: [
        "The APC is assessed through a written submission and a 60-minute interview, so the deck targets what assessors can ask you to explain without notes:",
      ],
      bullets: [
        "**Mandatory competencies:** the everyday personal and professional business skills every pathway assesses, which share a 1,500-word limit in your summary of experience.",
        "**Ethics and the Rules of Conduct:** conflicts of interest, client money, complaints handling and professional indemnity, the area the interview chair can return to at the end.",
        "**Technical knowledge at Level 1:** definitions, legislation and standards for your pathway, the base you build Level 2 and 3 answers on.",
        "**Interview structure:** the 10-minute case study presentation, 10 minutes of questions on it, 30 minutes on wider experience and a 10-minute close.",
      ],
    },
    {
      heading: "How to use spaced repetition before the final interview",
      paragraphs: [
        "Cards help with recall under questioning: the exact name of a standard, a rule of conduct or a regulation you mention in your summary of experience. They don't write your submission or rehearse your case study.",
        "**Plan:** in the 8 weeks before interview, review daily and add 10–15 cards a week from questions your counsellor asks in mock interviews. Use the free start of the [MRICS practice test](/mock-exams/mrics-readiness-check) to find weak areas first.",
        "Turn your own summary of experience into cards: one card per competency claim, with the project example on the front and the follow-up questions an assessor might ask on the back. Reviewing these daily makes your answers specific under pressure.",
        "Submission word limits, CPD hours and the interview breakdown are on the practice test page. Quantity surveyors should add the [MRICS QS deck](/decks/mrics-quantity-surveying-anki-deck).",
      ],
    },
  ],
  sources: [
    { label: "RICS — APC submissions and assessment", url: "https://www.rics.org/candidates/assessment-information/apc-submissions-assessment", checked: CHECKED },
  ],
};
