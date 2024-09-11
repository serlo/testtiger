import { Exercise } from '@/data/types'

interface DATA {
  a: number
  b: number
  c: number
}

export const exercise202: Exercise<DATA> = {
  title: '2023 /2) Volumen berechnen',
  useCalculator: false,
  duration: -2,
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
  task({ data }) {
    const array = [data.a, data.b, data.c].sort((a, b) => a - b)
    return (
      <>
        <p>Berechne das Volumen des abgebildeten Kartons.</p>

        <p>Gib dein Ergebnis in Litern ( ℓ ) an. </p>

        <svg viewBox="0 0 700 500" className="h-[250px]">
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
          Der Karton hat die Form eines Quaders. Das Volumen berechnest du mit
          der Formel:
        </p>
        <p>V = l · b · h</p>
        <p>Setze die Seitenlängen ein und berechne das Volumen.</p>
        <p>
          V = {array[2]} · {array[1]} · {array[0]} ={' '}
          {array[2] * array[1] * array[0]} cm³
        </p>
        <p>
          <br></br>Rechne das Volumen in Liter um. 1ℓ entspricht 1000 cm³.{' '}
        </p>
        <p>
          {array[2] * array[1] * array[0]} cm³ ={' '}
          {(array[2] * array[1] * array[0]) / 1000} ℓ
        </p>
        <p>
          <br></br>Das Volumen des Kartons beträgt{' '}
          {(array[2] * array[1] * array[0]) / 1000} ℓ.
        </p>
      </>
    )
  },
}
