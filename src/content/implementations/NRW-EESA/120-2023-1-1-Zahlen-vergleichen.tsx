import { Exercise } from '@/data/types'

interface DATA {}

export const exercise120: Exercise<DATA> = {
  title: 'Zahlen vergleichen',
  source: '2023 Teil 1 Aufgabe 1',
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
    return <></>
  },
  solution({ data }) {
    return <></>
  },
}
