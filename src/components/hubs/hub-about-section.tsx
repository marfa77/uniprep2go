import { SimpleMarkdownBlock } from "@/lib/simple-markdown";
import type { HubFaq } from "@/lib/hub-intros";
import { renderInlineMarkdown } from "@/lib/simple-markdown";

export function mergeHubFaqs(existing: HubFaq[], extra?: HubFaq[]): HubFaq[] {
  if (!extra?.length) return existing;
  const seen = new Set(existing.map((faq) => faq.question.trim()));
  const merged = [...existing];
  for (const faq of extra) {
    const key = faq.question.trim();
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(faq);
    }
  }
  return merged;
}

function IntroSections({ introMarkdown }: { introMarkdown: string }) {
  const chunks = introMarkdown.trim().split(/\n(?=## )/);

  return (
    <div className="max-w-3xl space-y-2">
      {chunks.map((chunk, index) => {
        const headingMatch = chunk.match(/^## (.+)\n+([\s\S]*)$/);
        if (headingMatch) {
          const [, heading, body] = headingMatch;
          return (
            <div key={`intro-${index}`}>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-[#18140f] first:mt-0">
                {heading}
              </h3>
              <div className="mt-3 space-y-3 text-base leading-8 text-[#4f493e]">
                <SimpleMarkdownBlock
                  className="text-base leading-8 text-[#4f493e]"
                  text={body.trim()}
                />
              </div>
            </div>
          );
        }
        return (
          <SimpleMarkdownBlock
            className="text-base leading-8 text-[#4f493e]"
            key={`intro-${index}`}
            text={chunk.trim()}
          />
        );
      })}
    </div>
  );
}

export type HubAboutSectionProps = {
  introMarkdown: string;
  /** Existing page FAQs (e.g. vertical-seo); merged with hub-specific extras at render time. */
  pageFaqs?: HubFaq[];
  /** Additional FAQs from hub-intros (max a few per spec). */
  additionalFaqs?: HubFaq[];
};

export function HubAboutSection({
  introMarkdown,
  pageFaqs = [],
  additionalFaqs,
}: HubAboutSectionProps) {
  const faqs = mergeHubFaqs(pageFaqs, additionalFaqs);

  return (
    <>
      <section className="mt-10" id="about-these-exams">
        <h2 className="text-2xl font-semibold tracking-tight text-[#18140f]">About these exams</h2>
        <div className="mt-4">
          <IntroSections introMarkdown={introMarkdown} />
        </div>
      </section>

      {faqs.length > 0 ? (
        <section className="mt-12" id="hub-supplemental-faq">
          <h2 className="text-2xl font-semibold tracking-tight text-[#18140f]">FAQ</h2>
          <div className="mt-4 divide-y divide-[#18140f]/10 rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70">
            {faqs.map((faq) => (
              <article className="p-5" key={faq.question}>
                <h3 className="font-semibold text-[#18140f]">{faq.question}</h3>
                <p className="mt-2 text-sm leading-7 text-[#5f5749]">
                  {renderInlineMarkdown(faq.answer)}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}