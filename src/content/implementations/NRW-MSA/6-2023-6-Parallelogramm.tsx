import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  länge: number
  breite: number
  alpha: number
}

export const exercise6: Exercise<DATA> = {
  title: 'Parallelogramm',
  source: '2023 Teil 1 Aufgabe 6',
  useCalculator: false,
  duration: 3,

  generator(rng) {
    return {
      länge: rng.randomIntBetween(2, 8),
      breite: rng.randomIntBetween(2, 8),
      alpha: rng.randomIntBetween(5, 8) * 10,
    }
  },
  originalData: {
    länge: 5,
    breite: 4,
    alpha: 70,
  },
  constraint({ data }) {
    return data.breite > data.länge
  },
  intro({ data }) {
    return (
      <>
        <svg viewBox="0 0 790 480">
          <image
            href="/content/NRW_MSA_Parallelogramm.PNG"
            height="500"
            width="700"
          />

          <text x={260} y={420} fontSize={40} textAnchor="right" stroke="black">
            a = {data.breite} cm
          </text>
          <text x={630} y={230} fontSize={40} textAnchor="right" stroke="black">
            b = {data.länge} cm
          </text>
          <text x={75} y={340} fontSize={50} textAnchor="right" stroke="black">
            α
          </text>
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 1,
      task({ data }) {
        return (
          <>
            <p>
              a) Gegeben ist ein Parallelogramm mit den Seitenlängen{' '}
              {data.breite} cm und {data.länge} cm, sowie <br></br>α ={' '}
              {data.alpha}°.
            </p>
            <p>Gib die Größe des Winkels β an.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>In einem Parallelogramm gilt: α + β = 180°</p>

            <p>Setze den Wert für α ein und löse nach dem Wert von β:</p>
            <p>β = 180° - {data.alpha}° </p>
            <p>
              <strong>β = {180 - data.alpha}°</strong>
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task({ data }) {
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
      solution({ data }) {
        return (
          <>
            <p>
              Der Flächeninhalt eines Parallelogramms wird berechnet mit der
              Formel:
            </p>
            <p>A = a · h</p>
            <p>
              Dabei steht h für die Höhe des Parallelogramms, die senkrecht auf
              a steht. Die Höhe ist aber immer kleiner als die Seite b.
            </p>

            <p>
              Max hat für den Flächeninhalt A = a · b gerechnet. Wenn aber h
              kleiner als b ist, muss der Flächeninhalt auch kleiner sein als{' '}
              {data.breite * data.länge} cm².
            </p>
            <p>
              {' '}
              Max kann daher <strong>nicht recht</strong> haben.
            </p>
          </>
        )
      },
    },
  ],
}
