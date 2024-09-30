import { Exercise } from '@/data/types'

interface DATA {}

export const exercise39: Exercise<DATA> = {
  title: 'Zahlen ordnen',
  source: '2019 Teil 1 Aufgabe 1',
  useCalculator: false,
  duration: 22,
  points: 2,
  generator(rng) {
    return {}
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>Ordne die Zahlen der Größe nach. Beginne mit der kleinsten Zahl.</p>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
