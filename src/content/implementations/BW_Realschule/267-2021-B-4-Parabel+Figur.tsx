import { Exercise } from '@/data/types'
import { buildOverline } from '@/helper/math-builder'

interface DATA {}

export const exercise267: Exercise<DATA> = {
  title: 'Parabel + Figur',
  source: '2021 Wahlteil B - Aufgabe 4',
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
              Die Gerade g und die verschobene Normalparabel p gehen durch die
              beiden Punkte A(2|3) und B(6|11). <br></br>Der Punkt C(4|y
              <sub>c</sub>) liegt auf der Parabel p. <br></br>Die Gerade h steht
              senkrecht auf g und geht durch C. <br></br>Die Gerade h schneidet
              die beiden Koordinatenachsen in den Punkten P und Q.
            </p>
            <p>Berechne die Koordinaten von P und Q.</p>
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
              Ein DIN-A4-Blatt hat die Eckpunkte A, B, C und D. <br></br>Die
              Punkte M<sub>1</sub> und M<sub>2</sub> halbieren die Seitenlängen
              des DIN-A4-Blatts. <br></br>Das DIN-A4-Blatt wird wie abgebildet
              gefaltet. Der Punkt A wird zu A und liegt nach dem Falten auf M
              <sub>1</sub>. <br></br>Der Punkt C wird zum Punkt C Die beiden
              Papierkanten stoßen entlang von {buildOverline('M1F')} aneinander.
            </p>
            <p>
              {' '}
              Berechne die Flächeninhalte des Dreiecks EM
              <sub>1</sub>D und des Vierecks FBM<sub>2</sub>C.{' '}
            </p>
            <svg viewBox="0 0 328 230">
              <image
                href="/content/BW_Realschule/267_Figur.jpg"
                height="230"
                width="328"
              />
            </svg>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
