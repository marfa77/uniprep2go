import { describe, expect, it } from "vitest";
import { splitFaqs, shouldShowDeckPracticeMockSection, VISIBLE_FAQ_COUNT } from "./page-layout";

describe("page-layout", () => {
  it("splits FAQs into primary and extra buckets", () => {
    const faqs = Array.from({ length: 5 }, (_, index) => ({
      question: `Q${index + 1}`,
      answer: `A${index + 1}`,
    }));
    const { primary, extra } = splitFaqs(faqs);
    expect(primary).toHaveLength(VISIBLE_FAQ_COUNT);
    expect(extra).toHaveLength(2);
  });

  it("shows practice mock promo only for mock-first deck pages", () => {
    expect(shouldShowDeckPracticeMockSection("cfa-level-1-formula-reference-2026", true)).toBe(true);
    expect(shouldShowDeckPracticeMockSection("mrics-quantity-surveying-anki-deck", false)).toBe(false);
  });
});
