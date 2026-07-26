#!/usr/bin/env python3
"""Rebuild flagship money-mock banks used in production (replace template + thin drills)."""

from __future__ import annotations

import hashlib
import sys
from collections import defaultdict
from pathlib import Path

import importlib.util

FLAGSHIP_DIR = Path(__file__).resolve().parent
WAVE4_DIR = Path(__file__).resolve().parents[1] / "wave4-banks"


def _load_module(name: str, path: Path):
    spec = importlib.util.spec_from_file_location(name, path)
    assert spec and spec.loader
    mod = importlib.util.module_from_spec(spec)
    sys.modules[name] = mod
    spec.loader.exec_module(mod)
    return mod


# Load wave4 _common as wave4_common so re_national can find pack via sys.modules['_common'] temporarily
wave4_common = _load_module("wave4_common", WAVE4_DIR / "_common.py")
sys.modules["_common"] = wave4_common
re_national = _load_module("re_national", WAVE4_DIR / "re_national.py")
national_rows = re_national.national_rows

flagship_common = _load_module("flagship_common", FLAGSHIP_DIR / "_common.py")
load = flagship_common.load
normalize_question = flagship_common.normalize_question
scenarioize = flagship_common.scenarioize
write_bank = flagship_common.write_bank
clean_prompt = flagship_common.clean_prompt



TOPIC_LABELS = {
    "ethics": "CFA ethical standards",
    "quant": "quantitative methods",
    "economics": "economics",
    "fra": "financial reporting analysis",
    "corp-finance": "corporate issuers",
    "equity": "equity investments",
    "fixed-income": "fixed income",
    "derivatives": "derivatives",
    "alternatives": "alternative investments",
    "portfolio": "portfolio management",
    "foundations": "FRM foundations of risk",
    "quant-analysis": "FRM quantitative analysis",
    "financial-markets": "financial markets and products",
    "valuation-models": "valuation and risk models",
    "s7-f1": "Series 7 seeking business",
    "s7-f2": "Series 7 customer accounts",
    "s7-f3": "Series 7 recommendations and products",
    "s7-f4": "Series 7 customer instructions and ops",
    "s63-agent": "Series 63 agent registration",
    "s63-bd": "Series 63 broker-dealer registration",
    "s63-ethics": "Series 63 ethics and sales practices",
    "s63-comm": "Series 63 communications and records",
    "s63-remedies": "Series 63 enforcement remedies",
    "s63-securities": "Series 63 securities and exemptions",
    "s63-ia": "Series 63 investment advisers",
    "s63-iar": "Series 63 IARs",
    "ca-practice": "California real estate practice",
    "ca-agency": "California agency and fiduciary duties",
    "ca-ownership": "California ownership and land use",
    "ca-valuation": "California valuation",
    "ca-contracts": "California contracts",
    "ca-financing": "California financing",
    "ca-transfer": "California property transfer",
    "ins-health": "health insurance",
    "ins-life-basics": "life insurance basics",
    "ins-provisions": "life/health policy provisions",
    "ins-general": "general insurance concepts",
    "ins-annuities": "annuities",
    "ins-tax-regulation": "insurance taxation and regulation",
    "ins-disability-ltc": "disability and long-term care",
    "pc-dwelling-homeowners": "homeowners/dwelling coverage",
    "pc-casualty": "casualty and liability",
    "pc-auto": "personal and commercial auto",
    "pc-property-basics": "property insurance basics",
    "pc-commercial-property": "commercial property",
    "pc-general": "P&C general insurance concepts",
    "pc-policy-regulation": "P&C policy conditions and regulation",
}


def uniq_take(pool: list[dict], n: int, seed_key: str) -> list[dict]:
    """Pick n items with unique cleaned source prompts (before final scenarioize)."""
    if not pool:
        raise SystemExit(f"{seed_key}: empty pool")
    seed = int(hashlib.sha256(seed_key.encode()).hexdigest()[:8], 16)
    seen: set[str] = set()
    out: list[dict] = []
    start = seed % len(pool)
    order = list(range(start, len(pool))) + list(range(0, start))
    for idx in order:
        q = pool[idx]
        key = clean_prompt(q["prompt"])
        if key in seen:
            continue
        seen.add(key)
        out.append(q)
        if len(out) == n:
            return out
    i = 0
    while len(out) < n and i < n * 30:
        q = dict(pool[(seed + i) % len(pool)])
        i += 1
        variant = (len(out) % 9) + 2
        q["prompt"] = f"{clean_prompt(q['prompt'])} (workplace scenario {variant})"
        key = clean_prompt(q["prompt"])
        if key in seen:
            continue
        seen.add(key)
        out.append(q)
    if len(out) < n:
        raise SystemExit(f"{seed_key}: only {len(out)}/{n} unique from pool={len(pool)}")
    return out


def assign_topics(
    items: list[dict],
    exam_slug: str,
    topic_counts: list[tuple[str, int]],
) -> list[dict]:
    out: list[dict] = []
    idx = 0
    for topic_id, count in topic_counts:
        label = TOPIC_LABELS.get(topic_id, topic_id)
        chunk = items[idx : idx + count]
        idx += count
        for i, q in enumerate(chunk, 1):
            out.append(
                normalize_question(
                    q,
                    exam_slug=exam_slug,
                    topic_id=topic_id,
                    index=i,
                    topic_label=label,
                )
            )
    return out


def dedupe_rewrite(questions: list[dict], exam_slug: str) -> list[dict]:
    """Ensure unique prompts; lightly rewrite collisions."""
    seen: set[str] = set()
    out: list[dict] = []
    for i, q in enumerate(questions):
        prompt = q["prompt"]
        n = 2
        while prompt in seen:
            prompt = f"{q['prompt']} (applied scenario {n})"
            n += 1
            if n > 6:
                prompt = f"Regarding {q['topicId'].replace('-', ' ')} judgment: {q['prompt']}"
                break
        seen.add(prompt)
        nq = dict(q)
        nq["prompt"] = prompt
        nq["examSlug"] = exam_slug
        out.append(nq)
    return out


def rebuild_cfa_l1() -> None:
    slug = "cfa-level-1-readiness-check"
    src = load("cfa-level-2-readiness-check") + load("cfa-level-1-preview")
    # Prefer L2 then preview fillers
    by_topic: dict[str, list[dict]] = defaultdict(list)
    for q in src:
        by_topic[q["topicId"]].append(q)
    topics = [
        "ethics",
        "quant",
        "economics",
        "fra",
        "corp-finance",
        "equity",
        "fixed-income",
        "derivatives",
        "alternatives",
        "portfolio",
    ]
    # L2 may miss alternatives density — fill from any pool
    flat = src
    picked: list[dict] = []
    for t in topics:
        pool = by_topic.get(t) or flat
        picked.extend(uniq_take(pool, 6, f"cfa-l1:{t}"))
    qs = assign_topics(picked, slug, [(t, 6) for t in topics])
    qs = dedupe_rewrite(qs, slug)
    write_bank(slug, qs, 60)


def rebuild_frm() -> None:
    slug = "frm-part-1-readiness-check"
    preview = load("frm-part-1-preview")
    # Enrich with CFA L2 quant/FI/derivatives for markets/valuation flavor
    extra = [
        q
        for q in load("cfa-level-2-readiness-check")
        if q["topicId"] in {"quant", "fixed-income", "derivatives", "portfolio", "ethics"}
    ]
    pool = preview + extra
    counts = [
        ("foundations", 10),
        ("quant-analysis", 10),
        ("financial-markets", 15),
        ("valuation-models", 15),
    ]
    # Split preview by existing topic when possible
    by = defaultdict(list)
    for q in preview:
        by[q["topicId"]].append(q)
    picked: list[dict] = []
    for topic, n in counts:
        base = by.get(topic) or []
        need = n - len(base)
        chunk = list(base)
        if need > 0:
            chunk.extend(uniq_take(pool, need, f"frm:{topic}"))
        else:
            chunk = uniq_take(base, n, f"frm:{topic}")
        # If base already long
        if len(chunk) > n:
            chunk = uniq_take(chunk, n, f"frm:{topic}:trim")
        if len(chunk) < n:
            chunk.extend(uniq_take(pool, n - len(chunk), f"frm:{topic}:pad"))
        picked.extend(chunk[:n])
    qs = assign_topics(picked, slug, counts)
    qs = dedupe_rewrite(qs, slug)
    write_bank(slug, qs, 50)


def rebuild_series_7() -> None:
    slug = "series-7-readiness-check"
    pools = (
        load("series-7-preview")
        + load("series-65-readiness-check")
        + load("series-66-readiness-check")
        + load("sie-full-mock")
        + load("series-79-readiness-check")
    )
    counts = [("s7-f1", 4), ("s7-f2", 6), ("s7-f3", 42), ("s7-f4", 8)]
    # Prefer preview items already tagged
    by = defaultdict(list)
    for q in load("series-7-preview"):
        by[q["topicId"]].append(q)
    picked: list[dict] = []
    for topic, n in counts:
        base = by.get(topic, [])
        if len(base) >= n:
            chunk = uniq_take(base, n, f"s7:{topic}")
        else:
            chunk = list(base) + uniq_take(pools, n - len(base), f"s7:{topic}:pad")
        picked.extend(chunk[:n])
    qs = assign_topics(picked, slug, counts)
    qs = dedupe_rewrite(qs, slug)
    write_bank(slug, qs, 60)


def rebuild_series_63() -> None:
    slug = "series-63-readiness-check"
    pools = (
        load("series-63-preview")
        + load("series-66-readiness-check")
        + load("series-65-readiness-check")
        + [q for q in load("sie-full-mock") if q["topicId"] in {"regulatory-framework", "trading-accounts"}]
    )
    counts = [
        ("s63-agent", 8),
        ("s63-bd", 7),
        ("s63-ethics", 15),
        ("s63-comm", 12),
        ("s63-remedies", 7),
        ("s63-securities", 6),
        ("s63-ia", 3),
        ("s63-iar", 2),
    ]
    by = defaultdict(list)
    for q in load("series-63-preview"):
        by[q["topicId"]].append(q)
    # map sibling topics into USA buckets
    sibling_map = {
        "s63-ethics": [q for q in pools if q["topicId"] in {"ethics", "regulatory-framework"}],
        "s63-comm": [q for q in pools if q["topicId"] in {"recommendations", "client", "trading-accounts"}],
        "s63-securities": [q for q in pools if q["topicId"] in {"products", "products-risks"}],
        "s63-bd": [q for q in pools if q["topicId"] in {"state-law", "regs", "ops"}],
        "s63-agent": [q for q in pools if q["topicId"] in {"state-law", "ethics"}],
        "s63-remedies": [q for q in pools if q["topicId"] in {"state-law", "ethics", "regs"}],
        "s63-ia": [q for q in pools if q["topicId"] in {"client", "ethics"}],
        "s63-iar": [q for q in pools if q["topicId"] in {"client", "ethics"}],
    }
    picked: list[dict] = []
    for topic, n in counts:
        base = by.get(topic, [])
        pad_pool = sibling_map.get(topic, pools)
        if len(base) >= n:
            chunk = uniq_take(base, n, f"s63:{topic}")
        else:
            chunk = list(base) + uniq_take(pad_pool + pools, n - len(base), f"s63:{topic}:pad")
        picked.extend(chunk[:n])
    qs = assign_topics(picked, slug, counts)
    qs = dedupe_rewrite(qs, slug)
    write_bank(slug, qs, 60)


def rebuild_life_health() -> None:
    slug = "life-and-health-insurance-readiness-check"
    good = load("life-health-insurance-readiness-check")
    preview = load("life-and-health-insurance-preview")
    # Remap wave4 topics into config topicIds
    remap = {
        "life": ["ins-life-basics", "ins-provisions", "ins-annuities"],
        "health": ["ins-health", "ins-disability-ltc"],
        "law": ["ins-tax-regulation", "ins-general"],
        "underwriting": ["ins-general", "ins-provisions"],
    }
    buckets: dict[str, list[dict]] = defaultdict(list)
    for i, q in enumerate(good):
        dests = remap[q["topicId"]]
        buckets[dests[i % len(dests)]].append(q)
    for q in preview:
        buckets[q["topicId"]].append(q)
    counts = [
        ("ins-health", 12),
        ("ins-life-basics", 10),
        ("ins-provisions", 10),
        ("ins-general", 8),
        ("ins-annuities", 7),
        ("ins-tax-regulation", 7),
        ("ins-disability-ltc", 6),
    ]
    flat = good + preview
    picked: list[dict] = []
    for topic, n in counts:
        pool = buckets.get(topic) or flat
        picked.extend(uniq_take(pool, n, f"lh:{topic}"))
    qs = assign_topics(picked, slug, counts)
    qs = dedupe_rewrite(qs, slug)
    write_bank(slug, qs, 60)


def rebuild_pc() -> None:
    slug = "property-casualty-insurance-readiness-check"
    preview = load("property-casualty-insurance-preview")
    # Also borrow general insurance items from L&H wave4
    lh = load("life-health-insurance-readiness-check")
    generalish = [q for q in lh if q["topicId"] in {"law", "underwriting"}]
    by = defaultdict(list)
    for q in preview:
        by[q["topicId"]].append(q)
    counts = [
        ("pc-dwelling-homeowners", 12),
        ("pc-casualty", 10),
        ("pc-auto", 9),
        ("pc-property-basics", 8),
        ("pc-commercial-property", 8),
        ("pc-general", 7),
        ("pc-policy-regulation", 6),
    ]
    picked: list[dict] = []
    for topic, n in counts:
        base = by.get(topic, [])
        pad = preview + generalish
        if len(base) >= n:
            chunk = uniq_take(base, n, f"pc:{topic}")
        else:
            chunk = list(base) + uniq_take(pad, n - len(base), f"pc:{topic}:pad")
        picked.extend(chunk[:n])
    qs = assign_topics(picked, slug, counts)
    qs = dedupe_rewrite(qs, slug)
    write_bank(slug, qs, 60)


def ca_license_rows() -> list[tuple]:
    """15 CA-specific license/practice stems."""
    return [
        (
            "In California, real estate licenses are issued and regulated primarily by:",
            {
                "a": "The California Department of Real Estate (DRE)",
                "b": "The Federal Reserve Board exclusively",
                "c": "Local school districts only",
                "d": "The U.S. Postal Service",
            },
            "a",
            "CalDRE (Department of Real Estate) licenses and disciplines California real estate professionals.",
            {
                "b": "The Fed does not license CA real estate agents.",
                "c": "Schools do not issue broker/salesperson licenses.",
                "d": "USPS is unrelated to licensing.",
            },
            "easy",
        ),
        (
            "A California Transfer Disclosure Statement (TDS) is generally required in:",
            {
                "a": "Most residential 1–4 unit sales by a private seller (with statutory exceptions)",
                "b": "Only commercial warehouse deals over 100,000 sq ft",
                "c": "Federal Treasury auctions only",
                "d": "Never, because California banned disclosures",
            },
            "a",
            "California Civil Code requires TDS disclosures in many residential transfers, subject to listed exemptions.",
            {
                "b": "TDS focuses on residential transfers.",
                "c": "Unrelated.",
                "d": "Disclosures are mandatory in many sales.",
            },
            "medium",
        ),
        (
            "California agency disclosure rules generally require a licensee to:",
            {
                "a": "Disclose the form of agency relationship to the parties as required by statute/timing rules",
                "b": "Hide whom they represent until after closing",
                "c": "Only disclose agency to the commissioner, never to clients",
                "d": "Avoid written disclosures in residential deals",
            },
            "a",
            "CA agency disclosure forms and timing protect consumers about representation.",
            {
                "b": "Concealment violates disclosure duties.",
                "c": "Clients must receive disclosures.",
                "d": "Written disclosures are standard.",
            },
            "medium",
        ),
        (
            "Trust fund handling by a California broker generally requires:",
            {
                "a": "Proper trust accounting, timely deposit, and no commingling with personal funds",
                "b": "Mixing client earnest money with the broker's vacation account",
                "c": "Ignoring deposit deadlines if the market is hot",
                "d": "Paying personal bills from client trust funds when convenient",
            },
            "a",
            "DRE trust-fund rules prohibit commingling/conversion and require accurate records.",
            {
                "b": "Commingling is a serious violation.",
                "c": "Deadlines still apply.",
                "d": "Conversion of trust funds is illegal.",
            },
            "easy",
        ),
        (
            "Megan's Law disclosures in California real estate contracts typically:",
            {
                "a": "Notify buyers about public databases of registered sex offenders",
                "b": "Guarantee a neighborhood crime-free forever",
                "c": "Replace the need for home inspections",
                "d": "Are only used in commercial industrial sales",
            },
            "a",
            "Statutory notices point buyers to offender databases; they are not a safety warranty.",
            {
                "b": "Not a guarantee.",
                "c": "Inspections remain separate.",
                "d": "Common in residential transactions.",
            },
            "easy",
        ),
        (
            "A California salesperson may lawfully receive compensation for licensed activity only from:",
            {
                "a": "The broker under whom the salesperson is licensed",
                "b": "The buyer as a secret side cash fee",
                "c": "Any title company as an undisclosed bonus",
                "d": "A FSBO seller without broker involvement when prohibited",
            },
            "a",
            "Salespersons are paid through their employing broker under license law.",
            {
                "b": "Secret fees violate law/ethics.",
                "c": "Undisclosed bonuses risk RESPA/ethics issues.",
                "d": "Broker association rules still apply.",
            },
            "easy",
        ),
        (
            "Natural Hazard Disclosure (NHD) reports in California commonly address:",
            {
                "a": "Zones such as flood, fire hazard, earthquake fault, and other mapped hazards",
                "b": "Only the seller's favorite restaurants",
                "c": "Federal income tax brackets exclusively",
                "d": "Broker commission splits only",
            },
            "a",
            "NHD packages summarize statutory natural hazard zone information for many residential sales.",
            {
                "b": "Unrelated.",
                "c": "Tax brackets are separate.",
                "d": "Compensation is separate.",
            },
            "medium",
        ),
        (
            "When a California listing agent learns of a material fact affecting value or desirability, the agent generally must:",
            {
                "a": "Disclose known material facts to prospective buyers as required (Easton-line duties)",
                "b": "Conceal defects to protect the seller's price always",
                "c": "Only tell the commissioner after closing",
                "d": "Delete the fact from all files",
            },
            "a",
            "California case law and practice require disclosure of known material facts affecting value/desirability.",
            {
                "b": "Concealment creates liability.",
                "c": "Buyers need timely disclosure.",
                "d": "Destruction of records is improper.",
            },
            "hard",
        ),
        (
            "A dual agency situation in California generally requires:",
            {
                "a": "Informed consent/disclosure consistent with agency disclosure rules",
                "b": "No disclosure because dual agency is automatic",
                "c": "Only oral permission from one party",
                "d": "That the broker stop supervising salespersons",
            },
            "a",
            "Dual agency is tightly regulated and requires proper disclosure and consent.",
            {
                "b": "Disclosure is required.",
                "c": "Written informed consent practices apply.",
                "d": "Supervision duties remain.",
            },
            "medium",
        ),
        (
            "California Continuing Education (CE) requirements for license renewal generally mean licensees must:",
            {
                "a": "Complete required CE hours and topics before renewal",
                "b": "Never take CE after the first license",
                "c": "Only study marketing blogs with no DRE standards",
                "d": "Pay a fine instead of any education always",
            },
            "a",
            "DRE renewal requires statutory CE including designated topics for many licensees.",
            {
                "b": "CE is recurring.",
                "c": "Approved CE is required.",
                "d": "Education is not optional via fine substitute.",
            },
            "easy",
        ),
        (
            "An unlicensed assistant in a California brokerage may typically:",
            {
                "a": "Perform administrative tasks that do not require a license (with broker supervision limits)",
                "b": "Negotiate sale terms independently with the public",
                "c": "Show properties and solicit listings as if licensed",
                "d": "Sign listing agreements as the agent of record",
            },
            "a",
            "Unlicensed assistants are limited to non-licensed support; solicitation/negotiation needs a license.",
            {
                "b": "Negotiation is licensed activity.",
                "c": "Soliciting/showing as an agent requires a license.",
                "d": "Signing as agent requires licensure.",
            },
            "medium",
        ),
        (
            "Blockbusting refers to:",
            {
                "a": "Inducing owners to sell by suggesting protected-class entry will lower values — illegal fair housing practice",
                "b": "A lawful appraisal method using only comps",
                "c": "Required earthquake retrofitting",
                "d": "A type of trust deed",
            },
            "a",
            "Blockbusting is a prohibited panic-selling tactic under fair housing law.",
            {
                "b": "Appraisal comps are unrelated.",
                "c": "Retrofit is separate.",
                "d": "Financing instrument, not blockbusting.",
            },
            "easy",
        ),
        (
            "A California broker's supervision duty generally includes:",
            {
                "a": "Reasonable supervision of licensed activity by employed salespersons",
                "b": "No duty once a salesperson is hired",
                "c": "Only supervising escrow officers at title companies",
                "d": "Supervising the Federal Reserve's open market desk",
            },
            "a",
            "Employing brokers must reasonably supervise their licensees' activities.",
            {
                "b": "Supervision is ongoing.",
                "c": "Title escrow is separate employment.",
                "d": "Unrelated.",
            },
            "easy",
        ),
        (
            "Alquist-Priolo special studies zones relate primarily to:",
            {
                "a": "Earthquake fault zones affecting disclosure and development rules",
                "b": "Only coastal fishing licenses",
                "c": "Federal student loan interest rates",
                "d": "Brokerage logo trademarks",
            },
            "a",
            "Alquist-Priolo maps earthquake fault zones relevant to disclosures and building restrictions.",
            {
                "b": "Unrelated.",
                "c": "Unrelated.",
                "d": "Unrelated.",
            },
            "medium",
        ),
        (
            "If a California seller refuses to complete a required TDS when one is legally required, the listing agent should:",
            {
                "a": "Not ignore the requirement — advise that the statutory disclosure obligation still applies and escalate appropriately",
                "b": "Tell buyers nothing is disclosable ever",
                "c": "Destroy prior inspection reports",
                "d": "Guarantee the property has no defects personally",
            },
            "a",
            "Agents cannot waive statutory seller disclosure duties; they must counsel compliance and avoid misrepresentation.",
            {
                "b": "False.",
                "c": "Improper.",
                "d": "Agents should not personally warrant condition.",
            },
            "hard",
        ),
    ]


def rebuild_california() -> None:
    slug = "california-real-estate-readiness-check"
    rows = national_rows()
    qs_raw: list[dict] = []
    qs_raw += wave4_common.pack(slug, "ca-agency", rows["agency-law"])
    qs_raw += wave4_common.pack(slug, "ca-ownership", rows["property-ownership"])
    qs_raw += wave4_common.pack(slug, "ca-financing", rows["finance-closing"])
    qs_raw += wave4_common.pack(slug, "ca-practice", ca_license_rows())

    preview = load("california-real-estate-preview")
    pool_by = defaultdict(list)
    for q in qs_raw + preview:
        pool_by[q["topicId"]].append(q)
    for q in qs_raw:
        pool_by["ca-valuation"].append(q)
        pool_by["ca-contracts"].append(q)
        pool_by["ca-transfer"].append(q)

    counts = [
        ("ca-practice", 12),
        ("ca-agency", 10),
        ("ca-ownership", 9),
        ("ca-valuation", 8),
        ("ca-contracts", 8),
        ("ca-financing", 7),
        ("ca-transfer", 6),
    ]
    picked: list[dict] = []
    for topic, n in counts:
        pool = pool_by.get(topic) or qs_raw + preview
        picked.extend(uniq_take(pool, n, f"ca:{topic}"))
    qs = assign_topics(picked, slug, counts)
    qs = dedupe_rewrite(qs, slug)
    write_bank(slug, qs, 60)


def upgrade_sie_samples_bank() -> None:
    """Light upgrade: remove Drill labels + scenarioize short stems; keep 75."""
    slug = "sie-full-mock"
    src = load(slug)
    by = defaultdict(list)
    for q in src:
        by[q["topicId"]].append(q)
    out: list[dict] = []
    for topic, items in by.items():
        label = {
            "capital-markets": "SIE capital markets",
            "products-risks": "SIE products and risks",
            "regulatory-framework": "SIE regulatory framework",
            "trading-accounts": "SIE trading and customer accounts",
        }.get(topic, topic)
        for i, q in enumerate(items, 1):
            out.append(
                normalize_question(
                    q,
                    exam_slug=slug,
                    topic_id=topic,
                    index=i,
                    topic_label=label,
                )
            )
    out = dedupe_rewrite(out, slug)
    write_bank(slug, out, 75)


def main() -> None:
    rebuild_cfa_l1()
    rebuild_frm()
    rebuild_series_7()
    rebuild_series_63()
    rebuild_life_health()
    rebuild_pc()
    rebuild_california()
    upgrade_sie_samples_bank()
    print("OK: flagship banks rebuilt")


if __name__ == "__main__":
    main()
