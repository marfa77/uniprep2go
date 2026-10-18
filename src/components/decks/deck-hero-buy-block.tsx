import Link from "next/link";
import { TrackedCheckoutLink } from "@/components/funnel-tracker";
import { isApkgPendingDeck } from "@/lib/anki-deck-launch";
import { publicDeckPurchaseCount } from "@/lib/deck-purchase-count";
import type { AvailableDeck } from "@/lib/decks";
import type { MockExamConfig } from "@/lib/mock-exams/types";
import { formatCompactDeckPurchases } from "@/lib/social-proof";
import { btnPrimary, btnSecondary } from "@/lib/ui-button-classes";
import { freeMockStartLabel } from "@/lib/mock-exams/free-diagnostic";

type DeckHeroBuyBlockProps = {
  deck: AvailableDeck;
  checkoutCtaLabel: string;
  practiceMock?: MockExamConfig;
  secondaryLink?: { href: string; label: string };
};

function formatDeliveryLine(deck: AvailableDeck): string {
  const fileLabel =
    deck.format === "PDF"
      ? "printable PDF"
      : deck.format === ".apkg"
        ? ".apkg for Anki (desktop, AnkiMobile, AnkiDroid)"
        : `${deck.format} file`;
  const delivery = isApkgPendingDeck(deck)
    ? ".apkg ships after bank validation"
    : `instant download via ${deck.checkoutProvider}`;
  return `One-time purchase · ${fileLabel} · ${delivery}`;
}

/** First-screen buy block: priced checkout first, free mock as the fallback path. */
export function DeckHeroBuyBlock({
  deck,
  checkoutCtaLabel,
  practiceMock,
  secondaryLink,
}: DeckHeroBuyBlockProps) {
  const liveMock = practiceMock?.status === "live" ? practiceMock : undefined;
  const purchases =
    deck.slug === "cfa-level-1-anki-deck" ? publicDeckPurchaseCount(deck.slug) : null;

  return (
    <section aria-label={`Buy ${deck.shortName}`} className="mt-6" id="deck-hero-cta">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <TrackedCheckoutLink
          className={btnPrimary}
          deckSlug={deck.slug}
          href={deck.checkoutUrl}
          source="deck_page_cta"
        >
          {checkoutCtaLabel}
        </TrackedCheckoutLink>
        {secondaryLink ? (
          <Link className={btnSecondary} href={secondaryLink.href}>
            {secondaryLink.label}
          </Link>
        ) : null}
        {purchases != null ? (
          <p className="text-sm font-medium tabular-nums text-[#5f5749]" id="deck-purchase-count">
            {formatCompactDeckPurchases(purchases)}
          </p>
        ) : null}
      </div>
      <p className="mt-3 text-sm leading-6 text-[#5f5749]">{formatDeliveryLine(deck)}</p>
      {liveMock ? (
        <p className="mt-2 text-sm leading-6 text-[#5f5749]">
          Not ready to buy?{" "}
          <Link
            className="font-medium text-[#1f3a5f] underline underline-offset-4"
            href={`/mock-exams/${liveMock.slug}`}
          >
            Take the {freeMockStartLabel(liveMock.questionCount)} →
          </Link>
        </p>
      ) : null}
    </section>
  );
}
