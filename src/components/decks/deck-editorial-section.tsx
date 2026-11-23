import type { DeckEditorialBundle } from "@/lib/deck-editorial/types";
import { SimpleMarkdownBlock } from "@/lib/simple-markdown";

/** Deck-specific editorial copy (cards vs official outline, spaced-repetition plan). */
export function DeckEditorialSection({ bundle }: { bundle: DeckEditorialBundle }) {
  return (
    <div className="mt-10 space-y-10" id="deck-editorial">
      {bundle.sections.map((section) => (
        <section key={section.heading}>
          <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
          <div className="mt-4 space-y-4">
            {section.paragraphs.map((paragraph) => (
              <SimpleMarkdownBlock
                className="text-base leading-8 text-[#4f493e]"
                key={paragraph.slice(0, 48)}
                text={paragraph}
              />
            ))}
          </div>
          {section.bullets && section.bullets.length > 0 ? (
            <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-[#4f493e]">
              {section.bullets.map((item) => (
                <li key={item.slice(0, 40)}>
                  <SimpleMarkdownBlock className="inline text-base leading-8 text-[#4f493e]" text={item} />
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
      <section className="border-t border-[#18140f]/10 pt-6">
        <h2 className="text-lg font-semibold tracking-tight text-[#18140f]">Sources</h2>
        <ul className="mt-3 space-y-2 text-sm leading-7 text-[#4f493e]">
          {bundle.sources.map((source) => (
            <li key={source.url}>
              <a
                className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
                href={source.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {source.label}
              </a>
              <span className="text-[#7a6e5a]"> — checked {source.checked}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
