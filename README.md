# UniPrep2Go

Minimal LLM-readable landing page for CFA Anki decks.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Product Catalog

Deck data lives in `src/lib/decks.ts`. Add future decks by adding new records to the `decks` array.

## Funnel Logging

The landing page logs funnel events to `/api/events`:

- `page_view`
- `product_facts_view`
- `topic_matrix_view`
- `catalog_view`
- `faq_view`
- `checkout_intent`
- `gumroad_click`

For the MVP, events are stored in memory and written to server logs as `[funnel_event]`. Use persistent storage before relying on this for long-running production analytics.

## Telegram Stats Bot

Set the bot token as an environment variable:

```bash
TELEGRAM_BOT_TOKEN=replace-with-token-from-botfather
```

Do not commit bot tokens. If a token has been pasted into chat or logs, rotate it in BotFather before production use.

After deployment, point the bot webhook to:

```bash
https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook?url=https://uniprep2go.study/api/telegram
```

Then send `/stats` or `stats` to the bot to receive the current funnel summary.

## Verification

```bash
npm test
npm run lint
npm run build
```
