# Partner deck publish checklist

Ops-first partner program: email intake → founder QC → **UniPrep builds mock from the accepted Anki bank** → publish deck + mock → Gumroad → Telegram stats → monthly 70/30 payout.

## Facts (keep in sync with site)

- Split: **70% author / 30% UniPrep** of **net after Gumroad fees**
- Stats: **Telegram** only (no author web dashboard)
- Payout: monthly bank-to-bank when accrued ≥ **$50**
- Intake: email only → `/contact#partner-decks` · GEO page `/sell-anki-deck`
- Webhook: `https://uniprep2go.study/api/gumroad/ping` (Gumroad product Ping URL)

## 1. Intake

Author emails `support@uniprep2go.study` with:

- Exam name + target outline
- Card count + sample cards or private `.apkg`
- Rights / ownership confirmation
- Payout bank country (IBAN stays in **private ops sheet**, not git)
- Telegram username/chat for stats

## 2. QC checklist

- [ ] Accurate exam content (spot-check vs outline)
- [ ] No copyrighted stem dumps / scraped proprietary banks
- [ ] Duplicates / fluff within acceptable bounds
- [ ] Topic coverage clear enough to derive a timed readiness-check outline
- [ ] Card quality readable in Anki (cloze/basic OK)

Reject with short Telegram/email reason. No public scoreboard.

## 3. On accept

1. Simple license email (PDF ok)
2. **Build mock from the deck** — derive topics + item bank from the partner `.apkg` / samples; ship free readiness check on UniPrep (author does not supply the mock)
3. Create Gumroad product under PixID Studio; upload `.apkg` + cover
4. Set Gumroad **Ping URL** to `/api/gumroad/ping` (or account-level ping)
5. Wire site catalog / `anki-deck-launch` so deck is `available` and linked to the new mock
6. Register partner in [`src/data/partners/partners.json`](../../src/data/partners/partners.json):
   - `partnerId`, `displayName`, `email`, `telegramChatId`
   - `deckSlugs: ["their-deck-slug"]`
   - `status: "active"` (never leave as `template`)
7. Smoke test: record a test sale (or Gumroad ping) → partner Telegram gets share line

## 4. Telegram founder commands

- `/partner_digest` — send weekly digests to all active partners with `telegramChatId`
- `/partner_payouts 2026-08` — month report (payable vs hold under $50)
- `/partner_paid <partnerId> <YYYY-MM> <reference>` — mark paid + notify author Telegram

CLI: `npm run partner:payout-report -- --month 2026-08`

## 5. Pilot slot

`partners.json` includes `pilot-template`. To onboard the first real pilot:

1. Copy the template object to a new `partnerId` (e.g. `pilot-alex`)
2. Fill `email`, `telegramChatId`, `deckSlugs`, set `status: "active"`
3. Keep `pilot-template` as documentation-only (`status: "template"`, empty decks)
4. Do **not** scale outreach until one live sale → Telegram ping → payout mark-paid cycle works

## Non-goals (this phase)

- Self-serve upload / QC UI
- Author web dashboard
- Multi-seller Gumroad
- Automatic Wise API transfers
