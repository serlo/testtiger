import { Exercise } from '@/data/types'
import { getGcd } from '@/helper/get-gcd'
import { buildFrac, buildInlineFrac } from '@/helper/math-builder'
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
  originalData: {
    a: -0.7,
    b: 7,
    c: 100,
    d: -1,
    e: 7,
    f: 0.17,
    g: 65,
    h: 25,
    i: 30,
  },
  constraint({ data }) {
    return (
      data.f != 0 &&
      data.a != 0 &&
      data.b != 0 &&
      data.a != data.b / data.c &&
      data.b / data.c != data.d / data.e &&
      data.d / data.e != data.f
    )
  },
  intro({ data }) {
    return <></>
  },
  tasks: [
    {
      points: 2,
      duration: 2,
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
              <p>
                {ppFrac([data.d, data.e])} = {data.d} : {data.e} ≈{' '}
                {pp(gerundet)}
              </p>
              <p>
                Oder verwende, dass ein Bruch mit 10 oder 100 als Nenner direkt
                als Dezimalzahlen übersetzt werden kann:
              </p>
              <p>
                {ppFrac([data.b, data.c])}{' '}
                {data.c == 20 && (
                  <>
                    = {buildInlineFrac(data.b + ' · 5', data.c + ' · 5')} ={' '}
                    {ppFrac([data.b * 5, data.c * 5])}
                  </>
                )}{' '}
                = {pp(data.b / data.c)}
              </p>
              <p>
                Vergleiche die Dezimalzahlen miteinander. Ordne die
                ursprünglichen Zahlen dann mit dem Operator {'"<"'}:
              </p>
              <strong>
                {' '}
                {array[0] == data.d / data.e && ppFrac([data.d, data.e])}
                {array[0] == data.a && data.a}
                {array[0] == data.b / data.c && ppFrac([data.b, data.c])}
                {array[0] == data.f && pp(data.f)} {' < '}{' '}
                {array[1] == data.d / data.e && ppFrac([data.d, data.e])}
                {array[1] == data.a && pp(array[1])}
                {array[1] == data.b / data.c && ppFrac([data.b, data.c])}
                {array[1] == data.f && pp(data.f)} {' < '}{' '}
                {array[2] == data.d / data.e && ppFrac([data.d, data.e])}
                {array[2] == data.a && pp(array[2])}
                {array[2] == data.b / data.c && ppFrac([data.b, data.c])}
                {array[2] == data.f && pp(data.f)} {' < '}{' '}
                {array[3] == data.d / data.e && ppFrac([data.d, data.e])}
                {array[3] == data.a && pp(array[3])}
                {array[3] == data.b / data.c && ppFrac([data.b, data.c])}
                {array[3] == data.f && pp(data.f)}
              </strong>
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 2,
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
        const hauptnenner = (data.i * 100) / getGcd(data.i, 100)
        return (
          <>
            <p>
              Um die beiden Zahlen miteinander zu vergleichen, ist es sinnvoll,{' '}
              {data.g}% in einen Bruch umzuwandeln:
              <br></br>
              {data.g}% = {ppFrac([data.g, 100])}
              <br></br>
              Bringe die beiden Brüche jetzt auf einen gemeinsamen Nenner. Ihr
              Hauptnenner ist {hauptnenner}.<br></br>
              <ul>
                <li>
                  {ppFrac([data.h, data.i])} ={' '}
                  {buildInlineFrac(
                    <>
                      {data.h} · {hauptnenner / data.i}
                    </>,
                    <>
                      {data.i} · {hauptnenner / data.i}
                    </>,
                  )}{' '}
                  = {ppFrac([(data.h * hauptnenner) / data.i, hauptnenner])}
                </li>
                <li>
                  {ppFrac([data.g, 100])} ={' '}
                  {buildInlineFrac(
                    <>
                      {data.g} · {hauptnenner / 100}
                    </>,
                    <>
                      {data.h} · {hauptnenner / 100}
                    </>,
                  )}{' '}
                  = {ppFrac([(data.g * hauptnenner) / 100, hauptnenner])}
                </li>
              </ul>
              <strong>
                Damit hat Miriam{' '}
                {data.g / 100 > data.h / data.i ? 'recht.' : 'nicht recht.'}
              </strong>
            </p>
          </>
        )
      },
    },
  ],
}
