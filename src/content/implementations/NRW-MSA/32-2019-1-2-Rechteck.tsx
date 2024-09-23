import { Exercise } from '@/data/types'

interface DATA {}

export const exercise32: Exercise<DATA> = {
  title: 'NEU',
  source: '',
  useCalculator: false,
  duration: 42,
  points: [42],
  generator(rng) {
    return {}
  },
  constraint({ data }) {
    return true
  },
  subtasks: {
    intro: ({ data }) => {
      return <></>
    },
    main: [
      {
        task({ data }) {
          return <></>
        },
        solution({ data }) {
          return <></>
        },
      },
      {
        task({ data }) {
          return <></>
        },
        solution({ data }) {
          return <></>
        },
      },
    ],
  },
}
