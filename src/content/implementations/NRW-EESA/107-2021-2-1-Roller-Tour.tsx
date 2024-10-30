import { Exercise } from '@/data/types'

interface DATA {}

export const exercise107: Exercise<DATA> = {
  title: 'Roller-Tour',
  source: '2021 Teil 2 Aufgabe 1',
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
        <p>
          Melike und Robin planen eine Tour mit einem Motorroller. Sie wollen
          eine Woche unterwegs sein. Am ersten Tag wollen sie von Fröndenberg zu
          einem Campingplatz am Möhnesee fahren (Abbildung 1).
        </p>
      </>
    )
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return <></>
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
        return <></>
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
        return <></>
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
        return <></>
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
        return <></>
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
        return <></>
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
