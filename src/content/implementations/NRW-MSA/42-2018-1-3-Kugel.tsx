import { Exercise } from '@/data/types'
import { Color1 } from '@/helper/colors'
import { kürzeBruch } from '@/helper/kuerze-bruch'
import { buildFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  r: number
  case: number
  right: number
}

export const exercise42: Exercise<DATA> = {
  title: 'Kugel',
  source: '2018 Teil 1 Aufgabe 3',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {
      r: rng.randomIntBetween(3, 8),
      case: rng.randomIntBetween(0, 2),
      right: rng.randomIntBetween(0, 1),
    }
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>TODO: Abbildung Kugel</p>
        <p>Eine Kugel hat einen Radius von {data.r} cm.</p>
      </>
    )
  },
  tasks: [
    {
      points: 42,
      task({ data }) {
        return (
          <>
            <p>a) Berechne die Oberfläche der Kugel.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Berechne die Oberfläche der Kugel mit der Formel:</p>
            <p>O = 4 · π · r²</p>
            <p>O = 4 · π · {data.r}²</p>
            <p>
              O = {pp(roundToDigits(4 * Math.PI * Math.pow(data.r, 2), 2))} cm²
            </p>
          </>
        )
      },
    },
    {
      points: 42,
      task({ data }) {
        const text1_case = ['verdopple', 'verdreifache', 'halbiere']
        const text_falsch = ['verdoppelt', 'verdreifacht', 'halbiert']
        const text_korrekt = ['vervierfacht', 'verneunfacht', 'viertelt']

        return (
          <>
            <p>
              b) Sina überlegt: Wenn ich den Radius {text1_case[data.case]},{' '}
              {data.right == 1 && (
                <>dann {text_korrekt[data.case]} sich die Oberfläche. </>
              )}
              {data.right == 0 && (
                <>dann {text_falsch[data.case]} sich auch die Oberfläche. </>
              )}
              <p />
              <p>Hat Sina recht? Begründe deine Entscheidung.</p>
            </p>
          </>
        )
      },
      solution({ data }) {
        const text2_case = ['doppelt', 'dreifach', 'halb']
        const text3_case = ['vervierfacht', 'verneunfacht', 'viertelt']
        const faktor = [2, 3, 0.5]
        return (
          <>
            <p>
              Setze den <Color1>{text2_case[data.case]}en</Color1> Radius in die
              Formel für die Oberfläche ein:
            </p>
            <p>O = 4 · π · r²</p>
            <p>
              O = 4 · π · (<Color1>{faktor[data.case]}</Color1> · {data.r})²
            </p>
            <p>
              O = 4 · π · <Color1>{faktor[data.case]}</Color1>² · {data.r}²
            </p>
            <p>
              O = 4 · π ·{' '}
              <Color1>{faktor[data.case] * faktor[data.case]}</Color1> ·{' '}
              {data.r}²
            </p>
            <p>
              Die Oberfläche <Color1>{text3_case[data.case]}</Color1> sich bei{' '}
              <Color1>{text2_case[data.case]}em</Color1> Radius.
            </p>
            <p>
              Die Aussage von Sina ist also{' '}
              <strong>
                {data.right == 0 && 'falsch'}
                {data.right == 1 && 'richtig'}
              </strong>
              .
            </p>
          </>
        )
      },
    },
  ],
}
