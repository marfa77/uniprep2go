import { mockExamConfigs } from "../src/lib/mock-exams/configs";
import { getPricedDeckBySlug } from "../src/lib/checkout-pricing";
const out: Record<string, { checkoutUrl: string; amount: number; pending: boolean }> = {};
for (const c of mockExamConfigs) {
  if (!c.linkedDeckSlug || out[c.linkedDeckSlug]) continue;
  const d = await getPricedDeckBySlug(c.linkedDeckSlug);
  if (d?.checkoutUrl) out[d.slug] = { checkoutUrl: d.checkoutUrl, amount: d.price.amount, pending: Boolean(d.pricePending) };
}
console.log(JSON.stringify(out, null, 1));
