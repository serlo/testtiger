import { Exercise } from '@/data/types'
import { Color2, Color4 } from '@/helper/colors'
import { getGcd } from '@/helper/get-gcd'
import {
  buildEquation,
  buildInlineFrac,
  ExplanationBox,
} from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'

interface DATA {
  nenner: number
  array: Array<number>
}

export const exercise113: Exercise<DATA> = {
  title: 'Glücksrad',
  source: '2022 Teil 1 Aufgabe 4',
  useCalculator: false,
  duration: 8,
  generator(rng) {
    const array = Array.from({ length: 12 }, () =>
      Math.random() > 0.25 ? 0 : 1,
    )
    return { nenner: rng.randomItemFromArray([2, 3, 4, 6]), array }
  },
  originalData: { nenner: 3, array: [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0] },
  learningPathData: { nenner: 4, array: [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0] },
  constraint({ data }) {
    return (
      data.array.filter(element => element === 1).length != 0 &&
      data.array.filter(element => element === 1).length + 12 / data.nenner < 12
    )
  },
  intro({ data }) {
    return null
  },
  tasks: [
    {
      points: 2,
      duration: 4,
      intro({ data }) {
        // Anzahl der Sektoren
        const sectors = 12
        const centerX = 164 // Mittelpunkt des Kreises (X)
        const centerY = 125 // Mittelpunkt des Kreises (Y)
        const radius = 120 // Radius des Kreises
        const angleStep = (2 * Math.PI) / sectors // Berechnung der Winkel

        // Sektoren generieren
        const sectorsPaths = Array.from({ length: sectors }, (_, i) => {
          const startAngle = i * angleStep + 30
          const endAngle = startAngle + angleStep

          // Endpunkte der Sektoren berechnen
          const x1 = centerX + radius * Math.cos(startAngle)
          const y1 = centerY + radius * Math.sin(startAngle)
          const x2 = centerX + radius * Math.cos(endAngle)
          const y2 = centerY + radius * Math.sin(endAngle)

          const fillColor = data.array[i] ? 'gray' : 'none'
          const textLabel = data.array[i] ? 'H' : ''

          // SVG-Pfad für den Sektor
          return (
            <g key={i}>
              <path
                d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
                fill={fillColor}
                stroke="black"
                strokeWidth={1}
              />
              {data.array[i] && (
                <text
                  x={((x1 + x2) / 2 + 164) / 2}
                  y={((y1 + y2) / 2 + 125) / 2}
                  fill="black"
                  fontSize="16"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {textLabel}
                </text>
              )}
            </g>
          )
        })

        return (
          <>
            <p>Die Klasse 10e bastelt für das Schulfest ein Glücksrad.</p>
            <p>
              Das Glücksrad wird in verschiedene Felder aufgeteilt (vgl.
              Abbildung).
            </p>
            <p>
              H bedeutet {'"'}Hauptgewinn{'"'}.
            </p>
            <svg width="328" height="250">
              <circle
                cx="164"
                cy="125"
                r="120"
                fill="none"
                stroke="black"
                strokeWidth={3}
              />
              {sectorsPaths} {/* Hier werden die Sektoren hinzugefügt */}
              <polygon points="274,125 304,115 304,135" fill="black" />
            </svg>
          </>
        )
      },
      example() {
        return (
          <>
            <style>
              {`
        .explanation-box {
          border: 1px solid lightblue;
          padding: 0px 8px;
          background-color: #f9f9f9;
          border-radius: 8px;
        }
      `}
            </style>
            <p>
              In einer Lostrommel mit 15 Losen befinden sich 5 Gewinne und 10
              Nieten. Wie hoch ist die Wahrscheinlichkeit, einen Gewinn zu
              ziehen?
            </p>
            <Color2>
              <b>Antwort:</b> Die Wahrscheinlichkeit, einen Gewinn zu ziehen ist{' '}
              <b>{ppFrac(1 / 3)} </b>.
            </Color2>
            <br></br>
            <br></br>
            <ExplanationBox>
              <p>
                Erklärung:
                <hr style={{ margin: '10px 0' }} />
                <p>
                  Das Ziehen von Losen ist ein Laplace-Experiment. Berechne die
                  Wahrscheinlichkeit mit der Formel für das{' '}
                  <b>Laplace-Experiment</b>:
                </p>
                {buildEquation([
                  [
                    <>p</>,
                    <>=</>,
                    <>
                      {buildInlineFrac(
                        <>Anzahl der Gewinnlose</>,
                        <>Anzahl aller Lose</>,
                      )}
                    </>,
                  ],
                  [<></>, <>=</>, <>{buildInlineFrac(<>5</>, <>15</>)}</>],
                  [<></>, <>=</>, <>{buildInlineFrac(<>1</>, <>3</>)}</>],
                ])}
              </p>
            </ExplanationBox>
          </>
        )
      },
      task({ data }) {
        return (
          //a)
          <>
            <p>
              Das Glücksrad wird einmal gedreht. Gib die Wahrscheinlichkeit für
              einen Hauptgewinn (H) an.
            </p>
          </>
        )
      },
      solution({ data }) {
        const anzahl = data.array.filter(element => element === 1).length
        return (
          <>
            <p>
              Das Drehen des Glücksrads mit gleich großen Feldern ist ein
              Laplace-Experiment. Berechne die Wahrscheinlichkeit mit der Formel
              für das <b>Laplace-Experiment</b>:
            </p>
            {buildEquation([
              [
                <>p</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>Anzahl der Felder mit &quot;H&quot;</>,
                    <>Anzahl aller Felder</>,
                  )}
                </>,
              ],
              [<></>, <>=</>, <>{buildInlineFrac(<>{anzahl}</>, <>12</>)}</>],
            ])}
            {getGcd(anzahl, 12) != 1 && (
              <>
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
                        <span style={{ fontSize: 'small' }}>Kürzen</span>
                      </Color4>
                    </>,
                  ],
                  [
                    <>&nbsp;&nbsp;</>,
                    <>=</>,
                    <>
                      <strong>{ppFrac(anzahl / 12)}</strong>
                    </>,
                  ],
                ])}
              </>
            )}
          </>
        )
      },
    },
    {
      points: 2,
      duration: 4,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          //b)
          <>
            <p>
              Das Glücksrad soll weiter beschriftet werden.{' '}
              {ppFrac(1 / data.nenner)}​ aller Felder sollen Nieten sein, die
              restlichen Felder sollen mit dem Wort {'"'}Trostpreis{'"'}{' '}
              beschriftet werden. Markiere im Glücksrad{' '}
              {ppFrac(1 / data.nenner)}​ aller Felder als Niete (N).
            </p>
          </>
        )
      },
      solution({ data }) {
        // Anzahl der Sektoren
        const sectors = 12
        const centerX = 164 // Mittelpunkt des Kreises (X)
        const centerY = 125 // Mittelpunkt des Kreises (Y)
        const radius = 120 // Radius des Kreises
        const angleStep = (2 * Math.PI) / sectors // Berechnung der Winkel

        // Felder für "Niete" setzen
        const updatedArray = [...data.array]
        let nCounter = 0
        while (nCounter < 12 / data.nenner) {
          const randomIndex = Math.floor(Math.random() * sectors)
          if (updatedArray[randomIndex] === 0) {
            // Sicherstellen, dass wir ein leeres Feld wählen
            updatedArray[randomIndex] = 2 // 2 steht für "Niete"
            nCounter++
          }
        }

        // Sektoren generieren
        const sectorsPaths = Array.from({ length: sectors }, (_, i) => {
          const startAngle = i * angleStep + 30
          const endAngle = startAngle + angleStep

          // Endpunkte der Sektoren berechnen
          const x1 = centerX + radius * Math.cos(startAngle)
          const y1 = centerY + radius * Math.sin(startAngle)
          const x2 = centerX + radius * Math.cos(endAngle)
          const y2 = centerY + radius * Math.sin(endAngle)

          // Farben und Beschriftungen je nach Feldtyp
          let fillColor = 'none'
          let textLabel = ''

          if (updatedArray[i] === 1) {
            fillColor = 'gray'
            textLabel = 'H' // Hauptgewinn
          } else if (updatedArray[i] === 2) {
            fillColor = 'lightgray'
            textLabel = 'N' // Niete
          }

          // SVG-Pfad für den Sektor
          return (
            <g key={i}>
              <path
                d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
                fill={fillColor}
                stroke="black"
                strokeWidth={1}
              />
              {textLabel && (
                <text
                  x={((x1 + x2) / 2 + 164) / 2}
                  y={((y1 + y2) / 2 + 125) / 2}
                  fill="black"
                  fontSize="16"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {textLabel}
                </text>
              )}
            </g>
          )
        })

        return (
          <>
            <p>Berechne die Anzahl der Felder mit einer Niete:</p>
            <p>
              12 · {ppFrac(1 / data.nenner)} ={' '}
              <strong>{pp(12 / data.nenner)}</strong>
            </p>
            <p>Beschrifte {pp(12 / data.nenner)} Felder mit &quot;N&quot;:</p>
            <svg width="328" height="250">
              <circle
                cx="164"
                cy="125"
                r="120"
                fill="none"
                stroke="black"
                strokeWidth={3}
              />
              {sectorsPaths} {/* Hier werden die Sektoren hinzugefügt */}
              <polygon points="274,125 304,115 304,135" fill="black" />
            </svg>
          </>
        )
      },
    },
  ],
}
