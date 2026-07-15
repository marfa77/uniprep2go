import { describe, expect, it } from "vitest";
import { getDeckBySlug } from "./decks";
import {
  buildDeckSeoDescription,
  buildDeckSeoHeadline,
  buildDeckSeoTitle,
  buildDeckSearchFaqs,
} from "./deck-seo";

describe("deck SEO magnets", () => {
  it("frames FRM as exam prep with free mock in title and headline", () => {
    const deck = getDeckBySlug("frm-part-1-anki-deck");
    expect(deck).toBeDefined();

    expect(buildDeckSeoTitle(deck!)).toContain("FRM Part 1 Prep");
    expect(buildDeckSeoTitle(deck!)).toContain("Free Practice Test");
    expect(buildDeckSeoTitle(deck!)).not.toMatch(/Anki Deck/i);

    expect(buildDeckSeoHeadline(deck!)).toContain("FRM Part 1 Exam Prep");
    expect(buildDeckSeoDescription(deck!)).toContain("practice test");
  });

  it("frames SIE as exam prep with free mock", () => {
    const deck = getDeckBySlug("sie-exam-anki-deck");
    expect(buildDeckSeoTitle(deck!)).toContain("SIE");
    expect(buildDeckSeoTitle(deck!)).toContain("Mock");
  });

  it("adds search FAQs with practice test question when a mock is linked", () => {
    const deck = getDeckBySlug("frm-part-1-anki-deck");
    const faqs = buildDeckSearchFaqs(deck!);

    expect(faqs.some((faq) => faq.question.includes("practice test"))).toBe(true);
    expect(faqs.some((faq) => faq.question.includes("flashcards"))).toBe(true);
  });

  it("uses exam prep framing for language decks without anki-first titles", () => {
    const deck = getDeckBySlug("ciple-a2-european-portuguese-anki-deck");
    expect(buildDeckSeoTitle(deck!)).toContain("Exam Prep");
    expect(buildDeckSeoTitle(deck!)).not.toContain("UniPrep2Go");
  });

  it("uses a stable CAT4 exam prep description and keywords", () => {
    const deck = getDeckBySlug("cat4-level-d-anki-deck-printable-pdf");
    expect(deck).toBeDefined();
    expect(buildDeckSeoTitle(deck!)).toContain("CAT4 Level D Exam Prep");
    expect(buildDeckSeoDescription(deck!)).toContain("49-page printable PDF");
    expect(buildDeckSeoDescription(deck!)).toContain("GL Assessment");
  });
});
