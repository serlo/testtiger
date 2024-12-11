import { Exercise } from '@/data/types'
import { Color1 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildOverline,
  buildSqrt,
} from '@/helper/math-builder'
import { pp, ppPolynom } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'
import { infiniteOutline } from 'ionicons/icons'

interface DATA {
  n1: number
  n2: number
  xs: number
  ys: number
  ab: number
}

export const exercise250: Exercise<DATA> = {
  title: 'Parabeln + Sechseck',
  source: '2022 Wahlteil B - Aufgabe 4',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      n1: rng.randomIntBetween(1, 5),
      n2: rng.randomIntBetween(6, 10),
      xs: rng.randomIntBetween(1, 4),
      ys: rng.randomIntBetween(-10, -4),
      ab: rng.randomIntBetween(100, 140) / 10,
    }
  },
  originalData: { n1: 2, n2: 6, xs: 1, ys: -7, ab: 12.4 },
  constraint({ data }) {
    const x =
      (data.xs * data.xs + data.ys - data.n1 * data.n2) /
      (-data.n1 - data.n2 + 2 * data.xs)
    const y = x * x + (-data.n1 - data.n2) * x + data.n1 * data.n2
    return x % 1 == 0 && x > 0 && x != data.n1 && x != data.n2
  },
  intro({ data }) {
    return null
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Die Parabel p<sub>1</sub> hat die Funktionsgleichung <br></br>y =
              x² {pp(-data.n1 - data.n2, 'merge_op')}x + {pp(data.n1 * data.n2)}
              .
            </p>
            <p>
              Die verschobene nach oben geöffnete Normalparabel p<sub>2</sub>{' '}
              hat den Scheitelpunkt <br></br>S<sub>2</sub>({pp(data.xs)}|
              {pp(data.ys)}).
            </p>
            <ul>
              <li>
                Berechne die Koordinaten des Schnittpunkts Q<sub>1</sub> der
                beiden Parabeln p<sub>1</sub> und p<sub>2</sub>.
              </li>
            </ul>
            <p>
              Die Parabel p<sub>1</sub> schneidet die x-Achse in den Punkten N
              <sub>1</sub> und N<sub>2</sub>.
            </p>
            <ul>
              <li>
                Berechne die Koordinaten von N<sub>1</sub> und N<sub>2</sub>.
              </li>
            </ul>
            <p>
              Die Punkte N<sub>1</sub>, N<sub>2</sub> und Q<sub>1</sub> bilden
              ein Dreieck.
            </p>
            <ul>
              <li>
                Berechne den Flächeninhalt des Dreiecks N<sub>1</sub>Q
                <sub>1</sub>N<sub>2</sub>.
              </li>
            </ul>
            <p>
              Der Punkt Q<sub>1</sub> bewegt sich auf der Parabel p<sub>2</sub>{' '}
              unterhalb der x-Achse. Dadurch entsteht der Punkt Q<sub>2</sub>{' '}
              und somit das Dreieck N<sub>1</sub>Q<sub>2</sub>N<sub>2</sub>.
            </p>
            <ul>
              <li>
                Für welche Lage von Q<sub>2</sub> wird der Flächeninhalt des
                Dreiecks am größten?
              </li>
              <li>Berechne diesen maximalen Flächeninhalt.</li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const x =
          (data.xs * data.xs + data.ys - data.n1 * data.n2) /
          (-data.n1 - data.n2 + 2 * data.xs)
        const y = x * x + (-data.n1 - data.n2) * x + data.n1 * data.n2
        const p = -data.n1 - data.n2
        const q = data.n1 * data.n2
        function toX(n: number) {
          return 98 + (n * 313) / 20
        }
        function toY(n: number) {
          return 136 - (n * 313) / 20
        }
        function generateParabolaPoints(): string {
          let points = ''
          for (let x = -6; x <= 14; x += 0.1) {
            const y = (x - data.n1) * (x - data.n2)
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        function generateParabolaPoints2(): string {
          let points = ''
          for (let x = -6; x <= 14; x += 0.1) {
            const y = (x - data.xs) * (x - data.xs) + data.ys
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints = generateParabolaPoints()
        const parabolaPoints2 = generateParabolaPoints2()
        const p2 = -2 * data.xs
        const q2 = data.xs * data.xs + data.ys - 7
        const x2 = -p2 / 2 + Math.sqrt((p2 / 2) * (p2 / 2) - q2)

        const p3 = -data.n1 - data.n2
        const q3 = data.n1 * data.n2 - 7
        const x3 = -p3 / 2 + Math.sqrt((p3 / 2) * (p3 / 2) - q3)
        const xs = (data.n1 + data.n2) / 2
        const ys = xs * xs + xs * (-data.n1 - data.n2) + data.n1 * data.n2
        return (
          <>
            <p>
              Die Parabel p<sub>2</sub> hat die Scheitelform:
            </p>
            <p>
              y = (x − {pp(data.xs)})² {pp(data.ys, 'merge_op')}
            </p>
            <p>
              Verwende die binomische Formel und bestimme die Funktionsgleichung
              von p<sub>2</sub>:
            </p>
            <p>
              y = (x² − {pp(2 * data.xs)}x + {pp(data.xs * data.xs)}){' '}
              {pp(data.ys, 'merge_op')}
            </p>
            <p>
              y = x²{' '}
              {ppPolynom([
                [-2 * data.xs, 'x', 1],
                [data.xs * data.xs + data.ys, 'x', 0],
              ])}{' '}
            </p>
            <p>
              <strong>
                Koordinaten des Schnittpunkts Q<sub>1</sub>
              </strong>
            </p>
            <p>
              Setze die Funktionsgleichungen gleich und berechne die Lösung der
              Gleichung:
            </p>
            {buildEquation([
              [
                <>
                  x² {pp(-data.n1 - data.n2, 'merge_op')}x +{' '}
                  {pp(data.n1 * data.n2)}
                </>,
                <>=</>,
                <>
                  x²{' '}
                  {ppPolynom([
                    [-2 * data.xs, 'x', 1],
                    [data.xs * data.xs + data.ys, 'x', 0],
                  ])}
                </>,
                <>− x²</>,
              ],
              [
                <>
                  {pp(-data.n1 - data.n2)}x + {pp(data.n1 * data.n2)}
                </>,
                <>=</>,
                <>
                  {ppPolynom([
                    [-2 * data.xs, 'x', 1],
                    [data.xs * data.xs + data.ys, 'x', 0],
                  ])}
                </>,
                <>|{pp(2 * data.xs, 'merge_op')}x</>,
              ],
              [
                <>
                  {pp(-data.n1 - data.n2 + 2 * data.xs)}x +{' '}
                  {pp(data.n1 * data.n2)}
                </>,
                <>=</>,
                <>{pp(data.xs * data.xs + data.ys)}</>,
                <>| − {pp(data.n1 * data.n2)}</>,
              ],
              [
                <>{pp(-data.n1 - data.n2 + 2 * data.xs)}x</>,
                <>=</>,
                <>
                  {pp(
                    data.xs * data.xs + data.ys - data.n1 * data.n2,
                    'merge_op',
                  )}
                </>,
                <>| : {pp(-data.n1 - data.n2 + 2 * data.xs, 'embrace_neg')}</>,
              ],
              [<>x</>, <>=</>, <>{pp(x)}</>],
            ])}
            <p>Berechne den Funktionswert an der Stelle x = {pp(x)}:</p>
            {buildEquation([
              [
                <>y</>,
                <>=</>,
                <>
                  x² {pp(-data.n1 - data.n2, 'merge_op')}x +{' '}
                  {pp(data.n1 * data.n2)}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {pp(x)}² {pp(-data.n1 - data.n2, 'merge_op')} · {pp(x)} +{' '}
                  {pp(data.n1 * data.n2)}
                </>,
              ],
              [<></>, <>=</>, <>{pp(y)}</>],
            ])}
            <p>
              Der Schnittpunkt ist{' '}
              <strong>
                Q<sub>1</sub>({pp(x)}|{pp(y)})
              </strong>
              .
            </p>
            <p>
              <strong>
                Koordinaten von N<sub>1</sub> und N<sub>2</sub>
              </strong>
            </p>
            <p>
              Berechne die Nullstellen der Parabel p<sub>1</sub>, indem du die
              Funktionsgleichung 0 setzt:
            </p>
            {buildEquation([
              [
                <>0</>,
                <>=</>,
                <>
                  x² {pp(-data.n1 - data.n2, 'merge_op')}x +{' '}
                  {pp(data.n1 * data.n2)}
                </>,
              ],
            ])}
            <p>Löse die Gleichung mithilfe der pq-Formel:</p>
            {buildEquation([
              [
                <>
                  x<sub>1/2</sub>
                </>,
                <>=</>,
                <>
                  −{buildInlineFrac('p', 2)} ±{' '}
                  {buildSqrt(
                    <>
                      <span className="inline-block  scale-y-[2.6]">(</span>
                      {buildInlineFrac('p', 2)}
                      <span className="inline-block  scale-y-[2.6]">)</span>² −
                      q
                    </>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  −{buildInlineFrac(p, 2)} ±{' '}
                  {buildSqrt(
                    <>
                      <span className="inline-block  scale-y-[2.6]">(</span>
                      {buildInlineFrac(p, 2)}
                      <span className="inline-block  scale-y-[2.6]">)</span>² −{' '}
                      {q < 0 && <>(</>}
                      {pp(q)}
                      {q < 0 && <>)</>}
                    </>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <>
                    <span style={{ verticalAlign: 'middle' }}>
                      {pp(-p / 2)} ±{' '}
                    </span>
                    {buildSqrt(pp((p / 2) * (p / 2) - q))}
                  </>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <>
                    <span style={{ verticalAlign: 'middle' }}>
                      {pp(-p / 2)} ±{' '}
                    </span>
                    {pp(Math.sqrt((p / 2) * (p / 2) - q))}
                  </>
                </>,
              ],
            ])}
            <strong>
              <p>
                x<sub>1</sub> = {pp(data.n2)}
              </p>
              <p>
                x<sub>2</sub> = {pp(data.n1)}
              </p>
            </strong>
            <p>Gib die Nullstellen vollständig an:</p>
            <p>
              <strong>
                N<sub>1</sub>({pp(data.n2)}
                |0)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;N<sub>2</sub>(
                {pp(data.n1)}|0)
              </strong>
            </p>
            <p>
              <strong>
                Flächeninhalt von N<sub>1</sub>Q<sub>1</sub>N<sub>2</sub>
              </strong>
            </p>
            <svg viewBox="0 0 328 270">
              <image
                href="/content/BW_Realschule/Grosses_KS.png"
                height="270"
                width="328"
              />
              <text
                x={toX(0.5)}
                y={toY(8)}
                fontSize={15}
                textAnchor="middle"
                stroke="black"
              >
                x
              </text>
              <text
                x={toX(14)}
                y={toY(0.5)}
                fontSize={15}
                textAnchor="middle"
                stroke="black"
              >
                y
              </text>
              <polyline
                points={parabolaPoints}
                stroke="blue"
                strokeWidth="1"
                fill="none"
              />
              <polyline
                points={parabolaPoints2}
                stroke="blue"
                strokeWidth="1"
                fill="none"
              />
              <text
                x={toX(data.n1) - 8}
                y={toY(0) + 2}
                fontSize={10}
                textAnchor="middle"
                stroke="black"
              >
                N2 x
              </text>
              <text
                x={toX(data.n2) - 7.5}
                y={toY(0) + 2}
                fontSize={10}
                textAnchor="middle"
                stroke="black"
              >
                N1 x
              </text>
              <text
                x={toX(x) - 7.5}
                y={toY(y) + 2}
                fontSize={10}
                textAnchor="middle"
                stroke="black"
              >
                Q1 x
              </text>
              <line
                x1={toX(x)}
                y1={toY(y)}
                x2={toX(data.n1)}
                y2={toY(0)}
                stroke="black"
                strokeWidth={2}
              />
              <line
                x1={toX(x)}
                y1={toY(y)}
                x2={toX(data.n2)}
                y2={toY(0)}
                stroke="black"
                strokeWidth={2}
              />
              <line
                x1={toX(data.n1)}
                y1={toY(0)}
                x2={toX(data.n2)}
                y2={toY(0)}
                stroke="black"
                strokeWidth={2}
              />
              <text
                x={toX(x2) - 10}
                y={toY(7)}
                fontSize={10}
                textAnchor="middle"
                stroke="blue"
              >
                p2
              </text>
              <text
                x={toX(x3) + 10}
                y={toY(7)}
                fontSize={10}
                textAnchor="middle"
                stroke="blue"
              >
                p1
              </text>
            </svg>
            <p>
              Das Dreieck N<sub>1</sub>Q<sub>1</sub>N<sub>2</sub> hat die
              Grundlinie N<sub>1</sub>N<sub>2</sub> mit der Länge:
            </p>
            <p>
              {pp(data.n2)} − {pp(data.n1)} = {pp(data.n2 - data.n1)}
            </p>
            <p>
              Die Höhe von Q<sub>1</sub> auf der Grundlinie hat die Länge:{' '}
              {pp(Math.abs(y))}
            </p>
            <p>Berechne damit die Fläche des Dreiecks:</p>
            {buildEquation([
              [<>A</>, <>=</>, <>{buildInlineFrac(<>g · h</>, 2)}</>],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>
                      {pp(data.n2 - data.n1)} · {pp(Math.abs(y))}
                    </>,
                    2,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <strong>
                    {pp(((data.n2 - data.n1) * Math.abs(y)) / 2)} FE
                  </strong>
                </>,
              ],
            ])}
            <p>
              <strong>
                Q<sub>2</sub> für größtmögliche Fläche
              </strong>
            </p>
            <svg viewBox="0 0 328 270">
              <image
                href="/content/BW_Realschule/Grosses_KS.png"
                height="270"
                width="328"
              />
              <text
                x={toX(0.5)}
                y={toY(8)}
                fontSize={15}
                textAnchor="middle"
                stroke="black"
              >
                x
              </text>
              <text
                x={toX(14)}
                y={toY(0.5)}
                fontSize={15}
                textAnchor="middle"
                stroke="black"
              >
                y
              </text>
              <polyline
                points={parabolaPoints}
                stroke="blue"
                strokeWidth="1"
                fill="none"
              />
              <polyline
                points={parabolaPoints2}
                stroke="blue"
                strokeWidth="1"
                fill="none"
              />
              <text
                x={toX(data.n1) - 8}
                y={toY(0) + 2}
                fontSize={10}
                textAnchor="middle"
                stroke="black"
              >
                N2 x
              </text>
              <text
                x={toX(data.n2) - 7.5}
                y={toY(0) + 2}
                fontSize={10}
                textAnchor="middle"
                stroke="black"
              >
                N1 x
              </text>
              <text
                x={toX(x) - 7.5}
                y={toY(y) + 2}
                fontSize={10}
                textAnchor="middle"
                stroke="black"
              >
                Q1 x
              </text>
              <line
                x1={toX(x)}
                y1={toY(y)}
                x2={toX(data.n1)}
                y2={toY(0)}
                stroke="black"
                strokeWidth={2}
              />
              <line
                x1={toX(x)}
                y1={toY(y)}
                x2={toX(data.n2)}
                y2={toY(0)}
                stroke="black"
                strokeWidth={2}
              />
              <line
                x1={toX(data.n1)}
                y1={toY(0)}
                x2={toX(data.n2)}
                y2={toY(0)}
                stroke="black"
                strokeWidth={2}
              />
              <text
                x={toX(x2) - 10}
                y={toY(7)}
                fontSize={10}
                textAnchor="middle"
                stroke="blue"
              >
                p2
              </text>
              <text
                x={toX(x3) + 10}
                y={toY(7)}
                fontSize={10}
                textAnchor="middle"
                stroke="blue"
              >
                p1
              </text>
            </svg>
            <p>
              Damit der Flächeninhalt maximal ist, muss sich Q<sub>2</sub> im
              Scheitelpunkt der Parabel p<sub>1</sub> befinden.
            </p>
            <p>
              Genau dann hat das Dreieck die größtmögliche Höhe und damit auch
              den maximalen Flächeninhalt.
            </p>
            <p>
              Bestimme den Scheitelpunkt von p<sub>1</sub>. Er liegt zwischen
              den Nullstellen:
            </p>
            <p>
              x<sub>s</sub> ={' '}
              {buildInlineFrac(
                <>
                  n<sub>1</sub> + n<sub>2</sub>
                </>,
                2,
              )}{' '}
              ={' '}
              {buildInlineFrac(
                <>
                  {pp(data.n1)} + {pp(data.n2)}
                </>,
                2,
              )}{' '}
              = {pp(xs)}
            </p>
            <p>Berechne den y-Wert:</p>
            {buildEquation([
              [
                <>y</>,
                <>=</>,
                <>
                  x² {pp(-data.n1 - data.n2, 'merge_op')}x +{' '}
                  {pp(data.n1 * data.n2)}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {pp(xs)}² {pp(-data.n1 - data.n2, 'merge_op')} · {pp(xs)} +{' '}
                  {pp(data.n1 * data.n2)}
                </>,
              ],
              [<></>, <>=</>, <>{pp(ys)}</>],
            ])}
            <p>
              Der Scheitel von p<sub>2</sub> liegt im Punkt{' '}
              <strong>
                Q<sub>2</sub>({xs}|{ys})
              </strong>
              . In diesem Punkt hat das Dreieck N<sub>1</sub>Q<sub>2</sub>N
              <sub>2</sub> den größtmöglichen Flächeninhalt.
            </p>
            <p>
              <strong>Maximaler Flächeninhalt</strong>
            </p>
            <p>
              Das Dreieck N<sub>1</sub>Q<sub>2</sub>N<sub>2</sub> hat immer noch
              die gleiche Grundlinie mit der Länge: {pp(data.n2 - data.n1)}
            </p>
            <p>
              Die Höhe zu Q<sub>2</sub>({xs}|<Color1>{ys}</Color1>) hat jetzt
              die Länge: {Math.abs(ys)}
            </p>
            <p>Berechne den Flächeninhalt des Dreiecks:</p>
            {buildEquation([
              [<>A</>, <>=</>, <>{buildInlineFrac(<>g · h</>, 2)}</>],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>
                      {pp(data.n2 - data.n1)} · {Math.abs(ys)}
                    </>,
                    2,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <strong>
                    {pp(((data.n2 - data.n1) * Math.abs(ys)) / 2)} FE
                  </strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Das regelmäßige Sechseck und das gleichschenklige Dreieck ABC
              haben die Seite {buildOverline('AB')} gemeinsam.{' '}
            </p>
            <svg viewBox="0 0 328 150">
              <image
                href="/content/BW_Realschule/250_Sechseck.jpg"
                height="150"
                width="328"
              />
            </svg>
            <p>
              Es gilt: {buildOverline('AB')} = {pp(data.ab)} cm
            </p>
            <ul>
              <li>Berechne den Umfang des Dreiecks ABC.</li>
            </ul>
            <p>
              Tom behauptet: {'"'}Der Flächeninhalt des Sechsecks ist dreimal so
              groß wie der Flächeninhalt des Dreiecks ABC.{'"'}{' '}
            </p>
            <ul>
              <li>
                Hat Tom Recht? Begründe deine Antwort durch Rechnung oder
                Argumentation.
              </li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const bf = roundToDigits(
          Math.sqrt(data.ab * data.ab - (data.ab / 2) * (data.ab / 2)),
          2,
        )
        const ac = roundToDigits(
          Math.sqrt(4 * bf * bf + (data.ab / 2) * (data.ab / 2)),
          2,
        )
        return (
          <>
            <p>
              <strong>Umfang von ABC</strong>
            </p>
            <p>Berechne zuerst die Höhe des Sechsecks {buildOverline('CD')}.</p>
            <svg viewBox="0 0 328 150">
              <image
                href="/content/BW_Realschule/250_Sechseck2.jpg"
                height="150"
                width="328"
              />
            </svg>
            <p>
              Bestimme dazu {buildOverline('BF')} im rechtwinkligen Dreieck BEF.
              Es gilt:
            </p>
            <p>
              {buildOverline('BE')} = {buildOverline('AB')} = {pp(data.ab)} cm
              <br></br>
              {buildOverline('EF')} ={' '}
              {buildInlineFrac(<>{buildOverline('AB')}</>, 2)} ={' '}
              {pp(data.ab / 2)} cm
            </p>
            <p>Mit dem Satz des Pythagoras gilt:</p>
            <div>
              <span style={{ fontSize: '0.7em' }}>
                {buildEquation([
                  [
                    <>
                      {buildOverline('BF')}² + {buildOverline('EF')}²
                    </>,
                    <>=</>,
                    <>{buildOverline('BE')}²</>,
                  ],
                  [
                    <>
                      {buildOverline('BF')}² + ({pp(data.ab / 2)} cm)²
                    </>,
                    <>=</>,
                    <>({pp(data.ab)} cm)²</>,
                    <>| − ({pp(data.ab / 2)} cm)²</>,
                  ],
                  [
                    <>{buildOverline('BF')}²</>,
                    <>=</>,
                    <>
                      ({pp(data.ab)} cm)² − ({pp(data.ab / 2)} cm)²
                    </>,
                    <>| √</>,
                  ],
                  [<>{buildOverline('BF')}</>, <>≈</>, <>{pp(bf)} cm</>],
                ])}
              </span>
            </div>
            <p>Damit beträgt die gesamte Höhe:</p>
            <p>
              {buildOverline('CD')} = 2 · {buildOverline('BF')} = {pp(2 * bf)}{' '}
              cm
            </p>
            <p>Berechne {buildOverline('AC')} im rechtwinkligen Dreieck ADC:</p>
            <div>
              <span style={{ fontSize: '0.7em' }}>
                {buildEquation([
                  [
                    <>{buildOverline('AC')}²</>,
                    <>=</>,
                    <>
                      {buildOverline('AD')}² + {buildOverline('CD')}²
                    </>,
                  ],
                  [
                    <>{buildOverline('AC')}²</>,
                    <>=</>,
                    <>
                      ({pp(data.ab / 2)} cm)² + ({pp(2 * bf)} cm)²
                    </>,
                    <>| √</>,
                  ],
                  [<>{buildOverline('AC')}</>, <>≈</>, <>{pp(ac)} cm</>],
                ])}
              </span>
            </div>
            <p>Berechne den Umfang:</p>
            {buildEquation([
              [
                <>U</>,
                <>=</>,
                <>
                  {buildOverline('AB')} + {buildOverline('BC')} +{' '}
                  {buildOverline('AC')}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {pp(data.ab)} cm + {pp(ac)} cm + {pp(ac)} cm
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <strong>{pp(data.ab + ac + ac)} cm</strong>
                </>,
              ],
            ])}
            <p>
              <strong>Flächeninhalt des Sechsecks</strong>
            </p>
            <p>
              Die Fläche des Sechsecks kann berechnet und mit der Dreiecksfläche
              verglichen werden. Alternativ kann argumentiert werden:
            </p>
            <svg viewBox="0 0 328 150">
              <image
                href="/content/BW_Realschule/250_Sechseck3.jpg"
                height="150"
                width="328"
              />
            </svg>
            <p>
              Verschiebt man den Punkt C nach links und rechts, bleibt der
              Flächeninhalt von ABC immer noch gleich.
            </p>
            <p>Das Sechseck lässt sich so in gleichgroße Dreiecke aufteilen:</p>
            <ul>
              <li>Das Dreieck ABC enthält 4 kleine Dreiecke.</li>
              <li>Das Sechseck enthält insgesamt 12 kleine Dreiecke.</li>
            </ul>
            <p>
              <strong>Damit hat Tom recht.</strong>
            </p>
          </>
        )
      },
    },
  ],
}
