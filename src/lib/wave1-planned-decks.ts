import type { PlannedDeck } from "./decks";
import { wave1MockExamConfigs } from "./mock-exams/wave1-configs";
import { plannedDeckFromMock } from "./planned-deck-from-mock";

export const wave1PlannedDecks: PlannedDeck[] = wave1MockExamConfigs.map((config) =>
  plannedDeckFromMock(config),
);
