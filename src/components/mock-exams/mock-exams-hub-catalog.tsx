"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  filterMockSearchIndex,
  type MockSearchIndexItem,
} from "@/lib/mock-exams/search-index";

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
  const initialQ = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQ);
  const deferredQuery = useDeferredValue(query);
  const hasQuery = deferredQuery.trim().length > 0;

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
          <h2 className="text-2xl font-semibold tracking-tight">Featured free mocks</h2>
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
                  className="mt-4 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1f3a5f] px-4 py-2.5 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#152238] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3a5f] focus-visible:ring-offset-2"
                  href={`/mock-exams/${mock.slug}`}
                >
                  {mock.ctaLabel}
                </Link>
              </article>
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
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {filteredVerticals.map((vertical) => (
              <Link
                className="group overflow-hidden rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] transition hover:border-[#1f3a5f]/40"
                href={
                  hasQuery
                    ? `${vertical.href}?q=${encodeURIComponent(deferredQuery.trim())}`
                    : vertical.href
                }
                key={vertical.id}
              >
                <div className="relative h-28 w-full">
                  <Image
                    alt=""
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                    fill
                    sizes="(max-width: 640px) 100vw, 448px"
                    src={vertical.imageSrc}
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18140f]/80 via-[#18140f]/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                    <h3 className="text-lg font-semibold tracking-tight text-[#fffaf0]">
                      {vertical.label}
                    </h3>
                    <span className="rounded-full bg-[#fffaf0]/15 px-2.5 py-1 text-xs font-semibold text-[#fffaf0]">
                      {vertical.count}
                    </span>
                  </div>
                </div>
                <p className="px-4 py-3 text-sm leading-6 text-[#5f5749]">{vertical.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
