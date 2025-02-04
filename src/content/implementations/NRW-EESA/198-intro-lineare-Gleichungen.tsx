import { Exercise } from '@/data/types'
import { buildEquation } from '@/helper/math-builder'

interface DATA {
  a: number
  b: number
  x_sol: number

  subtrahend: number
  faktor: number
  x_input: number
}

export const exercise198: Exercise<DATA> = {
  title: 'Lineare Gleichungen',
  source: '',
  useCalculator: false,
  duration: 4,
  points: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(2, 5),
      b: rng.randomIntBetween(6, 15),
      x_sol: rng.randomIntBetween(2, 7),

      subtrahend: rng.randomIntBetween(6, 15),
      faktor: rng.randomIntBetween(2, 5),
      x_input: rng.randomIntBetween(3, 8),
    }
  },

  constraint({ data }) {
    return true
  },
  task({ data }) {
    const rechts = data.a * data.x_sol + data.b
    return (
      <>
        <p>Löse die Gleichung:</p>
        {buildEquation([
          [
            <>
              {data.a} x + {data.b}
            </>,
            <>=</>,
            <>{rechts}</>,
          ],
        ])}
      </>
    )
  },
  solution({ data }) {
    const rechts = data.a * data.x_sol + data.b
    return (
      <>
        <p>Löse die Gleichung nach x auf:</p>
        {buildEquation([
          [
            <>
              {data.a} x + {data.b}
            </>,
            <>=</>,
            <>{rechts}</>,
            <>| - {data.b}</>,
          ],
          [<>{data.a} x</>, <>=</>, <>{rechts - data.b}</>, <>| : {data.a}</>],
          [
            <>
              <b>x</b>
            </>,
            <>
              <b>=</b>
            </>,
            <>
              <b>{(rechts - data.b) / data.a}</b>
            </>,
          ],
        ])}
      </>
    )
  },
}
