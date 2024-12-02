import { Exercise } from '@/data/types'

interface DATA {}

export const exercise229: Exercise<DATA> = {
  title: 'Diagramm',
  source: '2023 Pflichtteil A2 - Aufgabe 6',
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
