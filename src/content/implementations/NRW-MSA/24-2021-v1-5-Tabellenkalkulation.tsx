import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  preis: number
  coin: number
}

export const exercise24: Exercise<DATA> = {
  title: '2021 Variante 1 /5) Tabellenkalkulation',
  useCalculator: false,
  duration: 3,
  generator(rng) {
    return {
      preis: rng.randomIntBetween(1500, 3500) / 100,
      coin: rng.randomIntBetween(1, 9),
    }
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
  subtasks: {
    intro: ({ data }) => {
      return <></>
    },
    tasks: [
      ({ data }) => {
        return (
          <>
            <p>
              Am 1. Juli 2020 wurde in Deutschland befristet die Mehrwertsteuer
              (= MwSt.) von 19% auf 16% gesenkt. Herr Meyer hat ein Geschäft für
              Bekleidung und hat die Senkung der Mehrwertsteuer an seine Kunden
              weitergegeben. Dafür hat er eine Excel-Tabelle angelegt:
            </p>
            <svg viewBox="0 0 600 120">
              <image
                href="/content/NRW_MSA_Tabellenkalk.png"
                height="120"
                width="600"
              />
              <text
                x={223}
                y={102}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {pp(data.preis)}
              </text>
              <text
                x={568}
                y={102}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {pp(
                  Math.round((data.preis * 1.19 - data.preis * 1.16) * 100) /
                    100,
                )}
              </text>
            </svg>
            <p>
              a) Ergänze die fehlenden Werte in Zeile 4 für den Kapuzenpullover.
            </p>
          </>
        )
      },
      ({ data }) => {
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
      ({ data }) => {
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
    ],
    solutions: [
      ({ data }) => {
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
            <p>
              W = G · p = {pp(data.preis)} · 1,19 ={' '}
              {pp(Math.round(data.preis * 1.19 * 100) / 100)} €<br></br>
            </p>
            <p>
              Mit der gleichen Rechnung wird der Preis für 16 % MwSt. berechnet:
            </p>
            <p>
              W = G · p = {pp(data.preis)} · 1,16 ={' '}
              {pp(Math.round(data.preis * 1.16 * 100) / 100)} €
            </p>
            <p>Damit ist die ausgefüllte Tabelle:</p>
            <svg viewBox="0 0 600 120">
              <image
                href="/content/NRW_MSA_Tabellenkalk.png"
                height="120"
                width="600"
              />
              <text
                x={223}
                y={102}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {pp(data.preis)}
              </text>
              <text
                x={568}
                y={102}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {pp(
                  Math.round((data.preis * 1.19 - data.preis * 1.16) * 100) /
                    100,
                )}
              </text>
              <text
                x={349}
                y={102}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {pp(Math.round(data.preis * 1.19 * 100) / 100)}
              </text>
              <text
                x={476}
                y={102}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {pp(Math.round(data.preis * 1.16 * 100) / 100)}
              </text>
            </svg>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              Die Formel berechnet den Wert in Zelle: {data.coin == 1 && 'E3'}
              {data.coin == 2 && 'E4'}
              {data.coin == 3 && 'E2'}
              {data.coin == 4 && 'C3'}
              {data.coin == 5 && 'D2'}
              {data.coin == 6 && 'C4'}
              {data.coin == 7 && 'E2'}
              {data.coin == 8 && 'E3'}
              {data.coin == 9 && 'E4'}
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>Für die Beispielrechnung wählen wir den Pullover aus.</p>

            <p>Preis des Pullovers vor der Absenkung: 13,95 €</p>
            <p>
              Ersparnis nach der Absenkung der MwSt.: 0,35 €<br></br>
            </p>
            <p>
              Die Erparnis beträgt in Prozent:
              {buildInlineFrac('0,35', '13,95')} · 100 % = 2,51 %
            </p>
            <p>Damit trifft die Aussage von Herr Meyer zu.</p>
          </>
        )
      },
    ],
  },
}
