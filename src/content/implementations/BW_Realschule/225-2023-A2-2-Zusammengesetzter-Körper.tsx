import { Exercise } from '@/data/types'

interface DATA {}

export const exercise225: Exercise<DATA> = {
  title: 'Zusammengesetzter Körper',
  source: '2023 Pflichtteil A2 - Aufgabe 2',
  useCalculator: true,
  duration: 42,
  points: 4,
  generator(rng) {
    return {}
  },
  originalData: {},
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
