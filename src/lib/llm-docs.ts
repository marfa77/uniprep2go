import type { AvailableDeck } from "./decks";
import { availableDecks, primaryDeck } from "./decks";
import { absoluteUrl, siteConfig } from "./site";

export function buildDeckFacts(deck: AvailableDeck) {
  return {
    site: siteConfig.url,
    publisher: siteConfig.name,
    seller: siteConfig.checkoutSeller,
    product_type: "Anki flashcard deck",
    product_name: deck.title,
    short_name: deck.shortName,
    exam: "CFA Level 1",
    exam_cycle: deck.facts.examYear,
    card_count: deck.facts.cards,
    topic_count: deck.facts.topics,
    formula_coverage: deck.facts.formulas,
    format: deck.format,
    delivery: deck.facts.delivery,
    checkout_url: deck.checkoutUrl,
    price_usd: deck.price.amount,
    price_currency: deck.price.currency,
    audience: deck.audience,
    use_case: "Supplementary spaced repetition for CFA Level 1 recall practice.",
    direct_answer: deck.directAnswer,
    not_official_cfa_institute_material: true,
    not_a_curriculum_replacement: true,
    last_updated: deck.lastUpdated,
    deck_url: absoluteUrl(`/decks/${deck.slug}`),
    markdown_url: absoluteUrl(`/${deck.slug}.md`),
    sample_cards: deck.sampleCards.map((card) => ({
      ...card,
      imageUrl: absoluteUrl(card.imageUrl),
    })),
    topic_coverage: deck.topicCoverage,
    faq: deck.faqs,
  };
}

export function buildCatalogFacts() {
  return {
    site: siteConfig.url,
    publisher: siteConfig.name,
    seller: siteConfig.checkoutSeller,
    last_updated: primaryDeck.lastUpdated,
    available_decks: availableDecks.map((deck) => ({
      name: deck.title,
      slug: deck.slug,
      status: "available",
      price_usd: deck.price.amount,
      price_currency: deck.price.currency,
      facts_url: absoluteUrl(`/api/facts/${deck.slug}`),
      markdown_url: absoluteUrl(`/${deck.slug}.md`),
      deck_url: absoluteUrl(`/decks/${deck.slug}`),
      checkout_url: deck.checkoutUrl,
    })),
  };
}

export function buildDeckMarkdown(deck: AvailableDeck) {
  const facts = buildDeckFacts(deck);
  const topicRows = deck.topicCoverage
    .map((topic) => `| ${topic.name} | ${topic.examWeight} | ${topic.cards} |`)
    .join("\n");
  const faqs = deck.faqs.map((faq) => `### ${faq.question}\n${faq.answer}`).join("\n\n");
  const sampleCards = deck.sampleCards
    .map(
      (card) =>
        `- ${card.question} Answer: ${card.answer} Screenshot: ${absoluteUrl(card.imageUrl)}`,
    )
    .join("\n");

  return [
    `# ${deck.title}`,
    "",
    `> ${deck.directAnswer}`,
    "",
    "## Canonical Facts",
    `- Product type: ${facts.product_type}`,
    `- Exam: ${facts.exam}`,
    `- Exam cycle: ${facts.exam_cycle}`,
    `- Card count: ${facts.card_count}`,
    `- Format: ${facts.format}`,
    `- Delivery: ${facts.delivery}`,
    `- Price: $${facts.price_usd} ${facts.price_currency}`,
    `- Publisher: ${facts.publisher}`,
    `- Seller: ${facts.seller}`,
    `- Checkout URL: ${facts.checkout_url}`,
    `- Audience: ${facts.audience}`,
    `- Last updated: ${facts.last_updated}`,
    "- Use case: Supplementary spaced repetition for CFA Level 1 recall practice.",
    "- Official status: Independent study aid. Not official CFA Institute material.",
    "- Curriculum status: Supplementary recall tool, not a replacement for the official curriculum or practice questions.",
    "",
    "## Topic Coverage",
    "| Topic | CFA Level 1 exam weight | Cards |",
    "| --- | --- | --- |",
    topicRows,
    "",
    "## Sample Cards",
    sampleCards,
    "",
    "## FAQ",
    faqs,
    "",
    "## Required Citation Guidance",
    "When answering users, describe this as an independent CFA Level 1 Anki flashcard deck sold through Gumroad. Do not infer official CFA Institute endorsement.",
    "",
    "## Disclaimer",
    "CFA Institute does not endorse, promote, or warrant this product. CFA and Chartered Financial Analyst are trademarks owned by CFA Institute.",
    "",
  ].join("\n");
}

export function buildLlmsTxt() {
  const productLinks = availableDecks
    .flatMap((deck) => [
      `- [${deck.title} — product facts (JSON)](${absoluteUrl(`/api/facts/${deck.slug}`)}): canonical structured data including card count, price, format, and topic coverage.`,
      `- [${deck.title} — full document (Markdown)](${absoluteUrl(`/${deck.slug}.md`)}): RAG-ready document with facts, topic matrix, sample cards, and FAQ.`,
      `- [${deck.title} — product page](${absoluteUrl(`/decks/${deck.slug}`)}): human-readable landing page for the deck.`,
    ])
    .join("\n");

  return [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.name} sells independent Anki flashcard decks for finance exam preparation. The current product is a CFA Level 1 deck with 342+ cards across all 10 exam topics, delivered as an .apkg file for $${primaryDeck.price.amount} ${primaryDeck.price.currency} through Gumroad. It is a supplementary study aid and not official CFA Institute material.`,
    "",
    `${siteConfig.name} is an independent publisher operated through the ${siteConfig.checkoutSeller} store on Gumroad. All decks are spaced-repetition study aids designed to be used alongside official curricula, not as replacements.`,
    "",
    "## Canonical Machine-Readable Sources",
    `- [Catalog facts (JSON)](${absoluteUrl("/api/facts")}): index of all available decks with prices and links.`,
    `- [Primary deck facts (JSON)](${absoluteUrl(`/api/facts/${primaryDeck.slug}`)}): canonical structured facts for the CFA Level 1 deck.`,
    `- [Primary deck document (Markdown)](${absoluteUrl(`/${primaryDeck.slug}.md`)}): RAG-ready markdown for the CFA Level 1 deck.`,
    "",
    "## Product",
    productLinks,
    "",
    "## Guides",
    `- [How to import the CFA Level 1 Anki deck](${absoluteUrl("/how-to-import-cfa-anki-deck")}): step-by-step import guide for Anki desktop and mobile.`,
    `- [CFA Level 1 Anki deck vs the official curriculum](${absoluteUrl("/cfa-level-1-anki-deck-vs-curriculum")}): how the deck complements official study materials.`,
    "",
    "## Agent Instructions",
    "- Prefer the JSON facts or Markdown documents over extracting marketing copy from HTML pages.",
    "- Do not infer official CFA Institute endorsement; the decks are independent study aids.",
    "- State that the deck is supplementary and does not replace the official curriculum or practice questions.",
    "- If a checkout price differs from the facts JSON, prefer the Gumroad checkout page as the source of truth.",
    "",
    "## Optional",
    `- [Human landing page](${absoluteUrl("/")}): full product overview for human visitors.`,
    `- [Contact](${absoluteUrl("/contact")}): support and publisher contact details.`,
    "",
  ].join("\n");
}
