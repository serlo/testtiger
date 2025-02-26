import { Exercise } from '@/data/types'
import { Color2, Color4 } from '@/helper/colors'
import { buildEquation, ExplanationBox } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  ball: number
  rabatt: number
}

export const exercise132: Exercise<DATA> = {
  title: 'Basketball',
  source: '2024 Teil 1 Aufgabe 4',
  useCalculator: false,
  duration: 6,
  points: 3,
  generator(rng) {
    return {
      ball: rng.randomIntBetween(40, 70),
      rabatt: rng.randomIntBetween(3, 8) * 5,
    }
  },
  originalData: { ball: 60, rabatt: 25 },
  learningPathData: { ball: 45, rabatt: 20 },
  exampleData: { ball: 50, rabatt: 10 },
  constraint({ data }) {
    return true
  },
  example() {
    return (
      <>
        <style>
          {`
    .explanation-box {
      border: 1px solid lightblue;
      padding: 0px 8px;
      background-color: #f9f9f9;
      border-radius: 8px;
    }
  `}
        </style>
        <p>Berechne 30 % von 50 €.</p>

        <Color2>
          <b>Lösung: 15 €</b>.
        </Color2>
        <br></br>
        <br></br>
        <ExplanationBox>
          <p>
            Rechnung:
            <hr style={{ margin: '10px 0' }} />
            <p>Berechne den Preis mit der Formel für den Prozentwert W:</p>
            {buildEquation([
              [<>W</>, <>=</>, <>Grundwert · Prozentsatz</>],
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
                    <span style={{ fontSize: 'small' }}>
                      setze für den Grundwert 50 € ein
                    </span>
                  </Color4>
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
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      setze für den Prozentsatz 30 % = 0,3 ein{' '}
                    </span>
                  </Color4>
                </>,
              ],
              ['', '=', <>50 € · 0,3</>],
              ['W', '=', <> 15 €</>],
            ])}
          </p>
        </ExplanationBox>
        <ExplanationBox>
          <p>
            Rechnung:
            <hr style={{ margin: '10px 0' }} />
            <p>Alternativ kannst du auch den Dreisatz anwenden:</p>
            {buildEquation([
              [<>100%</>, <>≙</>, <>50€</>],
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
                    <span style={{ fontSize: 'small' }}>: 10</span>
                  </Color4>
                </>,
              ],
              ['10%', '≙', <>5€</>],
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
                    <span style={{ fontSize: 'small' }}>· 3 </span>
                  </Color4>
                </>,
              ],
              ['30%', '≙', <> 15 €</>],
            ])}
          </p>
        </ExplanationBox>
      </>
    )
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
          <p>Berechne den Rabatt mit der Formel für den Prozentwert W:</p>
        </p>
        {buildEquation([
          [<>W</>, <>=</>, <>Grundwert · Prozentsatz</>],
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
                <span style={{ fontSize: 'small' }}>
                  setze für den Grundwert {data.ball} € ein
                </span>
              </Color4>
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
              <Color4>
                <span style={{ fontSize: 'small' }}>
                  setze für den Prozentsatz {data.rabatt} % ={' '}
                  {pp(data.rabatt / 100)} ein{' '}
                </span>
              </Color4>
            </>,
          ],
          [
            '',
            '=',
            <>
              {data.ball} € · {pp(data.rabatt / 100)}
            </>,
          ],
          ['W', '=', <>{pp((data.ball * data.rabatt) / 100)} €</>],
        ])}
        <p>Der Rabatt beträgt {pp((data.ball * data.rabatt) / 100)} €.</p>
        <p>
          Ziehe den Rabatt vom ursprünglichen Preis ab:<br></br>
          {data.ball} − {pp((data.ball * data.rabatt) / 100)} ={' '}
          <strong>{pp(data.ball - (data.ball * data.rabatt) / 100)} [€]</strong>
        </p>
        <p>
          <strong>
            Der neue Kaufpreis beträgt{' '}
            {pp(data.ball - (data.ball * data.rabatt) / 100)} €
          </strong>
          .
        </p>
        <p>
          <b>Hinweis:</b> Alternativ kannst du den Rabatt auch mit dem Dreisatz
          berechnen.
        </p>
      </>
    )
  },
}
