import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
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
      </>
    )
  },

  tasks: [
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>
              a) Wie viele Würfel benötigt man für Figur 4? Ergänze den Wert in
              der Tabelle.
            </p>
            <svg viewBox="0 0 328 110">
              <image
                href="/content/NRW_MSA_Würfel_Tabelle.PNG"
                height="110"
                width="328"
              />
              <text
                x={180}
                y={80}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {data.startwert}
              </text>
              <text
                x={215}
                y={80}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {2 * (2 + data.startwert - 1)}
              </text>
              <text
                x={250}
                y={80}
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
              Um den fehlenden Wert zu bestimmen kannst du die Anzahl der Würfel
              bestimmen, die in jeder Figur hinzu kommen:
            </p>
            <ul>
              <li>
                Von Figur 1 zu Figur 2:{' '}
                {2 * (2 + data.startwert - 1) - 1 * (1 + data.startwert - 1)}
              </li>
              <li>
                Von Figur 2 zu Figur 3:{' '}
                {3 * (3 + data.startwert - 1) - 2 * (2 + data.startwert - 1)}
              </li>
              <li>
                Von Figur 3 zu Figur 4 sind es also:{' '}
                {4 * (4 + data.startwert - 1) - 3 * (3 + data.startwert - 1)}
              </li>
            </ul>
            <p>
              Zu den {3 * (3 + data.startwert - 1)} Würfeln kommen{' '}
              {4 * (4 + data.startwert - 1) - 3 * (3 + data.startwert - 1)}{' '}
              hinzu, womit die 4. Figur{' '}
              <strong>{4 * (4 + data.startwert - 1)}</strong> Würfel besitzt:
            </p>

            <svg viewBox="0 0 328 110">
              <image
                href="/content/NRW_MSA_Würfel_Tabelle.PNG"
                height="110"
                width="328"
              />
              <text
                x={180}
                y={80}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {data.startwert}
              </text>
              <text
                x={215}
                y={80}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {2 * (2 + data.startwert - 1)}
              </text>
              <text
                x={250}
                y={80}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {3 * (3 + data.startwert - 1)}
              </text>
              <text
                x={285}
                y={80}
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
      task({ data }) {
        return (
          <>
            <p>
              Die Anzahl der Würfel für Figur n kann mit folgendem Term
              berechnet werden:<br></br>(I) n · (n + {data.startwert - 1})
            </p>
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
              {data.random * (data.random + wert)} Würfel.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
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
              Figur {data.random2} besteht aus{' '}
              {data.random2 * (data.random2 + wert)} Würfeln.
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
            <p>Löse die Klammern beider Terme auf, um sie zu vergleichen:</p>
            <ul>
              <li>
                n · (n + {data.startwert - 1}) = n² +{' '}
                {data.startwert - 1 != 1 && data.startwert - 1}n
              </li>
              <li>
                {buildEquation([
                  [
                    '',
                    <>
                      (n + {pp((data.startwert - 1) / 2)})² −{' '}
                      {pp(((data.startwert - 1) * (data.startwert - 1)) / 4)}
                    </>,
                  ],
                  [
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
                    '=',
                    <>
                      n² + 2 · n · {pp((data.startwert - 1) / 2)} +{' '}
                      {pp((data.startwert - 1) / 2)}² −{' '}
                      {pp(((data.startwert - 1) * (data.startwert - 1)) / 4)}
                    </>,
                  ],
                  [
                    <>
                      {' '}
                      <Color4>
                        <span className="inline-block  scale-y-[1.5]">↓</span>
                      </Color4>
                    </>,
                    <>
                      <Color4>
                        <span style={{ fontSize: 'small' }}>
                          1² = 1, dann zusammenfassen
                        </span>
                      </Color4>
                    </>,
                  ],
                  [
                    '=',
                    <>
                      n² + {pp(data.startwert - 1)} · n +{' '}
                      {pp(
                        (((data.startwert - 1) / 2) * (data.startwert - 1)) / 2,
                      )}{' '}
                      − {pp(((data.startwert - 1) * (data.startwert - 1)) / 4)}
                    </>,
                  ],
                  [
                    '=',
                    <>n² + {data.startwert - 1 != 1 && data.startwert - 1}n</>,
                  ],
                ])}
              </li>
            </ul>
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
              Setze einige Werte für n und bestimme die größtmögliche Anzahl der
              Würfel unter 500:
            </p>
            <ul>
              <li>
                {anzahl} · ({anzahl} + {data.startwert - 1}) ={' '}
                {anzahl * anzahl + anzahl * (data.startwert - 1)}{' '}
              </li>
              <li>
                {anzahl + 1} · ({anzahl + 1} + {data.startwert - 1}) ={' '}
                {(anzahl + 1) * (anzahl + 1) +
                  (anzahl + 1) * (data.startwert - 1)}
              </li>
            </ul>
            <p>
              Die größtmögliche Figur ist Figur {anzahl}. Für den Bau von Figur{' '}
              {anzahl + 1} fehlen{' '}
              {(anzahl + 1) * (anzahl + 1) +
                (anzahl + 1) * (data.startwert - 1) -
                500}{' '}
              Würfel.
            </p>
          </>
        )
      },
    },
  ],
}
