import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { gaivotaEpisodes, gaivotaSeries } from "@/lib/gaivota-comics";
import { siteConfig } from "@/lib/site";
import { btnPrimary, btnSecondary } from "@/lib/ui-button-classes";

const pagePath = "/comics/gaivota-em-portugal/10-eu-accession";
const ep = gaivotaEpisodes.find((e) => e.id === "10-eu-accession")!;
const checkout = ep.gumroadCheckoutUrl ?? gaivotaSeries.gumroadCheckoutUrl;
const directAnswer =
  "Gaivota em Portugal Episode 10 — EU Accession (1986): a paid noir Portuguese history comic PDF ($5 on Gumroad). Portugal joins the European Communities — history brief + 5-page story + 100-word PT→EN glossary. Episode 1 is free on this site.";

export const metadata: Metadata = {
  title: "EU Accession (1986) — Portuguese History Comic | Gaivota em Portugal",
  description: directAnswer,
  alternates: { canonical: `${siteConfig.url}${pagePath}` },
  openGraph: {
    title: "EU Accession 1986 — Gaivota comic ($5)",
    description: directAnswer,
    url: `${siteConfig.url}${pagePath}`,
    images: [{ url: `${siteConfig.url}/comics/gaivota-em-portugal/10-eu-accession/ep10-cover.webp` }],
  },
};

export default function Ep10Page() {
  return (
    <div className="min-h-screen bg-[#ebe4d8] text-[#0e0e0e]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b1f3d]">Ep.10 · $5 · Gumroad</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Adesão à Europa</h1>
        <p className="mt-2 text-base text-[#5c574e] sm:text-lg">1 January 1986 · EEC accession</p>
        <figure className="mt-8">
          <Image alt="Cover: EU Accession" className="mx-auto h-auto w-full max-w-[20rem] sm:max-w-[24rem]" height={900} priority sizes="(max-width: 640px) 80vw, 24rem" src="/comics/gaivota-em-portugal/10-eu-accession/ep10-cover.webp" width={675} />
        </figure>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a className={btnPrimary} href={checkout} rel="noreferrer">Buy Ep.10 PDF — $5</a>
          <Link className={btnSecondary} href="/comics/gaivota-em-portugal/01-1755-earthquake">Read free Ep.01 first</Link>
          <Link className={btnSecondary} href={gaivotaSeries.hubPath}>Series hub</Link>
        </div>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#3a342c] sm:text-lg">{directAnswer}</p>
      </main>
      <SiteFooter />
    </div>
  );
}
