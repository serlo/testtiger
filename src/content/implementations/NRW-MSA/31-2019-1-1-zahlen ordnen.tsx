import { Exercise } from '@/data/types'
import { buildInlineFrac, buildSqrt } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
  d: number
  e: number
  f: number
}

export const exercise31: Exercise<DATA> = {
  title: 'Zahlen ordnen',
  source: '2019 Teil 1 Aufgabe 1',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 1000) / -1000,
      b: rng.randomIntBetween(1, 100) / 10,
      c: rng.randomIntBetween(-8, 8),
      d: rng.randomItemFromArray([1, 2, 4, 5, 10]),
      e: rng.randomIntBetween(-8, 8),
      f: rng.randomItemFromArray([1, 2, 4, 5, 10]),
    }
  },
  constraint({ data }) {
    return (
      data.c != data.d &&
      data.d != 1 &&
      data.c != 0 &&
      data.e != data.f &&
      data.e != 0 &&
      data.f != 1 &&
      data.e != data.c &&
      data.f != data.d &&
      !Number.isInteger(data.c / data.d) &&
      !Number.isInteger(data.e / data.f)
    )
  },
  intro({ data }) {
    return <></>
  },
  tasks: [
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>
              Ordne die Zahlen der Größe nach. Beginne mit der kleinsten Zahl.
            </p>
            <p>
              {ppFrac(data.c / data.d)} &nbsp;&nbsp;&nbsp;&nbsp;{pp(data.a)}{' '}
              &nbsp;&nbsp;&nbsp;&nbsp; {pp(data.b)}
              &nbsp;&nbsp;&nbsp;&nbsp; {ppFrac(data.e / data.f)}
            </p>
          </>
        )
      },
      solution({ data }) {
        const array = [data.a, data.b, data.c / data.d, data.e / data.f].sort(
          (a, b) => a - b,
        )
        return (
          <>
            <p>Wandle die Brüche zuerst in eine Dezimalzahl um:</p>

            <p>
              {ppFrac(data.c / data.d)} = {pp(data.c / data.d)}
            </p>
            <p>
              {ppFrac(data.e / data.f)} = {pp(data.e / data.f)}
            </p>

            <p>Ordne die Zahlen mit dem Operator {'"<"'}:</p>

            <p>
              {pp(array[0])} {' < '} {pp(array[1])} {' < '} {pp(array[2])}{' '}
              {' < '} {pp(array[3])}
            </p>
          </>
        )
      },
    },
  ],
}