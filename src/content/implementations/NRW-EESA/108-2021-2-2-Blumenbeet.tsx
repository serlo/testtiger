import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { buildEquation, buildSqrt } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'
import { transform } from 'next/dist/build/swc'

interface DATA {
  breite: number
  samen: number
  rabatt: number
  preis_steine: number
  preis_band: number
}

export const exercise108: Exercise<DATA> = {
  title: 'Blumenbeet',
  source: '2021 Teil 2 Aufgabe 2',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      breite: rng.randomIntBetween(8, 16) * 10,
      samen: rng.randomIntBetween(2, 7),
      rabatt: rng.randomIntBetween(1, 4) * 5,
      preis_steine: rng.randomIntBetween(300, 700) / 100,
      preis_band: rng.randomIntBetween(25, 45) / 10,
    }
  },
  originalData: {
    breite: 120,
    samen: 4,
    rabatt: 5,
    preis_steine: 5.79,
    preis_band: 3.8,
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    function rotate(
      arg0: number,
      deg: any,
    ): import('csstype').Property.Transform | undefined {
      throw new Error('Function not implemented.')
    }

    return (
      <>
        <p>
          Maria und Leon gestalten ein Beet im Garten neu. Das quadratische Beet
          teilen sie mit einer Abtrennung diagonal in zwei gleiche Dreiecke
          (Abbildung 1).
        </p>
        <svg viewBox="0 0 500 320">
          <image
            href="/content/NRW_EESA/108_blumenbeet_quadrat.svg"
            width="300"
          />
          <text x={110} y={20} fontSize={20} textAnchor="right" stroke="black">
            {data.breite} cm
          </text>
          <text
            x={295}
            y={190}
            fontSize={20}
            textAnchor="right"
            stroke="black"
            transform="rotate(-90, 295, 190)"
          >
            {data.breite} cm
          </text>
          <text
            x={110}
            y={180}
            fontSize={20}
            textAnchor="right"
            stroke="black"
            transform="rotate(-45, 110, 180)"
          >
            ca. {roundToDigits(Math.sqrt(2 * data.breite * data.breite), 0)} cm
          </text>
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              a) Bestätige durch eine Rechnung, dass die diagonale Abtrennung
              ca. {roundToDigits(Math.sqrt(2 * data.breite * data.breite), 0)}{' '}
              cm lang sein muss.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Verwende den Satz des Pythagoras. Zwei Seiten des Quadrats bilden
              mit der Diagonale d ein rechtwinkliges Dreieck. In diesem gilt:
            </p>
            {buildEquation([
              [<>a² + a²</>, '=', <>d²</>],
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
                    <span style={{ fontSize: 'small' }}>Einsetzen</span>
                  </Color4>
                </>,
              ],
              [
                <>
                  {data.breite}² + {data.breite}²
                </>,
                '=',
                <>d²</>,
              ],
              [
                <>
                  {data.breite * data.breite} + {data.breite * data.breite}
                </>,
                '=',
                <>d²</>,
              ],
              [
                <>{data.breite * data.breite + data.breite * data.breite}</>,
                '=',
                <>d²</>,
                <>| √</>,
              ],
              [
                'd',
                '=',
                <>
                  {buildSqrt(
                    data.breite * data.breite + data.breite * data.breite,
                  )}
                </>,
              ],
              [
                '',
                <>
                  {Math.sqrt(
                    data.breite * data.breite + data.breite * data.breite,
                  ) %
                    1 ==
                  0
                    ? '='
                    : '≈'}
                </>,
                <>
                  {pp(
                    roundToDigits(
                      Math.sqrt(
                        data.breite * data.breite + data.breite * data.breite,
                      ),
                      2,
                    ),
                  )}{' '}
                  [cm]
                </>,
              ],
            ])}

            <p>
              Die Diagonale d ist{' '}
              {Math.sqrt(
                data.breite * data.breite + data.breite * data.breite,
              ) %
                1 ==
              0
                ? ''
                : 'ungefähr'}{' '}
              <strong>
                {pp(
                  roundToDigits(
                    Math.sqrt(
                      data.breite * data.breite + data.breite * data.breite,
                    ),
                    0,
                  ),
                )}{' '}
                cm
              </strong>{' '}
              lang.
            </p>
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
        return <></>
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
