import { Exercise } from '@/data/types'

interface DATA {}

export const exercise42: Exercise<DATA> = {
  title: 'Kugel',
  source: '2018 Teil 1 Aufgabe 3',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {}
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return <></>
  },
  tasks: [
    {
      points: 42,
      task({ data }) {
        return <></>
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      points: 42,
      task({ data }) {
        return <></>
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
