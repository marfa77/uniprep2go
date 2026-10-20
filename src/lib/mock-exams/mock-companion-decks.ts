import { getRetiredLanguageDeckRedirect } from "../retired-language-decks";
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
        "Flanders inburgering requires Dutch (NT2 A2) separately from MO civics. The Dutch A2 Inburgering deck on Prep2Go builds the vocabulary pillar — not maatschappelijke oriëntatie content.",
      ctaLabel: "Get the Dutch A2 deck on Prep2Go",
    },
    {
      deckSlug: "belgium-flanders-mo-anki-deck",
      role: "civics",
      eyebrow: "MO civics · spaced repetition",
      title: "Belgium Flanders MO Anki — 120 civics cards",
      body:
        "Same validated MO theme bank as this mock (institutions, history/EU, rights, daily life) in an ownable .apkg for daily drill after your topic report.",
      ctaLabel: "Open MO Anki deck — $9.99",
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
    const prep2goUrl = getRetiredLanguageDeckRedirect(link.deckSlug);
    if (prep2goUrl) {
      out.push({ ...link, href: prep2goUrl, external: false, offsite: true });
      continue;
    }

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
