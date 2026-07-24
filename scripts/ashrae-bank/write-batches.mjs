#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { toBatch } from "./makeQ.mjs";
import { bemp } from "./bemp.mjs";
import { beap } from "./beap.mjs";
import { bcxp } from "./bcxp.mjs";
import { chdHbdp } from "./chd-hbdp.mjs";
import { opmp } from "./opmp.mjs";

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "../local-banks");

const TOPICS = {
  "bemp-modeling": bemp,
  "beap-assessment": beap,
  "bcxp-commissioning": bcxp,
  "chd-hbdp-design": chdHbdp,
  "opmp-operations": opmp,
};

for (const [topicId, questions] of Object.entries(TOPICS)) {
  if (questions.length !== 50) {
    throw new Error(`${topicId}: expected 50 questions, got ${questions.length}`);
  }
  const batch1 = toBatch(topicId, questions.slice(0, 25));
  const batch2 = toBatch(topicId, questions.slice(25, 50));
  const file1 = join(OUT_DIR, `ashrae-${topicId}-001-025.json`);
  const file2 = join(OUT_DIR, `ashrae-${topicId}-026-050.json`);
  writeFileSync(file1, `${JSON.stringify(batch1, null, 2)}\n`);
  writeFileSync(file2, `${JSON.stringify(batch2, null, 2)}\n`);
  console.log(`wrote ${file1} (${batch1.length})`);
  console.log(`wrote ${file2} (${batch2.length})`);
}
