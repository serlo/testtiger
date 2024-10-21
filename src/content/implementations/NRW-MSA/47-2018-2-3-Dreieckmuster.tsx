import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'
import { Fragment } from 'react'

interface DATA {
  seite: number
  h: number
  f0: number
  lower: number
  show: Array<number>
  case: number
}

export const exercise47: Exercise<DATA> = {
  title: 'Dreieckmuster',
  source: '2018 Teil 2 Aufgabe 3',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    const seite = rng.randomIntBetween(6, 12)
    const h = roundToDigits(
      Math.pow(seite * seite - (seite / 2) * (seite / 2), 0.5),
      2,
    )
    return {
      seite,
      h,
      f0: roundToDigits((h * seite) / 2, 2),
      lower: rng.randomIntBetween(3, 7),
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
  intro({ data }) {
    return (
      <>
        <p>Die Sierpinski-Dreiecke entstehen folgendermaßen (Abbildung 1):</p>
        <ul>
          <li>Das Ausgangsdreieck ist ein gleichseitiges Dreieck (Figur 0).</li>
          <li>
            Die Mittelpunkte der Dreiecksseiten werden miteinander verbunden. Es
            entstehen vier kleine gleichseitige Dreiecke. Das mittlere Dreieck
            wird weiß gefärbt (Figur 1).
          </li>
          <li>
            Dieser Vorgang wird für alle schwarzen Dreiecke wiederholt (Figur
            2,3,4, ...).
          </li>
        </ul>
        <img src="/content/NRW_MSA_Sierpinski.PNG" width={328} alt="" />
        <p>Abbildung 1: Sierpinski-Dreiecke, Figur 0 bis Figur 4</p>
        <p>Jede Seitenlänge des Dreiecks in Figur 0 beträgt {data.seite} cm.</p>
      </>
    )
  },
  tasks: [
    {
      points: 3,
      task({ data }) {
        return (
          <>
            <p>
              a) Bestätige durch eine Rechnung, dass der Flächeninhalt des
              Dreiecks in Figur 0 <br></br>A<sub>0</sub> = {pp(data.f0)} cm²
              beträgt (Abbildung 2).
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
              <strong>Höhe berechnen</strong>
            </p>
            <p>
              Verwende den Satz des Pythagoras im rechtwinkligen Dreieck, um die
              Höhe h zu berechnen. Es gilt:{' '}
            </p>
            {buildEquation([
              [
                <>h² + {pp(data.seite / 2)}²</>,
                '=',
                <>{data.seite}²</>,
                <>| − {pp(data.seite / 2)}²</>,
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
                    <span style={{ fontSize: 'small' }}>Nach h umstellen</span>
                  </Color4>
                </>,
              ],
              [
                <>h²</>,
                '=',
                <>
                  {data.seite}² − {pp(data.seite / 2)}²
                </>,
                <>| √</>,
              ],
              [
                <>h</>,
                '=',
                <>
                  {buildSqrt(
                    <>
                      {data.seite}² − {pp(data.seite / 2)}²
                    </>,
                  )}
                </>,
              ],
              [<>h</>, '≈', <>{pp(data.h)} [cm]</>],
            ])}
            <p>
              <strong>Flächeninhalt berechnen</strong>
            </p>
            <p>Um die Dreiecksfläche zu berechnen, verwende die Formel:</p>
            <p>A = {buildInlineFrac('g · h', 2)}</p>
            <p>
              Hierbei ist g die Grundlinie mit der Länge {data.seite} cm und h
              die Höhe. Setze ein und berechne:
            </p>
            {buildEquation([
              ['A', '=', <>{buildInlineFrac('g · h', 2)}</>],
              [
                '',
                '=',
                <>
                  {buildInlineFrac(
                    <>
                      {data.seite} · {pp(data.h)}
                    </>,
                    2,
                  )}
                </>,
              ],
              [
                '',
                '=',
                <>
                  <strong>{pp(data.f0)} [cm²]</strong>
                </>,
              ],
            ])}
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
              b) Begründe den folgenden Zusammenhang anhand der Abbildung 1: Der
              Flächeninhalt aller schwarzen Dreiecke einer neuen Figur beträgt{' '}
              {buildInlineFrac(3, 4)} der Fläche der schwarzen Dreiecke der
              vorherigen Figur.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              In jedem Schritt entstehen in jedem schwarzen Dreieck vier
              kleinere, gleich große Dreiecke. Eines davon ist weiß und drei
              schwarz, sodass die Fläche der schwarzen Dreiecke in der neuen
              Stufe {buildInlineFrac(3, 4)} der ursprünglichen Fläche beträgt.{' '}
            </p>
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
              c) Der Flächeninhalt A<sub>n</sub> aller schwarzen Dreiecke in
              Figur n kann mit folgendem Term berechnet werden:<br></br>
              {pp(data.f0)} · 0,75<sup>n</sup> (in cm²).<br></br>Bei welcher
              Figur n beträgt der Flächeninhalt aller schwarzen Dreiecke zum
              ersten Mal weniger als {data.lower} cm²? Notiere dein Vorgehen.
            </p>
          </>
        )
      },
      solution({ data }) {
        const tries = Math.ceil(Math.log(data.lower / data.f0) / Math.log(0.75))
        return (
          <>
            <p>Hier gibt es viele unterschiedliche Lösungswege. </p>
            <p>
              Setze zum Beispiel ganzzahlige Werte für n in den Taschenrechner
              ein und überprüfe das Ergebnis. Notiere diese Ergebnisse.
            </p>
            <p>
              {pp(data.f0)} · 0,75<sup>{tries - 1}</sup> ={' '}
              {pp(roundToDigits(data.f0 * Math.pow(0.75, tries - 1), 2))}{' '}
              <strong>{'>'}</strong> {data.lower}
            </p>
            <p>
              Nach {tries - 1} Figuren ist der Flächeninhalt immer noch größer
              als {data.lower} cm².
            </p>
            <p>
              {pp(data.f0)} · 0,75<sup>{tries}</sup> ={' '}
              {pp(roundToDigits(data.f0 * Math.pow(0.75, tries), 2))}{' '}
              <strong>{'<'}</strong> {data.lower}
            </p>
            <p>
              Es braucht <strong>{tries} Figuren</strong>, damit der
              Flächeninhalt der schwarzen Dreiecke unter {data.lower} cm² fällt.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      task({ data }) {
        function calculateValue(x: number): string {
          return pp(roundToDigits(Math.pow(3 / 12, x) * data.f0, 3))
        }
        function calculateValue2(x: number): string {
          return pp(
            roundToDigits(Math.pow(3, x) * Math.pow(3 / 12, x) * data.f0, 3),
          )
        }
        function calculateValue3(x: number): string {
          return pp(roundToDigits(Math.pow(0.75, x), 3))
        }

        return (
          <>
            <p>
              d) Vera berechnet mit einer Tabellenkalkulation die Flächeninhalte
              der schwarzen Dreiecke.
            </p>
            <svg viewBox="0 0 328 200">
              <image
                href="/content/NRW_MSA_Sierpinski_3.PNG"
                height="200"
                width="328"
              />
              {data.show.map(i => (
                <text
                  key={i}
                  x={280}
                  y={90 + 16 * i}
                  fontSize={10}
                  textAnchor="right"
                  stroke="black"
                >
                  {calculateValue3(i)}
                </text>
              ))}

              {[0, 1, 2, 3, 4, 5, 6].map(i => (
                <Fragment key={i}>
                  <text
                    x={165}
                    y={90 + 16 * i}
                    fontSize={10}
                    textAnchor="right"
                    stroke="black"
                  >
                    {calculateValue(i)}
                  </text>
                  <text
                    x={220}
                    y={90 + 16 * i}
                    fontSize={10}
                    textAnchor="right"
                    stroke="black"
                  >
                    {calculateValue2(i)}
                  </text>
                  <text
                    x={127}
                    y={90 + i * 16}
                    fontSize={10}
                    textAnchor="end"
                    stroke="black"
                  >
                    {Math.pow(3, i)}
                  </text>
                </Fragment>
              ))}
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
              Der Anteil der Gesamtfläche beträgt in der darauffolgenden Stufe
              immer {buildInlineFrac(3, 4)} vom vorherigen Wert, so wie die
              Fläche der schwarzen Dreiecke.
            </p>
            <p>Der fehlende Wert ist:</p>{' '}
            {calculateValue3(
              [0, 1, 2, 3, 4, 5, 6].find(value => !data.show.includes(value))! -
                1,
            )}{' '}
            · {buildInlineFrac(3, 4)} ={' '}
            <strong>
              {calculateValue3(
                [0, 1, 2, 3, 4, 5, 6].find(
                  value => !data.show.includes(value),
                )!,
              )}
            </strong>
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
              eines einzelnen Dreiecks (Spalte C), multipliziert mit der Anzahl
              (Spalte B):
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
      points: 3,
      task({ data }) {
        return (
          <>
            <p>
              f) Die Summe der Flächeninhalte der schwarzen und der weiße
              Dreiecke ergibt in jeder Figur zusammen {pp(data.f0)} cm².{' '}
              <br></br>Wie entwickeln sich die Flächeninhalte der schwarzen und
              weißen Flächen, wenn man die Figuren immer weiter fortsetzt?
              Beschreibe.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die Fläche der schwarzen Dreiecke wird in weniger Stufe um 25 %
              geringer und geht damit gegen <strong>0 cm²</strong>.{' '}
            </p>
            <p>
              Die weißen Flächen entsprechen genau dem Gegenstück der schwarzen
              Flächen und nehmen den Rest des Dreiecks ein. Ihre Fläche geht
              demnach gegen <br></br>
              <strong>{pp(data.f0)} cm²</strong>.
            </p>
          </>
        )
      },
    },
  ],
}
