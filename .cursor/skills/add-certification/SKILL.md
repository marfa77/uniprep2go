---
name: add-certification
description: >-
  End-to-end UniPrep2Go certification pipeline — mock exam, Anki deck, site funnel,
  SEO, LLM layer, Gumroad product, covers, bank generation and validation. Use when
  the user names a new certification, exam, credential, or asks to add a topic
  under key (мок, анки, сайт, SEO, воронка, LLM, Gumroad, картинки).
---

# Add Certification (UniPrep2Go)

User provides **certification name + exam context**. Agent delivers the full product surface.

## Input from user

Minimum:
- Certification / exam name (e.g. "WELL AP", "EPA 608", "MRICS QS")
- Exam body and independence disclaimer entity
- Official exam format (questions, time, pass rule) if known
- 4–8 topic domains for mock + deck

Optional: target audience, competitor queries, price override.

**Do not create mock exams for `language` category decks** (DELF, CIPLE, DELE, etc.). Language products are Anki-only; no `/mock-exams/*` config, bank, or funnel links.

## Reference implementation

Copy patterns from **EPA 608**:
- Mock: `epa-608-readiness-check` in `configs.ts`
- Deck: `hvac-epa-608-anki-deck` in `decks.ts`
- Registry: `src/data/certifications/registry.json`

## Pipeline (execute in order)

### 0. Scaffold registry entry

```bash
# Create spec from scripts/templates/certification.spec.json
npm run scaffold:certification -- --spec scripts/templates/my-cert.spec.json
```

Slugs convention:
- `mockSlug`: `{kebab}-readiness-check`
- `deckSlug`: `{kebab}-anki-deck` (building/professional)
- `gumroadPermalink`: usually same as `deckSlug`

### 1. Mock exam

| File | Action |
|------|--------|
| `src/lib/mock-exams/configs.ts` | Add config: topics (4–8), `questionCount`, `durationMinutes`, `passRule`, `linkedDeckSlug`, `status: "preview"`, disclaimer |
| `src/lib/mock-exams/seo.ts` | Full SEO profile: title, description, keywords, headline, intro, audience |
| `src/lib/mock-exams/question-bank.ts` | Import `[]` bank + `banksBySlug` entry |
| `src/data/mock-exams/{mockSlug}.json` | `[]` until generation completes |

Session size = sum of topic `questionCount` (usually 10/topic). Bank size = 50 questions/topic.

### 2. Anki deck

| File | Action |
|------|--------|
| `src/lib/decks.ts` | `status: "planned"`, `topicCoverage`, faqs, `coverImage`, professional category |
| `src/data/gumroad/building-anki-decks.json` | `{ permalink, gumroadProductId: null }` |
| `scripts/setup-gumroad-building-decks.mjs` | Add Gumroad product title in `titles` map |

Launch layer (`anki-deck-launch.ts`) auto-applies when deck is in gumroad catalog — no edit needed.

### 3. Site funnel

| File | Action |
|------|--------|
| `src/app/decks/[slug]/page.tsx` | Auto via `getDeckPracticeMock` when `linkedDeckSlug` set |
| `src/app/page.tsx` | Add repair pair `{ mockSlug, deckSlug }` or section link |
| `src/app/mock-exams/page.tsx` | Add to `usPriorityMockLinks` |

### 4. SEO

- Mock page: auto `noindex` until bank runnable (`src/lib/seo.ts`)
- Titles truncated in page `generateMetadata` only (`truncateSeoTitle`)
- Sitemap includes mock only when `shouldIndexMockExam(slug)`

### 5. LLM / GEO layer

| File | Action |
|------|--------|
| `src/lib/exam-facts.ts` | Add `examKey` + deck slug mapping (recommended) |
| `src/lib/exam-llm-layer.ts` | Add `HIGH_INTENT_MOCK_BLOCKS` entry with real user query + disambiguation |
| `/llms.txt` | Auto-sync via `llm-docs.ts` after catalog update |

Run `npm test` — `exam-llm-layer.test.ts`, `llm-docs.test.ts`.

### 6. Covers

| File | Action |
|------|--------|
| `scripts/generate-deck-covers.mjs` | `DECK_CONFIGS[deckSlug]` with title, subtitle, panelKind |
| Run | `npm run generate:deck-covers -- --slug {deckSlug}` |

### 7. Bank generation & validation

```bash
npm run generate:mock-banks -- --slug {mockSlug}
npm run validate:mock-banks -- --slug {mockSlug}
npm run validate:mock-banks -- --slug {mockSlug} --apply   # if report clean
```

Requires `OPENROUTER_API_KEY`. Generator: Claude Sonnet 4. Validator: Gemini 2.5 Flash.

### 8. Gumroad (when token available)

```bash
npm run setup:gumroad-building-decks -- --slug {deckSlug}
```

Gumroad auth auto-resolves via `scripts/lib/gumroad-auth.mjs` (`.env.local` → `~/.config/gumroad` → `gumroad auth token`) and syncs into `.env.local`. Permalink must match catalog.

### 9. Gate validation (mandatory before done)

```bash
npm run validate:certification -- --mock {mockSlug}
npm test
npm run build
```

**Do not claim done until `validate:certification` has zero blocking failures.**

### 10. Post-launch (after bank QA)

- Export `.apkg` from validated bank
- Upload to Gumroad product
- Set `apkgStatus: "ready"` in launch layer when implemented

## Gate reference

Blocking failures (`validate:certification`):
- mock-config, mock-seo, deck-catalog, gumroad-catalog, mock-bank, mock-bank-import, cover-image, cover-config, funnel-link

Warnings (ship OK but improve):
- gumroad-live (no API product yet)
- mock-validation (not validated)
- exam-facts, llm-high-intent, homepage-links, mock-index-links

## npm scripts

| Script | Purpose |
|--------|---------|
| `scaffold:certification` | Append registry + print checklist |
| `validate:certification` | All gates for one or all certs |
| `generate:mock-banks` | OpenRouter bank generation |
| `validate:mock-banks` | Gemini cross-validation |
| `generate:deck-covers` | Blueprint WebP covers |
| `setup:gumroad-building-decks` | Gumroad API product create |

## Additional resources

- Registry: [src/data/certifications/registry.json](../../src/data/certifications/registry.json)
- Spec template: [scripts/templates/certification.spec.json](../../scripts/templates/certification.spec.json)
- LLM rules: [.cursor/rules/llm-visibility.mdc](../../.cursor/rules/llm-visibility.mdc)
