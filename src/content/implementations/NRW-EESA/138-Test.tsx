import { Exercise } from '@/data/types'

interface DATA {}

export const exercise138: Exercise<DATA> = {
  title: 'Test',
  source: 'Test',
  useCalculator: false,
  duration: 42,
  points: 42,
  generator(rng) {
    return {}
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>Zeichne die Gerade y = 2x + 3 in ein Koordinatensystem.</p>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
