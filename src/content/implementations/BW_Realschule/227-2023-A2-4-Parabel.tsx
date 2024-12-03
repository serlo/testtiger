import { Exercise } from '@/data/types'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp, ppPolynom } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  xs: number
  ys: number
  b: number
  m: number
}

export const exercise227: Exercise<DATA> = {
  title: 'Parabeln',
  source: '2023 Pflichtteil A2 - Aufgabe 4',
  useCalculator: true,
  duration: 42,
  points: 3,
  generator(rng) {
    return {
      xs: rng.randomIntBetween(2, 6),
      ys: rng.randomItemFromArray([-16, -9, -4]),
      b: rng.randomIntBetween(1, 5),
      m: rng.randomIntBetween(-3, -1),
    }
  },
  originalData: { xs: 4, ys: -9, b: 2, m: -2 },
  constraint({ data }) {
    const n1 = data.xs + Math.sqrt(-data.ys)
    const n2 = data.xs - Math.sqrt(-data.ys)
    const p = -n2 - n1 - data.m
    const q = n2 * n1 - data.b
    const x1 = -p / 2 + Math.sqrt((p / 2) * (p / 2) - q)
    const x2 = -p / 2 - Math.sqrt((p / 2) * (p / 2) - q)
    return p != 0 && q != 0 && x1 % 1 == 0 && x2 % 1 == 0
  },
  task({ data }) {
    function toX(n: number) {
      return 92 + n * 22
    }
    function toY(n: number) {
      return 150 - n * 22
    }
    function generateParabolaPoints(): string {
      let points = ''
      for (let x = -4; x <= 11; x += 0.1) {
        const y = (x - data.xs) * (x - data.xs) + data.ys
        points += `${toX(x)},${toY(y)} `
      }
      return points.trim()
    }
    const parabolaPoints = generateParabolaPoints()
    return (
      <>
        <p>
          Die Abbildung zeigt den Ausschnitt einer verschobenen nach oben
          geöffneten Normalparabel p.
        </p>
        <ul>
          <li>
            Bestimme die Funktionsgleichung der Parabel p. Entnimm dazu
            geeignete Werte aus der Zeichnung.
          </li>
        </ul>
        <p>
          Eine Gerade g schneidet die y-Achse im Punkt T(0|{data.b}) und hat die
          Steigung m = {pp(data.m)}.{' '}
        </p>
        <ul>
          <li>
            Berechne die Koordinaten der Schnittpunkte A und B der Parabel und
            der Geraden.
          </li>
        </ul>
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
          <text x={315} y={160} fontSize={15} textAnchor="left" stroke="black">
            x
          </text>
          <text x={105} y={20} fontSize={15} textAnchor="left" stroke="black">
            y
          </text>
        </svg>
      </>
    )
  },
  solution({ data }) {
    const n1 = data.xs + Math.sqrt(-data.ys)
    const n2 = data.xs - Math.sqrt(-data.ys)
    const p = -n2 - n1 - data.m
    const q = n2 * n1 - data.b
    const x1 = -p / 2 + Math.sqrt((p / 2) * (p / 2) - q)
    const x2 = -p / 2 - Math.sqrt((p / 2) * (p / 2) - q)
    return (
      <>
        <p>
          <strong>Funktionsgleichung von p</strong>
        </p>
        <p>
          Die Nullstellen der Parabel sind N<sub>1</sub>(
          {pp(data.xs + Math.sqrt(-data.ys))}|0) und N<sub>2</sub>(
          {pp(data.xs - Math.sqrt(-data.ys))}|0).
        </p>
        <p>
          Setze diese in die Nullstellenform der Parabel ein und bestimme den
          Funktionsterm:
        </p>
        {buildEquation([
          [
            <>y</>,
            <>=</>,
            <>
              (x − n<sub>1</sub>)(x − n<sub>2</sub>)
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              (x − {pp(n1)})(x − {pp(n2, 'embrace_neg')})
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              {' '}
              <strong>
                {ppPolynom([
                  [1, 'x', 2],
                  [-n2 - n1, 'x', 1],
                  [n2 * n1, 'x', 0],
                ])}
              </strong>
            </>,
          ],
        ])}
        <p>
          <strong>Schnittpunkte von p und g</strong>
        </p>
        <p>
          Die Gerade verläuft durch den Punkt T(0|{data.b}) mit der Steigung m ={' '}
          {pp(data.m)}. Bestimme damit die Funktionsgleichung von g:
        </p>
        <p>
          <strong>
            y ={' '}
            {ppPolynom([
              [data.m, 'x', 1],
              [data.b, 'x', 0],
            ])}
          </strong>
        </p>
        <p>
          Setze die Funktionsterme gleich und berechne die Stellen x
          <sub>1/2</sub> der Schnittpunkte:
        </p>
        {buildEquation([
          [
            <>
              {ppPolynom([
                [1, 'x', 2],
                [-n2 - n1, 'x', 1],
                [n2 * n1, 'x', 0],
              ])}
            </>,
            <>=</>,
            <>
              {ppPolynom([
                [data.m, 'x', 1],
                [data.b, 'x', 0],
              ])}
            </>,
            <>
              | {pp(-data.m, 'merge_op')}x | − {data.b}
            </>,
          ],
          [
            <>
              {ppPolynom([
                [1, 'x', 2],
                [-n2 - n1 - data.m, 'x', 1],
                [n2 * n1 - data.b, 'x', 0],
              ])}
            </>,
            <>=</>,
            <>0</>,
          ],
        ])}
        <p>
          Das ist eine quadratische Gleichung. Bestimme die Lösungen mithilfe
          der pq-Formel:
        </p>
        {buildEquation([
          [
            <>
              x<sub>1/2</sub>
            </>,
            <>=</>,
            <>
              −{buildInlineFrac('p', 2)} ±{' '}
              {buildSqrt(
                <>
                  <span className="inline-block  scale-y-[2.6]">(</span>
                  {buildInlineFrac('p', 2)}
                  <span className="inline-block  scale-y-[2.6]">)</span>² − q
                </>,
              )}
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              −{buildInlineFrac(p, 2)} ±{' '}
              {buildSqrt(
                <>
                  <span className="inline-block  scale-y-[2.6]">(</span>
                  {buildInlineFrac(p, 2)}
                  <span className="inline-block  scale-y-[2.6]">)</span>² −{' '}
                  {q < 0 && <>(</>}
                  {pp(q)}
                  {q < 0 && <>)</>}
                </>,
              )}
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              <>
                <span style={{ verticalAlign: 'middle' }}>{pp(-p / 2)} ± </span>
                {buildSqrt(pp((p / 2) * (p / 2) - q))}
              </>
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              <>
                <span style={{ verticalAlign: 'middle' }}>{pp(-p / 2)} ± </span>
                {pp(Math.sqrt((p / 2) * (p / 2) - q))}
              </>
            </>,
          ],
        ])}

        <p>
          x<sub>1</sub> = {pp(roundToDigits(x1, 2))}
        </p>
        <p>
          x<sub>2</sub> = {pp(roundToDigits(x2, 2))}
        </p>

        <p>
          Setze die Stellen in eine der Funktionen ein und bestimme die y-Werte
          der Schnittpunkte:
        </p>
        <p>
          y<sub>1</sub> = {pp(data.m)} ·{' '}
          {pp(roundToDigits(x1, 2), 'embrace_neg')} + {data.b} =
          {pp(data.m * roundToDigits(x1, 2) + data.b)}
        </p>
        <p>
          y<sub>2</sub> = {pp(data.m)} ·{' '}
          {pp(roundToDigits(x2, 2), 'embrace_neg')} + {data.b} ={' '}
          {pp(data.m * roundToDigits(x2, 2) + data.b)}
        </p>
        <p>Die Schnittpunkte sind damit:</p>
        <p>
          <strong>
            S<sub>1</sub>({pp(x1)}|{pp(data.m * roundToDigits(x1, 2) + data.b)})
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; S<sub>2</sub>({pp(x2)}|
            {pp(data.m * roundToDigits(x2, 2) + data.b)})
          </strong>
        </p>
      </>
    )
  },
}
