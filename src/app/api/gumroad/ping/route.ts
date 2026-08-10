import { after } from "next/server";
import { recordPartnerSaleFromGumroad } from "@/lib/partner-ledger";
import { notifyPartnerSale, notifyFounderPartnerSale } from "@/lib/partner-telegram";

/**
 * Gumroad "Ping" webhook — form-urlencoded sale payload.
 * Configure product ping URL to https://uniprep2go.study/api/gumroad/ping
 */
export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  let body: Record<string, unknown> = {};

  try {
    if (contentType.includes("application/json")) {
      body = (await request.json()) as Record<string, unknown>;
    } else {
      const form = await request.formData();
      body = Object.fromEntries(form.entries());
    }
  } catch {
    return Response.json({ ok: false, error: "invalid body" }, { status: 400 });
  }

  const result = await recordPartnerSaleFromGumroad(body);

  if (!result.ok) {
    // Acknowledge non-partner products so Gumroad does not retry forever.
    return Response.json({ ok: true, ignored: true, reason: result.reason });
  }

  if (result.created) {
    after(async () => {
      await notifyPartnerSale(result.partner, result.sale);
      await notifyFounderPartnerSale(result.partner, result.sale);
    });
  }

  return Response.json({
    ok: true,
    created: result.created,
    saleId: result.sale.saleId,
    partnerId: result.partner.partnerId,
    authorShareCents: result.sale.authorShareCents,
  });
}
