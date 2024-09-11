import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  preis: number
  rabatt: number
}

export const exercise205: Exercise<DATA> = {
  title: '2023 /5) Rabattaktion',
  useCalculator: false,
  duration: -1,

  generator(rng) {
    return {
      preis: rng.randomIntBetween(60, 120),
      rabatt: rng.randomIntBetween(4, 12) * 5,
    }
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>Linda möchte sich ein Paar Sneaker kaufen.</p>

        <p> Der ursprüngliche Preis beträgt {data.preis} €.</p>

        <p>Die Sneaker werden mit {data.rabatt} % Rabatt verkauft.</p>

        <p>Berechne den neuen Verkaufspreis.</p>

        <svg viewBox="0 0 300 250" className="h-[300px]">
          <image href="/content/NRW_MSA_Sneaker.PNG" height="250" width="300" />

          <text x={30} y={160} fontSize={30} textAnchor="right" stroke="black">
            {data.rabatt} %
          </text>
        </svg>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>Wir berechnen den Verkaufspreis mit der Formel des Prozentwerts:</p>
        <p>W = G · p</p>

        <p>
          Setze die gegebenen Werte in die Formel ein. Wandle dazu den
          Prozentsatz in eine Dezimalzahl um: {data.rabatt} % ≙{' '}
          {pp(data.rabatt / 100)}
        </p>
        <p>
          W = {data.preis} · {pp(data.rabatt / 100)}
        </p>
        <p>W = {pp((data.preis * data.rabatt) / 100)}</p>
        <p>
          Der neue Verkaufspreis beträgt {pp((data.preis * data.rabatt) / 100)}{' '}
          €{' '}
        </p>
      </>
    )
  },
}
