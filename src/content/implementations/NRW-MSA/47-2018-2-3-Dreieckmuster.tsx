import { Exercise } from '@/data/types'

interface DATA {
  seite: number
}

export const exercise47: Exercise<DATA> = {
  title: '2018 Prüfungsteil /2) Dreieckmuster',
  useCalculator: true,
  duration: 10,
  points: [42],
  generator(rng) {
    return { seite: rng.randomIntBetween(6, 12) }
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
          <p>Die Sierpinski-Dreiecke entstehen folgendermaßen (Abbildung 1):</p>
          <ul>
            <li>
              Das Ausgangsdreieck ist ein gleichseitiges Dreieck (Figur 0).
            </li>
            <li>
              Die Mittelpunkte der Dreiecksseiten werden miteinander verbunden.
              Es entstehen vier kleine gleichseitige Dreiecke. Das mittlere
              Dreieck wird weiß gefärbt (Figur 1).
            </li>
            <li>
              Dieser Vorgang wird für alle schwarzen Dreiecke wiederholt (Figur
              2,3,4, ...).
            </li>
          </ul>
          <svg viewBox="0 0 328 100">
            <image
              href="/content/NRW_MSA_Sierpinski.PNG"
              height="100"
              width="328"
            />
          </svg>
          <p>Abbildung 1: Sierpinski-Dreiecke, Figur 0 bis Figur 4</p>
          <p>
            Jede Seitenlänge des Dreiecks in Figur 0 beträgt {data.seite} cm.
          </p>
        </>
      )
    },
    tasks: [
      ({ data }) => {
        return (
          <>
            <p>
              Bestätige durch eine Rechnung, dass der Flächeninhalt des Dreiecks
              in Figur 0 A<sub>0</sub>{' '}
            </p>
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
