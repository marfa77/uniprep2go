import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import nhaCpct from "./nha-cpct.mjs";
import nhaExcpt from "./nha-excpt.mjs";
import nremtParamedic from "./nremt-paramedic.mjs";
import danbIce from "./danb-ice.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../src/data/mock-exams");

const banks = [
  ["nha-cpct-readiness-check.json", nhaCpct],
  ["nha-excpt-readiness-check.json", nhaExcpt],
  ["nremt-paramedic-readiness-check.json", nremtParamedic],
  ["danb-ice-readiness-check.json", danbIce],
];

for (const [file, bank] of banks) {
  const byTopic = {};
  for (const q of bank) {
    byTopic[q.topicId] = (byTopic[q.topicId] || 0) + 1;
    if (!q.id.includes(q.topicId)) throw new Error(`Bad id ${q.id}`);
    if (q.sourceNote !== "Original UniPrep2Go local bank (Wave 1).") {
      throw new Error(`Bad sourceNote on ${q.id}`);
    }
    const wrongIds = ["a", "b", "c", "d"].filter((id) => id !== q.correctOptionId);
    for (const id of wrongIds) {
      if (!q.distractorExplanations[id]) throw new Error(`Missing distractor ${id} on ${q.id}`);
    }
    if (q.distractorExplanations[q.correctOptionId]) {
      throw new Error(`Correct id in distractors on ${q.id}`);
    }
  }
  if (bank.length !== 40) throw new Error(`${file}: ${bank.length}`);
  for (const [topic, n] of Object.entries(byTopic)) {
    if (n !== 10) throw new Error(`${file} ${topic}: ${n}`);
  }
  writeFileSync(join(root, file), `${JSON.stringify(bank, null, 2)}\n`);
  console.log(`${file}: ${bank.length} questions`, byTopic);
}
