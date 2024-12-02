import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  s: number
  alpha: number
  höhe: number
}

export const exercise225: Exercise<DATA> = {
  title: 'Zusammengesetzter Körper',
  source: '2023 Pflichtteil A2 - Aufgabe 2',
  useCalculator: true,
  duration: 42,
  points: 4,
  generator(rng) {
    return {
      s: rng.randomIntBetween(130, 180) / 10,
      alpha: rng.randomIntBetween(600, 699) / 10,
      höhe: rng.randomIntBetween(200, 250) / 10,
    }
  },
  originalData: { s: 16.3, alpha: 68.9, höhe: 20.6 },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Ein zusammengesetzter Körper besteht aus einem quadratischen Prisma
          mit aufgesetzter quadratischer Pyramide. Dieser zusammengesetzte
          Körper wurde durch einen Parallelschnitt halbiert. Die Schnittfäche A
          <sub>s</sub> ist grau eingefärbt.{' '}
          <svg viewBox="0 0 328 220">
            <image
              href="/content/BW_Realschule/225_Körper.jpg"
              height="220"
              width="328"
            />
          </svg>
        </p>
        <p>Es gilt: </p>
        <p>
          s = {pp(data.s)} cm<br></br>α = {pp(data.alpha)}°<br></br>h
          <sub>ges</sub> = {pp(data.höhe)} cm{' '}
        </p>
        <p>
          Berechne den Flächeninhalt der Schnittfläche A<sub>s</sub>.
        </p>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
