import { Exercise } from '@/data/types'

interface DATA {}

export const exercise252: Exercise<DATA> = {
  title: 'Körper',
  source: '2021 Pflichtteil A2 - Aufgabe 2',
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
