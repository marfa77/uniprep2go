import { execSync } from "node:child_process";
import { availableDecks } from "@/lib/decks";
import { intentPages } from "@/lib/intent-pages";
import { getAllMockExams } from "@/lib/mock-exams/configs";
import { siteConfig } from "@/lib/site";

/** Hex key (8–128 chars) — also served at `/{INDEXNOW_KEY}.txt` in `public/`. */
export const INDEXNOW_KEY = "5de26981f808467db78e7afe1b1d2b28";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

const STATIC_INDEXNOW_PATHS = [
  "/",
  "/how-to-import-cfa-anki-deck",
  "/anki-starter-kit",
  "/cfa-level-1-anki-deck-vs-curriculum",
  "/mock-exams",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
] as const;

function absoluteUrl(path: string, siteUrl = siteConfig.url): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl.replace(/\/$/, "")}${normalized}`;
}

export function getIndexNowKeyLocation(siteUrl = siteConfig.url): string {
  return absoluteUrl(`/${INDEXNOW_KEY}.txt`, siteUrl);
}

/** Canonical catalog URLs for Bing/IndexNow (matches `app/sitemap.ts`). */
export function getIndexNowUrls(siteUrl = siteConfig.url): string[] {
  const urls = new Set<string>();

  for (const path of STATIC_INDEXNOW_PATHS) {
    urls.add(absoluteUrl(path, siteUrl));
  }

  for (const deck of availableDecks) {
    urls.add(absoluteUrl(`/decks/${deck.slug}`, siteUrl));
  }

  for (const page of intentPages) {
    urls.add(absoluteUrl(`/${page.slug}`, siteUrl));
  }

  for (const mock of getAllMockExams()) {
    urls.add(absoluteUrl(`/mock-exams/${mock.slug}`, siteUrl));
  }

  return [...urls].sort();
}

type IndexScope = "none" | "decks" | "mocks" | "intent" | "all";

function widenScope(current: IndexScope, area: Exclude<IndexScope, "none" | "all">): IndexScope {
  if (current === "none") return area;
  if (current === area || current === "all") return current === "all" ? "all" : area;
  return "all";
}

function normalizeDeployPath(file: string): string {
  return file.replace(/\\/g, "/").trim();
}

function isDeckCatalogFile(file: string): boolean {
  return (
    file === "src/lib/decks.ts" ||
    file.startsWith("src/app/decks/") ||
    file.startsWith("src/components/deck")
  );
}

function isMockCatalogFile(file: string): boolean {
  return (
    file.startsWith("src/lib/mock-exams/") ||
    file.startsWith("src/app/mock-exams/") ||
    file.startsWith("src/components/mock-exams/")
  );
}

function isIntentCatalogFile(file: string): boolean {
  return file === "src/lib/intent-pages.ts" || file.startsWith("src/components/intent-page");
}

function isGlobalIndexFile(file: string): boolean {
  return (
    file === "src/app/sitemap.ts" ||
    file === "src/lib/indexnow.ts" ||
    file === "src/app/page.tsx" ||
    file.startsWith("public/llms")
  );
}

/** Map a production deploy diff to catalog URLs; empty when nothing indexable changed. */
export function resolveIndexNowUrlsFromChangedFiles(
  files: string[],
  siteUrl = siteConfig.url,
): { scope: IndexScope; urls: string[] } {
  const normalized = files.map(normalizeDeployPath).filter(Boolean);
  if (normalized.length === 0) {
    return { scope: "none", urls: [] };
  }

  let scope: IndexScope = "none";
  const urls = new Set<string>();
  const allUrls = getIndexNowUrls(siteUrl);

  for (const file of normalized) {
    if (isGlobalIndexFile(file)) {
      return { scope: "all", urls: allUrls };
    }

    const deckPageMatch = file.match(/src\/app\/decks\/\[slug\]\//);
    if (deckPageMatch) {
      scope = widenScope(scope, "decks");
      continue;
    }

    const mockPageMatch = file.match(/src\/app\/mock-exams\/\[slug\]\//);
    if (mockPageMatch) {
      scope = widenScope(scope, "mocks");
      continue;
    }

    const intentPageMatch = file.match(/src\/app\/([a-z0-9-]+)\/page\.tsx$/);
    if (intentPageMatch) {
      const slug = intentPageMatch[1]!;
      if (intentPages.some((page) => page.slug === slug)) {
        scope = widenScope(scope, "intent");
        urls.add(absoluteUrl(`/${slug}`, siteUrl));
      }
      continue;
    }

    if (isDeckCatalogFile(file)) {
      scope = widenScope(scope, "decks");
      continue;
    }

    if (isMockCatalogFile(file)) {
      scope = widenScope(scope, "mocks");
      continue;
    }

    if (isIntentCatalogFile(file)) {
      scope = widenScope(scope, "intent");
    }
  }

  if (scope === "none") {
    return { scope: "none", urls: [] };
  }

  if (scope === "all") {
    return { scope: "all", urls: allUrls };
  }

  if (scope === "decks") {
    urls.add(absoluteUrl("/", siteUrl));
    for (const deck of availableDecks) {
      urls.add(absoluteUrl(`/decks/${deck.slug}`, siteUrl));
    }
    return { scope: "decks", urls: [...urls].sort() };
  }

  if (scope === "mocks") {
    urls.add(absoluteUrl("/mock-exams", siteUrl));
    for (const mock of getAllMockExams()) {
      urls.add(absoluteUrl(`/mock-exams/${mock.slug}`, siteUrl));
    }
    return { scope: "mocks", urls: [...urls].sort() };
  }

  for (const page of intentPages) {
    urls.add(absoluteUrl(`/${page.slug}`, siteUrl));
  }
  return { scope: "intent", urls: [...urls].sort() };
}

export type IndexNowSubmitResult = {
  ok: boolean;
  status: number;
  urlCount: number;
  scope?: IndexScope;
  urls?: string[];
  body?: string;
  error?: string;
};

function getHostFromSiteUrl(siteUrl: string): string {
  return new URL(siteUrl).host;
}

/** Submit URL list to IndexNow (Bing, Yandex, Naver, Seznam.cz, Yep). */
export async function submitIndexNowUrls(
  urlList: string[],
  siteUrl = siteConfig.url,
): Promise<IndexNowSubmitResult> {
  if (urlList.length === 0) {
    return { ok: true, status: 200, urlCount: 0, urls: [], body: "skipped: no urls" };
  }

  const host = getHostFromSiteUrl(siteUrl);
  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: getIndexNowKeyLocation(siteUrl),
    urlList: [...new Set(urlList)].sort(),
  };

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    const body = await res.text();
    const ok = res.status === 200 || res.status === 202;
    return {
      ok,
      status: res.status,
      urlCount: payload.urlList.length,
      urls: payload.urlList,
      body: body.slice(0, 500),
      error: ok ? undefined : `IndexNow HTTP ${res.status}`,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      urlCount: urlList.length,
      urls: urlList,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export function getDeployChangedFiles(): string[] | null {
  const prev = process.env.VERCEL_GIT_PREVIOUS_SHA?.trim();
  const curr = process.env.VERCEL_GIT_COMMIT_SHA?.trim();
  if (!prev || !curr || prev === curr) return null;
  try {
    const out = execSync(`git diff --name-only ${prev} ${curr}`, { encoding: "utf8" });
    return out
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  } catch {
    return null;
  }
}

export function shouldRunIndexNowOnDeploy(): boolean {
  if (process.env.VERCEL_ENV !== "production") return false;
  const ref = process.env.VERCEL_GIT_COMMIT_REF?.trim();
  return ref === "main" || ref === "master";
}

/** Production deploy hook: ping only changed catalog URLs (or all when diff unavailable). */
export async function submitIndexNowForDeploy(
  siteUrl = siteConfig.url,
): Promise<IndexNowSubmitResult> {
  const changed = getDeployChangedFiles();
  if (!changed) {
    const urls = getIndexNowUrls(siteUrl);
    const result = await submitIndexNowUrls(urls, siteUrl);
    return { ...result, scope: "all" };
  }

  const { scope, urls } = resolveIndexNowUrlsFromChangedFiles(changed, siteUrl);
  if (scope === "none" || urls.length === 0) {
    return {
      ok: true,
      status: 200,
      urlCount: 0,
      scope: "none",
      urls: [],
      body: `skipped: no catalog changes in ${changed.length} files`,
    };
  }

  const result = await submitIndexNowUrls(urls, siteUrl);
  return { ...result, scope };
}
