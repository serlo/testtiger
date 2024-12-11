import { Exercise } from '@/data/types'

interface DATA {}

export const exercise259: Exercise<DATA> = {
  title: 'Körper',
  source: '2021 Pflichtteil A2 - Aufgabe 2',
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
          Ein Kunstwerk setzt sich aus einer Halbkugel und einem Kegel zusammen.
        </p>
        <svg viewBox="0 0 328 190">
          <image
            href="/content/BW_Realschule/259_Körper.jpg"
            height="190"
            width="328"
          />
        </svg>
        <p>
          Es gilt: <br></br>s = 3,7 m<br></br>h<sub>ges</sub> = 5,1 m<br></br>α
          = 72,0°
        </p>
        <ul>
          <li>Berechne den Oberflächeninhalt des zusammengesetzten Körpers.</li>
        </ul>
        <p>
          Dieses Kunstwerk soll mit Farbe angestrichen werden. Eine
          1-Liter-Farbdose reicht für 10 m²
        </p>
        <ul>
          <li>Wie viele Dosen müssen gekauft werden?</li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
