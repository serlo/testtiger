import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  x_s: number
  y_s: number
  coin: boolean
  fake_a: number
  fake_x: number
  fake_y: number
}

export const exercise29: Exercise<DATA> = {
  title: '2021 Prüfungsteil 2 /2) Blobbing',
  useCalculator: true,
  duration: 10,
  generator(rng) {
    return {
      x_s: rng.randomIntBetween(4, 7),
      y_s: rng.randomIntBetween(5, 8),
      coin: rng.randomBoolean(),
      fake_a: rng.randomIntBetween(16, 25) / 100,
      fake_x: rng.randomIntBetween(3, 8),
      fake_y: rng.randomIntBetween(3, 8),
    }
  },
  constraint({ data }) {
    return (
      (((1 - data.y_s) / (data.x_s * data.x_s)) * 100) % 1 == 0 &&
      data.fake_x != data.x_s &&
      data.fake_y != data.y_s
    )
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
  subtasks: {
    intro: ({ data }) => {
      return (
        <>
          <p>Blobbing ist eine Wassersportart im Freien (Abbildung 1).</p>
          <svg viewBox="0 0 700 500">
            <image
              href="/content/NRW_MSA_Blobbing.jpg"
              height="500"
              width="700"
            />
          </svg>
          <p>
            Abbildung 1: Ablauf eines Blobbingsprunges als überlagerte Aufnahme
          </p>
          <p>
            Eine vereinfachte Darstellung des Ablaufs ist in Abbildung 2
            dargestellt. Beim Blobbing liegt ein mit Luft gefülltes Kissen im
            Wasser.
          </p>
          <p>(1) Der Jumper springt vom Turm auf das Luftkissen.</p>
          <p>
            (2) Auf der anderen Seite des Kissens ist der Blobber. Durch den
            Sprung befördert der Jumper den Blobber in die Luft.
          </p>
          <p>
            (3) Der Blobber wird in die Luft geschleudert und landet dann im
            Wasser.
          </p>
          <svg viewBox="0 0 700 200">
            <image
              href="/content/NRW_MSA_Blobbing_2.png"
              height="200"
              width="700"
            />
          </svg>
          <p>
            Abbildung 2: Vereinfachte Darstellung des Blobbing-Ablaufs (nicht
            maßstabsgetreu)
          </p>
          <p>
            Der Jumper kann zwischen verschiedenen Absprunghöhen wählen. Ein
            Sprung aus fünf Meter Höhe dauert ca. 1 Sekunde. Ein Sprung aus zehn
            Meter Höhe dauert ca. 1,42 Sekunden.
          </p>
          <svg viewBox="0 0 700 500">
            <image
              href="/content/NRW_MSA_Blobbing_3.PNG"
              height="500"
              width="700"
            />
          </svg>
          <p>Tabelle 1: Sprungdauer in Abhängigkeit von der Absprunghöhe</p>
          <svg viewBox="0 0 700 500">
            <image
              href="/content/NRW_MSA_Blobbing_4.jpg"
              height="500"
              width="700"
            />
          </svg>
        </>
      )
    },
    tasks: [
      ({ data }) => {
        return (
          <>
            <p>
              a) Skizziere zu den Werten aus Tabelle 1 den passenden Graphen in
              dem abgebildeten Koordinatensystem (Abbildung 3).
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              b) Überprüfe, ob es zwischen der Absprunghöhe und der Sprungdauer
              einen linearen Zusammenhang gibt. Notiere deinen Lösungsweg.
            </p>
          </>
        )
      },
      ({ data }) => {
        const a = (1 - data.y_s) / (data.x_s * data.x_s)
        function toX(n: number) {
          return 76 + n * (500 / 10.1)
        }
        function toY(n: number) {
          return 443 - n * (500 / 10.1)
        }
        function generateParabolaPoints(step: number): string {
          let points = ''
          for (let x = 0; x <= 7; x += step) {
            const y = a * (x - data.x_s) * (x - data.x_s) + data.y_s
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        function generateParabolaPoints2(step: number): string {
          let points = ''
          for (let x = 7; x <= 8; x += step) {
            const y = a * (x - data.x_s) * (x - data.x_s) + data.y_s
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints = generateParabolaPoints(0.1)
        const parabolaPoints2 = generateParabolaPoints2(0.1)
        return (
          <>
            <p>c) Abbildung 4 zeigt die Flugbahn eines Blobbers A.</p>
            <svg viewBox="0 0 700 500">
              <image
                href="/content/NRW_MSA_Blobbing_Plot.png"
                height="500"
                width="700"
              />
              <polyline
                points={parabolaPoints}
                stroke="blue"
                strokeWidth="3"
                fill="none"
              />
              <polyline
                points={parabolaPoints2}
                stroke="blue"
                strokeWidth="3"
                fill="none"
                stroke-dasharray="5,5"
              />
              <text
                x={toX(0) - 5}
                y={toY(1) + 5}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'×'}
              </text>
              <text
                x={toX(data.x_s) - 5}
                y={toY(data.y_s) + 5}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'×'}
              </text>
              <text
                x={toX(0) - 15}
                y={toY(1) - 15}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'P'}
              </text>
              <text
                x={toX(data.x_s) - 15}
                y={toY(data.y_s) - 15}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'S'}
              </text>
            </svg>
            <p>
              Begründe mithilfe der Abbildung 4, dass sich die Funktion f mit{' '}
            </p>
            <p>
              f(x) = a · (x − {data.x_s})² + {data.y_s}
            </p>
            <p>zur Modellierung der Flugbahn von Blobber A eignet.</p>
          </>
        )
      },
      ({ data }) => {
        const a = (1 - data.y_s) / (data.x_s * data.x_s)
        return (
          <>
            <p>
              d) Zeige durch eine Rechnung, dass der Streckfaktor a hier a ={' '}
              {pp(a)} beträgt.
            </p>
          </>
        )
      },
      ({ data }) => {
        const a = (1 - data.y_s) / (data.x_s * data.x_s)
        return (
          <>
            <p>
              e) Die Flugbahn von Blobber A kann somit durch die Funktion f mit{' '}
            </p>
            <p>
              f(x) = {pp(a)} · (x − {data.x_s})² + {data.y_s}
            </p>
            <p>
              beschrieben werden. Die Funktionsgleichung g mit g(x) = {pp(a)} x²{' '}
              {pp(2 * data.x_s * a)}x + 1
            </p>
            <p>
              Zeige durch Termumformungen, dass die Funktionsgleichungen von f
              und g dieselbe Parabel beschreiben.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>f) Berechne, wie weit Blobber A geflogen ist.</p>
          </>
        )
      },
      ({ data }) => {
        const a = (1 - data.y_s) / (data.x_s * data.x_s)
        return (
          <>
            <p>
              h) Die Flugbahn eines zweiten Blobbers B wird mit der Funktion h
              mit{' '}
            </p>
            <p>
              h(x) = {data.coin == true ? pp(a) : pp(data.fake_a)} · (x −{' '}
              {data.coin == true ? data.fake_x : data.x_s})² +{' '}
              {data.coin == true ? data.y_s : data.fake_y}
            </p>
            <p>
              Nenne eine Gemeinsamkeit und einen Unterschied der Flugbahn des
              zweiten Blobbers B im Vergleich zur Flugbahn von Blobber A.
            </p>
          </>
        )
      },
    ],
    solutions: [
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
