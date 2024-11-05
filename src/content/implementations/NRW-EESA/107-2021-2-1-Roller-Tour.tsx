import { Exercise } from '@/data/types'
import { Color1, Color2, Color3, Color4, Color5 } from '@/helper/colors'
import { getGcd } from '@/helper/get-gcd'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  legende: number
  pace: number
  free: number
  grund_easy: number
  grund_roller: number
  gebühr_easy: number
  gebühr_roller: number
  fahrt: number
}

export const exercise107: Exercise<DATA> = {
  title: 'Roller-Tour',
  source: '2021 Teil 2 Aufgabe 1',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    return {
      legende: rng.randomIntBetween(1, 4),
      pace: rng.randomIntBetween(20, 40),
      free: rng.randomIntBetween(8, 12) * 10,
      grund_easy: rng.randomIntBetween(3, 7) * 10,
      grund_roller: rng.randomIntBetween(4, 8) * 10,
      gebühr_easy: (rng.randomIntBetween(4, 6) * 5) / 100,
      gebühr_roller: rng.randomIntBetween(4, 5) / 10,
      fahrt: rng.randomIntBetween(13, 19) * 10,
    }
  },
  originalData: {
    legende: 2,
    pace: 24,
    free: 100,
    grund_easy: 80,
    grund_roller: 90,
    gebühr_easy: 0.2,
    gebühr_roller: 0.4,
    fahrt: 170,
  },
  constraint({ data }) {
    const schnitt_2_x =
      data.free +
      Math.round(
        (data.grund_easy + data.free * data.gebühr_easy - data.grund_roller) /
          (data.gebühr_roller - data.gebühr_easy),
      )
    const schnitt_2_y = Math.round(
      data.grund_easy + data.gebühr_easy * schnitt_2_x,
    )
    return (
      getGcd(data.legende, data.pace) != 1 &&
      data.gebühr_easy < data.gebühr_roller &&
      data.grund_easy < data.grund_roller &&
      data.grund_roller - 20 < data.grund_easy &&
      data.grund_roller + (200 - data.free) * data.gebühr_roller >
        data.grund_easy + data.gebühr_easy * 200 &&
      data.fahrt != schnitt_2_x
    )
  },
  intro({ data }) {
    return (
      <>
        <p>
          Melike und Robin planen eine Tour mit einem Motorroller. Sie wollen
          eine Woche unterwegs sein. Am ersten Tag wollen sie von Fröndenberg zu
          einem Campingplatz am Möhnesee fahren (Abbildung 1).
        </p>
        <svg viewBox="0 0 328 100">
          <image
            href="/content/NRW_EESA/107_Roller-Tour1.PNG"
            height="100"
            width="328"
          />
          <text x={302} y={90} fontSize={9} textAnchor="right" stroke="black">
            {data.legende}
          </text>
        </svg>
        <center>
          <Color5>
            <span style={{ fontSize: 'small' }}>
              Abbildung 1: geplante Strecke von Fröndenberg zum Campingplatz am
              Möhnesee
            </span>
          </Color5>
        </center>
      </>
    )
  },
  tasks: [
    {
      points: 3,
      duration: 3,
      intro({ data }) {
        return <></>
      },
      task({ data }) {
        return (
          <>
            <p>
              a) Die Strecke ist ungefähr {data.legende * 15} km lang. Bestätige
              dies durch Messen und mithilfe des Maßstabs.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die Strecke und der Maßstab können zum Beispiel durch ein Lineal
              abgemessen und verglichen werden. Der Maßstab passt ungefähr 15
              mal in den Streckenzug.
            </p>
            <p>Damit hat die Strecke eine Länge von:</p>
            <p>
              15 · {data.legende} = <strong>{15 * data.legende} [km]</strong>
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 2,
      intro({ data }) {
        return <></>
      },
      task({ data }) {
        return (
          <>
            <p>
              b) Melike und Robin gehen von einer durchschnittlichen
              Geschwindigkeit von <br></br>
              {data.pace} {buildInlineFrac(<>km</>, <>h</>)}​ aus. Berechne für
              die {data.legende * 15} km lange Strecke die Fahrzeit in Minuten.
              Notiere deinen Lösungsweg.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Meike und Robin schaffen {data.pace} km in einer Stunde, also in
              60 Minuten.
            </p>
            <p>Berechne mit dem Dreisatz:</p>
            {buildEquation([
              [<>60 min</>, <>≙</>, <>{data.pace} km</>],
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
                    <span style={{ fontSize: 'small' }}>: {data.pace} </span>
                  </Color4>
                </>,
              ],
              [
                <>{pp(roundToDigits(60 / data.pace, 2))} min</>,
                <>≙</>,
                <>1 km</>,
              ],
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
                    <span style={{ fontSize: 'small' }}>
                      · {data.legende * 15}{' '}
                    </span>
                  </Color4>
                </>,
              ],
              [
                <>
                  {pp(data.legende * 15 * roundToDigits(60 / data.pace, 2))} min
                </>,
                <>≙</>,
                <>{data.legende * 15} km</>,
              ],
            ])}
            <p>
              Melike und Robin brauchen ungefähr <br></br>
              <strong>
                {pp(
                  Math.round(
                    data.legende * 15 * roundToDigits(60 / data.pace, 2),
                  ),
                )}{' '}
                Minuten
              </strong>{' '}
              für den Weg.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 3,
      intro({ data }) {
        return (
          <>
            <p>
              Für die Tour wollen Melike und Robin einen Motorroller für eine
              Woche mieten. Robin findet zwei Angebote (Abbildung 2).
            </p>
            <center>
              <svg viewBox="0 0 328 200">
                <rect
                  x="64"
                  y="10"
                  width="200"
                  height="66"
                  rx="4"
                  ry="4"
                  stroke="#007EC1"
                  fill="transparent"
                  strokeWidth="2"
                />
                <text
                  x="164"
                  y="24"
                  fontSize="10"
                  textAnchor="middle"
                  fontWeight="bold"
                  fill="black"
                >
                  Angebot von {'"'}Easy Rent{'"'}
                </text>
                <text
                  x="164"
                  y="44"
                  fontSize="10"
                  textAnchor="middle"
                  fill="black"
                >
                  Grundgebühr für eine Woche: {data.grund_easy} €
                </text>
                <text
                  x="164"
                  y="66"
                  fontSize="10"
                  textAnchor="middle"
                  fill="black"
                >
                  Jeder km kostet {pp(data.gebühr_easy)} €
                </text>
                <rect
                  x="64"
                  y="90"
                  width="200"
                  height="88"
                  rx="4"
                  ry="4"
                  stroke="#007EC1"
                  fill="transparent"
                  strokeWidth="2"
                />
                <text
                  x="164"
                  y="106"
                  fontSize="10"
                  textAnchor="middle"
                  fontWeight="bold"
                  fill="black"
                >
                  Angebot von {'"'}Rollerverleih24{'"'}
                </text>
                <text
                  x="164"
                  y="126"
                  fontSize="10"
                  textAnchor="middle"
                  fill="black"
                >
                  Grundgebühr für eine Woche: {data.grund_roller} €
                </text>
                <text
                  x="164"
                  y="146"
                  fontSize="10"
                  textAnchor="middle"
                  fill="black"
                >
                  {data.free} km frei
                </text>
                <text
                  x="164"
                  y="168"
                  fontSize="10"
                  textAnchor="middle"
                  fill="black"
                >
                  Jeder km kostet {pp(data.gebühr_roller)} €
                </text>
              </svg>
            </center>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 2: Angebote der Rollervermietungen {'"'}Easy Rent
                  {'"'} und {'"'}Rollerverleih24{'"'}
                </span>
              </Color5>
            </center>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              c) Die Kosten bei {'"'}Easy Rent{'"'} können mit dem Term{' '}
              {pp(data.gebühr_easy)} ⋅ x + {data.grund_easy} berechnet werden
            </p>
            <p>
              Gib die Bedeutung von x, von {pp(data.gebühr_easy)} und von{' '}
              {data.grund_easy} im Zusammenhang mit den Kosten an.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Bedeutung:</p>
            <ul>
              <li>
                <Color1>x</Color1> ist ein Platzhalter für die Anzahl der
                Kilometer, die Melike und Robin fahren.
              </li>
              <li>
                <Color1>{pp(data.gebühr_easy)}</Color1> [€] ist der Preis, den
                sie für jeden gefahrenen Kilometer bezahlen müssen.
              </li>
              <li>
                <Color1>{data.grund_easy}</Color1> [€] ist die Grundgebühr für
                den Roller, den sie unabhängig von den gefahrenen Kilometern
                bezahlen müssen.
              </li>
            </ul>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 3,
      intro({ data }) {
        function toX(n: number) {
          return 20.5 + n * (287 / 20)
        }
        function toY(n: number) {
          return 197 - n * (287 / 20)
        }
        return (
          <>
            <p>
              Melike und Robin wollen die Angebote miteinander vergleichen und
              erstellen dazu eine Grafik (Abbildung 3).
            </p>
            <svg viewBox="0 0 328 220">
              <image
                href="/content/NRW_EESA/107_Roller-Tour3.PNG"
                height="220"
                width="328"
              />
              <line
                x1={toX(0)}
                y1={toY(data.grund_roller / 10) - 1}
                x2={toX(data.free / 10)}
                y2={toY(data.grund_roller / 10) - 1}
                stroke="blue"
                strokeWidth={2}
              />
              <line
                x1={toX(data.free / 10)}
                y1={toY(data.grund_roller / 10) - 1}
                x2={toX(20)}
                y2={
                  toY(
                    data.grund_roller / 10 +
                      ((200 - data.free) * data.gebühr_roller) / 10,
                  ) - 1
                }
                stroke="blue"
                strokeWidth={2}
              />
              <line
                x1={toX(0)}
                y1={toY(data.grund_easy / 10) - 1}
                x2={toX(20)}
                y2={
                  toY(data.grund_easy / 10 + (200 * data.gebühr_easy) / 10) - 1
                }
                stroke="orange"
                strokeWidth={2}
              />
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 3: Vergleich der Angebote von {'"'}Easy Rent
                  {'"'} und {'"'}Rollerverleih24{'"'}
                </span>
              </Color5>
            </center>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              d) Erkläre, warum der Graph zum Angebot von {'"'}Rollerverleih24
              {'"'} im ersten Abschnitt waagerecht verläuft.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Bei {'"'}Rollerverleih24{'"'} sind die ersten {data.free}{' '}
              Kilometer kostenlos. Damit verläuft der Graph auf der Höhe der
              Grundkosten bis {data.free} km waagerecht. Erst danach wird eine
              Gebühr für jeden gefahrenen Kilometer bezahlt, sodass der Graph
              steigt.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 1,
      intro({ data }) {
        return <></>
      },
      task({ data }) {
        return (
          <>
            <p>
              e) Die beiden Graphen schneiden sich. Gib die Koordinaten der
              beiden Schnittpunkte an.
            </p>
          </>
        )
      },
      solution({ data }) {
        const schnitt_1_x = Math.round(
          (data.grund_roller - data.grund_easy) / data.gebühr_easy,
        )
        const schnitt_2_x =
          data.free +
          Math.round(
            (data.grund_easy +
              data.free * data.gebühr_easy -
              data.grund_roller) /
              (data.gebühr_roller - data.gebühr_easy),
          )
        const schnitt_2_y = Math.round(
          data.grund_easy + data.gebühr_easy * schnitt_2_x,
        )
        return (
          <>
            <p>
              Lies die Schnittpunkte der Graphen aus dem Koordinatensystem ab.
            </p>
            <ul>
              <li>
                Nach etwa {pp(schnitt_1_x)} Kilometer schneiden sich die Graphen
                bei {data.grund_roller} €. Der Schnittpunkt ist also{' '}
                <strong>
                  ({pp(schnitt_1_x)}|{data.grund_roller})
                </strong>
                .
              </li>
              <li>
                Danach schneiden sie sich noch einmal bei {pp(schnitt_2_x)}{' '}
                Kilometer und dem Preis von {pp(schnitt_2_y)} €. Der zweite
                Schnittpunkt lautet{' '}
                <strong>
                  ({pp(schnitt_2_x)}|{pp(schnitt_2_y)})
                </strong>
                .
              </li>
            </ul>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 2,
      intro({ data }) {
        return <></>
      },
      task({ data }) {
        return (
          <>
            <p>
              f) Insgesamt wollen Melike und Robin ungefähr {data.fahrt} km weit
              fahren. Welches Angebot ist günstiger? Gib die Kosten für das
              günstigere Angebot an.
            </p>
          </>
        )
      },
      solution({ data }) {
        const schnitt_2_x =
          data.free +
          Math.round(
            (data.grund_easy +
              data.free * data.gebühr_easy -
              data.grund_roller) /
              (data.gebühr_roller - data.gebühr_easy),
          )
        const schnitt_2_y = Math.round(
          data.grund_easy + data.gebühr_easy * schnitt_2_x,
        )
        return (
          <>
            <p>
              Bestimme anhand der Graphen, ob der blaue Graph oder der orange
              Graph nach {data.fahrt} Kilometer den geringeren Preis anzeigt.
            </p>
            <p>
              Nach {data.fahrt} Kilometer liegt der{' '}
              {schnitt_2_x > data.fahrt ? (
                <>
                  <Color1>blaue</Color1>{' '}
                </>
              ) : (
                <>
                  <Color3>orange</Color3>{' '}
                </>
              )}{' '}
              Graph unter dem anderen Graphen und zeigt damit einen günstigeren
              Preis an.
            </p>
            <p>
              Das{' '}
              {schnitt_2_x > data.fahrt ? (
                <>
                  <Color1>blaue</Color1>{' '}
                </>
              ) : (
                <>
                  <Color3>orange</Color3>{' '}
                </>
              )}{' '}
              Angebot kostet dann{' '}
              {schnitt_2_x > data.fahrt ? (
                <>
                  <Color1>
                    {pp(
                      data.grund_roller +
                        (data.fahrt - data.free) * data.gebühr_roller,
                    )}{' '}
                    €
                  </Color1>
                  .
                </>
              ) : (
                <>
                  <Color3>
                    {pp(data.grund_easy + data.gebühr_easy * data.fahrt)} €
                  </Color3>
                  .
                </>
              )}
            </p>
          </>
        )
      },
    },
  ],
}
