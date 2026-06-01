import type { FunnelEvent } from "./analytics";
import type { AvailableDeck, CatalogAvailableDeck } from "./decks";
import { formatDeckPriceLabel } from "./checkout-pricing";
import { getRedisClient } from "./redis";
import { sendTelegramMessage } from "./telegram-client";

const NOTIFY_CHAT_ID_KEY = "telegram:notifyChatId";

type GlobalWithNotifyChatId = typeof globalThis & {
  __uniprep2goTelegramNotifyChatId?: string;
};

function getMemoryNotifyChatId() {
  return (globalThis as GlobalWithNotifyChatId).__uniprep2goTelegramNotifyChatId;
}

function setMemoryNotifyChatId(chatId: string) {
  (globalThis as GlobalWithNotifyChatId).__uniprep2goTelegramNotifyChatId = chatId;
}

export async function rememberTelegramNotifyChatId(chatId: string | number) {
  const normalized = String(chatId);
  setMemoryNotifyChatId(normalized);

  const client = getRedisClient();

  if (!client) {
    return;
  }

  try {
    await client.set(NOTIFY_CHAT_ID_KEY, normalized);
  } catch (error) {
    console.error("[telegram_notify] failed to persist chat id", error);
  }
}

export async function getTelegramNotifyChatId() {
  const configured = process.env.TELEGRAM_CHAT_ID?.trim();

  if (configured) {
    return configured;
  }

  const client = getRedisClient();

  if (client) {
    try {
      const stored = await client.get<string>(NOTIFY_CHAT_ID_KEY);

      if (stored) {
        return stored;
      }
    } catch (error) {
      console.error("[telegram_notify] failed to read chat id", error);
    }
  }

  return getMemoryNotifyChatId();
}

export function toCheckoutClickMessage(event: FunnelEvent, deck?: AvailableDeck | CatalogAvailableDeck) {
  const provider = deck?.checkoutProvider ?? "Checkout";
  const title = deck?.title ?? event.deckSlug;
  const price =
    deck && "price" in deck && deck.price
      ? formatDeckPriceLabel(deck as AvailableDeck)
      : "n/a";
  const checkoutUrl = deck?.checkoutUrl ?? "n/a";

  return [
    "UniPrep2Go checkout click",
    "",
    `Deck: ${title}`,
    `Slug: ${event.deckSlug}`,
    `Provider: ${provider}`,
    `Price: ${price}`,
    `Source: ${event.source ?? "unknown"}`,
    `Path: ${event.path ?? "n/a"}`,
    `Destination: ${event.destinationUrl ?? checkoutUrl}`,
    `Country: ${event.country ?? "n/a"}`,
    `Region: ${event.region ?? "n/a"}`,
    `City: ${event.city ?? "n/a"}`,
    `Browser language: ${event.browserLanguage ?? event.acceptLanguage ?? "n/a"}`,
    `Referrer: ${event.referrer ?? "direct"}`,
    `Checkout: ${checkoutUrl}`,
    `Time: ${event.occurredAt}`,
  ].join("\n");
}

export async function notifyCheckoutClick(
  event: FunnelEvent,
  deck?: AvailableDeck | CatalogAvailableDeck,
) {
  const chatId = await getTelegramNotifyChatId();

  if (!chatId) {
    console.warn("[telegram_notify] no chat id configured; send /stats once or set TELEGRAM_CHAT_ID");
    return false;
  }

  return sendTelegramMessage(chatId, toCheckoutClickMessage(event, deck));
}
