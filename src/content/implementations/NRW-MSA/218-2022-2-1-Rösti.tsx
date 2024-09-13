import { Exercise } from '@/data/types'

interface DATA {}

export const exerciseXXX: Exercise<DATA> = {
  title: 'NEU',
  useCalculator: false,
  duration: -1,
  generator(rng) {
    return {}
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
  subtasks: {
    tasks: [
      ({ data }) => {
        return <></>
      },
    ],
    solutions: [
      ({ data }) => {
        return (
          <>
            <p></p>
          </>
        )
      },
    ],
  },
}
