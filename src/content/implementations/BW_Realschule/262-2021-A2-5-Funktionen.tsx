import { Exercise } from '@/data/types'

interface DATA {}

export const exercise262: Exercise<DATA> = {
  title: 'Funktionen',
  source: '2021 Pflichtteil A2 - Aufgabe 5',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return {}
  },
  originalData: {},
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Die Parabel p hat die Funktionsgleichung <br></br>y = x² - 6x + 10.
        </p>
        <p>Eine Gerade g besitzt die Steigung m = -2.</p>
        <p>Sie geht durch den Scheitelpunkt S der Parabel p.</p>
        <ul>
          <li>
            Berechne die Koordinaten des zweiten Schnittpunkts Q der Parabel p
            mit der Geraden g.
          </li>
        </ul>
        <p>
          Die Gerade h verläuft senkrecht zur Geraden g und geht durch den Punkt
          Q.
        </p>
        <ul>
          <li>Berechne die Funktionsgleichung der Geraden h.</li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
