"""Spread the remaining SKU quality work evenly over 13 weeks (Nov 2026 – Jan 2027).

  python3 scripts/sku-quality-plan.py            # writes docs/mock-bank-qa/quality-plan-2026-11.md

Input: docs/mock-bank-qa/sku-status.json (run `npm run sku:status` first).
Effort = existing items to review × 0.5 + new items needed to reach the bank floor × 1.
Mocks are taken in priority order and packed into weeks of equal effort; families stay together.
"""
import datetime as dt
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
board = json.loads((ROOT / "docs/mock-bank-qa/sku-status.json").read_text())
WEEKS = [dt.date(2026, 11, 2) + dt.timedelta(weeks=i) for i in range(13)]

# Top priority (user, 2026-10-15): non-ok SKUs with real traffic, unique visitors all-time from Redis analytics
# (Vercel Analytics not connected; tiny numbers, may include the owner's own visits).
# (slug, mock starts, mock views, deck views) in the user's order.
TRAFFIC_SNAPSHOT = "2026-10-15"
TRAFFIC_STARTED = [
    ("ascp-mls-readiness-check", 3, 7, 1), ("rd-exam-readiness-check", 2, 6, 7),
    ("veterinary-assistant-readiness-check", 2, 10, 1), ("nha-cbcs-readiness-check", 2, 5, 2),
    ("aama-cma-readiness-check", 2, 4, 1), ("aha-bls-provider-readiness-check", 2, 3, 2),
    ("medication-aide-readiness-check", 2, 3, 2), ("nremt-emt-readiness-check", 1, 7, 3),
    ("fl-real-estate-readiness-check", 1, 4, 2), ("ascp-mlt-readiness-check", 1, 5, 1),
    ("barber-state-readiness-check", 1, 3, 3), ("al-real-estate-readiness-check", 1, 3, 2),
    ("nha-cpct-readiness-check", 1, 3, 2), ("cda-childcare-readiness-check", 1, 4, 1),
    ("medical-billing-specialist-readiness-check", 1, 3, 1), ("rbt-behavior-technician-readiness-check", 1, 3, 1),
    ("mblex-readiness-check", 1, 2, 1), ("nha-cmaa-readiness-check", 1, 2, 1),
    ("nremt-aemt-readiness-check", 1, 2, 1), ("capm-readiness-check", 1, 2, 1),
    ("wastewater-operator-1-readiness-check", 1, 2, 1),
]
# No mock start yet, but >= 5 unique views (mock + deck combined).
TRAFFIC_VIEWED = [
    ("cscs-nsca-readiness-check", 10), ("ashrae-certifications-readiness-check", 9), ("bms-bas-readiness-check", 8),
    ("six-sigma-green-belt-readiness-check", 8), ("california-real-estate-readiness-check", 7),
    ("property-casualty-insurance-readiness-check", 7), ("nclex-rn-readiness-check", 7),
    ("cfp-certification-readiness-check", 6), ("mrics-readiness-check", 6), ("series-65-readiness-check", 6),
    ("cdl-general-knowledge-readiness-check", 6), ("electrical-journeyman-readiness-check", 6),
    ("series-79-readiness-check", 5), ("nsca-cpt-readiness-check", 5),
]
# Deck pages with views but 0 checkout intent: fix the deck page / Gumroad pitch, not only the bank.
DECK_NO_CHECKOUT = [("rd-exam-anki-deck", 7), ("six-sigma-green-belt-anki-deck", 5), ("ashrae-certifications-anki-deck", 4),
                    ("bms-bas-anki-deck", 4), ("california-real-estate-anki-deck", 4), ("electrical-journeyman-anki-deck", 4)]
TRAFFIC = [s for s, *_ in TRAFFIC_STARTED] + [s for s, _ in TRAFFIC_VIEWED]

TIER_A = ["life-and-health-insurance-readiness-check", "series-63-readiness-check", "ptcb-pharmacy-technician-mock",
          "cfa-level-2-readiness-check", "servsafe-manager-mock"]
PADDING = ["mortgage-loan-originator-readiness-check", "medical-scribe-readiness-check", "mrics-readiness-check",
           "gmat-focus-readiness-check"]
FINANCE_B = ["sie-full-mock", "series-7-readiness-check", "cfa-level-1-readiness-check", "frm-part-1-readiness-check",
             "series-6-readiness-check", "series-65-readiness-check", "series-66-readiness-check",
             "series-79-readiness-check", "series-99-readiness-check", "cfp-certification-readiness-check",
             "enrolled-agent-readiness-check"]
LIVE_OTHER = ["california-real-estate-readiness-check", "fl-real-estate-readiness-check", "ny-real-estate-readiness-check",
              "property-casualty-insurance-readiness-check", "rd-exam-readiness-check", "nha-cpct-readiness-check",
              "ashrae-certifications-readiness-check", "mrics-quantity-surveying-readiness-check", "bms-bas-readiness-check",
              "real-estate-appraiser-readiness-check", "us-citizenship-readiness-check"]
# Same exam sold twice: decide merge/redirect instead of rewriting both.
DUPLICATES = {
    "life-health-insurance-readiness-check": "life-and-health-insurance-readiness-check",
    "nha-excpt-readiness-check": "pharmacy-technician-excpt-readiness-check",
    "vtne-readiness-check": "veterinary-technician-vtne-readiness-check",
}
FAMILIES = [
    ("Health", ("nclex", "nremt", "nnaap", "nha-", "aapc", "aama", "danb", "crcst", "nbstsa", "ascp", "aspt", "medication-aide",
                "vtne", "veterinary", "physical-therapy", "rbt", "first-aid", "aha-bls", "precision-nutrition")),
    ("CDL", ("cdl-",)),
    ("Trades & safety", ("electrical", "plumbing", "nate", "water", "wastewater", "forklift", "osha", "notary", "alcohol",
                          "funeral", "unarmed", "servsafe-food")),
    ("Fitness, HR, PM, education", ("cscs", "nsca", "phr", "capm", "six-sigma", "praxis", "cda", "aswb")),
    ("Beauty", ("cosmetology", "esthetician", "barber", "nail")),
    ("State real estate (planned)", ("-real-estate-",)),
]


def floor(session):
    return 75 if session <= 25 else 120 if session <= 60 else 2 * session


def family(slug):
    for name, keys in FAMILIES:
        if any(k in slug for k in keys):
            return name
    return "Other planned"


rows = {r["slug"]: r for r in board["rows"]}
todo = [r for r in board["rows"] if r["status"] in ("rewrite", "small-bank", "thin-bank", "unreviewed")]
dups = [r for r in todo if r["slug"] in DUPLICATES]
todo = [r for r in todo if r["slug"] not in DUPLICATES]


def group(r):
    s = r["slug"]
    if s in TRAFFIC:
        return (-1, "Traffic priority", TRAFFIC.index(s))
    if s in TIER_A:
        return (0, "Tier A money", TIER_A.index(s))
    if s in PADDING:
        return (1, "Length-padding junk (systemic)", PADDING.index(s))
    if s in FINANCE_B:
        return (2, "Finance (live)", FINANCE_B.index(s))
    if s in LIVE_OTHER:
        return (3, "Other live", LIVE_OTHER.index(s))
    if r["anki"] == "live" or "-real-estate-" in s and r["anki"] == "live":
        return (4, "Live state real estate", 0)
    fam = family(s)
    return (5 + [f[0] for f in FAMILIES].index(fam) if fam in [f[0] for f in FAMILIES] else 11, fam, 0)


for r in todo:
    target = max(floor(r["session"]), r["bank"])
    r["target"] = target
    r["new"] = target - r["bank"]
    r["effort"] = r["bank"] * 0.5 + r["new"]
    r["group"] = group(r)
todo.sort(key=lambda r: (r["group"][0], r["group"][2], r["slug"]))

total = sum(r["effort"] for r in todo)
per_week = total / len(WEEKS)
plan = [[] for _ in WEEKS]
acc = 0.0
for r in todo:
    w = min(int(acc // per_week), len(WEEKS) - 1)
    plan[w].append(r)
    acc += r["effort"]

civic = [r["slug"] for r in board["rows"] if r["status"] == "civic"]
standalone = [s["slug"] for s in board["standalone"]]
QUEUED_LANG = ("norwegian", "swedish", "greek", "czech", "danish")
prep2go = sorted((s["slug"] for s in board["prep2goDecks"] if not s["lastWork"]),
                 key=lambda s: (not s.startswith(QUEUED_LANG), s))
side = [[] for _ in WEEKS]


def spread(items, label):
    for i, s in enumerate(items):
        side[i * len(WEEKS) // len(items)].append((label, s))


spread(civic, "civic")
spread(standalone, "product")
spread(prep2go, "Prep2Go deck")

L = []
L.append("# SKU quality plan: Nov 2026 – Jan 2027")
L.append("")
L.append(f"Generated {dt.date.today()} by `python3 scripts/sku-quality-plan.py` from `sku-status.json` "
         f"({board['generated'][:10]}). Re-run after each week; the board is the source of truth for status.")
L.append("")
L.append("## Scope")
L.append("")
live = sum(1 for r in todo if r["anki"] == "live")
L.append(f"- **{len(todo)} mock + Anki pairs** to bring to `ok`: {live} with a live deck, {len(todo) - live} planned. "
         f"{sum(r['new'] for r in todo)} new items to write, {sum(r['bank'] for r in todo)} existing to review.")
L.append(f"- **{len(dups)} duplicate SKUs** (same exam sold twice) → merge/redirect decision in week 1, not a rewrite: "
         + ", ".join(f"`{r['slug']}` → `{DUPLICATES[r['slug']]}`" for r in dups) + ".")
L.append(f"- **{len(civic)} civic banks** (official question pools): check against the current official source, fix drift.")
L.append(f"- **{len(standalone)} standalone products** (survival-guide apps, PDFs, formula sheets, bundles, Bench Energy): "
         "copy, facts, samples and checkout audit.")
L.append(f"- **{len(prep2go)} Prep2Go language decks** never audited (DB text → apkg → Gumroad/Lemon); "
         "Norwegian, Swedish, Greek, Czech and Danish first (already queued).")
L.append("")
L.append("Done = board status `ok`: 0 FAIL, no padding, bank ≥ floor (120 for a 60Q session, 2× session above that), "
         "a dated content-review row in the ledger; live decks rebuilt, Gumroad file + samples replaced, push + live check.")
L.append("")
L.append(f"## Traffic priority (top of the queue, snapshot {TRAFFIC_SNAPSHOT})")
L.append("")
L.append("Work these first, in this order, before anything in the weekly table. Unique visitors all-time from our Redis "
         "analytics (Vercel Analytics is not connected); the numbers are tiny and may include the owner's own visits. "
         "Status is live from the board.")
L.append("")
L.append("**Mock started at least once, status not `ok`:**")
L.append("")
L.append("| # | Mock | Status now | Deck | Starts | Mock views | Deck views |")
L.append("|---:|---|---|---|---:|---:|---:|")
for i, (s, st, mv, dv) in enumerate(TRAFFIC_STARTED, 1):
    r = rows.get(s, {})
    L.append(f"| {i} | `{s}` | {r.get('status', '?')} | {r.get('anki', '?')} | {st} | {mv} | {dv} |")
L.append("")
L.append("**No mock start, but ≥ 5 views (mock + deck):**")
L.append("")
L.append("| # | Mock | Status now | Deck | Views |")
L.append("|---:|---|---|---|---:|")
for i, (s, v) in enumerate(TRAFFIC_VIEWED, len(TRAFFIC_STARTED) + 1):
    r = rows.get(s, {})
    L.append(f"| {i} | `{s}` | {r.get('status', '?')} | {r.get('anki', '?')} | {v} |")
L.append("")
L.append("**Deck pages with views but 0 checkout intent** (also check the deck page / Gumroad pitch, not only the bank): "
         + ", ".join(f"`{s}` ({v})" for s, v in DECK_NO_CHECKOUT) + ".")
L.append("")
L.append("Other non-`ok` SKUs with traffic had 1–4 views (mostly state real estate and CDL): noise, normal queue.")
L.append("")
L.append("## Weekly rhythm")
L.append("")
L.append("Mon: chunk + launch writers in parallel (one per 60-item bank, two per big bank) · Tue–Wed: merge, gates, ops, "
         "cascade for live decks · Thu: side track (civic / products / Prep2Go) · Fri: ledger rows, `npm run sku:status`, "
         "one push, live check, re-run this plan.")
L.append("")
L.append(f"Even load: ~{per_week:.0f} effort units per week (1 unit = 1 new item or 2 reviewed items).")
L.append("")
L.append("## Weeks")
L.append("")
L.append("| Week of | Theme | Mocks (→ bank target) | Effort | Side track |")
L.append("|---|---|---|---:|---|")
for i, (w, items) in enumerate(zip(WEEKS, plan)):
    themes = []
    for r in items:
        if r["group"][1] not in themes:
            themes.append(r["group"][1])
    mocks = ", ".join(f"`{r['slug'].replace('-readiness-check', '')}`{' 🟢' if r['anki'] == 'live' else ''} →{r['target']}"
                      for r in items)
    sides = ", ".join(f"{lab}: `{s}`" for lab, s in side[i])
    extra = " · merge decision on duplicates" if i == 0 else ""
    L.append(f"| {w:%d %b} | {' / '.join(themes)}{extra} | {mocks} | {sum(r['effort'] for r in items):.0f} | {sides} |")
L.append("")
L.append("🟢 = deck live on Gumroad (rebuild apkg, replace file, refresh samples in the same week).")
L.append("")
L.append("## Rules that do not change")
L.append("")
L.append("- Work rows go into `bank-audit-ledger.md` the same day (In progress → Done) and `npm run sku:status` after.")
L.append("- Wave decks: after a rebuild check the Anki Generator spec `cardCount` matches the site spec before "
         "`replace-gumroad-apkg-files.mjs` (it reads the vault spec).")
L.append("- Tier A SEO wedges and freeze rules from `seo-dual-track-top.mdc` still apply: bank quality ≠ new SEO churn.")
L.append("- Holiday weeks (21 Dec, 28 Dec) carry the same load; if they slip, the next week absorbs them and the plan is re-run.")
out = ROOT / "docs/mock-bank-qa/quality-plan-2026-11.md"
out.write_text("\n".join(L) + "\n")
print(f"{out.relative_to(ROOT)}: {len(todo)} mocks, total effort {total:.0f}, {per_week:.0f}/week")
for w, items in zip(WEEKS, plan):
    print(w, len(items), round(sum(r["effort"] for r in items)), [r["slug"][:22] for r in items][:12])
