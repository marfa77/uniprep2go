import type { ReactNode } from "react";
import type { DeckExamVersionModel } from "@/lib/deck-exam-version";

type DeckExamVersionBlockProps = {
  model: DeckExamVersionModel;
};

export function DeckExamVersionBlock({ model }: DeckExamVersionBlockProps) {
  const rows: { term: string; detail: ReactNode }[] = [
    { term: "Exam version", detail: model.version },
    {
      term: "Official source",
      detail: (
        <a
          className="font-medium text-[#1f3a5f] underline decoration-[#1f3a5f]/30 underline-offset-2 hover:decoration-[#1f3a5f]"
          href={model.sourceUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          {model.sourceLabel}
        </a>
      ),
    },
    { term: "Last reviewed", detail: model.lastReviewed },
    { term: "What this covers", detail: model.covers },
    ...(model.passRule ? [{ term: "Pass rule", detail: model.passRule }] : []),
    { term: "Does not replace", detail: model.doesNotReplace },
  ];

  return (
    <section
      aria-labelledby="deck-exam-version-heading"
      className="mt-8 rounded-3xl border border-[#1f3a5f]/15 bg-[#fffaf0] p-5 sm:p-6"
    >
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#1f3a5f]">
        Exam version &amp; sources
      </p>
      <h2
        className="mt-2 text-lg font-semibold tracking-tight text-[#18140f] sm:text-xl"
        id="deck-exam-version-heading"
      >
        {model.examName} — what this product is (and isn&apos;t)
      </h2>
      <dl className="mt-4 space-y-3 text-sm leading-6">
        {rows.map(({ term, detail }) => (
          <div
            key={term}
            className="grid gap-1 border-t border-[#1f3a5f]/10 pt-3 first:border-t-0 first:pt-0 sm:grid-cols-[minmax(9rem,11rem)_1fr] sm:gap-4"
          >
            <dt className="font-medium text-[#1f3a5f]">{term}</dt>
            <dd className="text-[#4f493e]">{detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
