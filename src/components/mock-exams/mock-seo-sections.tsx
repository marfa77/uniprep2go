import Link from "next/link";
import type { MockExamConfig } from "@/lib/mock-exams/types";
import { buildMockExamFaqs, buildMockSeoPageCopy } from "@/lib/mock-exams/seo";
import { mockFreeAccessNotice } from "@/lib/mock-exams/pricing";

type MockSeoSectionsProps = {
  config: MockExamConfig;
};

export function MockSeoSections({ config }: MockSeoSectionsProps) {
  const copy = buildMockSeoPageCopy(config);
  const faqs = buildMockExamFaqs(config);

  return (
    <>
      <section className="mt-8 rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight">{copy.headline}</h2>
        <p className="mt-4 text-sm leading-7 text-[#4f493e]">{copy.intro}</p>
        <p className="mt-4 text-sm leading-7 text-[#4f493e]">
          <span className="font-medium text-[#18140f]">Built for:</span> {copy.audience}
        </p>
        <p className="mt-4 text-sm leading-7 text-[#4f493e]">
          <span className="font-medium text-[#18140f]">Topics covered:</span> {copy.topicSummary}.
        </p>
        <ul className="mt-6 grid gap-3 text-sm leading-6 text-[#4f493e] sm:grid-cols-2">
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
        <p className="mt-6 text-sm leading-7 text-[#5f5749]">{mockFreeAccessNotice}</p>
        <Link
          className="mt-5 inline-flex text-sm font-semibold text-[#1f3a5f] underline-offset-4 hover:underline"
          href={`/decks/${config.linkedDeckSlug}`}
        >
          Drill weak topics with the linked {config.linkedDeckSlug.replace(/-/g, " ")}
        </Link>
      </section>

      <section id="mock-faq" className="mt-10 rounded-3xl border border-[#18140f]/10 bg-[#fffaf0]/70 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          {copy.practiceTestLabel} FAQ
        </h2>
        <dl className="mt-6 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="text-base font-semibold text-[#18140f]">{faq.question}</dt>
              <dd className="mt-2 text-sm leading-7 text-[#4f493e]">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
