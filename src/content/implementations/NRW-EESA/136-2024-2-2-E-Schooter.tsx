import { Exercise } from '@/data/types'
import { Color1, Color2, Color4, Color5 } from '@/helper/colors'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  weg: number
  pacecase: number
  pace: number
  fixkosten: number
  zeitkosten: number
  months: number
  cost: number
}

export const exercise136: Exercise<DATA> = {
  title: 'E-Scooter',
  source: '2024 Teil 2 Aufgabe 2',
  useCalculator: true,
  duration: 26,
  generator(rng) {
    const weg = rng.randomIntBetween(2, 8)
    const pacecase = rng.randomIntBetween(2, 4)
    return {
      weg,
      pacecase,
      pace: weg * pacecase, // pace direkt berechnen
      fixkosten: rng.randomIntBetween(1, 4) * 0.5,
      zeitkosten: rng.randomIntBetween(2, 5) * 0.05,
      months: rng.randomIntBetween(3, 9) * 0.5,
      cost: rng.randomIntBetween(6, 12) * 50,
    }
  },
  originalData: {
    weg: 5,
    pacecase: 3,
    pace: 15,
    fixkosten: 1,
    zeitkosten: 0.15,
    months: 2.5,
    cost: 750,
  },
  learningPathData: {
    weg: 4,
    pacecase: 4,
    pace: 16,
    fixkosten: 2,
    zeitkosten: 0.1,
    months: 2.5,
    cost: 750,
  },
  constraint({ data }) {
    return data.pace < 21 && data.pace > 9
  },
  intro({ data }) {
    return (
      <>
        <p>
          Tom überlegt, mit einem geliehenen E-Scooter die {data.weg} Kilometer
          vom Bahnhof zu seiner Arbeitsstelle zu fahren.
        </p>
      </>
    )
  },
  tasks: [
    {
      points: 2,
      duration: 4,
      task({ data }) {
        const time = data.weg / (data.pace / 60)
        return (
          //a)
          <>
            <p>
              Tom geht von einer durchschnittlichen Geschwindigkeit von{' '}
              {data.pace} {buildInlineFrac('km', 'h')} aus. Bestätige durch eine
              Rechnung, dass Tom mit dem E-Scooter {time} Minuten bis zur Arbeit
              benötigt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const time = data.weg / (data.pace / 60)
        return (
          <>
            <p>
              Tom fährt mit einer Geschwindigkeit von {data.pace} Kilometer pro
              Stunde. Das sind {data.pace} Kilometer in 60 Minuten. Verwende den
              Dreisatz, um zu bestimmen, wie lange er für {data.weg} Kilometer
              braucht:
            </p>
            {buildEquation([
              [<>{data.pace} km</>, <>≙</>, <>60 min</>],
              [
                '',
                <>
                  {' '}
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}> : {data.pace}</span>
                  </Color4>
                </>,
              ],
              [<>1 km</>, <>≙</>, <>{pp(60 / data.pace)} min</>],
              [
                '',
                <>
                  {' '}
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}> · {data.weg}</span>
                  </Color4>
                </>,
              ],
              [
                <>{data.weg} km</>,
                <>≙</>,
                <>{data.weg * (60 / data.pace)} min</>,
              ],
            ])}
            <p>
              Tom braucht für seinen Arbeitsweg <br></br>
              <strong>{time} Minuten</strong>.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 4,
      skillIntro({ data }) {
        const time = data.weg / (data.pace / 60)
        return (
          <>
            <p>Tom braucht für seinen Arbeitsweg {time} Minuten.</p>
          </>
        )
      },
      intro({ data }) {
        return (
          <>
            <p>
              Der E-Scooter-Verleih „E-Line“ berechnet eine Startgebühr und für
              jede genutzte Minute einen festen Preis.
            </p>
            <svg width="320" height="130" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="10"
                y="10"
                width="300"
                height="22"
                fill="#D2ECF6"
                stroke="none"
              />

              <rect
                x="10"
                y="10"
                width="300"
                height="66"
                rx="4"
                ry="4"
                stroke="#007EC1"
                fill="transparent"
                strokeWidth="1"
              />

              <line
                x1="10"
                y1="32"
                x2="310"
                y2="32"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="10"
                y1="54"
                x2="310"
                y2="54"
                stroke="#007EC1"
                strokeWidth="1"
              />

              <line
                x1="250"
                y1="32"
                x2="250"
                y2="76"
                stroke="#007EC1"
                strokeWidth="1"
              />

              <text x="15" y="48" fontSize="10" textAnchor="left" fill="black">
                Startgebühr
              </text>
              <text x="15" y="70" fontSize="10" textAnchor="left" fill="black">
                jede genutzte Minute
              </text>

              <text
                x="164"
                y="26"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                E-Scooter-Verleih {'"'}E-Line{'"'}{' '}
              </text>
              <text
                x="280"
                y="48"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                {pp(data.fixkosten)} €
              </text>
              <text
                x="280"
                y="70"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                {pp(data.zeitkosten)} €
              </text>
              <text
                x="197.5"
                y="70"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
              <text
                x="197.5"
                y="92"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
              <text
                x="197.5"
                y="114"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
            </svg>
          </>
        )
      },
      task({ data }) {
        return (
          //b)
          <>
            <p>
              Tom nutzt den E-Scooter für den Hin- und Rückweg und muss daher
              zweimal die Startgebühr bezahlen. Berechne seine Kosten pro Tag.
            </p>
          </>
        )
      },
      solution({ data }) {
        const time = data.weg / (data.pace / 60)
        return (
          <>
            <p>Die Gesamtkosten setzen sich zusammen aus:</p>
            <ul>
              <li>
                2 mal die <Color1>Startgebühr</Color1>: 2 ·{' '}
                <Color1>{pp(data.fixkosten)} €</Color1> ={' '}
                {pp(data.fixkosten * 2)} €
              </li>
              <li>
                Die <Color2>Gebühr pro Minute</Color2> für 2 mal {time} Minuten:
                <br></br>2 · {time} · <Color2>{pp(data.zeitkosten)} €</Color2> ={' '}
                {pp(2 * data.zeitkosten * time)} €
              </li>
            </ul>
            <p>
              Addiere die Beträge: {pp(data.fixkosten * 2)} € +{' '}
              {pp(2 * data.zeitkosten * time)} € ={' '}
              {pp(2 * data.zeitkosten * time + data.fixkosten * 2)} €
            </p>
            <p>
              Damit bezahlt Tom{' '}
              <strong>
                {pp(2 * data.zeitkosten * time + data.fixkosten * 2)} €
              </strong>{' '}
              pro Tag.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 4,
      intro({ data }) {
        const time = data.weg / (data.pace / 60)
        const tag = data.zeitkosten * time + data.fixkosten * 2
        function toX(n: number) {
          return 27 + n * 23.3
        }
        function toY(n: number) {
          return 236 - (n * 23.3 * 30 * tag) / 100
        }
        return (
          <>
            <p>
              Wenn Tom den E-Scooter jeden Tag nutzt, muss er mit Kosten von{' '}
              {pp(30 * tag)} € pro Monat rechnen. Tom stellt für die Berechnung
              der Gesamtkosten die Funktionsgleichung auf: y = {pp(30 * tag)} ·
              x. Er zeichnet den dazugehörigen Graphen in das Koordinatensystem
              (Abbildung 1).
            </p>
            <svg viewBox="0 0 328 260">
              <image
                href="/content/NRW_EESA/136_KS.png"
                height="260"
                width="328"
              />
              <text
                x={30}
                y={20}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                Gesamtkosten in €
              </text>
              <text
                x={230}
                y={230}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                Anzahl der Monate
              </text>
              <line
                x1={toX(0)}
                y1={toY(0)}
                x2={toX(12)}
                y2={toY(12)}
                stroke="blue"
                strokeWidth={2}
              />
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 1: Übersicht der Kostenberechnung
                </span>
              </Color5>
            </center>
          </>
        )
      },
      task({ data }) {
        const time = data.weg / (data.pace / 60)
        const tag = data.zeitkosten * time + data.fixkosten * 2
        return (
          //c)
          <>
            <p>
              Gib die Bedeutung von y, von {pp(30 * tag)} und von x im
              Zusammenhang mit der Kostenberechnung an.
            </p>
          </>
        )
      },
      solution({ data }) {
        const time = data.weg / (data.pace / 60)
        const tag = data.zeitkosten * time + data.fixkosten * 2
        return (
          <>
            <p>Bedeutung:</p>
            <ul>
              <li>
                x ist die <strong>Anzahl der Monate</strong>, die Tom mit dem
                Scooter fährt.
              </li>
              <li>
                {pp(30 * tag)} [€] sind die <strong>Kosten pro Monat</strong>.
              </li>
              <li>
                Die y-Werte sind die <strong>Gesamtkosten</strong>, in
                Abhängigkeit der Monate x.
              </li>
            </ul>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 4,
      skillIntro({ data }) {
        const time = data.weg / (data.pace / 60)
        const tag = data.zeitkosten * time + data.fixkosten * 2
        function toX(n: number) {
          return 27 + n * 23.3
        }
        function toY(n: number) {
          return 236 - (n * 23.3 * 30 * tag) / 100
        }
        return (
          <>
            <p>
              Wenn Tom den E-Scooter jeden Tag nutzt, muss er mit Kosten von{' '}
              {pp(30 * tag)} € pro Monat rechnen. Tom stellt für die Berechnung
              der Gesamtkosten die Funktionsgleichung auf: y = {pp(30 * tag)} ·
              x. Er zeichnet den dazugehörigen Graphen in das Koordinatensystem
              (Abbildung 1).
            </p>
            <svg viewBox="0 0 328 260">
              <image
                href="/content/NRW_EESA/136_KS.png"
                height="260"
                width="328"
              />
              <text
                x={30}
                y={20}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                Gesamtkosten in €
              </text>
              <text
                x={230}
                y={230}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                Anzahl der Monate
              </text>
              <line
                x1={toX(0)}
                y1={toY(0)}
                x2={toX(12)}
                y2={toY(12)}
                stroke="blue"
                strokeWidth={2}
              />
            </svg>
          </>
        )
      },
      task({ data }) {
        return (
          //d)
          <>
            <p>Bestimme die Gesamtkosten nach {pp(data.months)} Monaten.</p>
          </>
        )
      },
      solution({ data }) {
        const time = data.weg / (data.pace / 60)
        const tag = data.zeitkosten * time + data.fixkosten * 2
        return (
          <>
            <p>
              Tom bezahlt jeden Monat {pp(30 * tag)} €. Die Kosten für{' '}
              {pp(data.months)} Monate betragen:
            </p>
            <p>
              {pp(30 * tag)} · {pp(data.months)} ={' '}
              <strong>{pp(30 * tag * data.months)} [€]</strong>
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 6,
      skillIntro({ data }) {
        const time = data.weg / (data.pace / 60)
        const tag = data.zeitkosten * time + data.fixkosten * 2
        function toX(n: number) {
          return 27 + n * 23.3
        }
        function toY(n: number) {
          return 236 - (n * 23.3 * 30 * tag) / 100
        }
        return (
          <>
            <p>
              Wenn Tom den E-Scooter jeden Tag nutzt, muss er mit Kosten von{' '}
              {pp(30 * tag)} € pro Monat rechnen. Tom stellt für die Berechnung
              der Gesamtkosten die Funktionsgleichung auf: y = {pp(30 * tag)} ·
              x. Er zeichnet den dazugehörigen Graphen in das Koordinatensystem
              (Abbildung 1).
            </p>
            <svg viewBox="0 0 328 260">
              <image
                href="/content/NRW_EESA/136_KS.png"
                height="260"
                width="328"
              />
              <text
                x={30}
                y={20}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                Gesamtkosten in €
              </text>
              <text
                x={230}
                y={230}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                Anzahl der Monate
              </text>
              <line
                x1={toX(0)}
                y1={toY(0)}
                x2={toX(12)}
                y2={toY(12)}
                stroke="blue"
                strokeWidth={2}
              />
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 1: Übersicht der Kostenberechnung
                </span>
              </Color5>
            </center>
          </>
        )
      },
      intro({ data }) {
        return (
          <>
            <p>
              Tom überlegt: „Vielleicht kaufe ich besser einen E-Scooter.“ Der
              E-Scooter kostet {data.cost} €. Pro Monat plant er weitere 10 €
              ein (z. B. für Aufladen und Versicherung).
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          //e)
          <>
            <p>
              Zeichne den Graphen der Gesamtkosten für diesen E-Scooter in das
              Koordinatensystem ein (Abbildung 1).
            </p>
          </>
        )
      },
      solution({ data }) {
        const time = data.weg / (data.pace / 60)
        const tag = data.zeitkosten * time + data.fixkosten * 2
        function toX(n: number) {
          return 27 + n * 23.3
        }
        function toY(n: number) {
          return 236 - (n * 23.3 * 30 * tag) / 100
        }
        function toX2(n: number) {
          return 27 + n * 23.3
        }
        function toY2(n: number) {
          return 236 - (23.3 * data.cost) / 100 - (n * 23.3 * 10) / 100
        }
        return (
          <>
            <p>Das Koordinatensystem sieht etwa so aus:</p>
            <svg viewBox="0 0 328 260">
              <image
                href="/content/NRW_EESA/136_KS.png"
                height="260"
                width="328"
              />
              <text
                x={30}
                y={20}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                Gesamtkosten in €
              </text>
              <text
                x={230}
                y={230}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                Anzahl der Monate
              </text>
              <line
                x1={toX(0)}
                y1={toY(0)}
                x2={toX(12)}
                y2={toY(12)}
                stroke="blue"
                strokeWidth={2}
              />
              <line
                x1={toX2(0)}
                y1={toY2(0)}
                x2={toX2(12)}
                y2={toY2(12)}
                stroke="orange"
                strokeWidth={2}
              />
            </svg>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 4,
      task({ data }) {
        return (
          //f)
          <>
            <p>
              Begründe, dass sich der Kauf des E-Scooters für ihn langfristig
              lohnt.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Tom hat beim Kauf des Scooters hohe Kosten, aber bezahlt monatlich
              weniger im Vergleich zum gemieteten Scooter.
            </p>
            <p>
              Nach einigen Monaten werden die Kosten für den angemieteten
              Scooter größer sein, sodass sich der Kauf langfristig immer lohnt.
            </p>
            <p>
              Anschaulich zeigt der Schnittpunkt der Geraden den Zeitpunkt, wann
              sich der Kauf des Scooters lohnt.
            </p>
          </>
        )
      },
    },
  ],
}
