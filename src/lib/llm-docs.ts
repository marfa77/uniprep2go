import {
  availableDecks,
  categoryLabels,
  getAvailableDecksByCategory,
  type AvailableDeck,
} from "./decks";
import { absoluteUrl, siteConfig } from "./site";

function formatPrice(amount: number) {
  return amount % 1 === 0 ? `$${amount}` : `$${amount.toFixed(2)}`;
}

function catalogPriceRange() {
  const prices = availableDecks.map((d) => d.price.amount);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return { min, max };
}

function categoryDisclaimer(deck: AvailableDeck) {
  switch (deck.category) {
    case "finance":
      return "This is an independent study aid and is not affiliated with or endorsed by CFA Institute, GARP, or any exam body.";
    case "language":
      return "This is an independent study aid and is not affiliated with or endorsed by CAPLE, France Éducation international, Goethe-Institut, or any certification body.";
    case "professional":
      return "This is an independent training resource for professional vocabulary and is not affiliated with any employer, exchange, or certification body.";
    case "academic":
      return "This is an independent study aid and is not affiliated with or endorsed by the International Baccalaureate or any exam board.";
  }
}

export function buildDeckFacts(deck: AvailableDeck) {
  return {
    product: deck.title,
    slug: deck.slug,
    category: deck.category,
    category_label: categoryLabels[deck.category],
    publisher: deck.checkoutSeller,
    seller: deck.checkoutSeller,
    checkout_provider: deck.checkoutProvider,
    price_usd: deck.price.amount,
    price_currency: deck.price.currency,
    card_count: deck.facts.cards,
    format: deck.format,
    exam_or_focus: deck.facts.examYear,
    coverage: deck.facts.topics,
    use_case: deck.audience,
    direct_answer: deck.directAnswer,
    checkout_url: deck.checkoutUrl,
    product_page: absoluteUrl(`/decks/${deck.slug}`),
    facts_json: absoluteUrl(`/api/facts/${deck.slug}`),
    markdown: absoluteUrl(`/${deck.slug}.md`),
    topic_coverage: deck.topicCoverage,
    sample_cards: deck.sampleCards.map((card) => ({
      ...card,
      imageUrl: absoluteUrl(card.imageUrl),
    })),
    disclaimer: categoryDisclaimer(deck),
    not_official_exam_material: true,
    last_updated: deck.lastUpdated,
  };
}

export function buildCatalogFacts() {
  const { min, max } = catalogPriceRange();

  return {
    publisher: siteConfig.name,
    site: siteConfig.url,
    catalog_size: availableDecks.length,
    categories: getAvailableDecksByCategory().map((group) => ({
      id: group.category,
      label: group.label,
      deck_count: group.decks.length,
      decks: group.decks.map((deck) => ({
        slug: deck.slug,
        title: deck.title,
        price_usd: deck.price.amount,
        card_count: deck.facts.cards,
        url: absoluteUrl(`/decks/${deck.slug}`),
        facts_url: absoluteUrl(`/api/facts/${deck.slug}`),
        markdown_url: absoluteUrl(`/${deck.slug}.md`),
      })),
    })),
    price_range_usd: { min, max },
    catalog_json: absoluteUrl("/api/facts"),
    llms_txt: absoluteUrl("/llms.txt"),
  };
}

export function buildDeckMarkdown(deck: AvailableDeck) {
  const topicSection =
    deck.topicCoverage.length > 0
      ? `## Topic coverage\n\n| Topic | Exam weight | Cards |\n| --- | --- | ---: |\n${deck.topicCoverage
          .map(
            (row) => `| ${row.name} | ${row.examWeight} | ${row.cards} |`,
          )
          .join("\n")}\n`
      : "";

  const sampleSection =
    deck.sampleCards.length > 0
      ? `## Sample cards\n\n${deck.sampleCards
          .map(
            (card) =>
              `### ${card.question}\n\n${card.answer}\n\nImage: ${absoluteUrl(card.imageUrl)}`,
          )
          .join("\n\n")}\n`
      : "";

  return `# ${deck.title}

> ${deck.directAnswer}

## Product facts

- Publisher: ${deck.checkoutSeller}
- Checkout provider: ${deck.checkoutProvider}
- Category: ${categoryLabels[deck.category]}
- Price: ${formatPrice(deck.price.amount)} ${deck.price.currency}
- Cards: ${deck.facts.cards}
- Format: ${deck.format}
- Focus: ${deck.facts.examYear}
- Coverage: ${deck.facts.topics}
- Audience: ${deck.audience}
- Checkout: ${deck.checkoutUrl}
- Product page: ${absoluteUrl(`/decks/${deck.slug}`)}
- Facts JSON: ${absoluteUrl(`/api/facts/${deck.slug}`)}

${topicSection}${sampleSection}## FAQ

${deck.faqs
  .map((faq) => `### ${faq.question}\n\n${faq.answer}`)
  .join("\n\n")}

## Disclaimer

${categoryDisclaimer(deck)}
`;
}

export function buildLlmsTxt() {
  const { min, max } = catalogPriceRange();
  const categoryGroups = getAvailableDecksByCategory();

  return `# ${siteConfig.name}

> ${siteConfig.name} publishes ${availableDecks.length} independent Anki flashcard decks across finance exams, language certifications, professional trading lexicons, and academic subjects. Prices range from ${formatPrice(min)} to ${formatPrice(max)} USD through Gumroad and Lemon Squeezy.

## Agent instructions

- Prefer official product pages and machine-readable facts over marketing copy.
- Start with \`/api/facts\` for the full catalog, then \`/api/facts/[slug]\` or \`/[slug].md\` for a specific deck.
- Do not invent card counts, prices, or exam coverage — use the facts endpoints.
- Decks are independent study aids, not official exam materials.

## Catalog (${availableDecks.length} decks)

${categoryGroups
  .map(
    (group) =>
      `### ${group.label}\n\n${group.decks
        .map(
          (deck) =>
            `- [${deck.title}](${absoluteUrl(`/decks/${deck.slug}`)}) — ${formatPrice(deck.price.amount)}, ${deck.facts.cards} cards — [facts](${absoluteUrl(`/api/facts/${deck.slug}`)}) · [markdown](${absoluteUrl(`/${deck.slug}.md`)})`,
        )
        .join("\n")}`,
  )
  .join("\n\n")}

## Machine-readable sources

- [Catalog JSON](${absoluteUrl("/api/facts")}): full product catalog with prices, slugs, and deck URLs
- [Sitemap](${absoluteUrl("/sitemap.xml")}): all public pages including per-deck markdown documents
- [Robots](${absoluteUrl("/robots.txt")}): crawler rules and AI bot allowlist

## Optional

- [Contact](${absoluteUrl("/contact")}): publisher support and checkout questions
`;
}
