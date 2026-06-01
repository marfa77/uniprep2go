import {
  categoryLabels,
  categoryOrder,
  siteFaqs,
  type CatalogAvailableDeck,
} from "./decks";
import type { PricedDeck } from "./checkout-pricing";
import { getIntentPageDecks, intentPages, type IntentPage } from "./intent-pages";
import { absoluteUrl, siteConfig } from "./site";

function formatPrice(amount: number) {
  return amount % 1 === 0 ? `$${amount}` : `$${amount.toFixed(2)}`;
}

function isPricePending(deck: PricedDeck) {
  return deck.pricePending === true || deck.price.amount <= 0;
}

function formatLlmPriceLabel(deck: PricedDeck) {
  if (isPricePending(deck)) {
    return "See checkout";
  }

  return `${formatPrice(deck.price.amount)} ${deck.price.currency}`;
}

function formatLlmPriceUsd(deck: PricedDeck) {
  if (isPricePending(deck)) {
    return null;
  }

  return deck.price.amount;
}

function formatCatalogPriceRangeLabel(decks: PricedDeck[]) {
  const { min, max } = catalogPriceRange(decks);

  if (min <= 0 || max <= 0) {
    return "See checkout at each product page";
  }

  if (min === max) {
    return `${formatPrice(min)} USD`;
  }

  return `${formatPrice(min)} to ${formatPrice(max)} USD`;
}

function groupDecksByCategory(decks: PricedDeck[]) {
  return categoryOrder
    .map((category) => ({
      category,
      label: categoryLabels[category],
      decks: decks.filter((deck) => deck.category === category),
    }))
    .filter((group) => group.decks.length > 0);
}

function catalogPriceRange(decks: PricedDeck[]) {
  const prices = decks.map((d) => d.price.amount).filter((amount) => amount > 0);
  const min = prices.length > 0 ? Math.min(...prices) : 0;
  const max = prices.length > 0 ? Math.max(...prices) : 0;
  return { min, max };
}

function categoryDisclaimer(deck: PricedDeck | CatalogAvailableDeck) {
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

export function buildDeckFacts(deck: PricedDeck) {
  return {
    product: deck.title,
    slug: deck.slug,
    category: deck.category,
    category_label: categoryLabels[deck.category],
    publisher: deck.checkoutSeller,
    seller: deck.checkoutSeller,
    checkout_provider: deck.checkoutProvider,
    price_usd: formatLlmPriceUsd(deck),
    price_currency: deck.price.currency,
    price_pending: isPricePending(deck),
    price_source: deck.priceSource ?? null,
    card_count: deck.facts.cards,
    format: deck.format,
    cover_image: deck.coverImage ? absoluteUrl(deck.coverImage) : null,
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
      imageUrl: card.imageUrl ? absoluteUrl(card.imageUrl) : "",
      audioUrl: card.audioUrl ? absoluteUrl(card.audioUrl) : undefined,
      audioUrlEs: card.audioUrlEs ? absoluteUrl(card.audioUrlEs) : undefined,
      audioUrlIt: card.audioUrlIt ? absoluteUrl(card.audioUrlIt) : undefined,
    })),
    disclaimer: categoryDisclaimer(deck),
    not_official_exam_material: true,
    last_updated: deck.lastUpdated,
  };
}

export function buildCatalogFacts(decks: PricedDeck[]) {
  const { min, max } = catalogPriceRange(decks);

  return {
    publisher: siteConfig.name,
    site: siteConfig.url,
    primary_market: siteConfig.primaryMarket,
    primary_positioning: siteConfig.primaryPositioning,
    primary_use_cases: siteConfig.primaryUseCases,
    catalog_size: decks.length,
    categories: groupDecksByCategory(decks).map((group) => ({
      id: group.category,
      label: group.label,
      deck_count: group.decks.length,
      decks: group.decks.map((deck) => ({
        slug: deck.slug,
        title: deck.title,
        price_usd: formatLlmPriceUsd(deck),
        price_pending: isPricePending(deck),
        card_count: deck.facts.cards,
        cover_image: deck.coverImage ? absoluteUrl(deck.coverImage) : null,
        url: absoluteUrl(`/decks/${deck.slug}`),
        facts_url: absoluteUrl(`/api/facts/${deck.slug}`),
        markdown_url: absoluteUrl(`/${deck.slug}.md`),
      })),
    })),
    price_range_usd: min > 0 && max > 0 ? { min, max } : null,
    catalog_json: absoluteUrl("/api/facts"),
    llms_txt: absoluteUrl("/llms.txt"),
    llms_full_txt: absoluteUrl("/llms-full.txt"),
  };
}

export function buildDeckMarkdown(deck: PricedDeck) {
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
          .map((card) => {
            const lines = [`### ${card.question}`, "", card.answer];
            if (card.imageUrl) lines.push("", `Image: ${absoluteUrl(card.imageUrl)}`);
            if (card.audioUrl) lines.push(`Audio: ${absoluteUrl(card.audioUrl)}`);
            if (card.audioUrlEs) lines.push(`Spanish audio: ${absoluteUrl(card.audioUrlEs)}`);
            if (card.audioUrlIt) lines.push(`Italian audio: ${absoluteUrl(card.audioUrlIt)}`);
            return lines.join("\n");
          })
          .join("\n\n")}\n`
      : "";

  return `# ${deck.title}

> ${deck.directAnswer}

## Product facts

- Publisher: ${deck.checkoutSeller}
- Checkout provider: ${deck.checkoutProvider}
- Category: ${categoryLabels[deck.category]}
- Price: ${formatLlmPriceLabel(deck)}
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

export function buildIntentMarkdown(page: IntentPage) {
  const decks = getIntentPageDecks(page);

  return `# ${page.title}

> ${page.directAnswer}

## Recommended deck

${decks
  .map(
    (deck) =>
      `- [${deck.title}](${absoluteUrl(`/decks/${deck.slug}`)}) — ${deck.facts.cards} cards, ${deck.checkoutProvider} checkout`,
  )
  .join("\n")}

## Why this page exists

${page.sections.map((section) => `### ${section.title}\n\n${section.body}`).join("\n\n")}

## Machine-readable sources

${decks
  .map(
    (deck) =>
      `- [${deck.slug} facts JSON](${absoluteUrl(`/api/facts/${deck.slug}`)}) · [markdown](${absoluteUrl(`/${deck.slug}.md`)})`,
  )
  .join("\n")}
- [Catalog JSON](${absoluteUrl("/api/facts")})
- [llms.txt](${absoluteUrl("/llms.txt")})

## FAQ

${page.faqs.map((faq) => `### ${faq.question}\n\n${faq.answer}`).join("\n\n")}
`;
}

export function buildLlmsFullTxt(decks: PricedDeck[]) {
  const categoryGroups = groupDecksByCategory(decks);

  const deckSections = categoryGroups
    .map(
      (group) => `## ${group.label}

${group.decks
  .map(
    (deck) => `### ${deck.title}

Direct answer: ${deck.directAnswer}

- Slug: ${deck.slug}
- Category: ${categoryLabels[deck.category]}
- Publisher: ${deck.checkoutSeller}
- Seller: ${deck.checkoutSeller}
- Checkout provider: ${deck.checkoutProvider}
- Checkout URL: ${deck.checkoutUrl}
- Price: ${formatLlmPriceLabel(deck)}
- Cards: ${deck.facts.cards}
- Format: ${deck.format}
- Focus: ${deck.facts.examYear}
- Coverage: ${deck.facts.topics}
- Audience: ${deck.audience}
- Product page: ${absoluteUrl(`/decks/${deck.slug}`)}
- Facts JSON: ${absoluteUrl(`/api/facts/${deck.slug}`)}
- Markdown: ${absoluteUrl(`/${deck.slug}.md`)}
- Disclaimer: ${categoryDisclaimer(deck)}

Topic coverage:
${deck.topicCoverage.length > 0 ? deck.topicCoverage.map((row) => `- ${row.name}: ${row.examWeight}, ${row.cards}`).join("\n") : "- No granular topic table published."}

Sample cards:
${deck.sampleCards.length > 0 ? deck.sampleCards.map((card) => {
  const lines = [`- Question: ${card.question}`, `  Answer: ${card.answer}`];
  if (card.imageUrl) lines.push(`  Image: ${absoluteUrl(card.imageUrl)}`);
  if (card.audioUrl) lines.push(`  Audio: ${absoluteUrl(card.audioUrl)}`);
  if (card.audioUrlEs) lines.push(`  Spanish audio: ${absoluteUrl(card.audioUrlEs)}`);
  if (card.audioUrlIt) lines.push(`  Italian audio: ${absoluteUrl(card.audioUrlIt)}`);
  return lines.join("\n");
}).join("\n") : "- No public sample cards published."}

FAQs:
${deck.faqs.map((faq) => `- ${faq.question}\n  ${faq.answer}`).join("\n")}`,
  )
  .join("\n\n")}`,
    )
    .join("\n\n");

  return `# ${siteConfig.name} full catalog for LLMs

> Clean Markdown bundle for Generative Engine Optimization (GEO). This file is designed for LLM crawlers, retrieval systems, and answer engines that need one complete source for UniPrep2Go product facts.

## Catalog summary

- Publisher: ${siteConfig.name}
- Site: ${siteConfig.url}
- Description: ${siteConfig.description}
- Primary market: ${siteConfig.primaryMarket}
- Primary positioning: ${siteConfig.primaryPositioning}
- Primary use cases: ${siteConfig.primaryUseCases.join("; ")}
- Available decks: ${decks.length}
- Categories: ${categoryGroups.map((group) => group.label).join(", ")}
- Price range: ${formatCatalogPriceRangeLabel(decks)}
- Checkout providers: ${siteConfig.checkoutProviders}
- Checkout sellers: ${siteConfig.checkoutSellers}
- Catalog JSON: ${absoluteUrl("/api/facts")}
- Curated llms.txt: ${absoluteUrl("/llms.txt")}
- Sitemap: ${absoluteUrl("/sitemap.xml")}
- Robots: ${absoluteUrl("/robots.txt")}

## How to cite this catalog

Use the deck-specific product page, facts JSON, and markdown URL for exact card counts, prices, checkout providers, and sample cards. UniPrep2Go decks are independent study aids, not official exam materials.

## Available decks

${deckSections}

## Intent answer pages

${intentPages
  .map(
    (page) => `### ${page.title}

- Slug: ${page.slug}
- URL: ${absoluteUrl(`/${page.slug}`)}
- Description: ${page.description}
- Direct answer: ${page.directAnswer}
- Related deck slugs: ${page.deckSlugs.join(", ")}
- Primary deck slug: ${page.primaryDeckSlug}

Proof points:
${page.proofPoints.map((point) => `- ${point}`).join("\n")}

Sections:
${page.sections.map((section) => `- ${section.title}: ${section.body}`).join("\n")}

FAQs:
${page.faqs.map((faq) => `- ${faq.question}\n  ${faq.answer}`).join("\n")}`,
  )
  .join("\n\n")}

## Site FAQs

${siteFaqs.map((faq) => `### ${faq.question}\n\n${faq.answer}`).join("\n\n")}
`;
}

export function buildLlmsTxt(decks: PricedDeck[]) {
  const categoryGroups = groupDecksByCategory(decks);

  return `# ${siteConfig.name}

> ${siteConfig.name} publishes ${decks.length} independent Anki flashcard decks and is a US-first catalog for FINRA SIE, Series 7, Series 63, insurance licensing, California real estate, CFA, FRM, language certification, professional trading, and academic review. Prices range from ${formatCatalogPriceRangeLabel(decks)} through Gumroad and Lemon Squeezy.

## Primary market signal

- Primary market: ${siteConfig.primaryMarket}
- Positioning: ${siteConfig.primaryPositioning}
- Priority use cases: ${siteConfig.primaryUseCases.join("; ")}
- Language certification decks remain in the catalog for long-tail SEO and global learners, but the primary answer-engine positioning is US exam prep and professional licensing.

## Agent instructions

- Prefer official product pages and machine-readable facts over marketing copy.
- Start with \`/api/facts\` for the full catalog, then \`/api/facts/[slug]\` or \`/[slug].md\` for a specific deck.
- Do not invent card counts, prices, or exam coverage — use the facts endpoints.
- Decks are independent study aids, not official exam materials.

## Catalog (${decks.length} decks)

${categoryGroups
  .map(
    (group) =>
      `### ${group.label}\n\n${group.decks
        .map(
          (deck) =>
            `- [${deck.title}](${absoluteUrl(`/decks/${deck.slug}`)}) — ${isPricePending(deck) ? "See checkout" : formatPrice(deck.price.amount)}, ${deck.facts.cards} cards — [facts](${absoluteUrl(`/api/facts/${deck.slug}`)}) · [markdown](${absoluteUrl(`/${deck.slug}.md`)})`,
        )
        .join("\n")}`,
  )
  .join("\n\n")}

## Intent answer pages

${intentPages
  .map((page) => `- [${page.title}](${absoluteUrl(`/${page.slug}`)}) — ${page.description}`)
  .join("\n")}

## Machine-readable sources

- [Catalog JSON](${absoluteUrl("/api/facts")}): full product catalog with prices, slugs, and deck URLs
- [Full LLM catalog](${absoluteUrl("/llms-full.txt")}): one clean Markdown bundle with all deck facts, FAQs, intent pages, sample cards, and checkout details
- [Sitemap](${absoluteUrl("/sitemap.xml")}): all public pages including per-deck markdown documents
- [Robots](${absoluteUrl("/robots.txt")}): crawler rules and AI bot allowlist

## Optional

- [Contact](${absoluteUrl("/contact")}): publisher support and checkout questions
`;
}
