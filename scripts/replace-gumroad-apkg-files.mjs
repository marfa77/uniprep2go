#!/usr/bin/env node
/**
 * Replace only the .apkg file on live wave/building/finance Gumroad products after a rebuild.
 * Does not touch description, covers, previews, or landings.
 *
 *   node scripts/replace-gumroad-apkg-files.mjs --slugs-file /tmp/anki-rebuild.json [--dry-run]
 *   node scripts/replace-gumroad-apkg-files.mjs --slug cfps-anki-deck
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureGumroadAccessToken, loadLocalEnvFiles } from "./lib/gumroad-auth.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ANKI = join(root, "..", "Anki Generator");
const KINDS = {
  wave: {
    catalog: join(root, "src/data/gumroad/wave-anki-decks.json"),
    specs: join(ANKI, "internal_deck_generator/wave_deck_specs.json"),
    outDirs: ["out/wave", "out/building"],
  },
  building: {
    catalog: join(root, "src/data/gumroad/building-anki-decks.json"),
    specs: join(ANKI, "internal_deck_generator/building_deck_specs.json"),
    outDirs: ["out/building"],
  },
};

/** FINRA decks built from authored CSVs by finra_deck_pipeline (no wave/building spec). */
const FINANCE_APKG = {
  "sie-exam-anki-deck": "out/finra/SIE_Exam_FULL_300.apkg",
  "series-7-anki-deck": "out/finra/Series_7_FULL_300.apkg",
  "series-63-anki-deck": "out/finra/Series_63_FULL_250.apkg",
};

/** Authored-CSV decks sold from decks.ts checkout links (product resolved from the /l/ permalink). */
const AUTHORED_APKG = {
  "cfa-level-1-anki-deck": "out/cfa/CFA_Level_1_FULL_348.apkg",
  "cfa-level-2-anki-deck": "out/cfa_level2/CFA_Level_2_FULL_495.apkg",
  "life-and-health-insurance-exam-anki-deck": "out/insurance/Life_Health_Insurance_FULL_400.apkg",
  "property-casualty-insurance-exam-anki-deck": "out/insurance/Property_Casualty_Insurance_FULL_400.apkg",
  "california-real-estate-exam-anki-deck": "out/real_estate/California_Real_Estate_Salesperson_FULL_400.apkg",
  "servsafe-manager-anki-deck": "out/servsafe/ServSafe_Manager_FULL_300.apkg",
  "ptcb-pharmacy-technician-anki-deck": "out/ptcb/PTCB_Pharmacy_Tech_FULL_300.apkg",
  "frm-part-1-anki-deck": "out/frm/FRM_Part_1_FULL_444.apkg",
};

function checkoutPermalink(slug) {
  const src = readFileSync(join(root, "src/lib/decks.ts"), "utf8");
  const at = src.indexOf(`slug: "${slug}"`);
  if (at < 0) return null;
  const next = src.indexOf("\n    slug: ", at + 10);
  const chunk = src.slice(at, next > 0 ? next : at + 12000);
  return chunk.match(/checkoutUrl:\s*"[^"]*gumroad\.com\/l\/([^/?"]+)/)?.[1] ?? null;
}

function parseArgs(argv) {
  const args = { dryRun: false, slug: null, slugsFile: null };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--dry-run") args.dryRun = true;
    else if (argv[i] === "--slug") args.slug = argv[++i];
    else if (argv[i] === "--slugs-file") args.slugsFile = argv[++i];
  }
  return args;
}

function displayName(title, slug) {
  const base = (title ?? slug).replace(/\s*—\s*\d+\+?\s*Flashcards/i, "");
  return `${base.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "_")}_Anki_Deck.apkg`;
}

function main() {
  const args = parseArgs(process.argv);
  loadLocalEnvFiles();
  ensureGumroadAccessToken({ persist: true });
  const wanted = args.slugsFile ? JSON.parse(readFileSync(args.slugsFile, "utf8")) : null;
  const results = [];
  for (const [kind, cfg] of Object.entries(KINDS)) {
    const catalog = JSON.parse(readFileSync(cfg.catalog, "utf8"));
    const specs = JSON.parse(readFileSync(cfg.specs, "utf8"));
    const slugs = args.slug ? [args.slug] : (wanted?.[kind] ?? []);
    let touched = false;
    for (const slug of slugs) {
      const record = catalog.products?.[slug];
      const spec = specs[slug];
      if (!record?.gumroadProductId || !record.apkgUploadedAt || !spec) continue;
      const apkg = cfg.outDirs
        .map((dir) => join(ANKI, dir, `${spec.filePrefix}_FULL_${spec.cardCount}.apkg`))
        .find((path) => existsSync(path));
      if (!apkg) {
        results.push({ slug, status: "no-apkg" });
        continue;
      }
      const cmd =
        `gumroad products update ${record.gumroadProductId} --replace-files --file "${apkg}" ` +
        `--file-name "${displayName(spec.gumroadName, slug)}" ` +
        `--file-description "Anki deck — import into Anki desktop, then sync to mobile via AnkiWeb."` +
        `${args.dryRun ? " --dry-run" : ""} --non-interactive --yes`;
      try {
        execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
        results.push({ slug, status: args.dryRun ? "dry-run" : "replaced" });
        if (!args.dryRun) {
          record.apkgUploadedAt = new Date().toISOString();
          touched = true;
        }
      } catch (error) {
        const message = (error.stderr || error.message || String(error)).toString().slice(0, 200);
        results.push({ slug, status: "failed", message });
      }
    }
    if (touched) writeFileSync(cfg.catalog, `${JSON.stringify(catalog, null, 2)}\n`);
  }

  const financeCatalogPath = join(root, "src/data/gumroad/finance-anki-decks.json");
  const financeCatalog = JSON.parse(readFileSync(financeCatalogPath, "utf8"));
  const financeSlugs = args.slug ? [args.slug] : (wanted?.finance ?? []);
  let financeTouched = false;
  for (const slug of financeSlugs) {
    const record = financeCatalog.products?.[slug];
    const rel = FINANCE_APKG[slug];
    if (!record?.gumroadProductId || !rel) continue;
    const apkg = join(ANKI, rel);
    if (!existsSync(apkg)) {
      results.push({ slug, status: "no-apkg" });
      continue;
    }
    const fileName = rel.split("/").pop();
    const cmd =
      `gumroad products update --replace-files --file "${apkg}" ` +
      `--file-name "${fileName}" ` +
      `--file-description "Anki deck — import into Anki desktop, then sync to mobile via AnkiWeb."` +
      `${args.dryRun ? " --dry-run" : ""} --non-interactive --yes -- "${record.gumroadProductId}"`;
    try {
      execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
      results.push({ slug, status: args.dryRun ? "dry-run" : "replaced" });
      if (!args.dryRun) {
        record.apkgUploadedAt = new Date().toISOString();
        financeTouched = true;
      }
    } catch (error) {
      const message = (error.stderr || error.message || String(error)).toString().slice(0, 200);
      results.push({ slug, status: "failed", message });
    }
  }
  if (financeTouched) writeFileSync(financeCatalogPath, `${JSON.stringify(financeCatalog, null, 2)}\n`);

  const authoredSlugs = args.slug ? [args.slug] : (wanted?.authored ?? []);
  for (const slug of authoredSlugs) {
    const rel = AUTHORED_APKG[slug];
    if (!rel) continue;
    const apkg = join(ANKI, rel);
    const permalink = checkoutPermalink(slug);
    if (!existsSync(apkg) || !permalink) {
      results.push({ slug, status: "no-apkg", message: permalink ? rel : "no Gumroad checkoutUrl in decks.ts" });
      continue;
    }
    try {
      const view = JSON.parse(
        execSync(`gumroad products view "${permalink}" --json --non-interactive`, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }),
      );
      const productId = view.product?.id;
      if (!productId) throw new Error(`product ${permalink} not found`);
      const cmd =
        `gumroad products update --replace-files --file "${apkg}" ` +
        `--file-name "${rel.split("/").pop()}" ` +
        `--file-description "Anki deck — import into Anki desktop, then sync to mobile via AnkiWeb."` +
        `${args.dryRun ? " --dry-run" : ""} --non-interactive --yes -- "${productId}"`;
      execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
      results.push({ slug, status: args.dryRun ? "dry-run" : "replaced" });
    } catch (error) {
      const message = (error.stderr || error.message || String(error)).toString().slice(0, 200);
      results.push({ slug, status: "failed", message });
    }
  }

  for (const row of results) console.log(`${row.status}\t${row.slug}${row.message ? `\t${row.message}` : ""}`);
  const count = (s) => results.filter((r) => r.status === s).length;
  console.log(`# replaced=${count("replaced")} dry-run=${count("dry-run")} failed=${count("failed")} no-apkg=${count("no-apkg")}`);
}

main();
