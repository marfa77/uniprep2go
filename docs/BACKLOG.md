# Бэклог UniPrep2Go

Приоритизированный список задач по продукту, сайту и каталогу колод.

Обновлено: 2026-07-15

---

## 🎯 Следующие экзамены (roadmap расширения каталога)

**Критерий отбора:** дополняет уже существующий кластер, хорошо ложится на pipeline **mock → deck → Gumroad**, даёт **MCQ / recall**, а не essay-only.

### Что уже есть (baseline)

| Кластер | Экзамены |
|---------|----------|
| **Building / sustainability** | EPA 608, BMS, LEED GA, LEED AP BD+C, WELL AP, CEM, ASHRAE, CDCP, NEBOSH, CFPS, MRICS APC, MRICS QS |
| **MBA** | GMAT Focus |
| **Finance (US)** | SIE, Series 7, Series 63, CFA L1, CFA L2, FRM Part 1 |
| **US licensing** | Insurance L&H, Insurance P&C, CA Real Estate, ServSafe, PTCB |
| **Language** | 22+ Prep2Go decks |

**Инфраструктура:** registry → mock bank → validation → Anki `.apkg` → Gumroad → `/decks` + `/mock-exams` + hub `/building-certification-anki-decks`.

---

### Tier 1 — максимально логично (дополняет live-кластеры)

#### Green building / LEED pathway

| Экзамен | Зачем | Кластер |
|---------|-------|---------|
| **LEED AP O+M** | Естественный шаг после BD+C; та же аудитория USGBC | `green-building` |
| **LEED AP ID+C** | Интерьеры, дизайнеры рядом с WELL AP | `green-building` |
| **CMVP** (AEE) | Пара к CEM — measurement & verification | `green-building` / AEE |
| **SITES AP** или **ENV SP** | Расширение sustainability без нового домена | `green-building` |

#### Facility / HVAC / energy

| Экзамен | Зачем | Кластер |
|---------|-------|---------|
| **CMVP**, **REP** (AEE) | CEM уже есть — та же экосистема AEE | `green-building` / AEE |
| **NATE** (HVAC tech) | Аудитория EPA 608 + BMS, другой угол | `hvac-controls` |
| **IFMA CFM / FMP** | Facility managers после BMS/CEM | `hvac-controls` |

#### Data centre

| Экзамен | Зачем | Кластер |
|---------|-------|---------|
| **DCDC** (EPI advanced) | Upsell после CDCP | `datacenter` |
| **CTDC** (Uptime) | Конкурирующий стандарт, тот же ICP | `datacenter` |

#### Safety / fire (рядом с NEBOSH + CFPS)

| Экзамен | Зачем | Кластер |
|---------|-------|---------|
| **CSP** (BCSP) | US safety pro, complement NEBOSH | `safety-fire` |
| **CHST / ASP** | Construction safety, OSHA-adjacent | `safety-fire` |
| **OSHA 30-Hour** (Construction / General) | Огромный спрос, MCQ-friendly summary deck | `safety-fire` |

#### Construction / PM (рядом с MRICS)

| Экзамен | Зачем | Кластер |
|---------|-------|---------|
| **PMP** (PMI) | Универсальный; QS/APC кандидаты часто идут параллельно | `construction-surveying` |
| **CCM** (CMAA) | Construction management, US counterpart MRICS | `construction-surveying` |
| **CCS / CCP** (AACE) | Cost/controls — близко MRICS QS | `construction-surveying` |

#### MBA / grad (рядом с GMAT)

| Экзамен | Зачем | Кластер |
|---------|-------|---------|
| **GRE General** | Тот же pipeline (Quant + Verbal + формулы) | `mba-admissions` |
| **EA** (Executive Assessment) | Короткий MBA diagnostic, меньше конкуренции | `mba-admissions` |

**Рекомендуемый порядок Tier 1:** LEED AP O+M → GRE → PMP → CMVP → DCDC.

---

### Tier 2 — US licensing (сайт US-first)

| Экзамен | Зачем | Примечание |
|---------|-------|------------|
| **Series 65 / 66** | Логичное продолжение SIE → 7 → 63 | Finance cluster |
| **Series 24** | Principal / supervisor track | Finance cluster |
| **Real estate — FL, TX, NY** | CA уже есть; multi-state SEO | US licensing |

---

### Tier 3 — finance (расширение CFA/FRM)

| Экзамен | Зачем |
|---------|-------|
| **CFA Level 3** | L1/L2 уже есть |
| **CAIA Level 1** | Alternatives, overlap с CFA alt investments |
| **SCR** (Sustainability & Climate Risk) | CFA Institute + green building audience |

---

### Tier 4 — сильный спрос, но другой формат / сложнее

| Экзамен | Комментарий |
|---------|-------------|
| **ARE 5.0** (архитектор US) | 6 divisions — лучше по одному division или overview deck |
| **PE / FE** (NCEES) | Большой рынок, много формул — как GMAT, но шире |
| **NCIDQ** | Дизайн интерьеров, рядом WELL / LEED ID+C |
| **LSAT / MCAT** | Огромный TAM, но другая команда контента |

---

### Практичный порядок запуска (3 волны)

```
Волна A — quick wins (без нового deck content)
  1. ~~PTCB readiness mock → привязка к существующему deck~~ ✅ (2026-07-15)
  2. Homepage / hub cross-links для новых кластеров (сделано для building)

Волна B — Tier 1 cluster extensions
  3. LEED AP O+M          (green-building)
  4. GRE General          (mba-admissions, клон GMAT pipeline)
  5. PMP                  (construction-surveying)
  6. CMVP                 (green-building / AEE)
  7. DCDC                 (datacenter upsell)

Волна C — US licensing + finance depth
  8. Series 65/66
  9. CFA L3 / CAIA L1
  10. Real estate FL/TX/NY
```

**Оценка объёма bank на экзамен:** 4–5 topics × 50 Q = 200–250 MCQ в bank; session subsample по конфигу mock (как GMAT 45 из 200).

---

## 🔥 Сейчас (High Priority)

### Монетизация — быстрые победы

- [ ] **Поднять цену CFA Level 1 с $11 до $14–15**
  - Контекст: Etsy-конкуренты с меньшим числом отзывов берут $15.60–$24
  - Действие: обновить цену на Gumroad + `src/lib/decks.ts` + JSON-LD на странице
  - Риск: низкий; текущая конверсия 4.8% даёт запас для теста

- [x] **Добавить на сайт оставшиеся Gumroad-колоды (commodities)** — Oil (`ugngbd`), Coal (`ipnqky`), 3-in-1 bundle (`tzzgh`); Metal уже был

- [x] **Sample cards для колод без превью** — скриншоты карточек с Gumroad (7 колод; CIPLE A2 и German A2 — на Gumroad нет card preview)

---

## 🚀 Следующие продукты (по результатам market research)

- [x] FRM Part 1 Anki Deck — live
- [x] CFA Level 2 Anki Deck — live
- [x] CFA L1 Formula Reference PDF — live

---

## 📦 Готовые колоды на диске — к публикации

Источник: `/Users/pavelveselov/Projects/Anki Generator/out/`

Критерий качества: 1000 cards + 2000 media (audio + images).

| Колодa | Экзамен | Карточки | На Gumroad | На сайте | Приоритет |
|--------|---------|----------|------------|----------|-----------|
| Dutch Inburgering A2 | 1000 | ✅ | ✅ | готово |
| Spanish A2 | DELE | 1000 | ✅* | ✅* | закрыто — Grammar + CCSE bundle (*отдельный FULL 1000 SKU не нужен) |
| Norwegian A2 | Norskprøve | 1000 | ❌ | ❌ | средний — мало конкурентов |
| Danish A2 | PD2/PD3 | 1000 | ❌ | ❌ | нишевый |
| English A2 (×5 языков) | для Arabic/French/PT/ES/TR speakers | 1000 | ❌ | ❌ | отдельные SKU |
| Arabic for UAE | — | 300 phrases | ❌ | ❌ | apkg готов, 601 media |
| Oil / Coal commodity | trading lexicon | 211/221 | ✅ Gumroad | ❌ сайт | добавить на сайт |
| IB Biology SL | IB | 149 | ✅ | ✅ | готово |
| CIPLE A2/B1, DELF, German, CELI | — | — | ✅ | ✅ | готово |

- [x] **Dutch Inburgering A2** — Gumroad: https://pixidstudio.gumroad.com/l/nrnwu → добавлено в `decks.ts`
- [x] **Spanish DELE A2** — отдельный FULL 1000 SKU не нужен; на сайте уже `dele-a2-grammar-anki-deck` + `dele-a2-ccse-spanish-citizenship-bundle` (мок не делаем — language Anki-only)
- [ ] **Norwegian Norskprøve A2** — загрузить на Gumroad ($19) → добавить в `decks.ts`

---

## 📈 Сайт и LLM visibility

- [ ] **Prompt panel + weekly citation tracking**
  - Из audit Blueprint 2026: отслеживать, цитирует ли ChatGPT/Perplexity uniprep2go.study
  - Интеграция с Telegram `/stats` или отдельная команда

- [ ] **Обновить README**
  - Убрать «events stored in memory» — уже Redis через Upstash
  - Описать полный каталог и категории

- [ ] **Главная: hero не только про CFA**
  - Сделано локально: catalog hub с featured decks, категориями, site-wide FAQ и ItemList JSON-LD

- [x] **LLM layer для всех колод**
  - Dynamic `/[slug].md` route для всех 13 decks
  - `buildDeckFacts` / `buildDeckMarkdown` без CFA hardcode
  - `buildLlmsTxt` и `/api/facts` описывают полный каталог

---

### Building certification line — shipped (2026-07)

- [x] 13 building decks: EPA 608, BMS, LEED GA/AP BD+C, WELL AP, CEM, ASHRAE, CDCP, NEBOSH, CFPS, MRICS×2, GMAT Focus
- [x] Mock banks 200 Q, Gumroad checkout, hub `/building-certification-anki-decks`
- [x] Cluster navigation: companions, related decks, homepage repair pairs

### HVAC / EPA 608

- [x] EPA Section 608 readiness mock + deck + Gumroad
- [x] BMS / BAS readiness mock + deck + Gumroad

### LEED, WELL AP & CEM

- [x] LEED GA, LEED AP BD+C, WELL AP, CEM — mock + deck + Gumroad

### ASHRAE, CDCP, NEBOSH, CFPS, MRICS, GMAT

- [x] Все readiness mocks + Anki decks + sample screenshots (кроме GMAT formulas polish)

---

## 💡 Позже (Low Priority)

### CPA — не приоритет сейчас

- [ ] **CPA FAR section deck** (оценка 6.5/10)
  - r/CPA 100k+, но рынок защищён Becker/NINJA ($1500+ с встроенными flashcards)
  - Отложить до расширения finance Tier 3

*(Старые секции HVAC/LEED/MRICS ниже — см. «Building certification line — shipped» выше.)*

---

## 📊 Контекст: текущие продажи Gumroad (2026-05-31)

| Продукт | Продажи | Выручка | Цена |
|---------|---------|---------|------|
| CIPLE A2 Portuguese | 3 | $87 | $19 |
| CFA Level 1 | 3 | $33 | $11 |
| DELF B2 French | 2 | $58 | $19 |
| Остальные | 0 | $0 | $19 |

**Вывод:** language certs (CIPLE, DELF) продаются лучше finance при той же цене. Multi-category каталог на сайте — правильное направление.

---

## ✅ Сделано

- [x] Persistent funnel analytics (Upstash Redis)
- [x] Funnel tracking без cookie consent (first-party)
- [x] Полный каталог 9 колод с категориями на сайте
- [x] LLM visibility audit fixes (robots.txt, llms.txt, JSON-LD, deck pages)
- [x] Cookie consent + GA/Ahrefs (consent-gated)
- [x] Telegram `/stats` bot
- [x] Apex domain canonical (uniprep2go.study)
