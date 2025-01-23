import { Exercise } from '@/data/types'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  m: number
  h: number
  ml: number
}

export const exercise101: Exercise<DATA> = {
  title: 'Einheiten umrechnen',
  source: '2021 Teil 1 Aufgabe 2',
  useCalculator: false,
  duration: 2,
  points: 2,
  generator(rng) {
    return {
      m: rng.randomIntBetween(2, 8) / 2,
      h: rng.randomIntBetween(3, 9) / 2,
      ml: rng.randomIntBetween(2, 9) * 100,
    }
  },
  originalData: {
    m: 3,
    h: 4,
    ml: 800,
  },
  learningPathData: {
    m: 5,
    h: 6,
    ml: 500,
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>Rechne die Größen in die angegebene Einheit um.</p>
        <p>{pp(data.m * 100)} cm = ______ m</p>
        <p>{pp(data.h)} h = ______ min</p>
        <p>{pp(data.ml / 1000)} ℓ = ______ dm³</p>
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
          [
            <>{pp(data.m * 100)} cm </>,
            <>=</>,
            <>{pp(data.m * 100)} : 100 m</>,
          ],
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
        <hr style={{ margin: '10px 0' }} />

        <p>
          <strong>1 Stunde (h)</strong> enthält <strong>60 Sekunden (s)</strong>
          . <br></br>Rechne mit dem Umrechnungsfaktor 60:
        </p>
        {buildEquation([
          [<>{pp(data.h)} h</>, <>=</>, <>{pp(data.h)} · 60 min</>],
          [
            <>
              <strong> {pp(data.h)} h </strong>
            </>,
            <>
              <strong>=</strong>
            </>,
            <>
              <strong>{pp(data.h * 60)} min</strong>
            </>,
          ],
        ])}
        <hr style={{ margin: '10px 0' }} />

        <p>
          <strong>1 Liter (l)</strong> enthält{' '}
          <strong>1 Kubikdezimeter (dm³)</strong>. <br></br>Rechne mit dem
          Umrechnungsfaktor 60:
        </p>
        {buildEquation([
          [
            <>
              <strong> {pp(data.ml / 1000)} ℓ </strong>
            </>,
            <>
              <strong>=</strong>
            </>,
            <>
              <strong>{pp(data.ml / 1000)} dm</strong>
            </>,
          ],
        ])}
      </>
    )
  },
}
