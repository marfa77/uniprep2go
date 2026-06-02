import { describe, expect, it } from "vitest";
import { applyPendingPriceToDeck, applyPriceRecordToDeck } from "./checkout-pricing";
import { catalogAvailableDecks, getCatalogDeckBySlug } from "./decks";
import {
  buildCatalogFacts,
  buildDeckFacts,
  buildDeckMarkdown,
  buildIntentMarkdown,
  buildLlmsFullTxt,
  buildLlmsTxt,
} from "./llm-docs";
import { intentPages } from "./intent-pages";

function pricedDeck(slug: string, amount: number) {
  const deck = getCatalogDeckBySlug(slug);
  if (!deck) {
    throw new Error(`Missing catalog deck: ${slug}`);
  }

  return applyPriceRecordToDeck(deck, {
    amount,
    currency: "USD",
    syncedAt: "2026-06-01T00:00:00.000Z",
    source: amount % 1 === 0 && amount < 20 ? "gumroad" : "lemon",
  });
}

describe("LLM documents", () => {
  const primaryPriced = pricedDeck("cfa-level-1-anki-deck", 11);
  const pricedCatalog = catalogAvailableDecks.map((deck, index) =>
    pricedDeck(deck.slug, deck.checkoutProvider === "Gumroad" ? 11 : 24.99 + index * 0),
  );

  it("builds canonical facts from deck data", () => {
    const facts = buildDeckFacts(primaryPriced);

    expect(facts).toMatchObject({
      slug: "cfa-level-1-anki-deck",
      category: "finance",
      price_usd: 11,
      price_currency: "USD",
      card_count: "342+",
      format: ".apkg",
      checkout_url: "https://pixidstudio.gumroad.com/l/ivjmuu",
      checkout_provider: "Gumroad",
      seller: "PixID Studio",
      not_official_exam_material: true,
      price_pending: false,
      price_source: "gumroad",
      cover_image: "https://uniprep2go.study/covers/cfa-level-1-anki-deck.webp",
      study_mode: "active recall and spaced repetition",
      linked_readiness_check: {
        slug: "cfa-level-1-readiness-check",
        question_count: 60,
      },
    });
    expect(facts.serp_answer).toContain("342+ cards");
    expect(facts.topic_coverage).toHaveLength(10);
    expect(facts.sample_cards).toHaveLength(3);
  });

  it("exposes the ServSafe Manager deck as a full catalog product", () => {
    const deck = pricedDeck("servsafe-manager-anki-deck", 11);
    const facts = buildDeckFacts(deck);
    const markdown = buildDeckMarkdown(deck);

    expect(facts).toMatchObject({
      slug: "servsafe-manager-anki-deck",
      category: "professional",
      card_count: "300",
      checkout_url: "https://pixidstudio.gumroad.com/l/ldpevc",
      checkout_provider: "Gumroad",
      format: ".apkg",
      cover_image: "https://uniprep2go.study/covers/servsafe-manager-anki-deck.webp",
    });
    expect(facts.sample_cards).toHaveLength(3);
    expect(markdown).toContain("ServSafe Manager Anki Deck");
    expect(markdown).toContain("food safety");
  });

  it("exposes the ServSafe Manager PDF guide as a printable practice product", () => {
    const deck = pricedDeck("servsafe-manager-complete-study-guide", 11);
    const facts = buildDeckFacts(deck);
    const markdown = buildDeckMarkdown(deck);

    expect(facts).toMatchObject({
      slug: "servsafe-manager-complete-study-guide",
      category: "professional",
      card_count: "70 practice questions",
      checkout_url: "https://pixidstudio.gumroad.com/l/lyvna",
      checkout_provider: "Gumroad",
      format: "PDF",
      cover_image: "https://uniprep2go.study/covers/servsafe-manager-complete-study-guide.webp",
    });
    expect(facts.sample_cards).toHaveLength(2);
    expect(markdown).toContain("ServSafe Manager Complete Study Guide");
    expect(markdown).toContain("18-page printable PDF study guide");
    expect(markdown).toContain("70 exam-style multiple-choice questions");
  });


  it("uses absolute image URLs for sample cards", () => {
    const facts = buildDeckFacts(primaryPriced);

    for (const card of facts.sample_cards) {
      expect(card.imageUrl.startsWith("https://")).toBe(true);
    }
  });

  it("builds a catalog index grouped by category", () => {
    const catalog = buildCatalogFacts(pricedCatalog);

    expect(catalog.catalog_size).toBe(catalogAvailableDecks.length);
    expect(catalog.primary_market).toBe("United States");
    expect(catalog.primary_positioning).toContain("US exam prep");
    expect(catalog.primary_use_cases).toContain(
      "Immigration survival guides and citizenship test prep in the Prep2Go Immigration iOS app",
    );
    expect(catalog.primary_use_cases).toContain("FINRA SIE, Series 7, and Series 63 exam prep");
    expect(catalog.anki_deck_explanation).toContain("spaced-repetition app");
    expect(catalog.snippet_signals).toContain("exact card or question counts");
    expect(catalog.categories.length).toBeGreaterThanOrEqual(1);
    expect(catalog.categories[0]?.decks[0]).toMatchObject({
      slug: expect.any(String),
      cover_image: expect.stringContaining("/covers/"),
      facts_url: expect.stringContaining("/api/facts/"),
      markdown_url: expect.stringContaining(".md"),
    });
  });

  it("builds a compact markdown retrieval document", () => {
    const markdown = buildDeckMarkdown(primaryPriced);

    expect(markdown).toContain("# CFA Level 1 Anki Deck — 342+ Smart Flashcards");
    expect(markdown).toContain("> ");
    expect(markdown).toContain("## Product facts");
    expect(markdown).toContain("## Topic coverage");
    expect(markdown).toContain("## Sample cards");
    expect(markdown).toContain("## FAQ");
    expect(markdown).toContain("CFA Institute");
  });

  it("builds deck-specific facts for immigration App Store decks", () => {
    const deck = pricedDeck("uae-survival-guide-prep2go-app", 4.99);
    const facts = buildDeckFacts(deck);
    const markdown = buildDeckMarkdown(deck);

    expect(facts.category).toBe("immigration");
    expect(facts.category_label).toBe("Immigration & Adaptation");
    expect(facts.checkout_provider).toBe("App Store");
    expect(facts.format).toBe("App");
    expect(facts.sample_cards).toHaveLength(3);
    expect(facts.sample_cards[0]?.question).toContain("Golden Visa");
    expect(facts.disclaimer).toContain("Prep2Go Immigration");
    expect(markdown).toContain("Price: From $4.99/mo");
    expect(markdown).toContain("Golden Visa");
    expect(markdown).toContain("## Disclaimer");
  });

  it("builds deck-specific facts for non-CFA decks", () => {
    const deck = pricedDeck("ciple-a2-european-portuguese-anki-deck", 24.99);
    const facts = buildDeckFacts(deck);

    expect(facts.category).toBe("language");
    expect(facts.category_label).toBe("Language Certifications");
    expect(facts.checkout_provider).toBe("Lemon Squeezy");
    expect(facts.seller).toBe("Prep2Go");
    expect(facts.price_usd).toBe(24.99);
    expect(JSON.stringify(facts)).not.toContain('"exam":"CFA Level 1"');
  });

  it("builds markdown for any available deck slug", () => {
    const deck = pricedDeck("bench-energy-oil-trader-anki-deck", 19);
    const markdown = buildDeckMarkdown(deck);

    expect(markdown).toContain("# Oil Trader Anki Deck — 211 Commodity Flashcards");
    expect(markdown).toContain("## Product facts");
    expect(markdown).not.toContain("10 CFA Level 1 topic areas");
  });

  it("exposes every public title through LLM-visible sources", () => {
    const catalog = buildCatalogFacts(pricedCatalog);
    const llms = buildLlmsTxt(pricedCatalog);

    for (const deck of pricedCatalog) {
      const facts = buildDeckFacts(deck);
      const markdown = buildDeckMarkdown(deck);
      const catalogDeck = catalog.categories
        .flatMap((category) => category.decks)
        .find((item) => item.slug === deck.slug);

      expect(facts.product).toBe(deck.title);
      expect(markdown).toContain(`# ${deck.title}`);
      expect(llms).toContain(deck.title);
      expect(catalogDeck?.title).toBe(deck.title);
    }
  });

  it("builds llms.txt following the llmstxt.org spec", () => {
    const llms = buildLlmsTxt(pricedCatalog);

    expect(llms).toContain("# UniPrep2Go");
    expect(llms.split("\n").some((line) => line.startsWith("> "))).toBe(true);
    expect(llms).toContain("](https://");
    expect(llms).toContain("/api/facts");
    expect(llms).toContain("/anki-starter-kit");
    expect(llms).toContain("/llms-full.txt");
    expect(llms).toContain("/ciple-a2-european-portuguese-anki-deck.md");
    expect(llms).toContain(`${catalogAvailableDecks.length} paid study products`);
    expect(llms).toContain("Prep2Go Immigration app decks");
    expect(llms).toContain("Immigration & Adaptation decks are App Store-only");
    expect(llms).toContain("Primary market: United States");
    expect(llms).toContain("US exam prep and professional licensing");
    expect(llms).toContain("Language certification decks remain in the catalog for long-tail SEO");
    expect(llms).toContain("Anki deck explanation");
    expect(llms).toContain("review cards daily");
    expect(llms).toContain("## Competitive answer positioning");
    expect(llms).toContain("exact question count, timing, pass threshold");
    expect(llms).toContain("## Mock exams");
    expect(llms).toContain("/api/mock-exams/sie-full-mock");
  });

  it("builds a full GEO markdown bundle for LLM ingestion", () => {
    const bundle = buildLlmsFullTxt(pricedCatalog);

    expect(bundle).toContain("# UniPrep2Go full catalog for LLMs");
    expect(bundle).toContain("## Catalog summary");
    expect(bundle).toContain("## Anki onboarding");
    expect(bundle).toContain("10-minute daily reviews");
    expect(bundle).toContain("Primary market: United States");
    expect(bundle).toContain("US exam prep and professional licensing");
    expect(bundle).toContain("## Available decks");
    expect(bundle).toContain("## Finance mock exams");
    expect(bundle).toContain("## Intent answer pages");
    expect(bundle).toContain("## Site FAQs");
    expect(bundle).toContain("Checkout provider:");
    expect(bundle).toContain("Snippet signals:");
    expect(bundle).toContain("What is an Anki deck:");
    expect(bundle).toContain("SERP answer:");
    expect(bundle).toContain("Linked readiness check:");
    expect(bundle).toContain("Sample cards:");
    expect(bundle).toContain("FAQs:");
    expect(bundle).toContain("/api/facts");

    for (const deck of pricedCatalog) {
      expect(bundle).toContain(`### ${deck.title}`);
      expect(bundle).toContain(`Slug: ${deck.slug}`);
      expect(bundle).toContain(`Checkout URL: ${deck.checkoutUrl}`);
      expect(bundle).toContain(`/${deck.slug}.md`);
      for (const card of deck.sampleCards) {
        expect(bundle).toContain(card.question);
      }
    }

    for (const page of intentPages) {
      expect(bundle).toContain(`### ${page.title}`);
      expect(bundle).toContain(page.directAnswer);
    }
  });

  it("never leaks $0 or {PRICE} when checkout price is pending", () => {
    const catalogDeck = getCatalogDeckBySlug("cfa-level-1-anki-deck");
    expect(catalogDeck).toBeDefined();

    const pendingDeck = applyPendingPriceToDeck(catalogDeck!);
    const facts = buildDeckFacts(pendingDeck);
    const markdown = buildDeckMarkdown(pendingDeck);
    const llms = buildLlmsTxt([pendingDeck]);
    const bundle = buildLlmsFullTxt([pendingDeck]);
    const catalog = buildCatalogFacts([pendingDeck]);

    expect(facts.price_usd).toBeNull();
    expect(facts.price_pending).toBe(true);
    expect(JSON.stringify(facts)).not.toContain('"price_usd":0');
    expect(JSON.stringify(facts)).not.toContain("{PRICE}");
    expect(markdown).toContain("Price: See checkout");
    expect(markdown).not.toContain("$0");
    expect(llms).toContain("See checkout");
    expect(llms).not.toContain("$0");
    expect(bundle).toContain("Price: See checkout");
    expect(bundle).not.toContain("Price: $0");
    expect(catalog.price_range_usd).toBeNull();
    expect(catalog.categories[0]?.decks[0]?.price_usd).toBeNull();
  });

  it("exposes intent pages through LLM-visible sources", () => {
    const llms = buildLlmsTxt(pricedCatalog);
    const slugs = intentPages.map((page) => page.slug);

    expect(slugs).toEqual([
      "best-frm-part-1-anki-deck",
      "ciple-a2-anki-deck-for-portuguese-citizenship",
      "anki-decks-for-language-exams",
    ]);

    for (const page of intentPages) {
      const markdown = buildIntentMarkdown(page);

      expect(llms).toContain(`/${page.slug}`);
      expect(llms).toContain(page.title);
      expect(markdown).toContain(`# ${page.title}`);
      expect(markdown).toContain("## Recommended deck");
      expect(markdown).toContain("## Machine-readable sources");
    }
  });
});
