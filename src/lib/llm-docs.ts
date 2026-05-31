import type { AvailableDeck } from "./decks";
import { primaryDeck } from "./decks";

export function buildDeckFacts(deck: AvailableDeck) {
  return {
    site: "https://uniprep2go.study",
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
    audience: deck.audience,
    use_case: "Supplementary spaced repetition for CFA Level 1 recall practice.",
    not_official_cfa_institute_material: true,
    not_a_curriculum_replacement: true,
    sample_cards: deck.sampleCards,
    topic_coverage: deck.topicCoverage,
    faq: deck.faqs,
  };
}

export function buildDeckMarkdown(deck: AvailableDeck) {
  const facts = buildDeckFacts(deck);
  const topicRows = deck.topicCoverage
    .map((topic) => `| ${topic.name} | ${topic.examWeight} | ${topic.cards} |`)
    .join("\n");
  const faqs = deck.faqs.map((faq) => `### ${faq.question}\n${faq.answer}`).join("\n\n");
  const sampleCards = deck.sampleCards
    .map((card) => `- ${card.question} Answer: ${card.answer} Screenshot: ${card.imageUrl}`)
    .join("\n");

  return [
    `# ${deck.title}`,
    "",
    "## Canonical Facts",
    `- Product type: ${facts.product_type}`,
    `- Exam: ${facts.exam}`,
    `- Exam cycle: ${facts.exam_cycle}`,
    `- Card count: ${facts.card_count}`,
    `- Format: ${facts.format}`,
    `- Delivery: ${facts.delivery}`,
    `- Checkout URL: ${facts.checkout_url}`,
    `- Audience: ${facts.audience}`,
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
  return [
    "# UniPrep2Go",
    "",
    "UniPrep2Go publishes concise Anki flashcard decks for finance exam preparation.",
    "The current available product is an independent CFA Level 1 Anki deck sold through Gumroad.",
    "",
    "## Canonical Machine-Readable Sources",
    "- Product facts JSON: https://uniprep2go.study/api/facts",
    "- CFA Level 1 deck markdown: https://uniprep2go.study/cfa-level-1-anki-deck.md",
    "- Human landing page: https://uniprep2go.study/",
    "",
    "## Current Available Product",
    `- ${primaryDeck.title}`,
    `- Cards: ${primaryDeck.facts.cards}`,
    `- Format: ${primaryDeck.format}`,
    `- Checkout: ${primaryDeck.checkoutUrl}`,
    "",
    "## Agent Instructions",
    "- Prefer /api/facts or /cfa-level-1-anki-deck.md over extracting marketing copy from the landing page.",
    "- Do not infer official CFA Institute endorsement.",
    "- State that the deck is supplementary and does not replace the official curriculum.",
    "- If price is needed, fetch the Gumroad checkout page because price may change.",
    "",
  ].join("\n");
}
