import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  kilometers: number
  minutes: number
  millilitres: number
}

export const exercise101: Exercise<DATA> = {
  title: 'Einheiten umrechnen',
  source: '2023 Teil 1 Aufgabe 2',
  useCalculator: false,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      kilometers: rng.randomIntBetween(1, 100),
      minutes: rng.randomIntBetween(1, 120),
      millilitres: rng.randomIntBetween(100, 10000),
    }
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>Rechne die Größen in die angegebene Einheit um. </p>
        <br></br>
        <p>{pp(data.kilometers)} km = ______ m;</p>
        <br></br>
        <p>{pp(data.minutes)} min = ______ s;</p>
        <br></br>
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
        <br></br>
        <p>1 Kilometer entspricht 1000 Metern. Damit sind:</p>
        <br></br>
        <p>
          {pp(data.kilometers)} km = {pp(data.kilometers * 1000)} m{' '}
        </p>
        <br></br>
        <p>
          <strong> Minuten in Sekunden:</strong>
        </p>
        <br></br>
        <p>1 Minute entspricht 60 Sekunden. Damit sind:</p>
        <br></br>
        <p>
          {pp(data.minutes)} min = {pp(data.minutes * 60)} s
        </p>
        <br></br>
        <p>
          <strong> Milliliter in Liter:</strong>
        </p>
        <br></br>
        <p>
          1 Milliliter entspricht {buildInlineFrac(1, 1000)} Liter. Damit sind:
        </p>
        <br></br>
        <p>
          {pp(data.millilitres)} ml ={' '}
          {pp(roundToDigits((data.millilitres * 1) / 1000, 2))} l
        </p>
      </>
    )
  },
}
