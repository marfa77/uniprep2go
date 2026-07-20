#!/usr/bin/env python3
"""Build Ep.03 Aljubarrota index.html from vocab-100.csv."""
from __future__ import annotations

import csv
from pathlib import Path

base = Path(__file__).resolve().parents[1] / (
    "prototypes/language-comics/gaivota-em-portugal/episodes/03-aljubarrota"
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
  <title>Gaivota em Portugal · Ep.03 — Aljubarrota (1385)</title>
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
      --ines: #8b1f3d;
      --tiago: #1f6f8b;
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
    .hero > img:not(.stamp) {{
      width: 100%; height: auto; display: block; object-fit: contain;
    }}
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
    .bubble.ines .who {{ color: var(--ines); }}
    .bubble.tiago .who {{ color: var(--tiago); }}
    .tl {{ left: 4%; top: 5%; }}
    .tr {{ right: 4%; top: 5%; }}
    .bl {{ left: 4%; bottom: 7%; }}
    .br {{ right: 4%; bottom: 7%; }}
    .p1-gaivota {{ left: 3%; top: 2%; max-width: min(38%, 230px); }}
    .p1-ines {{ left: 2%; top: auto; bottom: 5%; max-width: min(28%, 175px); font-size: .86rem; padding: .45rem .55rem; }}
    .p1-tiago {{ left: 37%; top: 18%; max-width: min(26%, 165px); font-size: .86rem; padding: .45rem .55rem; }}
    .p2-tiago {{ left: 2%; top: 2%; max-width: min(32%, 200px); font-size: .88rem; }}
    .p2-ines {{ right: 2%; top: 2%; max-width: min(30%, 190px); font-size: .88rem; }}
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
        max-height: 195mm;
        width: 100%;
        height: auto !important;
        object-fit: contain;
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
      <img src="art/gaivota-canon-mark.jpg" alt="Gaivota" />
      <span>Gaivota em Portugal</span>
      <span class="paid">Ep.03</span>
    </div>
    <a href="#study">Study pack</a>
  </div>

  <div class="wrap">

    <article class="page">
      <div class="page-head">
        <div class="left"><img src="art/gaivota-canon-mark.jpg" alt="" /> Gaivota em Portugal</div>
        <div class="meta">Episode 03 · Paid</div>
      </div>
      <div class="hero">
        <img src="art/ep03-cover.jpg" alt="Cover: Aljubarrota" />
        <img class="stamp" src="art/gaivota-canon-stamp.jpg" alt="Gaivota mascot" />
        <div class="overlay">
          <h1>Aljubarrota</h1>
          <p>1385 — a batalha que defendeu a independência de Portugal, numa história completa em cinco páginas.</p>
        </div>
      </div>
      <div class="foot"><span>Noir history comic · PT-PT + EN glossary</span><span>Ep.03</span></div>
    </article>

    <article class="page brief">
      <div class="page-head">
        <div class="left"><img src="art/gaivota-canon-mark.jpg" alt="" /> History brief</div>
        <div class="meta">Sheet 1 · Facts first</div>
      </div>
      <div class="brief-grid">
        <div>
          <div class="brief-img"><img src="art/ep03-brief-textbook.jpg" alt="Textbook-style plate of Aljubarrota 1385" /></div>
          <p class="caption">Aljubarrota, 14 August 1385 — history-textbook plate (engraving style).</p>
        </div>
        <div>
          <h2>The Battle of Aljubarrota</h2>
          <p class="hook">On a burning August day in 1385, a smaller Portuguese army held a hill — and Castile’s invasion broke.</p>
          <ul>
            <li><strong>When:</strong> 14 August 1385</li>
            <li><strong>Where:</strong> Aljubarrota, central Portugal</li>
            <li><strong>Who:</strong> João I of Portugal and Constable Nuno Álvares Pereira vs Juan I of Castile</li>
            <li><strong>How:</strong> defensive ground, discipline, heat, and Portuguese resolve</li>
            <li><strong>After:</strong> independence secured; the Avis age could begin</li>
          </ul>
          <p>Numbers favored Castile. The hill, the plan, and the will favored Portugal. One afternoon remade the kingdom’s future — and Portugal still tells the story.</p>
          <div class="disclaimer"><strong>The comic that follows is an artistic interpretation.</strong> It follows two fictional siblings; Gaivota watches. No graphic violence.</div>
        </div>
      </div>
    </article>

    <article class="page">
      <div class="page-head">
        <div class="left"><img src="art/gaivota-canon-mark.jpg" alt="" /> Aljubarrota · 1/5</div>
        <div class="meta">Setup</div>
      </div>
      <div class="panel">
        <img src="art/ep03-comic-p1.jpg" alt="Dawn before the battle" />
        <div class="bubble gaivota p1-gaivota"><span class="who">Gaivota</span>O campo está quieto. Mas o ar… já cheira a guerra.</div>
        <div class="bubble ines p1-ines"><span class="who">Inês</span>Tiago, leva água. Não vais sem beber.</div>
        <div class="bubble tiago p1-tiago"><span class="who">Tiago</span>Se Portugal cair hoje… não há casa para voltar.</div>
      </div>
      <div class="foot"><span>Characters: Inês · Tiago · Gaivota</span><span>1/5</span></div>
    </article>

    <article class="page">
      <div class="page-head">
        <div class="left"><img src="art/gaivota-canon-mark.jpg" alt="" /> Aljubarrota · 2/5</div>
        <div class="meta">Rising action</div>
      </div>
      <div class="panel">
        <img src="art/ep03-comic-p2.jpg" alt="Portuguese prepare the hill" />
        <div class="bubble tiago p2-tiago"><span class="who">Tiago</span>O Condestável diz: esperem. Não corram.</div>
        <div class="bubble ines p2-ines"><span class="who">Inês</span>Eles são muitos…</div>
        <div class="bubble gaivota br"><span class="who">Gaivota</span>O sol queima. A terra espera.</div>
      </div>
      <div class="foot"><span>Chunks: <em>esperem</em> · <em>não corram</em></span><span>2/5</span></div>
    </article>

    <article class="page">
      <div class="page-head">
        <div class="left"><img src="art/gaivota-canon-mark.jpg" alt="" /> Aljubarrota · 3/5</div>
        <div class="meta">Turning point</div>
      </div>
      <div class="panel">
        <img src="art/ep03-comic-p3.jpg" alt="The line holds" />
        <div class="bubble tl"><span class="who">Soldado</span>Firmes! Firmes na colina!</div>
        <div class="bubble tiago tr"><span class="who">Tiago</span>Não cedam!</div>
        <div class="bubble gaivota br"><span class="who">Gaivota</span>A linha portuguesa… não partiu.</div>
      </div>
      <div class="foot"><span>Chunks: <em>firmes na colina</em></span><span>3/5</span></div>
    </article>

    <article class="page">
      <div class="page-head">
        <div class="left"><img src="art/gaivota-canon-mark.jpg" alt="" /> Aljubarrota · 4/5</div>
        <div class="meta">Consequence</div>
      </div>
      <div class="panel">
        <img src="art/ep03-comic-p4.jpg" alt="Victory becomes clear" />
        <div class="bubble ines tl"><span class="who">Inês</span>Tiago! Ainda estás aqui!</div>
        <div class="bubble tiago tr"><span class="who">Tiago</span>Ainda. E Portugal… também.</div>
        <div class="bubble gaivota br"><span class="who">Gaivota</span>O maior exército… virou costas.</div>
      </div>
      <div class="foot"><span>Chunks: <em>ainda estás aqui</em></span><span>4/5</span></div>
    </article>

    <article class="page">
      <div class="page-head">
        <div class="left"><img src="art/gaivota-canon-mark.jpg" alt="" /> Aljubarrota · 5/5</div>
        <div class="meta">Resolution</div>
      </div>
      <div class="panel">
        <img src="art/ep03-comic-p5.jpg" alt="Evening after the battle" />
        <div class="bubble ines tl"><span class="who">Inês</span>Acabou a batalha?</div>
        <div class="bubble tiago tr"><span class="who">Tiago</span>Acabou o medo de amanhã. Ficámos livres.</div>
        <div class="bubble gaivota br"><span class="who">Gaivota</span>Guardo este campo. Portugal ficou de pé.</div>
      </div>
      <div class="foot"><span>End of story · no “to be continued”</span><span>5/5</span></div>
    </article>

    <article class="page study" id="study">
      <div class="page-head">
        <div class="left"><img src="art/gaivota-canon-mark.jpg" alt="" /> Study pack</div>
        <div class="meta">100 words · PT → EN</div>
      </div>
      <h2>Study pack — Aljubarrota</h2>
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
          <li>Onde e quando acontece a batalha?</li>
          <li>Quem são Inês e Tiago nesta história?</li>
          <li>O que o Condestável pede aos soldados na colina?</li>
          <li>O que significa “a linha portuguesa não partiu”?</li>
          <li>Como acaba a história?</li>
        </ol>
      </div>
      <h3>Cultural note</h3>
      <p>Aljubarrota (1385) is remembered as the battle that defended Portuguese independence against Castile. João I and Constable Nuno Álvares Pereira used ground, discipline, and resolve against a larger invading force. The victory helped secure the Avis dynasty and remains a landmark in Portuguese memory — not only for armies, but for the idea of a kingdom that stayed standing.</p>
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
