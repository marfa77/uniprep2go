import { siteConfig } from "@/lib/site";

/** Hex key (8–128 chars) — also served at `/{INDEXNOW_KEY}.txt` in `public/`. */
export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY?.trim() || "5de26981f808467db78e7afe1b1d2b28";

const INDEXNOW_ENDPOINT =
  process.env.INDEXNOW_ENDPOINT?.trim() || "https://api.indexnow.org/indexnow";
const BATCH_SIZE = parseInt(process.env.INDEXNOW_BATCH_SIZE || "10000", 10);

function getSiteOrigin(siteUrl = siteConfig.url): string {
  return siteUrl.replace(/\/$/, "");
}

function getHost(siteUrl = siteConfig.url): string {
  return new URL(getSiteOrigin(siteUrl)).host;
}

export function getIndexNowKeyLocation(siteUrl = siteConfig.url): string {
  return `${getSiteOrigin(siteUrl)}/${INDEXNOW_KEY}.txt`;
}

export async function fetchIndexNowUrlsFromSitemap(
  siteUrl = siteConfig.url,
): Promise<string[]> {
  const sitemapUrl = `${getSiteOrigin(siteUrl)}/sitemap.xml`;
  const res = await fetch(sitemapUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap (${res.status}): ${sitemapUrl}`);
  }
  const xml = await res.text();
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  return matches.map((match) => match[1]!.trim());
}

export type IndexNowSubmitResult = {
  ok: boolean;
  status: number;
  urlCount: number;
  urls?: string[];
  body?: string;
  error?: string;
};

function chunk<T>(array: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    out.push(array.slice(i, i + size));
  }
  return out;
}

async function submitBatch(
  urlList: string[],
  siteUrl = siteConfig.url,
): Promise<{ status: number; body: string }> {
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: getHost(siteUrl),
      key: INDEXNOW_KEY,
      keyLocation: getIndexNowKeyLocation(siteUrl),
      urlList,
    }),
  });
  return { status: res.status, body: await res.text() };
}

/** Submit URL list to IndexNow (Bing, Yandex, Naver, Seznam.cz, Yep). */
export async function submitIndexNowUrls(
  urlList: string[],
  siteUrl = siteConfig.url,
): Promise<IndexNowSubmitResult> {
  if (urlList.length === 0) {
    return { ok: true, status: 200, urlCount: 0, urls: [], body: "skipped: no urls" };
  }

  const urls = [...new Set(urlList)].sort();
  let lastStatus = 200;
  let lastBody = "";

  for (const batch of chunk(urls, BATCH_SIZE)) {
    const result = await submitBatch(batch, siteUrl);
    lastStatus = result.status;
    lastBody = result.body.slice(0, 500);
    if (result.status !== 200 && result.status !== 202) {
      return {
        ok: false,
        status: result.status,
        urlCount: urls.length,
        urls,
        body: lastBody,
        error: `IndexNow HTTP ${result.status}`,
      };
    }
  }

  return {
    ok: true,
    status: lastStatus,
    urlCount: urls.length,
    urls,
    body: lastBody,
  };
}

export async function submitIndexNowSitemap(
  siteUrl = siteConfig.url,
): Promise<IndexNowSubmitResult> {
  const urls = await fetchIndexNowUrlsFromSitemap(siteUrl);
  return submitIndexNowUrls(urls, siteUrl);
}

export function shouldRunIndexNowOnDeploy(): boolean {
  if (process.env.VERCEL_ENV !== "production") return false;
  const ref = process.env.VERCEL_GIT_COMMIT_REF?.trim();
  return ref === "main" || ref === "master";
}
