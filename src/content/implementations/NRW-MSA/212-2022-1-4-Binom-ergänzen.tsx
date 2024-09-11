import { Exercise } from '@/data/types'
import { buildInlineFrac, buildSqrt } from '@/helper/math-builder'

interface DATA {
  a: number
  b: number
  c: string
}

export const exercise212: Exercise<DATA> = {
  title: '2022 Variante 1 /4) Binom ergänzen',
  useCalculator: false,
  duration: -3,
  generator(rng) {
    return {
      a: rng.randomIntBetween(-6, 6),
      b: rng.randomIntBetween(2, 6),
      c: rng.randomItemFromArray(['', 'y²']),
    }
  },
  constraint({ data }) {
    return data.a != 1 && data.a != 0 && data.a != -1
  },
  task({ data }) {
    return (
      <>
        <p>Ergänze:</p>

        <p>
          ({data.a}x + _____ )² = {data.a * data.a}x² + _____ +{data.b * data.b}
          {data.c}
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>Verwende die 1. binomische Formel: (a + b)² = a² + 2ab + b²</p>
        <p>
          Vergleiche die Terme in der Aufgabenstellung mit den Termen der 1.
          binomischen Formel:
        </p>
        <p>
          b² = {data.b * data.b}
          {data.c}
        </p>
        <p>Wende die Quadratwurzel an und bestimme b:</p>
        <p>
          b = {buildSqrt(data.b * data.b + '' + data.c)} = {data.b}
          {data.c == '' ? '' : 'y'}
        </p>
        <p>Berechne den Mischterm 2ab:</p>
        <p>
          2ab = 2 · {data.a}x · {data.b}
          {data.c == '' ? '' : 'y'} = {2 * data.a * data.b}x
          {data.c == '' ? '' : 'y'}
        </p>
        <p>
          <br></br>Setze die Terme in die Lücken ein:
        </p>
        <p>
          ({data.a}x +{' '}
          <strong>
            {data.b}
            {data.c == '' ? '' : 'y'}{' '}
          </strong>
          )² = {data.a * data.a}x² +{' '}
          <strong>
            {2 * data.a * data.b}x{data.c == '' ? '' : 'y'}
          </strong>{' '}
          +{data.b * data.b}
          {data.c}
        </p>
      </>
    )
  },
}
