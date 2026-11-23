import type { MockExamConfig } from "@/lib/mock-exams/types";
import type { MockEditorialBundle } from "@/lib/mock-exams/editorial/types";
import { resolveWeightTableQuestions } from "@/lib/mock-exams/editorial/resolve-weight-table";
import { SimpleMarkdownBlock } from "@/lib/simple-markdown";

function MarkdownParagraph({ text }: { text: string }) {
  return <SimpleMarkdownBlock className="text-base leading-8 text-[#4f493e]" text={text} />;
}

export function MockExamEditorialSection({
  bundle,
  config,
}: {
  bundle: MockEditorialBundle;
  config: MockExamConfig;
}) {
  const weightRows = bundle.weightTable
    ? resolveWeightTableQuestions(bundle.weightTable.rows, config)
    : null;

  return (
    <div className="mt-10 space-y-10" id="exam-editorial-enrichment">
      {bundle.howToPrepare ? (
        <section id="how-to-prepare-editorial">
          <h2 className="text-2xl font-semibold tracking-tight">How to prepare</h2>
          <p className="mt-4 text-base leading-8 text-[#4f493e]">{bundle.howToPrepare}</p>
        </section>
      ) : null}

      {bundle.weightTable && weightRows ? (
        <section id="official-topic-weights">
          <h2 className="text-2xl font-semibold tracking-tight">{bundle.weightTable.heading}</h2>
          <div className="mt-4 space-y-4">
            {bundle.weightTable.introParagraphs.map((paragraph) => (
              <MarkdownParagraph key={paragraph.slice(0, 40)} text={paragraph} />
            ))}
          </div>
          <div className="mt-6 overflow-x-auto rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#18140f]/15 font-mono text-xs uppercase tracking-[0.18em] text-[#7a6e5a]">
                  <th className="px-5 py-4 font-medium">Session</th>
                  <th className="px-5 py-4 font-medium">Topic</th>
                  <th className="px-5 py-4 font-medium">Official weight (2027)</th>
                  <th className="px-5 py-4 font-medium">Questions on this check</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#18140f]/10">
                {weightRows.map((row) => (
                  <tr key={`${row.session}-${row.displayLabel}`}>
                    <td className="px-5 py-4 text-sm text-[#4f493e]">{row.session}</td>
                    <td className="px-5 py-4 text-sm font-medium text-[#18140f]">{row.displayLabel}</td>
                    <td className="px-5 py-4 text-sm text-[#4f493e]">
                      {row.officialWeight}
                      {row.priorOfficialWeight ? (
                        <span className="mt-1 block text-xs text-[#7a6e5a]">
                          was {row.priorOfficialWeight}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-5 py-4 text-sm text-[#4f493e]">
                      {row.questionsOnCheck ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {bundle.weightTable.footnoteParagraphs?.map((paragraph) => (
            <p className="mt-4 text-sm leading-7 text-[#5f5749]" key={paragraph.slice(0, 40)}>
              {paragraph}
            </p>
          ))}
          {bundle.ctaAfterWeights ? (
            <div className="mt-4">
              <MarkdownParagraph text={bundle.ctaAfterWeights} />
            </div>
          ) : null}
        </section>
      ) : null}

      {bundle.sections.map((section) => (
        <section key={section.heading}>
          <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
          <div className="mt-4 space-y-4">
            {section.paragraphs.map((paragraph) => (
              <MarkdownParagraph key={paragraph.slice(0, 48)} text={paragraph} />
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

      <section id="editorial-sources" className="border-t border-[#18140f]/10 pt-8">
        <h2 className="text-lg font-semibold tracking-tight text-[#18140f]">Sources</h2>
        <ul className="mt-4 space-y-2 text-sm leading-7 text-[#4f493e]">
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