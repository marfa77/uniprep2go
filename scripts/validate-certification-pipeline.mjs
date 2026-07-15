#!/usr/bin/env node
/**
 * Validate end-to-end certification pipeline gates.
 *
 * Usage:
 *   node scripts/validate-certification-pipeline.mjs --all
 *   node scripts/validate-certification-pipeline.mjs --mock epa-608-readiness-check
 *   node scripts/validate-certification-pipeline.mjs --deck hvac-epa-608-anki-deck
 *   node scripts/validate-certification-pipeline.mjs --id epa-608
 *
 * Exit 1 if any certification has blocking failures.
 */

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  evaluateCertification,
  findCert,
  formatGateReport,
  loadRegistry,
} from "./lib/certification-pipeline.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  const args = { all: false, id: null, mockSlug: null, deckSlug: null, json: false };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--all") args.all = true;
    else if (arg === "--json") args.json = true;
    else if (arg === "--id") args.id = argv[++i];
    else if (arg === "--mock") args.mockSlug = argv[++i];
    else if (arg === "--deck") args.deckSlug = argv[++i];
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv);
  const registry = loadRegistry(root);

  let certs = registry.certifications;
  if (args.id || args.mockSlug || args.deckSlug) {
    const cert = findCert(registry, {
      id: args.id,
      mockSlug: args.mockSlug,
      deckSlug: args.deckSlug,
    });
    if (!cert) {
      console.error("Certification not found in registry.");
      process.exit(1);
    }
    certs = [cert];
  } else if (!args.all) {
    console.error("Pass --all, --id, --mock, or --deck");
    process.exit(1);
  }

  const results = certs.map((cert) => evaluateCertification(root, cert));
  let exitCode = 0;

  if (args.json) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    for (const result of results) {
      console.log(formatGateReport(result));
      console.log("");
      if (!result.ready) exitCode = 1;
    }

    const readyCount = results.filter((r) => r.ready).length;
    console.log(`Summary: ${readyCount}/${results.length} certifications pass all blocking gates`);
  }

  if (results.some((r) => !r.ready)) {
    exitCode = 1;
  }

  process.exit(exitCode);
}

main();
