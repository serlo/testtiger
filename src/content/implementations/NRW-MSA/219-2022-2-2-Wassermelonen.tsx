import { Exercise } from '@/data/types'
import { buildInlineFrac, buildRoot, buildSqrt } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import build from 'next/dist/build'

interface DATA {
  durchmesser: number
  schale: number
  gewicht: number
}

export const exercise219: Exercise<DATA> = {
  title: '2022 Prüfungsteil 2 /2) Wassermelonen',
  useCalculator: false,
  duration: -10,
  generator(rng) {
    return {
      durchmesser: rng.randomIntBetween(20, 30),
      schale: rng.randomIntBetween(3, 7) / 2,
      gewicht: rng.randomIntBetween(2, 6) * 100,
    }
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
  subtasks: {
    tasks: [
      ({ data }) => {
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
            <svg viewBox="0 0 500 350" className="h-[300px]">
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
                Math.round(
                  ((4 / 3) * Math.PI * Math.pow(data.durchmesser / 2, 3)) / 100,
                ) * 100,
              )}{' '}
              cm³{' '}
            </p>
          </>
        )
      },

      ({ data }) => {
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
      ({ data }) => {
        return (
          <>
            <p>
              c) Sinja entdeckt würfelförmige Wassermelonen, die in Japan
              verkauft werden (Abbildungen 2).
            </p>
            <p>
              Eine würfelförmige Wassermelone hat ebenfalls ein Volumen von V ≈{' '}
              {pp(
                Math.round(
                  ((4 / 3) * Math.PI * Math.pow(data.durchmesser / 2, 3)) / 100,
                ) * 100,
              )}{' '}
              cm³ .
            </p>
            <p>
              Bestätige durch eine Rechnung, dass diese Wassermelone eine
              Kantenlänge von ca.{' '}
              {pp(
                Math.round(
                  Math.pow(
                    Math.round(
                      ((4 / 3) * Math.PI * Math.pow(data.durchmesser / 2, 3)) /
                        100,
                    ) * 100,
                    1 / 3,
                  ) * 100,
                ) / 100,
              )}{' '}
              cm hat.
            </p>
            <svg viewBox="0 0 500 350" className="h-[300px]">
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
      ({ data }) => {
        return (
          <>
            <p>
              d) Entscheide durch eine Rechnung, ob die kugelförmige oder die
              würfelförmige Wassermelone eine größere Oberfläche hat.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              e) Wassermelonen verdoppeln ihr Gewicht pro Woche unter idealen
              Wachstumsbedingungen. Sinja überlegt, wie sich das Gewicht einer{' '}
              {data.gewicht} g schweren Wassermelone unter idealen Bedingungen
              voraussichtlich entwickelt. Sie erstellt dazu eine Tabelle.
            </p>
            <svg viewBox="0 0 550 120" className="h-[120px]">
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
      ({ data }) => {
        return (
          <>
            <p>
              f) Sinja behauptet: „Der Graph in Abbildung 3 beschreibt das
              Wachstum dieser Wassermelone.“
            </p>
            <p>Hat Sinja recht? Begründe deine Entscheidung.</p>
            <svg viewBox="0 0 550 220" className="h-[220px]">
              <image
                href="/content/NRW_MSA_Melone_Graph.jpg"
                height="220"
                width="550"
              />
            </svg>
          </>
        )
      },
    ],
    solutions: [
      ({ data }) => {
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
              V = {buildInlineFrac(4, 3)} · π · {data.durchmesser / 2}³
            </p>
            <p>
              V ={' '}
              {pp(
                Math.round(
                  (4 / 3) * Math.PI * Math.pow(data.durchmesser / 2, 3) * 100,
                ) / 100,
              )}
            </p>
            <p>
              V ≈{' '}
              {pp(
                Math.round(
                  ((4 / 3) * Math.PI * Math.pow(data.durchmesser / 2, 3)) / 100,
                ) * 100,
              )}{' '}
              cm³
            </p>
          </>
        )
      },

      ({ data }) => {
        return (
          <>
            <p>
              Der innere Radius bis zur Schale beträgt: r<sub>innen</sub> ={' '}
              {data.durchmesser / 2} − {pp(data.schale)} ={' '}
              {pp(data.durchmesser / 2 - data.schale)} cm
            </p>
            <p>Berechne damit das Volumen des Fruchfleisches in der Melone:</p>
            <p>
              V = {buildInlineFrac(4, 3)} · π ·{' '}
              {data.durchmesser / 2 - data.schale}³
            </p>
            <p>
              V ={' '}
              {pp(
                Math.round(
                  (4 / 3) *
                    Math.PI *
                    Math.pow(data.durchmesser / 2 - data.schale, 3) *
                    100,
                ) / 100,
              )}{' '}
              cm³
            </p>
            <p>Berechne den Anteil des Fruchtfleisches vom ganzen Volumen:</p>
            <p>
              {buildInlineFrac(
                pp(
                  Math.round(
                    (4 / 3) *
                      Math.PI *
                      Math.pow(data.durchmesser / 2 - data.schale, 3) *
                      100,
                  ) / 100,
                ),
                pp(
                  Math.round(
                    ((4 / 3) * Math.PI * Math.pow(data.durchmesser / 2, 3)) /
                      100,
                  ) * 100,
                ),
              )}{' '}
              ={' '}
              {pp(
                Math.round(
                  (Math.round(
                    (4 / 3) *
                      Math.PI *
                      Math.pow(data.durchmesser / 2 - data.schale, 3) *
                      100,
                  ) /
                    100 /
                    (Math.round(
                      ((4 / 3) * Math.PI * Math.pow(data.durchmesser / 2, 3)) /
                        100,
                    ) *
                      100)) *
                    10000,
                ) / 10000,
              )}{' '}
              ≙{' '}
              {pp(
                Math.round(
                  (Math.round(
                    (4 / 3) *
                      Math.PI *
                      Math.pow(data.durchmesser / 2 - data.schale, 3) *
                      100,
                  ) /
                    100 /
                    (Math.round(
                      ((4 / 3) * Math.PI * Math.pow(data.durchmesser / 2, 3)) /
                        100,
                    ) *
                      100)) *
                    10000,
                ) / 100,
              )}{' '}
              %
            </p>
          </>
        )
      },
      ({ data }) => {
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
            <p>
              a ={' '}
              {buildRoot(
                pp(
                  Math.round(
                    ((4 / 3) * Math.PI * Math.pow(data.durchmesser / 2, 3)) /
                      100,
                  ) * 100,
                ),
                3,
              )}
            </p>
            <p>
              a ≈{' '}
              {pp(
                Math.round(
                  Math.pow(
                    Math.round(
                      ((4 / 3) * Math.PI * Math.pow(data.durchmesser / 2, 3)) /
                        100,
                    ) * 100,
                    1 / 3,
                  ) * 100,
                ) / 100,
              )}{' '}
              cm
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>Berechne die Oberfläche des Würfels:</p>
            <p>O = 6 · a²</p>
            <p>
              a ist hierbei die Kantenlänge des Würfels. Setze die Werte ein:
            </p>
            <p>
              O = 6 ·{' '}
              {pp(
                Math.round(
                  Math.pow(
                    Math.round(
                      ((4 / 3) * Math.PI * Math.pow(data.durchmesser / 2, 3)) /
                        100,
                    ) * 100,
                    1 / 3,
                  ) * 100,
                ) / 100,
              )}
              ²
            </p>
            <p>
              O ={' '}
              {pp(
                Math.round(
                  6 *
                    (Math.round(
                      Math.pow(
                        Math.round(
                          ((4 / 3) *
                            Math.PI *
                            Math.pow(data.durchmesser / 2, 3)) /
                            100,
                        ) * 100,
                        1 / 3,
                      ) * 100,
                    ) /
                      100) *
                    (Math.round(
                      Math.pow(
                        Math.round(
                          ((4 / 3) *
                            Math.PI *
                            Math.pow(data.durchmesser / 2, 3)) /
                            100,
                        ) * 100,
                        1 / 3,
                      ) * 100,
                    ) /
                      100) *
                    100,
                ) / 100,
              )}{' '}
              cm²
            </p>
            <p>
              Berechne die Oberfläche der kugelförmigen Melone und vergleiche:
            </p>
            <p>O = 4 · π · r²</p>
            <p>O = 4 · π · {data.durchmesser / 2}²</p>
            <p>
              O ={' '}
              {pp(
                Math.round(
                  4 * Math.PI * Math.pow(data.durchmesser / 2, 2) * 100,
                ) / 100,
              )}{' '}
              cm²
            </p>
            <p>
              {Math.round(
                6 *
                  (Math.round(
                    Math.pow(
                      Math.round(
                        ((4 / 3) *
                          Math.PI *
                          Math.pow(data.durchmesser / 2, 3)) /
                          100,
                      ) * 100,
                      1 / 3,
                    ) * 100,
                  ) /
                    100) *
                  (Math.round(
                    Math.pow(
                      Math.round(
                        ((4 / 3) *
                          Math.PI *
                          Math.pow(data.durchmesser / 2, 3)) /
                          100,
                      ) * 100,
                      1 / 3,
                    ) * 100,
                  ) /
                    100) *
                  100,
              ) /
                100 >
              Math.round(
                4 * Math.PI * Math.pow(data.durchmesser / 2, 2) * 100,
              ) /
                100
                ? 'Die würfelförmige Melone hat bei gleichem Volumen eine größere Oberfläche.'
                : 'Die kugelförmige Melone hat bei gleichem Volumen eine größere Oberfläche.'}
            </p>
          </>
        )
      },
      ({ data }) => {
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
      ({ data }) => {
        return (
          <>
            <p>
              Der Graph in der Abbildung 3 stellt ein lineares Wachstum dar,
              d.h. die Zunahme pro Zeitschritt ist immer gleich. Das Gewicht der
              Wassermelone verdoppelt sich jedoch pro Zeitschritt und wächst
              damit exponentiell.
            </p>
            <p>
              <strong>Sinja hat nicht recht.</strong>
            </p>
          </>
        )
      },
    ],
  },
}