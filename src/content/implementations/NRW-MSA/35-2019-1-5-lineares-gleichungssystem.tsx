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

  faktor: number
}

export const exercise35: Exercise<DATA> = {
  title: 'Lineares Gleichungssystem',
  source: '2019 Teil 1 Aufgabe 5',
  useCalculator: false,
  duration: 4,
  generator(rng) {
    return {
      x: rng.randomIntBetween(1, 6),
      y: rng.randomIntBetween(1, 6),
      a: rng.randomIntBetween(2, 9),
      b: rng.randomIntBetween(3, 6),
      d: rng.randomIntBetween(3, 6),

      faktor: rng.randomIntBetween(2, 4),
    }
  },
  constraint({ data }) {
    return (
      data.b != data.d &&
      data.b * data.x - data.a * data.y != 0 &&
      data.d * data.x + data.faktor * data.a * data.y != 0 &&
      data.b * data.x - data.a * data.y !=
        data.d * data.x + data.faktor * data.a * data.y
    )
  },
  points: 4,
  task({ data }) {
    const c = data.b * data.x - data.a * data.y
    const e = data.d * data.x + data.faktor * data.a * data.y
    return (
      <>
        <p>Löse das lineare Gleichungssystem. Notiere deinen Lösungsweg.</p>

        <p>
          I &nbsp;&nbsp; {data.b}x − {data.a}y = {pp(c)}
        </p>
        <p>
          II &nbsp; {data.d}x + {data.faktor * data.a}y = {pp(e)}
        </p>
      </>
    )
  },
  solution({ data }) {
    const c = data.b * data.x - data.a * data.y
    const e = data.d * data.x + data.faktor * data.a * data.y
    return (
      <>
        <p>
          Die Terme {'"'}
          {pp(-data.a)}y{'"'} und {'"'}
          {data.faktor * data.a}y{'"'} können eliminiert werden, wenn der erste
          Term mit dem Faktor {data.faktor} multipliziert wird.
        </p>

        <p>
          {data.faktor} · I: &nbsp;&nbsp; {data.faktor * data.b}x −{' '}
          <Color1>{data.faktor * data.a}y</Color1> = {pp(data.faktor * c)}
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;II: &nbsp;&nbsp;&nbsp; {data.d}x +{' '}
          <Color1>{data.faktor * data.a}y</Color1> = {pp(e)}
        </p>
        <p>Addiere die Gleichungen {data.faktor} · I + II:</p>
        {buildEquation([
          [
            <>
              {data.faktor * data.b}x + {data.d}x{' '}
              <Color1>
                − {data.faktor * data.a}y + {data.faktor * data.a}y
              </Color1>
            </>,
            <>=</>,
            <>
              {pp(data.faktor * c)} + {pp(e, 'embrace_neg')}
            </>,
          ],
          [
            <>
              {data.faktor * data.b}x + {data.d}x{' '}
            </>,
            <>=</>,
            <>
              {pp(data.faktor * c)} + {pp(e, 'embrace_neg')}
            </>,
          ],
          [
            <>{data.faktor * data.b + data.d}x </>,
            <>=</>,
            <>{pp(data.faktor * c + e)}</>,

            <>| : {data.faktor * data.b + data.d}</>,
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
              {data.b * data.x} − {data.a} · y
            </>,
            <>=</>,
            <>{pp(c)}</>,

            <>| − {data.b * data.x}</>,
          ],
          [
            <>− {data.a} · y</>,
            <>=</>,
            <>{pp(c - data.b * data.x)}</>,

            <>| : (− {data.a})</>,
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
