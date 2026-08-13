import type { PlannedDeck } from "./decks";
import { wave4MockExamConfigs } from "./mock-exams/wave4-configs";
import { plannedDeckFromMock } from "./planned-deck-from-mock";

export const wave4PlannedDecks: PlannedDeck[] = wave4MockExamConfigs.map((config) =>
  plannedDeckFromMock(config, { preferExplainer: true }),
);
