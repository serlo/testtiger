import { Exercise } from '@/data/types'
import { Color5 } from '@/helper/colors'

interface DATA {}

export const exercise118: Exercise<DATA> = {
  title: 'Führerschein',
  source: '2022 Teil 2 Aufgabe 2',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    return {}
  },
  originalData: {},
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Alina möchte ihren Autoführerschein machen. Zur Berechnung der Kosten
          für den Führerschein erstellt sie eine Tabelle mithilfe einer
          Tabellenkalkulation:
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
                <td className="py-1 border text-center font-bold p-1 text-black "></td>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  Anzahl geplanter Fahrstunden
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  Einzelpreis in €
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  Gesamtpreis in €
                </td>
              </tr>
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  2
                </td>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  Grundbetrag
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black"></td>
                <td className="py-1 border text-center font-bold p-1  text-black"></td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  300
                </td>
              </tr>
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  3
                </td>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  Prüfung
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black"></td>
                <td className="py-1 border text-center font-bold p-1  text-black"></td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  210
                </td>
              </tr>
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  4
                </td>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  Übungsstunden
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  10
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  45
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black"></td>
              </tr>
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  5
                </td>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  Sonderfahrten
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  12
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  60
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  720
                </td>
              </tr>

              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  6
                </td>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  Gesamtkosten
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black"></td>
                <td className="py-1 border text-center font-bold p-1  text-black"></td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  1680
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
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              a) Alina hat bereits 1 500 € gespart. Sie kann jeden Monat weitere
              40 € sparen.
            </p>
            <p>
              Wie viele Monate muss sie noch für den Führerschein sparen?
              Notiere deinen Rechenweg.
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
            <p>b) Berechne den Gesamtpreis für die Übungsstunden.</p>
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
              c) Mit welcher Formel kann der Wert in Zelle D5 berechnet werden?
              Wähle aus.
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
              d) Alina vermutet, dass sie mehr als zehn Übungsstunden benötigt.
            </p>
            <p>
              Welche Werte ändern sich in der Tabellenkalkulation, wenn Alina
              mehr als zehn Übungsstunden benötigt? Gib alle Zellen an, deren
              Wert sich ändert.
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
            <p>e) Alina nimmt an, dass sie 15 Übungsstunden benötigt.</p>
            <p>
              Bestimme die Gesamtkosten, die Alina für den Führerschein jetzt
              einplanen muss.
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
        return (
          <>
            <p>Die Fahrschule wirbt mit einem neuen Angebot (Abbildung 1).</p>
            <svg viewBox="0 0 328 110">
              <image
                href="/content/NRW_EESA/118_Führerschein.PNG"
                height="110"
                width="328"
              />

              <text
                x="136"
                y="75"
                fontSize="13"
                textAnchor="middle"
                fill="black"
              ></text>
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 1: Angebot der Fahrschule
                </span>
              </Color5>
            </center>
            <p>
              f) Alina behauptet: {'"'}Ich spare damit etwa 33% der Gesamtkosten
              für meinen Führerschein.{'"'} Hat Alina recht?
            </p>

            <p>Begründe deine Entscheidung.</p>
          </>
        )
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
