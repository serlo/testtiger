import { Exercise } from '@/data/types'

interface DATA {}

export const exercise122: Exercise<DATA> = {
  title: 'Volumen berechnen',
  source: '2023 Teil 1 Aufgabe 3',
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
