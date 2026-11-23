import { describe, expect, it } from "vitest";
import { getAllMockExams } from "./mock-exams/configs";
import { availableDecks, getDeckBySlug } from "./decks";
import { shouldIndexDeck, shouldIndexMockExam } from "./seo";
import {
  EXAM_FAMILIES,
  getExamFamilyForMock,
  getRelatedForDeck,
  getRelatedForMock,
  type RelatedLink,
} from "./exam-families";

const FINRA_MOCK_SLUGS = [
  "sie-full-mock",
  "sie-quick-diagnostic",
  "series-6-readiness-check",
  "series-7-readiness-check",
  "series-63-readiness-check",
  "series-65-readiness-check",
  "series-66-readiness-check",
  "series-79-readiness-check",
  "series-99-readiness-check",
] as const;

function anchorsOf(links: RelatedLink[]): string[] {
  return links.map((l) => l.anchor);
}

function hrefsOf(links: RelatedLink[]): string[] {
  return links.map((l) => l.href);
}

describe("EXAM_FAMILIES", () => {
  it("defines 28 families", () => {
    expect(EXAM_FAMILIES).toHaveLength(28);
    expect(new Set(EXAM_FAMILIES.map((f) => f.id)).size).toBe(28);
    for (const family of EXAM_FAMILIES) {
      expect(family.hubHref.startsWith("/")).toBe(true);
      expect(family.members.length).toBeGreaterThan(0);
    }
  });
});

describe("getRelatedForMock", () => {
  it("returns 4–6 indexable links with no self-links or duplicates for every indexable mock", () => {
    for (const mock of getAllMockExams()) {
      if (!shouldIndexMockExam(mock.slug)) {
        continue;
      }
      const related = getRelatedForMock(mock.slug);
      expect(related.length, mock.slug).toBeGreaterThanOrEqual(4);
      expect(related.length, mock.slug).toBeLessThanOrEqual(6);
      const hrefs = hrefsOf(related);
      expect(new Set(hrefs).size, mock.slug).toBe(hrefs.length);
      expect(hrefs, mock.slug).not.toContain(`/mock-exams/${mock.slug}`);
      for (const href of hrefs) {
        if (href.startsWith("/mock-exams/")) {
          const slug = href.replace("/mock-exams/", "");
          expect(shouldIndexMockExam(slug), `${mock.slug} → ${slug}`).toBe(true);
        } else {
          const slug = href.replace("/decks/", "");
          const deck = getDeckBySlug(slug);
          expect(deck, `${mock.slug} → ${slug}`).toBeDefined();
          expect(shouldIndexDeck(deck!), `${mock.slug} → ${slug}`).toBe(true);
        }
      }
    }
  });

  it("includes SIE full mock on every indexable FINRA family mock page", () => {
    for (const slug of FINRA_MOCK_SLUGS) {
      if (!shouldIndexMockExam(slug)) {
        continue;
      }
      expect(getExamFamilyForMock(slug)?.id).toBe("finra");
      const related = getRelatedForMock(slug);
      if (slug === "sie-full-mock") {
        expect(related.some((l) => l.href.includes("sie-full-mock"))).toBe(false);
        continue;
      }
      expect(related.some((l) => l.href === "/mock-exams/sie-full-mock"), slug).toBe(true);
    }
  });

  it("puts linked deck first when indexable", () => {
    const related = getRelatedForMock("series-7-readiness-check");
    expect(related[0]?.href).toBe("/decks/series-7-anki-deck");
  });

  it("matches related anchor snapshots", () => {
    expect(anchorsOf(getRelatedForMock("sie-full-mock"))).toMatchSnapshot();
    expect(anchorsOf(getRelatedForMock("series-7-readiness-check"))).toMatchSnapshot();
    expect(anchorsOf(getRelatedForMock("cfa-level-1-readiness-check"))).toMatchSnapshot();
    expect(anchorsOf(getRelatedForMock("nclex-rn-readiness-check"))).toMatchSnapshot();
    expect(anchorsOf(getRelatedForMock("leed-green-associate-readiness-check"))).toMatchSnapshot();
  });
});

describe("getRelatedForDeck", () => {
  it("returns 4–6 indexable links with no self-links or duplicates for every indexable deck", () => {
    for (const deck of availableDecks) {
      if (!shouldIndexDeck(deck)) {
        continue;
      }
      const related = getRelatedForDeck(deck.slug);
      expect(related.length, deck.slug).toBeGreaterThanOrEqual(4);
      expect(related.length, deck.slug).toBeLessThanOrEqual(6);
      const hrefs = hrefsOf(related);
      expect(new Set(hrefs).size, deck.slug).toBe(hrefs.length);
      expect(hrefs, deck.slug).not.toContain(`/decks/${deck.slug}`);
      for (const href of hrefs) {
        if (href.startsWith("/decks/")) {
          const slug = href.replace("/decks/", "");
          const target = getDeckBySlug(slug);
          expect(target, `${deck.slug} → ${slug}`).toBeDefined();
          expect(shouldIndexDeck(target!), `${deck.slug} → ${slug}`).toBe(true);
        } else {
          const slug = href.replace("/mock-exams/", "");
          expect(shouldIndexMockExam(slug), `${deck.slug} → ${slug}`).toBe(true);
        }
      }
    }
  });

  it("includes SIE full mock on every indexable FINRA family deck page", () => {
    const finraDecks = [
      "sie-exam-anki-deck",
      "series-6-anki-deck",
      "series-7-anki-deck",
      "series-63-anki-deck",
    ] as const;
    for (const slug of finraDecks) {
      const deck = getDeckBySlug(slug);
      if (!deck || !shouldIndexDeck(deck)) {
        continue;
      }
      const related = getRelatedForDeck(slug);
      expect(related.some((l) => l.href === "/mock-exams/sie-full-mock"), slug).toBe(true);
    }
  });
});