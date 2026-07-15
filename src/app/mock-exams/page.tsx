import Link from "next/link";
import type { Metadata } from "next";
import { LlmFactsStrip } from "@/components/llm/llm-facts-strip";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  buildMockIndexAiCategory,
  buildMockIndexAiDescription,
} from "@/lib/exam-llm-layer";
import { getAllMockExams } from "@/lib/mock-exams/configs";
import { buildMockExamItemListJsonLd } from "@/lib/mock-exams/llm";
import { buildMockSeoTitle } from "@/lib/mock-exams/seo";
import { mockFreeAccessNotice } from "@/lib/mock-exams/pricing";
import { isMockExamRunnable } from "@/lib/mock-exams/question-bank";
import { withAiMetadata } from "@/lib/llm-meta";
import { finalize, truncateSeoTitle } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

const usPriorityMockLinks = [
  {
    title: "FINRA securities licensing",
    body: "SIE first, then Series 7 and Series 63 readiness checks for registered-rep candidates.",
    links: [
      { href: "/mock-exams/sie-full-mock", label: "Free SIE practice test" },
      { href: "/mock-exams/series-7-readiness-check", label: "Series 7 readiness check" },
      { href: "/mock-exams/series-63-readiness-check", label: "Series 63 readiness check" },
    ],
  },
  {
    title: "Food safety manager certification",
    body: "ServSafe Manager / CFPM practice with a 90-question timed mock and domain review.",
    links: [{ href: "/mock-exams/servsafe-manager-mock", label: "Free ServSafe Manager practice test" }],
  },
  {
    title: "HVAC / EPA refrigerant certification",
    body: "EPA Section 608 readiness check for Core plus Types I–III before your proctored certifier exam.",
    links: [{ href: "/mock-exams/epa-608-readiness-check", label: "EPA 608 HVAC readiness check" }],
  },
  {
    title: "Building automation (BMS / BAS)",
    body: "BACnet, HVAC sequences, operator workflows, and commissioning baseline before vendor platform training.",
    links: [{ href: "/mock-exams/bms-bas-readiness-check", label: "BMS / BAS readiness check" }],
  },
  {
    title: "Chartered surveying (MRICS / APC)",
    body: "RICS APC readiness checks — general chartered pathway plus Quantity Surveying and Construction specialty competencies before submission and final interview.",
    links: [
      { href: "/mock-exams/mrics-readiness-check", label: "MRICS APC readiness check (all pathways)" },
      { href: "/mock-exams/mrics-quantity-surveying-readiness-check", label: "MRICS Quantity Surveying readiness check" },
    ],
  },
  {
    title: "Fire protection (CFPS)",
    body: "NFPA Certified Fire Protection Specialist readiness check — eight exam domains weighted to the Fire Protection Handbook blueprint before Prometric scheduling.",
    links: [{ href: "/mock-exams/cfps-readiness-check", label: "CFPS readiness check" }],
  },
  {
    title: "Occupational health & safety (NEBOSH)",
    body: "NEBOSH International General Certificate readiness check — management systems, workplace hazards, and GIC2 risk assessment before accredited Learning Partner training.",
    links: [{ href: "/mock-exams/nebosh-readiness-check", label: "NEBOSH IGC readiness check" }],
  },
  {
    title: "Data centre professional (CDCP)",
    body: "EXIN EPI Certified Data Centre Professional readiness check — facilities, power, cooling, fire, security, and operations before accredited training.",
    links: [{ href: "/mock-exams/cdcp-readiness-check", label: "CDCP readiness check" }],
  },
  {
    title: "Green building & wellness credentials",
    body: "LEED, WELL AP, CEM, and ASHRAE readiness checks before USGBC, IWBI, AEE, or ASHRAE exam registration.",
    links: [
      { href: "/mock-exams/leed-green-associate-readiness-check", label: "LEED GA readiness check" },
      { href: "/mock-exams/leed-ap-bd-c-readiness-check", label: "LEED AP BD+C readiness check" },
      { href: "/mock-exams/well-ap-readiness-check", label: "WELL AP readiness check" },
      { href: "/mock-exams/cem-readiness-check", label: "CEM readiness check" },
      { href: "/mock-exams/ashrae-certifications-readiness-check", label: "ASHRAE certifications readiness check" },
    ],
  },
  {
    title: "State licensing exams",
    body: "Insurance producer, California real estate, and PTCB pharmacy technician readiness checks before paid prep decisions.",
    links: [
      { href: "/mock-exams/life-and-health-insurance-readiness-check", label: "Life & Health insurance mock" },
      { href: "/mock-exams/property-and-casualty-insurance-readiness-check", label: "P&C insurance mock" },
      { href: "/mock-exams/california-real-estate-readiness-check", label: "California real estate mock" },
      { href: "/mock-exams/ptcb-pharmacy-technician-mock", label: "Free PTCB / PTCE practice test" },
    ],
  },
  {
    title: "Finance credential diagnostics",
    body: "CFA and FRM readiness checks to find weak topic rows before you drill formulas or flashcards.",
    links: [
      { href: "/mock-exams/cfa-level-1-readiness-check", label: "CFA Level 1 readiness check" },
      { href: "/mock-exams/frm-part-1-readiness-check", label: "FRM Part 1 readiness check" },
    ],
  },
  {
    title: "MBA admissions (GMAT Focus)",
    body: "Timed Quant, Verbal, and Data Insights baseline before official GMAC prep or tutoring.",
    links: [{ href: "/mock-exams/gmat-focus-readiness-check", label: "GMAT Focus readiness check" }],
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const mockCount = getAllMockExams().length;
  const title = truncateSeoTitle(
    "Free Practice Tests | SIE, MRICS, LEED, WELL AP, CFPS",
  );

  return withAiMetadata(
    finalize({
      title,
      description:
        "Free online practice tests: FINRA SIE, MRICS APC, LEED, WELL AP, CFPS, NEBOSH, CDCP, CEM, ASHRAE, ServSafe, EPA 608, BMS, GMAT, CFA, insurance, and more. Timed, scored, no signup.",
      keywords: [
        "free practice test",
        "mrics practice questions",
        "mrics quantity surveying apc",
        "rics qs prep",
        "chartered surveyor exam",
        "well accredited professional exam",
        "well v2 exam prep",
        "certified fire protection specialist exam",
        "nfpa cfps prep",
        "nebosh practice test",
        "nebosh igc exam",
        "nebosh gic1 prep",
        "cdcp practice test",
        "certified data centre professional exam",
        "exin cdcp prep",
        "ashrae certification practice test",
        "bemp exam prep",
        "bcxp practice test",
        "leed green associate practice test",
        "leed ap practice test",
        "cem practice test",
        "free sie practice test",
        "servsafe manager practice test",
        "epa 608 practice test",
        "bms practice test",
        "building automation practice exam",
        "hvac certification practice test",
        "gmat focus practice test",
        "insurance license practice exam",
        "series 7 practice test",
        "frm part 1 practice test",
        "california real estate practice test",
      ],
      alternates: {
        canonical: "/mock-exams",
      },
      openGraph: {
        title: "Free Practice Tests & Mock Exams | UniPrep2Go",
        description:
          "Free online practice tests for SIE, MRICS, LEED, WELL AP, CFPS, NEBOSH, CDCP, CEM, ASHRAE, ServSafe, EPA 608, BMS, GMAT, CFA, insurance, and California real estate with topic scoring and answer review.",
        url: "/mock-exams",
        type: "website",
        images: [
          {
            url: "/home/hero.webp",
            width: 1200,
            height: 630,
            alt: "UniPrep2Go free practice tests — SIE, ServSafe, insurance, CFA, Series 7",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Free Practice Tests & Mock Exams | UniPrep2Go",
        description:
          "Free timed mocks for SIE, ServSafe Manager, CFA, insurance, and real estate with topic scoring and answer review.",
        images: ["/home/hero.webp"],
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
  const pageUrl = absoluteUrl("/mock-exams");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        name: "Free Practice Tests Online | UniPrep2Go",
        description:
          "Free online practice tests for SIE, ServSafe Manager, CFA, FRM, Series 7, insurance, and California real estate. Timed, scored, no signup.",
        url: pageUrl,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
      },
      buildMockExamItemListJsonLd(),
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
          Free online practice tests for US licensing and finance exams
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4f493e]">
          {siteConfig.name} converts deck content into timed practice tests with weighted topic scoring,
          answer review, and a pass/no-pass readiness report. Americans use these free mocks for FINRA SIE,
          ServSafe Manager, insurance producer licensing, California real estate, CFA Level 1, FRM Part 1,
          and FINRA Series exams — then drill weak topics with the linked Anki flashcard deck.{" "}
          {mockFreeAccessNotice}
        </p>
        <LlmFactsStrip mockCount={mocks.length} variant="mock-index" />
        <ul className="mt-6 grid gap-3 text-sm leading-6 text-[#4f493e] sm:grid-cols-3">
          <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">Timed exam-style questions</li>
          <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">Weighted topic score breakdown</li>
          <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">Wrong-answer review and linked deck repair plan</li>
        </ul>

        <section className="mt-10 rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-5 sm:p-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            US exam prep: mocks first, decks second
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#4f493e]">
            Use the free mock to learn whether you are ready. If the report exposes weak topics,
            move to the linked Anki deck or PDF for daily remediation.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {usPriorityMockLinks.map((group) => (
              <article className="rounded-2xl bg-[#18140f]/5 p-4" key={group.title}>
                <h3 className="font-semibold text-[#18140f]">{group.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5f5749]">{group.body}</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-[#1f3a5f]">
                  {group.links.map((link) => (
                    <Link className="underline-offset-4 hover:underline" href={link.href} key={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-10 space-y-4">
          {mocks.map((mock) => {
            const runnable = isMockExamRunnable(mock.slug);

            return (
              <Link
                key={mock.slug}
                className="block rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 transition hover:border-[#1f3a5f]/30"
                href={`/mock-exams/${mock.slug}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold">{buildMockSeoTitle(mock)}</h2>
                  <span className="rounded-full bg-[#1f3a5f]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#1f3a5f]">
                    {mock.status === "live" ? "Full mock available" : "Preview readiness check"}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[#4f493e]">{mock.description}</p>
                <p className="mt-4 text-sm text-[#5f5749]">
                  {mock.questionCount} questions · {mock.durationMinutes} minutes · pass {mock.passRule.passPercent}%
                  {runnable ? "" : " · bank expanding"}
                </p>
              </Link>
            );
          })}
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
