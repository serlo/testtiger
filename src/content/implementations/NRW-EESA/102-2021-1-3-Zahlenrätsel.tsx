import { Exercise } from '@/data/types'
import { Color3, Color4 } from '@/helper/colors'
import { buildEquation } from '@/helper/math-builder'

interface DATA {
  faktor: number
  x_input: number
  x_sol: number
  summand: number
  case: number
}

export const exercise102: Exercise<DATA> = {
  title: 'Zahlenrätsel',
  source: '2021 Teil 1 Aufgabe 3',
  useCalculator: false,
  duration: 10,
  generator(rng) {
    return {
      faktor: rng.randomIntBetween(2, 5),
      x_input: rng.randomIntBetween(3, 8),
      x_sol: rng.randomIntBetween(2, 7),
      summand: rng.randomIntBetween(11, 25),
      case: rng.randomIntBetween(1, 3),
    }
  },
  originalData: { case: 1, faktor: 3, x_input: 6, x_sol: 2, summand: 19 },
  learningPathData: { case: 1, faktor: 2, x_input: 3, x_sol: 2, summand: 17 },
  constraint({ data }) {
    return data.x_input != data.x_sol
  },
  intro({ data }) {
    const rechts = (data.x_sol + data.summand) * data.faktor

    return (
      <>
        <p>
          Pia und Tom spielen Zahlenrätsel mit dem Term (x + {data.summand}) ·{' '}
          {data.faktor}.
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
              Tom setzt x = {data.x_input} in den Term ein. Berechne den Wert
              des Terms.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Setze {data.x_input} für x ein und fasse den Term zusammen:</p>
            {buildEquation([
              [
                <></>,
                <></>,
                <>
                  (x + {data.summand}) · {data.faktor}
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
                      x = {data.x_input} einsetzen
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  ({data.x_input} + {data.summand}) · {data.faktor}
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
                      Klammer zuerst berechnen
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {data.x_input + data.summand} · {data.faktor}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <strong>{(data.x_input + data.summand) * data.faktor}</strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 3,
      duration: 6,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const rechts = (data.x_sol + data.summand) * data.faktor
        return (
          //b)
          <>
            <p>
              Pia setzt für x eine Zahl ein und erhält das Ergebnis {rechts}.
              Tom möchte Pias Zahl finden und notiert die folgende Rechnung:
            </p>
            {data.case == 1 && (
              <>
                {buildEquation([
                  [
                    <>
                      (x + {data.summand}) · {data.faktor}
                    </>,
                    <>=</>,
                    <>{rechts}</>,
                    <>| : {data.faktor}</>,
                  ],
                  [
                    <>x + {data.summand}</>,
                    <>=</>,
                    <>{rechts}</>,
                    <>| − {data.summand}</>,
                  ],
                  [<>x</>, <>=</>, <>{rechts - data.summand}</>],
                ])}
              </>
            )}
            {data.case == 2 && (
              <>
                {buildEquation([
                  [
                    <>
                      (x + {data.summand}) · {data.faktor}
                    </>,
                    <>=</>,
                    <>{rechts}</>,
                    <>| : {data.faktor}</>,
                  ],
                  [
                    <>x + {data.summand}</>,
                    <>=</>,
                    <>{rechts / data.faktor}</>,
                    <>| − {data.summand}</>,
                  ],
                  [<>x</>, <>=</>, <>{rechts / data.faktor}</>],
                ])}
              </>
            )}
            {data.case == 3 && (
              <>
                {buildEquation([
                  [
                    <>
                      (x + {data.summand}) · {data.faktor}
                    </>,
                    <>=</>,
                    <>{rechts}</>,
                  ],
                  [
                    <>x + {data.faktor * data.summand}</>,
                    <>=</>,
                    <>{rechts}</>,
                    <>| − {data.faktor * data.summand}</>,
                  ],
                  [<>x</>, <>=</>, <>{rechts - data.faktor * data.summand}</>],
                ])}
              </>
            )}
            <p>
              Pia stellt fest: {'"'}Die Rechnung ist falsch.{'"'} Markiere den
              Fehler und bestimme Pias Zahl.
            </p>
          </>
        )
      },
      solution({ data }) {
        const rechts = (data.x_sol + data.summand) * data.faktor
        return (
          <>
            <p>
              {data.case == 1 && (
                <>
                  <p>
                    Tom hat nur die linke Seite durch {data.faktor} geteilt. Er
                    hätte beide Seiten durch {data.faktor} teilen müssen.
                  </p>{' '}
                  {buildEquation([
                    [
                      <>
                        (x + {data.summand}) · {data.faktor}
                      </>,
                      <>=</>,
                      <>{rechts}</>,
                      <>| : {data.faktor}</>,
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
                            <Color3>
                              {' '}
                              {rechts} : {data.faktor} = {rechts / data.faktor}
                            </Color3>
                          </span>
                        </Color4>
                      </>,
                    ],
                    [
                      <>x + {data.summand}</>,
                      <>=</>,
                      <>
                        <span
                          style={{
                            display: 'inline-block',
                            borderRadius: '50%',
                            border: '2px solid red',
                            padding: '2px 6px',
                          }}
                        >
                          {rechts}
                        </span>
                      </>,
                      <></>,
                    ],
                  ])}
                  <p>
                    Hier ist die <b>richtige Rechnung</b>:
                  </p>
                </>
              )}
              {data.case == 2 && (
                <>
                  <p>
                    Tom hat nur auf der linken Seite {data.summand} subtrahiert.
                    Er hätte {data.summand} von beiden Seiten abziehen müssen.
                  </p>
                  {buildEquation([
                    [
                      <>
                        (x + {data.summand}) · {data.faktor}
                      </>,
                      <>=</>,
                      <>{rechts}</>,
                      <>| : {data.faktor}</>,
                    ],
                    [
                      <>x + {data.summand}</>,
                      <>=</>,
                      <>{rechts / data.faktor}</>,
                      <>| − {data.summand}</>,
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
                            <Color3>
                              {' '}
                              {rechts / data.faktor} - {data.summand} ={' '}
                              {rechts / data.faktor - data.summand}
                            </Color3>
                          </span>
                        </Color4>
                      </>,
                    ],
                    [
                      <>x</>,
                      <>=</>,
                      <>
                        <span
                          style={{
                            display: 'inline-block',
                            borderRadius: '50%',
                            border: '2px solid red',
                            padding: '2px 6px',
                          }}
                        >
                          {rechts / data.faktor}
                        </span>
                      </>,
                    ],
                  ])}
                  <p>
                    Hier ist die <b>richtige Rechnung</b>:
                  </p>
                </>
              )}
              {data.case == 3 && (
                <>
                  <p>
                    Tom hat die Klammer auf der linken Seite falsch aufgelöst.
                  </p>
                  {buildEquation([
                    [
                      <>
                        (x + {data.summand}) · {data.faktor}
                      </>,
                      <>=</>,
                      <>{rechts}</>,
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
                            <Color3>
                              {' '}
                              (x + {data.summand}) · {data.faktor} ={' '}
                              {data.faktor}x + {data.faktor * data.summand}
                            </Color3>
                          </span>
                        </Color4>
                      </>,
                    ],
                    [
                      <>
                        <span
                          style={{
                            display: 'inline-block',
                            borderRadius: '50%',
                            border: '2px solid red',
                            padding: '2px 6px',
                          }}
                        >
                          x + {data.faktor * data.summand}
                        </span>
                      </>,
                      <>=</>,
                      <>{rechts}</>,
                      <>| − {data.faktor * data.summand}</>,
                    ],
                  ])}
                  <p>
                    Einfacher wäre, im ersten Schritt beide Seiten durch{' '}
                    {data.faktor} zu teilen:
                  </p>
                </>
              )}
            </p>

            {buildEquation([
              [
                <>
                  (x + {data.summand}) · {data.faktor}
                </>,
                <>=</>,
                <>{rechts}</>,
                <>| : {data.faktor}</>,
              ],
              [
                <>x + {data.summand}</>,
                <>=</>,
                <>{rechts / data.faktor}</>,
                <>| − {data.summand}</>,
              ],
              [
                <>
                  <strong>x</strong>
                </>,
                <>
                  <strong>=</strong>
                </>,
                <>
                  <strong>{rechts / data.faktor - data.summand}</strong>
                </>,
              ],
            ])}
            <p>
              Pias Zahl ist <strong>{data.x_sol}</strong>.
            </p>
          </>
        )
      },
    },
  ],
}
