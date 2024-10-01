import { Exercise } from '@/data/types'
import { pp, ppFrac } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
  d: number
  e: number
  f: number
}

export const exercise40: Exercise<DATA> = {
  title: 'Zahlen ordnen',
  source: '2018 Teil 1 Aufgabe 1',
  useCalculator: false,
  duration: 4,
  generator(rng) {
    return {
      a: rng.randomItemFromArray([-0.1, -0.3, -0.7, -0.9]),
      b: rng.randomIntBetween(1, 10) * 2 - 1,
      c: rng.randomItemFromArray([10, 20, 100]),
      d: rng.randomItemFromArray([-1, -2, -4, -5, -8]),
      e: rng.randomItemFromArray([3, 7, 9]),
      f:
        rng.randomItemFromArray([
          1, 3, 7, 9, 11, 13, 17, 19, 21, 23, 27, 31, 33, 37, 39, 41, 43, 47,
          49, 51, 53, 59, 61, 63, 67, 69, 71, 73, 77, 79, 81, 83, 87, 89, 91,
          93, 97, 99, 29, 57,
        ]) / 100,
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
              a) Ordne der Größe nach. Beginne mit der kleinsten Zahl.
              <br></br>
              {pp(data.a)} &nbsp;&nbsp;&nbsp;&nbsp; {ppFrac(data.b / data.c)}{' '}
              &nbsp;&nbsp;&nbsp;&nbsp; {ppFrac(data.d / data.e)}{' '}
              &nbsp;&nbsp;&nbsp;&nbsp; {pp(data.f)}
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Es sind zwei positive und zwei negative Zahlen gegeben. Du musst
              also die negativen Zahlen miteinander vergleichen, und die
              positiven Zahlen miteinander.
              <br></br>
              <br></br>
              Fangen wir mit den negativen Zahlen an: Hier bietet es sich an,{' '}
              {pp(data.a)} in einen Bruch umzuwandeln:
              <br></br>
              {pp(data.a)} = {ppFrac((data.a * 10) / 10)}
              <br></br>
              Jetzt musst du die beiden Brüche auf einen gemeinsamen Nenner
              bringen. Der gemeinsame Nenner ist {data.e * 100}.<br></br>
              {ppFrac((data.a * 10) / 10)} ={' '}
              {ppFrac((data.a * 10 * data.e * 10) / (10 * 30))}
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        return <></>
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
