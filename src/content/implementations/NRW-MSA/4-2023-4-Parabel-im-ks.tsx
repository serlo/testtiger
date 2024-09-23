import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  x_s: number
  y_s: number
  a: number
  correct_random: number
  sign: string
  sup: string
}

export const exercise4: Exercise<DATA> = {
  title: 'Parabel im Koordinatensystem',
  source: '2023 / 4',
  useCalculator: false,
  duration: 2,

  generator(rng) {
    return {
      x_s: rng.randomIntBetween(-1, 8),
      y_s: rng.randomIntBetween(-1, 6),
      a: rng.randomItemFromArray([1, 1, -1]),
      correct_random: rng.randomIntBetween(1, 3),
      sign: rng.randomItemFromArray([' ', '−']),
      sup: rng.randomItemFromArray(['2', '2', '2', '3']),
    }
  },
  constraint({ data }) {
    return data.x_s != 0 && data.y_s != 0
  },
  subtasks: {
    intro: ({ data }) => {
      function toX(n: number) {
        return 109 + n * 35.714
      }
      function toY(n: number) {
        return 333 - n * 35.714
      }
      function generateParabolaPoints(
        a: number,
        b: number,
        c: number,
        step: number,
      ): string {
        let points = ''
        for (let x = -4; x <= 11; x += step) {
          const y = a * (x - b) * (x - b) + c
          points += `${toX(x)},${toY(y)} `
        }
        return points.trim()
      }
      const parabolaPoints = generateParabolaPoints(
        data.a,
        data.x_s,
        data.y_s,
        0.1,
      )
      return (
        <>
          <svg viewBox="0 0 500 450" className="max-w-[500px]">
            <image
              href="/content/KS_groß_Vorlage.png"
              width="500"
              height="450"
            />
            <polyline
              points={parabolaPoints}
              stroke="blue"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </>
      )
    },
    main: [
      {
        task({ data }) {
          return (
            <>
              <p>
                a) Wähle, welche der angegebenen Funktionsgleichungen zu dem
                Graphen von f passt.
              </p>
              <ul>
                <li>
                  f(x) = {data.correct_random == 1 && data.a == 1 ? '' : '−'}(x{' '}
                  {data.correct_random == 1 && data.x_s > 0 ? '−' : '+'}{' '}
                  {Math.abs(data.x_s)})
                  <sup>{data.correct_random == 1 ? '2' : data.sup}</sup>
                  {data.correct_random == 1 && data.y_s > 0 ? '+' : '+'}
                  {Math.abs(data.y_s)}
                </li>
                <li>
                  f(x) = {data.correct_random == 2 && data.a == 1 ? '' : '−'}(x{' '}
                  {data.correct_random == 2 && data.x_s > 0 ? '−' : '+'}{' '}
                  {Math.abs(data.x_s)})
                  <sup>{data.correct_random == 2 ? '2' : 2}</sup>
                  {data.correct_random == 2 && data.y_s > 0 ? '+' : '−'}
                  {Math.abs(data.y_s)}
                </li>
                <li>
                  f(x) = {data.correct_random == 3 && data.a == 1 ? '' : ' '}(x{' '}
                  {data.correct_random == 3 && data.x_s > 0 ? '−' : '+'}{' '}
                  {Math.abs(data.x_s)})
                  <sup>{data.correct_random == 3 ? '2' : data.sup}</sup>
                  {data.correct_random == 3 && data.y_s > 0 ? '+' : '−'}
                  {Math.abs(data.y_s)}
                </li>
              </ul>
            </>
          )
        },
        solution({ data }) {
          return (
            <>
              <p>
                Der Funktionsterm lautet: f(x) = {data.a == 1 ? '' : '−'} (x{' '}
                {pp(data.x_s, 'merge_op')})<sup>2</sup>{' '}
                {pp(data.y_s, 'merge_op')}
              </p>
            </>
          )
        },
      },
      {
        task({ data }) {
          return (
            <>
              <p>b) Begründe deine Auswahl.</p>
            </>
          )
        },
        solution({ data }) {
          return (
            <>
              <p>
                Der Scheitel der Parabel liegt im Punkt S({data.x_s}|{data.y_s}
                ). Dieser ist damit um {Math.abs(data.x_s)}{' '}
                {Math.abs(data.x_s) == 1 ? 'Einheit' : 'Einheiten'} nach{' '}
                {data.x_s > 0 ? 'rechts' : 'links'} und {data.y_s}{' '}
                {Math.abs(data.y_s) == 1 ? 'Einheit' : 'Einheiten'} nach{' '}
                {data.y_s > 0 ? 'oben' : 'unten'} verschoben.
              </p>
              <ul>
                <li>
                  Verschiebung um {Math.abs(data.x_s)}{' '}
                  {Math.abs(data.x_s) == 1 ? 'Einheit' : 'Einheiten'} nach{' '}
                  {data.x_s > 0 ? 'rechts' : 'links'}:<br></br> (x
                  <strong> {pp(-data.x_s, 'merge_op')}</strong>)² im
                  Funktionsterm{' '}
                </li>
                <li>
                  Verschiebung um {Math.abs(data.y_s)}{' '}
                  {Math.abs(data.y_s) == 1 ? 'Einheit' : 'Einheiten'} nach{' '}
                  {data.y_s > 0 ? 'oben' : 'unten'}:<br></br> (x{' '}
                  {pp(-data.x_s, 'merge_op')})²{' '}
                  <strong>{pp(data.y_s, 'merge_op')}</strong> im Funktionsterm{' '}
                </li>
              </ul>
              <p>
                Zudem ist die Parabel nach {data.a == 1 ? 'oben' : 'unten'}{' '}
                geöffnet, weil das Vorzeichen{' '}
                {data.a == 1 ? 'positiv' : 'negativ'} ist.
              </p>
              <p>
                Das entspricht dem Funktionsterm <br></br>f(x) ={' '}
                {data.a == 1 ? '' : '−'} (x {pp(-data.x_s, 'merge_op')})²{' '}
                {pp(data.y_s, 'merge_op')}
              </p>
            </>
          )
        },
      },
    ],
  },
}
