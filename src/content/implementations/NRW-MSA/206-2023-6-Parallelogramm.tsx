import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  länge: number
  breite: number
  alpha: number
}

export const exercise206: Exercise<DATA> = {
  title: '2023 /6) Parallelogramm',
  useCalculator: false,
  duration: -1,

  generator(rng) {
    return {
      länge: rng.randomIntBetween(2, 8),
      breite: rng.randomIntBetween(2, 8),
      alpha: rng.randomIntBetween(5, 8) * 10,
    }
  },
  constraint({ data }) {
    return data.breite > data.länge
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
  subtasks: {
    tasks: [
      ({ data }) => {
        return (
          <>
            <svg viewBox="0 0 720 480" className="h-[280px]">
              <image
                href="/content/NRW_MSA_Parallelogramm.PNG"
                height="500"
                width="700"
              />

              <text
                x={270}
                y={420}
                fontSize={40}
                textAnchor="right"
                stroke="black"
              >
                {data.breite} cm
              </text>
              <text
                x={630}
                y={230}
                fontSize={40}
                textAnchor="right"
                stroke="black"
              >
                {data.länge} cm
              </text>
              <text
                x={75}
                y={340}
                fontSize={50}
                textAnchor="right"
                stroke="black"
              >
                α
              </text>
            </svg>
            <p>
              a) Gegeben ist ein Parallelogramm mit den Seitenlängen{' '}
              {data.breite} cm und {data.länge} cm, sowie α = {data.alpha}°.
            </p>
            <p>Gib die Größe des Winkels β an.</p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              b) Max behauptet: „Das Parallelogramm hat einen Flächeninhalt von{' '}
              {data.breite * data.länge} cm².“
            </p>

            <p>Begründe, dass diese Aussage nicht stimmen kann.</p>
          </>
        )
      },
    ],
    solutions: [
      ({ data }) => {
        return (
          <>
            <p>In einem Parallelogramm gilt: α + β = 180°</p>

            <p>Setze den Wert für α ein und löse nach dem Wert von β:</p>
            <p>β = 180° - {data.alpha}° </p>
            <p>β = {180 - data.alpha}° </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              Der Flächeninhalt eines Parallelogramms wird berechnet mit der
              Formel:
            </p>
            <p>A = a · h</p>
            <p>
              Dabei steht h für die Höhe des Parallelogramms. Diese ist aber
              immer kleiner, als die Seite b.
            </p>
            <p>
              h {'<'} {data.länge} cm{' '}
            </p>
            <p>
              Damit ist auch die Fläche kleiner als das Produkt der beiden
              Seitenlängen:
            </p>
            <p>A = a · h </p>
            <p>A {'<'} a · b </p>
            <p>
              A {'<'} {data.breite * data.länge} cm²{' '}
            </p>
            <p> Max kann daher nicht recht haben.</p>
          </>
        )
      },
    ],
  },
}
