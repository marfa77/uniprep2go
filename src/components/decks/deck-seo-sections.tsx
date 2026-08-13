import Link from "next/link";
import type { Deck } from "@/lib/decks";
import { getDeckLongDescription, formatExamFocusedContent } from "@/lib/deck-page-copy";
import { getDeckLinkedMock, getDeckLinkedMocks } from "@/lib/deck-seo";
import { getDeckSeoProfile } from "@/lib/deck-seo";

type DeckSeoSectionsProps = {
  deck: Deck;
};

export function DeckSeoSections({ deck }: DeckSeoSectionsProps) {
  const profile = getDeckSeoProfile(deck);
  const longDescription = getDeckLongDescription(deck);
  const linkedMocks = getDeckLinkedMocks(deck.slug);
  const linkedMock = linkedMocks[0] ?? getDeckLinkedMock(deck.slug);
  const contentLabel = formatExamFocusedContent(deck);

  return (
    <section className="mt-10 rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight">{profile.studyLabel}</h2>
      <p className="mt-4 text-sm leading-7 text-[#4f493e]">{longDescription}</p>
      <p className="mt-4 text-sm leading-7 text-[#4f493e]">
        <span className="font-medium text-[#18140f]">Built for:</span> {deck.audience}
      </p>
      <p className="mt-4 text-sm leading-7 text-[#4f493e]">
        <span className="font-medium text-[#18140f]">Covers:</span> {deck.facts.topics}.
      </p>
      <ul className="mt-6 grid gap-3 text-sm leading-6 text-[#4f493e] sm:grid-cols-2">
        <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">
          {deck.format === "PDF" ? "Printable PDF study material" : "Spaced-repetition flashcards"}
        </li>
        <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">{contentLabel}</li>
        <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">
          {deck.status === "planned" || deck.sampleCards.length === 0
            ? "Topic coverage table on this page"
            : "Topic coverage table and samples on this page"}
        </li>
        <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">
          {linkedMocks.length > 1
            ? `${linkedMocks.length} linked free country readiness checks`
            : linkedMock
              ? `Linked free ${linkedMock.questionCount}-question practice test`
              : "Independent supplement to courses and question banks"}
        </li>
      </ul>
      {linkedMocks.length > 1 ? (
        <ul className="mt-5 flex flex-col gap-2 text-sm font-semibold text-[#1f3a5f]">
          {linkedMocks.map((mock) => (
            <li key={mock.slug}>
              <Link
                className="underline-offset-4 hover:underline"
                href={`/mock-exams/${mock.slug}`}
              >
                Free {mock.shortTitle} practice test ({mock.questionCount} Q)
              </Link>
            </li>
          ))}
        </ul>
      ) : linkedMock ? (
        <Link
          className="mt-5 inline-flex text-sm font-semibold text-[#1f3a5f] underline-offset-4 hover:underline"
          href={`/mock-exams/${linkedMock.slug}`}
        >
          Take the free {deck.shortName} practice test first
        </Link>
      ) : null}
    </section>
  );
}
