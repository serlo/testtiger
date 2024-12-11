import { Exercise } from '@/data/types'
import { Color1 } from '@/helper/colors'
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
  höhe: number
  breite: number
  tür: number
  tür2: number
  abstand: number
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
      höhe: rng.randomIntBetween(25, 35) / 10,
      breite: rng.randomIntBetween(30, 40) / 10,
      tür: rng.randomIntBetween(18, 23) / 10,
      tür2: rng.randomIntBetween(8, 13) / 10,
      abstand: rng.randomIntBetween(9, 13) / 10,
    }
  },
  originalData: {
    red: 4,
    blue: 3,
    green: 1,
    gewinn1: 4,
    gewinn2: 10,
    bet: 2.5,
    höhe: 3,
    breite: 2.7,
    tür: 2,
    tür2: 1,
    abstand: 0.7,
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
              Das Foto zeigt ein {'"'}Tiny House{'"'} . Die Vorderseite des
              Hauses ist annähernd parabelförmig. Die maximale Höhe des Hauses
              beträgt {pp(data.höhe)} m. Am Boden ist es {pp(data.breite)} m
              breit.{' '}
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
              Die {pp(data.tür)} m hohe Eingangstür befindet sich mittig auf der
              Vorderseite des Hauses. Am oberen Ende der Eingangstür befindet
              sich ein Vordach, das von Außenkante zu Außenkante reicht.
            </p>
            <ul>
              <li>Berechne die Länge dieses Vordachs.</li>
            </ul>
            <p>
              In {pp(data.tür2)} m Höhe hat der Türrahmen eine waagrechte
              Entfernung von {pp(data.abstand)} m zu den Außenkanten.
            </p>
            <ul>
              <li>Berechne den Flächeninhalt der Tür.</li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const a = -data.höhe / ((data.breite / 2) * (data.breite / 2))
        const x1tür = Math.sqrt((data.tür - data.höhe) / a)
        const x2tür = -Math.sqrt((data.tür - data.höhe) / a)
        const x1tür2 = Math.sqrt((data.tür2 - data.höhe) / a)
        const x2tür2 = -Math.sqrt((data.tür2 - data.höhe) / a)
        return (
          <>
            <p>
              <strong>Funktionsgleichung der Parabel</strong>
            </p>
            <p>Beschreibe die Parabel mithilfe eines Koordinatensystems:</p>
            <svg viewBox="0 0 328 150">
              <image
                href="/content/BW_Realschule/249_Tinyhouse.jpg"
                height="150"
                width="328"
              />
              <line
                x1={179}
                y1={10}
                x2={179}
                y2={140}
                stroke="blue"
                strokeWidth={2}
              />
              <polygon points="176,12 179,4 182,12" fill="blue" />
              <line
                x1={110}
                y1={124}
                x2={238}
                y2={117}
                stroke="blue"
                strokeWidth={2}
              />
              <polygon points="236,115 246,117 236,119" fill="blue" />
              <text x="185" y="15" font-size="10" fill="blue">
                y
              </text>
              <text x="248" y="122" font-size="10" fill="blue">
                x
              </text>
              <text x="160" y="22" font-size="15" fill="black">
                S ×
              </text>
              <text x="203" y="122" font-size="15" fill="black">
                N ×
              </text>
            </svg>
            <p>
              In diesem Koordinatensystem hat die Parabel den Scheitel S(0|
              <Color1>{pp(data.höhe)}</Color1>) und verläuft durch die
              Nullstelle N(
              {pp(data.breite / 2)}|0).
            </p>
            <p>Die Funktionsgleichung hat die Form:</p>
            <p>
              y = ax² + <Color1>{pp(data.höhe)}</Color1>
            </p>
            <p>Setze den Punkt N ein und bestimme a:</p>
            {buildEquation([
              [<>y</>, <>=</>, <>ax² + {pp(data.höhe)}</>],
              [
                <>0</>,
                <>=</>,
                <>
                  a · {pp(data.breite / 2)}² + {pp(data.höhe)}
                </>,
                <>| − {pp(data.höhe)}</>,
              ],
              [
                <>{pp(-data.höhe)}</>,
                <>=</>,
                <>a · {pp(data.breite / 2)}²</>,
                <>| : {pp(data.breite / 2)}²</>,
              ],
              [<>a</>, <>=</>, <>{ppFrac(a)}</>],
            ])}
            <p>Damit ist die Funktionsgleichung der Parabel:</p>
            <p>
              <strong>
                y = {ppFrac(a)}x² + {pp(data.höhe)}
              </strong>
            </p>
            <p>
              <strong>Länge des Vordachs</strong>
            </p>
            <p>
              Die Tür befindet sich in der Höhe y = {pp(data.tür)}. Berechne, an
              welchen Stellen x<sub>1/2</sub> die Parabel am Vordach entlang
              läuft:
            </p>
            {buildEquation([
              [
                <>{pp(data.tür)}</>,
                <>=</>,
                <>
                  {ppFrac(a)}x² + {pp(data.höhe)}
                </>,
                <>| − {pp(data.höhe)}</>,
              ],
              [
                <>{pp(data.tür - data.höhe)}</>,
                <>=</>,
                <>{ppFrac(a)}x²</>,
                <>| : {ppFrac(a, 'embrace_neg')}</>,
              ],
              [
                <>x²</>,
                <>=</>,
                <>{pp((data.tür - data.höhe) / a)}</>,
                <>| √</>,
              ],
              [
                <>
                  x<sub>1</sub>
                </>,
                <>=</>,
                <>{pp(roundToDigits(x1tür, 4))}</>,
              ],
              [
                <>
                  x<sub>2</sub>
                </>,
                <>=</>,
                <>{pp(roundToDigits(x2tür, 4))}</>,
              ],
            ])}
            <p>Berechne die Distanz zwischen diesen Stellen:</p>
            <p>
              {pp(roundToDigits(x1tür, 4))} m −{' '}
              {pp(roundToDigits(x2tür, 4), 'embrace_neg')} m ={' '}
              {pp(roundToDigits(2 * x1tür, 4))} m
            </p>
            <p>
              Das Vordach hat eine Länge von{' '}
              <strong>{pp(roundToDigits(2 * x1tür, 4))} m</strong>.
            </p>
            <p>
              <strong>Flächeninhalt der Tür</strong>
            </p>
            <p>
              Berechne wie beim Vordach, an welchen Stellen sich die Parabel in
              der Höhe y = {data.tür2} befindet.
            </p>
            {buildEquation([
              [
                <>{pp(data.tür2)}</>,
                <>=</>,
                <>
                  {ppFrac(a)}x² + {pp(data.höhe)}
                </>,
                <>| − {pp(data.höhe)}</>,
              ],
              [
                <>{pp(data.tür2 - data.höhe)}</>,
                <>=</>,
                <>{ppFrac(a)}x²</>,
                <>| : {ppFrac(a, 'embrace_neg')}</>,
              ],
              [
                <>x²</>,
                <>=</>,
                <>{pp((data.tür2 - data.höhe) / a)}</>,
                <>| √</>,
              ],
              [
                <>
                  x<sub>1</sub>
                </>,
                <>=</>,
                <>{pp(roundToDigits(x1tür2, 4))}</>,
              ],
              [
                <>
                  x<sub>2</sub>
                </>,
                <>=</>,
                <>{pp(roundToDigits(x2tür2, 4))}</>,
              ],
            ])}
            <p>Berechne die Distanz zwischen diesen Stellen:</p>
            <p>
              {pp(roundToDigits(x1tür2, 4))} m −{' '}
              {pp(roundToDigits(x2tür2, 4), 'embrace_neg')} m ={' '}
              {pp(roundToDigits(2 * x1tür2, 4))} m
            </p>
            <p>
              Die Tür hat links und rechts einen Abstand von jeweils{' '}
              {pp(data.abstand)} m. Abzüglich des Abstands hat die Tür eine
              Breite von:
            </p>
            <p>
              {pp(roundToDigits(2 * x1tür2, 4))} m − 2 · {pp(data.abstand)} m ={' '}
              {pp(roundToDigits(2 * x1tür2 - 2 * data.abstand, 4))} m
            </p>
            <p>
              Die Tür hat eine Breite von{' '}
              <strong>
                {pp(100 * roundToDigits(2 * x1tür2 - 2 * data.abstand, 4))} cm
              </strong>
              .
            </p>
          </>
        )
      },
    },
  ],
}
