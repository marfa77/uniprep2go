#!/usr/bin/env python3
from __future__ import annotations
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent / "lib"))
from gaivota_episode_html import Bubble, ComicPage, EpisodeHtml, build

base = Path(__file__).resolve().parents[1] / (
    "prototypes/language-comics/gaivota-em-portugal/episodes/10-eu-accession"
)
ep = EpisodeHtml(
    number="10", slug="10-eu-accession", title="Adesão à Europa", year="1986",
    cover_img="ep10-cover.webp", cover_alt="Cover: EU Accession 1986",
    cover_blurb_pt="1986 — Portugal abre a janela para a Europa, numa história completa em cinco páginas.",
    brief_img="ep10-brief-textbook.webp",
    brief_caption="1 January 1986 — history-textbook plate (engraving / archival style).",
    brief_h2="Portugal joins the EEC",
    brief_hook="On 1 January 1986 Portugal became a member of the European Communities — a modern hinge after dictatorship and democracy’s return.",
    brief_bullets=[
        "<strong>When:</strong> 1 January 1986",
        "<strong>Where:</strong> Portugal (and Europe)",
        "<strong>Who:</strong> Portuguese citizens after the Carnation Revolution path",
        "<strong>How:</strong> accession to the EEC / European Communities",
        "<strong>After:</strong> funds, mobility, and a new European chapter",
    ],
    brief_para="A father and daughter watch the country join a wider neighbourhood — flags, news, and the quiet pride of an open window.",
    disclaimer="Human-scale family story; hopeful modern tone.",
    comic_pages=[
        ComicPage("Setup", "ep10-comic-p1.webp", "New Year morning 1986", [
            Bubble("gaivota", "Gaivota", "Um ano novo… um continente novo.", "p1-gaivota"),
            Bubble("ana", "Ana", "Pai, hoje entramos na Europa.", "p1-a"),
            Bubble("pedro", "Pedro", "Entramos. Depois de muito debate.", "p1-b"),
        ], "Characters: Ana · Pedro · Gaivota", "1/5"),
        ComicPage("Rising action", "ep10-comic-p2.webp", "Streets with blue flags", [
            Bubble("ana", "Ana", "Lembras-te do referendo?", "tl"),
            Bubble("pedro", "Pedro", "Lembro. Votei sim… com o coração apertado e aberto.", "tr"),
            Bubble("gaivota", "Gaivota", "Lisboa respira futuro.", "br"),
        ], "Chunks: <em>votei sim</em>", "2/5"),
        ComicPage("Turning point", "ep10-comic-p3.webp", "Accession moment", [
            Bubble("", "TV", "Portugal é membro da Comunidade Europeia!", "tl"),
            Bubble("ana", "Ana", "É real…", "tr"),
            Bubble("gaivota", "Gaivota", "Doze estrelas… uma nova bússola.", "br"),
        ], "Chunks: <em>é real</em>", "3/5"),
        ComicPage("Consequence", "ep10-comic-p4.webp", "Café talk", [
            Bubble("pedro", "Pedro", "Estudar lá fora?", "tl"),
            Bubble("ana", "Ana", "Talvez. Mas levo Portugal comigo.", "tr"),
            Bubble("gaivota", "Gaivota", "As fronteiras mudaram de nome.", "br"),
        ], "Chunks: <em>levo Portugal comigo</em>", "4/5"),
        ComicPage("Resolution", "ep10-comic-p5.webp", "Tagus evening", [
            Bubble("ana", "Ana", "Que país somos agora?", "tl"),
            Bubble("pedro", "Pedro", "Os mesmos… com mais vizinhos.", "tr"),
            Bubble("gaivota", "Gaivota", "Guardo este Janeiro. Portugal abriu a janela.", "br"),
        ], "End of story · no “to be continued”", "5/5"),
    ],
    study_title="Study pack — Adesão à Europa",
    quiz=["Em que ano acontece a adesão?", "Quem são Ana e Pedro?", "O que anuncia a televisão?", "O que Ana quer talvez fazer?", "Como acaba a história?"],
    cultural_note="On 1 January 1986 Portugal joined the European Communities (EEC), a landmark after the return to democracy. The comic follows a family morning — flags, news, and the sense that Portugal had opened a window without leaving itself behind.",
    char_colors={"ana": "#8b1f3d", "pedro": "#1f6f8b"},
)
print("wrote", build(ep, base))
