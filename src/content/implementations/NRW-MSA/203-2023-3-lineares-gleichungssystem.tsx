import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  x: number
  y: number
  a: number
  b: number
  d: number
}

export const exercise203: Exercise<DATA> = {
  title: '2023 /3) Lineares Gleichungssystem',
  useCalculator: false,
  duration: -3,
  generator(rng) {
    return {
      x: rng.randomIntBetween(1, 8),
      y: rng.randomIntBetween(1, 8),
      a: rng.randomIntBetween(2, 9),
      b: rng.randomIntBetween(3, 6),
      d: rng.randomIntBetween(3, 6),
    }
  },
  constraint({ data }) {
    return (
      data.b != data.d &&
      data.a * data.x - data.b * data.y != 0 &&
      data.a * data.x - data.d * data.y != 0 &&
      data.a * data.x - data.d * data.y != data.a * data.x - data.b * data.y
    )
  },
  task({ data }) {
    const c = data.a * data.x - data.b * data.y
    const e = data.a * data.x - data.d * data.y
    return (
      <>
        <p>Löse das lineare Gleichungssystem.</p>

        <p>Notiere deinen Lösungsweg.</p>

        <p>
          I &nbsp;&nbsp; {data.a}x − {data.b}y = {pp(c)}
        </p>
        <p>
          II &nbsp; {data.a}x − {data.d}y = {pp(e)}
        </p>
      </>
    )
  },
  solution({ data }) {
    const c = data.a * data.x - data.b * data.y
    const e = data.a * data.x - data.d * data.y
    return (
      <>
        <p>Subtrahiere die Gleichungen I-II:</p>
        <p>
          − {data.b}y − (− {data.d}y) = {c < 0 ? '−' : false}
          {c < 0 ? -c : c} − {e < 0 ? '(− ' : false}
          {e < 0 ? -e : e}
          {e < 0 ? ')' : false}
        </p>
        <p>Fasse die Terme zusammen:</p>
        <p>
          {Math.abs(-data.b + data.d) == 1 ? '' : -data.b + data.d}
          {-data.b + data.d == -1 ? '−' : false}y = {c - e}
        </p>
        <p>{data.y != 1 ? 'Löse die Gleichung nach y:' : false}</p>
        <p>{data.y != 1 ? 'y = ' + data.y : false}</p>
        <p>
          Setze den Wert für y in eine der Gleichungen ein. y in I eingesetzt
          liefert:
        </p>
        <p>
          {data.a}x − {data.b} · {data.y} = {c < 0 ? '−' : false}
          {c < 0 ? -c : c}
        </p>
        <p>Vereinfache die Gleichung und löse nach x.</p>
        <p>
          {data.a}x = {c < 0 ? '−' : false}
          {c < 0 ? -c : c} + {data.b} · {data.y}
        </p>
        <p>
          {data.a}x = {c + data.b * data.y < 0 ? '− ' : false}
          {c + data.b * data.y < 0
            ? -1 * (c + data.b * data.y)
            : c + data.b * data.y}
        </p>
        <p>x = {data.x}</p>
        <p>
          <br></br>
          Die Lösungsmenge des Gleichungssystems ist {'L={('}
          {data.x}; {data.y}
          {')}'}
        </p>
      </>
    )
  },
}
