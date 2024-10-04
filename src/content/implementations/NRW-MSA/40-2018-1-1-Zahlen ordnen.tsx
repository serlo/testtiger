import { Exercise } from '@/data/types'
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

export const exercise40: Exercise<DATA> = {
  title: 'Zahlen ordnen',
  source: '2018 Teil 1 Aufgabe 1',
  useCalculator: false,
  duration: 4,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 9) / 10,
      b: rng.randomIntBetween(1, 9),
      c: rng.randomItemFromArray([10, 20, 100]),
      d: rng.randomItemFromArray([1, 2, 4, 5, 8]),
      e: rng.randomItemFromArray([3, 6, 7, 9]),
      f: rng.randomIntBetween(1, 99) / 100,
      g: rng.randomItemFromArray([55, 65, 75]),
      h: rng.randomItemFromArray([5, 15, 25]),
      i: rng.randomItemFromArray([30, 40, 60]),
    }
  },
  constraint({ data }) {
    return true
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
              <br></br>-{pp(data.a)} &nbsp;&nbsp;&nbsp;&nbsp;{' '}
              {ppFrac([data.b, data.c])} &nbsp;&nbsp;&nbsp;&nbsp; -
              {ppFrac([data.d, data.e])} &nbsp;&nbsp;&nbsp;&nbsp; {pp(data.f)}
            </p>
          </>
        )
      },
      solution({ data }) {
        const array = [-data.a, -data.d / data.e, data.b / data.c, data.f].sort(
          (a, b) => a - b,
        )
        return (
          <>
            <p>
              Es sind zwei positive und zwei negative Zahlen gegeben. Du musst
              also die negativen Zahlen miteinander vergleichen, und die
              positiven miteinander.
              <br></br>
              <br></br>
              Fangen wir mit den negativen Zahlen an: Hier bietet es sich an, -
              {pp(data.a)} in einen Bruch umzuwandeln:
              <br></br>
              {pp(-data.a)} = {ppFrac([-data.a * 10, 10])}
              <br></br>
              Jetzt musst du die beiden Brüche auf einen gemeinsamen Nenner
              bringen. Der gemeinsame Nenner ist {data.e * 10}.<br></br>
              <li>
                {ppFrac([-data.a * 10, 10])} =
                {ppFrac([-data.a * 10 * data.e, 10 * data.e])}
              </li>
              <li>
                {ppFrac([-data.d, data.e])} =
                {ppFrac([-data.d * 10, data.e * 10])}
              </li>
              Es ist also {ppFrac(array[0])} {' < '} {ppFrac(array[1])}.
              <br></br>
              <br></br>
              Jetzt schauen wir uns die positiven Zahlen an. Hier bietet es sich
              an, {ppFrac([data.b, data.c])} in eine Dezimalzahl umzuwandeln:
              <br></br>
              {ppFrac([data.b, data.c])} = {pp(data.b / data.c)}
              <br></br>
              Es ist also: {pp(array[2])} {' < '} {pp(array[3])}.<br></br>
              <br></br>
              <b>Antwort:</b> {ppFrac(array[0])} {' < '} {ppFrac(array[1])}{' '}
              {' < '} {pp(array[2])} {' < '} {pp(array[3])}
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
              b) Miriam behauptet: "{data.g}% sind mehr als{' '}
              {ppFrac([data.h, data.i])}." Hat Miriam recht? Überprüfe die
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
