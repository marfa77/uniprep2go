import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { gaivotaSeries } from "@/lib/gaivota-comics";
import { siteConfig } from "@/lib/site";
import { btnPrimary, btnSecondary } from "@/lib/ui-button-classes";

const readerSrc = "/comics/gaivota-em-portugal/01-1755-earthquake/reader.html";
const pagePath = "/comics/gaivota-em-portugal/01-1755-earthquake";

const directAnswer =
  "Free Gaivota em Portugal Episode 1: O Terramoto — the 1755 Lisbon Earthquake as a noir Portuguese comic. Includes a factual history brief, a complete 5-page story, and a 100-word PT→EN glossary. Read online at no cost.";

export const metadata: Metadata = {
  title: "O Terramoto (1755) — Free Portuguese History Comic | Gaivota em Portugal",
  description: directAnswer,
  alternates: { canonical: `${siteConfig.url}${pagePath}` },
  openGraph: {
    title: "O Terramoto (1755) — free Gaivota comic",
    description: directAnswer,
    url: `${siteConfig.url}${pagePath}`,
    images: [
      {
        url: `${siteConfig.url}/comics/gaivota-em-portugal/01-1755-earthquake/art/ep01-cover.jpg`,
      },
    ],
  },
};

export default function Ep01TerramotoPage() {
  return (
    <div className="min-h-screen bg-[#111] text-[#f4f1ea]">
      <div className="bg-[#ebe4d8] text-[#0e0e0e]">
        <SiteHeader />
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4 sm:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1f6f8b]">
              FREE · Ep.01 · Gaivota em Portugal
            </p>
            <h1 className="text-2xl font-semibold sm:text-3xl">O Terramoto (1755)</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link className={btnSecondary} href={gaivotaSeries.hubPath}>
              Series hub
            </Link>
            <a className={btnPrimary} href={readerSrc}>
              Open full-screen reader
            </a>
          </div>
        </div>
      </div>

      <iframe
        className="block w-full border-0 bg-[#ddd7cb]"
        src={readerSrc}
        title="O Terramoto — free comic reader"
        style={{ height: "min(920px, 85vh)", minHeight: 640 }}
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-6 py-10 sm:px-10">
        <p className="text-sm leading-relaxed text-[#cfc7b8]">{directAnswer}</p>
        <div className="flex flex-wrap gap-3">
          <a className={btnPrimary} href={gaivotaSeries.gumroadCheckoutUrl} rel="noreferrer">
            Next episodes on Gumroad — $5
          </a>
          <Link className={btnSecondary} href="/decks/ciple-a2-european-portuguese-anki-deck">
            CIPLE A2 Anki deck
          </Link>
        </div>
      </div>
      <div className="bg-[#ebe4d8] text-[#0e0e0e]">
        <SiteFooter />
      </div>
    </div>
  );
}
