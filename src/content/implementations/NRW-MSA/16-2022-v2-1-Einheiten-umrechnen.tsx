import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { randomInt } from 'crypto'

interface DATA {
  hours: number
  gramms: number
  cubics: number
}

export const exercise16: Exercise<DATA> = {
  title: 'Einheiten umrechnen',
  source: '2022 Teil 1 Aufgabe 1 (Variante 2)',
  useCalculator: false,
  duration: 3,
  generator(rng) {
    return {
      hours: rng.randomIntBetween(5, 11) * 0.25,
      gramms: rng.randomIntBetween(10000, 200000) / 10,
      cubics: rng.randomIntBetween(10, 100) / 100,
    }
  },
  originalData: {
    hours: 2.25,
    gramms: 1238.6,
    cubics: 0.12,
  },
  constraint({ data }) {
    return true
  },
  points: 3,
  task({ data }) {
    return (
      <>
        <p>Wandle jeweils in die angegebene Größe um:</p>

        <p>{pp(data.hours)} h = ______ min;</p>
        <p>{pp(data.gramms)} g = ______ kg;</p>
        <p>{pp(data.cubics)} m³ = ______ ℓ;</p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          <strong>Stunden (h) in Minuten (min)</strong>
        </p>
        <p>
          1 Stunde entspricht 60 Minuten. <br></br>Damit sind:
        </p>
        <p>
          {pp(data.hours)} h = {pp(data.hours)} · 60 min
        </p>
        <p>
          {pp(data.hours)} h = <strong>{pp(data.hours * 60)} min</strong>
        </p>
        <p>
          <br></br>
          <strong>Gramm (g) in Kilogramm (kg)</strong>
        </p>
        <p>1 Gramm entspricht {buildInlineFrac(1, 1000)} kg. Damit sind:</p>
        <p>
          {pp(data.gramms)} g = {pp(data.gramms)} · {buildInlineFrac(1, 1000)}{' '}
          kg
        </p>
        <p>
          {pp(data.gramms)} g = <strong>{pp(data.gramms / 1000)} kg</strong>
        </p>
        <p>
          <br></br>
          <strong>Kubikmeter (m³) in Liter (ℓ)</strong>
        </p>
        <p>1 Kubikmeter entspricht dem Volumen von 1000 Litern. Damit sind:</p>
        <p>
          {pp(data.cubics)} m³ = {pp(data.cubics)} · 1000 ℓ
        </p>
        <p>
          {pp(data.cubics)} m³ = <strong>{pp(data.cubics * 1000)} ℓ</strong>
        </p>
      </>
    )
  },
}
