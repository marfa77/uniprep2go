import Link from "next/link";
import { getCatalogDeckBySlug } from "@/lib/decks";
import { buildMockExamFaqs, buildMockSeoPageCopy } from "@/lib/mock-exams/seo";
import { mockFreeAccessNotice } from "@/lib/mock-exams/pricing";
import type { MockExamConfig } from "@/lib/mock-exams/types";

type MockSeoSectionsProps = {
  config: MockExamConfig;
  /** @deprecated Use MockExamAboutSection + MockExamFaqSection */
  variant?: "full";
};

export function MockExamAboutSection({ config }: { config: MockExamConfig }) {
  const copy = buildMockSeoPageCopy(config);
  const linkedDeck = getCatalogDeckBySlug(config.linkedDeckSlug);

  return (
    <div className="space-y-4 text-sm leading-7 text-[#4f493e]">
      <p>{copy.intro}</p>
      <p>
        <span className="font-medium text-[#18140f]">Built for:</span> {copy.audience}
      </p>
      <p>
        <span className="font-medium text-[#18140f]">Topics:</span> {copy.topicSummary}.
      </p>
      <ul className="grid gap-2 sm:grid-cols-2">
        <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">
          {config.questionCount} timed multiple-choice questions
        </li>
        <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">
          {config.durationMinutes}-minute pacing target
        </li>
        <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">
          {config.passRule.passPercent}% pass threshold with topic breakdown
        </li>
        <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">
          Full answer review linked to the Anki deck
        </li>
      </ul>
      <p className="text-[#5f5749]">{mockFreeAccessNotice}</p>
      <Link
        className="inline-flex font-semibold text-[#1f3a5f] underline-offset-4 hover:underline"
        href={`/decks/${config.linkedDeckSlug}`}
      >
        Drill weak topics with {linkedDeck?.shortName ?? "the linked"} flashcards
      </Link>
    </div>
  );
}

export function MockExamFaqSection({
  config,
  skip = 0,
}: {
  config: MockExamConfig;
  skip?: number;
}) {
  const faqs = buildMockExamFaqs(config).slice(skip);

  return (
    <dl className="space-y-5">
      {faqs.map((faq) => (
        <div key={faq.question}>
          <dt className="font-semibold text-[#18140f]">{faq.question}</dt>
          <dd className="mt-2 text-sm leading-7 text-[#4f493e]">{faq.answer}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Top FAQs as visible headings for AEO snippet readiness — remainder stay in collapsible FAQ. */
export function MockExamFeaturedFaqSection({
  config,
  limit = 4,
}: {
  config: MockExamConfig;
  limit?: number;
}) {
  const copy = buildMockSeoPageCopy(config);
  const faqs = buildMockExamFaqs(config).slice(0, limit);

  return (
    <section className="mt-10" id="mock-faq-featured">
      <h2 className="text-2xl font-semibold tracking-tight">{copy.practiceTestLabel} — quick answers</h2>
      <div className="mt-6 space-y-6">
        {faqs.map((faq) => (
          <article key={faq.question}>
            <h3 className="text-lg font-semibold text-[#18140f]">{faq.question}</h3>
            <p className="mt-2 text-sm leading-7 text-[#4f493e]">{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/** @deprecated Prefer MockExamAboutSection + MockExamFaqSection in collapsible blocks. */
export function MockSeoSections({ config }: MockSeoSectionsProps) {
  const copy = buildMockSeoPageCopy(config);

  return (
    <>
      <section className="mt-8 rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight">{copy.headline}</h2>
        <MockExamAboutSection config={config} />
      </section>
      <section id="mock-faq" className="mt-10 rounded-3xl border border-[#18140f]/10 bg-[#fffaf0]/70 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight">{copy.practiceTestLabel} FAQ</h2>
        <div className="mt-6">
          <MockExamFaqSection config={config} />
        </div>
      </section>
    </>
  );
}
