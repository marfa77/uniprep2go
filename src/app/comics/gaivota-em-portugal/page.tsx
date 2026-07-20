import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { gaivotaEpisodes, gaivotaSeries } from "@/lib/gaivota-comics";
import { siteConfig } from "@/lib/site";
import { btnPrimary, btnSecondary } from "@/lib/ui-button-classes";

const directAnswer =
  "Gaivota em Portugal is a free-to-start noir comic series about Portuguese history. Episode 1 (1755 Lisbon Earthquake) is free to read on this site. Later episodes cost $5 each on Gumroad. Each issue: history brief, 5-page artistic comic, 100 Portuguese words with English glossary.";

export const metadata: Metadata = {
  title: "Gaivota em Portugal — Free Portuguese History Comics | UniPrep2Go",
  description: directAnswer,
  alternates: { canonical: `${siteConfig.url}${gaivotaSeries.hubPath}` },
  openGraph: {
    title: "Gaivota em Portugal — Portuguese history comics",
    description: directAnswer,
    url: `${siteConfig.url}${gaivotaSeries.hubPath}`,
    images: [
      {
        url: `${siteConfig.url}/comics/gaivota-em-portugal/01-1755-earthquake/art/ep01-cover.jpg`,
      },
    ],
  },
};

export default function GaivotaHubPage() {
  const ep01 = gaivotaEpisodes[0]!;

  return (
    <div className="min-h-screen bg-[#ebe4d8] text-[#0e0e0e]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl px-6 pb-20 pt-12 sm:px-10">
        <div className="flex flex-wrap items-center gap-4">
          <Image
            alt="Gaivota mascot"
            className="h-16 w-16 rounded-full border-2 border-[#0e0e0e] object-cover"
            height={64}
            src="/comics/gaivota-em-portugal/01-1755-earthquake/art/gaivota-canon-stamp.jpg"
            width={64}
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1f6f8b]">
              Free sample · Prep2Go comics
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {gaivotaSeries.title}
            </h1>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#3a342c]">{directAnswer}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link className={btnPrimary} href={ep01.pagePath!}>
            Read Ep.01 free — O Terramoto (1755)
          </Link>
          <a className={btnSecondary} href={gaivotaSeries.gumroadCheckoutUrl} rel="noreferrer">
            Ep.02 PDF on Gumroad — $5
          </a>
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold">Episodes</h2>
          <ul className="mt-5 divide-y divide-[#0e0e0e]/15 border border-[#0e0e0e]/15 bg-[#f4f1ea]">
            {gaivotaEpisodes.map((ep) => (
              <li key={ep.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#5c574e]">
                    Ep.{String(ep.number).padStart(2, "0")} · {ep.year}
                  </p>
                  <p className="font-semibold">
                    {ep.titlePt} — {ep.event}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  {ep.price === "free" ? (
                    <span className="rounded-full bg-[#1f6f8b] px-3 py-1 font-bold text-white">FREE</span>
                  ) : (
                    <span className="font-semibold">${ep.price}</span>
                  )}
                  {ep.status === "live" && ep.pagePath ? (
                    <Link className="font-semibold underline underline-offset-2" href={ep.pagePath}>
                      {ep.price === "free" ? "Read free" : "View / buy"}
                    </Link>
                  ) : (
                    <span className="text-[#5c574e]">Coming next</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 rounded-sm border border-[#0e0e0e]/15 bg-[#f4f1ea] p-6">
          <h2 className="text-xl font-semibold">What you get each episode</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-[#3a342c]">
            <li>Ep.01 free on this site (HTML) · paid episodes as printable PDF</li>
            <li>History brief + artistic noir comic with a complete ending</li>
            <li>100 new Portuguese words · English glossary</li>
            <li>One Gumroad product per paid episode (separate downloads)</li>
          </ul>
          <p className="mt-4 text-sm text-[#5c574e]">
            Pairs well with CIPLE A2 and other Prep2Go Portuguese Anki decks — culture and reading, not only flashcards.
          </p>
          <Link
            className="mt-3 inline-block text-sm font-semibold underline underline-offset-2"
            href="/decks/ciple-a2-european-portuguese-anki-deck"
          >
            CIPLE A2 Anki deck →
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
