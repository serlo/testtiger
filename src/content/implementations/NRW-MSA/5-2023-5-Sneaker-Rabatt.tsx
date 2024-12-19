/** change 12-09-24 Added Euro symbol in solution */
import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  preis: number
  rabatt: number
}

export const exercise5: Exercise<DATA> = {
  title: 'Rabattaktion',
  source: '2023 Teil 1 Aufgabe 5',
  useCalculator: false,
  duration: 2,

  generator(rng) {
    return {
      preis: rng.randomIntBetween(60, 120),
      rabatt: rng.randomItemFromArray([10, 20, 25, 30, 40, 50, 60]),
    }
  },
  originalData: {
    preis: 82,
    rabatt: 25,
  },
  constraint({ data }) {
    return ((data.preis * data.rabatt) / 100) % 1 == 0
  },
  points: 3,
  task({ data }) {
    return (
      <>
        <p>Linda möchte sich ein Paar Sneaker kaufen.</p>

        <p> Der ursprüngliche Preis beträgt {data.preis} €.</p>

        <p>Die Sneaker werden mit {data.rabatt} % Rabatt verkauft.</p>

        <p>Berechne den neuen Verkaufspreis.</p>

        <svg viewBox="0 0 300 250">
          <image
            href="/content/NRW_MSA/NRW_MSA_Sneaker.PNG"
            height="250"
            width="300"
          />

          <text x={30} y={160} fontSize={30} textAnchor="right" stroke="black">
            {data.rabatt} %
          </text>
        </svg>
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
              {data.preis} · {pp(data.rabatt / 100)}
            </>,
          ],
          [
            '',
            <>
              {' '}
              <Color4>
                <span className="inline-block  scale-y-[1.5]">↓</span>
              </Color4>
            </>,
            <>
              {data.rabatt != 25 ? (
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      Tipp: {data.preis} durch 10 teilen und mit{' '}
                      {pp(data.rabatt / 10)} multiplizieren.
                    </span>
                  </Color4>
                </>
              ) : (
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      Tipp: {data.preis} durch 4 teilen
                    </span>
                  </Color4>
                </>
              )}
            </>,
          ],
          ['', '=', <>{pp((data.preis * data.rabatt) / 100)}</>],
          ['W', '=', <>{pp((data.preis * data.rabatt) / 100)} [€]</>],
        ])}
        <p>Der Rabatt beträgt {pp((data.preis * data.rabatt) / 100)} €.</p>
        <p>
          <strong>Verkaufspreis berechnen</strong>
        </p>
        <p>Abzüglich des Rabatts beträgt der neue Verkaufspreis:</p>
        <p>
          {data.preis} − {pp((data.preis * data.rabatt) / 100)} ={' '}
          <strong>
            {pp(data.preis - (data.preis * data.rabatt) / 100)} [€]
          </strong>
        </p>
      </>
    )
  },
}
