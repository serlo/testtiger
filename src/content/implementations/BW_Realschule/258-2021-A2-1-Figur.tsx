import { Exercise } from '@/data/types'
import { buildOverline } from '@/helper/math-builder'

interface DATA {}

export const exercise258: Exercise<DATA> = {
  title: 'Figur',
  source: '2021 Pflichtteil A2 - Aufgabe 1',
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
          Das gleichschenklige Dreieck ABC und das Quadrat ADEF überdecken sich
          teilweise.
        </p>
        <svg viewBox="0 0 328 190">
          <image
            href="/content/BW_Realschule/258_Figur.jpg"
            height="190"
            width="328"
          />
        </svg>
        <p>
          Es gilt:<br></br>
          {buildOverline('BD')} = 10,0 cm<br></br>β = 67,0°<br></br>
          {buildOverline('AC')} = {buildOverline('BC')}
        </p>
        <p>Berechne den Umfang des Dreiecks GEC.</p>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
