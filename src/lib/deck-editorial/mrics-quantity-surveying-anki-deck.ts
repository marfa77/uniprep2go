import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const mricsQsDeckEditorial: DeckEditorialBundle = {
  slug: "mrics-quantity-surveying-anki-deck",
  mockSlug: "mrics-quantity-surveying-readiness-check",
  sections: [
    {
      heading: "What the QS cards cover for the APC interview",
      paragraphs: [
        "Quantity Surveying candidates defend their technical competencies in a 60-minute final interview, after a written submission where technical competencies share a 4,000-word limit. The cards cover the knowledge those questions rest on:",
      ],
      bullets: [
        "**Cost planning and commercial management:** estimating stages, cost plans, cost reports and value engineering terms.",
        "**Measurement and quantification:** measurement rules, bills and schedules, and how quantities feed pricing.",
        "**Contract practice and procurement:** procurement routes, tendering, contract forms, variations, payment and final accounts.",
        "**Project finance and construction technology:** cash flow and funding terms, and the building elements behind the costs.",
        "**Ethics and mandatory competencies:** the Rules of Conduct and professional practice questions every candidate faces.",
      ],
    },
    {
      heading: "Using spaced repetition for QS interview recall",
      paragraphs: [
        "Interview answers need the right term, clause or rule on the first try, then your own project example. Cards handle the first part; your summary of experience supplies the second.",
        "**Plan:** run the free start of the [MRICS QS practice test](/mock-exams/mrics-quantity-surveying-readiness-check), review cards daily for 6–8 weeks, and add cards from every question your counsellor asks in a mock interview that you could not answer cleanly.",
        "Make cards from your own projects too: the front names a competency and a project, the back lists what you did, the options you weighed and the outcome. Reviewing these keeps your Level 2 and Level 3 examples specific and in the first person.",
        "Competency levels, word limits and the interview structure are on the practice test page. For mandatory competencies and ethics across all pathways, add the [MRICS deck](/decks/mrics-anki-deck).",
      ],
    },
  ],
  sources: [
    { label: "RICS — APC submissions and assessment", url: "https://www.rics.org/candidates/assessment-information/apc-submissions-assessment", checked: CHECKED },
  ],
};
