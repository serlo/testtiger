import { Exercise } from '@/data/types'
import { buildOverline } from '@/helper/math-builder'

interface DATA {}

export const exercise250: Exercise<DATA> = {
  title: 'Parabeln + Sechseck',
  source: '2022 Wahlteil B - Aufgabe 4',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {}
  },
  originalData: {},
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return null
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Die Parabel p<sub>1</sub> hat die Funktionsgleichung y = x² - 8x +
              12.
            </p>
            <p>
              Die verschobene nach oben geöffnete Normalparabel p<sub>2</sub>{' '}
              hat den Scheitelpunkt S<sub>2</sub>(1|-7).
            </p>
            <ul>
              <li>
                Berechne die Koordinaten des Schnittpunkts Q<sub>1</sub> der
                beiden Parabeln p<sub>1</sub> und p<sub>2</sub>.
              </li>
            </ul>
            <p>
              Die Parabel p<sub>1</sub> schneidet die x-Achse in den Punkten N
              <sub>1</sub> und N<sub>2</sub>.
            </p>
            <ul>
              <li>
                Berechne die Koordinaten von N<sub>1</sub> und N<sub>2</sub>.
              </li>
            </ul>
            <p>
              Die Punkte N<sub>1</sub>, N<sub>2</sub> und Q<sub>1</sub> bilden
              ein Dreieck.
            </p>
            <ul>
              <li>
                Berechne den Flächeninhalt des Dreiecks N<sub>1</sub>Q
                <sub>1</sub>N<sub>2</sub>.
              </li>
            </ul>
            <p>
              Der Punkt Q<sub>1</sub> bewegt sich auf der Parabel p<sub>2</sub>{' '}
              unterhalb der x-Achse. Dadurch entsteht der Punkt Q<sub>2</sub>{' '}
              und somit das Dreieck N<sub>1</sub>Q<sub>2</sub>N<sub>2</sub>.
            </p>
            <ul>
              <li>
                Für welche Lage von Q<sub>2</sub> wird der Flächeninhalt des
                Dreiecks am größten?
              </li>
              <li>Berechne diesen maximalen Flächeninhalt.</li>
            </ul>
          </>
        )
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
        return (
          <>
            <p>
              Das regelmäßige Sechseck und das gleichschenklige Dreieck ABC
              haben die Seite {buildOverline('AB')} gemeinsam.{' '}
            </p>
            <svg viewBox="0 0 328 150">
              <image
                href="/content/BW_Realschule/250_Sechseck.jpg"
                height="150"
                width="328"
              />
            </svg>
            <p>Es gilt: {buildOverline('AB')} cm</p>
            <ul>
              <li>Berechne den Umfang des Dreiecks ABC.</li>
            </ul>
            <p>
              Tom behauptet: {'"'}Der Flächeninhalt des Sechsecks ist dreimal so
              groß wie der Flächeninhalt des Dreiecks ABC.{'"'}{' '}
            </p>
            <ul>
              <li>
                Hat Tom Recht? Begründe deine Antwort durch Rechnung oder
                Argumentation.
              </li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
