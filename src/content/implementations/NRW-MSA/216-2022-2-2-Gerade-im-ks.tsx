import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  m: number
  b: number
}

export const exercise216: Exercise<DATA> = {
  title: '2022 Variante 2 /2) Gerade im Korrdinatensystem',
  useCalculator: false,
  duration: -1,
  generator(rng) {
    return {
      m: rng.randomIntBetween(-5, 5) / 2,
      b: rng.randomIntBetween(-2, 8) / 2,
    }
  },
  constraint({ data }) {
    return (
      data.m != 0 &&
      5.5 > data.m * 2 + data.b &&
      data.m * 2 + data.b > -2 &&
      data.m * -2 + data.b < 5.5 &&
      -2 < data.m * -2 + data.b
    )
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
            <p>Gegeben ist der Funktionsgraph einer linearen Funktion.</p>
            <svg viewBox="0 0 1000 450" className="h-[450px]">
              <image
                href="/content/NRW_MSA_KS_Vorlage.png"
                height="500"
                width="500"
              />
              <line
                x1={0}
                y1={338 - (380 / 7.6) * (data.m * -5 + data.b)}
                x2={500}
                y2={338 - (380 / 7.6) * (data.m * 5 + data.b)}
                stroke="blue"
                strokeWidth={4}
              />
            </svg>
            <p>
              a) Ergänze in der Wertetabelle die fehlenden Werte. {data.m};{' '}
              {data.b}
            </p>
            <svg viewBox="0 0 700 500" className="h-[170px]">
              <image
                href="/content/NRW_MSA_Wertetabelle.PNG"
                height="500"
                width="700"
              />
            </svg>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>b) Bestimme die zugehörige Funktionsgleichung: y = ______ </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              c) Die Gerade soll an der y-Achse gespiegelt werden. Zeichne die
              gespiegelte Gerade in das Koordinatensystem ein.{' '}
            </p>
          </>
        )
      },
    ],
    solutions: [
      ({ data }) => {
        return (
          <>
            <p>Lies die Werte aus dem Koordinatensystem ab.</p>
            <svg viewBox="0 0 700 500" className="h-[170px]">
              <image
                href="/content/NRW_MSA_Wertetabelle.PNG"
                height="500"
                width="700"
              />
              <text
                x={160}
                y={320}
                fontSize={40}
                textAnchor="right"
                stroke="black"
              >
                {pp(-2 * data.m + data.b)}
              </text>
              <text
                x={300}
                y={320}
                fontSize={40}
                textAnchor="right"
                stroke="black"
              >
                {pp(0 * data.m + data.b)}
              </text>
              <text
                x={440}
                y={320}
                fontSize={40}
                textAnchor="right"
                stroke="black"
              >
                {pp(1 * data.m + data.b)}
              </text>
              <text
                x={580}
                y={320}
                fontSize={40}
                textAnchor="right"
                stroke="black"
              >
                {pp(2 * data.m + data.b)}
              </text>
            </svg>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p></p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p></p>
          </>
        )
      },
    ],
  },
}
