import { Exercise } from '@/data/types'
import { buildEquation } from '@/helper/math-builder'

interface DATA {
  subtrahend: number
  faktor: number
  x_input: number
  x_sol: number
}

export const exercise198: Exercise<DATA> = {
  title: 'Lineare Gleichungen',
  source: '',
  useCalculator: false,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      subtrahend: rng.randomIntBetween(6, 15),
      faktor: rng.randomIntBetween(2, 5),
      x_input: rng.randomIntBetween(3, 8),
      x_sol: rng.randomIntBetween(2, 7),
    }
  },

  constraint({ data }) {
    return true
  },
  task({ data }) {
    const rechts = (data.x_sol - data.subtrahend) * data.faktor
    return (
      <>
        <p>
          <b>Starte mit einer Aufgabe zum Aufwärmen:</b>
        </p>
        <p>
          Luisa und Paul rechnen beide die selbe Aufgabe: (x - {data.subtrahend}
          ) · {data.faktor} = ... Sie wollen den Wert für x finden. Sie notieren
          jeweils ihren Rechenweg. Welcher Rechenweg ist richtig?{' '}
        </p>
        <p>Luisas Rechenweg:</p>
        {buildEquation([
          [
            <>
              (x - {data.subtrahend}) · {data.faktor}
            </>,
            <>=</>,
            <>{rechts}</>,
            <>| : {data.faktor}</>,
          ],
          [
            <>x - {data.subtrahend}</>,
            <>=</>,
            <>{rechts / data.faktor}</>,
            <>| + {data.subtrahend}</>,
          ],
          [<>x</>, <>=</>, <>{rechts / data.faktor + data.subtrahend}</>],
        ])}
        <p>Pauls Rechenweg:</p>
        {buildEquation([
          [
            <>
              (x - {data.subtrahend}) · {data.faktor}
            </>,
            <>=</>,
            <>{rechts}</>,
            <>| : {data.faktor}</>,
          ],
          [
            <>x - {data.subtrahend}</>,
            <>=</>,
            <>{rechts}</>,
            <>| + {data.subtrahend}</>,
          ],
          [<>x</>, <>=</>, <>{rechts + data.subtrahend}</>],
        ])}
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
