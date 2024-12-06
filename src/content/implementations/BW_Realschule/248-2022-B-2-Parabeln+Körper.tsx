import { Exercise } from '@/data/types'
import { Color1 } from '@/helper/colors'
import { buildEquation } from '@/helper/math-builder'
import { pp, ppPolynom } from '@/helper/pretty-print'

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
    return true
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
