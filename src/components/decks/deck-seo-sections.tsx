import Link from "next/link";
import type { CatalogAvailableDeck } from "@/lib/decks";
import { getDeckLongDescription, formatExamFocusedContent } from "@/lib/deck-page-copy";
import { getDeckLinkedMock } from "@/lib/deck-seo";
import { getDeckSeoProfile } from "@/lib/deck-seo";

type DeckSeoSectionsProps = {
  deck: CatalogAvailableDeck;
};

export function DeckSeoSections({ deck }: DeckSeoSectionsProps) {
  const profile = getDeckSeoProfile(deck);
  const longDescription = getDeckLongDescription(deck);
  const linkedMock = getDeckLinkedMock(deck.slug);
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
          Topic coverage table and samples on this page
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
      ) : deck.slug === "ptcb-pharmacy-technician-anki-deck" ? (
        <p className="mt-5 text-sm leading-7 text-[#4f493e]">
          No free PTCB mock yet — start with 10–15 flashcards per day for brand/generic pairs
          and sig codes. Browse free timed mocks for{" "}
          <Link className="font-semibold text-[#1f3a5f] underline-offset-4 hover:underline" href="/mock-exams/sie-full-mock">
            SIE
          </Link>
          ,{" "}
          <Link className="font-semibold text-[#1f3a5f] underline-offset-4 hover:underline" href="/mock-exams/servsafe-manager-mock">
            ServSafe
          </Link>
          , and{" "}
          <Link className="font-semibold text-[#1f3a5f] underline-offset-4 hover:underline" href="/mock-exams">
            insurance licensing
          </Link>
          .
        </p>
      ) : null}
    </section>
  );
}
