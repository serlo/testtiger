import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
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
  duration: 3,
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
      duration: 1,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              a) Tom setzt x = {data.x_input} in den Term ein. Berechne den Wert
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
                    <span style={{ fontSize: 'small' }}>Wert einsetzen</span>
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
                <>
                  <strong>=</strong>
                </>,
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
      duration: 2,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const rechts = (data.x_sol + data.summand) * data.faktor
        return (
          <>
            <p>
              b) Pia setzt für x eine Zahl ein und erhält das Ergebnis {rechts}.
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
              Pia stellt fest: {'"'}Die Rechnung ist falsch. {'"'}
              Markiere den Fehler und bestimme Pias Zahl.
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
                  Tom hat nur die linke Seite durch {data.faktor} geteilt. Er
                  hätte beide Seiten durch {data.faktor} teilen müssen.
                </>
              )}
              {data.case == 2 && (
                <>
                  Tom hat nur die linke Seite mit {data.summand} subtrahiert. Er
                  hätte {data.summand} von beiden Seiten abziehen müssen.
                </>
              )}
              {data.case == 3 && (
                <>
                  Tom hat die Klammer auf der linken Seite falsch aufgelöst.
                  Besser wäre, beide Seiten durch den Faktor {data.faktor} zu
                  teilen.
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
