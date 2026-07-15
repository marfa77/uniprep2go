import { describe, expect, it } from "vitest";
import {
  getCompanionDeck,
  getDeckPracticeMock,
  isMockFirstDeckPage,
} from "./deck-funnel";

describe("deck funnel", () => {
  it("resolves companion mock for CFA formula PDF", () => {
    const mock = getDeckPracticeMock("cfa-level-1-formula-reference-2026");
    expect(mock?.slug).toBe("cfa-level-1-readiness-check");
  });

  it("marks formula PDF pages as mock-first", () => {
    expect(isMockFirstDeckPage("cfa-level-1-formula-reference-2026")).toBe(true);
    expect(isMockFirstDeckPage("cfa-level-1-anki-deck")).toBe(false);
  });

  it("links formula PDF to CFA Level 1 Anki deck", () => {
    expect(getCompanionDeck("cfa-level-1-formula-reference-2026")?.slug).toBe(
      "cfa-level-1-anki-deck",
    );
  });
});
