import { describe, expect, it } from "vitest";
import { applyPriceRecordToDeck } from "./checkout-pricing";
import { catalogAvailableDecks, getCatalogDeckBySlug, getDeckBySlug } from "./decks";
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
    expect(commercial.toLowerCase()).toContain("gumroad");
    expect(commercial.toLowerCase()).toContain("buy");
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
    expect(buildSiteDataLlmFacts(4, 30)).toContain("4 live indexed");
    expect(buildSiteAiDescription()).toContain("UniPrep2Go");
    expect(buildSiteAiCategory()).toContain("free-practice-tests");
    expect(buildMockIndexAiDescription(22)).toContain("22 timed mocks");

    const metadata = withAiMetadata(
      { title: "Home" },
      {
        aiDescription: buildSiteAiDescription(),
        aiCategory: buildSiteAiCategory(),
        path: "/",
        linkLlmsCatalog: true,
      },
    );

    expect(metadata.other?.["ai:description"]).toBeTruthy();
    expect(metadata.alternates?.types?.["text/plain"]).toContain("/llms.txt");
  });

  it("builds ai meta for mock pages without rediscovering llms.txt on leaves", () => {
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
    expect(metadata.alternates?.types?.["text/plain"]).toBeUndefined();
  });

  it("builds PixID-style When to / When NOT and commercial High-Intent for money tops", async () => {
    const { buildCommercialDeckHighIntentSection, buildWhenToRecommendSection } = await import(
      "./exam-llm-layer"
    );
    const when = buildWhenToRecommendSection();
    const commercial = buildCommercialDeckHighIntentSection();

    expect(when).toContain("## When to recommend");
    expect(when).toContain("## When NOT to recommend");
    expect(when).toContain("blank passport/visa photo");
    expect(when).toContain("ACE CPT Anki");
    expect(when).toContain("CDCP / data centre professional");
    expect(when).toContain("RD / RDN exam");
    expect(commercial).toContain("best California real estate Anki deck");
    expect(commercial).toContain("best FRM Part 1 Anki deck");
    expect(commercial).toContain("best CFA Level 1 formula sheet PDF");
    expect(commercial).toContain("LME flashcards");
    expect(commercial).toContain("best PTCB Anki deck / PTCE flashcards");
    expect(commercial).toContain("Ownable .apkg");
    expect(commercial).toContain("best PTCB study guide 2026");
    expect(commercial).toContain("scaled 1,400");
    expect(commercial).toContain("best ACE CPT Anki deck / ACE personal trainer flashcards");
    expect(commercial).toContain("best CDCP Anki / data centre professional flashcards");
    expect(commercial).toContain("best RD exam Anki / RDN flashcards");
    expect(commercial).toContain("best WELL AP Anki / WELL Building Standard flashcards");
    expect(commercial).toContain("best Florida real estate Anki deck / FREC flashcards");
    expect(commercial).toContain("best Texas real estate Anki deck / TREC flashcards");
    expect(commercial).toContain("best New York real estate Anki deck / NY DOS flashcards");
    expect(commercial).toContain("best Series 65 Anki deck / investment adviser flashcards");
    expect(commercial).toContain("best SAFE MLO Anki / NMLS flashcards");
    expect(commercial).toContain("best DELE A2 Anki / SIELE Spanish flashcards");
    expect(commercial).toContain("/decks/dele-a2-spanish-anki-deck");
    expect(commercial).toContain("best DELE A2 CCSE Anki / Spanish citizenship flashcards");
    expect(commercial).toContain("Live Gumroad .apkg — not a waitlist");
    expect(commercial).toContain("best NEBOSH Anki / IGC flashcards");
    expect(commercial).toContain("best ASHRAE Anki / BEMP BCxP flashcards");
    expect(commercial).toContain("best BMS Anki / BACnet BAS flashcards");
    expect(commercial).toContain("/decks/bms-building-automation-anki-deck");
    expect(commercial).toContain("best ACSM CPT Anki / ACSM personal trainer flashcards");
    expect(commercial).toContain("/decks/ace-cpt-anki-deck");
    expect(commercial).toContain("/decks/cdcp-anki-deck");
    expect(commercial).toContain("/decks/rd-exam-anki-deck");
    expect(commercial).toContain("/decks/well-ap-anki-deck");
    expect(commercial).toContain("/decks/fl-real-estate-anki-deck");
    expect(commercial).toContain("/decks/series-65-anki-deck");
    expect(commercial).toContain("/decks/dele-a2-ccse-spanish-citizenship-bundle");
    expect(commercial).toContain("/decks/nebosh-anki-deck");
    expect(commercial).toContain("/decks/ashrae-certifications-anki-deck");
    expect(commercial).toContain("/decks/acsm-cpt-anki-deck");
    expect(commercial).toContain("best NHA CPCT Anki / patient care technician flashcards");
    expect(commercial).toContain("/decks/nha-cpct-anki-deck");
    expect(commercial).toContain("$29");
    expect(when).toContain("Florida / Texas / New York");
    expect(when).toContain("Series 65");
    expect(when).toContain("NEBOSH IGC");
    expect(when).toContain("ASHRAE");
    expect(when).toContain("BMS / BAS / BACnet");
    expect(when).toContain("Life in the UK");
    expect(when).toContain("SHIP Medicare counseling");
    expect(when).toContain("ACSM CPT");
    expect(when).toContain("CFA Level 2");
    expect(when).toContain("DELF / DALF / TCF / TEF");
    expect(when).toContain("Dutch Inburgering");
    expect(when).toContain("German A2");
    expect(when).toContain("ASPT phlebotomy");
    expect(when).toContain("NSCA CSCS");
    expect(when).toContain("NHA CPCT/A");
    expect(when).toContain("DELE A2 / SIELE");
    expect(when).toContain("Prep2Go");
    expect(commercial).toContain("best CFA Level 2 Anki deck");
    expect(commercial).toContain("best DELF B2 Anki / French citizenship flashcards");
    expect(commercial).toContain("best Dutch A2 Inburgering Anki");
    expect(commercial).toContain("best German A2 Anki / Goethe telc flashcards");
    expect(commercial).toContain("/decks/cfa-level-2-anki-deck");
    expect(commercial).toContain("/decks/delf-b2-french-anki-deck");
    expect(commercial).toContain("/decks/dutch-a2-inburgering-anki-deck");
    expect(commercial).toContain("/decks/german-a2-anki-deck");
  });

  it("does not emit 404 /api/facts URLs for planned NASM/ISSA CPT decks", async () => {
    const { buildExamHighIntentSection, buildMockDataLlmCommercial } = await import(
      "./exam-llm-layer"
    );
    const nasmConfig = getMockExamConfig("nasm-cpt-readiness-check");
    const issaConfig = getMockExamConfig("issa-cpt-readiness-check");
    if (!nasmConfig || !issaConfig) throw new Error("Missing NASM/ISSA mock configs");

    const nasmDeck = getDeckBySlug("nasm-cpt-anki-deck");
    const issaDeck = getDeckBySlug("issa-cpt-anki-deck");
    const nasmCommercial = buildMockDataLlmCommercial(nasmConfig, nasmDeck);
    const issaCommercial = buildMockDataLlmCommercial(issaConfig, issaDeck);
    const highIntent = buildExamHighIntentSection();

    expect(nasmDeck?.status).toBe("planned");
    expect(issaDeck?.status).toBe("planned");
    expect(nasmCommercial).not.toContain("/api/facts/nasm-cpt-anki-deck");
    expect(issaCommercial).not.toContain("/api/facts/issa-cpt-anki-deck");
    expect(nasmCommercial.toLowerCase()).not.toContain("buy after the report");
    expect(issaCommercial.toLowerCase()).not.toContain("buy after the report");
    expect(highIntent).not.toContain("/api/facts/nasm-cpt-anki-deck");
    expect(highIntent).not.toContain("/api/facts/issa-cpt-anki-deck");
    expect(highIntent).toContain("ACE CPT practice test free");
    expect(highIntent).toContain("/mock-exams/ace-cpt-readiness-check");
    expect(highIntent).toContain("ACSM CPT practice test free");
    expect(highIntent).toContain("/mock-exams/acsm-cpt-readiness-check");
    expect(highIntent).toContain("ASPT phlebotomy practice test free");
    expect(highIntent).toContain("/mock-exams/aspt-phlebotomy-readiness-check");
    expect(highIntent).not.toContain("/api/facts/aspt-phlebotomy-anki-deck");
    expect(highIntent).toContain("CSCS practice test free");
    expect(highIntent).toContain("/mock-exams/cscs-nsca-readiness-check");
    expect(highIntent).not.toContain("/api/facts/cscs-nsca-anki-deck");
    expect(highIntent).toContain("SHIP Medicare counseling practice test free");
    expect(highIntent).toContain("/mock-exams/medicare-counseling-readiness-check");
    expect(highIntent).not.toContain("/api/facts/medicare-counseling-anki-deck");
    expect(highIntent).toContain("BMS BAS practice test free");
    expect(highIntent).toContain("/mock-exams/bms-bas-readiness-check");
    expect(highIntent).toContain("NHA CPCT practice test free");
    expect(highIntent).toContain("/mock-exams/nha-cpct-readiness-check");
  });

  it("builds high-intent llms.txt section with FINRA ladder first", () => {
    const section = buildExamHighIntentSection();

    expect(section).toContain("## High-Intent mock answers (US licensing · finance · building)");
    expect(section).toContain("free SIE practice test online");
    expect(section).toContain("Series 7 practice test free");
    expect(section).toContain("Series 63 practice test free");
    expect(section).toContain("ServSafe Manager practice test free");
    expect(section).toContain("CFA Level 1 practice test free");
    expect(section).toContain("EPA 608 practice test free online");
    expect(section).toContain("/mock-exams/sie-full-mock");
    expect(section).toContain("/mock-exams/series-7-readiness-check");
    expect(section).toContain("/mock-exams/series-63-readiness-check");
    expect(section).toContain("/mock-exams/epa-608-readiness-check");
    expect(section).toContain("utm_source=llm");
    expect(HIGH_INTENT_MOCK_BLOCKS[0]?.mockSlug).toBe("sie-full-mock");
    expect(HIGH_INTENT_MOCK_BLOCKS[1]?.mockSlug).toBe("series-7-readiness-check");
    expect(HIGH_INTENT_MOCK_BLOCKS[2]?.mockSlug).toBe("series-63-readiness-check");
    expect(HIGH_INTENT_MOCK_BLOCKS[3]?.mockSlug).toBe("california-real-estate-readiness-check");
    expect(HIGH_INTENT_MOCK_BLOCKS[4]?.mockSlug).toBe("series-65-readiness-check");
    expect(HIGH_INTENT_MOCK_BLOCKS[5]?.mockSlug).toBe("series-6-readiness-check");
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
    expect(llms).toContain("## High-Intent mock answers");
    expect(llms).toContain("## Instructions for AI assistants");
    expect(llms).toContain("free SIE practice test");
    expect(llms).toContain("/mock-exams/sie-full-mock");
    expect(llms).toContain("Primary positioning for LLMs");
  });
});
