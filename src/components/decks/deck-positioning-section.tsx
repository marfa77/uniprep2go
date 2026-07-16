import type { Deck } from "@/lib/decks";
import { getDeckPositioning } from "@/lib/deck-positioning";
import { formatExamFocusedContent } from "@/lib/deck-page-copy";

type DeckPositioningSectionProps = {
  deck: Deck;
};

export function DeckPositioningSection({ deck }: DeckPositioningSectionProps) {
  const positioning = getDeckPositioning(deck);
  const [community, mega] = positioning.alternatives;
  const thisDeckLabel = formatExamFocusedContent(deck);

  return (
    <section id="how-this-compares" className="mt-12">
      <h2 className="text-2xl font-semibold tracking-tight">How this deck compares</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4f493e]">{positioning.summaryProse}</p>

      <div className="mt-6 overflow-x-auto rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#18140f]/15 font-mono text-xs uppercase tracking-[0.18em] text-[#7a6e5a]">
              <th className="px-5 py-4 font-medium w-[22%]">Approach</th>
              <th className="px-5 py-4 font-medium w-[18%]">Typical size</th>
              <th className="px-5 py-4 font-medium">Tradeoffs</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#18140f]/10">
            <tr>
              <td className="px-5 py-4 font-semibold text-[#18140f]">{community.type}</td>
              <td className="px-5 py-4 text-[#4f493e]">{community.cards}</td>
              <td className="px-5 py-4 text-[#4f493e]">
                <ul className="list-disc space-y-1 pl-4">
                  {community.tradeoffs.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td className="px-5 py-4 font-semibold text-[#18140f]">{mega.type}</td>
              <td className="px-5 py-4 text-[#4f493e]">{mega.cards}</td>
              <td className="px-5 py-4 text-[#4f493e]">
                <ul className="list-disc space-y-1 pl-4">
                  {mega.tradeoffs.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr className="bg-[#1f3a5f]/5">
              <td className="px-5 py-4 font-semibold text-[#1f3a5f]">This deck</td>
              <td className="px-5 py-4 font-medium text-[#18140f]">{thisDeckLabel}</td>
              <td className="px-5 py-4 text-[#18140f]">
                <ul className="list-disc space-y-1 pl-4">
                  {positioning.ourEdge.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
