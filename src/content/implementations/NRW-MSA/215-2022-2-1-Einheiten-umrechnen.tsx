import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { randomInt } from 'crypto'

interface DATA {
  hours: number
  gramms: number
  cubics: number
}

export const exercise215: Exercise<DATA> = {
  title: '2022 Variante 2 /1) Einheiten umrechnen',
  useCalculator: false,
  duration: -1,
  generator(rng) {
    return {
      hours: (rng.randomIntBetween(30, 60) * 5) / 100,
      gramms: rng.randomIntBetween(10000, 200000) / 10,
      cubics: rng.randomIntBetween(10, 100) / 100,
    }
  },
  constraint({ data }) {
    return true
  },
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
        <p>1 Stunde entspricht 60 Minuten. Damit sind:</p>
        <p>
          {pp(data.hours)} h = {pp(data.hours)} · 60 min
        </p>
        <p>
          {pp(data.hours)} h = {pp(data.hours * 60)} min
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
          {pp(data.gramms)} g = {pp(data.gramms / 1000)} kg
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
          {pp(data.cubics)} m³ = {pp(data.cubics * 1000)} ℓ
        </p>
      </>
    )
  },
}
