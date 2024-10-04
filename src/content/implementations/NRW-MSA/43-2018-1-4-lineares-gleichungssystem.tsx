import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  x: number
  y: number
  a: number
  b: number
  d: number
}

export const exercise43: Exercise<DATA> = {
  title: 'Lineares Gleichungssystem',
  source: '2018 Teil 1 Aufgabe 4',
  useCalculator: false,
  duration: 3,
  generator(rng) {
    return {
      x: rng.randomIntBetween(1, 6),
      y: rng.randomIntBetween(1, 6),
      a: rng.randomIntBetween(2, 9),
      b: rng.randomIntBetween(3, 6),
      d: rng.randomIntBetween(3, 6),
    }
  },
  constraint({ data }) {
    return (
      data.b != data.d &&
      data.b * data.x - data.a * data.y != 0 &&
      data.d * data.x + data.a * data.y != 0 &&
      data.b * data.x - data.a * data.y != data.d * data.x + data.a * data.y
    )
  },
  task({ data }) {
    const c = data.b * data.x - data.a * data.y
    const e = data.d * data.x + data.a * data.y
    return (
      <>
        <p>Löse das lineare Gleichungssystem. Notiere deinen Lösungsweg.</p>

        <p>
          I &nbsp;&nbsp; {data.b}x − {data.a}y = {pp(c)}
        </p>
        <p>
          II &nbsp; {data.d}x + {data.a}y = {pp(e)}
        </p>
      </>
    )
  },
  solution({ data }) {
    const c = data.b * data.x - data.a * data.y
    const e = data.d * data.x + data.a * data.y
    return (
      <>
        <p>
          Die Terme {'"'}− {data.a}y{'"'} und {'"'}
          {data.a}y{'"'} haben entgegengesetzte Vorzeichen. Addiere die
          Gleichungen I+II, um diesen Term aus den Gleichungen zu eliminieren:
        </p>
        <p>
          {data.b}x + {data.d}x = {pp(c)} + {pp(e, 'embrace_neg')}
        </p>
        <p>Fasse die Terme zusammen:</p>
        <p>
          {data.b + data.d}x = {pp(c + e)}
        </p>
        {data.b + data.d !== 1 && (
          <>
            <p>Löse die Gleichung nach x:</p>
            <p>x = {data.x}</p>
          </>
        )}
        <p>
          Setze den Wert für x in eine der Gleichungen ein. x in I eingesetzt
          liefert:
        </p>
        <p>
          {data.b} · {data.x} − {data.a} · y = {pp(c)}
        </p>
        <p>Vereinfache die Gleichung und löse nach y.</p>
        <p>
          {data.b * data.x} = {pp(c)} + {data.a} · y
        </p>
        <p>
          {data.b * data.x} {pp(-c, 'merge_op')} = {data.a} · y
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
