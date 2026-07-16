import Link from "next/link";
import type { Metadata } from "next";
import { LlmFactsStrip } from "@/components/llm/llm-facts-strip";
import { OfficialSourceTrustStrip } from "@/components/official-source-trust";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  buildMockIndexAiCategory,
  buildMockIndexAiDescription,
} from "@/lib/exam-llm-layer";
import { getAllMockExams, getMockExamConfig } from "@/lib/mock-exams/configs";
import { buildMockExamItemListJsonLd } from "@/lib/mock-exams/llm";
import { buildMockExamHubFaqs, buildMockSeoTitle } from "@/lib/mock-exams/seo";
import { mockFreeAccessNotice } from "@/lib/mock-exams/pricing";
import { withAiMetadata } from "@/lib/llm-meta";
import { finalize, leafPageTitle, shouldIndexMockExam } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { getCatalogDeckBySlug } from "@/lib/decks";

const featuredMockSlugs = [
  "sie-full-mock",
  "cfa-level-1-readiness-check",
  "cfa-level-2-readiness-check",
  "frm-part-1-readiness-check",
  "servsafe-manager-mock",
  "ptcb-pharmacy-technician-mock",
  "series-7-readiness-check",
  "life-and-health-insurance-readiness-check",
] as const;

const mockClusters = [
  {
    id: "licensing",
    label: "US licensing & insurance",
    slugs: [
      "sie-full-mock",
      "series-7-readiness-check",
      "series-63-readiness-check",
      "life-and-health-insurance-readiness-check",
      "property-and-casualty-insurance-readiness-check",
      "california-real-estate-readiness-check",
      "ptcb-pharmacy-technician-mock",
      "servsafe-manager-mock",
    ],
  },
  {
    id: "finance",
    label: "Finance credentials",
    slugs: [
      "cfa-level-1-readiness-check",
      "cfa-level-2-readiness-check",
      "frm-part-1-readiness-check",
      "gmat-focus-readiness-check",
      "gre-readiness-check",
      "sat-readiness-check",
    ],
  },
  {
    id: "building",
    label: "Building & sustainability",
    slugs: [
      "epa-608-readiness-check",
      "leed-green-associate-readiness-check",
      "leed-ap-om-readiness-check",
      "well-ap-readiness-check",
      "mrics-readiness-check",
      "pmp-readiness-check",
    ],
  },
] as const;

function mockCtaLabel(status: string) {
  return status === "live" ? "Start free mock" : "Start readiness check";
}

export async function generateMetadata(): Promise<Metadata> {
  const mockCount = getAllMockExams().length;

  return withAiMetadata(
    finalize({
      title: leafPageTitle("Free Mock Exams 2026 | SIE, CFA, FRM, ServSafe & More"),
      description:
        "Free timed mock exams for SIE, CFA, FRM, ServSafe, PTCB, insurance, and real estate. Topic scoring, answer review, no signup.",
      keywords: [
        "free practice test",
        "free sie practice test",
        "cfa level 1 mock exam",
        "cfa level 2 mock exam",
        "servsafe manager practice test",
        "frm part 1 practice test",
        "insurance license practice exam",
      ],
      alternates: {
        canonical: "/mock-exams",
      },
      openGraph: {
        title: "Free Timed Mock Exams | UniPrep2Go",
        description:
          "Free online practice tests for US licensing and finance with topic scoring and answer review.",
        url: "/mock-exams",
        type: "website",
        images: [
          {
            url: "/home/hero.webp",
            width: 1200,
            height: 630,
            alt: "UniPrep2Go free practice tests",
          },
        ],
      },
    }),
    {
      aiDescription: buildMockIndexAiDescription(mockCount),
      aiCategory: buildMockIndexAiCategory(),
      path: "/mock-exams",
    },
  );
}

export const revalidate = 3600;

export default function MockExamsIndexPage() {
  const mocks = getAllMockExams();
  const indexedCount = mocks.filter((mock) => shouldIndexMockExam(mock.slug)).length;
  const hubFaqs = buildMockExamHubFaqs(indexedCount, mocks.length);
  const pageUrl = absoluteUrl("/mock-exams");
  const featuredMocks = featuredMockSlugs
    .map((slug) => getMockExamConfig(slug))
    .filter((mock) => mock !== undefined);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        name: "Free Timed Mock Exams for US Licensing & Finance",
        description:
          "Free online practice tests for SIE, ServSafe, CFA, FRM, insurance, and California real estate.",
        url: pageUrl,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
      },
      buildMockExamItemListJsonLd({ indexedOnly: true }),
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: hubFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#18140f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      <article className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10 lg:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">Free practice tests</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Free timed mock exams for US licensing &amp; finance
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4f493e]">
          {indexedCount} live indexed mocks plus {mocks.length - indexedCount} preview readiness checks.
          Timed scoring, topic breakdown, and linked Anki deck repair. {mockFreeAccessNotice}
        </p>
        <OfficialSourceTrustStrip className="mt-6 max-w-3xl" />
        <LlmFactsStrip mockCount={mocks.length} variant="mock-index" />

        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight">Featured free mocks</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {featuredMocks.map((mock) => {
              const linkedDeck = getCatalogDeckBySlug(mock.linkedDeckSlug);
              return (
                <article
                  className="flex flex-col rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-5"
                  key={mock.slug}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold">{buildMockSeoTitle(mock)}</h3>
                    <span className="rounded-full bg-[#1f3a5f]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#1f3a5f]">
                      {mock.status === "live" ? "Live" : "Preview"}
                    </span>
                  </div>
                  <p className="mt-2 flex-1 text-sm text-[#5f5749]">
                    {mock.questionCount} questions · {mock.durationMinutes} min · pass {mock.passRule.passPercent}%
                  </p>
                  {linkedDeck ? (
                    <Link
                      className="mt-2 text-sm font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
                      href={`/decks/${linkedDeck.slug}`}
                    >
                      {linkedDeck.shortName} Anki deck
                    </Link>
                  ) : null}
                  <Link
                    aria-label={`${mockCtaLabel(mock.status)} for ${mock.shortTitle}`}
                    className="mt-4 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1f3a5f] px-4 py-2.5 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#152238]"
                    href={`/mock-exams/${mock.slug}`}
                  >
                    {mockCtaLabel(mock.status)}
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        {mockClusters.map((cluster) => (
          <section className="mt-12" key={cluster.id}>
            <h2 className="text-2xl font-semibold tracking-tight">{cluster.label}</h2>
            <ul className="mt-5 space-y-3">
              {cluster.slugs.map((slug) => {
                const mock = getMockExamConfig(slug);
                if (!mock) return null;
                const linkedDeck = getCatalogDeckBySlug(mock.linkedDeckSlug);
                return (
                  <li key={slug}>
                    <Link
                      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#18140f]/10 bg-[#fffaf0] px-4 py-3 hover:border-[#1f3a5f]/30"
                      href={`/mock-exams/${slug}`}
                    >
                      <span className="font-medium">{mock.shortTitle}</span>
                      <span className="text-sm text-[#5f5749]">
                        {mock.questionCount} Q · {mock.status}
                        {linkedDeck ? ` · ${linkedDeck.shortName} deck` : ""}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <section className="mt-12 rounded-3xl border border-[#18140f]/10 bg-[#18140f]/5 p-5">
          <h2 className="text-lg font-semibold">Browse all Anki decks</h2>
          <p className="mt-2 text-sm text-[#5f5749]">
            After your mock report, drill weak topics with the linked flashcard deck.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium text-[#1f3a5f]">
            <Link className="underline-offset-4 hover:underline" href="/finance-anki-decks">
              Finance decks
            </Link>
            <Link className="underline-offset-4 hover:underline" href="/building-certification-anki-decks">
              Building certs
            </Link>
            <Link className="underline-offset-4 hover:underline" href="/#catalog">
              Full catalog
            </Link>
          </div>
        </section>

        <section className="mt-12" id="faq">
          <h2 className="text-2xl font-semibold tracking-tight">Practice test FAQ</h2>
          <dl className="mt-6 space-y-6">
            {hubFaqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-lg font-semibold text-[#18140f]">{faq.question}</dt>
                <dd className="mt-2 text-sm leading-7 text-[#5f5749]">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <details className="mt-10 rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-5">
          <summary className="cursor-pointer font-semibold">All {mocks.length} mocks (machine-readable)</summary>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#18140f]/10 text-[#5f5749]">
                  <th className="py-2 pr-4">Slug</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Questions</th>
                  <th className="py-2">Linked deck</th>
                </tr>
              </thead>
              <tbody>
                {mocks.map((mock) => (
                  <tr className="border-b border-[#18140f]/5" key={mock.slug}>
                    <td className="py-2 pr-4 font-mono text-xs">{mock.slug}</td>
                    <td className="py-2 pr-4">{mock.status}</td>
                    <td className="py-2 pr-4">{mock.questionCount}</td>
                    <td className="py-2">{mock.linkedDeckSlug}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </article>

      <SiteFooter />
    </main>
  );
}
