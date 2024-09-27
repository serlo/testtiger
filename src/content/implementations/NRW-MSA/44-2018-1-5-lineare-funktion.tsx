import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp, ppPolynom } from '@/helper/pretty-print'

interface DATA {
  b: number
  n: number
}

export const exercise44: Exercise<DATA> = {
  title: 'Lineare Funktion',
  source: '2018 Teil 1 Aufgabe 5',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {
      b: rng.randomIntBetween(1, 9),
      n: rng.randomIntBetween(-1, 2),
    }
  },
  constraint({ data }) {
    return data.n != 0 && data.n + data.b != 9 && data.n + data.b != 10
  },
  intro({ data }) {
    return (
      <>
        <p>
          Marlon zeichnet mit einer Geometriesoftware den Graphen g der Funktion
          g(x) = 2x + b. <br />
          Er erstellt einen Schieberegler, mit dem er den Wert für b verändern
          kann.
        </p>

        <svg viewBox="0 0 500 450">
          <image
            href="/content/NRW_MSA_2018_1_5_koordinatensystem.svg"
            height="450"
            width="500"
          />
          <line
            x1={0}
            y1={365 + 10.5 * data.b - (380 / 7.5) * (2 * -5 + data.b)}
            x2={500}
            y2={365 + 10.5 * data.b - (380 / 7.5) * (2 * 5 + data.b)}
            stroke="blue"
            strokeWidth={4}
          />
          <text x={250} y={300} fontSize={35} textAnchor="right" stroke="blue">
            g
          </text>
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 42,
      task({ data }) {
        return (
          <>
            <p>
              a) Der Schieberegler zeigt den Wert für b nicht an. Gib den Wert
              für b an. <br />
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            Suche den Schnittpunkt der Funktion mit der y-Achse. Der y-Wert
            dieses Punktes ist unser gesuchtes b.
            <br /> <br />b = {pp(data.b)}
          </>
        )
      },
    },
    {
      points: 42,
      task({ data }) {
        return (
          <>
            <p>
              b) Marlon stellt für b den Wert {pp(data.b + data.n)} ein. <br />
              Zeichne den Graphen in das Koordinatensystem
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <svg viewBox="0 0 500 450">
              <image
                href="/content/NRW_MSA_2018_1_5_koordinatensystem.svg"
                height="450"
                width="500"
              />
              <line
                x1={0}
                y1={
                  365 +
                  10.5 * (data.b + data.n) -
                  (380 / 7.5) * (2 * -5 + (data.b + data.n))
                }
                x2={500}
                y2={
                  365 +
                  10.5 * (data.b + data.n) -
                  (380 / 7.5) * (2 * 5 + (data.b + data.n))
                }
                stroke="blue"
                strokeWidth={4}
              />
              <text
                x={250}
                y={300}
                fontSize={35}
                textAnchor="right"
                stroke="blue"
              >
                g
              </text>
            </svg>
          </>
        )
      },
    },
  ],
}
