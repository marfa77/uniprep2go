#!/usr/bin/env node
/**
 * Four-layer SEO inventory: catalog intent (sitemap) × GSC Performance.
 * Coverage/index verdict is NOT in Search Analytics — use --inspect for a URL sample.
 *
 *   node scripts/gsc-url-layers.mjs
 *   node scripts/gsc-url-layers.mjs --gsc=tmp/gsc-export-2026-10-05
 *   node scripts/gsc-url-layers.mjs --inspect=/ --inspect=/mock-exams/sie-full-mock
 */
import { createSign } from "node:crypto";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvLocal() {
  const path = join(ROOT, ".env.local");
  let raw = "";
  try {
    raw = readFileSync(path, "utf8");
  } catch {
    return;
  }
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith("'") && val.endsWith("'")) ||
      (val.startsWith('"') && val.endsWith('"'))
    ) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env) || !process.env[key]) process.env[key] = val;
  }
}

function b64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: "https://www.googleapis.com/auth/webmasters.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsigned = `${header}.${claim}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const signature = signer
    .sign(sa.private_key)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
  });
  if (!res.ok) throw new Error(`token ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(",").map((h) => h.replaceAll('"', ""));
  return lines.slice(1).map((line) => {
    const cols = [];
    let cur = "";
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQ = !inQ;
        continue;
      }
      if (ch === "," && !inQ) {
        cols.push(cur);
        cur = "";
        continue;
      }
      cur += ch;
    }
    cols.push(cur);
    const row = {};
    headers.forEach((h, i) => {
      row[h] = cols[i] ?? "";
    });
    return row;
  });
}

function urlClass(url) {
  const path = new URL(url).pathname.replace(/\/$/, "") || "/";
  if (path === "/") return "home";
  if (path.startsWith("/mock-exams/v/")) return "mock-vertical";
  if (path.startsWith("/mock-exams/")) return "mock";
  if (path.startsWith("/decks/")) return "deck";
  if (path.startsWith("/blog/")) return "blog";
  if (path.startsWith("/comics/")) return "comic";
  return "hub-other";
}

function perfBucket(clicks, impr, pos) {
  if (clicks > 0) return "clicks";
  if (impr <= 0) return "no_impr";
  if (pos <= 10) return "impr_pos_1_10_0click";
  if (pos <= 25) return "impr_pos_11_25_0click";
  if (pos <= 50) return "impr_pos_26_50_0click";
  return "impr_pos_51plus_0click";
}

function latestGscDir() {
  const arg = process.argv.find((a) => a.startsWith("--gsc="));
  if (arg) return resolve(ROOT, arg.slice(5));
  const tmp = join(ROOT, "tmp");
  const dirs = readdirSync(tmp)
    .filter((name) => name.startsWith("gsc-export-"))
    .sort();
  if (!dirs.length) throw new Error("No tmp/gsc-export-* — run npm run gsc:export");
  return join(tmp, dirs.at(-1));
}

function inspectPathsFromArgv() {
  return process.argv
    .filter((a) => a.startsWith("--inspect="))
    .map((a) => a.slice(10))
    .map((p) => (p.startsWith("http") ? p : `https://uniprep2go.study${p.startsWith("/") ? p : `/${p}`}`));
}

async function main() {
  loadEnvLocal();
  const gscDir = latestGscDir();
  const pagesPath = join(gscDir, "pages-90d.csv");
  if (!existsSync(pagesPath)) throw new Error(`Missing ${pagesPath}`);

  const sitemapRes = await fetch("https://uniprep2go.study/sitemap.xml");
  if (!sitemapRes.ok) throw new Error(`sitemap ${sitemapRes.status}`);
  const sitemapXml = await sitemapRes.text();
  const sitemap = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  const pages = new Map();
  for (const row of parseCsv(readFileSync(pagesPath, "utf8"))) {
    pages.set(row.page, row);
  }

  const classes = [
    "home",
    "hub-other",
    "mock",
    "mock-vertical",
    "deck",
    "blog",
    "comic",
  ];
  const tallies = Object.fromEntries(
    classes.map((c) => [
      c,
      {
        sitemap: 0,
        in_gsc: 0,
        no_perf_row: 0,
        clicks: 0,
        impr_pos_1_10_0click: 0,
        impr_pos_11_25_0click: 0,
        impr_pos_26_50_0click: 0,
        impr_pos_51plus_0click: 0,
      },
    ]),
  );

  for (const url of sitemap) {
    const c = urlClass(url);
    const t = tallies[c] ?? (tallies[c] = {
      sitemap: 0,
      in_gsc: 0,
      no_perf_row: 0,
      clicks: 0,
      impr_pos_1_10_0click: 0,
      impr_pos_11_25_0click: 0,
      impr_pos_26_50_0click: 0,
      impr_pos_51plus_0click: 0,
    });
    t.sitemap += 1;
    const row = pages.get(url);
    if (!row) {
      t.no_perf_row += 1;
      continue;
    }
    t.in_gsc += 1;
    const bucket = perfBucket(
      Number(row.clicks),
      Number(row.impressions),
      Number(row.position),
    );
    t[bucket] = (t[bucket] ?? 0) + 1;
  }

  const gscOnly = [...pages.keys()].filter((url) => !sitemap.includes(url));
  const lines = [
    `# URL layers (sitemap × GSC pages-90d)`,
    ``,
    `GSC dir: ${gscDir}`,
    `Layer 2 sitemap: ${sitemap.length}`,
    `Layer 4 GSC page rows: ${pages.size} (in sitemap ${pages.size - gscOnly.length}; GSC-only ${gscOnly.length})`,
    `NO_PERF_ROW ≠ not indexed. Example: MLT mock had no row and Inspection = Submitted and indexed.`,
    ``,
    `| class | sitemap | in GSC pages | no perf row | clicks | pos 1–10 0c | 11–25 0c | 26–50 0c | 51+ 0c |`,
    `|---|---:|---:|---:|---:|---:|---:|---:|---:|`,
  ];
  for (const c of classes) {
    const t = tallies[c];
    lines.push(
      `| ${c} | ${t.sitemap} | ${t.in_gsc} | ${t.no_perf_row} | ${t.clicks} | ${t.impr_pos_1_10_0click} | ${t.impr_pos_11_25_0click} | ${t.impr_pos_26_50_0click} | ${t.impr_pos_51plus_0click} |`,
    );
  }

  const inspectUrls = inspectPathsFromArgv();
  if (inspectUrls.length) {
    const saRaw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const siteUrl = process.env.GSC_SITE_PROPERTY;
    if (!saRaw || !siteUrl) throw new Error("Need GOOGLE_SERVICE_ACCOUNT_JSON + GSC_SITE_PROPERTY");
    const token = await getAccessToken(JSON.parse(saRaw));
    lines.push(``, `## URL Inspection sample`);
    for (const inspectionUrl of inspectUrls) {
      const res = await fetch(
        "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inspectionUrl,
            siteUrl,
            languageCode: "en-US",
          }),
        },
      );
      const json = await res.json();
      const ir = json.inspectionResult?.indexStatusResult;
      const coverage = ir?.coverageState ?? json.error?.message ?? `HTTP ${res.status}`;
      lines.push(`- ${inspectionUrl} — **${coverage}** (crawl ${ir?.lastCrawlTime ?? "—"})`);
      console.log(inspectionUrl, coverage);
    }
  }

  const out = join(gscDir, "URL_LAYERS.md");
  writeFileSync(out, `${lines.join("\n")}\n`);
  console.log(lines.join("\n"));
  console.log(`Wrote ${out}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
