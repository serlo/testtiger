import { Exercise } from '@/data/types'
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
        const text1 = ['verdopple', 'verdreifache', 'halbiere']
        const text2 = ['verdoppelt', 'verdreifacht', 'halbiert']
        const text2korrekt = ['vervierfacht', 'verneunfacht', 'viertelt']

        return (
          <>
            <p>
              b) Sina überlegt: Wenn ich den Radius {text1[data.case]}, <p />
              <p>Hat Sina recht? Begründe deine Entscheidung.</p>
            </p>
          </>
        )
      },
      solution({ data }) {
        const text3 = ['doppelt', 'dreifach', 'vierfach', 'halb']
        const faktor = [2, 3, 4, 0.5]
        return (
          <>
            <p>
              Setze den {text3[data.case]}en Radius in die Formel für die
              Oberfläche ein:
            </p>
            <p>O = 4 · π · r²</p>
            <p>
              O = 4 · π · ({faktor[data.case]} · {data.r})²
            </p>
            <p>
              O = 4 · π · {faktor[data.case]}² · {data.r}²
            </p>
            <p>
              O = 4 · π · {faktor[data.case] * faktor[data.case]} · {data.r}²
            </p>
          </>
        )
      },
    },
  ],
}
