import { Exercise } from '@/data/types'
import { buildOverline } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  ac: number
  alpha: number
}

export const exercise241: Exercise<DATA> = {
  title: 'Dreieck',
  source: '2022 Pflichtteil A2 - Aufgabe 1',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      ac: rng.randomIntBetween(70, 110) / 10,
      alpha: rng.randomIntBetween(6, 9) * 5,
    }
  },
  originalData: { ac: 9.5, alpha: 40 },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>Im rechtwinkligen Dreieck ABC gilt:</p>
        <p>
          {buildOverline('AC')} = {pp(data.ac)} cm<br></br>α = {data.alpha}°
          <br></br>
          {buildOverline('BC')} = {buildOverline('BD')}
        </p>
        <svg viewBox="0 0 328 170">
          <image
            href="/content/BW_Realschule/241_Dreieck.jpg"
            height="170"
            width="328"
          />
        </svg>
        <p>Berechne den Umfang des Dreiecks ADC.</p>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
