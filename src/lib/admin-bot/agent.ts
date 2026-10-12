/**
 * Free-text admin assistant for @mariccol_bot: Gemini + read-only tools over UniPrep2Go funnel, partners and catalog.
 * Slash commands stay in src/app/api/telegram/route.ts; everything else lands here.
 */

import { decks } from "@/lib/decks";
import { getFunnelStats } from "@/lib/funnel-store";
import { formatCentsUsd, listPartnerPayouts, listPartnerSales } from "@/lib/partner-ledger";
import { toPartnerPayoutReportMessage } from "@/lib/partner-telegram";
import { getPartnerCatalog } from "@/lib/partners";
import { getRedisClient } from "@/lib/redis";
import { toTelegramStatsMessages } from "@/lib/telegram-stats";
import { agent, filePart, type Content, type FunctionDecl, type Part } from "./gemini";
import { BANKS_FUNCTION, KNOWLEDGE_FUNCTIONS, knowledgeIndex, runKnowledgeTool } from "./knowledge";
import {
  SETTINGS_FUNCTIONS,
  loadSettings,
  runSettingsTool,
  settingsPrompt,
  type BotSettings,
  type ReportKey,
} from "./settings";
import { downloadFile, escapeHtml, send, typing } from "./telegram";

export type AdminBotMessage = {
  text?: string;
  caption?: string;
  voice?: { file_id: string; mime_type?: string };
  audio?: { file_id: string; mime_type?: string };
  photo?: Array<{ file_id: string; width: number; height: number }>;
};

const HISTORY_TURNS = 12;
const MAX_TOOL_CHARS = 30_000;

const FUNCTIONS: FunctionDecl[] = [
  {
    name: "funnel_stats",
    description:
      "Полный отчёт воронки (то же, что /stats): пульс, сегодня/вчера, 7 дней с динамикой, топ страниц, источники, страны, Threads, конверсии в checkout и Gumroad.",
    parameters: { type: "object", properties: {} },
  },
  {
    name: "recent_events",
    description:
      "Последние (до 100) событий воронки с деталями: тип события, колода, путь, источник, реферер, страна, время. Для вопросов «кто только что…», «откуда пришёл клик».",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string", description: "Тип события, например page_view, checkout_intent, gumroad_click" },
        deck_slug: { type: "string" },
        path_contains: { type: "string" },
        country: { type: "string", description: "Код страны, например US" },
        limit: { type: "integer", description: "1–100, по умолчанию 30" },
      },
    },
  },
  {
    name: "partner_report",
    description: "Отчёт по партнёрам-авторам за месяц: продажи, доля автора, начислено и не выплачено, можно ли платить.",
    parameters: {
      type: "object",
      properties: { month: { type: "string", description: "YYYY-MM, по умолчанию текущий месяц UTC" } },
    },
  },
  {
    name: "partner_sales",
    description:
      "Продажи колод партнёров из Gumroad (только колоды с партнёром-автором; остальные продажи Gumroad здесь не хранятся) и выплаты.",
    parameters: {
      type: "object",
      properties: {
        month: { type: "string", description: "YYYY-MM; без него — все" },
        partner_id: { type: "string" },
      },
    },
  },
  {
    name: "gumroad_sales",
    description:
      "Реальные продажи из Gumroad API за период: число, gross, комиссия Gumroad, net, по продуктам, странам и реферерам, последние продажи. Аккаунт общий: колоды UniPrep2Go и Prep2Go, а также фото PixID.",
    parameters: {
      type: "object",
      properties: {
        since: { type: "string", description: "YYYY-MM-DD включительно" },
        until: { type: "string", description: "YYYY-MM-DD включительно, по умолчанию сегодня" },
        product_contains: { type: "string", description: "Подстрока в названии или permalink продукта" },
      },
      required: ["since"],
    },
  },
  {
    name: "deck_catalog",
    description: "Каталог колод: slug, название, статус (available/planned), категория, где продаётся. Партнёры и их колоды.",
    parameters: {
      type: "object",
      properties: {
        status: { type: "string", enum: ["available", "planned"] },
        search: { type: "string", description: "Подстрока в slug или названии" },
      },
    },
  },
];

function str(v: unknown): string | undefined {
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
}

const FUNNEL_TIMEOUT_MS = 120_000;

function funnelStats() {
  return Promise.race([
    getFunnelStats(),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("funnel stats timed out — попроси Павла запустить /stats")), FUNNEL_TIMEOUT_MS),
    ),
  ]);
}

type GumroadSale = {
  created_at: string;
  product_name: string;
  product_permalink?: string;
  price: number;
  gumroad_fee?: number;
  refunded?: boolean;
  chargedback?: boolean;
  country_iso2?: string;
  referrer?: string;
};

const MAX_GUMROAD_PAGES = 40;

function tally(map: Map<string, { n: number; cents: number }>, key: string, cents: number) {
  const row = map.get(key) ?? { n: 0, cents: 0 };
  row.n += 1;
  row.cents += cents;
  map.set(key, row);
}

function topOf(map: Map<string, { n: number; cents: number }>, limit: number) {
  return [...map.entries()]
    .sort((a, b) => b[1].cents - a[1].cents)
    .slice(0, limit)
    .map(([key, v]) => ({ key, sales: v.n, gross: formatCentsUsd(v.cents) }));
}

async function gumroadSales(args: Record<string, unknown>) {
  const token = process.env.GUMROAD_ACCESS_TOKEN?.trim();
  if (!token) return { error: "GUMROAD_ACCESS_TOKEN не настроен в Vercel — продажи Gumroad недоступны." };
  const since = str(args.since);
  if (!since) throw new Error("since required");
  const until = str(args.until) ?? new Date().toISOString().slice(0, 10);
  const filter = str(args.product_contains)?.toLowerCase();

  const sales: GumroadSale[] = [];
  let pageKey: string | undefined;
  let pages = 0;
  do {
    const url = new URL("https://api.gumroad.com/v2/sales");
    url.searchParams.set("after", since);
    url.searchParams.set("before", until);
    if (pageKey) url.searchParams.set("page_key", pageKey);
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    const data = (await res.json()) as { success?: boolean; message?: string; sales?: GumroadSale[]; next_page_key?: string };
    if (!data.success) throw new Error(`Gumroad: ${data.message ?? res.status}`);
    sales.push(...(data.sales ?? []));
    pageKey = data.next_page_key;
    pages += 1;
  } while (pageKey && pages < MAX_GUMROAD_PAGES);

  const picked = sales.filter(
    (s) =>
      !filter ||
      s.product_name.toLowerCase().includes(filter) ||
      (s.product_permalink ?? "").toLowerCase().includes(filter),
  );
  const paid = picked.filter((s) => !s.refunded && !s.chargedback);
  const byProduct = new Map<string, { n: number; cents: number }>();
  const byCountry = new Map<string, { n: number; cents: number }>();
  const byReferrer = new Map<string, { n: number; cents: number }>();
  for (const s of paid) {
    tally(byProduct, s.product_name, s.price);
    tally(byCountry, s.country_iso2 || "?", s.price);
    tally(byReferrer, s.referrer || "direct", s.price);
  }
  const gross = paid.reduce((sum, s) => sum + s.price, 0);
  const fees = paid.reduce((sum, s) => sum + (s.gumroad_fee ?? 0), 0);
  return {
    period: { since, until },
    truncated: Boolean(pageKey),
    sales: paid.length,
    refunded: picked.length - paid.length,
    gross: formatCentsUsd(gross),
    gumroadFees: formatCentsUsd(fees),
    net: formatCentsUsd(gross - fees),
    byProduct: topOf(byProduct, 25),
    byCountry: topOf(byCountry, 10),
    byReferrer: topOf(byReferrer, 10),
    latest: paid.slice(0, 15).map((s) => ({
      at: s.created_at,
      product: s.product_name,
      price: formatCentsUsd(s.price),
      country: s.country_iso2,
    })),
  };
}

async function runTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case "funnel_stats": {
      const stats = await funnelStats();
      return { storage: stats.storage, storageError: stats.storageError, report: toTelegramStatsMessages(stats).join("\n\n") };
    }
    case "recent_events": {
      const stats = await funnelStats();
      const eventName = str(args.name);
      const deckSlug = str(args.deck_slug);
      const path = str(args.path_contains);
      const country = str(args.country)?.toUpperCase();
      const limit = Math.min(Math.max(Number(args.limit) || 30, 1), 100);
      return stats.recentEvents
        .filter((e) => !eventName || e.name === eventName)
        .filter((e) => !deckSlug || e.deckSlug === deckSlug)
        .filter((e) => !path || e.path?.includes(path))
        .filter((e) => !country || e.country?.toUpperCase() === country)
        .slice(0, limit)
        .map((e) => ({
          at: e.occurredAt,
          name: e.name,
          deck: e.deckSlug,
          path: e.path,
          source: e.source,
          referrer: e.referrer,
          utm: [e.utmSource, e.utmMedium].filter(Boolean).join("/") || undefined,
          country: e.country,
          city: e.city,
          visitor: e.visitorId?.slice(0, 8),
          internal: e.internal || undefined,
        }));
    }
    case "partner_report":
      return { report: await toPartnerPayoutReportMessage(str(args.month) ?? new Date().toISOString().slice(0, 7)) };
    case "partner_sales": {
      const month = str(args.month);
      const partnerId = str(args.partner_id);
      const [sales, payouts] = await Promise.all([listPartnerSales(), listPartnerPayouts()]);
      const picked = sales
        .filter((s) => !month || s.soldAt.startsWith(month))
        .filter((s) => !partnerId || s.partnerId === partnerId);
      return {
        count: picked.length,
        gross: formatCentsUsd(picked.reduce((sum, s) => sum + s.grossCents, 0)),
        net: formatCentsUsd(picked.reduce((sum, s) => sum + s.netCents, 0)),
        sales: picked.slice(-50).map((s) => ({
          at: s.soldAt,
          deck: s.deckSlug,
          partner: s.partnerId,
          gross: formatCentsUsd(s.grossCents),
          net: formatCentsUsd(s.netCents),
          author: formatCentsUsd(s.authorShareCents),
        })),
        payouts: payouts.filter((p) => !partnerId || p.partnerId === partnerId).slice(-20),
      };
    }
    case "gumroad_sales":
      return gumroadSales(args);
    case "deck_catalog": {
      const status = str(args.status);
      const search = str(args.search)?.toLowerCase();
      const rows = decks
        .filter((d) => !status || d.status === status)
        .filter((d) => !search || d.slug.toLowerCase().includes(search) || d.title.toLowerCase().includes(search))
        .map((d) => ({
          slug: d.slug,
          title: d.title,
          status: d.status,
          category: d.category,
          checkout: d.status === "available" ? d.checkoutProvider : undefined,
        }));
      const catalog = getPartnerCatalog();
      return {
        total: rows.length,
        decks: rows.slice(0, 200),
        partners: catalog.partners.map((p) => ({
          id: p.partnerId,
          name: p.displayName,
          status: p.status ?? "active",
          decks: p.deckSlugs,
        })),
      };
    }
    default: {
      const result = runKnowledgeTool(name, args) ?? (await runSettingsTool(name, args));
      if (result === undefined) throw new Error(`unknown tool ${name}`);
      return result;
    }
  }
}

function capped(value: unknown): unknown {
  const json = JSON.stringify(value);
  if (!json || json.length <= MAX_TOOL_CHARS) return value;
  return { truncated: true, json: json.slice(0, MAX_TOOL_CHARS) };
}

const hasGumroad = () => Boolean(process.env.GUMROAD_ACCESS_TOKEN?.trim());

const MARKETER = `Ты growth-маркетолог уровня лучших команд B2C SaaS, edtech и маркетплейсов цифровых продуктов: SEO и AEO (цитирование в ChatGPT, Perplexity, Gemini), контент-маркетинг, комьюнити и соцсети (Threads, Reddit, профильные форумы и группы), партнёрства и авторы-партнёры, email/lifecycle, CRO лендингов и checkout, ценообразование и бандлы, unit-экономика.
Как ты даёшь рекомендации по трафику, привлечению и продажам:
- Сначала факты: сними цифры инструментами (трафик и источники, шаги воронки, продажи) и найди в базе знаний, что уже делали, что решили и какие правила действуют. Не предлагай то, что уже сделано, отвергнуто или запрещено правилами проекта, — сошлись на документ или коммит.
- Диагноз: где узкое место воронки (показы → визиты → вовлечение → checkout → оплата → повтор) и почему — с цифрами.
- 3–5 действий по приоритету ICE (эффект × уверенность / усилия). Для каждого: что именно сделать (страница, канал, текст, оффер, цена), ожидаемый эффект, метрика и когда проверить.
- Отделяй быстрые победы (на этой неделе) от ставок (месяц и больше). Предпочитай то, что агенты Cursor сделают в коде и контенте, и бесплатные каналы; платную рекламу предлагай только с расчётом окупаемости.
- Рынок, конкуренты, спрос и цены ищи в Google и давай со ссылками.
- Говори прямо, как сильный консультант: если идея слабая — скажи и предложи лучше.
- Когда действие требует правки сайта или кода, дай готовую задачу для агента Cursor (что, где, критерий готовности) — Павел её скопирует.`;

const SETTINGS_RULES = `Что ты можешь менять сам (только это; данные, сайт и код ты не меняешь):
- Формат отчётов команд бота — set_report_format / reset_report_format. Когда Павел просит изменить отчёт («сделай /stats короче», «добавь конверсию по колодам», «убери страны»), сохрани полную спецификацию нового формата с учётом текущего, коротко перескажи, что изменится, и предложи проверить командой. Свой формат может включать данные любых твоих инструментов. Вернуть стандартный — reset_report_format.
- Заметки — remember / forget: цели, приоритеты, решения, предпочтения Павла. Сохраняй, когда он просит запомнить, ставит цель или правило работы.`;

const CUSTOM_REPORT_RULES = `Сейчас ты не ведёшь диалог, а собираешь регулярный отчёт команды бота по сохранённому формату Павла.
- Строго следуй формату: секции, порядок, метрики, стиль.
- Цифры — только из переданных данных и инструментов, точные значения. Чего посчитать нельзя — пиши «нет данных».
- Только Telegram HTML (<b>, <i>, <code>, <pre>, <a href>), без <h1>–<h6>, <ul>, <li>, <br> и markdown. Без вступлений, пояснений о процессе и вопросов в конце.`;

function systemPrompt(settings: BotSettings): string {
  const now = new Date();
  const lisbon = now.toLocaleString("ru-RU", { timeZone: "Europe/Lisbon", dateStyle: "full", timeStyle: "short" });
  const money = hasGumroad()
    ? "Реальные оплаты — gumroad_sales (аккаунт Gumroad общий с Prep2Go и PixID: фото на паспорт PixID — это не UniPrep, отделяй их, когда считаешь выручку UniPrep2Go)."
    : "Реальных оплат Gumroad у тебя нет (кроме партнёрских колод) — о выручке говори, что её видно в Gumroad dashboard, а сам опирайся на клики gumroad_click в воронке.";
  return `Ты — аналитик, операционный помощник и growth-маркетолог Павла, основателя UniPrep2Go (uniprep2go.study). Пишешь ему в личный админ-бот @mariccol_bot.

О продукте: каталог Anki-колод и mock-экзаменов для профессиональных сертификаций и экзаменов (финансы, медицина, IT, строительство, гражданство и др.). Колоды продаются через Gumroad (часть — Lemon Squeezy / App Store). Есть партнёрская программа: авторы колод получают долю с продаж. Аналитика — собственная воронка событий в Redis (page_view → checkout_intent → gumroad_click и т. п.). Каналы: органика Google по длинному хвосту «<экзамен> practice test / anki deck», LLM-трафик, Threads, партнёры-авторы. Команда — Павел и AI-агенты Cursor. ${money}

Сейчас: ${lisbon} (Лиссабон). UTC: ${now.toISOString()}. Даты событий — UTC.

Правила:
- Цифры и факты о бизнесе — только из инструментов. Не угадывай. Если данных нет — так и скажи и предложи, где их взять (например, Gumroad dashboard).
- Для общей картины — funnel_stats; для конкретики — recent_events, partner_sales, partner_report, deck_catalog${hasGumroad() ? ", gumroad_sales" : ""}.
- Называй период, к которому относятся цифры. Делай короткий вывод: что растёт, что проседает, что сделать.
- Ты знаешь проект изнутри: правила работы агентов Cursor (.cursor/rules — стандарты качества, например mock-bank-audit-standard), AGENTS.md, документы и ledgers (bank-audit-ledger — какие банки доведены до стандарта и когда), историю коммитов и сводку банков вопросов. На вопросы «что делали / что обновили / какой стандарт / какие правила / статус банка или колоды» сначала используй search_knowledge, recent_changes, mock_banks, read_doc — и только потом говори, что данных нет. Ссылайся на документ или дату коммита.
- Внешние факты (экзамены, конкуренты, цены рынка) можно искать в Google и давать со ссылкой.
- Отвечай по-русски, коротко и по делу. Форматирование — только Telegram HTML: <b>, <i>, <code>, <pre>, <a href>, <blockquote>. Заголовки секций — <b>, списки — строки с «• » или «1.». Никаких <h1>–<h6>, <ul>, <li>, <br>, <p>, markdown (**, #, ---) и таблиц. Рекомендации и планы — плотно, без воды: лучше 4 сильных пункта, чем 10 общих.

${MARKETER}
Перед советами по росту загляни в стратегию проекта: docs/SEO_AUTOPILOT_STRATEGY.md, docs/SEO_WEEKLY_AUTOPILOT.md, docs/AEO.md, свежие docs/seo-weekly и docs/aeo-audits, docs/mock-bank-qa/competitor-aeo-ledger.md и правила .cursor/rules/seo-dual-track-top.mdc, gsc-crawled-not-indexed-strengthen.mdc, llm-visibility.mdc, competitor-aeo-cadence.mdc, threads-smart-agent-gpt-sol.mdc. Деньги UniPrep2Go — продажи колод и mock-экзаменов: смотри, какие колоды и экзамены дают визиты, checkout_intent и gumroad_click, где трафик есть, а кликов в оплату нет, и какие банки вопросов доведены до стандарта (mock_banks).

${SETTINGS_RULES}
Для действий подскажи команду: /sync (цены), /partner_paid <partnerId> <YYYY-MM> <reference>, /reset-stats.

${settingsPrompt(settings)}

Команды бота (работают без модели): /stats и /partner_payouts (с аргументом default — всегда стандартный вид), /sync, /partner_digest, /partner_paid, /reset-stats, /new — очистить контекст диалога.

База знаний. ${knowledgeIndex()}`;
}

type Turn = { role: "user" | "model"; text: string };

const historyKey = (chatId: string) => `admin-bot:history:${chatId}`;

type GlobalWithHistory = typeof globalThis & { __uniprep2goAdminBotHistory?: Map<string, Turn[]> };

function memoryHistory() {
  const g = globalThis as GlobalWithHistory;
  g.__uniprep2goAdminBotHistory ??= new Map();
  return g.__uniprep2goAdminBotHistory;
}

async function loadHistory(chatId: string): Promise<Turn[]> {
  const client = getRedisClient();
  if (!client) return memoryHistory().get(chatId) ?? [];
  const turns = await client.get<Turn[]>(historyKey(chatId));
  return Array.isArray(turns) ? turns : [];
}

async function saveHistory(chatId: string, turns: Turn[]): Promise<void> {
  const trimmed = turns.slice(-HISTORY_TURNS);
  const client = getRedisClient();
  if (!client) {
    memoryHistory().set(chatId, trimmed);
    return;
  }
  await client.set(historyKey(chatId), trimmed, { ex: 60 * 60 * 24 * 30 });
}

export async function clearAdminBotHistory(chatId: string): Promise<void> {
  await saveHistory(chatId, []);
}

async function userParts(msg: AdminBotMessage): Promise<{ parts: Part[]; logText: string } | null> {
  const text = (msg.text || msg.caption || "").trim();
  const audio = msg.voice || msg.audio;
  if (audio) {
    const buffer = await downloadFile(audio.file_id);
    return {
      parts: [{ text: "Голосовое сообщение Павла:" }, filePart(buffer, audio.mime_type || "audio/ogg")],
      logText: "🎤 голосовое",
    };
  }
  const largest = msg.photo?.at(-1);
  if (largest) {
    const buffer = await downloadFile(largest.file_id);
    return {
      parts: [{ text: text || "Что на скриншоте и что с этим делать?" }, filePart(buffer, "image/jpeg")],
      logText: `🖼 ${text}`.trim(),
    };
  }
  return text ? { parts: [{ text }], logText: text } : null;
}

async function onCall(name: string, args: Record<string, unknown>) {
  console.log(`[admin-bot] tool ${name} ${JSON.stringify(args)}`);
  return capped(await runTool(name, args));
}

function dataFunctions(): FunctionDecl[] {
  return [
    ...(hasGumroad() ? FUNCTIONS : FUNCTIONS.filter((f) => f.name !== "gumroad_sales")),
    ...KNOWLEDGE_FUNCTIONS,
    BANKS_FUNCTION,
  ];
}

export async function answerAdminBot(parts: Part[], history: Turn[] = []): Promise<string> {
  const contents: Content[] = history.map((t) => ({ role: t.role, parts: [{ text: t.text }] }));
  return agent({
    system: systemPrompt(await loadSettings()),
    history: contents,
    userParts: parts,
    functions: [...dataFunctions(), ...SETTINGS_FUNCTIONS],
    onCall,
  });
}

const MAX_REPORT_DATA_CHARS = 150_000;

async function standardReportData(report: ReportKey, arg?: string): Promise<unknown> {
  if (report === "partner_payouts") {
    const month = arg && /^\d{4}-\d{2}$/.test(arg) ? arg : new Date().toISOString().slice(0, 7);
    return { month, standardReport: await toPartnerPayoutReportMessage(month) };
  }
  const stats = await funnelStats();
  const { recentEvents, ...aggregates } = stats;
  return {
    standardReport: toTelegramStatsMessages(stats).join("\n\n"),
    aggregates,
    recentEvents: recentEvents.slice(0, 300),
  };
}

/** Report for a slash command in Pavel's saved format; null when the command uses the built-in format. */
export async function customReport(report: ReportKey, settings: BotSettings, arg?: string): Promise<string | null> {
  const format = settings.reports[report]?.format;
  if (!format) return null;
  const data = JSON.stringify(await standardReportData(report, arg)).slice(0, MAX_REPORT_DATA_CHARS);
  return agent({
    system: `${systemPrompt(settings)}\n\n${CUSTOM_REPORT_RULES}`,
    history: [],
    userParts: [{ text: `Собери отчёт /${report}.\n\nФормат:\n${format}\n\nДанные стандартного отчёта (JSON):\n${data}` }],
    functions: dataFunctions(),
    onCall,
  });
}

export async function handleAdminBotMessage(chatId: string, msg: AdminBotMessage): Promise<void> {
  const typingTimer = setInterval(() => void typing(chatId), 4500);
  try {
    await typing(chatId);
    const input = await userParts(msg);
    if (!input) return;
    const history = await loadHistory(chatId).catch(() => []);
    const answer = await answerAdminBot(input.parts, history);
    await send(chatId, answer);
    await saveHistory(chatId, [
      ...history,
      { role: "user", text: input.logText },
      { role: "model", text: answer.slice(0, 4000) },
    ]).catch((e) => console.error("[admin-bot] save history", e));
  } catch (e) {
    console.error("[admin-bot]", e);
    await send(chatId, `⚠️ Не получилось: ${escapeHtml(e instanceof Error ? e.message : String(e)).slice(0, 300)}`).catch(
      () => undefined,
    );
  } finally {
    clearInterval(typingTimer);
  }
}
