import { Exercise } from '@/data/types'

interface DATA {}

export const exercise245: Exercise<DATA> = {
  title: 'Losverkauf',
  source: '2022 Pflichtteil A2 - Aufgabe 5',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return {}
  },
  originalData: {},
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Die Klasse 5c verkauft Lose beim Schulfest. Es gibt folgende Gewinne:
          12 Fußbälle und 8 Basketbälle. Die restlichen 80 Lose sind Nieten.{' '}
        </p>
        <p>Francesca möchte zwei Lose ziehen. </p>
        <p>Wie groß ist die Wahrscheinlichkeit, dass sie </p>
        <ul>
          <li>zwei Nieten zieht?</li>
          <li>einen Fußball und einen Basketball gewinnt?</li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
