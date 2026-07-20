#!/usr/bin/env python3
from __future__ import annotations
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent / "lib"))
from gaivota_episode_html import Bubble, ComicPage, EpisodeHtml, build

base = Path(__file__).resolve().parents[1] / (
    "prototypes/language-comics/gaivota-em-portugal/episodes/08-estado-novo"
)
ep = EpisodeHtml(
    number="08", slug="08-estado-novo", title="Estado Novo", year="c. 1950",
    cover_img="ep08-cover.webp", cover_alt="Cover: Estado Novo",
    cover_blurb_pt="Meados do século XX — uma sala de aula sob silêncio, numa história completa em cinco páginas.",
    brief_img="ep08-brief-textbook.webp",
    brief_caption="Estado Novo era — history-textbook plate (engraving style).",
    brief_h2="Estado Novo (atmosphere)",
    brief_hook="Under the Estado Novo, daily Portugal learned to speak carefully — school, home, and the weight of approved words.",
    brief_bullets=[
        "<strong>When:</strong> mid-20th century (atmosphere episode)",
        "<strong>Where:</strong> Lisbon school and home",
        "<strong>Who:</strong> ordinary teachers, pupils, neighbours under authoritarian rule",
        "<strong>How:</strong> censorship, inspection, quiet compliance — and private questions",
        "<strong>After:</strong> memory of a long silence before the Carnation Revolution",
    ],
    brief_para="This issue is not a battlefield. It is a classroom and a kitchen — where a teacher and a child measure which words can be said aloud.",
    disclaimer="Human-scale school life; no torture, no graphic police violence.",
    comic_pages=[
        ComicPage("Setup", "ep08-comic-p1.webp", "Morning with Marta and João", [
            Bubble("gaivota", "Gaivota", "A cidade acorda… com voz baixa.", "p1-gaivota"),
            Bubble("marta", "Marta", "João, leva o caderno. Sem rabiscos na margem.", "p1-a"),
            Bubble("joao", "João", "Tia, e se o inspector perguntar?", "p1-b"),
        ], "Characters: Marta · João · Gaivota", "1/5"),
        ComicPage("Rising action", "ep08-comic-p2.webp", "Classroom caution", [
            Bubble("joao", "João", "Professora… isto está no livro?", "tl"),
            Bubble("marta", "Marta", "Está o que podemos dizer em voz alta.", "tr"),
            Bubble("gaivota", "Gaivota", "As palavras medem o ar antes de sair.", "br"),
        ], "Chunks: <em>em voz alta</em>", "2/5"),
        ComicPage("Turning point", "ep08-comic-p3.webp", "Inspector visit", [
            Bubble("", "Inspector", "Tudo conforme?", "tl"),
            Bubble("marta", "Marta", "Conforme. Para hoje.", "tr"),
            Bubble("gaivota", "Gaivota", "Um carimbo… pesa mais que o giz.", "br"),
        ], "Chunks: <em>tudo conforme</em>", "3/5"),
        ComicPage("Consequence", "ep08-comic-p4.webp", "Walk home", [
            Bubble("joao", "João", "Um dia lemos tudo?", "tl"),
            Bubble("marta", "Marta", "Um dia. Guarda as perguntas… no bolso.", "tr"),
            Bubble("gaivota", "Gaivota", "O silêncio também ensina.", "br"),
        ], "Chunks: <em>guarda as perguntas</em>", "4/5"),
        ComicPage("Resolution", "ep08-comic-p5.webp", "Kitchen lamp", [
            Bubble("joao", "João", "Portugal é pequeno?", "tl"),
            Bubble("marta", "Marta", "Portugal é nosso. Ainda cresce por dentro.", "tr"),
            Bubble("gaivota", "Gaivota", "Guardo esta sala. Portugal aprende em segredo.", "br"),
        ], "End of story · no “to be continued”", "5/5"),
    ],
    study_title="Study pack — Estado Novo",
    quiz=["Onde trabalha Marta?", "Quem é João?", "O que faz o inspector?", "O que Marta pede a João para guardar?", "Como acaba a história?"],
    cultural_note="The Estado Novo (1933–1974) was Portugal’s long authoritarian regime. This comic stays human-scale: school stamps, careful speech, and a child’s questions — not torture or battlefield violence. It remembers the silence that later made 25 de Abril feel like air.",
    char_colors={"marta": "#8b1f3d", "joao": "#1f6f8b"},
)
print("wrote", build(ep, base))
