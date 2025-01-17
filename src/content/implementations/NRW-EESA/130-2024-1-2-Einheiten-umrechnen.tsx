import { Exercise } from '@/data/types'
import { buildEquation } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'

interface DATA {
  m: number
  min: number
  ml: number
}

export const exercise130: Exercise<DATA> = {
  title: 'Einheiten umrechnen',
  source: '2024 Teil 1 Aufgabe 2',
  useCalculator: false,
  duration: 3,
  points: 3,
  generator(rng) {
    return {
      m: rng.randomIntBetween(2, 8),
      min: rng.randomIntBetween(3, 9),
      ml: rng.randomIntBetween(2, 9) * 100,
    }
  },
  originalData: {
    m: 3,
    min: 4,
    ml: 800,
  },
  learningPathData: {
    m: 6,
    min: 3,
    ml: 600,
  },
  exampleData: {
    m: 3,
    min: 5,
    ml: 200,
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>Rechne die Größen in die angegebene Einheit um.</p>
        {buildEquation([
          [<>{pp(data.m * 100)} cm</>, <>=</>, <>______ m</>],
          [<>{pp(data.min * 60)} s</>, <>=</>, <>______ min</>],
          [<>{pp(data.ml / 1000)} ℓ</>, <>=</>, <>______ ml</>],
        ])}
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          <strong>1 Meter (m)</strong> enthält{' '}
          <strong>100 Zentimeter (cm)</strong>. <br></br>Rechne mit dem
          Umrechnungsfaktor 100:
        </p>
        {buildEquation([
          [<>{pp(data.m * 100)} cm</>, <>=</>, <>{pp(data.m * 100)} : 100 m</>],
          [
            <>
              <strong>{pp(data.m * 100)} cm</strong>
            </>,
            <>
              <strong>=</strong>
            </>,
            <>
              <strong>{pp(data.m)} m</strong>
            </>,
          ],
        ])}

        <p>
          <strong>1 Minute (min)</strong> enthält{' '}
          <strong>60 Sekunden (s)</strong>. <br></br>Rechne mit dem
          Umrechnungsfaktor 60:
        </p>
        {buildEquation([
          [
            <>{pp(data.min * 60)} s</>,
            <>=</>,
            <>{pp(data.min * 60)} : 60 min</>,
          ],
          [
            <>
              <strong>{pp(data.min * 60)} s</strong>
            </>,
            <>
              <strong>=</strong>
            </>,
            <>
              <strong>{pp(data.min)} min</strong>
            </>,
          ],
        ])}

        <p>
          <strong>1 Liter (ℓ)</strong> enthält{' '}
          <strong>1000 Milliliter (ml)</strong>. <br></br>Rechne mit dem
          Umrechnungsfaktor 1000:
        </p>
        {buildEquation([
          [
            <>{pp(data.ml / 1000)} ℓ</>,
            <>=</>,
            <>{pp(data.ml / 1000)} · 1000 ml</>,
          ],
          [
            <>
              <strong>{pp(data.ml / 1000)} ℓ</strong>
            </>,
            <>
              <strong>=</strong>
            </>,
            <>
              <strong>{pp(data.ml)} ml</strong>
            </>,
          ],
        ])}
      </>
    )
  },
}
