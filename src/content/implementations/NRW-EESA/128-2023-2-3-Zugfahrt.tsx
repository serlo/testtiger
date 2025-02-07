import { Exercise } from '@/data/types'
import { Color5 } from '@/helper/colors'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  case: number

  item_1: number
  item_2: number
  item_3: number
  order: number[]
  strecke_1: number
  strecke_2: number
  strecke_3: number
  zeit_1: number
  zeit_2: number
  zeit_3: number
  zeit_4: number
  zeit_5: number
  zeit_6: number
}
const richtig = [
  'In Brüssel hält der Zug für weniger als 15 Minuten.',
  'Die Fahrt von Lüttich nach Brüssel dauert nicht einmal eine Stunde.',
  'Von Brüssel nach Paris fährt der Zug im Durchschnitt schneller als 150 km/h',
  'In den ersten 40 Minuten der Fahrt werden nicht einmal 100 km zurückgelegt.',
]

const falsch = [
  'Von Lüttich nach Brüssel fährt der Zug schneller als von Brüssel nach Paris.',
  '40 Minuten nach der Abfahrt in Brüssel ist der Zug mehr als 200 km von seiner Gesamtstrecke gefahren.',
  'Die Fahrt von Lüttich nach Paris dauert genau 2 Stunden.',
  'Die Distanz von Brüssel nach Paris beträgt etwa 430 km.',
]
export const exercise128: Exercise<DATA> = {
  title: 'Zugfahrt',
  source: '2023 Teil 2 Aufgabe 3',
  useCalculator: true,
  duration: 26,
  generator(rng) {
    return {
      case: rng.randomIntBetween(1, 4),

      item_1: rng.randomIntBetween(0, 3),
      item_2: rng.randomIntBetween(0, 3),
      item_3: rng.randomIntBetween(0, 3),
      order: rng.shuffleArray([0, 1, 2]),
      strecke_1: rng.randomIntBetween(30, 70),
      strecke_2: rng.randomIntBetween(100, 170),
      strecke_3: rng.randomIntBetween(390, 420),
      zeit_1: rng.randomIntBetween(18, 30),

      zeit_2: rng.randomIntBetween(44, 49),
      zeit_3: rng.randomIntBetween(51, 58),
      zeit_4: rng.randomIntBetween(36, 40),
      zeit_5: rng.randomIntBetween(46, 50),
      zeit_6: rng.randomIntBetween(0, 5),
    }
  },
  originalData: {
    case: 1,
    item_1: 0,
    item_2: 0,
    item_3: 1,
    order: [1, 0, 2],
    strecke_1: 42,
    strecke_2: 114,
    strecke_3: 428,
    zeit_1: 22,
    zeit_2: 49,
    zeit_3: 52,
    zeit_4: 35,
    zeit_5: 43,
    zeit_6: 5,
  },
  learningPathData: {
    case: 1,
    item_1: 0,
    item_2: 0,
    item_3: 1,
    order: [1, 0, 2],
    strecke_1: 58,
    strecke_2: 101,
    strecke_3: 400,
    zeit_1: 28,
    zeit_2: 48,
    zeit_3: 59,
    zeit_4: 40,
    zeit_5: 47,
    zeit_6: 4,
  },
  constraint({ data }) {
    return data.item_2 != data.item_3
  },
  intro({ data }) {
    return (
      <>
        <p>
          Eric und Emma fahren mit dem Zug {'"'}Thalys{'"'} von Aachen nach
          Paris. Sie schauen sich den Fahrplan an (Abbildung 1).
        </p>
        <svg viewBox="0 0 328 120">
          <image
            href="/content/NRW_EESA/128_Zugfahrt.jpg"
            height="120"
            width="328"
          />
        </svg>
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
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  Station
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  Ankunft <br></br>(Uhrzeit)
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  Abfahrt <br></br>(Uhrzeit)
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  Strecke ab <br></br> Aachen (in km)
                </td>
              </tr>
            </thead>
            <tbody
              className="bg-white text-gray-500"
              style={{ backgroundColor: '#FFFFFF', color: '#6b7280' }}
            >
              <tr>
                <td className="py-1 border text-center font-bold p-1 text-black ">
                  Aachen
                </td>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  -
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  07:{data.zeit_1}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  0
                </td>
              </tr>
              <tr>
                <td className="py-1 border text-center font-bold p-1 text-black ">
                  Lüttich
                </td>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  07:{data.zeit_2}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  07:{data.zeit_3}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {data.strecke_1}
                </td>
              </tr>
              <tr>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  Brüssel
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  08:{data.zeit_4}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  08:{data.zeit_5}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {data.strecke_2}
                </td>
              </tr>
              <tr>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  Paris
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  10:0{data.zeit_6}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  -
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {data.strecke_3}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <center>
          <Color5>
            <span style={{ fontSize: 'small' }}>
              Abbildung 1: Fahrplan des {'"'}Thalys{'"'} von Köln nach Paris
            </span>
          </Color5>
        </center>
      </>
    )
  },
  tasks: [
    {
      points: 2,
      duration: 4,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          //a)
          <>
            <p>
              Wie lange dauert die Fahrt von Aachen nach Paris? Bestimme mit der
              Tabelle.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die Fahrt beginnt um 07:{data.zeit_1} Uhr und endet um 10:0
              {data.zeit_6} Uhr. Bis 8 Uhr vergehen {60 - data.zeit_1} Minuten,
              bis 10:0{data.zeit_6} weitere 2 Stunden und {data.zeit_6} Minuten.
            </p>
            <p>
              Es vergehen also 2 Stunden und {60 - data.zeit_1} + {data.zeit_6}{' '}
              Minuten. Das sind{' '}
              <strong>
                2 Stunden und {60 - data.zeit_1 + data.zeit_6} Minuten
              </strong>
              .
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 6,
      intro({ data }) {
        return <></>
      },
      task({ data }) {
        return (
          //b)
          <>
            <ol>
              <li>Gib die längste Teilstrecke an. </li>
              <li>Berechne die Länge dieser Teilstrecke.</li>
            </ol>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <svg viewBox="0 0 328 120">
              <image
                href="/content/NRW_EESA/128_Zugfahrt.jpg"
                height="120"
                width="328"
              />
            </svg>
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
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      Station
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      Ankunft <br></br>(Uhrzeit)
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      Abfahrt <br></br>(Uhrzeit)
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      Strecke ab <br></br> Aachen (in km)
                    </td>
                  </tr>
                </thead>
                <tbody
                  className="bg-white text-gray-500"
                  style={{ backgroundColor: '#FFFFFF', color: '#6b7280' }}
                >
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 text-black ">
                      Aachen
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      -
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      07:{data.zeit_1}
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      0
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 text-black ">
                      Lüttich
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      07:{data.zeit_2}
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      07:{data.zeit_3}
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      {data.strecke_1}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 text-blue">
                      Brüssel
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      08:{data.zeit_4}
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      08:{data.zeit_5}
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      {data.strecke_2}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 text-blue">
                      Paris
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      10:0{data.zeit_6}
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      -
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      {data.strecke_3}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 1: Fahrplan des {'"'}Thalys{'"'} von Köln nach Paris
                </span>
              </Color5>
            </center>
            <ol>
              <li>Die längste Teilstrecke ist von Brüssel nach Paris.</li>
              <li>
                Laut Fahrplan betragen die Strecken ab Aachen {data.strecke_2}{' '}
                km bis Brüssel und {data.strecke_3} km bis Paris.<br></br>
                Zwischen Brüssel und Paris sind es damit:<br></br>
                <br></br>
                {data.strecke_3} − {data.strecke_2} ={' '}
                <strong>{data.strecke_3 - data.strecke_2} [km]</strong>
              </li>
            </ol>
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
          //c)
          <>
            <p>
              Bestimme die durchschnittliche Geschwindigkeit des Zuges von
              Aachen nach Lüttich und gib diese in Kilometer pro Stunde{' '}
              <span className="inline-block  scale-y-[2.6]">(</span>
              {buildInlineFrac('km', 'h')}
              <span className="inline-block  scale-y-[2.6]">)</span> an.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Bestimme die Geschwindigkeit, indem du die Strecke durch die Zeit
              teilst. Dafür brauchst du die Zeit in Stunden.
            </p>
            <p>
              Zwischen Aachen und Lüttich beträgt die Strecke {data.strecke_1}{' '}
              km. Der Zug benötigt für diese Strecke {data.zeit_2 - data.zeit_1}{' '}
              Minuten. In Stunden sind das:
            </p>
            <p>
              {buildInlineFrac(<>{data.zeit_2 - data.zeit_1}</>, <>60</>)}{' '}
              {((data.zeit_2 - data.zeit_1) / 60) % 1 == 0 ? '=' : '≈'}{' '}
              {pp(roundToDigits((data.zeit_2 - data.zeit_1) / 60, 2))} [h]
            </p>
            <hr style={{ margin: '10px 0' }} />
            <p>Jetzt kannst du die Geschwindigkeit bestimmen:</p>
            <p>
              {buildInlineFrac(
                <>{data.strecke_1}</>,
                <> {pp(roundToDigits((data.zeit_2 - data.zeit_1) / 60, 2))}</>,
              )}{' '}
              ={' '}
              <strong>
                {pp(
                  roundToDigits(
                    data.strecke_1 /
                      roundToDigits((data.zeit_2 - data.zeit_1) / 60, 2),
                    2,
                  ),
                )}{' '}
                [{buildInlineFrac(<>km</>, <>h</>)}]
              </strong>
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 4,
      intro({ data }) {
        function toX(n: number) {
          // n entspricht der Zeit in 10-Minuten-Schritten (z. B. 0.5 = 5 min, 1 = 10 min usw.)
          return 33 + n * 15.6
        }
        function toY(n: number) {
          // n entspricht der Strecke in 50-Kilometer-Schritten (z. B. 0.5 = 25 km, 1 = 50 km usw.)
          return 157 - n * 15.6
        }

        // Berechnungen für das vertikale Gitternetz (x-Achse)
        const availableWidth = 328 - 33 // 295
        const gridSpacingX = 7.8 // 5 min = 7.8 SVG-Einheiten
        const numXSteps = Math.floor(availableWidth / gridSpacingX) + 1

        // Für das horizontale Gitternetz (y-Achse)
        // Mit numYSteps = 21 decken wir bis 500 km ab, allerdings wird 500 km später nicht beschriftet.
        const numYSteps = 21

        return (
          <>
            <p>
              In Abbildung 2 ist der Verlauf der Fahrt von Aachen nach Paris
              vereinfacht dargestellt.
            </p>
            <svg viewBox="0 0 328 180">
              {/* Vertikale Gitternetzlinien und Beschriftungen (x-Achse) */}
              {Array.from({ length: numXSteps }, (_, i) => {
                const param = i * 0.5 // 0.5 entspricht 5 min
                const x = toX(param)
                const timeMinutes = i * 5
                return (
                  <g key={`x-grid-${i}`}>
                    <line
                      x1={x}
                      y1="157"
                      x2={x}
                      y2="0"
                      stroke="lightgray"
                      strokeWidth="0.5"
                    />
                    {/* Beschriftung alle 10 min (ohne Einheit) plus Tick-Mark */}
                    {timeMinutes % 10 === 0 && (
                      <>
                        <line
                          x1={x}
                          y1="157"
                          x2={x}
                          y2="160"
                          stroke="black"
                          strokeWidth="1"
                        />
                        <text x={x} y="165" fontSize="6" textAnchor="middle">
                          {timeMinutes}
                        </text>
                      </>
                    )}
                  </g>
                )
              })}

              {/* Horizontale Gitternetzlinien und Beschriftungen (y-Achse) */}
              {Array.from({ length: numYSteps }, (_, j) => {
                const km = j * 25
                const y = toY(j * 0.5)
                return (
                  <g key={`y-grid-${j}`}>
                    <line
                      x1="33"
                      y1={y}
                      x2="328"
                      y2={y}
                      stroke="lightgray"
                      strokeWidth="0.5"
                    />
                    {/* Beschriftung alle 100 km (ohne Einheit), außer bei 0 km und 500 km */}
                    {km !== 0 && km % 100 === 0 && km < 500 && (
                      <>
                        <line
                          x1="30"
                          y1={y}
                          x2="33"
                          y2={y}
                          stroke="black"
                          strokeWidth="1"
                        />
                        <text x="15" y={y + 3} fontSize="6" textAnchor="start">
                          {km}
                        </text>
                      </>
                    )}
                  </g>
                )
              })}
              <defs>
                {/* Definition eines Pfeilmarkers */}
                <marker
                  id="arrow"
                  markerWidth="6"
                  markerHeight="6"
                  refX="3"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M0,0 L0,6 L6,3 z" fill="black" />
                </marker>
              </defs>

              {/* Koordinatensystem */}
              {/* x-Achse (verschobenes Ende, sodass der Pfeil vollständig sichtbar ist) */}
              <line
                x1="33"
                y1="157"
                x2="324" // statt 328
                y2="157"
                stroke="black"
                strokeWidth="1"
                markerEnd="url(#arrow)"
              />
              {/* y-Achse (Endpunkt von 0 auf 5 verschoben) */}
              <line
                x1="33"
                y1="157"
                x2="33"
                y2="5" // statt 0
                stroke="black"
                strokeWidth="1"
                markerEnd="url(#arrow)"
              />

              {/* Achsenbeschriftungen */}
              {/* x-Achse: "Zeit in min" zentriert unter der Achse */}
              <text x={324 - 40} y="175" fontSize="9" textAnchor="right">
                Zeit in min
              </text>
              {/* y-Achse: "Strecke in km"  */}
              <text
                x="8"
                y="40"
                fontSize="9"
                textAnchor="middle"
                transform="rotate(-90 8,40)"
              >
                Strecke in km
              </text>

              {/* Stationsbeschriftungen */}
              <text x="15" y="150" fontSize="8" textAnchor="right">
                Aachen
              </text>
              <text
                x={toX((data.zeit_2 - data.zeit_1) / 10)}
                y={toY(data.strecke_1 / 50) - 4}
                fontSize={8}
                textAnchor="middle"
              >
                Lüttich
              </text>
              <text
                x={toX((data.zeit_4 + 60 - data.zeit_1) / 10)}
                y={toY(data.strecke_2 / 50) - 4}
                fontSize={8}
                textAnchor="middle"
              >
                Brüssel
              </text>
              <text
                x={toX((data.zeit_6 + 180 - data.zeit_1) / 10)}
                y={toY(data.strecke_3 / 50) - 4}
                fontSize={8}
                textAnchor="middle"
              >
                Paris
              </text>

              {/* Verbindungslinien (Fahrtverlauf) */}
              <line
                x1="33"
                y1="157"
                x2={toX((data.zeit_2 - data.zeit_1) / 10)}
                y2={toY(data.strecke_1 / 50)}
                stroke="black"
                strokeWidth={1.5}
              />
              <line
                x1={toX((data.zeit_2 - data.zeit_1) / 10)}
                y1={toY(data.strecke_1 / 50)}
                x2={toX((data.zeit_3 - data.zeit_1) / 10)}
                y2={toY(data.strecke_1 / 50)}
                stroke="black"
                strokeWidth={1.5}
              />
              <line
                x1={toX((data.zeit_3 - data.zeit_1) / 10)}
                y1={toY(data.strecke_1 / 50)}
                x2={toX((data.zeit_4 + 60 - data.zeit_1) / 10)}
                y2={toY(data.strecke_2 / 50)}
                stroke="black"
                strokeWidth={1.5}
              />
              <line
                x1={toX((data.zeit_4 + 60 - data.zeit_1) / 10)}
                y1={toY(data.strecke_2 / 50)}
                x2={toX((data.zeit_5 + 60 - data.zeit_1) / 10)}
                y2={toY(data.strecke_2 / 50)}
                stroke="black"
                strokeWidth={1.5}
              />
              <line
                x1={toX((data.zeit_6 + 180 - data.zeit_1) / 10)}
                y1={toY(data.strecke_3 / 50)}
                x2={toX((data.zeit_5 + 60 - data.zeit_1) / 10)}
                y2={toY(data.strecke_2 / 50)}
                stroke="black"
                strokeWidth={1.5}
              />
              {/* Markierung Aachen */}
              <text
                x={33 - 1}
                y={157 + 1}
                fontSize="4"
                textAnchor="right"
                stroke="black"
                fill="black"
              >
                o
              </text>
              {/* Markierung Lüttich 1 */}
              <text
                x={toX((data.zeit_2 - data.zeit_1) / 10) - 1}
                y={toY(data.strecke_1 / 50) + 1}
                fontSize="4"
                textAnchor="right"
                stroke="black"
                fill="black"
              >
                o
              </text>
              {/* Markierung Lüttich 2 */}
              <text
                x={toX((data.zeit_3 - data.zeit_1) / 10) - 1}
                y={toY(data.strecke_1 / 50) + 1}
                fontSize="4"
                textAnchor="right"
                stroke="black"
                fill="black"
              >
                o
              </text>
              {/* Markierung Brüssel 1 */}
              <text
                x={toX((data.zeit_4 + 60 - data.zeit_1) / 10) - 1}
                y={toY(data.strecke_2 / 50) + 1}
                fontSize="4"
                textAnchor="right"
                stroke="black"
                fill="black"
              >
                o
              </text>
              {/* Markierung Brüssel 2 */}
              <text
                x={toX((data.zeit_5 + 60 - data.zeit_1) / 10) - 1}
                y={toY(data.strecke_2 / 50) + 1}
                fontSize="4"
                textAnchor="right"
                stroke="black"
                fill="black"
              >
                o
              </text>
              {/* Markierung am Endpunkt (z. B. Paris) */}
              <text
                x={toX((data.zeit_6 + 180 - data.zeit_1) / 10) - 1}
                y={toY(data.strecke_3 / 50) + 1}
                fontSize="3"
                textAnchor="right"
                stroke="black"
                fill="black"
              >
                o
              </text>
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 2: Zeit-Weg-Diagramm von Aachen nach Paris
                </span>
              </Color5>
            </center>
          </>
        )
      },

      task({ data }) {
        return (
          //d)
          <>
            <p>
              Lies am Graphen ab, wie viele Kilometer der Zug nach 50 Minuten
              zurückgelegt hat.
            </p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          // n entspricht der Zeit in 10-Minuten-Schritten (z. B. 0.5 = 5 min, 1 = 10 min usw.)
          return 33 + n * 15.6
        }
        function toY(n: number) {
          // n entspricht der Strecke in 50-Kilometer-Schritten (z. B. 0.5 = 25 km, 1 = 50 km usw.)
          return 157 - n * 15.6
        }
        // Berechnungen für das vertikale Gitternetz (x-Achse)
        const availableWidth = 328 - 33 // 295
        const gridSpacingX = 7.8 // 5 min = 7.8 SVG-Einheiten
        const numXSteps = Math.floor(availableWidth / gridSpacingX) + 1

        // Für das horizontale Gitternetz (y-Achse)
        // Mit numYSteps = 21 decken wir bis 500 km ab, allerdings wird 500 km später nicht beschriftet.
        const numYSteps = 21

        // Berechnung der Strecke (in km) nach 50 Minuten, anhand deiner Interpolation:
        const weg =
          data.strecke_1 +
          ((50 - data.zeit_3 + data.zeit_1) *
            (data.strecke_2 - data.strecke_1)) /
            (data.zeit_4 + 60 - data.zeit_3)

        return (
          <>
            <svg viewBox="0 0 328 180">
              {/* Vertikale Gitternetzlinien und Beschriftungen (x-Achse) */}
              {Array.from({ length: numXSteps }, (_, i) => {
                const param = i * 0.5 // 0.5 entspricht 5 min
                const x = toX(param)
                const timeMinutes = i * 5
                return (
                  <g key={`x-grid-${i}`}>
                    <line
                      x1={x}
                      y1="157"
                      x2={x}
                      y2="0"
                      stroke="lightgray"
                      strokeWidth="0.5"
                    />
                    {/* Beschriftung alle 10 min (ohne Einheit) plus Tick-Mark */}
                    {timeMinutes % 10 === 0 && (
                      <>
                        <line
                          x1={x}
                          y1="157"
                          x2={x}
                          y2="160"
                          stroke={timeMinutes === 50 ? 'blue' : 'black'}
                          strokeWidth="1"
                        />
                        <text
                          x={x}
                          y="165"
                          fontSize="6"
                          textAnchor="middle"
                          fill={timeMinutes === 50 ? 'blue' : 'black'}
                        >
                          {timeMinutes}
                        </text>
                      </>
                    )}
                  </g>
                )
              })}

              {/* Horizontale Gitternetzlinien und Beschriftungen (y-Achse) */}
              {Array.from({ length: numYSteps }, (_, j) => {
                const km = j * 25
                const y = toY(j * 0.5)
                return (
                  <g key={`y-grid-${j}`}>
                    <line
                      x1="33"
                      y1={y}
                      x2="328"
                      y2={y}
                      stroke="lightgray"
                      strokeWidth="0.5"
                    />
                    {/* Beschriftung alle 100 km (ohne Einheit), außer bei 0 km und 500 km */}
                    {km !== 0 && km % 100 === 0 && km < 500 && (
                      <>
                        <line
                          x1="30"
                          y1={y}
                          x2="33"
                          y2={y}
                          stroke="black"
                          strokeWidth="1"
                        />
                        <text x="15" y={y + 3} fontSize="6" textAnchor="start">
                          {km}
                        </text>
                      </>
                    )}
                  </g>
                )
              })}

              <defs>
                {/* Definition eines Pfeilmarkers */}
                <marker
                  id="arrow"
                  markerWidth="6"
                  markerHeight="6"
                  refX="3"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M0,0 L0,6 L6,3 z" fill="black" />
                </marker>
              </defs>

              {/* Koordinatensystem */}
              {/* x-Achse (verschobenes Ende, sodass der Pfeil vollständig sichtbar ist) */}
              <line
                x1="33"
                y1="157"
                x2="324" // statt 328
                y2="157"
                stroke="black"
                strokeWidth="1"
                markerEnd="url(#arrow)"
              />
              {/* y-Achse (Endpunkt von 0 auf 5 verschoben) */}
              <line
                x1="33"
                y1="157"
                x2="33"
                y2="5" // statt 0
                stroke="black"
                strokeWidth="1"
                markerEnd="url(#arrow)"
              />

              {/* Achsenbeschriftungen */}
              {/* x-Achse: "Zeit in min" zentriert unter der Achse */}
              <text x={324 - 40} y="175" fontSize="9" textAnchor="right">
                Zeit in min
              </text>
              {/* y-Achse: "Strecke in km" */}
              <text
                x="8"
                y="40"
                fontSize="9"
                textAnchor="middle"
                transform="rotate(-90 8,40)"
              >
                Strecke in km
              </text>

              {/* Gestrichelte blaue Linie, die den 50-min-Punkt markiert */}
              {/* Vertikale Linie: vom x-Achsenwert (bei 50 min) bis zum Schnittpunkt mit der Kurve */}
              <line
                x1={toX(5)}
                y1="157"
                x2={toX(5)}
                y2={toY(weg / 50)}
                stroke="blue"
                strokeWidth="1"
                strokeDasharray="4,2"
              />
              {/* Horizontale Linie: vom Schnittpunkt bis zur y-Achse */}
              <line
                x1={toX(5)}
                y1={toY(weg / 50)}
                x2="30"
                y2={toY(weg / 50)}
                stroke="blue"
                strokeWidth="1"
                strokeDasharray="4,2"
              />

              {/* Stationsbeschriftungen */}
              <text x="15" y="150" fontSize="8" textAnchor="right">
                Aachen
              </text>
              <text
                x={toX((data.zeit_2 - data.zeit_1) / 10)}
                y={toY(data.strecke_1 / 50) - 4}
                fontSize={8}
                textAnchor="middle"
              >
                Lüttich
              </text>
              <text
                x={toX((data.zeit_4 + 60 - data.zeit_1) / 10)}
                y={toY(data.strecke_2 / 50) - 4}
                fontSize={8}
                textAnchor="middle"
              >
                Brüssel
              </text>
              <text
                x={toX((data.zeit_6 + 180 - data.zeit_1) / 10)}
                y={toY(data.strecke_3 / 50) - 4}
                fontSize={8}
                textAnchor="middle"
              >
                Paris
              </text>

              {/* Verbindungslinien (Fahrtverlauf) */}
              <line
                x1="33"
                y1="157"
                x2={toX((data.zeit_2 - data.zeit_1) / 10)}
                y2={toY(data.strecke_1 / 50)}
                stroke="black"
                strokeWidth={1.5}
              />
              <line
                x1={toX((data.zeit_2 - data.zeit_1) / 10)}
                y1={toY(data.strecke_1 / 50)}
                x2={toX((data.zeit_3 - data.zeit_1) / 10)}
                y2={toY(data.strecke_1 / 50)}
                stroke="black"
                strokeWidth={1.5}
              />
              <line
                x1={toX((data.zeit_3 - data.zeit_1) / 10)}
                y1={toY(data.strecke_1 / 50)}
                x2={toX((data.zeit_4 + 60 - data.zeit_1) / 10)}
                y2={toY(data.strecke_2 / 50)}
                stroke="black"
                strokeWidth={1.5}
              />
              <line
                x1={toX((data.zeit_4 + 60 - data.zeit_1) / 10)}
                y1={toY(data.strecke_2 / 50)}
                x2={toX((data.zeit_5 + 60 - data.zeit_1) / 10)}
                y2={toY(data.strecke_2 / 50)}
                stroke="black"
                strokeWidth={1.5}
              />
              <line
                x1={toX((data.zeit_6 + 180 - data.zeit_1) / 10)}
                y1={toY(data.strecke_3 / 50)}
                x2={toX((data.zeit_5 + 60 - data.zeit_1) / 10)}
                y2={toY(data.strecke_2 / 50)}
                stroke="black"
                strokeWidth={1.5}
              />
              {/* Markierungen an den Stationen */}
              <text
                x={33 - 1}
                y={157 + 1}
                fontSize="4"
                textAnchor="right"
                stroke="black"
                fill="black"
              >
                o
              </text>
              <text
                x={toX((data.zeit_2 - data.zeit_1) / 10) - 1}
                y={toY(data.strecke_1 / 50) + 1}
                fontSize="4"
                textAnchor="right"
                stroke="black"
                fill="black"
              >
                o
              </text>
              <text
                x={toX((data.zeit_3 - data.zeit_1) / 10) - 1}
                y={toY(data.strecke_1 / 50) + 1}
                fontSize="4"
                textAnchor="right"
                stroke="black"
                fill="black"
              >
                o
              </text>
              <text
                x={toX((data.zeit_4 + 60 - data.zeit_1) / 10) - 1}
                y={toY(data.strecke_2 / 50) + 1}
                fontSize="4"
                textAnchor="right"
                stroke="black"
                fill="black"
              >
                o
              </text>
              <text
                x={toX((data.zeit_5 + 60 - data.zeit_1) / 10) - 1}
                y={toY(data.strecke_2 / 50) + 1}
                fontSize="4"
                textAnchor="right"
                stroke="black"
                fill="black"
              >
                o
              </text>
              <text
                x={toX((data.zeit_6 + 180 - data.zeit_1) / 10) - 1}
                y={toY(data.strecke_3 / 50) + 1}
                fontSize="3"
                textAnchor="right"
                stroke="black"
                fill="black"
              >
                o
              </text>
            </svg>
            <p>
              Die blau gestrichelte Linie hilft dir abzulesen, wie viele
              Kilometer nach 50 min erreicht sind.
            </p>
            <p>
              Nach 50 Minuten hat der Zug etwa{' '}
              <strong>{Math.round(weg / 5) * 5} km</strong> zurückgelegt.
            </p>
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
          //e)
          <>
            <p>
              {data.case == 1 && (
                <>
                  In Lüttich und in Brüssel hält der Zug an. Erkläre, woran du
                  dies am Graphen erkennen kannst.
                </>
              )}
              {data.case == 2 && (
                <>
                  In Lüttich macht der Zug Pause. Erkläre, woran du dies am
                  Graphen erkennen kannst.
                </>
              )}
              {data.case == 3 && (
                <>
                  Erkläre woran man erkennt, ob der Zug in einem
                  Streckenabschnitt schneller gefahren ist, als in einem anderen
                  Streckenabschnitt.
                </>
              )}
              {data.case == 4 && (
                <>
                  In Brüssel macht der Zug Pause. Erkläre, woran du dies am
                  Graphen erkennen kannst.
                </>
              )}
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
                  In Lüttich und Brüssel sind zwei Abschnitte sichtbar, in denen
                  der Graph <b>waagerecht</b> verläuft. Dort wird keine Strecke
                  zurückgelegt, weil der Zug am Bahnhof steht.
                </p>
              </>
            )}
            {data.case == 2 && (
              <>
                <p>
                  In Lüttich verläuft der Graph für eine kurze Zeit{' '}
                  <b>waagerecht</b>. Dort wird keine Strecke zurückgelegt, weil
                  der Zug am Bahnhof steht.
                </p>
              </>
            )}
            {data.case == 3 && (
              <>
                <p>
                  Die Geschwindigkeit des Zuges wird durch die Steigung der
                  Gerade in diesem Streckenabschnitt angegeben. Verläuft eine
                  Gerade <b>steiler</b> als eine andere, ist der Zug schneller
                  gefahren.
                </p>
              </>
            )}
            {data.case == 4 && (
              <>
                <p>
                  In Brüssel verläuft der Graph für eine kurze Zeit{' '}
                  <b>waagerecht</b>. Dort wird keine Strecke zurückgelegt, weil
                  der Zug am Bahnhof steht.
                </p>
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
        const listItems = [
          <li key="1">{richtig[data.item_1]}</li>,
          <li key="2">{falsch[data.item_2]}</li>,
          <li key="3">{falsch[data.item_3]}</li>,
        ]
        const shuffledItems = data.order.map(i => listItems[i])
        return (
          //f)
          <>
            <p>
              Welche Aussagen zum Graphen stimmen bzw. stimmen nicht? Wähle aus.
            </p>
            <ul>{shuffledItems}</ul>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Die Aussagen</p>
            <ul>
              <li>{richtig[data.item_1]}</li>
              <li>{falsch[data.item_2]}</li>
            </ul>{' '}
            <p>
              sind <strong>korrekt</strong>.<br></br>
              <br></br>
              Die Aussage{' '}
              <ul>
                <li>{falsch[data.item_3]}</li>
              </ul>{' '}
              ist <strong>nicht korrekt</strong>.
            </p>
          </>
        )
      },
    },
  ],
}
