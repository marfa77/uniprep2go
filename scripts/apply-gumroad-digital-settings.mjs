/**
 * Apply Product → Settings: e-publication VAT on, sales limit / quantity /
 * sales count / refund policy / shipping off.
 *
 *   node scripts/apply-gumroad-digital-settings.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureGumroadAccessToken, loadLocalEnvFiles } from "./lib/gumroad-auth.mjs";
import { putGumroadDigitalSettings } from "./lib/gumroad-product-settings.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalogs = [
  "src/data/gumroad/wave-anki-decks.json",
  "src/data/gumroad/building-anki-decks.json",
  "src/data/gumroad/language-anki-decks.json",
  "src/data/gumroad/language-printable.json",
  "src/data/gumroad/gaivota-comics.json",
  "src/data/gumroad/citizenship-bundle.json",
  "src/data/gumroad/swiss-citizenship-bundle.json",
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function collectProducts() {
  const seen = new Set();
  const rows = [];
  for (const rel of catalogs) {
    const data = JSON.parse(readFileSync(join(root, rel), "utf8"));
    const products = data.products ?? (data.gumroadProductId ? { [data.permalink ?? rel]: data } : {});
    for (const [slug, record] of Object.entries(products)) {
      const id = record.gumroadProductId;
      if (!id || seen.has(id)) continue;
      seen.add(id);
      rows.push({ slug, id });
    }
  }
  return rows;
}

async function main() {
  loadLocalEnvFiles();
  const { token } = ensureGumroadAccessToken({ persist: true });
  if (!token) {
    throw new Error("Gumroad token missing");
  }

  const rows = collectProducts();
  console.log(`Apply digital settings to ${rows.length} product(s)`);
  let ok = 0;
  let failed = 0;
  for (const row of rows) {
    try {
      await putGumroadDigitalSettings(token, row.id);
      console.log(`  ok  ${row.slug}`);
      ok += 1;
    } catch (error) {
      failed += 1;
      console.warn(`  fail ${row.slug}: ${error instanceof Error ? error.message.slice(0, 180) : error}`);
    }
    await sleep(400);
  }
  console.log(`Done ok=${ok} failed=${failed}`);
  if (failed) process.exitCode = 1;
}

main();
