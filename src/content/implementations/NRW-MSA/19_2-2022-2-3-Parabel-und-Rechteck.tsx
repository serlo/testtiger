import { Exercise } from '@/data/types'
import { Color1, Color2, Color4 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp, ppFrac, ppPolynom } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'
import { isNumberObject } from 'util/types'

interface DATA {
  a: number
  x: number
  y: number
}

export const exercise192: Exercise<DATA> = {
  title: 'Parabel und Rechteck',
  source: '2022 Teil 2 Aufgabe 3',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    return {
      a: rng.randomIntBetween(-4, -1) / 2,
      x: rng.randomIntBetween(2, 5),
      y: rng.randomIntBetween(2, 5),
    }
  },
  constraint({ data }) {
    const b = data.y + data.x * data.x * Math.abs(data.a)
    return (b * 2) % 1 == 0 && b + data.a < 9
  },
  intro({ data }) {
    const b = data.y + data.x * data.x * Math.abs(data.a)
    function toX(n: number) {
      return 350 + n * (450 / 12)
    }
    function toY(n: number) {
      return 412 - n * (450 / 12)
    }
    function generateParabolaPoints(
      a: number,
      b: number,

      step: number,
    ): string {
      let points = ''
      for (let x = -8; x <= 8; x += step) {
        const y = a * x * x + b
        points += `${toX(x)},${toY(y)} `
      }
      return points.trim()
    }
    const parabolaPoints = generateParabolaPoints(data.a, b, 0.1)

    return (
      <>
        <p>
          Julia zeichnet mithilfe einer Geometriesoftware die Parabel f mit der
          Funktionsgleichung{' '}
        </p>
        <p>
          f(x) ={' '}
          {ppPolynom([
            [data.a, 'x', 2],
            [b, 'x', 0],
          ])}
        </p>
        <p>in ein Koordinatensystem (Abbildung 1).</p>
        <svg viewBox="0 0 700 450" className="max-w-[328px]">
          <image href="/content/NRW_MSA_KS_groß.png" width="700" height="450" />
          <polyline
            points={parabolaPoints}
            stroke="blue"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </>
    )
  },
  tasks: [
    {
      duration: 2,
      points: 2,
      task({ data }) {
        return (
          <>
            <p>
              a) Bestätige durch eine Rechnung, dass der Punkt A<sub>1</sub>(
              {data.x}|{data.y}) auf der Parabel f liegt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const b = data.y + data.x * data.x * Math.abs(data.a)
        return (
          <>
            <p>
              Setze die Werte für x und y in die Funktionsgleichung ein und
              überprüfe ob die Gleichung erfüllt ist:
            </p>
            {buildEquation([
              [
                <>f(x)</>,
                <>=</>,
                <>
                  {ppPolynom([
                    [data.a, 'x', 2],
                    [b, 'x', 0],
                  ])}
                </>,
              ],
              [
                <>{data.y}</>,
                <>=</>,
                <>
                  {pp(data.a)} · {data.x}² + {pp(b)}
                </>,
              ],
              [
                <>{data.y}</>,
                <>=</>,
                <>
                  {pp(data.a * data.x * data.x)} + {pp(b)}
                </>,
              ],
              [<>{data.y}</>, <>=</>, <>{data.y}</>],
            ])}

            <p>
              Auf beiden Seiten steht der gleiche Wert, wodurch die Gleichung
              erfüllt ist. Damit liegt A<sub>1</sub> auf der Parabel.
            </p>
          </>
        )
      },
    },
    {
      duration: 1,
      points: 3,
      task({ data }) {
        return (
          <>
            <p>
              b) Begründe mit den Eigenschaften dieser Parabel, dass der Punkt B
              <sub>1</sub>({pp(-data.x)}|{data.y}) ebenfalls auf dem Graphen von
              f liegt.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die Parabel ist achsensymmetrisch zur y-Achse. Spiegelt man den
              Punkt A<sub>1</sub>({data.x}|{data.y}) an der y-Achse, so erhält
              man den Punkt B<sub>1</sub>({pp(-data.x)}|{data.y}). Dieser liegt
              also ebenfalls auf dem Graphen von f.
            </p>
          </>
        )
      },
    },
    {
      duration: 2,
      points: 2,
      task({ data }) {
        return (
          <>
            <p>
              c) Die Punkte C<sub>1</sub> und D<sub>1</sub> liegen auf der
              x-Achse und bilden mit den Punkten A<sub>1</sub> und B<sub>1</sub>{' '}
              das Rechteck A<sub>1</sub>B<sub>1</sub>C<sub>1</sub>D<sub>1</sub>.
            </p>
            <p>Berechne den Umfang dieses Rechtecks.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Bestimme die Seitenlängen des Rechtecks und berechne den Umfang.
            </p>
            <p>
              U<sub>Rechteck</sub> = 2 · a + 2 · b
            </p>
            <p>Bestimme a und b aus der Abbildung:</p>
            <ul>
              <li>
                <Color1>
                  a = {data.x} + {data.x} = {data.x * 2}
                </Color1>
              </li>
              <li>
                <Color2>b = {data.y}</Color2>
              </li>
            </ul>

            <p>
              Damit beträgt der Umfang <br></br>U<sub>Rechteck</sub> = 2 ·{' '}
              <Color1>{data.x * 2}</Color1> + 2 · <Color2>{data.y}</Color2> ={' '}
              {data.x * 2 * 2 + 2 * data.y} cm.
            </p>
          </>
        )
      },
    },
    {
      duration: 5,
      points: 3,
      task({ data }) {
        const b = data.y + data.x * data.x * Math.abs(data.a)
        return (
          <>
            <p>
              d) Ausgehend von anderen Punkten auf der Parabel f kann man auf
              die gleiche Art weitere Rechtecke zeichnen.
            </p>
            <p>
              (1) Zeichne den Punkt A<sub>2</sub>(1|{pp(b + data.a)}) in
              Abbildung 1 ein.
            </p>
            <p>
              (2) Ergänze die drei weiteren Punkte B<sub>2</sub>,C<sub>2</sub>{' '}
              und D<sub>2</sub> und verbinde die vier Punkte zu dem Rechteck A
              <sub>2</sub>B<sub>2</sub>C<sub>2</sub>D<sub>2</sub>.
            </p>
          </>
        )
      },
      solution({ data }) {
        const b = data.y + data.x * data.x * Math.abs(data.a)
        function toX(n: number) {
          return 352 + n * (450 / 12)
        }
        function toY(n: number) {
          return 412 - n * (450 / 12)
        }
        function generateParabolaPoints(
          a: number,
          b: number,

          step: number,
        ): string {
          let points = ''
          for (let x = -8; x <= 8; x += step) {
            const y = a * x * x + b
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints = generateParabolaPoints(
          data.a,

          b,
          0.1,
        )
        return (
          <>
            <p>Deine Skizze sollte etwa so aussehen:</p>
            <svg viewBox="0 0 700 450" className="max-w-[328px]">
              <image
                href="/content/NRW_MSA_KS_groß.png"
                width="700"
                height="450"
              />
              <polyline
                points={parabolaPoints}
                stroke="blue"
                strokeWidth="3"
                fill="none"
              />

              <text
                x={toX(1) - 5}
                y={toY(b + data.a) + 7}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'×'}A2
              </text>
              <text
                x={toX(-1) - 30}
                y={toY(b + data.a) + 7}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                B2
                {'×'}
              </text>
              <text
                x={toX(1) - 5}
                y={toY(0) + 7}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'×'}D2
              </text>
              <text
                x={toX(-1) - 31}
                y={toY(0) + 7}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                C2{'×'}
              </text>
              <rect
                x={toX(-1)}
                y={toY(b + data.a)} // obere linke Ecke
                width={toX(1) - toX(-1)} // Breite des Rechtecks
                height={toY(0) - toY(b + data.a)} // Höhe des Rechtecks
                fill="none" // Farbe des Rechtecks
                stroke="black"
                strokeWidth={2}
              />
            </svg>
          </>
        )
      },
    },
    {
      duration: 2,
      points: 2,
      task({ data }) {
        const b = data.y + data.x * data.x * Math.abs(data.a)
        return (
          <>
            <p>
              e) Mit dem Term (I) kann man den Umfang für jedes dieser Rechtecke
              berechnen:
            </p>
            <p>
              2 · 2x + 2 · (
              {ppPolynom([
                [data.a, 'x', 2],
                [b, 'x', 0],
              ])}
              )
            </p>
            <p>
              Dabei ist x{' > '}0 und steht für die x-Koordinate des zum
              Rechteck gehörenden Punktes A<sub>1</sub>, A<sub>2</sub> usw.
            </p>
            <p>
              Berechne mit dem Term (I) den Umfang des Rechtecks, das durch den
              Punkt <br></br>A<sub>2</sub>(1|{pp(b + data.a)}) festgelegt ist.
            </p>
          </>
        )
      },
      solution({ data }) {
        const b = data.y + data.x * data.x * Math.abs(data.a)
        return (
          <>
            <p>Setze die x-Koordinate in den Term ein:</p>
            {buildEquation([
              [
                <>
                  {' '}
                  U<sub>Rechteck </sub>
                </>,
                '=',
                <>
                  2 · 2x + 2 · ({ppPolynom([[data.a, 'x', 2]])} + {pp(b)})
                </>,
              ],
              [
                '',
                '=',
                <>
                  2 · 2 · 1 + 2 · ({pp(data.a)} · 1<sup>2</sup> + {pp(b)})
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
                    <span style={{ fontSize: 'small' }}>Zusammenfassen</span>
                  </Color4>
                </>,
              ],
              [
                '',
                '=',
                <>
                  4 + 2 · ({pp(data.a)} + {pp(b)})
                </>,
              ],
              [
                '',
                '=',
                <>
                  <strong>{pp(4 + 2 * (data.a + b))}</strong>
                </>,
              ],
            ])}

            <p>
              Der Umfang beträgt <strong>{pp(4 + 2 * (data.a + b))} cm</strong>.
            </p>
          </>
        )
      },
    },
    {
      duration: 3,
      points: 3,
      task({ data }) {
        const b = data.y + data.x * data.x * Math.abs(data.a)
        return (
          <>
            <p>f) Julia vereinfacht den Term (I) zu (II):</p>
            <p>
              {ppPolynom([
                [data.a * 2, 'x', 2],
                [4, 'x', 1],
                [2 * b, 'x', 0],
              ])}
            </p>
            <p>
              Zeige durch Termumformungen, dass die beiden Terme (I) und (II)
              gleichwertig sind.
            </p>
          </>
        )
      },
      solution({ data }) {
        const b = data.y + data.x * data.x * Math.abs(data.a)
        return (
          <>
            <p>Beginne mit Term (I) und multipliziere die Klammer aus:</p>

            {buildEquation([
              [
                '',
                '',
                <>
                  2 · 2x + <Color1>2</Color1> · (
                  {ppPolynom([
                    [data.a, 'x', 2],
                    [b, 'x', 0],
                  ])}
                  )
                </>,
              ],

              [
                '',
                '=',
                <>
                  2 · 2x + <Color1>2</Color1> · ({ppPolynom([[data.a, 'x', 2]])}
                  ) + <Color1>2</Color1> · {ppPolynom([[b, 'x', 0]])}
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
                    <span style={{ fontSize: 'small' }}>Zusammenfassen</span>
                  </Color4>
                </>,
              ],
              [
                '',
                '=',
                <>
                  {ppPolynom([
                    [4, 'x', 1],
                    [data.a * 2, 'x', 2],
                    [b * 2, 'x', 0],
                  ])}
                </>,
              ],
              [
                '',
                '=',
                <>
                  {ppPolynom([
                    [data.a * 2, 'x', 2],
                    [4, 'x', 1],
                    [b * 2, 'x', 0],
                  ])}{' '}
                </>,
              ],
            ])}
            <p>
              Term (I) wurde durch Umformung zu Term (II), womit die Terme (I)
              und (II) gleichwertig sind.
            </p>
          </>
        )
      },
    },
    {
      duration: 5,
      points: 4,
      task({ data }) {
        const b = data.y + data.x * data.x * Math.abs(data.a)
        const c = 3.75
        const zahl = 2 * b + 2 * Math.abs(data.a) * c
        return (
          <>
            <p>g) Julia stellt die folgende Gleichung auf:</p>
            <p>
              {ppPolynom([
                [data.a * 2, 'x', 2],
                [4, 'x', 1],
                [2 * b, 'x', 0],
              ])}{' '}
              = {pp(zahl)}
            </p>
            <p>(1) Löse die Gleichung.</p>
            <p>
              (2) Erkläre das Ergebnis in Bezug auf die Rechtecke unter der
              Parabel f.
            </p>
          </>
        )
      },
      solution({ data }) {
        const b = data.y + data.x * data.x * Math.abs(data.a)
        const c = 3.75
        const zahl = 2 * b + 2 * Math.abs(data.a) * c

        const k_b = 4 / (2 * data.a)
        const k_c = (2 * b - zahl) / (2 * data.a)

        return (
          <>
            <p>
              Das ist eine quadratische Gleichung. Forme die Gleichung zuerst
              um, damit du die pq-Formel anwenden kannst:
            </p>
            {buildEquation([
              [
                <>
                  {ppPolynom([[data.a * 2, 'x', 2]])} + 4x + {pp(2 * b)}
                </>,
                <>=</>,
                <>{pp(zahl)}</>,
                <>| {pp(-zahl)} </>,
              ],
              [
                <>
                  {' '}
                  {ppPolynom([[data.a * 2, 'x', 2]])} + 4x{' '}
                  {pp(2 * b - zahl, 'merge_op')}
                </>,
                <>=</>,
                <>0</>,
                <>| : ({pp(data.a * 2)})</>,
              ],
              [
                <>
                  x<sup>2</sup> {ppFrac(k_b, 'koeff')}x + {pp(k_c)}
                </>,
                <>=</>,
                <>0</>,
              ],
            ])}

            <p>
              Setze die Werte p = {ppFrac(k_b)} und q = {pp(k_c)} in die
              pq-Formel ein:{' '}
            </p>
            {buildEquation([
              [
                <>
                  x<sub>1/2</sub>
                </>,
                <>=</>,
                <>
                  − {buildInlineFrac('p', 2)} ±{' '}
                  {buildSqrt(
                    <>
                      <span className="inline-block  scale-y-[2.6]">(</span>
                      {buildInlineFrac('p', 2)}
                      <span className="inline-block  scale-y-[2.6]">)</span>² −
                      q
                    </>,
                  )}
                </>,
              ],
              [
                <>
                  x<sub>1/2</sub>
                </>,
                <>=</>,
                <>
                  − {buildInlineFrac(<>({ppFrac(k_b)})</>, 2)} ±{' '}
                  {buildSqrt(
                    <>
                      <span className="inline-block  scale-y-[2.6]">(</span>
                      {buildInlineFrac(<>{ppFrac(k_b)}</>, 2)}
                      <span className="inline-block  scale-y-[2.6]">)</span>² −
                      {pp(k_c)}
                    </>,
                  )}
                </>,
              ],
              [
                <>
                  x<sub>1/2</sub>
                </>,
                <>=</>,
                <>
                  {ppFrac(-k_b / 2)} ±{' '}
                  {buildSqrt(
                    <>
                      {!Number.isInteger(k_b / 2) ? (
                        <span className="inline-block  scale-y-[2.6]">(</span>
                      ) : (
                        '('
                      )}
                      {ppFrac(k_b / 2)}
                      {!Number.isInteger(k_b / 2) ? (
                        <span className="inline-block  scale-y-[2.6]">)</span>
                      ) : (
                        ')'
                      )}
                      ² −{pp(k_c)}
                    </>,
                  )}
                </>,
              ],
              [
                <>
                  x<sub>1/2</sub>
                </>,
                <>=</>,
                <>
                  {ppFrac(-k_b / 2)} ±{' '}
                  {buildSqrt(
                    <>{pp(roundToDigits((k_b / 2) * (k_b / 2) - k_c, 2))}</>,
                  )}
                </>,
              ],
            ])}

            {data.a * 2 == -1 ? (
              <>
                <p>Die Gleichung besitzt die Lösungen:</p>
                <p>
                  <strong>
                    x<sub>1</sub> ={' '}
                    {ppFrac((-4 / (2 * Math.abs(data.a)) + 1) / 2)}
                    <br></br>x<sub>2</sub> ={' '}
                    {ppFrac((-4 / (2 * Math.abs(data.a)) - 1) / 2)}
                  </strong>
                </p>
                <p>
                  <strong>Erklärung:</strong> Die Lösung bedeutet, dass für die
                  x-Werte x<sub>1</sub> ={' '}
                  {ppFrac((-4 / (2 * Math.abs(data.a)) + 1) / 2)} und x
                  <sub>2</sub> = {ppFrac((-4 / (2 * Math.abs(data.a)) - 1) / 2)}{' '}
                  ein Rechteck mit dem Umfang {pp(zahl)} existiert.
                </p>
              </>
            ) : (
              <p>
                <strong>Erklärung:</strong> Die Gleichung besitzt keine Lösung,
                da der Wert unter der Wurzel negativ ist. <br></br>Das bedeutet,
                dass es kein Rechteck mit dem Umfang {pp(zahl)} geben kann.
              </p>
            )}
          </>
        )
      },
    },
  ],
}
