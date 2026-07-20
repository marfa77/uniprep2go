import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { gaivotaEpisodes, gaivotaSeries } from "@/lib/gaivota-comics";
import { siteConfig } from "@/lib/site";
import { btnPrimary, btnSecondary } from "@/lib/ui-button-classes";

const pagePath = "/comics/gaivota-em-portugal/09-treaty-of-windsor";
const ep = gaivotaEpisodes.find((e) => e.id === "09-treaty-of-windsor")!;
const checkout = ep.gumroadCheckoutUrl ?? gaivotaSeries.gumroadCheckoutUrl;
const directAnswer =
  "Gaivota em Portugal Episode 9 — Treaty of Windsor (1386): a paid noir Portuguese history comic PDF ($5 on Gumroad). Anglo-Portuguese alliance on parchment — history brief + 5-page story + 100-word PT→EN glossary. Episode 1 is free on this site.";

export const metadata: Metadata = {
  title: "Treaty of Windsor (1386) — Portuguese History Comic | Gaivota em Portugal",
  description: directAnswer,
  alternates: { canonical: `${siteConfig.url}${pagePath}` },
  openGraph: {
    title: "Treaty of Windsor — Gaivota comic ($5)",
    description: directAnswer,
    url: `${siteConfig.url}${pagePath}`,
    images: [{ url: `${siteConfig.url}/comics/gaivota-em-portugal/09-treaty-of-windsor/ep09-cover.webp` }],
  },
};

export default function Ep09Page() {
  return (
    <div className="min-h-screen bg-[#ebe4d8] text-[#0e0e0e]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b1f3d]">Ep.09 · $5 · Gumroad</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Tratado de Windsor</h1>
        <p className="mt-2 text-base text-[#5c574e] sm:text-lg">1386 · Anglo-Portuguese alliance</p>
        <figure className="mt-8">
          <Image alt="Cover: Treaty of Windsor" className="mx-auto h-auto w-full max-w-[20rem] sm:max-w-[24rem]" height={900} priority sizes="(max-width: 640px) 80vw, 24rem" src="/comics/gaivota-em-portugal/09-treaty-of-windsor/ep09-cover.webp" width={675} />
        </figure>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a className={btnPrimary} href={checkout} rel="noreferrer">Buy Ep.09 PDF — $5</a>
          <Link className={btnSecondary} href="/comics/gaivota-em-portugal/01-1755-earthquake">Read free Ep.01 first</Link>
          <Link className={btnSecondary} href={gaivotaSeries.hubPath}>Series hub</Link>
        </div>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#3a342c] sm:text-lg">{directAnswer}</p>
      </main>
      <SiteFooter />
    </div>
  );
}
