import type { FunnelEvent } from "./analytics";
import type { AvailableDeck, CatalogAvailableDeck } from "./decks";
import { formatDeckPriceLabel } from "./checkout-pricing";
import {
  mockSessionModeLabel,
  parseMockSessionModeFromSource,
} from "./mock-exams/session-mode";
import type { MockExamConfig } from "./mock-exams/types";
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

export function toMockStartedMessage(event: FunnelEvent, mock?: MockExamConfig) {
  const mockTitle = mock?.title ?? event.source?.replace(/^mock:/, "") ?? "unknown mock";
  const mockSlug = mock?.slug ?? event.source?.match(/^mock:([^:]+)/)?.[1] ?? "unknown";
  const linkedDeck = mock?.linkedDeckSlug ?? event.deckSlug;
  const mode = parseMockSessionModeFromSource(event.source);
  const modeLabel = mode ? mockSessionModeLabel(mode) : "unknown";

  return [
    `UniPrep2Go mock started · ${modeLabel}`,
    "",
    `Mock: ${mockTitle}`,
    `Mock slug: ${mockSlug}`,
    `Mode: ${modeLabel}`,
    `Access: ${mockStartAccessLabel(event.source)}`,
    `Linked deck: ${linkedDeck}`,
    `Source: ${event.source ?? "unknown"}`,
    `Path: ${event.path ?? "n/a"}`,
    `Country: ${event.country ?? "n/a"}`,
    `Region: ${event.region ?? "n/a"}`,
    `City: ${event.city ?? "n/a"}`,
    `Browser language: ${event.browserLanguage ?? event.acceptLanguage ?? "n/a"}`,
    `Screen: ${event.screen ?? "n/a"}`,
    `Referrer: ${event.referrer ?? "direct"}`,
    `IP: ${event.clientIp ?? "n/a"}`,
    `User agent: ${event.userAgent ?? "n/a"}`,
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

export async function notifyMockStarted(event: FunnelEvent, mock?: MockExamConfig) {
  const chatId = await getTelegramNotifyChatId();

  if (!chatId) {
    console.warn("[telegram_notify] no chat id configured; send /stats once or set TELEGRAM_CHAT_ID");
    return false;
  }

  return sendTelegramMessage(chatId, toMockStartedMessage(event, mock));
}

export function toDeckWaitlistMessage(
  event: FunnelEvent,
  deck?: AvailableDeck | CatalogAvailableDeck | { slug: string; title: string; status?: string },
  email?: string,
) {
  return [
    "UniPrep2Go deck waitlist request",
    "",
    `Deck: ${deck?.title ?? event.deckSlug}`,
    `Slug: ${event.deckSlug}`,
    `Email: ${email ?? "n/a"}`,
    `Status: ${deck && "status" in deck ? deck.status : "planned"}`,
    `Source: ${event.source ?? "unknown"}`,
    `Path: ${event.path ?? "n/a"}`,
    `Country: ${event.country ?? "n/a"}`,
    `Region: ${event.region ?? "n/a"}`,
    `City: ${event.city ?? "n/a"}`,
    `Browser language: ${event.browserLanguage ?? event.acceptLanguage ?? "n/a"}`,
    `Referrer: ${event.referrer ?? "direct"}`,
    `IP: ${event.clientIp ?? "n/a"}`,
    `User agent: ${event.userAgent ?? "n/a"}`,
    `Time: ${event.occurredAt}`,
  ].join("\n");
}

export function toMockInterestMessage(event: FunnelEvent, mock?: MockExamConfig, email?: string) {
  return [
    "UniPrep2Go mock interest",
    "",
    `Mock: ${mock?.title ?? event.source ?? "unknown"}`,
    `Mock slug: ${mock?.slug ?? "unknown"}`,
    `Linked deck: ${mock?.linkedDeckSlug ?? event.deckSlug}`,
    `Email: ${email ?? "n/a"}`,
    `Source: ${event.source ?? "unknown"}`,
    `Path: ${event.path ?? "n/a"}`,
    `Country: ${event.country ?? "n/a"}`,
    `Region: ${event.region ?? "n/a"}`,
    `City: ${event.city ?? "n/a"}`,
    `Browser language: ${event.browserLanguage ?? event.acceptLanguage ?? "n/a"}`,
    `Referrer: ${event.referrer ?? "direct"}`,
    `Time: ${event.occurredAt}`,
  ].join("\n");
}

export async function notifyDeckWaitlistInterest(
  event: FunnelEvent,
  deck?: AvailableDeck | CatalogAvailableDeck | { slug: string; title: string; status?: string },
  email?: string,
) {
  const chatId = await getTelegramNotifyChatId();

  if (!chatId) {
    console.warn("[telegram_notify] no chat id configured; send /stats once or set TELEGRAM_CHAT_ID");
    return false;
  }

  return sendTelegramMessage(chatId, toDeckWaitlistMessage(event, deck, email));
}

export async function notifyMockInterest(event: FunnelEvent, mock?: MockExamConfig, email?: string) {
  const chatId = await getTelegramNotifyChatId();

  if (!chatId) {
    console.warn("[telegram_notify] no chat id configured; send /stats once or set TELEGRAM_CHAT_ID");
    return false;
  }

  return sendTelegramMessage(chatId, toMockInterestMessage(event, mock, email));
}

function mockSlugFromSource(source?: string) {
  return source?.match(/^mock:([^:]+)/)?.[1];
}

export function mockStartAccessLabel(source?: string) {
  if (!source) return "n/a";
  if (/:start:(exam|learn):free\b/.test(source)) return "free first mock";
  if (/:start:(exam|learn):paid\b/.test(source)) return "Mock Pass attempt";
  return "open (paywall off)";
}

export function toMockPassCheckoutClickMessage(event: FunnelEvent, mock?: MockExamConfig) {
  const placement = event.source?.match(/:pass:checkout:([a-z]+)/)?.[1] ?? "n/a";
  return [
    "💳 UniPrep2Go Mock Pass — pay click ($5 / 5 attempts)",
    "",
    `Mock: ${mock?.title ?? "n/a"}`,
    `Mock slug: ${mock?.slug ?? mockSlugFromSource(event.source) ?? "n/a"}`,
    `Paywall: ${placement === "retake" ? "results → retake" : placement === "landing" ? "mock landing" : placement}`,
    `Linked deck: ${mock?.linkedDeckSlug ?? event.deckSlug}`,
    `Destination: ${event.destinationUrl ?? "n/a"}`,
    `Country: ${event.country ?? "n/a"}`,
    `Region: ${event.region ?? "n/a"}`,
    `City: ${event.city ?? "n/a"}`,
    `Browser language: ${event.browserLanguage ?? event.acceptLanguage ?? "n/a"}`,
    `Referrer: ${event.referrer ?? "direct"}`,
    `Visitor: ${event.visitorId ?? "n/a"}`,
    `Time: ${event.occurredAt}`,
  ].join("\n");
}

export function toMockPassRedeemMessage(event: FunnelEvent, mock?: MockExamConfig) {
  const kind = event.source?.includes(":redeem:new") ? "new key" : "existing key (another device)";
  const left = event.source?.match(/:left:(\d+)/)?.[1] ?? "n/a";
  return [
    "✅ UniPrep2Go Mock Pass unlocked",
    "",
    `Key: ${kind}`,
    `Attempts left: ${left}`,
    `Mock: ${mock?.title ?? "n/a"}`,
    `Mock slug: ${mock?.slug ?? mockSlugFromSource(event.source) ?? "n/a"}`,
    `Country: ${event.country ?? "n/a"}`,
    `Visitor: ${event.visitorId ?? "n/a"}`,
    `Time: ${event.occurredAt}`,
  ].join("\n");
}

async function notify(text: string) {
  const chatId = await getTelegramNotifyChatId();
  if (!chatId) {
    console.warn("[telegram_notify] no chat id configured; send /stats once or set TELEGRAM_CHAT_ID");
    return false;
  }
  return sendTelegramMessage(chatId, text);
}

export async function notifyMockPassCheckoutClick(event: FunnelEvent, mock?: MockExamConfig) {
  return notify(toMockPassCheckoutClickMessage(event, mock));
}

export async function notifyMockPassRedeem(event: FunnelEvent, mock?: MockExamConfig) {
  return notify(toMockPassRedeemMessage(event, mock));
}
