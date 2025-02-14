import { Exercise } from '@/data/types'
import { Color1, Color4, Color5 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  item_1: number
  item_2: number
  item_3: number
  order: Array<number>
  a: number
}
const richtig = [
  '/content/NRW_EESA/109_Kasimir6.PNG',
  '/content/NRW_EESA/109_Kasimir10.PNG',
  ,
]

const falsch = [
  '/content/NRW_EESA/109_Kasimir4.PNG',
  '/content/NRW_EESA/109_Kasimir5.PNG',
  '/content/NRW_EESA/109_Kasimir7.PNG',
  '/content/NRW_EESA/109_Kasimir8.PNG',
  '/content/NRW_EESA/109_Kasimir9.PNG',
]
export const exercise109: Exercise<DATA> = {
  title: 'Kasimir bastelt',
  source: '2021 Teil 2 Aufgabe 3',
  useCalculator: true,
  duration: 22,
  generator(rng) {
    return {
      item_1: rng.randomIntBetween(0, 1),
      item_2: rng.randomIntBetween(0, 4),
      item_3: rng.randomIntBetween(0, 4),
      order: rng.shuffleArray([0, 1, 2]),
      a: rng.randomIntBetween(6, 12),
    }
  },
  originalData: { item_1: 0, item_2: 2, item_3: 1, order: [1, 2, 0], a: 10 },
  learningPathData: { item_1: 0, item_2: 2, item_3: 1, order: [1, 2, 0], a: 8 },
  exampleData: { item_1: 0, item_2: 2, item_3: 1, order: [1, 2, 0], a: 9 },
  constraint({ data }) {
    return data.item_2 != data.item_3
  },
  intro({ data }) {
    const h = roundToDigits(
      Math.sqrt(data.a * data.a - (data.a * data.a) / 4),
      1,
    )
    return (
      <>
        <p>
          Kasimir zeichnet ein gleichseitiges Dreieck mit der Seitenlänge a ={' '}
          {data.a} cm und einer Höhe h = {pp(h)} cm (Abbildung 1).
        </p>
        <svg viewBox="0 0 328 180">
          <image
            href="/content/NRW_EESA/109_Kasimir1.svg"
            height="180"
            width="328"
          />
        </svg>
        <center>
          <Color5>
            <span style={{ fontSize: 'small' }}>
              Abbildung 1: gleichseitiges Dreieck
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
        const h = roundToDigits(
          Math.sqrt(data.a * data.a - (data.a * data.a) / 4),
          1,
        )
        const surface = (h * data.a) / 2
        return (
          //a)
          <>
            <p>
              Bestätige durch eine Rechnung, dass der Flächeninhalt des Dreiecks{' '}
              {pp(roundToDigits(surface, 2))} cm² beträgt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const h = roundToDigits(
          Math.sqrt(data.a * data.a - (data.a * data.a) / 4),
          1,
        )
        const surface = (h * data.a) / 2
        return (
          <>
            <p>Berechne den Flächeninhalt des Dreiecks mit der Formel:</p>
            {buildEquation([
              [<>A</>, <>=</>, <>{ppFrac(1 / 2)} · a · h</>],
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
                      setze a = {data.a} und h = {pp(h)} ein
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {ppFrac(1 / 2)} · {data.a} · {pp(h)}
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  <strong>
                    {pp(roundToDigits(0.5 * data.a * h, 2))} [cm²]
                  </strong>
                </>,
              ],
            ])}
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
              Kasimir markiert auf jeder Dreiecksseite den Mittelpunkt. Die
              Mittelpunkte verbindet er. Es entstehen vier gleiche kleine
              Dreiecke (Abbildung 2).
            </p>
            <svg viewBox="0 0 328 140">
              <image
                href="/content/NRW_EESA/109_Kasimir2.svg"
                height="140"
                width="328"
              />
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 2: Einteilung des Dreiecks
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
              Zeichne die Figur (Abbildung 2) mit den Originalmaßen auf ein
              DIN-A4-Blatt.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Zeichne die Grundlinie des Dreiecks mit der Seitenlänge a ={' '}
              {data.a} cm:
            </p>

            <>
              {/* Wir erweitern den ViewBox etwas, damit das Lineal auch Platz hat */}
              <svg viewBox="0 0 328 40">
                <image
                  href="/content/NRW_EESA/109_Konstruktion1.svg"
                  x="85"
                  y="6"
                  height="20"
                  width="158"
                />

                {/* Das Lineal: eine horizontale Linie mit Tick-Marks */}
                <g id="ruler">
                  {/* Horizontale Linie, die das Lineal darstellt */}
                  <line
                    x1="85"
                    y1="20"
                    x2="243" /* 85 + 158 = 243 */
                    y2="20"
                    stroke="lightgrey"
                    strokeWidth="1"
                  />
                  {Array.from({ length: Number(data.a) + 1 }, (_, i) => {
                    const xPos = 85 + i * (158 / data.a)
                    return (
                      <g key={i}>
                        <line
                          x1={xPos}
                          y1="20"
                          x2={xPos}
                          y2={i % 5 === 0 ? '30' : '25'} // Längere Tick-Marks alle 5 cm
                          stroke="lightgrey"
                          strokeWidth="1"
                        />
                        {i % 5 === 0 && (
                          <text
                            x={xPos}
                            y="38"
                            fontSize="8"
                            textAnchor="middle"
                            fill="lightgrey"
                          >
                            {i} cm
                          </text>
                        )}
                      </g>
                    )
                  })}
                </g>

                {/* Beschriftung unter dem Lineal */}
                <text
                  x={140}
                  y="8"
                  fontSize="11"
                  textAnchor="right"
                  fill="black"
                >
                  a = {data.a} cm
                </text>
              </svg>
            </>
            <hr style={{ margin: '10px 0' }} />
            <p>
              In einem gleichseitigen Dreieck sind alle drei Winkel 60° groß.
              Zeichne die anderen Seiten in einem Winkel von 60° an die
              Grundlinie:
            </p>
            <svg viewBox="0 0 328 170">
              {/* Geodreieck einfügen */}
              <image
                href="/content/grafiken_allgemein/Geodreieck.svg"
                // Transformationsreihenfolge:
                // 1. Verschiebe das Geodreieck, sodass der untere Mittelpunkt (halfWidth, originalHeight) am Ursprung liegt.
                // 2. Skaliere mit scaleFactor.
                // 3. Verschiebe es, sodass der Ursprung auf (164, 6) liegt.
                transform={`translate(86,163) scale(${(158 * 18) / (data.a * 1279)}) translate(-${1279 / 2}, -${642})`}
              />
              <image
                href="/content/NRW_EESA/109_Konstruktion2.svg"
                x="85"
                y="6"
                height="158"
                width="158"
              />
            </svg>
            <p></p>
            <svg viewBox="0 0 328 170">
              <image
                href="/content/NRW_EESA/109_Konstruktion3.svg"
                x="85"
                y="6"
                height="158"
                width="158"
              />
            </svg>
            <hr style={{ margin: '10px 0' }} />
            <p>
              Verbinde zu einem Dreieck. <br></br>Markiere die Mittelpunkte der
              Seiten bei <br></br>
              {data.a} cm : 2 = {pp(data.a / 2)} cm:
            </p>
            <svg viewBox="0 0 328 160">
              <image
                href="/content/NRW_EESA/109_Konstruktion4.svg"
                x="85"
                y="6"
                height="148"
                width="158"
              />
              <text
                x={110}
                y="155"
                fontSize="11"
                textAnchor="right"
                fill="black"
              >
                {pp(data.a / 2)} cm
              </text>
              <text
                x={180}
                y="155"
                fontSize="11"
                textAnchor="right"
                fill="black"
              >
                {pp(data.a / 2)} cm
              </text>
            </svg>
            <hr style={{ margin: '10px 0' }} />
            <p>Verbinde die Mittelpunkte, um die Figur fertigzustellen.</p>
            <svg viewBox="0 0 328 140">
              <image
                href="/content/NRW_EESA/109_Konstruktion5.svg"
                height="140"
                width="328"
              />
            </svg>
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
              Kasimir markiert auf jeder Dreiecksseite den Mittelpunkt. Die
              Mittelpunkte verbindet er. Es entstehen vier gleiche kleine
              Dreiecke (Abbildung 2).
            </p>
            <svg viewBox="0 0 328 140">
              <image
                href="/content/NRW_EESA/109_Kasimir2.PNG"
                height="140"
                width="328"
              />
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 2: Einteilung des Dreiecks
                </span>
              </Color5>
            </center>
          </>
        )
      },
      task({ data }) {
        const h = roundToDigits(
          Math.sqrt(data.a * data.a - (data.a * data.a) / 4),
          1,
        )
        const surface = (h * data.a) / 2
        return (
          //c)
          <>
            <p>
              Bestätige durch eine Rechnung, dass der Flächeninhalt eines
              kleinen Dreiecks ca. {pp(roundToDigits(surface / 4, 1))} cm²
              beträgt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const h = roundToDigits(
          Math.sqrt(data.a * data.a - (data.a * data.a) / 4),
          1,
        )
        const surface = (h * data.a) / 2
        return (
          <>
            <p>
              Das große Dreieck hat eine Fläche von{' '}
              {pp(roundToDigits(surface, 1))} cm². Das große Dreieck besteht aus
              4 identischen kleinen Dreiecken.
            </p>
            <p>Teile die Gesamtfläche durch 4:</p>
            <p>
              {pp(roundToDigits(surface, 1))} : 4{' '}
              <strong>= {pp(roundToDigits(surface / 4, 1))} [cm²]</strong>
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
              Kasimir zeichnet ein großes, gleichseitiges Dreieck. Er teilt
              dieses in vier gleiche, kleine Dreiecke auf.
            </p>
            <svg viewBox="0 0 328 140">
              <image
                href="/content/NRW_EESA/109_Kasimir2.PNG"
                height="140"
                width="328"
              />
            </svg>
          </>
        )
      },
      intro({ data }) {
        const h = roundToDigits(
          Math.sqrt(data.a * data.a - (data.a * data.a) / 4),
          1,
        )
        const surface = (h * data.a) / 2
        return (
          <>
            <p>
              Kasimir klappt die drei äußeren hellen Dreiecke nach oben. Es
              entsteht eine besondere Pyramide, die Tetraeder genannt wird
              (Abbildung 3). Die Kantenlänge des Tetraeders beträgt{' '}
              {pp(data.a / 2)} cm. Der Flächeninhalt der Grundfläche beträgt ca.{' '}
              {pp(roundToDigits(surface / 4, 1))} cm².
            </p>
            <svg viewBox="0 0 328 180">
              <image
                href="/content/NRW_EESA/109_Kasimir3.PNG"
                height="180"
                width="328"
              />
              <text
                x="205"
                y="160"
                fontSize="15"
                textAnchor="middle"
                fill="black"
                transform="rotate(-25, 205, 160)"
              >
                b = {pp(data.a / 2)} cm
              </text>
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 3: Tetraeder
                </span>
              </Color5>
            </center>
            <p>
              Die Körperhöhe h<sub>K​</sub> eines Tetraeders kann mit folgender
              Formel berechnet werden:
            </p>
            <p>
              h<sub>K​</sub> = {buildInlineFrac(<>{buildSqrt(6)}</>, 3)} · b
            </p>
          </>
        )
      },
      task({ data }) {
        const hk = (Math.sqrt(6) / 3) * (data.a / 2)
        return (
          //d)
          <>
            <p>
              Zeige mit der Formel, dass h<sub>K​</sub> ​≈{' '}
              {pp(roundToDigits((Math.sqrt(6) / 3) * (data.a / 2), 1))} cm lang
              ist.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Setze den Wert von <Color1>b</Color1> aus der Abbildung in die
              Formel ein:
            </p>
            {buildEquation([
              [
                <>
                  h<sub>K​</sub>
                </>,
                <>=</>,
                <>
                  {buildInlineFrac(<>{buildSqrt(6)}</>, 3)} · <Color1>b</Color1>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(<>{buildSqrt(6)}</>, 3)} ·{' '}
                  <Color1>{pp(data.a / 2)}</Color1>
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  <strong>
                    {pp(roundToDigits((Math.sqrt(6) / 3) * (data.a / 2), 1))}{' '}
                    [cm]
                  </strong>
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
      skillIntro({ data }) {
        const h = roundToDigits(
          Math.sqrt(data.a * data.a - (data.a * data.a) / 4),
          1,
        )
        const surface = (h * data.a) / 2
        return (
          <>
            <p>
              Die Kantenlänge eines Tetraeders beträgt {pp(data.a / 2)} cm. Der
              Flächeninhalt der Grundfläche beträgt ca.{' '}
              {pp(roundToDigits(surface / 4, 1))} cm².
            </p>
            <svg viewBox="0 0 328 180">
              <image
                href="/content/NRW_EESA/109_Kasimir3.PNG"
                height="180"
                width="328"
              />
              <text
                x="205"
                y="160"
                fontSize="15"
                textAnchor="middle"
                fill="black"
                transform="rotate(-25, 205, 160)"
              >
                b = {pp(data.a / 2)} cm
              </text>
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 3: Tetraeder
                </span>
              </Color5>
            </center>
            <p>
              Die Körperhöhe h<sub>K​</sub> des Tetraeders beträgt:{' '}
              {pp(roundToDigits((Math.sqrt(6) / 3) * (data.a / 2), 1))} cm
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          //e)
          <>
            <p>
              Berechne mit der Körperhöhe h<sub>K​</sub>​ das Volumen des
              Tetraeders.
            </p>
          </>
        )
      },
      solution({ data }) {
        const h = Math.sqrt(data.a * data.a - (data.a * data.a) / 4)
        const surface = (h * data.a) / 2
        return (
          <>
            <p>Berechne das Volumen mit der Formel für Pyramiden:</p>
            {buildEquation([
              [<>V</>, <>=</>, <>{buildInlineFrac(<>G · h</>, <>3</>)}</>],
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
                      setze die Dreiecksfläche und die Höhe ein
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>
                      {pp(roundToDigits(surface / 4, 1))} ·{' '}
                      {pp(roundToDigits((Math.sqrt(6) / 3) * (data.a / 2), 1))}
                    </>,
                    <>3</>,
                  )}
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  <strong>
                    {pp(
                      roundToDigits(
                        (1 / 3) *
                          roundToDigits((Math.sqrt(6) / 3) * (data.a / 2), 1) *
                          roundToDigits(surface / 4, 1),
                        2,
                      ),
                    )}{' '}
                    [cm³]
                  </strong>
                </>,
              ],
            ])}
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
            <svg viewBox="0 0 328 140">
              <image
                href="/content/NRW_EESA/109_Kasimir2.PNG"
                height="140"
                width="328"
              />
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 2: Netz eines Tetraeders
                </span>
              </Color5>
            </center>
          </>
        )
      },
      task({ data }) {
        const listItems = [
          <li key="1">
            {data.item_1 == 0 ? (
              <svg viewBox="0 0 328 50">
                <image href={richtig[data.item_1]} height="50" width="328" />
              </svg>
            ) : (
              <svg viewBox="0 0 328 120">
                <image href={richtig[data.item_1]} height="120" width="328" />
              </svg>
            )}
          </li>,
          <li key="2">
            {data.item_2 == 3 ? (
              <svg viewBox="0 0 328 50">
                <image href={falsch[data.item_2]} height="50" width="328" />
              </svg>
            ) : (
              <svg viewBox="0 0 328 120">
                <image href={falsch[data.item_2]} height="120" width="328" />
              </svg>
            )}
          </li>,

          <li key="3">
            {data.item_3 == 3 ? (
              <svg viewBox="0 0 328 50">
                <image href={falsch[data.item_3]} height="50" width="328" />
              </svg>
            ) : (
              <svg viewBox="0 0 328 120">
                <image href={falsch[data.item_3]} height="120" width="328" />
              </svg>
            )}
          </li>,
        ]
        const shuffledItems = data.order.map(i => listItems[i])
        return (
          //f)
          <>
            <p>
              Abbildung 2 stellt das Netz eines Tetraeders dar. Welches Netz
              stellt ebenfalls das Netz eines Tetraeders dar? Entscheide
              jeweils.
            </p>
            <ol>{shuffledItems}</ol>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Das Netz</p>
            {data.item_1 == 0 ? (
              <svg viewBox="0 0 328 50">
                <image href={richtig[data.item_1]} height="50" width="328" />
              </svg>
            ) : (
              <svg viewBox="0 0 328 120">
                <image href={richtig[data.item_1]} height="120" width="328" />
              </svg>
            )}
            <p>beschreibt tatsächlich einen Tetraeder.</p>
            <p>Die Netze</p>
            {data.item_2 == 3 ? (
              <svg viewBox="0 0 328 50">
                <image href={falsch[data.item_2]} height="50" width="328" />
              </svg>
            ) : (
              <svg viewBox="0 0 328 120">
                <image href={falsch[data.item_2]} height="120" width="328" />
              </svg>
            )}
            {data.item_3 == 3 ? (
              <svg viewBox="0 0 328 50">
                <image href={falsch[data.item_3]} height="50" width="328" />
              </svg>
            ) : (
              <svg viewBox="0 0 328 120">
                <image href={falsch[data.item_3]} height="120" width="328" />
              </svg>
            )}
            <p>beschreiben keine Tetraeder.</p>
          </>
        )
      },
    },
  ],
}
