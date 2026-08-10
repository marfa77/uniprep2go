import { after } from "next/server";
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
    return Response.json({ ok: true });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    console.warn("[telegram] TELEGRAM_BOT_TOKEN is not configured");
    return Response.json({ ok: false, error: "TELEGRAM_BOT_TOKEN is not configured" }, { status: 500 });
  }

  await rememberTelegramNotifyChatId(chatId);

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
