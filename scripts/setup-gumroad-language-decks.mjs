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
import {
  dualBrandFooterHtml,
} from "./lib/gumroad-dual-brand.mjs";
import { gumroadDiscoverFields } from "./lib/gumroad-discover.mjs";

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
    name: "CIPLE CAPLE Portuguese Citizenship Anki Deck — 2067 Flashcards",
    summary:
      "2,067 European Portuguese cards for CIPLE / CAPLE A2, residency, and citizenship (nacionalidade).",
    descriptionHtml: [
      "<p><strong>PixID Studio</strong> — Portuguese Anki deck for <strong>CIPLE / CAPLE A2</strong>, <strong>autorização de residência</strong>, and <strong>nacionalidade portuguesa</strong>.</p>",
      "<p><strong>2,067</strong> PT-PT cards with audio, phrases, and examples — one vocabulary bank for the CAPLE diploma and Portugal immigration pathways.</p>",
      "<p><strong>Delivery:</strong> Import the .apkg into Anki desktop, then sync to mobile via AnkiWeb.</p>",
      "<p><em>Independent study aid — not official CAPLE / University of Lisbon material.</em></p>",
    ].join(""),
    coverPath: "public/covers/ciple-a2-european-portuguese-anki-deck.webp",
    apkgRelPaths: ["prep2go_Portuguese_A2_CIPLE/prep2go_Portuguese_A2_CIPLE_FULL.apkg"],
    fileNames: ["CIPLE_CAPLE_Portuguese_Citizenship_Anki_Deck.apkg"],
  },
  "ciple-a2-for-russian-speakers-anki-deck": {
    name: "CIPLE A2 Anki для русскоязычных — 2043 карточки (CAPLE)",
    summary:
      "2043 карточки европейского португальского для CIPLE / CAPLE A2 с русскими переводами, аудио и картинками — разовая покупка за $26.",
    descriptionHtml: ["<p><strong>PixID Studio</strong> — Anki-колода европейского португальского для <strong>русскоязычных</strong>, готовящихся к <strong>CIPLE / CAPLE A2</strong>, <strong>autorização de residência</strong> и <strong>nacionalidade portuguesa</strong>.</p><p><strong>2043</strong> карточки PT-PT: на каждой — картинка, русский перевод слова, пример с озвучкой европейского португальского и перевод примера. Тот же банк Prep2Go, упакованный в один .apkg.</p><p>Отличается от CIPLE CAPLE с английскими глоссами. Не колода по гражданским знаниям Portugal nacionalidade.</p><p><strong>Доставка:</strong> скачайте .apkg из библиотеки Gumroad, импортируйте в Anki на компьютере и синхронизируйте с телефоном через AnkiWeb.</p><p><em>Независимый учебный материал — не официальный продукт CAPLE / University of Lisbon.</em></p>"],
    coverPath: "public/covers/ciple-a2-for-russian-speakers-anki-deck.webp",
    apkgRelPaths: [
      "prep2go_Portuguese_A2_CIPLE_Russian_Speakers/prep2go_Portuguese_A2_CIPLE_Russian_Speakers_FULL.apkg",
    ],
    fileNames: ["CIPLE_A2_for_Russian_Speakers_Anki_Deck.apkg"],
  },
  "portuguese-survival-anki-deck": {
    name: "Portuguese Survival Anki Deck — 344 Speaking Moves (PT-PT)",
    summary:
      "344 Day-1 PT-PT speaking moves (Say / Hear / Repair) for shops, clinic, housing, transport, and paperwork — with Google pt-PT audio.",
    priceUsd: 15,
    descriptionHtml: [
      "<p><strong>PixID Studio</strong> — <strong>Portuguese Survival</strong> Anki deck for living in Portugal (European Portuguese / PT-PT).</p>",
      "<p><strong>Speaking moves, not a word list:</strong> each card is a real turn — <strong>Say</strong> (your line), <strong>Hear</strong> (decode theirs), or <strong>Repair</strong> (unstick the conversation). Nine scenes: foundations, money/time, directions, shop, health, housing, transport, documents, social.</p>",
      "<p><strong>344 unique moves</strong> with Google Cloud pt-PT audio. Day-one loop covered without CIPLE lemma padding. It is <strong>not</strong> a full CIPLE / CAPLE exam pack — use the larger CIPLE deck for the diploma.</p>",
      "<p><strong>Delivery:</strong> Import the .apkg into Anki desktop, then sync to mobile via AnkiWeb.</p>",
      "<p><em>Independent study aid — not official CAPLE / University of Lisbon material.</em></p>",
    ].join(""),
    coverPath: "public/covers/portuguese-survival-anki-deck.webp",
    apkgRelPaths: [
      "prep2go_Portuguese_Survival_v2/Portuguese_Survival_PT_PT_Anki_Deck.apkg",
    ],
    fileNames: ["Portuguese_Survival_PT_PT_Anki_Deck.apkg"],
  },
  "delf-b2-french-anki-deck": {
    name: "DELF DALF TCF TEF French Anki Deck — 2100 Flashcards",
    summary:
      "2,100 French cards for DELF, DALF, TCF/TEF Canada, TCF ANF, TCF général — plus shared lexicon for fide / Swiss residency French.",
    descriptionHtml: [
      "<p><strong>PixID Studio</strong> — French Anki deck for the main certificate and immigration pathways: <strong>DELF / DALF</strong> (lifetime diploma gold standard), <strong>TCF Canada</strong> and <strong>TEF Canada</strong> (Express Entry / Quebec), <strong>TCF ANF</strong> (French naturalization), and <strong>TCF général</strong> (French universities).</p>",
      "<p>The same high-frequency lexicon also supports <strong>fide / Swiss residency French</strong> language prep and everyday Belgian French — not official fide / SEM formats. For Swiss civics (Staatskunde), see the Swiss Citizenship Anki Bundle.</p>",
      "<p><strong>2,100</strong> cards pair each headword with a visual cue, native French audio, and a contextual example — one shared high-frequency vocabulary bank across those exams, not A1 survival fluff.</p>",
      "<p><strong>Delivery:</strong> Import into Anki desktop, then sync to mobile via AnkiWeb.</p>",
      "<p><em>Independent study aid — not affiliated with France Éducation international, IRCC, official TCF/TEF bodies, or Swiss fide / SEM.</em></p>",
    ].join(""),
    coverPath: "public/covers/delf-b2-french-anki-deck.webp",
    apkgRelPaths: ["prep2go_French_B2_DELF/prep2go_French_B2_DELF_FULL.apkg"],
    fileNames: ["DELF_DALF_TCF_TEF_French_Anki_Deck.apkg"],
  },
  "dutch-a2-inburgering-anki-deck": {
    name: "Dutch Inburgering NT2 A2 Anki Deck — 1897 Flashcards",
    summary:
      "1,897 Dutch A2 cards for Inburgering, Staatsexamen NT2 A2, residency, and naturalisatie.",
    descriptionHtml: [
      "<p><strong>PixID Studio</strong> — Dutch Anki deck for <strong>Inburgering</strong>, <strong>Staatsexamen NT2 A2</strong>, and <strong>naturalisatie</strong> vocabulary.</p>",
      "<p><strong>1,897</strong> high-frequency words with bilingual examples, native audio, and illustrations.</p>",
      "<p><strong>Delivery:</strong> Anki .apkg — import on desktop, sync to mobile.</p>",
      "<p><em>Independent study aid — not official Dutch government / DUO material.</em></p>",
    ].join(""),
    coverPath: "public/covers/dutch-a2-inburgering-anki-deck.webp",
    apkgRelPaths: ["prep2go_Dutch_A2_Inburgering/prep2go_Dutch_A2_Inburgering_FULL.apkg"],
    fileNames: ["Dutch_Inburgering_NT2_A2_Anki_Deck.apkg"],
  },
  "german-a2-anki-deck": {
    name: "German Goethe telc ÖSD DTZ Anki Deck — 2101 Flashcards",
    summary:
      "2,101 German cards for Goethe, telc, ÖSD, DTZ — plus shared lexicon for residence / Einbürgerung language and fide / Swiss residency German.",
    descriptionHtml: [
      "<p><strong>PixID Studio</strong> — German Anki deck for <strong>Goethe-Institut A2</strong>, <strong>telc Deutsch A2</strong>, <strong>ÖSD A2</strong>, and <strong>DTZ</strong>.</p>",
      "<p><strong>2,101</strong> essential words — one shared vocabulary bank across certificate and immigration pathways, including soft overlap for residence / Einbürgerung language and <strong>fide / Swiss residency German</strong>.</p>",
      "<p>Not a Leben in Deutschland civics deck (see Citizenship &amp; Naturalization Anki Bundle) and not Swiss Staatskunde (see Swiss Citizenship Anki Bundle).</p>",
      "<p><strong>Delivery:</strong> Import the .apkg into Anki desktop, then sync to mobile.</p>",
      "<p><em>Independent study aid — not official Goethe, telc, ÖSD, BAMF / DTZ, or Swiss fide / SEM material.</em></p>",
    ].join(""),
    coverPath: "public/covers/german-a2-anki-deck.webp",
    apkgRelPaths: ["prep2go_German_B1_DTZ/prep2go_German_B1_DTZ_FULL.apkg"],
    fileNames: ["German_Goethe_telc_OSD_DTZ_Anki_Deck.apkg"],
  },
  "celi-b1-italian-anki-deck": {
    name: "CELI CILS PLIDA Italian Anki Deck — 2151 Flashcards",
    summary:
      "2,151 Italian B1 cards for CELI, CILS, and PLIDA — including permesso di soggiorno and cittadinanza language overlap.",
    descriptionHtml: [
      "<p><strong>PixID Studio</strong> — Italian B1 Anki deck for <strong>CELI</strong>, <strong>CILS</strong>, and <strong>PLIDA</strong>, including vocabulary used for <strong>permesso di soggiorno</strong> and <strong>cittadinanza</strong> language pathways (CILS B1 cittadinanza-adjacent).</p>",
      "<p><strong>2,151</strong> cards covering the shared intermediate vocabulary across the main Italian certificates — language prep, not an Italian civics quiz.</p>",
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
      "<p><strong>PixID Studio</strong> — Danish Anki deck for <strong>Prøve i Dansk PD2 / PD3</strong> and residence or citizenship language prep.</p>",
      "<p><strong>1,000</strong> cards with audio and practical example sentences for work, housing, services, and daily life in Denmark.</p>",
      "<p><strong>Delivery:</strong> Import the .apkg into Anki, then sync to mobile.</p>",
      "<p><em>Independent study aid — not official Danish language exam material.</em></p>",
    ].join(""),
    coverPath: "public/covers/danish-a2-prove-i-dansk-anki-deck.webp",
    apkgRelPaths: ["prep2go_Danish_A2_PD2_PD3/prep2go_Danish_A2_PD2_PD3_FULL.apkg"],
    fileNames: ["Danish_Prove_i_Dansk_PD2_PD3_Anki_Deck.apkg"],
  },
  "norwegian-a2-norskprove-anki-deck": {
    name: "Norwegian Norskprøve Residence Citizenship Anki Deck — 1487 Flashcards",
    summary:
      "1,487 Bokmål cards for Norskprøve A2 and Norwegian residence or citizenship language prep.",
    descriptionHtml: [
      "<p><strong>PixID Studio</strong> — Norwegian Anki deck for <strong>Norskprøve A2</strong>, <strong>permanent oppholdstillatelse</strong>, and <strong>statsborgerskap</strong> language prep.</p>",
      "<p><strong>1,487</strong> Bokmål cards with audio and everyday example sentences.</p>",
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
      "<p><strong>PixID Studio</strong> — Swedish Anki deck for <strong>SFI</strong> (Swedish for Immigrants) A2 vocabulary and residence or citizenship language prep.</p>",
      "<p><strong>1,000</strong> high-frequency Swedish cards with audio and practical example sentences for work, housing, services, and everyday life in Sweden.</p>",
      "<p><strong>Delivery:</strong> Import the .apkg into Anki, then sync to mobile.</p>",
      "<p><em>Independent study aid — not official SFI / Swedish Migration Agency material.</em></p>",
    ].join(""),
    coverPath: "public/covers/swedish-a2-sfi-anki-deck.webp",
    apkgRelPaths: ["prep2go_Swedish_A2_SFI/prep2go_Swedish_A2_SFI_FULL.apkg"],
    fileNames: ["Swedish_SFI_Residence_Citizenship_Anki_Deck.apkg"],
  },
  "greek-a2-ellinomatheia-anki-deck": {
    name: "Greek Ellinomatheia Residence Citizenship Anki Deck — 939 Flashcards",
    summary:
      "939 Greek cards for Ellinomatheia A2 and Greek residence or citizenship language prep.",
    descriptionHtml: [
      "<p><strong>PixID Studio</strong> — Greek Anki deck for <strong>Ellinomatheia A2</strong> and residence or citizenship language prep.</p>",
      "<p><strong>939</strong> high-frequency Greek cards with audio and practical example sentences for everyday life in Greece.</p>",
      "<p><strong>Delivery:</strong> Import the .apkg into Anki, then sync to mobile.</p>",
      "<p><em>Independent study aid — not official Ellinomatheia / Greek state exam material.</em></p>",
    ].join(""),
    coverPath: "public/covers/greek-a2-ellinomatheia-anki-deck.webp",
    apkgRelPaths: ["prep2go_Greek_A2_Ellinomatheia/prep2go_Greek_A2_Ellinomatheia_FULL.apkg"],
    fileNames: ["Greek_Ellinomatheia_Residence_Citizenship_Anki_Deck.apkg"],
  },
  "czech-a2-cce-anki-deck": {
    name: "Czech CCE Residence Citizenship Anki Deck — 945 Flashcards",
    summary:
      "945 Czech cards for CCE A2 and Czech residence or citizenship language prep.",
    descriptionHtml: [
      "<p><strong>PixID Studio</strong> — Czech Anki deck for <strong>CCE</strong> (Czech Language Certificate Exam) A2 and residence or citizenship language prep.</p>",
      "<p><strong>945</strong> high-frequency Czech cards with audio and practical example sentences for everyday life in Czechia.</p>",
      "<p><strong>Delivery:</strong> Import the .apkg into Anki, then sync to mobile.</p>",
      "<p><em>Independent study aid — not official CCE / ÚJOP material.</em></p>",
    ].join(""),
    coverPath: "public/covers/czech-a2-cce-anki-deck.webp",
    apkgRelPaths: ["prep2go_Czech_A2_CCE/prep2go_Czech_A2_CCE_FULL.apkg"],
    fileNames: ["Czech_CCE_Residence_Citizenship_Anki_Deck.apkg"],
  },
  "polish-a2-certyfikat-anki-deck": {
    name: "Polish A2 Certyfikat Residence Citizenship Anki Deck — 1489 Flashcards",
    summary:
      "1,489 Polish cards for Certyfikat języka polskiego A2 and residence or citizenship language prep.",
    descriptionHtml: [
      "<p><strong>PixID Studio</strong> — Polish Anki deck for <strong>Certyfikat języka polskiego</strong> A2 and residence or citizenship language prep.</p>",
      "<p><strong>1,489</strong> high-frequency Polish cards with audio and practical example sentences for everyday life in Poland — language vocabulary only, not Polish citizenship civics.</p>",
      "<p><strong>Delivery:</strong> Import the .apkg into Anki, then sync to mobile.</p>",
      "<p><em>Independent study aid — not official Certyfikat / state exam material.</em></p>",
    ].join(""),
    coverPath: "public/covers/polish-a2-certyfikat-anki-deck.webp",
    apkgRelPaths: ["prep2go_Polish_A2_Certyfikat/prep2go_Polish_A2_Certyfikat_FULL.apkg"],
    fileNames: ["Polish_A2_Certyfikat_Residence_Citizenship_Anki_Deck.apkg"],
  },
  "polish-a2-for-ukrainian-speakers-anki-deck": {
    name: "Польська A2 Anki для українськомовних — 1489 карток (Certyfikat)",
    summary:
      "1489 карток польської A2 з українськими перекладами, малюнками й озвученими реченнями — для Certyfikat A2 і життя в Польщі. $26 один раз.",
    descriptionHtml: ["<p>Польська здається знайомою, поки не треба читати латиницею й ставити наголос. 1489 карток за частотністю: на кожній малюнок, український переклад і повне польське речення з озвучкою.</p><p>Лицьова сторона — лише польське слово: тренуєте sz, cz, rz, ł, ą, ę до читання на іспиті. На звороті — українська, без англійської посередині.</p><p>Це не wiedza o Polsce і не граматичний курс. У UniPrep2Go немає польського мовного моку — беріть безкоштовні зразки на certyfikatpolski.pl.</p><p>Одноразова купівля, офлайн .apkg. Не афілійовано з державною комісією Certyfikat języka polskiego.</p>"],
    coverPath: "public/covers/polish-a2-for-ukrainian-speakers-anki-deck.webp",
    apkgRelPaths: [
      "prep2go_Polish_A2_Ukrainian_Speakers/prep2go_Polish_A2_Ukrainian_Speakers_FULL.apkg",
    ],
    fileNames: ["Polish_A2_for_Ukrainian_Speakers_Anki_Deck.apkg"],
  },
  "german-a2-for-ukrainian-speakers-anki-deck": {
    name: "Німецька A2 Anki для українськомовних — 2026 карток (Goethe, telc, ÖSD, DTZ)",
    summary:
      "2026 карток німецької A2 з українськими перекладами, малюнками й озвученими реченнями — для Goethe, telc, ÖSD і DTZ. $26 один раз.",
    descriptionHtml: ["<p>Пройдіть інтеграційний курс і DTZ зі словником, який реально потрібен у Німеччині: 2026 карток — на кожній малюнок, український переклад і німецьке речення з озвучкою та перекладом українською.</p><p>Спочатку частотне ядро, потім тематичний блок: записи на прийом, оренда, Jobcenter, потяги, лікарі. Іменники на лицьовій стороні без der/die/das — артикль чути в прикладі.</p><p>Це не Leben in Deutschland і не граматичний курс. UniPrep2Go не має німецького мовного моку — поєднуйте колоду з безкоштовними модельними тестами BAMF і Goethe.</p><p>Одноразова купівля, офлайн .apkg для Anki. Не афілійовано з BAMF, Goethe-Institut, telc чи ÖSD.</p>"],
    coverPath: "public/covers/german-a2-for-ukrainian-speakers-anki-deck.webp",
    apkgRelPaths: [
      "prep2go_German_A2_Ukrainian_Speakers/prep2go_German_A2_Ukrainian_Speakers_FULL.apkg",
    ],
    fileNames: ["German_A2_for_Ukrainian_Speakers_Anki_Deck.apkg"],
  },
  "german-a2-for-russian-speakers-anki-deck": {
    name: "Немецкий A2 Anki для русскоязычных — 2026 карточек (Goethe, telc, DTZ)",
    summary:
      "2026 карточек немецкого A2 с русскими переводами, аудио и картинками для Goethe, telc и DTZ — разовая покупка за $26.",
    descriptionHtml: ["<p><strong>PixID Studio</strong> — Anki-колода немецкого для <strong>русскоязычных</strong>, готовящихся к <strong>Goethe-Institut A2</strong>, <strong>telc Deutsch A2</strong>, <strong>ÖSD A2</strong> и <strong>DTZ</strong>.</p><p><strong>2026</strong> карточек: на каждой — картинка, русский перевод слова, немецкий пример с озвучкой и перевод примера. Частотное ядро, затем темы Anmeldung, аренда, Krankenkasse, работа и транспорт.</p><p>Не колода Leben in Deutschland (гражданские вопросы — отдельно).</p><p><strong>Доставка:</strong> скачайте .apkg из библиотеки Gumroad, импортируйте в Anki на компьютере и синхронизируйте с телефоном через AnkiWeb.</p><p><em>Независимый учебный материал — не официальный продукт Goethe-Institut, telc, ÖSD или BAMF.</em></p>"],
    coverPath: "public/covers/german-a2-for-russian-speakers-anki-deck.webp",
    apkgRelPaths: [
      "prep2go_German_A2_Russian_Speakers/prep2go_German_A2_Russian_Speakers_FULL.apkg",
    ],
    fileNames: ["German_A2_for_Russian_Speakers_Anki_Deck.apkg"],
  },
  "ielts-toefl-english-for-french-speakers-anki-deck": {
    name: "IELTS / TOEFL English pour francophones — Anki 2522 cartes",
    summary:
      "2 522 flashcards d’anglais avec traductions françaises, images et audio de phrases — base lexicale IELTS / TOEFL. 26 $ une fois.",
    descriptionHtml: ["<p><strong>PixID Studio</strong> — paquet Anki d’anglais pour <strong>francophones</strong> qui préparent <strong>IELTS</strong>, <strong>TOEFL</strong>, <strong>Cambridge</strong> et <strong>PTE</strong>.</p><p><strong>2 522</strong> cartes : mot anglais + image au recto ; glose française, phrase d’exemple en anglais avec audio, et sa traduction française au verso — la banque Prep2Go, en un seul .apkg.</p><p>Corrige les faux amis (actually ≠ actuellement, eventually ≠ éventuellement, library ≠ librairie) et entraîne les sons que les francophones brouillent souvent : th, h, accent tonique.</p><p><strong>Livraison :</strong> importez le .apkg dans Anki bureau, puis synchronisez vers le mobile via AnkiWeb.</p><p><em>Aide à l’étude indépendante — non affiliée au British Council, IDP, Cambridge University Press &amp; Assessment ou ETS.</em></p>"],
    coverPath: "public/covers/ielts-toefl-english-for-french-speakers-anki-deck-v2.webp",
    apkgRelPaths: [
      "prep2go_English_A2_French_Speakers/prep2go_English_A2_French_Speakers_FULL.apkg",
    ],
    fileNames: ["IELTS_TOEFL_English_for_French_Speakers_Anki_Deck.apkg"],
  },
  "ielts-toefl-english-for-arabic-speakers-anki-deck": {
    name: "IELTS / TOEFL English للمتحدثين بالعربية — Anki 2504 بطاقة",
    summary:
      "2504 بطاقة مفردات إنجليزية مع ترجمات عربية وصور وصوت للجمل — قاعدة لغوية لـ IELTS وTOEFL. 26 دولارًا مرة واحدة.",
    descriptionHtml: ["<p><strong>PixID Studio</strong> — حزمة Anki للإنجليزية لـ<strong>المتحدثين بالعربية</strong> المستعدين لـ<strong>IELTS</strong> و<strong>TOEFL</strong> و<strong>Cambridge</strong> و<strong>PTE</strong>.</p><p><strong>2504</strong> بطاقة: كلمة إنجليزية + صورة في الوجه؛ ترجمة عربية وجملة مثال إنجليزية مع صوت وترجمتها في الظهر — بنك Prep2Go في ملف .apkg واحد.</p><p>تركّز على التهجئة (خطأ إملائي في Listening/Reading = صفر) وعلى أصوات غالبًا ما تُدمج: p وb والحركات القصيرة.</p><p><strong>التسليم:</strong> استورد ملف .apkg في Anki على الكمبيوتر ثم زامِن للجوال عبر AnkiWeb.</p><p><em>مادة دراسية مستقلة — غير تابعة لـ British Council أو IDP أو Cambridge University Press &amp; Assessment أو ETS.</em></p>"],
    coverPath: "public/covers/ielts-toefl-english-for-arabic-speakers-anki-deck.webp",
    apkgRelPaths: [
      "prep2go_English_A2_Arabic_Speakers/prep2go_English_A2_Arabic_Speakers_FULL.apkg",
    ],
    fileNames: ["IELTS_TOEFL_English_for_Arabic_Speakers_Anki_Deck.apkg"],
  },
  "ielts-toefl-english-for-ukrainian-speakers-anki-deck": {
    name: "IELTS / TOEFL англійська Anki для українськомовних — 2504 картки",
    summary:
      "2504 картки англійської лексики з українськими перекладами, малюнками й озвученими реченнями — для IELTS General/Academic і TOEFL. $26 один раз.",
    descriptionHtml: ["<p>Чи то канадський ПМЖ, робота в UK, чи англомовний університет — тест стоїть на тому самому ядрі слів. 2504 англійські картки за частотністю: малюнок, український переклад і англійське речення з озвучкою.</p><p>False friends на картці: magazine ≠ магазин, accurate ≠ акуратний, decade ≠ декада — з реченням, яке чуєте й читаєте. Українські глоси, не російські.</p><p>Це не банк питань IELTS/TOEFL і не курс письма. UniPrep2Go не проводить мок IELTS чи TOEFL — беріть офіційні зразки на ielts.org і ets.org.</p><p>Одноразова купівля, офлайн .apkg. Не афілійовано з British Council, IDP, Cambridge чи ETS.</p>"],
    coverPath: "public/covers/ielts-toefl-english-for-ukrainian-speakers-anki-deck.webp",
    apkgRelPaths: [
      "prep2go_English_A2_Ukrainian_Speakers/prep2go_English_A2_Ukrainian_Speakers_FULL.apkg",
    ],
    fileNames: ["IELTS_TOEFL_English_for_Ukrainian_Speakers_Anki_Deck.apkg"],
  },
  "ielts-toefl-english-for-russian-speakers-anki-deck": {
    name: "IELTS / TOEFL English Anki для русскоязычных — 2504 карточки",
    summary:
      "2504 карточки английского с русскими переводами, аудио и картинками для IELTS и TOEFL — разовая покупка за $26.",
    descriptionHtml: ["<p><strong>PixID Studio</strong> — Anki-колода английского для <strong>русскоязычных</strong>, готовящихся к <strong>IELTS</strong>, <strong>TOEFL</strong>, Cambridge и PTE.</p><p><strong>2504</strong> карточки по частотности: на каждой — картинка, русский перевод слова, английский пример с озвучкой и перевод примера. Закрывает ложные друзья вроде actual ≠ актуальный и привычки произношения (bag / back, h, th).</p><p><strong>Доставка:</strong> скачайте .apkg из библиотеки Gumroad, импортируйте в Anki на компьютере и синхронизируйте с телефоном через AnkiWeb.</p><p><em>Независимый учебный материал — не продукт British Council, IDP, Cambridge University Press &amp; Assessment или ETS.</em></p>"],
    coverPath: "public/covers/ielts-toefl-english-for-russian-speakers-anki-deck.webp",
    apkgRelPaths: [
      "prep2go_English_A2_Russian_Speakers/prep2go_English_A2_Russian_Speakers_FULL.apkg",
    ],
    fileNames: ["IELTS_TOEFL_English_for_Russian_Speakers_Anki_Deck.apkg"],
  },
  "ielts-toefl-english-for-spanish-speakers-anki-deck": {
    name: "IELTS / TOEFL English para hispanohablantes (LatAm) — Anki 2504 cartas",
    summary:
      "2 504 flashcards de inglés con traducciones en español latinoamericano, imágenes y audio de oraciones — base léxica TOEFL / IELTS. $26 una vez.",
    descriptionHtml: ["<p><strong>PixID Studio</strong> — mazo Anki de inglés para <strong>hispanohablantes de América Latina</strong> que preparan <strong>TOEFL iBT</strong>, <strong>IELTS</strong>, <strong>Cambridge</strong> y <strong>PTE</strong>.</p><p><strong>2 504</strong> cartas: palabra inglesa + imagen al frente; glosa en español, oración de ejemplo en inglés con audio y su traducción al verso — el banco Prep2Go en un solo .apkg.</p><p>Corrige falsos amigos (pretend ≠ pretender, realize ≠ realizar, library ≠ librería) y entrena hábitos LatAm: la e delante de s+consonante, b/v y vocales cortas.</p><p><strong>Entrega:</strong> importa el .apkg en Anki de escritorio y sincroniza al móvil con AnkiWeb.</p><p><em>Material de estudio independiente — no afiliado a ETS, British Council, IDP ni Cambridge University Press &amp; Assessment.</em></p>"],
    coverPath: "public/covers/ielts-toefl-english-for-spanish-speakers-anki-deck-v2.webp",
    apkgRelPaths: [
      "prep2go_English_A2_Spanish_Speakers/prep2go_English_A2_Spanish_Speakers_FULL.apkg",
    ],
    fileNames: ["IELTS_TOEFL_English_for_Spanish_Speakers_LatAm_Anki_Deck.apkg"],
  },
  "ielts-toefl-english-for-portuguese-speakers-anki-deck": {
    name: "IELTS / TOEFL English para falantes de português (BR) — Anki 2504 cartas",
    summary:
      "2 504 flashcards de inglês com traduções em português, imagens e áudio de frases — base lexical para IELTS / TOEFL. US$ 26 uma vez.",
    descriptionHtml: ["<p><strong>PixID Studio</strong> — baralho Anki de inglês para <strong>falantes de português brasileiro</strong> que preparam <strong>IELTS</strong>, <strong>TOEFL</strong>, <strong>Cambridge</strong> e <strong>PTE</strong>.</p><p><strong>2 504</strong> cartas: palavra em inglês + imagem na frente; glossa em português, frase de exemplo em inglês com áudio e sua tradução no verso — o banco Prep2Go em um único .apkg.</p><p>Corrige falsos amigos (pretend ≠ pretender, push ≠ puxar, actually ≠ atualmente) e treina hábitos BR: vogal extra no final de consoante, e antes de s+consoante, th e h inglês.</p><p><strong>Entrega:</strong> importe o .apkg no Anki desktop e sincronize no celular via AnkiWeb.</p><p><em>Material de estudo independente — não afiliado ao British Council, IDP, Cambridge University Press &amp; Assessment ou ETS.</em></p>"],
    coverPath: "public/covers/ielts-toefl-english-for-portuguese-speakers-anki-deck-v2.webp",
    apkgRelPaths: [
      "prep2go_English_A2_Portuguese_Speakers/prep2go_English_A2_Portuguese_Speakers_FULL.apkg",
    ],
    fileNames: ["IELTS_TOEFL_English_for_Portuguese_Speakers_BR_Anki_Deck.apkg"],
  },
  "ielts-toefl-english-for-turkish-speakers-anki-deck": {
    name: "IELTS / TOEFL English Türkçe konuşanlar için — Anki 952 kart",
    summary:
      "952 temel İngilizce kelime kartı; Türkçe çeviriler, görseller ve cümle sesi — TOEFL / IELTS başlangıcı. Tek seferlik 5 $.",
    priceUsd: 5,
    descriptionHtml: ["<p><strong>PixID Studio</strong> — <strong>Türkçe konuşanlar</strong> için <strong>TOEFL iBT</strong>, <strong>IELTS</strong>, <strong>Cambridge</strong> ve <strong>PTE</strong> hazırlığına Anki İngilizce destesi.</p><p><strong>952</strong> kart: önde İngilizce kelime + görsel; arkada Türkçe karşılık, sesli İngilizce örnek cümle ve Türkçe çevirisi — Prep2Go çekirdek bankası tek .apkg’de.</p><p>Türkçedeki o zamiri he/she/it ayrımını görünür kılar; TOEFL Build a Sentence’ın istediği özne–fiil–nesne sırasını örnek cümlelerle peşine takar.</p><p><strong>Teslimat:</strong> .apkg’yi masaüstü Anki’ye içe aktarın, AnkiWeb ile telefona senkronize edin.</p><p><em>Bağımsız çalışma materyali — ETS, British Council, IDP veya Cambridge University Press &amp; Assessment ile bağlantılı değildir.</em></p>"],
    coverPath: "public/covers/ielts-toefl-english-for-turkish-speakers-anki-deck.webp",
    apkgRelPaths: [
      "prep2go_English_A2_Turkish_Speakers/prep2go_English_A2_Turkish_Speakers_FULL.apkg",
    ],
    fileNames: ["IELTS_TOEFL_English_for_Turkish_Speakers_Anki_Deck.apkg"],
  },
  "dele-a2-spanish-anki-deck": {
    name: "DELE SIELE Spanish Anki Deck — 2105 Flashcards",
    summary:
      "2,105 Spanish A2 vocabulary cards for DELE A2 and SIELE A2-style word knowledge — language only, not a CCSE bundle.",
    descriptionHtml: [
      "<p><strong>PixID Studio</strong> — Spanish Anki deck for <strong>DELE A2</strong> (Instituto Cervantes) and overlapping <strong>SIELE A2</strong>-style vocabulary.</p>",
      "<p><strong>2,105</strong> high-frequency A2 cards with examples and media — a single language .apkg, not a DELE + CCSE nationality bundle.</p>",
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
      "<p><strong>PixID Studio</strong> — Spanish nationality bundle: <strong>DELE A2</strong> + <strong>CCSE</strong> for <strong>nacionalidad española</strong>. DELE A2 vocabulary also overlaps <strong>SIELE A2</strong>-style word knowledge.</p>",
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
  const args = { slug: null, dryRun: false, force: false, assetsOnly: false, copyOnly: false };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--force") args.force = true;
    else if (arg === "--assets-only") args.assetsOnly = true;
    else if (arg === "--copy-only") args.copyOnly = true;
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
    execSync(`sips -z 600 600 "${squarePng}" --out "${squarePng}"`, { stdio: "ignore" });
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

function finalizeLanguageDescription(slug, html) {
  let out = String(html || "")
    .replace(/<p><strong>UniPrep2Go × PixID Studio<\/strong> — /g, "<p><strong>PixID Studio</strong> — ")
    .replace(/<p>Product page:\s*<a href="https:\/\/uniprep2go\.study\/decks\/[^"]+">[^<]*<\/a><\/p>/gi, "")
    .replace(/<p>Full product page[^<]*<a href="https:\/\/uniprep2go\.study\/decks\/[^"]+">[^<]*<\/a><\/p>/gi, "");
  if (!out.includes("Sold by PixID Studio")) {
    const disclaimerMatch = out.match(/(<p><em>Independent study aid[\s\S]*?<\/p>)\s*$/);
    const footer = dualBrandFooterHtml(slug);
    if (disclaimerMatch) {
      out = out.slice(0, disclaimerMatch.index) + footer + disclaimerMatch[1];
    } else {
      out += footer;
    }
  }
  return out;
}

async function putGumroadDescriptionAsync(productId, description, dryRun, slug = null) {
  if (dryRun) return;
  const token = resolveGumroadToken();
  if (!token) throw new Error("GUMROAD_ACCESS_TOKEN required to update description");
  const finalDescription = slug ? finalizeLanguageDescription(slug, description) : description;
  const spec = slug ? SPECS[slug] : null;
  const response = await fetch(`https://api.gumroad.com/v2/products/${productId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description: finalDescription,
      ...(slug
        ? gumroadDiscoverFields({
            slug,
            name: spec?.name,
          })
        : {}),
    }),
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
    console.log("  assets: thumbnail 600×600 JPEG");
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
  await putGumroadDescriptionAsync(productId, spec.descriptionHtml, dryRun, slug);
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

  const priceUsd = spec.priceUsd ?? PRICE_USD;
  console.log(`  create: ${spec.name} @ $${priceUsd}`);
  if (dryRun) {
    console.log("  would create product + upload assets");
    return;
  }

  const product = await createGumroadProduct({
    token,
    name: spec.name,
    priceCents: priceUsd * 100,
    description: finalizeLanguageDescription(slug, spec.descriptionHtml),
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
        if (args.copyOnly) return Boolean(catalog.products[slug].gumroadProductId) && Boolean(SPECS[slug]);
        if (args.force) return true;
        if (args.assetsOnly) {
          return catalog.products[slug].gumroadProductId && !catalog.products[slug].apkgUploadedAt;
        }
        return !catalog.products[slug].gumroadProductId;
      });

  if (allSlugs.length === 0) {
    console.log(
      args.copyOnly
        ? "No language products with Gumroad IDs to update copy for."
        : args.assetsOnly
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

    if (args.copyOnly) {
      if (!record.gumroadProductId) throw new Error(`${slug}: gumroadProductId missing`);
      const spec = SPECS[slug];
      console.log("  copy-only: name + description + summary");
      if (!args.dryRun) {
        runGumroad(
          `products update ${record.gumroadProductId} --name "${spec.name.replace(/"/g, '\\"')}"`,
          { dryRun: false },
        );
      }
      await putGumroadDescriptionAsync(
        record.gumroadProductId,
        spec.descriptionHtml,
        args.dryRun,
        slug,
      );
      if (!args.dryRun) {
        const token = resolveGumroadToken();
        const summaryRes = await fetch(`https://api.gumroad.com/v2/products/${record.gumroadProductId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ custom_summary: spec.summary }),
        });
        const summaryPayload = await summaryRes.json();
        if (!summaryRes.ok || !summaryPayload.success) {
          console.warn(`  summary warning: ${JSON.stringify(summaryPayload).slice(0, 160)}`);
        }
        runGumroad(`products publish ${record.gumroadProductId}`, { dryRun: false });
      }
      continue;
    }

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
