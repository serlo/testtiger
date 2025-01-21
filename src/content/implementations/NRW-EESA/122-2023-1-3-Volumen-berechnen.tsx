import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { buildEquation } from '@/helper/math-builder'
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
  duration: 3,
  points: 3,
  generator(rng) {
    return {
      length: rng.randomItemFromArray([20, 30, 40]),
      width: rng.randomItemFromArray([10, 20, 30]),
      height: rng.randomIntBetween(5, 10),
    }
  },
  originalData: {
    length: 30,
    width: 20,
    height: 6,
  },
  learningPathData: {
    length: 40,
    width: 30,
    height: 8,
  },
  constraint({ data }) {
    return data.length > data.width
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
        {buildEquation([
          [
            <>
              V<sub>Quader</sub>
            </>,
            <>=</>,
            <>l · b · h</>,
          ],
          [
            '',
            <>
              {' '}
              <Color4>
                <span className="inline-block  scale-y-[1.5]">↓</span>
              </Color4>
            </>,
            <>
              <Color4>
                <span style={{ fontSize: 'small' }}>Werte einsetzen</span>
              </Color4>
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              {pp(data.length)} · {pp(data.width)} · {pp(data.height)}
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              <strong>
                {data.length * data.width * data.height} [cm<sup>3</sup>]
              </strong>
            </>,
          ],
        ])}

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
