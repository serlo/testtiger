import { Exercise } from '@/data/types'

interface DATA {}

export const exercise227: Exercise<DATA> = {
  title: 'Parabeln',
  source: '2023 Pflichtteil A2 - Aufgabe 4',
  useCalculator: true,
  duration: 42,
  points: 3,
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
          Die Abbildung zeigt den Ausschnitt einer verschobenen nach oben
          geöffneten Normalparabel p.
        </p>
        <ul>
          <li>
            Bestimme die Funktionsgleichung der Parabel p. Entnimm dazu
            geeignete Werte aus der Zeichnung.
          </li>
        </ul>
        <p>
          Eine Gerade g schneidet die y-Achse im Punkt T(0|2) und hat die
          Steigung m=-2.{' '}
        </p>
        <ul>
          <li>
            Berechne die Koordinaten der Schnittpunkte A und B der Parabel und
            der Geraden.
          </li>
        </ul>
        <svg viewBox="0 0 328 220">
          <image
            href="/content/BW_Realschule/227_KS.png"
            height="220"
            width="328"
          />
          <text x={315} y={160} fontSize={15} textAnchor="left" stroke="black">
            x
          </text>
          <text x={105} y={20} fontSize={15} textAnchor="left" stroke="black">
            y
          </text>
        </svg>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
