import { after } from "next/server";
import { clearAdminBotHistory, customReport, handleAdminBotMessage, type AdminBotMessage } from "@/lib/admin-bot/agent";
import { loadSettings, type BotSettings, type ReportKey } from "@/lib/admin-bot/settings";
import { send } from "@/lib/admin-bot/telegram";
import { syncAllCheckoutPrices } from "@/lib/checkout-pricing";
import { getFunnelStats, resetAllFunnelStats, resetFunnelStats } from "@/lib/funnel-store";
import { formatCentsUsd, markPartnerPaid } from "@/lib/partner-ledger";
import {
  parsePartnerPaidCommand,
  parsePartnerPayoutMonth,
  sendPartnerDigests,
  shouldPartnerDigest,
  shouldPartnerPaid,
  shouldPartnerPayoutReport,
  toPartnerPayoutReportMessage,
} from "@/lib/partner-telegram";
import { getPartnerById } from "@/lib/partners";
import { rememberTelegramNotifyChatId } from "@/lib/telegram-notify";
import {
  shouldResetStats,
  shouldResetAllStats,
  shouldReturnStats,
  shouldSyncPrices,
  toTelegramResetMessage,
  toTelegramResetAllMessage,
  toTelegramStatsMessages,
  toTelegramSyncMessage,
} from "@/lib/telegram-stats";
import { sendTelegramMessage } from "@/lib/telegram-client";

export const maxDuration = 300;

type TelegramUpdate = {
  message?: AdminBotMessage & {
    chat?: {
      id?: number | string;
    };
  };
};

const ADMIN_HELP = [
  "Пиши или говори голосом обычным языком — отвечу по данным UniPrep2Go (воронка, клики, партнёры, каталог), дам рекомендации по росту и продажам.",
  "Можно попросить поменять вид отчёта (например «сделай /stats короче, сначала клики в Gumroad») или запомнить цель — бот сохранит.",
  "",
  "Команды:",
  "/stats — отчёт воронки (/stats default — стандартный вид, даже если задан свой)",
  "/sync — синхронизировать цены с checkout",
  "/partner_digest — разослать дайджесты партнёрам",
  "/partner_payouts [YYYY-MM] [default] — отчёт по выплатам",
  "/partner_paid <partnerId> <YYYY-MM> <reference> — отметить выплату",
  "/reset-stats, /reset-all-stats — сбросить статистику",
  "/new — очистить контекст диалога с ассистентом",
].join("\n");

function isAdminChat(chatId: number | string) {
  const allowed = process.env.TELEGRAM_CHAT_ID?.trim();
  return Boolean(allowed) && String(chatId) === allowed;
}

async function handleAdminMessage(chatId: number | string, message: AdminBotMessage) {
  const key = String(chatId);
  const command = (message.text ?? "").trim().split(/\s+/)[0]?.toLowerCase().split("@")[0];

  if (command === "/new") {
    await clearAdminBotHistory(key);
    await sendTelegramMessage(chatId, "Контекст диалога очищен.");
    return;
  }

  if (command === "/help" || command === "/start") {
    await sendTelegramMessage(chatId, ADMIN_HELP);
    return;
  }

  after(() => handleAdminBotMessage(key, message));
}

async function standardReport(report: ReportKey, month: string): Promise<string[]> {
  return report === "stats"
    ? toTelegramStatsMessages(await getFunnelStats())
    : [await toPartnerPayoutReportMessage(month)];
}

async function sendCustomReport(chatId: number | string, report: ReportKey, settings: BotSettings, month: string) {
  try {
    const text = await customReport(report, settings, month);
    if (text) {
      await send(chatId, text);
      return;
    }
  } catch (error) {
    console.error(`[telegram] custom /${report} failed`, error);
    await sendTelegramMessage(
      chatId,
      `⚠️ Свой формат /${report} не собрался (${error instanceof Error ? error.message.slice(0, 200) : "unknown error"}) — показываю стандартный.`,
    );
  }
  for (const message of await standardReport(report, month)) {
    await sendTelegramMessage(chatId, message);
  }
}

export async function POST(request: Request) {
  const update = (await request.json()) as TelegramUpdate;
  const message = update.message;
  const chatId = message?.chat?.id;
  const text = message?.text;

  if (!message || !chatId) {
    return Response.json({ ok: true });
  }

  if (!text) {
    if (isAdminChat(chatId)) {
      await handleAdminMessage(chatId, message);
    }
    return Response.json({ ok: true });
  }

  const builtIn = /\sdefault$/i.test(text.trim());
  const wantsStats = shouldReturnStats(text) || /^\/stats(@mariccol_bot)?\s+default$/i.test(text.trim());
  const wantsReset = shouldResetStats(text);
  const wantsResetAll = shouldResetAllStats(text);
  const wantsSync = shouldSyncPrices(text);
  const wantsPartnerDigest = shouldPartnerDigest(text);
  const wantsPartnerPayouts = shouldPartnerPayoutReport(text);
  const wantsPartnerPaid = shouldPartnerPaid(text);

  if (
    !wantsStats &&
    !wantsReset &&
    !wantsResetAll &&
    !wantsSync &&
    !wantsPartnerDigest &&
    !wantsPartnerPayouts &&
    !wantsPartnerPaid
  ) {
    if (isAdminChat(chatId)) {
      await handleAdminMessage(chatId, message);
    }
    return Response.json({ ok: true });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    console.warn("[telegram] TELEGRAM_BOT_TOKEN is not configured");
    return Response.json({ ok: false, error: "TELEGRAM_BOT_TOKEN is not configured" }, { status: 500 });
  }

  await rememberTelegramNotifyChatId(chatId);

  const report: ReportKey | null = wantsStats ? "stats" : wantsPartnerPayouts ? "partner_payouts" : null;
  if (report && !builtIn && isAdminChat(chatId)) {
    const settings = await loadSettings().catch(() => null);
    if (settings?.reports[report]) {
      await sendTelegramMessage(chatId, `⏳ Собираю /${report} в твоём формате…`);
      after(() => sendCustomReport(chatId, report, settings, parsePartnerPayoutMonth(text)));
      return Response.json({ ok: true });
    }
  }

  if (wantsPartnerDigest) {
    after(async () => {
      try {
        const results = await sendPartnerDigests();
        const summary =
          results.length === 0
            ? "No active partners with telegramChatId."
            : `Partner digests: ${results.filter((r) => r.sent).length}/${results.length} sent.`;
        await sendTelegramMessage(chatId, summary);
      } catch (error) {
        await sendTelegramMessage(
          chatId,
          `Partner digest failed: ${error instanceof Error ? error.message : "unknown error"}`,
        );
      }
    });
    return Response.json({ ok: true });
  }

  if (wantsPartnerPayouts) {
    const month = parsePartnerPayoutMonth(text);
    const message = await toPartnerPayoutReportMessage(month);
    const sent = await sendTelegramMessage(chatId, message);
    return Response.json({ ok: sent });
  }

  if (wantsPartnerPaid) {
    const parsed = parsePartnerPaidCommand(text);
    if (!parsed) {
      await sendTelegramMessage(
        chatId,
        "Usage: /partner_paid <partnerId> <YYYY-MM> <reference>",
      );
      return Response.json({ ok: true });
    }
    if (!getPartnerById(parsed.partnerId)) {
      await sendTelegramMessage(chatId, `Unknown partnerId: ${parsed.partnerId}`);
      return Response.json({ ok: true });
    }
    const payout = await markPartnerPaid(parsed);
    if (!payout) {
      await sendTelegramMessage(chatId, `Nothing to pay for ${parsed.partnerId} (${parsed.month}).`);
      return Response.json({ ok: true });
    }
    const partner = getPartnerById(parsed.partnerId);
    const notice = [
      `Marked paid: ${partner?.displayName ?? parsed.partnerId}`,
      `Amount: ${formatCentsUsd(payout.amountCents)}`,
      `Month: ${payout.month}`,
      `Ref: ${payout.reference}`,
    ].join("\n");
    await sendTelegramMessage(chatId, notice);
    if (partner?.telegramChatId?.trim()) {
      await sendTelegramMessage(
        partner.telegramChatId.trim(),
        `UniPrep payout sent: ${formatCentsUsd(payout.amountCents)} for ${payout.month}. Ref: ${payout.reference}`,
      );
    }
    return Response.json({ ok: true });
  }

  if (wantsSync) {
    await sendTelegramMessage(chatId, "Syncing checkout prices...");

    after(async () => {
      try {
        const result = await syncAllCheckoutPrices();
        await sendTelegramMessage(chatId, toTelegramSyncMessage(result));
      } catch (error) {
        console.error("[telegram_sync] price sync failed", error);
        await sendTelegramMessage(
          chatId,
          `Price sync failed: ${error instanceof Error ? error.message : "unknown error"}`,
        );
      }
    });

    return Response.json({ ok: true });
  }

  if (wantsResetAll) {
    await resetAllFunnelStats();
  } else if (wantsReset) {
    await resetFunnelStats();
  }

  const messages = wantsResetAll
    ? [toTelegramResetAllMessage()]
    : wantsReset
      ? [toTelegramResetMessage()]
      : toTelegramStatsMessages(await getFunnelStats());

  for (const message of messages) {
    const sent = await sendTelegramMessage(chatId, message);

    if (!sent) {
      return Response.json({ ok: false }, { status: 502 });
    }
  }

  return Response.json({ ok: true });
}
