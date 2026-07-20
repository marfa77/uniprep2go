#!/usr/bin/env python3
from __future__ import annotations
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent / "lib"))
from gaivota_episode_html import Bubble, ComicPage, EpisodeHtml, build

base = Path(__file__).resolve().parents[1] / (
    "prototypes/language-comics/gaivota-em-portugal/episodes/09-treaty-of-windsor"
)
ep = EpisodeHtml(
    number="09", slug="09-treaty-of-windsor", title="Tratado de Windsor", year="1386",
    cover_img="ep09-cover.webp", cover_alt="Cover: Treaty of Windsor",
    cover_blurb_pt="1386 — a aliança anglo-portuguesa nasce no papel, numa história completa em cinco páginas.",
    brief_img="ep09-brief-textbook.webp",
    brief_caption="Windsor, 1386 — history-textbook plate (engraving style).",
    brief_h2="The Treaty of Windsor",
    brief_hook="In 1386 Portugal and England sealed an alliance at Windsor — still remembered as one of the world’s oldest continuous treaties.",
    brief_bullets=[
        "<strong>When:</strong> 1386",
        "<strong>Where:</strong> Windsor (England)",
        "<strong>Who:</strong> Portuguese and English courts after Aljubarrota’s shadow",
        "<strong>How:</strong> diplomacy, seals, mutual defence promises",
        "<strong>After:</strong> a long Anglo-Portuguese friendship begins on parchment",
    ],
    brief_para="Not a battle — a corridor, a hall, and a signature. Two young attendants watch an alliance that outlives them.",
    disclaimer="Human-scale court diplomacy; no battle gore.",
    comic_pages=[
        ComicPage("Setup", "ep09-comic-p1.webp", "Dawn at Windsor", [
            Bubble("gaivota", "Gaivota", "Dois reinos… uma manhã fria.", "p1-gaivota"),
            Bubble("beatriz", "Beatriz", "A carta chegou da corte de Lisboa.", "p1-a"),
            Bubble("tom", "Tom", "My lord waits. The ink is still wet.", "p1-b"),
        ], "Characters: Beatriz · Tom · Gaivota", "1/5"),
        ComicPage("Rising action", "ep09-comic-p2.webp", "Hall preparations", [
            Bubble("beatriz", "Beatriz", "Tradução cuidada. Cada palavra… pesa.", "tl"),
            Bubble("tom", "Tom", "Peace is heavier than a sword today.", "tr"),
            Bubble("gaivota", "Gaivota", "O vento traz promessas através do canal.", "br"),
        ], "Chunks: <em>cada palavra pesa</em>", "2/5"),
        ComicPage("Turning point", "ep09-comic-p3.webp", "Signing", [
            Bubble("", "Embaixador", "Pelo rei de Portugal. Pelo rei de Inglaterra.", "tl"),
            Bubble("beatriz", "Beatriz", "Assinado. A aliança nasce.", "tr"),
            Bubble("gaivota", "Gaivota", "Um tratado… mais forte que muralhas.", "br"),
        ], "Chunks: <em>a aliança nasce</em>", "3/5"),
        ComicPage("Consequence", "ep09-comic-p4.webp", "Courtyard", [
            Bubble("tom", "Tom", "Will it last?", "tl"),
            Bubble("beatriz", "Beatriz", "Durará. Porque ambos precisam.", "tr"),
            Bubble("gaivota", "Gaivota", "Amizade antiga… ainda sem rugas.", "br"),
        ], "Chunks: <em>ambos precisam</em>", "4/5"),
        ComicPage("Resolution", "ep09-comic-p5.webp", "Departure", [
            Bubble("beatriz", "Beatriz", "Levo isto a Lisboa.", "tl"),
            Bubble("tom", "Tom", "And I will remember this day.", "tr"),
            Bubble("gaivota", "Gaivota", "Guardo este Windsor. Portugal e Inglaterra… de mãos dadas.", "br"),
        ], "End of story · no “to be continued”", "5/5"),
    ],
    study_title="Study pack — Tratado de Windsor",
    quiz=["Onde se assina o tratado?", "Quem são Beatriz e Tom?", "O que nasce com a assinatura?", "Porque é que Beatriz diz que durará?", "Como acaba a história?"],
    cultural_note="The Treaty of Windsor (1386) bound Portugal and England in mutual alliance soon after Aljubarrota. It is often cited among the oldest continuous treaties still invoked in diplomacy. The comic watches the parchment hour through two attendants — not kings in combat.",
    char_colors={"beatriz": "#8b1f3d", "tom": "#1f6f8b"},
)
print("wrote", build(ep, base))
