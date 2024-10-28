import { Exercise } from '@/data/types'

interface DATA {
  bildvariante: number
  breite: number
  radius: number
  buchsbaeume: number
  samen: number
}

export const exercise135: Exercise<DATA> = {
  title: 'Garten',
  source: '2024 Teil 2 Aufgabe 1',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      bildvariante: rng.randomIntBetween(1, 6),
      breite: rng.randomItemFromArray([2, 4, 6, 8, 10]),
      radius: rng.randomIntBetween(1, 2),
      buchsbaeume: rng.randomIntBetween(7, 38),
      samen: rng.randomIntBetween(2, 7),
    }
  },
  originalData: {
    bildvariante: 1,
    breite: 8,
    radius: 2,
    buchsbaeume: 38,
    samen: 3,
  },
  constraint({ data }) {
    return data.breite != data.radius && data.buchsbaeume / data.breite < 7
  },
  intro({ data }) {
    return (
      <>
        <p>
          Lisa arbeitet als Gärtnerin. Im Rahmen eines Projektes plant sie den
          Grundriss eines quadratischen Gartens. Dieser Garten soll
          achsensymmetrisch sein (Abbildung 1).
        </p>
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
