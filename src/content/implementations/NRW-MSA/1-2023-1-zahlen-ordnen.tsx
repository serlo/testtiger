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
  duration: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 100) / -100,
      b: rng.randomIntBetween(1, 100) / 100,
      c: rng.randomIntBetween(-8, 8),
      d: rng.randomItemFromArray([1, 2, 4, 5, 10]),
      e: rng.randomIntBetween(5, 99),
    }
  },
  constraint({ data }) {
    return (
      data.c != data.d &&
      data.d != 1 &&
      data.c != 0 &&
      !Number.isInteger(data.c / data.d) &&
      !Number.isInteger(Math.sqrt(data.e))
    )
  },
  intro({ data }) {
    return <></>
  },
  tasks: [
    {
      points: 1,
      task({ data }) {
        return (
          <>
            <p>
              a) Ordne die Zahlen der Größe nach. Beginne mit der kleinsten
              Zahl.
            </p>
            <p>
              {pp(data.a)} &nbsp;&nbsp;&nbsp;&nbsp; {pp(data.b)}
              &nbsp;&nbsp;&nbsp;&nbsp; {ppFrac(data.c / data.d)}
            </p>
          </>
        )
      },
      solution({ data }) {
        const array = [data.a, data.b, data.c / data.d].sort((a, b) => a - b)
        return (
          <>
            <p>Wandle den Bruch zuerst in eine Dezimalzahl um:</p>

            <p>
              {ppFrac(data.c / data.d)} = {pp(data.c / data.d)}
            </p>

            <p>Ordne die Zahlen mit dem Operator {'"<"'}:</p>

            <p>
              {pp(array[0])} {' < '} {pp(array[1])} {' < '} {pp(array[2])}
            </p>
          </>
        )
      },
    },
    {
      points: 1,
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
              Die nächstkleinere Quadratzahl von {data.e} ist: {lower * lower}
            </p>
            <p>
              Die nächstgrößere Quadratzahl von {data.e} ist: {upper * upper}
            </p>
            <p>
              <br></br>Geordnet kannst du schreiben:
            </p>
            <p>
              {lower * lower} {' < '} {data.e} {' < '} {upper * upper}
            </p>
            <p>
              <br></br>
              {buildSqrt(data.e)} liegt damit zwischen den Quadratwurzeln:
            </p>
            <p>
              {buildSqrt(lower * lower)} {' < '} {buildSqrt(data.e)} {' < '}{' '}
              {buildSqrt(upper * upper)}, oder vereinfacht {lower}
              {' < '}
              {buildSqrt(data.e)}
              {' < '}
              {upper}
            </p>

            <p>
              <br></br>
              {buildSqrt(data.e)} liegt also zwischen den Zahlen {lower} und{' '}
              {upper}.
            </p>
          </>
        )
      },
    },
  ],
}
