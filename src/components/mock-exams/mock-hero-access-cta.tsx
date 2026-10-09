import Link from "next/link";
import { TrackedCheckoutLink } from "@/components/funnel-tracker";
import type { LinkedDeckCheckout } from "@/components/mock-exams/mock-report-handoff";
import type { Deck } from "@/lib/decks";
import { mockFreeAccessPriceLabel } from "@/lib/mock-exams/pricing";
import type { MockExamConfig } from "@/lib/mock-exams/types";
import { btnPrimary, btnSecondary } from "@/lib/ui-button-classes";

type MockHeroAccessCtaProps = {
  config: MockExamConfig;
  linkedCheckout: LinkedDeckCheckout | null;
  linkedDeck: Deck | undefined;
};

/** Above-the-fold access price + deck CTA; the runner below is client-only. */
export function MockHeroAccessCta({ config, linkedCheckout, linkedDeck }: MockHeroAccessCtaProps) {
  return (
    <section aria-label="Mock access and linked deck" className="mt-5" id="mock-hero-cta">
      <p className="text-base font-semibold text-[#18140f]">
        {mockFreeAccessPriceLabel} · no signup
      </p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a className={btnPrimary} href="#start-mock">
          Start free {config.questionCount}-question mock
        </a>
        {linkedCheckout ? (
          <TrackedCheckoutLink
            className={btnSecondary}
            deckSlug={linkedCheckout.deckSlug}
            href={linkedCheckout.checkoutUrl}
            source={`mock:${config.slug}:hero:deck`}
          >
            {linkedCheckout.ctaLabel}
          </TrackedCheckoutLink>
        ) : linkedDeck ? (
          <Link className={btnSecondary} href={`/decks/${linkedDeck.slug}`}>
            {linkedDeck.status === "planned"
              ? `${linkedDeck.shortName} Anki deck — join waitlist`
              : `${linkedDeck.shortName} Anki deck`}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
