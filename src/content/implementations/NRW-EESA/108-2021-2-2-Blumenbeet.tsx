import { Exercise } from '@/data/types'
import { Color4, Color5 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'
import build from 'next/dist/build'
import { transform } from 'next/dist/build/swc'

interface DATA {
  breite: number
  samen: number
  rabatt: number
  preis_steine: number
  preis_band: number
  steine: number
}

export const exercise108: Exercise<DATA> = {
  title: 'Blumenbeet',
  source: '2021 Teil 2 Aufgabe 2',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    return {
      breite: rng.randomIntBetween(8, 16) * 10,
      samen: rng.randomIntBetween(2, 7),
      rabatt: rng.randomIntBetween(1, 4) * 5,
      preis_steine: rng.randomIntBetween(300, 700) / 100,
      preis_band: rng.randomIntBetween(25, 45) / 10,
      steine: rng.randomIntBetween(2, 5),
    }
  },
  originalData: {
    breite: 120,
    samen: 4,
    rabatt: 5,
    preis_steine: 5.79,
    preis_band: 3.8,
    steine: 2,
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
      points: 3,
      duration: 2,
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
      points: 2,
      duration: 2,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const saat =
          0.5 *
          Math.ceil((0.5 * (data.breite / 100) * (data.breite / 100)) / 0.5)
        return (
          <>
            <p>
              b) In das obere Dreieck säen sie Samen von Sommerblumen. Eine
              Packung Samen reicht für {pp(saat)} m². Zeige mit einer Rechnung,
              dass eine Packung ausreicht.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Berechne den Flächeninhalt des oberen Dreiecks. Die Katheten a
              haben die Länge {data.breite} cm = {pp(data.breite / 100)} m.
            </p>
            {buildEquation([
              [<>A</>, <>=</>, <>{ppFrac(1 / 2)} · a · a</>],
              [
                <></>,
                <>=</>,
                <>
                  {ppFrac(1 / 2)} · {pp(data.breite / 100)} ·{' '}
                  {pp(data.breite / 100)}
                </>,
              ],
              [
                <></>,
                <>
                  <strong>=</strong>
                </>,
                <>
                  <strong>
                    {pp(0.5 * (data.breite / 100) * (data.breite / 100))} [m²]
                  </strong>
                </>,
              ],
            ])}
            <p>Die Packung reicht damit für die Fläche.</p>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 2,
      intro({ data }) {
        return (
          <>
            <p>
              Maria und Leon erweitern das quadratische Beet um einen Kreis. Der
              Kreis verläuft durch die vier Eckpunkte des Quadrats. Die
              Kreislinie gestalten sie mit einem Metallband. Die Flächen
              zwischen Quadrat und Kreislinie sollen mit Kieselsteinen bedeckt
              werden (Abbildung 2).
            </p>
            <svg viewBox="0 0 328 250">
              <image
                href="/content/NRW_EESA/108_Blumenbeet2.PNG"
                width="328"
                height="250"
              />
              <text
                x={110}
                y={180}
                fontSize={15}
                textAnchor="right"
                stroke="black"
                transform="rotate(-45, 100, 150)"
              >
                ca. {roundToDigits(Math.sqrt(2 * data.breite * data.breite), 0)}{' '}
                cm
              </text>
            </svg>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              c) Zeige rechnerisch, dass das Metallband ca.{' '}
              {pp(
                roundToDigits(
                  (Math.PI *
                    Math.round(Math.sqrt(2 * data.breite * data.breite))) /
                    100,
                  2,
                ),
              )}{' '}
              m lang sein muss.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Die Diagonale entspricht dem Durchmesser des Kreises.</p>
            <p>Berechne den Umfang mit der Formel:</p>
            {buildEquation([
              [<>U</>, <>=</>, <>π · d</>],
              [
                <></>,
                <>=</>,
                <>
                  π ·{' '}
                  {roundToDigits(Math.sqrt(2 * data.breite * data.breite), 0)}
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  {pp(
                    roundToDigits(
                      Math.PI *
                        Math.round(Math.sqrt(2 * data.breite * data.breite)),
                      2,
                    ),
                  )}{' '}
                  [cm]
                </>,
              ],
            ])}
            <p>
              Der Umfang beträgt{' '}
              <strong>
                {pp(
                  roundToDigits(
                    (Math.PI *
                      Math.round(Math.sqrt(2 * data.breite * data.breite))) /
                      100,
                    2,
                  ),
                )}{' '}
                m
              </strong>
              .
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
          <>
            <p>
              d) Berechne den Flächeninhalt der mit Kieselsteinen bedeckten
              Fläche.
            </p>
          </>
        )
      },
      solution({ data }) {
        const d = roundToDigits(
          Math.sqrt(data.breite * data.breite + data.breite * data.breite),
          0,
        )

        return (
          <>
            <p>
              Die mit Kieselsteinen bedeckten Fläche ist die Fläche des Kreises,
              abzüglich der Fläche des Quadrats.
            </p>
            <p> Berechne die Kreisfläche mit der Formel:</p>
            {buildEquation([
              [
                <>
                  A<sub>Kreis</sub>
                </>,
                <>=</>,
                <>π · r²</>,
              ],
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
                      Halber Durchmesser einsetzen
                    </span>
                  </Color4>
                </>,
              ],
              [<></>, <>=</>, <>π · {pp(d / 2)}²</>],
              [
                <></>,
                <>≈</>,
                <>{pp(roundToDigits((d / 2) * (d / 2) * Math.PI, 2))} [cm²]</>,
              ],
            ])}
            <p>Die Fläche des Quadrats mit der Seitenlänge a beträgt:</p>
            {buildEquation([
              [
                <>
                  A<sub>Quadrat</sub>
                </>,
                <>=</>,
                <>a²</>,
              ],
              [<></>, <>=</>, <>{data.breite}²</>],
              [<></>, <>=</>, <>{data.breite * data.breite} [cm²]</>],
            ])}
            <p>Damit ist die Fläche mit den Kieselsteinen:</p>
            <p>
              {pp(roundToDigits((d / 2) * (d / 2) * Math.PI, 2))} −{' '}
              {data.breite * data.breite} ={' '}
              {roundToDigits((d / 2) * (d / 2) * Math.PI, 2) -
                data.breite * data.breite}{' '}
              [cm²] ≈{' '}
              <strong>
                {pp(
                  roundToDigits(
                    (roundToDigits((d / 2) * (d / 2) * Math.PI, 2) -
                      data.breite * data.breite) /
                      10000,
                    2,
                  ),
                )}{' '}
                [m²]
              </strong>
            </p>
            <p>
              Die Fläche beträgt{' '}
              <strong>
                {pp(
                  roundToDigits(
                    (roundToDigits((d / 2) * (d / 2) * Math.PI, 2) -
                      data.breite * data.breite) /
                      10000,
                    2,
                  ),
                )}{' '}
                m²
              </strong>
              .
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 2,
      intro({ data }) {
        return (
          <>
            <p>
              Maria und Leon kaufen {data.steine} Säcke mit Kieselsteinen und{' '}
              {Math.ceil(
                roundToDigits(
                  (Math.PI *
                    Math.round(Math.sqrt(2 * data.breite * data.breite))) /
                    100,
                  2,
                ),
              )}{' '}
              m Metallband (Preise in Abbildung 3). Mit einem Gutschein erhalten
              sie {data.rabatt} % Rabatt.
            </p>
            <svg viewBox="0 0 328 70">
              <image
                href="/content/NRW_EESA/108_Blumenbeet3.PNG"
                width="328"
                height="70"
              />
              <text
                x={150}
                y={25}
                fontSize={15}
                textAnchor="left"
                stroke="black"
              >
                {pp(data.preis_band)} € pro m
              </text>
              <text
                x={150}
                y={53}
                fontSize={15}
                textAnchor="left"
                stroke="black"
              >
                {pp(data.preis_steine)} € pro Sack
              </text>
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 3: Preise für das Metallband und die Kieselsteine
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
              e) Berechne, wie viel Maria und Leon für {data.steine} Säcke
              Kieselsteine und{' '}
              {Math.ceil(
                roundToDigits(
                  (Math.PI *
                    Math.round(Math.sqrt(2 * data.breite * data.breite))) /
                    100,
                  2,
                ),
              )}{' '}
              m Metallband bezahlen müssen.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Berechne die Kosten jeweils:</p>
            <ul>
              <li>
                Metallband:{' '}
                {Math.ceil(
                  roundToDigits(
                    (Math.PI *
                      Math.round(Math.sqrt(2 * data.breite * data.breite))) /
                      100,
                    2,
                  ),
                )}{' '}
                · {pp(data.preis_band)} ={' '}
                {pp(
                  data.preis_band *
                    Math.ceil(
                      roundToDigits(
                        (Math.PI *
                          Math.round(
                            Math.sqrt(2 * data.breite * data.breite),
                          )) /
                          100,
                        2,
                      ),
                    ),
                )}{' '}
                [€]
              </li>
              <li>
                Kieselsteine: {data.steine} · {pp(data.preis_steine)} ={' '}
                {pp(data.steine * data.preis_steine)} [€]
              </li>
            </ul>
            <p>Rechne die Kosten zusammen:</p>
            <p>
              {pp(
                data.preis_band *
                  Math.ceil(
                    roundToDigits(
                      (Math.PI *
                        Math.round(Math.sqrt(2 * data.breite * data.breite))) /
                        100,
                      2,
                    ),
                  ),
              )}{' '}
              + {pp(data.steine * data.preis_steine)} ={' '}
              <strong>
                {pp(
                  data.preis_band *
                    Math.ceil(
                      roundToDigits(
                        (Math.PI *
                          Math.round(
                            Math.sqrt(2 * data.breite * data.breite),
                          )) /
                          100,
                        2,
                      ),
                    ) +
                    data.steine * data.preis_steine,
                )}{' '}
                [€]
              </strong>
            </p>
            <p>
              Maria und Leon bezahlen{' '}
              <strong>
                {pp(
                  data.preis_band *
                    Math.ceil(
                      roundToDigits(
                        (Math.PI *
                          Math.round(
                            Math.sqrt(2 * data.breite * data.breite),
                          )) /
                          100,
                        2,
                      ),
                    ) +
                    data.steine * data.preis_steine,
                )}{' '}
                €
              </strong>
              .
            </p>
          </>
        )
      },
    },
  ],
}
