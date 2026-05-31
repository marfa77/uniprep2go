import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { primaryDeck } from "@/lib/decks";
import { siteConfig } from "@/lib/site";

const directAnswer =
  "To import the CFA Level 1 Anki deck, download the .apkg file from your Gumroad receipt, open the Anki desktop app, choose File then Import, and select the .apkg file. The deck appears in your deck list and you can sync it to AnkiDroid or AnkiMobile through a free AnkiWeb account.";

export const metadata: Metadata = {
  title: "How to import the CFA Level 1 Anki deck",
  description: directAnswer,
  alternates: {
    canonical: "/how-to-import-cfa-anki-deck",
  },
};

const steps = primaryDeck.importSteps ?? [];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${siteConfig.url}/how-to-import-cfa-anki-deck#howto`,
  name: "How to import the CFA Level 1 Anki deck",
  description: directAnswer,
  totalTime: "PT5M",
  step: steps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.detail,
  })),
};

export default function HowToImportPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#18140f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      <article className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-10 lg:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">Guide</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance">
          How to import the CFA Level 1 Anki deck
        </h1>

        <p className="mt-6 text-lg leading-8 text-[#4f493e]">{directAnswer}</p>

        <ol className="mt-10 space-y-6">
          {steps.map((step, index) => (
            <li className="flex gap-4" key={step.title}>
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#18140f] font-mono text-sm font-semibold text-[#fffaf0]">
                {index + 1}
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-tight">{step.title}</h2>
                <p className="mt-2 leading-7 text-[#4f493e]">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap gap-4 text-sm font-medium">
          <Link className="underline decoration-[#18140f]/20 underline-offset-4" href={`/decks/${primaryDeck.slug}`}>
            Back to the deck
          </Link>
          <Link className="underline decoration-[#18140f]/20 underline-offset-4" href="/cfa-level-1-anki-deck-vs-curriculum">
            Deck vs official curriculum
          </Link>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
