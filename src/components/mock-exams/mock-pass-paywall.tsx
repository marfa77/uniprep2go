"use client";

import { useEffect, useState } from "react";
import {
  MOCK_PASS_ATTEMPTS,
  MOCK_PASS_CHECKOUT_URL,
  MOCK_PASS_PRICE_USD,
} from "@/lib/mock-exams/mock-pass";
import type { FreeAttemptRecord } from "@/lib/mock-exams/free-attempt";
import { mockSessionModeLabel } from "@/lib/mock-exams/session-mode";
import { trackMockEvent } from "./mock-analytics";

type MockPassPaywallProps = {
  mockSlug: string;
  deckSlug: string;
  /** Where the paywall is shown — landing start or results retake. */
  placement: "landing" | "retake";
  freeAttempt: FreeAttemptRecord | null;
  /** True when this browser already redeemed a key whose attempts are spent. */
  passExhausted: boolean;
  onRedeemed: (remaining: number) => void;
};

const benefits = [
  "Any UniPrep2Go mock — FINRA, CFA, FRM, PTCB, ServSafe, insurance, real estate, citizenship and more",
  "Exam mode or Learn mode — you choose on each attempt",
  "Full topic readiness report and answer review every time",
  "One-time $5 · no subscription · no account · key works on any device",
] as const;

function formatFreeAttempt(record: FreeAttemptRecord | null) {
  if (!record) return null;
  const date = record.at ? new Date(record.at) : null;
  const when =
    date && !Number.isNaN(date.getTime())
      ? date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
      : null;
  return `${mockSessionModeLabel(record.mode)} mode${when ? ` · ${when}` : ""}`;
}

export function MockPassPaywall({
  mockSlug,
  deckSlug,
  placement,
  freeAttempt,
  passExhausted,
  onRedeemed,
}: MockPassPaywallProps) {
  const [licenseKey, setLicenseKey] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    trackMockEvent({
      name: "mock_paywall_view",
      deckSlug,
      mockSlug,
      source: `mock:${mockSlug}:paywall:${placement}:${passExhausted ? "exhausted" : "free_used"}`,
    });
  }, [deckSlug, mockSlug, passExhausted, placement]);

  async function redeem() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/mock-exams/pass/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licenseKey }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        remaining?: number;
        alreadyRedeemed?: boolean;
      };
      if (!res.ok || !data.ok) {
        setError(data.message || "Could not unlock with this key.");
        return;
      }
      const remaining = typeof data.remaining === "number" ? data.remaining : 0;
      if (remaining <= 0) {
        setError("This key is valid, but all its attempts are already used. Get a new Mock Pass to continue.");
        return;
      }
      setLicenseKey("");
      trackMockEvent({
        name: "mock_pass_redeem_success",
        deckSlug,
        mockSlug,
        source: `mock:${mockSlug}:pass:redeem:${data.alreadyRedeemed ? "existing" : "new"}:left:${remaining}`,
      });
      onRedeemed(remaining);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  const freeAttemptLabel = formatFreeAttempt(freeAttempt);

  return (
    <section
      aria-labelledby="mock-pass-title"
      className="space-y-5 rounded-2xl border border-[#1f3a5f]/20 bg-[#f7f3ea] p-4 sm:p-6"
      id="mock-pass"
    >
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#1f3a5f]">Mock Pass</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#18140f]" id="mock-pass-title">
          {passExhausted
            ? `All attempts on your Mock Pass are used`
            : "Your free mock on this browser is used"}
        </h3>
        <p className="mt-2 text-sm leading-6 text-[#4f493e]">
          {passExhausted
            ? `Get ${MOCK_PASS_ATTEMPTS} more attempts for $${MOCK_PASS_PRICE_USD} to keep practicing.`
            : `The first mock is free — one attempt on any exam, in either mode${
                freeAttemptLabel ? ` (yours: ${freeAttemptLabel})` : ""
              }. Keep practicing with ${MOCK_PASS_ATTEMPTS} more attempts for $${MOCK_PASS_PRICE_USD}.`}
        </p>
      </div>

      <ul className="space-y-2 text-sm leading-6 text-[#18140f]">
        {benefits.map((item) => (
          <li className="flex gap-2" key={item}>
            <span aria-hidden className="mt-[0.35rem] h-2 w-2 shrink-0 rounded-full bg-[#1f3d28]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-2">
        <a
          className="flex min-h-16 w-full items-center justify-between gap-4 rounded-2xl bg-[#18140f] px-5 py-4 text-[#fffaf0] transition hover:bg-[#1f3a5f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f]"
          href={MOCK_PASS_CHECKOUT_URL}
          rel="noopener noreferrer"
          target="_blank"
          onClick={() =>
            trackMockEvent({
              name: "mock_pass_checkout_click",
              deckSlug,
              mockSlug,
              source: `mock:${mockSlug}:pass:checkout:${placement}`,
              destinationUrl: MOCK_PASS_CHECKOUT_URL,
            })
          }
        >
          <span className="text-left">
            <span className="block text-base font-semibold">Get {MOCK_PASS_ATTEMPTS} mock attempts</span>
            <span className="mt-0.5 block text-xs text-[#fffaf0]/80">Secure checkout on Gumroad</span>
          </span>
          <span className="text-2xl font-bold tabular-nums tracking-tight">${MOCK_PASS_PRICE_USD}</span>
        </a>
        <p className="text-xs leading-5 text-[#5f5749]">
          Your license key appears on the Gumroad receipt page and in the receipt email. Paste it below —
          this tab stays open.
        </p>
      </div>

      <div className="space-y-2 border-t border-[#18140f]/10 pt-4">
        <label className="block text-sm font-medium text-[#18140f]" htmlFor={`mock-pass-key-${placement}`}>
          Have a key? Paste your Gumroad license key
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            autoComplete="off"
            className="min-h-12 w-full rounded-xl border border-[#18140f]/15 bg-[#fffaf0] px-4 font-mono text-sm text-[#18140f] outline-none focus-visible:border-[#1f3a5f] focus-visible:ring-2 focus-visible:ring-[#1f3a5f]/25"
            id={`mock-pass-key-${placement}`}
            onChange={(event) => setLicenseKey(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && licenseKey.trim() && !busy) void redeem();
            }}
            placeholder="XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX"
            spellCheck={false}
            value={licenseKey}
          />
          <button
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full border border-[#18140f]/20 bg-[#fffaf0] px-5 text-sm font-semibold transition hover:border-[#18140f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] disabled:opacity-50"
            disabled={busy || !licenseKey.trim()}
            onClick={() => void redeem()}
            type="button"
          >
            {busy ? "Checking…" : "Unlock attempts"}
          </button>
        </div>
        {error ? (
          <p className="text-sm text-[#7a2e2e]" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </section>
  );
}
