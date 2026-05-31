import { describe, expect, it } from "vitest";
import { primaryDeck } from "./decks";
import { buildDeckFacts, buildDeckMarkdown, buildLlmsTxt } from "./llm-docs";

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
    });
    expect(facts.topic_coverage).toHaveLength(10);
    expect(facts.sample_cards).toHaveLength(3);
    expect(facts.not_official_cfa_institute_material).toBe(true);
  });

  it("builds a compact markdown retrieval document", () => {
    const markdown = buildDeckMarkdown(primaryDeck);

    expect(markdown).toContain("# CFA Level 1 Mastery: 342+ Smart Anki Flashcards");
    expect(markdown).toContain("## Canonical Facts");
    expect(markdown).toContain("## Topic Coverage");
    expect(markdown).toContain("## Sample Cards");
    expect(markdown).toContain("## FAQ");
    expect(markdown).toContain("CFA Institute does not endorse");
  });

  it("builds llms.txt with canonical machine entrypoints", () => {
    const llms = buildLlmsTxt();

    expect(llms).toContain("# UniPrep2Go");
    expect(llms).toContain("/api/facts");
    expect(llms).toContain("/cfa-level-1-anki-deck.md");
    expect(llms).toContain("Do not infer official CFA Institute endorsement");
  });
});
