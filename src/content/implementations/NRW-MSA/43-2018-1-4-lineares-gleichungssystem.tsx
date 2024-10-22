import { Exercise } from '@/data/types'
import { Color1, Color4 } from '@/helper/colors'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  x: number
  y: number
  a: number
  b: number
  d: number
}

export const exercise43: Exercise<DATA> = {
  title: 'Lineares Gleichungssystem',
  source: '2018 Teil 1 Aufgabe 4',
  useCalculator: false,
  duration: 3,
  generator(rng) {
    return {
      x: rng.randomIntBetween(1, 6),
      y: rng.randomIntBetween(1, 6),
      a: rng.randomIntBetween(2, 9),
      b: rng.randomIntBetween(3, 6),
      d: rng.randomIntBetween(3, 6),
    }
  },
  constraint({ data }) {
    return (
      data.b != data.d &&
      data.b * data.x - data.a * data.y != 0 &&
      data.d * data.x + data.a * data.y != 0 &&
      data.b * data.x - data.a * data.y != data.d * data.x + data.a * data.y
    )
  },
  points: 3,
  task({ data }) {
    const c = data.b * data.x - data.a * data.y
    const e = data.d * data.x + data.a * data.y
    return (
      <>
        <p>Löse das lineare Gleichungssystem. Notiere deinen Lösungsweg.</p>

        <p>
          I &nbsp;&nbsp; {data.b}x − {data.a}y = {pp(c)}
        </p>
        <p>
          II &nbsp; {data.d}x + {data.a}y = {pp(e)}
        </p>
      </>
    )
  },
  solution({ data }) {
    const c = data.b * data.x - data.a * data.y
    const e = data.d * data.x + data.a * data.y
    return (
      <>
        <p>
          Die Terme{' '}
          <Color1>
            {'"'}− {data.a}y
          </Color1>
          {'"'} und {'"'}
          <Color1>
            {data.a}y{'"'}
          </Color1>{' '}
          haben entgegengesetzte Vorzeichen. Addiere die Gleichungen I+II:
        </p>
        {buildEquation([
          [
            <>
              {data.b}x + {data.d}x{' '}
              <Color1>
                - {data.a}y + {data.a}y
              </Color1>
            </>,
            <>=</>,
            <>
              {pp(c)} + {pp(e, 'embrace_neg')}
            </>,
          ],
          [
            <>
              {data.b}x + {data.d}x{' '}
            </>,
            <>=</>,
            <>
              {pp(c)} + {pp(e, 'embrace_neg')}
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
                <span style={{ fontSize: 'small' }}>fasse zusammen</span>
              </Color4>
            </>,
          ],
          [
            <>{data.b + data.d}x </>,
            <>=</>,
            <>{pp(c + e)}</>,

            <>| : {data.b + data.d}</>,
          ],
          [<>x </>, <>=</>, <>{data.x}</>],
        ])}

        <p>
          Setze den Wert für x in die Gleichung I oder II ein. <br></br>x in I
          eingesetzt liefert:
        </p>

        {buildEquation([
          [
            <>
              {data.b} · {data.x} − {data.a} · y
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
              {data.b * data.x} - {data.a} · y
            </>,
            <>=</>,
            <>{pp(c)}</>,

            <>| - {data.b * data.x}</>,
          ],
          [
            <>- {data.a} · y</>,
            <>=</>,
            <>{pp(c - data.b * data.x)}</>,

            <>| :(- {data.a})</>,
          ],
          [<>y</>, <>=</>, <>{pp(data.y)}</>],
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
