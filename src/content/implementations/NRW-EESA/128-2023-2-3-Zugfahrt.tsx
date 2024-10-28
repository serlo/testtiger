import { Exercise } from '@/data/types'
import { Color5 } from '@/helper/colors'
import { buildInlineFrac } from '@/helper/math-builder'

interface DATA {
  case: number
  aussagen_e: Array<string>
}

export const exercise128: Exercise<DATA> = {
  title: 'Zugfahrt',
  source: '2023 Teil 2 Aufgabe 3',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    const aussagen = [
      'Von Lüttich nach Brüssel fährt der Zug schneller als von Brüssel nach Paris.',
      'In Brüssel hält der Zug für weniger als 15 Minuten.',
      '40 Minuten nach der Abfahrt in Brüssel ist der Zug mehr als 200 km von seiner Gesamtstrecke gefahren.',
    ]
    return {
      case: rng.randomIntBetween(1, 4),
      aussagen_e: rng.shuffleArray(aussagen),
    }
  },
  originalData: {
    case: 1,
    aussagen_e: [
      'Von Lüttich nach Brüssel fährt der Zug schneller als von Brüssel nach Paris.',
      'In Brüssel hält der Zug für weniger als 15 Minuten.',
      '40 Minuten nach der Abfahrt in Brüssel ist der Zug mehr als 200 km von seiner Gesamtstrecke gefahren.',
    ],
  },
  constraint({ data }) {
    return true
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
                  07:22
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
                  07:49
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  07:52
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  42
                </td>
              </tr>
              <tr>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  Brüssel
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  08:35
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  08:43
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  114
                </td>
              </tr>
              <tr>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  Paris
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  10:05
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  -
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  428
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
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              a) Wie lange dauert die Fahrt von Aachen nach Paris? Bestimme mit
              der Tabelle.
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      points: 42,
      intro({ data }) {
        return <></>
      },
      task({ data }) {
        return (
          <>
            b){' '}
            <ol>
              <li>Gib die längste Teilstrecke an. </li>
              <li>Berechne die Länge dieser Teilstrecke.</li>
            </ol>
          </>
        )
      },
      solution({ data }) {
        return <></>
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
              c) Bestimme die durchschnittliche Geschwindigkeit des Zuges von
              Aachen nach Lüttich und gib diese in Kilometer pro Stunde{' '}
              <span className="inline-block  scale-y-[2.6]">(</span>
              {buildInlineFrac('km', 'h')}
              <span className="inline-block  scale-y-[2.6]">)</span> an.
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      points: 42,
      intro({ data }) {
        function toX(n: number) {
          return 33 + n * 15.6
        }
        function toY(n: number) {
          return 157 - n * 15.6
        }
        return (
          <>
            <p>
              In Abbildung 2 ist der Verlauf der Fahrt von Aachen nach Paris
              vereinfacht dargestellt.
            </p>
            <svg viewBox="0 0 328 180">
              <image
                href="/content/NRW_EESA/128_Zugfahrt2.PNG"
                height="180"
                width="328"
              />
              <text
                x={97}
                y={104}
                fontSize={5}
                textAnchor="right"
                stroke="black"
              >
                o
              </text>
              <text
                x={110}
                y={104}
                fontSize={5}
                textAnchor="right"
                stroke="blue"
              >
                o
              </text>
              <text
                x={198}
                y={87}
                fontSize={5}
                textAnchor="right"
                stroke="black"
              >
                o
              </text>
              <text
                x={213}
                y={87}
                fontSize={5}
                textAnchor="right"
                stroke="black"
              >
                o
              </text>
              <text
                x={15}
                y={145}
                fontSize={7}
                textAnchor="right"
                stroke="blue"
              >
                Aachen
              </text>
              <text
                x={85}
                y={100}
                fontSize={7}
                textAnchor="right"
                stroke="blue"
              >
                Lüttich
              </text>
              <text
                x={190}
                y={80}
                fontSize={7}
                textAnchor="right"
                stroke="blue"
              >
                Brüssel
              </text>
              <text
                x={280}
                y={25}
                fontSize={7}
                textAnchor="right"
                stroke="blue"
              >
                Paris
              </text>
              <line
                x1={33}
                y1={157}
                x2={100}
                y2={102}
                stroke="blue"
                strokeWidth={2}
              />
              <line
                x1={100}
                y1={102}
                x2={110}
                y2={102}
                stroke="blue"
                strokeWidth={2}
              />
              <line
                x2={200}
                y2={85}
                x1={111}
                y1={102}
                stroke="blue"
                strokeWidth={2}
              />
              <line
                x1={200}
                y1={85}
                x2={215}
                y2={85}
                stroke="blue"
                strokeWidth={2}
              />
              <line
                x2={215}
                y1={30}
                x1={290}
                y2={85}
                stroke="blue"
                strokeWidth={2}
              />
              <text
                x={288}
                y={32}
                fontSize={5}
                textAnchor="right"
                stroke="blue"
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
          <>
            <p>
              d) Lies am Graphen ab, wie viele Kilometer der Zug nach 50 Minuten
              zurückgelegt hat.
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
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
              e){' '}
              {data.case == 1 && (
                <>In Lüttich und in Brüssel hält der Zug an.</>
              )}
              {data.case == 2 && (
                <>In Brüssel hält der Zug länger als in Lüttich.</>
              )}
              {data.case == 3 && (
                <>
                  Zwischen Aachen und Lüttich fährt der Zug schneller als
                  zwischen Lüttich und Brüssel.
                </>
              )}
              {data.case == 4 && <>In Brüssel macht der Zug Pause.</>} Erkläre,
              woran du dies am Graphen erkennen kannst.
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
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
              f) Welche Aussagen zum Graphen stimmen bzw. stimmen nicht? Wähle
              aus. an.
            </p>
            <ul>
              <li>{data.aussagen_e[0]}</li>
              <li>{data.aussagen_e[1]}</li>
              <li>{data.aussagen_e[2]}</li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
