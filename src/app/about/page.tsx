import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { withAiMetadata } from "@/lib/llm-meta";
import { buildSiteOrganizationJsonLd } from "@/lib/product-jsonld";
import { siteConfig } from "@/lib/site";
import { btnSecondary } from "@/lib/ui-button-classes";

const aboutDescription =
  "UniPrep2Go is an independent exam-prep publisher: original timed mocks mapped to official outlines, then focused Anki decks and PDFs for weak-topic repair. Not affiliated with FINRA, CFA Institute, GARP, PTCB, or state exam bodies.";

export const metadata: Metadata = withAiMetadata(
  {
    title: "About & methodology",
    description: aboutDescription,
    alternates: { canonical: "/about" },
  },
  {
    aiDescription: aboutDescription,
    aiCategory: "publisher;methodology;exam-prep",
    path: "/about",
  },
);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildSiteOrganizationJsonLd(),
    {
      "@type": "AboutPage",
      "@id": `${siteConfig.url}/about#webpage`,
      url: `${siteConfig.url}/about`,
      name: "About UniPrep2Go",
      description: aboutDescription,
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      about: { "@id": `${siteConfig.url}/#organization` },
    },
  ],
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#18140f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      <article
        className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-10 lg:px-12"
        id="main-content"
        tabIndex={-1}
      >
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
          Publisher
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">About UniPrep2Go</h1>
        <p className="mt-4 text-base leading-7 text-[#4f493e]">
          UniPrep2Go publishes independent exam preparation for people who already have a test date:
          a free timed mock with a topic readiness report, then a focused Anki deck or printable
          guide to close the gaps. We are not an exam body, a tutoring school, or a dump of official
          items.
        </p>
        <p className="mt-3 text-base leading-7 text-[#4f493e]">
          The site is operated by PixID Studio. Checkout is on Gumroad, Lemon Squeezy, or the
          Prep2Go App Store depending on the product. Language and immigration apps live on{" "}
          <a className="underline underline-offset-4" href="https://www.prep2go.study">
            Prep2Go
          </a>
          ; UniPrep2Go is the US mock → report → deck loop.
        </p>

        <h2 id="who" className="mt-10 text-2xl font-semibold tracking-tight">
          Who this is for
        </h2>
        <p className="mt-4 text-base leading-7 text-[#4f493e]">
          Primary market is the United States: FINRA (SIE, Series 7, 63), PTCB, ServSafe, insurance
          licensing, California real estate, CFA, and FRM. Other live mocks and decks (building
          certifications, language, citizenship) stay in the catalog so candidates who already found
          them can finish the loop — they are not the weekly SEO push.
        </p>

        <h2 id="methodology" className="mt-10 text-2xl font-semibold tracking-tight">
          How we build a mock and a deck
        </h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-base leading-7 text-[#4f493e]">
          <li>
            Start from the current official outline or blueprint (question count, time, pass line,
            topic weights) published by the exam body — never from a leaked item bank.
          </li>
          <li>
            Write original scenario questions and flashcards. Stems do not copy official forms.
            Distractors are the mistakes a candidate actually makes on that rule.
          </li>
          <li>
            Map coverage to the published weights. The mock session length is honest when it is
            shorter than the official exam (stated on the page).
          </li>
          <li>
            Mechanical QA (duplicate stems, thin notes, key-letter bias) plus a line-by-line content
            review before a bank is marked ready.
          </li>
          <li>
            Ship the free timed check first. The Anki deck is the repair layer for weak topics — or
            a waitlist if the deck is not for sale yet.
          </li>
        </ol>

        <h2 id="sources" className="mt-10 text-2xl font-semibold tracking-tight">
          Source policy
        </h2>
        <p className="mt-4 text-base leading-7 text-[#4f493e]">
          Exam facts (timing, item counts, pass scores, domain weights) come from the exam body’s
          public pages and PDFs, linked on each mock and product page. We do not sell or redistribute
          official exam questions. Product pages carry a Last reviewed date when the copy or bank
          last changed.
        </p>

        <h2 id="corrections" className="mt-10 text-2xl font-semibold tracking-tight">
          Corrections
        </h2>
        <p className="mt-4 text-base leading-7 text-[#4f493e]">
          If a fact, card count, or explanation is wrong, email{" "}
          <a className="underline underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>{" "}
          with the URL and the official source. We correct the live bank or page; we do not hide the
          change behind a new SKU.
        </p>

        <h2 id="not" className="mt-10 text-2xl font-semibold tracking-tight">
          What we are not
        </h2>
        <p className="mt-4 text-base leading-7 text-[#4f493e]">
          {siteConfig.footerDisclaimer.independence} {siteConfig.footerDisclaimer.trademarks}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link className={btnSecondary} href="/mock-exams">
            Free mocks
          </Link>
          <Link className={btnSecondary} href="/contact">
            Contact
          </Link>
          <Link className={btnSecondary} href="/press">
            Press kit
          </Link>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
