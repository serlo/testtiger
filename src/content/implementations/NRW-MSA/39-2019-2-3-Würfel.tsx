import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  startwert: number
  random: number
  random2: number
}

export const exercise39: Exercise<DATA> = {
  title: 'Würfel',
  source: '2019 Teil 2 Aufgabe 3',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      startwert: rng.randomIntBetween(2, 5),
      random: rng.randomIntBetween(6, 10),
      random2: rng.randomIntBetween(9, 14),
    }
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Monya und Paul haben eine Kiste mit 500 gleichen Würfeln. Mit{' '}
          {data.startwert} Würfeln legen sie Figur 1 und erweitern diese Figur
          schrittweise (Abbildung 1).
        </p>
      </>
    )
  },
  tasks: [
    {
      points: 42,
      task({ data }) {
        return (
          <>
            <p>
              a) Wie viele Würfel benötigt man für Figur 4? Ergänze den Wert in
              der Tabelle.
            </p>
            <svg viewBox="0 0 328 110">
              <image
                href="/content/NRW_MSA_Würfel_Tabelle.PNG"
                height="110"
                width="328"
              />
              <text
                x={180}
                y={80}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {data.startwert}
              </text>
              <text
                x={215}
                y={80}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {2 * (2 + data.startwert - 1)}
              </text>
              <text
                x={250}
                y={80}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {3 * (3 + data.startwert - 1)}
              </text>
            </svg>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Die vollständige Tabelle ist:</p>
            <svg viewBox="0 0 328 110">
              <image
                href="/content/NRW_MSA_Würfel_Tabelle.PNG"
                height="110"
                width="328"
              />
              <text
                x={180}
                y={80}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {data.startwert}
              </text>
              <text
                x={215}
                y={80}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {2 * (2 + data.startwert - 1)}
              </text>
              <text
                x={250}
                y={80}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {3 * (3 + data.startwert - 1)}
              </text>
              <text
                x={285}
                y={80}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {4 * (4 + data.startwert - 1)}
              </text>
            </svg>
            <p>
              Um den fehlenden Wert zu bestimmen kannst du die Anzahl der Würfel
              bestimmen, die in jeder Figur hinzukommt:
            </p>
            <ul>
              <li>
                Von Figur 1 zu Figur 2:{' '}
                {2 * (2 + data.startwert - 1) - 1 * (1 + data.startwert - 1)}
              </li>
              <li>
                Von Figur 2 zu Figur 3:{' '}
                {3 * (3 + data.startwert - 1) - 2 * (2 + data.startwert - 1)}
              </li>
              <li>
                Dann sind es von Figur 3 zu Figur 4:{' '}
                {4 * (4 + data.startwert - 1) - 3 * (3 + data.startwert - 1)}
              </li>
            </ul>
          </>
        )
      },
    },
    {
      points: 42,
      task({ data }) {
        return (
          <>
            <p>
              Die Anzahl der Würfel für Figur n kann mit folgendem Term
              berechnet werden:<br></br>(I) n · (n + {data.startwert - 1})
            </p>
            <p>
              b) Bestimme mithilfe des Terms die Anzahl der Würfel für Figur{' '}
              {data.random}.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Setze den Wert in den Term ein und fasse zusammen:</p>
          </>
        )
      },
    },
    {
      points: 42,
      task({ data }) {
        return (
          <>
            <p>
              c) Begründe anhand der Figuren in Abbildung 1, dass mit dem Term
              die Anzahl der Würfel für jede beliebige Figur n berechnet wird.
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
      task({ data }) {
        return (
          <>
            <p>
              d) Berechne mit dem Term, welche Figur aus genau{' '}
              {data.random2 * (data.random2 + data.random - 1)} Würfeln besteht.
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
      task({ data }) {
        return (
          <>
            <p>
              e) Die Anzahl der Würfel für Figur n kann mit den beiden Termen
              berechnet werden:
            </p>
            <p>(I) n · (n + {data.startwert - 1})</p>
            <p>
              (II) (n + {pp(data.startwert / 2)})² −{' '}
              {pp((data.startwert * data.startwert) / 4)}
            </p>
            <p>
              {' '}
              Zeige durch eine Termumformung, dass die Terme (I) und (II)
              gleichwertig sind.
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
      task({ data }) {
        return (
          <>
            <p>
              f) Bestimme die größtmögliche Figur n, die Monya und Paul mit 500
              Würfeln legen können und gib an, wie viele Würfel zum Legen der
              nächsten Figur fehlen.
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
