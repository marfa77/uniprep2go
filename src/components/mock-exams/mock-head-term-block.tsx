import Link from "next/link";
import { getCatalogDeckBySlug, getDeckBySlug } from "@/lib/decks";
import { getMockHeadTermBlock } from "@/lib/mock-exams/head-term-program";
import { getVerticalDefinition } from "@/lib/mock-exams/taxonomy";
import type { MockExamConfig } from "@/lib/mock-exams/types";

export function MockHeadTermBlock({ config }: { config: MockExamConfig }) {
  const block = getMockHeadTermBlock(config.slug);
  if (!block) return null;

  const vertical = getVerticalDefinition(config.verticalId);
  const linkedDeck =
    getCatalogDeckBySlug(config.linkedDeckSlug) ?? getDeckBySlug(config.linkedDeckSlug);

  return (
    <section className="mt-10" id="head-term-answer" aria-labelledby="head-term-heading">
      <h2 id="head-term-heading" className="text-2xl font-semibold tracking-tight">
        {block.h2}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-8 text-[#4f493e]">
        {block.answerParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>

      {block.officialFormatLines.length > 0 ? (
        <aside
          className="mt-6 rounded-2xl border border-[#18140f]/10 bg-[#fffaf0] p-5"
          aria-label="Official exam format"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1f3a5f]">
            Official exam format
          </p>
          <ul className="mt-3 space-y-1.5 text-sm leading-7 text-[#18140f]">
            {block.officialFormatLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-5 text-[#7a6e5a]">
            Verified{" "}
            <time dateTime={block.officialFormatVerifiedOn}>{block.officialFormatVerifiedOn}</time>{" "}
            —{" "}
            <a
              className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
              href={block.officialFormatSourceUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              official source ↗
            </a>
          </p>
        </aside>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium text-[#1f3a5f]">
        {linkedDeck ? (
          <Link className="underline-offset-4 hover:underline" href={`/decks/${linkedDeck.slug}`}>
            {linkedDeck.shortName} Anki deck →
          </Link>
        ) : null}
        {vertical ? (
          <Link
            className="underline-offset-4 hover:underline"
            href={`/mock-exams/v/${config.verticalId}`}
          >
            All {vertical.label} practice tests →
          </Link>
        ) : null}
        <Link className="underline-offset-4 hover:underline" href="/mock-exams">
          Mock exam index →
        </Link>
      </div>
    </section>
  );
}