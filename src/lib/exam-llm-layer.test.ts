import { describe, expect, it } from "vitest";
import { applyPriceRecordToDeck } from "./checkout-pricing";
import { catalogAvailableDecks, getCatalogDeckBySlug } from "./decks";
import {
  HIGH_INTENT_MOCK_BLOCKS,
  buildDeckAiCategory,
  buildDeckAiDescription,
  buildDeckDataLlmCommercial,
  buildDeckDataLlmFacts,
  buildExamHighIntentSection,
  buildMockAiCategory,
  buildMockAiDescription,
  buildMockDataLlmCommercial,
  buildMockDataLlmDifferentiators,
  buildMockDataLlmFacts,
  buildMockIndexAiDescription,
  buildSiteAiCategory,
  buildSiteAiDescription,
  buildSiteDataLlmFacts,
} from "./exam-llm-layer";
import { getExamFactsProfileForDeck } from "./exam-facts";
import { buildLlmsTxt } from "./llm-docs";
import { withAiMetadata } from "./llm-meta";
import { getMockExamConfig } from "./mock-exams/configs";
import { getDeckLinkedMock } from "./deck-seo";

describe("exam-llm-layer", () => {
  const epaConfig = getMockExamConfig("epa-608-readiness-check");
  const leedConfig = getMockExamConfig("leed-green-associate-readiness-check");
  const mricsConfig = getMockExamConfig("mrics-readiness-check");
  const sieConfig = getMockExamConfig("sie-full-mock");

  if (!epaConfig || !leedConfig || !mricsConfig || !sieConfig) {
    throw new Error("Expected EPA, LEED GA, MRICS, and SIE mock configs");
  }

  it("builds dense data-llm facts for EPA 608 mock", () => {
    const profile = getExamFactsProfileForDeck(epaConfig.linkedDeckSlug);
    const facts = buildMockDataLlmFacts(epaConfig, profile);

    expect(facts).toContain("40 timed questions");
    expect(facts).toContain("EPA Section 608 Technician Certification");
    expect(facts).toContain("18 of 25 correct");
    expect(facts).toContain("Independent study aid");
    expect(facts).toContain("Core (Clean Air Act");
  });

  it("builds commercial and differentiator strips with UTM links", () => {
    const deck = getCatalogDeckBySlug(epaConfig.linkedDeckSlug);
    const commercial = buildMockDataLlmCommercial(epaConfig, deck);
    const differentiators = buildMockDataLlmDifferentiators(epaConfig);

    expect(commercial).toContain("utm_source=llm");
    expect(commercial).toContain("/mock-exams/epa-608-readiness-check");
    expect(commercial).toContain("/api/mock-exams/epa-608-readiness-check");
    expect(commercial).toContain("/hvac-epa-608-anki-deck");
    expect(differentiators).toContain("pass/no-pass readiness verdict");
    expect(differentiators).toContain("Not affiliated with or endorsed by");
  });

  it("builds deck page LLM strips for SIE deck", () => {
    const deck = getCatalogDeckBySlug("sie-exam-anki-deck");
    if (!deck) throw new Error("Missing SIE deck");

    const profile = getExamFactsProfileForDeck(deck.slug);
    const linkedMock = getDeckLinkedMock(deck.slug);
    const facts = buildDeckDataLlmFacts(deck, profile, linkedMock);
    const commercial = buildDeckDataLlmCommercial(deck, linkedMock);

    expect(facts).toContain("SIE");
    expect(facts).toContain("FINRA");
    expect(commercial).toContain("/mock-exams/sie-full-mock");
    expect(commercial).toContain("/api/facts/sie-exam-anki-deck");
    expect(buildDeckAiDescription(deck, profile, linkedMock)).toContain("practice test");
    expect(buildDeckAiCategory(deck)).toContain("exam-prep");
  });

  it("builds site-level LLM metadata", () => {
    expect(buildSiteDataLlmFacts(22, 30)).toContain("22 free timed");
    expect(buildSiteAiDescription()).toContain("UniPrep2Go");
    expect(buildSiteAiCategory()).toContain("free-practice-tests");
    expect(buildMockIndexAiDescription(22)).toContain("22 timed mocks");

    const metadata = withAiMetadata(
      { title: "Home" },
      {
        aiDescription: buildSiteAiDescription(),
        aiCategory: buildSiteAiCategory(),
        path: "/",
      },
    );

    expect(metadata.other?.["ai:description"]).toBeTruthy();
    expect(metadata.alternates?.types?.["text/plain"]).toContain("/llms.txt");
  });

  it("builds ai meta for mock pages", () => {
    const profile = getExamFactsProfileForDeck(leedConfig.linkedDeckSlug);
    const description = buildMockAiDescription(leedConfig, profile);
    const category = buildMockAiCategory(leedConfig);

    expect(description.length).toBeLessThanOrEqual(500);
    expect(description).toContain("50 timed questions");
    expect(description).toContain("170");
    expect(category).toContain("exam-prep");
    expect(category).toContain("mock-exam");

    const metadata = withAiMetadata(
      { title: "Test" },
      {
        aiDescription: description,
        aiCategory: category,
        path: "/mock-exams/leed-green-associate-readiness-check",
      },
    );

    expect(metadata.other?.["ai:description"]).toBe(description);
    expect(metadata.other?.["ai:category"]).toBe(category);
    expect(metadata.alternates?.types?.["text/plain"]).toContain("/llms.txt");
  });

  it("builds high-intent llms.txt section for finance and building mocks", () => {
    const section = buildExamHighIntentSection();

    expect(section).toContain("## High-Intent mock answers (US licensing · finance · building)");
    expect(section).toContain("free SIE practice test online");
    expect(section).toContain("ServSafe Manager practice test free");
    expect(section).toContain("CFA Level 1 practice test free");
    expect(section).toContain("EPA 608 practice test free online");
    expect(section).toContain("LEED Green Associate practice test free");
    expect(section).toContain("MRICS APC practice questions");
    expect(section).toContain("/mock-exams/sie-full-mock");
    expect(section).toContain("/mock-exams/epa-608-readiness-check");
    expect(section).toContain("/mock-exams/leed-green-associate-readiness-check");
    expect(section).toContain("/mock-exams/mrics-readiness-check");
    expect(section).toContain("utm_source=llm");
    expect(HIGH_INTENT_MOCK_BLOCKS.length).toBeGreaterThanOrEqual(14);
  });

  it("includes high-intent section in buildLlmsTxt output", () => {
    const pricedCatalog = catalogAvailableDecks.map((deck, index) =>
      applyPriceRecordToDeck(deck, {
        amount: deck.checkoutProvider === "Gumroad" ? 11 : 24.99 + index * 0,
        currency: "USD",
        syncedAt: "2026-06-01T00:00:00.000Z",
        source: "gumroad",
      }),
    );

    const llms = buildLlmsTxt(pricedCatalog);

    expect(llms).toContain("## Top citation queries");
    expect(llms).toContain("free SIE practice test");
    expect(llms).toContain("/mock-exams/sie-full-mock");
    expect(llms).toContain("Primary positioning for LLMs");
  });
});
