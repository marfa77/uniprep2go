/**
 * Admin-bot settings Pavel can change by talking to the bot: custom report formats for slash commands and notes
 * (goals, priorities, preferences). Stored in Redis without TTL.
 */

import { getRedisClient } from "@/lib/redis";
import type { FunctionDecl } from "./gemini";

export const REPORTS = {
  stats: "/stats — отчёт воронки: пульс, сегодня/вчера, 7 дней, топ страниц, источники, страны, Threads, конверсии",
  partner_payouts: "/partner_payouts — отчёт по выплатам партнёрам за месяц",
} as const;

export type ReportKey = keyof typeof REPORTS;

export type BotSettings = {
  reports: Partial<Record<ReportKey, { format: string; updatedAt: string }>>;
  notes: Array<{ text: string; at: string }>;
};

const SETTINGS_KEY = "admin-bot:settings";
const MAX_NOTES = 40;
const MAX_FORMAT_CHARS = 4000;
const MAX_NOTE_CHARS = 600;

type GlobalWithSettings = typeof globalThis & { __uniprep2goAdminBotSettings?: BotSettings };

export function isReportKey(value: unknown): value is ReportKey {
  return typeof value === "string" && value in REPORTS;
}

export async function loadSettings(): Promise<BotSettings> {
  const client = getRedisClient();
  const value = client
    ? ((await client.get<Partial<BotSettings>>(SETTINGS_KEY)) ?? {})
    : ((globalThis as GlobalWithSettings).__uniprep2goAdminBotSettings ?? {});
  return { reports: value.reports ?? {}, notes: Array.isArray(value.notes) ? value.notes : [] };
}

async function saveSettings(settings: BotSettings): Promise<void> {
  const client = getRedisClient();
  if (!client) {
    (globalThis as GlobalWithSettings).__uniprep2goAdminBotSettings = settings;
    return;
  }
  await client.set(SETTINGS_KEY, settings);
}

const REPORT_ENUM = { type: "string", enum: Object.keys(REPORTS) };

export const SETTINGS_FUNCTIONS: FunctionDecl[] = [
  {
    name: "set_report_format",
    description:
      "Сохранить свой формат отчёта команды бота. Дальше команда собирается моделью по этому формату (данные — стандартный отчёт + любые твои инструменты). Передавай ПОЛНУЮ спецификацию: секции и их порядок, метрики, периоды и сравнения, что убрать, стиль и длину — с учётом прошлого формата, если Павел просит точечную правку.",
    parameters: {
      type: "object",
      properties: {
        report: REPORT_ENUM,
        format: { type: "string", description: "Спецификация формата, до 4000 символов" },
      },
      required: ["report", "format"],
    },
  },
  {
    name: "reset_report_format",
    description: "Вернуть стандартный (зашитый в код) формат отчёта команды.",
    parameters: { type: "object", properties: { report: REPORT_ENUM }, required: ["report"] },
  },
  {
    name: "remember",
    description:
      "Запомнить надолго: цель, приоритет, решение, предпочтение Павла или важный факт о бизнесе, которого нет в данных. Попадает в контекст каждого ответа.",
    parameters: { type: "object", properties: { text: { type: "string" } }, required: ["text"] },
  },
  {
    name: "forget",
    description: "Удалить заметку по номеру (нумерация как в списке заметок в контексте, с 1).",
    parameters: { type: "object", properties: { index: { type: "integer" } }, required: ["index"] },
  },
];

export async function runSettingsTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  if (!SETTINGS_FUNCTIONS.some((f) => f.name === name)) return undefined;
  const settings = await loadSettings();
  const now = new Date().toISOString();

  if (name === "set_report_format" || name === "reset_report_format") {
    if (!isReportKey(args.report)) throw new Error(`unknown report: ${String(args.report)}`);
    if (name === "reset_report_format") {
      delete settings.reports[args.report];
    } else {
      const format = typeof args.format === "string" ? args.format.trim() : "";
      if (!format) throw new Error("format required");
      settings.reports[args.report] = { format: format.slice(0, MAX_FORMAT_CHARS), updatedAt: now };
    }
    await saveSettings(settings);
    return { ok: true, report: args.report, custom: Boolean(settings.reports[args.report]), tryIt: `/${args.report}` };
  }

  if (name === "remember") {
    const text = typeof args.text === "string" ? args.text.trim() : "";
    if (!text) throw new Error("text required");
    settings.notes = [...settings.notes, { text: text.slice(0, MAX_NOTE_CHARS), at: now }].slice(-MAX_NOTES);
    await saveSettings(settings);
    return { ok: true, notes: settings.notes.length };
  }

  const index = Number(args.index);
  if (!Number.isInteger(index) || index < 1 || index > settings.notes.length) throw new Error(`no note #${String(args.index)}`);
  const [removed] = settings.notes.splice(index - 1, 1);
  await saveSettings(settings);
  return { ok: true, removed: removed?.text };
}

export function settingsPrompt(settings: BotSettings): string {
  const formats = (Object.keys(REPORTS) as ReportKey[]).map((key) => {
    const custom = settings.reports[key];
    return custom
      ? `${REPORTS[key]}\n  СВОЙ ФОРМАТ (с ${custom.updatedAt.slice(0, 10)}): ${custom.format}`
      : `${REPORTS[key]} — стандартный формат`;
  });
  const notes = settings.notes.length
    ? settings.notes.map((n, i) => `${i + 1}. ${n.text} (${n.at.slice(0, 10)})`).join("\n")
    : "пока нет";
  return `Отчёты команд:\n${formats.join("\n")}\n\nЗаметки Павла (цели, решения, предпочтения — учитывай всегда):\n${notes}`;
}
