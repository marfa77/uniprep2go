import { describe, expect, it } from "vitest";
import { availableDecks, primaryDeck } from "./decks";
import {
  buildCatalogFacts,
  buildDeckFacts,
  buildDeckMarkdown,
  buildLlmsTxt,
} from "./llm-docs";

describe("LLM documents", () => {
  it("builds canonical facts from deck data", () => {
    const facts = buildDeckFacts(primaryDeck);

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
    });
    expect(facts.topic_coverage).toHaveLength(10);
    expect(facts.sample_cards).toHaveLength(3);
  });

  it("uses absolute image URLs for sample cards", () => {
    const facts = buildDeckFacts(primaryDeck);

    for (const card of facts.sample_cards) {
      expect(card.imageUrl.startsWith("https://")).toBe(true);
    }
  });

  it("builds a catalog index grouped by category", () => {
    const catalog = buildCatalogFacts();

    expect(catalog.catalog_size).toBe(availableDecks.length);
    expect(catalog.categories.length).toBeGreaterThanOrEqual(1);
    expect(catalog.categories[0]?.decks[0]).toMatchObject({
      slug: expect.any(String),
      facts_url: expect.stringContaining("/api/facts/"),
      markdown_url: expect.stringContaining(".md"),
    });
  });

  it("builds a compact markdown retrieval document", () => {
    const markdown = buildDeckMarkdown(primaryDeck);

    expect(markdown).toContain("# CFA Level 1 Mastery: 342+ Smart Anki Flashcards");
    expect(markdown).toContain("> ");
    expect(markdown).toContain("## Product facts");
    expect(markdown).toContain("## Topic coverage");
    expect(markdown).toContain("## Sample cards");
    expect(markdown).toContain("## FAQ");
    expect(markdown).toContain("CFA Institute");
  });

  it("builds deck-specific facts for non-CFA decks", () => {
    const deck = availableDecks.find(
      (item) => item.slug === "ciple-a2-european-portuguese-anki-deck",
    );

    expect(deck).toBeDefined();
    const facts = buildDeckFacts(deck!);

    expect(facts.category).toBe("language");
    expect(facts.category_label).toBe("Language Certifications");
    expect(facts.checkout_provider).toBe("Lemon Squeezy");
    expect(facts.seller).toBe("Prep2Go");
    expect(facts.price_usd).toBe(24.99);
    expect(JSON.stringify(facts)).not.toContain('"exam":"CFA Level 1"');
  });

  it("builds markdown for any available deck slug", () => {
    const deck = availableDecks.find(
      (item) => item.slug === "bench-energy-oil-trader-anki-deck",
    );

    expect(deck).toBeDefined();
    const markdown = buildDeckMarkdown(deck!);

    expect(markdown).toContain("# Bench Energy: OIL Trader's Lexicon");
    expect(markdown).toContain("## Product facts");
    expect(markdown).not.toContain("10 CFA Level 1 topic areas");
  });
  it("builds llms.txt following the llmstxt.org spec", () => {
    const llms = buildLlmsTxt();

    expect(llms).toContain("# UniPrep2Go");
    expect(llms.split("\n").some((line) => line.startsWith("> "))).toBe(true);
    expect(llms).toContain("](https://");
    expect(llms).toContain("/api/facts");
    expect(llms).toContain("/ciple-a2-european-portuguese-anki-deck.md");
    expect(llms).toContain(`${availableDecks.length} independent Anki flashcard decks`);
  });
});
