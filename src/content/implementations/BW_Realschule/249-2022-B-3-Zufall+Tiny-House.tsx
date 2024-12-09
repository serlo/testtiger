import { Exercise } from '@/data/types'
import { getGcd } from '@/helper/get-gcd'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

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
      gewinn1: rng.randomIntBetween(2, 5),
      gewinn2: rng.randomIntBetween(2, 5),
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
    const gesamt = data.red + data.blue + data.green
    const farben =
      (data.red * (data.red - 1) +
        data.blue * (data.blue - 1) +
        data.green * (data.green - 1)) /
      (gesamt * (gesamt - 1))
    const erwartungswert = roundToDigits(
      data.gewinn1 * farben +
        data.gewinn2 *
          ((2 * data.blue * data.green) / (gesamt * (gesamt - 1))) -
        data.bet,
      2,
    )
    const farben_zähler =
      data.red * (data.red - 1) +
      data.blue * (data.blue - 1) +
      data.green * (data.green - 1)
    const soll = roundToDigits(
      (2 * erwartungswert +
        data.bet -
        (data.gewinn1 * farben_zähler) / (gesamt * (gesamt - 1))) *
        ((gesamt * (gesamt - 1)) / (2 * data.blue * data.green)),
      2,
    )
    return erwartungswert < -0.1 && soll > 0
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
        const gesamt = data.red + data.blue + data.green
        const farben =
          (data.red * (data.red - 1) +
            data.blue * (data.blue - 1) +
            data.green * (data.green - 1)) /
          (gesamt * (gesamt - 1))
        const farben_zähler =
          data.red * (data.red - 1) +
          data.blue * (data.blue - 1) +
          data.green * (data.green - 1)
        const erwartungswert = roundToDigits(
          data.gewinn1 * farben +
            data.gewinn2 *
              ((2 * data.blue * data.green) / (gesamt * (gesamt - 1))) -
            data.bet,
          2,
        )
        const soll = roundToDigits(
          (2 * erwartungswert +
            data.bet -
            (data.gewinn1 * farben_zähler) / (gesamt * (gesamt - 1))) *
            ((gesamt * (gesamt - 1)) / (2 * data.blue * data.green)),
          2,
        )
        return (
          <>
            <p>
              <strong>Wahrscheinlichkeit für gleichfarbige Kugeln</strong>
            </p>
            <p>
              Für dieses Ereignisses gibt es die Kombinationen rot-rot (rr),
              blau-blau (bb) und grün-grün (gg). <br></br>
              <br></br>Das zufällige Ziehen der Kugeln entspricht hierbei einem
              Laplace-Experiment. Berechne die Wahrscheinlichkeiten mit der
              Formel:
            </p>
            {buildEquation([
              [
                <>
                  p<sub>rr</sub>
                </>,
                <>=</>,
                <>
                  {buildInlineFrac(<>Rote Kugeln</>, <>Anzahl Kugeln</>)} ·{' '}
                  {buildInlineFrac(<>Rote Kugeln-1</>, <>Anzahl Kugeln-1</>)}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(<>{data.red}</>, <>{gesamt}</>)} ·{' '}
                  {buildInlineFrac(<>{data.red - 1}</>, <>{gesamt - 1}</>)} ={' '}
                  {ppFrac([data.red * (data.red - 1), gesamt * (gesamt - 1)])}{' '}
                </>,
              ],
            ])}
            {buildEquation([
              [
                <>
                  p<sub>bb</sub>
                </>,
                <>=</>,
                <>
                  {buildInlineFrac(<>Blaue Kugeln</>, <>Anzahl Kugeln</>)} ·{' '}
                  {buildInlineFrac(<>Blaue Kugeln-1</>, <>Anzahl Kugeln-1</>)}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(<>{data.blue}</>, <>{gesamt}</>)} ·{' '}
                  {buildInlineFrac(<>{data.blue - 1}</>, <>{gesamt - 1}</>)} ={' '}
                  {ppFrac([data.blue * (data.blue - 1), gesamt * (gesamt - 1)])}
                </>,
              ],
            ])}
            {buildEquation([
              [
                <>
                  p<sub>gg</sub>
                </>,
                <>=</>,
                <>
                  {buildInlineFrac(<>Grüne Kugeln</>, <>Anzahl Kugeln</>)} ·{' '}
                  {buildInlineFrac(<>Grüne Kugeln-1</>, <>Anzahl Kugeln-1</>)}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(<>{data.green}</>, <>{gesamt}</>)} ·{' '}
                  {buildInlineFrac(<>{data.green - 1}</>, <>{gesamt - 1}</>)} ={' '}
                  {ppFrac([
                    data.green * (data.green - 1),
                    gesamt * (gesamt - 1),
                  ])}
                </>,
              ],
            ])}
            <p>
              Insgesamt ist die Wahrscheinlichkeit für die gleichfarbigen
              Kugeln:
            </p>
            <p>
              p = {ppFrac([data.red * (data.red - 1), gesamt * (gesamt - 1)])} +{' '}
              {ppFrac([data.blue * (data.blue - 1), gesamt * (gesamt - 1)])} +{' '}
              {ppFrac([data.green * (data.green - 1), gesamt * (gesamt - 1)])} ={' '}
              <strong>{ppFrac([farben_zähler, gesamt * (gesamt - 1)])}</strong>
            </p>
            <p>
              <strong>Erwartungswert</strong>
            </p>
            <p>
              Berechne zuerst die Wahrscheinlichkeit für das Ziehen einer grünen
              und einer blauen Kugel:
            </p>
            {buildEquation([
              [
                <>p</>,
                <>=</>,
                <>
                  p<sub>gb</sub> + p<sub>bg</sub>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {ppFrac([data.green, gesamt])} ·{' '}
                  {ppFrac([data.blue, gesamt - 1])} +{' '}
                  {ppFrac([data.blue, gesamt])} ·{' '}
                  {ppFrac([data.green, gesamt - 1])}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {ppFrac([2 * data.blue * data.green, gesamt * (gesamt - 1)])}
                </>,
              ],
            ])}
            <p>
              Berechne den Erwartungswert aus den Wahrscheinlichkeiten und den
              dazugehörigen Gewinnen:
            </p>
            {buildEquation([
              [
                <>E</>,
                <>=</>,
                <>
                  {data.gewinn1} € ·{' '}
                  {ppFrac([farben_zähler, gesamt * (gesamt - 1)])} +{' '}
                  {data.gewinn2} € ·{' '}
                  {ppFrac([2 * data.blue * data.green, gesamt * (gesamt - 1)])}{' '}
                  − {data.bet} €
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <strong>{pp(erwartungswert)} €</strong>
                </>,
              ],
            ])}
            <p>
              Die Betreiber des Glückspiels machen auf lange Sicht{' '}
              {pp(erwartungswert)} € pro Spiel.
            </p>
            <p>
              <strong>Doppelter Gewinn</strong>
            </p>
            <p>
              Die Betreiber des Glückspiels wollen auf lange Sicht{' '}
              {pp(2 * erwartungswert)} € pro Spiel erzielen.
            </p>
            <p>
              Setze den Gewinn für das Ziehen der grünen und blauen Kugel {'"'}x
              {'"'} und berechne mithilfe des Erwartungswerts:
            </p>
            <div>
              <span style={{ fontSize: '0.8em' }}>
                {buildEquation([
                  [
                    <>{pp(2 * erwartungswert)} €</>,
                    <>=</>,
                    <>
                      {data.gewinn1} € ·{' '}
                      {ppFrac([farben_zähler, gesamt * (gesamt - 1)])} + x ·{' '}
                      {ppFrac([
                        2 * data.blue * data.green,
                        gesamt * (gesamt - 1),
                      ])}{' '}
                      − {data.bet} €
                    </>,
                  ],
                  [
                    <>{pp(2 * erwartungswert + data.bet)} €</>,
                    <>=</>,
                    <>
                      {' '}
                      {data.gewinn1} € ·{' '}
                      {ppFrac([farben_zähler, gesamt * (gesamt - 1)])} + x ·{' '}
                      {ppFrac([
                        2 * data.blue * data.green,
                        gesamt * (gesamt - 1),
                      ])}{' '}
                    </>,
                  ],
                  [
                    <>
                      {pp(
                        2 * erwartungswert +
                          data.bet -
                          (data.gewinn1 * farben_zähler) /
                            (gesamt * (gesamt - 1)),
                      )}{' '}
                      €
                    </>,
                    <>=</>,
                    <>
                      x ·{' '}
                      {ppFrac([
                        2 * data.blue * data.green,
                        gesamt * (gesamt - 1),
                      ])}{' '}
                    </>,
                  ],
                  [
                    <>x</>,
                    <>=</>,
                    <>
                      <strong>{pp(soll)} €</strong>
                    </>,
                  ],
                ])}
              </span>
            </div>
            <p>
              Der Gewinn für das Ereignis müsste {pp(soll)} € anstatt{' '}
              {pp(data.gewinn2)} € betragen, damit der Betreiber auf lange Sicht
              den doppelten Gewinn erhält.
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
