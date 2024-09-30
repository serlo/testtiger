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

export const exercise25: Exercise<DATA> = {
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
      e: rng.randomIntBetween(1, 10),
    }
  },
  constraint({ data }) {
    return (
      data.c != data.d &&
      data.d != 1 &&
      data.c != 0 &&
      data.e != 3 &&
      data.e != 6 &&
      data.e != 7 &&
      data.e != 9 &&
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
              Ordne die Zahlen der Größe nach. Beginne mit der kleinsten Zahl.
            </p>

            <p>
              {ppFrac(data.c / data.d)}&nbsp;&nbsp;&nbsp;&nbsp; {pp(data.b)}
              &nbsp;&nbsp;&nbsp;&nbsp; {pp(data.e)}
              <sup>-1</sup>
              &nbsp;&nbsp;&nbsp;&nbsp; {pp(data.a)}
            </p>
          </>
        )
      },
      solution({ data }) {
        const potenz = Math.pow(data.e, -1)
        const array = [data.a, data.b, data.c / data.d, potenz].sort(
          (a, b) => a - b,
        )
        return (
          <>
            <p>Wandle den Bruch zuerst in eine Dezimalzahl um:</p>

            <p>
              {ppFrac(data.c / data.d)} = {pp(data.c / data.d)}
            </p>

            <p>Wandle nun die Potenz in eine Dezimalzahl um:</p>

            <p>
              {pp(data.e)}
              <sup>-1</sup> = {ppFrac(1 / data.e)} = {pp(1 / data.e)}
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
