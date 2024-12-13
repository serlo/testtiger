import { Exercise } from '@/data/types'
import { buildOverline } from '@/helper/math-builder'

interface DATA {}

export const exercise265: Exercise<DATA> = {
  title: 'Funktionen + Körper',
  source: '2021 Wahlteil B - Aufgabe 2',
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
              Der Punkt A(-4|-1) liegt auf der Parabel p<sub>1</sub> mit der
              Funktionsgleichung y = x² + bx + 7. Die Gerade g schneidet die
              Parabel p<sub>1</sub> im Punkt A und im Scheitelpunkt S
              <sub>1</sub>.
            </p>
            <ul>
              <li>
                Berechne die Funktionsgleichungen der Parabel p<sub>1</sub> und
                der Geraden g.
              </li>
            </ul>
            <p>
              Durch Spiegelung des Scheitelpunkts S<sub>1</sub> an der y-Achse
              entsteht der Punkt S<sub>2</sub>. S<sub>2</sub> ist der
              Scheitelpunkt einer nach oben geöffneten verschobenen
              Normalparabel p<sub>2</sub>.
            </p>
            <ul>
              <li>
                Gib die Funktionsgleichung von p<sub>2</sub> in der Form y = x²
                + bx + c an.
              </li>
            </ul>
            <p>
              Der Schnittpunkt der Geraden g mit der y-Achse ist der
              Scheitelpunkt S<sub>3</sub> der Parabel p<sub>3</sub>. Die Parabel
              p<sub>3</sub> der Form <br></br>y = ax² + c geht außerdem durch
              die Scheitelpunkte S<sub>1</sub> und S<sub>2</sub>.
            </p>
            <ul>
              <li>
                Berechne die Funktionsgleichung der Parabel p<sub>3</sub>.
              </li>
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
              In einer quadratischen Pyramide liegt das gleichschenklige Dreieck
              EFS.
            </p>
            <svg viewBox="0 0 328 190">
              <image
                href="/content/BW_Realschule/265_Körper.jpg"
                height="190"
                width="328"
              />
            </svg>
            <p>
              Es gilt:<br></br>
              {buildOverline('AB')} = {buildOverline('EF')} = 12,6 cm<br></br>α
              = 72,0° <br></br>
              {buildOverline('EF')} || {buildOverline('AC')}
            </p>
            <ul>
              <li>Berechne den Flächeninhalt des Dreiecks EFS.</li>
              <li>Berechne das Volumen der quadratischen Pyramide.</li>
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
