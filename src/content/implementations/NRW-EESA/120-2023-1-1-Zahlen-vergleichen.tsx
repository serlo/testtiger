import { Exercise } from '@/data/types'
import { pp, ppFrac } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
  d: number
  e: number
  f: number
  g: number
  h: number
  i: number
}

export const exercise120: Exercise<DATA> = {
  title: 'Zahlen vergleichen',
  source: '2023 Teil 1 Aufgabe 1',
  useCalculator: false,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      a: rng.randomIntBetween(10, 100) / -100,
      b: rng.randomIntBetween(10, 100) / -100,
      c: rng.randomItemFromArray([5, 10, 20, 30, 40, 50, 60, 70, 80, 90]),
      d: rng.randomItemFromArray([5, 10, 50, 100]),
      e: rng.randomIntBetween(1, 9),
      f: rng.randomItemFromArray([2, 4, 5]),
      g: rng.randomIntBetween(100, 100) / 100,
      h: rng.randomIntBetween(1, 9),
      i: rng.randomItemFromArray([2, 4, 5]),
    }
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Vergleiche und setze in die Lücke jeweils das Zeichen {'"<"'}, {'">"'}
          oder {'"="'} ein.
        </p>
        <p>{pp(data.a)}</p>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
