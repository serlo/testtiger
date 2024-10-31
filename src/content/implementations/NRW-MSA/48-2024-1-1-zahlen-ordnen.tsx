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
      e: rng.randomIntBetween(1, 4),
      f: rng.randomItemFromArray([2, 4, 5, 10]),
      g: rng.randomIntBetween(-3, 3),
      h: rng.randomIntBetween(-100, 100) / 100,
    }
  },
  originalData: {
    a: -3,
    b: 8,
    c: 2,
    d: 5,
    e: 1,
    f: 6,
    g: -2,
    h: 0.2,
  },
  constraint({ data }) {
    const array = [
      data.a / data.b,
      data.c / data.d,
      data.g + data.e / data.f,
      data.h,
    ].sort((a, b) => a - b)
    return (
      data.e < data.f &&
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
    const ungemischt = data.g - data.e / data.f
    return (
      <>
        <p>
          Wandle den gemischten Bruch zuerst in einen ungemischten Bruch um, um
          ihn besser mit den anderen vergleichen zu können:
        </p>

        <p>
          {data.g}
          {ppFrac(data.e / data.f)} ={' '}
          {data.g > 0
            ? ppFrac(data.e / data.f + data.g)
            : ppFrac(data.g - data.e / data.f)}
        </p>
        <p>Nur eine Zahl ist als Dezimalzahl dargestellt: {pp(data.h)}</p>
        <p>
          Falls du diese nicht direkt mit den anderen Zahlen vergleichen kannst,
          kannst du sie als Bruch darstellen:
        </p>
        <p>
          {pp(data.h)} = {ppFrac([data.h * 100, 100])} = {ppFrac(data.h)}
        </p>
        <p>
          Sortiere die Brüche der Größe nach. Wenn die Größe der Brüche schwer
          vorstellbar ist, kannst du sie auf den gleichen Nenner bringen, um sie
          zu vergleichen.
        </p>
        <p>Ordne die Zahlen mit dem Operator {'"<"'}:</p>

        <p>
          <strong>
            {array[0] == data.h ? pp(array[0]) : ppFrac(array[0])} {' < '}{' '}
            {array[1] == data.h ? pp(array[1]) : ppFrac(array[1])} {' < '}{' '}
            {array[2] == data.h ? pp(array[2]) : ppFrac(array[2])} {' < '}{' '}
            {array[3] == data.h ? pp(array[3]) : ppFrac(array[3])}
          </strong>
        </p>
      </>
    )
  },
}
