#!/usr/bin/env node
/**
 * Submit URLs to IndexNow (Bing, Yandex, and other participating engines).
 *
 * Usage:
 *   node scripts/indexnow.js --sitemap
 *   node scripts/indexnow.js --limit 100 docs/urls.txt
 *
 * Env:
 *   INDEXNOW_KEY — API key (must match public/{key}.txt)
 *   NEXT_PUBLIC_SITE_URL or SITE_URL — site origin (default https://uniprep2go.study)
 */
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env.local") });
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY?.trim() || "b0a3b2c557564641bb339e85be23e893";
const SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  process.env.SITE_URL?.trim() ||
  "https://uniprep2go.study"
).replace(/\/$/, "");
const HOST = new URL(SITE_ORIGIN).host;
const KEY_LOCATION = `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`;
const ENDPOINT =
  process.env.INDEXNOW_ENDPOINT?.trim() || "https://api.indexnow.org/indexnow";
const BATCH_SIZE = parseInt(process.env.INDEXNOW_BATCH_SIZE || "10000", 10);

function parseArgs(argv) {
  let limit = Infinity;
  let useSitemap = false;
  const files = [];
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--limit" && argv[i + 1]) {
      limit = parseInt(argv[i + 1], 10) || Infinity;
      i++;
      continue;
    }
    if (argv[i] === "--sitemap") {
      useSitemap = true;
      continue;
    }
    files.push(argv[i]);
  }
  return { limit, useSitemap, file: files[0] };
}

function readUrls(filePath) {
  const text = fs.readFileSync(path.resolve(filePath), "utf8");
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("http"));
}

async function fetchSitemapUrls() {
  const sitemapUrl = `${SITE_ORIGIN}/sitemap.xml`;
  const res = await fetch(sitemapUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap (${res.status}): ${sitemapUrl}`);
  }
  const xml = await res.text();
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  return matches.map((m) => m[1].trim());
}

function chunk(array, size) {
  const out = [];
  for (let i = 0; i < array.length; i += size) {
    out.push(array.slice(i, i + size));
  }
  return out;
}

async function submitBatch(urlList) {
  const body = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  return { status: res.status, statusText: res.statusText, body: await res.text() };
}

async function main() {
  const { limit, useSitemap, file } = parseArgs(process.argv);
  let urls = useSitemap ? await fetchSitemapUrls() : file ? readUrls(file) : [];

  if (!useSitemap && !file) {
    urls = await fetchSitemapUrls();
  }

  urls = urls.slice(0, limit);

  if (!urls.length) {
    console.error(useSitemap || !file ? "No URLs found in sitemap" : `No URLs found in ${file}`);
    process.exit(1);
  }

  const keyFile = path.join(process.cwd(), "public", `${INDEXNOW_KEY}.txt`);
  if (!fs.existsSync(keyFile)) {
    console.error(`Missing key file: public/${INDEXNOW_KEY}.txt`);
    process.exit(1);
  }

  console.log(`IndexNow key: ${INDEXNOW_KEY}`);
  console.log(`Key location: ${KEY_LOCATION}`);
  console.log(`Submitting ${urls.length} URL(s) via ${ENDPOINT}\n`);

  const batches = chunk(urls, BATCH_SIZE);
  let ok = 0;
  let fail = 0;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    try {
      const result = await submitBatch(batch);
      if (result.status === 200 || result.status === 202) {
        console.log(`  OK  batch ${i + 1}/${batches.length} (${batch.length} URLs) — ${result.status}`);
        ok += batch.length;
      } else {
        console.log(`  FAIL batch ${i + 1}/${batches.length} — ${result.status} ${result.statusText}`);
        if (result.body) console.log(`       ${result.body}`);
        fail += batch.length;
      }
    } catch (e) {
      console.log(`  FAIL batch ${i + 1}/${batches.length} — ${e.message}`);
      fail += batch.length;
    }
  }

  console.log(`\nDone: ${ok} ok, ${fail} failed`);
  if (fail > 0) process.exitCode = 1;
}

main().catch((e) => {
  console.error("Fatal:", e.message);
  process.exit(1);
});
