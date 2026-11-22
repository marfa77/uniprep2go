# Дневной план 15.11.2026 – 14.02.2027

Сгенерировано 2026-11-15 `python3 scripts/sku-daily-plan.py` из `sku-status.json` (2026-11-14). Порядок: трафик → Tier A → финансы → live → семейства. Каждое воскресенье пересчитывать: готовые SKU выпадают, остальное сдвигается.

- Банков к `ok`: **39**, плюс закреплённые LEED и Flanders MO. День закрыт, когда каждый SKU в строке сдан целиком: гейты, построчный review, ops, ledger, и для live-деки каскад (apkg, Gumroad, samples).
- Ориентир нагрузки ~45 единиц (1 = новый вопрос, 0.5 = проверенный). Банк больше дня всё равно один день и один результат, без «день 1/2».
- «Плюс немного»: сначала лендинги/воронка из бэклога, потом civic, продукты, Prep2Go деки.
- Тонкие штаты недвижимости вне CA/FL/TX/NY заморожены и в эти 3 месяца не ставятся: **45** банков. CA, FL, NY и TX уже `ok`.

## Закреплено

| SKU | Сейчас | Цель | Когда |
|---|---|---|---|
| `leed-green-associate-readiness-check` + `leed-green-associate-anki-deck` | ok · 60 / 120 · live $9.99 | банк 120→210, сессия 60 | Пн 16.11 |
| `belgium-flanders-mo-readiness-check` + `belgium-flanders-mo-anki-deck` | civic · 60 / 220 · Anki 220 / $19 | сделано 15.11 | Вт 17.11 |


## Неделя с 15.11

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 15.11 | Вс | Неделя: ledger и выкладка уже в main. Пересчёт — `python3 scripts/sku-daily-plan.py`, если доска сдвинулась. | — |

## Неделя с 16.11

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 16.11 | Пн | `leed-green-associate` расширить 120→210 + каскад live-деки (apkg, Gumroad, samples). Сессия остаётся 60 / 75 | Деки с просмотрами и 0 checkout: питч / FAQ / Gumroad — `rd-exam-anki-deck`, `six-sigma-green-belt-anki-deck`, `ashrae-certifications-anki-deck` |
| 17.11 | Вт | `belgium-flanders-mo` расширить банк 120→220 и Anki 165→220. Сессия остаётся 60 / 45. Официальный standaardtest остаётся 41 / 120 | Деки с просмотрами и 0 checkout: питч / FAQ / Gumroad — `bms-bas-anki-deck`, `california-real-estate-anki-deck`, `electrical-journeyman-anki-deck` |
| 18.11 | Ср | `us-citizenship` rewrite 128 + каскад live-деки (apkg, Gumroad, samples) | Таблица compared: FRM P1 (GARP 2×100Q для зарегистрированных) |
| 19.11 | Чт | `aapc-cpc` rewrite + расширить 60→120 | civic: `australian-citizenship-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 20.11 | Пт | `danb-gc` rewrite + расширить 60→120 | civic: `belgium-wallonie-citoyennete-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 21.11 | Сб | `danb-ice` rewrite + расширить 60→120 | `npm run gsc:export`. Читать только `cfa level 1 practice test` и `cfa level 2 practice exam`. Заголовок не менять до этой строки. Ещё: civic: `canadian-citizenship-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 22.11 | Вс | Неделя: ledger и выкладка уже в main. Пересчёт — `python3 scripts/sku-daily-plan.py`, если доска сдвинулась. | — |

## Неделя с 23.11

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 23.11 | Пн | `first-aid-cpr` rewrite + расширить 60→120 | civic: `ccse-espana-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 24.11 | Вт | `nbstsa-cst` rewrite + расширить 60→120 | civic: `czech-citizenship-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 25.11 | Ср | `nclex-pn` rewrite + расширить 60→120 | civic: `denmark-indfoedsretsproeven-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 26.11 | Чт | `nha-ccma` расширить 60→120 | civic: `finland-kansalaisuuskoe-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 27.11 | Пт | `nha-cpt-phlebotomy` rewrite + расширить 60→120 | civic: `leben-in-deutschland-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 28.11 | Сб | `nnaap-cna` rewrite + расширить 60→120 | civic: `life-in-the-uk-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 29.11 | Вс | Неделя: ledger и выкладка уже в main. Пересчёт — `python3 scripts/sku-daily-plan.py`, если доска сдвинулась. | — |

## Неделя с 30.11

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 30.11 | Пн | `nremt-paramedic` rewrite + расширить 60→120 | civic: `luxembourg-vivre-ensemble-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 01.12 | Вт | `physical-therapy-aide` расширить 60→120 | civic: `naturalisation-francaise-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 02.12 | Ср | `precision-nutrition-l1` расширить 60→120 | civic: `naturalisation-suisse-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 03.12 | Чт | `veterinary-technician-vtne` rewrite + расширить 60→120 | civic: `naturalizzazione-svizzera-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 04.12 | Пт | `cdl-air-brakes` rewrite + расширить 60→120 | civic: `norway-statsborgerproven-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 05.12 | Сб | `cdl-combination` rewrite + расширить 60→120 | civic: `polish-citizenship-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 06.12 | Вс | Неделя: ledger и выкладка уже в main. Пересчёт — `python3 scripts/sku-daily-plan.py`, если доска сдвинулась. | — |

## Неделя с 07.12

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 07.12 | Пн | `cdl-doubles-triples` rewrite + расширить 60→120 | civic: `portugal-nacionalidade-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 08.12 | Вт | `cdl-passenger` rewrite + расширить 60→120 | civic: `sweden-medborgarskapsprov-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 09.12 | Ср | `cdl-tankers` rewrite + расширить 60→120 | civic: `swiss-citizenship-readiness-check` — сверка фактов, копирайт, samples, checkout |
| 10.12 | Чт | `alcohol-server` rewrite + расширить 60→120 | продукт: `bench-energy-coal-trader-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 11.12 | Пт | `nate-core` расширить 60→120 | продукт: `cfa-level-1-formula-reference-2026` — сверка фактов, копирайт, samples, checkout |
| 12.12 | Сб | `notary-public` rewrite + расширить 60→120 | продукт: `cfa-level-1-pass-pack` — сверка фактов, копирайт, samples, checkout |
| 13.12 | Вс | Неделя: ledger и выкладка уже в main. Пересчёт — `python3 scripts/sku-daily-plan.py`, если доска сдвинулась. | — |

## Неделя с 14.12

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 14.12 | Пн | `osha-10-general` rewrite + расширить 60→120 | продукт: `cfa-level-2-formula-reference-2026` — сверка фактов, копирайт, samples, checkout |
| 15.12 | Вт | `plumbing-journeyman` расширить 60→120 | продукт: `portuguese-survival-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 16.12 | Ср | `servsafe-food-handler` расширить 60→120 | продукт: `ptcb-2026-pass-pack` — сверка фактов, копирайт, samples, checkout |
| 17.12 | Чт | `unarmed-security-officer` расширить 60→120 | продукт: `ptcb-study-guide-2026` — сверка фактов, копирайт, samples, checkout |
| 18.12 | Пт | `water-treatment-operator-1` rewrite + расширить 60→120 | продукт: `australia-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 19.12 | Сб | `aswb-bachelors` расширить 60→120 | продукт: `bench-energy-metal-trader-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 20.12 | Вс | Неделя: ledger и выкладка уже в main. Пересчёт — `python3 scripts/sku-daily-plan.py`, если доска сдвинулась. | — |

## Неделя с 21.12

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 21.12 | Пн | `aswb-clinical` расширить 60→120 | продукт: `bench-energy-oil-trader-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 22.12 | Вт | `aswb-masters` rewrite + расширить 60→120 | продукт: `canada-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 23.12 | Ср | `phr-hrci` расширить 60→120 | продукт: `cat4-level-d-anki-deck-printable-pdf` — сверка фактов, копирайт, samples, checkout |
| 24.12 | Чт | `praxis-core` rewrite + расширить 60→120 | продукт: `commodity-trader-pack-bundle` — сверка фактов, копирайт, samples, checkout |
| 25.12 | Пт | `praxis-elementary-education` rewrite + расширить 60→120 | продукт: `delf-prim-printable-french-flashcards` — сверка фактов, копирайт, samples, checkout |
| 26.12 | Сб | `praxis-special-education` расширить 60→120 | продукт: `germany-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 27.12 | Вс | Неделя: ledger и выкладка уже в main. Пересчёт — `python3 scripts/sku-daily-plan.py`, если доска сдвинулась. | — |

## Неделя с 28.12

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 28.12 | Пн | `cosmetology-state` rewrite + расширить 60→120 | продукт: `ib-biology-sl-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 29.12 | Вт | `esthetician-state` rewrite + расширить 60→120 | продукт: `japan-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 30.12 | Ср | `nail-technician-state` расширить 60→120 | продукт: `netherlands-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 31.12 | Чт | `nabcep-associate` rewrite + расширить 60→120 | продукт: `portugal-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 01.01 | Пт | `nbdhe` rewrite + расширить 60→120 | продукт: `saudi-arabia-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 02.01 | Сб | Буфер: доделать хвосты недели | продукт: `servsafe-manager-complete-study-guide` — сверка фактов, копирайт, samples, checkout |
| 03.01 | Вс | Неделя: ledger и выкладка уже в main. Пересчёт — `python3 scripts/sku-daily-plan.py`, если доска сдвинулась. | — |

## Неделя с 04.01

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 04.01 | Пн | Буфер: доделать хвосты недели | продукт: `singapore-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 05.01 | Вт | Буфер: доделать хвосты недели | продукт: `south-africa-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 06.01 | Ср | Буфер: доделать хвосты недели | продукт: `uae-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 07.01 | Чт | Буфер: доделать хвосты недели | продукт: `uk-survival-guide-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 08.01 | Пт | Буфер: доделать хвосты недели | продукт: `us-adaptation-english-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 09.01 | Сб | Буфер: доделать хвосты недели | продукт: `arabic-survival-phrases-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 10.01 | Вс | Неделя: ledger и выкладка уже в main. Пересчёт — `python3 scripts/sku-daily-plan.py`, если доска сдвинулась. | — |

## Неделя с 11.01

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 11.01 | Пн | Буфер: доделать хвосты недели | продукт: `australian-citizenship-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 12.01 | Вт | Буфер: доделать хвосты недели | продукт: `canadian-citizenship-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 13.01 | Ср | Буфер: доделать хвосты недели | продукт: `cfa-level-1-formula-deck` — сверка фактов, копирайт, samples, checkout |
| 14.01 | Чт | Буфер: доделать хвосты недели | продукт: `citizenship-naturalization-anki-bundle` — сверка фактов, копирайт, samples, checkout |
| 15.01 | Пт | Буфер: доделать хвосты недели | продукт: `japanese-survival-phrases-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 16.01 | Сб | Буфер: доделать хвосты недели | продукт: `korean-survival-phrases-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 17.01 | Вс | Неделя: ledger и выкладка уже в main. Пересчёт — `python3 scripts/sku-daily-plan.py`, если доска сдвинулась. | — |

## Неделя с 18.01

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 18.01 | Пн | Буфер: доделать хвосты недели | продукт: `leben-in-deutschland-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 19.01 | Вт | Буфер: доделать хвосты недели | продукт: `life-in-the-uk-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 20.01 | Ср | Буфер: доделать хвосты недели | продукт: `naturalisation-francaise-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 21.01 | Чт | Буфер: доделать хвосты недели | продукт: `russian-survival-phrases-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 22.01 | Пт | Буфер: доделать хвосты недели | продукт: `spanish-italian-paired-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 23.01 | Сб | Буфер: доделать хвосты недели | продукт: `swiss-citizenship-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 24.01 | Вс | Неделя: ledger и выкладка уже в main. Пересчёт — `python3 scripts/sku-daily-plan.py`, если доска сдвинулась. | — |

## Неделя с 25.01

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 25.01 | Пн | Буфер: доделать хвосты недели | продукт: `us-citizenship-test-prep2go-app` — сверка фактов, копирайт, samples, checkout |
| 26.01 | Вт | Буфер: доделать хвосты недели | Prep2Go дека: `celi-b1-italian-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 27.01 | Ср | Буфер: доделать хвосты недели | Prep2Go дека: `ciple-a2-grammar-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 28.01 | Чт | Буфер: доделать хвосты недели | Prep2Go дека: `dele-a2-grammar-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 29.01 | Пт | Буфер: доделать хвосты недели | Prep2Go дека: `dele-a2-spanish-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 30.01 | Сб | Буфер: доделать хвосты недели | Prep2Go дека: `delf-a2-printable-french-flashcards` — сверка фактов, копирайт, samples, checkout |
| 31.01 | Вс | Неделя: ledger и выкладка уже в main. Пересчёт — `python3 scripts/sku-daily-plan.py`, если доска сдвинулась. | — |

## Неделя с 01.02

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 01.02 | Пн | Буфер: доделать хвосты недели | Prep2Go дека: `delf-b2-french-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 02.02 | Вт | Буфер: доделать хвосты недели | Prep2Go дека: `delf-b2-grammar-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 03.02 | Ср | Буфер: доделать хвосты недели | Prep2Go дека: `dutch-a2-inburgering-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 04.02 | Чт | Буфер: доделать хвосты недели | Prep2Go дека: `german-a2-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 05.02 | Пт | Буфер: доделать хвосты недели | Prep2Go дека: `ielts-toefl-english-for-arabic-speakers-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 06.02 | Сб | Буфер: доделать хвосты недели | Prep2Go дека: `ielts-toefl-english-for-portuguese-speakers-anki-deck` — сверка фактов, копирайт, samples, checkout |
| 07.02 | Вс | Неделя: ledger и выкладка уже в main. Пересчёт — `python3 scripts/sku-daily-plan.py`, если доска сдвинулась. | — |

## Неделя с 08.02

| Дата | | Главное | Плюс немного |
|---|---|---|---|
| 08.02 | Пн | Буфер: доделать хвосты недели | — |
| 09.02 | Вт | Буфер: доделать хвосты недели | — |
| 10.02 | Ср | Буфер: доделать хвосты недели | — |
| 11.02 | Чт | Буфер: доделать хвосты недели | — |
| 12.02 | Пт | Буфер: доделать хвосты недели | — |
| 13.02 | Сб | Буфер: доделать хвосты недели | — |
| 14.02 | Вс | Неделя: ledger и выкладка уже в main. Пересчёт — `python3 scripts/sku-daily-plan.py`, если доска сдвинулась. | — |
