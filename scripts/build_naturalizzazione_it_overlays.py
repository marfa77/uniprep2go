#!/usr/bin/env python3
"""Emit scripts/data/naturalizzazione-svizzera-expand-it-60.json for IT Swiss expand."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "scripts/data/naturalizzazione-svizzera-expand-it-60.json"

OVERLAYS: dict[str, dict] = {}


def add(
    key: str,
    prompt: str,
    opts: dict[str, str],
    expl: str,
    dist: dict[str, str],
) -> None:
    OVERLAYS[key] = {
        "prompt": prompt,
        "options": opts,
        "explanation": expl,
        "distractorExplanations": dist,
    }


# politics-democracy 016–030
add(
    "politics-democracy-016",
    "Quante firme valide servono per un'iniziativa popolare federale affinché sia ammessa al voto?",
    {"a": "50.000 firme entro 100 giorni", "b": "200.000 firme senza scadenza", "c": "26 firme cantonali, una per cantone", "d": "100.000 firme entro 18 mesi"},
    "Un'iniziativa popolare richiede almeno 100.000 firme di elettori entro 18 mesi prima che Consiglio federale e Parlamento la trattino.",
    {"a": "50.000 in 100 giorni è la soglia per un referendum facoltativo contro una legge già approvata.", "b": "Non esiste un limite generale di 200.000 firme per le iniziative.", "c": "I cantoni non aderiscono con una firma ciascuno."},
)
add(
    "politics-democracy-017",
    "Quante firme servono per un referendum facoltativo contro una nuova legge federale?",
    {"a": "50.000 firme entro 100 giorni dalla pubblicazione ufficiale", "b": "100.000 firme entro 18 mesi", "c": "Una maggioranza di cantoni senza firme popolari", "d": "Solo firme dei deputati del Consiglio nazionale"},
    "Contro una legge federale approvata dal Parlamento, 50.000 elettori possono chiedere un referendum entro 100 giorni.",
    {"b": "100.000 in 18 mesi vale per le iniziative popolari, non per i referendum facoltativi contro leggi.", "c": "Per le leggi ordinarie non è richiesta la maggioranza cantonale; servono firme degli elettori.", "d": "I parlamentari possono firmare, ma la quota viene dalla popolazione."},
)
add(
    "politics-democracy-018",
    "Quanti membri ha il Consiglio nazionale?",
    {"a": "46", "b": "200", "c": "100", "d": "250"},
    "Il Consiglio nazionale ha 200 seggi; la ripartizione dipende dalla popolazione dei cantoni.",
    {"a": "46 è la dimensione del Consiglio degli Stati, non del nazionale.", "c": "100 non corrisponde alla composizione attuale.", "d": "250 supera il numero previsto dalla Costituzione."},
)
add(
    "politics-democracy-019",
    "Quanti membri ha il Consiglio degli Stati?",
    {"a": "200", "b": "46", "c": "26", "d": "60"},
    "Il Consiglio degli Stati conta 46 membri: di regola due per cantone, uno per i semicantoni.",
    {"a": "200 è la grandezza del Consiglio nazionale.", "c": "26 sarebbe un solo seggio per cantone senza regola dei semicantoni.", "d": "60 non è la composizione del Consiglio degli Stati."},
)
add(
    "politics-democracy-020",
    "Chi elegge le sette consigliere e i sette consiglieri federali?",
    {"a": "Il popolo in elezione diretta generale", "b": "Solo il Consiglio degli Stati", "c": "Il Consiglio federale in votazione interna", "d": "L'Assemblea federale (Consiglio nazionale e Stati insieme)"},
    "Le consigliere e i consiglieri federali sono eletti dall'Assemblea federale dopo ogni legislatura del Consiglio nazionale.",
    {"a": "Non esiste elezione popolare diretta del governo federale.", "b": "Il nazionale da solo non basta; i due consigli si riuniscono.", "c": "Il Consiglio federale non si elegge da solo."},
)
add(
    "politics-democracy-021",
    "Quanto dura una legislatura del Consiglio nazionale?",
    {"a": "Quattro anni", "b": "Due anni", "c": "Cinque anni", "d": "Sei anni come al Senato USA"},
    "I deputati del Consiglio nazionale sono rieletti ogni quattro anni.",
    {"b": "Due anni valgono in altri paesi, non per il nazionale svizzero.", "c": "Cinque anni non corrisponde al ciclo federale.", "d": "Sei anni è il modello statunitense, non svizzero."},
)
add(
    "politics-democracy-022",
    "La Svizzera è membro dell'Unione europea?",
    {"a": "Sì, dal 1995", "b": "Sì, con diritto di voto come associata", "c": "No, perché non ha alcun trattato con l'UE", "d": "No — i rapporti si basano su accordi bilaterali"},
    "La Svizzera non è membro UE; regola molti temi con accordi bilaterali e conserva referendum e autonomia.",
    {"a": "L'adesione è stata respinta più volte; non c'è pieno membro.", "b": "Non si vota a Bruxelles senza appartenenza.", "c": "Senza accordi il commercio non sarebbe realistico; i trattati esistono."},
)
add(
    "politics-democracy-023",
    "Cosa significa in linea di principio la neutralità nella politica estera svizzera?",
    {"a": "Divieto assoluto di esportare armi", "b": "Assenza di membro ONU", "c": "Non partecipare a guerre tra altri Stati", "d": "Non firmare trattati internazionali"},
    "Neutralità significa non schierarsi in conflitti armati tra Stati; la Svizzera mantiene diplomazia e trattati.",
    {"a": "Le esportazioni sono regolate, ma non definiscono la neutralità.", "b": "La Svizzera è membro ONU dal 2002.", "d": "Firma molti accordi pur restando neutrale nei conflatti altrui."},
)
add(
    "politics-democracy-024",
    "Dove ha sede il Tribunale federale?",
    {"a": "Berna", "b": "Losanna", "c": "Zurigo", "d": "Ginevra"},
    "Il Tribunale federale è l'ultima istanza ordinaria e ha sede a Losanna.",
    {"a": "Berna ospita Parlamento e governo, non il Tribunale federale.", "c": "Zurigo ha tribunali importanti, ma non l'istanza suprema federale.", "d": "Ginevra è internazionale; la sede del Tribunale federale è a Losanna."},
)
add(
    "politics-democracy-025",
    "Qual è il ruolo del cancelliere federale?",
    {"a": "Dirige la Cancelleria e sostiene il Consiglio federale senza essere membro del Collegio", "b": "Membro del Consiglio federale con un dipartimento", "c": "Presidente del Consiglio nazionale", "d": "Comandante supremo dell'esercito"},
    "Il cancelliere federale guida la Cancelleria e coordina il segretariato del governo; non è l'ottava persona del Consiglio.",
    {"b": "Solo i sette consiglieri federali formano il Collegio con dipartimenti.", "c": "Il nazionale è presieduto dal presidente del nazionale.", "d": "Il comando militare spetta al Consiglio federale."},
)
add(
    "politics-democracy-026",
    "Da quando vale la Costituzione federale nella sua forma federale moderna?",
    {"a": "1291 con gli Uri cantonali", "b": "1815 solo per il congresso di Vienna", "c": "1971 con il voto alle donne", "d": "1848 (riformulata dopo la guerra del Sonderbund)"},
    "La Costituzione del 1848 creò lo Stato federale moderno con maggiore potere centrale e idee di controllo costituzionale.",
    {"a": "1291 è mito fondativo, non il testo moderno.", "b": "1815 influì sulla neutralità, non sostituì la Costituzione del 1848.", "c": "1971 riguardò il voto femminile, non l'intero testato costituzionale."},
)
add(
    "politics-democracy-027",
    "Quali lingue sono ufficialmente riconosciute a livello federale?",
    {"a": "Solo tedesco e francese", "b": "Tedesco, francese e inglese", "c": "Tedesco, francese, italiano e romancio", "d": "Tutte le lingue ufficiali dell'UE"},
    "Le quattro lingue nazionali sono nel diritto federale; il romancio ha protezione speciale in Grigioni.",
    {"a": "L'italiano è paritario con tedesco e francese.", "b": "L'inglese non è lingua nazionale svizzera.", "d": "Le lingue UE non diventano automaticamente nazionali."},
)
add(
    "politics-democracy-028",
    "Cos'è una controproposta parlamentare a un'iniziativa popolare?",
    {"a": "Un testo alternativo su cui gli elettori votano insieme all'iniziativa", "b": "Un rifiuto automatico di ogni iniziativa", "c": "Una legge decisa solo dagli Stati", "d": "Una sentenza del Tribunale federale"},
    "Consiglio federale e Parlamento possono formulare una controproposta; gli elettori votano su entrambe.",
    {"b": "Le iniziative non sono respinte in blocco; può esserci una controproposta.", "c": "Le leggi ordinarie passano da entrambe le Camere, non è questo il caso specifico.", "d": "Il Tribunale federale giudica, non propone testi."},
)
add(
    "politics-democracy-029",
    "Quale organo federale elegge il Consiglio federale e i giudici del Tribunale federale?",
    {"a": "L'Assemblea federale", "b": "Solo il Consiglio nazionale", "c": "Solo i governi cantonali", "d": "La Commissione europea"},
    "Nazionale e Stati si riuniscono come Assemblea federale per eleggere governo e magistrati supremi.",
    {"b": "Manca il Consiglio degli Stati se vota solo il nazionale.", "c": "I cantoni eleggono indirettamente tramite parlamentari, non da soli.", "d": "L'UE non elegge organi svizzeri."},
)
add(
    "politics-democracy-030",
    "Quando un referendum è obbligatorio in Svizzera?",
    {"a": "Per ogni nuova imposta cantonale", "b": "Solo per fusioni comunali", "c": "Per modifiche costituzionali e certi trattati internazionali", "d": "Per ogni variazione tariffa postale senza eccezioni"},
    "Le modifiche costituzionali e importanti trattati di Stato sono sottoposti a votazione popolare obbligatoria.",
    {"a": "Le imposte cantonali sono di competenza cantonale, non referendum federale obbligatorio.", "b": "Le fusioni comunali sono cantonali.", "d": "Le tariffe postali non scatenano referendum obbligatori."},
)

# history-culture 016–030
add(
    "history-culture-016",
    "In quale data si celebra tradizionalmente la festa nazionale federale?",
    {"a": "18 aprile (Marignano)", "b": "12 settembre (votazioni)", "c": "31 dicembre", "d": "1° agosto"},
    "Il 1° agosto ricorda la tradizione confederale ed è la festa nazionale.",
    {"a": "Il 18 aprile non è festa federale.", "b": "Le domeniche di votazione non sono feste nazionali.", "c": "Capodanno non è festa federale."},
)
add(
    "history-culture-017",
    "Da quando le donne votano ed eleggono a livello federale?",
    {"a": "Dal 1971", "b": "Dal 1848", "c": "Dal 1990", "d": "Dal 1291"},
    "Il referendum federale del 1971 introdusse il voto femminile a livello confederale.",
    {"b": "Il 1848 non incluse subito le donne.", "c": "Il 1990 riguardò Appenzell interno a livello cantonale, non il passo federale.", "d": "Il 1291 non riguarda il suffragio femminile."},
)
add(
    "history-culture-018",
    "Cosa significa la sigla CH su targhe e francobolli?",
    {"a": "Cantons Helvetes", "b": "Confoederatio Helvetica (nome latino della Svizzera)", "c": "Confederation Helveticae dal 2002", "d": "Chef Helvetique"},
    "Helvetica è il nome latino della Confederazione svizzera, usato come codice internazionale.",
    {"a": "Non è un'abbreviazione di singoli cantoni.", "c": "Il codice esiste da tempo prima dell'adesione ONU del 2002.", "d": "Chef Helvetique non è un nome storico."},
)
add(
    "history-culture-019",
    "Quando la Svizzera è entrata nelle Nazioni Unite?",
    {"a": "1945 come fondatrice", "b": "1990", "c": "2002", "d": "Non è membro"},
    "Dopo lungo status speciale, la Svizzera è diventata membro a pieno titolo nel 2002.",
    {"a": "Nel 1945 restò fuori con status di osservatore.", "b": "Il 1990 non fu l'anno di adesione.", "d": "Dal 2002 è membro a pieno titolo."},
)
add(
    "history-culture-020",
    "Quale evento del 1515 è legato alla fine delle grandi spedizioni di conquista?",
    {"a": "La pace di Westfalia", "b": "La sconfitta a Marignano", "c": "La fondazione del 1291", "d": "L'annessione del Ticino"},
    "Marignano pose fine alle campagne espansive dell'antica Confederazione verso l'Italia.",
    {"a": "Westfalia è del 1648 in Europa centrale.", "c": "Il 1291 è fondazione, non fine dell'espansione.", "d": "Il Ticino entrò più tardi sotto dominio elvetico."},
)
add(
    "history-culture-021",
    "Quali colori ha la bandiera nazionale svizzera?",
    {"a": "Un campo rosso con croce bianca", "b": "Rosso, bianco e blu orizzontali", "c": "Verde con fascia bianca", "d": "Giallo e rosso come il Vaud"},
    "Lo stemma è una croce bianca equilatera su fondo rosso.",
    {"b": "Le strisce tricolori appartengono ad altri Stati.", "c": "Il verde non è colore nazionale svizzero.", "d": "Giallo-rosso è il Vaud, non la bandiera federale."},
)
add(
    "history-culture-022",
    "Perché molti svizzeri parlano dialetti ma scrivono in alto tedesco?",
    {"a": "Il tedesco scritto è lingua amministrativa e scolastica; i dialetti sono orali quotidiani", "b": "I dialetti sono vietati dal 1848", "c": "L'alto tedesco vale solo in Ticino", "d": "Lo svizzero tedesco è identico al tedesco scritto"},
    "L'oralità è regionale; testi ufficiali e scuola in Svizzera tedesca usano di norma l'alto tedesco.",
    {"b": "I dialetti non sono vietati.", "c": "Il Ticino usa l'italiano, non l'alto tedesco.", "d": "Dialetto e scrittura differiscono nettamente."},
)
add(
    "history-culture-023",
    "Cos'è il «fosso del Rösti» nella cultura popolare?",
    {"a": "Il confine tra Svizzera tedesca e francese", "b": "Un confine con l'UE", "c": "Un sentiero nel Oberland bernese", "d": "La linea tra cattolici e protestanti"},
    "Il Röstigraben separa linguisticamente tedeschi e francesi e influenza media e politica.",
    {"b": "Non è un confine con l'UE.", "c": "Non è solo un nome di trekking.", "d": "Confessione e lingua non coincidono sempre."},
)
add(
    "history-culture-024",
    "Quale numero d'emergenza per il soccorso sanitario in Svizzera?",
    {"a": "117 (polizia)", "b": "118 (vigili del fuoco)", "c": "144", "d": "112 (solo fuori Svizzera)"},
    "Ambulanza e urgenza medica: 144; polizia 117 e pompieri 118.",
    {"a": "117 è la polizia.", "b": "118 sono i vigili del fuoco.", "d": "112 spesso funziona, ma 144 è il numero classico sanitario."},
)
add(
    "history-culture-025",
    "Quale numero d'emergenza per i vigili del fuoco?",
    {"a": "118", "b": "144", "c": "117", "d": "101"},
    "Vigili del fuoco e danni elementari: 118; sanità 144 e polizia 117.",
    {"b": "144 è sanitario.", "c": "117 è polizia.", "d": "101 non è un numero d'emergenza svizzero."},
)
add(
    "history-culture-026",
    "Cos'è l'abbonamento «mezza tariffa» nei trasporti pubblici?",
    {"a": "Una carta annuale che riduce di circa metà i prezzi di treno, bus e battello", "b": "Un biglietto gratuito per tutti i treni FFS", "c": "Un pass solo per stranieri", "d": "Un'assicurazione incidenti in treno"},
    "Con mezza tariffa si paga in genere il 50% della tariffa normale nel trasporto pubblico abilitato.",
    {"b": "Non si viaggia gratis così.", "c": "Non è riservata agli stranieri.", "d": "L'assicurazione incidenti è altro prodotto."},
)
add(
    "history-culture-027",
    "Quali tre cantoni formano la leggenda fondativa del 1291?",
    {"a": "Uri, Schwyz e Unterwalden", "b": "Berna, Zurigo e Ginevra", "c": "Vaud, Ticino e Grigioni", "d": "Basilea, Lucerna e Soletta"},
    "La Confederazione medievale iniziò secondo la tradizione con Uri, Schwyz e Unterwalden.",
    {"b": "Berna, Zurigo e Ginevra entrarono dopo.", "c": "Vaud, Ticino e Grigioni non fanno parte della leggenda iniziale.", "d": "Basilea e Lucerna sono stati più tardivi."},
)
add(
    "history-culture-028",
    "Dove fu fondato nel 1863 il Comitato internazionale della Croce Rossa?",
    {"a": "Berna", "b": "Basilea", "c": "Zurigo", "d": "Ginevra"},
    "Henry Dunant e i collaboratori fondarono il CICR a Ginevra.",
    {"a": "Berna è capitale federale, non sede di fondazione del CICR.", "b": "Basilea è commerciale, non luogo di fondazione.", "c": "Zurigo è economica; il CICR nacque a Ginevra."},
)
add(
    "history-culture-029",
    "Cosa si celebra tradizionalmente il 1° agosto?",
    {"a": "L'unione della Confederazione e la comunità federale", "b": "La vittoria a Marignano", "c": "L'adesione all'UE", "d": "L'introduzione dell'euro"},
    "Il 1° agosto mette al centro la comunità nazionale, non un evento militare.",
    {"b": "Marignano fu una sconfitta.", "c": "Non ci fu adesione UE.", "d": "Il franco restò; l'euro non fu adottato."},
)
add(
    "history-culture-030",
    "Quale affermazione sulla storia federale è corretta?",
    {"a": "Prima del 1848 esisteva la Dieta; il 1848 creò il moderno Stato federale", "b": "Dal 1291 Stato unitario centralizzato", "c": "La Svizzera colonia francese nel 1848", "d": "Stato federale solo dal 1971"},
    "Il passaggio dalla Dieta alla Costituzione del 1848 modernizzò istituzioni e competenze.",
    {"b": "L'antica Lega era poco centralizzata, non unitaria.", "c": "La Francia non colonizzò la Svizzera nel 1848.", "d": "Il 1971 riguardò il voto femminile, non la nascita dello Stato."},
)

# geography-society 016–030
add(
    "geography-society-016",
    "Qual è la capitale della Svizzera?",
    {"a": "Zurigo", "b": "Ginevra", "c": "Losanna", "d": "Berna"},
    "Berna è sede di Confederazione, ambasciate e molte autorità federali — non la città più grande.",
    {"a": "Zurigo è la più grande economicamente, non capitale.", "b": "Ginevra è centro internazionale, non capitale.", "c": "Losanna ospita il Tribunale federale; la capitale è Berna."},
)
add(
    "geography-society-017",
    "Quale vetta è spesso chiamata Punta Dufour?",
    {"a": "Massiccio del Monte Rosa (punto più alto della Svizzera)", "b": "Cervino", "c": "Eiger", "d": "Pilatus"},
    "La Punta Dufour (Monte Rosa) a 4634 m è il punto culminante del paese.",
    {"b": "Il Cervino è iconico ma leggermente più basso.", "c": "L'Eiger è nell'Oberland bernese, non il più alto.", "d": "Il Pilatus è molto più basso."},
)
add(
    "geography-society-018",
    "Con quanti Stati confina la Svizzera?",
    {"a": "Tre: solo vicini UE", "b": "Cinque: Germania, Francia, Italia, Austria e Liechtenstein", "c": "Sei con Slovenia", "d": "Quattro senza il principato"},
    "Cinque confini: quattro Stati UE più il Liechtenstein.",
    {"a": "Sono cinque confini, non tre.", "c": "La Slovenia non confina con la Svizzera.", "d": "Il Liechtenstein è il quinto vicino."},
)
add(
    "geography-society-019",
    "L'assicurazione malattia obbligatoria vale per tutti i residenti?",
    {"a": "No, solo per i lavoratori", "b": "No, solo in Ticino", "c": "Sì — ognuno deve avere assicurazione di base riconosciuta", "d": "Sì, ma solo all'estero"},
    "Senza assicurazione base si rischiano sanzioni e premi arretrati.",
    {"a": "Non solo i lavoratori, tutti i residenti.", "b": "Vale in tutta la Confederazione.", "d": "L'estero non sostituisce l'assicurazione svizzera."},
)
add(
    "geography-society-020",
    "Cos'è l'AVS?",
    {"a": "Assicurazione disoccupazione", "b": "Tassa auto cantonale", "c": "Servizio militare", "d": "Assicurazione vecchiaia e superstiti — primo pilastro"},
    "Contributi AVS garantiscono una pensione di base nella previdenza statale.",
    {"a": "La disoccupazione è AD, non AVS.", "b": "La tassa auto è cantonale.", "c": "Il servizio militare è obbligo di difesa, non pensione."},
)
add(
    "geography-society-021",
    "Cos'è l'AI nel sistema sociale?",
    {"a": "Assicurazione invalidità per persone con danni sanitari riconosciuti", "b": "Assicurazione disoccupazione per cassa integrazione", "c": "Assicurazione militare per militari", "d": "Assicurazione infortuni solo sci"},
    "L'AI sostiene l'inserimento e le prestazioni accanto all'AVS.",
    {"b": "Cassa integrazione e disoccupazione sono AD.", "c": "I militari hanno altre coperture, non la definizione dell'AI.", "d": "Infortuni lavoro/NA sono altro, non tutta l'AI."},
)
add(
    "geography-society-022",
    "Cosa si intende per esercito di milizia svizzero?",
    {"a": "Solo mercenari stranieri", "b": "Milizia periodica: la maggioranza sono cittadini richiamati", "c": "Guardia volontaria senza obbligo", "d": "Contingente ONU"},
    "Gli uomini fanno reclutamento e corsi periodici; professionisti integrano.",
    {"a": "Sono cittadini svizzeri, non mercenari.", "c": "L'obbligo militare esiste ancora.", "d": "Le truppe ONU non sono la struttura di milizia."},
)
add(
    "geography-society-023",
    "Quale valuta circola in Svizzera?",
    {"a": "Euro (€)", "b": "Dollaro USA", "c": "Franco svizzero (CHF)", "d": "Marco tedesco"},
    "Franchi e centesimi sono moneta legale; l'euro è accettato volontariamente al confine.",
    {"a": "L'euro non è valuta ufficiale.", "b": "Il dollaro non è valuta nazionale.", "d": "Il marco non esiste più."},
)
add(
    "geography-society-024",
    "Quale fiume attraversa Berna?",
    {"a": "Reno", "b": "Rodano", "c": "Inn", "d": "Aar"},
    "L'Aar circonda la vecchia città di Berna; Reno e Rodano sono altrove.",
    {"a": "Il Reno segna il confine tedesco, non Berna.", "b": "Il Rodano nasce in Valais.", "c": "L'Inn è a est, non a Berna."},
)
add(
    "geography-society-025",
    "In quale cantone il francese è lingua dominante (esempio Vaud)?",
    {"a": "Vaud", "b": "Uri", "c": "Schwyz", "d": "Appenzell Esterno"},
    "Il Vaud è prevalentemente francofono; anche Ginevra e Neuchâtel.",
    {"b": "Uri è tedesco.", "c": "Schwyz è tedesco.", "d": "Appenzell Esterno è tedesco."},
)
add(
    "geography-society-026",
    "Cosa regola soprattutto il cantone?",
    {"a": "Politica estera e moneta da soli", "b": "Scuole, polizia, sanità applicata e molte imposte", "c": "Solo la posta", "d": "Solo l'esercito"},
    "Federalismo: cantoni forti in istruzione, sicurezza locale e fiscalità.",
    {"a": "Estero e moneta sono federali.", "c": "La posta è oggi società azionaria.", "d": "L'esercito è competenza federale."},
)
add(
    "geography-society-027",
    "Cosa regola soprattivamente la Confederazione?",
    {"a": "Rifiuti comunali", "b": "Programmi scolastici di ogni villaggio", "c": "Dogana, politica estera, strade nazionali, difesa e diritto federale", "d": "Solo uniformi cantonali di polizia"},
    "Competenze federali: sicurezza esterna, trasporti chiave e quadro legislativo unico.",
    {"a": "I rifiuti sono comune/cantone.", "b": "Le scuole sono cantonali.", "d": "La polizia è cantonale."},
)
add(
    "geography-society-028",
    "Quale lago è condiviso da Germania, Austria e Svizzera?",
    {"a": "Lago di Ginevra", "b": "Lago di Zurigo", "c": "Lago di Brienz", "d": "Lago di Costanza"},
    "Il Bodensee/Costanza è al confine triplice D-A-CH.",
    {"a": "Il Lemano è CH-Francia.", "b": "Il Zurigo è interamente svizzero.", "c": "Il Brienz è alpino svizzero."},
)
add(
    "geography-society-029",
    "Quali obblighi hanno chi vive in Svizzera (esempi)?",
    {"a": "Rispettare le leggi, pagare imposte, assicurazione malattia", "b": "Solo donazioni volontarie", "c": "Solo esercito senza tasse", "d": "Nessuna assicurazione"},
    "Chi risiede qui segue l'ordine giuridico, finanzia il collectif e deve essere assicurato.",
    {"b": "Le donazioni non sostituiscono obblighi.", "c": "Il servizio militare non esenta dalle tasse.", "d": "L'assicurazione base è obbligatoria."},
)
add(
    "geography-society-030",
    "Quando si svolgono di norma votazioni e elezioni federali?",
    {"a": "Ogni lunedì", "b": "Diversi weekend durante l'anno", "c": "Solo il 1° agosto", "d": "Solo a dicembre"},
    "I referendum federali si tengono di solito in domeniche fissate più volte l'anno.",
    {"a": "Il lunedì non è il ritmo nazionale.", "b": "Il 1° agosto è festa, non calendario elettorale.", "d": "Dicembre da solo non basta."},
)

# naturalisation 016–030
add(
    "naturalisation-016",
    "Come si contano gli anni di residenza tra 8 e 18 anni per la naturalizzazione ordinaria?",
    {"a": "Non contano", "b": "Contano tripli", "c": "Conta solo l'ultimo anno", "d": "Contano doppi, ma servono almeno 6 anni effettivi"},
    "Gli anni minori valgono doppio ma non sostituiscono il minimo di permanenza effettiva.",
    {"a": "Gli anni giovanili contano, non sono zero.", "b": "Non c'è triplo.", "c": "Non vale solo un anno."},
)
add(
    "naturalisation-017",
    "Gli anni con permesso L contano per i 10 anni federali?",
    {"a": "No — il permesso L non conta per la naturalizzazione ordinaria", "b": "Sì come il C", "c": "Sì, ma solo in Ticino", "d": "Solo la metà"},
    "Per l'ordinaria servono in gran parte anni con status B/C ecc., non L.",
    {"b": "C e permessi assimilabili contano, non L.", "c": "Non esiste eccezione ticinese per L.", "d": "La metà riguarda altri casi."},
)
add(
    "naturalisation-018",
    "Quale permesso serve al momento della domanda di naturalizzazione ordinaria?",
    {"a": "Permesso di domicilio (C)", "b": "Permesso di breve durata (L)", "c": "Permesso frontaliero senza residenza", "d": "Nessun permesso"},
    "Per l'ordinaria occorre un permesso C valido durante la procedura.",
    {"b": "L è troppo breve per l'ordinaria.", "c": "I frontalieri vivono altrove; altra procedura.", "d": "Senza titolo di soggiorno non si può domandare."},
)
add(
    "naturalisation-019",
    "Cosa verifica la Confederazione oltre a lingua e permanenza?",
    {"a": "Solo il saldo bancario", "b": "Solo la religione", "c": "Familiarità con le condizioni di vita svizzere e integrazione", "d": "Solo il luogo d'origine dei nonni"},
    "L'integrazione riguarda adattamento, coesione e rispetto dell'ordine giuridico.",
    {"a": "Il patrimonio da solo non basta.", "b": "La religione non è criterio.", "d": "L'ascendenza non sostituisce l'integrazione."},
)
add(
    "naturalisation-020",
    "Chi rientra tipicamente nella naturalizzazione facilitata?",
    {"a": "Solo milionari", "b": "Solo diplomatici UE", "c": "Persone nate o cresciute in Svizzera o sposate con cittadino svizzero", "d": "Solo rimpatriati senza precedente soggiorno"},
    "La legge prevede vie semplificate per legami stretti con la Svizzera.",
    {"a": "La ricchezza non apre un percorso speciale.", "b": "Lo status diplomatico non è criterio facilitato.", "d": "Senza legame precedente di solito non c'è la via facilitata."},
)
add(
    "naturalisation-021",
    "Chi decide in ultima istanza sulla naturalizzazione ordinaria?",
    {"a": "Cantone e comune, poi conferma federale (SEM)", "b": "Solo l'UE", "c": "Solo il Tribunale federale", "d": "Solo il comune senza cantone"},
    "Cantone e comune verificano integrazione locale; la Confederazione rilascia l'atto federale.",
    {"b": "Bruxelles non decide il cittadinanza svizzera.", "c": "Il Tribunale federale non è autorità di naturalizzazione.", "d": "Il cantone resta necessario."},
)
add(
    "naturalisation-022",
    "Da quando il diritto svizzero ammette in generale la doppia cittadinanza all'acquisto?",
    {"a": "Dal 1291 obbligatoria", "b": "Mai — è vietata", "c": "Solo per sportivi", "d": "Dalla riforma (1952 limitata, ampliata negli anni 1990/2018)"},
    "Oggi molti possono conservare la cittadinanza precedente; verificare nel proprio Stato.",
    {"a": "Il 1291 non conosceva cittadinanza moderna.", "b": "Il divieto è storico, oggi più flessibile.", "c": "La professione non è regola generale."},
)
add(
    "naturalisation-023",
    "Cosa può chiedere un comune in più nella procedura?",
    {"a": "Colloquio, test scritto o altri requisiti cantonali", "b": "Patente UE", "c": "Carica di consigliere federale", "d": "Nessuna verifica oltre la norma federale"},
    "Comuni e cantoni possono verificare attualità civica — i formati variano.",
    {"b": "La patente UE non è criterio.", "c": "Cariche politiche non sono prerequisito.", "d": "Verifiche locali sono comuni."},
)
add(
    "naturalisation-024",
    "Quale ruolo ha il SEM (Segretariato di Stato per la migrazione)?",
    {"a": "Emette l'atto federale di acquisto dopo cantone/comune", "b": "Elegge il Consiglio federale", "c": "Dirige le banche cantonali", "d": "Sostituisce del tutto i comuni"},
    "Dopo il sì cantonale/comunale il SEM conclude il passo federale e rilascia i documenti.",
    {"b": "Il Consiglio federale è eletto dall'Assemblea federale.", "c": "Le banche non sono guidate dal SEM.", "d": "I comuni restano nella prima fase."},
)
add(
    "naturalisation-025",
    "Cosa significa fide nel contesto naturalizzazione?",
    {"a": "Quadro linguistico (es. B1 orale / A2 scritto come riferimento)", "b": "Festa cantonale", "c": "Assicurazione malattia", "d": "Grado militare"},
    "fide descrive livelli linguistici per vita quotidiana e contatti con autorità.",
    {"b": "Non è nome di festa.", "c": "L'assicurazione malattia è LAMal, non fide.", "d": "Il militare è servizio, non fide."},
)
add(
    "naturalisation-026",
    "Quali tre vie ufficiali portano alla cittadinanza per decisione?",
    {"a": "Ordinaria, facilitata e riacquisto", "b": "Solo nascita all'estero", "c": "Solo lotteria", "d": "Solo matrimonio senza soggiorno"},
    "La legge distingue ordinaria, facilitata e riacquisto (riedizione).",
    {"b": "La nascita all'estero non basta da sola.", "c": "Non esiste lotteria.", "d": "Il matrimonio richiede soggiorno e altri requisiti."},
)
add(
    "naturalisation-027",
    "Quanto devono aver vissuto in Svizzera i coniugi di cittadino svizzero (via facilitata)?",
    {"a": "Un mese", "b": "Cinque anni di residenza, di cui un anno di matrimonio prima della domanda", "c": "Venti anni senza eccezioni", "d": "Nessun soggiorno"},
    "La via facilitata chiede cinque anni di residenza e almeno un anno di matrimonio immediatamente prima.",
    {"a": "Un mese non basta.", "c": "Venti anni è l'ordinaria, non la facilitata.", "d": "Il soggiorno è obbligatorio."},
)
add(
    "naturalisation-028",
    "Cosa succede spesso con debiti fiscali o assistenza sociale?",
    {"a": "Possono ostacolare la naturalizzazione — conta l'onestà finanziaria", "b": "Migliorano automaticamente le chance", "c": "Sono irrilevanti", "d": "Si controllano solo i nonni"},
    "Le autorità valutano responsabilità finanziaria e integrazione.",
    {"b": "I debiti non sono un vantaggio.", "c": "La finanza fa parte dell'integrazione.", "d": "I nonni non sono decisivi."},
)
add(
    "naturalisation-029",
    "Perché spesso non basta un quiz generico da internet?",
    {"a": "Cantoni e comuni verificano anche temi locali — formati diversi", "b": "Perché non esistono test", "c": "Perché conta solo l'inglese", "d": "Perché il Bund testa solo in francese"},
    "Zurigo, Berna e altri pubblicano liste proprie; serve preparazione locale.",
    {"b": "Colloqui e test esistono in molti comuni.", "c": "Le lingue nazionali sono DE/FR/IT/RM.", "d": "La lingua segue la regione."},
)
add(
    "naturalisation-030",
    "La naturalizzazione finisce con solo l'atto SEM?",
    {"a": "No — servono sì cantone/comune; poi l'atto federale", "b": "Sì, SEM sostituisce tutto", "c": "Sì, basta un quiz online", "d": "No, ma senza permesso"},
    "Procedura a più livelli: integrazione locale, poi conferma federale.",
    {"b": "SEM chiude solo il passo federale.", "c": "Le autorità vanno oltre un quiz.", "d": "Serve un titolo di soggiorno valido."},
)

def main() -> None:
    expected = 60
    if len(OVERLAYS) != expected:
        raise SystemExit(f"expected {expected} overlays, got {len(OVERLAYS)} — finish geography + naturalisation")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(OVERLAYS, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {len(OVERLAYS)} overlays → {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
