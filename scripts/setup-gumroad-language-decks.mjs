#!/usr/bin/env node
/**
 * Create Gumroad products for the curated language Anki decks ($26),
 * upload .apkg + cover/thumbnail, publish, and update catalog JSON.
 *
 * Usage:
 *   node scripts/setup-gumroad-language-decks.mjs --dry-run
 *   node scripts/setup-gumroad-language-decks.mjs --slug ciple-a2-european-portuguese-anki-deck
 *   node scripts/setup-gumroad-language-decks.mjs --slug ciple-a2-european-portuguese-anki-deck --assets-only
 */

import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import {
  ensureGumroadAccessToken,
  loadLocalEnvFiles,
} from "./lib/gumroad-auth.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG_PATH = join(root, "src/data/gumroad/language-anki-decks.json");
const PRODUCT_CREATE_DELAY_MS = Number(process.env.GUMROAD_CREATE_DELAY_MS ?? 5000);
const ANKI_GENERATOR_ROOT =
  process.env.ANKI_GENERATOR_ROOT?.trim() ||
  join(dirname(root), "Anki Generator");
const ANKI_DECK_VAULT = join(ANKI_GENERATOR_ROOT, "out", "anki-decks");
const PRICE_USD = 26;

/** @type {Record<string, {
 *   name: string;
 *   summary: string;
 *   descriptionHtml: string;
 *   coverPath: string;
 *   apkgRelPaths: string[];
 *   fileNames: string[];
 * }>} */
const SPECS = {
  "ciple-a2-european-portuguese-anki-deck": {
    name: "CIPLE CAPLE Portuguese Citizenship Anki Deck — 1600+ Flashcards",
    summary:
      "1600+ European Portuguese cards for CIPLE / CAPLE A2, residency, and citizenship (nacionalidade).",
    descriptionHtml: [
      "<p><strong>UniPrep2Go × PixID Studio</strong> — Portuguese Anki deck for <strong>CIPLE / CAPLE A2</strong>, <strong>autorização de residência</strong>, and <strong>nacionalidade portuguesa</strong>.</p>",
      "<p><strong>1600+</strong> PT-PT cards with audio, phrases, and examples — one vocabulary bank for the CAPLE diploma and Portugal immigration pathways.</p>",
      "<p><strong>Delivery:</strong> Import the .apkg into Anki desktop, then sync to mobile via AnkiWeb.</p>",
      "<p><em>Independent study aid — not official CAPLE / University of Lisbon material.</em></p>",
    ].join(""),
    coverPath: "public/covers/ciple-a2-european-portuguese-anki-deck.webp",
    apkgRelPaths: ["prep2go_Portuguese_A2_CIPLE/prep2go_Portuguese_A2_CIPLE_FULL.apkg"],
    fileNames: ["CIPLE_CAPLE_Portuguese_Citizenship_Anki_Deck.apkg"],
  },
  "delf-b2-french-anki-deck": {
    name: "DELF DALF TCF TEF French Anki Deck — 2000+ Flashcards",
    summary:
      "2000+ French vocabulary cards for DELF, DALF, TCF Canada, TEF Canada, TCF ANF, and TCF général.",
    descriptionHtml: [
      "<p><strong>UniPrep2Go × PixID Studio</strong> — French Anki deck for the main certificate and immigration pathways: <strong>DELF / DALF</strong> (lifetime diploma gold standard), <strong>TCF Canada</strong> and <strong>TEF Canada</strong> (Express Entry / Quebec), <strong>TCF ANF</strong> (French naturalization), and <strong>TCF général</strong> (French universities).</p>",
      "<p><strong>2000+</strong> cards pair each headword with a visual cue, native French audio, and a contextual example — one shared high-frequency vocabulary bank across those exams, not A1 survival fluff.</p>",
      "<p><strong>How this Gumroad edition differs:</strong> multi-exam French framing (DELF, DALF, TCF, TEF) at $26 with instant PixID Studio Gumroad delivery (~159 MB with media), not a DELF-only Lemon listing.</p>",
      "<p><strong>Delivery:</strong> Import into Anki desktop, then sync to mobile via AnkiWeb.</p>",
      "<p><em>Independent study aid — not affiliated with France Éducation international, IRCC, or official TCF/TEF bodies.</em></p>",
    ].join(""),
    coverPath: "public/covers/delf-b2-french-anki-deck.webp",
    apkgRelPaths: ["prep2go_French_B2_DELF/prep2go_French_B2_DELF_FULL.apkg"],
    fileNames: ["DELF_DALF_TCF_TEF_French_Anki_Deck.apkg"],
  },
  "dutch-a2-inburgering-anki-deck": {
    name: "Dutch Inburgering NT2 A2 Anki Deck — 1000+ Flashcards",
    summary:
      "1000+ Dutch A2 cards for Inburgering, Staatsexamen NT2 A2, residency, and naturalisatie.",
    descriptionHtml: [
      "<p><strong>UniPrep2Go × PixID Studio</strong> — Dutch Anki deck for <strong>Inburgering</strong>, <strong>Staatsexamen NT2 A2</strong>, and <strong>naturalisatie</strong> vocabulary.</p>",
      "<p><strong>1000+</strong> high-frequency words with bilingual examples, native audio, and illustrations.</p>",
      "<p><strong>Delivery:</strong> Anki .apkg — import on desktop, sync to mobile.</p>",
      "<p><em>Independent study aid — not official Dutch government / DUO material.</em></p>",
    ].join(""),
    coverPath: "public/covers/dutch-a2-inburgering-anki-deck.webp",
    apkgRelPaths: ["prep2go_Dutch_A2_Inburgering/prep2go_Dutch_A2_Inburgering_FULL.apkg"],
    fileNames: ["Dutch_Inburgering_NT2_A2_Anki_Deck.apkg"],
  },
  "german-a2-anki-deck": {
    name: "German Goethe telc ÖSD DTZ Anki Deck — 1000 Flashcards",
    summary:
      "1000 German A2 cards for Goethe-Institut, telc, ÖSD, and DTZ immigrant integration pathways.",
    descriptionHtml: [
      "<p><strong>UniPrep2Go × PixID Studio</strong> — German A2 Anki deck for <strong>Goethe-Institut A2</strong>, <strong>telc Deutsch A2</strong>, <strong>ÖSD A2</strong>, and <strong>DTZ</strong>.</p>",
      "<p><strong>1,000</strong> essential words — one shared A2 vocabulary bank across certificate and immigration pathways.</p>",
      "<p><strong>Delivery:</strong> Import the .apkg into Anki desktop, then sync to mobile.</p>",
      "<p><em>Independent study aid — not official Goethe, telc, ÖSD, or BAMF / DTZ material.</em></p>",
    ].join(""),
    coverPath: "public/covers/german-a2-anki-deck.webp",
    apkgRelPaths: ["prep2go_German_B1_DTZ/prep2go_German_B1_DTZ_FULL.apkg"],
    fileNames: ["German_Goethe_telc_OSD_DTZ_Anki_Deck.apkg"],
  },
  "celi-b1-italian-anki-deck": {
    name: "CELI CILS PLIDA Italian Anki Deck — 1,373 Flashcards",
    summary: "1,373 Italian B1 cards for CELI, CILS, and PLIDA certificate prep.",
    descriptionHtml: [
      "<p><strong>UniPrep2Go × PixID Studio</strong> — Italian B1 Anki deck for <strong>CELI</strong>, <strong>CILS</strong>, and <strong>PLIDA</strong>.</p>",
      "<p><strong>1,373</strong> cards covering the shared intermediate vocabulary across the main Italian certificates.</p>",
      "<p><strong>Delivery:</strong> Anki-compatible .apkg via your Gumroad library after checkout.</p>",
      "<p><em>Independent study aid — not official CELI / CILS / PLIDA material.</em></p>",
    ].join(""),
    coverPath: "public/covers/celi-b1-italian-anki-deck.webp",
    apkgRelPaths: ["prep2go_Italian_B1_CELI/prep2go_Italian_B1_CELI_FULL.apkg"],
    fileNames: ["CELI_CILS_PLIDA_Italian_Anki_Deck.apkg"],
  },
  "danish-a2-prove-i-dansk-anki-deck": {
    name: "Danish Prøve i Dansk PD2 PD3 Anki Deck — 1000 Flashcards",
    summary:
      "1,000 Danish cards for Prøve i Dansk PD2 / PD3 and residence or citizenship language prep.",
    descriptionHtml: [
      "<p><strong>UniPrep2Go × PixID Studio</strong> — Danish Anki deck for <strong>Prøve i Dansk PD2 / PD3</strong> and residence or citizenship language prep.</p>",
      "<p><strong>1,000</strong> cards with audio and practical example sentences for work, housing, services, and daily life in Denmark.</p>",
      "<p><strong>Delivery:</strong> Import the .apkg into Anki, then sync to mobile.</p>",
      "<p><em>Independent study aid — not official Danish language exam material.</em></p>",
    ].join(""),
    coverPath: "public/covers/danish-a2-prove-i-dansk-anki-deck.webp",
    apkgRelPaths: ["prep2go_Danish_A2_PD2_PD3/prep2go_Danish_A2_PD2_PD3_FULL.apkg"],
    fileNames: ["Danish_Prove_i_Dansk_PD2_PD3_Anki_Deck.apkg"],
  },
  "norwegian-a2-norskprove-anki-deck": {
    name: "Norwegian Norskprøve Residence Citizenship Anki Deck — 1000 Flashcards",
    summary:
      "1,000 Bokmål cards for Norskprøve A2 and Norwegian residence or citizenship language prep.",
    descriptionHtml: [
      "<p><strong>UniPrep2Go × PixID Studio</strong> — Norwegian Anki deck for <strong>Norskprøve A2</strong>, <strong>permanent oppholdstillatelse</strong>, and <strong>statsborgerskap</strong> language prep.</p>",
      "<p><strong>1,000</strong> Bokmål cards with audio and everyday example sentences.</p>",
      "<p><strong>Delivery:</strong> Import the .apkg into Anki, then sync to mobile.</p>",
      "<p><em>Independent study aid — not official Norskprøve material.</em></p>",
    ].join(""),
    coverPath: "public/samples/prep2go-norwegian-a2-norskprove-cover.webp",
    apkgRelPaths: ["prep2go_Norwegian_A2_Norskprove/prep2go_Norwegian_A2_Norskprove_FULL.apkg"],
    fileNames: ["Norwegian_Norskprove_Residence_Citizenship_Anki_Deck.apkg"],
  },
  "swedish-a2-sfi-anki-deck": {
    name: "Swedish SFI Residence Citizenship Anki Deck — 1000 Flashcards",
    summary:
      "1,000 Swedish cards for SFI A2 and Swedish residence or citizenship language prep.",
    descriptionHtml: [
      "<p><strong>UniPrep2Go × PixID Studio</strong> — Swedish Anki deck for <strong>SFI</strong> (Swedish for Immigrants) A2 vocabulary and residence or citizenship language prep.</p>",
      "<p><strong>1,000</strong> high-frequency Swedish cards with audio and practical example sentences for work, housing, services, and everyday life in Sweden.</p>",
      "<p><strong>Delivery:</strong> Import the .apkg into Anki, then sync to mobile.</p>",
      "<p><em>Independent study aid — not official SFI / Swedish Migration Agency material.</em></p>",
    ].join(""),
    coverPath: "public/covers/swedish-a2-sfi-anki-deck.webp",
    apkgRelPaths: ["prep2go_Swedish_A2_SFI/prep2go_Swedish_A2_SFI_FULL.apkg"],
    fileNames: ["Swedish_SFI_Residence_Citizenship_Anki_Deck.apkg"],
  },
  "greek-a2-ellinomatheia-anki-deck": {
    name: "Greek Ellinomatheia Residence Citizenship Anki Deck — 1000 Flashcards",
    summary:
      "1,000 Greek cards for Ellinomatheia A2 and Greek residence or citizenship language prep.",
    descriptionHtml: [
      "<p><strong>UniPrep2Go × PixID Studio</strong> — Greek Anki deck for <strong>Ellinomatheia A2</strong> and residence or citizenship language prep.</p>",
      "<p><strong>1,000</strong> high-frequency Greek cards with audio and practical example sentences for everyday life in Greece.</p>",
      "<p><strong>Delivery:</strong> Import the .apkg into Anki, then sync to mobile.</p>",
      "<p><em>Independent study aid — not official Ellinomatheia / Greek state exam material.</em></p>",
    ].join(""),
    coverPath: "public/covers/greek-a2-ellinomatheia-anki-deck.webp",
    apkgRelPaths: ["prep2go_Greek_A2_Ellinomatheia/prep2go_Greek_A2_Ellinomatheia_FULL.apkg"],
    fileNames: ["Greek_Ellinomatheia_Residence_Citizenship_Anki_Deck.apkg"],
  },
  "czech-a2-cce-anki-deck": {
    name: "Czech CCE Residence Citizenship Anki Deck — 1000 Flashcards",
    summary:
      "1,000 Czech cards for CCE A2 and Czech residence or citizenship language prep.",
    descriptionHtml: [
      "<p><strong>UniPrep2Go × PixID Studio</strong> — Czech Anki deck for <strong>CCE</strong> (Czech Language Certificate Exam) A2 and residence or citizenship language prep.</p>",
      "<p><strong>1,000</strong> high-frequency Czech cards with audio and practical example sentences for everyday life in Czechia.</p>",
      "<p><strong>Delivery:</strong> Import the .apkg into Anki, then sync to mobile.</p>",
      "<p><em>Independent study aid — not official CCE / ÚJOP material.</em></p>",
    ].join(""),
    coverPath: "public/covers/czech-a2-cce-anki-deck.webp",
    apkgRelPaths: ["prep2go_Czech_A2_CCE/prep2go_Czech_A2_CCE_FULL.apkg"],
    fileNames: ["Czech_CCE_Residence_Citizenship_Anki_Deck.apkg"],
  },
  "ielts-toefl-english-for-french-speakers-anki-deck": {
    name: "IELTS / TOEFL English for French Speakers Anki Deck — 2522 Flashcards",
    summary:
      "2,522 English vocabulary cards for IELTS, TOEFL, Cambridge, and PTE — with French support on every card.",
    descriptionHtml: [
      "<p><strong>UniPrep2Go × PixID Studio</strong> — English Anki deck for <strong>French speakers</strong> preparing <strong>IELTS</strong>, <strong>TOEFL</strong>, Cambridge, and PTE vocabulary.</p>",
      "<p><strong>2,522</strong> high-frequency English cards with French glosses, bilingual examples, native English audio, and illustrations — the same Prep2Go app bank, packaged as one .apkg.</p>",
      "<p><strong>Delivery:</strong> Import the .apkg into Anki, then sync to mobile.</p>",
      "<p><em>Independent study aid — not official IELTS, TOEFL, Cambridge, or PTE material.</em></p>",
    ].join(""),
    coverPath: "public/covers/ielts-toefl-english-for-french-speakers-anki-deck-v2.webp",
    apkgRelPaths: [
      "prep2go_English_A2_French_Speakers/prep2go_English_A2_French_Speakers_FULL.apkg",
    ],
    fileNames: ["IELTS_TOEFL_English_for_French_Speakers_Anki_Deck.apkg"],
  },
  "ielts-toefl-english-for-arabic-speakers-anki-deck": {
    name: "IELTS / TOEFL English for Arabic Speakers Anki Deck — 2504 Flashcards",
    summary:
      "2,504 English vocabulary cards for IELTS, TOEFL, Cambridge, and PTE — with Arabic support on every card.",
    descriptionHtml: [
      "<p><strong>UniPrep2Go × PixID Studio</strong> — English Anki deck for <strong>Arabic speakers</strong> preparing <strong>IELTS</strong>, <strong>TOEFL</strong>, Cambridge, and PTE vocabulary.</p>",
      "<p><strong>2,504</strong> high-frequency English cards with Arabic glosses, bilingual examples, native English audio, and illustrations — the same Prep2Go app bank, packaged as one .apkg.</p>",
      "<p><strong>Delivery:</strong> Import the .apkg into Anki, then sync to mobile.</p>",
      "<p><em>Independent study aid — not official IELTS, TOEFL, Cambridge, or PTE material.</em></p>",
    ].join(""),
    coverPath: "public/covers/ielts-toefl-english-for-arabic-speakers-anki-deck.webp",
    apkgRelPaths: [
      "prep2go_English_A2_Arabic_Speakers/prep2go_English_A2_Arabic_Speakers_FULL.apkg",
    ],
    fileNames: ["IELTS_TOEFL_English_for_Arabic_Speakers_Anki_Deck.apkg"],
  },
  "ielts-toefl-english-for-ukrainian-speakers-anki-deck": {
    name: "IELTS / TOEFL English for Ukrainian Speakers Anki Deck — 2504 Flashcards",
    summary:
      "2,504 English vocabulary cards for IELTS, TOEFL, Cambridge, and PTE — with Ukrainian support on every card.",
    descriptionHtml: [
      "<p><strong>UniPrep2Go × PixID Studio</strong> — English Anki deck for <strong>Ukrainian speakers</strong> preparing <strong>IELTS</strong>, <strong>TOEFL</strong>, Cambridge, and PTE vocabulary.</p>",
      "<p><strong>2,504</strong> high-frequency English cards with Ukrainian glosses, bilingual examples, native English audio, and illustrations — the same Prep2Go app bank, packaged as one .apkg.</p>",
      "<p><strong>Delivery:</strong> Import the .apkg into Anki, then sync to mobile.</p>",
      "<p><em>Independent study aid — not official IELTS, TOEFL, Cambridge, or PTE material.</em></p>",
    ].join(""),
    coverPath: "public/covers/ielts-toefl-english-for-ukrainian-speakers-anki-deck.webp",
    apkgRelPaths: [
      "prep2go_English_A2_Ukrainian_Speakers/prep2go_English_A2_Ukrainian_Speakers_FULL.apkg",
    ],
    fileNames: ["IELTS_TOEFL_English_for_Ukrainian_Speakers_Anki_Deck.apkg"],
  },
  "ielts-toefl-english-for-russian-speakers-anki-deck": {
    name: "IELTS / TOEFL English for Russian Speakers Anki Deck — 2504 Flashcards",
    summary:
      "2,504 English vocabulary cards for IELTS, TOEFL, Cambridge, and PTE — with Russian support on every card.",
    descriptionHtml: [
      "<p><strong>UniPrep2Go × PixID Studio</strong> — English Anki deck for <strong>Russian speakers</strong> preparing <strong>IELTS</strong>, <strong>TOEFL</strong>, Cambridge, and PTE vocabulary.</p>",
      "<p><strong>2,504</strong> high-frequency English cards with Russian glosses, bilingual examples, native English audio, and illustrations — the same Prep2Go app bank, packaged as one .apkg.</p>",
      "<p><strong>Delivery:</strong> Import the .apkg into Anki, then sync to mobile.</p>",
      "<p><em>Independent study aid — not official IELTS, TOEFL, Cambridge, or PTE material.</em></p>",
    ].join(""),
    coverPath: "public/covers/ielts-toefl-english-for-russian-speakers-anki-deck.webp",
    apkgRelPaths: [
      "prep2go_English_A2_Russian_Speakers/prep2go_English_A2_Russian_Speakers_FULL.apkg",
    ],
    fileNames: ["IELTS_TOEFL_English_for_Russian_Speakers_Anki_Deck.apkg"],
  },
  "ielts-toefl-english-for-spanish-speakers-anki-deck": {
    name: "IELTS / TOEFL English for Spanish Speakers Anki Deck — 2504 Flashcards",
    summary:
      "2,504 English vocabulary cards for IELTS, TOEFL, Cambridge, and PTE — with Latin American Spanish support on every card.",
    descriptionHtml: [
      "<p><strong>UniPrep2Go × PixID Studio</strong> — English Anki deck for <strong>Spanish speakers (LatAm)</strong> preparing <strong>IELTS</strong>, <strong>TOEFL</strong>, Cambridge, and PTE vocabulary.</p>",
      "<p><strong>2,504</strong> high-frequency English cards with Latin American Spanish glosses, bilingual examples, native English audio, and illustrations — the same Prep2Go app bank, packaged as one .apkg.</p>",
      "<p><strong>Delivery:</strong> Import the .apkg into Anki, then sync to mobile.</p>",
      "<p><em>Independent study aid — not official IELTS, TOEFL, Cambridge, or PTE material.</em></p>",
    ].join(""),
    coverPath: "public/covers/ielts-toefl-english-for-spanish-speakers-anki-deck.webp",
    apkgRelPaths: [
      "prep2go_English_A2_Spanish_Speakers/prep2go_English_A2_Spanish_Speakers_FULL.apkg",
    ],
    fileNames: ["IELTS_TOEFL_English_for_Spanish_Speakers_LatAm_Anki_Deck.apkg"],
  },
  "dele-a2-spanish-anki-deck": {
    name: "DELE SIELE Spanish Anki Deck — 1000 Flashcards",
    summary:
      "1,000 Spanish A2 vocabulary cards for DELE A2 and SIELE A2-style word knowledge — language only, not a CCSE bundle.",
    descriptionHtml: [
      "<p><strong>UniPrep2Go × PixID Studio</strong> — Spanish Anki deck for <strong>DELE A2</strong> (Instituto Cervantes) and overlapping <strong>SIELE A2</strong>-style vocabulary.</p>",
      "<p><strong>1,000</strong> high-frequency A2 cards with examples and media — a single language .apkg, not a DELE + CCSE nationality bundle.</p>",
      "<p><strong>Delivery:</strong> Import the .apkg into Anki desktop, then sync to mobile via AnkiWeb.</p>",
      "<p><em>Independent study aid — not affiliated with Instituto Cervantes or SIELE.</em></p>",
    ].join(""),
    coverPath: "public/covers/dele-a2-spanish-anki-deck.webp",
    apkgRelPaths: ["prep2go_Spanish_A2_DELE/prep2go_Spanish_A2_DELE_FULL.apkg"],
    fileNames: ["DELE_SIELE_Spanish_Anki_Deck.apkg"],
  },
  "dele-a2-ccse-spanish-citizenship-bundle": {
    name: "DELE CCSE Spanish Nationality Anki Bundle — Exam Flashcards",
    summary:
      "DELE A2 vocabulary + CCSE civics for nacionalidad española (SIELE-overlapping lexicon).",
    descriptionHtml: [
      "<p><strong>UniPrep2Go × PixID Studio</strong> — Spanish nationality bundle: <strong>DELE A2</strong> + <strong>CCSE</strong> for <strong>nacionalidad española</strong>. DELE A2 vocabulary also overlaps <strong>SIELE A2</strong>-style word knowledge.</p>",
      "<p>Download includes two .apkg files so language and civics stay on one study schedule.</p>",
      "<p><strong>Delivery:</strong> Both .apkg files appear in your Gumroad library immediately after purchase.</p>",
      "<p><em>Independent study aid — not affiliated with Instituto Cervantes or the Spanish Ministry of Justice.</em></p>",
    ].join(""),
    coverPath: "public/samples/prep2go-dele-a2-ccse-spanish-citizenship-cover.webp",
    apkgRelPaths: [
      "prep2go_Spanish_A2_DELE/prep2go_Spanish_A2_DELE_FULL.apkg",
      "prep2go_Spanish_CCSE/prep2go_Spanish_CCSE_FULL.apkg",
    ],
    fileNames: [
      "DELE_A2_Spanish_Anki_Deck.apkg",
      "CCSE_Spanish_Citizenship_Anki_Deck.apkg",
    ],
  },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseArgs(argv) {
  const args = { slug: null, dryRun: false, force: false, assetsOnly: false };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--force") args.force = true;
    else if (arg === "--assets-only") args.assetsOnly = true;
    else if (arg === "--slug") args.slug = argv[++i];
  }
  return args;
}

function loadEnv() {
  loadLocalEnvFiles();
  ensureGumroadAccessToken({ persist: true });
}

function resolveGumroadToken() {
  const { token, source } = ensureGumroadAccessToken({ persist: true });
  if (token && source && source !== "env" && source !== "env.local") {
    console.log(`  gumroad auth: resolved from ${source} (synced to .env.local)`);
  }
  return token;
}

function runGumroad(args, { dryRun = false } = {}) {
  const flags = dryRun ? `${args} --dry-run` : args;
  execSync(`gumroad ${flags} --non-interactive --yes`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function resolveCoverAbsolute(relPath) {
  const absolute = join(root, relPath);
  return existsSync(absolute) ? absolute : null;
}

/** Prefer newest stamped file `NAME_YYMMDD-HHMM.apkg`; fall back to unstamped NAME.apkg. */
function resolveApkgAbsolute(relPath) {
  const absolute = join(ANKI_GENERATOR_ROOT, "out", relPath);
  const dir = dirname(absolute);
  const base = basename(absolute, ".apkg");
  const stampRe = new RegExp(
    `^${base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}_\\d{6}-\\d{4}(?:-\\d+)?\\.apkg$`,
  );

  const candidates = [];
  for (const folder of [dir, ANKI_DECK_VAULT]) {
    if (!existsSync(folder)) continue;
    for (const name of readdirSync(folder)) {
      if (stampRe.test(name)) candidates.push(join(folder, name));
    }
  }
  if (candidates.length) {
    candidates.sort((a, b) => {
      const ma = a.match(/_(\d{6}-\d{4})(?:-\d+)?\.apkg$/)?.[1] ?? "";
      const mb = b.match(/_(\d{6}-\d{4})(?:-\d+)?\.apkg$/)?.[1] ?? "";
      if (ma !== mb) return mb.localeCompare(ma);
      return b.localeCompare(a);
    });
    return candidates[0];
  }
  return existsSync(absolute) ? absolute : null;
}

function prepareSquareThumbnail(coverPath) {
  const workDir = mkdtempSync(join(tmpdir(), "gumroad-lang-thumb-"));
  const fullPng = join(workDir, "full.png");
  const squarePng = join(workDir, "square.png");
  const thumbJpg = join(workDir, "thumb.jpg");

  try {
    execSync(`sips -s format png "${coverPath}" --out "${fullPng}"`, { stdio: "ignore" });
    const dims = execSync(`sips -g pixelWidth -g pixelHeight "${fullPng}"`, { encoding: "utf8" });
    const width = Number(dims.match(/pixelWidth: (\d+)/)?.[1] ?? 0);
    const height = Number(dims.match(/pixelHeight: (\d+)/)?.[1] ?? 0);
    const side = Math.min(width, height);
    const cropX = Math.max(0, width - side);
    execSync(
      `sips -c ${side} ${side} --cropOffset ${cropX} 0 "${fullPng}" --out "${squarePng}"`,
      { stdio: "ignore" },
    );
    execSync(`sips -z 1200 1200 "${squarePng}" --out "${squarePng}"`, { stdio: "ignore" });
    execSync(`sips -s format jpeg "${squarePng}" --out "${thumbJpg}"`, { stdio: "ignore" });
    return { thumbJpg, workDir };
  } catch (error) {
    rmSync(workDir, { recursive: true, force: true });
    throw error;
  }
}

function prepareCoverPng(coverPath) {
  const workDir = mkdtempSync(join(tmpdir(), "gumroad-lang-cover-"));
  const coverPng = join(workDir, "cover.png");
  execSync(`sips -s format png "${coverPath}" --out "${coverPng}"`, { stdio: "ignore" });
  return { coverPng, workDir };
}

async function putGumroadDescriptionAsync(productId, description, dryRun) {
  if (dryRun) return;
  const token = resolveGumroadToken();
  if (!token) throw new Error("GUMROAD_ACCESS_TOKEN required to update description");
  const response = await fetch(`https://api.gumroad.com/v2/products/${productId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });
  const payload = await response.json();
  if (!response.ok || !payload.success) {
    throw new Error(`Gumroad description update failed: ${JSON.stringify(payload).slice(0, 200)}`);
  }
}

async function createGumroadProduct({ token, name, priceCents, description, permalink, summary }) {
  const body = new URLSearchParams({
    access_token: token,
    name,
    price: String(priceCents),
    description,
    custom_permalink: permalink,
    custom_summary: summary,
    require_shipping: "false",
    is_tiered_membership: "false",
  });

  const response = await fetch("https://api.gumroad.com/v2/products", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const payload = await response.json();
  if (!response.ok || !payload.success) {
    throw new Error(
      `Gumroad create failed (${permalink}): ${JSON.stringify(payload).slice(0, 400)}`,
    );
  }

  return payload.product;
}

function uploadProductAssets({ productId, coverPath, apkgPaths, fileNames, dryRun }) {
  const fileFlags = apkgPaths
    .map((path, index) => {
      const name = fileNames[index] ?? `deck-${index + 1}.apkg`;
      return `--file "${path}" --file-name "${name}" --file-description "Anki deck — import into Anki desktop, then sync to mobile via AnkiWeb."`;
    })
    .join(" ");

  console.log(`  assets: ${apkgPaths.length} apkg file(s)`);
  runGumroad(`products update ${productId} --replace-files ${fileFlags}`, { dryRun });

  const { thumbJpg, workDir } = prepareSquareThumbnail(coverPath);
  try {
    console.log("  assets: thumbnail 1200×1200 JPEG");
    runGumroad(`products thumbnail set ${productId} --image "${thumbJpg}"`, { dryRun });

    const { coverPng, workDir: coverDir } = prepareCoverPng(coverPath);
    try {
      console.log("  assets: cover image");
      runGumroad(`products update ${productId} --cover-image "${coverPng}"`, { dryRun });
    } finally {
      rmSync(coverDir, { recursive: true, force: true });
    }
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }
}

function saveCatalog(catalog) {
  writeFileSync(CATALOG_PATH, `${JSON.stringify(catalog, null, 2)}\n`);
}

async function syncAssets({ slug, record, catalog, dryRun }) {
  const spec = SPECS[slug];
  if (!spec) throw new Error(`Unknown language deck slug: ${slug}`);
  const productId = record.gumroadProductId;
  if (!productId) throw new Error(`${slug}: gumroadProductId missing — create product first`);

  const coverPath = resolveCoverAbsolute(spec.coverPath);
  if (!coverPath) throw new Error(`${slug}: cover missing at ${spec.coverPath}`);

  const apkgPaths = spec.apkgRelPaths.map((rel) => {
    const absolute = resolveApkgAbsolute(rel);
    if (!absolute) {
      throw new Error(`${slug}: apkg missing at ${join(ANKI_GENERATOR_ROOT, "out", rel)}`);
    }
    return absolute;
  });

  if (dryRun) {
    console.log("  would upload apkg + thumbnail + cover and publish");
    return;
  }

  uploadProductAssets({
    productId,
    coverPath,
    apkgPaths,
    fileNames: spec.fileNames,
    dryRun: false,
  });
  await putGumroadDescriptionAsync(productId, spec.descriptionHtml, dryRun);
  runGumroad(`products publish ${productId}`);

  catalog.products[slug] = {
    ...record,
    apkgUploadedAt: new Date().toISOString(),
    publishedAt: record.publishedAt ?? new Date().toISOString(),
  };
  saveCatalog(catalog);
  console.log("  assets uploaded + product published");
}

async function createProduct({ slug, record, catalog, dryRun }) {
  const spec = SPECS[slug];
  if (!spec) throw new Error(`Unknown language deck slug: ${slug}`);
  const token = resolveGumroadToken();
  if (!token && !dryRun) throw new Error("GUMROAD_ACCESS_TOKEN missing");

  console.log(`  create: ${spec.name} @ $${PRICE_USD}`);
  if (dryRun) {
    console.log("  would create product + upload assets");
    return;
  }

  const product = await createGumroadProduct({
    token,
    name: spec.name,
    priceCents: PRICE_USD * 100,
    description: spec.descriptionHtml,
    permalink: record.permalink,
    summary: spec.summary,
  });

  const shortUrl =
    product.short_url ??
    `https://pixidstudio.gumroad.com/l/${record.permalink}`;

  catalog.products[slug] = {
    ...record,
    gumroadProductId: product.id,
    shortUrl,
    createdAt: new Date().toISOString(),
  };
  saveCatalog(catalog);
  console.log(`  created: ${product.id} → ${shortUrl}`);

  await syncAssets({
    slug,
    record: catalog.products[slug],
    catalog,
    dryRun: false,
  });
}

async function main() {
  const args = parseArgs(process.argv);
  loadEnv();
  resolveGumroadToken();
  const catalog = JSON.parse(readFileSync(CATALOG_PATH, "utf8"));

  const allSlugs = args.slug
    ? [args.slug]
    : Object.keys(catalog.products).filter((slug) => {
        if (args.force) return true;
        if (args.assetsOnly) {
          return catalog.products[slug].gumroadProductId && !catalog.products[slug].apkgUploadedAt;
        }
        return !catalog.products[slug].gumroadProductId;
      });

  if (allSlugs.length === 0) {
    console.log(
      args.assetsOnly
        ? "No language products need asset upload."
        : "All language Gumroad products already linked. Use --force to recreate.",
    );
    return;
  }

  console.log(`${args.dryRun ? "Dry-run" : "Processing"} ${allSlugs.length} language product(s)`);

  for (const slug of allSlugs) {
    console.log(`→ ${slug}`);
    const record = catalog.products[slug];
    if (!record) throw new Error(`Missing catalog entry for ${slug}`);
    if (!SPECS[slug]) throw new Error(`Missing SPECS entry for ${slug}`);

    if (args.assetsOnly || (record.gumroadProductId && !args.force)) {
      await syncAssets({ slug, record, catalog, dryRun: args.dryRun });
    } else {
      await createProduct({ slug, record, catalog, dryRun: args.dryRun });
      if (!args.dryRun && allSlugs.length > 1) {
        await sleep(PRODUCT_CREATE_DELAY_MS);
      }
    }
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
