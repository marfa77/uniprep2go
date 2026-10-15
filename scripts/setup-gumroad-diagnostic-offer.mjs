#!/usr/bin/env node
/**
 * Per-product Gumroad offer code for the mock result screen (weak-topic deck CTA).
 * Universal codes are rejected while any product would drop under $0.99, so the code
 * is created on each deck linked from a mock.
 *
 *   mkdir -p tmp/diag-offer && npx tsx scripts/dump-linked-deck-checkouts.mts > tmp/diag-offer/linked.json
 *   node scripts/setup-gumroad-diagnostic-offer.mjs                 # dry run
 *   node scripts/setup-gumroad-diagnostic-offer.mjs --write         # create missing + write config
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureGumroadAccessToken, loadLocalEnvFiles } from "./lib/gumroad-auth.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG_PATH = join(ROOT, "src/data/gumroad/diagnostic-offer.json");
const LINKED_PATH = join(ROOT, "tmp/diag-offer/linked.json");
const CODE = "DIAG20";
const PERCENT_OFF = 20;
const write = process.argv.includes("--write");

loadLocalEnvFiles();
const { token } = ensureGumroadAccessToken({ persist: false });
if (!token) throw new Error("Gumroad token not found");

async function api(path, init = {}) {
  const res = await fetch(`https://api.gumroad.com/v2${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...(init.headers ?? {}) },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.success === false) {
    throw new Error(`${init.method ?? "GET"} ${path} → ${res.status} ${body.message ?? ""}`.trim());
  }
  return body;
}

const permalinkOf = (url) => new URL(url).pathname.replace(/^\/l\//, "").split("/")[0];

const products = [];
for (let pageKey = ""; ; ) {
  const page = await api(`/products${pageKey ? `?page_key=${encodeURIComponent(pageKey)}` : ""}`);
  products.push(...page.products);
  if (!page.next_page_key) break;
  pageKey = page.next_page_key;
}
const byPermalink = new Map();
for (const product of products) {
  for (const key of [product.custom_permalink, product.short_url && permalinkOf(product.short_url)]) {
    if (key) byPermalink.set(key, product);
  }
}

const byId = new Map(products.map((product) => [product.id, product]));
for (const file of readdirSync(join(ROOT, "src/data/gumroad")).filter((name) => name.endsWith("-decks.json"))) {
  const data = JSON.parse(readFileSync(join(ROOT, "src/data/gumroad", file), "utf8"));
  for (const entry of Object.values(data.products ?? {})) {
    const product = entry?.permalink && byId.get(entry.gumroadProductId);
    if (product && !byPermalink.has(entry.permalink)) byPermalink.set(entry.permalink, product);
  }
}
const AUTHORED_ALIASES = { yvifxh: "ptcb-pharmacy-technician-anki", ldpevc: "servsafe-manager-anki" };
for (const [permalink, custom] of Object.entries(AUTHORED_ALIASES)) {
  if (!byPermalink.has(permalink) && byPermalink.has(custom)) byPermalink.set(permalink, byPermalink.get(custom));
}

const linked = JSON.parse(readFileSync(LINKED_PATH, "utf8"));
const permalinks = new Set();
const missing = [];
for (const [deckSlug, { checkoutUrl }] of Object.entries(linked)) {
  const permalink = permalinkOf(checkoutUrl);
  const product = byPermalink.get(permalink);
  if (!product) {
    missing.push(`${deckSlug} (${permalink})`);
    continue;
  }
  const path = `/products/${encodeURIComponent(product.id)}/offer_codes`;
  const { offer_codes: codes = [] } = await api(path);
  let offer = codes.find((item) => item.name?.toUpperCase() === CODE);
  if (!offer && write) {
    const form = new URLSearchParams({ name: CODE, amount_off: String(PERCENT_OFF), offer_type: "percent" });
    offer = (await api(path, { method: "POST", body: form })).offer_code;
    console.log(`created ${CODE} on ${deckSlug}`);
  }
  if (offer) permalinks.add(permalink);
  else console.log(`would create ${CODE} on ${deckSlug}`);
}

if (missing.length) console.log(`no Gumroad product for: ${missing.join(", ")}`);
console.log(`${CODE} live on ${permalinks.size}/${Object.keys(linked).length} linked decks`);
if (write) {
  writeFileSync(
    CONFIG_PATH,
    `${JSON.stringify({ code: CODE, percentOff: PERCENT_OFF, permalinks: [...permalinks].sort() }, null, 2)}\n`,
  );
  console.log(`wrote ${CONFIG_PATH.replace(`${ROOT}/`, "")}`);
}
