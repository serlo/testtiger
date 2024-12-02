import { Exercise } from '@/data/types'

interface DATA {}

export const exercise228: Exercise<DATA> = {
  title: 'Kreisel',
  source: '2023 Pflichtteil A2 - Aufgabe 5',
  useCalculator: true,
  duration: 42,
  points: 3,
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
