import { Exercise } from '@/data/types'

interface DATA {
  task1: number
  task2: number
}

export const exercise217: Exercise<DATA> = {
  title: 'Würfel',
  source: '2023 Pflichtteil A - Aufgabe 2',
  useCalculator: false,
  duration: 4,
  generator(rng) {
    return {
      task1: rng.randomIntBetween(1, 5),
      task2: rng.randomIntBetween(1, 5),
    }
  },
  originalData: {
    task1: 1,
    task2: 1,
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return null
  },
  tasks: [
    {
      points: 1,
      intro({ data }) {
        return (
          <p>
            Zwei Spielwürfel werden gleichzeitig geworfen. Die Augenzahlen
            werden addiert (Augensumme).
          </p>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              a) Berechne die Wahrscheinlichkeit für das Ereignis &quot;
              {data.task1 === 1 && 'Augensumme ungerade'}
              {data.task1 === 2 && 'Augensumme gerade'}
              {data.task1 === 3 && 'Augensumme zweistellig'}
              {data.task1 === 4 && 'Augensumme einstellig'}
              {data.task2 === 5 && 'Augensumme 7'}&quot;.
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      points: 1,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              a) Berechne die Wahrscheinlichkeit für das Ereignis{' '}
              {data.task2 === 1 && 'Augensumme kleiner 4'}
              {data.task2 === 2 && 'Augensumme größer 4'}
              {data.task2 === 3 && 'Augensumme kleiner 7'}
              {data.task2 === 4 && 'Augensumme größer 7'}
              {data.task2 === 5 && 'Augensumme nicht 7'}.
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
