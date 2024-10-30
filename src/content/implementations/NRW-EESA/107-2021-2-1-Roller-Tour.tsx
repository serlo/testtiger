import { Exercise } from '@/data/types'
import { Color5 } from '@/helper/colors'
import { getGcd } from '@/helper/get-gcd'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

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
      gebühr_easy: rng.randomIntBetween(3, 4) / 10,
      gebühr_roller: rng.randomIntBetween(2, 4) / 10,
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
    return (
      getGcd(data.legende, data.pace) != 1 &&
      data.gebühr_easy < data.gebühr_roller &&
      data.grund_easy < data.grund_roller &&
      data.grund_roller - 20 < data.grund_easy
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
      points: 42,
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
        return <></>
      },
    },
    {
      points: 42,
      intro({ data }) {
        return <></>
      },
      task({ data }) {
        return (
          <>
            <p>
              b) Melike und Robin gehen von einer durchschnittlichen
              Geschwindigkeit von {data.pace} {buildInlineFrac(<>km</>, <>h</>)}
              ​ aus. Berechne für die {data.legende * 15} km lange Strecke die
              Fahrzeit in Minuten. Notiere deinen Lösungsweg.
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      points: 42,
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
        return <></>
      },
    },
    {
      points: 42,
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
                  toY(
                    data.grund_easy / 10 +
                      ((200 - data.free) * data.gebühr_easy) / 10,
                  ) - 1
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
        return <></>
      },
    },
    {
      points: 42,
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
        return <></>
      },
    },
    {
      points: 42,
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
        return <></>
      },
    },
  ],
}
