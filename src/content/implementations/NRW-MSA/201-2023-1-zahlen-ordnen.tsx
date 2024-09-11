import { Exercise } from '@/data/types'
import { buildInlineFrac, buildSqrt } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
  d: number
  e: number
}

export const exercise201: Exercise<DATA> = {
  title: '2023 /1) Zahlen ordnen',
  useCalculator: false,
  duration: -2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 100) / -100,
      b: rng.randomIntBetween(1, 100) / 100,
      c: rng.randomIntBetween(1, 8),
      d: rng.randomItemFromArray([1, 2, 4, 5, 10]),
      e: rng.randomIntBetween(5, 99),
    }
  },
  constraint({ data }) {
    return (
      data.c != data.d && data.d != 1 && pp(Math.sqrt(data.e)).includes(',')
    )
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
  subtasks: {
    tasks: [
      ({ data }) => {
        return (
          <>
            <p>
              a) Ordne die Zahlen der Größe nach. Beginne mit der kleinsten
              Zahl.
            </p>
            <p>
              {pp(data.a)} &nbsp;&nbsp;&nbsp;&nbsp; {pp(data.b)}
              &nbsp;&nbsp;&nbsp;&nbsp; −{buildInlineFrac(data.c, data.d)}
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              b) Gib an, zwischen welchen zwei aufeinanderfolgenden ganzen
              Zahlen {buildSqrt(data.e)} liegt.
            </p>
          </>
        )
      },
    ],
    solutions: [
      ({ data }) => {
        const array = [data.a, data.b, -data.c / data.d].sort((a, b) => a - b)
        return (
          <>
            <p>Wandle den Bruch zuerst in eine Dezimalzahl um:</p>

            <p>
              −{buildInlineFrac(data.c, data.d)} = − {pp(data.c / data.d)}
            </p>

            <p>Ordne die Zahlen mit dem Operator {'"<"'}:</p>

            <p>
              {pp(array[0])} {' < '} {pp(array[1])} {' < '} {pp(array[2])}
            </p>
          </>
        )
      },
      ({ data }) => {
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
              {buildSqrt(data.e)} liegt damit zwischen den Qaudratwurzeln:
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
    ],
  },
}
