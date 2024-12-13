import { Exercise } from '@/data/types'
import { buildOverline } from '@/helper/math-builder'

interface DATA {}

export const exercise264: Exercise<DATA> = {
  title: 'Figur + Funktionen',
  source: '2021 Wahlteil B - Aufgabe 1',
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
              Gegeben sind das rechtwinklige Dreieck ABC und das
              gleichschenklige Dreieck ADE.
            </p>
            <svg viewBox="0 0 328 190">
              <image
                href="/content/BW_Realschule/264_Figur.jpg"
                height="190"
                width="328"
              />
            </svg>
            <p>
              Es gilt: <br></br>
              {buildOverline('AB')} = 13,2 cm <br></br>α = 55,0°<br></br>
              {buildOverline('CE')} = 8,0 cm<br></br>
              {buildOverline('AE')} = {buildOverline('DE')}
            </p>
            <ul>
              <li>Berechne die Länge von {buildOverline('DF')}.</li>
              <li>Berechne den Umfang des Vierecks ABFE.</li>
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
              Die Punkte A(1|-8) und B(3|-8) liegen auf einer nach oben
              geöffneten verschobenen Normalparabel p.
            </p>
            <ul>
              <li>
                Gib die Funktionsgleichung der Parabel p in der Normalform{' '}
                <br></br>y = x² + bx + c an.
              </li>
            </ul>
            <p>
              Die Schnittpunkte der Parabel p mit der x-Achse und die Punkte A
              und B bilden ein Viereck.{' '}
            </p>
            <ul>
              <li>Berechne den Flächeninhalt dieses Vierecks.</li>
            </ul>
            <p>
              Die Geraden g und h verlaufen jeweils auf den Diagonalen des
              Vierecks. Sie schneiden sich im Punkt Q.
            </p>
            <ul>
              <li>Berechne die Koordinaten des Schnittpunktes Q.</li>
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
