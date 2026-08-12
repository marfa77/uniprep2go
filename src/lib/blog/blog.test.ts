import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
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
import { fitMetaDescription, fitSeoTitle } from "../seo";
import { absoluteUrl } from "../site";

describe("blog guides", () => {
  it("publishes niche cluster guides with FAQ and product links", () => {
    const posts = getAllBlogPosts();
    expect(posts.map((post) => post.slug)).toEqual([
      "czech-cce-language-vs-realie-civics-two-exams",
      "wallonie-citoyennete-francais-a2-parcours-integration",
      "australian-citizenship-test-our-common-bond-complete-guide",
      "polish-citizenship-wiedza-o-polsce-gap-2026",
      "czech-citizenship-exam-zkouska-z-realii-complete-guide",
      "cdl-general-knowledge-test-50-questions-what-to-expect",
      "canada-citizenship-test-20-questions-630-dollars",
      "us-naturalization-civics-test-100-questions-only-10",
      "life-in-the-uk-test-why-one-in-three-fail",
      "netherlands-inburgeringsexamen-five-exams-pass-guide",
      "france-naturalization-2026-civic-exam-b2-language-test",
      "germany-einbuergerungstest-vs-leben-in-deutschland-difference",
      "spain-citizenship-ccse-dele-a2-two-exams",
      "italy-citizenship-b1-test-cils-celi-not-civics",
      "luxembourg-vivre-ensemble-test-format-pass",
      "belgium-citizenship-test-flanders-vs-wallonia",
      "sweden-medborgarskapsprov-2026-new-test",
      "norway-statsborgerproven-format-questions-pass",
      "denmark-indfoedsretsproeven-47-percent-pass-rate",
      "portugal-nationality-test-2026-new-civic-exam",
      "how-many-practice-tests-before-servsafe-manager-exam",
      "cfa-level-1-vs-frm-part-1-which-to-choose",
      "can-you-pass-leed-ga-free-resources-only",
      "how-long-anki-decks-stay-current-exam-shelf-life",
      "finra-options-questions-read-without-getting-tricked",
      "cdcp-vs-dcdc-data-center-certification-first-step",
      "memorize-epa-608-refrigerant-numbers-method",
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
      if (post.mockSlug) {
        expect(getMockExamConfig(post.mockSlug)).toBeDefined();
        expect(post.cta.mockLabel?.length).toBeGreaterThan(0);
      } else {
        expect(post.cta.mockLabel).toBeUndefined();
      }
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
      "how-many-practice-tests-before-servsafe-manager-exam",
      "servsafe-manager-exam-study-guide-2026",
      "servsafe-manager-florida-requirements-2026",
    ]);
    expect(getBlogPostsByCluster("epa-608").map((post) => post.slug).sort()).toEqual([
      "epa-608-practice-test-what-to-expect",
      "epa-608-type-1-vs-type-2-which-first",
      "memorize-epa-608-refrigerant-numbers-method",
    ]);
    expect(getBlogPostsByCluster("cdcp").map((post) => post.slug)).toEqual([
      "cdcp-vs-dcdc-data-center-certification-first-step",
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
    expect(getBlogPostsByCluster("cdl-general-knowledge").map((post) => post.slug)).toEqual([
      "cdl-general-knowledge-test-50-questions-what-to-expect",
    ]);
    expect(getBlogPostsByCluster("leben-in-deutschland").map((post) => post.slug).sort()).toEqual([
      "germany-einbuergerungstest-vs-leben-in-deutschland-difference",
      "leben-in-deutschland-test-english-preparation-guide",
    ]);
    expect(getBlogPostsByCluster("france-naturalisation").map((post) => post.slug)).toEqual([
      "france-naturalization-2026-civic-exam-b2-language-test",
    ]);
    expect(getBlogPostsByCluster("netherlands-inburgering").map((post) => post.slug)).toEqual([
      "netherlands-inburgeringsexamen-five-exams-pass-guide",
    ]);
    expect(getBlogPostsByCluster("life-in-the-uk").map((post) => post.slug)).toEqual([
      "life-in-the-uk-test-why-one-in-three-fail",
    ]);
    expect(getBlogPostsByCluster("us-citizenship").map((post) => post.slug)).toEqual([
      "us-naturalization-civics-test-100-questions-only-10",
    ]);
    expect(getBlogPostsByCluster("canada-citizenship").map((post) => post.slug)).toEqual([
      "canada-citizenship-test-20-questions-630-dollars",
    ]);
    expect(getBlogPostsByCluster("australian-citizenship").map((post) => post.slug)).toEqual([
      "australian-citizenship-test-our-common-bond-complete-guide",
    ]);
    expect(getBlogPostsByCluster("czech-citizenship").map((post) => post.slug)).toEqual([
      "czech-cce-language-vs-realie-civics-two-exams",
      "czech-citizenship-exam-zkouska-z-realii-complete-guide",
    ]);
    expect(getBlogPostsByCluster("polish-citizenship").map((post) => post.slug)).toEqual([
      "polish-citizenship-wiedza-o-polsce-gap-2026",
    ]);
    expect(getBlogPostsByCluster("portugal-nacionalidade").map((post) => post.slug)).toEqual([
      "portugal-nationality-test-2026-new-civic-exam",
    ]);
    expect(getBlogPostsByCluster("denmark-citizenship").map((post) => post.slug)).toEqual([
      "denmark-indfoedsretsproeven-47-percent-pass-rate",
    ]);
    expect(getBlogPostsByCluster("norway-citizenship").map((post) => post.slug)).toEqual([
      "norway-statsborgerproven-format-questions-pass",
    ]);
    expect(getBlogPostsByCluster("sweden-citizenship").map((post) => post.slug)).toEqual([
      "sweden-medborgarskapsprov-2026-new-test",
    ]);
    expect(getBlogPostsByCluster("belgium-citizenship").map((post) => post.slug)).toEqual([
      "wallonie-citoyennete-francais-a2-parcours-integration",
      "belgium-citizenship-test-flanders-vs-wallonia",
    ]);
    expect(getBlogPostsByCluster("luxembourg-citizenship").map((post) => post.slug)).toEqual([
      "luxembourg-vivre-ensemble-test-format-pass",
    ]);
    expect(getBlogPostsByCluster("italy-citizenship").map((post) => post.slug)).toEqual([
      "italy-citizenship-b1-test-cils-celi-not-civics",
    ]);
    expect(getBlogPostsByCluster("spain-citizenship").map((post) => post.slug)).toEqual([
      "spain-citizenship-ccse-dele-a2-two-exams",
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
    expect(getBlogPostsByCluster("anki-study").map((post) => post.slug).sort()).toEqual([
      "anki-vs-quizlet-professional-exam-prep",
      "how-long-anki-decks-stay-current-exam-shelf-life",
    ]);
    expect(getBlogPostsByCluster("leed-ga").map((post) => post.slug)).toEqual([
      "can-you-pass-leed-ga-free-resources-only",
    ]);
    expect(getBlogPostsByCluster("cfa-frm").map((post) => post.slug)).toEqual([
      "cfa-level-1-vs-frm-part-1-which-to-choose",
    ]);
    expect(getBlogPostsByCluster("finra-sie").map((post) => post.slug).sort()).toEqual([
      "finra-options-questions-read-without-getting-tricked",
      "finra-sie-exam-prep-why-people-fail",
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
    expect(getBlogPostBySlug("cdl-general-knowledge-test-50-questions-what-to-expect")?.mockSlug).toBe(
      "cdl-general-knowledge-readiness-check",
    );
    expect(getBlogPostBySlug("cdl-general-knowledge-test-50-questions-what-to-expect")?.deckSlug).toBe(
      "cdl-general-knowledge-anki-deck",
    );
    expect(getBlogPostBySlug("swiss-citizenship-test-cantonal-format-questions")?.mockSlug).toBe(
      "swiss-citizenship-readiness-check",
    );
    expect(getBlogPostBySlug("servsafe-manager-mock" as never)).toBeUndefined();
    expect(getBlogPostBySlug("florida-food-manager-certification-dbpr-rules")?.mockSlug).toBe(
      "servsafe-manager-mock",
    );
    expect(getBlogPostBySlug("finra-sie-exam-prep-why-people-fail")?.mockSlug).toBe("sie-full-mock");
    expect(getBlogPostBySlug("finra-options-questions-read-without-getting-tricked")?.mockSlug).toBe(
      "sie-full-mock",
    );
    expect(getBlogPostBySlug("finra-options-questions-read-without-getting-tricked")?.deckSlug).toBe(
      "sie-exam-anki-deck",
    );
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
    expect(getBlogPostBySlug("cdcp-vs-dcdc-data-center-certification-first-step")?.mockSlug).toBe(
      "cdcp-readiness-check",
    );
    expect(getBlogPostBySlug("memorize-epa-608-refrigerant-numbers-method")?.mockSlug).toBe(
      "epa-608-readiness-check",
    );
    expect(getBlogPostBySlug("how-long-anki-decks-stay-current-exam-shelf-life")?.deckSlug).toBe(
      "hvac-epa-608-anki-deck",
    );
    expect(getBlogPostBySlug("can-you-pass-leed-ga-free-resources-only")?.mockSlug).toBe(
      "leed-green-associate-readiness-check",
    );
    expect(getBlogPostBySlug("can-you-pass-leed-ga-free-resources-only")?.deckSlug).toBe(
      "leed-green-associate-anki-deck",
    );
    expect(getBlogPostBySlug("cfa-level-1-vs-frm-part-1-which-to-choose")?.mockSlug).toBe(
      "cfa-level-1-readiness-check",
    );
    expect(getBlogPostBySlug("cfa-level-1-vs-frm-part-1-which-to-choose")?.deckSlug).toBe(
      "cfa-level-1-anki-deck",
    );
    expect(getBlogPostBySlug("how-many-practice-tests-before-servsafe-manager-exam")?.mockSlug).toBe(
      "servsafe-manager-mock",
    );
    expect(getBlogPostBySlug("czech-citizenship-exam-zkouska-z-realii-complete-guide")?.mockSlug).toBe(
      "czech-citizenship-readiness-check",
    );
    expect(getBlogPostBySlug("czech-citizenship-exam-zkouska-z-realii-complete-guide")?.deckSlug).toBe(
      "czech-a2-cce-anki-deck",
    );
    expect(getBlogPostBySlug("czech-cce-language-vs-realie-civics-two-exams")?.mockSlug).toBe(
      "czech-citizenship-readiness-check",
    );
    expect(getBlogPostBySlug("czech-cce-language-vs-realie-civics-two-exams")?.deckSlug).toBe(
      "czech-a2-cce-anki-deck",
    );
    expect(getBlogPostBySlug("polish-citizenship-wiedza-o-polsce-gap-2026")?.mockSlug).toBe(
      "polish-citizenship-readiness-check",
    );
    expect(getBlogPostBySlug("polish-citizenship-wiedza-o-polsce-gap-2026")?.deckSlug).toBe(
      "polish-a2-certyfikat-anki-deck",
    );
    expect(getBlogPostBySlug("australian-citizenship-test-our-common-bond-complete-guide")?.mockSlug).toBe(
      "australian-citizenship-readiness-check",
    );
    expect(getBlogPostBySlug("australian-citizenship-test-our-common-bond-complete-guide")?.deckSlug).toBe(
      "citizenship-naturalization-anki-bundle",
    );
    expect(getBlogPostBySlug("wallonie-citoyennete-francais-a2-parcours-integration")?.mockSlug).toBe(
      "belgium-wallonie-citoyennete-readiness-check",
    );
    expect(getBlogPostBySlug("wallonie-citoyennete-francais-a2-parcours-integration")?.deckSlug).toBe(
      "belgium-wallonie-citoyennete-anki-deck",
    );
    expect(getBlogPostBySlug("portugal-nationality-test-2026-new-civic-exam")?.mockSlug).toBe(
      "portugal-nacionalidade-readiness-check",
    );
    expect(getBlogPostBySlug("portugal-nationality-test-2026-new-civic-exam")?.deckSlug).toBe(
      "ciple-a2-european-portuguese-anki-deck",
    );
    expect(getBlogPostBySlug("denmark-indfoedsretsproeven-47-percent-pass-rate")?.mockSlug).toBe(
      "denmark-indfoedsretsproeven-readiness-check",
    );
    expect(getBlogPostBySlug("norway-statsborgerproven-format-questions-pass")?.mockSlug).toBe(
      "norway-statsborgerproven-readiness-check",
    );
    expect(getBlogPostBySlug("norway-statsborgerproven-format-questions-pass")?.deckSlug).toBe(
      "norwegian-a2-norskprove-anki-deck",
    );
    expect(getBlogPostBySlug("sweden-medborgarskapsprov-2026-new-test")?.mockSlug).toBe(
      "sweden-medborgarskapsprov-readiness-check",
    );
    expect(getBlogPostBySlug("sweden-medborgarskapsprov-2026-new-test")?.deckSlug).toBe(
      "swedish-a2-sfi-anki-deck",
    );
    expect(getBlogPostBySlug("belgium-citizenship-test-flanders-vs-wallonia")?.mockSlug).toBe(
      "belgium-flanders-mo-readiness-check",
    );
    expect(getBlogPostBySlug("belgium-citizenship-test-flanders-vs-wallonia")?.deckSlug).toBe(
      "dutch-a2-inburgering-anki-deck",
    );
    expect(getBlogPostBySlug("luxembourg-vivre-ensemble-test-format-pass")?.mockSlug).toBe(
      "luxembourg-vivre-ensemble-readiness-check",
    );
    expect(getBlogPostBySlug("italy-citizenship-b1-test-cils-celi-not-civics")?.mockSlug).toBeUndefined();
    expect(getBlogPostBySlug("italy-citizenship-b1-test-cils-celi-not-civics")?.deckSlug).toBe(
      "celi-b1-italian-anki-deck",
    );
    expect(getBlogPostBySlug("spain-citizenship-ccse-dele-a2-two-exams")?.mockSlug).toBe(
      "ccse-espana-readiness-check",
    );
    expect(getBlogPostBySlug("spain-citizenship-ccse-dele-a2-two-exams")?.deckSlug).toBe(
      "dele-a2-spanish-anki-deck",
    );
    expect(getBlogPostBySlug("germany-einbuergerungstest-vs-leben-in-deutschland-difference")?.mockSlug).toBe(
      "leben-in-deutschland-readiness-check",
    );
    expect(getBlogPostBySlug("germany-einbuergerungstest-vs-leben-in-deutschland-difference")?.deckSlug).toBe(
      "citizenship-naturalization-anki-bundle",
    );
    expect(getBlogPostBySlug("france-naturalization-2026-civic-exam-b2-language-test")?.mockSlug).toBe(
      "naturalisation-francaise-readiness-check",
    );
    expect(getBlogPostBySlug("france-naturalization-2026-civic-exam-b2-language-test")?.deckSlug).toBe(
      "delf-b2-french-anki-deck",
    );
    expect(getBlogPostBySlug("netherlands-inburgeringsexamen-five-exams-pass-guide")?.mockSlug).toBeUndefined();
    expect(getBlogPostBySlug("netherlands-inburgeringsexamen-five-exams-pass-guide")?.deckSlug).toBe(
      "dutch-a2-inburgering-anki-deck",
    );
    expect(getBlogPostBySlug("life-in-the-uk-test-why-one-in-three-fail")?.mockSlug).toBe(
      "life-in-the-uk-readiness-check",
    );
    expect(getBlogPostBySlug("life-in-the-uk-test-why-one-in-three-fail")?.deckSlug).toBe(
      "citizenship-naturalization-anki-bundle",
    );
    expect(getBlogPostBySlug("us-naturalization-civics-test-100-questions-only-10")?.mockSlug).toBe(
      "us-citizenship-readiness-check",
    );
    expect(getBlogPostBySlug("us-naturalization-civics-test-100-questions-only-10")?.deckSlug).toBe(
      "citizenship-naturalization-anki-bundle",
    );
    expect(getBlogPostBySlug("canada-citizenship-test-20-questions-630-dollars")?.mockSlug).toBe(
      "canadian-citizenship-readiness-check",
    );
    expect(getBlogPostBySlug("canada-citizenship-test-20-questions-630-dollars")?.deckSlug).toBe(
      "citizenship-naturalization-anki-bundle",
    );
  });

  it("exposes reverse lookups from mock and deck slugs to guides", () => {
    expect(getBlogPostsForMockSlug("leben-in-deutschland-readiness-check")).toHaveLength(2);
    expect(getBlogPostsForDeckSlug("citizenship-naturalization-anki-bundle").map((p) => p.slug)).toEqual(
      expect.arrayContaining([
        "leben-in-deutschland-test-english-preparation-guide",
        "germany-einbuergerungstest-vs-leben-in-deutschland-difference",
      ]),
    );
    expect(getBlogPostsForMockSlug("naturalisation-francaise-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("life-in-the-uk-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("us-citizenship-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("canadian-citizenship-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForDeckSlug("dutch-a2-inburgering-anki-deck").map((p) => p.slug)).toEqual(
      expect.arrayContaining([
        "netherlands-inburgeringsexamen-five-exams-pass-guide",
        "belgium-citizenship-test-flanders-vs-wallonia",
      ]),
    );
    expect(getBlogPostsForDeckSlug("delf-b2-french-anki-deck").map((p) => p.slug)).toContain(
      "france-naturalization-2026-civic-exam-b2-language-test",
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
        "memorize-epa-608-refrigerant-numbers-method",
        "anki-vs-quizlet-professional-exam-prep",
        "how-long-anki-decks-stay-current-exam-shelf-life",
      ]),
    );
    expect(getBlogPostsForMockSlug("cdcp-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("sie-full-mock").map((p) => p.slug).sort()).toEqual([
      "finra-options-questions-read-without-getting-tricked",
      "finra-sie-exam-prep-why-people-fail",
    ]);
    expect(getBlogPostsForMockSlug("swiss-citizenship-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("cdl-hazmat-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("cdl-general-knowledge-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("nebosh-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("mrics-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("well-ap-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("leed-green-associate-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("cfa-level-1-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("portugal-nacionalidade-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("czech-citizenship-readiness-check")).toHaveLength(2);
    expect(getBlogPostsForMockSlug("denmark-indfoedsretsproeven-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("norway-statsborgerproven-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("sweden-medborgarskapsprov-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("belgium-flanders-mo-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("belgium-wallonie-citoyennete-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("luxembourg-vivre-ensemble-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForMockSlug("ccse-espana-readiness-check")).toHaveLength(1);
    expect(getBlogPostsForDeckSlug("celi-b1-italian-anki-deck").map((p) => p.slug)).toContain(
      "italy-citizenship-b1-test-cils-celi-not-civics",
    );
  });

  it("meets Google indexability checklist for every guide", async () => {
    const { isGoogleSitemapMoneyBlogSlug } = await import("../google-sitemap-allowlist");
    const titles = new Set<string>();
    const metas = new Set<string>();
    const sitemapUrls = new Set(sitemap().map((entry) => entry.url));

    for (const post of getAllBlogPosts()) {
      expect(post.relatedSlugs.length).toBeGreaterThanOrEqual(1);
      expect(post.faqs.length).toBeGreaterThanOrEqual(6);
      expect(post.sections.length).toBeGreaterThanOrEqual(4);
      expect(post.hero.alt.length).toBeGreaterThan(10);
      expect(existsSync(join(process.cwd(), "public", post.hero.src))).toBe(true);
      for (const image of post.inlineImages) {
        expect(existsSync(join(process.cwd(), "public", image.src))).toBe(true);
      }
      // Google sitemap keeps money-supporting posts only; others stay live + crawlable.
      if (isGoogleSitemapMoneyBlogSlug(post.slug)) {
        expect(sitemapUrls.has(absoluteUrl(`/blog/${post.slug}`))).toBe(true);
      }
      expect(fitSeoTitle(post.titleTag, 60).length).toBeLessThanOrEqual(60);
      expect(fitMetaDescription(post.metaDescription).length).toBeLessThanOrEqual(155);
      expect(titles.has(post.titleTag)).toBe(false);
      expect(metas.has(post.metaDescription)).toBe(false);
      titles.add(post.titleTag);
      metas.add(post.metaDescription);
      for (const related of post.relatedSlugs) {
        expect(getBlogPostBySlug(related)).toBeDefined();
      }
      const faqQuestions = post.faqs.map((faq) => faq.question);
      expect(new Set(faqQuestions).size).toBe(faqQuestions.length);
    }
  });

  it("lists the blog index and money-supporting posts in the Google sitemap", async () => {
    const { getGoogleSitemapBlogSlugs } = await import("../google-sitemap-allowlist");
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(absoluteUrl("/blog"));
    for (const slug of getGoogleSitemapBlogSlugs()) {
      expect(urls).toContain(absoluteUrl(`/blog/${slug}`));
      const entry = sitemap().find((item) => item.url === absoluteUrl(`/blog/${slug}`));
      expect(entry?.lastModified).toBeInstanceOf(Date);
    }
    // Non-money citizenship dumps stay out of Google sitemap.
    expect(urls).not.toContain(absoluteUrl("/blog/portugal-nationality-test"));
  });
});
