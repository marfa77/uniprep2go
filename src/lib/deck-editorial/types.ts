import type { EditorialSection, EditorialSource } from "@/lib/mock-exams/editorial/types";

/**
 * Deck-specific editorial block (250–400 words): what the cards cover against the official
 * outline and how to study the exam with spaced repetition. Exam facts live on the mock page;
 * never repeat mock-page paragraphs here.
 */
export type DeckEditorialBundle = {
  slug: string;
  /** Mock page that carries the full exam facts. */
  mockSlug?: string;
  sections: EditorialSection[];
  sources: EditorialSource[];
};
