import { Exercise } from '@/data/types'
import { Color1, Color4, Color5 } from '@/helper/colors'
import { buildEquation } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  wachsen: number
  max: number
  start: number
  days: number
  height: number
  length: number
  dia: number
  rohre: number
  länge: number
  dichte: number
}

export const exercise119: Exercise<DATA> = {
  title: 'Bambus',
  source: '2022 Teil 2 Aufgabe 3',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    return {
      wachsen: rng.randomIntBetween(3, 9) * 10,
      max: rng.randomIntBetween(20, 45),
      start: rng.randomIntBetween(1, 4),
      days: rng.randomIntBetween(8, 15),
      height: rng.randomIntBetween(30, 60) / 2,
      length: rng.randomIntBetween(6, 18) / 2,
      dia: rng.randomItemFromArray([5, 10]),
      rohre: rng.randomIntBetween(10, 16) * 10,
      länge: rng.randomIntBetween(13, 20) * 10,
      dichte: rng.randomIntBetween(4, 8) / 10,
    }
  },
  originalData: {
    wachsen: 70,
    max: 35,
    start: 3,
    days: 10,
    height: 17.5,
    length: 6.5,
    dia: 5,
    länge: 180,
    rohre: 130,
    dichte: 0.7,
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Der Riesenbambus ist eine besondere Bambuspflanze, die sehr schnell
          und sehr hoch wachsen kann.
        </p>
        <p>
          Unter idealen Bedingungen wächst sie ca. {data.wachsen} cm pro Tag.
          Ein Riesenbambus kann bis zu {data.max} Meter hoch werden.
        </p>
        <svg viewBox="0 0 328 160">
          <image
            href="/content/NRW_EESA/119_Bambus.png"
            height="160"
            width="328"
          />

          <text
            x="136"
            y="75"
            fontSize="13"
            textAnchor="middle"
            fill="black"
          ></text>
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 2,
      duration: 2,
      intro({ data }) {
        return <></>
      },
      task({ data }) {
        return (
          <>
            <p>
              a) Eine Bambuspflanze hat eine Höhe von <br></br>
              {data.start} m. Bestimme die Höhe dieser Bambuspflanze nach{' '}
              {data.days} Tagen unter idealen Bedingungen.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Berechne, wie viel die Pflanze in {data.days} Tagen wächst:</p>
            <p>
              {' '}
              {data.days} · {data.wachsen} = {data.days * data.wachsen} [cm]
            </p>
            <p>
              {data.days * data.wachsen} cm ≙{' '}
              {pp((data.days * data.wachsen) / 100)} m
            </p>
            <p>
              Addiere die Starthöhe, um zu bestimmen, wie hoch die Pflanze
              insgesamt gewachsen ist:
            </p>
            <p>
              {data.start} + {pp((data.days * data.wachsen) / 100)} ={' '}
              <strong>
                {pp(data.start + (data.days * data.wachsen) / 100)} [m]
              </strong>
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 6,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              b) Unter idealen Bedingungen kann das Wachstum der Bambuspflanze
              mit der Gleichung y = {ppFrac(data.wachsen / 100)} ​x +{' '}
              {data.start} beschrieben werden.
            </p>
            <p>Zeichne die Gerade in ein Koordinatensystem ein.</p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 164 + n * 32.8
        }
        function toY(n: number) {
          return 210 - n * 32.8
        }
        return (
          <>
            <p>
              Es ist hilfreich mit dem y-Achsenabschnitt{' '}
              <Color1>{data.start}</Color1> anzufangen und die Gerade mit einem
              Steigungsdreieck zu zeichnen:
            </p>
            <svg viewBox="0 0 328 300">
              <image
                href="/content/NRW_MSA_KS_Vorlage.png"
                height="300"
                width="328"
              />
              <text
                x={179}
                y={toY(data.start) + 15}
                fontSize="15"
                textAnchor="middle"
                fill="green"
              >
                1
              </text>
              <text
                x={210}
                y={toY(data.start) - 2}
                fontSize="15"
                textAnchor="middle"
                fill="green"
              >
                {pp(data.wachsen / 100)}
              </text>
              <line
                x1={toX(-5) - 2}
                y1={toY((-5 * data.wachsen) / 100 + data.start)}
                x2={toX(5) - 2}
                y2={toY((5 * data.wachsen) / 100 + data.start)}
                stroke="blue"
                strokeWidth={3}
              />
              <line
                x1={toX(0) - 1}
                y1={toY(data.start)}
                x2={toX(1) - 1}
                y2={toY(data.start)}
                stroke="green"
                strokeWidth={3}
              />
              <line
                x1={toX(1) - 1}
                y1={toY(data.start)}
                x2={toX(1) - 1}
                y2={toY((1 * data.wachsen) / 100 + data.start)}
                stroke="green"
                strokeWidth={3}
              />
            </svg>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 3,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              c) Berechne mithilfe der Gleichung, nach wie vielen Tagen die
              Bambuspflanze eine Höhe von {pp(data.height)} m erreicht.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Das Wachstum der Pflanze wird mit der Gleichung beschrieben:{' '}
              <br></br>y = {ppFrac(data.wachsen / 100)} ​x + {data.start}
            </p>
            <p>
              Setze die Gleichung mit dem Wert {pp(data.height)} gleich und löse
              nach x auf:
            </p>
            {buildEquation([
              [
                <>{pp(data.height)}</>,
                <>=</>,
                <>
                  {ppFrac(data.wachsen / 100)} ​x + {data.start}
                </>,
                <>| − {data.start}</>,
              ],
              [
                <>{pp(data.height - data.start)}</>,
                <>=</>,
                <>{ppFrac(data.wachsen / 100)} ​x</>,
                <>| : {ppFrac(data.wachsen / 100)}</>,
              ],
              [
                <>
                  <strong>x</strong>
                </>,
                <>
                  <strong>=</strong>
                </>,
                <>
                  <strong>
                    {pp(
                      roundToDigits(
                        (data.height - data.start) / (data.wachsen / 100),
                        2,
                      ),
                    )}
                  </strong>
                </>,
              ],
            ])}
            <p>
              Nach etwa{' '}
              {Math.round((data.height - data.start) / (data.wachsen / 100))}{' '}
              Tagen hat die Pflanze eine Höhe von {pp(data.height)} m erreicht.
            </p>
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
              Herr Paulsen möchte einen Zaun aus Bambusrohren bauen (Abbildung
              2).
            </p>
            <svg viewBox="0 0 328 160">
              <image
                href="/content/NRW_EESA/119_Bambus2.PNG"
                height="160"
                width="328"
              />
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 2: Zaun aus Bambusrohren
                </span>
              </Color5>
            </center>
            <p>
              Der Zaun soll eine Länge von {pp(data.length)} m haben. Die
              Bambusrohre sind annähernd zylinderförmig und haben einen
              Durchmesser von etwa {data.dia} cm.
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              d) Berechne die Anzahl an Bambusrohren, die für den Zaun benötigt
              werden.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              In Zentimeter umgerechnet soll der Zaun eine Länge von{' '}
              {data.length * 100} cm haben.
            </p>
            <p>
              Teile diesen Wert durch den Durchmesser, um die Anzahl der Rohre
              zu bestimmen:
            </p>
            <p>
              {data.length * 100} : {data.dia} ={' '}
              <strong>{(data.length * 100) / data.dia}</strong>
            </p>
            <p>
              Herr Paulsen benötigt etwa{' '}
              <strong>{(data.length * 100) / data.dia} Rohre</strong>.
            </p>
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
              Bambusrohre sind innen hohl, außen bestehen sie aus Holz
              (Abbildung 3).
            </p>
            <svg viewBox="0 0 328 80">
              <image
                href="/content/NRW_EESA/119_Bambu3.PNG"
                height="80"
                width="328"
              />
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 3: Bambusrohr
                </span>
              </Color5>
            </center>
            <p>
              Die Querschnittsfläche von einem Bambusrohr ist ein Kreisring
              (Abbildung 4).
            </p>
            <svg viewBox="0 0 328 80">
              <image
                href="/content/NRW_EESA/119_Bambus4.PNG"
                height="80"
                width="328"
              />
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 4: Modell des Querschnitts eines Bambusrohrs
                </span>
              </Color5>
            </center>
            <p>
              Die Bambusrohre für den Zaun haben folgende Maße: Der Außenkreis
              hat einen Radius von r<sub>1</sub>​ = {pp(data.dia / 2)} cm und
              der Innenkreis einen Radius von r<sub>2</sub> ​={' '}
              {pp(data.dia / 2 - 1)} cm.
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              e) Zeige durch eine Rechnung, dass der Flächeninhalt des
              Kreisrings A ≈{' '}
              {pp(
                roundToDigits(
                  Math.PI *
                    ((data.dia / 2) * (data.dia / 2) -
                      (data.dia / 2 - 1) * (data.dia / 2 - 1)),
                  2,
                ),
              )}{' '}
              cm² beträgt.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Verwende die Formel für den Flächeninhalt eines Kreisrings:</p>
            {buildEquation([
              [
                <>A</>,
                <>=</>,
                <>
                  π · (r<sub>1</sub>² − r<sub>2</sub>²)
                </>,
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
                    <span style={{ fontSize: 'small' }}>Radien einsetzen</span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  π · ({pp(data.dia / 2)}² − {pp(data.dia / 2 - 1)}²)
                </>,
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
                      Berechnen und runden
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  {pp(
                    roundToDigits(
                      Math.PI *
                        ((data.dia / 2) * (data.dia / 2) -
                          (data.dia / 2 - 1) * (data.dia / 2 - 1)),
                      2,
                    ),
                  )}{' '}
                  [cm²]
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 2,
      duration: 3,
      intro({ data }) {
        return <></>
      },
      task({ data }) {
        return (
          <>
            <p>
              f) Herr Paulsen kauft {data.rohre} Bambusrohre, die jeweils eine
              Länge von {data.länge} cm haben.{' '}
            </p>
            <p>
              Ein Kubikzentimeter (cm³) Bambusholz wiegt {pp(data.dichte)} Gramm
              (g). Zum Transport kann er einen Anhänger nutzen. Auf dem Anhänger
              dürfen bis zu 250 kg geladen werden.
            </p>
            <ul>
              <li>Berechne das Gewicht der gekauften Bambusrohre.</li>
              <li>
                Entscheide, ob das erlaubte Ladegewicht des Anhängers
                eingehalten wird.
              </li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              <strong>Volumen berechnen</strong>
            </p>
            <p>
              Um das Gewicht zu berechnen, muss das Volumen der Bambusrohre mit
              deren Dichte multipliziert werden. Das Volumen eines Bambusrohrs
              wird mit der Formel für den Prisma berechnet:
            </p>
            {buildEquation([
              [<>V</>, <>=</>, <>A · h</>],
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
                      Fläche und Höhe des Rohres einsetzen
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {pp(
                    roundToDigits(
                      Math.PI *
                        ((data.dia / 2) * (data.dia / 2) -
                          (data.dia / 2 - 1) * (data.dia / 2 - 1)),
                      2,
                    ),
                  )}{' '}
                  · {pp(data.länge)}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {pp(
                    roundToDigits(
                      data.länge *
                        roundToDigits(
                          Math.PI *
                            ((data.dia / 2) * (data.dia / 2) -
                              (data.dia / 2 - 1) * (data.dia / 2 - 1)),
                          2,
                        ),
                      2,
                    ),
                  )}{' '}
                  [cm³]
                </>,
              ],
            ])}
            <br></br>
            <strong>Gewicht eines Rohrs bestimmen</strong>
            <p>Berechne das Gewicht eines Rohrs mit dem Dreisatz:</p>
            {buildEquation([
              [<>1 cm³</>, <>≙</>, <>{pp(data.dichte)} g</>],
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
                        roundToDigits(
                          data.länge *
                            roundToDigits(
                              Math.PI *
                                ((data.dia / 2) * (data.dia / 2) -
                                  (data.dia / 2 - 1) * (data.dia / 2 - 1)),
                              2,
                            ),
                          2,
                        ),
                      )}
                    </span>
                  </Color4>
                </>,
              ],
              [
                <>
                  {pp(
                    roundToDigits(
                      data.länge *
                        roundToDigits(
                          Math.PI *
                            ((data.dia / 2) * (data.dia / 2) -
                              (data.dia / 2 - 1) * (data.dia / 2 - 1)),
                          2,
                        ),
                      2,
                    ),
                  )}{' '}
                  cm³
                </>,
                <>≙</>,
                <>
                  {pp(
                    roundToDigits(
                      data.dichte *
                        data.länge *
                        roundToDigits(
                          Math.PI *
                            ((data.dia / 2) * (data.dia / 2) -
                              (data.dia / 2 - 1) * (data.dia / 2 - 1)),
                          2,
                        ),
                      2,
                    ),
                  )}{' '}
                  g
                </>,
              ],
              [<></>, <></>, <></>],
            ])}
            <p>
              Ein Rohr wiegt etwa{' '}
              {pp(
                roundToDigits(
                  data.dichte *
                    data.länge *
                    roundToDigits(
                      Math.PI *
                        ((data.dia / 2) * (data.dia / 2) -
                          (data.dia / 2 - 1) * (data.dia / 2 - 1)),
                      2,
                    ),
                  2,
                ),
              )}{' '}
              g, also <br></br>
              {pp(
                roundToDigits(
                  data.dichte *
                    data.länge *
                    roundToDigits(
                      Math.PI *
                        ((data.dia / 2) * (data.dia / 2) -
                          (data.dia / 2 - 1) * (data.dia / 2 - 1)),
                      2,
                    ),
                  2,
                ) / 1000,
              )}{' '}
              kg.
            </p>
            <strong>Gewicht aller Rohre bestimmen</strong>
            <p>
              {' '}
              Insgesamt lädt Herr Paulsen ein Gewicht von {data.rohre} Rohren
              auf:
              <br></br>{' '}
              {pp(
                roundToDigits(
                  data.dichte *
                    data.länge *
                    roundToDigits(
                      Math.PI *
                        ((data.dia / 2) * (data.dia / 2) -
                          (data.dia / 2 - 1) * (data.dia / 2 - 1)),
                      2,
                    ),
                  2,
                ) / 1000,
              )}{' '}
              · {data.rohre} ≈{' '}
              <strong>
                {pp(
                  roundToDigits(
                    (data.rohre / 1000) *
                      data.dichte *
                      data.länge *
                      roundToDigits(
                        Math.PI *
                          ((data.dia / 2) * (data.dia / 2) -
                            (data.dia / 2 - 1) * (data.dia / 2 - 1)),
                        2,
                      ),
                    2,
                  ),
                )}{' '}
                [kg]
              </strong>{' '}
            </p>
            Das erlaubte Ladegewicht wird damit{' '}
            {roundToDigits(
              (data.rohre / 1000) *
                data.dichte *
                data.länge *
                roundToDigits(
                  Math.PI *
                    ((data.dia / 2) * (data.dia / 2) -
                      (data.dia / 2 - 1) * (data.dia / 2 - 1)),
                  2,
                ),
              2,
            ) < 250 ? (
              <>
                <strong>eingehalten</strong>
              </>
            ) : (
              <>
                <strong>nicht eingehalten</strong>
              </>
            )}
            .
          </>
        )
      },
    },
  ],
}
