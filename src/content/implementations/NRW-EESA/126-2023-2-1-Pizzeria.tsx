import { Exercise } from '@/data/types'

interface DATA {}

export const exercise126: Exercise<DATA> = {
  title: 'Pizzeria',
  source: '2023 Teil 2 Aufgabe 1',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    return {}
  },
  originalData: {},
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>Mehmet und Sina gehen zur Neueröffnung einer Pizzeria.</p>
        <p>
          Die Pizzeria hat ein Glücksrad aufgebaut. Jede Person darf einmal am
          Glücksrad drehen (Abbildung 1).
        </p>
        <p>Mehmet hofft darauf, einen Rabatt zu gewinnen.</p>
        <svg width="328" height="350">
          <circle></circle>
        </svg>
      </>
    )
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
