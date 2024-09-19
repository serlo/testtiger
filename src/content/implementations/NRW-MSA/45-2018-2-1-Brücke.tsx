import { Exercise } from '@/data/types'

interface DATA {}

export const exercise45: Exercise<DATA> = {
  title: '2018 Prüfungsteil 2 /1) Brücke',
  useCalculator: true,
  duration: 10,
  points: [42],
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
    intro: ({ data }) => {
      return <></>
    },
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
