import { Exercise } from '@/data/types'
import { buildInlineFrac, buildSqrt } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
  d: number
  e: number
}

export const exercise1: Exercise<DATA> = {
  title: 'Zahlen ordnen',
  source: '2023 Teil 1 Aufgabe 1',
  useCalculator: false,
  duration: 3,
  generator(rng) {
    return {
      a: rng.randomIntBetween(-100, 100) / 100,
      b: rng.randomIntBetween(-100, 100) / 100,
      c: rng.randomIntBetween(-8, 8),
      d: rng.randomItemFromArray([1, 2, 4, 5, 10]),
      e: rng.randomIntBetween(5, 99),
    }
  },
  originalData: {
    a: -0.45,
    b: 0.38,
    c: -2,
    d: 5,
    e: 20,
  },
  constraint({ data }) {
    return (
      data.c != data.d &&
      data.d != 1 &&
      data.c != 0 &&
      data.b != 0 &&
      data.a != 0 &&
      data.a != data.b &&
      data.a != data.c / data.d &&
      data.b != data.c / data.d &&
      !Number.isInteger(data.c / data.d) &&
      !Number.isInteger(Math.sqrt(data.e))
    )
  },
  intro({ data }) {
    return null
  },
  tasks: [
    {
      points: 2,
      duration: 1,
      task({ data }) {
        return (
          <>
            <p>
              a) Ordne die Zahlen der Größe nach. Beginne mit der kleinsten
              Zahl.
            </p>
            <p>
              {pp(data.a)} &nbsp;&nbsp;&nbsp;&nbsp; {pp(data.b)}
              &nbsp;&nbsp;&nbsp;&nbsp; {ppFrac([data.c, data.d])}
            </p>
          </>
        )
      },
      solution({ data }) {
        const array = [data.a, data.b, data.c / data.d].sort((a, b) => a - b)
        return (
          <>
            <p>
              Wandle den Bruch zuerst in eine Dezimalzahl um, um ihn mit den
              anderen Zahlen zu vergleichen:
            </p>

            <p>
              {ppFrac([data.c, data.d])} = {pp(data.c / data.d)}
            </p>

            <p>Ordne die Zahlen mit dem Operator {'"<"'}:</p>

            <p>
              <strong>
                {array[0] == data.c / data.d
                  ? ppFrac([data.c, data.d])
                  : pp(array[0])}{' '}
                {' < '}{' '}
                {array[1] == data.c / data.d
                  ? ppFrac([data.c, data.d])
                  : pp(array[1])}{' '}
                {' < '}{' '}
                {array[2] == data.c / data.d
                  ? ppFrac([data.c, data.d])
                  : pp(array[2])}
              </strong>
            </p>
          </>
        )
      },
    },
    {
      points: 1,
      duration: 1,
      task({ data }) {
        return (
          <>
            <p>
              b) Gib an, zwischen welchen zwei aufeinanderfolgenden ganzen
              Zahlen {buildSqrt(data.e)} liegt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const lower = Math.floor(Math.sqrt(data.e))
        const upper = Math.ceil(Math.sqrt(data.e))
        return (
          <>
            <p>
              Bestimme zuerst die nächstkleinere und die nächstgrößere
              Quadratzahl von {data.e}:
            </p>
            <ul>
              <li>Nächstkleinere Quadratzahl: {lower * lower}</li>
              <li>Nächstgrößere Quadratzahl: {upper * upper}</li>
            </ul>
            <p>{data.e} befindet sich zwischen diesen Zahlen:</p>
            <p>
              {lower * lower} {' < '} {data.e} {' < '} {upper * upper}
            </p>
            <p>
              {buildSqrt(data.e)} liegt damit auch zwischen den Quadratwurzeln:
            </p>
            <p>
              {buildSqrt(lower * lower)} {' < '} {buildSqrt(data.e)} {' < '}{' '}
              {buildSqrt(upper * upper)} <br></br>oder vereinfacht<br></br>{' '}
              {lower}
              {' < '}
              {buildSqrt(data.e)}
              {' < '}
              {upper}
            </p>

            <p>
              <br></br>
              {buildSqrt(data.e)} liegt zwischen den Zahlen{' '}
              <strong>
                {lower} und {upper}
              </strong>
              .
            </p>
          </>
        )
      },
    },
  ],
}
