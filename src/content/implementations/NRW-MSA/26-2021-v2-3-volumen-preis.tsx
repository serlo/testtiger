import { Exercise } from '@/data/types'

interface DATA {}

export const exercise26: Exercise<DATA> = {
  title: 'Volumen und Preis',
  source: '2021 Variante 2 / 3',
  useCalculator: false,
  duration: 5,
  generator(rng) {
    return {}
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return <></>
  },
  tasks: [
    {
      task({ data }) {
        return (
          <>
            <p> Herr Celik hat einen alten LKW gekauft.</p>

            <svg viewBox="0 0 537 520">
              <image
                href="/content/NRW_MSA_2021_v2_3.PNG"
                width="537"
                height="520"
              />
              <text
                x={70}
                y={300}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {2} cm
              </text>
              <text
                x={370}
                y={390}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {1} cm
              </text>
              <text
                x={520}
                y={450}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {0} cm
              </text>
            </svg>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      task({ data }) {
        return <></>
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
