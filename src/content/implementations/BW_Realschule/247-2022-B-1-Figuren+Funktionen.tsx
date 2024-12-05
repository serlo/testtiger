import { Exercise } from '@/data/types'
import { buildOverline } from '@/helper/math-builder'

interface DATA {}

export const exercise247: Exercise<DATA> = {
  title: 'Figuren + Funktionen',
  source: '2022 Wahlteil B - Aufgabe 1',
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
              Im Quadrat ABCD liegen die beiden gleichschenkligen Dreiecke ABF
              und DEF.
            </p>
            <svg viewBox="0 0 328 190">
              <image
                href="/content/BW_Realschule/247_Figur.jpg"
                height="190"
                width="328"
              />
            </svg>
            <p>Es gilt:</p>
            <p>
              {buildOverline('AB')} = 10 cm<br></br>
              {buildOverline('AF')} = 12 cm<br></br>
              {buildOverline('AF')} = {buildOverline('BF')}
              <br></br>
              {buildOverline('EF')} = {buildOverline('DF')}
              <br></br>
            </p>
            <ul>
              <li>Berechne den Flächeninhalt des Dreiecks AFE.</li>
              <li>Berechne den Winkel ε.</li>
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
            <p>Die Gerade g hat die Funktionsgleichung y = x + 2.</p>
            <p>
              Die Parabel p<sub>1</sub> hat die Funktionsgleichung y = - x² + 8.
            </p>
            <p>
              Die Parabel p<sub>1</sub> schneidet die Gerade g in den Punkten P
              und Q.
            </p>
            <ul>
              <li>Berechne die Koordinaten der Schnittpunkte P und Q.</li>
            </ul>
            <p>
              Durch die beiden Schnittpunkte P und Q verläuft die verschobene
              nach oben geöffnete Normalparabel p<sub>2</sub>.
            </p>
            <ul>
              <li>
                Berechne die Koordinaten des Scheitelpunkts S<sub>2</sub> von p
                <sub>2</sub>.
              </li>
            </ul>
            <p>
              Robin behauptet: {'"'}Das Dreieck mit den Punkten P und Q und S
              <sub>2</sub> ist rechtwinklig.{'"'}{' '}
            </p>
            <ul>
              <li>Hat Robin Recht? Begründe deine Antwort rechnerisch.</li>
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
