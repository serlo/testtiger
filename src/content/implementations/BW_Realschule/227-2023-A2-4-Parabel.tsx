import { Exercise } from '@/data/types'

interface DATA {}

export const exercise227: Exercise<DATA> = {
  title: 'Parabeln',
  source: '2023 Pflichtteil A2 - Aufgabe 4',
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
