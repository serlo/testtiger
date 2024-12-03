import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  anzahl: number
  radius: number
  t: number
  s: number
  aw: number
}

export const exercise242: Exercise<DATA> = {
  title: 'Gussform',
  source: '2022 Pflichtteil A2 - Aufgabe 2',
  useCalculator: false,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      anzahl: rng.randomIntBetween(6, 15) * 100,
      radius: rng.randomIntBetween(2, 6) * 0.5,
      t: rng.randomIntBetween(1, 3),
      s: rng.randomIntBetween(4, 6),
      aw: rng.randomIntBetween(8, 14),
    }
  },
  originalData: { anzahl: 1000, radius: 1.5, t: 1, s: 9, aw: 10 },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          {data.anzahl} Wachskugeln werden eingeschmolzen. Sie haben jeweils
          einen Radius von {pp(data.radius)} cm. Mit diesem eingeschmolzenen
          Wachs werden quadratische Pyramiden gegossen. Dazu wird die
          abgebildete Gussform verwendet. Diese wird vollständig mit Wachs
          gefüllt.{' '}
        </p>
        <svg viewBox="0 0 328 250">
          <image
            href="/content/BW_Realschule/242_Körper.jpg"
            height="250"
            width="328"
          />
        </svg>
        <p>Es gilt:</p>
        <p>
          a<sub>w</sub> = {pp(data.aw)} cm (Grundkante Würfel)<br></br>s ={' '}
          {pp(data.s)} cm
          <br></br>t = {pp(data.t)} cm
        </p>
        <p>
          Wie viele solcher Pyramiden können mit dem eingeschmolzenen Wachs
          gegossen werden?
        </p>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
