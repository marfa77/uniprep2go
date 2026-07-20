/** Shared UniPrep2Go CTA classes — navy primary, ≥48px targets, focus-visible rings. */

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export const btnFocus =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3a5f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f3ea]";

export const btnPrimary = cx(
  "inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1f3a5f] px-6 py-3 text-base font-semibold text-[#fffaf0] transition hover:bg-[#152238] disabled:opacity-50",
  btnFocus,
);

export const btnPrimarySm = cx(
  "inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1f3a5f] px-4 py-2.5 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#152238] disabled:opacity-50",
  btnFocus,
);

export const btnSecondary = cx(
  "inline-flex min-h-12 items-center justify-center rounded-lg border border-[#18140f]/25 bg-[#fffaf0]/70 px-6 py-3 text-base font-semibold text-[#18140f] transition hover:border-[#18140f] disabled:opacity-50",
  btnFocus,
);

export const btnSecondarySm = cx(
  "inline-flex min-h-12 items-center justify-center rounded-lg border border-[#18140f]/25 bg-[#fffaf0] px-4 py-2.5 text-sm font-semibold text-[#18140f] transition hover:border-[#18140f] disabled:opacity-50",
  btnFocus,
);

export const btnQuiet = cx(
  "inline-flex min-h-12 items-center justify-center px-1 text-sm font-semibold text-[#1f3a5f] underline-offset-4 transition hover:underline",
  btnFocus,
);

export const btnChip = cx(
  "inline-flex min-h-12 items-center justify-center rounded-lg border border-[#18140f]/15 bg-[#fffaf0] px-4 py-2 text-sm font-medium text-[#18140f] transition hover:border-[#1f3a5f]/40",
  btnFocus,
);

export const btnLinkNav = cx(
  "font-medium text-[#4f493e] transition hover:text-[#18140f]",
  btnFocus,
);
