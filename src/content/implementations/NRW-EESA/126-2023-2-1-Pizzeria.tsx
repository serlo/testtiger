import { Exercise } from '@/data/types'
import { Color1, Color4, Color5 } from '@/helper/colors'
import { getGcd } from '@/helper/get-gcd'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  colors: Array<string>
  small: number
  dia: number
  case: number
}

export const exercise126: Exercise<DATA> = {
  title: 'Pizzeria',
  source: '2023 Teil 2 Aufgabe 1',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    return {
      dia: rng.randomIntBetween(7, 11) * 2,
      case: rng.randomIntBetween(1, 3),
      small: rng.randomIntBetween(45, 65) / 10,
      colors: rng.randomItemFromArray([
        [
          'blue',
          'orange',
          'red',
          'blue',
          'orange',
          'blue',
          'red',
          'orange',
          'blue',
          'orange',
          'blue',
          'green',
        ],
        [
          'orange',
          'orange',
          'red',
          'blue',
          'orange',
          'blue',
          'red',
          'green',
          'blue',
          'red',
          'blue',
          'green',
        ],
        [
          'red',
          'orange',
          'red',
          'green',
          'orange',
          'blue',
          'orange',
          'green',
          'blue',
          'red',
          'blue',
          'red',
        ],
        [
          'green',
          'orange',
          'red',
          'red',
          'orange',
          'blue',
          'red',
          'green',
          'blue',
          'orange',
          'green',
          'orange',
        ],
      ]),
    }
  },
  originalData: {
    case: 1,
    dia: 18,
    small: 4.9,
    colors: [
      'blue',
      'orange',
      'red',
      'blue',
      'orange',
      'blue',
      'red',
      'orange',
      'blue',
      'orange',
      'blue',
      'green',
    ],
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    // Anzahl der Sektoren
    const sectors = 12
    const centerX = 164 // Mittelpunkt des Kreises (X)
    const centerY = 125 // Mittelpunkt des Kreises (Y)
    const radius = 120 // Radius des Kreises
    const angleStep = (2 * Math.PI) / sectors // Berechnung der Winkel

    // Sektoren generieren
    const sectorsPaths = Array.from({ length: sectors }, (_, i) => {
      const startAngle = i * angleStep
      const endAngle = startAngle + angleStep

      // Endpunkte der Sektoren berechnen
      const x1 = centerX + radius * Math.cos(startAngle)
      const y1 = centerY + radius * Math.sin(startAngle)
      const x2 = centerX + radius * Math.cos(endAngle)
      const y2 = centerY + radius * Math.sin(endAngle)

      const color = data.colors[i] // Verwende die randomisierten Farben

      // SVG-Pfad für den Sektor
      return (
        <path
          key={i}
          d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
          fill={color} // Zufällige Farbe
          stroke="black"
          strokeWidth={1}
        />
      )
    })

    return (
      <>
        <p>Mehmet und Sina gehen zur Neueröffnung einer Pizzeria.</p>
        <p>
          Die Pizzeria hat ein Glücksrad aufgebaut. Jede Person darf einmal am
          Glücksrad drehen (Abbildung 1).
        </p>
        <p>Mehmet hofft darauf, einen Rabatt zu gewinnen.</p>
        <svg width="328" height="320">
          <circle
            cx="164"
            cy="125"
            r="120"
            fill="none"
            stroke="black"
            strokeWidth={3}
          />
          {sectorsPaths} {/* Hier werden die Sektoren hinzugefügt */}
          <rect
            x="120"
            y="260"
            width="10"
            height="10"
            fill="blue"
            stroke="none"
          />
          <text x="140" y="268" fontSize="10" textAnchor="left" fill="black">
            kein Gewinn
          </text>
          <rect
            x="120"
            y="275"
            width="10"
            height="10"
            fill="orange"
            stroke="none"
          />
          <text x="140" y="283" fontSize="10" textAnchor="left" fill="black">
            Getränk
          </text>
          <rect
            x="120"
            y="290"
            width="10"
            height="10"
            fill="red"
            stroke="none"
          />
          <text x="140" y="298" fontSize="10" textAnchor="left" fill="black">
            30 % Rabatt
          </text>
          <rect
            x="120"
            y="305"
            width="10"
            height="10"
            fill="green"
            stroke="none"
          />
          <text x="140" y="313" fontSize="10" textAnchor="left" fill="black">
            60 % Rabatt
          </text>
        </svg>
        <center>
          <Color5>
            <span style={{ fontSize: 'small' }}>Abbildung 1: Glücksrad</span>
          </Color5>
        </center>
      </>
    )
  },
  tasks: [
    {
      points: 2,
      duration: 1,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              a) Bestimme die Wahrscheinlichkeit für den Gewinn eines 60
              %-Rabatt-Gutscheins.
            </p>
          </>
        )
      },
      solution({ data }) {
        const count = data.colors.filter(
          (color: string) => color === 'green',
        ).length
        return (
          <>
            <p>
              Das Drehen eines Glücksrads ist ein Laplace-Experiment. Berechne
              die Wahrscheinlichkeit mit der Laplace-Formel:
            </p>
            {buildEquation([
              [
                <>p</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>Anzahl der grünen Felder</>,
                    <>Anzahl aller Felder</>,
                  )}
                </>,
              ],
              [
                <></>,
                <>
                  {getGcd(count, 12) == 1 ? (
                    <>
                      <strong>=</strong>
                    </>
                  ) : (
                    <>=</>
                  )}
                </>,
                <>
                  {getGcd(count, 12) == 1 ? (
                    <>
                      <strong>{buildInlineFrac(<>{count}</>, <>12</>)}</strong>
                    </>
                  ) : (
                    <>{buildInlineFrac(<>{count}</>, <>12</>)}</>
                  )}
                </>,
              ],
              [
                <></>,
                <>
                  {getGcd(count, 12) != 1 && (
                    <>
                      <strong>=</strong>
                    </>
                  )}
                </>,
                <>
                  {getGcd(count, 12) != 1 && (
                    <>
                      <strong>{ppFrac(count / 12)}</strong>
                    </>
                  )}
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 2,
      duration: 2,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              b) Bestimme die Wahrscheinlichkeit, dass Mehmet etwas gewinnt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const count = data.colors.filter(
          (color: string) => color === 'blue',
        ).length
        return (
          <>
            <p>
              Auf den blauen Feldern gewinnt Mehmet nichts. Die
              Wahrscheinlichkeit nichts zu gewinnen beträgt mit der
              Laplace-Formel:
            </p>
            {buildEquation([
              [
                <>p</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>Anzahl der blauen Felder</>,
                    <>Anzahl aller Felder</>,
                  )}
                </>,
              ],
              [
                <></>,
                <>{getGcd(count, 12) == 1 ? <>=</> : <>=</>}</>,
                <>
                  {getGcd(count, 12) == 1 ? (
                    <>{buildInlineFrac(<>{count}</>, <>12</>)}</>
                  ) : (
                    <>{buildInlineFrac(<>{count}</>, <>12</>)}</>
                  )}
                </>,
              ],
              [
                <></>,
                <>{getGcd(count, 12) != 1 && <>=</>}</>,
                <>{getGcd(count, 12) != 1 && <>{ppFrac(count / 12)}</>}</>,
              ],
            ])}
            <p>
              Die Wahrscheinlichkeit dafür, einen Gewinn zu erhalten, ist die
              Gegenwahrscheinlichkeit:
            </p>
            {buildEquation([
              [
                <>
                  P({'"'}Gewinn{'"'})
                </>,
                <>=</>,
                <>
                  1 − P({'"'}kein Gewinn{'"'})
                </>,
              ],
              [
                <></>,
                <>{getGcd(count, 12) != 1 && <>=</>}</>,
                <>{getGcd(count, 12) != 1 && <>1 - {ppFrac(count / 12)}</>}</>,
              ],
              [
                <></>,
                <>
                  <strong>=</strong>
                </>,
                <>
                  <strong>{buildInlineFrac(<>{12 - count}</>, <>12</>)}</strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 2,
      duration: 2,
      intro({ data }) {
        return (
          <>
            <p>
              Mehmet gewinnt einen 60%-Rabatt-Gutschein und möchte sich eine
              Pizza kaufen. Die Größen und Preise sind in der Tabelle
              dargestellt.
            </p>

            <div
              className="relative overflow-hidden rounded-lg max-w-[320px] mx-auto "
              style={{
                transform: 'scale(1)',
                transformOrigin: 'top left',
              }}
            >
              <table className="table-auto rounded-lg shadow-md w-full text-left text-[9px] ">
                <thead
                  className="uppercase bg-[#D2ECF6] text-[#404040]"
                  style={{ backgroundColor: '#D2ECF6', color: '#404040' }}
                >
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]"></td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      kleine Pizza <br></br>Durchmesser {data.dia} cm
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      große Pizza <br></br>Durchmesser {2 * data.dia} cm
                    </td>
                  </tr>
                </thead>
                <tbody
                  className="bg-white text-gray-500"
                  style={{ backgroundColor: '#FFFFFF', color: '#6b7280' }}
                >
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 text-black ">
                      Preis der Pizza
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      {pp(data.small)} €
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      {pp(2 * data.small)} €
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      Preis der Pizza <br></br>mit 60 % Rabatt
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black"></td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      {pp(2 * data.small * 0.4)} €
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              c) Bestätige durch eine Rechnung, dass Mehmet für die kleine Pizza{' '}
              {pp(data.small * 0.4)} € bezahlen müsste.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Der Rabatt auf die kleine Pizza beträgt:</p>
            {buildEquation([
              [<>W</>, <>=</>, <>G · p</>],
              [<></>, <>=</>, <>{pp(data.small)} · 0,6</>],
              [<></>, <>=</>, <>{pp(data.small * 0.6)} [€]</>],
            ])}
            <p>Der neue Preis abzüglich des Rabatts beträgt:</p>
            <p>
              {pp(data.small)} − {pp(data.small * 0.6)} ={' '}
              <strong>{pp(data.small * 0.4)} [€]</strong>
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 2,
      skillIntro({ data }) {
        return (
          <>
            <p>Mehmet und Sina gehen zur Neueröffnung einer Pizzeria.</p>
            <div
              className="relative overflow-hidden rounded-lg max-w-[320px] mx-auto "
              style={{
                transform: 'scale(1)',
                transformOrigin: 'top left',
              }}
            >
              <table className="table-auto rounded-lg shadow-md w-full text-left text-[9px] ">
                <thead
                  className="uppercase bg-[#D2ECF6] text-[#404040]"
                  style={{ backgroundColor: '#D2ECF6', color: '#404040' }}
                >
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]"></td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      kleine Pizza <br></br>Durchmesser {data.dia} cm
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      große Pizza <br></br>Durchmesser {2 * data.dia} cm
                    </td>
                  </tr>
                </thead>
                <tbody
                  className="bg-white text-gray-500"
                  style={{ backgroundColor: '#FFFFFF', color: '#6b7280' }}
                >
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 text-black ">
                      Preis der Pizza
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      {pp(data.small)} €
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      {pp(2 * data.small)} €
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      Preis der Pizza <br></br>mit 60 % Rabatt
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black"></td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      {pp(2 * data.small * 0.4)} €
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )
      },
      intro({ data }) {
        return (
          <>
            <p>
              Sina überlegt noch einmal und schaut sich die Preise und Flächen
              der Pizzen genauer an.
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              d) Zeige durch eine Rechnung, dass der Flächeninhalt einer kleinen
              Pizza ungefähr{' '}
              {pp(Math.round(Math.PI * (data.dia / 2) * (data.dia / 2)))} cm²
              beträgt.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Der Flächeninhalt der kleinen Pizza lässt sich mit der Formel für
              die Fläche eines Kreises berechnen:
            </p>
            {buildEquation([
              [<>A</>, <>=</>, <>π · r²</>],
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
              [<></>, <>=</>, <>π · {pp(data.dia / 2)}²</>],
              [
                <></>,
                <>≈</>,
                <>
                  {pp(
                    roundToDigits(Math.PI * (data.dia / 2) * (data.dia / 2), 2),
                  )}{' '}
                  [cm²]
                </>,
              ],
            ])}
            <p>
              Damit beträgt der Flächeninhalt etwa <br></br>
              {pp(Math.round(Math.PI * (data.dia / 2) * (data.dia / 2)))} cm².
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 2,
      skillIntro({ data }) {
        return (
          <>
            <div
              className="relative overflow-hidden rounded-lg max-w-[320px] mx-auto "
              style={{
                transform: 'scale(1)',
                transformOrigin: 'top left',
              }}
            >
              <table className="table-auto rounded-lg shadow-md w-full text-left text-[9px] ">
                <thead
                  className="uppercase bg-[#D2ECF6] text-[#404040]"
                  style={{ backgroundColor: '#D2ECF6', color: '#404040' }}
                >
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]"></td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      kleine Pizza <br></br>Durchmesser {data.dia} cm
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      große Pizza <br></br>Durchmesser {2 * data.dia} cm
                    </td>
                  </tr>
                </thead>
                <tbody
                  className="bg-white text-gray-500"
                  style={{ backgroundColor: '#FFFFFF', color: '#6b7280' }}
                >
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 text-black ">
                      Preis der Pizza
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      {pp(data.small)} €
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      {pp(2 * data.small)} €
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      Preis der Pizza <br></br>mit 60 % Rabatt
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black"></td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      {pp(2 * data.small * 0.4)} €
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              Sina behauptet: {'"'}Wenn ich eine große Pizza nehme, dann bekomme
              ich für den doppelten Preis eine {data.case == 1 && 'viermal'}
              {data.case == 2 && 'dreimal'}
              {data.case == 3 && 'doppelt'} so große Pizza.{'"'}
            </p>
            <p>e) Hat Sina recht? Begründe deine Entscheidung.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die große Pizza hat den doppelten Durchmesser und damit auch den{' '}
              doppelten Radius.
            </p>
            <p>
              Setzt man in die Formel für den Flächeninhalt den{' '}
              <Color1>doppelten Radius</Color1> ein, erhält man:
            </p>
            {buildEquation([
              [<>A&apos;</>, <>=</>, <>π · r&apos;²</>],
              [
                <></>,
                <>=</>,
                <>
                  π · (<Color1>2</Color1> · r)²
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
                      Klammer auflösen mit Potenzgesetzen
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  π · <Color1>4</Color1> · r²
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <Color1>4</Color1> · π · r²
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
                      π · r² ist die Fläche der kleinen Pizza
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <Color1>4</Color1> · A
                </>,
              ],
            ])}
            <p>
              Der Flächeninhalt der großen Pizza ist{' '}
              <Color1>4-mal so groß</Color1> wie der Flächeninhalt der kleinen
              Pizza.
            </p>
            <p>
              Damit hat Sina{' '}
              <strong>
                {(data.case == 3 || data.case == 2) && 'nicht'} recht
              </strong>
              .
            </p>
          </>
        )
      },
    },
  ],
}
