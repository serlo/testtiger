import { Exercise } from '@/data/types'
import { getGcd } from '@/helper/get-gcd'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
  d: number
  e: number
  f: number
  g: number
  h: number

  i: number
  j: number
}

export const exercise50: Exercise<DATA> = {
  title: 'Rechenaufgaben',
  source: '2024 Teil 1 Aufgabe 3',
  useCalculator: false,
  duration: 4,
  generator(rng) {
    return {
      a: rng.randomIntBetween(3, 8),
      b: rng.randomItemFromArray([4, 5, 10]),
      c: rng.randomIntBetween(12, 60),
      d: rng.randomIntBetween(1, 8) * 5,
      e: rng.randomIntBetween(12, 18) * 10,
      f: rng.randomIntBetween(-8, 8),
      g: rng.randomItemFromArray([2, 4, 5, 10]),
      h: rng.randomIntBetween(2, 6),
      i: rng.randomIntBetween(-8, 8),
      j: rng.randomItemFromArray([2, 4, 5, 6, 10, 15]),
    }
  },
  constraint({ data }) {
    return (
      Number.isInteger((data.a / data.b) * data.c) &&
      data.a < data.b &&
      data.f != 0 &&
      data.i != 0 &&
      !Number.isInteger(data.a / data.b) &&
      !Number.isInteger(data.i / data.j) &&
      !Number.isInteger(data.f / data.g)
    )
  },
  intro({ data }) {
    return (
      <>
        <p>Gib das Ergebnis an.</p>
      </>
    )
  },
  tasks: [
    {
      points: 1,
      task({ data }) {
        return (
          <>
            <p>
              a) {ppFrac(data.a / data.b)} von {data.c}
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Multipliziere die Zahlen, um den Anteil zu berechnen:</p>
            <p>
              {ppFrac(data.a / data.b)} · {data.c} = {ppFrac(data.a / data.b)} ·{' '}
              {buildInlineFrac(data.c, 1)}
            </p>
            <p>Kürze und berechne das Produkt:</p>
            <p>
              {ppFrac(data.a / data.b)} · {buildInlineFrac(data.c, 1)} ={' '}
              {ppFrac((data.a * data.c) / data.b)}
            </p>
          </>
        )
      },
    },
    {
      points: 1,
      task({ data }) {
        return (
          <>
            <p>
              b) {data.d} % von {data.e}
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Multipliziere die Zahlen, um den Anteil zu bestimmen. Rechne dazu
              die Prozentangabe in eine Dezimalzahl um:
            </p>
            <p>
              {data.d} % = {pp(data.d / 100)}
            </p>
            <p>
              {data.e} · {pp(data.d / 100)} = {pp((data.d * data.e) / 100)}
            </p>
          </>
        )
      },
    },
    {
      points: 1,
      task({ data }) {
        return (
          <>
            <p>
              c){' '}
              {data.f < 0 && (
                <span className="inline-block scale-y-[2.6]">(</span>
              )}
              {ppFrac(data.f / data.g)}
              {data.f < 0 && (
                <span className="inline-block scale-y-[2.6]">)</span>
              )}{' '}
              · {data.h} ·{' '}
              {data.i < 0 && (
                <span className="inline-block scale-y-[2.6]">(</span>
              )}
              {ppFrac(data.i / data.j)}
              {data.i < 0 && (
                <span className="inline-block scale-y-[2.6]">)</span>
              )}
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Nutze die Regeln für das Multiplizieren mit Brüchen. Als Hilfe
              kannst du die Zahl {data.h} als Bruch schreiben:{' '}
            </p>
            {data.f < 0 && (
              <span className="inline-block scale-y-[2.6]">(</span>
            )}
            {ppFrac(data.f / data.g)}
            {data.f < 0 && (
              <span className="inline-block scale-y-[2.6]">)</span>
            )}{' '}
            · {buildInlineFrac(data.h, 1)} ·{' '}
            {data.i < 0 && (
              <span className="inline-block scale-y-[2.6]">(</span>
            )}
            {ppFrac(data.i / data.j)}
            {data.i < 0 && (
              <span className="inline-block scale-y-[2.6]">)</span>
            )}
            <p>
              Multipliziere die Zähler miteinander und die Nenner miteinander.
              Achte auf das Vorzeichen des Produkts:
            </p>
            {data.f * data.i < 0 && '−'}
            {buildInlineFrac(
              Math.abs(data.f / Math.abs(getGcd(data.f, data.g))) +
                ' · ' +
                data.h +
                ' · ' +
                Math.abs(data.i / Math.abs(getGcd(data.i, data.j))),
              data.g / Math.abs(getGcd(data.f, data.g)) +
                ' · 1 · ' +
                data.j / Math.abs(getGcd(data.i, data.j)),
            )}{' '}
            = {ppFrac((data.f * data.h * data.i) / (data.g * data.j))}
            <p>Kürze das Ergebnis so weit wie möglich.</p>
          </>
        )
      },
    },
  ],
}
