import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { kürzeBruch } from '@/helper/kuerze-bruch'
import {
  buildEquation,
  buildFrac,
  buildInlineFrac,
} from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  dia: number
  weight: number
  length: number
  height: number
  red: number
  white: number
}

export const exercise36: Exercise<DATA> = {
  title: 'Kaugummis',
  source: '2019 Teil 2 Aufgabe 1',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    return {
      dia: rng.randomIntBetween(10, 16),
      weight: rng.randomIntBetween(70, 130) / 100,
      length: rng.randomIntBetween(12, 19) + 0.5,
      height: rng.randomIntBetween(35, 45) + 0.5,
      red: rng.randomItemFromArray([2, 4, 6, 8, 10]),
      white: rng.randomItemFromArray([18, 16, 14, 12, 10]),
    }
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Steffi hat zum Geburtstag einen Kaugummiautomaten und eine Tüte mit
          Kaugummikugeln bekommen.
        </p>
      </>
    )
  },
  tasks: [
    {
      points: 3,
      task({ data }) {
        return (
          <>
            <p>
              a) Eine Kaugummikugel hat einen Durchmesser von {data.dia} mm.
            </p>

            <p>
              Bestätige durch eine Rechnung, dass das Volumen einer
              Kaugummikugel ca.{' '}
              {pp(
                roundToDigits(
                  ((4 / 3) * Math.pow(data.dia / 2, 3) * Math.PI) / 1000,
                  2,
                ),
              )}{' '}
              cm³ beträgt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const V = (4 / 3) * Math.PI * Math.pow(data.dia / 2, 3)
        return (
          <>
            <p>
              <strong>Volumen bestimmen</strong>
            </p>
            <p>Berechne das Volumen der Kugel mit der Formel:</p>
            {buildEquation([
              [<>V</>, <>=</>, <>{buildInlineFrac(4, 3)} π · r³</>],
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
                      Radius bestimmen und einsetzen
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(4, 3)} π · {pp(data.dia / 2)}³
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  <strong>{pp(roundToDigits(V, 2))} [mm³]</strong>
                </>,
              ],
            ])}
            <p>
              <strong>Einheit umrechnen</strong>
            </p>
            <p>
              Ein cm³ entspricht 1000 mm³. <br></br>Rechne das Volumen in cm³
              um:
            </p>
            <p>
              {pp(roundToDigits(V, 2))} : 1000 ≈{' '}
              <strong>{pp(roundToDigits(V / 1000, 2))} [cm³]</strong>
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      skillIntro({ data }) {
        const V = (4 / 3) * Math.PI * Math.pow(data.dia / 2, 3)
        return (
          <>
            <p>
              Steffi hat zum Geburtstag einen Kaugummiautomaten und eine Tüte
              mit Kaugummikugeln bekommen.
            </p>
            <p>
              Eine Kaugummikugel hat ein Volumen von{' '}
              {pp(roundToDigits(V / 1000, 2))} [cm³].
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>b) 1 cm³ Kaugummimasse wiegt {pp(data.weight)} g.</p>
            <p>
              Berechne, wie viel Kaugummikugeln in einer 300-Gramm-Packung sind.
            </p>
          </>
        )
      },
      solution({ data }) {
        const V = roundToDigits(
          ((4 / 3) * Math.PI * Math.pow(data.dia / 2, 3)) / 1000,
          2,
        )
        const solution = roundToDigits(300 / (data.weight * V), 2)
        return (
          <>
            <p>Eine Kugel hat ein Volumen von etwa {pp(V)} cm³.</p>
            <p>
              Damit hat sie ein Gewicht von:<br></br> {pp(V)} ·{' '}
              {pp(data.weight)} ≈ {pp(roundToDigits(data.weight * V, 2))} [g]{' '}
            </p>
            <p>
              {' '}
              In einer 300 g - Packung sind demnach:<br></br> 300 :{' '}
              {pp(roundToDigits(data.weight * V, 2))}{' '}
              {Number.isInteger(solution) ? '=' : '≈'}{' '}
              <b>{Math.round(solution)} Kaugummikugeln</b>
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      skillIntro({ data }) {
        const V = roundToDigits(
          ((4 / 3) * Math.PI * Math.pow(data.dia / 2, 3)) / 1000,
          2,
        )
        return (
          <>
            <p>
              Steffi hat zum Geburtstag einen Kaugummiautomaten und eine Tüte
              mit Kaugummikugeln bekommen.
            </p>
            <p>Eine Kugel hat ein Volumen von etwa {pp(V)} cm³.</p>
          </>
        )
      },
      task({ data }) {
        const V = roundToDigits(
          ((4 / 3) * Math.pow(data.dia / 2, 3) * Math.PI) / 1000,
          2,
        )
        return (
          <>
            <p>
              c) Der Behälter für die Kaugummikugeln ist {pp(data.length)} cm
              breit, {pp(data.length)} cm tief und {pp(data.height)} cm hoch.
              Steffi möchte wissen, wie viele Kaugummikugeln in den Behälter
              passen und rechnet <br></br>({pp(data.length)} · {pp(data.length)}{' '}
              · {pp(data.height)}) : {pp(V)} ≈{' '}
              {pp(
                roundToDigits((data.length * data.length * data.height) / V, 2),
              )}
            </p>
            <p>
              Erkläre Steffis Rechnung und beurteile, ob Steffis Rechnung
              geeignet ist, die Anzahl der Kaugummikugeln in der Realität zu
              berechnen.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Steffi hat mit dem Term in der Klammer das Volumen des
              quaderförmigen Behälters berechnet.
            </p>
            <p>
              Geteilt durch das Volumen einer Kugel hat sie versucht, die Anzahl
              der Kaugummis zu bestimmen, die in den Behälter passen.
            </p>
            <p>
              Das Volumen des Behälters wird aber nicht vollständig von den
              Kugeln ausgefüllt. Zwischen den Kugeln bleibt Platz frei, der
              nicht besetzt werden kann. Damit ist Steffis Ansatz{' '}
              <strong>nicht geeignet</strong>.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      intro({ data }) {
        return (
          <>
            <p>
              Steffi füllt eine Mischung aus {data.red} roten und {data.white}{' '}
              weißen Kaugummikugeln in den Automaten. Durch Drehen am Automaten
              enthält man zufällig eine rote oder eine weiße Kaugummikugel.
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              d) Begründe, dass die Wahrscheinlichkeit, beim ersten Drehen eine
              rote Kaugummikugel zu erhalten,{' '}
              {ppFrac(data.red / (data.red + data.white))} beträgt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const bruch = kürzeBruch(data.red, data.red + data.white)
        return (
          <>
            <p>Mit der Laplace-Formel gilt:</p>

            {buildEquation([
              [
                'P("rote Kugel")',
                '=',
                buildFrac('Anzahl roter Kugeln', 'Anzahl aller Kugeln'),
              ],
              ['', '=', buildFrac(data.red, data.red + data.white)],
              [
                '',
                '=',
                <>
                  <strong>{buildFrac(bruch.zähler, bruch.nenner)}</strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 3,
      task({ data }) {
        const bruch = kürzeBruch(data.red, data.red + data.white)
        const bruch_2 = kürzeBruch(data.red, data.red + data.white - 1)
        return (
          <>
            <p>
              e) Das Baumdiagramm zeigt die Wahrscheinlichkeiten, beim ersten
              und zweiten Drehen eine rote oder weiße Kaugummikugel zu erhalten.
            </p>
            <svg viewBox="0 0 400 382">
              <image
                href="/content/NRW_MSA_Kaugummi_Baumdiagramm.PNG"
                height="400"
                width="382"
              />
              <rect
                x="58"
                y="245"
                width="25"
                height="55"
                rx="4"
                ry="4"
                fill="#189BCC"
              />
              <rect
                x="58"
                y="155"
                width="25"
                height="55"
                rx="4"
                ry="4"
                fill="#F9B9BA"
              />
              <rect
                x="219"
                y="235"
                width="25"
                height="55"
                rx="4"
                ry="4"
                fill="#F9B9BA"
              />
              <rect
                x="219"
                y="300"
                width="25"
                height="55"
                rx="4"
                ry="4"
                fill="#189BCC"
              />
              <rect
                x="219"
                y="169"
                width="25"
                height="55"
                rx="4"
                ry="4"
                fill="#189BCC"
              />
              <rect
                x="219"
                y="100"
                width="25"
                height="55"
                rx="4"
                ry="4"
                fill="#189BCC"
              />
              <foreignObject x="60" y="150" width={200} height={200}>
                {buildFrac(bruch.zähler, bruch.nenner)}
              </foreignObject>
              <foreignObject x="220" y="230" width={200} height={200}>
                {buildFrac(bruch_2.zähler, bruch_2.nenner)}
              </foreignObject>
            </svg>
            <p> Ergänze die fehlenden Einträge im Baumdiagramm.</p>
          </>
        )
      },
      solution({ data }) {
        const bruch = kürzeBruch(data.red, data.red + data.white)
        const bruch2 = kürzeBruch(data.white, data.red + data.white)
        const bruch3 = kürzeBruch(data.red - 1, data.red + data.white - 1)
        const bruch4 = kürzeBruch(data.white, data.red + data.white - 1)
        const bruch5 = kürzeBruch(data.red, data.red + data.white - 1)
        const bruch6 = kürzeBruch(data.white - 1, data.red + data.white - 1)
        return (
          <>
            <svg viewBox="0 0 400 382">
              <image
                href="/content/NRW_MSA_Kaugummi_Baumdiagramm.PNG"
                height="400"
                width="382"
              />
              <rect
                x="58"
                y="245"
                width="25"
                height="55"
                rx="4"
                ry="4"
                fill="#F9B9BA"
              />
              <rect
                x="58"
                y="155"
                width="25"
                height="55"
                rx="4"
                ry="4"
                fill="#F9B9BA"
              />
              <rect
                x="219"
                y="235"
                width="25"
                height="55"
                rx="4"
                ry="4"
                fill="#F9B9BA"
              />
              <rect
                x="219"
                y="300"
                width="25"
                height="55"
                rx="4"
                ry="4"
                fill="#F9B9BA"
              />
              <rect
                x="219"
                y="169"
                width="25"
                height="55"
                rx="4"
                ry="4"
                fill="#F9B9BA"
              />
              <rect
                x="219"
                y="100"
                width="25"
                height="55"
                rx="4"
                ry="4"
                fill="#F9B9BA"
              />
              <foreignObject x="60" y="152" width={200} height={200}>
                {buildFrac(bruch.zähler, bruch.nenner)}
              </foreignObject>
              <foreignObject x="60" y="240" width={200} height={200}>
                {buildFrac(bruch2.zähler, bruch2.nenner)}
              </foreignObject>
              <foreignObject x="222" y="97" width={200} height={200}>
                {buildFrac(bruch3.zähler, bruch3.nenner)}
              </foreignObject>
              <foreignObject x="222" y="165" width={200} height={200}>
                {buildFrac(bruch4.zähler, bruch4.nenner)}
              </foreignObject>
              <foreignObject x="220" y="231" width={200} height={200}>
                {buildFrac(bruch5.zähler, bruch5.nenner)}
              </foreignObject>
              <foreignObject x="220" y="295" width={200} height={200}>
                {buildFrac(bruch6.zähler, bruch6.nenner)}
              </foreignObject>
            </svg>
            <p>
              <b>Erklärung</b>
            </p>
            <p>
              Die Wahrscheinlichkeit im ersten Zug einen weißen Kaugummi zu
              ziehen beträgt:
            </p>
            <p>
              1 − {buildInlineFrac(bruch.zähler, bruch.nenner)} ={' '}
              {buildInlineFrac(bruch2.zähler, bruch2.nenner)}
            </p>
            <p>
              Da bekannt ist, dass {data.red} rote, {data.white} weiße und
              insgesamt {data.red + data.white} Kaugummis vorhanden sind, kann
              die 2. Ebene des Baumdiagramms vollständig ausgefüllt werden.
            </p>
            <p>
              {' '}
              Achte dabei darauf, dass beim zweiten Zug eine Kugel der gezogenen
              Farbe weniger vorhanden ist.
            </p>
          </>
        )
      },
    },
    {
      points: 4,
      task({ data }) {
        return (
          <>
            <p>
              f) Steffis Bruder behauptet: {'"'}Die Wahrscheinlichkeit, zwei
              verschiedenfarbige Kaugummikugeln zu erhalten, ist kleiner als 50
              %.{'"'}
            </p>
            <p>Hat er recht? Überprüfe mit einer Rechnung.</p>
          </>
        )
      },
      solution({ data }) {
        const bruch = kürzeBruch(data.red, data.red + data.white)
        const bruch2 = kürzeBruch(data.white, data.red + data.white)
        const bruch4 = kürzeBruch(data.white, data.red + data.white - 1)
        const bruch5 = kürzeBruch(data.red, data.red + data.white - 1)
        return (
          <>
            <p>
              Berechne die Wahrscheinlichkeit mithilfe der passenden Pfade im
              Baumdiagramm. Bestimme dazu die Pfade mit verschiedenfarbigen
              Kaugummis. <br></br>
              <br></br>Mit den Pfadregeln gilt:
            </p>
            {buildEquation([
              [
                <>p(rw;wr)</>,
                <>=</>,
                <>
                  {buildInlineFrac(bruch.zähler, bruch.nenner)} ·{' '}
                  {buildInlineFrac(bruch4.zähler, bruch4.nenner)} +{' '}
                  {buildInlineFrac(bruch2.zähler, bruch2.nenner)} ·{' '}
                  {buildInlineFrac(bruch5.zähler, bruch5.nenner)}
                </>,
              ],
              [
                <></>,
                <>
                  <strong>=</strong>
                </>,
                <>
                  <strong>
                    {pp(
                      roundToDigits(
                        2 *
                          ((data.red * data.white) /
                            ((data.red + data.white) *
                              (data.red + data.white - 1))),
                        2,
                      ),
                    )}
                  </strong>
                </>,
              ],
              [],
            ])}

            <p>
              Damit hat Steffis Bruder{' '}
              <strong>
                {roundToDigits(
                  2 *
                    ((data.red * data.white) /
                      ((data.red + data.white) * (data.red + data.white - 1))),
                  2,
                ) < 0.5
                  ? 'recht.'
                  : 'nicht recht.'}
              </strong>
            </p>
          </>
        )
      },
    },
  ],
}
