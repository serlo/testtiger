import { Exercise } from '@/data/types'
import {
  buildEquation,
  buildInlineFrac,
  buildOverline,
  buildSqrt,
} from '@/helper/math-builder'
import { pp, ppPolynom } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'
import { Yarndings_20 } from 'next/font/google'

interface DATA {
  ab: number
  af: number
  m: number
  b: number

  c1: number
}

export const exercise247: Exercise<DATA> = {
  title: 'Figuren + Funktionen',
  source: '2022 Wahlteil B - Aufgabe 1',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      ab: rng.randomIntBetween(8, 14),
      af: rng.randomIntBetween(10, 16),
      m: rng.randomItemFromArray([-2, -1, 1, 2]),
      b: rng.randomIntBetween(1, 4),
      c1: rng.randomIntBetween(4, 10),
    }
  },
  originalData: { ab: 14, af: 12, m: 1, b: 2, c1: 8 },
  constraint({ data }) {
    const p = data.m
    const q = -data.c1 + data.b
    const x1 = -p / 2 + Math.sqrt((p / 2) * (p / 2) - q)
    const x2 = -p / 2 - Math.sqrt((p / 2) * (p / 2) - q)
    const ag = roundToDigits(
      Math.sqrt(data.af * data.af - (data.ab / 2) * (data.ab / 2)),
      2,
    )
    const y1 = data.m * roundToDigits(x1, 2) + data.b
    const y2 = data.m * roundToDigits(x2, 2) + data.b
    const b = (y1 - y2 - (x1 * x1 - x2 * x2)) / (x1 - x2)
    return ag + 2 < data.ab && x1 % 1 == 0 && x2 % 1 == 0 && b % 1 == 0
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
              Im Quadrat ABCD liegen die beiden gleichschenkligen Dreiecke ABF
              und DEF.
            </p>
            <svg viewBox="0 0 328 190">
              <image
                href="/content/BW_Realschule/247_Figur.jpg"
                height="190"
                width="328"
              />
            </svg>
            <p>Es gilt:</p>
            <p>
              {buildOverline('AB')} = {data.ab} cm<br></br>
              {buildOverline('AF')} = {data.af} cm<br></br>
              {buildOverline('AF')} = {buildOverline('BF')}
              <br></br>
              {buildOverline('EF')} = {buildOverline('DF')}
              <br></br>
            </p>
            <ul>
              <li>Berechne den Flächeninhalt des Dreiecks AFE.</li>
              <li>Berechne den Winkel ε.</li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const ag = roundToDigits(
          Math.sqrt(data.af * data.af - (data.ab / 2) * (data.ab / 2)),
          2,
        )
        const ge = roundToDigits(data.ab - ag, 2)
        const ae = ag - ge
        const alpha = roundToDigits(
          (360 * Math.atan(ge / (data.ab / 2))) / (2 * Math.PI),
          2,
        )
        const alphaepsilon = roundToDigits(
          (360 * Math.atan(ag / (data.ab / 2))) / (2 * Math.PI),
          2,
        )
        return (
          <>
            <p>
              <strong>Fläche von AFE</strong>
            </p>
            <p>
              Berechne zuerst die Höhe {buildOverline('GF')} und die Länge{' '}
              {buildOverline('AE')}.
            </p>
            <svg viewBox="0 0 328 210">
              <image
                href="/content/BW_Realschule/247_Figur2.jpg"
                height="210"
                width="328"
              />
            </svg>
            <p>
              Die Höhe {buildOverline('GF')} entspricht genau der halben Strecke
              AB:
            </p>
            <p>
              {buildOverline('GF')} = {buildOverline('AB')} : 2 = {data.ab} cm :
              2 = {pp(data.ab / 2)} cm
            </p>
            <p>
              Im rechtwinkligen Dreieck AFG lässt sich die Länge{' '}
              {buildOverline('AG')} mit dem Satz des Pythagoras berechnen:
            </p>
            <div>
              <span style={{ fontSize: '0.8em' }}>
                {buildEquation([
                  [
                    <>{buildOverline('AF')}²</>,
                    <>=</>,
                    <>
                      {buildOverline('AG')}² + {buildOverline('GF')}²
                    </>,
                  ],
                  [
                    <>({pp(data.af)} cm)²</>,
                    <>=</>,
                    <>
                      {buildOverline('AG')}² + ({pp(data.ab / 2)} cm)²
                    </>,
                    <>| − ({pp(data.ab / 2)} cm)²</>,
                  ],
                  [
                    <>{buildOverline('AG')}²</>,
                    <>=</>,
                    <>
                      ({pp(data.af)} cm)² − ({pp(data.ab / 2)} cm)²
                    </>,
                    <>| √</>,
                  ],
                  [<>{buildOverline('AG')}</>, <>≈</>, <>{pp(ag)} cm</>],
                ])}
              </span>
            </div>
            <p>Berechne damit {buildOverline('DG')}:</p>
            {buildEquation([
              [
                <>{buildOverline('DG')}</>,
                <>=</>,
                <>
                  {buildOverline('AD')} − {buildOverline('AG')}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {pp(data.ab)} cm − {pp(ag)} cm
                </>,
              ],
              [<></>, <>=</>, <>{pp(ge)} cm</>],
            ])}

            <p>Damit ist {buildOverline('AE')}:</p>
            {buildEquation([
              [
                <>{buildOverline('AE')}</>,
                <>=</>,
                <>
                  {buildOverline('AG')} − {buildOverline('GE')}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {pp(ag)} cm − {pp(ge)} cm
                </>,
              ],
              [<></>, <>=</>, <>{pp(ae)} cm</>],
            ])}
            <p>Berechne die Dreiecksfläche:</p>
            {buildEquation([
              [
                <>A</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>
                      {buildOverline('AE')} · {buildOverline('GF')}
                    </>,
                    <>2</>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>
                      {pp(ae)} cm · {pp(data.ab / 2)} cm
                    </>,
                    <>2</>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <strong>{pp((ae * (data.ab / 2)) / 2)} cm²</strong>
                </>,
              ],
            ])}
            <p>
              <strong>ε berechnen</strong>
            </p>
            <p>Bestimme die Größe von α im rechtwinkligen Dreieck EFG:</p>
            {buildEquation([
              [
                <>tan(α)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildOverline('GE')}</>,
                    <>{buildOverline('GF')}</>,
                  )}
                </>,
              ],
              [
                <>tan(α)</>,
                <>=</>,
                <>
                  {buildInlineFrac(<>{pp(ge)} cm</>, <>{pp(data.ab / 2)} cm</>)}
                </>,
                <>
                  | tan<sup>-1</sup>()
                </>,
              ],
              [<>α</>, <>≈</>, <>{pp(alpha)}°</>],
            ])}
            <p>
              Mit der gleichen Rechnung kann im rechtwinkligen Dreieck AFG der
              zusammengesetzte Winkel α + ε berechnet werden:
            </p>
            {buildEquation([
              [
                <>tan(α + ε)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildOverline('AG')}</>,
                    <>{buildOverline('GF')}</>,
                  )}
                </>,
              ],
              [
                <>tan(α + ε)</>,
                <>=</>,
                <>
                  {buildInlineFrac(<>{pp(ag)} cm</>, <>{pp(data.ab / 2)} cm</>)}
                </>,
                <>
                  | tan<sup>-1</sup>()
                </>,
              ],
              [<>α + ε</>, <>≈</>, <>{pp(alphaepsilon)}°</>],
            ])}
            <p>Berechne damit ε:</p>
            <p>
              ε = {pp(alphaepsilon)}° − {pp(alpha)}° ={' '}
              <strong>{pp(alphaepsilon - alpha)}°</strong>
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
              Die Gerade g hat die Funktionsgleichung <br></br>y ={' '}
              {ppPolynom([
                [data.m, 'x', 1],
                [data.b, 'x', 0],
              ])}{' '}
              .
            </p>
            <p>
              Die Parabel p<sub>1</sub> hat die Funktionsgleichung <br></br>y =
              −x² + {data.c1}.
            </p>
            <p>
              Die Parabel p<sub>1</sub> schneidet die Gerade g in den Punkten P
              und Q.
            </p>
            <ul>
              <li>Berechne die Koordinaten der Schnittpunkte P und Q.</li>
            </ul>
            <p>
              Durch die beiden Schnittpunkte P und Q verläuft die verschobene
              nach oben geöffnete Normalparabel p<sub>2</sub>.
            </p>
            <ul>
              <li>
                Berechne die Koordinaten des Scheitelpunkts S<sub>2</sub> von p
                <sub>2</sub>.
              </li>
            </ul>
            <p>
              Robin behauptet: {'"'}Das Dreieck mit den Punkten P und Q und S
              <sub>2</sub> ist rechtwinklig.{'"'}{' '}
            </p>
            <ul>
              <li>Hat Robin Recht? Begründe deine Antwort rechnerisch.</li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const p = data.m
        const q = -data.c1 + data.b
        const x1 = -p / 2 + Math.sqrt((p / 2) * (p / 2) - q)
        const x2 = -p / 2 - Math.sqrt((p / 2) * (p / 2) - q)
        const y1 = data.m * roundToDigits(x1, 2) + data.b
        const y2 = data.m * roundToDigits(x2, 2) + data.b
        const b = (y1 - y2 - (x1 * x1 - x2 * x2)) / (x1 - x2)
        const s1 = -b / 2
        const s2 = y1 - (x1 * x1 + x1 * b) - Math.abs(b / 2) * Math.abs(b / 2)
        const dpq = (y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1)
        const dps = (s2 - y1) * (s2 - y1) + (s1 - x1) * (s1 - x1)
        const dqs = (y2 - s2) * (y2 - s2) + (x2 - s2) * (x2 - s2)
        const seiten = [dpq, dps, dqs].sort((a, b) => a - b)
        return (
          <>
            <p>
              <strong>
                Schnittpunkte von p<sub>1</sub> und g
              </strong>
            </p>

            <p>
              Setze die Funktionsterme der Parabel und Geraden gleich und
              berechne die Stellen x<sub>1/2</sub> der Schnittpunkte:
            </p>
            {buildEquation([
              [
                <>
                  {ppPolynom([
                    [-1, 'x', 2],

                    [data.c1, 'x', 0],
                  ])}
                </>,
                <>=</>,
                <>
                  {ppPolynom([
                    [data.m, 'x', 1],
                    [data.b, 'x', 0],
                  ])}
                </>,
                <>
                  | {pp(-data.m, 'merge_op')}x | − {data.b}
                </>,
              ],
              [
                <>
                  {ppPolynom([
                    [-1, 'x', 2],
                    [-data.m, 'x', 1],
                    [data.c1 - data.b, 'x', 0],
                  ])}
                </>,
                <>=</>,
                <>0</>,
                <>| · (−1)</>,
              ],
              [
                <>
                  {ppPolynom([
                    [1, 'x', 2],
                    [data.m, 'x', 1],
                    [-data.c1 + data.b, 'x', 0],
                  ])}
                </>,
                <>=</>,
                <>0</>,
              ],
            ])}
            <p>
              Das ist eine quadratische Gleichung. Bestimme die Lösungen
              mithilfe der pq-Formel:
            </p>
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

            <p>
              x<sub>1</sub> = {pp(roundToDigits(x1, 2))}
            </p>
            <p>
              x<sub>2</sub> = {pp(roundToDigits(x2, 2))}
            </p>

            <p>
              Setze die Stellen in eine der Funktionen ein und bestimme die
              y-Werte der Schnittpunkte:
            </p>
            <p>
              y<sub>1</sub> = {pp(data.m)} ·{' '}
              {pp(roundToDigits(x1, 2), 'embrace_neg')} + {data.b} = {pp(y1)}
            </p>
            <p>
              y<sub>2</sub> = {pp(data.m)} ·{' '}
              {pp(roundToDigits(x2, 2), 'embrace_neg')} + {data.b} = {pp(y2)}
            </p>
            <p>Die Schnittpunkte sind damit:</p>
            <p>
              <strong>
                P({pp(x1)}|{pp(y1)}) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Q(
                {pp(x2)}|{pp(y2)})
              </strong>
            </p>
            <p>
              <strong>
                Funktionsgleichung von p<sub>2</sub>
              </strong>
            </p>
            <p>
              Die Parabel p<sub>2</sub> verläuft durch die Punkte P(
              {pp(x1)}|{pp(y1)}) und Q({pp(x2)}|{pp(y2)}
              ).
            </p>
            <p>
              Setze die Punkte jeweils in die allgemeine Form y = x² + bx + c
              ein:
            </p>
            <p>
              I &nbsp;&nbsp;&nbsp; {pp(y1)} = {pp(x1, 'embrace_neg')}² + b ·{' '}
              {pp(x1, 'embrace_neg')} + c<br></br>II &nbsp;&nbsp;&nbsp; {pp(y2)}{' '}
              = {pp(x2, 'embrace_neg')}² + b · {pp(x2, 'embrace_neg')} + c
            </p>
            <p>
              Die Gleichungen I und II beschreiben ein lineares
              Gleichungssystem. Löse es, um die Parameter b und c der Parabel zu
              bestimmen:
            </p>
            <p>
              I &nbsp;&nbsp;&nbsp; {pp(y1)} = {pp(x1 * x1)} {pp(x1, 'merge_op')}
              b + c<br></br>II &nbsp;&nbsp;&nbsp; {pp(y2)} = {pp(x2 * x2)}{' '}
              {pp(x2, 'merge_op')}b + c
            </p>
            <p>
              Subtrahiere die Gleichungen voneinander, um c aus dem Gleichungen
              zu entfernen:
            </p>
            <p>
              I - II: {pp(y1)} − {pp(y2)} = {pp(x1 * x1)} − {pp(x2 * x2)}{' '}
              {pp(x1, 'merge_op')}b {pp(-x2, 'merge_op')}b
            </p>
            <p>Fasse die Terme zusammen und löse die Gleichung nach b:</p>
            {buildEquation([
              [
                <>{pp(y1 - y2)}</>,
                <>=</>,
                <>
                  {pp(x1 * x1 - x2 * x2)} {pp(x1 - x2, 'merge_op')}b
                </>,
                <>| {pp(-(x1 * x1 - x2 * x2), 'merge_op')}</>,
              ],
              [
                <>{pp(y1 - y2 - (x1 * x1 - x2 * x2))}</>,
                <>=</>,
                <>{pp(x1 - x2)}b</>,
                <>| : {pp(x1 - x2, 'embrace_neg')}</>,
              ],
              [
                <>b</>,
                <>=</>,
                <>{pp((y1 - y2 - (x1 * x1 - x2 * x2)) / (x1 - x2))}</>,
              ],
            ])}
            <p>
              Sezte den Wert für b in eine der Gleichungen ein. In I eingesetzt:
            </p>
            {buildEquation([
              [
                <>{pp(y1)} </>,
                <>=</>,
                <>
                  {pp(x1 * x1)} {pp(x1, 'merge_op')} · {pp(b, 'embrace_neg')} +
                  c
                </>,
              ],
              [
                <>{pp(y1)}</>,
                <>=</>,
                <>{pp(x1 * x1 + x1 * b)} + c</>,
                <>| {pp(-(x1 * x1 + x1 * b), 'merge_op')}</>,
              ],
              [<>c</>, <>=</>, <>{pp(y1 - (x1 * x1 + x1 * b))}</>],
            ])}
            <p>Damit lautet der Funktionsterm:</p>
            <p>
              y = x² {pp(b, 'merge_op')}x{' '}
              {pp(y1 - (x1 * x1 + x1 * b), 'merge_op')}
            </p>
            <p>Bestimme die Scheitelform mit einer quadratischen Ergänzung:</p>
            {buildEquation([
              [
                <>y</>,
                <>=</>,
                <>
                  x² {pp(b, 'merge_op')}x{' '}
                  {pp(y1 - (x1 * x1 + x1 * b), 'merge_op')}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  x² {pp(b, 'merge_op')}x + {pp(Math.abs(b / 2))}²{' '}
                  {pp(y1 - (x1 * x1 + x1 * b), 'merge_op')} −{' '}
                  {pp(Math.abs(b / 2))}²
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  (x {pp(s1, 'merge_op')})² {pp(s2, 'merge_op')}
                </>,
              ],
            ])}
            <p>
              Damit lautet der Scheitelpunkt:{' '}
              <strong>
                S<sub>2</sub>({pp(s1)}|{pp(s2)})
              </strong>
            </p>
            <p>
              <strong>Rechtwinkliges Dreieck</strong>
            </p>
            <p>
              Die Seitenlängen im rechtwinkligen Dreieck müssen den Satz des
              Pythagoras erfüllen. Berechne zuerst die Seitenlängen:
            </p>
            {buildEquation([
              [
                <>{buildOverline('PQ')}</>,
                <>=</>,
                <>
                  {buildSqrt(
                    <>
                      (y<sub>Q</sub> − y<sub>P</sub>)² + (x<sub>Q</sub> − x
                      <sub>P</sub>)²
                    </>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildSqrt(
                    <>
                      ({pp(y2)} − {pp(y1, 'embrace_neg')})² + ({pp(x2)} −{' '}
                      {pp(x1, 'embrace_neg')})²
                    </>,
                  )}
                </>,
              ],
              [<></>, <>=</>, <>{buildSqrt(dpq)} [LE]</>],
            ])}
            {buildEquation([
              [
                <>{buildOverline('PS')}</>,
                <>=</>,
                <>
                  {buildSqrt(
                    <>
                      (y<sub>S</sub> − y<sub>P</sub>)² + (x<sub>S</sub> − x
                      <sub>P</sub>)²
                    </>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildSqrt(
                    <>
                      ({pp(s2)} − {pp(y1, 'embrace_neg')})² + ({pp(s1)} −{' '}
                      {pp(x1, 'embrace_neg')})²
                    </>,
                  )}
                </>,
              ],
              [<></>, <>=</>, <>{buildSqrt(dps)} [LE]</>],
            ])}
            {buildEquation([
              [
                <>{buildOverline('QS')}</>,
                <>=</>,
                <>
                  {buildSqrt(
                    <>
                      (y<sub>S</sub> − y<sub>Q</sub>)² + (x<sub>S</sub> − x
                      <sub>Q</sub>)²
                    </>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildSqrt(
                    <>
                      ({pp(s2)} − {pp(y2, 'embrace_neg')})² + ({pp(s1)} −{' '}
                      {pp(x2, 'embrace_neg')})²
                    </>,
                  )}
                </>,
              ],
              [<></>, <>=</>, <>{buildSqrt(dqs)} [LE]</>],
            ])}
            <p>
              Setze die Seitenlängen in den Satz des Pythagoras ein. Die längste
              Seite müsste der Hypotenuse im Dreieck entsprechen:
            </p>
            {buildEquation([
              [
                <>
                  {buildSqrt(seiten[0])}² + {buildSqrt(seiten[1])}²
                </>,
                <>=</>,
                <>{buildSqrt(seiten[2])}²</>,
              ],
              [
                <>
                  {seiten[0]} + {seiten[1]}
                </>,
                <>{seiten[0] + seiten[1] == seiten[2] ? '=' : '≠'}</>,
                <>{seiten[2]}</>,
              ],
            ])}
            <p>
              {seiten[0] + seiten[1] == seiten[2] ? (
                <>Damit ist das Dreieck rechtwinklig.</>
              ) : (
                <>
                  Damit ist das Dreieck <strong>nicht</strong> rechtwinklig.
                </>
              )}
            </p>
          </>
        )
      },
    },
  ],
}
