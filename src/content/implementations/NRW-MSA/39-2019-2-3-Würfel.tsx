import { Exercise } from '@/data/types'
import { Color1, Color3, Color4, Color5 } from '@/helper/colors'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  startwert: number
  random: number
  random2: number
}

export const exercise39: Exercise<DATA> = {
  title: 'Würfel',
  source: '2019 Teil 2 Aufgabe 3',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    return {
      startwert: rng.randomIntBetween(2, 5),
      random: rng.randomIntBetween(6, 10),
      random2: rng.randomIntBetween(9, 14),
    }
  },
  originalData: {
    startwert: 3,
    random: 8,
    random2: 12,
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    const numberOfCubes = data.startwert
    const numberOfCubes1 = data.startwert + 1
    const numberOfCubes2 = data.startwert + 2
    const cubeWidth = 25 // Breite eines Würfels
    const cubeHeight = 25 // Höhe eines Würfels
    const cubeDepth = 12.5 // "Tiefe" der Würfel für die 3D-Optik
    const spacing = 0 // Abstand zwischen den Würfeln

    const svgWidth = numberOfCubes * (cubeWidth + spacing) + 100 // Dynamische Breite
    const svgHeight = 2 * (cubeHeight + cubeDepth) + 20 // Höhe des SVG

    // Funktion zum Rendern eines Würfels
    const renderCube = (index: number, yOffset: number) => {
      const xOffset = index * (cubeWidth + spacing) + 25

      return (
        <g
          key={`${index}-${yOffset}`}
          transform={`translate(${xOffset}, ${yOffset})`}
        >
          {/* Vorderseite */}
          <rect
            x={0}
            y={cubeDepth}
            width={cubeWidth}
            height={cubeHeight}
            fill="#DDEAF0" // Füllung der Vorderseite
            stroke="black"
            strokeWidth="0.5"
          />
          {/* Oberseite */}
          <polygon
            points={`0,${cubeDepth} ${cubeWidth},${cubeDepth} ${cubeWidth + cubeDepth},0 ${cubeDepth},0`}
            fill="#DDEAF0" // Füllung der Oberseite
            stroke="black"
            strokeWidth="0.5"
          />
          {/* Seitenfläche nur für den letzten Würfel */}
          {index === numberOfCubes - 1 && (
            <polygon
              points={`${cubeWidth},${cubeDepth} ${cubeWidth},${cubeDepth + cubeHeight} ${cubeWidth + cubeDepth},${cubeDepth + cubeHeight - cubeDepth} ${cubeWidth + cubeDepth},${cubeDepth - cubeDepth}`}
              fill="#DDEAF0" // Füllung der Seite
              stroke="black"
              strokeWidth="0.5"
            />
          )}
          {/* Seitenfläche nur für den zweiten letzten Würfel */}
          {index === numberOfCubes && (
            <polygon
              points={`${cubeWidth},${cubeDepth} ${cubeWidth},${cubeDepth + cubeHeight} ${cubeWidth + cubeDepth},${cubeDepth + cubeHeight - cubeDepth} ${cubeWidth + cubeDepth},${cubeDepth - cubeDepth}`}
              fill="#DDEAF0" // Füllung der Seite
              stroke="black"
              strokeWidth="0.5"
            />
          )}
          {/* Seitenfläche nur für den zweiten letzten Würfel */}
          {index === numberOfCubes + 1 && (
            <polygon
              points={`${cubeWidth},${cubeDepth} ${cubeWidth},${cubeDepth + cubeHeight} ${cubeWidth + cubeDepth},${cubeDepth + cubeHeight - cubeDepth} ${cubeWidth + cubeDepth},${cubeDepth - cubeDepth}`}
              fill="#DDEAF0" // Füllung der Seite
              stroke="black"
              strokeWidth="0.5"
            />
          )}
        </g>
      )
    }

    return (
      <>
        <p>
          Monya und Paul haben eine Kiste mit 500 gleichen Würfeln. Mit{' '}
          {data.startwert} Würfeln legen sie Figur 1 und erweitern diese Figur
          schrittweise (Abbildung 1).
        </p>

        {/* Figur 1 */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="40" height={svgHeight} xmlns="http://www.w3.org/2000/svg">
            <text x="10" y="50" fontSize="10" fill="black">
              Figur 1
            </text>
          </svg>
          <svg
            width={svgWidth + 20}
            height={svgHeight}
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginBottom: '-15px' }}
          >
            {/* Erste Würfelreihe */}
            {Array.from({ length: numberOfCubes }, (_, index) =>
              renderCube(index, 25),
            )}
          </svg>
        </div>

        {/* Figur 2 */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="60" height={svgHeight} xmlns="http://www.w3.org/2000/svg">
            <text x="10" y="50" fontSize="10" fill="black">
              Figur 2
            </text>
          </svg>
          <svg
            width={svgWidth}
            height={svgHeight}
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginLeft: '-25px', marginBottom: '-25px' }}
          >
            {/* Erste Würfelreihe */}
            {Array.from({ length: numberOfCubes1 }, (_, index) =>
              renderCube(index, 25),
            )}
            {/* Zweite Würfelreihe */}
            {Array.from(
              { length: numberOfCubes1 },
              (_, index) => renderCube(index, -42 + cubeHeight + cubeDepth + 5), // Zweite Reihe unter der ersten
            )}
          </svg>
        </div>

        {/* Figur 3 */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="60" height={svgHeight} xmlns="http://www.w3.org/2000/svg">
            <text x="10" y="50" fontSize="10" fill="black">
              Figur 3
            </text>
          </svg>
          <svg
            width={svgWidth}
            height={svgHeight + 10}
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginLeft: '-25px' }}
          >
            {/* Erste Würfelreihe */}
            {Array.from({ length: numberOfCubes2 }, (_, index) =>
              renderCube(index, 65),
            )}
            {/* Zweite Würfelreihe */}
            {Array.from(
              { length: numberOfCubes2 },
              (_, index) => renderCube(index, -2 + cubeHeight + cubeDepth + 5), // Zweite Reihe unter der ersten
            )}
            {/* Dritte Würfelreihe */}
            {Array.from(
              { length: numberOfCubes2 },
              (_, index) =>
                renderCube(index, -41 + cubeHeight + cubeDepth + 20), // Dritte Reihe unter der ersten
            )}
          </svg>
        </div>
        <br></br>
        <center>
          <Color5>
            <span style={{ fontSize: 'small' }}>
              Abbildung 1: Figur 1, 2 und 3 der Würfel
            </span>
          </Color5>
        </center>
      </>
    )
  },

  tasks: [
    {
      duration: 1,
      points: 2,
      task({ data }) {
        return (
          <>
            <p>
              a) Wie viele Würfel benötigt man für Figur 4? Ergänze den Wert in
              der Tabelle.
            </p>
            <svg width="327" height="70" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="0"
                y="0"
                width="327"
                height="22"
                fill="#D2ECF6"
                stroke="none"
              />

              <rect
                x="0"
                y="0"
                width="327"
                height="50"
                rx="4"
                ry="4"
                stroke="#007EC1"
                fill="transparent"
                strokeWidth="1"
              />

              <line
                x1="0"
                y1="22"
                x2="327"
                y2="22"
                stroke="#007EC1"
                strokeWidth="1"
              />

              <text
                x="50"
                y="16"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                Stadt
              </text>
              <text
                x="50"
                y="38"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                Anzahl der Würfel
              </text>

              <line
                x1="102"
                y1="00"
                x2="102"
                y2="50"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="160"
                y1="0"
                x2="160"
                y2="50"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="217.5"
                y1="0"
                x2="217.5"
                y2="50"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="275"
                y1="0"
                x2="275"
                y2="50"
                stroke="#007EC1"
                strokeWidth="1"
              />

              <text
                x="130"
                y="16"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                1
              </text>
              <text
                x="190"
                y="16"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                2
              </text>
              <text
                x="246.5"
                y="16"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                3
              </text>
              <text
                x="302"
                y="16"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                4
              </text>

              <text
                x={126}
                y={42}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {data.startwert}
              </text>
              <text
                x={182}
                y={42}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {2 * (2 + data.startwert - 1)}
              </text>
              <text
                x={238}
                y={42}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {3 * (3 + data.startwert - 1)}
              </text>
            </svg>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Um den fehlenden Wert zu bestimmen, überlege dir, wie die Figuren
              aufgebaut werden:
            </p>
            <ul>
              <li>Figur 1: 1 Reihe mit {data.startwert} Würfeln</li>
              <li>Figur 2: 2 Reihen mit {data.startwert + 1} Würfeln</li>
              <li>Figur 3: 3 Reihen mit {data.startwert + 2} Würfeln</li>
            </ul>
            <p>
              Bei Figur 4 werden es also 4 Reihen mit {data.startwert + 3}{' '}
              Würfeln.
            </p>
            <p>
              Damit hat die 4. Figur 4 · {data.startwert + 3} ={' '}
              <strong>{4 * (4 + data.startwert - 1)}</strong> Würfel.
            </p>
            <svg width="328" height="70" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="0"
                y="0"
                width="327"
                height="22"
                fill="#D2ECF6"
                stroke="none"
              />

              <rect
                x="0"
                y="0"
                width="327"
                height="50"
                rx="4"
                ry="4"
                stroke="#007EC1"
                fill="transparent"
                strokeWidth="1"
              />

              <line
                x1="0"
                y1="22"
                x2="327"
                y2="22"
                stroke="#007EC1"
                strokeWidth="1"
              />

              <text
                x="50"
                y="16"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                Stadt
              </text>
              <text
                x="50"
                y="38"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                Anzahl der Würfel
              </text>

              <line
                x1="102"
                y1="00"
                x2="102"
                y2="50"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="160"
                y1="0"
                x2="160"
                y2="50"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="217.5"
                y1="0"
                x2="217.5"
                y2="50"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="275"
                y1="0"
                x2="275"
                y2="50"
                stroke="#007EC1"
                strokeWidth="1"
              />

              <text
                x="130"
                y="16"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                1
              </text>
              <text
                x="190"
                y="16"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                2
              </text>
              <text
                x="246.5"
                y="16"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                3
              </text>
              <text
                x="302"
                y="16"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                4
              </text>

              <text
                x={126}
                y={42}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {data.startwert}
              </text>
              <text
                x={182}
                y={42}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {2 * (2 + data.startwert - 1)}
              </text>
              <text
                x={238}
                y={42}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {3 * (3 + data.startwert - 1)}
              </text>
              <text
                x={292}
                y={42}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {4 * (4 + data.startwert - 1)}
              </text>
            </svg>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 1,
      intro({ data }) {
        return (
          <>
            <p>
              Die Anzahl der Würfel für Figur n kann mit folgendem Term
              berechnet werden:<br></br>(I) n · (n + {data.startwert - 1})
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              b) Bestimme mithilfe des Terms die Anzahl der Würfel für Figur{' '}
              {data.random}.
            </p>
          </>
        )
      },
      solution({ data }) {
        const wert = data.startwert - 1
        return (
          <>
            <p>Setze den Wert in den Term ein und fasse zusammen:</p>
            {buildEquation([
              ['', 'n · (n + ' + wert + ')', ''],
              ['=', data.random + ' · (' + data.random + ' + ' + wert + ')'],
              ['=', data.random * (data.random + wert)],
            ])}
            <p>
              Für Figur {data.random} benötigen sie{' '}
              <strong>{data.random * (data.random + wert)} Würfel</strong>.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 3,
      skillIntro({ data }) {
        return (
          <>
            <p>Gegeben ist der Term n · (n + {data.startwert - 1})</p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              c) Begründe anhand der Figuren in Abbildung 1, dass mit dem Term
              die Anzahl der Würfel für jede beliebige Figur n berechnet wird.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Beschreibe den Term anhand der Figuren:</p>
            <ul>
              <li>
                Jede Figur wird um eine weitere Reihe Würfel nach oben gebaut.
                Die Anzahl aufeinanderliegender Reihen beträgt also{' '}
                <strong>n</strong>.
              </li>
              <li>
                <strong>(n + {data.startwert - 1})</strong> beschreibt die
                Anzahl von Würfeln in einer Reihe. Da in Figur 1 bereits mehrere
                Würfel vorhanden sind, muss der Startwert angepasst werden.
              </li>
            </ul>
            <p>
              Multipliziert man diese Terme ergibt sich die im Rechteck
              angeordnete Anzahl von Würfeln durch den Term:
              <br></br> (I) n · (n + {data.startwert - 1})
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 2,
      task({ data }) {
        return (
          <>
            <p>
              d) Berechne mit dem Term, welche Figur aus genau{' '}
              {data.random2 * (data.random2 + data.startwert - 1)} Würfeln
              besteht.
            </p>
          </>
        )
      },
      solution({ data }) {
        const wert = data.startwert - 1
        return (
          <>
            <p>
              Der Term n · (n + {data.startwert - 1}) beschreibt die Anzahl der
              Würfel in Figur n.{' '}
            </p>
            <p>
              Setze systematisch einige Werte für n ein und bestimme die Lösung:
            </p>
            {buildEquation([
              ['', 'n · (n + ' + wert + ')', ''],
              ['=', data.random2 + ' · (' + data.random2 + ' + ' + wert + ')'],
              ['=', data.random2 * (data.random2 + wert)],
            ])}
            <p>
              <strong>Figur {data.random2}</strong> besteht aus{' '}
              {data.random2 * (data.random2 + wert)} Würfeln.
            </p>
          </>
        )
      },
    },
    {
      points: 4,
      duration: 3,
      task({ data }) {
        return (
          <>
            <p>
              e) Die Anzahl der Würfel für Figur n kann mit den beiden Termen
              berechnet werden:
            </p>
            <p>(I) n · (n + {data.startwert - 1})</p>
            <p>
              (II) (n + {pp((data.startwert - 1) / 2)})² −{' '}
              {pp(((data.startwert - 1) * (data.startwert - 1)) / 4)}
            </p>
            <p>
              {' '}
              Zeige durch eine Termumformung, dass die Terme (I) und (II)
              gleichwertig sind.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Löse die Klammern beider Terme auf, um sie zu vergleichen.</p>
            {buildEquation([
              [<>Term I:</>, '', <>n · (n + {data.startwert - 1})</>],
              [
                '',
                '=',
                <>
                  <b>n² + {data.startwert - 1 != 1 && data.startwert - 1}n</b>
                </>,
              ],
            ])}
            <p></p>
            {buildEquation([
              [
                'Term II:',
                '',
                <>
                  (n + {pp((data.startwert - 1) / 2)})² −{' '}
                  {pp(((data.startwert - 1) * (data.startwert - 1)) / 4)}
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
                      1. Binomische Formel
                    </span>
                  </Color4>
                </>,
              ],
              [
                '',
                '=',
                <>
                  n² + 2 · n · {pp((data.startwert - 1) / 2)} +{' '}
                  {pp((data.startwert - 1) / 2)}² −{' '}
                  {pp(((data.startwert - 1) * (data.startwert - 1)) / 4)}
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
                      {pp((data.startwert - 1) / 2)}² ={' '}
                      {pp((data.startwert - 1) / 2)}, dann zusammenfassen
                    </span>
                  </Color4>
                </>,
              ],
              [
                '',
                '=',
                <>
                  n² + {pp(data.startwert - 1)} · n +{' '}
                  {pp((((data.startwert - 1) / 2) * (data.startwert - 1)) / 2)}{' '}
                  − {pp(((data.startwert - 1) * (data.startwert - 1)) / 4)}
                </>,
              ],
              [
                '',
                '=',
                <>
                  <b>n² + {data.startwert - 1 != 1 && data.startwert - 1}n</b>
                </>,
              ],
            ])}
            <p>
              Nach einer Termumformung zeigt sich, dass die Terme identisch sind
              und sie damit gleichwertig die Anzahl der Würfel beschreiben.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 4,
      task({ data }) {
        return (
          <>
            <p>
              f) Bestimme die größtmögliche Figur n, die Monya und Paul mit 500
              Würfeln legen können und gib an, wie viele Würfel zum Legen der
              nächsten Figur fehlen.
            </p>
          </>
        )
      },
      solution({ data }) {
        const anzahl = Math.floor(
          -(data.startwert - 1) / 2 +
            Math.sqrt(((data.startwert - 1) * (data.startwert - 1)) / 4 + 500),
        )
        return (
          <>
            <p>
              Setze systematisch Werte für n ein und bestimme die größtmögliche
              Anzahl der Würfel unter 500:
            </p>
            <ul>
              <li>
                {anzahl} · ({anzahl} + {data.startwert - 1}) ={' '}
                <strong>
                  {anzahl * anzahl + anzahl * (data.startwert - 1)}
                </strong>{' '}
              </li>
              <li>
                {anzahl + 1} · ({anzahl + 1} + {data.startwert - 1}) ={' '}
                <strong>
                  {(anzahl + 1) * (anzahl + 1) +
                    (anzahl + 1) * (data.startwert - 1)}
                </strong>
              </li>
            </ul>
            <p>
              Die größtmögliche Figur ist <strong>Figur {anzahl}</strong>. Für
              den Bau von Figur {anzahl + 1} fehlen
              <strong>
                {' '}
                {(anzahl + 1) * (anzahl + 1) +
                  (anzahl + 1) * (data.startwert - 1) -
                  500}{' '}
                Würfel
              </strong>
              .
            </p>
          </>
        )
      },
    },
  ],
}
