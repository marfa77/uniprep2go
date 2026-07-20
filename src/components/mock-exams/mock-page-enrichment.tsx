import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { getCatalogDeckBySlug } from "@/lib/decks";
import { getMockClusterImage } from "@/lib/mock-exams/cluster-images";
import { getMocksByVertical } from "@/lib/mock-exams/hub-clusters";
import {
  getMockOfficialResources,
  type MockOfficialResources,
} from "@/lib/mock-exams/official-resources";
import { buildMockSeoPageCopy } from "@/lib/mock-exams/seo";
import { getVerticalDefinition } from "@/lib/mock-exams/taxonomy";
import type { MockExamConfig } from "@/lib/mock-exams/types";

function linkedDeckCoverExists(deckSlug: string) {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "covers", `${deckSlug}.webp`));
  } catch {
    return false;
  }
}

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

/** Vertical cluster hero + linked deck cover — breaks text-only template sameness. */
export function MockExamVisualHero({ config }: { config: MockExamConfig }) {
  const vertical = getVerticalDefinition(config.verticalId);
  const clusterSrc = getMockClusterImage(vertical?.imageType ?? config.verticalId);
  const hasCover = linkedDeckCoverExists(config.linkedDeckSlug);
  const coverSrc = `/covers/${config.linkedDeckSlug}.webp`;
  const copy = buildMockSeoPageCopy(config);

  return (
    <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-[#18140f]/10 bg-[#18140f]">
      <div className="relative h-44 w-full sm:h-56">
        <Image
          alt=""
          className="object-cover"
          fill
          priority
          sizes="(max-width: 896px) 100vw, 896px"
          src={clusterSrc}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18140f] via-[#18140f]/55 to-[#18140f]/15" />
        <div className="absolute inset-x-0 bottom-0 flex items-end gap-4 p-5 sm:p-6">
          {hasCover ? (
            <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-lg border border-[#fffaf0]/25 shadow-lg sm:h-24 sm:w-[4.25rem]">
              <Image
                alt={`${copy.practiceTestLabel} Anki cover`}
                className="object-cover"
                fill
                sizes="68px"
                src={coverSrc}
                unoptimized
              />
            </div>
          ) : null}
          <div className="min-w-0 flex-1 pb-0.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#fffaf0]/75">
              {vertical?.label ?? config.verticalId}
              {" · "}
              {config.examBody}
            </p>
            <p className="mt-1 text-lg font-semibold leading-snug tracking-tight text-[#fffaf0] sm:text-xl">
              {copy.practiceTestLabel}
            </p>
            <p className="mt-1 text-sm text-[#fffaf0]/75">
              {config.questionCount} Q · {config.durationMinutes} min · {config.passRule.passPercent}%
              target
            </p>
          </div>
        </div>
      </div>
    </div>
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
  const items = [
    {
      label: waitlist ? "Planned questions" : "Questions",
      value: String(config.questionCount),
    },
    { label: "Time", value: `${config.durationMinutes} min` },
    { label: "Pass target", value: `${config.passRule.passPercent}%` },
    { label: "Domains", value: String(config.topics.length) },
    { label: "Exam body", value: config.examBody },
    {
      label: "Status",
      value: waitlist ? "Coming soon" : config.status === "live" ? "Live · free" : "Preview",
    },
  ];

  return (
    <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-[#18140f]/12 bg-[#18140f]/10 sm:grid-cols-3">
      {items.map((item) => (
        <div className="bg-[#fffaf0] px-4 py-3" key={item.label}>
          <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#7a6e5a]">
            {item.label}
          </dt>
          <dd className="mt-1 text-sm font-semibold leading-snug text-[#18140f]">{item.value}</dd>
        </div>
      ))}
    </dl>
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
