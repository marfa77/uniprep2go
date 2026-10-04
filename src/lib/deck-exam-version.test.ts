import { describe, expect, it } from "vitest";
import {
  buildDeckExamVersionModel,
  buildMockExamVersionModel,
  formatLastReviewed,
} from "./deck-exam-version";
import { getExamFactsProfileForDeck } from "./exam-facts";
import { getDeckBySlug } from "./decks";
import { getMockExamConfig } from "./mock-exams/configs";
import { formatMockStatLine, mockReadinessTargetLabel } from "./mock-exams/mock-labels";

describe("mock labels", () => {
  it("never renders a bare pass percentage", () => {
    expect(formatMockStatLine({ questionCount: 75, durationMinutes: 105, passPercent: 70 })).toBe(
      "75-question diagnostic · 105 min · 70% readiness target",
    );
    expect(mockReadinessTargetLabel(70)).toBe("UniPrep2Go readiness target: 70%");
  });
});

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
    expect(model!.lastReviewed).toMatch(/^[A-Z][a-z]+ \d{1,2}, \d{4}$/);
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

describe("formatLastReviewed", () => {
  it("renders a full calendar date", () => {
    expect(formatLastReviewed("2026-09-29")).toBe("September 29, 2026");
    expect(formatLastReviewed("not-a-date")).toBe("not-a-date");
  });
});

describe("buildMockExamVersionModel", () => {
  it.each([
    "sie-full-mock",
    "series-7-readiness-check",
    "cfa-level-1-readiness-check",
    "cfa-level-2-readiness-check",
    "frm-part-1-readiness-check",
  ])("builds the exam version block for finance mock %s", (slug) => {
    const config = getMockExamConfig(slug);
    expect(config).toBeDefined();
    const model = buildMockExamVersionModel(config!, getExamFactsProfileForDeck(config!.linkedDeckSlug));
    expect(model).not.toBeNull();
    expect(model!.sourceUrl).toMatch(/^https:\/\//);
    expect(model!.lastReviewed).toMatch(/^[A-Z][a-z]+ \d{1,2}, \d{4}$/);
    expect(model!.passRule).toContain("Official exam:");
    expect(model!.passRule).toContain(`${config!.passRule.passPercent}% readiness target`);
  });

  it("separates the CFA Level I MPS from the UniPrep2Go readiness target", () => {
    const config = getMockExamConfig("cfa-level-1-readiness-check")!;
    const model = buildMockExamVersionModel(config, getExamFactsProfileForDeck(config.linkedDeckSlug))!;
    expect(model.passRule).toMatch(/MPS/);
    expect(model.passRule).toContain("UniPrep2Go mock: 70% readiness target");
    expect(model.version).toContain("2026");
  });

  it("labels the SIE full mock as a 75-question diagnostic", () => {
    const config = getMockExamConfig("sie-full-mock")!;
    const model = buildMockExamVersionModel(config, getExamFactsProfileForDeck(config.linkedDeckSlug))!;
    expect(model.covers).toContain("75-question timed diagnostic");
    expect(config.officialSourceNote).toContain("80 items");
  });

  it("does not call the longer AHA BLS diagnostic shorter than HeartCode", () => {
    const config = getMockExamConfig("aha-bls-provider-readiness-check")!;
    const model = buildMockExamVersionModel(config, getExamFactsProfileForDeck(config.linkedDeckSlug))!;
    expect(model.covers).not.toMatch(/shorter than the official exam/i);
    expect(model.covers).toMatch(/25/);
  });
});
