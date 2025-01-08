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
  g: number
  h: number
  i: number
}

export const exercise120: Exercise<DATA> = {
  title: 'Zahlen vergleichen',
  source: '2023 Teil 1 Aufgabe 1',
  useCalculator: false,
  duration: 3,
  points: 3,
  generator(rng) {
    return {
      a: rng.randomIntBetween(10, 100) / -100,
      b: rng.randomIntBetween(10, 100) / -100,
      c: rng.randomItemFromArray([20, 25, 40, 60, 70, 75, 80, 90]),
      d: rng.randomItemFromArray([100]),
      e: rng.randomItemFromArray([1, 2, 3, 4]),
      f: rng.randomItemFromArray([2, 4, 5]),
      g: rng.randomIntBetween(10, 90) / 100,
      h: rng.randomItemFromArray([1, 2, 3, 4, 5, 6]),
      i: rng.randomItemFromArray([2, 4, 5, 8]),
    }
  },
  constraint({ data }) {
    return (
      data.c < data.d &&
      data.h < data.i &&
      data.e < data.f &&
      data.g - 0.2 < data.h / data.i &&
      data.h / data.i < data.g + 0.2
    )
  },
  originalData: {
    a: -1.2,
    b: -0.8,
    c: 80,
    d: 100,
    e: 4,
    f: 5,
    g: 0.8,
    h: 3,
    i: 4,
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
          {ppFrac([data.c, data.d])} ______ {ppFrac([data.e, data.f])}
        </p>
        <p>
          {pp(data.g)} ______ {ppFrac([data.h, data.i])}
        </p>
      </>
    )
  },
  solution({ data }) {
    const hauptnenner1 = (data.d * data.f) / getGcd(data.d, data.f)
    const hauptnenner2 = (data.i * 10) / getGcd(data.i, 10)
    const hauptnenner3 = (data.i * 100) / getGcd(data.i, 100)

    return (
      <>
        <p>
          <strong>
            Vergleiche {pp(data.a)} und {pp(data.b)}:
          </strong>
        </p>
        <p>
          Beachte: Die beiden Zahlen sind negativ. Deswegen gilt: {pp(data.a)}
          {data.a > data.b && ' > '}
          {data.a < data.b && ' < '}
          {data.a == data.b && ' = '}
          {pp(data.b)}{' '}
        </p>
        <p>
          <strong>
            Vergleiche {ppFrac([data.c, data.d])} und {ppFrac([data.e, data.f])}
            :
          </strong>
        </p>
        <p>
          Bringe die beiden Brüche auf einen gemeinsamen Nenner. Der gemeinsame
          Nenner ist {hauptnenner1}:
        </p>
        <p>
          {data.d == 50 && (
            <>
              {buildInlineFrac(
                <>
                  {data.c} <Color1>· 2</Color1>
                </>,
                <>
                  {data.d} <Color1>· 2</Color1>
                </>,
              )}
            </>
          )}{' '}
          {data.d == 50 ? (
            <>= {ppFrac([2 * data.c, 2 * data.d])}</>
          ) : (
            ppFrac([data.c, data.d])
          )}{' '}
          und{' '}
          {buildInlineFrac(
            <>
              {data.e} <Color1>· {hauptnenner1 / data.f}</Color1>
            </>,
            <>
              {data.f} <Color1>· {hauptnenner1 / data.f}</Color1>
            </>,
          )}{' '}
          = {ppFrac([data.e * (hauptnenner1 / data.f), hauptnenner1])}
        </p>
        <p>
          Damit ist: {ppFrac([data.c, data.d])}{' '}
          {data.c / data.d > data.e / data.f && '>'}{' '}
          {data.c / data.d < data.e / data.f && '<'}{' '}
          {data.c / data.d == data.e / data.f && '='} {ppFrac([data.e, data.f])}
        </p>
        <p>
          <strong>
            Vergleiche {pp(data.g)} und {ppFrac([data.h, data.i])}:
          </strong>
        </p>
        <p>
          Wandle {ppFrac([data.h, data.i])} in eine Dezimalzahl um. Dafür
          erweitere zunächst den Bruch:<br></br>
          {ppFrac([data.h, data.i])} ={' '}
          {data.i == 8 && (
            <>
              {buildInlineFrac(
                <>
                  {data.h} <Color1>· 125</Color1>
                </>,
                <>
                  {data.i} <Color1>· 125</Color1>
                </>,
              )}{' '}
              = {ppFrac([data.h * 125, data.i * 125])}
            </>
          )}
          {data.i == 4 && (
            <>
              {buildInlineFrac(
                <>
                  {data.h} <Color1>· 25</Color1>
                </>,
                <>
                  {data.i} <Color1>· 25</Color1>
                </>,
              )}{' '}
              = {ppFrac([data.h * 25, data.i * 25])}
            </>
          )}
          {(data.i == 2 || data.i == 5) && (
            <>
              {buildInlineFrac(
                <>
                  {data.h} <Color1>· {10 / data.i}</Color1>
                </>,
                <>
                  {data.i} <Color1>· {10 / data.i}</Color1>
                </>,
              )}{' '}
              = {ppFrac([(data.h * 10) / data.i, (data.i * 10) / data.i])}
            </>
          )}
        </p>
        <p>
          Jetzt kannst du den Bruch als Dezimalzahl schreiben und vergleichen:{' '}
          {data.i == 4 && ppFrac([data.h * 25, data.i * 25])}
          {(data.i == 2 || data.i == 5) &&
            ppFrac([(data.h * 10) / data.i, (data.i * 10) / data.i])}
          {data.i == 8 && <>{ppFrac([data.h * 125, data.i * 125])}</>}={' '}
          {pp(data.h / data.i)}
        </p>
        <p>
          Damit ist: {pp(data.g)} {data.g > data.h / data.i && '>'}
          {data.g < data.h / data.i && '<'}
          {data.g == data.h / data.i && '='} {ppFrac([data.h, data.i])}
        </p>
      </>
    )
  },
}
function erweitereBruch(arg0: number, arg1: number, arg2: number) {
  throw new Error('Function not implemented.')
}
