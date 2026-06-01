import fs from "node:fs";

const path = "src/lib/decks.ts";
let source = fs.readFileSync(path, "utf8");

source = source.replace(/\n    price: \{\n      amount: [\d.]+,\n      currency: "USD",\n    \},/g, "");
source = source.replace(/\n    price: \{ amount: [\d.]+, currency: "USD" \},/g, "");
source = source.replace(/^    price: [\d.]+,\n/gm, "");
source = source.replace(/for \$[\d.]+ USD through Gumroad/g, "for {PRICE} through Gumroad");
source = source.replace(
  /for \$[\d.]+ USD through Lemon Squeezy/g,
  "for {PRICE} through Lemon Squeezy",
);
source = source.replace(
  /for \$39 USD through Gumroad, saving \$18 versus buying each deck separately at \$19\./g,
  "for {PRICE} through Gumroad. Bundle savings are shown at checkout.",
);

fs.writeFileSync(path, source);
