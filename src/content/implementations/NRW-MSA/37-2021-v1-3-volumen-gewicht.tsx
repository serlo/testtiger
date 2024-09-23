import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  l: number
  h: number
  d: number
}

export const exercise37: Exercise<DATA> = {
  title: 'Volumen und Gewicht',
  source: '2021 Teil 1 Variante 1 / 3',
  useCalculator: false,
  duration: 4,
  points: 3,
  generator(rng) {
    return {
      d: rng.randomIntBetween(6, 9) / 10,
      l: rng.randomIntBetween(4, 15),
      h: rng.randomIntBetween(2, 9) * 3,
    }
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Eine Pyramide aus Holz hat eine quadratische Grundfläche mit der
          Seitenlänge {data.l} cm und eine Höhe von {data.h} cm.
        </p>
        <p>
          Berechne das Volumen und das Gewicht der Pyramide, wenn 1 cm³ Holz{' '}
          {pp(data.d)} g wiegt.{' '}
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Die Formel zur Berechnung des <strong>Volumens</strong> einer Pyramide
          lautet:
          <br /> {'  '}
          <strong>V = {buildInlineFrac('G · h', 3)}</strong>
        </p>
        <p>
          Die Grundfläche der Pyramide ist ein Quadrat mit der Seitenlänge{' '}
          {data.l} cm:
          <br />G = {data.l} cm · {data.l} cm = {data.l * data.l} cm²
        </p>
        <p>
          Setze G und h in die Volumenformel ein:
          <br />
          <strong>
            V ={' '}
            {buildInlineFrac(
              <>
                {data.l * data.l} cm² · {data.h} cm
              </>,
              3,
            )}{' '}
            = {pp(Math.round(((data.l * data.l * data.h) / 3) * 100) / 100)} cm³
          </strong>
        </p>
        <p>
          Die Formel zur Berechnung des <strong>Gewichts m</strong> lautet:{' '}
          <br /> <strong>m = V · Dichte </strong>
        </p>
        <p>
          Setze ein: <br />
          <strong>
            m = {pp(Math.round((data.l * data.l * data.h) / 3))} cm³ ·{' '}
            {pp(data.d)} {buildInlineFrac('g', 'cm³')} ={' '}
            {pp(
              Math.round(((data.l * data.l * data.h) / 3) * data.d * 100) / 100,
            )}{' '}
            g
          </strong>
        </p>
      </>
    )
  },
}
