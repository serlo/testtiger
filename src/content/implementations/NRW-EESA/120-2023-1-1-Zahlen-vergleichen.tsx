import { Exercise } from '@/data/types'
import { getGcd } from '@/helper/get-gcd'
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
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      a: rng.randomIntBetween(10, 100) / -100,
      b: rng.randomIntBetween(10, 100) / -100,
      c: rng.randomItemFromArray([30, 40, 60, 70, 80, 90]),
      d: rng.randomItemFromArray([5, 10, 50, 100]),
      e: rng.randomItemFromArray([1, 3, 6, 7, 8, 9]),
      f: rng.randomItemFromArray([2, 4, 5]),
      g: rng.randomIntBetween(10, 100) / 100,
      h: rng.randomItemFromArray([1, 3, 6, 7, 8, 9]),
      i: rng.randomItemFromArray([2, 4, 5]),
    }
  },
  constraint({ data }) {
    return true
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
    const hauptnenner1 = (data.d * data.f) / getGcd(data.e, data.f)
    const hauptnenner2 = (data.i * 10) / getGcd(data.i, 10)
    return (
      <>
        <p>
          <strong>
            Vergleiche {pp(data.a)} und {pp(data.b)}:
          </strong>
        </p>
        <p>
          Beachte: Die beiden Zahlen sind negativ. Deswegen gilt: {pp(data.a)}
          {data.a > data.b ? '>' : '<'}
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
          {ppFrac([data.c, data.d])} ={' '}
          {ppFrac([data.c * (hauptnenner1 / data.d), hauptnenner1])} und{' '}
          {ppFrac([data.e, data.f])} ={' '}
          {ppFrac([data.e * (hauptnenner1 / data.f), hauptnenner1])}
        </p>
        <p>
          Damit ist: {ppFrac([data.c, data.d])}{' '}
          {data.c / data.d > data.e / data.f ? '>' : '<'}{' '}
          {ppFrac([data.e, data.f])}
        </p>
        <p>
          <strong>
            Vergleiche {pp(data.g)} und {ppFrac([data.h, data.i])}:
          </strong>
        </p>
        <p>
          Wandle {ppFrac([data.h, data.i])} in eine Dezimalzahl um. Dafür
          erweiterst du zunächst den Bruch:
          {ppFrac([data.h, data.i])} ={' '}
          {ppFrac([data.h * (hauptnenner2 / data.i), hauptnenner2])}
        </p>
        Jetzt kannst du den Bruch als Dezimalzahl schreiben:{' '}
        {ppFrac([data.h * (hauptnenner2 / data.i), hauptnenner2])} ={' '}
        {pp(data.h / data.i)}
        <p>
          Damit ist: {pp(data.g)} {data.g > data.h / data.i ? '>' : '<'}{' '}
          {ppFrac([data.h, data.i])}
        </p>
      </>
    )
  },
}
