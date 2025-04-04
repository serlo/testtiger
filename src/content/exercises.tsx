import { Exercise } from '@/data/types'
import { exercise1 } from './implementations/NRW-MSA/1-2023-1-zahlen-ordnen'
import { exercise2 } from './implementations/NRW-MSA/2-2023-2-volumen-berechnen'
import { exercise3 } from './implementations/NRW-MSA/3-2023-3-lineares-gleichungssystem'
import { exercise4 } from './implementations/NRW-MSA/4-2023-4-Parabel-im-ks'
import { exercise5 } from './implementations/NRW-MSA/5-2023-5-Sneaker-Rabatt'
import { exercise6 } from './implementations/NRW-MSA/6-2023-6-Parallelogramm'
import { exercise13 } from './implementations/NRW-MSA/13-2022-1-4-Binom-ergänzen'
import { exercise17 } from './implementations/NRW-MSA/17-2022-v2-2-Gerade-im-ks'
import { exercise20 } from './implementations/NRW-MSA/20-2021-v1-1-Schätzaufgabe'
import { exercise14 } from './implementations/NRW-MSA/14-2022-1-5-Schätzaufgabe-höhe'
import { exercise23 } from './implementations/NRW-MSA/23-2021-v1-4-Geraden-im-ks'
import { exercise24 } from './implementations/NRW-MSA/24-2021-v1-5-Tabellenkalkulation'
import { exercise7 } from './implementations/NRW-MSA/7-2023-2-1-Herz'
import { exercise10 } from './implementations/NRW-MSA/10-2022-1-1-Potenzen'
import { exercise12 } from './implementations/NRW-MSA/12-2022-1-3-lineares-gleichungssystem'
import { exercise11 } from './implementations/NRW-MSA/11-2022-1-2-Dreieck'
import { exercise15 } from './implementations/NRW-MSA/15-2022-1-6-Diagramm'
import { exercise16 } from './implementations/NRW-MSA/16-2022-v2-1-Einheiten-umrechnen'
import { exercise18 } from './implementations/NRW-MSA/18-2022-2-1-Rösti'
import { exercise27 } from './implementations/NRW-MSA/27-2021-v2-4-lineares-gleichungssystem'
import { exercise34 } from './implementations/NRW-MSA/34-2019-1-4-Tabellenkalkulation'
import { exercise35 } from './implementations/NRW-MSA/35-2019-1-5-lineares-gleichungssystem'
import { exercise19 } from './implementations/NRW-MSA/19-2022-2-2-Wassermelonen'
import { exercise8 } from './implementations/NRW-MSA/8-2023-2-2-Varroa-Milbe'
import { exercise37 } from './implementations/NRW-MSA/37-2022-2-3-Parabel-und-Rechteck'
import { exercise28 } from './implementations/NRW-MSA/28-2021-2-1-Glaskugeln'
import { exercise29 } from './implementations/NRW-MSA/29-2021-2-2-Blobbing'
import { exercise36 } from './implementations/NRW-MSA/36-2019-2-1-Kaugummis'
import { exercise21 } from './implementations/NRW-MSA/21-2021-v1-2-Einheiten-umrechnen'

import { exercise38 } from './implementations/NRW-MSA/38-2019-2-2-Pool'
import { exercise46 } from './implementations/NRW-MSA/46-2018-2-2-Kaffee'
import { exercise45 } from './implementations/NRW-MSA/45-2018-2-1-Brücke'
import { exercise47 } from './implementations/NRW-MSA/47-2018-2-3-Dreieckmuster'
import { exercise26 } from './implementations/NRW-MSA/26-2021-v2-3-volumen-preis'
import { exercise32 } from './implementations/NRW-MSA/32-2019-1-2-Rechteck'
import { exercise33 } from './implementations/NRW-MSA/33-2019-1-3-Schieberegler'
import { exercise41 } from './implementations/NRW-MSA/41-2018-1-2-Kugeln-ziehen'
import { exercise43 } from './implementations/NRW-MSA/43-2018-1-4-lineares-gleichungssystem'
import { exercise44 } from './implementations/NRW-MSA/44-2018-1-5-lineare-funktion'
import { exercise42 } from './implementations/NRW-MSA/42-2018-1-3-Kugel'
import { exercise40 } from './implementations/NRW-MSA/40-2018-1-1-Zahlen ordnen'
import { exercise9 } from './implementations/NRW-MSA/9-2023-2-3-Zahlenpaare'
import { exercise30 } from './implementations/NRW-MSA/30-2021-2-3-Muster'
import { exercise39 } from './implementations/NRW-MSA/39-2019-2-3-Würfel'
import { exercise22 } from './implementations/NRW-MSA/22-2021-v1-3-volumen-gewicht'
import { exercise48 } from './implementations/NRW-MSA/48-2024-1-1-zahlen-ordnen'
import { exercise49 } from './implementations/NRW-MSA/49-2024-1-2-Tabellenkalkulation'
import { exercise50 } from './implementations/NRW-MSA/50-2024-1-3-Rechenaufgaben'
import { exercise52 } from './implementations/NRW-MSA/52-2024-1-5-Quadratische-Funktion'
import { exercise51 } from './implementations/NRW-MSA/51-2024-1-4-Einwohner'

import { exercise55 } from './implementations/NRW-MSA/55-2024-2-3-Dreieck'
import { exercise54 } from './implementations/NRW-MSA/54-2024-2-2-Lautsprecher'
import { exercise53 } from './implementations/NRW-MSA/53-2024-2-1-Fruchtfliegen'
import { exercise120 } from './implementations/NRW-EESA/120-2023-1-1-Zahlen-vergleichen'
import { exercise121 } from './implementations/NRW-EESA/121-2023-1-2-Einheiten-umrechnen'
import { exercise25 } from './implementations/NRW-MSA/25-2021-v2-2-zahlen-ordnen'
import { exercise31 } from './implementations/NRW-MSA/31-2019-1-1-zahlen ordnen'
import { exercise136 } from './implementations/NRW-EESA/136-2024-2-2-E-Schooter'
import { exercise137 } from './implementations/NRW-EESA/137-2024-2-3-Würfel'
import { exercise126 } from './implementations/NRW-EESA/126-2023-2-1-Pizzeria'
import { exercise127 } from './implementations/NRW-EESA/127-2023-2-2-Tischgruppe'
import { exercise128 } from './implementations/NRW-EESA/128-2023-2-3-Zugfahrt'
import { exercise135 } from './implementations/NRW-EESA/135-2024-2-1-Garten'
import { exercise108 } from './implementations/NRW-EESA/108-2021-2-2-Blumenbeet'
import { exercise117 } from './implementations/NRW-EESA/117-2022-2-1-Hochbeet'
import { exercise118 } from './implementations/NRW-EESA/118-2022-2-2-Führerschein'
import { exercise119 } from './implementations/NRW-EESA/119-2022-2-3-Bambus'
import { exercise107 } from './implementations/NRW-EESA/107-2021-2-1-Roller-Tour'
import { exercise109 } from './implementations/NRW-EESA/109-2021-2-3-Kasimir'
import { exercise122 } from './implementations/NRW-EESA/122-2023-1-3-Volumen-berechnen'
import { exercise129 } from './implementations/NRW-EESA/129-2024-1-1-Zahlen-ordnen'
import { exercise130 } from './implementations/NRW-EESA/130-2024-1-2-Einheiten-umrechnen'
import { exercise131 } from './implementations/NRW-EESA/131-2024-1-3-Weitsprung'
import { exercise132 } from './implementations/NRW-EESA/132-2024-1-4-Basketball'
import { exercise133 } from './implementations/NRW-EESA/133-2024-1-5-Schätzen'
import { exercise134 } from './implementations/NRW-EESA/134-2024-1-6-Tabellenkalkulation'
import { exercise100 } from './implementations/NRW-EESA/100-2021-1-1-Zahlenstrahl'
import { exercise101 } from './implementations/NRW-EESA/101-2021-1-2-Einheiten-umrechnen'
import { exercise102 } from './implementations/NRW-EESA/102-2021-1-3-Zahlenrätsel'
import { exercise103 } from './implementations/NRW-EESA/103-2021-1-4-Kugeln-ziehen'
import { exercise104 } from './implementations/NRW-EESA/104-2021-1-5-Verkehrsmittel'
import { exercise105 } from './implementations/NRW-EESA/105-2021-1-v2-4-Würfelkörper'
import { exercise106 } from './implementations/NRW-EESA/106-2021-1-v2-5-Goldpreis'
import { exercise115 } from './implementations/NRW-EESA/115-2022-1-v2-2-Dreieck'
import { exercise116 } from './implementations/NRW-EESA/116-2022-1-v2-4-Füllgraphen'
import { exercise123 } from './implementations/NRW-EESA/123-2023-1-4-schriftlich-addieren'
import { exercise114 } from './implementations/NRW-EESA/114-2022-1-5-Schätzen'
import { exercise113 } from './implementations/NRW-EESA/113-2022-1-4-Glücksrad'
import { exercise112 } from './implementations/NRW-EESA/112-2022-1-3-Landtagswahl'
import { exercise110 } from './implementations/NRW-EESA/110-2022-1-1-Zahlen-ordnen'
import { exercise111 } from './implementations/NRW-EESA/111-2022-1-2-Quadrat'
import { exercise124 } from './implementations/NRW-EESA/124-2023-1-5-Schätzen'
import { exercise125 } from './implementations/NRW-EESA/125-2023-1-6-Mittelwerte und Durchschnitt'
import { exercise199 } from './implementations/NRW-EESA/199-intro-Zahlen-vergleichen'
import { exercise215 } from './implementations/BW_Realschule/215-2024-B-3-Angelspiel+Tennishalle'
import { exercise200 } from './implementations/BW_Realschule/200-2024-A1-1-Pyramide'
import { exercise201 } from './implementations/BW_Realschule/201-2024-A1-2-Kugeln-ziehen'
import { exercise202 } from './implementations/BW_Realschule/202-2024-A1-3-Zehnerpotenzen'
import { exercise203 } from './implementations/BW_Realschule/203-2024-A1-4-Muster'
import { exercise204 } from './implementations/BW_Realschule/204-2024-A1-5-Sinus'
import { exercise205 } from './implementations/BW_Realschule/205-2024-A1-6-Boxplot'
import { exercise206 } from './implementations/BW_Realschule/206-2024-A1-7-Diagramm'
import { exercise207 } from './implementations/BW_Realschule/207-2024-A2-1-Viereck'
import { exercise208 } from './implementations/BW_Realschule/208-2024-A2-2-Fünfseitige-Pyramide'
import { exercise209 } from './implementations/BW_Realschule/209-2024-A2-3-Parabeln'
import { exercise210 } from './implementations/BW_Realschule/210-2024-A2-4-Sammelbilder'
import { exercise211 } from './implementations/BW_Realschule/211-2024-A2-5-Quadratische-Gleichung'
import { exercise212 } from './implementations/BW_Realschule/212-2024-A2-6-Diagramm'
import { exercise213 } from './implementations/BW_Realschule/213-2024-B-1-Drachenviereck+Parabeln'
import { exercise214 } from './implementations/BW_Realschule/214-2024-B-2-Funktionen+Zusammengesetzter-Körper'
import { exercise230 } from './implementations/BW_Realschule/230-2023-B-1-Trapez+Parabel'
import { exercise231 } from './implementations/BW_Realschule/231-2023-B-2-Parabel+Körper'
import { exercise232 } from './implementations/BW_Realschule/232-2023-B-3-Gewinnlose+Parabel'
import { exercise233 } from './implementations/BW_Realschule/233-2023-B-4-Parabel+Prisma'
import { exercise241 } from './implementations/BW_Realschule/241-2022-A2-1-Dreieck'
import { exercise242 } from './implementations/BW_Realschule/242-2022-A2-2-Gussform'
import { exercise243 } from './implementations/BW_Realschule/243-2022-A2-3-Quadratische-Gleichung'
import { exercise244 } from './implementations/BW_Realschule/244-2022-A2-4-Parabel'
import { exercise245 } from './implementations/BW_Realschule/245-2022-A2-5-Losverkauf'
import { exercise246 } from './implementations/BW_Realschule/246-2022-A2-6-Paketdiagramm'
import { exercise247 } from './implementations/BW_Realschule/247-2022-B-1-Figuren+Funktionen'
import { exercise248 } from './implementations/BW_Realschule/248-2022-B-2-Parabeln+Körper'
import { exercise249 } from './implementations/BW_Realschule/249-2022-B-3-Zufall+Tiny-House'
import { exercise250 } from './implementations/BW_Realschule/250-2022-B-4-Parabeln+Sechseck'
import { exercise258 } from './implementations/BW_Realschule/258-2021-A2-1-Figur'
import { exercise259 } from './implementations/BW_Realschule/259-2021-A2-2-Körper'
import { exercise260 } from './implementations/BW_Realschule/260-2021-A2-3-Glücksrad'
import { exercise261 } from './implementations/BW_Realschule/261-2021-A2-4-Diagramme'
import { exercise262 } from './implementations/BW_Realschule/262-2021-A2-5-Funktionen'
import { exercise263 } from './implementations/BW_Realschule/263-2021-A2-6-Boxplots'
import { exercise264 } from './implementations/BW_Realschule/264-2021-B-1-Figur+Funktionen'
import { exercise265 } from './implementations/BW_Realschule/265-2021-B-2-Funktionen+Körper'
import { exercise266 } from './implementations/BW_Realschule/266-2021-B-3-Glücksspiel+Parabel'
import { exercise267 } from './implementations/BW_Realschule/267-2021-B-4-Parabel+Figur'
import { exercise92 } from './implementations/NRW-MSA/9_2-2023-2-3-Zahlenpaare'
import { exercise198 } from './implementations/NRW-EESA/198-intro-lineare-Gleichungen'
import { exercise197 } from './implementations/NRW-EESA/197-intro-Füllgraphen'

export const exercisesData: { [key: number]: Exercise<any> } = {
  1: exercise1,
  2: exercise2,
  3: exercise3,
  4: exercise4,
  5: exercise5,
  6: exercise6,
  7: exercise7,
  8: exercise8,
  9: exercise9,
  10: exercise10,
  11: exercise11,
  12: exercise12,
  13: exercise13,
  14: exercise14,
  15: exercise15,
  16: exercise16,
  17: exercise17,
  18: exercise18,
  19: exercise19,
  20: exercise20,
  21: exercise21,
  22: exercise22,
  23: exercise23,
  24: exercise24,
  25: exercise25,
  26: exercise26,
  27: exercise27,
  28: exercise28,
  29: exercise29,
  30: exercise30,
  31: exercise31,
  32: exercise32,
  33: exercise33,
  34: exercise34,
  35: exercise35,
  36: exercise36,

  38: exercise38,
  39: exercise39,
  37: exercise37,
  40: exercise40,
  41: exercise41,
  42: exercise42,
  43: exercise43,
  44: exercise44,
  45: exercise45,
  46: exercise46,
  47: exercise47,
  48: exercise48,
  49: exercise49,
  50: exercise50,
  51: exercise51,
  52: exercise52,
  53: exercise53,
  55: exercise55,
  54: exercise54,
  92: exercise92,
  100: exercise100,
  101: exercise101,
  102: exercise102,
  120: exercise120,
  121: exercise121,
  135: exercise135,
  136: exercise136,
  137: exercise137,
  126: exercise126,
  127: exercise127,
  128: exercise128,
  107: exercise107,
  109: exercise109,
  108: exercise108,
  117: exercise117,
  118: exercise118,
  119: exercise119,
  122: exercise122,
  123: exercise123,
  124: exercise124,
  125: exercise125,
  129: exercise129,
  130: exercise130,
  131: exercise131,
  132: exercise132,
  133: exercise133,
  134: exercise134,
  103: exercise103,
  104: exercise104,
  105: exercise105,
  106: exercise106,
  115: exercise115,
  116: exercise116,
  114: exercise114,
  113: exercise113,
  112: exercise112,
  110: exercise110,
  111: exercise111,
  198: exercise198,
  199: exercise199,
  200: exercise200,
  201: exercise201,
  202: exercise202,
  203: exercise203,
  204: exercise204,
  205: exercise205,
  206: exercise206,
  207: exercise207,
  208: exercise208,
  209: exercise209,
  210: exercise210,
  211: exercise211,
  212: exercise212,
  213: exercise213,
  214: exercise214,
  215: exercise215,
  230: exercise230,
  231: exercise231,
  232: exercise232,
  233: exercise233,
  241: exercise241,
  242: exercise242,
  243: exercise243,
  244: exercise244,
  245: exercise245,
  246: exercise246,
  247: exercise247,
  248: exercise248,
  249: exercise249,
  250: exercise250,
  258: exercise258,
  259: exercise259,
  260: exercise260,
  261: exercise261,
  262: exercise262,
  263: exercise263,
  264: exercise264,
  265: exercise265,
  266: exercise266,
  267: exercise267,
  197: exercise197,
}

// symbols:

// ℚ
// π ·
// − ±
// ×
// α β γ δ ε ϕ
// ∠ ∡
// ⊕
// ≙ ≠ ⇒ ∈ ∉
// ['',<> <Color4><span className="inline-block  scale-y-[1.5]">↓</span></Color4></>,<><Color4><span style={{ fontSize: 'small' }}>Hier Erklärtext</span></Color4></>,]
// π ≈ √

// SVG-Umgebung:
//<svg viewBox="0 0 328 190"></svg>

// Umgebung für Bild:
// <image href="/content/BW_Realschule/" height="190" width="328" />

// Umgebung für Text in SVG:
// <text x={140} y={185} fontSize={20} textAnchor="right" stroke="black">Hier Text</text>

// Bildunterschrift:
// <center><Color5><span style={{ fontSize: 'small' }}>Unterschrift</span></Color5></center>

// Intro Codeblock:
// intro({data}){return(<></>)},

// Skalierungsfunktion für Koordinatensysteme:
// function toX(n: number) {return 33 + n * 15.6}
// function toY(n: number) {return 157 - n * 15.6}

// Funktion, die Punkte von Graphen anlegt
// function generateParabolaPoints(a: number,b: number,c: number,step: number,): string {
// let points = ''
// for (let x = -4; x <= 11; x += step) {
// const y = a * (x - b) * (x - b) + c
// points += `${toX(x)},${toY(y)} `} return points.trim() }

// Variable, die Funktion abruft:
// const parabolaPoints = generateParabolaPoints(data.a,data.x_s,data.y_s,0.1,)

// Polyline für svg-Umgebung
// <polyline points={parabolaPoints} stroke="blue" strokeWidth="2" fill="none"/>

// Line-Umgebung (für Geraden)
// <line x1={33} y1={157} x2={toX((data.zeit_2 - data.zeit_1) / 10)} y2={toY(data.strecke_1 / 50)} stroke="blue" strokeWidth={2} />

// Shuffle
// order: number[]
// order: rng.shuffleArray([0, 1, 2]),
// const listItems = [<li key="1"></li>,<li key="2"></li>,<li key="3"></li>,]
// const shuffledItems = data.order.map(i => listItems[i])
