"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useEffect, useMemo, useState } from "react";

export type MockHubFeaturedCard = {
  slug: string;
  title: string;
  shortTitle: string;
  status: string;
  questionCount: number;
  durationMinutes: number;
  passPercent: number;
  examBody: string;
  deckHref?: string;
  deckLabel?: string;
  ctaLabel: string;
};

export type MockHubClusterCard = {
  id: string;
  label: string;
  imageSrc: string;
  items: Array<{
    slug: string;
    shortTitle: string;
    questionCount: number;
    status: string;
    examBody: string;
    deckNote?: string;
  }>;
};

type MockExamsHubCatalogProps = {
  featured: MockHubFeaturedCard[];
  clusters: MockHubClusterCard[];
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function matchesQuery(
  query: string,
  fields: string[],
) {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;
  const haystack = normalize(fields.join(" "));
  return tokens.every((token) => haystack.includes(token));
}

export function MockExamsHubCatalog({ featured, clusters }: MockExamsHubCatalogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQ);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      const next = query.trim();
      const current = (searchParams.get("q") ?? "").trim();
      if (next === current) return;
      const params = new URLSearchParams(searchParams.toString());
      if (next) params.set("q", next);
      else params.delete("q");
      const qs = params.toString();
      router.replace(qs ? `/mock-exams?${qs}` : "/mock-exams", { scroll: false });
    }, 200);
    return () => window.clearTimeout(handle);
  }, [query, router, searchParams]);

  const filteredFeatured = useMemo(
    () =>
      featured.filter((mock) =>
        matchesQuery(deferredQuery, [mock.title, mock.shortTitle, mock.examBody, mock.slug]),
      ),
    [featured, deferredQuery],
  );

  const filteredClusters = useMemo(
    () =>
      clusters
        .map((cluster) => ({
          ...cluster,
          items: cluster.items.filter((item) =>
            matchesQuery(deferredQuery, [
              item.shortTitle,
              item.examBody,
              item.slug,
              cluster.label,
            ]),
          ),
        }))
        .filter((cluster) => cluster.items.length > 0),
    [clusters, deferredQuery],
  );

  const hasQuery = deferredQuery.trim().length > 0;
  const noMatches = hasQuery && filteredFeatured.length === 0 && filteredClusters.length === 0;

  return (
    <>
      <section className="mt-8" id="search">
        <label className="block" htmlFor="mock-exam-search">
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
            Search exams
          </span>
          <input
            autoComplete="off"
            className="mt-3 w-full rounded-2xl border border-[#18140f]/15 bg-[#fffaf0] px-4 py-3 text-base text-[#18140f] outline-none transition placeholder:text-[#8a7d68] focus:border-[#1f3a5f] focus:ring-2 focus:ring-[#1f3a5f]/25"
            id="mock-exam-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by exam name, board, or topic — e.g. CDL, NHA, real estate"
            type="search"
            value={query}
          />
        </label>
        {hasQuery ? (
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#5f5749]">
            <span>
              Showing matches for “{deferredQuery.trim()}”
            </span>
            <button
              className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
              onClick={() => setQuery("")}
              type="button"
            >
              Clear
            </button>
          </div>
        ) : null}
      </section>

      {noMatches ? (
        <p className="mt-10 rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 text-sm leading-7 text-[#5f5749]">
          No practice tests matched that search. Try a shorter name (CDL, CPT, CNA) or{" "}
          <button
            className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
            onClick={() => setQuery("")}
            type="button"
          >
            clear the filter
          </button>
          .
        </p>
      ) : null}

      {!noMatches && filteredFeatured.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight">
            {hasQuery ? "Matching featured mocks" : "Featured free mocks"}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {filteredFeatured.map((mock) => (
              <article
                className="flex flex-col rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-5"
                key={mock.slug}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold">{mock.title}</h3>
                  <span className="rounded-full bg-[#1f3a5f]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#1f3a5f]">
                    {mock.status === "live" ? "Live" : "Preview"}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-sm text-[#5f5749]">
                  {mock.questionCount} questions · {mock.durationMinutes} min · pass {mock.passPercent}%
                </p>
                {mock.deckHref && mock.deckLabel ? (
                  <Link
                    className="mt-2 text-sm font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
                    href={mock.deckHref}
                  >
                    {mock.deckLabel}
                  </Link>
                ) : null}
                <Link
                  aria-label={`${mock.ctaLabel} for ${mock.shortTitle}`}
                  className="mt-4 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1f3a5f] px-4 py-2.5 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#152238]"
                  href={`/mock-exams/${mock.slug}`}
                >
                  {mock.ctaLabel}
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {filteredClusters.map((cluster) => (
        <section className="mt-12" key={cluster.id}>
          <div className="overflow-hidden rounded-3xl border border-[#18140f]/10">
            <div className="relative h-36 w-full sm:h-44">
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                src={cluster.imageSrc}
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18140f]/75 via-[#18140f]/25 to-transparent" />
              <h2 className="absolute bottom-4 left-4 right-4 text-2xl font-semibold tracking-tight text-[#fffaf0]">
                {cluster.label}
              </h2>
            </div>
            <ul className="space-y-0 divide-y divide-[#18140f]/10 bg-[#fffaf0]">
              {cluster.items.map((item) => (
                <li key={item.slug}>
                  <Link
                    className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 transition hover:bg-[#f7f3ea]"
                    href={`/mock-exams/${item.slug}`}
                  >
                    <span className="font-medium">{item.shortTitle}</span>
                    <span className="text-sm text-[#5f5749]">
                      {item.questionCount} Q · {item.status}
                      {item.deckNote ? ` · ${item.deckNote}` : ""}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </>
  );
}
