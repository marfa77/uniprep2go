import { parseFunnelEvent } from "@/lib/analytics";
import { recordFunnelEvent } from "@/lib/funnel-store";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const event = parseFunnelEvent({
      ...payload,
      userAgent: request.headers.get("user-agent") ?? undefined,
    });

    console.info("[funnel_event]", JSON.stringify(event));
    await recordFunnelEvent(event);

    return new Response(null, { status: 204 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid funnel event";

    return Response.json({ error: message }, { status: 400 });
  }
}
