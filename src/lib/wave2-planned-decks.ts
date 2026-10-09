import type { PlannedDeck } from "./decks";
import { wave2MockExamConfigs } from "./mock-exams/wave2-configs";
import { plannedDeckFromMock } from "./planned-deck-from-mock";

const plannedDeckOverrides: Record<string, (deck: PlannedDeck) => PlannedDeck> = {
  "nbrc-tmc-readiness-check": (deck) => ({
    ...deck,
    directAnswer:
      "The NBRC TMC Anki Deck is a planned UniPrep2Go product and is not yet for sale. The NBRC TMC (160 items, 140 scored, 3 hours) runs through December 31, 2026; from January 4, 2027 the single Respiratory Therapy (RT) Examination (185 items, 160 scored, 4 hours) replaces TMC and CSE. Take the free 60-question readiness check at /mock-exams/nbrc-tmc-readiness-check, drawn from a 120-question scenario bank on content both exams share, then join the waitlist on this page.",
    lastUpdated: "2026-10-09",
    faqs: [
      ...deck.faqs,
      {
        question: "Will this deck cover the 2027 NBRC RT Examination?",
        answer:
          "That is the plan. The bank behind the free check targets clinical content shared by the TMC and the RT Examination: blood gases, ventilator management, oxygen and aerosol devices, infection control, neonatal and pediatric resuscitation, and emergencies. The RT Examination also adds a clinical-judgment portion and more neonatal and pediatric items, so verify your exam form and eligibility at nbrc.org.",
      },
    ],
  }),
};

export const wave2PlannedDecks: PlannedDeck[] = wave2MockExamConfigs.map((config) => {
  const deck = plannedDeckFromMock(config);
  return plannedDeckOverrides[config.slug]?.(deck) ?? deck;
});
