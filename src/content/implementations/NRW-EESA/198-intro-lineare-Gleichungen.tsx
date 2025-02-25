import { Exercise } from '@/data/types'
import { Color2 } from '@/helper/colors'
import { buildEquation, ExplanationBox } from '@/helper/math-builder'

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
  example() {
    return (
      <>
        <style>
          {`
    .explanation-box {
      border: 1px solid lightblue;
      padding: 0px 8px;
      background-color: #f9f9f9;
      border-radius: 8px;
    }
  `}
        </style>
        <p>Löse die Gleichung nach x auf:</p>
        {buildEquation([[<>4 x - 2</>, <>=</>, <>2</>]])}
        <br></br>
        <Color2>
          <b>Antwort</b>: x = <b>1</b>.
        </Color2>
        <br></br>
        <br></br>
        <ExplanationBox>
          <p>
            Rechnung:
            <hr style={{ margin: '10px 0' }} />
            {buildEquation([
              [<>4 x - 2</>, <>=</>, <>2</>, <>| + 2</>],
              [<>4 x</>, <>=</>, <>4</>, <>| : 4</>],
              [
                <>
                  <b>x</b>
                </>,
                <>
                  <b>=</b>
                </>,
                <>
                  <b>1</b>
                </>,
              ],
            ])}
          </p>
        </ExplanationBox>
      </>
    )
  },
  task({ data }) {
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
