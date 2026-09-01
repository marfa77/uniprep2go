#!/usr/bin/env node
/**
 * Rewrite PT / LU / Wallonie / Flanders citizenship mock banks to Czech-grade quality.
 * Uses OpenRouter + Prep2Go CSV facts. Writes JSON banks under src/data/mock-exams/.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chatJson, loadCredentials, GENERATOR_MODEL } from "./lib/openrouter.mjs";

/** Minimal CSV parser for Section,Question,Answer,Hint files (handles quoted commas). */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      if (row.some((c) => c.trim())) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }
  if (cell.length || row.length) {
    row.push(cell);
    if (row.some((c) => c.trim())) rows.push(row);
  }
  if (!rows.length) return [];
  const headers = rows[0].map((h) => h.replace(/^\uFEFF/, "").trim());
  return rows.slice(1).map((r) => {
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = (r[idx] ?? "").trim();
    });
    return obj;
  });
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOWNLOADS = "/Users/pavelveselov/Projects/prep2go app/Prep2GoStudy — Etsy Downloads";
const OUT = join(root, "src/data/mock-exams");
const CACHE = join(OUT, ".generation-cache/citizenship-rewrite-2026-08-04");

const BANKS = [
  {
    slug: "portugal-nacionalidade-readiness-check",
    csv: "portugal_nacionalidade_qa.csv",
    language: "Portuguese (European)",
    product: "Portugal Nacionalidade",
    official: "IRN / AIMA / Portuguese government",
    topics: [
      {
        id: "state-rights",
        label: "State, constitution, institutions, justice, local admin",
        sections: ["Constituição", "Instituições", "Justiça", "Administração"],
      },
      {
        id: "nationality-civic",
        label: "Nationality, naturalisation, rights/duties, participation, elections",
        sections: ["nacionalidade", "Naturalização", "Participação", "Eleições", "Direitos"],
      },
      {
        id: "history-geo-eu",
        label: "History, geography, EU & defence",
        sections: ["História", "Geografia", "UE"],
      },
      {
        id: "society-services",
        label: "Work, education, health, culture, society, symbols",
        sections: ["Trabalho", "Educação", "Saúde", "Cultura", "Sociedade", "Complementos", "Símbolos"],
      },
    ],
  },
  {
    slug: "luxembourg-vivre-ensemble-readiness-check",
    csv: "luxembourg_vivre_ensemble_qa.csv",
    language: "French",
    product: "Luxembourg Vivre ensemble",
    official: "Luxembourg Ministry of Justice / guichet.lu",
    topics: [
      {
        id: "institutions-vivre",
        label: "Institutions & vivre ensemble",
        sections: ["Institutions", "Vivre ensemble"],
      },
      {
        id: "history-geo-eu",
        label: "History, geography, EU, Schengen",
        sections: ["Histoire", "Géographie", "UE", "EU", "Schengen"],
      },
      {
        id: "rights-nationality",
        label: "Rights, nationality, citizenship, vote, justice",
        sections: ["Droits", "Nationalité", "Citoyenneté", "Vote", "Justice"],
      },
      {
        id: "society-daily",
        label: "Work, education, culture, daily life, languages, health, emergencies, currency",
        sections: ["Travail", "Éducation", "Culture", "Vie quotidienne", "Compléments", "Langues", "Santé", "Urgences", "Monnaie"],
      },
    ],
  },
  {
    slug: "belgium-wallonie-citoyennete-readiness-check",
    csv: "belgium_wallonie_citoyennete_qa.csv",
    language: "French",
    product: "Belgium Wallonie Citoyenneté",
    official: "Walloon government / parcours d'intégration",
    topics: [
      {
        id: "institutions-integration",
        label: "Belgian/Walloon institutions & integration pathway",
        sections: ["Institutions", "Parcours d'intégration"],
      },
      {
        id: "history-geo-eu",
        label: "History, geography, EU",
        sections: ["Histoire", "Géographie", "UE"],
      },
      {
        id: "rights-nationality",
        label: "Rights, nationality, citizenship, justice",
        sections: ["Droits", "Nationalité", "Citoyenneté", "Justice"],
      },
      {
        id: "society-daily",
        label: "Work, education, health, culture, daily life",
        sections: ["Travail", "Éducation", "Santé", "Culture", "Vie quotidienne", "Compléments"],
      },
    ],
  },
  {
    slug: "belgium-flanders-mo-readiness-check",
    csv: "belgium_flanders_mo_qa.csv",
    language: "Dutch",
    product: "Belgium Flanders MO (maatschappelijke oriëntatie)",
    official: "Flemish government / inburgering",
    topics: [
      {
        id: "institutions-orientation",
        label: "Institutions & maatschappelijke oriëntatie / inburgering",
        sections: ["Instellingen", "Maatschappelijke oriëntatie"],
      },
      {
        id: "history-geo-eu",
        label: "History, geography, EU",
        sections: ["Geschiedenis", "Geografie", "EU"],
      },
      {
        id: "rights-nationality",
        label: "Rights, nationality, participation, safety/law",
        sections: ["Rechten", "Nationaliteit", "Participatie", "Veiligheid"],
      },
      {
        id: "society-daily",
        label: "Work, education, health, culture, daily life",
        sections: ["Werk", "Onderwijs", "Gezondheid", "Cultuur", "Dagelijks", "Aanvullende"],
      },
    ],
  },
];

const CZECH_SAMPLES = [
  {
    prompt: "Jaká je forma státu České republiky?",
    options: [
      { id: "a", text: "Parlamentní republika" },
      { id: "b", text: "Prezidentská republika" },
      { id: "c", text: "Konstituční monarchie" },
      { id: "d", text: "Federativní republika" },
    ],
    correctOptionId: "a",
    explanation:
      "ČR je parlamentní republikou: vláda odpovídá Poslanecké sněmovně, hlavou státu je prezident.",
    distractorExplanations: {
      b: "Prezidentský systém (např. USA) má jiný vztah mezi výkonnou a zákonodárnou mocí.",
      c: "Monarchie má panovníka; ČR je republikou bez krále či císaře.",
      d: "ČR je unitární stát, nikoli federace krajů se samostatnou ústavou.",
    },
  },
  {
    prompt: "Kdo je podle Ústavy hlavou státu České republiky?",
    options: [
      { id: "a", text: "Předseda vlády (premiér)" },
      { id: "b", text: "Prezident republiky" },
      { id: "c", text: "Předseda Poslanecké sněmovny" },
      { id: "d", text: "Předseda Ústavního soudu" },
    ],
    correctOptionId: "b",
    explanation: "Hlavou státu je prezident republiky; vládu vede předseda vlády.",
    distractorExplanations: {
      a: "Premiér vede vládu, ale není hlavou státu.",
      c: "Předseda sněmovny řídí dolní komoru parlamentu, není hlavou státu.",
      d: "Ústavní soudce dohlíží na ústavnost, není hlavou státu.",
    },
  },
];

function loadFacts(csvName, sectionKeys) {
  const raw = readFileSync(join(DOWNLOADS, csvName), "utf8");
  const rows = parseCsv(raw);
  const facts = [];
  for (const r of rows) {
    const q = (r.Question || "").trim();
    const a = (r.Answer || "").trim();
    const s = (r.Section || "").trim();
    if (!q || !a) continue;
    if (/^(Bem-vindo|Bienvenue|Welkom)/i.test(q)) continue;
    if (/^(Este baralho|Ce deck|Dit deck)/i.test(a)) continue;
    const match = sectionKeys.some((k) => s.toLowerCase().includes(k.toLowerCase()));
    if (match) facts.push({ section: s, question: q, answer: a });
  }
  return facts;
}

function cachePath(slug, topicId) {
  return join(CACHE, `${slug}__${topicId}.json`);
}

function normalizeQuestion(raw, examSlug, topicId, seq, sourceNote) {
  const optionIds = ["a", "b", "c", "d"];
  const options = optionIds.map((id) => {
    const match = raw.options?.find((o) => o.id === id);
    return { id, text: String(match?.text ?? "").trim() };
  });
  const texts = options.map((o) => o.text);
  if (texts.some((t) => !t) || new Set(texts).size !== 4) {
    throw new Error(`Q${seq}: need 4 unique options`);
  }
  if (!optionIds.includes(raw.correctOptionId)) {
    throw new Error(`Q${seq}: bad correctOptionId`);
  }
  const distractorExplanations = {};
  for (const o of options) {
    if (o.id === raw.correctOptionId) continue;
    const e = raw.distractorExplanations?.[o.id]?.trim();
    if (!e) throw new Error(`Q${seq}: missing distractor ${o.id}`);
    distractorExplanations[o.id] = e;
  }
  const prompt = String(raw.prompt || "").trim();
  if (!prompt.endsWith("?")) throw new Error(`Q${seq}: prompt must end with ?`);
  const words = prompt.replace(/[?!.…]/g, "").split(/\s+/).filter(Boolean);
  if (words.length < 5) throw new Error(`Q${seq}: telegraphic prompt: ${prompt}`);

  return {
    id: `${examSlug}-${topicId}-${String(seq).padStart(3, "0")}`,
    examSlug,
    topicId,
    prompt,
    options,
    correctOptionId: raw.correctOptionId,
    explanation: String(raw.explanation || "").trim(),
    distractorExplanations,
    difficulty: "medium",
    sourceNote,
  };
}

function auditLocal(questions) {
  const issues = [];
  const yn = /^(oui|non|yes|no|ja|nee|sim|não|nao)\b/i;
  const corr = { a: 0, b: 0, c: 0, d: 0 };
  for (const q of questions) {
    corr[q.correctOptionId] = (corr[q.correctOptionId] || 0) + 1;
    const words = q.prompt.replace(/[?!.…]/g, "").split(/\s+/).filter(Boolean);
    if (words.length <= 3) issues.push(`telegraphic: ${q.id} ${q.prompt}`);
    const texts = q.options.map((o) => o.text);
    const ynCount = texts.filter((t) => yn.test(t.trim())).length;
    const longCount = texts.filter((t) => t.length > 12).length;
    if (ynCount > 0 && ynCount < 4 && longCount > 0) {
      issues.push(`bad yes/no mix: ${q.id}`);
    }
    const lens = texts.map((t) => t.length);
    const corrText = q.options.find((o) => o.id === q.correctOptionId)?.text || "";
    const others = texts.filter((t) => t !== corrText).map((t) => t.length);
    if (others.length && corrText.length >= Math.max(...others) + 28) {
      issues.push(`length leak: ${q.id}`);
    }
    if (lens.some((l) => l < 2)) issues.push(`tiny option: ${q.id}`);
  }
  return { issues, corr };
}

async function repairYesNo(credentials, bank, topic, questions, sourceNote) {
  const yn = /^(oui|non|yes|no|ja|nee|sim|não|nao)\b/i;
  const badIdx = [];
  for (let i = 0; i < questions.length; i++) {
    const texts = questions[i].options.map((o) => o.text);
    const ynCount = texts.filter((t) => yn.test(t.trim())).length;
    const longCount = texts.filter((t) => t.length > 12).length;
    if (ynCount > 0 && ynCount < 4 && longCount > 0) badIdx.push(i);
  }
  if (!badIdx.length) return questions;

  const toFix = badIdx.map((i) => questions[i]);
  const data = await chatJson({
    credentials,
    model: GENERATOR_MODEL,
    system: `Rewrite civics MCQs that mix Oui/Non/Ja/Nee with unrelated short options.
Language: ${bank.language}. Return JSON {"questions":[...]} same length as input.
Each rewritten question must have 4 parallel full substantive options (no lone Oui/Non), full-sentence prompt ≥5 words, specific distractorExplanations, correctOptionId a|b|c|d, explanation.
Keep the same civic fact as the original correct answer.`,
    user: JSON.stringify({ topicId: topic.id, questions: toFix }, null, 2),
    maxTokens: 6144,
    temperature: 0.25,
    role: "repair",
  });
  const fixed = data.questions || [];
  if (fixed.length !== toFix.length) {
    throw new Error(`repair returned ${fixed.length}, expected ${toFix.length}`);
  }
  const out = [...questions];
  badIdx.forEach((qi, fi) => {
    out[qi] = normalizeQuestion(fixed[fi], bank.slug, topic.id, qi + 1, sourceNote);
  });
  return out;
}

async function generateTopic(credentials, bank, topic, facts) {
  const cp = cachePath(bank.slug, topic.id);
  if (existsSync(cp)) {
    console.log(`  cache hit ${bank.slug} / ${topic.id}`);
    return JSON.parse(readFileSync(cp, "utf8"));
  }

  const sourceNote = `Rewritten from Prep2Go ${bank.product} themes as full-stem MCQs with parallel-form near-miss distractors (not official ${bank.official} material).`;

  const system = `You write exam-grade multiple-choice civics questions for citizenship readiness checks.
Language of ALL text (prompts, options, explanations, distractorExplanations): ${bank.language}.
Return ONLY valid JSON: {"questions":[...]} with exactly 15 questions.
Quality rules (STRICT):
1. Full-sentence exam prompts (≥5 words). BAN telegraphic stems like "Municipales?", "Association?", "Parlement?", "112?".
2. Exactly 4 options with ids a,b,c,d; unique texts; parallel grammatical form AND similar character length (±~20%).
3. Near-miss distractors from the SAME civic domain (institutions with institutions, years with years). Never mix Oui/Non/Ja/Nee with unrelated short nouns.
4. Convert yes/no flashcards into substantive MCQs (ask "how/what/who/which" with parallel statement options).
5. Specific distractorExplanations for each wrong option in ${bank.language} — never generic "sounds plausible".
6. correctOptionId must rotate: questions 1-15 should use roughly a,b,c,d,a,b,c,d,... (aim ~4 of each).
7. difficulty always "medium". Factual accuracy from the provided facts.
8. Do NOT invent official pass marks or claim to be official exam material.`;

  const user = `Create 15 medium MCQs for topic "${topic.id}" (${topic.label}) for examSlug "${bank.slug}".

Style examples (Czech — match this quality/structure, but write in ${bank.language}):
${JSON.stringify(CZECH_SAMPLES, null, 2)}

Source facts (use these; expand telegraphic Qs into full exam stems; craft parallel distractors):
${JSON.stringify(facts.slice(0, 40), null, 2)}

Each question object fields: prompt, options[{id,text}], correctOptionId, explanation, distractorExplanations{id:text}.
Cover diverse facts from the list — do not repeat the same fact twice.`;

  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`  generating ${bank.slug} / ${topic.id} (attempt ${attempt})…`);
      const data = await chatJson({
        credentials,
        model: GENERATOR_MODEL,
        system,
        user,
        maxTokens: 8192,
        temperature: 0.35,
        role: "generator",
      });
      const rawQs = data.questions || data;
      if (!Array.isArray(rawQs) || rawQs.length < 15) {
        throw new Error(`expected 15 questions, got ${rawQs?.length}`);
      }
      let questions = rawQs.slice(0, 15).map((q, i) =>
        normalizeQuestion(q, bank.slug, topic.id, i + 1, sourceNote),
      );
      let { issues, corr } = auditLocal(questions);
      const ynIssues = issues.filter((i) => i.startsWith("bad yes/no"));
      if (ynIssues.length) {
        console.warn(`    repairing ${ynIssues.length} yes/no mixes…`);
        questions = await repairYesNo(credentials, bank, topic, questions, sourceNote);
        ({ issues, corr } = auditLocal(questions));
      }
      const hard = issues.filter((i) => i.startsWith("telegraphic") || i.startsWith("bad yes/no"));
      if (hard.length) throw new Error(hard.slice(0, 5).join("; "));
      if (issues.length) console.warn(`    soft issues: ${issues.slice(0, 4).join(" | ")}`);
      console.log(`    correctOptionId dist: ${JSON.stringify(corr)}`);
      mkdirSync(CACHE, { recursive: true });
      writeFileSync(cp, JSON.stringify(questions, null, 2));
      return questions;
    } catch (e) {
      lastErr = e;
      console.warn(`    retry: ${e.message}`);
    }
  }
  throw lastErr;
}

function balanceCorrectIds(questions) {
  // Soft rebalance if severely skewed: swap option labels so distribution is even.
  const target = ["a", "b", "c", "d"];
  const counts = { a: 0, b: 0, c: 0, d: 0 };
  for (const q of questions) counts[q.correctOptionId]++;
  // Only rebalance if max-min > 4
  if (Math.max(...Object.values(counts)) - Math.min(...Object.values(counts)) <= 4) {
    return questions;
  }
  const desired = [];
  for (let i = 0; i < questions.length; i++) desired.push(target[i % 4]);
  return questions.map((q, i) => {
    const want = desired[i];
    if (q.correctOptionId === want) return q;
    const map = { a: "a", b: "b", c: "c", d: "d" };
    // permute: swap correct with want
    const old = q.correctOptionId;
    map[old] = want;
    map[want] = old;
    const newOptions = ["a", "b", "c", "d"].map((id) => {
      const srcId = Object.keys(map).find((k) => map[k] === id);
      return { id, text: q.options.find((o) => o.id === srcId).text };
    });
    // Actually simpler: rebuild by placing texts
    const byOld = Object.fromEntries(q.options.map((o) => [o.id, o.text]));
    const texts = {
      [want]: byOld[old],
      [old]: byOld[want],
      ...Object.fromEntries(
        ["a", "b", "c", "d"].filter((x) => x !== want && x !== old).map((x) => [x, byOld[x]]),
      ),
    };
    const distractorExplanations = {};
    for (const id of ["a", "b", "c", "d"]) {
      if (id === want) continue;
      // map explanations: explanation for option that now has text texts[id]
      const oldIdForText = Object.keys(byOld).find((k) => byOld[k] === texts[id]);
      if (oldIdForText === old) {
        // this was correct, now wrong — need explanation; invent from empty? keep generic swap
        distractorExplanations[id] =
          q.distractorExplanations[want] ||
          q.distractorExplanations[Object.keys(q.distractorExplanations)[0]];
      } else {
        distractorExplanations[id] = q.distractorExplanations[oldIdForText];
      }
    }
    return {
      ...q,
      options: ["a", "b", "c", "d"].map((id) => ({ id, text: texts[id] })),
      correctOptionId: want,
      distractorExplanations,
    };
  });
}

async function main() {
  const args = process.argv.slice(2);
  const only = args.includes("--slug") ? args[args.indexOf("--slug") + 1] : null;
  const force = args.includes("--force");
  if (force) {
    // clear cache for selected
  }

  const credentials = loadCredentials();
  const targets = only ? BANKS.filter((b) => b.slug === only) : BANKS;
  if (!targets.length) throw new Error(`Unknown slug ${only}`);

  for (const bank of targets) {
    console.log(`\n=== ${bank.slug} ===`);
    if (force) {
      for (const t of bank.topics) {
        const cp = cachePath(bank.slug, t.id);
        if (existsSync(cp)) {
          // leave cache unless force per-topic — user can delete CACHE dir
        }
      }
    }
    const all = [];
    for (const topic of bank.topics) {
      if (force) {
        const cp = cachePath(bank.slug, topic.id);
        try {
          if (existsSync(cp)) writeFileSync(cp + ".bak", readFileSync(cp));
          // delete by writing empty skip — actually unlink
          const { unlinkSync } = await import("node:fs");
          if (existsSync(cp)) unlinkSync(cp);
        } catch {
          /* ignore */
        }
      }
      const facts = loadFacts(bank.csv, topic.sections);
      // also add unmatched facts if thin
      if (facts.length < 12) {
        console.warn(`  thin facts for ${topic.id}: ${facts.length}`);
      }
      const qs = await generateTopic(credentials, bank, topic, facts);
      all.push(...qs);
    }
    const balanced = balanceCorrectIds(all);
    const { issues, corr } = auditLocal(balanced);
    console.log(`audit issues=${issues.length} corr=${JSON.stringify(corr)}`);
    if (issues.filter((i) => i.startsWith("telegraphic") || i.startsWith("bad yes/no")).length) {
      console.error(issues);
      throw new Error(`Hard audit failed for ${bank.slug}`);
    }
    const outPath = join(OUT, `${bank.slug}.json`);
    writeFileSync(outPath, JSON.stringify(balanced, null, 2) + "\n");
    console.log(`wrote ${outPath} (${balanced.length} questions)`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
