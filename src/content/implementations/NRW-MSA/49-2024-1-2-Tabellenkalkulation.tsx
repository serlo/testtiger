import { Exercise } from '@/data/types'
import { Color5 } from '@/helper/colors'

interface DATA {
  case: number
  case_2: number
}

export const exercise49: Exercise<DATA> = {
  title: 'Tabellenkalkulation',
  source: '2024 Teil 1 Aufgabe 2',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      case: rng.randomIntBetween(1, 5),
      case_2: rng.randomIntBetween(1, 5),
    }
  },
  originalData: {
    case: 1,
    case_2: 1,
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return <></>
  },
  tasks: [
    {
      points: 1,
      task({ data }) {
        return (
          <>
            <p>
              Eine Schülerfirma führt eine Tabellenkalkulation über ihre
              Verkaufsaktion zum Valentinstag (Abbildung 1).
            </p>
            <div
              className="relative overflow-hidden rounded-lg max-w-[320px] mx-auto"
              style={{
                transform: 'scale(1)',
                transformOrigin: 'top left',
              }}
            >
              <table className="table-auto rounded-lg shadow-md w-full text-left text-[9px]">
                <thead
                  className="uppercase bg-[#D2ECF6] text-[#404040]"
                  style={{ backgroundColor: '#D2ECF6', color: '#404040' }}
                >
                  <tr>
                    <td className="py-1 border text-center font-bold p-1"></td>
                    <td className="py-1 border text-center font-bold p-1">A</td>
                    <td className="py-1 border text-center font-bold p-1">B</td>
                    <td className="py-1 border text-center font-bold p-1">C</td>
                    <td className="py-1 border text-center font-bold p-1">D</td>
                    <td className="py-1 border text-center font-bold p-1">E</td>
                    <td className="py-1 border text-center font-bold p-1">F</td>
                  </tr>
                </thead>
                <tbody
                  className="bg-white text-gray-500"
                  style={{ backgroundColor: '#FFFFFF', color: '#6b7280' }}
                >
                  <tr>
                    <td className="py-1 border text-center font-bold p-1">1</td>
                    <td className="py-1 border text-center font-bold p-1"></td>
                    <td className="py-1 border text-center font-bold p-1">
                      Verkaufte Stücke
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      Verkaufs-Preis (€)
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      Einkaufs-Preis (€)
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      Gewinn pro Stück (€)
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      Gesamt-
                      <br />
                      gewinn in (€)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1">2</td>
                    <td className="py-1 border text-center font-bold p-1">
                      Blumen
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      90
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      2,00
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      1,40
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      0,60
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      54,00
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1">3</td>
                    <td className="py-1 border text-center font-bold p-1">
                      Schoko-
                      <br />
                      herzen
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      140
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      1,50
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      0,99
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      0,51
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      71,40
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1">4</td>
                    <td className="py-1 border text-center font-bold p-1"></td>
                    <td className="py-1 border text-center font-bold p-1"></td>
                    <td className="py-1 border text-center font-bold p-1"></td>
                    <td className="py-1 border text-center font-bold p-1"></td>
                    <td className="py-1 border text-center font-bold p-1">
                      Summe:
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      125,40
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 1: Tabellenkalkulation über die Verkaufsaktion
                </span>
              </Color5>
            </center>

            <p>
              a) Gib eine Formel an, mit der der Wert in Zelle{' '}
              {data.case == 1 && 'F2'}
              {data.case == 2 && 'F3'}
              {data.case == 3 && 'F4'}
              {data.case == 4 && 'E2'}
              {data.case == 5 && 'E3'} berechnet werden kann.
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
                  F2 bezeichnet den Gesamtgewinn durch die Blumen. Dieser
                  berechnet sich durch die Stückzahl (B2), multipliziert mit dem
                  Gewinn pro Stück (E2). <br></br>
                  <br></br> Die Formel lautet:{' '}
                  <strong>
                    {'"'}= B2 * E2{'"'}
                  </strong>
                  .
                </p>
              </>
            )}
            {data.case == 2 && (
              <>
                <p>
                  F3 bezeichnet den Gesamtgewinn durch die Schokoladenherzen.
                  Dieser berechnet sich durch die Stückzahl (B3), multipliziert
                  mit dem Gewinn pro Stück (E3). <br></br>
                  <br></br> Die Formel lautet:{' '}
                  <strong>
                    {'"'}= B3 * E3{'"'}
                  </strong>
                  .
                </p>
              </>
            )}
            {data.case == 3 && (
              <>
                <p>
                  F4 bezeichnet den Gesamtgewinn durch die Verkaufsaktion.
                  Dieser berechnet sich aus den einzelnen Gewinnen (F2 und F3).
                  <br></br>
                  <br></br> Die Formel lautet:{' '}
                  <strong>
                    {'"'}= F2 + F3{'"'}
                  </strong>
                  .
                </p>
              </>
            )}
            {data.case == 4 && (
              <>
                <p>
                  E2 bezeichnet den Gewinn pro Stück, also den Verkaufspreis
                  (C2) abzüglich des Einkaufspreises (D2). <br></br>
                  <br></br>Die Formel lautet:{' '}
                  <strong>
                    {'"'}= C2 - D2
                    {'"'}
                  </strong>
                </p>
              </>
            )}
            {data.case == 5 && (
              <>
                <p>
                  E3 bezeichnet den Gewinn pro Stück, also dem Verkaufspreis
                  (C3) abzüglich dem Einkaufspreis (D3).<br></br>
                  <br></br> Die Formel lautet:{' '}
                  <strong>
                    {'"'}= C3 - D3
                    {'"'}
                  </strong>
                </p>
              </>
            )}
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
              b){' '}
              {data.case_2 == 1 && (
                <>
                  Die Schülerfirma erhält zusätzlich einen Rabatt auf den
                  Einkaufspreis der Schokoladenherzen.
                </>
              )}
              {data.case_2 == 2 && (
                <>
                  Die Schülerfirma erhält zusätzlich einen Rabatt auf den
                  Einkaufspreis der Blumen.
                </>
              )}
              {data.case_2 == 3 && (
                <>Der Verkaufspreis der Blumen wird höher.</>
              )}
              {data.case_2 == 4 && (
                <>Der Verkaufspreis der Schokoladenherzen wird höher.</>
              )}
              {data.case_2 == 5 && (
                <>
                  Von den Blumen werden beim nächsten Verkaufstag mehr verkauft.
                </>
              )}{' '}
              Gib an, welche Zellen sich dadurch verändern.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            {data.case_2 == 1 && (
              <>
                <p>
                  Ändert sich der Einkaufspreis der Schokoladenherzen, ändern
                  sich
                </p>
                <ul>
                  <li>der Gewinn pro Stück (E3),</li>
                  <li> der Gesamtgewinn durch die Herzen (F3) und </li>
                  <li>der Gesamtgewinn der Verkaufsaktion (F4).</li>
                </ul>
              </>
            )}
            {data.case_2 == 2 && (
              <>
                <p>Ändert sich der Einkaufspreis der Blumen, ändern sich</p>
                <ul>
                  <li>der Gewinn pro Stück (E2),</li>
                  <li> der Gesamtgewinn durch die Blumen (F2) und </li>
                  <li>der Gesamtgewinn der Verkaufsaktion (F4).</li>
                </ul>
              </>
            )}
            {data.case_2 == 3 && (
              <>
                <p>Ändert sich der Verkaufspreis der Blumen, verändert sich</p>
                <ul>
                  <li>der Gewinn pro Blume (E2),</li>
                  <li> der Gesamtgewinn der Blumen (F2) und </li>
                  <li>der Gesamtgewinn der Verkaufsaktion (F4).</li>
                </ul>
              </>
            )}
            {data.case_2 == 4 && (
              <>
                <p>
                  Ändert sich der Verkaufspreis der Schokoladenherzen, verändert
                  sich
                </p>
                <ul>
                  <li>der Gewinn pro Herz (E2), </li>
                  <li>der Gesamtgewinn der Herzen (F2) und</li>
                  <li> der Gesamtgewinn der Verkaufsaktion (F4). </li>
                </ul>
              </>
            )}
            {data.case_2 == 5 && (
              <>
                <p>Werden mehr Blumen verkauft,</p>
                <ul>
                  <li>steigt der Gesamtgewinn durch die Blumen (F2) und</li>{' '}
                  <li>auch der Gesamtgewinn der Verkaufsaktion (F4).</li>
                </ul>
              </>
            )}
          </>
        )
      },
    },
  ],
}
