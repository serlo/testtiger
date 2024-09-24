import { Exercise } from '@/data/types'
import { Color1 } from '@/helper/colors'
import { buildSqrt } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  a: number
  b: number
  case: number
  r: number
}

export const exercise32: Exercise<DATA> = {
  title: 'Berechnungen am Rechteck',
  source: '2019 Teil 1 /4',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {
      a: rng.randomIntBetween(3, 7),
      b: rng.randomIntBetween(2, 5),
      case: rng.randomIntBetween(0, 3),
      r: rng.randomIntBetween(1, 6) * 6,
    }
  },
  constraint({ data }) {
    return data.a != data.b && data.a * data.b != data.r
  },
  subtasks: {
    intro: ({ data }) => {
      return (
        <>
          Ein Rechteck hat die Seitenlängen a = {data.a} cm und b = {data.b} cm.
        </>
      )
    },
    main: [
      {
        task({ data }) {
          return <>a) Berechne die Länge der Diagonale d.</>
        },
        solution({ data }) {
          return (
            <>
              <p>
                Verwende den Satz des Pythagoras. Zwei Seiten des Rechtecks
                bilden mit der Diagonale ein rechtwinkliges Dreieck. In diesem
                gilt:
              </p>
              <p>a² + b² = d²</p>

              <p>Setze die gegebenen Seitenlängen ein:</p>
              <p>
                {data.a}² + {pp(data.b)}² = d²
              </p>

              <p>Ziehe die Quadratwurzel und bestimme d:</p>
              <p>
                d = {buildSqrt(data.a + '² + ' + data.b + '²')} ={' '}
                {pp(
                  roundToDigits(
                    Math.sqrt(data.a * data.a + data.b * data.b),
                    2,
                  ),
                )}
              </p>
              <p>
                Die Diagonale d ist ungefähr{' '}
                {pp(
                  roundToDigits(
                    Math.sqrt(data.a * data.a + data.b * data.b),
                    2,
                  ),
                )}{' '}
                cm lang.
              </p>
            </>
          )
        },
      },
      {
        task({ data }) {
          const text = [
            'verdoppelt',
            'verdreifacht',
            'vervierfacht',
            'halbiert',
          ]
          return (
            <>
              b) Wie verändert sich der Flächeninhalt dieses Rechtecks, wenn man
              jede Seitenlänge {text[data.case]}? Begründe.
            </>
          )
        },
        solution({ data }) {
          const text = [
            'verdoppelt',
            'verdreifacht',
            'vervierfacht',
            'halbiert',
          ]
          const zahl = [2, 3, 4, 0.5]
          return (
            <>
              <p>Den Flächeninhalt eines Rechtecks berechnest du mit:</p>
              <p>A = Länge · Breite</p>
              <p>
                Setze die <Color1>{text[data.case]}en</Color1> Seitenlängen ein:
              </p>
              <p>
                A = <Color1>{ppFrac(zahl[data.case])}</Color1> · {data.a} cm ·{' '}
                <Color1>{ppFrac(zahl[data.case])}</Color1> · {data.b} cm{' '}
              </p>
              <p>
                A = <Color1>{ppFrac(zahl[data.case])}</Color1> ·
                <Color1>{ppFrac(zahl[data.case])}</Color1> · {data.a} cm ·{' '}
                {data.b} cm{' '}
              </p>
              <p>
                A = <Color1>{ppFrac(zahl[data.case] * zahl[data.case])}</Color1>{' '}
                · {data.a} cm · {data.b} cm{' '}
              </p>
              <p>
                Wenn man die Seitenlängen {text[data.case]}, berechnet sich der
                neue Flächeninhalt mit{' '}
                <strong>
                  {ppFrac(zahl[data.case] * zahl[data.case])} mal dem
                  ursprünglichen Flächeninhalt
                </strong>
                .
              </p>
            </>
          )
        },
      },
      {
        task({ data }) {
          return (
            <>
              c) Ein anderes Rechteck hat einen Flächeninhalt von {data.r} cm².
              Wie lang könnten die Seiten sein? Gib zwei unterschiedliche
              Möglichkeiten an.
            </>
          )
        },
        solution({ data }) {
          return (
            <>
              <p>
                Suche zwei Zahlenpaare, die miteinander multipliziert {data.r}{' '}
                ergeben.
              </p>
            </>
          )
        },
      },
    ],
  },
}
