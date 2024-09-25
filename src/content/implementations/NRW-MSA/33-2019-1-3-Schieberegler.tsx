import { Exercise } from '@/data/types'

interface DATA {}

export const exercise33: Exercise<DATA> = {
  title: 'Schieberegler',
  source: '2019 Teil 1 /3',
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
