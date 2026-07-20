"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { TrackedCheckoutLink } from "@/components/funnel-tracker";
import {
  readCookieConsent,
  subscribeToCookieConsent,
} from "@/lib/cookie-consent";
import { btnPrimarySm, btnSecondarySm, cx } from "@/lib/ui-button-classes";

type DeckStickyCheckoutBarProps = {
  deckSlug: string;
  shortName: string;
  priceLabel: string;
  /** buy = checkout primary; mock-first = practice primary; planned = practice + waitlist */
  variant: "buy" | "mock-first" | "planned";
  checkoutUrl?: string;
  checkoutCtaLabel?: string;
  practiceMockHref?: string;
  practiceMockLabel?: string;
};

export function DeckStickyCheckoutBar({
  deckSlug,
  shortName,
  priceLabel,
  variant,
  checkoutUrl,
  checkoutCtaLabel,
  practiceMockHref,
  practiceMockLabel = "Free practice test",
}: DeckStickyCheckoutBarProps) {
  const [heroVisible, setHeroVisible] = useState(true);
  const consent = useSyncExternalStore(
    subscribeToCookieConsent,
    readCookieConsent,
    () => null,
  );
  const cookieBannerOpen = consent === null;

  useEffect(() => {
    const sentinel = document.getElementById("deck-hero-cta");
    if (!sentinel || typeof IntersectionObserver === "undefined") {
      setHeroVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisible(entry?.isIntersecting ?? true);
      },
      { root: null, threshold: 0, rootMargin: "-48px 0px 0px 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  if (heroVisible) {
    return null;
  }

  const practiceLink = practiceMockHref ? (
    <Link
      className={
        variant === "buy" ? cx(btnSecondarySm, "hidden sm:inline-flex") : btnPrimarySm
      }
      href={practiceMockHref}
    >
      {practiceMockLabel}
    </Link>
  ) : null;

  const checkoutLink =
    checkoutUrl && checkoutCtaLabel ? (
      <TrackedCheckoutLink
        className={variant === "mock-first" ? btnSecondarySm : btnPrimarySm}
        deckSlug={deckSlug}
        href={checkoutUrl}
        source="deck_page_sticky"
      >
        {checkoutCtaLabel}
      </TrackedCheckoutLink>
    ) : null;

  const waitlistLink =
    variant === "planned" ? (
      <Link className={practiceMockHref ? btnSecondarySm : btnPrimarySm} href="#waitlist">
        Notify me
      </Link>
    ) : null;

  return (
    <div
      aria-label="Checkout actions"
      className={cx(
        "fixed inset-x-0 z-40 border-t border-[#18140f]/15 bg-[#fffaf0]/95 backdrop-blur-sm motion-safe:transition-[bottom] motion-safe:duration-200",
        cookieBannerOpen ? "bottom-[var(--cookie-banner-offset,0px)]" : "bottom-0",
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-10">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#18140f]">{shortName}</p>
          <p className="truncate text-xs text-[#5f5749]">{priceLabel}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {variant === "buy" ? (
            <>
              {practiceLink}
              {checkoutLink}
            </>
          ) : variant === "mock-first" ? (
            <>
              {practiceLink}
              {checkoutLink}
            </>
          ) : (
            <>
              {practiceLink}
              {waitlistLink}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
