import { Exercise } from '@/data/types'
import { Color1, Color4 } from '@/helper/colors'
import { buildEquation, buildSqrt } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  a: number
  b: number
  case: number
  r: number
}

export const exercise32: Exercise<DATA> = {
  title: 'Rechteck',
  source: '2019 Teil 1 Aufgabe 2',
  useCalculator: true,
  duration: 4,
  generator(rng) {
    return {
      a: rng.randomIntBetween(3, 12),
      b: rng.randomIntBetween(2, 10),
      case: rng.randomIntBetween(0, 3),
      r: rng.randomIntBetween(1, 6) * 6,
    }
  },
  originalData: {
    a: 5,
    b: 3,
    case: 0,
    r: 24,
  },
  constraint({ data }) {
    return data.a > data.b && data.a * data.b != data.r
  },
  intro({ data }) {
    return (
      <>
        <>
          <img
            src="/content/NRW_MSA/NRW_MSA_2019_1_2_rechteck.svg"
            alt="Rechteck mit Diagonale"
            className="w-[250px] mx-auto"
          />
          <p>
            Ein Rechteck hat die Seitenlängen a = {data.a} cm und b = {data.b}{' '}
            cm.
          </p>
        </>
      </>
    )
  },
  tasks: [
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>a) Berechne die Länge der Diagonale d.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Verwende den Satz des Pythagoras. Zwei Seiten des Rechtecks bilden
              mit der Diagonale ein rechtwinkliges Dreieck. In diesem gilt:
            </p>
            {buildEquation([
              [<>a² + b²</>, '=', <>d²</>],
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
                    <span style={{ fontSize: 'small' }}>Einsetzen</span>
                  </Color4>
                </>,
              ],
              [
                <>
                  {data.a}² + {pp(data.b)}²
                </>,
                '=',
                <>d²</>,
                <>| √</>,
              ],
              ['d', '=', <>{buildSqrt(data.a + '² + ' + data.b + '²')}</>],
              [
                '',
                <>
                  {Math.sqrt(data.a * data.a + data.b * data.b) % 1 == 0
                    ? '='
                    : '≈'}
                </>,
                <>
                  {pp(
                    roundToDigits(
                      Math.sqrt(data.a * data.a + data.b * data.b),
                      2,
                    ),
                  )}{' '}
                  [cm]
                </>,
              ],
            ])}

            <p>
              Die Diagonale d ist{' '}
              {Math.sqrt(data.a * data.a + data.b * data.b) % 1 == 0
                ? ''
                : 'ungefähr'}{' '}
              <strong>
                {pp(
                  roundToDigits(
                    Math.sqrt(data.a * data.a + data.b * data.b),
                    2,
                  ),
                )}{' '}
                cm
              </strong>{' '}
              lang.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        const text = ['verdoppelt', 'verdreifacht', 'vervierfacht', 'halbiert']
        return (
          <>
            <p>
              b) Wie verändert sich der Flächeninhalt dieses Rechtecks, wenn man
              jede Seitenlänge {text[data.case]}? Begründe.
            </p>
          </>
        )
      },
      solution({ data }) {
        const text = ['verdoppelt', 'verdreifacht', 'vervierfacht', 'halbiert']
        const zahl = [2, 3, 4, 0.5]
        return (
          <>
            <p>
              Den Flächeninhalt des veränderten Rechtecks berechnest du mit:
            </p>

            {buildEquation([
              [<>A&apos;</>, '=', <>Länge · Breite</>],
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
                      <Color1>{text[data.case]}e</Color1> Seitenlängen einsetzen
                    </span>
                  </Color4>
                </>,
              ],
              [
                '',
                '=',
                <>
                  <Color1>{ppFrac(zahl[data.case])}</Color1> · {data.a} ·{' '}
                  <Color1>{ppFrac(zahl[data.case])}</Color1> · {data.b}
                </>,
              ],
              [
                '',
                '=',
                <>
                  <Color1>{ppFrac(zahl[data.case])}</Color1> ·{' '}
                  <Color1>{ppFrac(zahl[data.case])}</Color1> · {data.a} ·{' '}
                  {data.b}
                </>,
              ],
              [
                '',
                '=',
                <>
                  <Color1>{ppFrac(zahl[data.case] * zahl[data.case])}</Color1> ·{' '}
                  {data.a} · {data.b}
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
                      {data.a} · {data.b} ist die ursprüngliche Fläche A
                    </span>
                  </Color4>
                </>,
              ],
              [
                '',
                '=',
                <>
                  <Color1>{ppFrac(zahl[data.case] * zahl[data.case])}</Color1> ·
                  A
                </>,
              ],
            ])}

            <p>
              Wenn man die Seitenlängen {text[data.case]}, beträgt der neue
              Flächeninhalt{' '}
              <strong>
                {(data.case == 1 || data.case == 2 || data.case == 0) && 'das '}
                {ppFrac(zahl[data.case] * zahl[data.case])}
                {(data.case == 1 || data.case == 2 || data.case == 0) &&
                  '-fache'}{' '}
                des ursprünglichen Flächeninhalts
              </strong>
              .
            </p>
          </>
        )
      },
    },
    {
      points: 1,
      task({ data }) {
        return (
          <>
            <p>
              c) Ein anderes Rechteck hat einen Flächeninhalt von {data.r} cm².
              Wie lang könnten die Seiten sein? Gib zwei unterschiedliche
              Möglichkeiten an.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Gesucht sind Zahlenpaare deren Produkt {data.r} ergibt.</p>
            {data.r == 6 && (
              <>
                <p>Zwei Möglichkeiten für die Seitenlängen sind:</p>
                <ul>
                  <li>
                    <strong> 1 cm und 6 cm </strong>
                  </li>

                  <li>
                    <strong> 3 cm und 2 cm </strong>{' '}
                  </li>
                </ul>
              </>
            )}
            {data.r == 12 && (
              <>
                <p>Zwei Möglichkeiten für die Seitenlängen sind:</p>
                <ul>
                  <li>
                    <strong> 2 cm und 6 cm </strong>
                  </li>

                  <li>
                    <strong> 3 cm und 4 cm </strong>{' '}
                  </li>
                </ul>
              </>
            )}
            {data.r == 18 && (
              <>
                <p>Zwei Möglichkeiten für die Seitenlängen sind:</p>
                <ul>
                  <li>
                    <strong> 3 cm und 6 cm </strong>
                  </li>

                  <li>
                    <strong> 2 cm und 9 cm </strong>{' '}
                  </li>
                </ul>
              </>
            )}
            {data.r == 24 && (
              <>
                <p>Zwei Möglichkeiten für die Seitenlängen sind:</p>
                <ul>
                  <li>
                    <strong> 4 cm und 6 cm </strong>
                  </li>

                  <li>
                    <strong> 3 cm und 8 cm </strong>{' '}
                  </li>
                </ul>
              </>
            )}
            {data.r == 30 && (
              <>
                <p>Zwei Möglichkeiten für die Seitenlängen sind:</p>
                <ul>
                  <li>
                    <strong> 5 cm und 6 cm </strong>
                  </li>

                  <li>
                    <strong> 3 cm und 10 cm </strong>{' '}
                  </li>
                </ul>
              </>
            )}
            {data.r == 36 && (
              <>
                <p>Zwei Möglichkeiten für die Seitenlängen sind:</p>
                <ul>
                  <li>
                    <strong> 6 cm und 6 cm </strong>
                  </li>

                  <li>
                    <strong> 9 cm und 4 cm </strong>{' '}
                  </li>
                </ul>
              </>
            )}
          </>
        )
      },
    },
  ],
}
