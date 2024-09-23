import { Exercise } from '@/data/types'
import { buildInlineFrac, buildSqrt } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  seite: number
  lower: number
  show: Array<number>
  case: number
}

export const exercise47: Exercise<DATA> = {
  title: 'Dreieckmuster',
  source: '2018 Prüfungsteil / 2',
  useCalculator: true,
  duration: 10,
  points: [42],
  generator(rng) {
    return {
      seite: rng.randomIntBetween(6, 12),
      lower: rng.randomIntBetween(3, 8),
      case: rng.randomIntBetween(1, 3),
      show: rng.randomItemFromArray([
        [0, 1, 2, 3, 4, 5],
        [0, 1, 2, 3, 4, 6],
        [0, 1, 2, 3, 5, 6],
        [0, 1, 2, 4, 5, 6],
        [0, 1, 3, 4, 5, 6],
        [0, 2, 3, 4, 5, 6],
      ]),
    }
  },
  constraint({ data }) {
    return true
  },
  subtasks: {
    intro: ({ data }) => {
      return (
        <>
          <p>Die Sierpinski-Dreiecke entstehen folgendermaßen (Abbildung 1):</p>
          <ul>
            <li>
              Das Ausgangsdreieck ist ein gleichseitiges Dreieck (Figur 0).
            </li>
            <li>
              Die Mittelpunkte der Dreiecksseiten werden miteinander verbunden.
              Es entstehen vier kleine gleichseitige Dreiecke. Das mittlere
              Dreieck wird weiß gefärbt (Figur 1).
            </li>
            <li>
              Dieser Vorgang wird für alle schwarzen Dreiecke wiederholt (Figur
              2,3,4, ...).
            </li>
          </ul>
          <svg viewBox="0 0 328 100">
            <image
              href="/content/NRW_MSA_Sierpinski.PNG"
              height="100"
              width="328"
            />
          </svg>
          <p>Abbildung 1: Sierpinski-Dreiecke, Figur 0 bis Figur 4</p>
          <p>
            Jede Seitenlänge des Dreiecks in Figur 0 beträgt {data.seite} cm.
          </p>
        </>
      )
    },
    main: [
      {
        task({ data }) {
          return (
            <>
              <p>
                Bestätige durch eine Rechnung, dass der Flächeninhalt des
                Dreiecks in Figur 0 <br></br>A<sub>0</sub> ={' '}
                {pp(
                  roundToDigits(
                    (Math.pow(
                      data.seite * data.seite -
                        (data.seite / 2) * (data.seite / 2),
                      0.5,
                    ) *
                      data.seite) /
                      2,
                    2,
                  ),
                )}{' '}
                cm² beträgt (Abbildung 2).
              </p>
              <svg viewBox="0 0 328 170">
                <image
                  href="/content/NRW_MSA_Sierpinski_2.PNG"
                  height="170"
                  width="328"
                />
                <text
                  x={215}
                  y={85}
                  fontSize={20}
                  textAnchor="right"
                  stroke="black"
                >
                  {data.seite} cm
                </text>
              </svg>
              <p>Abbildung 2: Dreieck zu Figur 0.</p>
            </>
          )
        },
        solution({ data }) {
          return (
            <>
              <p>
                Verwende den Satz des Pythagoras im rechtwinkligen Dreieck, um
                die Höhe h zu berechnen.{' '}
              </p>
              <p>
                Es gilt: h² + {pp(data.seite / 2)}² = {data.seite}²
              </p>
              <p>
                Forme die Gleichung um und berechne h mit der Quadratwurzel.
              </p>
              <p>
                h ={' '}
                {buildSqrt(
                  data.seite * data.seite - (data.seite / 2) * (data.seite / 2),
                )}{' '}
                ≈{' '}
                {pp(
                  roundToDigits(
                    Math.pow(
                      data.seite * data.seite -
                        (data.seite / 2) * (data.seite / 2),
                      0.5,
                    ),
                    2,
                  ),
                )}{' '}
                cm
              </p>
              <p>Um die Dreiecksfläche zu berechnen, verwende die Formel:</p>
              <p>A = {buildInlineFrac('g · h', 2)}</p>
              <p>
                Hierbei ist g die Grundlinie mit der Länge {data.seite} cm und h
                die Höhe. Setze ein und berechne:
              </p>
              <p>
                A ={' '}
                {pp(
                  roundToDigits(
                    (Math.pow(
                      data.seite * data.seite -
                        (data.seite / 2) * (data.seite / 2),
                      0.5,
                    ) *
                      data.seite) /
                      2,
                    2,
                  ),
                )}{' '}
                cm²
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
                b) Begründe den folgenden Zusammenhang anhand der Abbildung 1:
                Der Flächeninhalt aller schwarzen Dreiecke einer neuen Figur
                beträgt {buildInlineFrac(3, 4)} der Fläche der schwarzen
                Dreiecke der vorherigen Figur.
              </p>
            </>
          )
        },
        solution({ data }) {
          return (
            <>
              <p>
                Durch Anwenden der Konstruktionsregeln des Sierpinskis-Dreiecks
                entstehen in jedem schwarzen Dreieck vier kleinere,
                gleichseitige Dreiecke. Eines davon ist weiß und drei schwarz,
                sodass die Fläche der schwarzen Dreiecke in der neuen Stufe{' '}
                {buildInlineFrac(3, 4)} der ursprünglichen Fläche beträgt.{' '}
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
                c) Der Flächeninhalt A<sub>n</sub> aller schwarzen Dreiecke in
                Figur n kann mit folgendem Term berechnet werden:<br></br>
                {pp(
                  roundToDigits(
                    (Math.pow(
                      data.seite * data.seite -
                        (data.seite / 2) * (data.seite / 2),
                      0.5,
                    ) *
                      data.seite) /
                      2,
                    2,
                  ),
                )}{' '}
                · 0,75<sup>n</sup> (in cm²).<br></br>Bei welcher Figur n beträgt
                der Flächeninhalt aller schwarzen Dreiecke zum ersten Mal
                weniger als {data.lower} cm²? Notiere dein Vorgehen.
              </p>
            </>
          )
        },
        solution({ data }) {
          const tries = Math.ceil(
            Math.log(
              data.lower /
                roundToDigits(
                  (Math.pow(
                    data.seite * data.seite -
                      (data.seite / 2) * (data.seite / 2),
                    0.5,
                  ) *
                    data.seite) /
                    2,
                  2,
                ),
            ) / Math.log(0.75),
          )
          return (
            <>
              <p>
                Hier gibt es viele unterschiedliche Rechenwege. Setze
                ganzzahlige Werte für n in den Taschenrechner ein und überprüfe
                das Ergebnis. Notiere diese Ergebnisse.
                <br></br>
                <br></br>
                {pp(
                  roundToDigits(
                    (Math.pow(
                      data.seite * data.seite -
                        (data.seite / 2) * (data.seite / 2),
                      0.5,
                    ) *
                      data.seite) /
                      2,
                    2,
                  ),
                )}{' '}
                · 0,75<sup>{tries - 1}</sup> {'>'} {data.lower}
                <br></br>
                <p>
                  Nach {tries - 1} Figuren ist der Flächeninhalt immer noch
                  größer als {data.lower} cm².
                </p>
                <br></br>
                {pp(
                  roundToDigits(
                    (Math.pow(
                      data.seite * data.seite -
                        (data.seite / 2) * (data.seite / 2),
                      0.5,
                    ) *
                      data.seite) /
                      2,
                    2,
                  ),
                )}{' '}
                · 0,75<sup>{tries}</sup> {'<'} {data.lower}
              </p>
              <p>
                Es braucht {tries} Figuren, damit der Flächeninhalt der
                schwarzen Dreiecke unter {data.lower} cm² fällt.
              </p>
            </>
          )
        },
      },
      {
        task({ data }) {
          function calculateValue(x: number): string {
            return pp(
              roundToDigits(
                Math.pow(3 / 12, x) *
                  ((Math.pow(
                    data.seite * data.seite -
                      (data.seite / 2) * (data.seite / 2),
                    0.5,
                  ) *
                    data.seite) /
                    2),
                3,
              ),
            )
          }
          function calculateValue2(x: number): string {
            return pp(
              roundToDigits(
                Math.pow(3, x) *
                  Math.pow(3 / 12, x) *
                  ((Math.pow(
                    data.seite * data.seite -
                      (data.seite / 2) * (data.seite / 2),
                    0.5,
                  ) *
                    data.seite) /
                    2),
                3,
              ),
            )
          }
          function calculateValue3(x: number): string {
            return pp(roundToDigits(Math.pow(0.75, x), 3))
          }

          return (
            <>
              <p>
                Vera berechnet mit einer Tabellenkalkulation die Flächeninhalte
                der schwarzen Dreiecke.
              </p>
              <svg viewBox="0 0 328 200">
                <image
                  href="/content/NRW_MSA_Sierpinski_3.PNG"
                  height="200"
                  width="328"
                />

                <text
                  x={280}
                  y={90 + 16 * data.show[0]}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  {calculateValue3(data.show[0])}
                </text>
                <text
                  x={280}
                  y={90 + 16 * data.show[1]}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  {calculateValue3(data.show[1])}
                </text>
                <text
                  x={280}
                  y={90 + 16 * data.show[2]}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  {calculateValue3(data.show[2])}
                </text>

                <text
                  x={280}
                  y={90 + 16 * data.show[3]}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  {calculateValue3(data.show[3])}
                </text>
                <text
                  x={280}
                  y={90 + 16 * data.show[4]}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  {calculateValue3(data.show[4])}
                </text>
                <text
                  x={280}
                  y={90 + 16 * data.show[5]}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  {calculateValue3(data.show[5])}
                </text>
                <text
                  x={220}
                  y={90}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  {calculateValue2(0)}
                </text>
                <text
                  x={220}
                  y={105}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  {calculateValue2(1)}
                </text>
                <text
                  x={220}
                  y={121}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  {calculateValue2(2)}
                </text>
                <text
                  x={220}
                  y={137}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  {calculateValue2(3)}
                </text>
                <text
                  x={220}
                  y={153}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  {calculateValue2(4)}
                </text>
                <text
                  x={220}
                  y={169}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  {calculateValue2(5)}
                </text>
                <text
                  x={220}
                  y={187}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  {calculateValue2(6)}
                </text>
                <text
                  x={165}
                  y={90}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  {calculateValue(0)}
                </text>
                <text
                  x={165}
                  y={105}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  {calculateValue(1)}
                </text>
                <text
                  x={165}
                  y={121}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  {calculateValue(2)}
                </text>
                <text
                  x={165}
                  y={137}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  {calculateValue(3)}
                </text>
                <text
                  x={165}
                  y={153}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  {calculateValue(4)}
                </text>
                <text
                  x={165}
                  y={169}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  {calculateValue(5)}
                </text>
                <text
                  x={165}
                  y={187}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  {calculateValue(6)}
                </text>
                <text
                  x={115}
                  y={90}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  1
                </text>
                <text
                  x={115}
                  y={105}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  3
                </text>
                <text
                  x={115}
                  y={120}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  9
                </text>
                <text
                  x={115}
                  y={137}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  27
                </text>
                <text
                  x={115}
                  y={154}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  81
                </text>
                <text
                  x={110}
                  y={170}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  243
                </text>
                <text
                  x={110}
                  y={186}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  729
                </text>
              </svg>
              <p>
                Berechne den fehlenden Wert in Spalte E. Runde auf drei
                Nachkommastellen.
              </p>
            </>
          )
        },
        solution({ data }) {
          function calculateValue3(x: number): string {
            return pp(roundToDigits(Math.pow(0.75, x), 3))
          }
          return (
            <>
              <p>
                Der Anteil an der Gesamtfläche beginnt mit 1 (100 %) und beträgt
                in der darauffolgenden Stufe immer {buildInlineFrac(3, 4)} vom
                vorherigen Wert, so wie die Fläche der schwarzen Dreiecke.
              </p>
              <p>
                Der fehlende Wert ist:{' '}
                {calculateValue3(
                  [0, 1, 2, 3, 4, 5, 6].filter(
                    value => !data.show.includes(value),
                  )[0] - 1,
                )}{' '}
                · {buildInlineFrac(3, 4)} ={' '}
                {calculateValue3(
                  [0, 1, 2, 3, 4, 5, 6].filter(
                    value => !data.show.includes(value),
                  )[0],
                )}
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
                e) Betrachte die Zelle {data.case == 1 && 'D3'}
                {data.case == 2 && 'D4'}
                {data.case == 3 && 'D5'}. Gib eine Formel an, mit der sich der
                Wert in dieser Zelle berechnen lässt.
              </p>
            </>
          )
        },
        solution({ data }) {
          return (
            <>
              <p>
                Die Fläche aller schwarzen Dreiecke ergibt sich durch die Fläche
                eines einzelnen Dreiecks (Spalte C), multipliziert mit der
                Anzahl (Spalte B):
              </p>
              <p>
                {data.case == 1 && 'D3 = B3 · C3'}
                {data.case == 2 && 'D4 = B4 · C4'}
                {data.case == 3 && 'D5 = B5 · C5'}
              </p>
            </>
          )
        },
      },
      {
        task({ data }) {
          function calculateValue(x: number): string {
            return pp(
              roundToDigits(
                Math.pow(3 / 12, x) *
                  ((Math.pow(
                    data.seite * data.seite -
                      (data.seite / 2) * (data.seite / 2),
                    0.5,
                  ) *
                    data.seite) /
                    2),
                3,
              ),
            )
          }
          return (
            <>
              <p>
                f) Die Summe der Flächeninhalte der schwarzen und der weiße
                Dreiecke ergibt in jeder Figur zusammen {calculateValue(0)} cm².{' '}
                <br></br>Wie entwickeln sich die Flächeninhalte der schwarzen
                und weißen Flächen, wenn man die Figuren immer weiter fortsetzt?
                Beschreibe.
              </p>
            </>
          )
        },
        solution({ data }) {
          return (
            <>
              <p>
                Die Fläche der schwarzen Dreiecke wird zunehmend geringer und
                geht gegen 0 cm². Die weißen Flächen entsprechen genau dem
                Gegenstück der schwarzen Flächen und nehmen den Rest des
                Dreiecks ein. Ihre Fläche geht demnach gegen{' '}
                {pp(
                  roundToDigits(
                    (Math.pow(
                      data.seite * data.seite -
                        (data.seite / 2) * (data.seite / 2),
                      0.5,
                    ) *
                      data.seite) /
                      2,
                    2,
                  ),
                )}{' '}
                cm².
              </p>
            </>
          )
        },
      },
    ],
  },
}
