import {
  CFA_LEVEL_2_OFFICIAL_TOPIC_WEIGHTS,
  getCfaLevel2FormulaPreview,
} from "@/lib/cfa-level-2-formula-preview";
import { CfaL2PreviewFormulaRow } from "@/components/decks/cfa-l2-preview-formula-row";

export function CfaLevel2FormulaPreviewSection() {
  const formulas = getCfaLevel2FormulaPreview();
  const byTopic = new Map<string, typeof formulas>();
  for (const row of formulas) {
    const bucket = byTopic.get(row.topicLabel) ?? [];
    bucket.push(row);
    byTopic.set(row.topicLabel, bucket);
  }

  return (
    <section className="mt-10" id="formula-preview">
      <h2 className="text-2xl font-semibold tracking-tight">
        CFA Level 2 formula sheet — free preview (by topic)
      </h2>
      <p className="mt-3 text-sm text-[#5f5749]">
        From our 2026-curriculum sheet — {formulas.length} formulas previewed below.
      </p>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-[#18140f]/10 bg-white">
        <table className="w-full min-w-[28rem] border-collapse text-sm">
          {Array.from(byTopic.entries()).map(([topicLabel, rows]) => (
            <tbody key={topicLabel}>
              <tr>
                <th
                  className="border-b border-[#18140f]/15 bg-[#fffaf0] px-3 py-2 text-left font-semibold text-[#18140f]"
                  colSpan={2}
                  scope="colgroup"
                >
                  {topicLabel}
                </th>
              </tr>
              {rows.map((row) => (
                <CfaL2PreviewFormulaRow key={row.id} row={row} />
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <p className="mt-6 text-base leading-7 text-[#4f493e]">
        The full 281-formula PDF (51 pages) adds when-to-use notes, exam traps, and the 80-question
        recall drill.
      </p>

      <section className="mt-10" id="official-cfa-l2-formula-faq">
        <h2 className="text-2xl font-semibold tracking-tight">
          Is there an official CFA Level 2 formula sheet?
        </h2>
        <p className="mt-4 text-base leading-8 text-[#4f493e]">
          CFA Institute&apos;s Level II exam page lists the format (22 item sets, 88 questions, two 2 h
          12 min sessions) and tells you to know your calculator for curriculum formulas; it does not
          list a formula sheet among exam materials. Memorise the formulas, then drill them. Source:{" "}
          <a
            className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
            href="https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-ii-exam"
            rel="noopener noreferrer"
            target="_blank"
          >
            CFA Institute Level II exam ↗
          </a>{" "}
          (checked 23 Nov 2026).
        </p>
        <h3 className="mt-6 text-lg font-semibold text-[#18140f]">
          CFA Program Level II topic weights
        </h3>
        <table className="mt-3 w-full max-w-xl border-collapse text-sm">
          <thead>
            <tr className="border-b border-[#18140f]/15 text-left">
              <th className="py-2 pr-4 font-semibold text-[#18140f]" scope="col">
                Topic
              </th>
              <th className="py-2 font-semibold text-[#18140f]" scope="col">
                Exam weight
              </th>
            </tr>
          </thead>
          <tbody>
            {CFA_LEVEL_2_OFFICIAL_TOPIC_WEIGHTS.map((row) => (
              <tr key={row.topic} className="border-b border-[#18140f]/10">
                <td className="py-2 pr-4 text-[#4f493e]">{row.topic}</td>
                <td className="py-2 text-[#18140f]">{row.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
}