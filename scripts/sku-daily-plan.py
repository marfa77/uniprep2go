"""Day-by-day work plan for the next 3 months, most important first.

  npm run sku:status && python3 scripts/sku-daily-plan.py     # writes docs/mock-bank-qa/daily-plan.md

Bank queue and priority order come from scripts/sku-quality-plan.py (traffic → Tier A → finance → live → families).
Mon–Sat: one bank chunk (~equal effort) + one small side task. Sun: weekly ops (ledger, push, live check, GSC).
Re-run after each Sunday so finished SKUs drop out and the rest shifts.
"""
import datetime as dt
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
weekly_src = (ROOT / "scripts/sku-quality-plan.py").read_text()
marker = "\nL = []\n"
assert marker in weekly_src, "sku-quality-plan.py layout changed: update the import cut"
ns: dict = {"__file__": str(ROOT / "scripts/sku-quality-plan.py")}
exec(weekly_src.split(marker)[0], ns)
todo, civic, standalone, prep2go, dups = ns["todo"], ns["civic"], ns["standalone"], ns["prep2go"], ns["dups"]
DUPLICATES, DECK_NO_CHECKOUT, board = ns["DUPLICATES"], ns["DECK_NO_CHECKOUT"], ns["board"]

START = dt.date.today() + dt.timedelta(days=1)
END = START + dt.timedelta(days=91)
DAYS = [START + dt.timedelta(days=i) for i in range((END - START).days + 1)]
WORK = [d for d in DAYS if d.weekday() != 6]
WD = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

# Landing / funnel / SEO items that beat bank work (backlog 2026-10-15), in order. They replace the side task that day.
EXTRAS = [
    "`cardCount` 60→120 в `wave-deck-specs.json` + vault для 7 planned SKU от 2026-10-15 (+ «60-card» копирайт в `seo.ts`)",
    "Дубли SKU: решить merge/redirect — " + ", ".join(f"`{s}`→`{t}`" for s, t in DUPLICATES.items()),
    "Раннер: поле «Have a key?» на старте до free attempt → потом кнопка Mock Pass $5 в hero для страниц без live-деки",
    "Деки с просмотрами и 0 checkout: питч / FAQ / Gumroad — "
    + ", ".join(f"`{s}`" for s, _ in DECK_NO_CHECKOUT[:3]),
    "Деки с просмотрами и 0 checkout: питч / FAQ / Gumroad — "
    + ", ".join(f"`{s}`" for s, _ in DECK_NO_CHECKOUT[3:]),
    "Таблица «Free practice options compared» (только проверенные строки + checked date): CFA L1",
    "Таблица compared: SIE (FINRA 75Q untimed vs наш timed + отчёт)",
    "Таблица compared: FRM P1 (GARP 2×100Q для зарегистрированных)",
    "Таблица compared: PTCB (PTCB Practice Bank за аккаунтом)",
    "Urgency strip с verify-ссылкой: CFA L1 окно (сверить на cfainstitute.org)",
    "Таблица compared: Series 7",
    "Таблица compared: ServSafe Manager",
    "Таблица compared: Life in the UK (official 24Q / 45 min / 75%)",
    "S3 «Example report layout»: скрин реального отчёта на лендинге (без фейковых данных)",
    "Таблица compared: CFA L2 (Practice Pack registered-only)",
    "Таблица compared: Series 63 + Series 65",
    "Таблица compared: PMP + LEED GA",
]
SIDE = (
    [("civic", s) for s in civic]
    + [("продукт", s) for s in standalone]
    + [("Prep2Go дека", s) for s in prep2go]
)
SUNDAY = ("Неделя: ledger-строки → `npm run sku:status` → push + live check · `npm run gsc:export`, Layer A ≤10 "
          "Request indexing, Layer B 1 URL · `python3 scripts/sku-daily-plan.py`")

CASCADE_EFFORT = 60  # apkg rebuild + Gumroad file + samples render/publish for a live deck
for r in todo:
    r["effort"] += CASCADE_EFFORT if r["anki"] == "live" else 0
total = sum(r["effort"] for r in todo)
cap = total / len(WORK)


def label(r):
    s = r["slug"].replace("-readiness-check", "")
    size = f"{r['bank']}→{r['target']}" if r["new"] > 0 else str(r["bank"])
    verb = "расширить" if r["status"] == "small-bank" else "rewrite + расширить" if r["new"] > 0 else "rewrite"
    deck = " + каскад live-деки (apkg, Gumroad, samples)" if r["anki"] == "live" else ""
    return f"`{s}` {verb} {size}{deck}"


# Pack the queue into work days of roughly equal effort; a big bank spans several days.
main: list[list[str]] = [[] for _ in WORK]
day, load = 0, 0.0
for r in todo:
    if day >= len(WORK):
        break
    span = max(1, math.ceil(r["effort"] / cap - 0.3))
    if span > 1:
        if load > 0:
            day += 1
        for k in range(span):
            if day + k < len(WORK):
                main[day + k].append(f"{label(r)} (день {k + 1}/{span})")
        day += span
        load = 0.0
        continue
    if load > 0 and load + r["effort"] > cap * 1.3:
        day, load = day + 1, 0.0
        if day >= len(WORK):
            break
    main[day].append(label(r))
    load += r["effort"]
    if load >= cap:
        day, load = day + 1, 0.0
left = [r for r in todo if not any(f"`{r['slug'].replace('-readiness-check', '')}`" in x for d in main for x in d)]

side_queue = list(EXTRAS) + [f"{k}: `{s}` — сверка фактов, копирайт, samples, checkout" for k, s in SIDE]
L = [
    f"# Дневной план {START:%d.%m.%Y} – {END:%d.%m.%Y}",
    "",
    f"Сгенерировано {dt.date.today()} `python3 scripts/sku-daily-plan.py` из `sku-status.json` "
    f"({board['generated'][:10]}). Порядок: трафик → Tier A → финансы → live → семейства. "
    "Каждое воскресенье пересчитывать: готовые SKU выпадают, остальное сдвигается.",
    "",
    f"- Банков к `ok`: **{len(todo)}** (~{cap:.0f} единиц в рабочий день; 1 единица = 1 новый вопрос или 2 проверенных).",
    "- Каждый банк: гейты → построчный content review → ops → ledger → для 🟢 live-деки каскад в тот же день.",
    "- «Плюс немного»: сначала лендинги/воронка из бэклога, потом civic, продукты, Prep2Go деки.",
    "",
]
w = 0
for d in DAYS:
    if d == START or d.weekday() == 0:
        L += ["", f"## Неделя с {d:%d.%m}", "", "| Дата | | Главное | Плюс немного |", "|---|---|---|---|"]
    if d.weekday() == 6:
        L.append(f"| {d:%d.%m} | Вс | {SUNDAY} | — |")
        continue
    i = WORK.index(d)
    m = "; ".join(main[i]) if main[i] else "Буфер: доделать хвосты недели"
    s = side_queue.pop(0) if side_queue else "—"
    L.append(f"| {d:%d.%m} | {WD[d.weekday()]} | {m} | {s} |")
if left or side_queue:
    L += ["", "## Не влезло в 3 месяца", ""]
    L += [f"- {label(r)}" for r in left]
    L += [f"- {s}" for s in side_queue]
out = ROOT / "docs/mock-bank-qa/daily-plan.md"
out.write_text("\n".join(L) + "\n")
print(f"{out.relative_to(ROOT)}: {len(WORK)} work days, cap {cap:.0f}/day, {len(todo)} banks, "
      f"{len(left)} banks + {len(side_queue)} side left over")
