import { after } from "next/server";
import { syncAllCheckoutPrices } from "@/lib/checkout-pricing";
import { getFunnelStats, resetAllFunnelStats, resetFunnelStats } from "@/lib/funnel-store";
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

type TelegramUpdate = {
  message?: {
    chat?: {
      id?: number | string;
    };
    text?: string;
  };
};

export async function POST(request: Request) {
  const update = (await request.json()) as TelegramUpdate;
  const chatId = update.message?.chat?.id;
  const text = update.message?.text;

  if (!chatId || !text) {
    return Response.json({ ok: true });
  }

  const wantsStats = shouldReturnStats(text);
  const wantsReset = shouldResetStats(text);
  const wantsResetAll = shouldResetAllStats(text);
  const wantsSync = shouldSyncPrices(text);

  if (!wantsStats && !wantsReset && !wantsResetAll && !wantsSync) {
    return Response.json({ ok: true });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    console.warn("[telegram] TELEGRAM_BOT_TOKEN is not configured");
    return Response.json({ ok: false, error: "TELEGRAM_BOT_TOKEN is not configured" }, { status: 500 });
  }

  await rememberTelegramNotifyChatId(chatId);

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
