import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const ptcbDeckEditorial: DeckEditorialBundle = {
  slug: "ptcb-pharmacy-technician-anki-deck",
  mockSlug: "ptcb-pharmacy-technician-mock",
  sections: [
    {
      heading: "How the PTCB cards follow the PTCE content outline",
      paragraphs: [
        "PTCB's current PTCE outline has four domains. The cards are tagged by domain, weighted toward the largest:",
      ],
      bullets: [
        "**Medications (35%):** brand and generic names, drug classes, common indications, interactions and high-alert drugs. The biggest share of cards.",
        "**Patient Safety and Quality Assurance (23.75%):** look-alike and sound-alike drugs, error prevention, and hygiene and cleaning standards.",
        "**Order Entry and Processing (22.5%):** sig codes, abbreviations, days-supply and dosage calculations.",
        "**Federal Requirements (18.75%):** controlled-substance schedules and handling, and drug supply chain rules including DSCSA tracking and tracing, which the current outline added.",
      ],
    },
    {
      heading: "How to use spaced repetition for the PTCE",
      paragraphs: [
        "Most PTCE questions turn on a fact you either recall or don't: a drug class, a schedule, an abbreviation. That makes it one of the exams where daily card reviews pay off most.",
        "**Plan:** take the free start of the [PTCB practice test](/mock-exams/ptcb-pharmacy-technician-mock) to rank your domains. Add 15–20 new cards a day, starting with Medications, and keep reviews daily, even short ones on work breaks. Practise calculations as full problems; cards only hold the formulas and conversions.",
        "Group look-alike and sound-alike drug pairs on the same card so you learn the difference, not two isolated names. For controlled substances, put the drug on the front and its schedule plus one handling rule on the back. Tag cards by domain so you can review only Federal Requirements or Order Entry in the last week if those score lowest.",
        "Eligibility, the exam fee, scoring and retake rules are on the practice test page.",
      ],
    },
  ],
  sources: [
    { label: "PTCB — PTCE content outline (PDF)", url: "https://www.ptcb.org/wp-content/uploads/2025/07/PTCE-Content-Outline.pdf", checked: CHECKED },
  ],
};
