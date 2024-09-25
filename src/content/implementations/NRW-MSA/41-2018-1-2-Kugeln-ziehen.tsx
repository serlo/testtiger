import { Exercise } from '@/data/types'

interface DATA {}

export const exercise41: Exercise<DATA> = {
  title: 'Kugeln ziehen',
  source: '2018 Teil 1 /2',
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
