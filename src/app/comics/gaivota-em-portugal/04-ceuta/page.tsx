import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { gaivotaEpisodes, gaivotaSeries } from "@/lib/gaivota-comics";
import { siteConfig } from "@/lib/site";
import { btnPrimary, btnSecondary } from "@/lib/ui-button-classes";

const pagePath = "/comics/gaivota-em-portugal/04-ceuta";
const ep04 = gaivotaEpisodes.find((e) => e.id === "04-ceuta")!;
const checkout = ep04.gumroadCheckoutUrl ?? gaivotaSeries.gumroadCheckoutUrl;

const directAnswer =
  "Gaivota em Portugal Episode 4 — Ceuta (Conquest of Ceuta, 1415): a paid noir Portuguese history comic PDF ($5 on Gumroad). Includes a factual history brief, a complete 5-page story, and a 100-word PT→EN glossary. Episode 1 (1755) is free on this site.";

export const metadata: Metadata = {
  title: "Ceuta (1415) — Portuguese History Comic | Gaivota em Portugal",
  description: directAnswer,
  alternates: { canonical: `${siteConfig.url}${pagePath}` },
  openGraph: {
    title: "Ceuta — Gaivota comic ($5)",
    description: directAnswer,
    url: `${siteConfig.url}${pagePath}`,
    images: [
      {
        url: `${siteConfig.url}/comics/gaivota-em-portugal/04-ceuta/ep04-cover.webp`,
      },
    ],
  },
};

export default function Ep04CeutaPage() {
  return (
    <div className="min-h-screen bg-[#ebe4d8] text-[#0e0e0e]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b1f3d]">
          Ep.04 · $5 · Gumroad
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Ceuta</h1>
        <p className="mt-2 text-base text-[#5c574e] sm:text-lg">
          Conquest of Ceuta · 21 August 1415
        </p>

        <figure className="mt-8">
          <Image
            alt="Cover: Ceuta — Gaivota comic"
            className="mx-auto h-auto w-full max-w-[20rem] sm:max-w-[24rem]"
            height={900}
            priority
            sizes="(max-width: 640px) 80vw, 24rem"
            src="/comics/gaivota-em-portugal/04-ceuta/ep04-cover.webp"
            width={675}
          />
        </figure>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a className={btnPrimary} href={checkout} rel="noreferrer">
            Buy Ep.04 PDF — $5
          </a>
          <Link className={btnSecondary} href="/comics/gaivota-em-portugal/01-1755-earthquake">
            Read free Ep.01 first
          </Link>
          <Link className={btnSecondary} href={gaivotaSeries.hubPath}>
            Series hub
          </Link>
        </div>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#3a342c] sm:text-lg">
          {directAnswer}
        </p>
        <ul className="mt-5 list-disc space-y-1 pl-5 text-[#3a342c]">
          <li>
            Printable <strong>PDF</strong> download
          </li>
          <li>History brief + noir 5-page comic with ending</li>
          <li>100 new Portuguese words · English glossary</li>
          <li>Human-scale story — sea and walls, not gore</li>
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
