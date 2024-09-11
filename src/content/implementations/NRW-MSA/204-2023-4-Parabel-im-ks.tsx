import { Exercise } from '@/data/types'

interface DATA {
  x_s: number
  y_s: number
  a: number
  correct_random: number
  sign: string
  sup: string
}

export const exercise204: Exercise<DATA> = {
  title: '2023 /4) Parabel im Koordinatensystem',
  useCalculator: false,
  duration: -3,

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
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
  subtasks: {
    tasks: [
      ({ data }) => {
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
          step: number
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
          0.1
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

            <p>
              a) Wähle, welche der angegebenen Funktionsgleichungen zu dem
              Graphen von f passt.
            </p>
            <p>
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
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>b) Begründe deine Auswahl.</p>
          </>
        )
      },
    ],
    solutions: [
      ({ data }) => {
        return (
          <>
            Der Funktionsterm lautet: f(x) = {data.a == 1 ? '' : '−'} (x{' '}
            {data.x_s > 0 ? '−' : '+'} {Math.abs(data.x_s)})²{' '}
            {data.y_s > 0 ? '+' : '−'} {Math.abs(data.y_s)}
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              Der Scheitel der Parabel liegt im Punkt S({data.x_s}
              {'|'}
              {data.y_s}). Dieser ist damit um {Math.abs(data.x_s)}{' '}
              {Math.abs(data.x_s) == 1 ? 'Einheit' : 'Einheiten'} nach{' '}
              {data.x_s > 0 ? 'rechts' : 'links'} und {data.y_s}{' '}
              {Math.abs(data.y_s) == 1 ? 'Einheit' : 'Einheiten'} nach{' '}
              {data.y_s > 0 ? 'oben' : 'unten'} verschoben.
            </p>
            <p>
              Zudem ist die Parabel nach {data.a == 1 ? 'oben' : 'unten'}{' '}
              geöffnet.
            </p>
            <p>
              Das entspricht dem Funktionsterm f(x) = {data.a == 1 ? '' : '−'}{' '}
              (x {data.x_s > 0 ? '−' : '+'} {Math.abs(data.x_s)})²{' '}
              {data.y_s > 0 ? '+' : '−'} {Math.abs(data.y_s)}
            </p>
          </>
        )
      },
    ],
  },
}
