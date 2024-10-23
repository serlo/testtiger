import { Exercise } from '@/data/types'
import { Color1, Color4 } from '@/helper/colors'
import { buildEquation } from '@/helper/math-builder'
import { pp, ppPolynom } from '@/helper/pretty-print'

interface DATA {
  x: number
  y: number
  a: number
  b: number
  d: number
}

export const exercise3: Exercise<DATA> = {
  title: 'Lineares Gleichungssystem',
  source: '2023 Teil 1 Aufgabe 3',
  useCalculator: false,
  duration: 3,
  generator(rng) {
    return {
      x: rng.randomIntBetween(1, 8),
      y: rng.randomIntBetween(1, 8),
      a: rng.randomIntBetween(2, 9),
      b: rng.randomIntBetween(3, 6),
      d: rng.randomIntBetween(3, 6),
    }
  },
  constraint({ data }) {
    return (
      data.b != data.d &&
      data.a * data.x - data.b * data.y != 0 &&
      data.a * data.x - data.d * data.y != 0 &&
      data.a * data.x - data.d * data.y != data.a * data.x - data.b * data.y
    )
  },
  points: 3,
  task({ data }) {
    const c = data.a * data.x - data.b * data.y
    const e = data.a * data.x - data.d * data.y
    return (
      <>
        <p>Löse das lineare Gleichungssystem.</p>

        <p>Notiere deinen Lösungsweg.</p>

        <p>
          I &nbsp;&nbsp; {data.a}x − {data.b}y = {pp(c)}
        </p>
        <p>
          II &nbsp; {data.a}x − {data.d}y = {pp(e)}
        </p>
      </>
    )
  },
  solution({ data }) {
    const c = data.a * data.x - data.b * data.y
    const e = data.a * data.x - data.d * data.y
    const bd = -data.b + data.d
    return (
      <>
        <p>
          Subtrahiere die Gleichungen I-II, um den Term {'"'}
          {data.a}x{'"'} zu eliminieren:
        </p>
        {buildEquation([
          [
            <>
              <Color1>
                {data.a}x − {data.a}x
              </Color1>{' '}
              − {data.b}y − ({pp(-data.d)})y
            </>,
            <>=</>,
            <>
              {pp(c)} - {pp(e)}
            </>,
          ],
          [
            <>
              − {pp(data.b)}y − ({pp(-data.d)})y
            </>,
            <>=</>,
            <>
              {pp(c)} − {pp(e)}
            </>,
          ],
          [
            <>{-data.b + data.d != 1 && pp(-data.b + data.d)}y </>,
            <>=</>,
            <>{pp(c - e)}</>,

            <>{-data.b + data.d != 1 && <>| : ({pp(-data.b + data.d)})</>}</>,
          ],
        ])}
        {-data.b + data.d != 1 && (
          <>
            {buildEquation([
              [
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;y{' '}
                </>,
                <>=</>,
                <>{data.y}</>,
              ],
            ])}
          </>
        )}
        <p>
          Setze den Wert für y in die Gleichung I oder II ein. <br></br>y in I
          eingesetzt liefert:
        </p>
        {buildEquation([
          [
            <>
              {data.a}x − {data.b} · {data.y}
            </>,
            <>=</>,
            <>{pp(c)}</>,
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
                <span style={{ fontSize: 'small' }}>fasse zusammen</span>
              </Color4>
            </>,
          ],
          [
            <>
              {data.a}x − {data.b * data.y}
            </>,
            <>=</>,
            <>{pp(c)}</>,

            <>| + {pp(data.b * data.y)}</>,
          ],
          [
            <>{data.a}x</>,
            <>=</>,
            <>{pp(c + data.b * data.y)}</>,

            <>| : {pp(data.a)}</>,
          ],
          [<>x</>, <>=</>, <>{pp(data.x)}</>],
        ])}
        <p>
          Die Lösungsmenge des Gleichungssystems ist{' '}
          <b>
            {'L={('}
            {data.x}; {data.y}
            {')}'}
          </b>
        </p>
      </>
    )
  },
}
