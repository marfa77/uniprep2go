import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GaivotaEpisodeSeoSections } from "@/components/comics/gaivota-episode-seo-sections";
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
        url: `${siteConfig.url}/comics/gaivota-em-portugal/01-1755-earthquake/art/ep01-cover.webp`,
      },
    ],
  },
};

export default function Ep01TerramotoPage() {
  return (
    <div className="min-h-screen bg-[#ebe4d8] text-[#0e0e0e]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1f6f8b]">
          FREE · Ep.01 · Gaivota em Portugal
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">O Terramoto (1755)</h1>
        <p className="mt-2 text-base text-[#5c574e] sm:text-lg">
          Lisbon Earthquake · free noir comic + glossary
        </p>

        <figure className="mt-8">
          <Image
            alt="Cover: O Terramoto — Gaivota over ruined Lisbon, 1755"
            className="mx-auto h-auto w-full max-w-[20rem] sm:max-w-[24rem]"
            height={900}
            priority
            sizes="(max-width: 640px) 80vw, 24rem"
            src="/comics/gaivota-em-portugal/01-1755-earthquake/art/ep01-cover.webp"
            width={675}
          />
        </figure>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a className={btnPrimary} href={readerSrc}>
            Read free comic
          </a>
          <Link className={btnSecondary} href={gaivotaSeries.hubPath}>
            Series hub
          </Link>
          <a className={btnSecondary} href={gaivotaSeries.gumroadCheckoutUrl} rel="noreferrer">
            Ep.02 on Gumroad — $5
          </a>
        </div>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#3a342c] sm:text-lg">
          {directAnswer}
        </p>
        <p className="mt-3 text-sm text-[#5c574e]">
          Full-screen reader — on phones, dialogue sits under each page so nothing covers faces.
        </p>
        <GaivotaEpisodeSeoSections episodeId="01-1755-earthquake" />
      </main>
      <SiteFooter />
    </div>
  );
}
