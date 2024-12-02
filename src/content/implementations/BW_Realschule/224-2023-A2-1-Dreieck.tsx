import { Exercise } from '@/data/types'
import { buildOverline } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  cd: number
  gamma: number
}

export const exercise224: Exercise<DATA> = {
  title: 'Dreieck',
  source: '2023 Pflichtteil A2 - Aufgabe 1',
  useCalculator: true,
  duration: 42,
  points: 3.5,
  generator(rng) {
    return {
      cd: rng.randomIntBetween(50, 70) / 10,
      gamma: rng.randomIntBetween(380, 440) / 10,
    }
  },
  originalData: { cd: 6.3, gamma: 41.8 },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Im rechtwinkligen Dreieck ABC liegen die beiden gleichschenkligen
          Dreiecke ABD und BCD.
        </p>
        <svg viewBox="0 0 328 180">
          <image
            href="/content/BW_Realschule/224_Dreieck.jpg"
            height="180"
            width="328"
          />
        </svg>
        <p>Es gilt:</p>
        <p>
          {buildOverline('CD')} = {pp(data.cd)} cm<br></br>γ = {pp(data.gamma)}°
          <br></br>
          {buildOverline('AD')} = {buildOverline('BD')}
          <br></br>
          {buildOverline('BD')} = {buildOverline('CD')}
        </p>
        <ul>
          <li>Berechne den Umfang des Dreiecks ABD.</li>
          <li>Berechne den Flächeninhalt des Dreiecks ABD.</li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
