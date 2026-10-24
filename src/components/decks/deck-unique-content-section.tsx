import type { Deck } from "@/lib/decks";
import { getDeckUniqueContent } from "@/lib/deck-money-page-content";
import { SimpleMarkdownBlock } from "@/lib/simple-markdown";

type DeckUniqueContentSectionProps = {
  deck: Deck;
};

function parseSections(markdown: string) {
  const blocks = markdown.split(/\n(?=### )/).filter(Boolean);
  return blocks.map((block) => {
    const lines = block.trim().split("\n");
    const heading = lines[0]?.startsWith("### ")
      ? lines[0].replace(/^### /, "")
      : null;
    const body = heading ? lines.slice(1).join("\n").trim() : block.trim();
    return { heading, body };
  });
}

export function DeckUniqueContentSection({ deck }: DeckUniqueContentSectionProps) {
  const content = getDeckUniqueContent(deck);
  if (!content) return null;

  const sections = parseSections(content);

  return (
    <section id="exam-specific-guide" className="mt-12">
      <h2 className="text-2xl font-semibold tracking-tight">{deck.shortName} study guide</h2>
      <div className="mt-6 space-y-8">
        {sections.map((section) => (
          <div key={section.heading ?? "intro"}>
            {section.heading ? (
              <h3 className="text-lg font-semibold tracking-tight text-[#18140f]">{section.heading}</h3>
            ) : null}
            <div className={section.heading ? "mt-3 space-y-3" : "space-y-3"}>
              <SimpleMarkdownBlock text={section.body} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
