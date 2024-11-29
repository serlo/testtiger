import { Exercise } from '@/data/types'
import { Color1 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildOverline,
} from '@/helper/math-builder'
import { pp, ppPolynom } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  ac: number
  bd: number
  gamma: number
  delta: number
  c: number
  ax: number
  ay: number
  m: number
  case: boolean
}

export const exercise230: Exercise<DATA> = {
  title: 'Trapez + Parabel',
  source: '2023 Wahlteil B - Aufgabe 1',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      ac: rng.randomIntBetween(100, 130) / 10,
      bd: rng.randomIntBetween(70, 95) / 10,
      gamma: rng.randomIntBetween(320, 400) / 10,
      delta: rng.randomIntBetween(320, 400) / 10,
      c: rng.randomIntBetween(2, 8),
      ax: rng.randomIntBetween(1, 3),
      ay: rng.randomIntBetween(1, 4),
      m: rng.randomIntBetween(-4, -1),
      case: rng.randomBoolean(),
    }
  },
  originalData: {
    ac: 11.4,
    bd: 8.2,
    gamma: 37.6,
    delta: 39.2,
    c: 2,
    ax: 1,
    ay: 1,
    m: -3,
    case: true,
  },
  constraint({ data }) {
    const b = (data.ay + data.c - data.ax * data.ax) / data.ax
    const xb = data.ax - 2 * (data.ax + b / 2)
    const m_korrekt = (data.ay + data.c) / (xb + (data.ax - xb) / 2)
    return b % 1 == 0 && data.m != m_korrekt && b != 0
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
              Das gleichschenklige Dreieck ABC und das rechtwinklige Trapez FBDE
              überdecken sich teilweise.{' '}
            </p>
            <svg viewBox="0 0 328 130">
              <image
                href="/content/BW_Realschule/230_Trapez.jpg"
                height="130"
                width="328"
              />
            </svg>
            <p>Es gilt:</p>
            <p>
              {buildOverline('AC')} = {pp(data.ac)} cm
              <br></br>
              {buildOverline('BD')} = {pp(data.bd)} cm
              <br></br> γ<sub>1</sub> = {pp(data.gamma)}°<br></br>δ ={' '}
              {pp(data.delta)}° <br></br>
              {buildOverline('AC')} = {buildOverline('BC')}
            </p>
            <p>Berechne den Flächeninhalt des Vierecks FBGE.</p>
          </>
        )
      },
      solution({ data }) {
        const af = roundToDigits(
          data.ac * Math.sin((2 * Math.PI * data.gamma) / 360),
          2,
        )
        const bh = roundToDigits(
          data.bd * Math.sin((2 * Math.PI * data.delta) / 360),
          2,
        )
        const cf = roundToDigits(
          data.ac * Math.cos((2 * Math.PI * data.gamma) / 360),
          2,
        )
        const eg = roundToDigits((af * (cf - bh)) / cf, 2)
        const A = ((eg + af) * bh) / 2
        return (
          <>
            <p>
              Das Viereck FBGE ist ebenfalls ein rechtwinkliges Trapez. Um die
              Fläche zu berechnen, werden die Längen {buildOverline('FB')},{' '}
              {buildOverline('EG')} und {buildOverline('EF')} benötigt.
            </p>
            <p>
              <strong>Länge {buildOverline('FB')} berechnen</strong>
            </p>
            <p>
              Im gleichschenkligen Dreieck gilt: {buildOverline('AF')} ={' '}
              {buildOverline('FB')}
            </p>
            <p>Berechne {buildOverline('AF')} im rechtwinkligen Dreieck:</p>
            {buildEquation([
              [
                <>
                  sin(γ<sub>1</sub>)
                </>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildOverline('AF')}</>,
                    <>{buildOverline('AC')}</>,
                  )}
                </>,
              ],
              [
                <>sin({pp(data.gamma)}°)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildOverline('AF')}</>,
                    <>{pp(data.ac)} cm</>,
                  )}
                </>,
              ],
              [
                <>{buildOverline('AF')}</>,
                <>=</>,
                <>
                  sin({pp(data.gamma)}°) · {pp(data.ac)} cm
                </>,
              ],
              [<>{buildOverline('AF')}</>, <>≈</>, <>{pp(af)} cm</>],
            ])}
            <p>
              Damit ist auch {buildOverline('FB')} = {pp(af)} cm.
            </p>
            <p>
              <strong>Länge {buildOverline('EF')} berechnen</strong>
            </p>
            <svg viewBox="0 0 328 150">
              <image
                href="/content/BW_Realschule/230_Trapez2.jpg"
                height="150"
                width="328"
              />
            </svg>
            <p>
              An der Skizze lässt sich erkennen: {buildOverline('EF')} ={' '}
              {buildOverline('BH')}
            </p>
            <p>Berechne {buildOverline('BH')} im rechtwinkligen Dreieck:</p>
            {buildEquation([
              [
                <>sin(δ)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildOverline('BH')}</>,
                    <>{buildOverline('BD')}</>,
                  )}
                </>,
              ],
              [
                <>sin({pp(data.delta)}°)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildOverline('BH')}</>,
                    <>{pp(data.bd)} cm</>,
                  )}
                </>,
              ],
              [
                <>{buildOverline('BH')}</>,
                <>=</>,
                <>
                  sin({pp(data.delta)}°) · {pp(data.bd)} cm
                </>,
              ],
              [<>{buildOverline('BH')}</>, <>≈</>, <>{pp(bh)} cm</>],
            ])}
            <p>
              Damit ist auch {buildOverline('EF')} = {pp(bh)} cm.
            </p>
            <p>
              <strong>Länge {buildOverline('EG')} berechnen</strong>
            </p>
            <p>
              Die Strecke {buildOverline('EG')} kann mithilfe des Strahlensatzes
              im Dreieck CFB berechnet werden. Dafür wird noch die Länge{' '}
              {buildOverline('CF')} benötigt.
            </p>
            <p>Berechne {buildOverline('CF')} im rechtwinkligen Dreieck:</p>
            {buildEquation([
              [
                <>
                  cos(γ<sub>1</sub>)
                </>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildOverline('CF')}</>,
                    <>{buildOverline('AC')}</>,
                  )}
                </>,
              ],
              [
                <>cos({pp(data.gamma)}°)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildOverline('CF')}</>,
                    <>{pp(data.ac)} cm</>,
                  )}
                </>,
              ],
              [
                <>{buildOverline('CF')}</>,
                <>=</>,
                <>
                  cos({pp(data.gamma)}°) · {pp(data.ac)} cm
                </>,
              ],
              [<>{buildOverline('CF')}</>, <>≈</>, <>{pp(cf)} cm</>],
            ])}
            <p>Im Dreieck CFB gilt der Strahlensatz:</p>
            {buildEquation([
              [
                <>
                  {buildInlineFrac(
                    <>{buildOverline('CE')}</>,
                    <>{buildOverline('CF')}</>,
                  )}
                </>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildOverline('EG')}</>,
                    <>{buildOverline('FB')}</>,
                  )}
                </>,
              ],
              [
                <>
                  {buildInlineFrac(
                    <>
                      {buildOverline('CF')} − {buildOverline('EF')}
                    </>,
                    <>{buildOverline('CF')}</>,
                  )}
                </>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildOverline('EG')}</>,
                    <>{buildOverline('FB')}</>,
                  )}
                </>,
              ],
              [
                <>
                  {buildInlineFrac(
                    <>
                      {pp(cf)} cm − {pp(bh)} cm
                    </>,
                    <>{pp(cf)} cm</>,
                  )}
                </>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildOverline('EG')}</>,
                    <>{pp(af)} cm</>,
                  )}
                </>,
                <>| · {pp(af)} cm</>,
              ],
              [<>{buildOverline('EG')}</>, <>=</>, <>{pp(eg)} cm</>],
            ])}
            <p>
              <strong>Fläche berechnen</strong>
            </p>
            <p>Berechne die Fläche des Trapezes EFBG:</p>
            {buildEquation([
              [
                <>A</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>
                      ({buildOverline('EG')} + {buildOverline('FB')}) ·{' '}
                      {buildOverline('EF')}
                    </>,
                    <>2</>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {' '}
                  {buildInlineFrac(
                    <>
                      ({pp(eg)} cm + {pp(af)} cm) · {pp(bh)} cm
                    </>,
                    <>2</>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <strong>{pp(roundToDigits(A, 2))} cm²</strong>
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
        const b = (data.ay + data.c - data.ax * data.ax) / data.ax
        const xb = data.ax - 2 * (data.ax + b / 2)
        const m_korrekt = (data.ay + data.c) / (xb + (data.ax - xb) / 2)
        return (
          <>
            <p>
              Eine nach oben geöffnete verschobene Normalparabel p mit der Form
              y = x² + bx − {data.c} geht durch den Punkt A({data.ax}|{data.ay}
              ).{' '}
            </p>
            <ul>
              <li>Berechne die Funktionsgleichung der Parabel p.</li>
            </ul>
            <p>
              Die Parabel p geht auch durch den Punkt B({pp(xb)}|y_B). Sie
              schneidet die y-Achse im Punkt C.
            </p>
            <ul>
              <li>Bestimme die Koordinaten der Punkte B und C.</li>
            </ul>
            <p>Die Punkte A,B und C bilden das Dreieck ABC. </p>
            <ul>
              <li>Berechne den Flächeninhalt des Dreiecks ABC.</li>
            </ul>
            <p>
              Die Gerade g geht durch den Punkt C und hat die Steigung m ={' '}
              {data.case ? pp(m_korrekt) : pp(data.m)}.{' '}
            </p>
            <ul>
              <li>Gib die Funktionsgleichung von g an.</li>
            </ul>
            <p>
              Julius behauptet: {'"'}Die Gerade g halbiert den Flächeninhalt des
              Dreiecks ABC.{'"'}
            </p>
            <ul>
              <li>
                Überprüfe diese Aussage und begründe deine Antwort durch
                Rechnung oder Argumentation.
              </li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const b = (data.ay + data.c - data.ax * data.ax) / data.ax
        const xb = data.ax - 2 * (data.ax + b / 2)
        const yb = xb * xb + b * xb - data.c
        const m_korrekt = (data.ay + data.c) / (xb + (data.ax - xb) / 2)
        return (
          <>
            <p>
              <strong>Funktionsgleichung von p</strong>
            </p>
            <p>
              Setze den Punkt A in die Funktionsgleichung ein und bestimme b:
            </p>
            {buildEquation([
              [<>y</>, <>=</>, <>x² + bx − {data.c}</>],
              [
                <>{data.ay}</>,
                <>=</>,
                <>
                  {data.ax}² + b · {data.ax} − {data.c}
                </>,
              ],
              [
                <>{data.ay}</>,
                <>=</>,
                <>
                  {ppPolynom([[data.ax, 'b', 1]])}
                  {pp(data.ax * data.ax - data.c, 'merge_op')}
                </>,
                <>| {pp(-(data.ax * data.ax - data.c), 'merge_op')}</>,
              ],
              [
                <>{data.ay - (data.ax * data.ax - data.c)}</>,
                <>=</>,
                <>{ppPolynom([[data.ax, 'b', 1]])}</>,
                <>| : {data.ax}</>,
              ],
              [<>b</>, <>=</>, <>{pp(b)}</>],
            ])}
            <p>
              Die Funktionsgleichung lautet:<br></br>{' '}
              <strong>
                y = x² {pp(b, 'merge_op')}x − {data.c}
              </strong>
            </p>
            <p>
              <strong>Koordinaten von B und C</strong>
            </p>
            <p>An der Funktionsgleichung kann der Punkt C abgelesen werden:</p>
            <p>
              y = x² {pp(b, 'merge_op')}x <Color1>− {data.c}</Color1>{' '}
              &nbsp;&nbsp;&nbsp;&nbsp;⇒&nbsp;&nbsp;&nbsp;&nbsp; C(0|−
              {data.c})
            </p>
            <p>Setze x = {pp(xb)} in die Funktionsgleichung ein:</p>
            {buildEquation([
              [
                <>y</>,
                <>=</>,
                <>
                  x² {pp(b, 'merge_op')}x − {data.c}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  ({pp(xb)})² {pp(b, 'merge_op')} · ({pp(xb)}) − {data.c}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {pp(xb * xb)} {pp(b * xb, 'merge_op')} − {data.c}
                </>,
              ],
              [<></>, <>=</>, <>{pp(yb)}</>],
            ])}
            <p>
              Damit lautet der Punkt B({pp(xb)}|{pp(yb)}).
            </p>
            <p>
              <strong>Flächeninhalt des Dreiecks ABC</strong>
            </p>
            <svg viewBox="0 0 328 130">
              <image
                href="/content/BW_Realschule/230_Dreieck.jpg"
                height="130"
                width="328"
              />
              <text
                x={270}
                y={30}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                A({data.ax}|{data.ay})
              </text>
              <text
                x={30}
                y={30}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                B({pp(xb)}|{pp(yb)})
              </text>
              <text
                x={195}
                y={128}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                C(0|{pp(-data.c)})
              </text>
              <text
                x={160}
                y={10}
                fontSize={14}
                textAnchor="right"
                stroke="black"
              >
                {pp(data.ax - xb)}
              </text>
              <text
                x={172}
                y={70}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {data.ay + data.c}
              </text>
            </svg>
            <p>
              Die Punkte ABC ergeben ein Dreieck. Die Grundlinie hat eine Länge
              von {pp(data.ax - xb)} [LE].
            </p>
            <p>
              Die Höhe des Dreiecks hat eine Länge von {data.ay + data.c} [LE].
            </p>
            <p>Berechne damit den Flächeninhalt:</p>
            {buildEquation([
              [<>A</>, <>=</>, <>{buildInlineFrac(<>g · h</>, <>2</>)}</>],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>
                      {pp(data.ax - xb)} · {data.ay + data.c}
                    </>,
                    <>2</>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <strong>
                    {pp(((data.ax - xb) * (data.ay + data.c)) / 2)} [FE]
                  </strong>
                </>,
              ],
            ])}
            <p>
              <strong>Funktionsgleichung von g</strong>
            </p>
            <p>
              Die Gerade verläuft durch C(0|{pp(-data.c)}), wodurch sich der
              y-Achsenabschnitt ergibt:
            </p>
            <p>
              y = mx <Color1>{pp(-data.c)}</Color1>
            </p>
            <p>
              Mit der Steigung m = {data.case ? pp(m_korrekt) : pp(data.m)} ist
              die Funktionsgleichung:
            </p>
            <p>
              y = {data.case ? pp(m_korrekt) : pp(data.m)}x {pp(-data.c)}
            </p>
            <p>
              <strong>Halbierte Fläche</strong>
            </p>
            <p>
              Die Flächen der einzelnen Dreiecke könnten berechnet und
              verglichen werden.
            </p>
            <p>
              Alternativ kann auch gezeigt werden, dass die Gerade die Strecke{' '}
              {buildOverline('AB')} halbiert.{' '}
            </p>
            <p>
              Der Mittelpunkt der Strecke liegt bei <br></br>M(
              {pp(xb + (data.ax - xb) / 2)}|{pp(data.ay)}). Überprüfe, ob die
              Gerade durch diesen Punkt verläuft:
            </p>
            {buildEquation([
              [
                <>y</>,
                <>=</>,
                <>
                  {data.case ? pp(m_korrekt) : pp(data.m)}x {pp(-data.c)}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {data.case ? pp(m_korrekt) : pp(data.m)} ·{' '}
                  {pp(xb + (data.ax - xb) / 2, 'embrace_neg')} {pp(-data.c)}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {data.case
                    ? pp(m_korrekt * (xb + (data.ax - xb) / 2) - data.c)
                    : pp(data.m * (xb + (data.ax - xb) / 2) - data.c)}
                </>,
              ],
            ])}
            <p>
              Die Gerade verläuft{' '}
              {data.case ? (
                <>durch den Punkt M.</>
              ) : (
                <>nicht durch den Punkt M.</>
              )}
            </p>
            <p>
              Damit halbiert sie die Fläche des Dreiecks{' '}
              {data.case ? (
                <>und die Aussage ist korrekt</>
              ) : (
                <>nicht und die Aussage ist falsch</>
              )}
              .
            </p>
          </>
        )
      },
    },
  ],
}
