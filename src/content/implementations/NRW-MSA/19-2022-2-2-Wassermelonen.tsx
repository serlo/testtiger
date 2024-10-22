import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  durchmesser: number
  schale: number
  gewicht: number
  case: number
}

export const exercise19: Exercise<DATA> = {
  title: 'Wassermelonen',
  source: '2022 Teil 2 Aufgabe 2',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    return {
      durchmesser: rng.randomIntBetween(20, 30),
      schale: rng.randomIntBetween(3, 7) / 2,
      gewicht: rng.randomIntBetween(2, 6) * 100,
      case: rng.randomIntBetween(1, 3),
    }
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return <></>
  },
  tasks: [
    {
      points: 3,
      task({ data }) {
        return (
          <>
            <p>
              Für ein Schulprojekt beschäftigt sich Sinja mit der Form und dem
              Wachstum von Wassermelonen.
            </p>
            <p>
              Sinja hat eine nahezu kugelförmige Wassermelone gekauft, die einen
              Durchmesser von ca. {data.durchmesser} cm hat (Abbildung 1).
            </p>
            <svg viewBox="0 0 500 350">
              <image
                href="/content/NRW_MSA_Melone.PNG"
                height="350"
                width="500"
              />
              <text
                x={130}
                y={170}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {data.durchmesser} cm
              </text>
            </svg>
            <p>
              a) Zeige rechnerisch, dass diese Wassermelone ein Volumen von V ≈{' '}
              {pp(
                roundToDigits(
                  (4 / 3) * Math.PI * Math.pow(data.durchmesser / 2, 3),
                  -2,
                ),
              )}{' '}
              cm³ hat.
            </p>
          </>
        )
      },
      solution({ data }) {
        const V = (4 / 3) * Math.PI * Math.pow(data.durchmesser / 2, 3)
        return (
          <>
            <p>Berechne das Volumen der kugelförmigen Melone mit der Formel:</p>
            {buildEquation([
              [<>V</>, <>=</>, <>{buildInlineFrac(4, 3)} · π · r³</>],
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
                      Radius bestimmen und einsetzen
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(4, 3)} · π · {data.durchmesser / 2}³
                </>,
              ],
              [<></>, <>≈</>, <>{pp(roundToDigits(V, 2))} </>],
              [
                <></>,
                <>≈</>,
                <>
                  <strong>{pp(roundToDigits(V, -2))} [cm³]</strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 3,
      task({ data }) {
        return (
          <>
            <p>
              b) Die Schale der Wassermelone hat eine Dicke von{' '}
              {pp(data.schale)} cm (Abbildung 1).
            </p>
            <p>
              Berechne den prozentualen Anteil des Fruchtfleisches an der ganzen
              Wassermelone.
            </p>
          </>
        )
      },
      solution({ data }) {
        const r = data.durchmesser / 2 - data.schale
        const V = roundToDigits((4 / 3) * Math.PI * Math.pow(r, 3), 2)
        const V_außen = roundToDigits(
          (4 / 3) * Math.PI * Math.pow(data.durchmesser / 2, 3),
          -2,
        )
        const p = V / V_außen
        return (
          <>
            <p>
              <strong>Volumen des Fruchtfleischs</strong>
            </p>
            <p>
              Der innere Radius bis zur Schale beträgt: r<sub>innen</sub> ={' '}
              {pp(data.durchmesser / 2)} − {pp(data.schale)} = {pp(r)} [cm]
            </p>
            <p>Berechne damit das Volumen des Fruchtfleisches in der Melone:</p>
            {buildEquation([
              [<>V</>, <>=</>, <>{buildInlineFrac(4, 3)} · π · r³</>],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(4, 3)} · p · {pp(r)}³
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <strong>{pp(V)} [cm³]</strong>
                </>,
              ],
            ])}

            <p>
              <strong>Prozentualer Anteil</strong>
            </p>
            <p>Berechne den Anteil des Fruchtfleisches vom ganzen Volumen:</p>
            <p>
              {buildInlineFrac(pp(V), pp(V_außen))} = {pp(roundToDigits(p, 4))}{' '}
              ≙ <strong>{pp(roundToDigits(p * 100, 2))} %</strong>
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        const V = roundToDigits(
          (4 / 3) * Math.PI * Math.pow(data.durchmesser / 2, 3),
          -2,
        )
        return (
          <>
            <p>
              c) Sinja entdeckt würfelförmige Wassermelonen, die in Japan
              verkauft werden (Abbildungen 2).
            </p>
            <p>
              Eine würfelförmige Wassermelone hat ebenfalls ein Volumen von V ≈{' '}
              {pp(V)} cm³ .
            </p>
            <p>
              Bestätige durch eine Rechnung, dass diese Wassermelone eine
              Kantenlänge von ca. {pp(roundToDigits(Math.pow(V, 1 / 3), 2))} cm
              hat.
            </p>
            <svg viewBox="0 0 500 350">
              <image
                href="/content/NRW_MSA_Melone_dice.jpg"
                height="350"
                width="500"
              />
            </svg>
            <p>Abbildung 2: würfelförmige Wassermelone</p>
          </>
        )
      },
      solution({ data }) {
        const V = roundToDigits(
          (4 / 3) * Math.PI * Math.pow(data.durchmesser / 2, 3),
          -2,
        )
        return (
          <>
            <p>Das Volumen eines Würfels wird berechnet mit der Formel:</p>
            <p>V = a³</p>
            <p>
              a steht hierbei für die Kantenlänge des Würfels.<br></br>
            </p>
            <p>
              Berechne a, indem du den Wert für das Volumen einsetzt und die
              Gleichung umformst:
            </p>
            {buildEquation([
              [<>V</>, <>=</>, <>a³</>],
              [pp(V), <>=</>, <>a³</>, <>| {buildSqrt(<></>, 3)}</>],
              [<>a</>, <>=</>, <>{buildSqrt(pp(V), 3)}</>],
              [
                <>
                  <strong>a</strong>
                </>,
                <>
                  <strong>≈</strong>
                </>,
                <>
                  <strong>
                    {pp(roundToDigits(Math.pow(V, 1 / 3), 2))} [cm]
                  </strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 4,
      task({ data }) {
        return (
          <>
            <p>
              d) Entscheide durch eine Rechnung, ob die kugelförmige oder die
              würfelförmige Wassermelone eine größere Oberfläche hat.
            </p>
          </>
        )
      },
      solution({ data }) {
        const V = roundToDigits(
          (4 / 3) * Math.PI * Math.pow(data.durchmesser / 2, 3),
          -2,
        )
        const O1 = roundToDigits(
          6 * Math.pow(roundToDigits(Math.pow(V, 1 / 3), 2), 2),
          2,
        )
        const O2 = roundToDigits(
          4 * Math.PI * Math.pow(data.durchmesser / 2, 2),
          2,
        )
        return (
          <>
            <p>
              <strong>Oberfläche des Würfels</strong>
            </p>
            {buildEquation([
              [<>O</>, <>=</>, <>6 · a²</>],
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
                      Kantenlänge a einsetzen
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>6 · {pp(roundToDigits(Math.pow(V, 1 / 3), 2))}²</>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <strong>{pp(O1)} [cm²]</strong>
                </>,
              ],
            ])}
            <p>
              <strong>Oberfläche der Kugel</strong>
            </p>
            {buildEquation([
              [<>O</>, <>=</>, <>4 · π · r²</>],
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
                      Radius r einsetzen
                    </span>
                  </Color4>
                </>,
              ],
              [<></>, <>=</>, <>4 · π · {pp(data.durchmesser / 2)}²</>],
              [
                <></>,
                <>=</>,
                <>
                  <strong>{pp(O2)} [cm²]</strong>
                </>,
              ],
            ])}

            <p>
              {O1 > O2 ? (
                <>
                  Die <strong>würfelförmige Melone</strong> hat bei gleichem
                  Volumen eine größere Oberfläche.
                </>
              ) : (
                <>
                  Die <strong>kugelförmige Melone</strong> hat bei gleichem
                  Volumen eine größere Oberfläche.
                </>
              )}
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>
              e) Wassermelonen verdoppeln ihr Gewicht pro Woche unter idealen
              Wachstumsbedingungen. Sinja überlegt, wie sich das Gewicht einer{' '}
              {data.gewicht} g schweren Wassermelone unter idealen Bedingungen
              voraussichtlich entwickelt. Sie erstellt dazu eine Tabelle.
            </p>
            <svg width="320" height="100" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="10"
                y="10"
                width="300"
                height="60"
                rx="4"
                ry="4"
                stroke="#007EC1"
                fill="transparent"
                stroke-width="1"
              />

              <line
                x1="10"
                y1="40"
                x2="310"
                y2="40"
                stroke="#007EC1"
                stroke-width="1"
              />

              <line
                x1="130"
                y1="10"
                x2="130"
                y2="70"
                stroke="#007EC1"
                stroke-width="1"
              />
              <line
                x1="180"
                y1="10"
                x2="180"
                y2="70"
                stroke="#007EC1"
                stroke-width="1"
              />
              <line
                x1="230"
                y1="10"
                x2="230"
                y2="70"
                stroke="#007EC1"
                stroke-width="1"
              />
              <line
                x1="280"
                y1="10"
                x2="280"
                y2="70"
                stroke="#007EC1"
                stroke-width="1"
              />

              <text
                x="15"
                y="30"
                font-size="10"
                text-anchor="start"
                fill="black"
              >
                Beobachtungswoche
              </text>
              <text
                x="155"
                y="30"
                font-size="10"
                text-anchor="middle"
                fill="black"
              >
                0
              </text>
              <text
                x="205"
                y="30"
                font-size="10"
                text-anchor="middle"
                fill="black"
              >
                1
              </text>
              <text
                x="255"
                y="30"
                font-size="10"
                text-anchor="middle"
                fill="black"
              >
                2
              </text>
              <text
                x="295"
                y="30"
                font-size="10"
                text-anchor="middle"
                fill="black"
              >
                ...
              </text>

              <text
                x="15"
                y="60"
                font-size="10"
                text-anchor="start"
                fill="black"
              >
                Gewicht in g
              </text>
              <text
                x="155"
                y="60"
                font-size="10"
                font-weight="bold"
                text-anchor="middle"
                fill="black"
              >
                {data.gewicht}
              </text>
              <text
                x="205"
                y="60"
                font-size="10"
                font-weight="bold"
                text-anchor="middle"
                fill="black"
              >
                {data.gewicht * 2}
              </text>
              <text
                x="255"
                y="60"
                font-size="10"
                font-weight="bold"
                text-anchor="middle"
                fill="black"
              >
                {data.gewicht * 4}
              </text>
              <text
                x="295"
                y="60"
                font-size="10"
                text-anchor="middle"
                fill="black"
              >
                ...
              </text>
            </svg>

            <p>Berechne das Gewicht der Wassermelone nach 4 Wochen.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Ausgehend von Woche 2 in der Tabelle verdoppelt sich das Gewicht
              noch 2 mal:
            </p>
            <p>
              Woche 3: 2 · {data.gewicht * 4} = {data.gewicht * 8} [g]
            </p>
            <p>
              Woche 4: 2 · {data.gewicht * 8} = {data.gewicht * 16} [g]
            </p>
            <p>
              In Woche 4 beträgt das Gewicht <b>{data.gewicht * 16} g.</b>
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        function toX(n: number) {
          return 73 + n * (450 / 12)
        }
        function toY(n: number) {
          return 160 - n * (450 / 12)
        }
        function generateParabolaPoints(step: number): string {
          let points = ''
          for (let x = 0; x <= 10; x += step) {
            const y = 0.5 * x * x
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        function generateRootPoints(step: number): string {
          let points = ''
          for (let x = 0; x <= 10; x += step) {
            const y = 2 * Math.pow(x, 0.3)
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints = generateParabolaPoints(0.1)
        const RootPoints = generateRootPoints(0.1)
        return (
          <>
            <p>
              f) Sinja behauptet: „Der Graph in Abbildung 3 beschreibt das
              Wachstum dieser Wassermelone.“
            </p>
            <p>Hat Sinja recht? Begründe deine Entscheidung.</p>
            {data.case == 1 && (
              <svg viewBox="0 0 550 220">
                <image
                  href="/content/NRW_MSA_Melone_Graph.jpg"
                  height="220"
                  width="550"
                />
              </svg>
            )}
            {data.case == 2 && (
              <svg viewBox="0 0 550 220">
                <image
                  href="/content/NRW_MSA_Melone_Plot.PNG"
                  height="220"
                  width="550"
                />
                <polyline
                  points={parabolaPoints}
                  stroke="black"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            )}
            {data.case == 3 && (
              <svg viewBox="0 0 550 220">
                <image
                  href="/content/NRW_MSA_Melone_Plot.PNG"
                  height="220"
                  width="550"
                />
                <polyline
                  points={RootPoints}
                  stroke="black"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            )}
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            {data.case == 1 && (
              <>
                <p>
                  Der Graph in der Abbildung 3 stellt ein lineares Wachstum dar,
                  d.h. die Zunahme pro Zeitschritt ist immer gleich. <br></br>
                  Das Gewicht der Wassermelone sollte sich jedoch in jedem
                  Zeitschritt verdoppeln und wächst damit exponentiell.
                </p>
                <p>
                  <strong>Sinja hat nicht recht.</strong>
                </p>
              </>
            )}
            {data.case == 2 && (
              <>
                <p>
                  Der Graph in der Abbildung 3 wächst schnell an. In gleichen
                  Zeitabständen nimmt das Gewicht etwa um den doppelten Wert zu.
                  Damit stellt der Graph ungefähr das Wachstum der Wassermelone
                  dar.
                </p>
                <p>
                  <strong>Sinja hat recht.</strong>
                </p>
              </>
            )}
            {data.case == 3 && (
              <>
                <p>
                  Der Graph in der Abbildung 3 wächst zunehmend langsamer. Das
                  Gewicht der Wassermelone verdoppelt sich jedoch pro
                  Zeitschritt und wächst damit exponentiell.
                </p>
                <p>
                  <strong>Sinja hat nicht recht.</strong>
                </p>
              </>
            )}
          </>
        )
      },
    },
  ],
}
