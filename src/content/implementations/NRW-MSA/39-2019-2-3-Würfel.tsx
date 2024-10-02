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
        return <></>
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
