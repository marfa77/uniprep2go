#!/usr/bin/env python3
"""Generate Finland kansalaisuuskoe readiness-check bank (60 Finnish MCQs)."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SLUG = "finland-kansalaisuuskoe-readiness-check"
OUT = ROOT / "src/data/mock-exams" / f"{SLUG}.json"
SOURCE = (
    "Authored by UniPrep2Go for Finland kansalaisuuskoe (2027) theme practice — "
    "independent MCQs on Migri-published topic areas, not official Maahanmuuttovirasto material."
)
ANSWERS = ["a", "b", "c", "d"]


def make_q(topic: str, n: int, prompt: str, correct: str, wrongs: list[str], explanation: str, dist: list[str], difficulty: str):
    if len(wrongs) != 3 or len(dist) != 3:
        raise ValueError(f"bad row {topic}-{n}")
    correct_id = ANSWERS[(n - 1) % 4]
    wrong_ids = [x for x in ANSWERS if x != correct_id]
    options = []
    for oid in ANSWERS:
        if oid == correct_id:
            options.append({"id": oid, "text": correct})
        else:
            options.append({"id": oid, "text": wrongs[wrong_ids.index(oid)]})
    distractor = {wrong_ids[i]: dist[i] for i in range(3)}
    num = str(n).zfill(3)
    return {
        "id": f"{SLUG}-{topic}-{num}",
        "examSlug": SLUG,
        "topicId": topic,
        "prompt": prompt,
        "options": options,
        "correctOptionId": correct_id,
        "explanation": explanation,
        "distractorExplanations": distractor,
        "difficulty": difficulty,
        "sourceNote": SOURCE,
    }


STATE = [
    (
        "Mikä on Suomen valtionmuoto perustuslain mukaan?",
        "Tasavalta",
        ["Kuninkaallinen monarkia", "Liittovaltio", "Absoluuttinen monarkia"],
        "Suomi on tasavalta, jossa ylin valta kuuluu kansalle ja sitä käytetään eduskunnan kautta.",
        [
            "Suomessa ei ole kuningasta — valtaa käyttää kansa eduskunnan välityksellä.",
            "Suomi ei ole liittovaltio kuten Yhdysvallat tai Saksa.",
            "Suomi ei ole absoluuttinen monarkia.",
        ],
        "medium",
    ),
    (
        "Kuka johtaa Suomen valtioneuvostoa (hallitusta) käytännössä?",
        "Pääministeri",
        ["Tasavallan presidentti yksin", "Eduskunnan puhemies", "Korkeimman oikeuden presidentti"],
        "Pääministeri johtaa hallituksen työtä. Presidentti nimittää hallituksen mutta ei johda sitä päivittäin.",
        [
            "Presidentti on valtionpäämies, mutta hallituksen johtaja on pääministeri.",
            "Puhemies johtaa eduskuntaa, ei hallitusta.",
            "Korkein oikeus on tuomioistuin, ei hallitus.",
        ],
        "medium",
    ),
    (
        "Mikä on Suomen kansanedustuslaitoksen nimi?",
        "Eduskunta",
        ["Valtioneuvosto", "Euroopan parlamentti", "Kunnanvaltuusto"],
        "Eduskunta on Suomen yksikamarinen kansanedustuslaitos.",
        [
            "Valtioneuvosto on hallitus, ei eduskunta.",
            "Euroopan parlamentti on EU:n toimielin.",
            "Kunnanvaltuusto on paikallinen, ei valtakunnallinen.",
        ],
        "easy",
    ),
    (
        "Kuinka monta kansanedustajaa eduskunnassa on?",
        "200",
        ["100", "349", "150"],
        "Eduskunnassa on 200 jäsentä, jotka valitaan neljän vuoden välein.",
        [
            "100 on liian pieni lukumäärä Suomen eduskunnalle.",
            "349 on Ruotsin eduskunnan kokoonpano, ei Suomen.",
            "150 ei vastaa nykyistä eduskuntamäärää.",
        ],
        "medium",
    ),
    (
        "Kuka on Suomen valtionpäämies?",
        "Tasavallan presidentti",
        ["Pääministeri", "Eduskunnan puhemies", "Oikeuskansleri"],
        "Presidentti on valtionpäämies; pääministeri johtaa hallitusta.",
        [
            "Pääministeri johtaa hallitusta, ei ole valtionpäämies.",
            "Puhemies johtaa eduskuntaa.",
            "Oikeuskansleri valvoo lainmukaisuutta, ei ole valtionpäämies.",
        ],
        "easy",
    ),
    (
        "Kuinka pitkä on Suomen presidentin vaalikausi?",
        "Kuusi vuotta",
        ["Neljä vuotta", "Viisi vuotta", "Kahdeksan vuotta"],
        "Tasavallan presidentti valitaan kuudeksi vuodeksi kerrallaan.",
        [
            "Neljä vuotta on lyhyempi kuin Suomen presidentin kausi.",
            "Viisi vuotta ei vastaa nykyistä säännöstä.",
            "Kahdeksan vuotta on pidempi kuin Suomessa säädetty.",
        ],
        "medium",
    ),
    (
        "Mitkä ovat Suomen kaksi virallista kieltä?",
        "Suomi ja ruotsi",
        ["Suomi ja englanti", "Vain suomi", "Suomi ja saame kaikilla alueilla"],
        "Suomen perustuslaissa suomi ja ruotsi ovat kansalliskielet.",
        [
            "Englanti ei ole virallinen kieli Suomessa.",
            "Ruotsi on myös virallinen kieli.",
            "Saamen kielillä on erityisasema, mutta kansalliskielet ovat suomi ja ruotsi.",
        ],
        "easy",
    ),
    (
        "Mikä ministeriö vastaa kansalaisuushakemusten käsittelystä?",
        "Maahanmuuttovirasto (Migri)",
        ["Valtiovarainministeriö", "Puolustusministeriö", "Liikenne- ja viestintävirasto Traficom"],
        "Maahanmuuttovirasto (Migri) hoitaa kansalaisuuteen liittyviä viranomaisasioita.",
        [
            "Valtiovarainministeriö vastaa talouspolitiikasta.",
            "Puolustusministeriö vastaa puolustuksesta.",
            "Traficom hoitaa liikenne- ja viestintäasioita.",
        ],
        "medium",
    ),
    (
        "Missä kaupungissa sijaitsee Suomen eduskunta?",
        "Helsingissä",
        ["Turussa", "Tampereella", "Vaasassa"],
        "Eduskuntatalo ja valtion keskeiset instituutiot ovat pääkaupungissa Helsingissä.",
        [
            "Turku on vanha pääkaupunki historiassa, mutta eduskunta on Helsingissä.",
            "Tampere on suuri kaupunki, mutta ei eduskunnan sijainti.",
            "Vaasa on merkittävä kaupunki, mutta eduskunta on Helsingissä.",
        ],
        "easy",
    ),
    (
        "Miten eduskuntavaalit järjestetään Suomessa?",
        "Suorilla ja yleisillä vaaleilla neljän vuoden välein",
        ["Vain presidentti nimittää edustajat", "Kerran vuodessa", "Vain kunnanvaltuustot valitsevat edustajat"],
        "Kansanedustajat valitaan suorilla, yleisillä ja yhtäläisillä vaaleilla.",
        [
            "Edustajia ei nimitä presidentti.",
            "Eduskuntavaalit eivät ole vuosittaisia.",
            "Kunnanvaltuustot eivät valitse eduskuntaa.",
        ],
        "medium",
    ),
    (
        "Mikä on Ahvenanmaan erityisasema Suomessa?",
        "Itsehallinnollinen maakunta suomenruotsalaisella autonomialla",
        ["Erillinen valtio EU:n ulkopuolella", "Sotilasalue ilman asukkaita", "Sama kuin mikä tahansa manner-Suomen maakunta ilman poikkeuksia"],
        "Ahvenanmaalla on laaja itsehallinto ja demilitarisointi; maakunnalla on oma lainsäädäntövalta monissa asioissa.",
        [
            "Ahvenanmaa on osa Suomea, ei erillinen valtio.",
            "Ahvenanmaalla asuu väestöä ja siellä on siviilihallinto.",
            "Ahvenanmaalla on laajempi autonomia kuin tavallisella maakunnalla.",
        ],
        "hard",
    ),
    (
        "Kuka valitsee pääministerin Suomessa?",
        "Eduskunta",
        ["Presidentti yksin ilman eduskuntaa", "Kansanäänestys joka viikko", "Euroopan komissio"],
        "Eduskunta valitsee pääministerin, jonka presidentti sitten nimittää.",
        [
            "Presidentti nimittää, mutta eduskunta valitsee ehdokkaan.",
            "Pääministeriä ei valita suoralla kansanäänestyksellä.",
            "EU-komissio ei valitse Suomen pääministeriä.",
        ],
        "medium",
    ),
    (
        "Mikä on perustuslain rooli Suomessa?",
        "Se on ylin laki, johon muu lainsäädäntö ja valta käyttö perustuvat",
        ["Vain suositus ilman oikeudellista sitovuutta", "Korvaa kaikki kansainväliset sopimukset automaattisesti", "Koskee vain presidenttiä"],
        "Perustuslaki turvaa perusoikeudet ja jakaa valtiovallan.",
        [
            "Perustuslaki on sitova ja ylin kotimainen laki.",
            "Kansainväliset sopimukset täydentävät, eivät automaattisesti kumoa perustuslakia.",
            "Perustuslaki koskee koko valtiota, ei vain presidenttiä.",
        ],
        "medium",
    ),
    (
        "Mikä viranomainen järjestää tulevan kansalaisuuskokeen?",
        "Maahanmuuttovirasto (Migri)",
        ["Helsingin yliopisto yksin", "Kela", "Digi- ja väestötietovirasto"],
        "Migri vastaa kansalaisuuskokeen järjestämisestä; oppimateriaalin laatii Helsingin yliopisto.",
        [
            "Yliopisto laatii materiaalin, mutta Migri järjestää kokeen.",
            "Kela hoitaa sosiaaliturvaa.",
            "Digi- ja väestötietovirasto hoitaa väestötietoja ja tunnistautumista.",
        ],
        "hard",
    ),
    (
        "Milloin kansalaisuuskoe koskee hakemuksia Migri-tiedon mukaan?",
        "Hakemuksiin, jotka jätetään 1.3.2027 tai sen jälkeen",
        ["Kaikkiin hakemuksiin jo vuonna 2025", "Vain ruotsinkielisiin hakijoihin", "Ei koske ketään"],
        "Lakimuutos koskee hakemuksia, jotka jätetään 1.3.2027 alkaen; siirtymäaika päättyy 28.2.2027.",
        [
            "Koe ei ole vielä voimassa vuonna 2025.",
            "Koe koskee sekä suomen- että ruotsinkielisiä hakijoita.",
            "Koe koskee työikäisiä hakijoita uuden lain mukaan.",
        ],
        "hard",
    ),
]

HISTORY = [
    (
        "Minä vuonna Suomi julistautui itsenäiseksi?",
        "1917",
        ["1809", "1945", "1995"],
        "Suomi julistautui itsenäiseksi 6.12.1917.",
        [
            "1809 liittyy Venäjän vallan aikaan, ei itsenäisyyteen.",
            "1945 liittyy sotien loppuun, ei itsenäisyyden julistukseen.",
            "1995 on EU-jäsenyyden vuosi.",
        ],
        "easy",
    ),
    (
        "Mihin organisaatioon Suomi liittyi vuonna 1995?",
        "Euroopan unioniin",
        ["Natoon", "Euroopan neuvostoon", "Eftaan"],
        "Suomi liittyi EU:hun 1.1.1995 yhdessä Ruotsin ja Itävallan kanssa.",
        [
            "Suomi liittyi Natoon myöhemmin (2023), ei 1995.",
            "Euroopan neuvosto on eri organisaatio.",
            "Efta ei ollut Suomen päätavoite 1995.",
        ],
        "medium",
    ),
    (
        "Mikä on Suomen pääkaupunki?",
        "Helsinki",
        ["Tampere", "Turku", "Oulu"],
        "Helsinki on Suomen pääkaupunki ja Uudenmaan maakunnan keskus.",
        [
            "Tampere on suuri kaupunki, mutta ei pääkaupunki.",
            "Turku on historiallinen kaupunki, mutta ei nykyinen pääkaupunki.",
            "Oulu on Pohjois-Suomen keskus, ei pääkaupunki.",
        ],
        "easy",
    ),
    (
        "Mikä sota käytiin Neuvostoliiton hyökkäyksen jälkeen talvella 1939–1940?",
        "Talvisota",
        ["Jatkosota", "Luovutus sotien välillä", "Sisällissota 1918"],
        "Talvisota käytiin marraskuusta 1939 maaliskuuhun 1940.",
        [
            "Jatkosota alkoi myöhemmin vuonna 1941.",
            "Luovutus ei ole sodan nimi.",
            "Sisällissota oli vuonna 1918.",
        ],
        "medium",
    ),
    (
        "Mikä on Kalevala suomalaisessa kulttuurissa?",
        "Kansalliseepos, joka on vaikuttanut suomen kieleen ja identiteettiin",
        ["Nykyinen perustuslaki", "EU:n perussopimus", "Kunnan hallintosääntö"],
        "Kalevala koottiin 1800-luvulla ja on keskeinen kulttuurinen teos.",
        [
            "Perustuslaki on laki, ei eepos.",
            "EU:n perussopimus on kansainvälinen asiakirja.",
            "Kunnan hallintosääntö on paikallinen ohje.",
        ],
        "medium",
    ),
    (
        "Mikä naapurimaa on Suomen itäinen raja?",
        "Venäjä",
        ["Norja", "Viro", "Ruotsi"],
        "Suomen pitkä itäraja on Venäjän kanssa.",
        [
            "Norja on pohjoisessa.",
            "Viro on etelässä meritse, ei itäinen maa-raja.",
            "Ruotsi on lännessä.",
        ],
        "easy",
    ),
    (
        "Mikä meri sijaitsee Suomen eteläpuolella?",
        "Itämeri",
        ["Atlantti", "Tyynimeri", "Pohjanmeri"],
        "Suomi on Itämeren rannikkovaltio.",
        [
            "Atlantti on kaukana läntisellä rannikolla.",
            "Tyynimeri ei rajaudu Suomeen.",
            "Pohjanmeri on Norjan ja Britannian alueella.",
        ],
        "easy",
    ),
    (
        "Mikä on Suomen rahayksikkö?",
        "Euro",
        ["Ruotsin kruunu", "Dollari", "Markka (virallinen tänään)"],
        "Suomi otti euron käyttöön vuonna 2002; markka poistui.",
        [
            "Ruotsin kruunu on Ruotsin valuutta.",
            "Dollari ei ole Suomen valuutta.",
            "Markka korvattiin eurolla.",
        ],
        "easy",
    ),
    (
        "Mikä kaupunki tunnetaan usein Suomen teollisuuden ja saunan syntypaikkana?",
        "Tampere",
        ["Rovaniemi", "Porvoo", "Kemi"],
        "Tampere kehittyi 1800-luvulla merkittäväksi teollisuuskaupungiksi.",
        [
            "Rovaniemi on Lapin keskus.",
            "Porvoo on historiallinen kaupunki, mutta ei yleisin teollisuusmaine.",
            "Kemi on pohjoinen teollisuuskaupunki, muta Tampere on vahvempi vastaus.",
        ],
        "medium",
    ),
    (
        "Mikä on Euroopan unionin tarkoitus laajasti?",
        "Edistää rauhaa, vakautta ja taloudellista yhteistyötä jäsenvaltioiden välillä",
        ["Korvata kaikkien jäsenmaiden kansalliset kielet yhdellä kielellä", "Poistaa kaikki kansalliset rajat välittömästi", "Hallita vain ulkomaankauppaa ilman ihmisoikeuksia"],
        "EU perustuu yhteisiin arvoihin, sisämarkkinoihin ja yhteistyöhön.",
        [
            "EU ei poista kansalliskieliä.",
            "Rajat ovat keventyneet Schengenissä, muta EU:n tarkoitus on laajempi.",
            "Ihmisoikeudet ja oikeusvaltio kuuluvat EU-yhteistyöhön.",
        ],
        "medium",
    ),
    (
        "Mikä on Suomen lippujen värit?",
        "Sininen ja valkoinen",
        ["Punainen ja keltainen", "Vihreä ja musta", "Valkoinen ja musta yksin"],
        "Suomen lippu on sinivalkoinen ristilippu.",
        [
            "Punainen ja keltainen on Tanskan lippu.",
            "Vihreä ja musta ei ole Suomen lippu.",
            "Suomen lippu sisältää myös sinistä.",
        ],
        "easy",
    ),
    (
        "Mikä päivä on Suomen itsenäisyyspäivä?",
        "6. joulukuuta",
        ["6. kesäkuuta", "1. toukokuuta", "17. marraskuuta"],
        "Itsenäisyyspäivää vietetään 6.12.",
        [
            "6.6. on kansallispäivä Ruotsissa.",
            "1.5. on vappu.",
            "17.11. ei ole itsenäisyyspäivä.",
        ],
        "easy",
    ),
    (
        "Mikä organisaatio yhdistää Pohjoismaita yhteistyöhön?",
        "Pohjoismaiden neuvosto",
        ["Aasian kehityspankki", "Afrikan unioni", "Mercosur"],
        "Pohjoismaiden neuvosto edistää yhteistyötä Suomen, Ruotsin, Norjan, Tanskan ja Islannin välillä.",
        [
            "Aasian kehityspankki toimii Aasiassa.",
            "Afrikan unioni toimii Afrikassa.",
            "Mercosur on Latinalaisen Amerikan kaupparyhmä.",
        ],
        "medium",
    ),
    (
        "Mikä on Euroopan unionin parlamentti?",
        "Suoraan valittujen edustajien toimielin EU:ssa",
        ["Yksinomaan kansallisten pääministerien klubi ilman vaaleja", "Vain tuomioistuin", "Suomen eduskunta"],
        "Euroopan parlamentti valitaan EU-kansalaisten suorilla vaaleilla.",
        [
            "Parlamentti valitaan vaaleilla, ei vain pääministereistä.",
            "Tuomioistuin on eri toimielin.",
            "Eduskunta on Suomen kansallinen parlamentti.",
        ],
        "medium",
    ),
    (
        "Mikä on tyypillinen ilmaston piirre Suomessa?",
        "Neljä selkeää vuodenaikaa ja talvi voi olla luminen",
        ["Trooppinen sademetsä ympäri vuoden", "Aavikko ilman lunta koskaan", "Ei koskaan pakkasta"],
        "Suomessa on mannerilmasto: kesä, syksy, talvi ja kevät.",
        [
            "Suomi ei ole trooppinen.",
            "Lunta voi olla talvella runsaasti.",
            "Pakkasta esiintyy talvella.",
        ],
        "easy",
    ),
]

RIGHTS = [
    (
        "Mitä tarkoittaa yhdenvertaisuus Suomen yhteiskunnassa?",
        "Jokaisella on samat perusoikeudet lain edessä ilman mielivaltaista syrjintää",
        ["Vain kansalaiset voivat saada oikeussuojaa", "Syrjintä on sallittua julkisissa palveluissa", "Perusoikeudet koskevat vain hallituksen jäseniä"],
        "Perustuslaki ja yhdenvertaisuuslaki kieltävät syrjinnän esimerkiksi sukupuolen tai etnisen taustan perusteella.",
        [
            "Perusoikeudet koskevat laajasti kaikkia maassa olevia.",
            "Julkiset palvelut eivät saa syrjiä mielivaltaisesti.",
            "Perusoikeudet eivät rajoitu hallitukseen.",
        ],
        "medium",
    ),
    (
        "Mikä on uskonnonvapaus Suomessa?",
        "Oikeus harjoittaa uskontoa ja olla uskonnonharjoittaja",
        ["Pakollinen kuuluminen evankelis-luterilaiseen kirkkoon", "Kielto kääntyä toiseen uskontoon", "Vain luterilaisilla on äänioikeus"],
        "Uskonnonvapaus on perustuslaissa; kirkosta voi erota.",
        [
            "Kirkkoon kuuluminen ei ole pakollista.",
            "Kääntyminen on sallittu.",
            "Äänioikeus ei riipu kirkon jäsenyydestä.",
        ],
        "easy",
    ),
    (
        "Mikä on sananvapaus?",
        "Oikeus ilmaista mielipiteitä laissa säädetyin rajoituksin",
        ["Oikeus loukata ketä tahansa ilman seuraamuksia", "Kielto kritisoida hallitusta", "Vain lehdistön oikeus, ei tavallisten kansalaisten"],
        "Sananvapaus on perusoikeus, mutta esimerkiksi kiihottaminen kansanryhmää vastaan on rangaistavaa.",
        [
            "Sananvapaus ei suojaa kaikkia loukkauksia.",
            "Hallitusta saa kritisoida demokratiassa.",
            "Sananvapaus koskee myös tavallisia kansalaisia.",
        ],
        "medium",
    ),
    (
        "Mikä on työelämän perusperiaate Suomessa?",
        "Työntekijöillä on oikeus järjestäytyä ja työsuhde perustuu sopimukseen ja lakiin",
        ["Työntekijöitä ei saa koskaan irtisanoa", "Laki ei suojaa työntekijää", "Palkkaa ei tarvitse maksaa"],
        "Työlainsäädäntö suojaa työntekijöitä ja sääntelee työaikaa, lomaa ja irtisanomista.",
        [
            "Irtisanominen on mahdollista lain mukaan.",
            "Työlaki suojaa työntekijöitä.",
            "Palkanmaksu on velvollisuus.",
        ],
        "medium",
    ),
    (
        "Mitä tarkoittaa sukupuolten tasa-arvo Migri-materiaalin teemoissa?",
        "Miesten ja naisten tulee kohdella yhdenvertaisesti työssä, koulutuksessa ja perhe-elämässä",
        ["Vain miehet voivat äänestää", "Naisilla ei ole oikeutta työhön", "Tasa-arvo koskee vain koulutusta"],
        "Tasa-arvolaki edistää sukupuolten välistä tasa-arvoa työelämässä ja julkisissa palveluissa.",
        [
            "Äänioikeus on yleinen.",
            "Naisilla on työoikeudet.",
            "Tasa-arvo koskee useita elämänaloja.",
        ],
        "medium",
    ),
    (
        "Mikä on oikeus koulutukseen Suomessa?",
        "Perusopetus on velvoittavaa ja maksutonta",
        ["Koulutus on kielletty aikuisilta", "Vain kansalaiset saavat peruskoulun", "Koulu on aina maksullinen"],
        "Suomessa jokaisella on oikeus perusopetukseen ja laajasti myös toisen asteen koulutukseen.",
        [
            "Aikuiset voivat opiskella jatko-opinnoissa.",
            "Perusopetus koskee laajasti lapsia maassa.",
            "Perusopetus on maksuton.",
        ],
        "easy",
    ),
    (
        "Mikä on ihmisoikeuksien ydinajatus?",
        "Jokaisella ihmisellä on luovuttamattomia oikeuksia riippumatta taustasta",
        ["Oikeudet voi poistaa hallituksen mielivallalla", "Vain työssäkäyvillä on oikeuksia", "Ihmisoikeudet koskevat vain EU-kansalaisia"],
        "Ihmisoikeudet suojataan perustuslaissa ja kansainvälisissä sopimuksissa.",
        [
            "Oikeuksia ei voi poistaa mielivaltaisesti.",
            "Oikeudet eivät rajoitu työssäkäyviin.",
            "Ihmisoikeudet koskevat laajemmin kuin vain EU-kansalaisia.",
        ],
        "medium",
    ),
    (
        "Mikä on tietosuoja käytännössä?",
        "Henkilötietojasi ei saa käyttää mielivaltaisesti ilman laillista perustetta",
        ["Valtio voi julkaista kaikki tietosi ilman lupaa", "Tietosuoja koskee vain yrityksiä, ei viranomaisia", "Salasanaa ei tarvita verkossa"],
        "EU:n yleinen tietosuoja-asetus (GDPR) ja kansallinen laki suojaavat henkilötietoja.",
        [
            "Tietoja suojaa lainsäädäntö.",
            "Viranomaisetkin noudattavat tietosuojaa.",
            "Verkkoturvallisuus on tärkeää.",
        ],
        "medium",
    ),
    (
        "Mikä on oikeus osallistua vaaleihin Suomessa?",
        "Kansalaiset, jotka täyttävät ikä- ja muut lailliset ehdot, voivat äänestää",
        ["Vain presidentti äänestää", "Äänestäminen on kielletty", "Vain ruotsinkieliset saavat äänestää"],
        "Eduskunta- ja kuntavaaleissa äänioikeus määräytyy kansalaisuuden ja iän mukaan.",
        [
            "Äänestävät kansalaiset, ei vain presidentti.",
            "Äänestäminen on demokraattinen oikeus.",
            "Kieli ei rajoita äänioikeutta.",
        ],
        "easy",
    ),
    (
        "Mikä on kotoutumisen tavoite Suomessa?",
        "Auttaa maahanmuuttajaa osallistumaan yhteiskuntaan kielen ja työn kautta",
        ["Estää työntekoa kokonaan", "Pakottaa luopumaan omasta kulttuurista täysin", "Korvata kansalaisuuslaki"],
        "Kotoutumisessa painotetaan kieltä, työtä ja yhteiskunnan tuntemusta.",
        [
            "Työ on osa kotoutumista.",
            "Ei vaadi kulttuurin täyttä hylkäämistä.",
            "Kotoutuminen täydentää, ei korvaa kansalaisuuslakia.",
        ],
        "medium",
    ),
    (
        "Mikä on lasten oikeuksien periaate?",
        "Lapsen etu on ensisijainen päätöksenteossa",
        ["Lapsilla ei ole oikeussuojaa", "Lapsi vastaa aina vanhempiensa rikoksista", "Koulunkäynti on vapaaehtoista peruskoulussa"],
        "Lapsen oikeuksien sopimus ja Suomen laki suojaavat lapsia.",
        [
            "Lapsilla on oikeussuoja.",
            "Lapsi ei automaattisesti vastaa vanhempien teoista.",
            "Perusopetus on velvoittavaa.",
        ],
        "medium",
    ),
    (
        "Mikä on syrjinnän kielto työpaikalla?",
        "Työnantaja ei saa kohdella epäoikeudenmukaisesti esimerkiksi iän tai vammaisuuden perusteella",
        ["Työnantaja voi maksaa eri palkkaa samasta työstä mielivaltaisesti", "Syrjintä on sallittua, jos työntekijä on ulkomaalainen", "Työlaki ei koske palkkausta"],
        "Tasa-arvo- ja yhdenvertaisuuslaki kieltävät syrjinnän työelämässä.",
        [
            "Sama työ → sama palkka -periaate.",
            "Ulkomaalaisuus ei oikeuta syrjintään.",
            "Työlaki koskee palkkausta.",
        ],
        "hard",
    ),
    (
        "Mikä on oikeus saada oikeudenmukainen oikeudenkäynti?",
        "Jokaisella on oikeus puolustautua ja saada puolueeton käsittely",
        ["Tuomio voidaan antaa ilman kuulemista", "Vain rikkailla on oikeus asianajajaan", "Oikeus koskee vain kansalaisia"],
        "Oikeusturva on perustuslaissa; rikosoikeudenkäynnissä on oikeus avustajaan.",
        [
            "Kuuleminen on olennainen osa oikeudenmukaisuutta.",
            "Oikeusapua on saatavilla tietyin edellytyksin.",
            "Oikeusturva koskee laajasti.",
        ],
        "hard",
    ),
    (
        "Mikä on kansalaisuuden saamisen yleinen ajatus uuden lain jälkeen?",
        "Hakijan tulee osoittaa riittävä tuntemus suomalaisesta yhteiskunnasta",
        ["Kansalaisuus annetaan automaattisesti ilman hakemusta", "Koe korvaa kaikki muut vaatimukset", "Kansalaisuutta ei voi koskaan menettää"],
        "Kansalaisuuskoe on yksi tapa osoittaa yhteiskuntatuntemus; myös tutkinnot voivat korvata sen.",
        [
            "Kansalaisuus vaatii hakemuksen ja täytetyt ehdot.",
            "Koe ei korvaa kieli- ja asumisehtoja.",
            "Kansalaisuuden menettäminen on erillinen sääntely.",
        ],
        "hard",
    ),
    (
        "Mikä on perheen suoja perustuslaissa?",
        "Julkisen vallan on tuettava perhettä ja lapsen oikeuksia",
        ["Valtio määrää kenen kanssa saat asua", "Perhettä ei suojella laissa", "Lapsella ei ole oikeutta turvaan"],
        "Perheiden hyvinvointi ja lapsen oikeudet ovat osa perusoikeuksia.",
        [
            "Valtio ei määrää puolisovalintaa.",
            "Perhettä suojellaan.",
            "Lapsella on oikeus turvaan.",
        ],
        "medium",
    ),
]

SERVICES = [
    (
        "Mikä on Kela?",
        "Sosiaaliturvaa hoitava kansaneläkelaitos",
        ["Poliisi", "Puolustusvoimat", "Yliopistojen yhteishakujärjestelmä"],
        "Kelasta haetaan esimerkiksi asumistukea, päivärahoja ja perusturvaa.",
        [
            "Poliisi hoitaa järjestystä.",
            "Puolustusvoimat hoitaa maanpuolustusta.",
            "Opintopolku on opiskeluun liittyvä palvelu.",
        ],
        "easy",
    ),
    (
        "Mistä haetaan passia ja henkilökorttia Suomessa?",
        "Poliisilta / poliisin asiakaspalvelusta",
        ["Kunnan kirjastosta", "Postista automaattisesti", "Vain ulkomailla"],
        "Poliisi myöntää matkustusasiakirjat ja henkilökortit.",
        [
            "Kirjasto ei myönnä passeja.",
            "Passi vaatii hakemuksen poliisille.",
            "Passia haetaan Suomesta.",
        ],
        "easy",
    ),
    (
        "Mikä on terveydenhuollon perusidea Suomessa?",
        "Julkinen terveydenhuolto on kaikille asukkaille ja maksuja on usein maltillisia",
        ["Vain yksityinen lääkäri ilman julkista järjestelmää", "Sairaanhoito on kielletty", "Vain työssäkäyvillä on oikeus hoitoon"],
        "Terveyskeskukset ja sairaalat palvelevat asukkaita; asiointi hoidetaan usein Kela-kortilla.",
        [
            "Julkinen järjestelmä on laaja.",
            "Sairaanhoito on saatavilla.",
            "Hoito ei rajoitu vain työssäkäyviin.",
        ],
        "medium",
    ),
    (
        "Miten hätätilanteessa soittaa poliisille, palokunnalle tai ambulanssille?",
        "Soita numeroon 112",
        ["Soita numeroon 911", "Soita numeroon 999", "Lähetä vain sähköpostia"],
        "112 on yhteinen hätänumero Suomessa ja EU:ssa.",
        [
            "911 on tyypillinen Yhdysvalloissa.",
            "999 on tyypillinen Britanniassa.",
            "Hätätilanteessa tarvitaan puhelu.",
        ],
        "easy",
    ),
    (
        "Mikä on työ- ja elinkeinotoimisto TE-palveluiden rooli?",
        "Auttaa työnhakijoita ja työnantajia työllistymisessä",
        ["Myöntää ainoastaan kansalaisuuden", "Korvaa terveyskeskuksen", "Hallinnoi eduskuntavaaleja"],
        "TE-palvelut tarjoavat työnhakua, koulutusta ja työttömyysturvaa koskevaa neuvontaa.",
        [
            "Kansalaisuuden myöntää Migri.",
            "Terveydenhuolto on eri järjestelmä.",
            "Vaaleja hoitaa vaalilautakunnat.",
        ],
        "medium",
    ),
    (
        "Mikä on kunnan rooli arjessa?",
        "Kunnat järjestävät esimerkiksi koulutusta, kirjastoja ja joukkoliikennettä paikallisesti",
        ["Kunnat korvaavat eduskunnan", "Kunnilla ei ole tehtäviä", "Vain valtio hoitaa kaikki palvelut"],
        "Suomi on vahva kuntayhteiskunta; kunnallisvaalit valitsevat päättäjät.",
        [
            "Eduskunta on valtakunnallinen.",
            "Kunnilla on laajat tehtävät.",
            "Palvelut jaetaan valtion ja kuntien kesken.",
        ],
        "medium",
    ),
    (
        "Mistä saa tietoa kansalaisuuskokeen virallisesta oppimateriaalista?",
        "Maahanmuuttoviraston (Migri) verkkosivuilta, kun materiaali julkaistaan",
        ["Vain salaisesta Facebook-ryhmästä", "UniPrep2Go-sivustolta virallisena lähteenä", "Ei mistään — materiaalia ei tule"],
        "Migri julkaisee yhteisen oppimateriaalin ennen ensimmäistä koetta; Helsingin yliopisto laatii sisällön.",
        [
            "Virallinen lähde on Migri, ei sosiaalinen media.",
            "UniPrep on riippumaton harjoitus, ei virallinen lähde.",
            "Materiaali julkaistaan etukäteen.",
        ],
        "hard",
    ),
    (
        "Mikä on arkilisenssin (alkoholin myynti) perusidea Suomessa?",
        "Vahvajuomia myydään valvotusti Alkossa; ikäraja on 18",
        ["Alkoholia saa myydä kuka tahansa koulussa", "Ikärajaa ei ole", "Vain ravintolat myyvät kaikkea ilman sääntelyä"],
        "Suomessa alkoholipolitiikka on säänneltyä; Alko myy vahvoja juomia.",
        [
            "Koulussa ei myydä alkoholia.",
            "18-vuotiaana saa ostaa vahvoja juomia Alkosta.",
            "Myynti on valvottua.",
        ],
        "medium",
    ),
    (
        "Mikä on digitunnistautuminen Suomessa arjessa?",
        "Pankkitunnukset tai mobiilivarmenteet käytetään usein viranomais- ja palvelukanavilla",
        ["Paperinen passi riittää aina kaikkeen verkossa", "Sähköistä tunnistautumista ei ole", "Vain ulkomaalaiset tarvitsevat tunnistautumista"],
        "Suomi on digiyhteiskunta; tunnistautuminen helpottaa asiointia.",
        [
            "Verkossa tarvitaan usein sähköistä tunnistautumista.",
            "Digiasiointi on yleistä.",
            "Kansalaisuus ei määritä tunnistautumistarvetta.",
        ],
        "medium",
    ),
    (
        "Mikä on peruskoulun pituus Suomessa?",
        "Yhdeksän vuotta (laajenee myöhemmin kymmeneksi vuodeksi lain mukaan)",
        ["Kolme vuotta", "Vain lukio ilman peruskoulua", "Kaksitoista vuotta pakollista peruskoulua"],
        "Perusopetus on velvoittavaa; jatko-opinnot ovat vapaaehtoisia.",
        [
            "Peruskoulu on pidempi kuin kolme vuotta.",
            "Lukio on toisen asteen koulutus.",
            "Pakollinen perusopetus on lyhyempi kuin 12 vuotta.",
        ],
        "medium",
    ),
    (
        "Miten jätteet lajitellaan usein Suomessa?",
        "Kotitaloudet erottelevat bio-, paperi-, metalli- ja lasijätteen kierrätystä varten",
        ["Kaikki jäte menee samaan säkkiin aina", "Jätteen polttaminen kotona on pakollista", "Kierrätys on kielletty"],
        "Kunnat järjestävät jätehuollon ja kierrätyspisteet.",
        [
            "Lajittelu on yleistä.",
            "Kotipoltto ei ole käytäntö.",
            "Kierrätys on suositeltua ja järjestettyä.",
        ],
        "easy",
    ),
    (
        "Mikä on sairausloman perusidea?",
        "Työntekijä voi olla poissa sairauden vuoksi ja saada korvausta sairausvakuutuksen kautta",
        ["Työnantaja ei saa tietää sairaudesta koskaan", "Sairas ei saa mennä lääkäriin", "Loma ja sairausloma ovat sama asia"],
        "Sairauspoissaolo vaatii yleensä lääkärintodistuksen pidemmissä jaksoissa.",
        [
            "Työnantaja saa tiedon poissaolosta.",
            "Lääkäriin voi mennä.",
            "Loma on erillinen etu.",
        ],
        "medium",
    ),
    (
        "Mikä on kansalaisuuskokeen kielivaihtoehto Migri-tiedon mukaan?",
        "Suomi tai ruotsi",
        ["Vain englanti", "Vain arabia", "Hakijan äidinkieli aina"],
        "Kansalaisuuskoe suoritetaan joko suomeksi tai ruotsiksi.",
        [
            "Englanti ei ole virallinen koevaihtoehto.",
            "Arabia ei ole virallinen koevaihtoehto.",
            "Koe on suomeksi tai ruotsiksi, ei automaattisesti äidinkielellä.",
        ],
        "hard",
    ),
    (
        "Mikä voi korvata kansalaisuuskokeen osaamisen?",
        "Suomen- tai ruotsinkielinen ylioppilastutkinto tai korkeakoulututkinto Suomessa",
        ["Pelkkä ajokortti", "Kesätyö kahden viikon ajan", "Facebook-profiilin kieli"],
        "Migri mainitsee tutkintopolkuja vaihtoehtona kansalaisuuskokeelle.",
        [
            "Ajokortti ei korvaa yhteiskuntatuntemusta.",
            "Lyhyt kesätyö ei korvaa koetta.",
            "Sosiaalinen media ei ole virallinen todiste.",
        ],
        "hard",
    ),
    (
        "Mikä on Enter Finland -palvelu?",
        "Maahanmuuttoviraston verkkopalvelu hakemuksiin ja asiointiin",
        ["Verkkokauppa ruoalle", "Pelipalvelu lapsille", "Kunnan uimahallin varaus"],
        "Enter Finlandissa voi hoitaa monia Migri-asioita sähköisesti.",
        [
            "Se ei ole ruokaostospalvelu.",
            "Se ei ole peli.",
            "Uimahalli on kunnan palvelu.",
        ],
        "medium",
    ),
]

TOPICS = {
    "state-democracy": STATE,
    "history-geo-eu": HISTORY,
    "rights-society": RIGHTS,
    "services-extras": SERVICES,
}


def main() -> None:
    out: list[dict] = []
    for topic, rows in TOPICS.items():
        for i, row in enumerate(rows, start=1):
            prompt, correct, wrongs, expl, dist, diff = row
            out.append(make_q(topic, i, prompt, correct, wrongs, expl, dist, diff))
    if len(out) != 60:
        raise SystemExit(f"expected 60 questions, got {len(out)}")
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUT} ({len(out)} questions)")


if __name__ == "__main__":
    main()
