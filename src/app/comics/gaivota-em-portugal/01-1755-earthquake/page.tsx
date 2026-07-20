import type { Metadata } from "next";
import Image from "next/image";
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
    <div className="min-h-screen bg-[#ebe4d8] text-[#0e0e0e]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-8 sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1f6f8b]">
          FREE · Ep.01 · Gaivota em Portugal
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">O Terramoto (1755)</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#3a342c] sm:text-lg">
          {directAnswer}
        </p>

        <div className="mt-6 overflow-hidden border-2 border-[#0e0e0e] bg-[#111]">
          <Image
            alt="Cover: O Terramoto"
            className="mx-auto h-auto max-h-[min(52vh,420px)] w-full object-contain"
            height={900}
            priority
            src="/comics/gaivota-em-portugal/01-1755-earthquake/art/ep01-cover.jpg"
            width={675}
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a className={btnPrimary} href={readerSrc}>
            Read free comic (best on phone)
          </a>
          <Link className={btnSecondary} href={gaivotaSeries.hubPath}>
            Series hub
          </Link>
          <a className={btnSecondary} href={gaivotaSeries.gumroadCheckoutUrl} rel="noreferrer">
            Ep.02 on Gumroad — $5
          </a>
        </div>

        <p className="mt-4 text-sm text-[#5c574e]">
          Open the reader full-screen — on phones, dialogue sits under each page so nothing covers faces.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
