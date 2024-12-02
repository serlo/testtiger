import { Exercise } from '@/data/types'

interface DATA {}

export const exercise229: Exercise<DATA> = {
  title: 'Diagramm',
  source: '2023 Pflichtteil A2 - Aufgabe 6',
  useCalculator: true,
  duration: 42,
  points: 3,
  generator(rng) {
    return {}
  },
  originalData: {},
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Im Diagramm sind die Ausgaben für Onlinewerbung in Deutschland für die
          Jahre 2020 und 2021 dargestellt.
        </p>
        <svg viewBox="0 0 328 270">
          <text x={164} y={15} fontSize={20} textAnchor="middle" stroke="black">
            Ausgaben für Onlinewerbung
          </text>
          <text x={164} y={35} fontSize={15} textAnchor="middle" stroke="black">
            (in Millionen Euro)
          </text>
          <text x={82} y={260} fontSize={15} textAnchor="middle" stroke="black">
            Jahr 2020
          </text>
          <text
            x={244}
            y={260}
            fontSize={15}
            textAnchor="middle"
            stroke="black"
          >
            Jahr 2021
          </text>
          <line
            x1={20}
            y1={240}
            x2={308}
            y2={240}
            stroke="black"
            strokeWidth={2}
          />
        </svg>
        <p>
          Die Ausgaben für Onlinewerbung sind von 2020 bis 2021 angestiegen.
        </p>
        <ul>
          <li>Berechne den Zuwachs in Prozent.</li>
        </ul>
        <p>
          Die Ausgaben für die Bannerwerbung lagen im Jahr 2020 um 9,5 % über
          dem Betrag von 2019.
        </p>
        <ul>
          <li>Berechne die Ausgaben für die Bannerwerbung im Jahr 2019.</li>
        </ul>
        <p>
          Laut einer Prognose sollen in den fünf Jahren von 2021 bis 2026 die
          Ausgaben für die Social-Media-Werbung jährlich um 12,25 % bezogen auf
          das jeweilige Vorjahr ansteigen.{' '}
        </p>
        <ul>
          <li>
            Wie hoch wären die Ausgaben für die Social-Media-Werbung dann im
            Jahr 2026?
          </li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
