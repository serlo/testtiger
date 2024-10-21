import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  hours: number
  centimeters: number
  gramms: number
}

export const exercise21: Exercise<DATA> = {
  title: 'Einheiten umrechnen',
  source: '2021 Teil 1 Aufgabe 2',
  useCalculator: false,
  duration: 3,
  generator(rng) {
    return {
      hours: (rng.randomIntBetween(30, 60) * 5) / 100,
      centimeters: rng.randomIntBetween(100, 10000),
      gramms: rng.randomIntBetween(10000, 200000) / 10,
    }
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>Rechne die Größen in die angegebene Einheit um.</p>
        <p>Rechne Stunden in Sekunden um.</p>
        <p>{pp(data.hours)} h = ______ s</p>
        <p>Rechne Zentimeter in Meter um.</p>
        <p>{pp(data.centimeters)} cm = ______ m</p>
        <p>Rechne Gramm in Kilogramm um.</p>
        <p>{pp(data.gramms)}g = ______ kg</p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          <strong>Stunden (h) in Sekunden (s)</strong>
        </p>
        <p>
          1 Stunde entspricht 60 Minuten. 1 Minute entspricht 60 Sekunden. Damit
          entspricht 1 Stunde 60 · 60 = 3600 Sekunden. Damit sind:
        </p>{' '}
        {pp(data.hours)} h = {pp(data.hours)} · 3600 s
        <p>
          {pp(data.hours)} h = <strong>{pp(data.hours * 3600)} s</strong>
        </p>
        <p>
          <strong>Zentimeter (cm) in Meter (m)</strong>
        </p>
        <p>
          1 Zentimeter entspricht {buildInlineFrac(1, 100)} Meter. Damit sind:
        </p>
        {pp(data.centimeters)} cm = {pp(data.centimeters)} ·{' '}
        {buildInlineFrac(1, 100)} m
        <p>
          {pp(data.centimeters)} cm ={' '}
          <strong>{pp((data.centimeters * 1) / 100)} m</strong>
        </p>
        <p>
          <strong> Gramm (g) in Kilogramm (kg)</strong>
        </p>
        <p>
          1 Gramm entspricht {buildInlineFrac(1, 1000)} Kilogramm. Damit sind:
        </p>
        {pp(data.gramms)} g = {pp(data.gramms)} · {buildInlineFrac(1, 1000)} kg
        <p>
          {pp(data.gramms)} g ={' '}
          <strong>{pp((data.gramms * 1) / 1000)} kg</strong>
        </p>
      </>
    )
  },
}
