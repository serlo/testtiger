import { Exercise } from '@/data/types'

interface DATA {
  red: number
  blue: number
  green: number
  gewinn1: number
  gewinn2: number
  bet: number
}

export const exercise249: Exercise<DATA> = {
  title: 'Zufall + Tiny-House',
  source: '2022 Wahlteil B - Aufgabe 3',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      red: rng.randomIntBetween(4, 8),
      blue: rng.randomIntBetween(4, 8),
      green: rng.randomIntBetween(4, 8),
      gewinn1: rng.randomIntBetween(4, 10),
      gewinn2: rng.randomIntBetween(4, 10),
      bet: rng.randomIntBetween(1, 3),
    }
  },
  originalData: {
    red: 4,
    blue: 3,
    green: 1,
    gewinn1: 4,
    gewinn2: 10,
    bet: 2.5,
  },
  constraint({ data }) {
    return true
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
        const gesamt = data.red + data.blue + data.green
        return (
          <>
            <p>
              In einem Gefäß liegen {gesamt} Kugeln, wovon {data.red} rot,{' '}
              {data.blue} blau und {data.green} grün gefärbt sind. Es werden
              zwei Kugeln ohne Zurücklegen gezogen.{' '}
            </p>
            <ul>
              <li>
                Wie groß ist die Wahrscheinlichkeit, zwei gleichfarbige Kugeln
                zu ziehen?
              </li>
            </ul>
            <p>
              Die Kugeln werden für ein Gewinnspiel eingesetzt. Dazu wird
              folgender Gewinnplan geprüft.{' '}
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
                      zwei gleichfarbige Kugeln
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      {data.gewinn1} €
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] ">
                      eine grüne und eine blaue Kugel
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      {data.gewinn2} €
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] ">
                      Einsatz
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black ">
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
              Der Veranstalter des Gewinnspiels möchte seinen Gewinn pro Spiel
              auf lange Sicht verdoppeln.{' '}
            </p>
            <ul>
              <li>
                Wie hoch müsste dann der Gewinn für {'"'}eine grüne und eine
                blaue Kugel{'"'} sein, wenn alles andere unverändert bleibt?
              </li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              <strong></strong>
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
        return (
          <>
            <p>
              Das Foto zeigt ein {'"'} Tiny House{'"'} . Die Vorderseite des
              Hauses ist annähernd parabelförmig. Die maximale Höhe des Hauses
              beträgt 3,00 m. Am Boden ist es 2,70 m breit.{' '}
            </p>
            <svg viewBox="0 0 328 150">
              <image
                href="/content/BW_Realschule/249_Tinyhouse.jpg"
                height="150"
                width="328"
              />
            </svg>
            <ul>
              <li>
                Berechne eine mögliche Funktionsgleichung für die parabelförmige
                Außenkante des Hauses.
              </li>
            </ul>
            <p>
              Die 2,00 m hohe Eingangstür befindet sich mittig auf der
              Vorderseite des Hauses. Am oberen Ende der Eingangstür befindet
              sich ein Vordach, das von Außenkante zu Außenkante reicht.
            </p>
            <ul>
              <li>Berechne die Länge dieses Vordachs.</li>
            </ul>
            <p>
              In 1,00 m Höhe hat der Türrahmen eine waagrechte Entfernung von
              0,70 m zu den Außenkanten.
            </p>
            <ul>
              <li>Berechne den Flächeninhalt der Tür.</li>
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
