import { Exercise } from '@/data/types'
import { Color1 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp, ppPolynom } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  b: number
  c: number
  m: number
}

export const exercise262: Exercise<DATA> = {
  title: 'Funktionen',
  source: '2021 Pflichtteil A2 - Aufgabe 5',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      b: rng.randomIntBetween(-10, -2),
      c: rng.randomIntBetween(4, 16),
      m: rng.randomItemFromArray([-1, -2, -4]),
    }
  },
  originalData: { b: -6, c: 10, m: -2 },
  constraint({ data }) {
    const sx = -data.b / 2
    const sy = data.c - (data.b / 2) * (data.b / 2)
    const b = sy - data.m * sx
    const p = data.b - data.m
    const q = data.c - b
    const x1 = -p / 2 + Math.sqrt((p / 2) * (p / 2) - q)
    const x2 = -p / 2 - Math.sqrt((p / 2) * (p / 2) - q)
    const y1 = data.m * roundToDigits(x1, 2) + b
    const y2 = data.m * roundToDigits(x2, 2) + b
    return p != 0 && q != 0
  },
  task({ data }) {
    return (
      <>
        <p>
          Die Parabel p hat die Funktionsgleichung <br></br>y = x² {pp(data.b)}x
          + {pp(data.c)}.
        </p>
        <p>Eine Gerade g besitzt die Steigung m = {pp(data.m)}.</p>
        <p>Sie geht durch den Scheitelpunkt S der Parabel p.</p>
        <ul>
          <li>
            Berechne die Koordinaten des zweiten Schnittpunkts Q der Parabel p
            mit der Geraden g.
          </li>
        </ul>
        <p>
          Die Gerade h verläuft senkrecht zur Geraden g und geht durch den Punkt
          Q.
        </p>
        <ul>
          <li>Berechne die Funktionsgleichung der Geraden h.</li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    const sx = -data.b / 2
    const sy = data.c - (data.b / 2) * (data.b / 2)
    const b = sy - data.m * sx
    const p = data.b - data.m
    const q = data.c - b
    const x1 = -p / 2 + Math.sqrt((p / 2) * (p / 2) - q)
    const x2 = -p / 2 - Math.sqrt((p / 2) * (p / 2) - q)
    const y1 = data.m * roundToDigits(x1, 2) + b
    const y2 = data.m * roundToDigits(x2, 2) + b
    return (
      <>
        <p>
          <strong>Scheitelpunkt S der Parabel</strong>
        </p>
        <p>
          Die Funktionsgleichung der Parabel lautet: <br></br>y = x²{' '}
          {pp(data.b)}x + {pp(data.c)}
        </p>
        <p>Bestimme die Scheitelform mit einer quadratischen Ergänzung:</p>
        {buildEquation([
          [
            <>y</>,
            <>=</>,
            <>
              x² <Color1>{pp(data.b)}</Color1>x + {pp(data.c)}
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              x² {pp(data.b)}x +{' '}
              <span className="inline-block  scale-y-[2]">(</span>
              {buildInlineFrac(
                <>
                  <Color1>{pp(Math.abs(data.b))}</Color1>
                </>,
                <>2</>,
              )}
              <span className="inline-block  scale-y-[2]">)</span>² +{' '}
              {pp(data.c)} −{' '}
              <span className="inline-block  scale-y-[2]">(</span>
              {buildInlineFrac(
                <>
                  <Color1>{pp(Math.abs(data.b))}</Color1>
                </>,
                <>2</>,
              )}
              <span className="inline-block  scale-y-[2]">)</span>²
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              (x {pp(data.b / 2, 'merge_op')})² + {pp(data.c)}{' '}
              {pp(-Math.abs(data.b / 2))}²
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              (x {pp(data.b / 2, 'merge_op')})²{' '}
              {pp(data.c - (data.b / 2) * (data.b / 2), 'merge_op')}
            </>,
          ],
        ])}
        <p>
          Der Scheitelpunkt ist{' '}
          <strong>
            S({pp(sx)}|{pp(sy)})
          </strong>
          .
        </p>
        <p>
          <strong>Schnittpunkt Q</strong>
        </p>
        <p>
          Die Gerade g mit der Steigung m = {pp(data.m)} verläuft durch den
          Scheitel S({pp(sx)}|{pp(sy)}).<br></br> Bestimme damit die
          Funktionsgleichung der Gerade:
        </p>

        {buildEquation([
          [<>y</>, <>=</>, <>{ppPolynom([[data.m, 'x', 1]])} + b</>],
          [
            <>{pp(sy)}</>,
            <>=</>,
            <>
              {pp(data.m)} · {pp(sx, 'embrace_neg')} + b
            </>,
            <>| {pp(-data.m * sx, 'merge_op')}</>,
          ],
          [<>b</>, <>=</>, <>{pp(b)}</>],
        ])}
        <p>
          {' '}
          Die Funktionsgleichung von g lautet damit:<br></br> y ={' '}
          {ppPolynom([[data.m, 'x', 1]])} {pp(b, 'merge_op')}
        </p>
        <p>
          Setze die Funktionsgleichungen der Gerade und der Parabel gleich und
          berechne den zweiten Schnittpunkt:
        </p>
        {buildEquation([
          [
            <>
              {ppPolynom([[data.m, 'x', 1]])} {pp(b, 'merge_op')}
            </>,
            <>=</>,
            <>
              x² {pp(data.b)}x + {pp(data.c)}
            </>,
            <>| + {ppPolynom([[-data.m, 'x', 1]])}</>,
          ],
          [
            <>{pp(b)}</>,
            <>=</>,
            <>
              x² {pp(data.b - data.m)}x + {pp(data.c)}
            </>,
            <>| {pp(-b, 'merge_op')}</>,
          ],
          [
            <>0</>,
            <>=</>,
            <>
              x² {pp(p)}x {pp(q, 'merge_op')}
            </>,
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
              −{buildInlineFrac(<>{pp(p, 'embrace_neg')}</>, 2)} ±{' '}
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
          {pp(roundToDigits(x1, 2), 'embrace_neg')} {pp(b, 'merge_op')} ={' '}
          {pp(y1)}
        </p>
        <p>
          y<sub>2</sub> = {pp(data.m)} ·{' '}
          {pp(roundToDigits(x2, 2), 'embrace_neg')} {pp(b, 'merge_op')} ={' '}
          {pp(y2)}
        </p>
        <p>
          Der Schnittpunkt Q ist damit:{' '}
          <strong>
            Q({pp(x2)}|{pp(y2)})
          </strong>
        </p>
        <p>
          <strong>Funktionsgleichung von h</strong>
        </p>
        <p>
          Die Gerade h verläuft senkrecht zu g. Für die Steigungen von g und h
          bedeutet das:
        </p>
        {buildEquation([
          [
            <>
              m<sub>h</sub> · m<sub>g</sub>
            </>,
            <>=</>,
            <>− 1</>,
          ],
          [
            <>
              m<sub>h</sub> · {pp(data.m, 'embrace_neg')}
            </>,
            <>=</>,
            <>− 1</>,
            <>| : {pp(data.m, 'embrace_neg')}</>,
          ],
          [
            <>
              m<sub>h</sub>
            </>,
            <>=</>,
            <>{pp(-1 / data.m)}</>,
          ],
        ])}
        <p>
          Setze den Punkt Q in die allgemeine Form von h ein und bestimme b:
        </p>
        {buildEquation([
          [<>y</>, <>=</>, <>{pp(-1 / data.m)}x + b</>],
          [
            <>{pp(y2)}</>,
            <>=</>,
            <>
              {pp(-1 / data.m)} · {pp(x2)} + b
            </>,
            <>| {pp(x2 / data.m, 'merge_op')}</>,
          ],
          [<>b</>, <>=</>, <>{pp(y2 + x2 / data.m)}</>],
        ])}
        <p>Die Funktionsgleichung von h ist damit:</p>
        <p>
          <strong>
            y = {ppPolynom([[-1 / data.m, 'x', 1]])}{' '}
            {pp(y2 + x2 / data.m, 'merge_op')}
          </strong>
        </p>
      </>
    )
  },
}
