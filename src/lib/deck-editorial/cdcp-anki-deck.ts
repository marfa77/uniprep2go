import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const cdcpDeckEditorial: DeckEditorialBundle = {
  slug: "cdcp-anki-deck",
  mockSlug: "cdcp-readiness-check",
  sections: [
    {
      heading: "What the CDCP cards cover",
      paragraphs: [
        "The EXIN EPI CDCP exam is 40 closed-book multiple-choice questions in one hour, and you need 27 correct. It follows a mandatory 2-day course, so the cards are built to make the course material stick before and after the exam:",
      ],
      bullets: [
        "**Power:** utility feeds, UPS types, generators, redundancy levels and how power reaches the rack.",
        "**Cooling:** heat load, airflow management, hot and cold aisles, and the main cooling systems.",
        "**Racks, cabling and network infrastructure:** layouts, cable management and pathways.",
        "**Fire safety and physical security:** detection, suppression and access control.",
        "**Operations and standards:** monitoring, maintenance practice and the standards the course refers to.",
      ],
    },
    {
      heading: "How to study CDCP with spaced repetition",
      paragraphs: [
        "Two days is a lot of new vocabulary at once. Starting cards a week or two before the course means you recognize the terms when the trainer uses them, and keeping reviews going until exam day stops them fading.",
        "**Plan:** take the free start of the [CDCP readiness check](/mock-exams/cdcp-readiness-check), then review 15–20 new cards a day from your weakest area. Put each system's purpose and its failure risk on the same card, since many questions ask why a design choice matters.",
        "Write redundancy cards as comparisons, for example what changes between two power or cooling configurations and what that does to availability and cost, because the course keeps returning to those trade-offs.",
        "The exam allows about 90 seconds per question, so practise answering cards quickly rather than looking terms up. Exam facts, and how CDCP compares with BICSI's DCDC, are in [CDCP vs DCDC](/blog/cdcp-vs-dcdc-data-center-certification-first-step).",
      ],
    },
  ],
  sources: [
    { label: "EXIN — EXIN EPI Certified Data Centre Professional", url: "https://www.exin.com/data-protection-security/certified-data-centre-professional/", checked: CHECKED },
  ],
};
