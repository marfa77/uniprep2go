import { describe, expect, it } from "vitest";
import { catalogPlannedDecks, getDeckBySlug } from "./decks";
import { getAllMockExams } from "./mock-exams/configs";
import {
  googleHeadExamSlugs,
  isNicheGooglePrioritySlug,
  nicheGooglePrioritySlugs,
} from "./mock-exams/hub-clusters";
import { isMockExamRunnable } from "./mock-exams/question-bank";
import {
  deckRobots,
  finalize,
  INDEXABLE_STATE_RE_SLUGS,
  mockExamRobots,
  mockExamSitemapPriority,
  shouldIndexDeck,
  shouldIndexMockExam,
  truncateSeoTitle,
} from "./seo";
import { absoluteUrl } from "./site";

describe("seo utilities (Barakhlo patterns)", () => {
  it("truncates long titles for Ahrefs-safe length without ellipsis", () => {
    const long =
      "Free MRICS Quantity Surveying APC Readiness Check Practice Test Online";
    const truncated = truncateSeoTitle(long);
    expect(truncated.length).toBeLessThanOrEqual(57);
    expect(truncated.endsWith("…")).toBe(false);
  });

  it("enriches Open Graph with absolute URLs and site defaults", () => {
    const meta = finalize({
      title: "Test page",
      openGraph: {
        title: "Test page",
        description: "Desc",
        url: "/mock-exams/sie-full-mock",
      },
    });

    expect(meta.openGraph?.siteName).toBe("UniPrep2Go");
    expect(meta.openGraph?.locale).toBe("en_US");
    expect(meta.openGraph?.url).toBe(absoluteUrl("/mock-exams/sie-full-mock"));
  });

  it("indexes live runnable mocks linked to monetized decks", () => {
    expect(shouldIndexMockExam("epa-608-readiness-check")).toBe(true);
    expect(mockExamRobots("epa-608-readiness-check")).toBeUndefined();
    expect(shouldIndexMockExam("sie-full-mock")).toBe(true);
    expect(mockExamRobots("sie-full-mock")).toBeUndefined();
  });

  it("noindexes state-RE swarm outside CA/FL/TX/NY allowlist", () => {
    expect(shouldIndexMockExam("fl-real-estate-readiness-check")).toBe(true);
    expect(shouldIndexMockExam("california-real-estate-readiness-check")).toBe(true);
    expect(shouldIndexMockExam("tx-real-estate-readiness-check")).toBe(true);
    expect(shouldIndexMockExam("ny-real-estate-readiness-check")).toBe(true);
    expect(shouldIndexMockExam("az-real-estate-readiness-check")).toBe(false);
    expect(shouldIndexMockExam("al-real-estate-readiness-check")).toBe(false);
    expect(mockExamRobots("az-real-estate-readiness-check")).toEqual({
      index: false,
      follow: true,
    });
    expect(INDEXABLE_STATE_RE_SLUGS.size).toBe(4);
  });

  it("noindexes planned decks while keeping available decks indexable", () => {
    const planned = catalogPlannedDecks[0];
    expect(planned).toBeDefined();
    expect(shouldIndexDeck(planned)).toBe(false);
    expect(deckRobots(planned)).toEqual({ index: false, follow: true });

    const available = getDeckBySlug("sie-exam-anki-deck");
    expect(available?.status).toBe("available");
    if (available) {
      expect(shouldIndexDeck(available)).toBe(true);
      expect(deckRobots(available)).toBeUndefined();
    }
  });

  it("boosts niche Google priority slugs and deprioritizes head exams in sitemap", () => {
    expect(nicheGooglePrioritySlugs.length).toBeGreaterThanOrEqual(10);
    expect(isNicheGooglePrioritySlug("epa-608-readiness-check")).toBe(true);
    expect(isNicheGooglePrioritySlug("tx-real-estate-readiness-check")).toBe(true);
    expect(mockExamSitemapPriority("epa-608-readiness-check")).toBe(0.98);
    expect(mockExamSitemapPriority("sie-full-mock")).toBe(0.72);
    expect(mockExamSitemapPriority("nremt-emt-readiness-check")).toBe(0.88);
    for (const slug of googleHeadExamSlugs) {
      expect(mockExamSitemapPriority(slug)).toBe(0.72);
    }
  });

  it("keeps priority money mocks on thick niche explainers (whoFor + 6 FAQs)", async () => {
    const { getNicheExamExplainer } = await import("./mock-exams/niche-exam-explainers");
    for (const slug of [
      "nha-cpt-phlebotomy-readiness-check",
      "tx-real-estate-readiness-check",
      "epa-608-readiness-check",
      "leed-green-associate-readiness-check",
    ] as const) {
      const explainer = getNicheExamExplainer(slug);
      expect(explainer?.whoFor?.length).toBeGreaterThan(80);
      expect(explainer?.howToPrepare?.length).toBeGreaterThan(80);
      expect(explainer?.examFaqs?.length).toBeGreaterThanOrEqual(6);
      expect((explainer?.whatIsExam.split(/\s+/).length ?? 0)).toBeGreaterThan(60);
    }
  });

  it("indexes live runnable mocks and thick coming_soon waitlist mocks (except thin state-RE)", () => {
    for (const mock of getAllMockExams()) {
      if (mock.familyId === "state-re" && !INDEXABLE_STATE_RE_SLUGS.has(mock.slug)) {
        expect(shouldIndexMockExam(mock.slug)).toBe(false);
        continue;
      }
      if (mock.status === "live") {
        expect(shouldIndexMockExam(mock.slug)).toBe(isMockExamRunnable(mock.slug));
      } else if (mock.status === "coming_soon") {
        expect(shouldIndexMockExam(mock.slug)).toBe(true);
        expect(mockExamRobots(mock.slug)).toBeUndefined();
      }
    }
  });
});
