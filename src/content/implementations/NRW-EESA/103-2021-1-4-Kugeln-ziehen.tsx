import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { getGcd } from '@/helper/get-gcd'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { ppFrac } from '@/helper/pretty-print'

interface DATA {
  black: number
  white: number
  blue: number
}

export const exercise103: Exercise<DATA> = {
  title: 'Kugeln ziehen',
  source: '2021 Teil 1 Aufgabe 4',
  useCalculator: false,
  duration: 8,
  generator(rng) {
    return {
      black: rng.randomIntBetween(4, 10),
      white: rng.randomIntBetween(3, 9),
      blue: rng.randomIntBetween(3, 7),
    }
  },
  originalData: { black: 8, white: 7, blue: 5 },
  constraint({ data }) {
    return (
      data.black != data.blue &&
      data.blue != data.white &&
      data.white != data.black
    )
  },
  intro({ data }) {
    return (
      <>
        <p>
          In einem Beutel befinden sich {data.black} schwarze, {data.white}{' '}
          weiße und {data.blue} blaue Kugeln. Pedro zieht eine Kugel heraus.
        </p>
      </>
    )
  },
  tasks: [
    {
      points: 2,
      duration: 4,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          //a)
          <>
            <p>
              Die Wahrscheinlichkeit, dass Pedro eine blaue Kugel zieht, beträgt{' '}
              {ppFrac(data.blue / (data.black + data.white + data.blue))}.
            </p>
            <p>Bestätige dies durch eine Rechnung.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Das Ziehen einer zufälligen Kugel entspricht hier einem
              Laplace-Experiment.
            </p>
            <p>
              Berechne die Wahrscheinlichkeit mit der Formel für das{' '}
              <b>Laplace-Experiment</b>:
            </p>
            {buildEquation([
              [
                <>p</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>Anzahl blaue Kugeln</>,
                    <>Anzahl aller Kugeln</>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>{ppFrac([data.blue, data.black + data.white + data.blue])}</>,
              ],
            ])}
            {getGcd(data.blue, data.black + data.white + data.blue) != 1 && (
              <>
                {buildEquation([
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
                        <span style={{ fontSize: 'small' }}>Kürzen</span>
                      </Color4>
                    </>,
                  ],
                  [
                    <>p</>,
                    <>=</>,
                    <>
                      <b>
                        {ppFrac(
                          data.blue / (data.black + data.white + data.blue),
                        )}
                      </b>
                    </>,
                  ],
                ])}
              </>
            )}
          </>
        )
      },
    },
    {
      points: 2,
      duration: 4,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          //b)
          <>
            <p>
              Bestimme die Wahrscheinlichkeit, eine schwarze oder eine blaue
              Kugel zu ziehen.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Berechne die Wahrscheinlichkeit mit der Formel für das{' '}
              <b>Laplace-Experiment</b>:
            </p>
            {buildEquation([
              [
                <>p</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>blaue Kugeln + schwarze Kugeln</>,
                    <>Anzahl aller Kugeln</>,
                  )}
                </>,
              ],
              [
                <>p</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>
                      {' '}
                      {data.blue} + {data.black}
                    </>,
                    <>{data.black + data.white + data.blue}</>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {ppFrac([
                    data.blue + data.black,
                    data.black + data.white + data.blue,
                  ])}
                </>,
              ],
            ])}
            {getGcd(
              data.blue + data.black,
              data.black + data.white + data.blue,
            ) != 1 && (
              <>
                {buildEquation([
                  [
                    <> </>,
                    <>
                      {' '}
                      <Color4>
                        <span className="inline-block  scale-y-[1.5]">↓</span>
                      </Color4>
                    </>,
                    <>
                      <Color4>
                        <span style={{ fontSize: 'small' }}>Kürzen</span>
                      </Color4>
                    </>,
                  ],
                  [
                    'p',
                    <>=</>,
                    <>
                      <b>
                        {ppFrac(
                          (data.blue + data.black) /
                            (data.black + data.white + data.blue),
                        )}
                      </b>
                    </>,
                  ],
                ])}
              </>
            )}
          </>
        )
      },
    },
  ],
}
