import { Exercise } from '@/data/types'

interface DATA {}

export const exercise263: Exercise<DATA> = {
  title: 'Boxplots',
  source: '2021 Pflichtteil A2 - Aufgabe 6',
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
