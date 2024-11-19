import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  m: number
  min: number
  ml: number
}

export const exercise130: Exercise<DATA> = {
  title: 'Einheiten umrechnen',
  source: '2024 Teil 1 Aufgabe 2',
  useCalculator: false,
  duration: 3,
  points: 3,
  generator(rng) {
    return {
      m: rng.randomIntBetween(2, 8),
      min: rng.randomIntBetween(3, 9),
      ml: rng.randomIntBetween(2, 9) * 100,
    }
  },
  originalData: {
    m: 3,
    min: 4,
    ml: 800,
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>Rechne die Größen in die angegebene Einheit um.</p>
        <p>{pp(data.m * 100)} cm = ______ m</p>
        <p>{pp(data.min * 60)} s = ______ min</p>
        <p>{pp(data.ml / 1000)} ℓ = ______ ml</p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          <strong>Zentimeter (cm) in Meter (m)</strong>
        </p>
        <p>
          1 Meter enthält 100 Zentimetern. <br></br>Rechne mit dem
          Umrechnungsfaktor 100:
        </p>
        <p>
          {pp(data.m * 100)} cm = {pp(data.m * 100)} : 100 m
        </p>
        <p>
          {pp(data.m * 100)} cm = <strong>{pp(data.m)} m</strong>
        </p>
        <p>
          <strong>Sekunden (s) in Minuten (min)</strong>
        </p>
        <p>
          1 Minute enthält 60 Sekunden. <br></br>Rechne mit dem
          Umrechnungsfaktor 60:
        </p>
        <p>
          {pp(data.min * 60)} s = {pp(data.min * 60)} : 60 min
        </p>
        <p>
          {pp(data.min * 60)} s = <strong>{pp(data.min)} min</strong>
        </p>
        <p>
          <strong>Liter (ℓ) in Milliliter (ml)</strong>
        </p>
        <p>
          1 Liter enthält 1000 Milliliter. <br></br>Rechne mit dem
          Umrechnungsfaktor 1000:
        </p>
        <p>
          {pp(data.ml / 1000)} ℓ = {pp(data.ml / 1000)} · 1000 ml
        </p>
        <p>
          {pp(data.ml / 1000)} ℓ = <strong>{pp(data.ml)} ml</strong>
        </p>
      </>
    )
  },
}
