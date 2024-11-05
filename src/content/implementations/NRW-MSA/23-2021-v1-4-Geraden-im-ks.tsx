import { Exercise } from '@/data/types'
import { Color1, Color2, Color3 } from '@/helper/colors'
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
  source: '2021 Teil 1 Aufgabe 4',
  useCalculator: false,
  duration: 4,
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
  originalData: {
    m_1: -0.5,
    b_1: 2,
    m_2: 0.5,
    b_2: 3,
    m_3: 2,
    b_3: 3,
    m_b: 1.5,
    b_b: 2,
    order: [],
  },
  constraint({ data }) {
    return (
      data.m_b != 0 &&
      data.m_1 != 0 &&
      data.m_1 != data.m_2 &&
      data.m_2 != 0 &&
      data.m_2 != data.m_3 &&
      data.m_3 != 0 &&
      data.m_3 != data.m_1 && // Damit die Geraden unterschiedliche Steigungen haben, die nicht 0 sind
      data.m_1 * -4 + data.b_1 < 5.5 &&
      data.m_2 * -4 + data.b_2 < 5.5 &&
      data.m_3 * -4 + data.b_3 < 5.5 &&
      data.m_1 * -4 + data.b_1 > -2.5 &&
      data.m_2 * -4 + data.b_2 > -2.5 &&
      data.m_3 * -4 + data.b_3 > -2.5 && // Damit die Geraden inkl Beschriftung auch im Bild sind
      Math.abs(
        338 -
          (380 / 7.6) * (data.m_1 * -4 + data.b_1) -
          (338 - (380 / 7.6) * (data.m_2 * -4 + data.b_2)),
      ) > 30 &&
      Math.abs(
        338 -
          (380 / 7.6) * (data.m_3 * -4 + data.b_3) -
          (338 - (380 / 7.6) * (data.m_2 * -4 + data.b_2)),
      ) > 30 &&
      Math.abs(
        338 -
          (380 / 7.6) * (data.m_1 * -4 + data.b_1) -
          (338 - (380 / 7.6) * (data.m_3 * -4 + data.b_3)),
      ) > 30
    )
  },
  intro({ data }) {
    return <></>
  },
  tasks: [
    {
      duration: 3,
      points: 2,
      task({ data }) {
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
                href="/content/NRW_MSA/NRW_MSA_KS_Vorlage.png"
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
              <rect
                x={70 - 7} // x-Position leicht nach links verschoben, um Platz für den Text zu schaffen
                y={338 - (380 / 7.6) * (data.m_1 * -3.6 + data.b_1) - 16} // y-Position angepasst, um den Text zu umschließen
                width={20} // Breite des Rechtecks, angepasst an die Textgröße
                height={20} // Höhe des Rechtecks, angepasst an die Textgröße
                fill="#DDEAF0" // Hellblauer Hintergrund
                rx={6} // Abgerundete Ecken mit einem Radius von 8px
              />
              <text
                x={70}
                y={338 - (380 / 7.6) * (data.m_1 * -3.6 + data.b_1)}
                fontSize={14}
                textAnchor="right"
                fill="blue"
              >
                f
              </text>
              <rect
                x={40 - 6} // x-Position leicht nach links verschoben, um Platz für den Text zu schaffen
                y={338 - (380 / 7.6) * (data.m_2 * -4 + data.b_2) - 13} // y-Position angepasst, um den Text zu umschließen
                width={20} // Breite des Rechtecks, angepasst an die Textgröße
                height={20} // Höhe des Rechtecks, angepasst an die Textgröße
                fill="#C6DEC7" // Hellgrüner Hintergrund
                rx={6} // Abgerundete Ecken mit einem Radius von 8px
              />
              <text
                x={40}
                y={338 - (380 / 7.6) * (data.m_2 * -4 + data.b_2)}
                fontSize={14}
                textAnchor="right"
                fill="green" // Textfarbe Grün
              >
                g
              </text>
              <rect
                x={60 - 7} // x-Position leicht nach links verschoben, um Platz für den Text zu schaffen
                y={350 - (380 / 7.6) * (data.m_3 * -3.8 + data.b_3) - 15} // y-Position angepasst, um den Text zu umschließen
                width={20} // Breite des Rechtecks, angepasst an die Textgröße
                height={20} // Höhe des Rechtecks, angepasst an die Textgröße
                fill="#F7E5CB" // Hellgelber Hintergrund
                rx={6} // Abgerundete Ecken mit einem Radius von 8px
              />
              <text
                x={60}
                y={350 - (380 / 7.6) * (data.m_3 * -3.8 + data.b_3)}
                fontSize={14}
                textAnchor="right"
                fill="orange"
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
      solution({ data }) {
        return (
          <>
            <p>Vergleiche die Steigungen und y-Achsenabschnitte der Graphen.</p>
            <p>
              Die korrekte Zuordnung ist: <br></br>
            </p>
            <ul>
              <li>
                <Color1>
                  f: y ={' '}
                  {ppPolynom([
                    [data.m_1, 'x', 1],
                    [data.b_1, 'x', 0],
                  ])}
                </Color1>
              </li>

              <li>
                <Color2>
                  g: y ={' '}
                  {ppPolynom([
                    [data.m_2, 'x', 1],
                    [data.b_2, 'x', 0],
                  ])}
                </Color2>
              </li>

              <li>
                <Color3>
                  h: y ={' '}
                  {ppPolynom([
                    [data.m_3, 'x', 1],
                    [data.b_3, 'x', 0],
                  ])}
                </Color3>
              </li>
            </ul>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 3,
      task({ data }) {
        return (
          <>
            <p>
              b) Gib eine lineare Gleichung an, die zu folgender Wertetabelle
              passt:{' '}
            </p>
            <svg width="300" height="100" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="10"
                y="10"
                width="70"
                height="80"
                fill="#D2ECF6"
                stroke="none"
                ry="10"
              />
              <rect
                x="10"
                y="10"
                width="280"
                height="80"
                rx="10"
                ry="10"
                stroke="#007Ec1"
                fill="transparent"
                strokeWidth="2"
              />

              <line
                x1="80"
                y1="10"
                x2="80"
                y2="90"
                stroke="#007EC1"
                strokeWidth="2"
              />
              <line
                x1="150"
                y1="10"
                x2="150"
                y2="90"
                stroke="#007EC1"
                strokeWidth="2"
              />
              <line
                x1="220"
                y1="10"
                x2="220"
                y2="90"
                stroke="#007EC1"
                strokeWidth="2"
              />
              <line
                x1="10"
                y1="50"
                x2="290"
                y2="50"
                stroke="#007EC1"
                strokeWidth="2"
              />

              <text
                x="45"
                y="35"
                font-size="16"
                text-anchor="middle"
                font-weight="bold"
              >
                x
              </text>
              <text x="115" y="35" font-size="16" text-anchor="middle">
                0
              </text>
              <text x="185" y="35" font-size="16" text-anchor="middle">
                1
              </text>
              <text x="255" y="35" font-size="16" text-anchor="middle">
                2
              </text>

              <text
                x="45"
                y="75"
                font-size="16"
                text-anchor="middle"
                fill="black"
                font-weight="bold"
              >
                y
              </text>
              <text
                x="115"
                y="75"
                font-size="16"
                text-anchor="middle"
                fill="black"
              >
                {pp(0 * data.m_b + data.b_b)}
              </text>
              <text
                x="185"
                y="75"
                font-size="16"
                text-anchor="middle"
                fill="#black"
              >
                {pp(1 * data.m_b + data.b_b)}
              </text>
              <text
                x="255"
                y="75"
                font-size="16"
                text-anchor="middle"
                fill="black"
              >
                {pp(2 * data.m_b + data.b_b)}
              </text>
            </svg>
          </>
        )
      },
      solution({ data }) {
        const y_2 = 1 * data.m_b + data.b_b
        return (
          <>
            <p>Der Funktionsterm hat allgemein die Form: </p>
            <p>y = mx + b </p>
            <ul>
              <li>
                <p>
                  Aus der Wertetabelle kannst du den Wert des y-Achsenabschnitts
                  bei x = 0 ablesen: <strong>b = {pp(data.b_b)}</strong>
                </p>
              </li>
              <li>
                <p>
                  Aus den Punkten {'(0|' + pp(data.b_b) + ')'} und{' '}
                  {'(1|' + pp(y_2) + ')'} folgt, dass die Gerade eine Steigung
                  von m = {pp(data.m_b)} haben muss. Das kannst du auch mit der
                  Punkt-Steigungs-Formel berechnen:
                </p>
                <p>
                  m ={' '}
                  {buildInlineFrac(
                    pp(y_2, 'embrace_neg') +
                      ' − ' +
                      pp(data.b_b, 'embrace_neg'),
                    '1 − 0',
                  )}{' '}
                  = {pp(data.m_b)}
                </p>
              </li>
            </ul>
            <p>
              Damit passt die Gleichung{' '}
              <strong>
                y ={' '}
                {ppPolynom([
                  [data.m_b, 'x', 1],
                  [data.b_b, 'x', 0],
                ])}
              </strong>{' '}
              zur Wertetabelle.
            </p>
          </>
        )
      },
    },
  ],
}
