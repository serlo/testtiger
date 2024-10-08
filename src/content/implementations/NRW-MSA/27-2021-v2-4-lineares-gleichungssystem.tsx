import { Exercise } from '@/data/types'
import { Color1 } from '@/helper/colors'
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
  source: '2021 Teil 1 Aufgabe 4 (Variante 2)',
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
  intro({ data }) {
    return <></>
  },
  tasks: [
    {
      points: 3,
      task({ data }) {
        const c = data.b * data.x - data.a * data.y
        const e = data.d * data.x + data.a * data.y
        return (
          <>
            <p>a) Löse das lineare Gleichungssystem.</p>

            <p>Notiere deinen Lösungsweg.</p>

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
              <p>
                Die Terme {'"'}− {data.a}y{'"'} und {'"'}
                {data.a}y{'"'} haben entgegengesetzte Vorzeichen. Addiere die
                Gleichungen I+II, um diesen Term aus den Gleichungen zu
                eliminieren:
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
                Setze den Wert für x in eine der Gleichungen ein. x in I
                eingesetzt liefert:
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
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>
              b) Ergänze den fehlenden Wert in Gleichung I so, dass das
              angegebene Gleichungssystem keine Lösung hat. Begründe deine
              Entscheidung.{' '}
            </p>
            <p>
              <br></br>I:&nbsp;&nbsp;&nbsp;y = ___ x {pp(data.b_b, 'merge_op')}
              <br></br>II:&nbsp;&nbsp;y = {data.m_b}x{' '}
              {pp(data.b_2_b, 'merge_op')}
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              {' '}
              Die Gleichungen I und II sind zwei Geradengleichungen. Wenn die
              Geraden parallel verlaufen, gibt es keinen Schnittpunkt und damit
              keine Lösung des Gleichungssystems. Setze für Gerade I die gleiche
              Steigung wie in Gerade II ein:
            </p>
            <p>
              I:&nbsp;&nbsp;&nbsp;y = <Color1>{data.m_b}</Color1>x{' '}
              {pp(data.b_b, 'merge_op')}
              <br></br>II:&nbsp;&nbsp;y = {data.m_b}x{' '}
              {pp(data.b_2_b, 'merge_op')}
            </p>
            <p>
              Das Gleichungssystem hat also keine Lösung, wenn du als fehlenden
              Wert <Color1>{data.m_b}</Color1> einsetzt.
            </p>
          </>
        )
      },
    },
  ],
}
