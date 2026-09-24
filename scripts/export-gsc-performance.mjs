#!/usr/bin/env node
/**
 * Export GSC Search Analytics CSVs for UniPrep2Go.
 * Reads GOOGLE_SERVICE_ACCOUNT_JSON + GSC_SITE_PROPERTY from .env.local (or env).
 *
 * Usage:
 *   node scripts/export-gsc-performance.mjs
 *   node scripts/export-gsc-performance.mjs --out=tmp/gsc-export-YYYY-MM-DD
 */
import { createSign } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

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
    if (!(key in process.env) || !process.env[key]) {
      process.env[key] = val;
    }
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
  const assertion = `${unsigned}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!res.ok) {
    throw new Error(`token exchange failed: ${res.status} ${await res.text()}`);
  }
  const json = await res.json();
  return json.access_token;
}

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

function daysAgo(n) {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - n);
  return d;
}

async function queryGsc(token, siteUrl, body) {
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`GSC query failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

function escapeCsv(value) {
  return String(value ?? "").replaceAll('"', '""');
}

function rowsToCsv(dimensionLabels, rows) {
  const header = `${dimensionLabels.join(",")},clicks,impressions,ctr,position`;
  const lines = (rows ?? []).map((row) => {
    const keys = dimensionLabels.map((_, i) => `"${escapeCsv(row.keys?.[i] ?? "")}"`);
    const clicks = row.clicks ?? 0;
    const impressions = row.impressions ?? 0;
    const ctr = row.ctr ?? 0;
    const position = row.position ?? 0;
    return `${keys.join(",")},${clicks},${impressions},${(ctr * 100).toFixed(2)}%,${position.toFixed(1)}`;
  });
  return [header, ...lines].join("\n") + "\n";
}

async function exportDimensions(token, siteUrl, dimensions, startDate, endDate, outPath) {
  const allRows = [];
  let startRow = 0;
  const rowLimit = 25000;
  while (true) {
    const data = await queryGsc(token, siteUrl, {
      startDate,
      endDate,
      dimensions,
      rowLimit,
      startRow,
      dataState: "final",
    });
    const batch = data.rows ?? [];
    allRows.push(...batch);
    if (batch.length < rowLimit) break;
    startRow += rowLimit;
  }
  writeFileSync(outPath, rowsToCsv(dimensions, allRows));
  return allRows.length;
}

async function main() {
  loadEnvLocal();
  const siteUrl = process.env.GSC_SITE_PROPERTY;
  const saRaw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!siteUrl || !saRaw) {
    throw new Error("Need GSC_SITE_PROPERTY and GOOGLE_SERVICE_ACCOUNT_JSON");
  }
  const sa = JSON.parse(saRaw);

  const outArg = process.argv.find((a) => a.startsWith("--out="));
  const stamp = isoDate(new Date());
  const outDir = resolve(ROOT, outArg ? outArg.slice(6) : `tmp/gsc-export-${stamp}`);
  mkdirSync(outDir, { recursive: true });

  // GSC data typically lags ~2–3 days; end at yesterday.
  const endDate = isoDate(daysAgo(1));
  const start28 = isoDate(daysAgo(28));
  const start90 = isoDate(daysAgo(90));

  console.log(`Site: ${siteUrl}`);
  console.log(`SA: ${sa.client_email}`);
  console.log(`Out: ${outDir}`);
  console.log(`Windows: 28d ${start28}→${endDate}; 90d ${start90}→${endDate}`);

  const token = await getAccessToken(sa);

  const jobs = [
    { dimensions: ["query"], start: start90, end: endDate, file: "queries-90d.csv" },
    { dimensions: ["page"], start: start90, end: endDate, file: "pages-90d.csv" },
    { dimensions: ["query"], start: start28, end: endDate, file: "queries-28d.csv" },
    { dimensions: ["page"], start: start28, end: endDate, file: "pages-28d.csv" },
    { dimensions: ["country"], start: start90, end: endDate, file: "countries-90d.csv" },
    // Query × page — needed to map position-4 pages to exact queries
    { dimensions: ["query", "page"], start: start90, end: endDate, file: "query-page-90d.csv" },
    { dimensions: ["query", "page"], start: start28, end: endDate, file: "query-page-28d.csv" },
  ];

  const summary = [];
  for (const job of jobs) {
    const path = join(outDir, job.file);
    const n = await exportDimensions(token, siteUrl, job.dimensions, job.start, job.end, path);
    summary.push({
      file: job.file,
      rows: n,
      start: job.start,
      end: job.end,
      dimensions: job.dimensions,
    });
    console.log(`Wrote ${job.file} (${n} rows)`);
  }

  writeFileSync(
    join(outDir, "MANIFEST.json"),
    JSON.stringify(
      {
        siteUrl,
        exportedAt: new Date().toISOString(),
        endDate,
        windows: { d28: { start: start28, end: endDate }, d90: { start: start90, end: endDate } },
        files: summary,
        note: "CTR column is percent (e.g. 2.50%). dataState=final. query-page CSVs have columns query,page,...",
      },
      null,
      2,
    ),
  );
  console.log("Done.");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
