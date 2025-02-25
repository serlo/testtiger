import { Exercise } from '@/data/types'
import { Color1, Color2, Color4, Color5 } from '@/helper/colors'
import { buildEquation, ExplanationBox } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  brett: number
  breite: number
  color: number
}

export const exercise117: Exercise<DATA> = {
  title: 'Hochbeet',
  source: '2022 Teil 2 Aufgabe 1',
  useCalculator: true,
  duration: 24,
  generator(rng) {
    return {
      brett: rng.randomIntBetween(20, 40) / 2,
      breite: rng.randomIntBetween(35, 45) * 2 + 2,
      color: rng.randomIntBetween(10, 20) / 2,
    }
  },
  originalData: { brett: 14.5, breite: 82, color: 6.5 },
  learningPathData: { brett: 18.5, breite: 88, color: 7.5 },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Emma und Pierre aus der Schulgarten-AG planen den Bau eines
          quaderförmigen Hochbeets.
        </p>
        <p>
          Die vier Seitenwände des Hochbeets bestehen aus jeweils fünf
          durchgehenden Holzbrettern.{' '}
        </p>
        <p>Oben und unten bleibt das Hochbeet offen (Abbildung 1).</p>
        <svg viewBox="0 0 400 200">
          <image
            href="/content/NRW_EESA/117_Hochbeet.PNG"
            height="200"
            width="400"
          />
          <text x="94" y="190" fontSize="15" textAnchor="middle" fill="black">
            {data.breite} cm
          </text>
          <text x="360" y="120" fontSize="15" textAnchor="middle" fill="black">
            {data.brett} cm
          </text>
          <text x="290" y="170" fontSize="15" textAnchor="middle" fill="black">
            {((data.breite - 2) / 2) * 5} cm
          </text>
          <text x="35" y="100" fontSize="15" textAnchor="middle" fill="black">
            {data.brett * 5} cm
          </text>
        </svg>
        <center>
          <Color5>
            <span style={{ fontSize: 'small' }}>
              Abbildung 1: quaderförmiges Hochbeet mit Maßangaben
            </span>
          </Color5>
        </center>
      </>
    )
  },
  tasks: [
    {
      points: 3,
      duration: 6,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          //a)
          <>
            <p>
              Im Baumarkt kaufen Emma und Pierre Holzbretter für das Hochbeet.
              Die Holzbretter sind {((data.breite - 2) / 2) * 5} cm lang und{' '}
              {pp(data.brett)} cm breit. Bestimme die Anzahl der Holzbretter,
              die für den Bau des gesamten Hochbeets benötigt werden.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Für die langen Seitenwände werden jeweils genau 5 Holzbretter
              benötigt.
            </p>
            <p>
              Die Holzbretter auf den kurzen Seiten müssen zurecht gesägt
              werden. Aus jedem gekauften Brett können zwei Bretter gesägt
              werden. Der Rest kann nicht weiterverwendet werden.
            </p>
            <p>Das sind insgesamt:</p>
            <ul>
              <li>
                2 · 5 = <strong>10 Bretter</strong> für die langen Seitenwände.
              </li>
              <li>
                10 : 2 = <strong>5 Bretter</strong> für die kurzen Seitenwände
              </li>
            </ul>
            <p>
              Für den Bau werden <strong>15 Bretter</strong> benötigt.
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
      example() {
        return (
          <>
            <svg viewBox="0 0 328 150">
              <image
                href="/content/NRW_EESA/117_quader_beispiel.svg"
                height="150"
                width="250"
              />
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>Abbildung 1: Quader</span>
              </Color5>
            </center>
            <ol>
              <li>
                Bestimme die Größe der Seitenflächen A<sub>1</sub> und A
                <sub>2</sub> des Quaders.
                <br />
                <Color2>
                  <b>Antwort</b>: <br></br>A<sub>1</sub> = 200 cm<sup>2</sup>{' '}
                  und A<sub>2</sub> = 50 cm<sup>2</sup>
                </Color2>
              </li>
            </ol>
            <ExplanationBox>
              <p>
                Erklärung:
                <hr style={{ margin: '10px 0' }} />
                Berechne die rechteckigen Seitenflächen A<sub>1</sub> und A
                <sub>2</sub> mit der Formel:
                {buildEquation([
                  [<>A</>, <>=</>, <>a · b</>],
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
                          setze die Seitenlängen ein
                        </span>
                      </Color4>
                    </>,
                  ],
                  [
                    <>
                      A<sub>1</sub>
                    </>,
                    <>=</>,
                    <>20 · 10</>,
                  ],
                  [
                    <></>,
                    <>=</>,
                    <>
                      200 [cm<sup>2</sup>]
                    </>,
                  ],
                  [
                    <>
                      A<sub>2</sub>
                    </>,
                    <>=</>,
                    <>5 · 10</>,
                  ],
                  [
                    <></>,
                    <>=</>,
                    <>
                      50 [cm<sup>2</sup>]
                    </>,
                  ],
                ])}
              </p>
            </ExplanationBox>
            <ol start={2}>
              <li>
                Bestimme das Volumen des Quaders.
                <br />
                <Color2>
                  <b>Antwort</b>: V = 1000 cm<sup>3</sup>
                </Color2>
              </li>{' '}
            </ol>

            <ExplanationBox>
              Erklärung:
              <hr style={{ margin: '10px 0' }} />
              <p>
                Berechne das Volumen mit der Formel
                {buildEquation([
                  [<>V</>, <>=</>, <>a · b · c </>],
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
                          setze die Seitenlängen ein
                        </span>
                      </Color4>
                    </>,
                  ],
                  [<>V</>, <>=</>, <>20 · 10 · 5 </>],
                  [
                    <></>,
                    <>=</>,
                    <>
                      1000 [cm<sup>3</sup>]
                    </>,
                  ],
                ])}
              </p>
            </ExplanationBox>
          </>
        )
      },
      task({ data }) {
        return (
          //b)
          <>
            <p>
              Emma möchte die Außenflächen des Hochbeets mit Farbe anstreichen.
              Ein Eimer Farbe reicht für eine Fläche von ca. {pp(data.color)}{' '}
              m².
            </p>
            <p>Entscheide durch eine Rechnung, ob ein Eimer Farbe ausreicht.</p>
          </>
        )
      },
      solution({ data }) {
        const länge = (((data.breite - 2) / 2) * 5) / 100

        const höhe = (data.brett * 5) / 100
        return (
          <>
            <p>
              Berechne die Oberfläche der rechteckigen Seitenflächen mit der
              Formel:
              <br></br>A = a · b
            </p>
            {buildEquation([
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
                      Setze die Seitenlänge in Meter ein
                    </span>
                  </Color4>
                </>,
              ],
              [
                <>
                  A<sub>lang</sub>
                </>,
                <>=</>,
                <>
                  {pp(länge)} · {pp(höhe)}{' '}
                </>,
              ],
              [<></>, <>=</>, <>{pp(länge * höhe)} [m²]</>],
              [
                <>
                  A<sub>kurz</sub>
                </>,
                <>=</>,
                <>
                  {pp(data.breite / 100)} · {pp(höhe)}
                </>,
              ],
              [<></>, <>=</>, <>{pp((höhe * data.breite) / 100)} [m²]</>],
            ])}
            <hr style={{ margin: '10px 0' }} />
            <p>Berechne die Gesamtfläche:</p>
            {buildEquation([
              [
                <>
                  A<sub>gesamt</sub>
                </>,
                <>=</>,
                <>
                  2 · A<sub>lang</sub> + 2 · A<sub>kurz</sub>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  2 · {pp(länge * höhe)} + 2 · {pp((höhe * data.breite) / 100)}
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  <strong>
                    {pp(
                      roundToDigits(
                        (höhe * 2 * data.breite) / 100 + länge * höhe * 2,
                        2,
                      ),
                    )}{' '}
                    [m²]
                  </strong>
                </>,
              ],
            ])}
            <p>
              {(höhe * 2 * data.breite) / 100 + länge * höhe * 2 <
              data.color ? (
                <>
                  <strong>
                    Die Oberfläche ist kleiner als {pp(data.color)} m² und kann
                    daher mit einem Eimer Farbe gestrichen werden.
                  </strong>
                </>
              ) : (
                <>
                  <strong>
                    Die Oberfläche ist größer als {pp(data.color)} m² und kann
                    daher nicht mit einem Eimer Farbe gestrichen werden.
                  </strong>
                </>
              )}
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 4,
      intro({ data }) {
        return null
      },

      task({ data }) {
        return (
          //c)
          <>
            <p>Das Hochbeet wird zu einem Drittel mit Gartenerde befüllt.</p>
            <p>Berechne die benötigte Gartenerde in Kubikmeter (m³).</p>
          </>
        )
      },
      solution({ data }) {
        const länge = (((data.breite - 2) / 2) * 5) / 100

        const höhe = (data.brett * 5) / 100
        return (
          <>
            <p>Berechne das Volumen des Quaders mit der Formel:</p>
            {buildEquation([
              [<>V</>, <>=</>, <>a · b · c</>],
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
                      Setze die Seitenlänge in Meter ein
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {pp(länge)} · {pp(data.breite / 100)} · {pp(höhe)}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <> {pp(((länge * data.breite) / 100) * höhe)} [m³]</>,
              ],
            ])}
            <p>
              Das Hochbeet wird nur zu einem Drittel befüllt. Das heißt, das
              Volumen muss durch 3 geteilt werden:
            </p>
            <p>
              {pp(((länge * data.breite) / 100) * höhe)} : 3 ≈{' '}
              <strong>
                {pp(
                  roundToDigits((((länge * data.breite) / 100) * höhe) / 3, 2),
                )}{' '}
                [m³]
              </strong>
            </p>
            <p>
              <strong>
                Es werden{' '}
                {pp(
                  roundToDigits((((länge * data.breite) / 100) * höhe) / 3, 2),
                )}{' '}
                m³ Gartenerde benötigt.
              </strong>
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
              Emma und Pierre bauen ein Hochbeet mit der Länge{' '}
              {5 * ((data.breite - 2) / 2)} cm und Breite {data.breite} cm.
            </p>
          </>
        )
      },
      intro({ data }) {
        return (
          <>
            <p>
              Emma und Pierre bepflanzen das neue Hochbeet mit Salat (Abbildung
              2). Jeder Salat benötigt eine kreisförmige Fläche mit einem
              Durchmesser von {(data.breite - 2) / 2} cm.
            </p>

            <svg viewBox="0 0 400 200">
              <image
                href="/content/NRW_EESA/117_Hochbeet2.PNG"
                height="200"
                width="400"
              />

              <text
                x="136"
                y="75"
                fontSize="13"
                textAnchor="middle"
                fill="black"
              >
                {(data.breite - 2) / 2} cm
              </text>
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 2: maßstabsgetreue Skizze zum Bepflanzen des
                  Hochbeets
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
            <p>Zeichne die Skizze im Maßstab 1 : 20 ab.</p>
          </>
        )
      },
      solution({ data }) {
        const länge = ((data.breite - 2) / 2) * 5
        return (
          <>
            <p>
              Zwischen dem Salat und der Seitenwand ist ein Platz von einem
              halben Millimeter:
            </p>
            <svg viewBox="0 0 400 220">
              <image
                href="/content/NRW_EESA/117_Hochbeet2.PNG"
                height="200"
                width="400"
              />

              <text
                x="137"
                y="75"
                fontSize="12"
                textAnchor="middle"
                fill="black"
              >
                {pp((data.breite - 2) / 40)} cm
              </text>
              <text
                x="365"
                y="100"
                fontSize="12"
                textAnchor="middle"
                fill="black"
              >
                {pp(data.breite / 20)} cm
              </text>
              <text
                x="365"
                y="100"
                fontSize="12"
                textAnchor="middle"
                fill="black"
              >
                {pp(data.breite / 20)} cm
              </text>
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                  fill="black"
                >
                  <polygon points="0 0, 10 3.5, 0 7" />
                </marker>
              </defs>
              <line
                x1={365}
                y1={80}
                x2={365}
                y2={20}
                stroke="black"
                strokeWidth={2}
                markerEnd="url(#arrowhead)"
              />
              <line
                x1={365}
                y1={120}
                x2={365}
                y2={179}
                stroke="black"
                strokeWidth={2}
                markerEnd="url(#arrowhead)"
              />
              <line
                x2={4}
                y1={200}
                x1={170}
                y2={200}
                stroke="black"
                strokeWidth={2}
                markerEnd="url(#arrowhead)"
              />
              <line
                x1={230}
                y1={200}
                x2={396}
                y2={200}
                stroke="black"
                strokeWidth={2}
                markerEnd="url(#arrowhead)"
              />
              <text
                x="200"
                y="204"
                fontSize="12"
                textAnchor="middle"
                fill="black"
              >
                {pp(länge / 20)} cm
              </text>
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
              Emma und Pierre bepflanzen das neue Hochbeet mit Salat (Abbildung
              2). Jeder Salat benötigt eine kreisförmige Fläche mit einem
              Durchmesser von {(data.breite - 2) / 2} cm.
            </p>

            <svg viewBox="0 0 400 200">
              <image
                href="/content/NRW_EESA/117_Hochbeet2.PNG"
                height="200"
                width="400"
              />

              <text
                x="136"
                y="75"
                fontSize="13"
                textAnchor="middle"
                fill="black"
              >
                {(data.breite - 2) / 2} cm
              </text>
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 2: maßstabsgetreue Skizze zum Bepflanzen des
                  Hochbeets
                </span>
              </Color5>
            </center>
            <p>
              Das Hochbeet hat eine Länge von {((data.breite - 2) / 2) * 5} cm.
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          //e)
          <>
            <p>
              Es können höchstens zehn Salate in dem Hochbeet gepflanzt werden.
              Begründe diese maximale Anzahl.
            </p>
          </>
        )
      },
      solution({ data }) {
        const länge = ((data.breite - 2) / 2) * 5
        return (
          <>
            <p>
              e) Ein Salat hat einen Durchmesser von <br></br>
              {(data.breite - 2) / 2} cm.
            </p>
            <ul>
              <li>
                In die lange Seite des Hochbeets passen genau {länge} :{' '}
                {(data.breite - 2) / 2} = 5 Salatköpfe.
              </li>
              <li>
                In die kurze Seite des Hochbeets passen {data.breite} :{' '}
                {(data.breite - 2) / 2} ≈ 2 Salatköpfe mit einem Zentimeter Rest
                auf jeder Seite.
              </li>
            </ul>
            <p>
              Insgesamt passen damit 2 · 5 = <strong>10 Salatköpfe</strong> in
              das Hochbeet.
            </p>
          </>
        )
      },
    },
  ],
}
