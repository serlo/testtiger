import { Exercise } from '@/data/types'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  preis_p: number
  preis: number
  preis_t: number
  coin: number
}

export const exercise24: Exercise<DATA> = {
  title: 'Tabellenkalkulation',
  source: '2021 Teil 1 Aufgabe 5',
  useCalculator: false,
  duration: 5,
  generator(rng) {
    return {
      preis_t: rng.randomIntBetween(500, 1000) / 100,
      preis_p: rng.randomIntBetween(1000, 1500) / 100,
      preis: rng.randomIntBetween(1500, 3500) / 100,
      coin: rng.randomIntBetween(1, 9),
    }
  },
  constraint({ data }) {
    return (
      roundToDigits(
        roundToDigits(data.preis_p * 0.19 - data.preis_p * 0.16, 2) /
          data.preis_p,
        4,
      ) *
        100 !=
      3
    )
  },
  intro({ data }) {
    return <></>
  },
  tasks: [
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>
              Am 1. Juli 2020 wurde in Deutschland befristet die Mehrwertsteuer
              (= MwSt.) von 19 % auf 16 % gesenkt. Herr Meyer hat ein Geschäft
              für Bekleidung und hat die Senkung der Mehrwertsteuer an seine
              Kunden weitergegeben. Dafür hat er eine Excel-Tabelle angelegt:
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
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      E
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
                    <td className="py-1 border text-center font-bold p-1 text-black ">
                      Produkt
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      Preis ohne MwSt.
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      Preis mit 19 % MwSt.
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      Preis mit 16 % MwSt.
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      Ersparnis in €
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      2
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      T-Shirt
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      {pp(data.preis_t)}
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      {pp(roundToDigits(data.preis_t * 1.19, 2))}
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      {pp(roundToDigits(data.preis_t * 1.16, 2))}
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      {pp(
                        roundToDigits(data.preis_t * 1.19, 2) -
                          roundToDigits(data.preis_t * 1.16, 2),
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      3
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      Pullover
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      {pp(data.preis_p)}
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      {pp(roundToDigits(data.preis_p * 1.19, 2))}
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      {pp(roundToDigits(data.preis_p * 1.16, 2))}
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      {pp(
                        roundToDigits(data.preis_p * 1.19, 2) -
                          roundToDigits(data.preis_p * 1.16, 2),
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      4
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      Kapuzen- pullover
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      {pp(data.preis)}
                    </td>
                    <td className="py-1 border text-center font-bold p-1"></td>
                    <td className="py-1 border text-center font-bold p-1"></td>
                    <td className="py-1 border text-center font-bold p-1">
                      {pp(
                        roundToDigits(data.preis * 1.19, 2) -
                          roundToDigits(data.preis * 1.16, 2),
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              a) Ergänze die fehlenden Werte in Zeile 4 für den Kapuzenpullover.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Der Preis mit Mehrwertsteuer wird durch die Formel des
              Prozentwerts berechnet:
            </p>
            <p>
              W = G · p<br></br>
            </p>
            <p>
              Setze den Preis ohne MwSt. als Grundwert ein. Für den Prozentwert
              können 119 % ≙ 1,19 eingesetzt werden, da es sich um eine 19 % -
              ige Erhöhung des Grundwerts handelt:
            </p>
            {buildEquation([
              ['W', '=', 'G · p'],
              ['', '=', <>{pp(data.preis)} · 1,19</>],
              [
                '',
                '=',
                <>
                  <strong>
                    {pp(Math.round(data.preis * 1.19 * 100) / 100)} €
                  </strong>
                </>,
              ],
            ])}

            <p>
              Mit der gleichen Rechnung wird der Preis für 16 % MwSt. berechnet:
            </p>
            {buildEquation([
              ['W', '=', 'G · p'],
              ['', '=', <>{pp(data.preis)} · 1,16</>],
              [
                '',
                '=',
                <>
                  <strong>
                    {pp(Math.round(data.preis * 1.16 * 100) / 100)} €
                  </strong>
                </>,
              ],
            ])}
            <p>Damit ist die ausgefüllte Tabelle:</p>
            <svg viewBox="0 0 328 66">
              <image
                href="/content/NRW_MSA_Tabellenkalk.png"
                height="66"
                width="328"
              />
              <text
                x={115}
                y={61}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {pp(data.preis)}
              </text>
              <text
                x={305}
                y={37}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {pp(
                  roundToDigits(data.preis_t * 1.19, 2) -
                    roundToDigits(data.preis_t * 1.16, 2),
                )}
              </text>
              <text
                x={305}
                y={49}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {pp(
                  roundToDigits(data.preis_p * 1.19, 2) -
                    roundToDigits(data.preis_p * 1.16, 2),
                )}
              </text>
              <text
                x={120}
                y={37}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {pp(data.preis_t)}
              </text>
              <text
                x={188}
                y={37}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {pp(roundToDigits(data.preis_t * 1.19, 2))}
              </text>
              <text
                x={188}
                y={49}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {pp(roundToDigits(data.preis_p * 1.19, 2))}
              </text>
              <text
                x={258}
                y={49}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {pp(roundToDigits(data.preis_p * 1.16, 2))}
              </text>
              <text
                x={259}
                y={37}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {pp(roundToDigits(data.preis_t * 1.16, 2))}
              </text>
              <text
                x={117}
                y={49}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {pp(data.preis_p)}
              </text>
              <text
                x={305}
                y={61}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {pp(
                  Math.round((data.preis * 1.19 - data.preis * 1.16) * 100) /
                    100,
                )}
              </text>

              <text
                x={185}
                y={61}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {pp(Math.round(data.preis * 1.19 * 100) / 100)}
              </text>
              <text
                x={255}
                y={61}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {pp(Math.round(data.preis * 1.16 * 100) / 100)}
              </text>
            </svg>
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
              b) Der Wert welcher Zelle lässt sich mit der Formel {'"'}
              {data.coin == 1 && '= B3 ⋅ 1,19 − B3 ⋅ 1,16'}
              {data.coin == 2 && '= B4 ⋅ 1,19 − B4 ⋅ 1,16'}
              {data.coin == 3 && '= B2 ⋅ 1,19 − B2 ⋅ 1,16'}
              {data.coin == 4 && '= B3 ⋅ 1,19'}
              {data.coin == 5 && '= B2 ⋅ 1,16'}
              {data.coin == 6 && '= B4 ⋅ 1,19'}
              {data.coin == 7 && '= C2 − D2'}
              {data.coin == 8 && '= C3 − D3'}
              {data.coin == 9 && '= C4 − D4'}
              {'"'} berechnen?
            </p>

            <p>Gib die Zelle an. </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              {data.coin == 1 && (
                <>
                  Berechnet wird die Differenz des Preises mit 19 % MwSt. und
                  des Preises mit 16 % MwSt. <br></br>
                  <br></br>Das entspricht der Ersparnis in <strong>E3</strong>.
                </>
              )}
              {data.coin == 2 && (
                <>
                  Berechnet wird die Differenz des Preises mit 19 % MwSt. und
                  des Preises mit 16 % MwSt. <br></br>
                  <br></br>Das entspricht der Ersparnis in <strong>E4</strong>.
                </>
              )}
              {data.coin == 3 && (
                <>
                  Berechnet wird die Differenz des Preises mit 19 % MwSt. und
                  des Preises mit 16 % MwSt. <br></br>
                  <br></br>Das entspricht der Ersparnis in <strong>E2</strong>.
                </>
              )}
              {data.coin == 4 && (
                <>
                  B3 ist der Preis ohne MwSt. Multipliziert mit dem Faktor 1,19
                  werden 19 % MwSt. hinzugerechnet. <br></br>
                  <br></br>
                  Die Formel berechnet den Wert von: <strong>C3</strong>
                </>
              )}
              {data.coin == 5 && (
                <>
                  B2 ist der Preis ohne MwSt. Multipliziert mit dem Faktor 1,16
                  werden 16 % MwSt. hinzugerechnet. <br></br>
                  <br></br>
                  Die Formel berechnet den Wert von: <strong>D2</strong>
                </>
              )}
              {data.coin == 6 && (
                <>
                  B4 ist der Preis ohne MwSt. Multipliziert mit dem Faktor 1,19
                  werden 19 % MwSt. hinzugerechnet. <br></br>
                  <br></br>
                  Die Formel berechnet den Wert von: <strong>C4</strong>
                </>
              )}
              {data.coin == 7 && (
                <>
                  Berechnet wird die Differenz des Preises mit 19 % MwSt. und
                  des Preises mit 16 % MwSt. <br></br>
                  <br></br>Das entspricht der Ersparnis in <strong>E2</strong>.
                </>
              )}
              {data.coin == 8 && (
                <>
                  Berechnet wird die Differenz des Preises mit 19 % MwSt. und
                  des Preises mit 16 % MwSt. <br></br>
                  <br></br>Das entspricht der Ersparnis in <strong>E3</strong>.
                </>
              )}
              {data.coin == 9 && (
                <>
                  Berechnet wird die Differenz des Preises mit 19 % MwSt. und
                  des Preises mit 16 % MwSt. <br></br>
                  <br></br>Das entspricht der Ersparnis in <strong>E4</strong>.
                </>
              )}
            </p>
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
              c) Herr Meyer stellt fest: „Obwohl die Mehrwertsteuer um 3 %
              abgesenkt wurde, betrug die Ersparnis für den Kunden nicht 3 %.“
              <br></br>Begründe durch eine Rechnung, dass diese Aussage
              zutrifft.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Für die Beispielrechnung wählen wir den Pullover aus.</p>
            <ul>
              <li>
                Preis des Pullovers vor der Absenkung:{' '}
                {pp(roundToDigits(data.preis_p * 1.19, 2))} €
              </li>
              <li>
                Ersparnis nach der Absenkung der MwSt.:{' '}
                {pp(
                  roundToDigits(data.preis_p * 0.19 - data.preis_p * 0.16, 2),
                )}{' '}
                €
              </li>
            </ul>

            <p>
              Die Erparnis beträgt in Prozent:<br></br>
              {buildInlineFrac(
                pp(roundToDigits(data.preis_p * 0.19 - data.preis_p * 0.16, 2)),
                pp(roundToDigits(data.preis_p * 1.19, 2)),
              )}{' '}
              · 100 % ={' '}
              <strong>
                {pp(
                  roundToDigits(
                    roundToDigits(
                      data.preis_p * 0.19 - data.preis_p * 0.16,
                      2,
                    ) / roundToDigits(data.preis_p * 1.19, 2),
                    4,
                  ) * 100,
                )}{' '}
                %
              </strong>
            </p>
            <p>
              <strong>Damit trifft die Aussage von Herr Meyer zu</strong>.
            </p>
          </>
        )
      },
    },
  ],
}
