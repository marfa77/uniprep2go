import type { CatalogAvailableDeck } from "@/lib/decks";
import { getExamFactsProfileForDeck, type ExamFactsProfile } from "@/lib/exam-facts";

type DeckExamFactsSectionProps = {
  deck?: CatalogAvailableDeck;
  profile?: ExamFactsProfile | null;
  /** Inside a collapsible block — skip outer section chrome. */
  compact?: boolean;
};

export function DeckExamFactsSection({
  deck,
  profile: profileProp,
  compact = false,
}: DeckExamFactsSectionProps) {
  const profile =
    profileProp ?? (deck ? getExamFactsProfileForDeck(deck.slug) : null);
  if (!profile) return null;

  const { exam_facts: facts } = profile;

  const content = (
    <>
      {!compact ? (
        <>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
            Exam facts
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">{facts.exam_name}</h2>
        </>
      ) : null}
      <p className={compact ? "text-sm leading-7 text-[#4f493e]" : "mt-3 text-sm leading-7 text-[#4f493e]"}>
        {profile.intro}
      </p>

      <dl className={`grid gap-px overflow-hidden rounded-3xl border border-[#18140f]/15 bg-[#18140f]/10 sm:grid-cols-2 ${compact ? "mt-4" : "mt-6"}`}>
        {[
          ["Questions", facts.question_count],
          ["Time", facts.time_limit],
          ["Passing score", facts.passing_score],
          ["Scoring", facts.scoring_scale],
          ["Delivery", facts.delivery],
          ["Administered by", facts.administered_by],
        ]
          .filter(([, value]) => Boolean(value))
          .map(([label, value]) => (
            <div className="bg-[#fffaf0] px-5 py-4" key={label}>
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-[#7a6e5a]">
                {label}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-[#18140f]">{value}</dd>
            </div>
          ))}
      </dl>

      {profile.domain_weights.length > 0 ? (
        <div className="mt-8">
          <h3 className="text-lg font-semibold tracking-tight">Knowledge domains and weights</h3>
          <div className="mt-4 overflow-x-auto rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70">
            <table className="w-full min-w-[480px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#18140f]/15 font-mono text-xs uppercase tracking-[0.18em] text-[#7a6e5a]">
                  <th className="px-5 py-4 font-medium">Domain</th>
                  <th className="px-5 py-4 font-medium">Weight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#18140f]/10">
                {profile.domain_weights.map((row) => (
                  <tr key={row.domain}>
                    <td className="px-5 py-4 text-sm font-medium">{row.domain}</td>
                    <td className="px-5 py-4 text-sm text-[#4f493e]">{row.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {profile.whats_changed && profile.whats_changed.length > 0 ? (
        <div className="mt-8">
          <h3 className="text-lg font-semibold tracking-tight">What changed in the current exam cycle</h3>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-[#4f493e]">
            {profile.whats_changed.map((line) => (
              <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3" key={line}>
                {line}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {profile.high_yield_facts.length > 0 ? (
        <div className="mt-8">
          <h3 className="text-lg font-semibold tracking-tight">High-yield facts (commonly tested)</h3>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-[#4f493e]">
            {profile.high_yield_facts.map((line) => (
              <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3" key={line}>
                {line}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="mt-6 text-xs leading-6 text-[#7a6e5a]">
        Verify current exam fees, scheduling, and administrative details at{" "}
        <a
          className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
          href={facts.verify_at_url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {facts.verify_at_url.replace(/^https?:\/\//, "")}
        </a>
        . Independent study aid — not official exam material.
      </p>
    </>
  );

  if (compact) {
    return content;
  }

  return (
    <section id="exam-facts" className="mt-12">
      {content}
    </section>
  );
}
