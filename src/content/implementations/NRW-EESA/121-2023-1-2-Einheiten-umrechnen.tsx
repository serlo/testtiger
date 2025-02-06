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
  duration: 6,
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
  learningPathData: {
    kilometers: 52,
    minutes: 2,
    millilitres: 750,
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
          <strong> 1 Kilometer (km)</strong> enthält{' '}
          <strong> 1000 Meter (m)</strong>
        </p>
        <p>Rechne mit dem Umrechnungsfaktor 1000:</p>
        <p>
          {pp(data.kilometers)} km = {pp(data.kilometers)} · 1000 m
        </p>
        <p>
          <strong>
            {' '}
            {pp(data.kilometers)} km = {pp(data.kilometers * 1000)} m{' '}
          </strong>
        </p>
        <hr style={{ margin: '10px 0' }} />
        <p>
          <strong> 1 Minute (min)</strong> enthält{' '}
          <strong> 60 Sekunden (s)</strong>
        </p>
        <p>Rechne mit dem Umrechnungsfaktor 60:</p>
        <p>
          {pp(data.minutes)} min = {pp(data.minutes)} · 60 s
        </p>
        <p>
          <strong>
            {' '}
            {pp(data.minutes)} min = {pp(data.minutes * 60)} s{' '}
          </strong>
        </p>
        <hr style={{ margin: '10px 0' }} />
        <p>
          <strong> 1 Liter (l)</strong> enthält{' '}
          <strong> 1000 Mililiter (ml)</strong>
        </p>
        <p>Rechne mit dem Umrechnungsfaktor 1000:</p>
        <p>
          {pp(data.millilitres)} ml = {pp(data.millilitres)} : 1000 l
        </p>
        <p>
          <strong>
            {' '}
            {pp(data.millilitres)} ml ={' '}
            {pp(roundToDigits((data.millilitres * 1) / 1000, 2))} l{' '}
          </strong>
        </p>
      </>
    )
  },
}
