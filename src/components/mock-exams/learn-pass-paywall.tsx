"use client";

import { useMemo, useState } from "react";
import {
  LEARN_PASS_PRICE_USD,
  LEARN_QTY_OPTIONS,
  learnCheckoutUrl,
} from "@/lib/mock-exams/learn-pass";
import { trackMockEvent } from "./mock-analytics";

type LearnPassPaywallProps = {
  mockSlug: string;
  deckSlug: string;
  remaining: number;
  onRedeemed: (remaining: number) => void;
};

function quantityLabel(n: number) {
  return n === 1 ? "1 Learn pass" : `${n} Learn passes`;
}

export function LearnPassPaywall({
  mockSlug,
  deckSlug,
  remaining,
  onRedeemed,
}: LearnPassPaywallProps) {
  const [qty, setQty] = useState<(typeof LEARN_QTY_OPTIONS)[number]>(1);
  const [licenseKey, setLicenseKey] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const total = LEARN_PASS_PRICE_USD * qty;
  const href = useMemo(() => learnCheckoutUrl(qty), [qty]);

  async function redeem() {
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/mock-exams/learn/redeem", {
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
        setError(data.message || "Could not redeem license key.");
        return;
      }
      const nextRemaining = typeof data.remaining === "number" ? data.remaining : 0;
      setMessage(
        data.alreadyRedeemed
          ? `License already on this device — ${nextRemaining} pass${nextRemaining === 1 ? "" : "es"} left.`
          : `Unlocked — ${nextRemaining} Learn pass${nextRemaining === 1 ? "" : "es"} ready.`,
      );
      setLicenseKey("");
      onRedeemed(nextRemaining);
      trackMockEvent({
        name: "learn_redeem_success",
        deckSlug,
        mockSlug,
        source: `mock:${mockSlug}:learn:redeem:${data.alreadyRedeemed ? "existing" : "new"}`,
      });
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4 rounded-2xl border border-[#1f3a5f]/20 bg-[#f7f3ea] p-4 sm:p-5">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#1f3a5f]">Learn Pass</p>
        <p className="mt-2 text-sm leading-6 text-[#4f493e]">
          Instant explanations are paid — ${LEARN_PASS_PRICE_USD} per Learn session. Timed Exam stays
          free. Buy passes on Gumroad, then paste your license key here.
        </p>
        {remaining > 0 ? (
          <p className="mt-2 text-sm font-medium text-[#1f3d28]" aria-live="polite">
            {remaining} Learn pass{remaining === 1 ? "" : "es"} left on this device.
          </p>
        ) : null}
      </div>

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#5f5749]">
          How many passes
        </p>
        <div className="grid grid-cols-4 gap-2" role="group" aria-label="How many Learn passes">
          {LEARN_QTY_OPTIONS.map((n) => {
            const selected = qty === n;
            return (
              <button
                key={n}
                type="button"
                aria-pressed={selected}
                className={`min-h-11 rounded-xl border px-1 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] ${
                  selected
                    ? "border-[#18140f] bg-[#18140f] text-[#fffaf0]"
                    : "border-[#18140f]/15 bg-[#fffaf0] text-[#18140f] hover:border-[#18140f]/35"
                }`}
                onClick={() => setQty(n)}
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>

      <a
        className="flex min-h-16 w-full flex-col justify-center rounded-2xl bg-[#18140f] px-5 py-4 text-left text-[#fffaf0] transition hover:bg-[#1f3a5f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f]"
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        onClick={() =>
          trackMockEvent({
            name: "learn_checkout_click",
            deckSlug,
            mockSlug,
            source: `mock:${mockSlug}:learn:checkout:qty:${qty}`,
            destinationUrl: href,
          })
        }
      >
        <span className="text-2xl font-bold tabular-nums tracking-tight">${total}</span>
        <span className="mt-1 text-sm text-[#fffaf0]/85">
          {quantityLabel(qty)}
          {qty > 1 ? ` · $${LEARN_PASS_PRICE_USD} each` : " · Gumroad checkout"}
        </span>
      </a>

      <div className="space-y-2 border-t border-[#18140f]/10 pt-4">
        <label className="block text-sm font-medium text-[#18140f]" htmlFor="learn-license-key">
          Paste Gumroad license key
        </label>
        <input
          id="learn-license-key"
          autoComplete="off"
          className="min-h-12 w-full rounded-xl border border-[#18140f]/15 bg-[#fffaf0] px-4 text-sm text-[#18140f] outline-none focus-visible:border-[#1f3a5f] focus-visible:ring-2 focus-visible:ring-[#1f3a5f]/25"
          placeholder="XXXX-XXXX-XXXX-XXXX"
          value={licenseKey}
          onChange={(event) => setLicenseKey(event.target.value)}
        />
        <button
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#18140f]/20 bg-[#fffaf0] px-5 text-sm font-semibold transition hover:border-[#18140f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] disabled:opacity-50 sm:w-auto"
          disabled={busy || !licenseKey.trim()}
          onClick={() => void redeem()}
          type="button"
        >
          {busy ? "Unlocking…" : "Unlock Learn passes"}
        </button>
        {error ? (
          <p className="text-sm text-[#7a2e2e]" role="alert">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="text-sm text-[#1f3d28]" role="status">
            {message}
          </p>
        ) : null}
      </div>
    </div>
  );
}
