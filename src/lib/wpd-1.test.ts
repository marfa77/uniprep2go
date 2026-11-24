import { describe, expect, it } from "vitest";
import { getDeckBySlug } from "./decks";
import { buildDeckSeoTitle } from "./deck-seo";
import { getMockExamConfig } from "./mock-exams/configs";
import { buildMockSeoTitle } from "./mock-exams/seo";

describe("WP-D — year token 2026 → 2027 on five exam pages (per-slug only)", () => {
  it("deck titles", () => {
    const t = (s: string) => buildDeckSeoTitle(getDeckBySlug(s)! as never);
    expect(t("series-7-anki-deck")).toBe("Series 7 Flashcards 2027 | 300 Cards + Free Mock");
    expect(t("cfa-level-1-anki-deck")).toBe("CFA Level 1 Anki Deck 2027 — 348 Cards, $19 | UniPrep2Go");
    expect(t("pmp-anki-deck")).toBe("2027 PMP Exam Prep | 346 cards + Free Practice Test");
  });
  it("mock titles", () => {
    const t = (s: string) => buildMockSeoTitle(getMockExamConfig(s)!);
    expect(t("gmat-focus-readiness-check")).toContain("Free GMAT Practice Test 2027");
    expect(t("pmp-readiness-check")).toContain("Free PMP Practice Test 2027");
  });
});
