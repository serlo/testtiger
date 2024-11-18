import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  m: number
  h: number
  ml: number
}

export const exercise101: Exercise<DATA> = {
  title: 'Einheiten umrechnen',
  source: '2021 Teil 1 Aufgabe 2',
  useCalculator: false,
  duration: 2,
  points: 2,
  generator(rng) {
    return {
      m: rng.randomIntBetween(2, 8) / 2,
      h: rng.randomIntBetween(3, 9) / 2,
      ml: rng.randomIntBetween(2, 9) * 100,
    }
  },
  originalData: {
    m: 3,
    h: 4,
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
        <p>{pp(data.h)} h = ______ min</p>
        <p>{pp(data.ml / 1000)} ℓ = ______ dm³</p>
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
          1 Meter enthält 100 Zentimeter. <br></br>Rechne mit dem
          Umrechnungsfaktor 100:
        </p>
        <p>
          {pp(data.m * 100)} cm = {pp(data.m * 100)} : 100 m
        </p>
        <p>
          {pp(data.m * 100)} cm = <strong>{pp(data.m)} m</strong>
        </p>
        <p>
          <strong>Stunden (s) in Minuten (min)</strong>
        </p>
        <p>
          1 Stunde enthält 60 Minuten. <br></br>Rechne mit dem Umrechnungsfaktor
          60:
        </p>
        <p>
          {pp(data.h)} h = {pp(data.h)} · 60 min
        </p>
        <p>
          {pp(data.h)} h = <strong>{pp(data.h * 60)} min</strong>
        </p>
        <p>
          <strong>Liter (ℓ) in Kubikdezimeter (dm³)</strong>
        </p>
        <p>
          Ein Liter entspricht genau einem Volumen von einem Kubikdezimeter.
        </p>
        <p>
          {pp(data.ml / 1000)} ℓ = <strong>{pp(data.ml / 1000)} dm³</strong>
        </p>
      </>
    )
  },
}
