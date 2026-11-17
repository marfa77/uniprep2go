import { catalogAvailableDecks } from "./decks";
import { getAllMockExams } from "./mock-exams/configs";
import { isPrep2GoAppDeckSlug } from "./prep2go-app-decks";
import { shouldIndexMockExam } from "./seo";

/** Deck count for homepage/SEO — same surface as /api/facts `catalog_size` (priced catalog, no app-only guides). */
export function getHomeCatalogCounts() {
  const indexedMockCount = getAllMockExams().filter((mock) =>
    shouldIndexMockExam(mock.slug),
  ).length;
  const availableDeckCount = catalogAvailableDecks.filter(
    (deck) => !isPrep2GoAppDeckSlug(deck.slug),
  ).length;
  return { indexedMockCount, availableDeckCount };
}