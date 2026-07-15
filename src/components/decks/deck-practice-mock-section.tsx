import Link from "next/link";
import type { CatalogAvailableDeck } from "@/lib/decks";
import { buildMockSeoTitle } from "@/lib/mock-exams/seo";
import type { MockExamConfig } from "@/lib/mock-exams/types";

type DeckPracticeMockSectionProps = {
  deck: CatalogAvailableDeck;
  mock: MockExamConfig;
  /** When mock links to a sibling deck (e.g. formula PDF → CFA mock). */
  companionMock?: boolean;
};

export function DeckPracticeMockSection({
  deck,
  mock,
  companionMock = false,
}: DeckPracticeMockSectionProps) {
  return (
    <section className="mt-8 rounded-3xl border border-[#1f3a5f]/15 bg-[#fffaf0] p-5 sm:p-6">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#1f3a5f]">
        {mock.status === "live" ? "Free practice test" : "Free readiness check"}
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight">{buildMockSeoTitle(mock)}</h2>
      <p className="mt-2 text-sm leading-7 text-[#4f493e]">
        {companionMock
          ? `Same ${deck.shortName} exam — run the linked ${mock.questionCount}-question timed check for topic scoring and a pass/no-pass report before you buy the ${deck.format === "PDF" ? "PDF" : "deck"}.`
          : `Run the linked ${mock.questionCount}-question timed practice test for topic scoring, answer review, and a pass/no-pass remediation plan before deciding what to drill next.`}
      </p>
      <Link
        className="mt-4 inline-flex rounded-full bg-[#1f3a5f] px-5 py-2.5 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#152238]"
        href={`/mock-exams/${mock.slug}`}
      >
        Start free {deck.shortName} practice test
      </Link>
    </section>
  );
}
