import { Exercise } from '@/data/types'
import { getGcd } from '@/helper/get-gcd'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

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

export const exercise40: Exercise<DATA> = {
  title: 'Zahlen ordnen',
  source: '2018 Teil 1 Aufgabe 1',
  useCalculator: false,
  duration: 4,
  generator(rng) {
    return {
      a: rng.randomIntBetween(-9, 9) / 10,
      b: rng.randomIntBetween(-9, 9),
      c: rng.randomItemFromArray([10, 20, 100]),
      d: rng.randomItemFromArray([1, 2, 4, 5, 8]),
      e: rng.randomItemFromArray([3, 6, 7, 9]),
      f: rng.randomIntBetween(-99, 99) / 100,
      g: rng.randomItemFromArray([55, 65, 75]),
      h: rng.randomItemFromArray([5, 15, 25]),
      i: rng.randomItemFromArray([30, 40, 60]),
    }
  },
  constraint({ data }) {
    return data.f != 0 && data.a != 0 && data.b != 0
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
              a) Ordne die Zahlen der Größe nach. Beginne mit der kleinsten
              Zahl.
              <br></br>
              {pp(data.a)} &nbsp;&nbsp;&nbsp;&nbsp; {ppFrac([data.b, data.c])}{' '}
              &nbsp;&nbsp;&nbsp;&nbsp; {ppFrac([data.d, data.e])}{' '}
              &nbsp;&nbsp;&nbsp;&nbsp; {pp(data.f)}
            </p>
          </>
        )
      },
      solution({ data }) {
        const array = [data.a, data.d / data.e, data.b / data.c, data.f].sort(
          (a, b) => a - b,
        )
        const gerundet = roundToDigits(data.d / data.e, 2)

        return (
          <>
            <p>
              Wandle {ppFrac([data.b, data.c])} und {ppFrac([data.d, data.e])}{' '}
              jeweils in eine Dezimalzahl um. Dazu kannst du einen Bruch
              beispielsweise als Division auffassen:
              <br></br>
              {ppFrac([data.d, data.e])} = {data.d} : {data.e} ≈ {pp(gerundet)}
              <br></br>
              <p>
                Oder verwenden, dass Brüche mit 10 oder 100 als Nenner direkt
                als Dezimalzahlen übersetzt werden können:
              </p>
              {ppFrac([data.b, data.c])}{' '}
              {data.c == 20 && (
                <>
                  = {buildInlineFrac(data.b + ' · 5', data.c + ' · 5')} ={' '}
                  {ppFrac([data.b * 5, data.c * 5])}
                </>
              )}{' '}
              = {pp(data.b / data.c)}
              <br></br>
              <b>Antwort:</b>{' '}
              {pp(array[0] == data.d / data.e ? gerundet : array[0])} {' < '}{' '}
              {pp(array[1] == data.d / data.e ? gerundet : array[1])} {' < '}{' '}
              {pp(array[2] == data.d / data.e ? gerundet : array[2])} {' < '}{' '}
              {pp(array[3] == data.d / data.e ? gerundet : array[3])}
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>
              b) Miriam behauptet: &quot;{data.g}% sind mehr als{' '}
              {ppFrac([data.h, data.i])}.&quot; Hat Miriam recht? Überprüfe die
              Behauptung durch eine Rechnung.
            </p>
          </>
        )
      },
      solution({ data }) {
        const array = [data.g / 100, data.h / data.i].sort((g, h) => g - h)
        return (
          <>
            <p>
              Um die beiden Zahlen miteinander zu vergleichen, ist es sinnvoll,{' '}
              {data.g}% in einen Bruch umzuwandeln:
              <br></br>
              {data.g}% = {ppFrac([data.g, 100])}
              <br></br>
              Bringe die beiden Brüche jetzt auf einen gemeinsamen Nenner. Der
              gemeinsame Nenner ist {data.i * 10}.<br></br>
              <li>
                {ppFrac([data.h, data.i])} ={' '}
                {ppFrac([data.h * 10, data.i * 10])}
              </li>
              <li>
                {ppFrac([data.g, 100])} ={' '}
                {ppFrac([data.g * data.i * 0.1, data.i * 10])}
              </li>
              <b>Antwort:</b> Damit hat Miriam{' '}
              {data.g > data.h / data.i ? 'recht.' : 'nicht recht.'}
            </p>
          </>
        )
      },
    },
  ],
}
