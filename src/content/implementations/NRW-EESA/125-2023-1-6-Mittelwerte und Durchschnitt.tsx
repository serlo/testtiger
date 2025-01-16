import { Exercise } from '@/data/types'
import {
  buildEquation,
  buildFrac,
  buildInlineFrac,
} from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  Spiel1: number
  Spiel2: number
  Spiel3: number
  Spiel4: number
  Spiel5: number
}

export const exercise125: Exercise<DATA> = {
  title: 'Mittelwerte und Durchschnitt',
  source: '2023 Teil 1 Aufgabe 6',
  useCalculator: false,
  duration: 4,
  generator(rng) {
    return {
      Spiel1: rng.randomIntBetween(5, 20),
      Spiel2: rng.randomIntBetween(5, 20),
      Spiel3: rng.randomIntBetween(5, 20),
      Spiel4: rng.randomIntBetween(5, 20),
      Spiel5: rng.randomIntBetween(5, 20),
    }
  },
  originalData: {
    Spiel1: 12,
    Spiel2: 13,
    Spiel3: 9,
    Spiel4: 15,
    Spiel5: 6,
  },
  constraint({ data }) {
    return (
      ((data.Spiel1 + data.Spiel2 + data.Spiel3 + data.Spiel4 + data.Spiel5) /
        5) %
        1 ==
      0
    )
  },
  intro({ data }) {
    return (
      <>
        <p>
          Amelie spielt Handball. In den ersten fünf Spielen hat sie viele Tore
          erzielt. Die Anzahl der erzielten Tore hat sie in einer Tabelle
          notiert.
        </p>
        <svg width="250" height="290">
          <rect
            x="10"
            y="10"
            width="250"
            height="45"
            fill="#D2ECF6"
            stroke="none"
          />
          <rect
            x="10"
            y="10"
            width="250"
            height="270"
            stroke="#007EC1"
            fill="transparent"
            strokeWidth="1"
          />
          <line
            x2={10}
            y1={270 / 6 + 10}
            x1={260}
            y2={270 / 6 + 10}
            stroke="#007EC1"
            strokeWidth={1}
          />
          <line
            x2={10}
            y1={(2 * 270) / 6 + 10}
            x1={260}
            y2={(2 * 270) / 6 + 10}
            stroke="#007EC1"
            strokeWidth={1}
          />
          <line
            x2={10}
            y1={(3 * 270) / 6 + 10}
            x1={260}
            y2={(3 * 270) / 6 + 10}
            stroke="#007EC1"
            strokeWidth={1}
          />
          <line
            x2={10}
            y1={(4 * 270) / 6 + 10}
            x1={260}
            y2={(4 * 270) / 6 + 10}
            stroke="#007EC1"
            strokeWidth={1}
          />
          <line
            x2={10}
            y1={(5 * 270) / 6 + 10}
            x1={260}
            y2={(5 * 270) / 6 + 10}
            stroke="#007EC1"
            strokeWidth={1}
          />
          <line
            x2={250 / 2 + 10}
            y1={10}
            x1={250 / 2 + 10}
            y2={280}
            stroke="#007EC1"
            strokeWidth={1}
          />
          <text
            x="72.5"
            y="32.5"
            fontSize="10"
            textAnchor="middle"
            fontWeight="bold"
            fill="black"
          >
            Spiele
          </text>
          <text
            x="72.5"
            y="77.5"
            fontSize="10"
            textAnchor="middle"
            fill="black"
          >
            1. Spiel
          </text>
          <text
            x="72.5"
            y="122.5"
            fontSize="10"
            textAnchor="middle"
            fill="black"
          >
            2. Spiel
          </text>
          <text
            x="72.5"
            y="167.5"
            fontSize="10"
            textAnchor="middle"
            fill="black"
          >
            3. Spiel
          </text>
          <text
            x="72.5"
            y="212.5"
            fontSize="10"
            textAnchor="middle"
            fill="black"
          >
            4. Spiel
          </text>
          <text
            x="72.5"
            y="257.5"
            fontSize="10"
            textAnchor="middle"
            fill="black"
          >
            5. Spiel
          </text>
          <text
            x="197.5"
            y="32.5"
            fontSize="10"
            textAnchor="middle"
            fontWeight="bold"
            fill="black"
          >
            Amelies erzielte Tore
          </text>
          <text
            x="197.5"
            y="77.5"
            fontSize="10"
            textAnchor="middle"
            fill="black"
          >
            {data.Spiel1}
          </text>
          <text
            x="197.5"
            y="122.5"
            fontSize="10"
            textAnchor="middle"
            fill="black"
          >
            {data.Spiel2}
          </text>
          <text
            x="197.5"
            y="167.5"
            fontSize="10"
            textAnchor="middle"
            fill="black"
          >
            {data.Spiel3}
          </text>
          <text
            x="197.5"
            y="212.5"
            fontSize="10"
            textAnchor="middle"
            fill="black"
          >
            {data.Spiel4}
          </text>
          <text
            x="197.5"
            y="257.5"
            fontSize="10"
            textAnchor="middle"
            fill="black"
          >
            {data.Spiel5}
          </text>
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 2,
      duration: 2,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          //a)
          <>
            <p>Gib die Spannweite und den Median der erzielten Tore an.</p>
          </>
        )
      },
      solution({ data }) {
        const array = [
          data.Spiel1,
          data.Spiel2,
          data.Spiel3,
          data.Spiel4,
          data.Spiel5,
        ].sort((a, b) => a - b)
        return (
          <>
            <p>
              <b>Spannweite:</b> Die Spannweite ist der Abstand zwischen dem
              kleinsten und dem größten Messwert.
            </p>
            <p>
              {array[4]} - {array[0]} = {array[4] - array[0]}
            </p>
            <p>
              Die Spannweite beträgt <b>{array[4] - array[0]} Tore</b>.
            </p>
            <p>
              <b>Median:</b> Ordne die Anzahl der erzielten Tore der Größe nach:{' '}
              {array[0]}, {array[1]}, {array[2]}, {array[3]}, {array[4]}
            </p>
            <p>
              Der Median ist die Zahl, die in der Mitte liegt, also {array[2]}.
            </p>
            <p>
              Der Median beträgt <b>{array[2]} Tore.</b>
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 2,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          //b)
          <>
            <p>Berechne den Durchschnitt der erzielten Tore (pro Spiel).</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Den Durchschnitt berechnet man mit der Formel:</p>

            <p>
              {buildEquation([
                [
                  <></>,
                  <>
                    {buildInlineFrac(
                      <>Gesamtanzahl der erzielten Tore</>,
                      <>Anzahl der Spiele</>,
                    )}
                  </>,
                ],
                [
                  <>=</>,
                  <>
                    {buildInlineFrac(
                      <>
                        {data.Spiel1} + {data.Spiel2} + {data.Spiel3} +{' '}
                        {data.Spiel4} + {data.Spiel5}
                      </>,
                      5,
                    )}
                  </>,
                ],
                [
                  <>=</>,
                  <>
                    {buildInlineFrac(
                      data.Spiel1 +
                        data.Spiel2 +
                        data.Spiel3 +
                        data.Spiel4 +
                        data.Spiel5,
                      5,
                    )}{' '}
                  </>,
                ],
                [
                  <>=</>,
                  <>
                    {pp(
                      roundToDigits(
                        (data.Spiel1 +
                          data.Spiel2 +
                          data.Spiel3 +
                          data.Spiel4 +
                          data.Spiel5) /
                          5,
                        2,
                      ),
                    )}
                  </>,
                ],
              ])}
            </p>
            <p>
              <b>Antwort:</b> Der Durchschnitt beträgt{' '}
              <b>
                {pp(
                  roundToDigits(
                    (data.Spiel1 +
                      data.Spiel2 +
                      data.Spiel3 +
                      data.Spiel4 +
                      data.Spiel5) /
                      5,
                    2,
                  ),
                )}{' '}
                Tore.
              </b>
            </p>
          </>
        )
      },
    },
  ],
}
