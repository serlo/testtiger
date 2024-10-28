import { Exercise } from '@/data/types'
import { Color4, Color5 } from '@/helper/colors'
import { buildEquation, buildSqrt } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  bildvariante: number
  breite: number
  radius: number
  buchsbaeume: number
  samen: number
}

export const exercise135: Exercise<DATA> = {
  title: 'Garten',
  source: '2024 Teil 2 Aufgabe 1',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      bildvariante: rng.randomIntBetween(1, 6),
      breite: rng.randomItemFromArray([2, 4, 6, 8, 10]),
      radius: rng.randomIntBetween(1, 2),
      buchsbaeume: rng.randomIntBetween(7, 38),
      samen: rng.randomIntBetween(2, 7),
    }
  },
  originalData: {
    bildvariante: 1,
    breite: 8,
    radius: 2,
    buchsbaeume: 38,
    samen: 3,
  },
  constraint({ data }) {
    return data.breite != data.radius && data.buchsbaeume / data.breite < 7
  },
  intro({ data }) {
    return (
      <>
        <p>
          Lisa arbeitet als Gärtnerin. Im Rahmen eines Projektes plant sie den
          Grundriss eines quadratischen Gartens. Dieser Garten soll
          achsensymmetrisch sein (Abbildung 1).
        </p>
        {data.bildvariante == 1 && (
          <svg viewBox="0 0 500 600">
            <image
              href="/content/NRW_EESA/135_garten_v1_4sym.svg"
              width="500"
            />
            <text
              x={230}
              y={570}
              fontSize={20}
              textAnchor="right"
              stroke="black"
            >
              {data.breite} m
            </text>
            <text
              x={420}
              y={530}
              fontSize={20}
              textAnchor="right"
              stroke="black"
            >
              {data.radius} m
            </text>
          </svg>
        )}

        {data.bildvariante == 2 && (
          <svg viewBox="0 0 500 600">
            <image
              href="/content/NRW_EESA/135_garten_v2_1sym.svg"
              width="500"
            />
            <text
              x={230}
              y={570}
              fontSize={20}
              textAnchor="right"
              stroke="black"
            >
              {data.breite} m
            </text>
            <text
              x={420}
              y={530}
              fontSize={20}
              textAnchor="right"
              stroke="black"
            >
              {data.radius} m
            </text>
          </svg>
        )}
        {data.bildvariante == 3 && (
          <svg viewBox="0 0 500 600">
            <image
              href="/content/NRW_EESA/135_garten_v3_4sym.svg"
              width="500"
            />
            <text
              x={230}
              y={570}
              fontSize={20}
              textAnchor="right"
              stroke="black"
            >
              {data.breite} m
            </text>
            <text
              x={420}
              y={530}
              fontSize={20}
              textAnchor="right"
              stroke="black"
            >
              {data.radius} m
            </text>
          </svg>
        )}
        {data.bildvariante == 4 && (
          <svg viewBox="0 0 500 600">
            <image
              href="/content/NRW_EESA/135_garten_v4_1sym.svg"
              width="500"
            />
            <text
              x={230}
              y={570}
              fontSize={20}
              textAnchor="right"
              stroke="black"
            >
              {data.breite} m
            </text>
            <text
              x={420}
              y={530}
              fontSize={20}
              textAnchor="right"
              stroke="black"
            >
              {data.radius} m
            </text>
          </svg>
        )}
        {data.bildvariante == 5 && (
          <svg viewBox="0 0 500 600">
            <image
              href="/content/NRW_EESA/135_garten_v5_1sym.svg"
              width="500"
            />
            <text
              x={230}
              y={570}
              fontSize={20}
              textAnchor="right"
              stroke="black"
            >
              {data.breite} m
            </text>
            <text
              x={420}
              y={530}
              fontSize={20}
              textAnchor="right"
              stroke="black"
            >
              {data.radius} m
            </text>
          </svg>
        )}
        {data.bildvariante == 6 && (
          <svg viewBox="0 0 500 600">
            <image
              href="/content/NRW_EESA/135_garten_v6_1sym.svg"
              width="500"
            />
            <text
              x={230}
              y={570}
              fontSize={20}
              textAnchor="right"
              stroke="black"
            >
              {data.breite} m
            </text>
            <text
              x={420}
              y={530}
              fontSize={20}
              textAnchor="right"
              stroke="black"
            >
              {data.radius} m
            </text>
          </svg>
        )}

        <center>
          <Color5>
            <span style={{ fontSize: 'small' }}>
              Abbildung 1: Grundriss des Gartens (maßstabsgetreu)
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
        return null
      },
      task({ data }) {
        return (
          <>
            <p>a) Gib die Anzahl der Symmetrieachsen des Gartens an.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Der Garten hat{' '}
              {data.bildvariante == 1 &&
                '4 Symmetrieachsen. Diese sind in der Abbildung rot eingezeichnet:'}
              {data.bildvariante == 2 &&
                '1 Symmetrieachse. Diese ist in der Abbildung rot eingezeichnet:'}
              {data.bildvariante == 3 &&
                '4 Symmetrieachsen. Diese sind in der Abbildung rot eingezeichnet:'}
              {data.bildvariante == 4 &&
                '1 Symmetrieachse. Diese ist in der Abbildung rot eingezeichnet:'}
              {data.bildvariante == 5 &&
                '1 Symmetrieachse. Diese ist in der Abbildung rot eingezeichnet:'}
              {data.bildvariante == 6 &&
                '1 Symmetrieachse. Diese ist in der Abbildung rot eingezeichnet:'}
            </p>
            {data.bildvariante == 1 && (
              <img
                src="/content/NRW_EESA/135_garten_v1_4sym_achsen.svg"
                width={328}
                alt=""
              />
            )}
            {data.bildvariante == 2 && (
              <img
                src="/content/NRW_EESA/135_garten_v2_1sym_achsen.svg"
                width={328}
                alt=""
              />
            )}
            {data.bildvariante == 3 && (
              <img
                src="/content/NRW_EESA/135_garten_v3_4sym_achsen.svg"
                width={328}
                alt=""
              />
            )}
            {data.bildvariante == 4 && (
              <img
                src="/content/NRW_EESA/135_garten_v4_1sym_achsen.svg"
                width={328}
                alt=""
              />
            )}
            {data.bildvariante == 5 && (
              <img
                src="/content/NRW_EESA/135_garten_v5_1sym_achsen.svg"
                width={328}
                alt=""
              />
            )}
            {data.bildvariante == 6 && (
              <img
                src="/content/NRW_EESA/135_garten_v6_1sym_achsen.svg"
                width={328}
                alt=""
              />
            )}
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
            <p>
              b) Bestätige durch eine Rechnung, dass die Seitenlänge des inneren
              Quadrats ca.{' '}
              {pp(
                roundToDigits(
                  Math.sqrt(2 * (data.breite / 2) * (data.breite / 2)),
                  1,
                ),
              )}{' '}
              m beträgt.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            {' '}
            <p>
              Verwende den Satz des Pythagoras. Die Seiten des inneren Quadrats
              bilden mit jeweils zwei halben Außenkanten des äußeren Quadrats
              ein rechtwinkliges Dreieck. In diesem gilt:
            </p>
            {buildEquation([
              [
                <>
                  {data.breite / 2}² + {pp(data.breite / 2)}²
                </>,
                '=',
                <>a²</>,
              ],
              [
                <>
                  {((data.breite / 2) * data.breite) / 2} +{' '}
                  {pp(((data.breite / 2) * data.breite) / 2)}
                </>,
                '=',
                <>a²</>,
              ],
              [
                <>
                  {((data.breite / 2) * data.breite) / 2 +
                    ((data.breite / 2) * data.breite) / 2}
                </>,
                '=',
                <>a²</>,
                <>| √</>,
              ],
              [
                'a',
                '=',
                <>
                  {buildSqrt(
                    ((data.breite / 2) * data.breite) / 2 +
                      ((data.breite / 2) * data.breite) / 2,
                  )}
                </>,
              ],
              [
                '',
                <>
                  {Math.sqrt((((data.breite / 2) * data.breite) / 2) * 2) % 1 ==
                  0
                    ? '='
                    : '≈'}
                </>,
                <>
                  <b>
                    {pp(
                      roundToDigits(
                        Math.sqrt((((2 * data.breite) / 2) * data.breite) / 2),
                        1,
                      ),
                    )}{' '}
                    [m]
                  </b>
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
            <p>
              c) Auf den Seiten des inneren Quadrats werden Buchsbäume im
              Abstand von{' '}
              {pp(
                roundToDigits(
                  (100 *
                    roundToDigits(
                      Math.sqrt((((2 * data.breite) / 2) * data.breite) / 2),
                      1,
                    )) /
                    data.buchsbaeume,
                  1,
                ),
              )}{' '}
              cm gepflanzt. Berechne die Anzahl der Buchsbäume.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die Seiten des inneren Quadrats sind insgesamt 4 ·{' '}
              {pp(
                roundToDigits(
                  Math.sqrt((((2 * data.breite) / 2) * data.breite) / 2),
                  1,
                ),
              )}{' '}
              m ={' '}
              {pp(
                4 *
                  roundToDigits(
                    Math.sqrt((((2 * data.breite) / 2) * data.breite) / 2),
                    1,
                  ),
              )}{' '}
              m ={' '}
              {pp(
                100 *
                  4 *
                  roundToDigits(
                    Math.sqrt((((2 * data.breite) / 2) * data.breite) / 2),
                    1,
                  ),
              )}{' '}
              cm lang.
            </p>
            <p>Teile dies durch den Abstand der Buchsbäume:</p>{' '}
            <p>
              {pp(
                100 *
                  4 *
                  roundToDigits(
                    Math.sqrt((((2 * data.breite) / 2) * data.breite) / 2),
                    1,
                  ),
              )}{' '}
              :{' '}
              {pp(
                roundToDigits(
                  (100 *
                    roundToDigits(
                      Math.sqrt((((2 * data.breite) / 2) * data.breite) / 2),
                      1,
                    )) /
                    data.buchsbaeume,
                  1,
                ),
              )}{' '}
              ≈{' '}
              {pp(
                roundToDigits(
                  (100 *
                    4 *
                    roundToDigits(
                      Math.sqrt((((2 * data.breite) / 2) * data.breite) / 2),
                      1,
                    )) /
                    roundToDigits(
                      (100 *
                        roundToDigits(
                          Math.sqrt(
                            (((2 * data.breite) / 2) * data.breite) / 2,
                          ),
                          1,
                        )) /
                        data.buchsbaeume,
                      1,
                    ),
                  0,
                ),
              )}
            </p>
            <p>
              Lisa benötigt{' '}
              <b>
                {pp(
                  roundToDigits(
                    (100 *
                      4 *
                      roundToDigits(
                        Math.sqrt((((2 * data.breite) / 2) * data.breite) / 2),
                        1,
                      )) /
                      roundToDigits(
                        (100 *
                          roundToDigits(
                            Math.sqrt(
                              (((2 * data.breite) / 2) * data.breite) / 2,
                            ),
                            1,
                          )) /
                          data.buchsbaeume,
                        1,
                      ),
                    0,
                  ),
                )}{' '}
                Buchsbäume
              </b>{' '}
              für das innere Quadrat.
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
