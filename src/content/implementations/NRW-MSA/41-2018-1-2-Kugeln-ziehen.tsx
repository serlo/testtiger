import { Exercise } from '@/data/types'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'

interface DATA {
  r: number
  b: number
  g: number
  case: string
}

export const exercise41: Exercise<DATA> = {
  title: 'Kugeln ziehen',
  source: '2018 Teil 1 /2',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {
      r: rng.randomIntBetween(1, 9),
      b: rng.randomIntBetween(1, 9),
      g: rng.randomIntBetween(1, 9),
      case: rng.randomItemFromArray(['rot', 'blau', 'grün']),
    }
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          In einem Beutel befinden sich {data.r} rote, {data.b} blaue und{' '}
          {data.g} grüne Kugeln.
        </p>
      </>
    )
  },
  tasks: [
    {
      points: 42,
      task({ data }) {
        return (
          <>
            <p>
              a) Gib die Wahrscheinlichkeit an, eine {data.case}e Kugel zu
              ziehen.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Berechne die Wahrscheinlichkeit mit der Laplace Formel:</p>
            <p>
              {buildEquation([
                [
                  <>p({data.case})</>,
                  <>=</>,
                  buildInlineFrac(
                    <>Anzahl der {data.case}en Kugeln</>,
                    <>Anzahl aller Kugeln</>,
                  ),
                ],
                [
                  <></>,
                  <>=</>,
                  buildInlineFrac(
                    <>
                      {data.case == 'rot' && data.r}
                      {data.case == 'blau' && data.b}
                      {data.case == 'grün' && data.g}
                    </>,
                    <>
                      {data.r} + {data.b} + {data.g}
                    </>,
                  ),
                ],
                [
                  <></>,
                  <>=</>,
                  buildInlineFrac(
                    <>
                      {data.case == 'rot' && data.r}
                      {data.case == 'blau' && data.b}
                      {data.case == 'grün' && data.g}
                    </>,
                    data.r + data.b + data.g,
                  ),
                ],
              ])}
            </p>
          </>
        )
      },
    },
    {
      points: 42,
      task({ data }) {
        return (
          <>
            <p>
              b) Bestimme die Wahrscheinlichkeit für das Ereignis: Es wird eine{' '}
              {data.case == 'rot' && <>blaue oder eine grüne</>}
              {data.case == 'blau' && <>rote oder eine grüne</>}
              {data.case == 'grün' && <>blaue oder eine rote</>} Kugel gezogen.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Berechne dies über die Gegenwahrscheinlichkeit zu: Es wird eine{' '}
              {data.case}e Kugel gezogen.
            </p>
            <p>
              1 -{' '}
              {buildInlineFrac(
                <>
                  {data.case == 'rot' && data.r}
                  {data.case == 'blau' && data.b}
                  {data.case == 'grün' && data.g}
                </>,
                data.r + data.b + data.g,
              )}{' '}
              ={' '}
              {buildInlineFrac(
                <>
                  {data.case == 'rot' && data.b + data.g}
                  {data.case == 'blau' && data.r + data.g}
                  {data.case == 'grün' && data.r + data.b}
                </>,
                data.r + data.b + data.g,
              )}
            </p>
          </>
        )
      },
    },
  ],
}