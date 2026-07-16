---
name: add-certification
description: >-
  End-to-end UniPrep2Go certification pipeline — mock exam, Anki deck, site funnel,
  SEO, GEO/LLM, Gumroad product, covers, bank generation/validation, .apkg export,
  publish, and production deploy. Use when the user names a new certification, exam,
  credential, or asks for a full under-key pathway (мок, анки, сайт, SEO, воронка,
  LLM, Gumroad, картинки, полный пайплайн).
---

# Add Certification (UniPrep2Go)

**Under-key default:** when the user names a certification, run the **full pipeline** below without asking permission for each step. Orchestrate with subagents for bank gen, validation, apkg, and Gumroad when useful; parent agent validates gates and deploys.

## What the user provides

**Required**
- Certification / exam name (e.g. "Digital SAT", "WELL AP", "EPA 608")

**Optional (agent researches if missing)**
- Exam body, official format, scoring axes, topic domains, price override, audience

**User-only asset (do not invent as final product art)**
- **Sample card screenshots** (`public/samples/{deckSlug}-sample-{1,2,3}.webp`) — wait for user captures when possible. Until then ship with cover + placeholders or bank-styled previews, then swap when screenshots arrive.

**Do not create mocks for `language` category decks** (DELF, CIPLE, DELE, etc.). Language = Anki-only.

## Reference implementations

| Pattern | Use when |
|---------|----------|
| **Digital SAT** (`sat-readiness-check` / `sat-anki-deck`) | Academic admissions; official **section axes** (not arbitrary 4–8 topics); oversized sale bank + sampled session; `requireAllTopicsAtTarget` |
| **GMAT Focus** | Multi-section academic readiness; large bank; preview→live after QA |
| **EPA 608** | Professional building/HVAC; 4 domain topics; registry building line |

## Auth (never “lose” tokens)

| Secret | Resolution |
|--------|------------|
| Gumroad | `scripts/lib/gumroad-auth.mjs` → `.env.local` → `~/.config/gumroad` → `gumroad auth token` (auto-persist to `.env.local`) |
| OpenRouter | `scripts/lib/openrouter.mjs` loads `.env.local`, then sibling projects (`CIPLE A2/ciple-master/.env.local`, Anki Generator). **Persist** into uniprep2go `.env.local` when found elsewhere |

Do not stop because `GUMROAD_ACCESS_TOKEN` / `OPENROUTER_API_KEY` are missing from process.env — resolve and sync first.

## Scoring axes rule

**Look up how the real exam is scored**, then map mock `topics` to those axes:

- Digital SAT → **2** section scores (Reading and Writing, Math), not 8 content domains as pass axes
- GMAT Focus → **3** sections (Quant, Verbal, Data Insights)
- EPA 608 → Core + Types I–III

If overall % can pass while a scored section fails, set `passRule.requireAllTopicsAtTarget: true` (SAT pattern).

## Bank sizing

| Layer | Size |
|-------|------|
| Timed session | `sum(topic.questionCount)` (e.g. SAT 27+22=49) |
| Sale / Anki bank | User target or default **~50/topic** via **local** `scripts/expand-*-bank-local.py` only (never OpenRouter for bank authoring) |
| After LLM validate `--apply` | Sync `ankiDeckCardCount`, `building-deck-specs.json` `cardCount` / `gumroadName`, deck copy, SEO titles |

Live mocks may have banks **larger than** session size. Runnable rules use `>=` topic quotas (`question-bank.ts`). Validator accepts `--slug` for live registry banks.

## Pipeline (execute in order — do not skip)

### 0. Spec + registry

```bash
# Fill scripts/templates/{id}.spec.json from certification.spec.json
npm run scaffold:certification -- --spec scripts/templates/{id}.spec.json
```

Slugs: `mockSlug` = `{kebab}-readiness-check`, `deckSlug` = `{kebab}-anki-deck`, `gumroadPermalink` ≈ `deckSlug`.

Also add entry to:
- `src/data/building-deck-specs.json` (apkg metadata: `filePrefix`, `cardCount`, `topics`, `gumroadName`)
- Cluster map in `src/lib/building-cert-clusters.ts` when it is a new pathway group

### 1. Mock exam

| File | Action |
|------|--------|
| `src/lib/mock-exams/configs.ts` | topics = **official score axes**, session counts, weights sum 100, `passRule`, `linkedDeckSlug`, start `status: "preview"`, `ankiDeckCardCount`, disclaimer |
| `src/lib/mock-exams/seo.ts` | Full SEO profile |
| `src/lib/mock-exams/question-bank.ts` | Import + `banksBySlug` |
| `src/data/mock-exams/{mockSlug}.json` | `[]` then fill |

### 2. Anki deck + catalog

| File | Action |
|------|--------|
| `src/lib/decks.ts` | `status: "planned"`, topicCoverage, faqs, `coverImage`, `sampleCards` paths (even if images pending) |
| `src/data/gumroad/building-anki-decks.json` | `{ permalink, gumroadProductId: null }` |
| `src/data/catalog-list-prices.json` | Explicit override (building default USD **11** unless product differs) |
| `src/data/building-deck-specs.json` | Spec for apkg export |

Launch layer (`anki-deck-launch.ts`) flips planned → available when Gumroad permalink exists.

### 3. Site funnel

| File | Action |
|------|--------|
| Deck page | Auto via `linkedDeckSlug` |
| `src/app/page.tsx` | Discovery / repair link |
| `src/app/mock-exams/page.tsx` | Cluster / priority list |
| Hub pages | `finance-anki-decks` / building hub as relevant |

### 4. SEO / indexation

- Start `preview` → `noindex` until bank runnable
- After bank QA + validation: set `status: "live"` so `shouldIndexMockExam` indexes
- Deck SEO profile in `src/lib/deck-seo.ts` when framing is non-default

### 5. LLM / GEO

| File | Action |
|------|--------|
| `src/lib/exam-facts.ts` | Profile + `deckExamKeyMap` (required for academic/high-intent certs) |
| `src/lib/exam-llm-layer.ts` | `HIGH_INTENT_MOCK_BLOCKS` with real query + disambiguation |
| `llms.txt` | Auto via `llm-docs.ts` |

### 6. Covers + Gumroad thumbnail (agent-owned)

```bash
# DECK_CONFIGS entry in scripts/generate-deck-covers.mjs first
npm run generate:deck-covers -- --slug {deckSlug}
npm run generate:deck-covers -- --gumroad-thumbnails --slug {deckSlug}
```

### 7. Bank generation (ALWAYS LOCAL — never OpenRouter)

**Hard rule:** mock question banks are generated **only with local expand scripts**. Do **not** call `npm run generate:mock-banks` / OpenRouter for bank authoring.

```bash
# Pattern: scripts/expand-{id}-bank-local.py (see expand-sat-bank-local.py / expand-gmat-bank-local.py)
python3 scripts/expand-{id}-bank-local.py
# Writes src/data/mock-exams/{mockSlug}.json + .generation-cache/{mockSlug}/
```

If no expand script exists for the cert yet, **create one** (template factories + seeded RNG), then run it. OpenRouter bank generation is forbidden for this pipeline.

### 8. LLM bank validation (mandatory)

```bash
npm run validate:mock-banks -- --slug {mockSlug}
npm run validate:mock-banks -- --slug {mockSlug} --apply   # drop rejects
```

Then sync all **card count** strings/specs to post-apply size. Re-run session/topic quota tests.

Reports live under `src/data/mock-exams/.validation-reports/` (gitignored; gate checks local file).

### 9. Promote to live

When bank runnable + validation report exists:
1. `status: "live"` in mock config
2. Confirm `isMockExamRunnable(mockSlug) === true`
3. Confirm `shouldIndexMockExam(mockSlug) === true`

### 10. .apkg export (Anki Generator)

```bash
# Sync building_deck_specs.json into Anki Generator if needed
cd "../Anki Generator"
PYTHONPATH=. python3 -m internal_deck_generator.py.building_deck_pipeline \
  --deck-slug {deckSlug} \
  --uniprep2go-root "/Users/pavelveselov/Projects/uniprep2go"
# Expect: out/building/{filePrefix}_FULL_{cardCount}.apkg
```

### 11. Gumroad create + assets + publish

```bash
cd uniprep2go
node -e "import {ensureGumroadAccessToken} from './scripts/lib/gumroad-auth.mjs'; console.log(ensureGumroadAccessToken().source)"
npm run setup:gumroad-building-decks -- --slug {deckSlug}
# If product exists and apkg arrived later:
npm run setup:gumroad-building-decks -- --slug {deckSlug} --assets-only
```

Catalog must end with non-null `gumroadProductId`, `shortUrl`, `apkgUploadedAt`, `publishedAt`.

### 12. Sample screenshots (USER)

Paths expected by deck:
`public/samples/{deckSlug}-sample-1.webp` … `-sample-3.webp`

Agent:
1. Wire `sampleCards[].imageUrl` in `decks.ts`
2. On user drop: convert/resize (~701×1024 WebP) and commit
3. Do **not** block Gumroad/live/deploy waiting for screenshots — swap later

### 13. Gates + tests + deploy

```bash
npm run validate:certification -- --mock {mockSlug}   # 0 blocking failures
npm test
npm run build
git add … && git commit && git push origin main       # Vercel production
```

**Do not claim done** until `validate:certification` has zero blocking failures and Gumroad product is live with apkg (unless user explicitly deferred commerce).

## Definition of done

- [ ] Registry + mock + SEO + bank import
- [ ] Deck + gumroad catalog + list price + building-deck-specs
- [ ] Cover + Gumroad thumbnail
- [ ] Funnel + homepage + mock index + exam-facts + HIGH_INTENT
- [ ] Bank generated, LLM-validated, counts synced
- [ ] Mock `live` + indexable
- [ ] `.apkg` built and uploaded; Gumroad published
- [ ] `validate:certification` READY
- [ ] Pushed to `main` (prod)
- [ ] Sample screenshots: user-provided (or noted as pending swap)

## Gate reference

Blocking: mock-config, mock-seo, deck-catalog, gumroad-catalog, mock-bank, mock-bank-import, cover-image, cover-config, funnel-link, exam-facts (when `examFactsKey` set)

Warnings: gumroad-live, mock-validation, llm-high-intent, homepage-links, mock-index-links

## npm scripts

| Script | Purpose |
|--------|---------|
| `scaffold:certification` | Registry + checklist |
| `validate:certification` | Blocking gates |
| `expand-*-bank-local.py` | **Local** bank gen (required) |
| `generate:mock-banks` | ❌ Do not use for banks |
| `validate:mock-banks` | Gemini cross-validation (+ `--apply`) |
| `generate:deck-covers` | Cover + `--gumroad-thumbnails` |
| `setup:gumroad-building-decks` | Create / assets / publish |

## Orchestration tips

- Parallelize: **local** bank expand ‖ cover gen ‖ wire-up; then validate → apkg → Gumroad → deploy
- Never start OpenRouter bank generation even if a key is present
- Parent agent always re-runs `validate:certification` after subagents
- Never commit `scripts/local-banks/`, `scripts/*-bank-data/`, or raw OpenRouter keys
- Keep `.env.local` out of git; persist tokens there for the next run

## Additional resources

- Registry: [src/data/certifications/registry.json](../../src/data/certifications/registry.json)
- Spec template: [scripts/templates/certification.spec.json](../../scripts/templates/certification.spec.json)
- SAT reference spec: [scripts/templates/sat.spec.json](../../scripts/templates/sat.spec.json)
- Gumroad auth: [scripts/lib/gumroad-auth.mjs](../../scripts/lib/gumroad-auth.mjs)
- OpenRouter: [scripts/lib/openrouter.mjs](../../scripts/lib/openrouter.mjs)
- LLM rules: [.cursor/rules/llm-visibility.mdc](../../.cursor/rules/llm-visibility.mdc)
