import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  hours: number
}

export const exercise21: Exercise<DATA> = {
  title: '2021 Variante 1 /2) Einheiten umrechnen',
  useCalculator: false,
  duration: 2,
  points: [3],
  generator(rng) {
    return { hours: (rng.randomIntBetween(30, 60) * 5) / 100 }
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
      return (
        <>
          <p>Rechne die Größen in die angegebene Einheit um.</p>
        </>
      )
    },
    tasks: [
      ({ data }) => {
        return (
          <>
            <p>a) Rechne Stunden in Sekunden um.</p>
            <p>{pp(data.hours)} h = ______ s</p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>b) Rechne Zentimeter in Meter um.</p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>c) Rechne Gramm in Kilogramm um.</p>
          </>
        )
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
      ({ data }) => {
        return (
          <>
            <p></p>
          </>
        )
      },
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
