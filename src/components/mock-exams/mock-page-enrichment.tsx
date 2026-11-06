import {
  FREE_DIAGNOSTIC_QUESTIONS,
  freeAccessClause,
  freeDiagnosticMinutes,
  hasShortFreeDiagnostic,
} from "@/lib/mock-exams/free-diagnostic";
import Link from "next/link";
import type { ReactNode } from "react";
import { getCatalogDeckBySlug } from "@/lib/decks";
import { getMocksByVertical } from "@/lib/mock-exams/hub-clusters";
import { getMockOfficialResources, type MockOfficialResources } from "@/lib/mock-exams/official-resources";
import { getVerticalDefinition } from "@/lib/mock-exams/taxonomy";
import type { MockExamConfig } from "@/lib/mock-exams/types";

function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={`font-medium text-[#1f3a5f] underline-offset-4 hover:underline ${className}`.trim()}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

/** Breadcrumb + path context for internal linking / crawl depth. */
export function MockExamBreadcrumb({ config }: { config: MockExamConfig }) {
  const vertical = getVerticalDefinition(config.verticalId);
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-[#5f5749]">
      <Link className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline" href="/mock-exams">
        Free mocks
      </Link>
      <span aria-hidden className="mx-2">
        /
      </span>
      {vertical ? (
        <>
          <Link
            className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
            href={`/mock-exams/v/${config.verticalId}`}
          >
            {vertical.label}
          </Link>
          <span aria-hidden className="mx-2">
            /
          </span>
        </>
      ) : null}
      <span className="text-[#18140f]">{config.shortTitle}</span>
    </nav>
  );
}

/** Compact fact strip — unique numbers per exam, not a shared marketing blurb. */
export function MockExamSnapshot({ config }: { config: MockExamConfig }) {
  const waitlist = config.status === "coming_soon";
  const shortFree = !waitlist && hasShortFreeDiagnostic(config);
  const items = [
    {
      label: waitlist ? "Planned questions" : "Questions",
      value: shortFree
        ? `${FREE_DIAGNOSTIC_QUESTIONS} free · ${config.questionCount} full`
        : String(config.questionCount),
    },
    {
      label: "Time",
      value: shortFree
        ? `${freeDiagnosticMinutes(config)} min free · ${config.durationMinutes} min full`
        : `${config.durationMinutes} min`,
    },
    { label: "UniPrep2Go readiness target", value: `${config.passRule.passPercent}%` },
    { label: "Domains", value: String(config.topics.length) },
    { label: "Exam body", value: config.examBody },
    {
      label: "Status",
      value: waitlist ? "Coming soon" : config.status === "live" ? `Live · ${freeAccessClause(config)}` : "Preview",
    },
  ];

  return (
    <section className="mt-8" aria-label="What this session is">
      <h2 className="text-xl text-ink">What this session is</h2>
      <dl className="mt-4 grid gap-px border border-line bg-line sm:grid-cols-3">
        {items.map((item) => (
          <div className="bg-white px-4 py-4" key={item.label}>
            <dt className="text-xs uppercase tracking-[0.14em] text-muted">{item.label}</dt>
            <dd className="mt-2 text-base text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Certifier + official outbound links — primary anti-thin-content signal. */
export function MockOfficialResourcesPanel({
  config,
  resources,
}: {
  config: MockExamConfig;
  resources?: MockOfficialResources;
}) {
  const resolved = resources ?? getMockOfficialResources(config);

  return (
    <aside
      aria-label="Official certification resources"
      className="mt-6 border-l-2 border-[#1f3a5f] bg-[#fffaf0]/90 py-4 pl-5 pr-4"
      id="official-resources"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1f3a5f]">
        Who certifies this exam
      </p>
      <p className="mt-2 text-base font-semibold text-[#18140f]">{resolved.certifier}</p>
      <p className="mt-2 text-sm leading-6 text-[#4f493e]">{resolved.trustLine}</p>
      {resolved.sources.length > 0 ? (
        <ul className="mt-3 space-y-1.5 text-sm">
          {resolved.sources.map((source) => (
            <li key={source.url}>
              <ExternalLink href={source.url}>
                {source.label}
                <span className="ml-1 text-[#7a6e5a]" aria-hidden>
                  ↗
                </span>
              </ExternalLink>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-3 text-xs leading-5 text-[#7a6e5a]">
        UniPrep2Go is independent prep — not affiliated with or endorsed by {resolved.certifier}.
      </p>
    </aside>
  );
}

export function MockRelatedExamsSection({ config }: { config: MockExamConfig }) {
  const siblings = getMocksByVertical(config.verticalId)
    .filter((mock) => mock.slug !== config.slug)
    .slice(0, 6);
  if (siblings.length === 0) return null;

  const vertical = getVerticalDefinition(config.verticalId);
  const deck = getCatalogDeckBySlug(config.linkedDeckSlug);

  return (
    <section className="mt-12" id="related-exams">
      <h2 className="text-2xl font-semibold tracking-tight">
        More {vertical?.label ?? "related"} practice tests
      </h2>
      <p className="mt-3 text-sm leading-7 text-[#4f493e]">
        Same exam path on UniPrep2Go — timed diagnostics with topic scoring.
        {deck ? (
          <>
            {" "}
            After you finish, drill gaps with the{" "}
            <Link
              className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
              href={`/decks/${config.linkedDeckSlug}`}
            >
              {deck.shortName} Anki deck
            </Link>
            .
          </>
        ) : null}
      </p>
      <ul className="mt-5 divide-y divide-[#18140f]/10 border-y border-[#18140f]/10">
        {siblings.map((mock) => (
          <li key={mock.slug}>
            <Link
              className="flex flex-wrap items-baseline justify-between gap-2 py-3 transition hover:bg-[#fffaf0]/60"
              href={`/mock-exams/${mock.slug}`}
            >
              <span className="font-medium text-[#18140f]">{mock.shortTitle}</span>
              <span className="text-sm text-[#5f5749]">
                {mock.questionCount} Q · {mock.durationMinutes} min · {mock.examBody}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {vertical ? (
        <p className="mt-4 text-sm">
          <Link
            className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
            href={`/mock-exams/v/${config.verticalId}`}
          >
            Browse all {vertical.label} mocks →
          </Link>
        </p>
      ) : null}
    </section>
  );
}
