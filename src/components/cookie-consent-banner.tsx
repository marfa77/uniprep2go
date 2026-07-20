"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import {
  readCookieConsent,
  subscribeToCookieConsent,
  writeCookieConsent,
} from "@/lib/cookie-consent";
import { btnPrimarySm, btnSecondarySm } from "@/lib/ui-button-classes";

const COOKIE_OFFSET_VAR = "--cookie-banner-offset";

export function CookieConsentBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const consent = useSyncExternalStore(
    subscribeToCookieConsent,
    readCookieConsent,
    () => null,
  );

  useLayoutEffect(() => {
    if (consent !== null) {
      document.documentElement.style.removeProperty(COOKIE_OFFSET_VAR);
      return;
    }

    const node = bannerRef.current;
    if (!node) {
      return;
    }

    const updateOffset = () => {
      document.documentElement.style.setProperty(
        COOKIE_OFFSET_VAR,
        `${node.getBoundingClientRect().height}px`,
      );
    };

    updateOffset();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateOffset) : null;
    observer?.observe(node);
    window.addEventListener("resize", updateOffset);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateOffset);
      document.documentElement.style.removeProperty(COOKIE_OFFSET_VAR);
    };
  }, [consent]);

  if (consent !== null) {
    return null;
  }

  return (
    <div
      ref={bannerRef}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#18140f]/15 bg-[#fffaf0]/95 p-4 backdrop-blur-sm sm:p-5"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl space-y-2 text-sm leading-6 text-[#4f493e]">
          <p className="font-semibold text-[#18140f]">Cookies and analytics</p>
          <p>
            We use strictly necessary local storage for your cookie choice. Optional Google
            Analytics and Ahrefs Analytics load only when you accept. Basic first-party page metrics
            run without cookies. See our{" "}
            <Link className="underline decoration-[#18140f]/30 underline-offset-4" href="/cookies">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link className="underline decoration-[#18140f]/30 underline-offset-4" href="/privacy">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            className={btnSecondarySm}
            type="button"
            onClick={() => writeCookieConsent("rejected")}
          >
            Reject analytics
          </button>
          <button
            className={btnPrimarySm}
            type="button"
            onClick={() => writeCookieConsent("accepted")}
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
