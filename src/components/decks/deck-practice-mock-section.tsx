import Link from "next/link";
import type { Deck } from "@/lib/decks";
import { buildMockSeoTitle } from "@/lib/mock-exams/seo";
import type { MockExamConfig } from "@/lib/mock-exams/types";
import { btnPrimary, cx } from "@/lib/ui-button-classes";

type DeckPracticeMockSectionProps = {
  deck: Deck;
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
        className={cx("mt-4", btnPrimary)}
        href={`/mock-exams/${mock.slug}`}
      >
        Take free {mock.questionCount}-question {deck.shortName} practice test
      </Link>
    </section>
  );
}
