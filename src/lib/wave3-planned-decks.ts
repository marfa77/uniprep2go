import type { PlannedDeck } from "./decks";
import { wave3MockExamConfigs } from "./mock-exams/wave3-configs";
import { plannedDeckFromMock } from "./planned-deck-from-mock";

export const wave3PlannedDecks: PlannedDeck[] = wave3MockExamConfigs.map((config) =>
  plannedDeckFromMock(config),
);
