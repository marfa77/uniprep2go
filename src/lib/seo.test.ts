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
  geoMarkdownHeaders,
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

  it("marks GEO markdown surfaces noindex with HTML canonical", () => {
    const headers = new Headers(geoMarkdownHeaders("/decks/cfa-level-1-anki-deck"));
    expect(headers.get("X-Robots-Tag")).toBe("noindex, follow");
    expect(headers.get("Content-Type")).toContain("text/markdown");
    expect(headers.get("Link")).toBe(
      `<${absoluteUrl("/decks/cfa-level-1-anki-deck")}>; rel="canonical"`,
    );
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

  it("boosts money-funnel mocks and deprioritizes parked exams in sitemap", () => {
    expect(nicheGooglePrioritySlugs).toEqual([
      "sie-full-mock",
      "sie-quick-diagnostic",
      "series-7-readiness-check",
      "series-63-readiness-check",
      "series-65-readiness-check",
      "series-6-readiness-check",
      "series-66-readiness-check",
      "series-79-readiness-check",
      "cfp-certification-readiness-check",
      "enrolled-agent-readiness-check",
      "gmat-focus-readiness-check",
      "gre-readiness-check",
      "sat-readiness-check",
      "california-real-estate-readiness-check",
      "tx-real-estate-readiness-check",
      "cfa-level-1-readiness-check",
      "cfa-level-2-readiness-check",
      "frm-part-1-readiness-check",
      "ptcb-pharmacy-technician-mock",
      "nha-excpt-readiness-check",
      "mrics-quantity-surveying-readiness-check",
      "pmp-readiness-check",
      "nclex-rn-readiness-check",
      "shrm-cp-readiness-check",
      "us-citizenship-readiness-check",
      "rd-exam-readiness-check",
      "life-in-the-uk-readiness-check",
      "leben-in-deutschland-readiness-check",
      "naturalisation-francaise-readiness-check",
      "portugal-nacionalidade-readiness-check",
      "ccse-espana-readiness-check",
      "canadian-citizenship-readiness-check",
    ]);
    expect(isNicheGooglePrioritySlug("sie-full-mock")).toBe(true);
    expect(isNicheGooglePrioritySlug("cfa-level-1-readiness-check")).toBe(true);
    expect(isNicheGooglePrioritySlug("cfa-level-2-readiness-check")).toBe(true);
    expect(isNicheGooglePrioritySlug("ptcb-pharmacy-technician-mock")).toBe(true);
    expect(isNicheGooglePrioritySlug("frm-part-1-readiness-check")).toBe(true);
    expect(isNicheGooglePrioritySlug("nha-excpt-readiness-check")).toBe(true);
    expect(isNicheGooglePrioritySlug("mrics-quantity-surveying-readiness-check")).toBe(true);
    expect(isNicheGooglePrioritySlug("series-65-readiness-check")).toBe(true);
    expect(isNicheGooglePrioritySlug("series-66-readiness-check")).toBe(true);
    expect(isNicheGooglePrioritySlug("gmat-focus-readiness-check")).toBe(true);
    expect(isNicheGooglePrioritySlug("gre-readiness-check")).toBe(true);
    expect(isNicheGooglePrioritySlug("sat-readiness-check")).toBe(true);
    expect(isNicheGooglePrioritySlug("nclex-rn-readiness-check")).toBe(true);
    expect(isNicheGooglePrioritySlug("shrm-cp-readiness-check")).toBe(true);
    expect(isNicheGooglePrioritySlug("portugal-nacionalidade-readiness-check")).toBe(true);
    expect(isNicheGooglePrioritySlug("pmp-readiness-check")).toBe(true);
    expect(isNicheGooglePrioritySlug("us-citizenship-readiness-check")).toBe(true);
    expect(isNicheGooglePrioritySlug("rd-exam-readiness-check")).toBe(true);
    expect(isNicheGooglePrioritySlug("tx-real-estate-readiness-check")).toBe(true);
    expect(isNicheGooglePrioritySlug("life-in-the-uk-readiness-check")).toBe(true);
    expect(isNicheGooglePrioritySlug("leben-in-deutschland-readiness-check")).toBe(true);
    expect(isNicheGooglePrioritySlug("epa-608-readiness-check")).toBe(false);
    expect(googleHeadExamSlugs).not.toContain("cfa-level-1-readiness-check");
    expect(googleHeadExamSlugs).not.toContain("ptcb-pharmacy-technician-mock");
    expect(googleHeadExamSlugs).not.toContain("us-citizenship-readiness-check");
    expect(googleHeadExamSlugs).not.toContain("tx-real-estate-readiness-check");
    expect(googleHeadExamSlugs).not.toContain("rd-exam-readiness-check");
    expect(googleHeadExamSlugs).not.toContain("gmat-focus-readiness-check");
    expect(googleHeadExamSlugs).not.toContain("gre-readiness-check");
    expect(mockExamSitemapPriority("sie-full-mock")).toBe(0.98);
    expect(mockExamSitemapPriority("cfa-level-1-readiness-check")).toBe(0.98);
    expect(mockExamSitemapPriority("series-63-readiness-check")).toBe(0.98);
    expect(mockExamSitemapPriority("series-65-readiness-check")).toBe(0.98);
    expect(mockExamSitemapPriority("gmat-focus-readiness-check")).toBe(0.98);
    expect(mockExamSitemapPriority("gre-readiness-check")).toBe(0.98);
    expect(mockExamSitemapPriority("us-citizenship-readiness-check")).toBe(0.98);
    expect(mockExamSitemapPriority("epa-608-readiness-check")).toBe(0.72);
    expect(mockExamSitemapPriority("nremt-emt-readiness-check")).toBe(0.88);
    for (const slug of googleHeadExamSlugs) {
      expect(mockExamSitemapPriority(slug)).toBe(0.72);
    }
  });

  it("keeps thick explainers on parked building/RE mocks (pages stay live)", async () => {
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
