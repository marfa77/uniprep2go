import type { MockExamConfig } from "./types";

export type MockCompanionDeckLink = {
  deckSlug: string;
  role: "language" | "civics" | "companion";
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
};

const MOCK_COMPANION_DECKS: Partial<Record<string, MockCompanionDeckLink[]>> = {
  "belgium-flanders-mo-readiness-check": [
    {
      deckSlug: "dutch-a2-inburgering-anki-deck",
      role: "language",
      eyebrow: "Taalpilaar · NT2 A2",
      title: "Dutch A2 Inburgering Anki — language pillar",
      body:
        "Flanders inburgering requires Dutch (NT2 A2) separately from MO civics. This live 2,000-card deck builds the vocabulary pillar — not maatschappelijke oriëntatie content.",
      ctaLabel: "Open Dutch A2 deck — $26",
    },
    {
      deckSlug: "belgium-flanders-mo-anki-deck",
      role: "civics",
      eyebrow: "MO civics · spaced repetition",
      title: "Belgium Flanders MO Anki — 120 civics cards",
      body:
        "Same validated MO theme bank as this mock (institutions, history/EU, rights, daily life) in an ownable .apkg for daily drill after your topic report.",
      ctaLabel: "Open MO Anki deck — $11",
    },
  ],
};

export function getMockCompanionDecks(config: MockExamConfig): MockCompanionDeckLink[] {
  return MOCK_COMPANION_DECKS[config.slug] ?? [];
}

export async function buildMockCompanionCheckouts(
  config: MockExamConfig,
  resolveDeck: (slug: string) => Promise<
    | {
        slug: string;
        checkoutUrl?: string;
        priceLabel: string;
      }
    | undefined
  >,
): Promise<
  import("@/components/mock-exams/mock-companion-decks-panel").MockCompanionCheckout[]
> {
  const links = getMockCompanionDecks(config);
  const out: import("@/components/mock-exams/mock-companion-decks-panel").MockCompanionCheckout[] =
    [];

  for (const link of links) {
    const deck = await resolveDeck(link.deckSlug);
    const href = deck?.checkoutUrl ?? `/decks/${link.deckSlug}`;
    const priceToken = deck?.priceLabel ?? "";
    const ctaLabel = priceToken
      ? link.ctaLabel.replace(/\$[\d]+/, priceToken)
      : link.ctaLabel.replace(/\s*—\s*\$[\d]+/, "");

    out.push({
      ...link,
      href,
      ctaLabel,
      external: Boolean(deck?.checkoutUrl),
    });
  }

  return out;
}
