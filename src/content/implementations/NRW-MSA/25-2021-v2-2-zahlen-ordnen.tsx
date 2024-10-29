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
  source: '2021 Teil 1 Aufgabe 2 (Variante 2)',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(-100, 100) / -100,
      b: rng.randomIntBetween(-100, 100) / -100,
      c: rng.randomIntBetween(-8, 8),
      d: rng.randomItemFromArray([1, 2, 4, 5, 10]),
      e: rng.randomItemFromArray([2, 4, 5, 8, 10]),
    }
  },
  originalData: {
    a: 0.05,
    b: 0.15,
    c: 2,
    d: 10,
    e: 10,
  },
  constraint({ data }) {
    const potenz = Math.pow(data.e, -1)
    const array = [data.a, data.b, data.c / data.d, potenz].sort(
      (a, b) => a - b,
    )
    return (
      data.c != data.d &&
      data.d != 1 &&
      data.a != 0 &&
      data.b != 0 &&
      data.c != 0 &&
      !Number.isInteger(data.c / data.d) &&
      array[0] != array[1] &&
      array[1] != array[2] &&
      array[2] != array[3]
    )
  },
  points: 2,
  task({ data }) {
    return (
      <>
        <p>Ordne die Zahlen der Größe nach. Beginne mit der kleinsten Zahl.</p>

        <p>
          {ppFrac([data.c, data.d])}&nbsp;&nbsp;&nbsp;&nbsp; {pp(data.b)}
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
        <p>
          Wandle den Bruch zuerst in eine Dezimalzahl um, um ihn mit den anderen
          Zahlen vergleichen zu können:
        </p>

        <p>
          {ppFrac([data.c, data.d])} = {pp(data.c / data.d)}
        </p>

        <p>Forme auch die Potenz in eine Dezimalzahl um:</p>

        <p>
          {pp(data.e)}
          <sup>-1</sup> = {ppFrac(1 / data.e)} = {pp(1 / data.e)}
        </p>

        <p>Ordne die Zahlen mit dem Operator {'"<"'}:</p>

        <p>
          <strong>
            {(array[0] == data.c / data.d && ppFrac(array[0])) ||
              (array[0] == 1 / data.e && (
                <>
                  {pp(data.e)}
                  <sup>-1</sup>
                </>
              )) ||
              pp(array[0])}{' '}
            {' < '}{' '}
            {(array[1] == data.c / data.d && ppFrac(array[1])) ||
              (array[1] == 1 / data.e && (
                <>
                  {pp(data.e)}
                  <sup>-1</sup>
                </>
              )) ||
              pp(array[1])}{' '}
            {' < '}{' '}
            {(array[2] == data.c / data.d && ppFrac(array[2])) ||
              (array[2] == 1 / data.e && (
                <>
                  {pp(data.e)}
                  <sup>-1</sup>
                </>
              )) ||
              pp(array[2])}{' '}
            {' < '}{' '}
            {(array[3] == data.c / data.d && ppFrac(array[3])) ||
              (array[3] == 1 / data.e && (
                <>
                  {pp(data.e)}
                  <sup>-1</sup>
                </>
              )) ||
              pp(array[3])}
          </strong>
        </p>
      </>
    )
  },
}
