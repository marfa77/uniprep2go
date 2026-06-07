import Link from "next/link";
import type { CatalogAvailableDeck } from "@/lib/decks";
import {
  buildDeckSearchFaqs,
  buildDeckSeoPageCopy,
  getDeckLinkedMock,
} from "@/lib/deck-seo";
import { buildMockSeoTitle } from "@/lib/mock-exams/seo";

type DeckSeoSectionsProps = {
  deck: CatalogAvailableDeck;
};

export function DeckSeoSections({ deck }: DeckSeoSectionsProps) {
  const copy = buildDeckSeoPageCopy(deck);
  const faqs = buildDeckSearchFaqs(deck);
  const linkedMock = getDeckLinkedMock(deck.slug);

  return (
    <>
      <section className="mt-10 rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight">{copy.studyLabel}</h2>
        <p className="mt-4 text-sm leading-7 text-[#4f493e]">{copy.intro}</p>
        <p className="mt-4 text-sm leading-7 text-[#4f493e]">
          <span className="font-medium text-[#18140f]">Built for:</span> {copy.audience}
        </p>
        <p className="mt-4 text-sm leading-7 text-[#4f493e]">
          <span className="font-medium text-[#18140f]">Covers:</span> {copy.topicSummary}.
        </p>
        <ul className="mt-6 grid gap-3 text-sm leading-6 text-[#4f493e] sm:grid-cols-2">
          <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">
            {deck.format === "PDF" ? "Printable PDF study material" : "Spaced-repetition flashcards"}
          </li>
          <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">
            {deck.facts.cards} of exam-focused content
          </li>
          <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">
            Sample cards and topic coverage on this page
          </li>
          <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">
            {linkedMock
              ? `Linked free ${linkedMock.questionCount}-question practice test`
              : "Independent supplement to courses and question banks"}
          </li>
        </ul>
        {linkedMock ? (
          <Link
            className="mt-5 inline-flex text-sm font-semibold text-[#1f3a5f] underline-offset-4 hover:underline"
            href={`/mock-exams/${linkedMock.slug}`}
          >
            Take the free {deck.shortName} practice test first
          </Link>
        ) : null}
      </section>

      <section id="deck-seo-faq" className="mt-10 rounded-3xl border border-[#18140f]/10 bg-[#fffaf0]/70 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight">{copy.studyLabel} FAQ</h2>
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
