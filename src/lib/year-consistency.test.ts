import { describe, expect, it } from "vitest";
import { getAllBlogPosts } from "./blog";
import { availableDecks, getDeckBySlug } from "./decks";
import { buildDeckSeoTitle } from "./deck-seo";
import { getAllMockExams } from "./mock-exams/configs";
import { buildMockSeoDescription, buildMockSeoTitle } from "./mock-exams/seo";

function titleYear(text: string): "2026" | "2027" | null {
  const match = text.match(/\b(20(?:26|27))\b/);
  return match ? (match[1] as "2026" | "2027") : null;
}

/** Prep-cycle year in the first SERP-facing clause (not deep in official-date cites). */
function metaPrepYear(meta: string): "2026" | "2027" | null {
  const open = meta.slice(0, 100);
  if (/\b2027\b/.test(open) && !/\bprep\b.*\b2026\b/i.test(open)) {
    if (/\b2026\b/.test(open) && !/\b2027\b/.test(open.slice(0, 40))) return "2026";
    return "2027";
  }
  if (/\b2026\b/.test(open) && !/\b2027\b/.test(open.slice(0, 50))) return "2026";
  return null;
}

const BLOG_TITLE_TAG_META_ALLOWED: Record<string, string> = {
  // On-page H1 uses 2027 prep framing; titleTag keeps 2026 for the civic-exam introduction year.
  "france-naturalization-2026-civic-exam-b2-language-test": "2026",
};

describe("year consistency (title, meta, linked SKUs)", () => {
  it("linked live mock and deck SERP titles share the same prep-cycle year when both carry a year", () => {
    const mismatches: string[] = [];
    for (const mock of getAllMockExams()) {
      if (!mock.linkedDeckSlug) continue;
      const deck = getDeckBySlug(mock.linkedDeckSlug);
      if (!deck || deck.status === "planned") continue;
      const mockYear = titleYear(buildMockSeoTitle(mock));
      const deckYear = titleYear(buildDeckSeoTitle(deck));
      if (mockYear && deckYear && mockYear !== deckYear) {
        mismatches.push(`${mock.slug} (${mockYear}) ↔ ${deck.slug} (${deckYear})`);
      }
    }
    expect(mismatches).toEqual([]);
  });

  it("2027 mock titles do not use a 2026 practice-test meta lead", () => {
    for (const mock of getAllMockExams()) {
      const title = buildMockSeoTitle(mock);
      if (!title.includes("2027")) continue;
      const meta = buildMockSeoDescription(mock);
      expect(meta, mock.slug).not.toMatch(/practice test 2026:/i);
    }
  });

  it("blog titleTag prep year matches meta opening unless explicitly allowlisted", () => {
    for (const post of getAllBlogPosts()) {
      const tagYear = titleYear(post.titleTag);
      if (!tagYear) continue;
      const allowed = BLOG_TITLE_TAG_META_ALLOWED[post.slug];
      if (allowed) {
        expect(tagYear).toBe(allowed);
        continue;
      }
      const metaYear = metaPrepYear(post.metaDescription);
      if (metaYear) {
        expect(metaYear, post.slug).toBe(tagYear);
      }
    }
  });

  it("catalog deck titles with 2027 are not paired with stale 2026-only mock titles", () => {
    for (const { slug } of availableDecks) {
      const deck = getDeckBySlug(slug);
      if (!deck) continue;
      const mocks = getAllMockExams().filter((m) => m.linkedDeckSlug === slug && m.status === "live");
      if (mocks.length === 0) continue;
      const deckYear = titleYear(buildDeckSeoTitle(deck));
      if (deckYear !== "2027") continue;
      for (const mock of mocks) {
        const mockYear = titleYear(buildMockSeoTitle(mock));
        if (mockYear === "2026") {
          throw new Error(`${deck.slug} title 2027 but ${mock.slug} title still 2026`);
        }
      }
    }
  });
});