# Дневной план 16.10.2026 – 15.01.2027

Сгенерировано 2026-10-15 `python3 scripts/sku-daily-plan.py` из `sku-status.json` (2026-10-15). Порядок: трафик → Tier A → финансы → live → семейства. Каждое воскресенье пересчитывать: готовые SKU выпадают, остальное сдвигается.

- Банков к `ok`: **124** (~177 единиц в рабочий день; 1 единица = 1 новый вопрос или 2 проверенных).
- Каждый банк: гейты → построчный content review → ops → ledger → для 🟢 live-деки каскад в тот же день.
- «Плюс немного»: сначала лендинги/воронка из бэклога, потом civic, продукты, Prep2Go деки.


## Неделя с 16.10

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 16.10 | Пт | `rd-exam` расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) (день 1/2) | Счётчик «N people started»: решение по маркетинговым полам в `social-proof.ts` (реальные числа, скрыть < 50) → SSR |
| 17.10 | Сб | `rd-exam` расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) (день 2/2) | `cardCount` 60→120 в `wave-deck-specs.json` + vault для 7 planned SKU от 2026-10-15 (+ «60-card» копирайт в `seo.ts`) |
| 18.10 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 19.10

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 19.10 | Пн | `fl-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | Дубли SKU: решить merge/redirect — `life-health-insurance-readiness-check`→`life-and-health-insurance-readiness-check`, `nha-excpt-readiness-check`→`pharmacy-technician-excpt-readiness-check`, `vtne-readiness-check`→`veterinary-technician-vtne-readiness-check` |
| 20.10 | Вт | `ascp-mlt` расширить 60→120; `barber-state` расширить 60→120 | Раннер: поле «Have a key?» на старте до free attempt → потом кнопка Mock Pass $5 в hero для страниц без live-деки |
| 21.10 | Ср | `al-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | Деки с просмотрами и 0 checkout: питч / FAQ / Gumroad — `rd-exam-anki-deck`, `six-sigma-green-belt-anki-deck`, `ashrae-certifications-anki-deck` |
| 22.10 | Чт | `nha-cpct` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) (день 1/2) | Деки с просмотрами и 0 checkout: питч / FAQ / Gumroad — `bms-bas-anki-deck`, `california-real-estate-anki-deck`, `electrical-journeyman-anki-deck` |
| 23.10 | Пт | `nha-cpct` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) (день 2/2) | Таблица «Free practice options compared» (только проверенные строки + checked date): CFA L1 |
| 24.10 | Сб | `cda-childcare` расширить 60→120; `medical-billing-specialist` rewrite + расширить 60→120 | Таблица compared: SIE (FINRA 75Q untimed vs наш timed + отчёт) |
| 25.10 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 26.10

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 26.10 | Пн | `rbt-behavior-technician` rewrite + расширить 60→120; `mblex` rewrite + расширить 60→120 | Таблица compared: FRM P1 (GARP 2×100Q для зарегистрированных) |
| 27.10 | Вт | `nha-cmaa` rewrite + расширить 60→120; `nremt-aemt` rewrite + расширить 60→120 | Таблица compared: PTCB (PTCB Practice Bank за аккаунтом) |
| 28.10 | Ср | `capm` расширить 60→120; `wastewater-operator-1` расширить 60→120 | Urgency strip с verify-ссылкой: CFA L1 окно (сверить на cfainstitute.org) |
| 29.10 | Чт | `cscs-nsca` rewrite + расширить 60→120 | Таблица compared: Series 7 |
| 30.10 | Пт | `ashrae-certifications` rewrite 250 + каскад live-деки (apkg, Gumroad, samples) | Таблица compared: ServSafe Manager |
| 31.10 | Сб | `bms-bas` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | Таблица compared: Life in the UK (official 24Q / 45 min / 75%) |
| 01.11 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 02.11

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 02.11 | Пн | `six-sigma-green-belt` rewrite + расширить 60→120 | S3 «Example report layout»: скрин реального отчёта на лендинге (без фейковых данных) |
| 03.11 | Вт | `california-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | Таблица compared: CFA L2 (Practice Pack registered-only) |
| 04.11 | Ср | `property-casualty-insurance` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | Таблица compared: Series 63 + Series 65 |
| 05.11 | Чт | `nclex-rn` rewrite + расширить 60→120 | Таблица compared: PMP + LEED GA |
| 06.11 | Пт | `cfp-certification` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) (день 1/2) | civic: `australian-citizenship-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 07.11 | Сб | `cfp-certification` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) (день 2/2) | civic: `belgium-flanders-mo-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 08.11 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 09.11

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 09.11 | Пн | `mrics` rewrite 250 + каскад live-деки (apkg, Gumroad, samples) | civic: `belgium-wallonie-citoyennete-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 10.11 | Вт | `series-65` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) (день 1/2) | civic: `canadian-citizenship-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 11.11 | Ср | `series-65` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) (день 2/2) | civic: `ccse-espana-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 12.11 | Чт | `cdl-general-knowledge` rewrite + расширить 60→120; `electrical-journeyman` расширить 60→120 | civic: `czech-citizenship-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 13.11 | Пт | `series-79` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) (день 1/2) | civic: `denmark-indfoedsretsproeven-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 14.11 | Сб | `series-79` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) (день 2/2) | civic: `leben-in-deutschland-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 15.11 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 16.11

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 16.11 | Пн | `nsca-cpt` расширить 60→120 | civic: `life-in-the-uk-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 17.11 | Вт | `series-6` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) (день 1/2) | civic: `luxembourg-vivre-ensemble-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 18.11 | Ср | `series-6` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) (день 2/2) | civic: `naturalisation-francaise-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 19.11 | Чт | `series-66` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) (день 1/2) | civic: `naturalisation-suisse-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 20.11 | Пт | `series-66` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) (день 2/2) | civic: `naturalizzazione-svizzera-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 21.11 | Сб | `series-99` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) (день 1/2) | civic: `norway-statsborgerproven-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 22.11 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 23.11

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 23.11 | Пн | `series-99` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) (день 2/2) | civic: `polish-citizenship-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 24.11 | Вт | `enrolled-agent` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) (день 1/2) | civic: `portugal-nacionalidade-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 25.11 | Ср | `enrolled-agent` rewrite + расширить 120→240 + каскад live-деки (apkg, Gumroad, samples) (день 2/2) | civic: `sweden-medborgarskapsprov-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 26.11 | Чт | `ny-real-estate` расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | civic: `swiss-citizenship-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 27.11 | Пт | `real-estate-appraiser` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | civic: `finland-kansalaisuuskoe-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 28.11 | Сб | `us-citizenship` rewrite 128 + каскад live-деки (apkg, Gumroad, samples) | продукт: `cfa-level-1-formula-reference-2026` — сверка фактов, копирайт, samples, checkout |
| 29.11 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 30.11

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 30.11 | Пн | `ak-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | продукт: `australia-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 01.12 | Вт | `ar-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | продукт: `bench-energy-coal-trader-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 02.12 | Ср | `az-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | продукт: `bench-energy-metal-trader-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 03.12 | Чт | `co-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | продукт: `bench-energy-oil-trader-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 04.12 | Пт | `ga-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | продукт: `canada-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 05.12 | Сб | `il-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | продукт: `cat4-level-d-anki-deck-printable-pdf` — сверка фактов, копирайт, samples, checkout |
| 06.12 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 07.12

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 07.12 | Пн | `ma-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | продукт: `cfa-level-2-formula-reference-2026` — сверка фактов, копирайт, samples, checkout |
| 08.12 | Вт | `mi-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | продукт: `commodity-trader-pack-bundle` — сверка фактов, копирайт, samples, checkout |
| 09.12 | Ср | `nc-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | продукт: `delf-prim-printable-french-flashcards` — сверка фактов, копирайт, samples, checkout |
| 10.12 | Чт | `nj-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | продукт: `germany-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 11.12 | Пт | `oh-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | продукт: `ib-biology-sl-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 12.12 | Сб | `pa-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | продукт: `japan-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 13.12 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 14.12

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 14.12 | Пн | `va-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | продукт: `netherlands-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 15.12 | Вт | `wa-real-estate` rewrite + расширить 60→120 + каскад live-деки (apkg, Gumroad, samples) | продукт: `portugal-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 16.12 | Ср | `aapc-cpc` rewrite + расширить 60→120; `aspt-phlebotomy` rewrite + расширить 60→120 | продукт: `ptcb-study-guide-2026` — сверка фактов, копирайт, samples, checkout |
| 17.12 | Чт | `crcst` rewrite + расширить 60→120; `danb-gc` rewrite + расширить 60→120 | продукт: `saudi-arabia-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 18.12 | Пт | `danb-ice` rewrite + расширить 60→120; `first-aid-cpr` rewrite + расширить 60→120 | продукт: `servsafe-manager-complete-study-guide` — сверка фактов, копирайт, samples, checkout |
| 19.12 | Сб | `nbstsa-cst` rewrite + расширить 60→120; `nclex-pn` rewrite + расширить 60→120 | продукт: `singapore-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 20.12 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 21.12

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 21.12 | Пн | `nha-ccma` расширить 60→120; `nha-cpt-phlebotomy` rewrite + расширить 60→120 | продукт: `south-africa-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 22.12 | Вт | `nnaap-cna` rewrite + расширить 60→120; `nremt-paramedic` rewrite + расширить 60→120 | продукт: `uae-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 23.12 | Ср | `physical-therapy-aide` расширить 60→120; `precision-nutrition-l1` расширить 60→120 | продукт: `uk-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 24.12 | Чт | `veterinary-technician-vtne` rewrite + расширить 60→120; `cdl-air-brakes` rewrite + расширить 60→120 | продукт: `us-adaptation-english-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 25.12 | Пт | `cdl-combination` rewrite + расширить 60→120; `cdl-doubles-triples` rewrite + расширить 60→120 | продукт: `arabic-survival-phrases-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 26.12 | Сб | `cdl-hazmat` rewrite + расширить 60→120; `cdl-passenger` rewrite + расширить 60→120 | продукт: `australian-citizenship-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 27.12 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 28.12

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 28.12 | Пн | `cdl-tankers` rewrite + расширить 60→120; `alcohol-server` rewrite + расширить 60→120 | продукт: `canadian-citizenship-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 29.12 | Вт | `forklift-operator` rewrite + расширить 60→120; `funeral-service-arts` rewrite + расширить 60→120 | продукт: `cfa-level-1-formula-deck` — сверка фактов, копирайт, samples, checkout |
| 30.12 | Ср | `nate-core` расширить 60→120; `notary-public` rewrite + расширить 60→120 | продукт: `citizenship-naturalization-anki-bundle` — сверка фактов, копирайт, samples, checkout |
| 31.12 | Чт | `osha-10-general` rewrite + расширить 60→120; `plumbing-journeyman` расширить 60→120 | продукт: `japanese-survival-phrases-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 01.01 | Пт | `servsafe-food-handler` расширить 60→120; `unarmed-security-officer` расширить 60→120 | продукт: `korean-survival-phrases-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 02.01 | Сб | `water-treatment-operator-1` rewrite + расширить 60→120; `aswb-bachelors` расширить 60→120 | продукт: `leben-in-deutschland-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 03.01 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 04.01

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 04.01 | Пн | `aswb-clinical` расширить 60→120; `aswb-masters` rewrite + расширить 60→120 | продукт: `life-in-the-uk-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 05.01 | Вт | `phr-hrci` расширить 60→120; `praxis-core` rewrite + расширить 60→120 | продукт: `naturalisation-francaise-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 06.01 | Ср | `praxis-elementary-education` rewrite + расширить 60→120; `praxis-special-education` расширить 60→120 | продукт: `russian-survival-phrases-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 07.01 | Чт | `cosmetology-state` rewrite + расширить 60→120; `esthetician-state` rewrite + расширить 60→120 | продукт: `spanish-italian-paired-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 08.01 | Пт | `nail-technician-state` расширить 60→120; `ct-real-estate` rewrite + расширить 60→120 | продукт: `swiss-citizenship-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 09.01 | Сб | `de-real-estate` rewrite + расширить 60→120; `hi-real-estate` rewrite + расширить 60→120 | продукт: `us-citizenship-test-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 10.01 | Вс | Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py` | — |

## Неделя с 11.01

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 11.01 | Пн | `ia-real-estate` rewrite + расширить 60→120; `id-real-estate` rewrite + расширить 60→120 | Prep2Go дека: `czech-a2-cce-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 12.01 | Вт | `in-real-estate` rewrite + расширить 60→120; `ks-real-estate` rewrite + расширить 60→120 | Prep2Go дека: `danish-a2-prove-i-dansk-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 13.01 | Ср | `ky-real-estate` rewrite + расширить 60→120; `la-real-estate` rewrite + расширить 60→120 | Prep2Go дека: `greek-a2-ellinomatheia-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 14.01 | Чт | `md-real-estate` rewrite + расширить 60→120; `me-real-estate` rewrite + расширить 60→120 | Prep2Go дека: `norwegian-a2-norskprove-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 15.01 | Пт | `mn-real-estate` rewrite + расширить 60→120; `mo-real-estate` rewrite + расширить 60→120 | Prep2Go дека: `swedish-a2-sfi-anki-deck` — сверка фактов, копирайт, samples, checkout |

## Не влезло в 3 месяца

- `ms-real-estate` rewrite + расширить 60→120
- `mt-real-estate` rewrite + расширить 60→120
- `nd-real-estate` rewrite + расширить 60→120
- `ne-real-estate` rewrite + расширить 60→120
- `nh-real-estate` rewrite + расширить 60→120
- `nm-real-estate` rewrite + расширить 60→120
- `nv-real-estate` rewrite + расширить 60→120
- `ok-real-estate` rewrite + расширить 60→120
- `or-real-estate` rewrite + расширить 60→120
- `ri-real-estate` rewrite + расширить 60→120
- `sc-real-estate` rewrite + расширить 60→120
- `sd-real-estate` rewrite + расширить 60→120
- `tn-real-estate` rewrite + расширить 60→120
- `ut-real-estate` rewrite + расширить 60→120
- `vt-real-estate` rewrite + расширить 60→120
- `wi-real-estate` rewrite + расширить 60→120
- `wv-real-estate` rewrite + расширить 60→120
- `wy-real-estate` rewrite + расширить 60→120
- `issa-cpt` rewrite + расширить 60→120
- `nabcep-associate` rewrite + расширить 60→120
- `nbdhe` rewrite + расширить 60→120
- Prep2Go дека: `celi-b1-italian-anki-deck` — сверка фактов, копирайт, samples, checkout
- Prep2Go дека: `ciple-a2-european-portuguese-anki-deck` — сверка фактов, копирайт, samples, checkout
- Prep2Go дека: `ciple-a2-grammar-anki-deck` — сверка фактов, копирайт, samples, checkout
- Prep2Go дека: `dele-a2-grammar-anki-deck` — сверка фактов, копирайт, samples, checkout
- Prep2Go дека: `dele-a2-spanish-anki-deck` — сверка фактов, копирайт, samples, checkout
- Prep2Go дека: `delf-a2-printable-french-flashcards` — сверка фактов, копирайт, samples, checkout
- Prep2Go дека: `delf-b2-french-anki-deck` — сверка фактов, копирайт, samples, checkout
- Prep2Go дека: `delf-b2-grammar-anki-deck` — сверка фактов, копирайт, samples, checkout
- Prep2Go дека: `dutch-a2-inburgering-anki-deck` — сверка фактов, копирайт, samples, checkout
- Prep2Go дека: `german-a2-anki-deck` — сверка фактов, копирайт, samples, checkout
- Prep2Go дека: `german-a2-for-russian-speakers-anki-deck` — сверка фактов, копирайт, samples, checkout
- Prep2Go дека: `german-a2-for-ukrainian-speakers-anki-deck` — сверка фактов, копирайт, samples, checkout
- Prep2Go дека: `ielts-toefl-english-for-arabic-speakers-anki-deck` — сверка фактов, копирайт, samples, checkout
- Prep2Go дека: `ielts-toefl-english-for-portuguese-speakers-anki-deck` — сверка фактов, копирайт, samples, checkout
