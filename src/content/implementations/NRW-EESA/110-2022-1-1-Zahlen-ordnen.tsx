import { Exercise } from '@/data/types'
import { buildSqrt } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  a: number
  b: number
  c: number
  d: number
}

export const exercise110: Exercise<DATA> = {
  title: 'Zahlen ordnen',
  source: '2022 Teil 1 Aufgabe 1',
  useCalculator: false,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      a: rng.randomIntBetween(-30, 30) / 10,
      b: rng.randomIntBetween(-300, 300) / 100,
      c: rng.randomIntBetween(-300, 300) / 100,
      d: rng.randomIntBetween(1, 10),
    }
  },
  originalData: { a: -2.2, b: -2.57, c: 2.51, d: 5 },
  constraint({ data }) {
    return (
      Math.abs(Math.abs(data.a) - Math.abs(data.b)) < 0.2 &&
      Math.abs(Math.abs(data.c) - Math.abs(data.b)) < 0.2 &&
      Math.abs(Math.sqrt(data.d) - Math.abs(data.b)) < 0.2 &&
      data.a != data.b &&
      data.a != data.c &&
      data.a != data.d &&
      data.b != data.d &&
      data.b != data.c &&
      data.c != data.d
    )
  },
  task({ data }) {
    return (
      <>
        <p>Ordne die Zahlen der Größe nach. Beginne mit der kleinsten Zahl.</p>
        <p>
          {pp(data.a)}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {pp(data.b)}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {pp(data.c)}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {buildSqrt(data.d)}
        </p>
      </>
    )
  },
  solution({ data }) {
    const array = [data.a, data.b, data.c, data.d].sort((a, b) => a - b)
    return (
      <>
        <p>Berechne den Wert der Quadratwurzel:</p>
        <p>
          {buildSqrt(data.d)} {Math.sqrt(data.d) % 1 == 0 ? '=' : '≈'}{' '}
          {pp(roundToDigits(Math.sqrt(data.d), 2))}
        </p>
        <p>Ordne die ursprünglichen Zahlen mit {'"<"'}:</p>
        <p>
          <strong>
            {array[0] == data.d ? <>{buildSqrt(data.d)}</> : pp(array[0])}
            {' < '}
            {array[1] == data.d ? <>{buildSqrt(data.d)}</> : pp(array[1])}
            {' < '}
            {array[2] == data.d ? <>{buildSqrt(data.d)}</> : pp(array[2])}
            {' < '}
            {array[3] == data.d ? <>{buildSqrt(data.d)}</> : pp(array[3])}
          </strong>
        </p>
      </>
    )
  },
}
