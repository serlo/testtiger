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
  d: number
  e: number
}

export const exercise243: Exercise<DATA> = {
  title: 'Quadratische Gleichungen',
  source: '2022 Pflichtteil A2 Aufgabe 3',
  useCalculator: true,
  duration: 4,
  points: 3,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 6),
      b: rng.randomIntBetween(1, 6),
      c: rng.randomIntBetween(-6, 6),
      e: rng.randomIntBetween(-10, -1),
      d: rng.randomIntBetween(-4, -2),
    }
  },
  originalData: { a: 2, b: 4, c: -3, d: -1, e: -12 },
  constraint({ data }) {
    const p = 2 * 2 * data.c - (data.a - data.b + data.d)
    const q = 2 * data.c * data.c - data.a * -data.b + data.e
    return (
      q != 0 &&
      p != 0 &&
      data.c != 0 &&
      data.a != data.b &&
      data.a != data.c &&
      data.b != data.c &&
      (p / 2 + Math.sqrt((p / 2) * (p / 2) - q)) % 1 == 0
    )
  },
  task({ data }) {
    const p = 2 * 2 * data.c - (data.a - data.b + data.d)
    const q = 2 * data.c * data.c - data.a * -data.b + data.e
    return (
      <>
        <p>Löse die Gleichung.</p>
        <p>
          (x {pp(data.a, 'merge_op')})(x − {pp(data.b)}){' '}
          {data.d != -1 ? pp(data.d, 'merge_op') : '−'}x = 2(x{' '}
          {pp(data.c, 'merge_op')})² {pp(data.e, 'merge_op')}
        </p>
      </>
    )
  },
  solution({ data }) {
    const p = 2 * 2 * data.c - (data.a - data.b + data.d)
    const q = 2 * data.c * data.c - data.a * -data.b + data.e
    return (
      <>
        <div>
          <span style={{ fontSize: '0.8em' }}>
            <p>
              <strong>Gleichung vereinfachen</strong>
            </p>
            <p>Multipliziere die Klammern links aus:</p>
            <p>
              <Color1>
                (x {pp(data.a, 'merge_op')})(x − {pp(data.b)})
              </Color1>{' '}
              {pp(data.d, 'merge_op')}x = 2(x {pp(data.c, 'merge_op')})²{' '}
              {pp(data.e, 'merge_op')}
            </p>
            <p>
              <Color1>
                x² {pp(data.a - data.b, 'merge_op')}x{' '}
                {pp(data.a * -data.b, 'merge_op')}
              </Color1>{' '}
              {pp(data.d, 'merge_op')}x = 2(x {pp(data.c, 'merge_op')})²{' '}
              {pp(data.e, 'merge_op')}
            </p>

            <p>
              Verwende die binomische Formel, um die Klammer rechts weiter
              aufzulösen:
            </p>
            <p>
              x² {pp(data.a - data.b, 'merge_op')}x{' '}
              {pp(data.a * -data.b, 'merge_op')} {pp(data.d, 'merge_op')}x ={' '}
              <Color2>2(x {pp(data.c, 'merge_op')})²</Color2>{' '}
              {pp(data.e, 'merge_op')}
            </p>
            <p>
              x² {pp(data.a - data.b, 'merge_op')}x{' '}
              {pp(data.a * -data.b, 'merge_op')} {pp(data.d, 'merge_op')}x ={' '}
              <Color2>
                2(x² {pp(2 * data.c, 'merge_op')}x + {pp(data.c * data.c)})
              </Color2>{' '}
              {pp(data.e, 'merge_op')}
            </p>
            <p>
              x² {pp(data.a - data.b, 'merge_op')}x{' '}
              {pp(data.a * -data.b, 'merge_op')} {pp(data.d, 'merge_op')}x ={' '}
              <Color2>
                2x² {pp(2 * 2 * data.c, 'merge_op')}x +{' '}
                {pp(2 * data.c * data.c)}
              </Color2>{' '}
              {pp(data.e, 'merge_op')}
            </p>
            <p>
              Fasse die Terme zusammen und sortiere die Gleichung, um sie zu
              lösen:
            </p>
            <p>
              x² {pp(data.a - data.b + data.d, 'merge_op')}x{' '}
              {pp(data.a * -data.b, 'merge_op')} = 2x²{' '}
              {pp(2 * 2 * data.c, 'merge_op')}x{' '}
              {pp(2 * data.c * data.c + data.e, 'merge_op')}
              &nbsp;&nbsp;&nbsp;&nbsp;| − x²
            </p>
            <p>
              {pp(data.a - data.b + data.d, 'merge_op')}x{' '}
              {pp(data.a * -data.b, 'merge_op')} = x²{' '}
              {pp(2 * 2 * data.c, 'merge_op')}x{' '}
              {pp(2 * data.c * data.c + data.e, 'merge_op')}
              &nbsp;&nbsp;&nbsp;&nbsp;|{' '}
              {pp(-(data.a - data.b + data.d), 'merge_op')}x
            </p>
            <p>
              {' '}
              {pp(data.a * -data.b)} = x²{' '}
              {pp(2 * 2 * data.c - (data.a - data.b + data.d), 'merge_op')}x{' '}
              {pp(2 * data.c * data.c + data.e, 'merge_op')}{' '}
              &nbsp;&nbsp;&nbsp;&nbsp;|
              {pp(-(data.a * -data.b), 'merge_op')}
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
                      <span className="inline-block  scale-y-[2.6]">)</span>² −
                      q
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
                x<sub>1</sub> = {-p / 2 + Math.sqrt((p / 2) * (p / 2) - q)}
              </p>
              <p>
                x<sub>2</sub> = {-p / 2 - Math.sqrt((p / 2) * (p / 2) - q)}
              </p>
            </strong>
          </span>
        </div>
      </>
    )
  },
}
