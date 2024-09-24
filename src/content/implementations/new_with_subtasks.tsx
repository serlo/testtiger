import { Exercise } from '@/data/types'

interface DATA {}

export const exerciseXXX: Exercise<DATA> = {
  title: 'NEU',
  source: '',
  useCalculator: false,
  duration: 42,
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
  },
}
