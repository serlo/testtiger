import { Exercise } from '@/data/types'

interface DATA {}

export const exercise226: Exercise<DATA> = {
  title: 'Lineares Gleichungssystem',
  source: '2023 Pflichtteil A2 - Aufgabe 3',
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
