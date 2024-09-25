import { Exercise } from '@/data/types'
import { buildInlineFrac, buildSqrt } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  x_s: number
  y_s: number
  coin: boolean
  fake_a: number
  fake_x: number
  fake_y: number
  g: number
}

export const exercise29: Exercise<DATA> = {
  title: 'Blobbing',
  source: '2021 Prüfungsteil 2 / 2',
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
      g: rng.randomIntBetween(900, 1100) / 100,
    }
  },
  constraint({ data }) {
    return (
      (((1 - data.y_s) / (data.x_s * data.x_s)) * 100) % 1 == 0 &&
      data.fake_x != data.x_s &&
      data.fake_y != data.y_s
    )
  },
  intro({ data }) {
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
          Sprung aus fünf Meter Höhe dauert ca.{' '}
          {pp(Math.round(Math.pow((2 * 5) / data.g, 0.5) * 100) / 100)}{' '}
          {Math.round(Math.pow((2 * 5) / data.g, 0.5) * 100) / 100 == 1
            ? 'Sekunde'
            : 'Sekunden'}
          . Ein Sprung aus zehn Meter Höhe dauert ca.{' '}
          {pp(Math.round(Math.pow((2 * 10) / data.g, 0.5) * 100) / 100)}{' '}
          Sekunden.
        </p>
        <svg viewBox="0 0 700 500">
          <image
            href="/content/NRW_MSA_Blobbing_3.PNG"
            height="500"
            width="700"
          />
          <text x={420} y={250} fontSize={30} textAnchor="right" stroke="black">
            {pp(Math.round(Math.pow((2 * 3) / data.g, 0.5) * 100) / 100)} s
          </text>
          <text x={410} y={320} fontSize={30} textAnchor="right" stroke="black">
            {pp(Math.round(Math.pow((2 * 5) / data.g, 0.5) * 100) / 100)} s
          </text>
          <text x={410} y={395} fontSize={30} textAnchor="right" stroke="black">
            {pp(Math.round(Math.pow((2 * 10) / data.g, 0.5) * 100) / 100)} s
          </text>
          <text x={410} y={465} fontSize={30} textAnchor="right" stroke="black">
            {pp(Math.round(Math.pow((2 * 15) / data.g, 0.5) * 100) / 100)} s
          </text>
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
    {
      task({ data }) {
        return (
          <>
            <p>
              a) Skizziere zu den Werten aus Tabelle 1 den passenden Graphen in
              dem abgebildeten Koordinatensystem (Abbildung 3).
            </p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 40 + n * (450 / 11.18)
        }
        function toY(n: number) {
          return 405 - n * ((4 * 450) / 11.18)
        }
        function generateParabolaPoints(step: number): string {
          let points = ''
          for (let x = 0; x <= 15; x += step) {
            const y = Math.pow((2 * x) / data.g, 0.5)
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints = generateParabolaPoints(0.1)
        return (
          <>
            <svg viewBox="0 0 700 500">
              <image
                href="/content/NRW_MSA_Blobbing_4.jpg"
                height="500"
                width="700"
              />
              <text
                x={toX(0) - 5}
                y={toY(0) + 5}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'×'}
              </text>
              <text
                x={toX(3) - 5}
                y={toY(Math.pow((2 * 3) / data.g, 0.5)) + 5}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'×'}
              </text>
              <text
                x={toX(5) - 5}
                y={toY(Math.pow((2 * 5) / data.g, 0.5)) + 5}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'×'}
              </text>
              <text
                x={toX(10) - 5}
                y={toY(Math.pow((2 * 10) / data.g, 0.5)) + 5}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'×'}
              </text>
              <text
                x={toX(15) - 5}
                y={toY(Math.pow((2 * 15) / data.g, 0.5)) + 5}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'×'}
              </text>
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
    },
    {
      task({ data }) {
        return (
          <>
            <p>
              b) Überprüfe, ob es zwischen der Absprunghöhe und der Sprungdauer
              einen linearen Zusammenhang gibt. Notiere deinen Lösungsweg.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Wähle zwei Punkte und überprüfe ob die Zunahme der Sprungdauer
              linear ist:
            </p>
            <ul>
              <li>
                Punkt 1: (5|
                {pp(Math.round(Math.pow((2 * 5) / data.g, 0.5) * 100) / 100)})
              </li>
              <li>
                Punkt 1: (10|
                {pp(Math.round(Math.pow((2 * 10) / data.g, 0.5) * 100) / 100)})
              </li>
            </ul>
            <p>
              Zwischen 0 und 5 Metern nimmt die Sprungdauer um{' '}
              {pp(Math.round(Math.pow((2 * 5) / data.g, 0.5) * 100) / 100)}{' '}
              Sekunden zu.
            </p>
            <p>
              Zwischen 5 und 10 Metern nimmt die Sprungdauer um{' '}
              {pp(Math.round(Math.pow((2 * 10) / data.g, 0.5) * 100) / 100)} −{' '}
              {pp(Math.round(Math.pow((2 * 5) / data.g, 0.5) * 100) / 100)} ={' '}
              {pp(
                Math.round(
                  (Math.pow((2 * 10) / data.g, 0.5) -
                    Math.pow((2 * 5) / data.g, 0.5)) *
                    100,
                ) / 100,
              )}{' '}
              Sekunden zu.
            </p>
            <p>Damit ist der Zusammenhang nicht linear.</p>
          </>
        )
      },
    },
    {
      task({ data }) {
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
              f(x) = a · (x − {data.x_s})² + {data.y_s} und a{' < '}0
            </p>
            <p>zur Modellierung der Flugbahn von Blobber A eignet.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Aus der Skizze kannst du den Scheitel der Parabel ablesen: S(
              {data.x_s}|{data.y_s})
            </p>
            <p>Die Funktion hat dann allgemein den Funktionsterm:</p>
            <p>
              f(x) = a · (x − {data.x_s})² + {data.y_s}
            </p>
            <p>Da die Parabel nach unten geöffnet ist muss a{' < '}0 sein.</p>
          </>
        )
      },
    },
    {
      task({ data }) {
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
      solution({ data }) {
        return (
          <>
            <p>
              Um a zu berechnen, setze den Punkt (0|1) in f(x) ein und löse die
              Gleichung:
            </p>
            <p>
              1 = a · (0 − {data.x_s})² + {data.y_s}
            </p>
            <p>
              1 = a · {data.x_s * data.x_s} + {data.y_s}
            </p>
            <p>
              {1 - data.y_s} = a · {data.x_s * data.x_s}
            </p>
            <p>a = {pp((1 - data.y_s) / Math.pow(data.x_s, 2))}</p>
          </>
        )
      },
    },
    {
      task({ data }) {
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
              {pp(-a * 2 * data.x_s, 'merge_op')}x + 1
            </p>
            <p>
              Zeige durch Termumformungen, dass die Funktionsgleichungen von f
              und g dieselbe Parabel beschreiben.
            </p>
          </>
        )
      },
      solution({ data }) {
        const a = (1 - data.y_s) / (data.x_s * data.x_s)
        return (
          <>
            <p>Löse die Klammer auf und vereinfache den Term:</p>
            <p>
              f(x) = {pp(a)} · (x − {data.x_s})² + {data.y_s}
            </p>
            <p>
              f(x) = {pp(a)} · (x² − 2 · x · {data.x_s} + {data.x_s}²) +{' '}
              {data.y_s}
            </p>
            <p>
              f(x) = {pp(a)} · (x² − {2 * data.x_s}x + {data.x_s * data.x_s}) +{' '}
              {data.y_s}
            </p>
            <p>
              f(x) = {pp(a)}x² {pp(-a * 2 * data.x_s, 'merge_op')}x{' '}
              {pp(a * data.x_s * data.x_s)} + {data.y_s}
            </p>
            <p>
              f(x) = {pp(a)}x² {pp(-a * 2 * data.x_s, 'merge_op')}x{' '}
              {pp(a * data.x_s * data.x_s + data.y_s, 'merge_op')} = g(x)
            </p>
          </>
        )
      },
    },
    {
      task({ data }) {
        return (
          <>
            <p>f) Berechne, wie weit Blobber A geflogen ist.</p>
          </>
        )
      },
      solution({ data }) {
        const a = (1 - data.y_s) / (data.x_s * data.x_s)
        const string = (pp(a * 2 * data.x_s) + '±') as unknown as JSX.Element
        return (
          <>
            <p>Setze die Funktionsgleichung 0:</p>
            <p>
              0 = {pp(a)}x² {pp(-a * 2 * data.x_s, 'merge_op')}x{' '}
              {pp(a * data.x_s * data.x_s + data.y_s, 'merge_op')}
            </p>
            <p>Setze die Werte für a, b und c in die Mitternachtsformel ein:</p>
            <p>
              x<sub>1/2</sub> ={' '}
              {buildInlineFrac(
                <>
                  {'-b'} {' ± '}
                  {buildSqrt('b² - 4ac')}
                </>,
                '2 · a',
              )}
            </p>
            <p>
              x<sub>1/2</sub> ={' '}
              {buildInlineFrac(
                <>
                  {pp(a * 2 * data.x_s)} {' ± '}
                  {buildSqrt(
                    pp(a * 2 * data.x_s * a * 2 * data.x_s) +
                      ' ' +
                      pp(
                        4 * a * a * data.x_s * data.x_s + data.y_s,
                        'merge_op',
                      ),
                  )}
                </>,
                pp(2 * a),
              )}
            </p>
            <p>
              x<sub>1/2</sub> ≈{' '}
              {buildInlineFrac(
                <>
                  {pp(a * 2 * data.x_s)} {' ± '}
                  {pp(
                    Math.round(
                      100 *
                        Math.pow(
                          a * 2 * data.x_s * a * 2 * data.x_s +
                            4 * a * a * data.x_s * data.x_s +
                            data.y_s,
                          0.5,
                        ),
                    ) / 100,
                  )}
                </>,
                pp(2 * a),
              )}
            </p>
            <p>
              x<sub>1</sub> ≈{' '}
              {pp(
                Math.round(
                  ((a * 2 * data.x_s +
                    Math.pow(
                      a * 2 * data.x_s * a * 2 * data.x_s -
                        4 * a * (a * data.x_s * data.x_s + data.y_s),
                      0.5,
                    )) /
                    (2 * a)) *
                    100,
                ) / 100,
              )}
            </p>
            <p>
              {' '}
              x<sub>2</sub> ≈{' '}
              {pp(
                Math.round(
                  ((a * 2 * data.x_s -
                    Math.pow(
                      a * 2 * data.x_s * a * 2 * data.x_s -
                        4 * a * (a * data.x_s * data.x_s + data.y_s),
                      0.5,
                    )) /
                    (2 * a)) *
                    100,
                ) / 100,
              )}
            </p>
          </>
        )
      },
    },
    {
      task({ data }) {
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
      solution({ data }) {
        return (
          <>
            {data.coin == true ? (
              <p>
                Mögliche Gemeinsamkeit: Die Funktionen besitzen den gleichen
                Öffnungsfaktor a. Die Flugbahnen haben damit ein ähnliches
                Profil. <br></br>
                <br></br> Mögliche Unterschied: Die Funktionen haben
                unterschiedliche Scheitelpunktkoordinaten. Der höchste Punkt der
                Flugbahn ist daher unterschiedlich.
              </p>
            ) : (
              <p>
                Mögliche Gemeinsamkeit: Die Funktionen besitzen die gleiche
                Scheitelpunktkoordinate x<sub>s</sub>. Damit erreichen die
                Flugbahnen beide ihren Höhepunkt nach x<sub>s</sub> = {data.x_s}{' '}
                Metern. <br></br>
                <br></br> Mögliche Unterschied: Die Funktionen haben
                unterschiedliche Öffnungsfaktoren. Sie besitzen eine
                unterschiedliche Form.
              </p>
            )}
          </>
        )
      },
    },
  ],
}
