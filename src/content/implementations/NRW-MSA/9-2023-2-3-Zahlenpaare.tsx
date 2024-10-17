import { Exercise } from '@/data/types'
import { Color1, Color2, Color4 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  task_4: number
  task_2: number
  task_3: number
  task_5: number
  task_6: number
}

export const exercise9: Exercise<DATA> = {
  title: 'Zahlenpaare',
  source: '2023 Teil 2 Aufgabe 3',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    return {
      task_2: rng.randomItemFromArray([6, 8, 12, 14]),
      task_3: rng.randomIntBetween(10, 30) * 2,
      task_4: rng.randomIntBetween(2, 8) * 10,
      task_5: rng.randomIntBetween(1, 10) * 10,
      task_6: rng.randomIntBetween(30, 70),
    }
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Merle hat Spaß an Zahlen und ist immer auf der Suche nach Tricks, um
          den Rechenaufwand einer Aufgabe zu verringern. Bei der Addition der
          Zahlen von 1 bis 10 bemerkt sie:
        </p>
        <p>
          {'„'}Die beiden Zahlen 1 und 10 ergeben zusammen 11, ebenso wie die
          beiden Zahlen 2 und 9, die Zahlen 3 und 8 usw. Da ich so fünf
          Zahlenpaare jeweils mit dem Wert 11 bilden kann, muss ich nur 5 ⋅ 11
          rechnen und erhalte das Ergebnis 55.{'“'} (Abbildung 1)
        </p>
        <svg viewBox="0 0 328 140">
          <image
            href="/content/NRW_MSA_Zahlenpaare.png"
            height="140"
            width="328"
          />
        </svg>
        <p>Abbildung 1: Rechentrick für die Addition der Zahlen von 1 bis 10</p>
      </>
    )
  },
  tasks: [
    {
      points: 2,
      task({ data }) {
        const hrefs = '/content/NRW_Zahlenpaare' + data.task_2 + '.PNG'

        return (
          <>
            <p>
              a) Wende Merles Trick auf die Addition der Zahlen von 1 bis{' '}
              {data.task_2} an, indem du Abbildung 2 vervollständigst.
            </p>
            <svg viewBox="0 0 328 140">
              <image href={hrefs} height="140" width="328" />
            </svg>
            <p>Abbildung 2: Addition der Zahlen von 1 bis {data.task_2}</p>
          </>
        )
      },
      solution({ data }) {
        const hrefs2 = '/content/NRW_Zahlenpaare_sol' + data.task_2 + '.PNG'
        return (
          <>
            <p>Fülle die Kästchen und Lücken der Abbildung aus:</p>
            <svg viewBox="0 0 328 140">
              <image href={hrefs2} height="140" width="328" />
            </svg>
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
              b) Merle verwendet den Trick für aufwendigere Additionen. Damit
              die Rechnungen übersichtlich bleiben, ersetzt sie fehlende
              Summanden durch Pünktchen. In Abbildung 3 ist Merles Berechnung
              für die Summe der Zahlen von 1 bis {data.task_3} dargestellt.
            </p>
            <svg viewBox="0 0 328 50">
              <text
                x={0}
                y={30}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                1 + 2 + 3 + ... + {data.task_3 - 2} + {data.task_3 - 1} +{' '}
                {data.task_3} =
              </text>
              <text
                x={247}
                y={30}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                ·
              </text>
              <text
                x={280}
                y={30}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                = {(data.task_3 / 2) * (data.task_3 + 1)}
              </text>
              <rect
                x={225}
                y={15} // obere linke Ecke
                width={20} // Breite des Rechtecks
                height={20} // Höhe des Rechtecks
                fill="none" // Farbe des Rechtecks
                stroke="black"
                strokeWidth={2}
              />
              <rect
                x={255}
                y={15} // obere linke Ecke
                width={20} // Breite des Rechtecks
                height={20} // Höhe des Rechtecks
                fill="none" // Farbe des Rechtecks
                stroke="black"
                strokeWidth={2}
              />
            </svg>
            <p>Abbildung 3: Addition der Zahlen von 1 bis {data.task_3}</p>
            <p>
              Begründe, dass in den Kästchen die Zahlen {data.task_3 / 2} bzw.{' '}
              {data.task_3 + 1} stehen müssen.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Wende die gleiche Vorgehensweise wie in Abbildung 2 an.</p>
            <ul>
              <li>Bestimme die Anzahl der Zahlenpaare: {data.task_3 / 2}</li>
              <li>
                Bestimme die Summe der ersten und letzten Zahl:{' '}
                {data.task_3 + 1}
              </li>
            </ul>
            <p>Diese Zahlen müssen in den Kästchen stehen.</p>
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
              c) Merle findet einen allgemeinen Term, um die Summe der Zahlen
              von 1 bis n zu berechnen. Sie notiert {buildInlineFrac(1, 2)} ​n ⋅
              (n + 1).
            </p>
            <ol>
              <li>
                Berechne mit dem Term den Wert der Summe für n = {data.task_4}.
              </li>
              <li>
                Erläutere die Bedeutung der Faktoren {buildInlineFrac(1, 2)} ​n
                und (n + 1) im Zusammenhang mit dem Rechentrick.
              </li>
            </ol>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>1. Setze den Wert in den Term ein und fasse zusammen:</p>
            <p>{buildInlineFrac(1, 2)} ​n ⋅ (n + 1)</p>
            <p>
              = {buildInlineFrac(1, 2)} ⋅ {data.task_4} ⋅ {data.task_4 + 1}
            </p>
            <p>= {0.5 * data.task_4 * (data.task_4 + 1)}</p>
            <p>
              2. Der Term {buildInlineFrac(1, 2)} ​n beschreibt die Anzahl der
              Zahlenpaare in der Summe. Diese beträgt immer die Hälfte des
              höchsten Wertes. <br></br>
              <br></br>(n + 1) ist die Summe der einzelnen Zahlenpaare, was zum
              Beispiel aus der Summe {'"'}1 + höchste Zahl{'"'} ersichtlich
              wird.
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
              d) Merle formt den Term um und erhält: <br></br>{' '}
              {buildInlineFrac(1, 2)} ​n² + {buildInlineFrac(1, 2)} ​n{' '}
            </p>
            <p>
              Berechne den Wert der Summe für n = {data.task_5} mit diesem
              vereinfachten Term.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Setze den Wert in den Term ein und fasse zusammen:</p>
            <p>
              {buildInlineFrac(1, 2)} ​n² + {buildInlineFrac(1, 2)} ​n
            </p>
            <p>
              = {buildInlineFrac(1, 2)} ⋅ {data.task_5}² +{' '}
              {buildInlineFrac(1, 2)} ⋅ {data.task_5}
            </p>
            <p>
              = {0.5 * data.task_5 * data.task_5} + {0.5 * data.task_5}
            </p>
            <p>= {0.5 * data.task_5 * data.task_5 + 0.5 * data.task_5}</p>
          </>
        )
      },
    },
    {
      points: 6,
      task({ data }) {
        return (
          <>
            <p>e)</p>{' '}
            <ol>
              <li>
                Berechne die beiden Lösungen der Gleichung{' '}
                {buildInlineFrac(1, 2)} ​n² + {buildInlineFrac(1, 2)} ​n ={' '}
                {data.task_6 * 0.5 * data.task_6 + 0.5 * data.task_6}.
              </li>
              <li>
                Erkläre, warum nur eine Lösung für den Kontext sinnvoll ist.
              </li>
            </ol>
          </>
        )
      },
      solution({ data }) {
        const c = data.task_6 * 0.5 * data.task_6 + 0.5 * data.task_6
        return (
          <>
            <p>
              1. Das ist eine quadratische Gleichung. Bringe alle Terme auf eine
              Seite der Gleichung, um sie mit der Mitternachtsformel lösen zu
              können:
            </p>
            <p>
              {buildInlineFrac(1, 2)} ​n² + {buildInlineFrac(1, 2)} ​n - {c} = 0
            </p>
            <p>
              Setze die Parameter a = {buildInlineFrac(1, 2)}, b ={' '}
              {buildInlineFrac(1, 2)} und <br></br>c = {pp(-c)} in die
              Mitternachtsformel ein und berechne die Lösungen.
            </p>
            <p>
              n<sub>1/2</sub> ={' '}
              {buildInlineFrac(
                <>
                  <span style={{ verticalAlign: 'middle' }}>−b ± </span>
                  {buildSqrt('b² − 4ac')}
                </>,
                '2 · a',
              )}
            </p>
            <p>
              n<sub>1/2</sub> ={' '}
              {buildInlineFrac(
                <>
                  <span style={{ verticalAlign: 'middle' }}>− 0,5 ± </span>
                  {buildSqrt('0,25' + ' − 4 · 0,5 · (' + pp(-c) + ')')}
                </>,
                '1',
              )}
            </p>
            <p>
              n<sub>1/2</sub> ={' '}
              {buildInlineFrac(
                <>
                  <span style={{ verticalAlign: 'middle' }}>− 0,5 ± </span>
                  {buildSqrt(pp(4 * c * 0.5 + 0.25))}
                </>,
                '1',
              )}
            </p>
            <p>
              n<sub>1</sub> = − 0,5 + {pp(Math.pow(4 * c * 0.5 + 0.25, 0.5))} ={' '}
              {Math.pow(4 * c * 0.5 + 0.25, 0.5) - 0.5}
            </p>
            <p>
              n<sub>2</sub> = − 0,5 − {pp(Math.pow(4 * c * 0.5 + 0.25, 0.5))} ={' '}
              {pp(-Math.pow(4 * c * 0.5 + 0.25, 0.5) - 0.5)}
            </p>
            <p>
              Die beiden Lösungen der Gleichung sind n<sub>1</sub> und n
              <sub>2</sub>, wobei in unserem Kontext n keine negative Zahl sein
              kann. Damit ist die einzige sinnvolle Lösung n<sub>1</sub> ={' '}
              {Math.pow(4 * c * 0.5 + 0.25, 0.5) - 0.5}.
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
              f) {'„'}Bei meinem Rechentrick muss man die Summanden paarweise
              zusammenfassen. Daher nehme ich an, dass meine Formel für ungerade
              Zahlen nicht gilt{'“'}, meint Merle.
            </p>
            <p>
              Für ungerade Zahlen n entwickeln Merle und ihr Freund Silas den
              Term<br></br>
              {buildInlineFrac(1, 2)}​(n − 1) ⋅ n + n.
            </p>
            <p>
              Silas behauptet: {'„'}Es ist egal, welchen Term wir nehmen, da die
              Terme {buildInlineFrac(1, 2)}​(n − 1) ⋅ n + n und{' '}
              {buildInlineFrac(1, 2)} ​n² + {buildInlineFrac(1, 2)} ​n
              gleichwertig sind.{'“'}
            </p>
            <p>Zeige durch Termumformungen, dass Silas Behauptung stimmt.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Multipliziere den Term mit der Klammer aus und vereinfache:</p>
            {buildEquation([
              [
                '',
                <>
                  <Color1>{buildInlineFrac(1, 2)}​</Color1>(n − 1) ⋅ n + n
                </>,
              ],
              [
                '=',
                <>
                  <span className="inline-block  scale-y-[2.6]">(</span>
                  <Color1>{buildInlineFrac(1, 2)}</Color1>n −{' '}
                  <Color1>{buildInlineFrac(1, 2)}</Color1>
                  <span className="inline-block  scale-y-[2.6]">)</span> ⋅ n + n
                </>,
              ],
              [
                '=',
                <>
                  <span className="inline-block  scale-y-[2.6]">(</span>
                  {buildInlineFrac(1, 2)}n − {buildInlineFrac(1, 2)}
                  <span className="inline-block  scale-y-[2.6]">)</span> ⋅{' '}
                  <Color2>n</Color2> + n
                </>,
              ],
              [
                '=',
                <>
                  {buildInlineFrac(1, 2)} <Color2>n²</Color2> −{' '}
                  {buildInlineFrac(1, 2)} <Color2>n</Color2> + n
                </>,
              ],
              [
                <>
                  {' '}
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>Zusammenfassen</span>
                  </Color4>
                </>,
              ],
              [
                '=',
                <>
                  {buildInlineFrac(1, 2)} n² + {buildInlineFrac(1, 2)} n
                </>,
              ],
            ])}

            <p>
              Die Terme sind gleichwertig, da sie ineinander umgeformt werden
              können.
            </p>
          </>
        )
      },
    },
  ],
}
