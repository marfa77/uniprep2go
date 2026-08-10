import { getFunnelStats } from "./funnel-store";
import {
  accruedAuthorCents,
  buildPartnerMonthReport,
  formatCentsUsd,
  listPartnerPayouts,
  listPartnerSales,
  type PartnerSaleRecord,
} from "./partner-ledger";
import { listActivePartners, type PartnerRecord } from "./partners";
import { sendTelegramMessage } from "./telegram-client";
import { getTelegramNotifyChatId } from "./telegram-notify";

export function toPartnerSaleMessage(partner: PartnerRecord, sale: PartnerSaleRecord) {
  return [
    "UniPrep partner sale",
    "",
    `Deck: ${sale.deckSlug}`,
    `Sale: ${sale.saleId}`,
    `Gross: ${formatCentsUsd(sale.grossCents)}`,
    `Net after fees: ${formatCentsUsd(sale.netCents)}`,
    `Your share (70% net): ${formatCentsUsd(sale.authorShareCents)}`,
    `Sold: ${sale.soldAt}`,
  ].join("\n");
}

export function toFounderPartnerSaleMessage(partner: PartnerRecord, sale: PartnerSaleRecord) {
  return [
    "Partner-attributed Gumroad sale",
    "",
    `Partner: ${partner.displayName} (${partner.partnerId})`,
    `Deck: ${sale.deckSlug}`,
    `Gross ${formatCentsUsd(sale.grossCents)} · net ${formatCentsUsd(sale.netCents)}`,
    `Author ${formatCentsUsd(sale.authorShareCents)} · UniPrep ${formatCentsUsd(sale.uniShareCents)}`,
  ].join("\n");
}

export async function notifyPartnerSale(partner: PartnerRecord, sale: PartnerSaleRecord) {
  const chatId = partner.telegramChatId?.trim();
  if (!chatId) return false;
  return sendTelegramMessage(chatId, toPartnerSaleMessage(partner, sale));
}

export async function notifyFounderPartnerSale(partner: PartnerRecord, sale: PartnerSaleRecord) {
  const chatId = await getTelegramNotifyChatId();
  if (!chatId) return false;
  return sendTelegramMessage(chatId, toFounderPartnerSaleMessage(partner, sale));
}

export async function buildPartnerDigestMessage(partner: PartnerRecord) {
  const sales = await listPartnerSales();
  const payouts = await listPartnerPayouts();
  const partnerSales = sales.filter((s) => s.partnerId === partner.partnerId);
  const accrued = accruedAuthorCents(sales, payouts, partner.partnerId);
  const month = new Date().toISOString().slice(0, 7);
  const monthSales = partnerSales.filter((s) => s.soldAt.startsWith(month));
  const monthAuthor = monthSales.reduce((sum, s) => sum + s.authorShareCents, 0);

  let funnelLine = "Funnel: n/a";
  try {
    const stats = await getFunnelStats();
    const deckHits = partner.deckSlugs.map((slug) => {
      const checkouts = (stats.byDeck[slug] ?? 0) + (stats.lifetime.byDeck[slug] ?? 0);
      return `${slug}: deck events ${checkouts}`;
    });
    if (deckHits.length) funnelLine = `Funnel (by deck key): ${deckHits.join("; ")}`;
  } catch {
    // ignore funnel errors in digest
  }

  return [
    `UniPrep partner weekly digest — ${partner.displayName}`,
    "",
    `Month ${month}: ${monthSales.length} sales · your share ${formatCentsUsd(monthAuthor)}`,
    `Accrued unpaid: ${formatCentsUsd(accrued)}`,
    `Lifetime attributed sales: ${partnerSales.length}`,
    funnelLine,
    "",
    "Payouts monthly bank-to-bank when accrued ≥ $100.",
  ].join("\n");
}

export async function sendPartnerDigests() {
  const partners = listActivePartners().filter((p) => p.telegramChatId?.trim());
  const results: Array<{ partnerId: string; sent: boolean }> = [];

  for (const partner of partners) {
    const message = await buildPartnerDigestMessage(partner);
    const sent = await sendTelegramMessage(partner.telegramChatId.trim(), message);
    results.push({ partnerId: partner.partnerId, sent });
  }

  return results;
}

export async function toPartnerPayoutReportMessage(month: string) {
  const rows = await buildPartnerMonthReport(month);
  if (!rows.length) {
    return `Partner payout report ${month}: no attributed sales.`;
  }

  const lines = [
    `Partner payout report — ${month}`,
    "",
    ...rows.map((row) => {
      const gate = row.payableNow ? "PAYABLE" : `hold (<$${row.minPayoutUsd})`;
      return [
        `${row.displayName} (${row.partnerId})`,
        `  units ${row.units} · net ${formatCentsUsd(row.netCents)} · author ${formatCentsUsd(row.authorShareCents)}`,
        `  accrued unpaid ${formatCentsUsd(row.accruedUnpaidCents)} · ${gate}`,
      ].join("\n");
    }),
    "",
    "Mark paid: /partner_paid <partnerId> <month> <reference>",
  ];
  return lines.join("\n");
}

export function shouldPartnerDigest(text: string) {
  const n = text.trim().toLowerCase();
  return n === "/partner_digest" || n === "partner_digest" || n.startsWith("/partner_digest@");
}

export function shouldPartnerPayoutReport(text: string) {
  const n = text.trim().toLowerCase();
  return (
    n === "/partner_payouts" ||
    n.startsWith("/partner_payouts ") ||
    n.startsWith("/partner_payouts@") ||
    n.startsWith("partner_payouts")
  );
}

export function shouldPartnerPaid(text: string) {
  const n = text.trim().toLowerCase();
  return n.startsWith("/partner_paid") || n.startsWith("partner_paid ");
}

export function parsePartnerPayoutMonth(text: string) {
  const match = text.match(/(20\d{2}-\d{2})/);
  return match?.[1] ?? new Date().toISOString().slice(0, 7);
}

export function parsePartnerPaidCommand(text: string): {
  partnerId: string;
  month: string;
  reference: string;
} | null {
  const parts = text.trim().split(/\s+/);
  // /partner_paid partnerId 2026-08 wire-ref
  const idx = parts.findIndex((p) => p.replace(/@.*/, "") === "/partner_paid" || p === "partner_paid");
  if (idx < 0) return null;
  const partnerId = parts[idx + 1];
  const month = parts[idx + 2];
  const reference = parts.slice(idx + 3).join(" ").trim();
  if (!partnerId || !month || !/^20\d{2}-\d{2}$/.test(month) || !reference) return null;
  return { partnerId, month, reference };
}
