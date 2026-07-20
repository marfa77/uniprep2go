#!/usr/bin/env python3
"""Build Ep.06 Liberal Revolution index.html."""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent / "lib"))
from gaivota_episode_html import Bubble, ComicPage, EpisodeHtml, build

base = Path(__file__).resolve().parents[1] / (
    "prototypes/language-comics/gaivota-em-portugal/episodes/06-liberal-revolution"
)

ep = EpisodeHtml(
    number="06",
    slug="06-liberal-revolution",
    title="Revolução Liberal",
    year="1820",
    cover_img="ep06-cover.webp",
    cover_alt="Cover: Liberal Revolution Porto 1820",
    cover_blurb_pt="1820 — o Porto pede constituição, numa história completa em cinco páginas.",
    brief_img="ep06-brief-textbook.webp",
    brief_caption="Porto, 1820 — history-textbook plate (engraving style).",
    brief_h2="The Liberal Revolution",
    brief_hook="In 1820, Porto rose first — demanding a constitution while the king was still in Brazil.",
    brief_bullets=[
        "<strong>When:</strong> August–September 1820 (Porto uprising; movement spreads)",
        "<strong>Where:</strong> Porto, then across Portugal",
        "<strong>Who:</strong> officers, merchants, liberals vs absolutist order; João VI still in Brazil",
        "<strong>How:</strong> pronouncements, assemblies, press, pressure for Cortes and a constitution",
        "<strong>After:</strong> a constitutional path opens; the king returns; politics change",
    ],
    brief_para="Porto’s voice mattered: print shops, militia, and public oaths pushed Portugal toward written law. The comic follows two siblings at the hinge of that first liberal morning.",
    disclaimer="It follows two fictional siblings in Porto; Gaivota watches. No graphic violence.",
    comic_pages=[
        ComicPage(
            "Setup",
            "ep06-comic-p1.webp",
            "Dawn in Porto print shop",
            [
                Bubble("gaivota", "Gaivota", "O Porto acorda cedo. Hoje… mais cedo ainda.", "p1-gaivota"),
                Bubble("rosa", "Rosa", "Miguel, isto é só papel?", "p1-a"),
                Bubble("miguel", "Miguel", "Não. Isto é a palavra… a caminho da praça.", "p1-b"),
            ],
            "Characters: Rosa · Miguel · Gaivota",
            "1/5",
        ),
        ComicPage(
            "Rising action",
            "ep06-comic-p2.webp",
            "Crowd gathers in Porto",
            [
                Bubble("miguel", "Miguel", "Dizem que o rei está longe. Nós… aqui.", "tl"),
                Bubble("rosa", "Rosa", "Então a constituição começa aqui.", "tr"),
                Bubble("gaivota", "Gaivota", "O rio ouve. A cidade responde.", "br"),
            ],
            "Chunks: <em>a constituição começa aqui</em>",
            "2/5",
        ),
        ComicPage(
            "Turning point",
            "ep06-comic-p3.webp",
            "Public oath",
            [
                Bubble("", "Oficial", "Pela nação. Pela lei.", "tl"),
                Bubble("miguel", "Miguel", "Juramos!", "tr"),
                Bubble("gaivota", "Gaivota", "Um juramento… mais alto que o sino.", "br"),
            ],
            "Chunks: <em>juramos</em>",
            "3/5",
        ),
        ComicPage(
            "Consequence",
            "ep06-comic-p4.webp",
            "Evening on the quay",
            [
                Bubble("rosa", "Rosa", "Mudámos alguma coisa?", "tl"),
                Bubble("miguel", "Miguel", "Abrimos a porta. O resto… caminha.", "tr"),
                Bubble("gaivota", "Gaivota", "O absolutismo… sentiu o Porto.", "br"),
            ],
            "Chunks: <em>abrimos a porta</em>",
            "4/5",
        ),
        ComicPage(
            "Resolution",
            "ep06-comic-p5.webp",
            "Night at the print shop",
            [
                Bubble("rosa", "Rosa", "Acabou a revolução?", "tl"),
                Bubble("miguel", "Miguel", "Acabou este dia. A liberdade… ainda se escreve.", "tr"),
                Bubble("gaivota", "Gaivota", "Guardo este cais. Portugal pediu lei.", "br"),
            ],
            "End of story · no “to be continued”",
            "5/5",
        ),
    ],
    study_title="Study pack — Revolução Liberal",
    quiz=[
        "Onde começa a revolução nesta história?",
        "Quem são Rosa e Miguel?",
        "O que juram na praça?",
        "O que significa “abrimos a porta”?",
        "Como acaba a história?",
    ],
    cultural_note="In 1820 Porto sparked Portugal’s Liberal Revolution: officers, merchants, and citizens pressed for a constitution and Cortes while King João VI was still in Brazil. Print and public oaths mattered as much as muskets. The comic stays human-scale — a sister who prints, a brother who swears, and a city that asked for written law.",
    char_colors={"rosa": "#8b1f3d", "miguel": "#1f6f8b"},
)

out = build(ep, base)
print(f"wrote {out} ({out.stat().st_size} bytes)")
