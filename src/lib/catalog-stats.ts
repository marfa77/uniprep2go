import { catalogAvailableDecks } from "./decks";
import { getAllMockExams } from "./mock-exams/configs";
import { shouldIndexDeck, shouldIndexMockExam } from "./seo";

export function getHomeCatalogCounts() {
  const indexedMockCount = getAllMockExams().filter((mock) =>
    shouldIndexMockExam(mock.slug),
  ).length;
  const availableDeckCount = catalogAvailableDecks.filter((deck) =>
    shouldIndexDeck(deck),
  ).length;
  return { indexedMockCount, availableDeckCount };
}