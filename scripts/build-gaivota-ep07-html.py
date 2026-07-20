#!/usr/bin/env python3
"""Build Ep.07 Republic index.html."""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent / "lib"))
from gaivota_episode_html import Bubble, ComicPage, EpisodeHtml, build

base = Path(__file__).resolve().parents[1] / (
    "prototypes/language-comics/gaivota-em-portugal/episodes/07-republic"
)

ep = EpisodeHtml(
    number="07",
    slug="07-republic",
    title="República",
    year="1910",
    cover_img="ep07-cover.webp",
    cover_alt="Cover: Portuguese Republic 1910",
    cover_blurb_pt="1910 — Lisboa acorda com uma bandeira nova, numa história completa em cinco páginas.",
    brief_img="ep07-brief-textbook.webp",
    brief_caption="Lisbon, 5 October 1910 — history-textbook plate (engraving style).",
    brief_h2="The Portuguese Republic",
    brief_hook="On 5 October 1910, Lisbon woke to a new flag — the Portuguese Republic was proclaimed.",
    brief_bullets=[
        "<strong>When:</strong> 5 October 1910",
        "<strong>Where:</strong> Lisbon (and the country follows)",
        "<strong>Who:</strong> republicans, navy units, civilians vs the monarchy of Manuel II",
        "<strong>How:</strong> uprising, civic proclamation; the king leaves into exile",
        "<strong>After:</strong> First Republic begins — new symbols, fragile hopes",
    ],
    brief_para="A day of barricades and balconies remade the regime. The comic follows two civilians at street level — care, fear, and the moment a green-red flag rises over the same wind.",
    disclaimer="It follows two fictional civilians in Lisbon; Gaivota watches. No graphic violence.",
    comic_pages=[
        ComicPage(
            "Setup",
            "ep07-comic-p1.webp",
            "Pre-dawn Lisbon",
            [
                Bubble("gaivota", "Gaivota", "A cidade segura a respiração.", "p1-gaivota"),
                Bubble("clara", "Clara", "Se houver feridos… vamos.", "p1-a"),
                Bubble("rui", "Rui", "Se houver República… também.", "p1-b"),
            ],
            "Characters: Clara · Rui · Gaivota",
            "1/5",
        ),
        ComicPage(
            "Rising action",
            "ep07-comic-p2.webp",
            "Tension in the streets",
            [
                Bubble("rui", "Rui", "Não fiques no meio.", "tl"),
                Bubble("clara", "Clara", "Há gente que precisa de água.", "tr"),
                Bubble("gaivota", "Gaivota", "O Tejo ouve tiros. A Baixa espera.", "br"),
            ],
            "Chunks: <em>não fiques no meio</em>",
            "2/5",
        ),
        ComicPage(
            "Turning point",
            "ep07-comic-p3.webp",
            "Proclamation",
            [
                Bubble("", "Voz", "A República Portuguesa!", "tl"),
                Bubble("rui", "Rui", "É verdade…", "tr"),
                Bubble("gaivota", "Gaivota", "Uma bandeira nova… no mesmo vento.", "br"),
            ],
            "Chunks: <em>a República Portuguesa</em>",
            "3/5",
        ),
        ComicPage(
            "Consequence",
            "ep07-comic-p4.webp",
            "Afternoon relief",
            [
                Bubble("clara", "Clara", "Acabou o medo?", "tl"),
                Bubble("rui", "Rui", "Acabou a monarquia. O medo… aprende novo nome.", "tr"),
                Bubble("gaivota", "Gaivota", "O rei partiu. O povo ficou.", "br"),
            ],
            "Chunks: <em>o povo ficou</em>",
            "4/5",
        ),
        ComicPage(
            "Resolution",
            "ep07-comic-p5.webp",
            "Evening after",
            [
                Bubble("clara", "Clara", "Que país é este agora?", "tl"),
                Bubble("rui", "Rui", "O nosso. Ainda por escrever.", "tr"),
                Bubble("gaivota", "Gaivota", "Guardo este Outubro. Portugal mudou de nome.", "br"),
            ],
            "End of story · no “to be continued”",
            "5/5",
        ),
    ],
    study_title="Study pack — República",
    quiz=[
        "Em que dia se proclama a República nesta história?",
        "Quem são Clara e Rui?",
        "O que se ouve na varanda?",
        "O que acontece ao rei?",
        "Como acaba a história?",
    ],
    cultural_note="On 5 October 1910 the Portuguese Republic was proclaimed in Lisbon after an uprising that ended the monarchy of Manuel II. New national symbols followed; politics remained fragile. The comic stays at street level — a nurse, a friend, a flag, and a city learning a new name.",
    char_colors={"clara": "#8b1f3d", "rui": "#1f6f8b"},
)

out = build(ep, base)
print(f"wrote {out}")
