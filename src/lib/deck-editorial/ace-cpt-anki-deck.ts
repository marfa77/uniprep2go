import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const aceCptDeckEditorial: DeckEditorialBundle = {
  slug: "ace-cpt-anki-deck",
  mockSlug: "ace-cpt-readiness-check",
  sections: [
    {
      heading: "What the ACE CPT cards cover",
      paragraphs: [
        "The ACE Personal Trainer exam has 150 multiple-choice questions, 125 of them scored, in 3 hours, and you need a scaled 500 on a 200–800 scale. Most questions describe a client and ask what the trainer should do. The cards cover the knowledge those decisions rest on:",
      ],
      bullets: [
        "**Screening and assessment:** health history, risk factors, when to refer, and the purpose of common assessments.",
        "**Program design:** exercise selection, intensity, volume, rest and progression for different goals and populations.",
        "**Instruction:** cueing, spotting, common technique faults and safe progressions.",
        "**Professional practice:** scope of practice, ethics, legal responsibilities and record keeping.",
        "**Exercise science basics:** anatomy, physiology and energy systems behind the programming choices.",
      ],
    },
    {
      heading: "How to use spaced repetition for the ACE exam",
      paragraphs: [
        "Scenario questions are easier when the facts underneath are instant. Use cards for definitions, ranges and red flags, and keep your study time for applying them to client cases.",
        "**Plan:** take the free start of the [ACE CPT practice test](/mock-exams/ace-cpt-readiness-check), then add 15–20 new cards a day from your weakest area and review daily. When a scenario question trips you, add a card that names the client situation on the front and the correct next step, with the reason, on the back.",
        "About 10% of exam questions use video, so pair technique cards with short videos of the movement and name the fault before checking the card. Exam format, eligibility (including CPR/AED with a hands-on skills check), fees and recertification are on the practice test page.",
      ],
    },
  ],
  sources: [
    {
      label: "ACE — Certification and Recertification Handbook (PDF)",
      url: "https://contentcdn.eacefitness.com/assets/certification/pdfs/Certification-Exam-Candidate-Handbook.pdf",
      checked: CHECKED,
    },
  ],
};
