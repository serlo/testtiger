import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
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
          <strong>Volumen berechnen</strong>
        </p>
        <p>
          Berechne zuerst das Volumen der Pyramide, um mithilfe der Dichte das
          Gewicht zu bestimmen. <br></br>
          <br></br>Die Formel zur Berechnung des Volumens einer Pyramide lautet:
        </p>
        {buildEquation([
          [<>V</>, <>=</>, <>{buildInlineFrac('G · h', 3)}</>],
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
                <span style={{ fontSize: 'small' }}>
                  Grundfläche ist ein Quadrat, <br></br>Werte einsetzen{' '}
                </span>
              </Color4>
            </>,
          ],
          [
            <>V</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>
                  {data.l} ·{data.l} · {data.h}
                </>,
                3,
              )}
            </>,
          ],
          [
            <></>,
            <>≈</>,
            <>
              <strong>
                {pp(roundToDigits((data.l * data.l * data.h) / 3, 2))} cm³
              </strong>
            </>,
          ],
        ])}
        <p>
          <strong>Gewicht berechnen</strong>
        </p>
        <p>
          Die Formel zur Berechnung des Gewichts <strong>m</strong> lautet:{' '}
        </p>
        {buildEquation([
          [<>m</>, <>=</>, <>V · Dichte</>],
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
                <span style={{ fontSize: 'small' }}>Werte einsetzen </span>
              </Color4>
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              {' '}
              {pp(roundToDigits((data.l * data.l * data.h) / 3, 2))} ·{' '}
              {pp(data.d)}
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              <strong>
                {pp(
                  roundToDigits(((data.l * data.l * data.h) / 3) * data.d, 2),
                )}{' '}
                [g]
              </strong>
            </>,
          ],
        ])}
        <p>
          Die Pyramide hat ein Gewicht von{' '}
          <strong>
            {pp(roundToDigits(((data.l * data.l * data.h) / 3) * data.d, 2))} g
          </strong>
          .
        </p>
      </>
    )
  },
}
