import Link from "next/link";
import type { MockExamConfig } from "@/lib/mock-exams/types";
import { TrackedCheckoutLink } from "@/components/funnel-tracker";
import { trackMockEvent } from "./mock-analytics";

export type MockCompanionCheckout = {
  deckSlug: string;
  role: "language" | "civics" | "companion";
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  ctaLabel: string;
  external: boolean;
};

type MockCompanionDecksPanelProps = {
  config: MockExamConfig;
  companions: MockCompanionCheckout[];
};

export function MockCompanionDecksPanel({ config, companions }: MockCompanionDecksPanelProps) {
  if (companions.length === 0) return null;

  return (
    <section className="rounded-3xl border border-[#18140f]/10 bg-[#f7f3ea] p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">Two-pillar prep</p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight">MO civics + Dutch language</h3>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4f493e]">
        AgII inburgering splits social orientation (MO) and Dutch NT2. Use both tracks after this report — civics
        cards for MO themes, the Dutch deck for vocabulary.
      </p>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {companions.map((link) => (
          <li
            key={link.deckSlug}
            className="flex h-full flex-col rounded-2xl border border-[#18140f]/10 bg-[#fffaf0] p-5"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#1f3a5f]">{link.eyebrow}</p>
            <p className="mt-2 font-semibold text-[#18140f]">{link.title}</p>
            <p className="mt-2 flex-1 text-sm leading-7 text-[#4f493e]">{link.body}</p>
            {link.external ? (
              <TrackedCheckoutLink
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-[#18140f] px-5 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f]"
                deckSlug={link.deckSlug}
                href={link.href}
                source={`mock_report:${config.slug}:companion_${link.role}`}
              >
                {link.ctaLabel}
              </TrackedCheckoutLink>
            ) : (
              <Link
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border border-[#18140f]/20 px-5 text-sm font-semibold text-[#18140f] transition hover:border-[#18140f]"
                href={link.href}
                onClick={() =>
                  trackMockEvent({
                    name: "mock_deck_cta_click",
                    deckSlug: link.deckSlug,
                    mockSlug: config.slug,
                    source: `mock_report:${config.slug}:companion_${link.role}`,
                  })
                }
              >
                {link.ctaLabel}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
