import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  l: number
  h: number
  d: number
}

export const exercise22: Exercise<DATA> = {
  title: 'Volumen und Gewicht',
  source: '2021 Teil 1 Aufgabe 3',
  useCalculator: false,
  duration: 4,
  points: 3,
  generator(rng) {
    return {
      d: (rng.randomIntBetween(12, 19) * 5) / 100,
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
          Berechne zuerst das Volumen der Pyramide, um mithilfe der Dichte das
          Gewicht zu bestimmen. <br></br>
          <br></br>Die Formel zur Berechnung des Volumens einer Pyramide lautet:
          <br /> {'  '}V = {buildInlineFrac('G · h', 3)}
        </p>
        <p>
          Die Grundfläche der Pyramide ist ein Quadrat mit der Seitenlänge{' '}
          {data.l} cm:
          <br />G = {data.l} cm · {data.l} cm = {data.l * data.l} cm²
        </p>
        <p>
          Setze G und h in die Volumenformel ein:
          <br />V ={' '}
          {buildInlineFrac(
            <>
              {data.l * data.l} cm² · {data.h} cm
            </>,
            3,
          )}{' '}
          ={' '}
          <strong>
            {pp(roundToDigits((data.l * data.l * data.h) / 3, 2))} cm³
          </strong>
        </p>
        <p>
          Die Formel zur Berechnung des Gewichts <strong>m</strong> lautet:{' '}
          <br /> m = V · Dichte
        </p>
        <p>
          Setze ein: <br />
          <strong>
            m = {pp(roundToDigits((data.l * data.l * data.h) / 3, 2))} cm³ ·{' '}
            {pp(data.d)} {buildInlineFrac('g', 'cm³')} ={' '}
            {pp(roundToDigits(((data.l * data.l * data.h) / 3) * data.d, 2))} g
          </strong>
        </p>
      </>
    )
  },
}
