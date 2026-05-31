import type { LegalSection } from "@/lib/legal-content";
import { siteConfig } from "@/lib/site";

type LegalDocumentProps = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalDocument({ title, intro, sections }: LegalDocumentProps) {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-10 lg:px-12">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">Legal</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance">{title}</h1>
      <p className="mt-4 text-sm leading-7 text-[#5f5749]">
        Last updated {siteConfig.legalLastUpdated}. {intro}
      </p>

      <div className="mt-10 space-y-10">
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
            <div className="mt-4 space-y-4 text-base leading-7 text-[#4f493e]">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul className="list-disc space-y-2 pl-5">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
