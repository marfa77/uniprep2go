import { describe, expect, it } from "vitest";
import { primaryDeck } from "./decks";
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
      product_type: "Anki flashcard deck",
      exam: "CFA Level 1",
      card_count: "342+",
      format: ".apkg",
      checkout_url: "https://pixidstudio.gumroad.com/l/ivjmuu",
      price_usd: 11,
      price_currency: "USD",
      last_updated: "2026-05-31",
    });
    expect(facts.topic_coverage).toHaveLength(10);
    expect(facts.sample_cards).toHaveLength(3);
    expect(facts.not_official_cfa_institute_material).toBe(true);
  });

  it("uses absolute image URLs for sample cards", () => {
    const facts = buildDeckFacts(primaryDeck);

    for (const card of facts.sample_cards) {
      expect(card.imageUrl.startsWith("https://")).toBe(true);
    }
  });

  it("builds a catalog index of available decks", () => {
    const catalog = buildCatalogFacts();

    expect(catalog.available_decks.length).toBeGreaterThanOrEqual(1);
    expect(catalog.available_decks[0]).toMatchObject({
      slug: "cfa-level-1-anki-deck",
      status: "available",
    });
    expect(catalog.available_decks[0]?.facts_url).toContain(
      "/api/facts/cfa-level-1-anki-deck",
    );
  });

  it("builds a compact markdown retrieval document", () => {
    const markdown = buildDeckMarkdown(primaryDeck);

    expect(markdown).toContain("# CFA Level 1 Mastery: 342+ Smart Anki Flashcards");
    expect(markdown).toContain("> ");
    expect(markdown).toContain("## Canonical Facts");
    expect(markdown).toContain("## Topic Coverage");
    expect(markdown).toContain("## Sample Cards");
    expect(markdown).toContain("## FAQ");
    expect(markdown).toContain("CFA Institute does not endorse");
  });

  it("builds llms.txt following the llmstxt.org spec", () => {
    const llms = buildLlmsTxt();

    expect(llms).toContain("# UniPrep2Go");
    expect(llms.split("\n").some((line) => line.startsWith("> "))).toBe(true);
    expect(llms).toContain("](https://");
    expect(llms).toContain("/api/facts");
    expect(llms).toContain("/cfa-level-1-anki-deck.md");
    expect(llms).toContain("/how-to-import-cfa-anki-deck");
    expect(llms).toContain("Do not infer official CFA Institute endorsement");
  });
});
