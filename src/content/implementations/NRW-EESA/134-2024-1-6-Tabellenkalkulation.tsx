import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  anzahl: number
  preis_tablets: number
  preis_schutz: number
  item_1: number
  item_2: number
  item_3: number
  order: number[]
  bool: boolean
}
const richtig1 = ['=B4*C4']
const richtig2 = ['=B3*C3']
const falsch = ['=B3+C3', '=B4+C4', '=D3/C3']
export const exercise134: Exercise<DATA> = {
  title: 'Tabellenkalkulation',
  source: '2024 Teil 1 Aufgabe 6',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {
      anzahl: rng.randomIntBetween(15, 30),
      preis_tablets: rng.randomIntBetween(30, 45) * 10,
      preis_schutz: (rng.randomIntBetween(10, 19) * 100 + 99) / 100,
      item_1: 0,
      item_2: rng.randomIntBetween(0, 2),
      item_3: rng.randomIntBetween(0, 2),
      order: rng.shuffleArray([0, 1, 2]),
      bool: rng.randomBoolean(),
    }
  },
  originalData: {
    anzahl: 20,
    preis_tablets: 340,
    preis_schutz: 19.99,
    item_1: 0,
    item_2: 0,
    item_3: 1,
    order: [0, 1, 2],
    bool: true,
  },
  constraint({ data }) {
    return data.item_2 != data.item_3
  },
  intro({ data }) {
    return (
      <>
        <p>Für den Jahrgang 7 einer Schule werden Tablets bestellt.</p>
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
                  A
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  B
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  C
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  D
                </td>
              </tr>
            </thead>
            <tbody
              className="bg-white text-gray-500"
              style={{ backgroundColor: '#FFFFFF', color: '#6b7280' }}
            >
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  1
                </td>
                <td
                  className="py-2 border text-center font-bold p-1 text-black "
                  colSpan={4}
                >
                  Bestellung der Tablets
                </td>
              </tr>
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  2
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black"></td>
                <td className="py-1 border text-center  text-black">
                  Preis in €
                </td>
                <td className="py-1 border text-center  text-black">Anzahl</td>
                <td className="py-1 border text-center   text-black">
                  Gesamtpreis in €
                </td>
              </tr>
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  3
                </td>
                <td className="py-1 border text-center  text-black">Tablets</td>
                <td className="py-1 border text-center font-bold p-1  text-black"></td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {data.anzahl}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {data.preis_tablets * data.anzahl}
                </td>
              </tr>
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  4
                </td>
                <td className="py-1 border text-center  text-black">
                  Schutzhüllen
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {pp(data.preis_schutz)}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {data.anzahl}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {pp(data.preis_schutz * data.anzahl)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    )
  },
  tasks: [
    {
      points: 2,
      duration: 2,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          //a)
          <>
            <p>Berechne den Wert für Zelle B3.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              B3 enthält den Preis pro Tablet. <br></br>24 Tablets kosten
              insgesamt {data.preis_tablets * data.anzahl} €. <br></br>
              <br></br>Teile den Preis durch die Anzahl:
            </p>
            <p>
              {data.preis_tablets * data.anzahl} : {data.anzahl} ={' '}
              <strong>{data.preis_tablets} [€]</strong>
            </p>
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
        const listItems1 = [
          <li key="1">{richtig1[data.item_1]}</li>,
          <li key="2">{falsch[data.item_2]}</li>,
          <li key="3">{falsch[data.item_3]}</li>,
        ]
        const shuffledItems1 = data.order.map(i => listItems1[i])
        const listItems2 = [
          <li key="1">{richtig2[data.item_1]}</li>,
          <li key="2">{falsch[data.item_2]}</li>,
          <li key="3">{falsch[data.item_3]}</li>,
        ]
        const shuffledItems2 = data.order.map(i => listItems2[i])
        return (
          //b)
          <>
            <p>Welche Formel kann in Zelle {data.bool ? 'D4' : 'D3'} stehen?</p>
            <p>
              Entscheide jeweils, ob die Formel geeignet oder nicht geeignet
              ist.
            </p>
            <ul>{data.bool ? shuffledItems1 : shuffledItems2}</ul>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            {data.bool ? (
              <>
                <p>
                  Die Formel {'"'}
                  {richtig1[data.item_1]}
                  {'"'} berechnet den Wert in Zelle D4. Die anderen Formeln sind
                  falsch.
                </p>
              </>
            ) : (
              <>
                <p>
                  Die Formel {'"'}
                  {richtig2[data.item_1]}
                  {'"'} berechnet den Wert in Zelle D3. Die anderen Formeln sind
                  falsch.
                </p>
              </>
            )}
          </>
        )
      },
    },
  ],
}
