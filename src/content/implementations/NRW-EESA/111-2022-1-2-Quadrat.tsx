import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  seite: number
}

export const exercise111: Exercise<DATA> = {
  title: 'Quadrat',
  source: '2022 Teil 1 Aufgabe 2',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return { seite: rng.randomIntBetween(2, 9) }
  },
  originalData: { seite: 3 },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return null
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return (
          <>
            <svg width="320" height="160" xmlns="http://www.w3.org/2000/svg">
              <image
                href="/content/NRW_EESA/111_Quadrat.PNG"
                width="328"
                height="150"
              />
              <text
                x="164"
                y="160"
                fontSize="15"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                {data.seite} cm
              </text>
            </svg>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>a) Berechne den Flächeninhalt des abgebildeten Quadrats.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Berechne den Flächeninhalt mit der Formel:</p>
            {buildEquation([
              [<>A</>, <>=</>, <>a²</>],
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
                      Seitenlänge a einsetzen
                    </span>
                  </Color4>
                </>,
              ],
              [<></>, <>=</>, <>{data.seite}²</>],
              [
                <></>,
                <>=</>,
                <>
                  <strong>{data.seite * data.seite} [cm²]</strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>b) Berechne die Länge der Diagonalen d.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Zwei Seiten des Quadrats bilden mit der Diagonale ein
              rechtwinkliges Dreieck:
            </p>
            <svg width="320" height="160" xmlns="http://www.w3.org/2000/svg">
              <image
                href="/content/NRW_EESA/111_Quadrat.PNG"
                width="328"
                height="150"
              />
              <text
                x="164"
                y="160"
                fontSize="15"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                {data.seite} cm
              </text>
              <line
                x1={94}
                y1={144}
                x2={234}
                y2={144}
                stroke="green"
                strokeWidth={2}
              />
              <line
                x1={233}
                y1={5}
                x2={233}
                y2={144}
                stroke="green"
                strokeWidth={2}
              />
              <line
                x1={95}
                y2={5}
                x2={233}
                y1={144}
                stroke="green"
                strokeWidth={2}
              />
            </svg>
            <p>
              Berechne die Länge der Diagonale d mit dem Satz des Pythagoras:
            </p>
            {buildEquation([
              [
                <>d²</>,
                <>=</>,
                <>
                  {data.seite}² + {data.seite}²
                </>,
              ],
              [<>d²</>, <>=</>, <>{data.seite * data.seite * 2}</>, <>| √</>],
              [
                <>d</>,
                <>
                  {Math.sqrt(data.seite * data.seite * 2) % 1 == 0 ? '=' : '≈'}
                </>,
                <>
                  <strong>
                    {pp(
                      roundToDigits(Math.sqrt(data.seite * data.seite * 2), 2),
                    )}{' '}
                    [cm]
                  </strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
  ],
}