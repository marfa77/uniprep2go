# Порядок аудита и правки банков в `ops`

Один slug за раз. Правки только в Prep2Go `ops.*`.  
JSON в git, Anki `.apkg`, Gumroad, `llms:export` — **только после явного ship**.

Сайт уже читает `ops` (`getQuestionBankFromOps`). Пока банк в `fixing`, на сайт его не отдаём (см. статус ниже). Иначе живой мок поедет на полуготовом тексте.

## Статусы (`ops.mock_banks.review_status`)

| статус | смысл | сайт |
|---|---|---|
| `imported` | залит, ещё не смотрели | не отдавать, если есть `ready`; иначе старый импорт |
| `audited` | механический проход записан в `mock_bank_audits` | нет |
| `fixing` | Sol/Opus пишет в `ops` | **нет** |
| `ready` | повторный аудит чистый (или принятый P2) | **да** |
| `blocked` | P0, чинить нечем / ждём модель | нет |

Сайт читает `ops_get_live_mock_bank` (только `ready`) и падает на git JSON, если банк ещё не ready.

Vercel production: `PREP2GO_SUPABASE_URL` + `PREP2GO_SUPABASE_SERVICE_ROLE_KEY` (sensitive). Без них live loader всегда берёт git JSON.

## Кто пишет контент

| что | кто |
|---|---|
| SQL / `audit-one-bank.py` / коллизии / key bias | этот чат, любой модель |
| explanation, distractors, стемы, факты, ретег топиков | **только** `gpt-5.6-sol-medium` |
| P0 remap / contamination / шаблонные дистракторы | эскалировать `claude-opus-5-thinking-high` |
| Grok / OpenRouter | запрещены на контент банка, кроме явного override («пусть грок правит») |

## Порядок одного банка

### 0. Выбрать slug

Не пачка. Очередь: P0 civic (LITUK → CA → AU → US) → остальные `thin_distractor_count > 0` → live Layer B → остальное.

```sql
select slug, smell_tier, thin_distractor_count, review_status
from ops.mock_banks
order by smell_tier nulls last, thin_distractor_count desc, slug;
```

### 1. Снимок

Выгрузить текущий `ops` в `/tmp/{slug}-ops-current.json` через `ops_get_mock_bank`.  
Не перезаписывать `src/data/mock-exams/`.

### 2. Механика (этот чат)

```bash
python3 scripts/ops-mock-banks/audit-one-bank.py   # сейчас зашит LITUK; обобщить --slug
```

Считать P0, если есть хоть одно:

- thin distractor ≥ 50% («Sounds plausible» / «The correct choice»)
- explanation = текст правильного option ≥ 50%
- colliding options (два верных, Yes/No-клоны, year-swap 2 AD / 3 AD)
- remap leftover (`Converted from`, чужой exam body в стеме)
- фактическая ошибка (пример: Boudicca 43 AD)

Записать проход:

```sql
update ops.mock_banks
set review_status = 'audited', smell_tier = 'P0'|'P1'|'P2'|'clean', updated_at = now()
where slug = '...';

insert into ops.mock_bank_audits (bank_slug, smell_tier, key_bias, thin_distractor_count, notes)
values ('...', '...', '{}'::jsonb, n, 'дата + blockers');
```

Competitor AEO / SERP сюда не мешать (каденс 60 дней, другой ledger).

### 3. Стоп-кран

- Sol/Opus недоступны → `blocked`, **не** чинить Grokom, ждать.
- Только механика без контента (опечатка в одном поле) → можно править здесь же.
- P0/P1 контент → шаг 4.

### 4. Статус `fixing`, потом ревьюер

```sql
update ops.mock_banks set review_status = 'fixing' where slug = '...';
```

Резать банк по `topicId` (`/tmp/{slug}-{topic}.json`), не одним полотном на 200 Q.

Брифинг ревьюеру (обязательно):

- те же `id`, тот же count, тот же `examSlug`
- запрет thin-фраз
- explanation 2–4 предложения ≠ option
- дистракторы — near-miss, не клоны и не year-swap
- не выдумывать official Q-count / pass score
- писать **только** `/tmp/{slug}-fix-{topic}.json`

### 5. Залить правку только в `ops`

Склеить топики → `public.ops_upsert_mock_bank` (как `import-all.ts`, но один slug из `/tmp`, не из git).  
`src/data/mock-exams/*.json` не трогать.

### 6. Повторный аудит по базе

Снова шаг 2. Выход:

- P0/P1 остались → ещё один Sol-проход по дырявым id, не весь банк
- clean / принятый P2 → `review_status = 'ready'`

### 7. Корабль — отдельное «да»

Только после user OK, по порядку:

1. сайт уже сам читает `ready` из `ops` (кэш ~5 мин)
2. export JSON в git — если нужен Anki / офлайн тесты
3. Anki pipeline / Gumroad polish
4. focused tests + `llms:export` если факты на странице изменились
5. commit/push — только если попросили

Без пункта 7 ничего из этого не делать.

## Очередь сейчас

| slug | статус | следующий шаг |
|---|---|---|
| `life-in-the-uk-readiness-check` | `ready` clean (Grok 2026-09-21) | ship JSON/Anki only on user OK |
| `canadian-citizenship-readiness-check` | `ready` clean (Grok 2026-09-21) | ship JSON/Anki only on user OK |
| `australian-citizenship-readiness-check` | `ready` clean (Grok 2026-09-21) | ship JSON/Anki only on user OK |
| `us-citizenship-readiness-check` | `ready` clean (Grok 2026-09-21) | ship JSON/Anki only on user OK |
| `leben-in-deutschland-readiness-check` | `ready` clean (Grok batch 10) | ship JSON/Anki only on user OK |
| `naturalisation-francaise-readiness-check` | `ready` clean | ship only on user OK |
| `ccse-espana-readiness-check` | `ready` clean | ship only on user OK |
| `leed-ap-bd-c-readiness-check` | `ready` (audit clean; key-bias P1 leftover) | ship only on user OK |
| `belgium-flanders-mo` / LU / PT / CZ / DK / NO | `ready` accepted P2 or clean | authored banks, not factory |
| Swiss DE/FR/IT | `ready` (Grok batch 20; factory rewrite) | ship only on user OK |
| Wallonie / FI / PL / SE | `ready` accepted P2 or clean | authored |
| LEED O+M / GA, WELL, ASHRAE, CEM, CDCP, NEBOSH, MRICS×2, EPA 608, CFPS, ACE, ACSM | `ready` clean | authored building/fitness |
| money-36: CFA L1/L2, S63/S7, FRM, L&H, P&C, CA/FL/TX/NY RE, NHA×5, NREMT×3, NCLEX RN/PN, CNA, NBDHE, CST, VTNE, MBLEx, ASCP, ARDMS, TMC, RBT, CDL×3, NASM, ISSA, SHRM | `ready` clean | authored keep; no factory rewrite |
| **итог** | **100 / 206 ready** | top-sellable done |
| non-civic re-export 2026-09-21 | LEED BD+C (250 rewrite) + PTCB (1 expl) + GMAT (uniquify 8 dup ids) | civic skipped; SIE quick = remap of full, no file |
| остальные ~106 | imported | state-RE tail + niche; не трогать без запроса |

## Чего не делать

- Не чинить все 206 за один проход
- Не выгружать в git «чтобы не потерять» до `ready`
- Не запускать `import-all.ts` поверх починенного банка (затрёт git-оригиналом)
- Не мешать AEO/GSC в этот контур
- Не писать банк Grokom, кроме явного override
