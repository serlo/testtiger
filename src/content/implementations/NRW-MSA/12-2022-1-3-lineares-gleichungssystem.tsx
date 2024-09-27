import { Exercise } from '@/data/types'
import { buildEquation } from '@/helper/math-builder'
import { pp, ppPolynom } from '@/helper/pretty-print'

interface DATA {
  x: number
  y: number
  a: number
  b: number
  d: number
}

export const exercise12: Exercise<DATA> = {
  title: 'Lineares Gleichungssystem',
  source: '2022 Teil 1 Aufgabe 3',
  useCalculator: false,
  duration: 2,
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
  task({ data }) {
    const c = data.a * data.x - data.b * data.y
    const e = -data.a * data.x - data.d * data.y
    return (
      <>
        <p>Löse das lineare Gleichungssystem.</p>

        <p>Notiere deinen Lösungsweg.</p>

        <p>
          I &nbsp;&nbsp; {data.a}x − {data.b}y = {pp(c)}
        </p>
        <p>
          II &nbsp; −{data.a}x − {data.d}y = {pp(e)}
        </p>
      </>
    )
  },
  solution({ data }) {
    const c = data.a * data.x - data.b * data.y
    const e = -data.a * data.x - data.d * data.y
    const bd = -data.b - data.d
    return (
      <>
        <p>Addiere die Gleichungen I+II:</p>
        <p>
          −{data.b}y + (− {data.d}y) = {pp(c)} + {pp(e, 'embrace_neg')}
        </p>
        <p>Fasse die Terme zusammen:</p>
        <p>
          {ppPolynom([[bd, 'y', 1]])} = {pp(c + e)}
        </p>
        {bd != 1 && (
          <>
            <p>Löse die Gleichung nach y:</p>
            <p>y = {data.y}</p>
          </>
        )}

        <p>
          Setze den Wert für y in eine der Gleichungen ein. y in I eingesetzt
          liefert:
        </p>
        <p>
          {data.a}x − {data.b} · {data.y} = {pp(c)}
        </p>
        <p>Vereinfache die Gleichung und löse nach x.</p>
        {buildEquation([
          [
            <>{data.a}x</>,
            '=',
            <>
              {pp(c)} + {data.b} · {data.y}
            </>,
          ],
          [<>{data.a}x</>, '=', pp(c + data.b * data.y)],
          [<>x</>, '=', data.x],
        ])}
        <p>
          Die Lösungsmenge des Gleichungssystems ist {'L={('}
          {data.x}; {data.y}
          {')}'}
        </p>
      </>
    )
  },
}
