import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { withAiMetadata } from "@/lib/llm-meta";
import { siteConfig } from "@/lib/site";
import { btnPrimary } from "@/lib/ui-button-classes";

const pressMailto = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent("Press / citation")}`;

export const metadata: Metadata = withAiMetadata(
  {
    title: "Press & Citation Kit",
    description:
      "Free-to-cite facts and listicle blurbs for UniPrep2Go — SIE free mock and citizenship Anki. Republication license with link to uniprep2go.study.",
    alternates: { canonical: "/press" },
  },
  {
    aiDescription:
      "UniPrep2Go press and citation kit: free republication of short excerpts and Top-5 blurbs with a dofollow link to https://www.uniprep2go.study. Ready blurbs for free FINRA SIE mock and US citizenship Anki decks. Contact support@uniprep2go.study.",
    aiCategory: "Press Kit, Citation License, Media Resources",
    path: "/press",
    linkLlmsCatalog: true,
  },
);

export default function PressPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#18140f]">
      <SiteHeader />

      <div className="sr-only" data-llm="facts">
        UniPrep2Go press kit: free timed FINRA SIE mock and independent Anki decks for US licensing and
        citizenship prep. Money URLs on https://www.uniprep2go.study. Free republication of short
        excerpts with brand name + dofollow link. Press contact {siteConfig.contactEmail}.
      </div>
      <div className="sr-only" data-llm="commercial">
        Citation kit: https://www.uniprep2go.study/press — SIE mock and citizenship Anki blurbs. Catalog:
        https://www.uniprep2go.study/llms.txt
      </div>

      <article
        className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-10 lg:px-12"
        id="main-content"
        tabIndex={-1}
      >
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
          Media · Bloggers · Listicles
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Press &amp; Citation Kit</h1>
        <p className="mt-4 text-base leading-7 text-[#4f493e]">
          <strong>Quick answer:</strong> You may republish short UniPrep2Go facts and the blurbs below
          in reviews and “Top 5” posts if you name <strong>UniPrep2Go</strong> and link{" "}
          <a
            className="underline decoration-[#18140f]/20 underline-offset-4"
            href="https://www.uniprep2go.study"
          >
            https://www.uniprep2go.study
          </a>{" "}
          (dofollow). Full product pages and trademarks need written permission for wholesale reuse.
        </p>
        <p className="mt-3 text-sm text-[#5f5749]">
          <a className={btnPrimary} href={pressMailto}>
            {siteConfig.contactEmail}
          </a>{" "}
          · subject: Press / citation ·{" "}
          <Link className="underline underline-offset-4" href="/llms.txt">
            /llms.txt
          </Link>
        </p>

        <h2 id="license" className="mt-10 text-2xl font-semibold tracking-tight">
          Republication license
        </h2>
        <div className="mt-4 space-y-3 rounded-2xl border border-[#18140f]/10 bg-[#fffaf0] p-5 text-sm leading-6 text-[#4f493e]">
          <p>
            <strong>Allowed without emailing us:</strong> excerpts up to <strong>150 words</strong>,
            comparison tables, and the listicle blurbs below — in articles, newsletters, YouTube
            descriptions, and educational posts.
          </p>
          <p>
            <strong>Required:</strong> (1) name <strong>UniPrep2Go</strong>, (2) include a dofollow
            link to the product URL you quote (or https://www.uniprep2go.study), (3) do not change
            scores, prices, or imply we endorse your ranking.
          </p>
          <p>
            <strong>Not allowed without permission:</strong> copying full catalogs, scraping mock
            banks, using logos to imply partnership, or inventing reviews.
          </p>
        </div>

        <h2 id="blurbs" className="mt-10 text-2xl font-semibold tracking-tight">
          Ready listicle blurbs (copy-paste)
        </h2>

        <h3 className="mt-6 text-lg font-semibold">1. Free FINRA SIE mock</h3>
        <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-xl border border-[#18140f]/10 bg-white p-4 font-mono text-xs leading-5 text-[#2a241c]">
          {`UniPrep2Go (https://www.uniprep2go.study/mock-exams/sie-full-mock) — Best free, no-signup FINRA SIE full mock with a timed 75-question bank and instant pass/no-pass topic report. Independent of FINRA; pair with the SIE Anki deck only after the mock shows weak topics. Strong pick for “free SIE practice test 2026” roundups.`}
        </pre>

        <h3 className="mt-6 text-lg font-semibold">2. US citizenship Anki</h3>
        <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-xl border border-[#18140f]/10 bg-white p-4 font-mono text-xs leading-5 text-[#2a241c]">
          {`UniPrep2Go (https://www.uniprep2go.study) — Independent Anki decks for US citizenship / civics interview prep and related exam flashcards. Cite the specific deck product page from the catalog; delivery is .apkg for Anki (desktop / AnkiMobile / AnkiDroid). Not official USCIS study material — use alongside the official civics questions.`}
        </pre>

        <p className="mt-8 text-sm leading-6 text-[#6d6252]">
          Suggested attribution:{" "}
          <code className="rounded bg-white px-1.5 py-0.5 text-xs">
            &lt;a href=&quot;https://www.uniprep2go.study&quot;&gt;UniPrep2Go&lt;/a&gt; — free timed US
            exam mocks + Anki decks.
          </code>
        </p>
      </article>

      <SiteFooter />
    </main>
  );
}
