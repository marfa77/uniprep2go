import { getFunnelStats } from "@/lib/funnel-store";
import { shouldReturnStats, toTelegramStatsMessage } from "@/lib/telegram-stats";

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

  if (!chatId || !text || !shouldReturnStats(text)) {
    return Response.json({ ok: true });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    console.warn("[telegram_stats] TELEGRAM_BOT_TOKEN is not configured");
    return Response.json({ ok: false, error: "TELEGRAM_BOT_TOKEN is not configured" }, { status: 500 });
  }

  const message = toTelegramStatsMessage(await getFunnelStats());
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[telegram_stats] sendMessage failed", errorText);
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
