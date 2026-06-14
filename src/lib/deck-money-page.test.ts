import { describe, expect, it } from "vitest";
import { catalogAvailableDecks, getDeckBySlug } from "./decks";
import { buildMergedDeckFaqs, collectDeckPageVisibleText } from "./deck-faq";
import { formatExamFocusedContent, getDeckShortPitch, getDeckLongDescription } from "./deck-page-copy";
import { getDeckPositioning } from "./deck-positioning";
import { getDeckUniqueContent } from "./deck-money-page-content";

describe("deck money pages", () => {
  it("fixes exam-focused content grammar for CFA", () => {
    const deck = getDeckBySlug("cfa-level-1-anki-deck")!;
    expect(formatExamFocusedContent(deck)).toBe("342+ exam-focused flashcards");
    expect(formatExamFocusedContent(deck)).not.toMatch(/of exam-focused content/);
  });

  it("uses distinct shortPitch, audience, and longDescription on FRM", () => {
    const deck = getDeckBySlug("frm-part-1-anki-deck")!;
    const pitch = getDeckShortPitch(deck);
    const long = getDeckLongDescription(deck);
    expect(pitch).not.toBe(long);
    expect(pitch).not.toBe(deck.audience);
    expect(long).toContain("GARP");
  });

  it("renders positioning without competitor brand names", () => {
    const deck = getDeckBySlug("sie-exam-anki-deck")!;
    const positioning = getDeckPositioning(deck);
    const blob = JSON.stringify(positioning);
    expect(blob).not.toMatch(/ankiweb|quizlet|brainscape|chegg/i);
    expect(positioning.alternatives).toHaveLength(2);
    expect(positioning.ourEdge.some((e) => /FINRA|SIE/i.test(e))).toBe(true);
  });

  it("merges FAQ into one block without duplicate questions", () => {
    const deck = getDeckBySlug("cfa-level-1-anki-deck")!;
    const faqs = buildMergedDeckFaqs(deck);
    const questions = faqs.map((f) => f.question.toLowerCase());
    expect(new Set(questions).size).toBe(questions.length);
    expect(faqs.length).toBeGreaterThanOrEqual(6);
    expect(faqs.length).toBeLessThanOrEqual(8);
    expect(faqs.some((f) => /CFA Level 1|passing score|questions are on/i.test(f.question))).toBe(true);
    expect(faqs.some((f) => /file format|import|official/i.test(f.question))).toBe(true);
  });

  it("includes exam-specific unique content for priority decks", () => {
    for (const slug of [
      "cfa-level-1-anki-deck",
      "cfa-level-1-formula-reference-2026",
      "ptcb-pharmacy-technician-anki-deck",
      "ptcb-study-guide-2026",
      "servsafe-manager-anki-deck",
    ]) {
      const content = getDeckUniqueContent(getDeckBySlug(slug)!);
      expect(content?.length).toBeGreaterThan(200);
      expect(content).not.toMatch(/spaced repetition helps you remember better/i);
    }
  });

  it("collects non-empty visible text for every catalog deck", () => {
    for (const deck of catalogAvailableDecks) {
      const text = collectDeckPageVisibleText(deck);
      expect(text.length).toBeGreaterThan(100);
    }
  });
});
