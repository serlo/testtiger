import { Exercise } from '@/data/types'
import { Color1, Color2, Color3, Color4 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'

interface DATA {
  a: number
  b: number
  c: string
}

export const exercise13: Exercise<DATA> = {
  title: 'Binom ergänzen',
  source: '2022 Teil 1 Aufgabe 4',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(2, 6),
      b: rng.randomIntBetween(2, 6),
      c: rng.randomItemFromArray(['', 'y²']),
    }
  },
  originalData: {
    a: 2,
    b: 3,
    c: 'y²',
  },
  constraint({ data }) {
    return data.a != 0 && data.a != -1
  },
  points: 2,
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
  correctionHints({ data }) {
    return (
      <>
        Achte darauf, dass das Ergebnis fehlerfrei dargestellt wird. Überprüfe
        streng und jeden Term.
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Verwende die 1. binomische Formel und vergleiche die Terme mit den
          Termen in der Aufgabe:
        </p>
        {buildEquation([
          [
            <>
              ( <Color1>a</Color1>&nbsp; + &nbsp; b &nbsp; )²
            </>,
            '=',
            <>
              &nbsp;&nbsp;
              <Color2>a²</Color2>&nbsp; + 2ab + <Color3>b²</Color3>
            </>,
          ],
          [
            <>
              (<Color1>{data.a}x</Color1> + ____ )²
            </>,
            '=',
            <>
              <Color2>{data.a * data.a}x²</Color2> + ____ +
              <Color3>
                {data.b * data.b}
                {data.c}
              </Color3>
            </>,
          ],
        ])}
        <p>Im Vergleich siehst du:</p>
        {buildEquation([
          [
            <>
              <Color1>a</Color1>
            </>,
            '=',
            <>
              <Color1>{data.a}x</Color1>
            </>,
          ],
          [
            <>
              <Color3>b²</Color3>
            </>,
            '=',
            <>
              <Color3>
                {data.b * data.b}
                {data.c}
              </Color3>
            </>,
          ],
          [
            '',
            <>
              {' '}
              <Color4>
                <span className="inline-block  scale-y-[1.5]">↓</span>
              </Color4>
            </>,
            <>
              <Color4>
                <span style={{ fontSize: 'small' }}>
                  ziehe die Quadratwurzel
                </span>
              </Color4>
            </>,
          ],
          [
            <>b</>,
            '=',
            <>
              {data.b}
              {data.c == '' ? '' : 'y'}
            </>,
          ],
        ])}

        <p>
          Bestimme den Mischterm 2ab, indem du die Terme für a und b einsetzt:
        </p>
        <p>
          2ab = 2 · {data.a}x · {data.b}
          {data.c == '' ? '' : 'y'} = {2 * data.a * data.b}x
          {data.c == '' ? '' : 'y'}
        </p>
        <p>Setze die Terme in die Lücken ein:</p>
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
