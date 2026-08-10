#!/usr/bin/env node
/**
 * Print partner payout report for a month (uses Redis when configured).
 *
 *   npm run partner:payout-report -- --month 2026-08
 */
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const monthArg = process.argv.find((a) => a.startsWith("--month="))?.slice("--month=".length);
const monthIdx = process.argv.indexOf("--month");
const month =
  monthArg ||
  (monthIdx >= 0 ? process.argv[monthIdx + 1] : null) ||
  new Date().toISOString().slice(0, 7);

async function main() {
  // Load compiled-free TS via tsx when available
  const modPath = join(root, "src/lib/partner-ledger.ts");
  const { buildPartnerMonthReport, formatCentsUsd } = await import(pathToFileURL(modPath).href);
  const rows = await buildPartnerMonthReport(month);
  if (!rows.length) {
    console.log(`Partner payout report ${month}: no attributed sales.`);
    return;
  }
  console.log(`Partner payout report — ${month}\n`);
  for (const row of rows) {
    const gate = row.payableNow ? "PAYABLE" : `hold (<$${row.minPayoutUsd})`;
    console.log(
      [
        `${row.displayName} (${row.partnerId})`,
        `  units ${row.units} · net ${formatCentsUsd(row.netCents)} · author ${formatCentsUsd(row.authorShareCents)}`,
        `  accrued unpaid ${formatCentsUsd(row.accruedUnpaidCents)} · ${gate}`,
      ].join("\n"),
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
