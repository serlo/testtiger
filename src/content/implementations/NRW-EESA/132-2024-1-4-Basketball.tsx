import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  ball: number
  rabatt: number
}

export const exercise132: Exercise<DATA> = {
  title: 'Basketball',
  source: '2024 Teil 1 Aufgabe 4',
  useCalculator: false,
  duration: 2,
  points: 3,
  generator(rng) {
    return {
      ball: rng.randomIntBetween(40, 70),
      rabatt: rng.randomIntBetween(3, 8) * 5,
    }
  },
  originalData: { ball: 60, rabatt: 25 },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Marlon möchte sich einen neuen Basketball kaufen. Ohne Rabatt kostet
          der Ball {data.ball} €. Nun wird er mit {data.rabatt} % Rabatt
          verkauft. Berechne den neuen Kaufpreis.
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          <strong>Rabatt berechnen</strong>
        </p>
        <p>
          Wir berechnen zuerst den Rabatt mit der Formel des Prozentwerts.
          Wandle dazu den Prozentwert in eine Dezimalzahl um: {data.rabatt} % ≙{' '}
          {pp(data.rabatt / 100)}
        </p>
        {buildEquation([
          ['W', '=', 'G · p'],
          [
            '',
            <>
              {' '}
              <Color4>
                <span className="inline-block  scale-y-[1.5]">↓</span>
              </Color4>
            </>,
            <>
              <Color4>
                <span style={{ fontSize: 'small' }}>Einsetzen der Werte</span>
              </Color4>
            </>,
          ],
          [
            '',
            '=',
            <>
              {data.ball} · {pp(data.rabatt / 100)}
            </>,
          ],
          ['', '=', <>{pp((data.ball * data.rabatt) / 100)}</>],
          ['W', '=', <>{pp((data.ball * data.rabatt) / 100)} [€]</>],
        ])}
        <p>Der Rabatt beträgt {pp((data.ball * data.rabatt) / 100)} €.</p>
        <p>
          <strong>Neuer Preis berechnen</strong>
        </p>
        <p>Abzüglich des Rabatts beträgt der neue Verkaufspreis:</p>
        <p>
          {data.ball} − {pp((data.ball * data.rabatt) / 100)} ={' '}
          <strong>{pp(data.ball - (data.ball * data.rabatt) / 100)} [€]</strong>
        </p>
      </>
    )
  },
}
