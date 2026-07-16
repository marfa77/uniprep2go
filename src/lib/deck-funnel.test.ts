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
    expect(isMockFirstDeckPage("cfa-level-1-anki-deck")).toBe(true);
  });

  it("links formula PDF to CFA Level 1 Anki deck", () => {
    expect(getCompanionDeck("cfa-level-1-formula-reference-2026")?.slug).toBe(
      "cfa-level-1-anki-deck",
    );
  });

  it("links LEED GA to LEED AP BD+C through building companion map", () => {
    expect(getCompanionDeck("leed-green-associate-anki-deck")?.slug).toBe(
      "leed-ap-bd-c-anki-deck",
    );
  });

  it("links MRICS APC to MRICS QS through building companion map", () => {
    expect(getCompanionDeck("mrics-anki-deck")?.slug).toBe(
      "mrics-quantity-surveying-anki-deck",
    );
  });

  it("resolves direct mock for PTCB Anki deck", () => {
    const mock = getDeckPracticeMock("ptcb-pharmacy-technician-anki-deck");
    expect(mock?.slug).toBe("ptcb-pharmacy-technician-mock");
    expect(mock?.questionCount).toBe(90);
  });

  it("resolves companion mock for PTCB study guide PDF", () => {
    const mock = getDeckPracticeMock("ptcb-study-guide-2026");
    expect(mock?.slug).toBe("ptcb-pharmacy-technician-mock");
    expect(isMockFirstDeckPage("ptcb-study-guide-2026")).toBe(true);
  });
});
