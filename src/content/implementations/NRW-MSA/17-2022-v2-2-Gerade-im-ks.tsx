import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  m: number
  b: number
}

export const exercise17: Exercise<DATA> = {
  title: 'Gerade im Koordinatensystem',
  source: '2022 Teil 1 Aufgabe 2 (Variante 2)',
  useCalculator: false,
  duration: 5,
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
  intro({ data }) {
    return <></>
  },
  tasks: [
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>Gegeben ist der Funktionsgraph einer linearen Funktion.</p>
            <svg viewBox="0 0 500 450">
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
            <p>a) Ergänze in der Wertetabelle die fehlenden Werte.</p>
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
      solution({ data }) {
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
    },
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>b) Bestimme die zugehörige Funktionsgleichung: y = ______ </p>
          </>
        )
      },
      solution({ data }) {
        const y_2 = pp(1 * data.m + data.b)
        let b_print = ''
        if (data.b !== 0) {
          b_print = pp(data.b, 'merge_op')
        }
        let m_print = pp(data.m)
        if (data.m == 1) {
          m_print = ''
        }
        if (data.m == -1) {
          m_print = '-'
        }
        return (
          <>
            <p>
              Der Funktionsterm hat allgemein die Form <br /> y = mx + b.{' '}
            </p>
            <p>
              Dabei steht m für die Steigung der Geraden und b für den
              y-Achsenabschnitt.
            </p>
            <p>
              <br></br>Aus der Wertetabelle kannst du den Wert des
              y-Achsenabschnitts bei x = 0 ablesen: b = {pp(data.b)}
            </p>
            <p>
              Aus den Punkten {'(0|' + pp(data.b) + ')'} und{' '}
              {'(1|' + pp(1 * data.m + data.b) + ')'} folgt, dass die Gerade
              eine Steigung von m = {pp(data.m)} haben muss. Das kannst du auch
              mit der Punkt-Steigungs-Formel berechnen:
            </p>
            <p>
              m = {buildInlineFrac(y_2 + ' − ' + pp(data.b), '1 − 0')} ={' '}
              {pp(data.m)}
            </p>
            <p>
              Die Funktionsgleichung ist also <br /> y=
              {m_print + 'x' + b_print}.
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
              c) Die Gerade soll an der y-Achse gespiegelt werden. Zeichne die
              gespiegelte Gerade in das Koordinatensystem ein.{' '}
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              <svg viewBox="0 0 329 250" className="h-[250px]">
                <image
                  href="/content/NRW_MSA_KS_Vorlage.png"
                  height="250"
                  width="329"
                />
                <line
                  x1={0}
                  y1={182 - (329 / 10) * (data.m * -5 + data.b)}
                  x2={328}
                  y2={182 - (329 / 10) * (data.m * 5 + data.b)}
                  stroke="blue"
                  strokeWidth={3}
                />
                <line
                  x2={326}
                  y2={184 - (329 / 10.1) * (data.m * -5 + data.b)}
                  x1={-2}
                  y1={184 - (329 / 10.1) * (data.m * 5 + data.b)}
                  stroke="orange"
                  strokeWidth={3}
                />
                <text
                  x={250}
                  y={(250 - (329 / 10.22) * (data.m * -5 + data.b)) / 2}
                  fontSize={10}
                  textAnchor="right"
                  stroke="orange"
                >
                  gespiegelt
                </text>
              </svg>
            </p>
          </>
        )
      },
    },
  ],
}
