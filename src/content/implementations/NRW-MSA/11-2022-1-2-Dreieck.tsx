import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  a: number
  c: number
}

export const exercise11: Exercise<DATA> = {
  title: 'Dreieck',
  source: '2022 Teil 1 Aufgabe 2',
  useCalculator: true,
  duration: 4,

  generator(rng) {
    return {
      a: rng.randomIntBetween(180, 240) / 10,
      c: rng.randomIntBetween(24, 30),
    }
  },
  constraint({ data }) {
    return data.a != data.c
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
            <svg viewBox="0 0 720 480">
              <image
                href="/content/NRW_MSA_Dreieck.jpg"
                height="500"
                width="700"
              />
            </svg>
            <p>
              In dem abgebildeten Dreieck gilt: a = {pp(data.a)} cm und c ={' '}
              {data.c} cm.
            </p>
            <p>a) Berechne die Länge der Seite b.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Im rechtwinkligen Dreieck sind zwei Seitenlängen gegeben. Verwende
              den Satz des Pythagoras:
            </p>
            <p>a² + b² = c²</p>

            <p>
              Forme die Gleichung um, da die Seitenlänge von b berechnet wird:
            </p>
            <p>b² = c² − a²</p>

            <p>Setze die gegebenen Seitenlängen ein:</p>
            <p>
              b² = {data.c}² − {pp(data.a)}²
            </p>

            <p>Ziehe die Quadratwurzel und bestimme b:</p>
            <p>b = {buildSqrt(data.c + '² − ' + pp(data.a) + '²')}</p>
            <p>
              b ={' '}
              {pp(
                roundToDigits(Math.sqrt(data.c * data.c - data.a * data.a), 2),
              )}
            </p>
            <p>
              Die Seite b ist ungefähr{' '}
              {pp(
                roundToDigits(Math.sqrt(data.c * data.c - data.a * data.a), 2),
              )}{' '}
              cm lang.
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
            <p>b) Berechne die Größe des Winkels α.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Im rechtwinkligen Dreieck gilt mithilfe des Sinus die Gleichung:
            </p>

            {buildEquation([
              [
                'sin(α)',
                '=',
                <>{buildInlineFrac('Gegenkathete', 'Hypotenuse')}</>,
              ],

              ['sin(α)', '=', <>{buildInlineFrac('a', 'c')}</>],
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
                    <span style={{ fontSize: 'small' }}>Werte einsetzen</span>
                  </Color4>
                </>,
              ],
              [
                'sin(α)',
                '=',
                <>{buildInlineFrac(pp(data.a), data.c)}</>,
                <>
                  | sin<sup>-1</sup>()
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
                      Mit sin<sup>-1</sup> nach α lösen
                    </span>
                  </Color4>
                </>,
              ],
              [
                'α',
                '=',
                <>
                  <>
                    sin<sup>-1</sup>{' '}
                    <span className="inline-block scale-y-[2.6]">(</span>
                    {buildInlineFrac(pp(data.a), data.c)}
                    <span className="inline-block scale-y-[2.6]">)</span>
                  </>
                </>,
              ],
              [
                <>
                  <strong>α</strong>
                </>,
                <>
                  <strong>≈</strong>
                </>,
                <>
                  <strong>
                    {pp(
                      roundToDigits(
                        (Math.asin(data.a / data.c) / (2 * Math.PI)) * 360,
                        2,
                      ),
                    )}
                    °
                  </strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
  ],
}
