import { Exercise } from '@/data/types'

interface DATA {}

export const exercise125: Exercise<DATA> = {
  title: 'Mittelwerte und Durchschnitt',
  source: '2023 Teil 1 Aufgabe 6',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {}
  },
  originalData: {},
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return null
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return <></>
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return <></>
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
