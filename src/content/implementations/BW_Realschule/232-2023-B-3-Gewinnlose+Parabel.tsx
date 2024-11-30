import { Exercise } from '@/data/types'
import {
  buildEquation,
  buildInlineFrac,
  buildOverline,
} from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'

interface DATA {
  slot1: number
  slot2: number
  slot3: number
  slot4: number
  slot5: number
  bet: number
  gewinn_1: number
  gewinn_2: number
  case: number
}

export const exercise232: Exercise<DATA> = {
  title: 'Gewinnlose + Parabel',
  source: '2023 Wahlteil B - Aufgabe 3',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      slot1: rng.randomItemFromArray([1, 3, 6]),
      slot2: rng.randomItemFromArray([1, 3, 6]),
      slot3: rng.randomItemFromArray([1, 3, 6]),
      slot4: rng.randomItemFromArray([1, 3, 6]),
      slot5: rng.randomItemFromArray([1, 3, 6]),
      bet: rng.randomIntBetween(2, 3),
      gewinn_1: rng.randomIntBetween(1, 4),
      gewinn_2: rng.randomIntBetween(3, 7),
      case: rng.randomIntBetween(1, 3),
    }
  },
  originalData: {
    slot1: 3,
    slot2: 6,
    slot3: 1,
    slot4: 1,
    slot5: 3,
    bet: 2,
    gewinn_1: 3,
    gewinn_2: 6,
    case: 1,
  },
  constraint({ data }) {
    const array = [data.slot1, data.slot2, data.slot3, data.slot4, data.slot5]

    // Array bearbeiten: 3 durch 6 und 6 durch 3 ersetzen
    const swappedArray = array.map(element => {
      if (element === 3) return 6
      if (element === 6) return 3
      return element
    })
    const anzahl_1 = array.filter(element => element === 1).length
    const anzahl_3 = array.filter(element => element === 3).length
    const anzahl_6 = array.filter(element => element === 6).length
    return anzahl_1 != 0 && anzahl_3 != 0 && anzahl_6 != 0
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
        const array = [
          data.slot1,
          data.slot2,
          data.slot3,
          data.slot4,
          data.slot5,
        ]
        return (
          <>
            <p>
              Die Klasse 10a verkauft Rubbellose. Auf jedem Los befinden sich
              zwei Streifen. Jeder Streifen enthält die folgenden Ziffern:
            </p>
            <svg viewBox="0 0 328 50">
              <image
                href="/content/BW_Realschule/232_Streifen.jpg"
                height="50"
                width="328"
              />
              <text
                x={92}
                y={28}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                {data.slot1}
              </text>
              <text
                x={128}
                y={41}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                {data.slot2}
              </text>
              <text
                x={163}
                y={29}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                {data.slot3}
              </text>
              <text
                x={198}
                y={37}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                {data.slot4}
              </text>
              <text
                x={234}
                y={24}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                {data.slot5}
              </text>
            </svg>
            <p>
              Die Ziffern sind in zufälliger Reihenfolge angeordnet. Der linke
              Streifen zeigt die Zehnerziffern, der rechte die Einerziffern.
            </p>
            <svg viewBox="0 0 328 190">
              <image
                href="/content/BW_Realschule/232_Streifen2.jpg"
                height="190"
                width="328"
              />
              <text
                x={139}
                y={145}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                {data.slot4}
              </text>
              <text
                x={191}
                y={121}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                {data.slot3}
              </text>
            </svg>
            <p>
              Auf jedem Streifen wird genau ein Feld freigerubbelt, wodurch eine
              zweistellige Zahl entsteht.
            </p>
            <p>
              Die obenstehende Abbildung zeigt die Zahl {data.slot4}
              {data.slot3}.
            </p>
            <ul>
              <li>
                Wie groß ist die Wahrscheinlichkeit, eine Zahl zu erhalten, die{' '}
                {data.case == 1 && <>größer als 60</>}
                {data.case == 2 && <>kleiner als 40</>}
                {data.case == 3 && <>größer als 30</>} ist?
              </li>
            </ul>
            <p>
              Die Rubbellose werden für ein Glücksspiel eingesetzt. Dazu wird
              unten stehender Gewinnplan geprüft.{' '}
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
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      Ereignis
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      Gewinn
                    </td>
                  </tr>
                </thead>
                <tbody
                  className="bg-white text-gray-500"
                  style={{ backgroundColor: '#FFFFFF', color: '#6b7280' }}
                >
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] ">
                      Zahl {data.case == 1 && <>größer als 60</>}
                      {data.case == 2 && <>kleiner als 40</>}
                      {data.case == 3 && <>größer als 30</>}
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      3 €
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] ">
                      Zahl 33
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      6 €
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] ">
                      restliche Möglichkeiten
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      kein Gewinn
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] ">
                      Einsatz
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      {data.bet} €
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul>
              <li>Berechne den Erwartungswert.</li>
            </ul>
            <p>
              Die Klasse 10a überlegt, auf jedem Streifen der Lose eine 3 durch
              eine 6 zu ersetzen.
            </p>
            <ul>
              <li>
                Erhöht sich dadurch der Gewinn für die Klasse? Begründe deine
                Entscheidung durch Rechnung.
              </li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const array = [
          data.slot1,
          data.slot2,
          data.slot3,
          data.slot4,
          data.slot5,
        ]

        // Array bearbeiten: 3 durch 6 und 6 durch 3 ersetzen
        const swappedArray = array.map(element => {
          if (element === 3) return 6
          if (element === 6) return 3
          return element
        })
        const anzahl_1 = array.filter(element => element === 1).length
        const anzahl_3 = array.filter(element => element === 3).length
        const anzahl_6 = array.filter(element => element === 6).length
        const swapped_anzahl_3 = swappedArray.filter(
          element => element === 3,
        ).length
        const swapped_anzahl_6 = swappedArray.filter(
          element => element === 6,
        ).length
        const e_1 =
          (anzahl_6 / 5) * data.gewinn_1 +
          (anzahl_3 / 5) * (anzahl_3 / 5) * data.gewinn_2 -
          data.bet
        const e_2 =
          ((5 - anzahl_6) / 5) * data.gewinn_1 +
          (anzahl_3 / 5) * (anzahl_3 / 5) * data.gewinn_2 -
          data.bet
        const e_3 =
          ((5 - anzahl_1) / 5) * data.gewinn_1 +
          (anzahl_3 / 5) * (anzahl_3 / 5) * data.gewinn_2 -
          data.bet
        const e_s_1 =
          (swapped_anzahl_6 / 5) * data.gewinn_1 +
          (swapped_anzahl_3 / 5) * (swapped_anzahl_3 / 5) * data.gewinn_2 -
          data.bet
        const e_s_2 =
          ((5 - swapped_anzahl_6) / 5) * data.gewinn_1 +
          (swapped_anzahl_3 / 5) * (swapped_anzahl_3 / 5) * data.gewinn_2 -
          data.bet
        const e_s_3 =
          ((5 - anzahl_1) / 5) * data.gewinn_1 +
          (swapped_anzahl_3 / 5) * (swapped_anzahl_3 / 5) * data.gewinn_2 -
          data.bet
        return (
          <>
            <p>
              <strong>
                Zahl {data.case == 1 && <>größer als 60</>}
                {data.case == 2 && <>kleiner als 40</>}
                {data.case == 3 && <>größer als 30</>}
              </strong>
            </p>
            <p>
              {data.case == 1 && (
                <>
                  Die Kombinationen 61,63 und 66 fallen unter dieses Ereignis.
                  Sobald der erste Streifen eine 6 zeigt, ist das Ereignis
                  erfüllt. Die Wahrscheinlichkeit dazu beträgt:
                  {buildEquation([
                    [
                      <>
                        p<sub>6</sub>
                      </>,
                      <>=</>,
                      <>
                        {buildInlineFrac(
                          <>
                            Anzahl von {'"'}6{'"'}
                          </>,
                          <>Anzahl aller Felder</>,
                        )}
                      </>,
                    ],
                    [
                      <></>,
                      <>=</>,
                      <>
                        <strong>
                          {buildInlineFrac(<>{anzahl_6}</>, <>5</>)}
                        </strong>
                      </>,
                    ],
                  ])}
                </>
              )}
              {data.case == 2 && (
                <>
                  Die Kombinationen 11,13,16,31,33 und 36 fallen unter dieses
                  Ereignis. Sobald der erste Streifen keine 6 zeigt, ist das
                  Ereignis erfüllt. Die Wahrscheinlichkeit dazu beträgt:
                  {buildEquation([
                    [
                      <>
                        p<sub>{buildOverline(6)}</sub>
                      </>,
                      <>=</>,
                      <>
                        {buildInlineFrac(
                          <>
                            Anzahl von nicht {'"'}6{'"'}
                          </>,
                          <>Anzahl aller Felder</>,
                        )}
                      </>,
                    ],
                    [
                      <></>,
                      <>=</>,
                      <>
                        <strong>
                          {buildInlineFrac(<>{5 - anzahl_6}</>, <>5</>)}
                        </strong>
                      </>,
                    ],
                  ])}
                </>
              )}
              {data.case == 3 && (
                <>
                  Die Kombinationen 31,33,36,61,63 und 66 fallen unter dieses
                  Ereignis. Sobald der erste Streifen keine 1 zeigt, ist das
                  Ereignis erfüllt. Die Wahrscheinlichkeit dazu beträgt:
                  {buildEquation([
                    [
                      <>
                        p<sub>{buildOverline(1)}</sub>
                      </>,
                      <>=</>,
                      <>
                        {buildInlineFrac(
                          <>
                            Anzahl von nicht {'"'}1{'"'}
                          </>,
                          <>Anzahl aller Felder</>,
                        )}
                      </>,
                    ],
                    [
                      <></>,
                      <>=</>,
                      <>
                        <strong>
                          {buildInlineFrac(<>{5 - anzahl_1}</>, <>5</>)}
                        </strong>
                      </>,
                    ],
                  ])}
                </>
              )}
              <p>
                <strong>Erwartungswert berechnen</strong>
              </p>
              <p>
                Bestimme zuerst die Wahrscheinlichkeit für die Kombination {'"'}
                33{'"'}:
              </p>
              {buildEquation([
                [
                  <>
                    p<sub>33</sub>
                  </>,
                  <>=</>,
                  <>
                    {buildInlineFrac(<>{anzahl_3}</>, <>5</>)} ·{' '}
                    {buildInlineFrac(<>{anzahl_3}</>, <>5</>)}
                  </>,
                ],
                [<></>, <>=</>, <>{ppFrac((anzahl_3 / 5) * (anzahl_3 / 5))}</>],
                [<></>, <></>, <></>],
              ])}
              <p>
                Berechne den Erwartungswert. Multipliziere dazu die Gewinne mit
                den dazugehörigen Wahrscheinlichkeiten. Ziehe den Einsatz davon
                ab:
              </p>
              {buildEquation([
                [
                  <>E</>,
                  <>=</>,
                  <>
                    {data.case == 1 && (
                      <>{buildInlineFrac(<>{anzahl_6}</>, <>5</>)}</>
                    )}
                    {data.case == 2 && (
                      <>{buildInlineFrac(<>{5 - anzahl_6}</>, <>5</>)}</>
                    )}
                    {data.case == 3 && (
                      <>{buildInlineFrac(<>{5 - anzahl_1}</>, <>5</>)}</>
                    )}{' '}
                    · {data.gewinn_1} € +{' '}
                    {ppFrac((anzahl_3 / 5) * (anzahl_3 / 5))} · {data.gewinn_2}{' '}
                    € − {data.bet} €
                  </>,
                ],
                [
                  <></>,
                  <>=</>,
                  <>
                    <strong>
                      {data.case == 1 && <>{pp(e_1)} €</>}
                      {data.case == 2 && <>{pp(e_2)} €</>}
                      {data.case == 3 && <>{pp(e_3)} €</>}
                    </strong>
                  </>,
                ],
                [<></>, <></>, <></>],
              ])}
            </p>
            <p>
              <strong>Vertauschte Streifen</strong>
            </p>
            <p>
              Beim Vertauschen der {"'"}6{"'"} und {"'"}3{"'"} ergeben sich die
              Streifen:
            </p>
            <svg viewBox="0 0 328 50">
              <image
                href="/content/BW_Realschule/232_Streifen.jpg"
                height="50"
                width="328"
              />
              <text
                x={92}
                y={28}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                {swappedArray[0]}
              </text>
              <text
                x={128}
                y={41}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                {swappedArray[1]}
              </text>
              <text
                x={163}
                y={29}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                {swappedArray[2]}
              </text>
              <text
                x={198}
                y={37}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                {swappedArray[3]}
              </text>
              <text
                x={234}
                y={24}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                {swappedArray[4]}
              </text>
            </svg>
            <p>
              {anzahl_3 == swapped_anzahl_3 ? (
                <>
                  Die Anzahl der {"'"}3{"'"} und {"'"}6{"'"} ändert sich dabei
                  nicht. <br></br>
                  So ändert sich auch die Wahrscheinlichkeit und der
                  Erwartungswert nicht.
                </>
              ) : (
                <>
                  Die Wahrscheinlichkeit für die Kombination {"'"}33{"'"}{' '}
                  beträgt jetzt:
                  {buildEquation([
                    [
                      <>
                        p<sub>33</sub>
                      </>,
                      <>=</>,
                      <>
                        {buildInlineFrac(<>{swapped_anzahl_3}</>, <>5</>)} ·{' '}
                        {buildInlineFrac(<>{swapped_anzahl_3}</>, <>5</>)}
                      </>,
                    ],
                    [
                      <></>,
                      <>=</>,
                      <>
                        {ppFrac(
                          (swapped_anzahl_3 / 5) * (swapped_anzahl_3 / 5),
                        )}
                      </>,
                    ],
                  ])}
                  Die Wahrscheinlichkeit für eine Zahl{' '}
                  {data.case == 1 && <>größer als 60</>}
                  {data.case == 2 && <>kleiner als 40</>}
                  {data.case == 3 && <>größer als 30</>} beträgt:
                  {data.case == 1 && (
                    <>{buildInlineFrac(<>{swapped_anzahl_6}</>, <>5</>)}</>
                  )}
                  {data.case == 2 && (
                    <>{buildInlineFrac(<>{5 - swapped_anzahl_6}</>, <>5</>)}</>
                  )}
                  {data.case == 3 && (
                    <>{buildInlineFrac(<>{5 - anzahl_1}</>, <>5</>)}</>
                  )}
                  <p>
                    Berechne den Erwartungswert mit den neuen
                    Wahrscheinlichkeiten:
                  </p>
                  {buildEquation([
                    [
                      <>E</>,
                      <>=</>,
                      <>
                        {data.case == 1 && (
                          <>
                            {buildInlineFrac(<>{swapped_anzahl_6}</>, <>5</>)}
                          </>
                        )}
                        {data.case == 2 && (
                          <>
                            {buildInlineFrac(
                              <>{5 - swapped_anzahl_6}</>,
                              <>5</>,
                            )}
                          </>
                        )}
                        {data.case == 3 && (
                          <>{buildInlineFrac(<>{5 - anzahl_1}</>, <>5</>)}</>
                        )}{' '}
                        · {data.gewinn_1} € +{' '}
                        {ppFrac(
                          (swapped_anzahl_3 / 5) * (swapped_anzahl_3 / 5),
                        )}{' '}
                        · {data.gewinn_2} € − {data.bet} €
                      </>,
                    ],
                    [
                      <></>,
                      <>=</>,
                      <>
                        {data.case == 1 && <>{pp(e_s_1)} €</>}
                        {data.case == 2 && <>{pp(e_s_2)} €</>}
                        {data.case == 3 && <>{pp(e_s_3)} €</>}
                      </>,
                    ],
                  ])}
                  {(data.case == 1 && e_s_1 < e_1) ||
                    (data.case == 2 && e_s_2 < e_2) ||
                    (data.case == 3 && e_s_3 < e_3 && (
                      <>
                        Der neue Erwartungswert ist kleiner. Das bedeutet{' '}
                        <strong>mehr Gewinn</strong> für die Klasse.
                      </>
                    ))}
                  {(data.case == 1 && e_s_1 > e_1) ||
                    (data.case == 2 && e_s_2 > e_2) ||
                    (data.case == 3 && e_s_3 > e_3 && (
                      <>
                        Der neue Erwartungswert ist größer. Das bedeutet{' '}
                        <strong>weniger Gewinn</strong> für die Klasse.
                      </>
                    ))}
                </>
              )}
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
        return <></>
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
