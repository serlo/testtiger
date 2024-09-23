import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  x: number
  y: number
  a: number
  b: number
  d: number
  b_b: number
  m_b: number
  b_2_b: number
}

export const exercise27: Exercise<DATA> = {
  title: 'Lineares Gleichungssystem',
  source: '2021 Variante 2 / 4',
  useCalculator: false,
  duration: 3,
  generator(rng) {
    return {
      x: rng.randomIntBetween(1, 8),
      y: rng.randomIntBetween(1, 8),
      a: rng.randomIntBetween(2, 9),
      b: rng.randomIntBetween(3, 6),
      d: rng.randomIntBetween(3, 6),
      b_b: rng.randomItemFromArray([
        -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8,
      ]),
      m_b: rng.randomItemFromArray([-5, -4, -3, -2, 2, 3, 4, 5, 6, 7, 8]),
      b_2_b: rng.randomItemFromArray([
        -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8,
      ]),
    }
  },
  constraint({ data }) {
    return (
      data.b != data.d &&
      data.b * data.x - data.a * data.y != 0 &&
      data.d * data.x + data.a * data.y != 0 &&
      data.b * data.x - data.a * data.y != data.d * data.x + data.a * data.y &&
      data.b_b != data.b_2_b
    )
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
  subtasks: {
    intro: ({ data }) => {
      return <></>
    },
    tasks: [
      ({ data }) => {
        const c = data.b * data.x - data.a * data.y
        const e = data.d * data.x + data.a * data.y
        return (
          <>
            <p>Löse das lineare Gleichungssystem.</p>

            <p>Notiere deinen Lösungsweg.</p>

            <p>
              I &nbsp;&nbsp; {data.b}x − {data.a}y = {c < 0 ? '−' : false}
              {c < 0 ? -c : c}
            </p>
            <p>
              II &nbsp; {data.d}x + {data.a}y = {e < 0 ? '−' : false}
              {e < 0 ? -e : e}
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              Ergänze den fehlenden Wert in Gleichung I so, dass das angegebene
              Gleichungssystem keine Lösung hat. Begründe deine Entscheidung.{' '}
            </p>
            <p>
              <br></br>I:&nbsp;&nbsp;y = ___ x{' '}
              {data.b_b < 0 ? pp(data.b_b) : '+ ' + data.b_b}
              <br></br>II:&nbsp;&nbsp;y = {data.m_b}x{' '}
              {data.b_2_b < 0 ? pp(data.b_2_b) : '+ ' + data.b_2_b}
            </p>
          </>
        )
      },
    ],
    solutions: [
      ({ data }) => {
        const c = data.b * data.x - data.a * data.y
        const e = data.d * data.x + data.a * data.y
        return (
          <>
            <p>
              <p>Addiere die Gleichungen I+II:</p>
              <p>
                {data.b}x + {data.d}x = {c < 0 ? '−' : false}
                {c < 0 ? -c : c} + {e < 0 ? '(− ' : false}
                {e < 0 ? -e : e}
                {e < 0 ? ')' : false}
              </p>
              <p>Fasse die Terme zusammen:</p>
              <p>
                {data.b + data.d}x = {pp(c + e)}
              </p>
              <p>{data.x != 1 ? 'Löse die Gleichung nach x:' : false}</p>
              <p>{data.x != 1 ? 'x = ' + data.x : false}</p>
              <p>
                Setze den Wert für x in eine der Gleichungen ein. x in I
                eingesetzt liefert:
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
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p></p>
          </>
        )
      },
    ],
  },
}
