import { Exercise } from '@/data/types'
import { Color1 } from '@/helper/colors'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac, ppPolynom } from '@/helper/pretty-print'

interface DATA {
  n1: number
  n2: number
  ys2: number
  xr: number
  yr: number
  a: number
}

export const exercise248: Exercise<DATA> = {
  title: 'Parabeln + Körper',
  source: '2022 Wahlteil B - Aufgabe 2',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      n1: rng.randomIntBetween(-3, 1),
      n2: rng.randomIntBetween(4, 8),
      ys2: rng.randomIntBetween(3, 6),
      xr: rng.randomIntBetween(4, 8),
      yr: rng.randomIntBetween(3, 6),
      a: rng.randomItemFromArray([-0.25, -0.5, -1, -2]),
    }
  },
  originalData: { n1: -1, n2: 3, ys2: 6, xr: 4, yr: 5, a: -0.25 },
  constraint({ data }) {
    const y1 =
      -data.n1 * -data.n2 -
      ((-data.n1 - data.n2) / 2) * ((-data.n1 - data.n2) / 2)
    const x1 = -(-data.n1 - data.n2) / 2
    const m = (data.ys2 - y1) / -x1
    return m % 1 == 0
  },
  intro({ data }) {
    return null
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        function toX(n: number) {
          return 92 + n * 22.1
        }
        function toY(n: number) {
          return 148.5 - n * 22
        }
        function generateParabolaPoints(): string {
          let points = ''
          for (let x = -4; x <= 11; x += 0.1) {
            const y = (x - data.n1) * (x - data.n2)
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        function generateParabolaPoints2(): string {
          let points = ''
          for (let x = -4; x <= 11; x += 0.1) {
            const y = data.a * x * x + data.ys2
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints = generateParabolaPoints()
        const parabolaPoints2 = generateParabolaPoints2()
        return (
          <>
            <p>
              Das Schaubild zeigt Ausschnitte der verschobenen Normalparabel p
              <sub>1</sub> und der nach unten geöffneten Parabel p<sub>2</sub>.
            </p>
            <svg viewBox="0 0 328 220">
              <image
                href="/content/BW_Realschule/227_KS.png"
                height="220"
                width="328"
              />
              <polyline
                points={parabolaPoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={parabolaPoints2}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              {data.a == -2 && (
                <>
                  <text
                    x={toX(-1) - 3}
                    y={toY(data.ys2 - 2) + 3}
                    fontSize={10}
                    textAnchor="left"
                    stroke="black"
                  >
                    × T({pp(-1)}|{data.ys2 - 2})
                  </text>
                </>
              )}
              {data.a == -1 && (
                <>
                  <text
                    x={toX(-1) - 3}
                    y={toY(data.ys2 - 1) + 3}
                    fontSize={10}
                    textAnchor="left"
                    stroke="black"
                  >
                    × T({pp(-1)}|{data.ys2 - 1})
                  </text>
                </>
              )}
              {data.a == -0.5 && (
                <>
                  <text
                    x={toX(-2) - 3}
                    y={toY(data.ys2 - 2) + 3}
                    fontSize={10}
                    textAnchor="left"
                    stroke="black"
                  >
                    × T({pp(-2)}|{data.ys2 - 2})
                  </text>
                </>
              )}
              {data.a == -0.25 && (
                <>
                  <text
                    x={toX(-2) - 3}
                    y={toY(data.ys2 - 1) + 3}
                    fontSize={10}
                    textAnchor="left"
                    stroke="black"
                  >
                    × T({pp(-2)}|{data.ys2 - 1})
                  </text>
                </>
              )}
              <text
                x={toX(data.xr) - 4}
                y={toY(data.yr) + 3}
                fontSize={10}
                textAnchor="left"
                stroke="black"
              >
                × R({pp(data.xr)}|{data.yr})
              </text>
              <text
                x={toX(0) - 3}
                y={toY(data.ys2) + 3}
                fontSize={10}
                textAnchor="left"
                stroke="black"
              >
                × S2(0|{data.ys2})
              </text>
              <text
                x={315}
                y={160}
                fontSize={15}
                textAnchor="left"
                stroke="black"
              >
                x
              </text>
              <text
                x={105}
                y={10}
                fontSize={15}
                textAnchor="left"
                stroke="black"
              >
                y
              </text>
            </svg>
            <ul>
              <li>
                Bestimme die Funktionsgleichungen der beiden Parabeln. Entnimm
                dazu geeignete Werte aus dem Schaubild.
              </li>
            </ul>
            <p>
              Die Gerade g verläuft durch die beiden Scheitelpunkte S
              <sub>1</sub> und S<sub>2</sub>
            </p>
            <ul>
              <li>Berechne die Funktionsgleichung von g.</li>
            </ul>
            <p>
              Die Gerade h verläuft senkrecht zu g und geht durch den Punkt R(
              {pp(data.xr)}|{pp(data.yr)}).
            </p>
            <ul>
              <li>Berechne die Funktionsgleichung von h.</li>
            </ul>
            <ul>
              <li>
                Gib die Funktionsgleichung einer weiteren verschobenen nach oben
                geöffneten Normalparabel p<sub>3</sub> an, die keine Punkte mit
                p<sub>1</sub> und p<sub>2</sub> gemeinsam hat.
              </li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const y1 =
          -data.n1 * -data.n2 -
          ((-data.n1 - data.n2) / 2) * ((-data.n1 - data.n2) / 2)
        const x1 = -(-data.n1 - data.n2) / 2
        const m = (data.ys2 - y1) / -x1
        return (
          <>
            <p>
              <strong>
                Funktionsgleichungen von p<sub>1</sub> und p<sub>2</sub>
              </strong>
            </p>
            <p>
              p<sub>1</sub> ist nach oben geöffnet und hat die Nullstellen N
              <sub>1</sub>({pp(data.n1)}|0) und N<sub>2</sub>({pp(data.n2)}|0).
            </p>
            <p>Setze die Nullstellen in die Nullstellenform ein:</p>
            <p>
              y = (x − {pp(data.n1, 'embrace_neg')})(x −{' '}
              {pp(data.n2, 'embrace_neg')})
            </p>
            <p>Multipliziere die Klammern aus:</p>
            <p>
              <strong>
                y = x² {pp(-data.n1 - data.n2, 'koeff')}x{' '}
                {pp(-data.n1 * -data.n2, 'koeff')}
              </strong>
            </p>
            <p>
              p<sub>2</sub> hat ihren Scheitel auf der y-Achse und ist eine nach
              unten geöffnete Normalparabel.{' '}
            </p>
            <p>Der Funktionsterm lautet allgemein:</p>
            <p>y = ax² + c</p>
            <p>
              Der Scheitel lautet S<sub>2</sub>(0|
              <Color1>{pp(data.ys2)}</Color1>). Damit ist die Funktion:
            </p>
            <p>
              y = ax² <Color1>{pp(data.ys2, 'merge_op')}</Color1>
            </p>
            <p>
              Setze den Punkt{' '}
              {data.a == -2 && (
                <>
                  T({pp(-1)}|{data.ys2 - 2})
                </>
              )}
              {data.a == -1 && (
                <>
                  T({pp(-1)}|{data.ys2 - 1})
                </>
              )}
              {data.a == -0.5 && (
                <>
                  T({pp(-2)}|{data.ys2 - 2})
                </>
              )}
              {data.a == -0.25 && (
                <>
                  T({pp(-2)}|{data.ys2 - 1})
                </>
              )}{' '}
              ein und bestimme a:
            </p>
            {data.a == -2 && (
              <>
                {buildEquation([
                  [
                    <>{data.ys2 - 2}</>,
                    <>=</>,
                    <>
                      a · ({pp(-1)})² {pp(data.ys2, 'merge_op')}
                    </>,
                    <>| {pp(-data.ys2, 'merge_op')}</>,
                  ],
                  [<>{pp(-1)}</>, <>=</>, <>{ppPolynom([[1, 'a', 1]])} </>],
                  [<>a</>, <>=</>, <>{pp(data.a)}</>],
                ])}
              </>
            )}
            {data.a == -1 && (
              <>
                {buildEquation([
                  [
                    <>{data.ys2 - 1}</>,
                    <>=</>,
                    <>
                      a · ({pp(-1)})² {pp(data.ys2, 'merge_op')}
                    </>,
                    <>| {pp(-data.ys2, 'merge_op')}</>,
                  ],
                  [<>{pp(-1)}</>, <>=</>, <>{ppPolynom([[1, 'a', 1]])}</>],
                  [<>a</>, <>=</>, <>{pp(data.a)}</>],
                ])}
              </>
            )}
            {data.a == -0.5 && (
              <>
                {buildEquation([
                  [
                    <>{data.ys2 - 2}</>,
                    <>=</>,
                    <>
                      a · ({pp(-2)})² {pp(data.ys2, 'merge_op')}
                    </>,
                    <>| {pp(-data.ys2, 'merge_op')}</>,
                  ],
                  [
                    <>{pp(-2)}</>,
                    <>=</>,
                    <>{ppPolynom([[4, 'a', 1]])}</>,
                    <>| : 4</>,
                  ],
                  [<>a</>, <>=</>, <>{pp(data.a)}</>],
                ])}
              </>
            )}
            {data.a == -0.25 && (
              <>
                {buildEquation([
                  [
                    <>{data.ys2 - 1}</>,
                    <>=</>,
                    <>
                      a · ({pp(-2)})² {pp(data.ys2, 'merge_op')}
                    </>,
                    <>| {pp(-data.ys2, 'merge_op')}</>,
                  ],
                  [
                    <>{pp(-1)}</>,
                    <>=</>,
                    <>{ppPolynom([[4, 'a', 1]])}</>,
                    <>| : 4</>,
                  ],
                  [<>a</>, <>=</>, <>{pp(data.a)}</>],
                ])}
              </>
            )}
            <p>
              Damit hat p<sub>2</sub> den Funktionsterm:
            </p>
            <p>
              <strong>
                y = {ppPolynom([[data.a, 'x', 2]])} + {data.ys2}
              </strong>
            </p>
            <p>
              <strong>Funktionsgleichung von g</strong>
            </p>
            <p>
              Die Gerade g verläuft durch die Scheitelpunkte der Parabeln.
              Bestimme die Scheitelform von p<sub>1</sub>:
            </p>
            {buildEquation([
              [
                <>y</>,
                <>=</>,
                <>
                  x² {pp(-data.n1 - data.n2, 'koeff')}x{' '}
                  {pp(-data.n1 * -data.n2, 'koeff')}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  x² {pp(-data.n1 - data.n2, 'koeff')}x +
                  {pp((-data.n1 - data.n2) / 2, 'embrace_neg')}²{' '}
                  {pp(-data.n1 * -data.n2, 'koeff')} −
                  {pp((-data.n1 - data.n2) / 2, 'embrace_neg')}²
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  (x {pp((-data.n1 - data.n2) / 2, 'merge_op')})
                  {pp(
                    -data.n1 * -data.n2 -
                      ((-data.n1 - data.n2) / 2) * ((-data.n1 - data.n2) / 2),
                    'merge_op',
                  )}
                  ²
                </>,
              ],
            ])}
            <p>
              Der Scheitelpunkt lautet: S<sub>1</sub>({pp(x1)}|{pp(y1)})
            </p>
            <p>
              Bestimme die Steigung der Geraden g durch die beiden Punkte mit
              der Formel:
            </p>
            {buildEquation([
              [
                <>m</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>
                      y<sub>2</sub> − y<sub>1</sub>
                    </>,
                    <>
                      x<sub>2</sub> − x<sub>1</sub>
                    </>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>
                      {pp(data.ys2)} − {pp(y1, 'embrace_neg')}
                    </>,
                    <>0 − {pp(x1, 'embrace_neg')}</>,
                  )}
                </>,
              ],
              [<></>, <>=</>, <>{ppFrac((data.ys2 - y1) / -x1)}</>],
            ])}
            <p>
              Da die Gerade durch den Punkt (0|{pp(data.ys2)}) verläuft kann der
              ganze Funktionsterm angegeben werden als:
            </p>
            <p>
              <strong>
                y = {ppFrac((data.ys2 - y1) / -x1)}x {pp(data.ys2, 'merge_op')}
              </strong>
            </p>
            <p>
              <strong>Gerade h</strong>
            </p>
            <p>h verläuft senkrecht zu g. Für die beiden Steigungen gilt:</p>
            {buildEquation([
              [
                <>
                  m<sub>h</sub> · m<sub>g</sub>
                </>,
                <>=</>,
                <>−1</>,
              ],
              [
                <>
                  m<sub>h</sub> · {ppFrac(m, 'embrace_neg')}
                </>,
                <>=</>,
                <>−1</>,
                <>| : {ppFrac(m, 'embrace_neg')}</>,
              ],
              [
                <>
                  m<sub>h</sub>
                </>,
                <>=</>,
                <>{ppFrac(-1 / m)}</>,
              ],
            ])}
            <p>
              Die Gerade h verläuft durch R({pp(data.xr)}|{pp(data.yr)}). Setze
              den Punkt in die Funktionsgleichung ein:
            </p>
            {buildEquation([
              [<>y</>, <>=</>, <>{ppFrac(-1 / m)}x + b</>],
              [
                <>{pp(data.yr)}</>,
                <>=</>,
                <>
                  {ppFrac(-1 / m)} · {pp(data.xr)} + b
                </>,
                <>| − {ppFrac([-1 * data.xr, m])}</>,
              ],
              [<>b</>, <>=</>, <>{ppFrac(data.yr - -data.xr / m)}</>],
            ])}
            <p>Der Funktionsterm lautet damit:</p>
            <p>
              <strong>
                y = {ppFrac(-1 / m)}x{' '}
                {ppFrac(data.yr - -data.xr / m, 'merge_op')}
              </strong>
            </p>
            <p>
              <strong>
                Funktionsterm von p<sub>3</sub>
              </strong>
            </p>
            <p>
              Der Scheitel von p<sub>3</sub> sollte oberhalb des Scheitels von p
              <sub>2</sub> liegen und mittig in p<sub>1</sub>:
            </p>
            <p>
              S<sub>3</sub>({pp((data.n1 + data.n2) / 2)}|{pp(data.ys2 + 1)})
              erfüllt diese Eigenschaften.
            </p>
            <p>Setze den Scheitel in die Scheitelform ein:</p>
            {buildEquation([
              [
                <>y</>,
                <>=</>,
                <>
                  (x − {pp((data.n1 + data.n2) / 2)})²{' '}
                  {pp(data.ys2 + 1, 'merge_op')}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  (x − {pp(data.n1 + data.n2)}x +{' '}
                  {pp(((data.n1 + data.n2) / 2) * ((data.n1 + data.n2) / 2))}){' '}
                  {pp(data.ys2 + 1, 'merge_op')}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <strong>
                    x² − {pp(data.n1 + data.n2)}x +{' '}
                    {pp(
                      ((data.n1 + data.n2) / 2) * ((data.n1 + data.n2) / 2) +
                        data.ys2 +
                        1,
                    )}
                  </strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Ein zusammengesetzter Körper besteht aus einem regelmäßigen
              Fünfecksprisma mit aufgesetzter regelmäßiger fünfseitiger
              Pyramide.
            </p>
            <svg viewBox="0 0 328 220">
              <image
                href="/content/BW_Realschule/248_Körper.jpg"
                height="220"
                width="328"
              />
            </svg>
            <p>Es gilt:</p>
            <p>
              s = 12,6 cm<br></br>ε = 33,0° <br></br>h<sub>2</sub> = 5,6 cm
              (Höhe Prisma)
            </p>
            <p>Berechne den Oberflächeninhalt des zusammengesetzten Körpers.</p>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
