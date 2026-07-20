import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { gaivotaEpisodes, gaivotaSeries } from "@/lib/gaivota-comics";
import { siteConfig } from "@/lib/site";
import { btnPrimary, btnSecondary } from "@/lib/ui-button-classes";

const pagePath = "/comics/gaivota-em-portugal/03-aljubarrota";
const ep03 = gaivotaEpisodes.find((e) => e.id === "03-aljubarrota")!;
const checkout =
  ep03.gumroadCheckoutUrl ?? gaivotaSeries.gumroadCheckoutUrl;

const directAnswer =
  "Gaivota em Portugal Episode 3 — Aljubarrota (Battle of Aljubarrota, 1385): a paid noir Portuguese history comic PDF ($5 on Gumroad). Includes a factual history brief, a complete 5-page story, and a 100-word PT→EN glossary. Episode 1 (1755) is free on this site.";

export const metadata: Metadata = {
  title: "Aljubarrota (1385) — Portuguese History Comic | Gaivota em Portugal",
  description: directAnswer,
  alternates: { canonical: `${siteConfig.url}${pagePath}` },
  openGraph: {
    title: "Aljubarrota — Gaivota comic ($5)",
    description: directAnswer,
    url: `${siteConfig.url}${pagePath}`,
    images: [
      {
        url: `${siteConfig.url}/comics/gaivota-em-portugal/03-aljubarrota/ep03-cover.jpg`,
      },
    ],
  },
};

export default function Ep03AljubarrotaPage() {
  return (
    <div className="min-h-screen bg-[#ebe4d8] text-[#0e0e0e]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl px-6 pb-20 pt-12 sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b1f3d]">
          Ep.03 · $5 · Gumroad
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Aljubarrota</h1>
        <p className="mt-2 text-lg text-[#5c574e]">Battle of Aljubarrota · 14 August 1385</p>

        <div className="mt-8 overflow-hidden border-2 border-[#0e0e0e]">
          <Image
            alt="Cover: Aljubarrota comic"
            className="h-auto w-full object-cover"
            height={900}
            priority
            src="/comics/gaivota-em-portugal/03-aljubarrota/ep03-cover.jpg"
            width={675}
          />
        </div>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#3a342c]">{directAnswer}</p>

        <ul className="mt-5 list-disc space-y-1 pl-5 text-[#3a342c]">
          <li>
            Printable <strong>PDF</strong> download
          </li>
          <li>History brief + noir 5-page comic with ending</li>
          <li>100 new Portuguese words · English glossary</li>
          <li>Human-scale story — courage and dust, not gore</li>
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <a className={btnPrimary} href={checkout} rel="noreferrer">
            Buy Ep.03 PDF — $5
          </a>
          <Link className={btnSecondary} href="/comics/gaivota-em-portugal/01-1755-earthquake">
            Read free Ep.01 first
          </Link>
          <Link className={btnSecondary} href={gaivotaSeries.hubPath}>
            Series hub
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
