import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { buildEquation } from '@/helper/math-builder'

interface DATA {
  a: number
  b: number
  c: number
}

export const exercise2: Exercise<DATA> = {
  title: 'Volumen berechnen',
  source: '2023 Teil 1 Aufgabe 2',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 9) * 10,
      b: rng.randomIntBetween(1, 9) * 10,
      c: rng.randomIntBetween(1, 9) * 10,
    }
  },
  constraint({ data }) {
    return data.a * data.b * data.c < 200000
  },
  points: 3,
  task({ data }) {
    const array = [data.a, data.b, data.c].sort((a, b) => a - b)
    return (
      <>
        <p>Berechne das Volumen des abgebildeten Kartons.</p>

        <p>Gib dein Ergebnis in Litern ( ℓ ) an. </p>

        <svg viewBox="0 0 700 500">
          <image
            href="/content/NRW_MSA_2023_Teil1_A2.PNG"
            height="500"
            width="700"
          />
          <text x={250} y={500} fontSize={30} textAnchor="right" stroke="black">
            {array[2]} cm
          </text>
          <text x={370} y={390} fontSize={30} textAnchor="right" stroke="black">
            {array[1]} cm
          </text>
          <text x={520} y={450} fontSize={30} textAnchor="right" stroke="black">
            {array[0]} cm
          </text>
        </svg>
      </>
    )
  },
  solution({ data }) {
    const array = [data.a, data.b, data.c].sort((a, b) => a - b)
    return (
      <>
        <p>
          <strong>Volumen berechnen</strong>
        </p>
        <p>
          Der Karton hat die Form eines Quaders. Das Volumen berechnest du mit
          der Formel:
        </p>
        {buildEquation([
          ['V', '=', 'l · b · h'],
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
                <span style={{ fontSize: 'small' }}>Einsetzen der Werte</span>
              </Color4>
            </>,
          ],
          [
            '',
            '=',
            <>
              {array[2]} · {array[1]} · {array[0]}
            </>,
          ],
          ['', '=', <>{array[2] * array[1] * array[0]} [cm³]</>],
        ])}
        <p>
          <strong>In Liter umrechnen</strong>
        </p>
        <p>
          Rechne das Volumen des Kartons in Liter um. 1000 cm³ entsprechen 1ℓ.{' '}
        </p>
        <p>
          {array[2] * array[1] * array[0]} cm³ : 1000 ={' '}
          {(array[2] * array[1] * array[0]) / 1000} ℓ
        </p>
        <p>
          Das Volumen des Kartons beträgt{' '}
          <strong>{(array[2] * array[1] * array[0]) / 1000} ℓ</strong>.
        </p>
      </>
    )
  },
}
