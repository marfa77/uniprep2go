#!/usr/bin/env node
/**
 * HEAD-check Gumroad public-files sample CDN URLs cached for custom landings.
 * Fails when any URL returns non-200 (usually 403 after cover cleanup).
 *
 *   node scripts/check-gumroad-sample-cdn.mjs
 *   node scripts/check-gumroad-sample-cdn.mjs --json
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const CACHE_FILES = [
  { kind: "building", path: "src/data/gumroad/building-sample-cdn.json" },
  { kind: "wave", path: "src/data/gumroad/wave-sample-cdn.json" },
  { kind: "language", path: "src/data/gumroad/language-sample-cdn.json" },
  { kind: "finance", path: "src/data/gumroad/finance-sample-cdn.json" },
];

const BROKEN = new Set([403, 404, 410]);

async function headStatus(url) {
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (res.ok) return res.status;
    if (res.status === 405) {
      const getRes = await fetch(url, {
        method: "GET",
        redirect: "follow",
        headers: { Range: "bytes=0-0" },
      });
      return getRes.status;
    }
    return res.status;
  } catch {
    return 0;
  }
}

function loadCaches() {
  const rows = [];
  for (const { kind, path } of CACHE_FILES) {
    const full = join(root, path);
    let data;
    try {
      data = JSON.parse(readFileSync(full, "utf8"));
    } catch {
      continue;
    }
    for (const [slug, urls] of Object.entries(data)) {
      if (!Array.isArray(urls)) continue;
      for (let i = 0; i < urls.length; i += 1) {
        rows.push({ kind, slug, index: i + 1, url: urls[i] });
      }
    }
  }
  return rows;
}

async function main() {
  const jsonOut = process.argv.includes("--json");
  const rows = loadCaches();
  const broken = [];
  const ok = [];

  const BATCH = 12;
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const statuses = await Promise.all(batch.map((row) => headStatus(row.url)));
    batch.forEach((row, j) => {
      const status = statuses[j];
      const entry = { ...row, status };
      if (status === 200 || status === 206) ok.push(entry);
      else broken.push(entry);
    });
  }

  if (jsonOut) {
    console.log(JSON.stringify({ checked: rows.length, ok: ok.length, broken }, null, 2));
  } else {
    console.log(`Gumroad sample CDN: ${ok.length}/${rows.length} OK`);
    if (broken.length > 0) {
      console.log("\nBroken URLs (re-run publish-*-gumroad-landings.py --force-cdn):");
      const bySlug = new Map();
      for (const row of broken) {
        const key = `${row.kind}/${row.slug}`;
        if (!bySlug.has(key)) bySlug.set(key, []);
        bySlug.get(key).push(row);
      }
      for (const [key, items] of [...bySlug.entries()].sort()) {
        const codes = [...new Set(items.map((i) => i.status))].join(",");
        console.log(`  ${key}: ${items.length} URL(s) HTTP ${codes}`);
      }
    }
  }

  if (broken.length > 0) process.exit(1);
}

main();
