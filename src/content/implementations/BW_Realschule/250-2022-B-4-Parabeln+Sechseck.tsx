import { Exercise } from '@/data/types'
import { buildEquation, buildOverline } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  b: number
  c: number
  xs: number
  ys: number
}

export const exercise250: Exercise<DATA> = {
  title: 'Parabeln + Sechseck',
  source: '2022 Wahlteil B - Aufgabe 4',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      b: rng.randomIntBetween(-10, -2),
      c: rng.randomIntBetween(8, 14),
      xs: rng.randomIntBetween(1, 4),
      ys: rng.randomIntBetween(-10, -4),
    }
  },
  originalData: { b: -8, c: 12, xs: 1, ys: -7 },
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
              Die Parabel p<sub>1</sub> hat die Funktionsgleichung <br></br>y =
              x² {pp(data.b, 'merge_op')}x + {pp(data.c)}.
            </p>
            <p>
              Die verschobene nach oben geöffnete Normalparabel p<sub>2</sub>{' '}
              hat den Scheitelpunkt <br></br>S<sub>2</sub>({pp(data.xs)}|
              {pp(data.ys)}).
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
        return (
          <>
            <p>
              Die Parabel p<sub>2</sub> hat die Scheitelform:
            </p>
            <p>
              y = (x − {pp(data.xs)})² {pp(data.ys, 'merge_op')}
            </p>
            <p>
              Verwende die binomische Formel und bestimme die Funktionsgleichung
              von p<sub>2</sub>:
            </p>
            <p>
              y = (x² − {pp(2 * data.xs)}x + {pp(data.xs * data.xs)}){' '}
              {pp(data.ys, 'merge_op')}
            </p>
            <p>
              y = x² − {pp(2 * data.xs)}x{' '}
              {pp(data.xs * data.xs + data.ys, 'merge_op')}{' '}
            </p>
            <p>
              <strong>
                Koordinaten des Schnittpunkts Q<sub>1</sub>
              </strong>
            </p>
            <p>
              Setze die Funktionsgleichungen gleich und berechne die Lösung der
              Gleichung:
            </p>
            {buildEquation([
              [
                <>
                  x² {pp(data.b, 'merge_op')}x + {pp(data.c)}
                </>,
                <>=</>,
                <>
                  x² − {pp(2 * data.xs)}x{' '}
                  {pp(data.xs * data.xs + data.ys, 'merge_op')}
                </>,
              ],
              [<></>, <></>, <></>],
              [<></>, <></>, <></>],
            ])}
            <p>
              <strong>
                Koordinaten von N<sub>1</sub> und N<sub>2</sub>
              </strong>
            </p>

            <p>
              <strong>
                Flächeninhalt von N<sub>1</sub>Q<sub>1</sub>N<sub>2</sub>
              </strong>
            </p>

            <p>
              <strong>
                Q<sub>2</sub> für größtmögliche Fläche
              </strong>
            </p>

            <p>
              <strong>Maximaler Flächeninhalt</strong>
            </p>
          </>
        )
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
