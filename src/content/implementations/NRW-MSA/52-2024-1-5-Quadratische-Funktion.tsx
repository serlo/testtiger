import { Exercise } from '@/data/types'
import { buildEquation } from '@/helper/math-builder'
import { pp, ppPolynom } from '@/helper/pretty-print'

interface DATA {
  coeff: number
  x_sol: number
  x_input: number
}

export const exercise52: Exercise<DATA> = {
  title: 'Quadratische Funktion',
  source: '2024 Teil 1 Aufgabe 5',
  useCalculator: false,
  duration: 3,
  generator(rng) {
    return {
      x_input: rng.randomIntBetween(-3, 3),
      x_sol: rng.randomIntBetween(2, 8),
      coeff: rng.randomIntBetween(-6, 6),
    }
  },
  constraint({ data }) {
    return (
      data.x_input != 0 &&
      Math.abs(data.coeff) > 2 &&
      data.x_input != data.x_sol
    )
  },
  intro({ data }) {
    const y_offset = -data.coeff * data.x_sol * data.x_sol
    return (
      <>
        <p>
          Gegeben ist die Funktion f mit <br></br>f(x) ={' '}
          {ppPolynom([
            [data.coeff, 'x', 2],
            [y_offset, 'x', 0],
          ])}
        </p>
      </>
    )
  },
  tasks: [
    {
      points: 1,
      task({ data }) {
        return (
          <>
            <p>a) Berechne f({data.x_input})</p>
          </>
        )
      },
      solution({ data }) {
        const y_offset = -data.coeff * data.x_sol * data.x_sol

        return (
          <>
            <p>Setze den Wert in den Funktionsterm ein und fasse zusammen:</p>
            <p>
              f({data.x_input}) ={' '}
              {ppPolynom([
                [
                  data.coeff,
                  data.x_input < 0
                    ? ` · (${pp(data.x_input)})`
                    : ` · ${pp(data.x_input)}`,
                  2,
                ],
                [y_offset, 'x', 0],
              ])}
            </p>
            <p>
              f({data.x_input}) ={' '}
              {data.coeff * data.x_input * data.x_input + y_offset}
            </p>
          </>
        )
      },
    },
    {
      points: 1,
      task({ data }) {
        const y_offset = -data.coeff * data.x_sol * data.x_sol
        return (
          <>
            <p>
              b) Berechne die Lösung der Gleichung<br></br>{' '}
              {ppPolynom([
                [data.coeff, 'x', 2],
                [y_offset, 'x', 0],
              ])}{' '}
              = 0
            </p>
          </>
        )
      },
      solution({ data }) {
        const y_offset = -data.coeff * data.x_sol * data.x_sol
        const string =
          data.coeff < 0 ? ` (${pp(data.coeff)})` : ` ${pp(data.coeff)}`
        return (
          <>
            <p>Stelle die Gleichung um und löse nach den Werten für x:</p>
            {buildEquation([
              [
                data.coeff + 'x²' + pp(y_offset, 'merge_op'),
                '=',
                '0',
                '| ' + pp(-y_offset, 'merge_op'),
              ],
              [data.coeff + 'x²', '=', pp(-y_offset), '| : ' + string],
              ['x²', '=', pp(-y_offset / data.coeff), '| ±√ '],
            ])}
            <p>Die Lösungen sind:</p>
            <p>
              x<sub>1</sub> = {data.x_sol}
            </p>
            <p>
              x<sub>2</sub> = {pp(-data.x_sol)}
            </p>
          </>
        )
      },
    },
  ],
}
