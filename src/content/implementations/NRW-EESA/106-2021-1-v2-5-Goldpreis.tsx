import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  preis: number
  faktor: number
  radius: number
  weight: number
}

export const exercise106: Exercise<DATA> = {
  title: 'Goldpreis',
  source: '2021 Teil 1 Variante 2 Aufgabe 5',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {
      preis: rng.randomIntBetween(4000, 5000) / 100,
      faktor: 2,
      weight: rng.randomIntBetween(180, 200) / 10,
      radius: rng.randomIntBetween(3, 9),
    }
  },
  originalData: { preis: 48.46, faktor: 2, weight: 19.8, radius: 2.5 },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Im Dezember 2020 kosteten 1 g Gold <br></br>
          {pp(data.preis)} €.
        </p>
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
              a) Ergänze in der Tabelle die fehlenden Werte dieser
              proportionalen Zuordnung.
            </p>
            <svg width="320" height="81" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="10"
                y="10"
                width="260"
                height="22"
                fill="#D2ECF6"
                stroke="none"
              />

              <rect
                x="10"
                y="10"
                width="260"
                height="44"
                rx="4"
                ry="4"
                stroke="#007EC1"
                fill="transparent"
                strokeWidth="1"
              />

              <line
                x1="10"
                y1="32"
                x2="270"
                y2="32"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="220"
                y1="10"
                x2="220"
                y2="54"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="70"
                y1="10"
                x2="70"
                y2="54"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="120"
                y1="10"
                x2="120"
                y2="54"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="170"
                y1="10"
                x2="170"
                y2="54"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <text
                x="40"
                y="25"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                Gold [g]
              </text>
              <text
                x="145"
                y="25"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                1
              </text>
              <text
                x="245"
                y="25"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                1000
              </text>
              <text
                x="252"
                y="37"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              ></text>
              <text
                x="41"
                y="47"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                Preis [€]
              </text>
              <text
                x="110"
                y="70"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
              <text
                x="146"
                y="47"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                {pp(data.preis)}
              </text>
              <text
                x="196"
                y="47"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                {pp(data.preis * data.faktor)}
              </text>
              <text
                x="96"
                y="25"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                0,5
              </text>
              <text
                x="160"
                y="48"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
              <text
                x="160"
                y="70"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
              <text
                x="160"
                y="92"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
              <text
                x="160"
                y="114"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
              <text
                x="160"
                y="136"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
            </svg>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Ein Gramm Gold kostet {pp(data.preis)} €. Berechne die fehlenden
              Werte mit dem Dreisatz:
            </p>
            <ul>
              <li>
                {buildEquation([
                  [<>1 g</>, <>≙</>, <>{pp(data.preis)} €</>],
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
                        <span style={{ fontSize: 'small' }}>: 2</span>
                      </Color4>
                    </>,
                  ],
                  [
                    <>0,5 g</>,
                    <>≙</>,
                    <>
                      <strong>{pp(roundToDigits(data.preis / 2, 2))} €</strong>
                    </>,
                  ],
                  [<></>, <></>, <></>],
                ])}
              </li>
              <p></p>
              <li>
                {buildEquation([
                  [<>1 g</>, <>≙</>, <>{pp(data.preis)} €</>],
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
                        <span style={{ fontSize: 'small' }}>· 1000</span>
                      </Color4>
                    </>,
                  ],
                  [
                    <>1000 g</>,
                    <>≙</>,
                    <>
                      <strong>
                        {pp(roundToDigits(data.preis * 1000, 2))} €
                      </strong>
                    </>,
                  ],
                  [<></>, <></>, <></>],
                ])}
              </li>
              <p></p>
              <li>
                {buildEquation([
                  [<>1 g</>, <>≙</>, <>{pp(data.preis)} €</>],
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
                          · {data.faktor}
                        </span>
                      </Color4>
                    </>,
                  ],
                  [
                    <>
                      <strong>2 g</strong>
                    </>,
                    <>≙</>,
                    <>{pp(roundToDigits(data.preis * data.faktor, 2))} €</>,
                  ],
                ])}
              </li>
            </ul>
            <p>Trage diese Werte in die Tabelle ein:</p>
            <svg width="320" height="81" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="10"
                y="10"
                width="260"
                height="22"
                fill="#D2ECF6"
                stroke="none"
              />

              <rect
                x="10"
                y="10"
                width="260"
                height="44"
                rx="4"
                ry="4"
                stroke="#007EC1"
                fill="transparent"
                strokeWidth="1"
              />

              <line
                x1="10"
                y1="32"
                x2="270"
                y2="32"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="220"
                y1="10"
                x2="220"
                y2="54"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="70"
                y1="10"
                x2="70"
                y2="54"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="120"
                y1="10"
                x2="120"
                y2="54"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="170"
                y1="10"
                x2="170"
                y2="54"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <text
                x="40"
                y="25"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                Gold [g]
              </text>
              <text
                x="145"
                y="25"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                1
              </text>
              <text
                x="195"
                y="25"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                {data.faktor}
              </text>
              <text
                x="245"
                y="25"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                1000
              </text>

              <text
                x="41"
                y="47"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                Preis [€]
              </text>

              <text
                x="146"
                y="47"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                {pp(data.preis)}
              </text>
              <text
                x="196"
                y="47"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                {pp(data.preis * data.faktor)}
              </text>
              <text
                x="245"
                y="47"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                {pp(data.preis * 1000)}
              </text>
              <text
                x="95"
                y="47"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                {pp(roundToDigits(data.preis / 2, 1))}
              </text>
              <text
                x="96"
                y="25"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                0,5
              </text>
            </svg>
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
              b) Eine Kugel aus Gold hat einen Radius von {pp(data.radius)} cm.
              Ein Kubikzentimeter [cm³] Gold wiegt {pp(data.weight)} g. Berechne
              das Volumen dieser Kugel aus Gold.
            </p>
          </>
        )
      },
      solution({ data }) {
        const volume =
          (4 / 3) * Math.PI * data.radius * data.radius * data.radius
        return (
          <>
            <p>
              Für das Volumen der Kugel wird nur der Radius der Kugel benötigt.
              Berechne mit der Formel:
            </p>
            {buildEquation([
              [<>V</>, <>=</>, <>{ppFrac(4 / 3)} · π · r³</>],
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
              [
                <></>,
                <>=</>,
                <>
                  {ppFrac(4 / 3)} · π · {pp(data.radius)}³
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  <strong>{pp(roundToDigits(volume, 2))} [cm³]</strong>
                </>,
              ],
            ])}
            <p>
              Die Kugel hat ein Volumen von<br></br>{' '}
              <strong>{pp(roundToDigits(volume, 2))} cm³</strong>.
            </p>
          </>
        )
      },
    },
  ],
}
