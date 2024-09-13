import { Exercise } from '@/data/types'

interface DATA {}

export const exercise210: Exercise<DATA> = {
  title: '2022 Variante 1 /1) Potenzen',
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
