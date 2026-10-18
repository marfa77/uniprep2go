/**
 * Layout of the topic readiness report. Bars stay empty so the page does not
 * publish a made-up score. The live report fills them after submit.
 */
const SAMPLE_TOPICS = [
  "Ethical and Professional Standards",
  "Financial Statement Analysis",
  "Fixed Income",
  "Equity Investments",
] as const;

export function ReportLayoutPreview() {
  return (
    <section className="mt-10" id="report-layout">
      <h2 className="text-2xl font-semibold tracking-tight">What the report looks like</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4f493e]">
        After you submit the free 25-question start, the report scores each topic against the 70%
        readiness target and lists the weak ones first. The bars below are the layout. They are not
        a candidate&apos;s result.
      </p>
      <figure className="mt-5 overflow-hidden rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]">
        <div className="border-b border-[#1f3a5f]/15 bg-[#1f3a5f]/5 px-5 py-5 sm:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
            Free diagnostic · quick read
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-[#18140f]">Your readiness verdict</p>
          <p className="mt-2 text-sm text-[#5f5749]">Filled in after you submit. Not shown in advance.</p>
        </div>
        <figcaption className="sr-only">
          Example of the CFA Level 1 topic readiness report layout, with empty score bars.
        </figcaption>
        <ul className="divide-y divide-[#18140f]/10 px-5 py-2 sm:px-8">
          {SAMPLE_TOPICS.map((topic) => (
            <li className="py-4" key={topic}>
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-medium text-[#18140f]">{topic}</p>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#7a6e5a]">Your score</p>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#18140f]/10">
                <div className="h-full w-0 bg-[#1f3a5f]" />
              </div>
            </li>
          ))}
        </ul>
        <p className="border-t border-[#18140f]/10 px-5 py-4 text-sm leading-6 text-[#5f5749] sm:px-8">
          The repair list under the bars names the weakest topics and links them to the 348-card
          CFA Level 1 Anki deck.
        </p>
      </figure>
    </section>
  );
}
