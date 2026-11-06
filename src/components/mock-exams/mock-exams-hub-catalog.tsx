"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  filterMockSearchIndex,
  type MockSearchIndexItem,
} from "@/lib/mock-exams/search-index";
import { formatMockStatLine } from "@/lib/mock-exams/mock-labels";
import { ledgerList } from "@/lib/ui-button-classes";

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

export type MockHubVerticalCard = {
  id: string;
  label: string;
  description: string;
  count: number;
  imageSrc: string;
  href: string;
};

type MockExamsHubCatalogProps = {
  featured: MockHubFeaturedCard[];
  verticals: MockHubVerticalCard[];
  searchIndex: MockSearchIndexItem[];
};

export function MockExamsHubCatalog({
  featured,
  verticals,
  searchIndex,
}: MockExamsHubCatalogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(urlQuery);
  const [seenUrlQuery, setSeenUrlQuery] = useState(urlQuery);
  if (urlQuery !== seenUrlQuery) {
    setSeenUrlQuery(urlQuery);
    setQuery(urlQuery);
  }
  const deferredQuery = useDeferredValue(query);
  const hasQuery = deferredQuery.trim().length > 0;

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

  const searchResults = useMemo(
    () => (hasQuery ? filterMockSearchIndex(searchIndex, deferredQuery) : []),
    [searchIndex, deferredQuery, hasQuery],
  );

  const filteredFeatured = useMemo(() => {
    if (!hasQuery) return featured;
    const matched = new Set(searchResults.map((item) => item.slug));
    return featured.filter((mock) => matched.has(mock.slug));
  }, [featured, hasQuery, searchResults]);

  const filteredVerticals = useMemo(() => {
    if (!hasQuery) return verticals;
    const counts = new Map<string, number>();
    for (const item of searchResults) {
      counts.set(item.verticalId, (counts.get(item.verticalId) ?? 0) + 1);
    }
    return verticals
      .map((vertical) => ({
        ...vertical,
        count: counts.get(vertical.id) ?? 0,
      }))
      .filter((vertical) => vertical.count > 0);
  }, [verticals, hasQuery, searchResults]);

  const noMatches = hasQuery && searchResults.length === 0;

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
              {searchResults.length} match{searchResults.length === 1 ? "" : "es"} for “
              {deferredQuery.trim()}”
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

      {hasQuery && searchResults.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight">Matching practice tests</h2>
          <ul className="mt-5 divide-y divide-[#18140f]/10 overflow-hidden rounded-3xl border border-[#18140f]/10 bg-[#fffaf0]">
            {searchResults.map((item) => (
              <li key={item.slug}>
                <Link
                  className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 transition hover:bg-[#f7f3ea]"
                  href={item.href}
                >
                  <span>
                    <span className="font-medium">{item.shortTitle}</span>
                    <span className="mt-0.5 block text-xs text-[#8a7d68]">
                      {item.verticalLabel} · {item.familyLabel}
                    </span>
                  </span>
                  <span className="text-sm text-[#5f5749]">
                    {item.questionCount} Q · {item.status}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {!hasQuery && filteredFeatured.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-sm uppercase tracking-[0.14em] text-muted">Catalog ledger · {filteredFeatured.length} exams</h2>
          <div className={`mt-4 ${ledgerList}`}>
            {filteredFeatured.map((mock) => (
              <div className="grid gap-3 py-4 sm:grid-cols-[1fr_1.4fr_auto] sm:items-center" key={mock.slug}>
                <h3 className="text-lg text-ink">{mock.shortTitle}</h3>
                <p className="text-sm text-muted">{formatMockStatLine(mock)}</p>
                <Link
                  aria-label={`${mock.ctaLabel} for ${mock.shortTitle}`}
                  className="text-sm font-semibold text-navy underline-offset-4 hover:underline"
                  href={`/mock-exams/${mock.slug}`}
                >
                  Start free mock
                </Link>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {!noMatches ? (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">
            {hasQuery ? "Matching exam paths" : "Browse by exam path"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[#5f5749]">
            {hasQuery
              ? "Open a path to see only the exams that matched your search."
              : "Pick a vertical — lists live on dedicated pages so this hub stays scannable as the catalog grows."}
          </p>
          <div className={`mt-6 ${ledgerList}`}>
            {filteredVerticals.map((vertical) => (
              <Link
                className="flex flex-wrap items-baseline justify-between gap-3 py-4"
                href={
                  hasQuery
                    ? `${vertical.href}?q=${encodeURIComponent(deferredQuery.trim())}`
                    : vertical.href
                }
                key={vertical.id}
              >
                <span>
                  <span className="text-lg text-ink">{vertical.label}</span>
                  <span className="mt-1 block text-sm text-muted">{vertical.description}</span>
                </span>
                <span className="text-sm text-muted">{vertical.count}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
