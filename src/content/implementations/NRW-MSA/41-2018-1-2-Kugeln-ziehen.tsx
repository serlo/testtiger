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
  source: '2018 Teil 1 Aufgabe 2',
  useCalculator: false,
  duration: 3,
  generator(rng) {
    return {
      r: rng.randomIntBetween(1, 9),
      b: rng.randomIntBetween(1, 9),
      g: rng.randomIntBetween(1, 9),
      case: rng.randomItemFromArray(['rot', 'blau', 'grün']),
    }
  },
  originalData: {
    r: 8,
    b: 2,
    g: 6,
    case: 'blau',
  },
  constraint({ data }) {
    return true
  },
  correctionHints({ data }) {
    return (
      <>
        Akzeptiere auch gekürzte Brüche beim Ergebnis. Überprüfe, dass auch ein
        Rechenweg vorhanden ist, sonst ist die Aufgabe nicht korrekt gelöst
        worden.
      </>
    )
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
      points: 1,
      duration: 1,
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
                  <>
                    <strong>
                      {buildInlineFrac(
                        <>
                          {data.case == 'rot' && data.r}
                          {data.case == 'blau' && data.b}
                          {data.case == 'grün' && data.g}
                        </>,
                        data.r + data.b + data.g,
                      )}
                    </strong>
                  </>,
                ],
              ])}
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 2,
      task({ data }) {
        return (
          <>
            <p>
              b) Bestimme die Wahrscheinlichkeit für das Ereignis: {'"'}Es wird
              eine {data.case == 'rot' && <>blaue oder eine grüne</>}
              {data.case == 'blau' && <>rote oder eine grüne</>}
              {data.case == 'grün' && <>blaue oder eine rote</>} Kugel gezogen.
              {'"'}
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              <strong>Gegenereignis</strong>
            </p>
            <p>
              Das Gegenereignis wäre in diesem Fall eine {data.case}e Kugel zu
              ziehen. Diese Wahrscheinlichkeit beträgt:
            </p>
            <p>
              p({data.case}) =
              {buildInlineFrac(
                <>
                  {data.case == 'rot' && data.r}
                  {data.case == 'blau' && data.b}
                  {data.case == 'grün' && data.g}
                </>,
                data.r + data.b + data.g,
              )}{' '}
            </p>
            <p>
              <strong>Wahrscheinlichkeit berechnen</strong>
            </p>
            <p>
              Damit lässt sich die Wahrscheinlichkeit des Ereignisses mithilfe
              der Gegenwahrscheinlichkeit bestimmen:
            </p>
            <p>
              p({data.case == 'rot' && <>blau oder grün</>}
              {data.case == 'blau' && <>rot oder grün</>}
              {data.case == 'grün' && <>blau oder rot</>}) = 1 −{' '}
              {buildInlineFrac(
                <>
                  {data.case == 'rot' && data.r}
                  {data.case == 'blau' && data.b}
                  {data.case == 'grün' && data.g}
                </>,
                data.r + data.b + data.g,
              )}{' '}
              ={' '}
              <strong>
                {buildInlineFrac(
                  <>
                    {data.case == 'rot' && data.b + data.g}
                    {data.case == 'blau' && data.r + data.g}
                    {data.case == 'grün' && data.b + data.r}
                  </>,
                  <>{data.r + data.b + data.g}</>,
                )}
              </strong>
            </p>
          </>
        )
      },
    },
  ],
}
