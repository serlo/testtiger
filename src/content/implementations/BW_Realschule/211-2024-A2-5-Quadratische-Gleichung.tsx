import { Exercise } from '@/data/types'
import { Color1, Color2, Color3 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp, ppPolynom } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
  x_1: number
  x_2: number
}

export const exercise211: Exercise<DATA> = {
  title: 'Quadratische Gleichungen',
  source: '2024 Pflichtteil A2 Aufgabe 5',
  useCalculator: true,
  duration: 4,
  points: 3,
  generator(rng) {
    return {
      a: rng.randomIntBetween(-6, 6),
      b: rng.randomIntBetween(1, 6),
      c: rng.randomIntBetween(-6, 6),
      x_1: rng.randomIntBetween(-6, 6),
      x_2: rng.randomIntBetween(-6, 6),
    }
  },
  originalData: { a: -3, b: 1, c: -4, x_1: 6, x_2: 3 },
  constraint({ data }) {
    const p = -1 * (data.x_1 + data.x_2)
    const q = data.x_1 * data.x_2
    return (
      q != 0 &&
      -p != data.b - 2 * data.c + data.a &&
      data.a != 0 &&
      data.c != 0 &&
      data.b != 0 &&
      data.a != data.b &&
      data.a != data.c &&
      data.b != data.c &&
      data.a + data.b != 2 * data.c &&
      data.x_1 != 0 &&
      data.x_2 != 0 &&
      data.x_1 != data.x_2
    )
  },
  task({ data }) {
    const p = -1 * (data.x_1 + data.x_2)
    const q = data.x_1 * data.x_2
    return (
      <>
        <p>Löse die Gleichung.</p>
        <p>
          (x {pp(data.a, 'merge_op')})({pp(data.b)} + x) − (x{' '}
          {pp(data.c, 'merge_op')})² = x(x{' '}
          {pp(p + data.b - 2 * data.c + data.a, 'merge_op')}){' '}
          {pp(q + data.a * data.b - data.c * data.c, 'merge_op')}
        </p>
      </>
    )
  },
  solution({ data }) {
    const p = -1 * (data.x_1 + data.x_2)
    const q = data.x_1 * data.x_2
    return (
      <>
        <div>
          <span style={{ fontSize: '0.8em' }}>
            <p>
              <strong>Gleichung vereinfachen</strong>
            </p>
            <p>Multipliziere die Klammern links und rechts aus:</p>
            <p>
              <Color1>
                (x {pp(data.a, 'merge_op')})({pp(data.b)} + x)
              </Color1>{' '}
              − (x {pp(data.c, 'merge_op')})² ={' '}
              <Color2>
                x(x {pp(p + data.b - 2 * data.c + data.a, 'merge_op')})
              </Color2>{' '}
              {pp(q + data.a * data.b - data.c * data.c, 'merge_op')}
            </p>

            <p>
              <Color1>
                {ppPolynom([[data.b, 'x', 1]])} + x²{' '}
                {pp(data.a * data.b, 'merge_op')} {data.a > 0 && ' + '}
                {ppPolynom([[data.a, 'x', 1]])}
              </Color1>{' '}
              − (x {pp(data.c, 'merge_op')})² ={' '}
              <Color2>
                x² {pp(p + data.b - 2 * data.c + data.a, 'merge_op')}x
              </Color2>{' '}
              {pp(q + data.a * data.b - data.c * data.c, 'merge_op')}
            </p>
            <p>
              Verwende die binomische Formel, um die Klammer in der Mitte weiter
              aufzulösen:
            </p>
            <p>
              {ppPolynom([[data.b, 'x', 1]])} + x²{' '}
              {pp(data.a * data.b, 'merge_op')} {data.a > 0 && ' + '}
              {ppPolynom([[data.a, 'x', 1]])} −{' '}
              <Color3>(x {pp(data.c, 'merge_op')})²</Color3> = x²{' '}
              {pp(p + data.b - 2 * data.c + data.a, 'merge_op')}x{' '}
              {pp(q + data.a * data.b - data.c * data.c, 'merge_op')}
            </p>
            <p>
              {ppPolynom([[data.b, 'x', 1]])} + x²{' '}
              {pp(data.a * data.b, 'merge_op')} {data.a > 0 && ' + '}
              {ppPolynom([[data.a, 'x', 1]])} −{' '}
              <Color3>
                x² {pp(-2 * data.c, 'merge_op')}x{' '}
                {pp(-data.c * data.c, 'merge_op')}
              </Color3>{' '}
              = x² {pp(p + data.b - 2 * data.c + data.a, 'merge_op')}x{' '}
              {pp(q + data.a * data.b - data.c * data.c, 'merge_op')}
            </p>
            <p>
              Fasse die Terme zusammen und sortiere die Gleichung, um sie zu
              lösen:
            </p>

            {p == 0 && (
              <>
                <p>
                  <strong>Gleichung lösen</strong>
                </p>
                <p>
                  {pp(data.a * data.b - data.c * data.c, 'merge_op')} = x²{' '}
                  {pp(q + data.a * data.b - data.c * data.c, 'merge_op')}
                  &nbsp;&nbsp;&nbsp;&nbsp;|{' '}
                  {pp(-(q + data.a * data.b - data.c * data.c), 'merge_op')}
                </p>
                <p>{pp(-q)} = x² &nbsp;&nbsp;&nbsp;&nbsp;| √</p>
                <p>
                  <strong>
                    x<sub>1</sub> = {pp(data.x_1)}
                  </strong>
                </p>
                <p>
                  <strong>
                    {' '}
                    x<sub>1</sub> = {pp(data.x_2)}
                  </strong>
                </p>
              </>
            )}
            {p != 0 && (
              <>
                <p>
                  {ppPolynom([[data.b - 2 * data.c + data.a, 'x', 1]])}{' '}
                  {pp(data.a * data.b - data.c * data.c, 'merge_op')} = x²{' '}
                  {pp(p + data.b - 2 * data.c + data.a, 'merge_op')}x{' '}
                  {pp(q + data.a * data.b - data.c * data.c, 'merge_op')}{' '}
                  &nbsp;&nbsp;&nbsp;&nbsp; |{'   '}
                  {pp(-(data.b - 2 * data.c + data.a), 'merge_op')}
                  x&nbsp;&nbsp;&nbsp;&nbsp; |{' '}
                  {pp(-(data.a * data.b - data.c * data.c), 'merge_op')}
                </p>
                <p>
                  0 = x² {p > 0 && '+ '}
                  {ppPolynom([[p, 'x', 1]])} {pp(q, 'merge_op')}
                </p>
                <p>
                  <strong>Gleichung lösen</strong>
                </p>
                <p>Löse die Gleichung mithilfe der pq-Formel:</p>
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
                          <span className="inline-block  scale-y-[2.6]">)</span>
                          ² − q
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
                          <span className="inline-block  scale-y-[2.6]">)</span>
                          ² − {q < 0 && <>(</>}
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
                        <span style={{ verticalAlign: 'middle' }}>
                          {pp(-p / 2)} ±{' '}
                        </span>
                        {buildSqrt(pp((p / 2) * (p / 2) - q))}
                      </>
                    </>,
                  ],
                  [
                    <></>,
                    <>=</>,
                    <>
                      <>
                        <span style={{ verticalAlign: 'middle' }}>
                          {pp(-p / 2)} ±{' '}
                        </span>
                        {pp(Math.sqrt((p / 2) * (p / 2) - q))}
                      </>
                    </>,
                  ],
                ])}

                <strong>
                  <p>
                    x<sub>1</sub> = {pp(data.x_1)}
                  </p>
                  <p>
                    x<sub>2</sub> = {pp(data.x_2)}
                  </p>
                </strong>
              </>
            )}
          </span>
        </div>
      </>
    )
  },
}
