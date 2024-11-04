import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  length: number
  width: number
  height: number
}

export const exercise122: Exercise<DATA> = {
  title: 'Volumen berechnen',
  source: '2023 Teil 1 Aufgabe 3',
  useCalculator: false,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      length: rng.randomIntBetween(25, 35),
      width: rng.randomIntBetween(15, 25),
      height: rng.randomIntBetween(5, 15),
    }
  },
  originalData: {
    length: 30,
    width: 20,
    height: 6,
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>Berechne das Volumen des abgebildeten Kartons.</p>
        <svg viewBox="0 0 667 341">
          <image
            href="/content/NRW_EESA/122_Volumen.jpg"
            height="341"
            width="667"
          />
          <text x={150} y={250} fontSize={30} textAnchor="right" stroke="black">
            {pp(data.length)} cm
          </text>
          <text x={460} y={250} fontSize={30} textAnchor="right" stroke="black">
            {pp(data.width)} cm
          </text>
          <text x={570} y={125} fontSize={30} textAnchor="right" stroke="black">
            {pp(data.height)} cm
          </text>
        </svg>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>Berechne das Volumen des quaderförmigen Kartons mit der Formel:</p>
        <p>
          <b>
            V<sub>Quader</sub> = l · b · h{' '}
          </b>
          = {pp(data.length)} · {pp(data.width)} · {pp(data.height)} ={' '}
          {data.length * data.width * data.height} cm<sup>3</sup>
        </p>
        <p>
          <b>
            Das Volumen des Kartons beträgt<br></br>
            {data.length * data.width * data.height} cm<sup>3</sup>.
          </b>
        </p>
      </>
    )
  },
}
