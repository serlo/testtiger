import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildOverline,
  buildSqrt,
} from '@/helper/math-builder'
import { pp, ppFrac, ppPolynom } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  ab: number
  be: number
  epsilon: number
  xs_1: number
  ys_1: number
  ns_1: number
  ns_2: number
  ax: number
  ay: number
}

export const exercise213: Exercise<DATA> = {
  title: 'Drachenviereck + Parabeln',
  source: '2024 Wahlteil B - Aufgabe 1',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      ab: rng.randomIntBetween(75, 99) / 10,
      be: rng.randomIntBetween(50, 60) / 10,
      epsilon: rng.randomIntBetween(1, 3) * 10,
      xs_1: rng.randomIntBetween(1, 5),
      ys_1: rng.randomIntBetween(1, 5),
      ns_1: rng.randomIntBetween(-8, -4),
      ns_2: rng.randomIntBetween(-3, -1),
      ax: rng.randomIntBetween(2, 4),
      ay: rng.randomIntBetween(2, 4),
    }
  },
  originalData: {
    ab: 9.4,
    be: 5.6,
    epsilon: 20,
    xs_1: 1,
    ys_1: 1,
    ns_1: -6,
    ns_2: -2,
    ax: 2,
    ay: -1,
  },
  constraint({ data }) {
    const m = (data.ay - data.ys_1) / (data.ax - data.xs_1)
    return (
      (((data.xs_1 * data.xs_1 + data.ys_1 + data.ns_1 * -data.ns_2) /
        (-data.ns_1 - data.ns_2 + 2 * data.xs_1)) %
        1 ==
        0 ||
        (2 *
          ((data.xs_1 * data.xs_1 + data.ys_1 + data.ns_1 * -data.ns_2) /
            (-data.ns_1 - data.ns_2 + 2 * data.xs_1))) %
          1 ==
          0) &&
      data.xs_1 != data.ax &&
      data.ys_1 != data.ay &&
      (m % 1 == 0 || (2 * m) % 1 == 0)
    )
  },
  intro({ data }) {
    return null
  },
  tasks: [
    {
      points: 5,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Im Rechteck ABCD liegt das Drachenviereck EGCF.</p>
            <svg viewBox="0 0 328 140">
              <image
                href="/content/BW_realschule/213_Skizze1.jpg"
                height="140"
                width="328"
              />
            </svg>
            <p>Es gilt: </p>
            <p>
              {buildOverline('AB')} = {pp(data.ab)} cm<br></br>
              {buildOverline('BE')} = {pp(data.be)} cm<br></br>ε ={' '}
              {pp(data.epsilon)}°
            </p>
            <ul>
              <li>Berechne den Winkel ϕ.</li>
              <li>Berechne den Umfang des Vierecks AEFD.</li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <div>
              <span style={{ fontSize: '0.8em' }}>
                <p>
                  <strong>Größe von ϕ</strong>
                </p>
                <p>Bestimme ϕ mithilfe der anderen Winkel in der Skizze:</p>
                <svg viewBox="0 0 328 150">
                  <image
                    href="/content/BW_realschule/213_Skizze2.jpg"
                    height="150"
                    width="328"
                  />
                </svg>

                <p>
                  Im Dreieck EBG kann α mithilfe der Winkelsumme bestimmt
                  werden:
                </p>
                <p>α = 180° − 90° − ε = {90 - data.epsilon}°</p>
                <p>β bildet mit α einen Winkel von 180°:</p>
                <p>β = 180° − α = {180 - (90 - data.epsilon)}°</p>
                <p>
                  β befindet sich im Drachenviereck auch im Punkt F und bildet
                  mit ϕ einen Winkel von 180°:
                </p>
                <p>
                  ϕ = 180° − β = <strong>{90 - data.epsilon}°</strong>
                </p>

                <p>
                  <strong>Umfang des Vierecks AEFD</strong>
                </p>
                <p>
                  Für den Umfang werden die Seitenlängen {buildOverline('AE')},{' '}
                  {buildOverline('EF')}, {buildOverline('DF')} und{' '}
                  {buildOverline('AD')} benötigt.
                </p>
                <p>
                  <strong>{buildOverline('AE')} berechnen</strong>
                </p>
                <p>
                  Für {buildOverline('AE')} gilt:<br></br>
                  {buildEquation([
                    [
                      <>{buildOverline('AE')}</>,
                      <>=</>,
                      <>
                        {buildOverline('AB')} − {buildOverline('BE')}
                      </>,
                    ],
                    [
                      <></>,
                      <>=</>,
                      <>
                        {pp(data.ab)} cm − {pp(data.be)} cm
                      </>,
                    ],
                    [<></>, <>=</>, <>{pp(data.ab - data.be)} cm</>],
                  ])}
                </p>
                <p>
                  <strong>{buildOverline('EF')} berechnen</strong>
                </p>
                <p>
                  Die Länge von {buildOverline('EF')} ist die gleiche, wie{' '}
                  {buildOverline('EG')}. Berechne {buildOverline('EG')} im
                  rechtwinkligen Dreieck EBG:
                </p>
                {buildEquation([
                  [
                    <>cos(ε)</>,
                    <>=</>,
                    <>
                      {buildInlineFrac(
                        <>{buildOverline('BE')}</>,
                        <>{buildOverline('EG')}</>,
                      )}
                    </>,
                  ],
                  [
                    <>cos({data.epsilon}°)</>,
                    <>=</>,
                    <>
                      {buildInlineFrac(
                        <>{pp(data.be)} cm</>,
                        <>{buildOverline('EG')}</>,
                      )}
                    </>,
                    <>| · {buildOverline('EG')}</>,
                  ],
                  [
                    <>
                      cos({data.epsilon}°) · {buildOverline('EG')}
                    </>,
                    <>=</>,
                    <>{pp(data.be)} cm</>,
                    <>| : cos({data.epsilon}°)</>,
                  ],
                  [
                    <>{buildOverline('EG')}</>,
                    <>≈</>,
                    <>
                      {pp(
                        roundToDigits(
                          data.be /
                            Math.cos((2 * Math.PI * data.epsilon) / 360),
                          2,
                        ),
                      )}{' '}
                      cm
                    </>,
                  ],
                ])}
                <p>
                  Damit ist auch {buildOverline('EF')} ={' '}
                  {pp(
                    roundToDigits(
                      data.be / Math.cos((2 * Math.PI * data.epsilon) / 360),
                      2,
                    ),
                  )}{' '}
                  cm.
                </p>
                <p>
                  <strong>{buildOverline('AD')} bestimmen</strong>
                </p>
                <p>
                  Die Länge {buildOverline('AD')} kann mit einer Hilfslinie
                  bestimmt werden:
                </p>
                <svg viewBox="0 0 328 140">
                  <image
                    href="/content/BW_realschule/213_Skizze3.jpg"
                    height="140"
                    width="328"
                  />
                </svg>
                <p>
                  Weil EGCF ein Drachenviereck ist, bilden EBCH ein Quadrat.{' '}
                  {buildOverline('EH')} hat die gleiche Länge wie{' '}
                  {buildOverline('EB')}. Damit gilt:
                </p>
                <p>
                  {buildOverline('AD')} = {buildOverline('EH')} = {pp(data.be)}{' '}
                  cm
                </p>
                <p>
                  <strong>{buildOverline('DF')} berechnen</strong>
                </p>
                <p>
                  {buildOverline('DF')} ist zusammengesetzt aus{' '}
                  {buildOverline('DH')} und {buildOverline('HF')}. Berechne{' '}
                  {buildOverline('HF')} im rechtwinkligen Dreieck EFH:
                </p>
                {buildEquation([
                  [
                    <>cos(ϕ)</>,
                    <>=</>,
                    <>
                      {buildInlineFrac(
                        <>{buildOverline('HF')}</>,
                        <>{buildOverline('EF')}</>,
                      )}
                    </>,
                  ],
                  [
                    <>cos({90 - data.epsilon}°)</>,
                    <>=</>,
                    <>
                      {buildInlineFrac(
                        <>{buildOverline('HF')}</>,
                        <>
                          {pp(
                            roundToDigits(
                              data.be /
                                Math.cos((2 * Math.PI * data.epsilon) / 360),
                              2,
                            ),
                          )}{' '}
                          cm
                        </>,
                      )}
                    </>,
                    <>
                      | ·{' '}
                      {pp(
                        roundToDigits(
                          data.be /
                            Math.cos((2 * Math.PI * data.epsilon) / 360),
                          2,
                        ),
                      )}{' '}
                      cm
                    </>,
                  ],
                  [
                    <>
                      cos({data.epsilon}°) ·{' '}
                      {pp(
                        roundToDigits(
                          data.be /
                            Math.cos((2 * Math.PI * data.epsilon) / 360),
                          2,
                        ),
                      )}{' '}
                      cm
                    </>,
                    <>=</>,
                    <>{buildOverline('HF')}</>,
                  ],
                  [
                    <>{buildOverline('HF')}</>,
                    <>≈</>,
                    <>
                      {pp(
                        roundToDigits(
                          roundToDigits(
                            data.be /
                              Math.cos((2 * Math.PI * data.epsilon) / 360),
                            2,
                          ) *
                            Math.cos((2 * Math.PI * (90 - data.epsilon)) / 360),
                          2,
                        ),
                      )}{' '}
                      cm
                    </>,
                  ],
                ])}
                <p>
                  {buildOverline('DH')} hat die gleiche Länge wie{' '}
                  {buildOverline('AE')}. Damit lässt sich {buildOverline('DF')}{' '}
                  nun bestimmen:
                </p>
                <p>
                  {buildOverline('DF')} = {buildOverline('DH')} +{' '}
                  {buildOverline('HF')} <br></br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= {pp(
                    data.ab - data.be,
                  )}{' '}
                  cm +{' '}
                  {pp(
                    roundToDigits(
                      roundToDigits(
                        data.be / Math.cos((2 * Math.PI * data.epsilon) / 360),
                        2,
                      ) * Math.cos((2 * Math.PI * (90 - data.epsilon)) / 360),
                      2,
                    ),
                  )}{' '}
                  cm <br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;={' '}
                  {pp(
                    data.ab -
                      data.be +
                      roundToDigits(
                        roundToDigits(
                          data.be /
                            Math.cos((2 * Math.PI * data.epsilon) / 360),
                          2,
                        ) * Math.cos((2 * Math.PI * (90 - data.epsilon)) / 360),
                        2,
                      ),
                  )}{' '}
                  cm.
                </p>
                <p>
                  <strong>Umfang von AEFD</strong>
                </p>
                <p>Berechne den Umfang des Vierecks:</p>
                {buildEquation([
                  [
                    <>U</>,
                    <>=</>,
                    <>
                      {buildOverline('AE')} + {buildOverline('EF')} +{' '}
                      {buildOverline('DF')} + {buildOverline('AD')}
                    </>,
                  ],
                  [
                    <></>,
                    <>=</>,
                    <>
                      {pp(data.ab - data.be)} cm +{' '}
                      {pp(
                        roundToDigits(
                          data.be /
                            Math.cos((2 * Math.PI * data.epsilon) / 360),
                          2,
                        ),
                      )}{' '}
                      cm +
                      {pp(
                        data.ab -
                          data.be +
                          roundToDigits(
                            roundToDigits(
                              data.be /
                                Math.cos((2 * Math.PI * data.epsilon) / 360),
                              2,
                            ) *
                              Math.cos(
                                (2 * Math.PI * (90 - data.epsilon)) / 360,
                              ),
                            2,
                          ),
                      )}{' '}
                      cm + {pp(data.be)} cm
                    </>,
                  ],
                  [
                    <></>,
                    <>=</>,
                    <>
                      {pp(
                        data.ab -
                          data.be +
                          roundToDigits(
                            data.be /
                              Math.cos((2 * Math.PI * data.epsilon) / 360),
                            2,
                          ) +
                          data.ab -
                          data.be +
                          roundToDigits(
                            roundToDigits(
                              data.be /
                                Math.cos((2 * Math.PI * data.epsilon) / 360),
                              2,
                            ) *
                              Math.cos(
                                (2 * Math.PI * (90 - data.epsilon)) / 360,
                              ),
                            2,
                          ) +
                          data.be,
                      )}{' '}
                      cm
                    </>,
                  ],
                ])}
              </span>
            </div>
          </>
        )
      },
    },
    {
      points: 5,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Die Parabeln p<sub>1</sub> und p<sub>2</sub> sind zwei nach oben
              geöffnete verschobene Normalparabeln.
            </p>
            <p>
              Die Parabel p<sub>1</sub> hat den Scheitelpunkt S<sub>1</sub>(
              {pp(data.xs_1)}|{pp(data.ys_1)}).
            </p>
            <p>
              Die Parabel p<sub>2</sub> schneidet die x-Achse in den Punkten N
              <sub>1</sub>({pp(data.ns_1)}|0) und N<sub>2</sub>({pp(data.ns_2)}
              |0).
            </p>
            <ul>
              <li>
                Bestimme die Funktionsgleichungen von p<sub>1</sub> und p
                <sub>2</sub>.
              </li>
            </ul>
            <p>
              Die Gerade g verläuft durch den Scheitelpunkt S<sub>1</sub> und
              den Punkt A({pp(data.ax)}|{pp(data.ay)}).
            </p>
            <ul>
              <li>Berechne die Funktionsgleichung von g.</li>
            </ul>
            <p>
              Der Punkt S<sub>2</sub> ist der Scheitelpunkt der Parabel p
              <sub>2</sub>.
            </p>
            <ul>
              <li>
                Berechne die Entfernung zwischen S<sub>1</sub> und S<sub>2</sub>
                .
              </li>
            </ul>
            <p>
              Milo behauptet: {'"'}Die Parabeln p<sub>1</sub> und p<sub>2</sub>{' '}
              sowie die Gerade g schneiden sich in einem gemeinsamen Punkt.{'"'}
            </p>
            <ul>
              <li>
                Überprüfe diese Behauptung. Begründe deine Antwort rechnerisch.
              </li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const m = (data.ay - data.ys_1) / (data.ax - data.xs_1)
        const y_2 =
          ((data.ns_2 + data.ns_1) / 2) * ((data.ns_2 + data.ns_1) / 2) +
          ((data.ns_2 + data.ns_1) / 2) * (-data.ns_1 - data.ns_2) +
          -data.ns_1 * -data.ns_2
        const schnitt =
          (data.xs_1 * data.xs_1 + data.ys_1 + data.ns_1 * -data.ns_2) /
          (-data.ns_1 - data.ns_2 + 2 * data.xs_1)
        return (
          <>
            <p>
              <strong>
                Funktionsgleichungen von p<sub>1</sub> und p<sub>2</sub>
              </strong>
            </p>
            <p>
              Setze den Scheitelpunkt S<sub>1</sub> von p<sub>1</sub> in die
              Scheitelform ein:{' '}
            </p>
            {buildEquation([
              [
                <>
                  p<sub>1</sub> : y
                </>,
                <>=</>,
                <>(x − d)² + e</>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  (x − {pp(data.xs_1)})² + {pp(data.ys_1)}
                </>,
              ],
              [
                '',
                <>
                  {' '}
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      Binomische Formel anwenden
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  x² − 2 · x · {pp(data.xs_1)} + {pp(data.xs_1 * data.xs_1)} +{' '}
                  {pp(data.ys_1)}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <strong>
                    x² − {pp(2 * data.xs_1)}x +{' '}
                    {pp(data.xs_1 * data.xs_1 + data.ys_1)}
                  </strong>
                </>,
              ],
            ])}
            <p>
              Setze die Nullstellen von p<sub>2</sub> in die Nullstellenform
              ein:
            </p>
            {buildEquation([
              [
                <>
                  p<sub>2</sub> : y
                </>,
                <>=</>,
                <>
                  (x − n<sub>1</sub>)(x − n<sub>2</sub>)
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  (x − ({pp(data.ns_1)}))(x − ({pp(data.ns_2)}))
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  (x + {-data.ns_1})(x + {-data.ns_2})
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <strong>
                    x² + {-data.ns_1 - data.ns_2}x + {-data.ns_1 * -data.ns_2}
                  </strong>
                </>,
              ],
            ])}
            <p>
              <strong>Funktionsgleichung von g</strong>
            </p>
            <p>
              Die Gerade g verläuft durch die Punkte S<sub>1</sub>({data.xs_1}|
              {data.ys_1}) und A({data.ax}|{data.ay}).
            </p>
            <p>Bestimme die Steigung von g mit der Punkt-Steigungs-Formel:</p>
            {buildEquation([
              [
                <>m</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>
                      y<sub>1</sub> − y<sub>2</sub>
                    </>,
                    <>
                      x<sub>1</sub> − x<sub>2</sub>
                    </>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>
                      {data.ay} − {data.ys_1}
                    </>,
                    <>
                      {data.ax} − {data.xs_1}
                    </>,
                  )}
                </>,
              ],
              [<></>, <>=</>, <>{pp(m)}</>],
            ])}
            <p>Setze die Steigung in die allgemeine Geradengleichung ein:</p>
            <p>y = {ppPolynom([[m, 'x', 1]])} + b</p>
            <p>
              Berechne den y-Achsenabschnitt b durch Einsetzen eines Punktes auf
              der Geraden:
            </p>
            {buildEquation([
              [<>y</>, <>=</>, <>{ppPolynom([[m, 'x', 1]])} + b</>],
              [
                <>{data.ys_1}</>,
                <>=</>,
                <>{ppPolynom([[m * data.xs_1, 'x', 0]])} + b</>,
                <>| {pp(-m * data.xs_1, 'merge_op')}</>,
              ],
              [<>b</>, <>=</>, <>{pp(-m * data.xs_1 + data.ys_1)}</>],
            ])}
            <p>Die Geradengleichung ist damit:</p>
            <p>
              g : y = {ppPolynom([[m, 'x', 1]])}{' '}
              {-m * data.xs_1 + data.ys_1 > 0 && '+ '}
              {ppPolynom([[-m * data.xs_1 + data.ys_1, 'x', 0]])}
            </p>
            <p>
              <strong>
                Entfernung zwischen S<sub>1</sub> und S<sub>2</sub>
              </strong>
            </p>
            <p>
              Bestimme den Scheitelpunkt von p<sub>2</sub>. Die Nullstellen von
              p<sub>2</sub> sind N<sub>1</sub>({pp(data.ns_1)}|0) und N
              <sub>2</sub>({pp(data.ns_2)}
              |0). Aufgrund der Symmetrie der Parabel, befindet sich der
              Scheitelpunkt bei x = {pp((data.ns_2 + data.ns_1) / 2)}.
            </p>
            <p>
              Setze die Koordinate in die Funktionsgleichung und bestimme den
              y-Wert:
            </p>
            {buildEquation([
              [
                <>y</>,
                <>=</>,
                <>
                  x² + {-data.ns_1 - data.ns_2}x + {-data.ns_1 * -data.ns_2}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  ({pp((data.ns_2 + data.ns_1) / 2)})² +{' '}
                  {-data.ns_1 - data.ns_2} · ({pp((data.ns_2 + data.ns_1) / 2)})
                  + {-data.ns_1 * -data.ns_2}
                </>,
              ],
              [<></>, <>=</>, <>{pp(y_2)}</>],
            ])}
            <p>
              Der Scheitelpunkt ist damit{' '}
              <strong>
                S<sub>2</sub>({pp((data.ns_2 + data.ns_1) / 2)}|{pp(y_2)})
              </strong>
            </p>
            <p>
              Berechne die Entfernung zwischen den Scheitelpunkten mit der
              Formel:
            </p>
            {buildEquation([
              [
                <>d</>,
                <>=</>,
                <>
                  {buildSqrt(
                    <>
                      (x<sub>1</sub> − x<sub>2</sub>)² + (y<sub>1</sub> − y
                      <sub>2</sub>)²
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
                      ({pp(data.xs_1)} − ({pp((data.ns_2 + data.ns_1) / 2)}))² +
                      ({pp(data.ys_1)} − ({pp(y_2)}))²
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
                      {pp(data.xs_1 - (data.ns_2 + data.ns_1) / 2)}² +
                      {pp(data.ys_1 - y_2)}²
                    </>,
                  )}
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  <strong>
                    {pp(
                      roundToDigits(
                        Math.sqrt(
                          (data.xs_1 - (data.ns_2 + data.ns_1) / 2) *
                            (data.xs_1 - (data.ns_2 + data.ns_1) / 2) +
                            (data.ys_1 - y_2) * (data.ys_1 - y_2),
                        ),
                        2,
                      ),
                    )}{' '}
                    [LE]
                  </strong>
                </>,
              ],
            ])}
            <p>
              <strong>Gemeinsamer Punkt</strong>
            </p>
            <p>
              Berechne den Schnittpunkt der Parabeln, durch Gleichsetzen der
              Funktionsgleichungen:
            </p>
            {buildEquation([
              [
                <>
                  p<sub>1</sub>
                </>,
                <>=</>,
                <>
                  p<sub>2</sub>
                </>,
              ],
              [
                <>
                  x² − {pp(2 * data.xs_1)}x +{' '}
                  {pp(data.xs_1 * data.xs_1 + data.ys_1)}
                </>,
                <>=</>,
                <>
                  x² + {-data.ns_1 - data.ns_2}x + {-data.ns_1 * -data.ns_2}
                </>,
                <>| − x²</>,
              ],
              [
                <>
                  − {pp(2 * data.xs_1)}x +{' '}
                  {pp(data.xs_1 * data.xs_1 + data.ys_1)}
                </>,
                <>=</>,
                <>
                  {-data.ns_1 - data.ns_2}x + {-data.ns_1 * -data.ns_2}
                </>,
                <>| + {pp(2 * data.xs_1)}x</>,
              ],
              [
                <>{pp(data.xs_1 * data.xs_1 + data.ys_1)}</>,
                <>=</>,
                <>
                  {-data.ns_1 - data.ns_2 + 2 * data.xs_1}x +{' '}
                  {-data.ns_1 * -data.ns_2}
                </>,
                <>| − {-data.ns_1 * -data.ns_2}</>,
              ],
              [
                <>
                  {pp(
                    data.xs_1 * data.xs_1 + data.ys_1 + data.ns_1 * -data.ns_2,
                  )}
                </>,
                <>=</>,
                <>{-data.ns_1 - data.ns_2 + 2 * data.xs_1}x</>,
                <>| : {-data.ns_1 - data.ns_2 + 2 * data.xs_1}</>,
              ],
              [<>x</>, <>=</>, <>{pp(schnitt)}</>],
            ])}
            <p>
              Setze in eine der Funktionsgleichungen ein und bestimme den
              y-Wert:
            </p>
            {buildEquation([
              [
                <>y</>,
                <>=</>,
                <>
                  x² − {pp(2 * data.xs_1)}x +{' '}
                  {pp(data.xs_1 * data.xs_1 + data.ys_1)}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {schnitt < 0 && '('}
                  {pp(schnitt)}
                  {schnitt < 0 && ')'}² − {pp(2 * data.xs_1)} ·{' '}
                  {schnitt < 0 && '('}
                  {pp(schnitt)}
                  {schnitt < 0 && ')'} + {pp(data.xs_1 * data.xs_1 + data.ys_1)}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {pp(
                    schnitt * schnitt -
                      2 * data.xs_1 * schnitt +
                      data.xs_1 * data.xs_1 +
                      data.ys_1,
                  )}
                </>,
              ],
            ])}
            <p>
              Die Parabeln schneiden sich im Punkt ({pp(schnitt)}|
              {pp(
                schnitt * schnitt -
                  2 * data.xs_1 * schnitt +
                  data.xs_1 * data.xs_1 +
                  data.ys_1,
              )}
              ). Wenn dieser Punkt auch auf der Gerade liegt, ist die Behauptung
              von Milo richtig. Überprüfe:
            </p>
            {buildEquation([
              [
                <>y</>,
                <>=</>,
                <>
                  {ppPolynom([[m, 'x', 1]])}{' '}
                  {-m * data.xs_1 + data.ys_1 > 0 && '+ '}
                  {ppPolynom([[-m * data.xs_1 + data.ys_1, 'x', 0]])}
                </>,
              ],
              [
                <>y</>,
                <>=</>,
                <>
                  {ppPolynom([[m * schnitt, 'x', 0]])}{' '}
                  {-m * data.xs_1 + data.ys_1 > 0 && '+ '}
                  {ppPolynom([[-m * data.xs_1 + data.ys_1, 'x', 0]])}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>{pp(m * schnitt + -m * data.xs_1 + data.ys_1)}</>,
              ],
            ])}
            <p>
              Die Gerade verläuft{' '}
              {!(
                schnitt * schnitt -
                  2 * data.xs_1 * schnitt +
                  data.xs_1 * data.xs_1 +
                  data.ys_1 ==
                m * schnitt + -m * data.xs_1 + data.ys_1
              ) && 'nicht '}{' '}
              durch den Punkt ({pp(schnitt)}|
              {pp(
                schnitt * schnitt -
                  2 * data.xs_1 * schnitt +
                  data.xs_1 * data.xs_1 +
                  data.ys_1,
              )}
              ). Milos Behauptung stimmt{' '}
              {!(
                schnitt * schnitt -
                  2 * data.xs_1 * schnitt +
                  data.xs_1 * data.xs_1 +
                  data.ys_1 ==
                m * schnitt + -m * data.xs_1 + data.ys_1
              ) && 'nicht'}
              .
            </p>
          </>
        )
      },
    },
  ],
}
