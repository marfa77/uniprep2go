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

/** Always-visible exam context for SEO / AEO — not buried in a collapsible. */
export function MockExamWhatIsSection({ config }: { config: MockExamConfig }) {
  const copy = buildMockSeoPageCopy(config);

  return (
    <section className="mt-10" id="what-is-exam">
      <h2 className="text-2xl font-semibold tracking-tight">{copy.whatIsHeading}</h2>
      <div className="mt-4 space-y-4 text-base leading-8 text-[#4f493e]">
        <p>{copy.whatIsExam}</p>
        {copy.administeredBy ? (
          <p>
            <span className="font-medium text-[#18140f]">Administered by:</span> {copy.administeredBy}
          </p>
        ) : null}
        {copy.officialFormat ? (
          <p>
            <span className="font-medium text-[#18140f]">Official format:</span> {copy.officialFormat}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function MockExamWhoForSection({ config }: { config: MockExamConfig }) {
  const copy = buildMockSeoPageCopy(config);
  return (
    <section className="mt-10" id="who-for">
      <h2 className="text-2xl font-semibold tracking-tight">Who this exam is for</h2>
      <p className="mt-4 text-base leading-8 text-[#4f493e]">{copy.whoFor}</p>
    </section>
  );
}

export function MockExamHowToPrepareSection({ config }: { config: MockExamConfig }) {
  const copy = buildMockSeoPageCopy(config);
  return (
    <section className="mt-10" id="how-to-prepare">
      <h2 className="text-2xl font-semibold tracking-tight">How to prepare</h2>
      <p className="mt-4 text-base leading-8 text-[#4f493e]">{copy.howToPrepare}</p>
    </section>
  );
}

export function MockExamTopicOutlineSection({ config }: { config: MockExamConfig }) {
  const copy = buildMockSeoPageCopy(config);
  const blurbs = copy.topicBlurbs ?? [];

  return (
    <section className="mt-10" id="topic-outline">
      <h2 className="text-2xl font-semibold tracking-tight">Topic outline</h2>
      <p className="mt-4 text-base leading-8 text-[#4f493e]">
        Core domains candidates usually study for {config.shortTitle}: {copy.topicSummary}.
      </p>
      <ul className="mt-5 space-y-4">
        {config.topics.map((topic) => {
          const blurb = blurbs.find((b) => b.id === topic.id)?.blurb;
          return (
            <li key={topic.id} className="border-l-2 border-[#1f3a5f]/25 pl-4">
              <p className="font-semibold text-[#18140f]">{topic.label}</p>
              {blurb ? <p className="mt-1 text-sm leading-7 text-[#4f493e]">{blurb}</p> : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function MockExamAboutSection({ config }: { config: MockExamConfig }) {
  const copy = buildMockSeoPageCopy(config);
  const linkedDeck = getCatalogDeckBySlug(config.linkedDeckSlug);
  const waitlist = copy.isWaitlist;

  return (
    <div className="space-y-4 text-sm leading-7 text-[#4f493e]">
      <p>{copy.intro}</p>
      <p>
        <span className="font-medium text-[#18140f]">Built for:</span> {copy.audience}
      </p>
      <p>
        <span className="font-medium text-[#18140f]">
          {waitlist ? "Planned topics on this practice test:" : "Topics on this practice test:"}
        </span>{" "}
        {copy.topicSummary}.
      </p>
      <ul className="grid gap-2 sm:grid-cols-2">
        <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">
          {waitlist ? "Planned: " : ""}
          {config.questionCount} timed multiple-choice questions
        </li>
        <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">
          {config.durationMinutes}-minute pacing target
        </li>
        <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">
          {config.passRule.passPercent}% pass threshold with topic breakdown
        </li>
        <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">
          {waitlist ? "Notify when the bank launches" : "Full answer review after you submit"}
        </li>
      </ul>
      {!waitlist ? <p className="text-[#5f5749]">{mockFreeAccessNotice}</p> : null}
      <Link
        className="inline-flex font-semibold text-[#1f3a5f] underline-offset-4 hover:underline"
        href={`/decks/${config.linkedDeckSlug}`}
      >
        {waitlist
          ? `Join the ${linkedDeck?.shortName ?? "linked"} Anki waitlist`
          : `Drill weak topics with ${linkedDeck?.shortName ?? "the linked"} flashcards`}
      </Link>
    </div>
  );
}

/** Visible about block with H2 (not a details/summary). */
export function MockExamAboutVisibleSection({ config }: { config: MockExamConfig }) {
  const copy = buildMockSeoPageCopy(config);

  return (
    <section className="mt-10" id="mock-about">
      <h2 className="text-2xl font-semibold tracking-tight">
        {copy.isWaitlist
          ? `About the planned free ${copy.practiceTestLabel}`
          : `About this free ${copy.practiceTestLabel}`}
      </h2>
      <div className="mt-4">
        <MockExamAboutSection config={config} />
      </div>
    </section>
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
