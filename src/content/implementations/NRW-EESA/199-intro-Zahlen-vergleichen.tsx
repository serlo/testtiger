import { Exercise } from '@/data/types'
import { Color1 } from '@/helper/colors'
import { getGcd } from '@/helper/get-gcd'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
  d: number
  e: number
  f: number
}

export const exercise199: Exercise<DATA> = {
  title: 'Zahlen vergleichen',
  source: '',
  useCalculator: false,
  duration: 3,
  points: 3,
  generator(rng) {
    return {
      a: rng.randomIntBetween(10, 100) / 10,
      b: rng.randomIntBetween(10, 100) / 10,
      c: rng.randomIntBetween(-100, 100) / 10,
      d: rng.randomIntBetween(-100, 100) / 10,
      e: rng.randomIntBetween(10, 100) / -10,
      f: rng.randomIntBetween(10, 100) / -10,
    }
  },
  constraint({ data }) {
    return data.c - data.d > 1 && data.e - data.f > 0.2 && data.a - data.b > 1
  },
  originalData: {
    a: -1.2,
    b: -0.8,
    c: 80,
    d: 100,
    e: 4,
    f: 5,
  },
  task({ data }) {
    return (
      <>
        <p>
          Vergleiche und setze in die Lücke jeweils das Zeichen {'"<"'}, {'">"'}
          oder {'"="'} ein.
        </p>
        <p>
          {pp(data.a)} ______ {pp(data.b)}
        </p>
        <p>
          {pp(data.c)} ______ {pp(data.d)}
        </p>
        <p>
          {pp(data.e)} ______ {pp(data.f)}
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          <strong>
            Vergleiche {pp(data.a)} und {pp(data.b)}:
          </strong>
        </p>
        <p>
          {pp(data.a)}
          {data.a > data.b && ' > '}
          {data.a < data.b && ' < '}
          {data.a == data.b && ' = '}
          {pp(data.b)}{' '}
        </p>
        <p>
          <strong>
            Vergleiche {pp(data.c)} und {pp(data.d)}:
          </strong>
        </p>
        <p>
          {pp(data.c)}
          {data.c > data.d && ' > '}
          {data.c < data.d && ' < '}
          {data.c == data.d && ' = '}
          {pp(data.d)}{' '}
        </p>
        <p>
          <strong>
            Vergleiche {pp(data.e)} und {pp(data.f)}:
          </strong>
        </p>
        <p>
          {pp(data.e)}
          {data.e > data.f && ' > '}
          {data.e < data.f && ' < '}
          {data.e == data.f && ' = '}
          {pp(data.f)}{' '}
        </p>
      </>
    )
  },
}
