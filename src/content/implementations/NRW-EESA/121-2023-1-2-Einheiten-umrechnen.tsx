import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  kilometers: number
  minutes: number
  millilitres: number
}

export const exercise121: Exercise<DATA> = {
  title: 'Einheiten umrechnen',
  source: '2023 Teil 1 Aufgabe 2',
  useCalculator: false,
  duration: 3,
  points: 3,
  generator(rng) {
    return {
      kilometers: rng.randomIntBetween(1, 100),
      minutes: rng.randomIntBetween(1, 9),
      millilitres: rng.randomIntBetween(1, 30) * 100,
    }
  },
  originalData: {
    kilometers: 21,
    minutes: 5,
    millilitres: 500,
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>Rechne die Größen in die angegebene Einheit um. </p>

        <p>{pp(data.kilometers)} km = ______ m;</p>

        <p>{pp(data.minutes)} min = ______ s;</p>

        <p>{pp(data.millilitres)} ml = ______ l</p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          <strong> Kilometer in Meter:</strong>
        </p>

        <p>1 Kilometer entspricht 1000 Metern. Damit sind:</p>

        <p>
          {pp(data.kilometers)} km = {pp(data.kilometers * 1000)} m{' '}
        </p>

        <p>
          <strong> Minuten in Sekunden:</strong>
        </p>

        <p>1 Minute entspricht 60 Sekunden. Damit sind:</p>

        <p>
          {pp(data.minutes)} min = {pp(data.minutes * 60)} s
        </p>

        <p>
          <strong> Milliliter in Liter:</strong>
        </p>

        <p>
          1 Milliliter entspricht {buildInlineFrac(1, 1000)} Liter. Damit sind:
        </p>

        <p>
          {pp(data.millilitres)} ml ={' '}
          {pp(roundToDigits((data.millilitres * 1) / 1000, 2))} l
        </p>
      </>
    )
  },
}
