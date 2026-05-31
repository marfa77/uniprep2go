"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  readCookieConsent,
  subscribeToCookieConsent,
  writeCookieConsent,
} from "@/lib/cookie-consent";

export function CookieConsentBanner() {
  const consent = useSyncExternalStore(
    subscribeToCookieConsent,
    readCookieConsent,
    () => null,
  );

  if (consent !== null) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#18140f]/15 bg-[#fffaf0]/95 p-4 backdrop-blur-sm sm:p-5">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl space-y-2 text-sm leading-6 text-[#4f493e]">
          <p className="font-semibold text-[#18140f]">Cookies and analytics</p>
          <p>
            We use strictly necessary local storage for your cookie choice and optional Google
            Analytics, Ahrefs Analytics, and first-party funnel analytics when you accept. See our{" "}
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
            className="rounded-full border border-[#18140f]/25 px-5 py-2.5 text-sm font-semibold transition hover:border-[#18140f] focus:outline-none focus:ring-2 focus:ring-[#1f3a5f]"
            type="button"
            onClick={() => writeCookieConsent("rejected")}
          >
            Reject analytics
          </button>
          <button
            className="rounded-full bg-[#18140f] px-5 py-2.5 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f] focus:outline-none focus:ring-2 focus:ring-[#1f3a5f]"
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
