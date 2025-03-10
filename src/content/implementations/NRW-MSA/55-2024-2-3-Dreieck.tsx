import { Exercise } from '@/data/types'
import { Color4, Color5 } from '@/helper/colors'
import {
  buildEquation,
  buildFrac,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'
import { buildSharp } from 'ionicons/icons'

interface DATA {
  seiten: Array<number>
  case: number
}

export const exercise55: Exercise<DATA> = {
  title: 'Dreieck',
  source: '2024 Teil 2 Aufgabe 3',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    const array = [
      [3, 4, 5],
      [6, 8, 10],
      [5, 12, 13],
      [9, 12, 15],
      [10, 24, 26],
    ]
    return {
      seiten: rng.randomItemFromArray(array),
      case: rng.randomIntBetween(1, 4),
    }
  },
  originalData: {
    seiten: [6, 8, 10],
    case: 1,
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>Abbildung 1 zeigt das Dreieck ABC mit vorgegebenen Maßangaben.</p>
        <svg viewBox="0 0 328 150">
          <image
            href="/content/NRW_MSA/NRW_MSA_Dreieck24.PNG"
            height="150"
            width="328"
          />
          <text x={250} y={50} fontSize={15} textAnchor="right" stroke="black">
            a = {data.seiten[0]} cm
          </text>
          <text x={70} y={60} fontSize={15} textAnchor="right" stroke="black">
            b = {data.seiten[1]} cm
          </text>
          <text x={150} y={145} fontSize={15} textAnchor="right" stroke="black">
            c = {data.seiten[2]} cm
          </text>
        </svg>
        <center>
          <Color5>
            <span style={{ fontSize: 'small' }}>Abbildung 1: Dreieck</span>
          </Color5>
        </center>
      </>
    )
  },
  tasks: [
    {
      points: 3,
      duration: 2,
      task({ data }) {
        return (
          <>
            <p>
              a) Begründe mithilfe einer Rechnung, dass das Dreieck ABC beim
              Punkt C einen rechten Winkel hat.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>In einem rechtwinkligen Dreieck gilt der Satz des Pythagoras:</p>
            <p>a² + b² = c²</p>
            <p>
              Dabei muss c die Seitenlänge der Hypotenuse sein. <br></br>
              <br></br>Ist diese Gleichung erfüllt, muss das Dreieck wiederum
              rechtwinklig sein. Überprüfe, indem du die Seitenlängen einsetzt:
            </p>
            {buildEquation([
              ['a² + b²', '=', 'c²'],
              [
                data.seiten[0] + '² + ' + data.seiten[1] + '²',
                '=',
                data.seiten[2] + '²',
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
                      Ausrechnen und zusammenfassen
                    </span>
                  </Color4>
                </>,
              ],
              [
                data.seiten[0] * data.seiten[0] +
                  ' + ' +
                  data.seiten[1] * data.seiten[1],
                '=',
                data.seiten[2] * data.seiten[2],
              ],
              [
                data.seiten[2] * data.seiten[2],
                '=',
                data.seiten[2] * data.seiten[2],
              ],
            ])}
            <p>
              Die Gleichung ist erfüllt, da auf beiden Seiten der gleiche Wert
              steht. Damit ist das Dreieck rechtwinklig mit der Hypotenuse c.
              Das bedeutet auch, dass in C der rechte Winkel liegt.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 2,
      task({ data }) {
        const surface = (data.seiten[0] * data.seiten[1]) / 2
        return (
          <>
            <p>
              b) Zeige rechnerisch, dass der Flächeninhalt dieses Dreiecks{' '}
              {surface} cm² groß ist.
            </p>
          </>
        )
      },
      solution({ data }) {
        const surface = (data.seiten[0] * data.seiten[1]) / 2
        return (
          <>
            <p>
              Die Fläche kann auf verschiedene Wege berechnet werden. Da das
              Dreieck rechtwinklig ist, gilt unter anderem die Formel:
            </p>
            {buildEquation([
              [<>A</>, <>=</>, <>{buildFrac('a · b', 2)}</>],
              [
                <></>,
                <>=</>,
                <>{buildFrac(data.seiten[0] + ' · ' + data.seiten[1], 2)}</>,
              ],
              [
                <></>,
                <>
                  <strong>=</strong>
                </>,
                <>
                  <strong>{surface} [cm²]</strong>
                </>,
              ],
            ])}

            <p>
              Der Flächeninhalt beträgt <strong>A = {surface} cm²</strong>.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 3,
      task({ data }) {
        return (
          <>
            <p>c) Begründe, dass die folgende Gleichung gilt:</p>
            <br></br>
            {buildFrac('a · b', 2)} ={' '}
            {buildFrac(
              <>
                c · h<sub>c</sub>
              </>,

              2,
            )}
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Eine Rechnung wird hier nicht benötigt. Beide Terme beschreiben
              den <strong>Flächeninhalt</strong> des rechtwinkligen Dreiecks:
            </p>
            <ul>
              <li>
                Der linke Term beschreibt den Flächeninhalt eines rechtwinkligen
                Dreiecks mit den Katheten a und b.
              </li>
              <li>
                Die rechte Seite beschreibt allgemein den Flächeninhalt eines
                Dreiecks mit der Grundseite c und Höhe h<sub>c</sub>.
              </li>
            </ul>
            <p>
              Da beide Terme den Flächeninhalt des gleichen Dreiecks
              beschreiben, gilt die Gleichung.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 2,
      task({ data }) {
        return (
          <>
            <p>
              d) Bestimme rechnerisch die Länge der Strecke h<sub>c</sub>.
            </p>
          </>
        )
      },
      solution({ data }) {
        const surface = (data.seiten[0] * data.seiten[1]) / 2
        const hoehe = roundToDigits((surface * 2) / data.seiten[2], 2)
        return (
          <>
            <p>Für den Flächeninhalt des Dreiecks gilt:</p>
            <p>
              A ={' '}
              {buildFrac(
                <>
                  c · h<sub>c</sub>
                </>,

                2,
              )}
              <br></br>
              <br></br>Der Flächeninhalt beträgt laut (b) {surface} cm². Setze
              die bekannten Werte ein und berechne die Höhe h<sub>c</sub>:
              {buildEquation([
                [
                  'A',
                  '=',
                  buildFrac(
                    <>
                      c · h<sub>c</sub>
                    </>,

                    2,
                  ),
                ],
                [
                  surface,
                  '=',
                  buildFrac(
                    <>
                      {data.seiten[2]} · h<sub>c</sub>
                    </>,

                    2,
                  ),
                  '| · 2',
                ],
                [
                  surface * 2,
                  '=',
                  <>
                    {data.seiten[2]} · h<sub>c</sub>
                  </>,
                  '| : ' + data.seiten[2],
                ],
                [
                  <>
                    <strong>
                      h<sub>c</sub>
                    </strong>
                  </>,
                  <>
                    <strong>
                      {(((surface * 2) / data.seiten[2]) * 100) % 1 == 0
                        ? '='
                        : '≈'}
                    </strong>
                  </>,
                  <>
                    <strong>{pp(hoehe)} [cm]</strong>
                  </>,
                ],
              ])}
            </p>
            <p>
              Die Höhe beträgt:{' '}
              <strong>
                h<sub>c</sub> = {pp(hoehe)} cm
              </strong>
              .
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 3,
      task({ data }) {
        return (
          <>
            <p>e) Bestimme rechnerisch die Größe des Winkels α.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Im rechtwinkligen Dreieck gilt mithilfe des Sinus folgende
              Gleichung:
            </p>
            {buildEquation([
              [
                'sin(α)',
                '=',
                <>{buildInlineFrac('Gegenkathete', 'Hypotenuse')}</>,
              ],

              ['sin(α)', '=', <>{buildInlineFrac('a', 'c')}</>],
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
                    <span style={{ fontSize: 'small' }}>Werte einsetzen</span>
                  </Color4>
                </>,
              ],
              [
                'sin(α)',
                '=',
                <>{buildInlineFrac(data.seiten[0], data.seiten[2])}</>,
                <>
                  | sin<sup>-1</sup>()
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
                      Mit sin<sup>-1</sup> nach α lösen
                    </span>
                  </Color4>
                </>,
              ],
              [
                'α',
                '=',
                <>
                  <>
                    sin<sup>-1</sup>{' '}
                    <span className="inline-block scale-y-[2.6]">(</span>
                    {buildInlineFrac(data.seiten[0], data.seiten[2])}
                    <span className="inline-block scale-y-[2.6]">)</span>
                  </>
                </>,
              ],
              [
                <>
                  <strong>α</strong>
                </>,
                <>
                  <strong>≈</strong>
                </>,
                <>
                  <strong>
                    {pp(
                      roundToDigits(
                        (Math.asin(data.seiten[0] / data.seiten[2]) /
                          (2 * Math.PI)) *
                          360,
                        2,
                      ),
                    )}
                    °
                  </strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 4,
      duration: 6,
      task({ data }) {
        return (
          <>
            <p>
              f) Gegeben ist ein gleichschenkliges rechtwinkliges Dreieck mit
              der Basis <br></br>c = {data.seiten[2]} cm und den beiden
              Schenkeln a und b.
            </p>
            <ol>
              <li>Skizziere eine geeignete Planfigur.</li>
              <li>Berechne die Länge der Schenkel.</li>
            </ol>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <svg viewBox="0 0 328 190">
              <image
                href="/content/NRW_MSA/NRW_MSA_Planfigur.PNG"
                height="190"
                width="328"
              />
              <text
                x={140}
                y={185}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {data.seiten[2]} cm
              </text>
            </svg>
            <ol>
              <li>
                Die Planfigur sollte ähnlich zur Figur oben sein. Die Katheten
                stehen dabei im 45°-Winkel zur Grundseite. So ist das Dreieck
                gleichschenklig und auch rechtwinklig.
              </li>
              <li>
                In diesem Dreieck gilt mit dem Satz des Pythagoras:
                {buildEquation([
                  [<>{data.seiten[2]}²</>, '=', <>a² + b²</>],
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
                          a und b sind gleich lang
                        </span>
                      </Color4>
                    </>,
                  ],
                  [<>{data.seiten[2]}²</>, '=', <>2a²</>, <>| : 2</>],
                  [
                    <>{buildInlineFrac(<>{data.seiten[2]}²</>, 2)}</>,
                    '=',
                    <>a²</>,
                    <>| √</>,
                  ],
                  [
                    <>a</>,
                    '=',
                    <>{buildSqrt(pp((data.seiten[2] * data.seiten[2]) / 2))}</>,
                  ],
                  [
                    <></>,
                    '≈',
                    <>
                      <strong>
                        {pp(
                          roundToDigits(
                            Math.sqrt((data.seiten[2] * data.seiten[2]) / 2),
                            2,
                          ),
                        )}{' '}
                        [cm]
                      </strong>
                    </>,
                  ],
                ])}{' '}
                <br></br>Die Katheten sind jeweils{' '}
                <strong>
                  {pp(
                    roundToDigits(
                      Math.sqrt((data.seiten[2] * data.seiten[2]) / 2),
                      2,
                    ),
                  )}{' '}
                  cm
                </strong>{' '}
                lang.
              </li>
            </ol>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 1,
      task({ data }) {
        return (
          <>
            <p>
              g) Kai behauptet:{' '}
              {data.case == 1 && (
                <>
                  {'"'}Es gibt auch ein rechtwinkliges Dreieck, bei dem alle
                  drei Seiten gleich lang sind.{'"'}
                </>
              )}
              {data.case == 2 && (
                <>
                  {'"'}Es gibt auch ein gleichschenkliges Dreieck mit zwei
                  rechten Winkeln{'"'}
                </>
              )}
              {data.case == 3 && (
                <>
                  {'"'}Es gibt auch ein gleichschenkliges Dreieck, bei dem alle
                  drei Seiten gleich lang sind.{'"'}
                </>
              )}
              {data.case == 4 && (
                <>
                  {'"'}In einem rechtwinkligen Dreieck können eine Kathete und
                  die Hypotenuse gleich lang sein.{'"'}
                </>
              )}{' '}
              Entscheide begründet, ob Kais Behauptung stimmt.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            {data.case == 1 && (
              <>
                <p>
                  Ein Dreieck, in dem alle Seiten gleich lang sind, heißt
                  gleichseitig. Darin müssen auch alle Winkel gleich sein und
                  jeweils 60° betragen.<br></br>
                  <br></br> Einen rechten Winkel kann es nicht geben, womit Kais
                  Behauptung <strong>nicht stimmt</strong>.
                </p>
              </>
            )}
            {data.case == 2 && (
              <>
                <p>
                  Die Winkelsumme in einem Dreieck beträgt immer 180°. Da zwei
                  rechte Winkel diese 180° bereits ergeben, kann es keinen
                  dritten Winkel im Dreieck geben. <br></br>
                  <br></br>Damit ist Kais Behauptung <strong>falsch</strong>.
                </p>
              </>
            )}
            {data.case == 3 && (
              <>
                <p>
                  <strong>Diese Behauptung stimmt.</strong> Bei einem
                  gleichschenkligen Dreieck sind nicht nur die zwei Schenkel
                  gleich, sondern alle drei Seiten. So ein Dreieck heißt
                  gleichseitig.
                </p>
              </>
            )}
            {data.case == 4 && (
              <>
                <p>
                  In einem rechtwinkligen Dreieck ist die Hypotenuse die längste
                  Seite. Wäre eine Seite so lang wie die Hypotenuse, z.B.{' '}
                  {data.seiten[2]} cm, gilt der Satz des Pythagoras nicht mehr:
                </p>
                <p>
                  a² + {data.seiten[2]}² = {data.seiten[2]}²
                </p>
                <p>
                  Die Gleichung wäre nur erfüllt, wenn die Seite a die Länge 0
                  cm besitzt. Das ist nicht möglich, womit Kais Behauptung{' '}
                  <strong>falsch</strong> ist.
                </p>
              </>
            )}
          </>
        )
      },
    },
  ],
}
