/** Default Product → Settings toggles for digital Anki/PDF SKUs. */

export const GUMROAD_DIGITAL_SETTINGS = {
  is_epublication: true,
  quantity_enabled: false,
  should_show_sales_count: false,
  require_shipping: false,
  product_refund_policy_enabled: false,
};

export async function putGumroadDigitalSettings(token, productId) {
  const response = await fetch(`https://api.gumroad.com/v2/products/${encodeURIComponent(productId)}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(GUMROAD_DIGITAL_SETTINGS),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) {
    throw new Error(
      `Gumroad settings update failed (${productId}): ${JSON.stringify(payload).slice(0, 240)}`,
    );
  }
  return payload.product;
}
