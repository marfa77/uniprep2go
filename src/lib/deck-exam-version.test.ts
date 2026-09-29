import { describe, expect, it } from "vitest";
import { buildDeckExamVersionModel } from "./deck-exam-version";
import { getExamFactsProfileForDeck } from "./exam-facts";
import { getDeckBySlug } from "./decks";

describe("buildDeckExamVersionModel", () => {
  it("returns null when profile is null", () => {
    const deck = getDeckBySlug("ciple-a2-european-portuguese-anki-deck");
    expect(deck).toBeDefined();
    expect(buildDeckExamVersionModel(deck!, null)).toBeNull();
  });

  it("builds CFA Level 2 model with institute source and formatted review date", () => {
    const deck = getDeckBySlug("cfa-level-2-anki-deck");
    const profile = getExamFactsProfileForDeck("cfa-level-2-anki-deck");
    expect(deck).toBeDefined();
    expect(profile).not.toBeNull();

    const model = buildDeckExamVersionModel(deck!, profile);
    expect(model).not.toBeNull();
    expect(model!.doesNotReplace).toContain("CFA Institute");
    expect(model!.sourceUrl.startsWith("https://www.cfainstitute.org")).toBe(true);
    expect(model!.lastReviewed).toMatch(/^[A-Z][a-z]+ \d{4}$/);
    expect(model!.covers).toContain("495 cards");
    expect(model!.version).toContain("2026");
  });

  it("builds NEBOSH model with GIC2 disclaimer", () => {
    const deck = getDeckBySlug("nebosh-anki-deck");
    const profile = getExamFactsProfileForDeck("nebosh-anki-deck");
    expect(deck).toBeDefined();
    expect(profile).not.toBeNull();

    const model = buildDeckExamVersionModel(deck!, profile);
    expect(model).not.toBeNull();
    expect(model!.doesNotReplace).toContain("GIC2");
    expect(model!.covers).not.toMatch(/Planned cards/i);
    expect(model!.covers).toContain("GIC1");
  });

  it("falls back to administered_by when examKey has no map entry", () => {
    const deck = getDeckBySlug("gmat-focus-anki-deck");
    const profile = getExamFactsProfileForDeck("gmat-focus-anki-deck");
    expect(deck).toBeDefined();
    expect(profile).not.toBeNull();
    expect(profile!.examKey).toBe("gmat");

    const model = buildDeckExamVersionModel(deck!, profile);
    expect(model).not.toBeNull();
    expect(model!.doesNotReplace).toContain(profile!.exam_facts.administered_by);
    expect(model!.doesNotReplace).toContain("official");
    expect(model!.doesNotReplace).toContain("materials, practice exams, or required training");
  });
});
