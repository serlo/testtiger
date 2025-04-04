import { Exercise } from '@/data/types'
import { Color1, Color4 } from '@/helper/colors'
import { kürzeBruch } from '@/helper/kuerze-bruch'
import { buildEquation, buildFrac } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  r: number
  case: number
  right: number
}

export const exercise42: Exercise<DATA> = {
  title: 'Kugel',
  source: '2018 Teil 1 Aufgabe 3',
  useCalculator: true,
  duration: 4,
  generator(rng) {
    return {
      r: rng.randomIntBetween(3, 8),
      case: rng.randomIntBetween(0, 2),
      right: rng.randomIntBetween(0, 1),
    }
  },
  originalData: {
    r: 5,
    case: 0,
    right: 0,
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    const rad = data.r * 16
    return (
      <>
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="150"
            cy="150"
            r={rad}
            stroke="#007EC1"
            strokeWidth="3"
            fill="transparent"
          />
          <ellipse
            cx="150"
            cy="150"
            rx={rad}
            ry={rad / 2.5}
            stroke="#007Ec1"
            strokeDasharray="4 4"
            fill="transparent"
          />
          <circle cx="150" cy="150" r="3" fill="black" />
          <line
            x1="150"
            y1="150"
            x2={150 + rad * 0.6}
            y2={150 + rad * 0.3}
            stroke="#007Ec1"
            strokeDasharray="4 4"
          />
          <rect
            x={147 + rad * 0.5}
            y={137 + rad * 0.35}
            width="16"
            height="18"
            rx="4"
            ry="4"
            fill="#C4DDEB"
            strokeWidth="2"
          />
          <text
            x={152 + rad * 0.5}
            y={150 + rad * 0.35}
            font-size="14"
            fill="black"
          >
            r
          </text>
        </svg>

        <p>Eine Kugel hat einen Radius von {data.r} cm.</p>
      </>
    )
  },
  tasks: [
    {
      points: 2,
      duration: 2,
      task({ data }) {
        return (
          <>
            <p>a) Berechne die Oberfläche der Kugel.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Berechne die Oberfläche der Kugel mit der Formel:</p>
            {buildEquation([
              [<>O</>, <>=</>, <>4 · π · r²</>],
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
                    <span style={{ fontSize: 'small' }}>Radius einsetzen</span>
                  </Color4>
                </>,
              ],
              [<></>, <>=</>, <>4 · π · {data.r}²</>],
              [
                <></>,
                <>
                  <strong>≈</strong>
                </>,
                <>
                  <strong>
                    {pp(roundToDigits(4 * Math.PI * Math.pow(data.r, 2), 2))}{' '}
                    [cm²]
                  </strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 2,
      duration: 4,
      correctionHints({ data }) {
        return (
          <>
            Überprüfe genau, dass die Antwort eine vollständige Begründung
            enthält und eine Aussage, ob Sine recht hat oder nicht. Wenn die
            Antwort eines davon nicht enthält, ist sie unvollständig.
          </>
        )
      },
      task({ data }) {
        const text1_case = ['verdopple', 'verdreifache', 'halbiere']
        const text_falsch = ['verdoppelt', 'verdreifacht', 'halbiert']
        const text_korrekt = ['vervierfacht', 'verneunfacht', 'viertelt']

        return (
          <>
            <p>
              b) Sina überlegt: Wenn ich den Radius {text1_case[data.case]},{' '}
              {data.right == 1 && (
                <>dann {text_korrekt[data.case]} sich die Oberfläche. </>
              )}
              {data.right == 0 && (
                <>dann {text_falsch[data.case]} sich auch die Oberfläche. </>
              )}
              <p />
              <p>Hat Sina recht? Begründe deine Entscheidung.</p>
            </p>
          </>
        )
      },
      solution({ data }) {
        const text2_case = ['doppelt', 'dreifach', 'halb']
        const text3_case = ['vervierfacht', 'verneunfacht', 'viertelt']
        const faktor = [2, 3, 0.5]
        return (
          <>
            <p>
              Setze den <Color1>{text2_case[data.case]}en</Color1> Radius in die
              Formel für die veränderte Oberfläche O&apos; ein:
            </p>
            {buildEquation([
              [<>O&apos;</>, '=', <>4 · π · r&apos;²</>],
              [
                '',
                '=',
                <>
                  4 · π · (<Color1>{ppFrac(faktor[data.case])}</Color1> ·{' '}
                  {data.r})²
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
                      Klammer auflösen mit Potenzgesetz
                    </span>
                  </Color4>
                </>,
              ],
              [
                '',
                '=',
                <>
                  4 · π · {data.case == 2 && '('}
                  <Color1>{ppFrac(faktor[data.case])}</Color1>
                  {data.case == 2 && ')'}² · {data.r}²
                </>,
              ],
              [
                '',
                '=',
                <>
                  <Color1>
                    {ppFrac(faktor[data.case] * faktor[data.case])}
                  </Color1>{' '}
                  · 4 · π · {data.r}²
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
                      4 · π · {data.r}² ist die ursprüngliche Oberfläche
                    </span>
                  </Color4>
                </>,
              ],
              [
                '',
                '=',
                <>
                  <Color1>
                    {ppFrac(faktor[data.case] * faktor[data.case])}
                  </Color1>{' '}
                  · O
                </>,
              ],
            ])}

            <p>
              Die ursprüngliche Oberfläche{' '}
              <Color1>{text3_case[data.case]}</Color1> sich bei{' '}
              <Color1>{text2_case[data.case]}em</Color1> Radius.
            </p>
            <p>
              Die Aussage von Sina ist also{' '}
              <strong>
                {data.right == 0 && 'falsch'}
                {data.right == 1 && 'richtig'}
              </strong>
              .
            </p>
          </>
        )
      },
    },
  ],
}
