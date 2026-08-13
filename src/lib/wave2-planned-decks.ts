import type { PlannedDeck } from "./decks";
import { wave2MockExamConfigs } from "./mock-exams/wave2-configs";
import { plannedDeckFromMock } from "./planned-deck-from-mock";

export const wave2PlannedDecks: PlannedDeck[] = wave2MockExamConfigs.map((config) =>
  plannedDeckFromMock(config),
);
