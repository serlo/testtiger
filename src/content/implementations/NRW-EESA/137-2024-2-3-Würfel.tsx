import { Exercise } from '@/data/types'
import { Color4, Color5 } from '@/helper/colors'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  kante: number
  case: number
  ml: number
  surface: number
}

export const exercise137: Exercise<DATA> = {
  title: 'Würfel',
  source: '2024 Teil 2 Aufgabe 3',
  useCalculator: true,
  duration: 24,
  generator(rng) {
    return {
      kante: rng.randomIntBetween(2, 4),
      case: rng.randomIntBetween(1, 2),
      ml: rng.randomIntBetween(3, 9) * 50,
      surface: rng.randomIntBetween(6, 12) * 50,
    }
  },
  originalData: { kante: 2, case: 1, ml: 250, surface: 5000 },
  learningPathData: { kante: 4, case: 2, ml: 300, surface: 400 },
  constraint({ data }) {
    return data.ml != data.surface
  },
  intro({ data }) {
    return (
      <>
        <p>
          Selma hat eine Kiste mit kleinen Würfeln aus Holz (Abbildung 1). Jeder
          Würfel hat eine Kantenlänge von {data.kante} cm.
        </p>
        <center>
          <svg viewBox="0 0 328 130">
            <image
              href="/content/NRW_EESA/137_Würfel.webp"
              height="130"
              width="328"
            />
          </svg>

          <Color5>
            <span style={{ fontSize: 'small' }}>
              Abbildung 1: Würfel aus Holz
            </span>
          </Color5>
        </center>
      </>
    )
  },
  tasks: [
    {
      points: 2,
      duration: 4,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          //a)
          <>
            <p>Berechne das Volumen eines kleinen Würfels.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Verwende die Formel für das Volumen eines Würfels:</p>
            {buildEquation([
              [<>V</>, <>=</>, <>a³</>],
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
                      Kantenlänge {data.kante} cm einsetzen
                    </span>
                  </Color4>
                </>,
              ],

              [<></>, <>=</>, <>{data.kante}³</>],
              [
                <></>,
                <>=</>,
                <>
                  <strong>{Math.pow(data.kante, 3)} [cm³]</strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 2,
      duration: 4,
      intro({ data }) {
        return (
          <>
            <p>
              Selma baut aus {data.case == 1 && <>acht</>}
              {data.case == 2 && <>27</>} kleinen Würfeln einen größeren Würfel
              und aus {data.case == 1 && <>acht</>}
              {data.case == 2 && <>27</>} weiteren Würfeln einen Quader
              (Abbildung 2).
            </p>
            <center>
              {data.case == 1 && (
                <svg viewBox="0 0 328 130">
                  <image
                    href="/content/NRW_EESA/137_Würfel2.PNG"
                    height="130"
                    width="328"
                  />
                </svg>
              )}
              {data.case == 2 && (
                <svg viewBox="0 0 328 130">
                  <image
                    href="/content/NRW_EESA/137_Würfel3.PNG"
                    height="130"
                    width="328"
                  />
                </svg>
              )}
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 2: Würfel (links) und Quader (rechts) jeweils aus
                  acht kleineren Würfeln
                </span>
              </Color5>
            </center>
          </>
        )
      },
      task({ data }) {
        return (
          //b)
          <>
            <p>
              Das Volumen des Quaders und das Volumen des größeren Würfels sind
              gleich groß. Begründe.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Jeder kleine Würfel besitzt ein Volumen von{' '}
              {Math.pow(data.kante, 3)} cm³. Da beide Körper aus der gleichen
              Anzahl von kleinen Würfeln bestehen, haben sie das gleiche
              Volumen.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 4,
      intro({ data }) {
        return (
          <>
            <p></p>
          </>
        )
      },
      task({ data }) {
        return (
          //c)
          <>
            <p>
              Die Oberflächen der beiden Körper sind unterschiedlich groß.
              Begründe.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die kleinen Würfel sind bei den Körpern unterschiedlich angeordnet
              und zeigen unterschiedliche Teile ihrer Oberfläche. Damit ist die
              Oberfläche der Körper insgesamt nicht gleich. und zeigen
              unterschiedliche Teile ihrer Oberfläche.
            </p>
            <p>
              Die Oberfläche des Würfels besteht aus 24 Quadraten, die
              Oberfläche des Quaders besteht aus 28 Quadraten. Daher ist die
              Oberfläche des Quaders größer.
            </p>
            <ul>
              <li>
                Bei der Würfelanordnung zeigt jeder kleine Würfel 2 oder 3
                Seiten.{' '}
              </li>
              <li>
                Bei der Anordnung als Quader zeigen die kleinen Würfel bis zu 4
                ihrer Seiten.
              </li>
            </ul>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 6,
      intro({ data }) {
        return (
          <>
            <p>
              Als nächstes baut Selma aus {data.case == 1 ? <>27</> : <>64</>}{' '}
              kleinen Würfeln einen großen Würfel. Dieser hat eine Kantenlänge
              von {data.kante * (2 + data.case)} cm. Die sechs Außenflächen des
              großen Würfels lackiert Selma blau (Abbildung 3).
            </p>
            <center>
              {data.case == 1 ? (
                <svg viewBox="0 0 328 130">
                  <image
                    href="/content/NRW_EESA/137_Würfel4.PNG"
                    height="130"
                    width="328"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 328 130">
                  <image
                    href="/content/NRW_EESA/137_Würfel5.PNG"
                    height="130"
                    width="328"
                  />
                </svg>
              )}

              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 3: großer Würfel mit lackierten Außenflächen
                </span>
              </Color5>
            </center>
          </>
        )
      },
      task({ data }) {
        return (
          //d)
          <>
            <p>
              {data.ml} ml Lack reichen etwa für {data.surface} cm². Berechne,
              wie viel Milliliter (ml) Lack sie benötigt.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              <strong>Oberfläche des Würfels</strong>
            </p>
            <p>
              Der große Würfel hat eine Kantenlänge von{' '}
              {data.kante * (2 + data.case)} cm.
            </p>
            <p>Bereche die Oberfläche mit der Formel für den Würfel:</p>
            {buildEquation([
              [<>O</>, <>=</>, <>6 · a²</>],
              [<></>, <>=</>, <>6 · {data.kante * (2 + data.case)}²</>],
              [
                <></>,
                <>=</>,
                <>
                  {6 *
                    (data.kante * (2 + data.case)) *
                    (data.kante * (2 + data.case))}{' '}
                  [cm²]
                </>,
              ],
            ])}
            <p>
              <strong>Menge an Lack</strong>
            </p>
            <p>
              {data.ml} ml Lack reichen für {data.surface} cm² Oberfläche.
            </p>
            <p>Rechne mit dem Dreisatz:</p>
            {buildEquation([
              [<>{data.ml} ml</>, <>≙</>, <>{data.surface} cm²</>],
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
                    <span style={{ fontSize: 'small' }}>: {data.surface}</span>
                  </Color4>
                </>,
              ],
              [
                <>{pp(roundToDigits(data.ml / data.surface, 4))} ml</>,
                <>≙</>,
                <>1 cm²</>,
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
                      ·{' '}
                      {pp(
                        6 *
                          (data.kante * (2 + data.case)) *
                          (data.kante * (2 + data.case)),
                      )}
                    </span>
                  </Color4>
                </>,
              ],
              [
                <>
                  {pp(
                    roundToDigits(
                      (6 *
                        (data.kante * (2 + data.case)) *
                        (data.kante * (2 + data.case)) *
                        data.ml) /
                        data.surface,
                      4,
                    ),
                  )}{' '}
                  ml
                </>,
                <>≙</>,
                <>
                  {6 *
                    (data.kante * (2 + data.case)) *
                    (data.kante * (2 + data.case))}{' '}
                  cm²
                </>,
              ],
            ])}
            <p>
              Selma benötigt ca.{' '}
              <strong>
                {pp(
                  roundToDigits(
                    (6 *
                      (data.kante * (2 + data.case)) *
                      (data.kante * (2 + data.case)) *
                      data.ml) /
                      data.surface,
                    2,
                  ),
                )}{' '}
                ml
              </strong>{' '}
              Lack.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 4,
      skillIntro({ data }) {
        return (
          <>
            <p>
              Als nächstes baut Selma aus {data.case == 1 ? <>27</> : <>64</>}{' '}
              kleinen Würfeln einen großen Würfel. Dieser hat eine Kantenlänge
              von {data.kante * (2 + data.case)} cm. Die sechs Außenflächen des
              großen Würfels lackiert Selma blau (Abbildung 3).
            </p>

            {data.case == 1 ? (
              <svg viewBox="0 0 328 130">
                <image
                  href="/content/NRW_EESA/137_Würfel4.PNG"
                  height="130"
                  width="328"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 328 130">
                <image
                  href="/content/NRW_EESA/137_Würfel5.PNG"
                  height="130"
                  width="328"
                />
              </svg>
            )}
          </>
        )
      },
      intro({ data }) {
        return (
          <>
            <p>
              Durch die Lackierung unterscheiden sich die{' '}
              {data.case == 1 ? <>27</> : <>64</>} kleinen Würfel. Sie haben
              unterschiedlich viele blaue Außenflächen. Selma zählt die Anzahl
              gleicher Würfel und trägt sie in eine Tabelle ein.
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          //e)
          <>
            <p>Vervollständige Selmas Tabelle.</p>
            <svg width="320" height="130" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="10"
                y="10"
                width="300"
                height="88"
                rx="4"
                ry="4"
                stroke="#007EC1"
                fill="transparent"
                strokeWidth="1"
              />

              <line
                x1="10"
                y1="32"
                x2="310"
                y2="32"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="10"
                y1="78"
                x2="310"
                y2="78"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="10"
                y1="54"
                x2="310"
                y2="54"
                stroke="#007EC1"
                strokeWidth="1"
              />

              <line
                x1="250"
                y1="10"
                x2="250"
                y2="98"
                stroke="#007EC1"
                strokeWidth="1"
              />

              <text x="15" y="26" fontSize="10" textAnchor="left" fill="black">
                genau drei blaue Außenflächen
              </text>
              <text x="15" y="48" fontSize="10" textAnchor="left" fill="black">
                genau zwei blaue Außenflächen
              </text>
              <text x="255" y="48" fontSize="10" textAnchor="left" fill="black">
                {data.case == 1 ? <>12</> : <>32</>} Würfel
              </text>
              <text x="15" y="70" fontSize="10" textAnchor="left" fill="black">
                genau eine blaue Außenfläche
              </text>
              <text x="15" y="92" fontSize="10" textAnchor="left" fill="black">
                keine blaue Außenfläche
              </text>
              <text
                x="164"
                y="26"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              ></text>
              <text
                x="280"
                y="48"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
              <text
                x="280"
                y="70"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
              <text
                x="197.5"
                y="70"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
              <text
                x="197.5"
                y="92"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
              <text
                x="197.5"
                y="114"
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
            <p>Zähle die Würfel mithilfe der Abbildung 3.</p>
            <svg width="320" height="130" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="10"
                y="10"
                width="300"
                height="88"
                rx="4"
                ry="4"
                stroke="#007EC1"
                fill="transparent"
                strokeWidth="1"
              />

              <line
                x1="10"
                y1="32"
                x2="310"
                y2="32"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="10"
                y1="78"
                x2="310"
                y2="78"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="10"
                y1="54"
                x2="310"
                y2="54"
                stroke="#007EC1"
                strokeWidth="1"
              />

              <line
                x1="250"
                y1="10"
                x2="250"
                y2="98"
                stroke="#007EC1"
                strokeWidth="1"
              />

              <text x="15" y="26" fontSize="10" textAnchor="left" fill="black">
                genau drei blaue Außenflächen
              </text>
              <text x="255" y="26" fontSize="10" textAnchor="left" fill="black">
                {data.case == 1 ? <>8</> : <>8</>} Würfel
              </text>
              <text x="15" y="48" fontSize="10" textAnchor="left" fill="black">
                genau zwei blaue Außenflächen
              </text>
              <text x="255" y="48" fontSize="10" textAnchor="left" fill="black">
                {data.case == 1 ? <>12</> : <>32</>} Würfel
              </text>
              <text x="15" y="70" fontSize="10" textAnchor="left" fill="black">
                genau eine blaue Außenfläche
              </text>
              <text x="255" y="70" fontSize="10" textAnchor="left" fill="black">
                {data.case == 1 ? <>6</> : <>16</>} Würfel
              </text>
              <text x="15" y="92" fontSize="10" textAnchor="left" fill="black">
                keine blaue Außenfläche
              </text>
              <text x="255" y="92" fontSize="10" textAnchor="left" fill="black">
                {data.case == 1 ? <>1</> : <>8</>} Würfel
              </text>
              <text
                x="164"
                y="26"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              ></text>
              <text
                x="280"
                y="48"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
              <text
                x="280"
                y="70"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
              <text
                x="197.5"
                y="70"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
              <text
                x="197.5"
                y="92"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
              <text
                x="197.5"
                y="114"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
            </svg>
          </>
        )
      },
    },
    {
      points: 1,
      duration: 2,
      skillIntro({ data }) {
        return (
          <>
            <p>
              Als nächstes baut Selma aus {data.case == 1 ? <>27</> : <>64</>}{' '}
              kleinen Würfeln einen großen Würfel. Dieser hat eine Kantenlänge
              von {data.kante * (2 + data.case)} cm. Die sechs Außenflächen des
              großen Würfels lackiert Selma blau (Abbildung 3).
            </p>

            {data.case == 1 ? (
              <svg viewBox="0 0 328 130">
                <image
                  href="/content/NRW_EESA/137_Würfel4.PNG"
                  height="130"
                  width="328"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 328 130">
                <image
                  href="/content/NRW_EESA/137_Würfel5.PNG"
                  height="130"
                  width="328"
                />
              </svg>
            )}
            <p>
              Durch die Lackierung unterscheiden sich die{' '}
              {data.case == 1 ? <>27</> : <>64</>} kleinen Würfel. Sie haben
              unterschiedlich viele blaue Außenflächen. Selma zählt die Anzahl
              gleicher Würfel und trägt sie in eine Tabelle ein.
            </p>
            <svg width="320" height="130" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="10"
                y="10"
                width="300"
                height="88"
                rx="4"
                ry="4"
                stroke="#007EC1"
                fill="transparent"
                strokeWidth="1"
              />

              <line
                x1="10"
                y1="32"
                x2="310"
                y2="32"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="10"
                y1="78"
                x2="310"
                y2="78"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="10"
                y1="54"
                x2="310"
                y2="54"
                stroke="#007EC1"
                strokeWidth="1"
              />

              <line
                x1="250"
                y1="10"
                x2="250"
                y2="98"
                stroke="#007EC1"
                strokeWidth="1"
              />

              <text x="15" y="26" fontSize="10" textAnchor="left" fill="black">
                genau drei blaue Außenflächen
              </text>
              <text x="255" y="26" fontSize="10" textAnchor="left" fill="black">
                {data.case == 1 ? <>8</> : <>8</>} Würfel
              </text>
              <text x="15" y="48" fontSize="10" textAnchor="left" fill="black">
                genau zwei blaue Außenflächen
              </text>
              <text x="255" y="48" fontSize="10" textAnchor="left" fill="black">
                {data.case == 1 ? <>12</> : <>32</>} Würfel
              </text>
              <text x="15" y="70" fontSize="10" textAnchor="left" fill="black">
                genau eine blaue Außenfläche
              </text>
              <text x="255" y="70" fontSize="10" textAnchor="left" fill="black">
                {data.case == 1 ? <>6</> : <>16</>} Würfel
              </text>
              <text x="15" y="92" fontSize="10" textAnchor="left" fill="black">
                keine blaue Außenfläche
              </text>
              <text x="255" y="92" fontSize="10" textAnchor="left" fill="black">
                {data.case == 1 ? <>1</> : <>8</>} Würfel
              </text>
              <text
                x="164"
                y="26"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              ></text>
              <text
                x="280"
                y="48"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
              <text
                x="280"
                y="70"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
              <text
                x="197.5"
                y="70"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
              <text
                x="197.5"
                y="92"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
              <text
                x="197.5"
                y="114"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              ></text>
            </svg>
          </>
        )
      },
      task({ data }) {
        return (
          //f)
          <>
            <p>
              Selma mischt die {data.case == 1 ? <>27</> : <>64</>} kleinen
              Würfel und nimmt ohne hinzusehen einen Würfel. Bestimme die
              Wahrscheinlichkeit, dass der Würfel genau zwei blaue Außenflächen
              hat.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Das zufällige Ziehen eines der Würfel entspricht einem
              Laplace-Experiment.
            </p>

            <p>
              Berechne die Wahrscheinlichkeit mit der Formel für das
              Laplace-Experiment und verwende die Tabelle aus Teilaufgabe (e):
            </p>
            {buildEquation([
              [
                <>p</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>Würfel mit genau zwei blauen Flächen</>,
                    <>Anzahl aller Würfel</>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{data.case == 1 ? <>12</> : <>32</>}</>,
                    <>{data.case == 1 ? <>27</> : <>64</>}</>,
                  )}
                </>,
              ],
              [
                <></>,
                <>
                  <strong>=</strong>
                </>,
                <>
                  <strong>
                    {data.case == 1 ? (
                      <>{ppFrac(12 / 27)}</>
                    ) : (
                      <>{ppFrac(32 / 64)}</>
                    )}
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
