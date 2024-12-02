import { Exercise } from '@/data/types'

interface DATA {}

export const exercise224: Exercise<DATA> = {
  title: 'Dreieck',
  source: '2023 Pflichtteil A2 - Aufgabe 1',
  useCalculator: true,
  duration: 42,
  points: 3.5,
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
