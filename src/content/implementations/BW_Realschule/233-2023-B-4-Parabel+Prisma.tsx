import { Exercise } from '@/data/types'
import { Color1 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildOverline,
} from '@/helper/math-builder'
import { pp, ppFrac, ppPolynom } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'
import { hammer } from 'ionicons/icons'

interface DATA {
  scheitel: number
  null: number
  b: number
  c: number
  ar: number
  eps: number
  gesamt: number
}

export const exercise233: Exercise<DATA> = {
  title: 'Parabel + Prisma',
  source: '2023 Wahlteil B - Aufgabe 4',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      scheitel: rng.randomIntBetween(3, 5),
      null: rng.randomIntBetween(2, 5),
      b: rng.randomIntBetween(-4, -1) * 2,
      c: rng.randomIntBetween(-3, 0),
      ar: rng.randomIntBetween(100, 180) / 10,
      eps: rng.randomIntBetween(18, 28),
      gesamt: rng.randomIntBetween(33, 40),
    }
  },
  originalData: {
    scheitel: 4,
    null: 4,
    b: -2,
    c: -3,
    ar: 14.2,
    eps: 23,
    gesamt: 38,
  },
  constraint({ data }) {
    const rq = roundToDigits(
      data.ar / Math.cos((2 * Math.PI * data.eps) / 360),
      2,
    )
    const aq = roundToDigits(
      data.ar * Math.tan((2 * Math.PI * data.eps) / 360),
      2,
    )
    const qp = roundToDigits(aq / Math.sin((2 * Math.PI * 22.5) / 360), 2)
    const schnitt =
      -data.scheitel /
      ((data.scheitel + Math.abs(data.c - (-data.b / 2) * (-data.b / 2))) /
        (-0.5 * data.b))

    return schnitt % 1 == 0 && data.gesamt - rq - qp > aq + 4
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
        function toX(n: number) {
          return 163 + n * 32.5
        }
        function toY(n: number) {
          return 186.5 - n * 32.5
        }
        const a = -data.scheitel / (data.null * data.null)
        function generateParabolaPoints(step: number): string {
          let points = ''
          for (let x = -6; x <= data.null - 0.5; x += step) {
            const y = a * (x * x) + data.scheitel
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        function generateLinePoints(step: number): string {
          let points = ''
          for (let x = -data.null - 1; x <= 1; x += step) {
            const y = (data.scheitel / data.null) * x + data.scheitel
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints = generateParabolaPoints(0.1)
        const LinePoints = generateLinePoints(0.1)
        return (
          <>
            <p>
              Das Schaubild zeigt Ausschnitte der Parabel p<sub>1</sub> und der
              Geraden g.
            </p>
            <svg viewBox="0 0 328 260">
              <image
                href="/content/NRW_MSA/NRW_MSA_KS_Vorlage.png"
                height="260"
                width="328"
              />

              <polyline
                points={parabolaPoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={LinePoints}
                stroke="orange"
                strokeWidth="2"
                fill="none"
              />
              <text
                x={toX(1) + 10}
                y={toY(a + data.scheitel) - 20}
                fontSize={15}
                textAnchor="middle"
                stroke="blue"
              >
                p1
              </text>
              <text
                x={toX(-1)}
                y={toY((data.scheitel / data.null) * -1 + data.scheitel) + 20}
                fontSize={15}
                textAnchor="middle"
                stroke="orange"
              >
                g
              </text>
              <text
                x={toX(-data.null) + 5}
                y={toY(0) + 25}
                fontSize={15}
                textAnchor="middle"
                stroke="blue"
              >
                N1
              </text>
            </svg>
            <ul>
              <li>
                Bestimme die Funktionsgleichungen von p<sub>1</sub> und g.
                Entnimm dazu geeignete Werte aus dem Schaubild.
              </li>
            </ul>
            <p>
              Die Parabel p<sub>1</sub> schneidet die x-Achse in den Punkten N
              <sub>1</sub> und N<sub>2</sub>.{' '}
            </p>
            <ul>
              <li>
                Gib die Koordinaten von N<sub>2</sub> an.
              </li>
            </ul>
            <p>
              Die Parabel p<sub>2</sub> hat die Funktionsgleichung<br></br> y ={' '}
              {ppPolynom([
                [1, 'x', 2],
                [data.b, 'x', 1],
                [data.c, 'x', 0],
              ])}
              .{' '}
            </p>
            <ul>
              <li>
                Berechne die Koordinaten des Scheitelpunktes S<sub>2</sub> von p
                <sub>2</sub>.
              </li>
            </ul>
            <p>
              S<sub>2</sub> bildet mit S<sub>1</sub> und N<sub>1</sub> das
              Dreieck S<sub>2</sub>S<sub>1</sub>N<sub>1</sub>. Ebenso bildet S
              <sub>2</sub> mit N<sub>2</sub> und S<sub>1</sub> das Dreieck S
              <sub>2</sub>N<sub>2</sub>S<sub>1</sub>.{' '}
            </p>
            <ul>
              <li>
                Um wie viele Flächeneinheiten (FE) unterscheiden sich die
                Flächeninhalte dieser beiden Dreiecke?
              </li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 163 + n * 32.5
        }
        function toY(n: number) {
          return 186.5 - n * 32.5
        }
        const a = -data.scheitel / (data.null * data.null)
        function generateParabolaPoints(step: number): string {
          let points = ''
          for (let x = -6; x <= data.null - 0.5; x += step) {
            const y = a * (x * x) + data.scheitel
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        function generateLinePoints(step: number): string {
          let points = ''
          for (let x = -data.null - 1; x <= 1; x += step) {
            const y = (data.scheitel / data.null) * x + data.scheitel
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints = generateParabolaPoints(0.1)
        const LinePoints = generateLinePoints(0.1)
        const schnitt =
          -data.scheitel /
          ((data.scheitel + Math.abs(data.c - (-data.b / 2) * (-data.b / 2))) /
            (-0.5 * data.b))
        const h = data.scheitel - (data.c - (-data.b / 2) * (-data.b / 2))
        return (
          <>
            <p>
              <strong>
                Funktionsgleichungen von p<sub>1</sub> und g
              </strong>
            </p>
            <p>
              Der Scheitel der Parabel p<sub>1</sub> liegt auf der y-Achse. Der
              Funktionsterm hat dadurch die Form y = ax² + c.
            </p>
            <p>Bestimme c aus dem Scheitel:</p>
            <p>
              S(0|<Color1>{data.scheitel}</Color1>)
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⇒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              y = ax² + <Color1>{data.scheitel}</Color1>
            </p>
            <p>
              Setze die Koordinate der Nullstelle N<sub>1</sub> ein und berechne
              a:
            </p>
            {buildEquation([
              [<>y</>, <>=</>, <>ax² + {data.scheitel}</>],
              [
                <>0</>,
                <>=</>,
                <>
                  a · ({pp(-data.null)})² + {data.scheitel}
                </>,
              ],
              [
                <>0</>,
                <>=</>,
                <>
                  {pp(data.null * data.null)}a + {data.scheitel}
                </>,
                <>| {pp(-data.scheitel, 'merge_op')}</>,
              ],
              [
                <>{pp(-data.scheitel, 'merge_op')}</>,
                <>=</>,
                <>{pp(data.null * data.null)}a</>,
                <>| : {pp(data.null * data.null)}</>,
              ],
              [<>a</>, <>=</>, <>{ppFrac(a)}</>],
            ])}
            <p>Der Funktionsterm der Parabel lautet also:</p>
            <p>
              <strong>
                y = {ppFrac(a)}x² {pp(data.scheitel, 'merge_op')}
              </strong>
            </p>
            <p>Die Gerade hat allgemein den Funktionsterm y = mx + b.</p>
            <p>Bestimme den y-Achsenabschnitt wie bei der Parabel:</p>
            <p>
              y = mx + <Color1>{data.scheitel}</Color1>
            </p>
            <p>Setze den Punkt ({pp(-data.null)}|0) ein und bestimme m:</p>
            {buildEquation([
              [<>y</>, <>=</>, <>mx + {data.scheitel}</>],
              [
                <>0</>,
                <>=</>,
                <>
                  {pp(-data.null)} · m + {data.scheitel}
                </>,
                <>| {pp(-data.scheitel, 'merge_op')}</>,
              ],
              [
                <>{pp(-data.scheitel, 'merge_op')}</>,
                <>=</>,
                <>{pp(-data.null)} · m</>,
                <>| : ({pp(-data.null)})</>,
              ],
              [<>m</>, <>=</>, <>{ppFrac(-data.scheitel / -data.null)}</>],
            ])}
            <p>Der Funktionsterm der Gerade ist damit:</p>
            <p>
              <strong>
                y ={' '}
                {-data.scheitel / -data.null == 1
                  ? ''
                  : ppFrac(-data.scheitel / -data.null)}
                x {pp(data.scheitel, 'merge_op')}
              </strong>
            </p>
            <p>
              <strong>
                Koordinaten von N<sub>2</sub>
              </strong>
            </p>
            <p>
              Die Parabel p<sub>1</sub> hat die Nullstelle N<sub>1</sub>(
              {pp(-data.null)}|0). N<sub>2</sub> befindet sich aufgrund der
              Symmetrie der Parabel genau auf der anderen Seite: <br></br>
              <strong>
                N<sub>2</sub>({data.null}|0)
              </strong>
            </p>
            <p>
              <strong>
                Scheitel von p<sub>2</sub>
              </strong>
            </p>
            <p>
              Der Funktionsterm von p<sub>2</sub> lautet:{' '}
            </p>
            <p>
              y ={' '}
              {ppPolynom([
                [1, 'x', 2],
                [data.b, 'x', 1],
                [data.c, 'x', 0],
              ])}
            </p>
            <p>Bestimme die Scheitelform mit einer quadratischen Ergänzung:</p>
            {buildEquation([
              [
                <>y</>,
                <>=</>,
                <>
                  {ppPolynom([
                    [1, 'x', 2],
                    [data.b, 'x', 1],
                    [data.c, 'x', 0],
                  ])}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {ppPolynom([
                    [1, 'x', 2],
                    [data.b, 'x', 1],
                  ])}{' '}
                  + <span className="inline-block  scale-y-[2]">(</span>
                  {buildInlineFrac(-data.b, 2)}
                  <span className="inline-block  scale-y-[2]">)</span>²{' '}
                  {pp(data.c, 'merge_op')} −{' '}
                  <span className="inline-block  scale-y-[2]">(</span>
                  {buildInlineFrac(-data.b, 2)}
                  <span className="inline-block  scale-y-[2]">)</span>²
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  (x − {-data.b / 2})²{' '}
                  {pp(data.c - (-data.b / 2) * (-data.b / 2), 'merge_op')}
                </>,
              ],
            ])}
            <p>
              Bestimme daraus den Scheitelpunkt: <br></br>
              <strong>
                S<sub>2</sub>({-data.b / 2}|
                {pp(data.c - (-data.b / 2) * (-data.b / 2))})
              </strong>
            </p>
            <p>
              <strong>Fläche der Dreiecke</strong>
            </p>
            <svg viewBox="0 0 328 260">
              <image
                href="/content/NRW_MSA/NRW_MSA_KS_Vorlage.png"
                height="260"
                width="328"
              />

              <polyline
                points={parabolaPoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={LinePoints}
                stroke="orange"
                strokeWidth="2"
                fill="none"
              />
              <text
                x={toX(1) + 10}
                y={toY(a + data.scheitel) - 20}
                fontSize={15}
                textAnchor="middle"
                stroke="blue"
              >
                p1
              </text>
              <text
                x={toX(-1)}
                y={toY((data.scheitel / data.null) * -1 + data.scheitel) + 20}
                fontSize={15}
                textAnchor="middle"
                stroke="orange"
              >
                g
              </text>
              <text
                x={toX(-data.null) + 5}
                y={toY(0) + 25}
                fontSize={15}
                textAnchor="middle"
                stroke="blue"
              >
                N1
              </text>
              <text
                x={toX(0) - 15}
                y={toY(data.scheitel) - 10}
                fontSize={15}
                textAnchor="middle"
                stroke="black"
              >
                S1
              </text>
              <line
                x1={toX(-data.null)}
                y1={toY(0)}
                x2={toX(0)}
                y2={toY(data.scheitel)}
                stroke="black"
                strokeWidth={2}
              />
              <line
                x1={toX(-data.b / 2)}
                y1={toY(data.c - (-data.b / 2) * (-data.b / 2))}
                x2={toX(0)}
                y2={toY(data.scheitel)}
                stroke="black"
                strokeWidth={2}
              />
              <line
                x1={toX(-data.b / 2)}
                y1={toY(data.c - (-data.b / 2) * (-data.b / 2))}
                x2={toX(-data.null)}
                y2={toY(0)}
                stroke="black"
                strokeWidth={2}
              />
              <line
                x1={toX(data.null)}
                y1={toY(0)}
                x2={toX(0)}
                y2={toY(data.scheitel)}
                stroke="red"
                strokeWidth={2}
              />
              <line
                x1={toX(-data.b / 2)}
                y1={toY(data.c - (-data.b / 2) * (-data.b / 2))}
                x2={toX(0)}
                y2={toY(data.scheitel)}
                stroke="red"
                strokeWidth={2}
              />
              <line
                x1={toX(-data.b / 2)}
                y1={toY(data.c - (-data.b / 2) * (-data.b / 2))}
                x2={toX(data.null)}
                y2={toY(0)}
                stroke="red"
                strokeWidth={2}
              />
              <text
                x={toX(-data.b / 2) + 15}
                y={toY(data.c - (-data.b / 2) * (-data.b / 2))}
                fontSize={15}
                textAnchor="middle"
                stroke="black"
              >
                S2
              </text>
              <line
                x1={toX(-data.null)}
                y1={toY(0)}
                x2={toX(data.null)}
                y2={toY(0)}
                stroke="green"
                strokeWidth={2}
              />
              <line
                x1={toX(-schnitt)}
                y1={toY(data.scheitel)}
                x2={toX(-schnitt)}
                y2={toY(data.c - (-data.b / 2) * (-data.b / 2))}
                stroke="green"
                strokeDasharray="5,5"
                strokeWidth={2}
              />
              <text
                x={toX(0)}
                y={toY(0) - 5}
                fontSize={15}
                textAnchor="middle"
                stroke="green"
              >
                Grundlinie
              </text>
              <text
                x={toX(2) - 5}
                y={toY(1)}
                fontSize={15}
                textAnchor="middle"
                stroke="green"
              >
                Höhe
              </text>
            </svg>
            <p>
              Um die Fläche der Dreiecke zu berechnen, ist es hilfreich die
              grüne Linien als Grundlinie und Höhe zu verwenden (siehe Skizze).
            </p>

            <svg viewBox="0 0 328 260">
              <image
                href="/content/NRW_MSA/NRW_MSA_KS_Vorlage.png"
                height="260"
                width="328"
              />

              <line
                x1={toX(-data.null)}
                y1={toY(0)}
                x2={toX(0)}
                y2={toY(data.scheitel)}
                stroke="black"
                strokeWidth={2}
              />
              <line
                x1={toX(-data.b / 2)}
                y1={toY(data.c - (-data.b / 2) * (-data.b / 2))}
                x2={toX(0)}
                y2={toY(data.scheitel)}
                stroke="black"
                strokeWidth={2}
              />
              <line
                x1={toX(-data.b / 2)}
                y1={toY(data.c - (-data.b / 2) * (-data.b / 2))}
                x2={toX(-data.null)}
                y2={toY(0)}
                stroke="black"
                strokeWidth={2}
              />
              <line
                x1={toX(data.null)}
                y1={toY(0)}
                x2={toX(0)}
                y2={toY(data.scheitel)}
                stroke="red"
                strokeWidth={2}
              />
              <line
                x1={toX(-data.b / 2)}
                y1={toY(data.c - (-data.b / 2) * (-data.b / 2))}
                x2={toX(0)}
                y2={toY(data.scheitel)}
                stroke="red"
                strokeWidth={2}
              />
              <line
                x1={toX(-data.b / 2)}
                y1={toY(data.c - (-data.b / 2) * (-data.b / 2))}
                x2={toX(data.null)}
                y2={toY(0)}
                stroke="red"
                strokeWidth={2}
              />
              <text
                x={toX(-data.b / 2) + 15}
                y={toY(data.c - (-data.b / 2) * (-data.b / 2))}
                fontSize={15}
                textAnchor="middle"
                stroke="black"
              >
                S2
              </text>
              <line
                x1={toX(-data.null)}
                y1={toY(0)}
                x2={toX(-schnitt)}
                y2={toY(0)}
                stroke="black"
                strokeWidth={2}
              />
              <line
                x1={toX(data.null)}
                y1={toY(0)}
                x2={toX(-schnitt)}
                y2={toY(0)}
                stroke="red"
                strokeWidth={2}
              />
              <line
                x1={toX(-schnitt)}
                y1={toY(data.scheitel)}
                x2={toX(-schnitt)}
                y2={toY(data.c - (-data.b / 2) * (-data.b / 2))}
                stroke="black"
                strokeWidth={2}
                strokeDasharray="5,5"
              />
              <text
                x={toX((-data.null - schnitt) / 2)}
                y={toY(0) - 5}
                fontSize={15}
                textAnchor="middle"
                stroke="black"
              >
                g = {data.null - schnitt}
              </text>
              <text
                x={toX((data.null - schnitt) / 2)}
                y={toY(0) - 5}
                fontSize={15}
                textAnchor="middle"
                stroke="red"
              >
                g = {data.null + schnitt}
              </text>
              <text
                x={toX(-schnitt) + 25}
                y={toY(1)}
                fontSize={15}
                textAnchor="middle"
                stroke="black"
              >
                h = {h}
              </text>
            </svg>
            <p>Berechne die Flächen mit der Formel:</p>
            {buildEquation([
              [
                <>
                  A<sub>schwarz</sub>
                </>,
                <>=</>,
                <>{buildInlineFrac(<>g · h</>, 2)} </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>
                      {data.null - schnitt} [LE] · {h} [LE]
                    </>,
                    2,
                  )}
                </>,
              ],
              [<></>, <>=</>, <>{pp(0.5 * h * (data.null - schnitt))} [FE]</>],
            ])}
            {buildEquation([
              [
                <>
                  A<sub>rot</sub>
                </>,
                <>=</>,
                <>{buildInlineFrac(<>g · h</>, 2)} </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>
                      {data.null + schnitt} [LE] · {h} [LE]
                    </>,
                    2,
                  )}
                </>,
              ],
              [<></>, <>=</>, <>{pp(0.5 * h * (data.null + schnitt))} [FE]</>],
            ])}
            <p>Die Flächeninhalte unterscheiden sich um:</p>
            <p>
              {pp(0.5 * h * (data.null - schnitt))} [FE] −{' '}
              {pp(0.5 * h * (data.null + schnitt))} [FE] ={' '}
              <strong>{pp(0.5 * h * (2 * -schnitt))} [FE]</strong>
            </p>
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
              Auf einem regelmäßigen achtseitigen Prisma liegt der Streckenzug
              PQRS mit der Länge 28 cm.
            </p>
            <svg viewBox="0 0 328 190">
              <image
                href="/content/BW_Realschule/233_Prisma.jpg"
                height="190"
                width="328"
              />
            </svg>
            <p>Es gilt:</p>
            <p>
              {buildOverline('AR')} = {pp(data.ar)} cm<br></br>ε = {data.eps}°
            </p>
            <p>Berechne die Höhe des achtseitigen Prismas.</p>
          </>
        )
      },
      solution({ data }) {
        const rq = roundToDigits(
          data.ar / Math.cos((2 * Math.PI * data.eps) / 360),
          2,
        )
        const aq = roundToDigits(
          data.ar * Math.tan((2 * Math.PI * data.eps) / 360),
          2,
        )
        const qp = roundToDigits(aq / Math.sin((2 * Math.PI * 22.5) / 360), 2)
        const rt = roundToDigits(
          Math.sqrt(
            (data.gesamt - rq - qp) * (data.gesamt - rq - qp) - aq * aq,
          ),
          2,
        )
        return (
          <>
            <p>
              Die Höhe entspricht der Länge {buildOverline('AT')}. Die Länge{' '}
              {buildOverline('RT')} muss über die Länge des gesamten
              Streckenzugs PQRS berechnet werden.
            </p>
            <p>
              <strong>Länge {buildOverline('RQ')} berechnen</strong>
            </p>
            <p>
              Berechne die Länge {buildOverline('RQ')} im rechtwinkligen
              Dreieck:
            </p>
            {buildEquation([
              [
                <>cos(ε)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildOverline('AR')}</>,
                    <>{buildOverline('RQ')}</>,
                  )}
                </>,
              ],
              [
                <>cos({data.eps}°)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{data.ar} cm</>,
                    <>{buildOverline('RQ')}</>,
                  )}
                </>,
                <>| · {buildOverline('RQ')}</>,
              ],
              [
                <>
                  {buildOverline('RQ')} · cos({data.eps}°)
                </>,
                <>=</>,
                <>{data.ar} cm</>,
                <>| : cos({data.eps}°)</>,
              ],
              [
                <>{buildOverline('RQ')}</>,
                <>=</>,
                <>
                  {buildInlineFrac(<>{data.ar} cm</>, <>cos({data.eps}°)</>)}
                </>,
              ],
              [<>{buildOverline('RQ')}</>, <>≈</>, <>{pp(rq)} cm</>],
            ])}{' '}
            <p>
              <strong>Länge {buildOverline('QP')} berechnen</strong>
            </p>
            <p>
              Für die Länge {buildOverline('QP')} wird die Länge{' '}
              {buildOverline('AQ')} benötigt. Berechne sie wie{' '}
              {buildOverline('RQ')} im rechtwinkligen Dreieck:
            </p>
            {buildEquation([
              [
                <>tan(ε)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildOverline('AQ')}</>,
                    <>{buildOverline('AR')}</>,
                  )}
                </>,
              ],
              [
                <>tan({data.eps}°)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildOverline('AQ')}</>,
                    <>{data.ar} cm</>,
                  )}
                </>,
                <>| · {data.ar} cm</>,
              ],
              [
                <>
                  {data.ar} cm · tan({data.eps}°)
                </>,
                <>=</>,
                <>{buildOverline('AQ')}</>,
              ],
              [<>{buildOverline('AQ')}</>, <>≈</>, <>{pp(aq)} cm</>],
            ])}
            <svg viewBox="0 0 328 170">
              <image
                href="/content/BW_Realschule/233_Prisma2.jpg"
                height="170"
                width="328"
              />
            </svg>
            <p>
              Im regelmäßigen Achteck kann die Hälfte von {buildOverline('QP')}{' '}
              im rechtwinkligen Dreieck bestimmt werden:
            </p>
            <div>
              <span style={{ fontSize: '0.8em' }}>
                {buildEquation([
                  [
                    <>sin(22,5°)</>,
                    <>=</>,
                    <>
                      {buildInlineFrac(
                        <>
                          {buildInlineFrac(<>{buildOverline('AQ')}</>, <>2</>)}
                        </>,
                        <>
                          {buildInlineFrac(<>{buildOverline('QP')}</>, <>2</>)}
                        </>,
                      )}
                    </>,
                  ],
                  [
                    <>sin(22,5°)</>,
                    <>=</>,
                    <>
                      {' '}
                      {buildInlineFrac(
                        <>2 · {pp(aq / 2)} cm</>,
                        <>{buildOverline('QP')}</>,
                      )}
                    </>,
                    <>| · {buildOverline('QP')}</>,
                  ],
                  [
                    <>{buildOverline('QP')} · sin(22,5°)</>,
                    <>=</>,
                    <>
                      {buildInlineFrac(
                        <>2 · {pp(aq / 2)} cm</>,
                        <>{buildOverline('QP')}</>,
                      )}
                    </>,
                    <>| : sin(22,5°)</>,
                  ],
                  [
                    <>{buildOverline('QP')}</>,
                    <>=</>,
                    <>{buildInlineFrac(<>{pp(aq)} cm</>, <>sin(22,5°)</>)}</>,
                  ],
                  [<>{buildOverline('QP')}</>, <>≈</>, <>{pp(qp)} cm</>],
                ])}
              </span>
            </div>
            <p>
              <strong>Länge {buildOverline('RT')} berechnen</strong>
            </p>
            <p>
              Berechne die Länge {buildOverline('RS')} über den gesamten
              Streckenzug PQRS:
            </p>
            {buildEquation([
              [
                <>{buildOverline('RS')}</>,
                <>=</>,
                <>
                  {buildOverline('PQRS')} − {buildOverline('RQ')} −{' '}
                  {buildOverline('QP')}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {data.gesamt} cm − {pp(rq)} cm − {pp(qp)} cm
                </>,
              ],
              [<></>, <>=</>, <>{pp(data.gesamt - rq - qp)} cm</>],
            ])}
            <p>Berechne {buildOverline('RT')} mit dem Satz des Pythagoras:</p>
            <div>
              <span style={{ fontSize: '0.7em' }}>
                {buildEquation([
                  [
                    <>{buildOverline('RS')}²</>,
                    <>=</>,
                    <>
                      {buildOverline('RT')}² + {buildOverline('ST')}²
                    </>,
                  ],
                  [
                    <>({pp(data.gesamt - rq - qp)} cm)²</>,
                    <>=</>,
                    <>
                      {buildOverline('RT')}² + ({pp(aq)} cm)²
                    </>,
                    <>| − ({pp(aq)} cm)²</>,
                  ],
                  [
                    <>{buildOverline('RT')}²</>,
                    <>=</>,
                    <>
                      ({pp(data.gesamt - rq - qp)} cm)² − ({pp(aq)} cm)²
                    </>,
                    <>| √</>,
                  ],
                  [<>{buildOverline('RT')}</>, <>≈</>, <>{pp(rt)} cm</>],
                ])}
              </span>
            </div>
            <p>
              <strong>Höhe des Prismas</strong>
            </p>
            <p>Berechne die Gesamthöhe:</p>
            <p>
              {buildOverline('RT')} + {buildOverline('AR')} = {pp(rt)} cm +{' '}
              {pp(data.ar)} cm = <strong>{pp(rt + data.ar)} cm</strong>
            </p>
          </>
        )
      },
    },
  ],
}
