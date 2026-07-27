import { describe, expect, it } from "vitest";
import sitemap from "../../app/sitemap";
import {
  BLOG_STOCK_IMAGE_CONFIG,
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogPostsByCluster,
  getBlogPostsForDeckSlug,
  getBlogPostsForMockSlug,
  getRelatedBlogPosts,
} from "./index";
import { getMockExamConfig } from "../mock-exams/configs";
import { getDeckBySlug } from "../decks";
import { absoluteUrl } from "../site";

describe("blog guides", () => {
  it("publishes niche cluster guides with FAQ and product links", () => {
    const posts = getAllBlogPosts();
    expect(posts.map((post) => post.slug)).toEqual([
      "anki-vs-quizlet-professional-exam-prep",
      "nebosh-igc-vs-international-diploma-employers",
      "mrics-apc-vs-assocrics-pathway-cost",
      "well-ap-vs-fitwel-certification-2026",
      "leben-in-deutschland-test-english-preparation-guide",
      "cdl-hazmat-endorsement-state-fingerprinting-background-check",
      "swiss-citizenship-test-cantonal-format-questions",
      "florida-food-manager-certification-dbpr-rules",
      "california-real-estate-exam-dre-test-centers",
      "servsafe-manager-florida-requirements-2026",
      "california-real-estate-exam-psi-vs-pearson-vue",
      "epa-608-type-1-vs-type-2-which-first",
      "epa-608-practice-test-what-to-expect",
      "servsafe-manager-exam-study-guide-2026",
      "finra-sie-exam-prep-why-people-fail",
    ]);

    for (const post of posts) {
      expect(post.clusterId.length).toBeGreaterThan(0);
      expect(post.hero.src).toMatch(/^\/images\/blog\/.+\.webp$/);
      expect(post.hero.alt.length).toBeGreaterThan(10);
      expect(post.inlineImages.length).toBeGreaterThanOrEqual(1);
      expect(post.faqs.length).toBeGreaterThanOrEqual(6);
      expect(post.metaDescription.length).toBeGreaterThan(40);
      expect(post.sections.length).toBeGreaterThanOrEqual(4);
      expect(getMockExamConfig(post.mockSlug)).toBeDefined();
      expect(["available", "planned"]).toContain(getDeckBySlug(post.deckSlug)?.status);
    }
  });

  it("has a Pexels stock config for every published guide", () => {
    for (const post of getAllBlogPosts()) {
      expect(BLOG_STOCK_IMAGE_CONFIG[post.slug]).toBeDefined();
    }
  });

  it("wires niche exams as content clusters", () => {
    expect(getBlogPostsByCluster("servsafe").map((post) => post.slug).sort()).toEqual([
      "florida-food-manager-certification-dbpr-rules",
      "servsafe-manager-exam-study-guide-2026",
      "servsafe-manager-florida-requirements-2026",
    ]);
    expect(getBlogPostsByCluster("epa-608").map((post) => post.slug).sort()).toEqual([
      "epa-608-practice-test-what-to-expect",
      "epa-608-type-1-vs-type-2-which-first",
    ]);
    expect(getBlogPostsByCluster("california-real-estate").map((post) => post.slug).sort()).toEqual([
      "california-real-estate-exam-dre-test-centers",
      "california-real-estate-exam-psi-vs-pearson-vue",
    ]);
    expect(getBlogPostsByCluster("swiss-citizenship").map((post) => post.slug)).toEqual([
      "swiss-citizenship-test-cantonal-format-questions",
    ]);
    expect(getBlogPostsByCluster("cdl-hazmat").map((post) => post.slug)).toEqual([
      "cdl-hazmat-endorsement-state-fingerprinting-background-check",
    ]);
    expect(getBlogPostsByCluster("leben-in-deutschland").map((post) => post.slug)).toEqual([
      "leben-in-deutschland-test-english-preparation-guide",
    ]);
    expect(getBlogPostsByCluster("nebosh").map((post) => post.slug)).toEqual([
      "nebosh-igc-vs-international-diploma-employers",
    ]);
    expect(getBlogPostsByCluster("mrics").map((post) => post.slug)).toEqual([
      "mrics-apc-vs-assocrics-pathway-cost",
    ]);
    expect(getBlogPostsByCluster("well-ap").map((post) => post.slug)).toEqual([
      "well-ap-vs-fitwel-certification-2026",
    ]);
    expect(getBlogPostsByCluster("anki-study").map((post) => post.slug)).toEqual([
      "anki-vs-quizlet-professional-exam-prep",
    ]);

    const florida = getBlogPostBySlug("servsafe-manager-florida-requirements-2026");
    expect(getRelatedBlogPosts(florida!).map((post) => post.slug)).toContain(
      "servsafe-manager-exam-study-guide-2026",
    );
  });

  it("links guides to live mock and deck slugs", () => {
    expect(getBlogPostBySlug("leben-in-deutschland-test-english-preparation-guide")?.mockSlug).toBe(
      "leben-in-deutschland-readiness-check",
    );
    expect(getBlogPostBySlug("leben-in-deutschland-test-english-preparation-guide")?.deckSlug).toBe(
      "citizenship-naturalization-anki-bundle",
    );
    expect(getBlogPostBySlug("cdl-hazmat-endorsement-state-fingerprinting-background-check")?.mockSlug).toBe(
      "cdl-hazmat-readiness-check",
    );
    expect(getBlogPostBySlug("swiss-citizenship-test-cantonal-format-questions")?.mockSlug).toBe(
      "swiss-citizenship-readiness-check",
    );
    expect(getBlogPostBySlug("servsafe-manager-mock" as never)).toBeUndefined();
    expect(getBlogPostBySlug("florida-food-manager-certification-dbpr-rules")?.mockSlug).toBe(
      "servsafe-manager-mock",
    );
    expect(getBlogPostBySlug("finra-sie-exam-prep-why-people-fail")?.mockSlug).toBe("sie-full-mock");
    expect(getBlogPostBySlug("california-real-estate-exam-dre-test-centers")?.mockSlug).toBe(
      "california-real-estate-readiness-check",
    );
    expect(getBlogPostBySlug("epa-608-practice-test-what-to-expect")?.mockSlug).toBe(
      "epa-608-readiness-check",
    );
    expect(getBlogPostBySlug("nebosh-igc-vs-international-diploma-employers")?.mockSlug).toBe(
      "nebosh-readiness-check",
    );
    expect(getBlogPostBySlug("nebosh-igc-vs-international-diploma-employers")?.deckSlug).toBe(
      "nebosh-anki-deck",
    );
    expect(getBlogPostBySlug("mrics-apc-vs-assocrics-pathway-cost")?.mockSlug).toBe(
      "mrics-readiness-check",
    );
    expect(getBlogPostBySlug("well-ap-vs-fitwel-certification-2026")?.mockSlug).toBe(
      "well-ap-readiness-check",
    );
  });

  it("exposes reverse lookups from mock and deck slugs to guides", () => {
    expect(getBlogPostsForMockSlug("leben-in-deutschland-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForDeckSlug("citizenship-naturalization-anki-bundle").map((p) => p.slug)).toContain(
      "leben-in-deutschland-test-english-preparation-guide",
    );
    expect(getBlogPostsForMockSlug("california-real-estate-readiness-check").map((p) => p.slug)).toEqual(
      expect.arrayContaining([
        "california-real-estate-exam-dre-test-centers",
        "california-real-estate-exam-psi-vs-pearson-vue",
      ]),
    );
    expect(getBlogPostsForDeckSlug("hvac-epa-608-anki-deck").map((p) => p.slug)).toEqual(
      expect.arrayContaining([
        "epa-608-practice-test-what-to-expect",
        "epa-608-type-1-vs-type-2-which-first",
      ]),
    );
    expect(getBlogPostsForMockSlug("sie-full-mock")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("swiss-citizenship-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("cdl-hazmat-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("nebosh-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("mrics-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("well-ap-readiness-check")).toHaveLength(1);
  });

  it("lists the blog index and every post in the Google sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(absoluteUrl("/blog"));
    for (const post of getAllBlogPosts()) {
      expect(urls).toContain(absoluteUrl(`/blog/${post.slug}`));
    }
  });
});
