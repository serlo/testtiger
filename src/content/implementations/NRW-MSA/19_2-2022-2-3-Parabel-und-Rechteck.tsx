import { Exercise } from '@/data/types'
import { buildInlineFrac, buildSqrt } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import Fraction from 'fraction.js'
import build from 'next/dist/build'

interface DATA {
  a: number
  x: number
  y: number
}

export const exercise192: Exercise<DATA> = {
  title: '2022 Prüfungsteil 2 /3) Parabel und Rechteck',
  useCalculator: true,
  duration: 10,
  generator(rng) {
    return {
      a: rng.randomIntBetween(-4, -1) / 2,
      x: rng.randomIntBetween(2, 5),
      y: rng.randomIntBetween(2, 5),
    }
  },
  constraint({ data }) {
    const b = data.y + data.x * data.x * Math.abs(data.a)
    return (b * 2) % 1 == 0 && b + data.a < 9
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
  subtasks: {
    intro: ({ data }) => {
      const b = data.y + data.x * data.x * Math.abs(data.a)
      function toX(n: number) {
        return 350 + n * (450 / 12)
      }
      function toY(n: number) {
        return 412 - n * (450 / 12)
      }
      function generateParabolaPoints(
        a: number,
        b: number,

        step: number,
      ): string {
        let points = ''
        for (let x = -8; x <= 8; x += step) {
          const y = a * x * x + b
          points += `${toX(x)},${toY(y)} `
        }
        return points.trim()
      }
      const parabolaPoints = generateParabolaPoints(
        data.a,

        b,
        0.1,
      )

      return (
        <>
          <p>
            Julia zeichnet mithilfe einer Geometriesoftware die Parabel f mit
            der Funktionsgleichung{' '}
          </p>
          <p>
            f(x) = {data.a == -1 ? '− ' : pp(data.a)}x<sup>2</sup> + {pp(b)}
          </p>
          <p>in ein Koordinatensystem (Abbildung 1).</p>
          <svg viewBox="0 0 700 450" className="max-w-[328px]">
            <image
              href="/content/NRW_MSA_KS_groß.png"
              width="700"
              height="450"
            />
            <polyline
              points={parabolaPoints}
              stroke="blue"
              strokeWidth="3"
              fill="none"
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
              a) Bestätige durch eine Rechnung, dass der Punkt A<sub>1</sub>(
              {data.x}|{data.y}) auf der Parabel f liegt.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              b) Begründe mit den Eigenschaften dieser Parabel, dass der Punkt B
              <sub>2</sub>({pp(-data.x)}|{data.y}) ebenfalls auf dem Graphen von
              f liegt.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              c) Die Punkte C<sub>1</sub> und D<sub>1</sub> liegen auf der
              x-Achse und bilden mit den Punkten A<sub>1</sub> und B<sub>1</sub>{' '}
              das Rechteck A<sub>1</sub>B<sub>1</sub>C<sub>1</sub>D<sub>1</sub>.
            </p>
            <p>Berechne den Umfang dieses Rechtecks.</p>
          </>
        )
      },
      ({ data }) => {
        const b = data.y + data.x * data.x * Math.abs(data.a)
        return (
          <>
            <p>
              d) Ausgehend von anderen Punkten auf der Parabel f kann man auf
              die gleiche Art weitere Rechtecke zeichnen.
            </p>
            <p>
              (1) Zeichne den Punkt A<sub>2</sub>(1|{pp(b + data.a)}) in
              Abbildung 1 ein.
            </p>
            <p>
              (2) Ergänze die drei weiteren Punkte B<sub>2</sub>,C<sub>2</sub>{' '}
              und D<sub>2</sub> und verbinde die vier Punkte zu dem Rechteck A
              <sub>2</sub>B<sub>2</sub>C<sub>2</sub>D<sub>2</sub>.
            </p>
          </>
        )
      },
      ({ data }) => {
        const b = data.y + data.x * data.x * Math.abs(data.a)
        return (
          <>
            <p>
              e) Mit dem Term (I) kann man den Umfang für jedes dieser Rechtecke
              berechnen:
            </p>
            <p>
              2 · 2x + 2 · ({data.a == -1 ? '− ' : pp(data.a)}x<sup>2</sup> +{' '}
              {pp(b)})
            </p>
            <p>
              Dabei ist x{' > '}0 und steht für die x-Koordinate des zum
              Rechteck gehörenden Punktes A<sub>1</sub>, A<sub>2</sub> usw.
            </p>
            <p>
              Berechne mit dem Term (I) den Umfang des Rechtecks, das durch den
              Punkt A<sub>2</sub>(1|{pp(b + data.a)}) festgelegt ist.
            </p>
          </>
        )
      },
      ({ data }) => {
        const b = data.y + data.x * data.x * Math.abs(data.a)
        return (
          <>
            <p>
              f) Julia vereinfacht den Term (I) zu (II){' '}
              {data.a * 2 == -1 ? '− ' : pp(data.a * 2)}x<sup>2</sup> + 4x +{' '}
              {pp(2 * b)}
            </p>
            <p>
              Zeige durch Termumformungen, dass die beiden Terme (I) und (II)
              gleichwertig sind.
            </p>
          </>
        )
      },
      ({ data }) => {
        const b = data.y + data.x * data.x * Math.abs(data.a)
        const c = 3.75
        const zahl = 2 * b + 2 * Math.abs(data.a) * c
        return (
          <>
            <p>g) Julia stellt die folgende Gleichung auf:</p>
            <p>
              {data.a * 2 == -1 ? '− ' : pp(data.a * 2)}x<sup>2</sup> + 4x +{' '}
              {pp(2 * b)} = {pp(zahl)}
            </p>
            <p>(1) Löse die Gleichung.</p>
            <p>
              (2) Erkläre das Ergebnis in Bezug auf die Rechtecke unter der
              Parabel f.
            </p>
          </>
        )
      },
    ],
    solutions: [
      ({ data }) => {
        const b = data.y + data.x * data.x * Math.abs(data.a)
        return (
          <>
            <p>Setze die Werte für x und y in die Funktionsgleichung ein:</p>
            <p>
              f(x) = {pp(data.a)} x² + {pp(b)}
            </p>
            <p>
              f({data.x}) = {pp(data.a)} · {data.x}² + {pp(b)}
            </p>
            <p>
              f({data.x}) = {pp(data.a * data.x * data.x)} + {pp(b)}
            </p>
            <p>
              f({data.x}) = {data.y}
            </p>
            Damit liegt der Punkt A<sub>1</sub> auf der Parabel.
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              Die Parabel ist achsensymmetrisch zur y-Achse. Spiegelt man den
              Punkt A<sub>1</sub>({data.x}|{data.y}) an der y-Achse, so erhält
              man den Punkt B<sub>1</sub>({pp(-data.x)}|{data.y}). Dieser liegt
              also ebenfalls auf dem Graphen von f.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              Bestimme die Seitenlängen des Rechtecks und berechne den Umfang.
            </p>
            <p>
              U<sub>Rechteck</sub> = 2 · a + 2 · b
            </p>
            <p>
              a = {data.x} + {data.x} = {data.x * 2}
            </p>
            <p>b = {data.y}</p>
            <p>
              Damit beträgt der Umfang <br></br>U<sub>Rechteck</sub> = 2 ·{' '}
              {data.x * 2} + 2 · {data.y} = {data.x * 2 * 2 + 2 * data.y} cm.
            </p>
          </>
        )
      },
      ({ data }) => {
        const b = data.y + data.x * data.x * Math.abs(data.a)
        function toX(n: number) {
          return 352 + n * (450 / 12)
        }
        function toY(n: number) {
          return 412 - n * (450 / 12)
        }
        function generateParabolaPoints(
          a: number,
          b: number,

          step: number,
        ): string {
          let points = ''
          for (let x = -8; x <= 8; x += step) {
            const y = a * x * x + b
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints = generateParabolaPoints(
          data.a,

          b,
          0.1,
        )
        return (
          <>
            <p>Deine Skizze sollte etwa so aussehen:</p>
            <svg viewBox="0 0 700 450" className="max-w-[328px]">
              <image
                href="/content/NRW_MSA_KS_groß.png"
                width="700"
                height="450"
              />
              <polyline
                points={parabolaPoints}
                stroke="blue"
                strokeWidth="3"
                fill="none"
              />

              <text
                x={toX(1) - 5}
                y={toY(b + data.a) + 7}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'×'}A2
              </text>
              <text
                x={toX(-1) - 30}
                y={toY(b + data.a) + 7}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                B2
                {'×'}
              </text>
              <text
                x={toX(1) - 5}
                y={toY(0) + 7}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'×'}D2
              </text>
              <text
                x={toX(-1) - 31}
                y={toY(0) + 7}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                C2{'×'}
              </text>
              <rect
                x={toX(-1)}
                y={toY(b + data.a)} // obere linke Ecke
                width={toX(1) - toX(-1)} // Breite des Rechtecks
                height={toY(0) - toY(b + data.a)} // Höhe des Rechtecks
                fill="none" // Farbe des Rechtecks
                stroke="black"
                strokeWidth={2}
              />
            </svg>
          </>
        )
      },
      ({ data }) => {
        const b = data.y + data.x * data.x * Math.abs(data.a)
        return (
          <>
            <p>Setze die x-Koordinate in den Term ein und fasse zusammen:</p>
            <p>
              U<sub>Rechteck </sub> = 2 · 2x + 2 · (
              {data.a == -1 ? '− ' : pp(data.a)}x<sup>2</sup> + {pp(b)}){' '}
            </p>
            <p>
              U<sub>Rechteck </sub> = 2 · 2 · {data.x} + 2 · (
              {data.a == -1 ? '− ' : pp(data.a) + ' ·'} {data.x}
              <sup>2</sup> + {pp(b)}){' '}
            </p>

            <p>
              U<sub>Rechteck </sub> = {4 * data.x} + 2 · (
              {data.a == -1 ? '− ' : pp(data.a) + ' ·'} {data.x * data.x} +{' '}
              {pp(b)}){' '}
            </p>
            <p>
              U<sub>Rechteck </sub> =
              {pp(4 * data.x + 2 * (data.a * data.x * data.x + b))}{' '}
            </p>
            <p>
              Der Umfang beträgt{' '}
              {pp(4 * data.x + 2 * (data.a * data.x * data.x + b))} cm.
            </p>
          </>
        )
      },
      ({ data }) => {
        const b = data.y + data.x * data.x * Math.abs(data.a)
        return (
          <>
            <p>
              2 · 2x + 2 · ({data.a == -1 ? '− ' : pp(data.a)}x<sup>2</sup> +{' '}
              {pp(b)}) = 4x + ({2 * data.a == -1 ? '− ' : pp(2 * data.a)}x
              <sup>2</sup>) + {pp(2 * b)}
              <br></br>{' '}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=
              {2 * data.a == -1 ? '− ' : pp(2 * data.a)}x<sup>2</sup> + 4x +{' '}
              {pp(2 * b)}
            </p>
          </>
        )
      },
      ({ data }) => {
        const b = data.y + data.x * data.x * Math.abs(data.a)
        const c = 3.75
        const zahl = 2 * b + 2 * Math.abs(data.a) * c
        function convertToFractionArray(value: number): [number, number] {
          if (value % 1 !== 0) {
            // Wenn der Wert eine Dezimalzahl ist
            const fraction = new Fraction(value)
            return [fraction.n, fraction.d] // Gibt den Zähler und Nenner als Array zurück
          }
          return [value, 1] // Falls keine Dezimalzahl, als Bruch x/1 darstellen
        }
        function convertToFractionString(value: number): JSX.Element | number {
          if (value % 1 !== 0) {
            const [zaehler, nenner] = convertToFractionArray(value)
            return buildInlineFrac(zaehler, nenner)
          }
          return value
        }

        return (
          <>
            <p>
              Forme die Gleichung zuerst um, damit du die pq-Formel anwenden
              kannst:
            </p>
            <p>
              {data.a * 2 == -1 ? '− ' : pp(data.a * 2)}x<sup>2</sup> + 4x +{' '}
              {pp(2 * b)} = {pp(zahl)}
            </p>
            <p>
              {data.a * 2 == -1 ? '− ' : pp(data.a * 2)}x<sup>2</sup> + 4x{' '}
              {pp(2 * b - zahl)} = 0
            </p>
            <p>
              x<sup>2</sup> -{' '}
              {convertToFractionString(4 / (2 * Math.abs(data.a)))}x +{' '}
              {pp((2 * b - zahl) / (2 * data.a))} = 0
            </p>
            <p>
              Die Mitternachts - Formel ergibt für die Gleichung{' '}
              {data.a * 2 == -1
                ? 'die Lösungen:'
                : 'keine Lösungen. Das bedeutet, dass es kein Rechteck mit dem Umfang ' +
                  pp(zahl) +
                  ' geben kann.'}
            </p>

            {data.a * 2 == -1 && (
              <>
                <p>
                  x<sub>1</sub> ={' '}
                  {convertToFractionString(
                    (4 / (2 * Math.abs(data.a)) + 1) / 2,
                  )}
                </p>
                <p>
                  x<sub>2</sub> ={' '}
                  {convertToFractionString(
                    (4 / (2 * Math.abs(data.a)) - 1) / 2,
                  )}
                </p>
                <p>
                  Das bedeutet, dass für die Werte x<sub>1</sub> ={' '}
                  {convertToFractionString(
                    (4 / (2 * Math.abs(data.a)) + 1) / 2,
                  )}{' '}
                  und x<sub>2</sub> ={' '}
                  {convertToFractionString(
                    (4 / (2 * Math.abs(data.a)) - 1) / 2,
                  )}{' '}
                  ein Rechteck mit dem Umfang {pp(zahl)} existiert.
                </p>
              </>
            )}
          </>
        )
      },
    ],
  },
}