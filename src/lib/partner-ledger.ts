import { getRedisClient } from "./redis";
import {
  computeSaleShares,
  getMinPayoutUsd,
  getPartnerById,
  getPartnerForDeckSlug,
  type PartnerRecord,
} from "./partners";

export type PartnerSaleRecord = {
  saleId: string;
  deckSlug: string;
  partnerId: string;
  productPermalink?: string;
  grossCents: number;
  gumroadFeeCents: number;
  netCents: number;
  authorShareCents: number;
  uniShareCents: number;
  currency: string;
  soldAt: string;
  emailDigest?: string;
};

export type PartnerPayoutRecord = {
  payoutId: string;
  partnerId: string;
  month: string;
  amountCents: number;
  currency: string;
  paidAt: string;
  reference: string;
  saleIds: string[];
};

const SALES_KEY = "partner:sales";
const SALE_IDS_KEY = "partner:saleIds";
const PAYOUTS_KEY = "partner:payouts";

type GlobalWithPartnerLedger = typeof globalThis & {
  __uniprep2goPartnerSales?: PartnerSaleRecord[];
  __uniprep2goPartnerPayouts?: PartnerPayoutRecord[];
  __uniprep2goPartnerSaleIds?: Set<string>;
};

function memorySales() {
  const g = globalThis as GlobalWithPartnerLedger;
  if (!g.__uniprep2goPartnerSales) g.__uniprep2goPartnerSales = [];
  return g.__uniprep2goPartnerSales;
}

function memoryPayouts() {
  const g = globalThis as GlobalWithPartnerLedger;
  if (!g.__uniprep2goPartnerPayouts) g.__uniprep2goPartnerPayouts = [];
  return g.__uniprep2goPartnerPayouts;
}

function memorySaleIds() {
  const g = globalThis as GlobalWithPartnerLedger;
  if (!g.__uniprep2goPartnerSaleIds) g.__uniprep2goPartnerSaleIds = new Set();
  return g.__uniprep2goPartnerSaleIds;
}

export function parseGumroadSalePayload(body: Record<string, unknown>): {
  saleId: string;
  permalink: string;
  deckSlug: string;
  grossCents: number;
  gumroadFeeCents: number;
  netCents: number;
  currency: string;
  soldAt: string;
  emailDigest?: string;
} | null {
  const saleId = String(body.sale_id ?? body.id ?? "").trim();
  const permalink = String(
    body.permalink ?? body.product_permalink ?? body.custom_permalink ?? "",
  ).trim();
  if (!saleId || !permalink) return null;

  // Gumroad Ping: `price` and `gumroad_fee` are USD cents (integer / numeric string).
  const grossCents = Math.round(Number(body.price ?? body.price_cents ?? 0)) || 0;
  const feeCents = Math.round(Number(body.gumroad_fee ?? body.fee ?? 0)) || 0;
  const netFromPayload = Math.round(Number(body.amount_after_fees ?? 0)) || 0;
  const netCents = netFromPayload > 0 ? netFromPayload : Math.max(0, grossCents - feeCents);

  return {
    saleId,
    permalink,
    deckSlug: permalink.replace(/^\/+/, "").split("/").pop() || permalink,
    grossCents,
    gumroadFeeCents: feeCents,
    netCents,
    currency: String(body.currency ?? "usd").toUpperCase(),
    soldAt: String(body.sale_timestamp ?? body.created_at ?? new Date().toISOString()),
    emailDigest: body.email ? String(body.email).replace(/(^.).*(@.*$)/, "$1***$2") : undefined,
  };
}

export async function hasPartnerSale(saleId: string): Promise<boolean> {
  if (memorySaleIds().has(saleId)) return true;
  const client = getRedisClient();
  if (!client) return false;
  try {
    return Boolean(await client.sismember(SALE_IDS_KEY, saleId));
  } catch {
    return false;
  }
}

export async function listPartnerSales(): Promise<PartnerSaleRecord[]> {
  const client = getRedisClient();
  if (client) {
    try {
      const rows = await client.lrange<PartnerSaleRecord>(SALES_KEY, 0, -1);
      if (rows?.length) return rows;
    } catch (error) {
      console.error("[partner_ledger] list sales failed", error);
    }
  }
  return [...memorySales()];
}

export async function listPartnerPayouts(): Promise<PartnerPayoutRecord[]> {
  const client = getRedisClient();
  if (client) {
    try {
      const rows = await client.lrange<PartnerPayoutRecord>(PAYOUTS_KEY, 0, -1);
      if (rows?.length) return rows;
    } catch (error) {
      console.error("[partner_ledger] list payouts failed", error);
    }
  }
  return [...memoryPayouts()];
}

export async function recordPartnerSale(input: {
  saleId: string;
  deckSlug: string;
  partner: PartnerRecord;
  grossCents: number;
  gumroadFeeCents: number;
  netCents: number;
  currency?: string;
  soldAt?: string;
  productPermalink?: string;
  emailDigest?: string;
}): Promise<{ sale: PartnerSaleRecord; created: boolean }> {
  if (await hasPartnerSale(input.saleId)) {
    const existing = (await listPartnerSales()).find((s) => s.saleId === input.saleId);
    if (existing) return { sale: existing, created: false };
  }

  const { authorShareCents, uniShareCents } = computeSaleShares(input.netCents, input.partner);
  const sale: PartnerSaleRecord = {
    saleId: input.saleId,
    deckSlug: input.deckSlug,
    partnerId: input.partner.partnerId,
    productPermalink: input.productPermalink,
    grossCents: input.grossCents,
    gumroadFeeCents: input.gumroadFeeCents,
    netCents: input.netCents,
    authorShareCents,
    uniShareCents,
    currency: input.currency ?? "USD",
    soldAt: input.soldAt ?? new Date().toISOString(),
    emailDigest: input.emailDigest,
  };

  memorySales().unshift(sale);
  memorySaleIds().add(sale.saleId);

  const client = getRedisClient();
  if (client) {
    try {
      const added = await client.sadd(SALE_IDS_KEY, sale.saleId);
      if (added === 0) {
        return { sale, created: false };
      }
      await client.lpush(SALES_KEY, sale);
    } catch (error) {
      console.error("[partner_ledger] persist sale failed", error);
    }
  }

  return { sale, created: true };
}

export async function recordPartnerSaleFromGumroad(
  body: Record<string, unknown>,
): Promise<
  | { ok: true; created: boolean; sale: PartnerSaleRecord; partner: PartnerRecord }
  | { ok: false; reason: string }
> {
  const parsed = parseGumroadSalePayload(body);
  if (!parsed) {
    return { ok: false, reason: "missing sale_id or permalink" };
  }

  const partner = getPartnerForDeckSlug(parsed.deckSlug);
  if (!partner) {
    return { ok: false, reason: `no partner mapped for deck ${parsed.deckSlug}` };
  }

  const { sale, created } = await recordPartnerSale({
    saleId: parsed.saleId,
    deckSlug: parsed.deckSlug,
    partner,
    grossCents: parsed.grossCents,
    gumroadFeeCents: parsed.gumroadFeeCents,
    netCents: parsed.netCents,
    currency: parsed.currency,
    soldAt: parsed.soldAt,
    productPermalink: parsed.permalink,
    emailDigest: parsed.emailDigest,
  });

  return { ok: true, created, sale, partner };
}

function monthKey(iso: string) {
  return iso.slice(0, 7);
}

export function salesInMonth(sales: PartnerSaleRecord[], month: string) {
  return sales.filter((sale) => monthKey(sale.soldAt) === month);
}

export function accruedAuthorCents(
  sales: PartnerSaleRecord[],
  payouts: PartnerPayoutRecord[],
  partnerId: string,
) {
  const earned = sales
    .filter((sale) => sale.partnerId === partnerId)
    .reduce((sum, sale) => sum + sale.authorShareCents, 0);
  const paid = payouts
    .filter((payout) => payout.partnerId === partnerId)
    .reduce((sum, payout) => sum + payout.amountCents, 0);
  return Math.max(0, earned - paid);
}

export type PartnerMonthReportRow = {
  partnerId: string;
  displayName: string;
  month: string;
  units: number;
  grossCents: number;
  netCents: number;
  authorShareCents: number;
  uniShareCents: number;
  accruedUnpaidCents: number;
  payableNow: boolean;
  minPayoutUsd: number;
};

export async function buildPartnerMonthReport(month: string): Promise<PartnerMonthReportRow[]> {
  const sales = await listPartnerSales();
  const payouts = await listPartnerPayouts();
  const monthSales = salesInMonth(sales, month);
  const partnerIds = [...new Set(monthSales.map((s) => s.partnerId))];
  const minUsd = getMinPayoutUsd();

  return partnerIds.map((partnerId) => {
    const partner = getPartnerById(partnerId);
    const rows = monthSales.filter((s) => s.partnerId === partnerId);
    const authorShareCents = rows.reduce((sum, s) => sum + s.authorShareCents, 0);
    const accruedUnpaidCents = accruedAuthorCents(sales, payouts, partnerId);
    return {
      partnerId,
      displayName: partner?.displayName ?? partnerId,
      month,
      units: rows.length,
      grossCents: rows.reduce((sum, s) => sum + s.grossCents, 0),
      netCents: rows.reduce((sum, s) => sum + s.netCents, 0),
      authorShareCents,
      uniShareCents: rows.reduce((sum, s) => sum + s.uniShareCents, 0),
      accruedUnpaidCents,
      payableNow: accruedUnpaidCents >= minUsd * 100,
      minPayoutUsd: minUsd,
    };
  });
}

export async function markPartnerPaid(input: {
  partnerId: string;
  month: string;
  reference: string;
  amountCents?: number;
}): Promise<PartnerPayoutRecord | null> {
  const sales = await listPartnerSales();
  const payouts = await listPartnerPayouts();
  const accrued = accruedAuthorCents(sales, payouts, input.partnerId);
  const amountCents = input.amountCents ?? accrued;
  if (amountCents <= 0) return null;

  const monthSaleIds = salesInMonth(sales, input.month)
    .filter((s) => s.partnerId === input.partnerId)
    .map((s) => s.saleId);

  const payout: PartnerPayoutRecord = {
    payoutId: `${input.partnerId}-${input.month}-${Date.now()}`,
    partnerId: input.partnerId,
    month: input.month,
    amountCents,
    currency: "USD",
    paidAt: new Date().toISOString(),
    reference: input.reference,
    saleIds: monthSaleIds,
  };

  memoryPayouts().unshift(payout);
  const client = getRedisClient();
  if (client) {
    try {
      await client.lpush(PAYOUTS_KEY, payout);
    } catch (error) {
      console.error("[partner_ledger] persist payout failed", error);
    }
  }

  return payout;
}

export function formatCentsUsd(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}
