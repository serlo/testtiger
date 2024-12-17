import { Exercise } from '@/data/types'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp, ppPolynom } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  m: number
  b: number
  höhe: number
  s: number
  delta: number
}

export const exercise214: Exercise<DATA> = {
  title: 'Funktionen + Zusammengesetzter Körper',
  source: '2024 Wahlteil - B Aufgabe 2',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      m: rng.randomIntBetween(-3, -1) / 2,
      b: rng.randomIntBetween(-9, -3) / 2,
      höhe: rng.randomItemFromArray([9, 16, 25]),
      s: rng.randomIntBetween(100, 150) / 10,
      delta: rng.randomIntBetween(18, 25) * 2,
    }
  },
  originalData: { m: -1, b: -3, höhe: 16, s: 14.4, delta: 42 },
  constraint({ data }) {
    const b =
      ((-data.b / data.m) * (-data.b / data.m) + data.b) / (data.b / data.m)
    return (
      ((-data.b / data.m) % 1 == 0 || ((-2 * data.b) / data.m) % 1 == 0) &&
      b % 1 == 0
    )
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
        const b =
          ((-data.b / data.m) * (-data.b / data.m) + data.b) / (data.b / data.m)
        const scheitel = data.b - (b / 2) * (b / 2)
        return (
          <>
            <p>
              Die Gerade g hat die Funktionsgleichung y ={' '}
              {ppPolynom([[data.m, 'x', 1]])} {data.b > 0 && '+ '}
              {ppPolynom([[data.b, 'x', 0]])}
            </p>
            <p>
              Sie schneidet die x-Achse im Punkt A und die y-Achse im Punkt B.
            </p>
            <ul>
              <li>Bestimme die Koordinaten der Punkte A und B.</li>
            </ul>
            <p>
              Durch die Punkte A und B verläuft die nach oben geöffnete
              verschobene Normalparabel p.
            </p>
            <ul>
              <li>
                Berechne die Funktionsgleichung der Parabel p und die
                Koordinaten ihres Scheitelpunktes S.
              </li>
            </ul>
            <p>
              Die beiden Punkte P(x<sub>P</sub>|{pp(scheitel + data.höhe)}) und
              Q(x<sub>Q</sub>|{pp(scheitel + data.höhe)}) liegen auf der Parabel
              p. Sie bilden zusammen mit dem Scheitelpunkt S das Dreieck PSQ.
            </p>
            <ul>
              <li>Berechne den Flächeninhalt des Dreiecks PSQ.</li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const b =
          ((-data.b / data.m) * (-data.b / data.m) + data.b) / (data.b / data.m)
        const scheitel = data.b - (b / 2) * (b / 2)
        return (
          <>
            <p>
              <strong>Punkte A und B</strong>
            </p>
            <p>
              Die Gerade ist gegeben durch den Funktionsterm y ={' '}
              {ppPolynom([[data.m, 'x', 1]])} {data.b > 0 && '+ '}
              {ppPolynom([[data.b, 'x', 0]])}.
            </p>
            <p>
              Am y-Achsenabschnitt b = {pp(data.b)} kann der Punkt B bestimmt
              werden: <strong>B(0|{pp(data.b)})</strong>
            </p>
            <p>Setze die Funktion gleich null und bestimme die Nullstelle:</p>
            {buildEquation([
              [
                <>0</>,
                <>=</>,
                <>
                  {ppPolynom([[data.m, 'x', 1]])} {data.b > 0 && '+ '}
                  {ppPolynom([[data.b, 'x', 0]])}
                </>,
                <>| {pp(-data.b, 'merge_op')}</>,
              ],
              [
                <>{pp(-data.b)}</>,
                <>=</>,
                <>{ppPolynom([[data.m, 'x', 1]])}</>,
                <>| : ({pp(data.m)})</>,
              ],
              [<>x</>, <>=</>, <>{pp(-data.b / data.m)}</>],
            ])}
            <p>
              Damit ist der Schnittpunkt mit der x-Achse{' '}
              <strong>
                A(
                {pp(-data.b / data.m)}|0)
              </strong>
              .
            </p>
            <p>
              <strong>Funktionsgleichung der Parabel p</strong>
            </p>
            <p>Allgemein kann der Funktionsterm geschrieben werden als:</p>
            <p>p : y = x² + bx + c</p>
            <p>Die Parabel verläuft durch B(0|{pp(data.b)}):</p>
            {buildEquation([
              [<>y</>, <>=</>, <>x² + bx + c</>],
              [<>{pp(data.b)}</>, <>=</>, <>0² + b · 0 + c</>],
              [<>c</>, <>=</>, <>{pp(data.b)}</>],
            ])}
            <p>
              Setze den Punkt A({pp(-data.b / data.m)}|0) in die
              Funktionsgleichung y = x² + bx {pp(data.b)} ein und bestimme b:
            </p>
            {buildEquation([
              [<>y</>, <>=</>, <>x² + bx {pp(data.b)}</>],
              [
                <>0</>,
                <>=</>,
                <>
                  ({pp(-data.b / data.m)})² + b · ({pp(-data.b / data.m)}){' '}
                  {pp(data.b)}
                </>,
              ],
              [
                <>0</>,
                <>=</>,
                <>
                  {pp((-data.b / data.m) * (-data.b / data.m))}
                  {ppPolynom([[-data.b / data.m, 'b', 1]])} {pp(data.b)}
                </>,
                <>
                  | {data.b / data.m > 0 && '+ '}
                  {ppPolynom([[data.b / data.m, 'b', 1]])}
                </>,
              ],
            ])}
            {data.b / data.m == 1 && (
              <>
                {buildEquation([
                  [
                    <>{ppPolynom([[data.b / data.m, 'b', 1]])}</>,
                    <>=</>,
                    <>{pp((-data.b / data.m) * (-data.b / data.m) + data.b)}</>,
                  ],
                  [<></>, <></>, <></>],
                  [<></>, <></>, <></>],
                ])}
              </>
            )}
            {data.b / data.m != 1 && (
              <>
                {buildEquation([
                  [
                    <>{ppPolynom([[data.b / data.m, 'b', 1]])}</>,
                    <>=</>,
                    <>{pp((-data.b / data.m) * (-data.b / data.m) + data.b)}</>,
                    <>| : {data.b / data.m}</>,
                  ],
                  [
                    <>b</>,
                    <>=</>,
                    <>
                      {pp(
                        ((-data.b / data.m) * (-data.b / data.m) + data.b) /
                          (data.b / data.m),
                      )}
                    </>,
                  ],
                ])}
              </>
            )}
            <p>
              Damit ist die Funktionsgleichung<br></br>{' '}
              <strong>
                p : y = x² {b > 0 && '+ '} {ppPolynom([[b, 'x', 1]])}{' '}
                {pp(data.b)}
              </strong>
            </p>
            <p>
              Forme die Gleichung um in die Scheitelpunktform, um den Scheitel
              abzulesen:
            </p>
            {buildEquation([
              [
                <>y</>,
                <>=</>,
                <>
                  x² {b > 0 && '+ '} {ppPolynom([[b, 'x', 1]])} {pp(data.b)}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  x² {b > 0 && '+ '} {ppPolynom([[b, 'x', 1]])} + ({pp(b / 2)})²{' '}
                  {pp(data.b)} − ({pp(b / 2)})²
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  (x + {pp(b / 2)})² {pp(data.b - (b / 2) * (b / 2))}
                </>,
              ],
            ])}
            <p>
              Der Scheitelpunkt lautet:{' '}
              <strong>
                S({pp(-b / 2)}|{pp(data.b - (b / 2) * (b / 2))})
              </strong>
            </p>
            <p>
              <strong>Flächeninhalt des Dreiecks</strong>
            </p>
            <p>
              Die Punkte P(x<sub>P</sub>|{pp(scheitel + data.höhe)}) und Q(x
              <sub>Q</sub>|{pp(scheitel + data.höhe)}) liegen genau {data.höhe}{' '}
              Einheiten oberhalb des Scheitelpunkts.
            </p>
            <p>
              Damit ist die Höhe des Dreiecks bereits bestimmt: h = {data.höhe}{' '}
              [LE]
            </p>
            <svg viewBox="0 0 328 250">
              <image
                href="/content/BW_Realschule/214_Parabel.jpg"
                height="250"
                width="328"
              />
              <text
                x={250}
                y={40}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                Q(x
                <sub>Q</sub>|{pp(scheitel + data.höhe)})
              </text>
              <text
                x={10}
                y={40}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                P(x
                <sub>P</sub>|{pp(scheitel + data.höhe)})
              </text>

              <text
                x={113}
                y={240}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                S({pp(-b / 2)}|{pp(data.b - (b / 2) * (b / 2))})
              </text>
              <text
                x={150}
                y={130}
                fontSize={15}
                textAnchor="right"
                stroke="blue"
              >
                h = {data.höhe}
              </text>
              <text
                x={195}
                y={30}
                fontSize={15}
                textAnchor="right"
                stroke="orange"
              >
                {Math.sqrt(data.höhe)}
              </text>
              <text
                x={125}
                y={30}
                fontSize={15}
                textAnchor="right"
                stroke="orange"
              >
                {Math.sqrt(data.höhe)}
              </text>
              <line
                x1={163}
                y1={34}
                x2={163}
                y2={215}
                stroke="blue"
                strokeWidth={2}
              />
              <line
                x1={87}
                y1={34}
                x2={237}
                y2={34}
                stroke="orange"
                strokeWidth={2}
              />
              <line
                x1={87}
                y1={34}
                x2={163}
                y2={215}
                stroke="black"
                strokeWidth={2}
              />
              <line
                x1={237}
                y1={34}
                x2={163}
                y2={215}
                stroke="black"
                strokeWidth={2}
              />
            </svg>
            <p>
              Bei einer Normalparabel müssen vom Scheitelpunkt{' '}
              {Math.sqrt(data.höhe)} Einheiten nach rechts und links gegangen
              werden, um in einer Höhe von {data.höhe} Einheiten Punkte
              vorzufinden.
            </p>
            <p>
              Ausgehend von der Scheitelpunktkoordinate x<sub>s</sub> ={' '}
              {pp(-b / 2)} lauten die Punkte:<br></br> P(
              {pp(-b / 2 - Math.sqrt(data.höhe))}|{pp(scheitel + data.höhe)})
              und Q({pp(-b / 2 + Math.sqrt(data.höhe))}|
              {pp(scheitel + data.höhe)})
            </p>
            <p>
              Die Grundlinie des Dreiecks hat damit eine Länge von 2 ·{' '}
              {Math.sqrt(data.höhe)} = {2 * Math.sqrt(data.höhe)} [LE]
            </p>
            <p>Der Flächeninhalt beträgt damit:</p>
            {buildEquation([
              [<>A</>, <>=</>, <>{buildInlineFrac(<>g · h</>, 2)}</>],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>
                      {2 * Math.sqrt(data.höhe)} · {data.höhe}
                    </>,
                    2,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <strong>{Math.sqrt(data.höhe) * data.höhe} [FE]</strong>
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
              Die Abbildung zeigt den Achsenschnitt eines zusammengesetzten
              Körpers und den Parallelschnitt einer quadratischen Pyramide. Der
              zusammengesetzte Körper besteht aus einer Halbkugel und einem
              Kegel.{' '}
            </p>
            <svg viewBox="0 0 328 130">
              <image
                href="/content/BW_Realschule/214_Querschnitt.jpg"
                height="130"
                width="328"
              />
            </svg>
            <p>Es gilt:</p>
            <p>
              s = {pp(data.s)} cm<br></br>δ = {data.delta}°<br></br>h
              <sub>ges</sub> = h<sub>Pyr</sub>
            </p>
            <p>
              Der Durchmesser d des zusammengesetzten Körpers ist genauso lang
              wie die Grundkante a der quadratischen Pyramide.
            </p>
            <ul>
              <li>
                Berechne die Differenz der Oberflächeninhalte der beiden Körper.
              </li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const r = Math.sin((Math.PI * data.delta) / 360) * data.s
        const h_dreieck = Math.sqrt(
          roundToDigits(
            Math.cos((data.delta * Math.PI) / 360) * data.s +
              roundToDigits(r, 2),
            2,
          ) *
            roundToDigits(
              Math.cos((data.delta * Math.PI) / 360) * data.s +
                roundToDigits(r, 2),
              2,
            ) +
            roundToDigits(r, 2) * roundToDigits(r, 2),
        )
        const O_kegel =
          roundToDigits(
            roundToDigits(r, 2) * roundToDigits(r, 2) * 2 * Math.PI,
            2,
          ) + roundToDigits(data.s * Math.PI * roundToDigits(r, 2), 2)
        const O_pyr = roundToDigits(
          roundToDigits(2 * r, 2) * roundToDigits(2 * r, 2) +
            2 * roundToDigits(2 * r, 2) * roundToDigits(h_dreieck, 2),
          2,
        )
        return (
          <>
            <p>
              Für die Differenz werden beide Oberflächen der Körper benötigt.
            </p>
            <p>
              <strong>Oberfläche des zusammengesetzten Körpers</strong>
            </p>
            <p>
              Die Oberfläche besteht aus der Mantelfläche des Kegels und der
              Oberfläche der Halbkugel.
            </p>
            <p>
              Für beide Flächen wird der Radius benötigt, der im rechtwinkligen
              Dreieck berechnet werden kann:
            </p>
            {buildEquation([
              [
                <>
                  sin<span className="inline-block  scale-y-[2]">(</span>
                  {buildInlineFrac('δ', 2)}
                  <span className="inline-block  scale-y-[2]">)</span>
                </>,
                <>=</>,
                <>{buildInlineFrac('r', 's')}</>,
              ],
              [
                <>
                  sin<span className="inline-block  scale-y-[2]">(</span>
                  {buildInlineFrac(<>{data.delta}°</>, 2)}
                  <span className="inline-block  scale-y-[2]">)</span>
                </>,
                <>=</>,
                <>{buildInlineFrac('r', <>{pp(data.s)} cm</>)}</>,
                <>| · {pp(data.s)} cm</>,
              ],
              [
                <>r</>,
                <>=</>,
                <>
                  sin({data.delta / 2}°) · {pp(data.s)} cm
                </>,
              ],
              [<>r</>, <>≈</>, <>{pp(roundToDigits(r, 2))} cm</>],
            ])}
            <p>Berechne damit die Mantelfläche und Oberfläche der Halbkugel:</p>
            {buildEquation([
              [<>M</>, <>=</>, <>π · r · s</>],
              [
                <></>,
                <>=</>,
                <>
                  π · {pp(roundToDigits(r, 2))} cm · {pp(data.s)} cm
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  {pp(roundToDigits(data.s * Math.PI * roundToDigits(r, 2), 2))}{' '}
                  cm²
                </>,
              ],
            ])}{' '}
            {buildEquation([
              [
                <>
                  O<sub>Halbkugel</sub>
                </>,
                <>=</>,
                <>{buildInlineFrac(<>4 · π · r²</>, <>2</>)}</>,
              ],
              [<></>, <>=</>, <>2 · π · {pp(roundToDigits(r, 2))}²</>],
              [
                <></>,
                <>≈</>,
                <>
                  {pp(
                    roundToDigits(
                      roundToDigits(r, 2) * roundToDigits(r, 2) * 2 * Math.PI,
                      2,
                    ),
                  )}{' '}
                  cm²
                </>,
              ],
            ])}
            <p>
              Damit beträgt die Oberfläche insgesamt: <br></br>
              {buildEquation([
                [
                  <>
                    O<sub>Gesamt</sub>
                  </>,
                  <>=</>,
                  <>
                    M + O<sub>Halbkugel</sub>
                  </>,
                ],
                [
                  <></>,
                  <>=</>,
                  <>
                    {pp(
                      roundToDigits(data.s * Math.PI * roundToDigits(r, 2), 2),
                    )}{' '}
                    cm² +{' '}
                    {pp(
                      roundToDigits(
                        roundToDigits(r, 2) * roundToDigits(r, 2) * 2 * Math.PI,
                        2,
                      ),
                    )}{' '}
                    cm²
                  </>,
                ],
                [
                  <></>,
                  <>=</>,
                  <>
                    <strong>
                      {pp(
                        roundToDigits(
                          roundToDigits(r, 2) *
                            roundToDigits(r, 2) *
                            2 *
                            Math.PI,
                          2,
                        ) +
                          roundToDigits(
                            data.s * Math.PI * roundToDigits(r, 2),
                            2,
                          ),
                      )}{' '}
                      cm²{' '}
                    </strong>
                  </>,
                ],
              ])}
            </p>
            <p>
              <strong>Oberfläche der Pyramide</strong>
            </p>
            <p>
              Für die Oberfläche der quadratischen Pyramide wird die Grundfläche
              G = a² benötigt und 4 dreieckige Seitenflächen.
            </p>
            <p>Berechne a aus dem Radius des linken Körpers:</p>
            <p>a = 2 · r = {pp(roundToDigits(2 * r, 2))} cm</p>
            <p>
              Um die Seitenflächen zu berechnen, wird die Höhe des Dreiecks
              benötigt, die mit der Höhe der Pyramide berechnet werden kann.{' '}
            </p>
            <p>Berechne die Höhe der Pyramide mithilfe des linken Körpers:</p>
            {buildEquation([
              [
                <>
                  h<sub>Pyr</sub>
                </>,
                <>=</>,
                <>
                  h<sub>Kegel</sub> + r
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  cos({pp(data.delta / 2)}°) · {pp(data.s)} cm +{' '}
                  {pp(roundToDigits(r, 2))} cm
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  {pp(
                    roundToDigits(
                      Math.cos((data.delta * Math.PI) / 360) * data.s +
                        roundToDigits(r, 2),
                      2,
                    ),
                  )}{' '}
                  cm
                </>,
              ],
            ])}
            <p>Berechne mithilfe der Höhe die Höhe des Dreiecks:</p>
            {buildEquation([
              [
                <>
                  h<sub>Dreieck</sub>
                </>,
                <>=</>,
                <>
                  {buildSqrt(
                    <>
                      h² + <span className="inline-block  scale-y-[2]">(</span>
                      {buildInlineFrac(<>a</>, <>2</>)}
                      <span className="inline-block  scale-y-[2]">)</span>²
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
                      (
                      {pp(
                        roundToDigits(
                          Math.cos((data.delta * Math.PI) / 360) * data.s +
                            roundToDigits(r, 2),
                          2,
                        ),
                      )}{' '}
                      cm)² +{' '}
                      <span className="inline-block  scale-y-[2]">(</span>
                      {buildInlineFrac(
                        <>{pp(roundToDigits(2 * r, 2))} cm</>,
                        <>2</>,
                      )}
                      <span className="inline-block  scale-y-[2]">)</span>²
                    </>,
                  )}
                </>,
              ],
              [<></>, <>≈</>, <>{pp(roundToDigits(h_dreieck, 2))} cm</>],
            ])}
            <p>Damit lässt sich die Oberfläche der Pyramide berechnen:</p>
            {buildEquation([
              [
                <>O</>,
                <>=</>,
                <>
                  a² + 4 ·{' '}
                  {buildInlineFrac(
                    <>
                      a · h<sub>Dreieck</sub>
                    </>,
                    <>2</>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  ({pp(roundToDigits(2 * r, 2))} cm)² + 2 ·{' '}
                  {pp(roundToDigits(2 * r, 2))} cm ·{' '}
                  {pp(roundToDigits(h_dreieck, 2))} cm
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  <strong>
                    {pp(
                      roundToDigits(
                        roundToDigits(2 * r, 2) * roundToDigits(2 * r, 2) +
                          2 *
                            roundToDigits(2 * r, 2) *
                            roundToDigits(h_dreieck, 2),
                        2,
                      ),
                    )}{' '}
                    cm²
                  </strong>
                </>,
              ],
            ])}
            <p>
              <strong>Differenz der Oberflächen</strong>
            </p>
            <p>Berechne die Differenz:</p>
            <p>
              {pp(O_pyr)} cm² − {pp(O_kegel)} cm² ={' '}
              <strong>{pp(O_pyr - O_kegel)} cm²</strong>{' '}
            </p>
          </>
        )
      },
    },
  ],
}
