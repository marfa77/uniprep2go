/** Shared UniPrep2Go CTA classes — navy primary, ≥48px targets, focus-visible rings. */

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export const btnFocus =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

export const btnPrimary = cx(
  "inline-flex min-h-12 items-center justify-center rounded-md bg-navy px-6 py-3 text-base font-semibold text-white transition hover:bg-navy-deep disabled:opacity-50",
  btnFocus,
);

export const btnPrimarySm = cx(
  "inline-flex min-h-12 items-center justify-center rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-deep disabled:opacity-50",
  btnFocus,
);

export const btnSecondary = cx(
  "inline-flex min-h-12 items-center justify-center rounded-md border border-navy bg-white px-6 py-3 text-base font-semibold text-navy transition hover:bg-navy/5 disabled:opacity-50",
  btnFocus,
);

export const btnSecondarySm = cx(
  "inline-flex min-h-12 items-center justify-center rounded-md border border-navy bg-white px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-navy/5 disabled:opacity-50",
  btnFocus,
);

export const btnQuiet = cx(
  "inline-flex min-h-12 items-center justify-center px-1 text-sm font-semibold text-navy underline-offset-4 transition hover:underline",
  btnFocus,
);

export const btnChip = cx(
  "inline-flex min-h-12 items-center justify-center rounded-md border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition hover:border-ink",
  btnFocus,
);

export const btnLinkNav = cx(
  "font-medium text-muted transition hover:text-ink",
  btnFocus,
);

export const ledgerCard = "rounded-md border border-line bg-white";
