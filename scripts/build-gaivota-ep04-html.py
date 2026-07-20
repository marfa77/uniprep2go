#!/usr/bin/env python3
"""Build Ep.04 Ceuta index.html from vocab-100.csv."""
from __future__ import annotations

import csv
from pathlib import Path

base = Path(__file__).resolve().parents[1] / (
    "prototypes/language-comics/gaivota-em-portugal/episodes/04-ceuta"
)
rows = list(csv.DictReader(open(base / "vocab-100.csv", encoding="utf-8")))
assert len(rows) == 100, len(rows)
gloss = "\n".join(
    f'        <div class="g-row"><span>{r["pt"]}</span><span>{r["en"]}</span></div>'
    for r in rows
)

html = f"""<!DOCTYPE html>
<html lang="pt-PT">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Gaivota em Portugal · Ep.04 — Ceuta (1415)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {{
      --ink: #0e0e0e;
      --paper: #f4f1ea;
      --muted: #5c574e;
      --line: #c9c2b4;
      --paid: #8b1f3d;
      --accent: #b5451b;
      --duarte: #1f6f8b;
      --tomas: #8b1f3d;
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      color: var(--ink);
      background: #ddd7cb;
      line-height: 1.45;
    }}
    .bar {{
      position: sticky; top: 0; z-index: 10;
      display: flex; flex-wrap: wrap; gap: .75rem; align-items: center; justify-content: space-between;
      padding: .7rem 1.1rem;
      background: #111; color: #f4f1ea;
    }}
    .bar .brand {{ display: flex; align-items: center; gap: .65rem; font-family: Fraunces, Georgia, serif; font-weight: 700; }}
    .bar img {{ width: 36px; height: 36px; border-radius: 50%; object-fit: cover; background: #fff; }}
    .bar .paid {{ background: var(--paid); color: #fff; font-size: .75rem; font-weight: 700; padding: .25rem .55rem; border-radius: 999px; letter-spacing: .04em; }}
    .bar a {{ color: #fff; text-decoration: none; font-weight: 600; font-size: .9rem; border: 1px solid rgba(255,255,255,.35); padding: .4rem .8rem; border-radius: 999px; }}
    .wrap {{ max-width: 860px; margin: 0 auto; padding: 1.25rem 1rem 4rem; }}
    .page {{
      width: min(100%, 794px);
      margin: 0 auto 1.75rem;
      background: var(--paper);
      border: 1px solid #bdb5a6;
      box-shadow: 0 16px 36px rgba(0,0,0,.12);
      padding: 1.25rem 1.35rem 1.4rem;
      position: relative;
    }}
    .page-head {{ display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: .85rem; }}
    .page-head .left {{ display: flex; align-items: center; gap: .5rem; font-family: Fraunces, Georgia, serif; font-weight: 700; font-size: .95rem; }}
    .page-head .left img {{ width: 28px; height: 28px; border-radius: 50%; object-fit: cover; }}
    .page-head .meta {{ font-size: .72rem; letter-spacing: .06em; text-transform: uppercase; color: var(--muted); }}
    .hero {{
      position: relative; border: 3px solid var(--ink); overflow: hidden; background: #111;
      line-height: 0;
    }}
    .hero > img:not(.stamp) {{ width: 100%; height: auto; display: block; object-fit: contain; }}
    .brief-img img {{ width: 100%; height: auto; display: block; object-fit: contain; }}
    .panel img {{ width: 100%; height: auto; display: block; object-fit: contain; }}
    .hero .overlay {{
      position: absolute; left: 0; right: 0; bottom: 0;
      padding: 1.5rem 1.2rem 1.2rem;
      background: linear-gradient(transparent, rgba(0,0,0,.92) 40%);
      color: #fff;
    }}
    .hero h1 {{ margin: 0; font-family: Fraunces, Georgia, serif; font-size: clamp(2rem, 5vw, 3rem); line-height: 1.05; }}
    .hero p {{ margin: .4rem 0 0; max-width: 42ch; opacity: .95; }}
    .stamp {{
      position: absolute; top: 1rem; right: 1rem; width: 72px; height: 72px;
      border-radius: 50%; border: 2px solid #fff; object-fit: cover; background: #fff;
    }}
    .brief-grid {{ display: grid; gap: 1rem; }}
    .brief-img {{ border: 2px solid var(--ink); overflow: hidden; background: #ccc; line-height: 0; }}
    .caption {{ font-size: .82rem; color: var(--muted); margin: .35rem 0 0; font-style: italic; }}
    .brief h2 {{ margin: 0 0 .5rem; font-family: Fraunces, Georgia, serif; font-size: 1.55rem; }}
    .brief .hook {{ font-size: 1.08rem; margin: 0 0 .75rem; }}
    .brief ul {{ margin: 0 0 1rem; padding-left: 1.15rem; }}
    .brief li {{ margin: .3rem 0; }}
    .disclaimer {{
      margin-top: 1rem; padding: .75rem .9rem;
      border-left: 4px solid var(--ink); background: #ebe6dc; font-size: .92rem;
    }}
    .panel {{
      position: relative; border: 3px solid var(--ink); overflow: hidden; background: #111;
      line-height: 0;
    }}
    .bubble {{
      position: absolute; max-width: min(78%, 290px);
      background: #fffdf8; border: 2.5px solid var(--ink); border-radius: 1.05rem;
      padding: .55rem .7rem; font-size: .95rem; font-weight: 500; line-height: 1.3;
      box-shadow: 3px 3px 0 rgba(0,0,0,.12); z-index: 2;
    }}
    .bubble .who {{
      display: block; font-size: .66rem; font-weight: 700; letter-spacing: .05em;
      text-transform: uppercase; margin-bottom: .12rem; color: #333;
    }}
    .bubble.gaivota {{ background: #111; color: #f4f1ea; border-color: #111; }}
    .bubble.gaivota .who {{ color: #cfcfcf; }}
    .bubble.duarte .who {{ color: var(--duarte); }}
    .bubble.tomas .who {{ color: var(--tomas); }}
    .tl {{ left: 4%; top: 5%; }}
    .tr {{ right: 4%; top: 5%; }}
    .bl {{ left: 4%; bottom: 7%; }}
    .br {{ right: 4%; bottom: 7%; }}
    .p1-gaivota {{ left: 3%; top: 2%; max-width: min(40%, 240px); }}
    .p1-duarte {{ left: 2%; bottom: 5%; max-width: min(32%, 190px); font-size: .88rem; }}
    .p1-tomas {{ right: 3%; top: 18%; max-width: min(34%, 210px); font-size: .88rem; }}
    .foot {{
      margin-top: .7rem; display: flex; justify-content: space-between; gap: 1rem;
      font-size: .8rem; color: var(--muted); line-height: 1.35;
    }}
    .study h2 {{ margin: 0 0 .6rem; font-family: Fraunces, Georgia, serif; font-size: 1.6rem; }}
    .study h3 {{ margin: 1.2rem 0 .45rem; color: var(--accent); font-size: 1.05rem; }}
    .tips {{ background: #e7eef1; border: 1px solid #b9c9d1; padding: .75rem .9rem; font-size: .92rem; margin-bottom: .5rem; }}
    .glossary {{
      display: grid; grid-template-columns: 1fr 1fr; gap: .25rem .9rem; font-size: .84rem;
    }}
    .g-row {{ display: grid; grid-template-columns: 1.1fr 1fr; gap: .4rem; border-bottom: 1px solid var(--line); padding: .28rem 0; }}
    .g-row span:first-child {{ font-weight: 600; }}
    .quiz ol {{ margin: 0; padding-left: 1.2rem; }}
    .quiz li {{ margin: .4rem 0; }}
    .cta {{
      margin-top: 1.4rem; padding: 1rem 1.1rem; background: #111; color: #f4f1ea;
    }}
    .cta strong {{ font-family: Fraunces, Georgia, serif; font-size: 1.15rem; display: block; margin-bottom: .35rem; }}
    .cta a {{ color: #9fd0e0; }}
    @media (max-width: 720px) {{
      .glossary {{ grid-template-columns: 1fr; }}
      .bubble {{ font-size: .88rem; max-width: 88%; }}
    }}
    @media print {{
      @page {{ size: A4; margin: 8mm; }}
      body {{ background: white; margin: 0; }}
      .bar {{ display: none !important; }}
      .wrap {{ max-width: none; margin: 0; padding: 0; }}
      .page {{
        box-shadow: none; border: none; margin: 0; padding: 0 0 4mm;
        width: auto; max-width: none; min-height: 0 !important; height: auto;
        break-after: page; page-break-after: always;
      }}
      .page:last-child {{ break-after: auto; page-break-after: auto; }}
      .page-head {{ margin-bottom: .45rem; }}
      .hero, .panel, .brief-img {{ min-height: 0 !important; height: auto; }}
      .hero > img:not(.stamp), .panel img, .brief-img img {{
        max-height: 195mm; width: 100%; height: auto !important; object-fit: contain;
      }}
      .stamp {{ width: 52px; height: 52px; top: .6rem; right: .6rem; }}
      .bubble {{ box-shadow: none; }}
      .foot {{ margin-top: .4rem; }}
    }}
  </style>
</head>
<body>
  <div class="bar">
    <div class="brand">
      <img src="art/gaivota-canon-mark.webp" alt="Gaivota" />
      <span>Gaivota em Portugal</span>
      <span class="paid">Ep.04</span>
    </div>
    <a href="#study">Study pack</a>
  </div>

  <div class="wrap">

    <article class="page">
      <div class="page-head">
        <div class="left"><img src="art/gaivota-canon-mark.webp" alt="" /> Gaivota em Portugal</div>
        <div class="meta">Episode 04 · Paid</div>
      </div>
      <div class="hero">
        <img src="art/ep04-cover.webp" alt="Cover: Ceuta" />
        <img class="stamp" src="art/gaivota-canon-stamp.webp" alt="Gaivota mascot" />
        <div class="overlay">
          <h1>Ceuta</h1>
          <p>1415 — a conquista que abriu a era dos Descobrimentos, numa história completa em cinco páginas.</p>
        </div>
      </div>
      <div class="foot"><span>Noir history comic · PT-PT + EN glossary</span><span>Ep.04</span></div>
    </article>

    <article class="page brief">
      <div class="page-head">
        <div class="left"><img src="art/gaivota-canon-mark.webp" alt="" /> History brief</div>
        <div class="meta">Sheet 1 · Facts first</div>
      </div>
      <div class="brief-grid">
        <div>
          <div class="brief-img"><img src="art/ep04-brief-textbook.webp" alt="Textbook-style plate of Ceuta 1415" /></div>
          <p class="caption">Ceuta, 21 August 1415 — history-textbook plate (engraving style).</p>
        </div>
        <div>
          <h2>The Conquest of Ceuta</h2>
          <p class="hook">In 1415, a Portuguese fleet crossed to North Africa — Ceuta fell, and the Age of Discoveries began.</p>
          <ul>
            <li><strong>When:</strong> 21 August 1415</li>
            <li><strong>Where:</strong> Ceuta, North Africa (Strait of Gibraltar)</li>
            <li><strong>Who:</strong> João I of Portugal; Infante Henrique among the princes</li>
            <li><strong>How:</strong> a large fleet, landing, and capture of a key gateway</li>
            <li><strong>After:</strong> Portugal’s overseas age opens — routes turn south and east</li>
          </ul>
          <p>Ceuta was a Mediterranean–Atlantic hinge. Taking it did not invent exploration, but it marked a turn: Portugal looked beyond the peninsula — toward maps, coasts, and a longer sea.</p>
          <div class="disclaimer"><strong>The comic that follows is an artistic interpretation.</strong> It follows two fictional sailors; Gaivota watches. No graphic violence.</div>
        </div>
      </div>
    </article>

    <article class="page">
      <div class="page-head">
        <div class="left"><img src="art/gaivota-canon-mark.webp" alt="" /> Ceuta · 1/5</div>
        <div class="meta">Setup</div>
      </div>
      <div class="panel">
        <img src="art/ep04-comic-p1.webp" alt="Dawn at sea near Ceuta" />
        <div class="bubble gaivota p1-gaivota"><span class="who">Gaivota</span>O vento muda. A África… já respira perto.</div>
        <div class="bubble duarte p1-duarte"><span class="who">Duarte</span>Tomás… aquilo é Ceuta?</div>
        <div class="bubble tomas p1-tomas"><span class="who">Tomás</span>É. E o nosso reino… vai tentar a porta.</div>
      </div>
      <div class="foot"><span>Characters: Duarte · Tomás · Gaivota</span><span>1/5</span></div>
    </article>

    <article class="page">
      <div class="page-head">
        <div class="left"><img src="art/gaivota-canon-mark.webp" alt="" /> Ceuta · 2/5</div>
        <div class="meta">Rising action</div>
      </div>
      <div class="panel">
        <img src="art/ep04-comic-p2.webp" alt="Landing toward the walls" />
        <div class="bubble tomas tl"><span class="who">Tomás</span>Remem. Sem olhar para trás.</div>
        <div class="bubble duarte tr"><span class="who">Duarte</span>As muralhas são altas…</div>
        <div class="bubble gaivota br"><span class="who">Gaivota</span>O mar trouxe homens. A pedra espera.</div>
      </div>
      <div class="foot"><span>Chunks: <em>sem olhar para trás</em></span><span>2/5</span></div>
    </article>

    <article class="page">
      <div class="page-head">
        <div class="left"><img src="art/gaivota-canon-mark.webp" alt="" /> Ceuta · 3/5</div>
        <div class="meta">Turning point</div>
      </div>
      <div class="panel">
        <img src="art/ep04-comic-p3.webp" alt="At the gate" />
        <div class="bubble tl"><span class="who">Soldado</span>À porta! Firmes!</div>
        <div class="bubble duarte tr"><span class="who">Duarte</span>Não parem!</div>
        <div class="bubble gaivota br"><span class="who">Gaivota</span>A porta… abriu-se ao reino.</div>
      </div>
      <div class="foot"><span>Chunks: <em>à porta</em></span><span>3/5</span></div>
    </article>

    <article class="page">
      <div class="page-head">
        <div class="left"><img src="art/gaivota-canon-mark.webp" alt="" /> Ceuta · 4/5</div>
        <div class="meta">Consequence</div>
      </div>
      <div class="panel">
        <img src="art/ep04-comic-p4.webp" alt="Banners on the tower" />
        <div class="bubble duarte tl"><span class="who">Duarte</span>Entrámos…</div>
        <div class="bubble tomas tr"><span class="who">Tomás</span>Entrámos. E o mundo… ficou maior.</div>
        <div class="bubble gaivota br"><span class="who">Gaivota</span>Uma cidade. Um começo.</div>
      </div>
      <div class="foot"><span>Chunks: <em>o mundo ficou maior</em></span><span>4/5</span></div>
    </article>

    <article class="page">
      <div class="page-head">
        <div class="left"><img src="art/gaivota-canon-mark.webp" alt="" /> Ceuta · 5/5</div>
        <div class="meta">Resolution</div>
      </div>
      <div class="panel">
        <img src="art/ep04-comic-p5.webp" alt="Evening over the Strait" />
        <div class="bubble duarte tl"><span class="who">Duarte</span>Acabou a conquista?</div>
        <div class="bubble tomas tr"><span class="who">Tomás</span>Acabou este dia. O mar… ainda não.</div>
        <div class="bubble gaivota br"><span class="who">Gaivota</span>Guardo este estreito. Portugal olhou para longe.</div>
      </div>
      <div class="foot"><span>End of story · no “to be continued”</span><span>5/5</span></div>
    </article>

    <article class="page study" id="study">
      <div class="page-head">
        <div class="left"><img src="art/gaivota-canon-mark.webp" alt="" /> Study pack</div>
        <div class="meta">100 words · PT → EN</div>
      </div>
      <h2>Study pack — Ceuta</h2>
      <div class="tips">
        Read the comic once for story, once for words. Say each line aloud. Prefer Portuguese answers in the quiz.
      </div>
      <h3>Glossary (100)</h3>
      <div class="glossary">
{gloss}
      </div>
      <h3>Comprehension (answer in PT)</h3>
      <div class="quiz">
        <ol>
          <li>Onde e quando acontece a conquista?</li>
          <li>Quem são Duarte e Tomás nesta história?</li>
          <li>O que Tomás pede na aproximação às muralhas?</li>
          <li>O que significa “o mundo ficou maior”?</li>
          <li>Como acaba a história?</li>
        </ol>
      </div>
      <h3>Cultural note</h3>
      <p>Ceuta (1415) is often remembered as an opening chapter of Portugal’s Age of Discoveries. João I’s fleet took a strategic North African port at the Strait of Gibraltar; Infante Henrique was among the princes present. The comic focuses on ordinary sailors — sea, walls, and the feeling that Portugal had begun to look farther than the peninsula.</p>
      <div class="cta">
        <strong>Next</strong>
        Free Ep.01: O Terramoto (1755) · Hub: series page · More paid episodes on Gumroad
      </div>
    </article>

  </div>
</body>
</html>
"""

out = base / "index.html"
out.write_text(html, encoding="utf-8")
print(f"wrote {out} ({len(html)} bytes)")
