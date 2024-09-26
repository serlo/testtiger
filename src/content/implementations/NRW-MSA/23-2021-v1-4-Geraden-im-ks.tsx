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
      data.m_1 * -4 + data.b_1 < 5.5 &&
      data.m_2 * -4 + data.b_2 < 5.5 &&
      data.m_3 * -4 + data.b_3 < 5.5 &&
      data.m_1 * -4 + data.b_1 > -2.5 &&
      data.m_2 * -4 + data.b_2 > -2.5 &&
      data.m_3 * -4 + data.b_3 > -2.5
    )
  },
  intro({ data }) {
    return <></>
  },
  tasks: [
    {
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
              <rect
                x={50 - 15} // x-Position leicht nach links verschoben, um Platz für den Text zu schaffen
                y={338 - (380 / 7.6) * (data.m_1 * -3 + data.b_1) - 25} // y-Position angepasst, um den Text zu umschließen
                width={40} // Breite des Rechtecks, angepasst an die Textgröße
                height={30} // Höhe des Rechtecks, angepasst an die Textgröße
                fill="#DDEAF0" // Hellblauer Hintergrund
                rx={6} // Abgerundete Ecken mit einem Radius von 8px
              />
              <text
                x={50}
                y={338 - (380 / 7.6) * (data.m_1 * -3 + data.b_1)}
                fontSize={25}
                textAnchor="right"
                fill="blue"
              >
                f
              </text>
              <rect
                x={150 - 13} // x-Position leicht nach links verschoben, um Platz für den Text zu schaffen
                y={338 - (380 / 7.6) * (data.m_2 * -2.4 + data.b_2) - 20} // y-Position angepasst, um den Text zu umschließen
                width={40} // Breite des Rechtecks, angepasst an die Textgröße
                height={30} // Höhe des Rechtecks, angepasst an die Textgröße
                fill="#C6DEC7" // Hellgrüner Hintergrund
                rx={6} // Abgerundete Ecken mit einem Radius von 8px
              />
              <text
                x={150}
                y={338 - (380 / 7.6) * (data.m_2 * -2.4 + data.b_2)}
                fontSize={25}
                textAnchor="right"
                fill="green" // Textfarbe Grün
              >
                g
              </text>
              <rect
                x={250 - 13} // x-Position leicht nach links verschoben, um Platz für den Text zu schaffen
                y={350 - (380 / 7.6) * (data.m_3 * 0 + data.b_3) - 25} // y-Position angepasst, um den Text zu umschließen
                width={40} // Breite des Rechtecks, angepasst an die Textgröße
                height={30} // Höhe des Rechtecks, angepasst an die Textgröße
                fill="#F7E5CB" // Hellgelber Hintergrund
                rx={6} // Abgerundete Ecken mit einem Radius von 8px
              />
              <text
                x={250}
                y={350 - (380 / 7.6) * (data.m_3 * 0 + data.b_3)}
                fontSize={25}
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
    },
    {
      task({ data }) {
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
      solution({ data }) {
        const y_2 = 1 * data.m_b + data.b_b
        return (
          <>
            <p>Der Funktionsterm hat allgemein die Form </p>
            <p>y = mx + b. </p>
            <p>
              Dabei steht m für die Steigung der Geraden und b für den
              y-Achsenabschnitt.
            </p>
            <p>
              <br></br>Aus der Wertetabelle kannst du den Wert des
              y-Achsenabschnitts bei x = 0 ablesen: b = {pp(data.b_b)}
            </p>
            <p>
              Aus den Punkten {'(0|' + pp(data.b_b) + ')'} und{' '}
              {'(1|' + pp(y_2) + ')'} folgt, dass die Gerade eine Steigung von m
              = {pp(data.m_b)} haben muss. Das kannst du auch mit der
              Punkt-Steigungs-Formel berechnen:
            </p>
            <p>
              m ={' '}
              {buildInlineFrac(
                pp(y_2, 'embrace_neg') + ' − ' + pp(data.b_b, 'embrace_neg'),
                '1 − 0',
              )}{' '}
              = {pp(data.m_b)}
            </p>
          </>
        )
      },
    },
  ],
}
