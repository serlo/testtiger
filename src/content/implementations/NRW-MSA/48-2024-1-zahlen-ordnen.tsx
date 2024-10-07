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
  g: number
  h: number
}

export const exercise48: Exercise<DATA> = {
  title: 'Zahlen ordnen',
  source: '2024 Teil 1 Aufgabe 1',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(-8, 8),
      b: rng.randomItemFromArray([2, 4, 5, 6, 10]),
      c: rng.randomIntBetween(-8, 8),
      d: rng.randomItemFromArray([2, 4, 5, 6, 10]),
      e: rng.randomIntBetween(1, 8),
      f: rng.randomItemFromArray([2, 4, 5, 6, 10]),
      g: rng.randomIntBetween(-3, 3),
      h: rng.randomIntBetween(-100, 100) / 100,
    }
  },
  constraint({ data }) {
    const array = [
      data.a / data.b,
      data.c / data.d,
      data.g + data.e / data.f,
      data.h,
    ].sort((a, b) => a - b)
    return (
      data.c != 0 &&
      data.a != 0 &&
      data.e != 0 &&
      data.g != 0 &&
      !Number.isInteger(data.a / data.b) &&
      !Number.isInteger(data.c / data.d) &&
      !Number.isInteger(data.e / data.f) &&
      array[0] != array[1] &&
      array[1] != array[2] &&
      array[2] != array[3]
    )
  },
  intro({ data }) {
    return <></>
  },
  task({ data }) {
    return (
      <>
        <p>Ordne die Zahlen der Größe nach. Beginne mit der kleinsten Zahl.</p>
        <p>
          {ppFrac(data.a / data.b)} &nbsp;&nbsp;&nbsp;&nbsp;{' '}
          {ppFrac(data.c / data.d)}
          &nbsp;&nbsp;&nbsp;&nbsp; {data.g}
          {ppFrac(data.e / data.f)}&nbsp;&nbsp;&nbsp;&nbsp; {pp(data.h)}
        </p>
      </>
    )
  },
  solution({ data }) {
    const array = [
      data.a / data.b,
      data.c / data.d,
      data.g + data.e / data.f,
      data.h,
    ].sort((a, b) => a - b)

    return (
      <>
        <p>
          Wandle den gemischten Bruch zuerst in einen ungemischten Bruch um:
        </p>

        <p>
          {data.g}
          {ppFrac(data.e / data.f)} ={' '}
          {data.g > 0
            ? ppFrac(data.e / data.f + data.g)
            : ppFrac(data.g * data.f - data.e / data.f)}
        </p>

        <p>Ordne die Zahlen mit dem Operator {'"<"'}:</p>

        <p>
          {pp(array[0])} {' < '} {pp(array[1])} {' < '} {pp(array[2])}
        </p>
      </>
    )
  },
}
