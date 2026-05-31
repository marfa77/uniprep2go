# Бэклог UniPrep2Go

Приоритизированный список задач по продукту, сайту и каталогу колод.

Обновлено: 2026-05-31

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

### #1 — FRM Part 1 Anki Deck (оценка 9.5/10)

- [ ] **Собрать и опубликовать FRM Part 1 deck**
  - Рынок: ~50k кандидатов/год, **ноль платных Anki decks** на Gumroad/Etsy/TPT
  - Конкурент FRM Quiz Bank: $199/мес (подписка, не Anki) — высокий потолок WTP
  - Контент: quant, derivatives, fixed income, CAPM — **пересекается с CFA L1**
  - Рекомендуемая цена: **$15–18**
  - Действие: собрать deck в Anki Generator → Gumroad → `decks.ts` → `/decks/[slug]`

### #2 — CFA Level 2 Anki Deck (оценка 8.0/10)

- [ ] **Собрать CFA L2 deck как cross-sell для L1-покупателей**
  - Аудитория: те же r/CFA (213k), каждый сдавший L1 = следующий покупатель
  - Конкуренты на Etsy: $17.55–$27; бесплатный Noji (1558 cards) — слабая дистрибуция
  - Рекомендуемая цена: **$18–22**
  - На сайте уже есть запись `cfa-level-2-anki-deck` со статусом `planned`

### #3 — CFA L1 Formula Deck (быстрый spin-off)

- [ ] **Formula-only deck для CFA L1**
  - Выделить формулы из основной колоды в отдельный продукт
  - Бандл: Full deck + Formula deck за $17–18 (vs $11 + $9 поштучно)
  - На сайте уже есть запись `cfa-level-1-formula-deck` со статусом `planned`

---

## 📦 Готовые колоды на диске — к публикации

Источник: `/Users/pavelveselov/Projects/Anki Generator/out/`

Критерий качества: 1000 cards + 2000 media (audio + images).

| Колодa | Экзамен | Карточки | На Gumroad | На сайте | Приоритет |
|--------|---------|----------|------------|----------|-----------|
| Dutch Inburgering A2 | 1000 | ✅ | ✅ | готово |
| Spanish A2 | DELE | 1000 | ❌ | ❌ | 🔥 высокий — большая аудитория |
| Norwegian A2 | Norskprøve | 1000 | ❌ | ❌ | средний — мало конкурентов |
| Danish A2 | PD2/PD3 | 1000 | ❌ | ❌ | нишевый |
| English A2 (×5 языков) | для Arabic/French/PT/ES/TR speakers | 1000 | ❌ | ❌ | отдельные SKU |
| Arabic for UAE | — | 300 phrases | ❌ | ❌ | apkg готов, 601 media |
| Oil / Coal commodity | trading lexicon | 211/221 | ✅ Gumroad | ❌ сайт | добавить на сайт |
| IB Biology SL | IB | 149 | ✅ | ✅ | готово |
| CIPLE A2/B1, DELF, German, CELI | — | — | ✅ | ✅ | готово |

- [x] **Dutch Inburgering A2** — Gumroad: https://pixidstudio.gumroad.com/l/nrnwu → добавлено в `decks.ts`
- [ ] **Spanish DELE A2** — загрузить на Gumroad ($19) → добавить в `decks.ts`
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
  - Сейчас landing заточен под CFA L1, хотя каталог уже multi-category
  - Вариант: нейтральный hero «Exam prep decks» + featured products

---

## 💡 Позже (Low Priority)

### CPA — не приоритет сейчас

- [ ] **CPA FAR section deck** (оценка 6.5/10)
  - r/CPA 100k+, но рынок защищён Becker/NINJA ($1500+ с встроенными flashcards)
  - Нет paid Anki decks на Gumroad, но нужна accounting-экспертиза
  - Цена: $12–16 за section
  - Отложить до FRM + L2

### GMAT — не приоритет

- [ ] GMAT Anki deck (оценка низкая)
  - 200k кандидатов, но аудитория MBA-applicants, не finance professionals
  - Anki-культура слабее; официальные GMAC digital cards уже есть

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
