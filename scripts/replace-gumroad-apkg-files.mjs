#!/usr/bin/env node
/**
 * Replace only the .apkg file on live wave/building Gumroad products after a rebuild.
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
  for (const row of results) console.log(`${row.status}\t${row.slug}${row.message ? `\t${row.message}` : ""}`);
  const count = (s) => results.filter((r) => r.status === s).length;
  console.log(`# replaced=${count("replaced")} dry-run=${count("dry-run")} failed=${count("failed")} no-apkg=${count("no-apkg")}`);
}

main();
