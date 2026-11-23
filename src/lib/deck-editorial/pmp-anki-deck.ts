import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const pmpDeckEditorial: DeckEditorialBundle = {
  slug: "pmp-anki-deck",
  mockSlug: "pmp-readiness-check",
  sections: [
    {
      heading: "How the PMP cards follow the Exam Content Outline",
      paragraphs: [
        "PMI's Exam Content Outline for the July 2026 update has three domains, and the deck is tagged the same way so you can filter by weak domain:",
      ],
      bullets: [
        "**Process (41%):** delivery approach, scope, schedule, finance, quality, procurement, resources, project status and closure. The largest share of cards.",
        "**People (33%):** shared vision, conflict, team leadership, stakeholder engagement and expectations, knowledge transfer and communication.",
        "**Business Environment (26%):** governance, compliance, change control, risk, issues and impediments, continuous improvement and organizational change.",
        "PMI spreads predictive, agile and hybrid approaches across all three domains (about 40% predictive), so many cards contrast how the same task works in each approach.",
      ],
    },
    {
      heading: "Using spaced repetition for a scenario-based exam",
      paragraphs: [
        "PMP questions are scenarios, so cards are for the vocabulary and rules underneath them: artifacts, agile roles and events, contract types, earned value formulas and what each ECO task expects of a project manager.",
        "**Plan:** take the free start of the [PMP practice test](/mock-exams/pmp-readiness-check), then add 20 new cards a day from your weakest domain and review daily. When a scenario question trips you, add a card stating what the project manager should do first and why.",
        "Because the exam mixes question formats, including matching, multiple-response and graphic-based items, phrase some cards as lists to order or pairs to match rather than single facts, so recall works in the same shape the exam asks for.",
        "Eligibility, exam length, breaks and retake rules are on the practice test page. Not eligible for the PMP yet? Compare the [CAPM practice test](/mock-exams/capm-readiness-check).",
      ],
    },
  ],
  sources: [
    { label: "PMI — PMP Examination Content Outline, July 2026 update (PDF)", url: "https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/pmp/pmp-examination-content-outline.pdf", checked: CHECKED },
  ],
};
