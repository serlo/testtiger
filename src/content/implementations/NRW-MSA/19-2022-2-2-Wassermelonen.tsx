import { Exercise } from '@/data/types'
import { buildInlineFrac, buildSqrt } from '@/helper/math-builder'
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
  source: '2022 Prüfungsteil 2 / 2',
  useCalculator: false,
  duration: 10,
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
            <p>V = {buildInlineFrac(4, 3)} · π · r³</p>
            <p>
              Der Radius beträgt: r = {buildInlineFrac('d', 2)} ={' '}
              {data.durchmesser / 2} cm
            </p>
            <p>Setze die Werte ein und runde das Ergebnis:</p>
            <p>
              V = {buildInlineFrac(4, 3)} · π · {pp(data.durchmesser / 2)}³
            </p>
            <p>V = {pp(roundToDigits(V, 2))}</p>
            <p>V ≈ {pp(roundToDigits(V, -2))} cm³</p>
          </>
        )
      },
    },
    {
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
              Der innere Radius bis zur Schale beträgt: r<sub>innen</sub> ={' '}
              {pp(data.durchmesser / 2)} − {pp(data.schale)} = {pp(r)} cm
            </p>
            <p>Berechne damit das Volumen des Fruchfleisches in der Melone:</p>
            <p>
              V = {buildInlineFrac(4, 3)} · π · {pp(r)}³
            </p>
            <p>V = {pp(V)} cm³</p>
            <p>Berechne den Anteil des Fruchtfleisches vom ganzen Volumen:</p>
            <p>
              {buildInlineFrac(pp(V), pp(V_außen))} = {pp(roundToDigits(p, 4))}{' '}
              ≙ {pp(roundToDigits(p * 100, 2))} %
            </p>
          </>
        )
      },
    },
    {
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
            <p>a = {buildSqrt(pp(V), 3)}</p>
            <p>a ≈ {pp(roundToDigits(Math.pow(V, 1 / 3), 2))} cm</p>
          </>
        )
      },
    },
    {
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
            <p>Berechne die Oberfläche des Würfels:</p>
            <p>O = 6 · a²</p>
            <p>
              a ist hierbei die Kantenlänge des Würfels. Setze die Werte ein:
            </p>
            <p>O = 6 · {pp(roundToDigits(Math.pow(V, 1 / 3), 2))}²</p>
            <p>O = {pp(O1)} cm²</p>
            <p>
              Berechne die Oberfläche der kugelförmigen Melone und vergleiche:
            </p>
            <p>O = 4 · π · r²</p>
            <p>O = 4 · π · {pp(data.durchmesser / 2)}²</p>
            <p>O = {pp(O2)} cm²</p>
            <p>
              {O1 > O2
                ? 'Die würfelförmige Melone hat bei gleichem Volumen eine größere Oberfläche.'
                : 'Die kugelförmige Melone hat bei gleichem Volumen eine größere Oberfläche.'}
            </p>
          </>
        )
      },
    },
    {
      task({ data }) {
        return (
          <>
            <p>
              e) Wassermelonen verdoppeln ihr Gewicht pro Woche unter idealen
              Wachstumsbedingungen. Sinja überlegt, wie sich das Gewicht einer{' '}
              {data.gewicht} g schweren Wassermelone unter idealen Bedingungen
              voraussichtlich entwickelt. Sie erstellt dazu eine Tabelle.
            </p>
            <svg viewBox="0 0 550 120">
              <image
                href="/content/NRW_MSA_Melone_Tabelle.PNG"
                height="120"
                width="550"
              />
              <text
                x={175}
                y={80}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {data.gewicht}
              </text>
              <text
                x={275}
                y={80}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {data.gewicht * 2}
              </text>
              <text
                x={375}
                y={80}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {data.gewicht * 4}
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
            <p>Woche 3: {data.gewicht * 8} g</p>
            <p>Woche 4: {data.gewicht * 16} g</p>
            <p>In Woche 4 beträgt das Gewicht {data.gewicht * 16} g.</p>
          </>
        )
      },
    },
    {
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
                  d.h. die Zunahme pro Zeitschritt ist immer gleich. Das Gewicht
                  der Wassermelone verdoppelt sich jedoch pro Zeitschritt und
                  wächst damit exponentiell.
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
