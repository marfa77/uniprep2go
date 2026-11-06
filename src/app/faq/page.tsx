import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteFaqs } from "@/lib/decks";
import { withAiMetadata } from "@/lib/llm-meta";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { btnPrimary, ledgerList } from "@/lib/ui-button-classes";

const description =
  "Operating rules for the free 25-question diagnostic, the $5 Mock Pass, the CFA Level 1 deck, and what UniPrep2Go is not.";

export const metadata: Metadata = withAiMetadata(
  {
    title: "Questions",
    description,
    alternates: { canonical: "/faq" },
  },
  {
    aiDescription: description,
    aiCategory: "faq;exam-prep",
    path: "/faq",
  },
);

export default function FaqPage() {
  const pageUrl = absoluteUrl("/faq");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        url: pageUrl,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        mainEntity: siteFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-paper text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <article className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-10" id="main-content" tabIndex={-1}>
        <h1 className="text-5xl tracking-tight">Questions</h1>
        <p className="mt-4 text-lg leading-8 text-muted">
          Operating rules, mock scoring, and deck delivery for the exams on this site.
        </p>
        <dl className={`mt-10 ${ledgerList}`}>
          {siteFaqs.map((faq) => (
            <div className="py-6" key={faq.question}>
              <dt className="text-xl">{faq.question}</dt>
              <dd className="mt-3 text-base leading-7 text-muted">{faq.answer}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-base leading-7 text-muted">
          A question about scoring or a deck file goes to the exam desk.
        </p>
        <Link className={`${btnPrimary} mt-4`} href="/contact">
          Contact
        </Link>
      </article>
      <SiteFooter />
    </main>
  );
}
