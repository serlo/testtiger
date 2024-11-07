import { Exercise } from '@/data/types'
import { Color1, Color4, Color5 } from '@/helper/colors'
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
  duration: 30,
  generator(rng) {
    return {
      bildvariante: rng.randomIntBetween(1, 6),
      breite: rng.randomItemFromArray([6, 8, 10]),
      radius: rng.randomIntBetween(1, 2),
      buchsbaeume: rng.randomIntBetween(7, 38),
      samen: rng.randomIntBetween(2, 7),
    }
  },
  originalData: {
    bildvariante: 4,
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
              Abbildung 1: Grundriss des Gartens (nicht maßstabsgetreu)
            </span>
          </Color5>
        </center>
      </>
    )
  },
  tasks: [
    {
      points: 2,
      duration: 1,
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
                '2 Symmetrieachsen. Diese ist in der Abbildung rot eingezeichnet:'}
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
              <>
                {' '}
                <svg viewBox="0 0 328 328">
                  <image
                    href="/content/NRW_EESA/135_garten_v4_1sym_achsen.svg"
                    height="328"
                    width="328"
                  />

                  <line
                    x1="17"
                    y1="2"
                    x2="310"
                    y2="295"
                    stroke="red"
                    strokeWidth="2.5"
                  />
                </svg>
              </>
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
      points: 3,
      duration: 2,
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
              ein rechtwinkliges Dreieck.{' '}
            </p>
            <svg viewBox="0 0 328 230">
              <rect
                x="10"
                y="10"
                width={200 / Math.sqrt(2)}
                height={200 / Math.sqrt(2)}
                stroke="black"
                fill="transparent"
                strokeWidth="2"
                transform="rotate(45, 60, 130)"
              />
              <rect
                x="10"
                y="10"
                width="200"
                height="200"
                stroke="black"
                fill="transparent"
                strokeWidth="2"
              />
              <line
                x2={110}
                y1={210}
                x1={210}
                y2={210}
                stroke="red"
                strokeWidth={3}
              />
              <line
                x2={210}
                y1={110}
                x1={210}
                y2={210}
                stroke="red"
                strokeWidth={3}
              />
              <line
                x2={110}
                y1={110}
                x1={210}
                y2={210}
                stroke="red"
                strokeWidth={3}
              />
              <text
                x={164}
                y={205}
                fontSize={15}
                textAnchor="middle"
                stroke="red"
              >
                {data.breite / 2} m
              </text>
              <text
                x={230}
                y={175}
                fontSize={15}
                textAnchor="middle"
                stroke="red"
              >
                {data.breite / 2} m
              </text>
              <text
                x={110}
                y={230}
                fontSize={15}
                textAnchor="middle"
                stroke="black"
              >
                {data.breite} m
              </text>
            </svg>
            <p>In diesem gilt:</p>
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
      points: 2,
      duration: 2,
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
      points: 3,
      duration: 5,
      intro({ data }) {
        return (
          <>
            <p>
              Ausgehend vom Mittelpunkt des Gartens möchte Lisa ein
              kreisförmiges Beet mit einem Radius von {data.radius} m anlegen.
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>d) Zeichne dieses Beet maßstabsgetreu in Abbildung 1 ein.</p>
          </>
        )
      },
      solution({ data }) {
        const meter = 328 / data.breite
        return (
          <>
            <p>
              Der ganze Garten ist <Color1>{data.breite} m</Color1> breit. Das
              kreisförmige Beet hat einen Durchmesser von{' '}
              <Color1>{data.radius * 2} m</Color1>.
            </p>
            <p>Im richtigen Maßstab sieht das kreisförmige Beet so aus:</p>
            <svg width="328" height="368">
              <circle
                cx="164"
                cy="164"
                r={meter * data.radius}
                fill="none"
                stroke="black"
                strokeWidth={3}
              />
              <line
                x1={164 - meter * data.radius}
                y1={164}
                x2={164 + meter * data.radius}
                y2={164}
                stroke="#007EC1"
                strokeWidth="1"
              />
              <text
                x={164}
                y={156}
                fontSize={15}
                textAnchor="middle"
                stroke="#007EC1"
              >
                {data.radius * 2} m
              </text>
              <text
                x={164}
                y={353}
                fontSize={15}
                textAnchor="middle"
                stroke="#007EC1"
              >
                {data.breite} m
              </text>
              {data.bildvariante == 1 && (
                <image
                  href="/content/NRW_EESA/135_garten_v1_4sym.svg"
                  width={328}
                />
              )}
              {data.bildvariante == 2 && (
                <image
                  href="/content/NRW_EESA/135_garten_v2_1sym.svg"
                  width={328}
                />
              )}
              {data.bildvariante == 3 && (
                <image
                  href="/content/NRW_EESA/135_garten_v3_4sym.svg"
                  width={328}
                />
              )}
              {data.bildvariante == 4 && (
                <>
                  {' '}
                  <svg viewBox="0 0 328 328">
                    <image
                      href="/content/NRW_EESA/135_garten_v4_1sym.svg"
                      height="328"
                      width="328"
                    />
                  </svg>
                </>
              )}
              {data.bildvariante == 5 && (
                <image
                  href="/content/NRW_EESA/135_garten_v5_1sym.svg"
                  width={328}
                />
              )}
              {data.bildvariante == 6 && (
                <image
                  href="/content/NRW_EESA/135_garten_v6_1sym.svg"
                  width={328}
                />
              )}
            </svg>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 3,
      skillIntro({ data }) {
        return (
          <>
            <p>
              Ausgehend vom Mittelpunkt des Gartens möchte Lisa ein
              kreisförmiges Beet mit einem Radius von {data.radius} m anlegen.
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              e) In dem kreisförmigen Beet möchte sie eine Blumenwiese anlegen.
              Für einen Quadratmeter benötigt sie {data.samen} Gramm
              Blumensamen. Berechne, wie viel Gramm Blumensamen sie benötigt.
              Runde sinnvoll.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              <b>Beetfläche berechnen</b>
            </p>
            <p>Die Fläche des kreisförmigen Blumenbeetes beträgt:</p>
            {buildEquation([
              [<>A</>, '=', <>π · r²</>],
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
                    <span style={{ fontSize: 'small' }}>Radius einsetzen</span>
                  </Color4>
                </>,
              ],
              ['', '=', <>π · {data.radius}²</>],
              [
                <></>,
                '≈',
                <>
                  {pp(roundToDigits(Math.PI * data.radius * data.radius, 2))}{' '}
                  [m²]
                </>,
              ],
            ])}
            <p>
              <b>Benötigte Blumensamen</b>
            </p>
            <p>
              Multipliziere die Beetfläche mit den benötigten Samen für einen
              Quadratmeter:
            </p>
            <p>
              {pp(roundToDigits(Math.PI * data.radius * data.radius, 2))} ·{' '}
              {data.samen} ={' '}
              {pp(
                roundToDigits(Math.PI * data.radius * data.radius, 2) *
                  data.samen,
              )}{' '}
              ≈{' '}
              {pp(
                roundToDigits(
                  roundToDigits(Math.PI * data.radius * data.radius, 2) *
                    data.samen,
                  0,
                ),
              )}{' '}
              [g]
            </p>
            <p>
              Lisa benötigt{' '}
              <b>
                ca.{' '}
                {pp(
                  roundToDigits(
                    roundToDigits(Math.PI * data.radius * data.radius, 2) *
                      data.samen,
                    0,
                  ),
                )}{' '}
                Gramm{' '}
              </b>
              Blumensamen.{' '}
            </p>
          </>
        )
      },
    },
  ],
}
