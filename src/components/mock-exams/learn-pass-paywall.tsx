"use client";

import { useMemo, useState } from "react";
import {
  LEARN_CREDITS_PER_UNIT,
  LEARN_PASS_PRICE_USD,
  LEARN_SESSION_PRICE_USD,
  MAX_LEARN_QUANTITY,
  clampLearnPackQuantity,
  learnCheckoutUrl,
  learnSessionsForPacks,
} from "@/lib/mock-exams/learn-pass";
import { trackMockEvent } from "./mock-analytics";

type LearnPassPaywallProps = {
  mockSlug: string;
  deckSlug: string;
  remaining: number;
  onRedeemed: (remaining: number) => void;
};

function packLabel(packs: number) {
  const sessions = learnSessionsForPacks(packs);
  return packs === 1
    ? `1 pack · ${sessions} Learn sessions`
    : `${packs} packs · ${sessions} Learn sessions`;
}

export function LearnPassPaywall({
  mockSlug,
  deckSlug,
  remaining,
  onRedeemed,
}: LearnPassPaywallProps) {
  const [qty, setQty] = useState(1);
  const [licenseKey, setLicenseKey] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const packs = clampLearnPackQuantity(qty);
  const total = LEARN_PASS_PRICE_USD * packs;
  const sessions = learnSessionsForPacks(packs);
  const href = useMemo(() => learnCheckoutUrl(packs), [packs]);

  function setPacks(next: number) {
    setQty(clampLearnPackQuantity(next));
  }

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
          ? `License already on this device — ${nextRemaining} session${nextRemaining === 1 ? "" : "s"} left.`
          : `Unlocked — ${nextRemaining} Learn session${nextRemaining === 1 ? "" : "s"} ready.`,
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
          Instant explanations are paid — ${LEARN_SESSION_PRICE_USD} per Learn session, sold in packs
          of {LEARN_CREDITS_PER_UNIT} (${LEARN_PASS_PRICE_USD} each). Choose how many packs you want.
          Timed Exam stays free. Buy on Gumroad, then paste your license key here.
        </p>
        {remaining > 0 ? (
          <p className="mt-2 text-sm font-medium text-[#1f3d28]" aria-live="polite">
            {remaining} Learn session{remaining === 1 ? "" : "s"} left on this device.
          </p>
        ) : null}
      </div>

      <div>
        <label
          className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-[#5f5749]"
          htmlFor="learn-pack-qty"
        >
          How many packs
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-stretch overflow-hidden rounded-xl border border-[#18140f]/15 bg-[#fffaf0]">
            <button
              aria-label="Fewer packs"
              className="min-h-12 min-w-12 px-3 text-lg font-semibold text-[#18140f] transition hover:bg-[#18140f]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] disabled:opacity-40"
              disabled={packs <= 1}
              onClick={() => setPacks(packs - 1)}
              type="button"
            >
              −
            </button>
            <input
              id="learn-pack-qty"
              aria-label="Number of packs"
              className="w-16 border-x border-[#18140f]/15 bg-transparent text-center text-base font-semibold tabular-nums text-[#18140f] outline-none focus-visible:bg-[#fffaf0]"
              inputMode="numeric"
              max={MAX_LEARN_QUANTITY}
              min={1}
              type="number"
              value={packs}
              onChange={(event) => setPacks(Number(event.target.value))}
            />
            <button
              aria-label="More packs"
              className="min-h-12 min-w-12 px-3 text-lg font-semibold text-[#18140f] transition hover:bg-[#18140f]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] disabled:opacity-40"
              disabled={packs >= MAX_LEARN_QUANTITY}
              onClick={() => setPacks(packs + 1)}
              type="button"
            >
              +
            </button>
          </div>
          <p className="text-sm text-[#5f5749]">
            {sessions} sessions · ${LEARN_PASS_PRICE_USD} / pack
          </p>
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
            source: `mock:${mockSlug}:learn:checkout:qty:${packs}`,
            destinationUrl: href,
          })
        }
      >
        <span className="text-2xl font-bold tabular-nums tracking-tight">${total}</span>
        <span className="mt-1 text-sm text-[#fffaf0]/85">
          {packLabel(packs)}
          {packs > 1 ? ` · $${LEARN_PASS_PRICE_USD} / pack` : " · Gumroad checkout"}
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
          {busy ? "Unlocking…" : "Unlock Learn sessions"}
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
