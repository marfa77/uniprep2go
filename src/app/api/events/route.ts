import { parseFunnelEvent } from "@/lib/analytics";
import { getPricedDeckBySlug } from "@/lib/checkout-pricing";
import { getCatalogDeckBySlug } from "@/lib/decks";
import { shouldRecordFunnelEvent } from "@/lib/funnel-filter";
import { recordFunnelEvent } from "@/lib/funnel-store";
import { getMockExamConfig } from "@/lib/mock-exams/configs";
import { isAgentUserAgent } from "@/lib/mock-exams/miss-cohort";
import { recordUniqueMockStart } from "@/lib/mock-exams/mock-start-count-store";
import { parseMockSlugFromSource } from "@/lib/mock-exams/session-mode";
import {
  notifyCheckoutClick,
  notifyMockPassCheckoutClick,
  notifyMockPassRedeem,
  notifyMockStarted,
} from "@/lib/telegram-notify";

function firstForwardedIp(value: string | null) {
  return value?.split(",")[0]?.trim() || undefined;
}

async function parseEventPayload(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return request.json();
  }

  const text = await request.text();

  if (!text) {
    throw new Error("Funnel event payload is empty");
  }

  return JSON.parse(text) as unknown;
}

export async function POST(request: Request) {
  try {
    const payload = await parseEventPayload(request);
    const event = parseFunnelEvent({
      ...payload,
      acceptLanguage: request.headers.get("accept-language") ?? undefined,
      country: request.headers.get("x-vercel-ip-country") ?? undefined,
      region: request.headers.get("x-vercel-ip-country-region") ?? undefined,
      city: request.headers.get("x-vercel-ip-city") ?? undefined,
      clientIp:
        firstForwardedIp(request.headers.get("x-forwarded-for")) ??
        request.headers.get("x-real-ip") ??
        undefined,
      userAgent: request.headers.get("user-agent") ?? undefined,
    });

    if (event.name === "checkout_click") {
      const deck =
        (await getPricedDeckBySlug(event.deckSlug)) ?? getCatalogDeckBySlug(event.deckSlug);

      try {
        const sent = await notifyCheckoutClick(event, deck);

        if (!sent) {
          console.warn("[telegram_notify] checkout alert not sent", {
            deckSlug: event.deckSlug,
            source: event.source,
          });
        }
      } catch (error) {
        console.error("[telegram_notify] checkout alert failed", error);
      }
    }

    if (event.name === "mock_started") {
      const mockSlug = event.source?.match(/^mock:([^:]+)/)?.[1];
      const mock = mockSlug ? getMockExamConfig(mockSlug) : undefined;

      try {
        const sent = await notifyMockStarted(event, mock);

        if (!sent) {
          console.warn("[telegram_notify] mock started alert not sent", {
            deckSlug: event.deckSlug,
            source: event.source,
          });
        }
      } catch (error) {
        console.error("[telegram_notify] mock started alert failed", error);
      }
    }

    if (event.name === "mock_pass_checkout_click" || event.name === "mock_pass_redeem_success") {
      const mockSlug = event.source?.match(/^mock:([^:]+)/)?.[1];
      const mock = mockSlug ? getMockExamConfig(mockSlug) : undefined;

      try {
        const sent =
          event.name === "mock_pass_checkout_click"
            ? await notifyMockPassCheckoutClick(event, mock)
            : await notifyMockPassRedeem(event, mock);
        if (!sent) {
          console.warn("[telegram_notify] mock pass alert not sent", {
            name: event.name,
            source: event.source,
          });
        }
      } catch (error) {
        console.error("[telegram_notify] mock pass alert failed", error);
      }
    }

    if (shouldRecordFunnelEvent(event, request)) {
      console.info("[funnel_event]", JSON.stringify(event));
      await recordFunnelEvent(event);
      if (
        event.name === "mock_started" &&
        !isAgentUserAgent(event.userAgent) &&
        event.visitorId
      ) {
        const startSlug = parseMockSlugFromSource(event.source);
        if (startSlug) {
          try {
            await recordUniqueMockStart({ slug: startSlug, visitorId: event.visitorId });
          } catch (error) {
            console.error("[mock_start_count] record failed", error);
          }
        }
      }
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid funnel event";

    return Response.json({ error: message }, { status: 400 });
  }
}
