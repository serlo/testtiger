import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp, ppPolynom } from '@/helper/pretty-print'

interface DATA {
  m_1: number
  b_1: number
  m_2: number
  b_2: number
  m_3: number
  b_3: number
  m_b: number
  b_b: number
  order: number[]
}

export const exercise23: Exercise<DATA> = {
  title: 'Gerade im Koordinatensystem',
  source: '2021 Variante 1 / 4',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      m_1: rng.randomIntBetween(-4, 3) / 2,
      b_1: rng.randomIntBetween(-2, 4) / 2,
      m_2: rng.randomIntBetween(-4, 3) / 2,
      b_2: rng.randomIntBetween(-2, 4) / 2,
      m_3: rng.randomIntBetween(-3, 3) / 2,
      b_3: rng.randomIntBetween(-2, 3) / 2,
      m_b: rng.randomIntBetween(-6, 6) / 2,
      b_b: rng.randomIntBetween(-8, 6) / 2,
      order: rng.shuffleArray([0, 1, 2]),
    }
  },
  constraint({ data }) {
    return (
      data.m_1 != 0 &&
      data.m_1 != data.m_2 &&
      data.m_2 != 0 &&
      data.m_2 != data.m_3 &&
      data.m_3 != 0 &&
      data.m_3 != data.m_1 &&
      data.m_1 * -5 + data.b_1 < 5 &&
      data.m_2 * -5 + data.b_2 < 5 &&
      data.m_3 * -5 + data.b_3 < 5 &&
      data.m_1 * -5 + data.b_1 > -2 &&
      data.m_2 * -5 + data.b_2 > -2 &&
      data.m_3 * -5 + data.b_3 > -2
    )
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
  subtasks: {
    intro: ({ data }) => {
      return <></>
    },
    tasks: [
      ({ data }) => {
        // Liste der Elemente
        const listItems = [
          <li key="1">
            y ={' '}
            {ppPolynom([
              [data.m_1, 'x', 1],
              [data.b_1, 'x', 0],
            ])}
          </li>,
          <li key="2">
            y ={' '}
            {ppPolynom([
              [data.m_2, 'x', 1],
              [data.b_2, 'x', 0],
            ])}
          </li>,
          <li key="3">
            y ={' '}
            {ppPolynom([
              [data.m_3, 'x', 1],
              [data.b_3, 'x', 0],
            ])}
          </li>,
        ]

        // Gemischte Liste der Elemente
        const shuffledItems = data.order.map(i => listItems[i])

        return (
          <>
            <svg viewBox="0 0 500 450">
              <image
                href="/content/NRW_MSA_KS_Vorlage.png"
                height="500"
                width="500"
              />
              <line
                x1={0}
                y1={338 - (380 / 7.6) * (data.m_1 * -5 + data.b_1)}
                x2={500}
                y2={338 - (380 / 7.6) * (data.m_1 * 5 + data.b_1)}
                stroke="blue"
                strokeWidth={4}
              />
              <line
                x1={0}
                y1={338 - (380 / 7.6) * (data.m_2 * -5 + data.b_2)}
                x2={500}
                y2={338 - (380 / 7.6) * (data.m_2 * 5 + data.b_2)}
                stroke="green"
                strokeWidth={4}
              />
              <line
                x1={0}
                y1={338 - (380 / 7.6) * (data.m_3 * -5 + data.b_3)}
                x2={500}
                y2={338 - (380 / 7.6) * (data.m_3 * 5 + data.b_3)}
                stroke="orange"
                strokeWidth={4}
              />
              <text
                x={150}
                y={338 - (380 / 7.6) * (data.m_1 * -2 + data.b_1)}
                fontSize={40}
                textAnchor="right"
                stroke="blue"
              >
                f
              </text>
              <text
                x={250}
                y={300 - (380 / 7.6) * (data.m_2 * 0 + data.b_2)}
                fontSize={40}
                textAnchor="right"
                stroke="green"
              >
                g
              </text>
              <text
                x={250}
                y={350 - (380 / 7.6) * (data.m_3 * 1 + data.b_3)}
                fontSize={40}
                textAnchor="right"
                stroke="orange"
              >
                h
              </text>
            </svg>
            <p>
              a) Ordne die abgebildeten Funktionsgraphen von f, g und h den
              angegebenen Gleichungen zu.
            </p>
            <ul>{shuffledItems}</ul>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              b) Gib eine lineare Gleichung an, die zu folgender Wertetabelle
              passt:{' '}
            </p>
            <svg viewBox="0 0 700 500" className="h-[170px]">
              <image
                href="/content/NRW_MSA_Wertetabelle_2.png"
                height="500"
                width="700"
              />
              <text
                x={230}
                y={320}
                fontSize={40}
                textAnchor="right"
                stroke="black"
              >
                {pp(0 * data.m_b + data.b_b)}
              </text>
              <text
                x={420}
                y={320}
                fontSize={40}
                textAnchor="right"
                stroke="black"
              >
                {pp(1 * data.m_b + data.b_b)}
              </text>
              <text
                x={590}
                y={320}
                fontSize={40}
                textAnchor="right"
                stroke="black"
              >
                {pp(2 * data.m_b + data.b_b)}
              </text>
            </svg>
          </>
        )
      },
    ],
    solutions: [
      ({ data }) => {
        return (
          <>
            <p>Vergleiche die Steigungen und y-Achsenabschnitte der Graphen.</p>
            <p>
              Die korrekte Zuordnung ist: <br></br>
            </p>
            <ul>
              <li>
                f: y ={' '}
                {ppPolynom([
                  [data.m_1, 'x', 1],
                  [data.b_1, 'x', 0],
                ])}
              </li>

              <li>
                g: y ={' '}
                {ppPolynom([
                  [data.m_2, 'x', 1],
                  [data.b_2, 'x', 0],
                ])}
              </li>

              <li>
                h: y ={' '}
                {ppPolynom([
                  [data.m_3, 'x', 1],
                  [data.b_3, 'x', 0],
                ])}
              </li>
            </ul>
          </>
        )
      },
      ({ data }) => {
        const y_2 = pp(1 * data.m_b + data.b_b)
        return (
          <>
            <p>Der Funktionsterm hat allgemein die Form y = mx + b. </p>
            <p>
              Dabei steht m für die Steigung der Geraden und b für den
              y-Achsenabschnitt.
            </p>
            <p>
              <br></br>Aus der Wertetabelle kannst du den Wert des
              y-Achsenabschnitts bei x = 0 ablesen: b = {data.b_b}
            </p>
            <p>
              Aus den Punkten {'(0|' + data.b_b + ')'} und{' '}
              {'(1|' + pp(1 * data.m_b + data.b_b) + ')'} folgt, dass die Gerade
              eine Steigung von m = {pp(data.m_b)} haben muss. Das kannst du
              auch mit der Punkt-Steigungs-Formel berechnen:
            </p>
            <p>
              m = {buildInlineFrac(y_2 + ' − ' + data.b_b, '1 − 0')} ={' '}
              {pp(data.m_b)}
            </p>
          </>
        )
      },
    ],
  },
}
