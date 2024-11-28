import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  fish: number
  seestar: number
  win_1: number
  win_2: number
  win_3: number
  bet: number
  höhe_max: number
  breite_max: number
  maß: number
}

export const exercise215: Exercise<DATA> = {
  title: 'Angelspiel + Tennishalle',
  source: '2024 Wahlteil B - Aufgabe 3',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      fish: rng.randomIntBetween(2, 4),
      seestar: rng.randomIntBetween(2, 4),
      win_1: rng.randomIntBetween(4, 8),
      win_2: rng.randomIntBetween(2, 6),
      win_3: rng.randomIntBetween(1, 4),
      bet: rng.randomIntBetween(1, 2),
      höhe_max: rng.randomIntBetween(5, 8) * 2,
      breite_max: rng.randomItemFromArray([40, 60, 80, 100]),
      maß: rng.randomIntBetween(10, 12),
    }
  },
  originalData: {
    fish: 5,
    seestar: 3,
    win_1: 9,
    win_2: 4,
    win_3: 2.5,
    bet: 1,
    maß: 10,
    höhe_max: 12,
    breite_max: 40,
  },
  constraint({ data }) {
    return data.maß < data.höhe_max
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
        const muscle = 10 - data.fish - data.seestar
        return (
          <>
            <p>
              Beim Schulfest bietet die Klasse 10a ein Angelspiel an. Dabei
              dürfen die Spieler zweimal nacheinander einen Gegenstand aus einem
              Gefäß angeln. Die Gegenstände werden nicht zurückgelegt. In dem
              Gefäß liegen {data.fish} Fische, {data.seestar} Seesterne und{' '}
              {muscle} Muscheln.
            </p>
            <svg viewBox="0 0 328 100">
              <image
                href="/content/BW_Realschule/215_Angelspiel.jpg"
                height="100"
                width="328"
              />
            </svg>
            <ul>
              <li>
                Berechne die Wahrscheinlichkeit für das Ereignis {'"'}zweimal
                Muschel{'"'}.
              </li>
            </ul>
            <p>Für ein Glückspiel wird der gegebene Gewinnplan eingesetzt.</p>
            <svg viewBox="0 0 328 110">
              <image
                href="/content/BW_Realschule/215_Gewinnplan.jpg"
                height="110"
                width="328"
              />
              <text
                x={194}
                y={40}
                fontSize={13}
                textAnchor="right"
                stroke="black"
              >
                {data.win_1} €
              </text>
              <text
                x={194}
                y={60}
                fontSize={13}
                textAnchor="right"
                stroke="black"
              >
                {data.win_2} €
              </text>
              <text
                x={194}
                y={80}
                fontSize={13}
                textAnchor="right"
                stroke="black"
              >
                {pp(data.win_3)} €
              </text>
              <text
                x={144}
                y={103}
                fontSize={13}
                textAnchor="right"
                stroke="black"
              >
                {data.bet} €
              </text>
            </svg>
            <ul>
              <li>Berechne den Erwartungswert.</li>
            </ul>
            <p>
              Der Gewinnplan soll so verändert werden, dass das Spiel fair wird.
              Dazu soll der Gewinn von {'"'}zweimal Muschel{'"'} verändert
              werden, während alles andere unverändert bleibt.
            </p>
            <ul>
              <li>
                Wie hoch muss der Gewinn für {'"'}zweimal Muschel{'"'} sein?
              </li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const muscle = 10 - data.fish - data.seestar
        return (
          <>
            <p>
              <strong>
                Wahrscheinlichkeit für {'"'}zweimal Muschel{'"'}
              </strong>
            </p>
            <p>
              Beim Angeln wird zufällig einer der Gegenstände gezogen. Jeder
              Gegenstand ist gleichwahrscheinlich zu ziehen, weshalb die
              Wahrscheinlichkeit mit der Formel für das Laplace-Experiment
              berechnet wird:
            </p>
            {buildEquation([
              [
                <>p</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>Anzahl der Muscheln</>,
                    <>Anzahl aller Gegenstände</>,
                  )}
                </>,
              ],
              [<></>, <>=</>, <>{buildInlineFrac(<>{muscle}</>, <>10</>)}</>],
            ])}
            <p>
              Die Muschel wird nicht zurückgelegt. Beim nächsten Zug ist also
              eine weniger vorhanden. Damit ist die Wahrscheinlichkeit:
            </p>
            <p>p = {buildInlineFrac(<>{muscle - 1}</>, <>9</>)}</p>
            <p>
              Soll zweimal hintereinander eine Muschel gezogen werden, beträgt
              die Wahrscheinlichkeit:
            </p>
            <p>
              p = {buildInlineFrac(<>{muscle}</>, <>10</>)} ·{' '}
              {buildInlineFrac(<>{muscle - 1}</>, <>9</>)} ={' '}
              {ppFrac(((muscle - 1) * muscle) / 90)}
            </p>
            <p>
              <strong>Erwartungswert</strong>
            </p>
            <p>
              Berechne die Wahrscheinlichkeit der Ereignisse, wie im ersten Teil
              der Aufgabe:
            </p>
            {buildEquation([
              [
                <>
                  p<sub>2 Seesterne</sub>
                </>,
                <>=</>,
                <>
                  {buildInlineFrac(<>{data.seestar}</>, <>10</>)} ·{' '}
                  {buildInlineFrac(<>{data.seestar - 1}</>, <>9</>)}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>{ppFrac(((data.seestar - 1) * data.seestar) / 90)}</>,
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
                      Es gibt 2 Möglichkeiten Muschel und Seestern zu ziehen
                    </span>
                  </Color4>
                </>,
              ],
              [
                <>
                  p<sub>Muschel & Seestern</sub>
                </>,
                <>=</>,
                <>
                  2 · {buildInlineFrac(<>{muscle}</>, <>10</>)} ·{' '}
                  {buildInlineFrac(<>{data.seestar}</>, <>9</>)}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  2 · {buildInlineFrac(<>{muscle}</>, <>10</>)} ·{' '}
                  {buildInlineFrac(<>{data.seestar}</>, <>9</>)}
                </>,
              ],
              [<></>, <>=</>, <>{ppFrac((2 * data.seestar * muscle) / 90)}</>],
            ])}
            <p>
              Berechne den Erwartungswert aus den Wahrscheinlichkeiten und den
              dazugehörigen Gewinnen:
            </p>
            {buildEquation([
              [
                <>E</>,
                <>=</>,
                <>
                  {data.win_1} € · {ppFrac(((muscle - 1) * muscle) / 90)} +{' '}
                  {data.win_2} € ·{' '}
                  {ppFrac(((data.seestar - 1) * data.seestar) / 90)} +{' '}
                  {data.win_3} € · {ppFrac((2 * muscle * data.seestar) / 90)} -{' '}
                  {data.bet} €
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {pp(
                    roundToDigits(
                      data.win_1 * (((muscle - 1) * muscle) / 90) +
                        data.win_2 *
                          (((data.seestar - 1) * data.seestar) / 90) +
                        data.win_3 * ((2 * muscle * data.seestar) / 90) -
                        data.bet,
                      2,
                    ),
                  )}{' '}
                  €
                </>,
              ],
            ])}
            <p>
              <strong>Faires Spiel</strong>
            </p>
            <p>
              Ein Spiel ist fair, wenn der Erwartungswert 0 ergibt. Setze diesen
              also 0 und bestimme den Gewinn für {'"'}zweimal Muschel{'"'}.
            </p>
            <div>
              <span style={{ fontSize: '0.8em' }}>
                {buildEquation([
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
                          Gewinn {'"'}zweimal Muschel{'"'} x setzen
                        </span>
                      </Color4>
                    </>,
                  ],
                  [
                    <>0</>,
                    <>=</>,
                    <>
                      x · {ppFrac(((muscle - 1) * muscle) / 90)} + {data.win_2}{' '}
                      € · {ppFrac(((data.seestar - 1) * data.seestar) / 90)} +{' '}
                      {data.win_3} € ·{' '}
                      {ppFrac((2 * muscle * data.seestar) / 90)} -{data.bet} €
                    </>,
                  ],

                  [
                    <>0</>,
                    <>=</>,
                    <>
                      x · {ppFrac(((muscle - 1) * muscle) / 90)}
                      {pp(
                        roundToDigits(
                          (data.win_2 * ((data.seestar - 1) * data.seestar)) /
                            90 +
                            (data.win_3 * (2 * muscle * data.seestar)) / 90 -
                            data.bet,
                          2,
                        ),
                        'merge_op',
                      )}{' '}
                      €
                    </>,
                  ],
                  [
                    <>
                      {pp(
                        -roundToDigits(
                          (data.win_2 * ((data.seestar - 1) * data.seestar)) /
                            90 +
                            (data.win_3 * (2 * muscle * data.seestar)) / 90 -
                            data.bet,
                          2,
                        ),
                      )}{' '}
                      €
                    </>,
                    <>=</>,
                    <>x · {ppFrac(((muscle - 1) * muscle) / 90)} </>,
                  ],
                  [
                    <>x</>,
                    <>=</>,
                    <>
                      <strong>
                        {pp(
                          -roundToDigits(
                            (data.win_2 * ((data.seestar - 1) * data.seestar)) /
                              90 +
                              (data.win_3 * (2 * muscle * data.seestar)) / 90 -
                              data.bet,
                            2,
                          ) /
                            (((muscle - 1) * muscle) / 90),
                        )}{' '}
                        €{' '}
                      </strong>
                    </>,
                  ],
                ])}
              </span>
            </div>
            <p>
              Das Spiel wäre fair, wenn der Gewinn für {'"'}zweimal Muschel
              {'"'}{' '}
              {pp(
                -roundToDigits(
                  (data.win_2 * ((data.seestar - 1) * data.seestar)) / 90 +
                    (data.win_3 * (2 * muscle * data.seestar)) / 90 -
                    data.bet,
                  2,
                ) /
                  (((muscle - 1) * muscle) / 90),
              )}{' '}
              € beträgt.
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
              Die Vorderseite einer Tennishalle hat annähernd die Form einer
              Parabel. Sie lässt sich mit der Funktionsgleichung <br></br>y = a
              · x² + c beschreiben.{' '}
            </p>
            <svg viewBox="0 0 328 110">
              <image
                href="/content/BW_Realschule/215_Halle.jpg"
                height="110"
                width="328"
              />
              <text
                x={137}
                y={65}
                fontSize={10}
                textAnchor="middle"
                stroke="black"
              >
                {data.maß} m
              </text>
            </svg>
            <p>
              Die maximale Höhe der Halle beträgt {data.höhe_max} m Die Halle
              hat am Boden eine Breite von {data.breite_max} m.
            </p>
            <ul>
              <li>Gib eine mögliche Funktionsgleichung an.</li>
            </ul>
            <p>
              In die Vorderseite der Tennishalle soll eine rechteckige
              Fensterfläche mittig eingebaut werden. Dazu werden zwei Vorschläge
              geprüft.
            </p>
            <p>
              Vorschlag 1: <br></br>Die Fensterfläche soll eine Höhe von{' '}
              {data.maß} m haben. Die beiden oberen Eckpunkte berühren den
              Parabelbogen (siehe Abbildung).
            </p>
            <ul>
              <li>Berechne den Flächeninhalt dieser Fensterfläche.</li>
            </ul>
            <p>
              Vorschlag 2: <br></br>Die Fensterfläche soll eine Breite von{' '}
              {data.maß} m haben.{' '}
            </p>
            <ul>
              <li>Berechne die größtmögliche Höhe dieser Fensterfläche.</li>
              <li>Welche der beiden Fensterflächen ist größer? Berechne.</li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const fläche_1 =
          data.höhe_max *
          (2 *
            roundToDigits(
              Math.sqrt(
                (data.maß - data.höhe_max) /
                  (-data.höhe_max / Math.pow(data.breite_max / 2, 2)),
              ),
              2,
            ))
        const fläche_2 =
          data.maß *
          roundToDigits(
            (data.maß / 2) *
              (data.maß / 2) *
              (-data.höhe_max / Math.pow(data.breite_max / 2, 2)) +
              data.höhe_max,
            2,
          )
        return (
          <>
            <p>
              <strong>Funktionsgleichung der Parabel</strong>
            </p>
            <p>
              Die Funktionsgleichung ist gegeben durch y = a · x² + c und
              beschreibt eine Parabel, die mit dem Scheitel auf der y-Achse
              liegt.
            </p>

            <svg viewBox="0 0 328 110">
              <image
                href="/content/BW_Realschule/215_Halle.jpg"
                height="110"
                width="328"
              />
              <text
                x={137}
                y={65}
                fontSize={10}
                textAnchor="middle"
                stroke="black"
              >
                {data.maß} m
              </text>
              <line
                x1={0}
                y1={89}
                x2={310}
                y2={89}
                stroke="blue"
                strokeWidth={2}
              />
              <line
                x1={120}
                y1={10}
                x2={120}
                y2={89}
                stroke="blue"
                strokeWidth={2}
              />
              <text
                x={300}
                y={85}
                fontSize={20}
                textAnchor="right"
                stroke="blue"
              >
                x
              </text>
              <text
                x={130}
                y={15}
                fontSize={20}
                textAnchor="right"
                stroke="blue"
              >
                y
              </text>
            </svg>
            <p>
              In diesem Koordinatensystem hätte die Parabel die Nullstellen N
              <sub>1</sub>({data.breite_max / 2}|0) und N<sub>2</sub>(
              {-data.breite_max / 2}|0). Der Scheitel liegt im Punkt <br></br>
              (0|
              {data.höhe_max}), weshalb gilt:
            </p>
            <p>y = a · x² + {data.höhe_max}</p>
            <p>Setze eine der Nullstellen ein und berechne a:</p>
            {buildEquation([
              [<>y</>, <>=</>, <>a · x² + {data.höhe_max}</>],
              [
                <>0</>,
                <>=</>,
                <>
                  a · {data.breite_max / 2}² + {data.höhe_max}
                </>,
                <>| {pp(-data.höhe_max, 'merge_op')}</>,
              ],
              [
                <>{pp(-data.höhe_max)}</>,
                <>=</>,
                <>a · {data.breite_max / 2}²</>,
                <>| : {data.breite_max / 2}²</>,
              ],
              [
                <>a</>,
                <>=</>,
                <>{pp(-data.höhe_max / Math.pow(data.breite_max / 2, 2))}</>,
              ],
            ])}
            <p>
              Die Funktionsgleichung lautet also:<br></br>
              <strong>
                y = {pp(-data.höhe_max / Math.pow(data.breite_max / 2, 2))} · x²
                + {data.höhe_max}
              </strong>
            </p>
            <p>
              <strong>Fensterfläche mit Höhe {data.maß} m</strong>
            </p>
            <p>
              Bestimme die Positionen x<sub>1</sub>, x<sub>2</sub>, an denen die
              Parabel den y-Wert {data.maß} hat. Dort verläuft die Parabel am
              Fenster entlang.
            </p>
            {buildEquation([
              [
                <>{data.maß}</>,
                <>=</>,
                <>
                  {pp(-data.höhe_max / Math.pow(data.breite_max / 2, 2))} · x² +{' '}
                  {data.höhe_max}
                </>,
                <>| {pp(-data.höhe_max, 'merge_op')}</>,
              ],
              [
                <>{data.maß - data.höhe_max}</>,
                <>=</>,
                <>
                  {pp(-data.höhe_max / Math.pow(data.breite_max / 2, 2))} · x² +{' '}
                  {data.höhe_max}
                </>,
                <>
                  | : {pp(-data.höhe_max / Math.pow(data.breite_max / 2, 2))}
                </>,
              ],
              [
                <>x²</>,
                <>≈</>,
                <>
                  {pp(
                    roundToDigits(
                      (data.maß - data.höhe_max) /
                        (-data.höhe_max / Math.pow(data.breite_max / 2, 2)),
                      2,
                    ),
                  )}
                </>,
                <>| √</>,
              ],
              [
                <>
                  x<sub>1</sub>
                </>,
                <>≈</>,
                <>
                  {pp(
                    roundToDigits(
                      Math.sqrt(
                        (data.maß - data.höhe_max) /
                          (-data.höhe_max / Math.pow(data.breite_max / 2, 2)),
                      ),
                      2,
                    ),
                  )}
                </>,
              ],
              [
                <>
                  x<sub>2</sub>
                </>,
                <>≈</>,
                <>
                  {pp(
                    -roundToDigits(
                      Math.sqrt(
                        (data.maß - data.höhe_max) /
                          (-data.höhe_max / Math.pow(data.breite_max / 2, 2)),
                      ),
                      2,
                    ),
                  )}
                </>,
              ],
            ])}
            <p>
              Die gesamte Fensterfront hat dann eine Breite von:{' '}
              {pp(
                2 *
                  roundToDigits(
                    Math.sqrt(
                      (data.maß - data.höhe_max) /
                        (-data.höhe_max / Math.pow(data.breite_max / 2, 2)),
                    ),
                    2,
                  ),
              )}{' '}
              m
            </p>
            <p>Dieser Vorschlag ergibt eine Fensterfläche von:</p>
            {buildEquation([
              [<>A</>, <>=</>, <>Höhe · Breite</>],
              [
                <></>,
                <>=</>,
                <>
                  {data.höhe_max} m ·{' '}
                  {pp(
                    2 *
                      roundToDigits(
                        Math.sqrt(
                          (data.maß - data.höhe_max) /
                            (-data.höhe_max / Math.pow(data.breite_max / 2, 2)),
                        ),
                        2,
                      ),
                  )}{' '}
                  m
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <strong>{pp(fläche_1)} m²</strong>
                </>,
              ],
            ])}
            <p>
              <strong>Fensterfläche mit Breite {data.maß} m</strong>
            </p>
            <p>
              Bei einer Breite von {data.maß} m grenzt die Fensterfläche bei x
              <sub>1</sub> = {pp(data.maß / 2)} m und x<sub>2</sub> ={' '}
              {pp(-data.maß / 2)} m an der Parabel.
            </p>
            <p>Berechne den y-Wert an dieser Stelle:</p>
            {buildEquation([
              [
                <>y</>,
                <>=</>,
                <>
                  {pp(-data.höhe_max / Math.pow(data.breite_max / 2, 2))} ·{' '}
                  {pp(data.maß / 2)}² + {data.höhe_max}
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  {pp(
                    roundToDigits(
                      (data.maß / 2) *
                        (data.maß / 2) *
                        (-data.höhe_max / Math.pow(data.breite_max / 2, 2)) +
                        data.höhe_max,
                      2,
                    ),
                  )}{' '}
                </>,
              ],
            ])}
            <p>
              Die Fensterfläche hat damit eine maximale Höhe von{' '}
              {pp(
                roundToDigits(
                  (data.maß / 2) *
                    (data.maß / 2) *
                    (-data.höhe_max / Math.pow(data.breite_max / 2, 2)) +
                    data.höhe_max,
                  2,
                ),
              )}{' '}
              m. Die Fläche beträgt dann:
            </p>
            <p>
              A = {data.maß} m ·{' '}
              {pp(
                roundToDigits(
                  (data.maß / 2) *
                    (data.maß / 2) *
                    (-data.höhe_max / Math.pow(data.breite_max / 2, 2)) +
                    data.höhe_max,
                  2,
                ),
              )}{' '}
              m = <strong>{pp(fläche_2)} m²</strong>
            </p>
            <p>
              <strong>Größere Fensterfläche</strong>
            </p>
            <p>Vergleiche die Fensterflächen:</p>
            <p>
              {pp(fläche_1)} m² {fläche_1 > fläche_2 ? '>' : '<'} {pp(fläche_2)}{' '}
              m²
            </p>
            <p>
              <strong>
                Vorschlag {fläche_1 > fläche_2 ? '1' : '2'} hat die größere
                Fensterfläche.
              </strong>
            </p>
          </>
        )
      },
    },
  ],
}
