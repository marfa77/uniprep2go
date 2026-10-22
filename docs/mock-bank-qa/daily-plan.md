# Дневной план 20.10.2026 – 19.01.2027

Сгенерировано 2026-10-20 `python3 scripts/sku-daily-plan.py` из `sku-status.json` (2026-10-20). Порядок: трафик → Tier A → финансы → live → семейства. Каждое воскресенье пересчитывать: готовые SKU выпадают, остальное сдвигается.

**Сегодня (22.10 Чт):** см. строку ниже — главное `nha-cpct`. Среда (MLT/barber ops + AnkiWeb) готова, ship только по OK.

- Банков к `ok`: **121**. День закрыт, когда каждый SKU в строке сдан целиком: гейты, построчный review, ops, ledger, и для live-деки каскад (apkg, Gumroad, samples).
- Ориентир нагрузки ~170 единиц (1 = новый вопрос, 0.5 = проверенный). Банк больше дня всё равно один день и один результат, без «день 1/2».
- «Плюс немного»: сначала лендинги/воронка из бэклога, потом civic, продукты, Prep2Go деки.
- **AnkiWeb LITE** (отдельный гейт от `sku-status`): mock может быть `ok`, а sold FULL `.apkg` не годится для random AnkiWeb preview (`thin_back` / `thin_explanation`). Перед шаром: довести FULL до sample-grade → `build_exam_lite_ankiweb --allow-short` → GUID-move → share **без слова LITE в title**. Квота 20/7d. Ledger: `docs/ankiweb-lite-ledger.md`.

### AnkiWeb LITE — FULL→share (очередь 2026-10-21)

| SKU | Блокер LITE-гейта (eligible) | День в плане |
|---|---|---|
| SIE | 32/40 · thin_back 142/300 | 23.10 (плюс к compared) |
| Digital SAT | 0/40 · thin_explanation 297/350 | 24.10 |
| ServSafe Manager | 1/40 · thin_back 234/300 | 29.10 (плюс к compared) |
| LEED AP BD+C (+ GA/O+M если тот же шаблон) | templated distractor notes · LITE 10 | 04.11 (плюс к LEED compared) |
| CA RE | rewrite + LITE 21 | 02.11 (в каскаде после rewrite) |
| CFP | rewrite + LITE 28 | 05.11 (в каскаде после rewrite) |
| Series 65 | rewrite + LITE 17 | 06.11 (в каскаде после rewrite) |
| Series 66 | rewrite + LITE 7 | 12.11 (в каскаде после rewrite) |


## Неделя с 20.10

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 20.10 | Вт | `al-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | Деки с просмотрами и 0 checkout: питч / FAQ / Gumroad — `rd-exam-anki-deck`, `six-sigma-green-belt-anki-deck`, `ashrae-certifications-anki-deck` |
| 21.10 | Ср | ✅ `ascp-mlt` + `barber-state` 60→120 (ops ready, не shipped). ✅ AnkiWeb: Wave-2 remainder + 8 money LITEs (15/20 квоты; title без LITE) | Деки с просмотрами и 0 checkout: питч / FAQ / Gumroad — `bms-bas-anki-deck`, `california-real-estate-anki-deck`, `electrical-journeyman-anki-deck` · ship MLT/barber когда скажешь |
| 22.10 | Чт | `nha-cpct` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) | Таблица «Free practice options compared» (только проверенные строки + checked date): CFA L1 |
| 23.10 | Пт | `cda-childcare` расширить 60→120; `medical-billing-specialist` rewrite + расширить 60→120 | Таблица compared: SIE · **AnkiWeb:** thicken SIE FULL (thin backs) → LITE 40 → share (без LITE в title) |
| 24.10 | Сб | `rbt-behavior-technician` rewrite + расширить 60→120; `mblex` rewrite + расширить 60→120 | Таблица compared: FRM P1 · **AnkiWeb:** thicken Digital SAT FULL (thin explanations) → LITE 40 → share |
| 25.10 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` · AnkiWeb day-14 download check на шары 13.10 | — |

## Неделя с 26.10

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 26.10 | Пн | `nha-cmaa` rewrite + расширить 60→120; `nremt-aemt` rewrite + расширить 60→120 | Таблица compared: PTCB (PTCB Practice Bank за аккаунтом) |
| 27.10 | Вт | `capm` расширить 60→120; `wastewater-operator-1` расширить 60→120 | Urgency strip с verify-ссылкой: CFA L1 окно (сверить на cfainstitute.org) |
| 28.10 | Ср | `cscs-nsca` rewrite + расширить 60→120 | Таблица compared: Series 7 |
| 29.10 | Чт | `ashrae-certifications` rewrite 250 + каскад live-деки (apkg, Gumroad, samples) | Таблица compared: ServSafe Manager · **AnkiWeb:** thicken ServSafe Manager FULL (thin backs) → LITE 40 → share |
| 30.10 | Пт | `bms-bas` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | Таблица compared: Life in the UK (official 24Q / 45 min / 75%) |
| 31.10 | Сб | `six-sigma-green-belt` rewrite + расширить 60→120 | S3 «Example report layout»: скрин реального отчёта на лендинге (без фейковых данных) |
| 01.11 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 02.11

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 02.11 | Пн | `california-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) · **AnkiWeb LITE 40** после FULL sample-grade | Таблица compared: CFA L2 (Practice Pack registered-only) |
| 03.11 | Вт | `property-casualty-insurance` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | Таблица compared: Series 63 + Series 65 · (P&C AnkiWeb уже live 21.10 — day-14 check) |
| 04.11 | Ср | `nclex-rn` rewrite + расширить 60→120 | Таблица compared: PMP + LEED GA · **AnkiWeb:** fix LEED FULL templated notes (BD+C; GA/O+M если тот же генератор) → LITE 40 → share |
| 05.11 | Чт | `cfp-certification` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) · **AnkiWeb LITE 40** после FULL sample-grade | civic: `australian-citizenship-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 06.11 | Пт | `series-65` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) · **AnkiWeb LITE 40** после FULL sample-grade | civic: `belgium-flanders-mo-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 07.11 | Сб | `cdl-general-knowledge` rewrite + расширить 60→120; `electrical-journeyman` расширить 60→120 | civic: `belgium-wallonie-citoyennete-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 08.11 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 09.11

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 09.11 | Пн | `series-79` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) | civic: `canadian-citizenship-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 10.11 | Вт | `nsca-cpt` расширить 60→120 | civic: `ccse-espana-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 11.11 | Ср | `series-6` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) | civic: `czech-citizenship-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 12.11 | Чт | `series-66` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) · **AnkiWeb LITE 40** после FULL sample-grade | civic: `denmark-indfoedsretsproeven-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 13.11 | Пт | `series-99` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) | civic: `leben-in-deutschland-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 14.11 | Сб | `enrolled-agent` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) | civic: `life-in-the-uk-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 15.11 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 16.11

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 16.11 | Пн | `ny-real-estate` расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | civic: `luxembourg-vivre-ensemble-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 17.11 | Вт | `real-estate-appraiser` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | civic: `naturalisation-francaise-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 18.11 | Ср | `us-citizenship` rewrite 128 + каскад live-деки (apkg, Gumroad, samples) | civic: `naturalisation-suisse-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 19.11 | Чт | `ak-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | civic: `naturalizzazione-svizzera-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 20.11 | Пт | `ar-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | civic: `norway-statsborgerproven-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 21.11 | Сб | `az-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | civic: `polish-citizenship-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 22.11 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 23.11

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 23.11 | Пн | `co-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | civic: `portugal-nacionalidade-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 24.11 | Вт | `ga-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | civic: `sweden-medborgarskapsprov-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 25.11 | Ср | `il-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | civic: `swiss-citizenship-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 26.11 | Чт | `ma-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | civic: `finland-kansalaisuuskoe-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 27.11 | Пт | `mi-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | продукт: `cfa-level-1-formula-reference-2026` — сверка фактов, копирайт, samples, checkout |
| 28.11 | Сб | `nc-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | продукт: `cfa-level-2-formula-reference-2026` — сверка фактов, копирайт, samples, checkout |
| 29.11 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 30.11

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 30.11 | Пн | `nj-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | продукт: `australia-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 01.12 | Вт | `oh-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | продукт: `bench-energy-coal-trader-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 02.12 | Ср | `pa-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | продукт: `bench-energy-metal-trader-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 03.12 | Чт | `va-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | продукт: `bench-energy-oil-trader-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 04.12 | Пт | `wa-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | продукт: `canada-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 05.12 | Сб | `aapc-cpc` rewrite + расширить 60→120; `aspt-phlebotomy` rewrite + расширить 60→120 | продукт: `cat4-level-d-anki-deck-printable-pdf` — сверка фактов, копирайт, samples, checkout |
| 06.12 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 07.12

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 07.12 | Пн | `crcst` rewrite + расширить 60→120; `danb-gc` rewrite + расширить 60→120 | продукт: `commodity-trader-pack-bundle` — сверка фактов, копирайт, samples, checkout |
| 08.12 | Вт | `danb-ice` rewrite + расширить 60→120; `first-aid-cpr` rewrite + расширить 60→120 | продукт: `delf-prim-printable-french-flashcards` — сверка фактов, копирайт, samples, checkout |
| 09.12 | Ср | `nbstsa-cst` rewrite + расширить 60→120; `nclex-pn` rewrite + расширить 60→120 | продукт: `germany-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 10.12 | Чт | `nha-ccma` расширить 60→120; `nha-cpt-phlebotomy` rewrite + расширить 60→120 | продукт: `ib-biology-sl-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 11.12 | Пт | `nnaap-cna` rewrite + расширить 60→120; `nremt-paramedic` rewrite + расширить 60→120 | продукт: `japan-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 12.12 | Сб | `physical-therapy-aide` расширить 60→120; `precision-nutrition-l1` расширить 60→120 | продукт: `netherlands-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 13.12 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 14.12

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 14.12 | Пн | `veterinary-technician-vtne` rewrite + расширить 60→120; `cdl-air-brakes` rewrite + расширить 60→120 | продукт: `portugal-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 15.12 | Вт | `cdl-combination` rewrite + расширить 60→120; `cdl-doubles-triples` rewrite + расширить 60→120 | продукт: `ptcb-study-guide-2026` — сверка фактов, копирайт, samples, checkout |
| 16.12 | Ср | `cdl-hazmat` rewrite + расширить 60→120; `cdl-passenger` rewrite + расширить 60→120 | продукт: `saudi-arabia-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 17.12 | Чт | `cdl-tankers` rewrite + расширить 60→120; `alcohol-server` rewrite + расширить 60→120 | продукт: `servsafe-manager-complete-study-guide` — сверка фактов, копирайт, samples, checkout |
| 18.12 | Пт | `forklift-operator` rewrite + расширить 60→120; `funeral-service-arts` rewrite + расширить 60→120 | продукт: `singapore-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 19.12 | Сб | `nate-core` расширить 60→120; `notary-public` rewrite + расширить 60→120 | продукт: `south-africa-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 20.12 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 21.12

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 21.12 | Пн | `osha-10-general` rewrite + расширить 60→120; `plumbing-journeyman` расширить 60→120 | продукт: `uae-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 22.12 | Вт | `servsafe-food-handler` расширить 60→120; `unarmed-security-officer` расширить 60→120 | продукт: `uk-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 23.12 | Ср | `water-treatment-operator-1` rewrite + расширить 60→120; `aswb-bachelors` расширить 60→120 | продукт: `us-adaptation-english-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 24.12 | Чт | `aswb-clinical` расширить 60→120; `aswb-masters` rewrite + расширить 60→120 | продукт: `arabic-survival-phrases-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 25.12 | Пт | `phr-hrci` расширить 60→120; `praxis-core` rewrite + расширить 60→120 | продукт: `australian-citizenship-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 26.12 | Сб | `praxis-elementary-education` rewrite + расширить 60→120; `praxis-special-education` расширить 60→120 | продукт: `canadian-citizenship-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 27.12 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 28.12

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 28.12 | Пн | `cosmetology-state` rewrite + расширить 60→120; `esthetician-state` rewrite + расширить 60→120 | продукт: `cfa-level-1-formula-deck` — сверка фактов, копирайт, samples, checkout |
| 29.12 | Вт | `nail-technician-state` расширить 60→120; `ct-real-estate` rewrite + расширить 60→120 | продукт: `citizenship-naturalization-anki-bundle` — сверка фактов, копирайт, samples, checkout |
| 30.12 | Ср | `de-real-estate` rewrite + расширить 60→120; `hi-real-estate` rewrite + расширить 60→120 | продукт: `japanese-survival-phrases-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 31.12 | Чт | `ia-real-estate` rewrite + расширить 60→120; `id-real-estate` rewrite + расширить 60→120 | продукт: `korean-survival-phrases-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 01.01 | Пт | `in-real-estate` rewrite + расширить 60→120; `ks-real-estate` rewrite + расширить 60→120 | продукт: `leben-in-deutschland-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 02.01 | Сб | `ky-real-estate` rewrite + расширить 60→120; `la-real-estate` rewrite + расширить 60→120 | продукт: `life-in-the-uk-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 03.01 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 04.01

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 04.01 | Пн | `md-real-estate` rewrite + расширить 60→120; `me-real-estate` rewrite + расширить 60→120 | продукт: `naturalisation-francaise-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 05.01 | Вт | `mn-real-estate` rewrite + расширить 60→120; `mo-real-estate` rewrite + расширить 60→120 | продукт: `russian-survival-phrases-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 06.01 | Ср | `ms-real-estate` rewrite + расширить 60→120; `mt-real-estate` rewrite + расширить 60→120 | продукт: `spanish-italian-paired-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 07.01 | Чт | `nd-real-estate` rewrite + расширить 60→120; `ne-real-estate` rewrite + расширить 60→120 | продукт: `swiss-citizenship-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 08.01 | Пт | `nh-real-estate` rewrite + расширить 60→120; `nm-real-estate` rewrite + расширить 60→120 | продукт: `us-citizenship-test-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 09.01 | Сб | `nv-real-estate` rewrite + расширить 60→120; `ok-real-estate` rewrite + расширить 60→120 | Prep2Go дека: `celi-b1-italian-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 10.01 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 11.01

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 11.01 | Пн | `or-real-estate` rewrite + расширить 60→120; `ri-real-estate` rewrite + расширить 60→120 | Prep2Go дека: `ciple-a2-european-portuguese-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 12.01 | Вт | `sc-real-estate` rewrite + расширить 60→120; `sd-real-estate` rewrite + расширить 60→120 | Prep2Go дека: `ciple-a2-grammar-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 13.01 | Ср | `tn-real-estate` rewrite + расширить 60→120; `ut-real-estate` rewrite + расширить 60→120 | Prep2Go дека: `dele-a2-grammar-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 14.01 | Чт | `vt-real-estate` rewrite + расширить 60→120; `wi-real-estate` rewrite + расширить 60→120 | Prep2Go дека: `dele-a2-spanish-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 15.01 | Пт | `wv-real-estate` rewrite + расширить 60→120; `wy-real-estate` rewrite + расширить 60→120 | Prep2Go дека: `delf-a2-printable-french-flashcards` — сверка фактов, копирайт, samples, checkout |
| 16.01 | Сб | `issa-cpt` rewrite + расширить 60→120; `nabcep-associate` rewrite + расширить 60→120 | Prep2Go дека: `delf-b2-french-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 17.01 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 18.01

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 18.01 | Пн | `nbdhe` rewrite + расширить 60→120 | Prep2Go дека: `delf-b2-grammar-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 19.01 | Вт | Буфер: доделать хвосты недели | Prep2Go дека: `dutch-a2-inburgering-anki-deck` — сверка фактов, копирайт, samples, checkout |

## Не влезло в 3 месяца

- Prep2Go дека: `german-a2-anki-deck` — сверка фактов, копирайт, samples, checkout
- Prep2Go дека: `german-a2-for-russian-speakers-anki-deck` — сверка фактов, копирайт, samples, checkout
- Prep2Go дека: `german-a2-for-ukrainian-speakers-anki-deck` — сверка фактов, копирайт, samples, checkout
- Prep2Go дека: `ielts-toefl-english-for-arabic-speakers-anki-deck` — сверка фактов, копирайт, samples, checkout
- Prep2Go дека: `ielts-toefl-english-for-portuguese-speakers-anki-deck` — сверка фактов, копирайт, samples, checkout
