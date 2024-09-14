import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  x: number
  y: number
  a: number
  b: number
  d: number

  faktor: number
}

export const exercise235: Exercise<DATA> = {
  title: '2019 /5) Lineares Gleichungssystem',
  useCalculator: false,
  duration: -3,
  generator(rng) {
    return {
      x: rng.randomIntBetween(1, 6),
      y: rng.randomIntBetween(1, 6),
      a: rng.randomIntBetween(2, 9),
      b: rng.randomIntBetween(3, 6),
      d: rng.randomIntBetween(3, 6),

      faktor: rng.randomIntBetween(2, 4),
    }
  },
  constraint({ data }) {
    return (
      data.b != data.d &&
      data.b * data.x - data.a * data.y != 0 &&
      data.d * data.x + data.faktor * data.a * data.y != 0 &&
      data.b * data.x - data.a * data.y !=
        data.d * data.x + data.faktor * data.a * data.y
    )
  },
  task({ data }) {
    const c = data.b * data.x - data.a * data.y
    const e = data.d * data.x + data.faktor * data.a * data.y
    return (
      <>
        <p>Löse das lineare Gleichungssystem. Notiere deinen Lösungsweg.</p>

        <p>
          I &nbsp;&nbsp; {data.b}x − {data.a}y = {c < 0 ? '−' : false}
          {c < 0 ? -c : c}
        </p>
        <p>
          II &nbsp; {data.d}x + {data.faktor * data.a}y = {e < 0 ? '−' : false}
          {e < 0 ? -e : e}
        </p>
      </>
    )
  },
  solution({ data }) {
    const c = data.b * data.x - data.a * data.y
    const e = data.d * data.x + data.faktor * data.a * data.y
    return (
      <>
        <p>Multipliziere die erste Gleichung mit dem Faktor {data.faktor}:</p>
        <p>
          {data.faktor} · I: &nbsp;&nbsp; {data.faktor * data.b}x −{' '}
          {data.faktor * data.a}y = {c < 0 ? '−' : false}
          {c < 0 ? -data.faktor * c : data.faktor * c}
        </p>
        <p>
          II: &nbsp; {data.d}x + {data.faktor * data.a}y = {e < 0 ? '−' : false}
          {e < 0 ? -e : e}
        </p>
        <p>Addiere die Gleichungen 4I+II:</p>
        <p>
          {data.faktor * data.b}x + {data.d}x = {c < 0 ? '−' : false}
          {c < 0 ? -data.faktor * c : data.faktor * c} + {e < 0 ? '(− ' : false}
          {e < 0 ? -e : e}
          {e < 0 ? ')' : false}
        </p>
        <p>Fasse die Terme zusammen:</p>
        <p>
          {data.faktor * data.b + data.d}x = {pp(data.faktor * c + e)}
        </p>
        <p>{data.x != 1 ? 'Löse die Gleichung nach x:' : false}</p>
        <p>{data.x != 1 ? 'x = ' + data.x : false}</p>
        <p>
          Setze den Wert für x in eine der Gleichungen ein. x in I eingesetzt
          liefert:
        </p>
        <p>
          {data.b} · {data.x} − {data.a} · y = {c < 0 ? '−' : false}
          {c < 0 ? -c : c}
        </p>
        <p>Vereinfache die Gleichung und löse nach y.</p>
        <p>
          {data.b} · {data.x} = {c < 0 ? '−' : false}
          {c < 0 ? -c : c} + {data.a} · y
        </p>
        <p>
          {data.b} · {data.x} {c < 0 ? '+ ' : false}
          {c > 0 ? '− ' : false}
          {Math.abs(c)} = {data.a} · y
        </p>
        <p>
          {data.a * data.y} = {data.a} · y
        </p>
        <p>y = {data.y}</p>
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
