import { Exercise } from '@/data/types'

interface DATA {}

export const exercise251: Exercise<DATA> = {
  title: 'Figur',
  source: '2021 Pflichtteil A2 - Aufgabe 1',
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
    return <></>
  },
  solution({ data }) {
    return <></>
  },
}
