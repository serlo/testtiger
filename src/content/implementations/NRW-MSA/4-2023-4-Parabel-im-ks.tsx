import { Exercise } from '@/data/types'
import { pp, ppPolynom } from '@/helper/pretty-print'

interface DATA {
  x_s: number
  y_s: number
  a: number
  correct_random: number
  sign: string
  order: Array<number>
}

export const exercise4: Exercise<DATA> = {
  title: 'Parabel im Koordinatensystem',
  source: '2023 Teil 1 Aufgabe 4',
  useCalculator: false,
  duration: 2,

  generator(rng) {
    return {
      x_s: rng.randomIntBetween(-1, 8),
      y_s: rng.randomIntBetween(-1, 6),
      a: rng.randomItemFromArray([1, 1, -1]),
      correct_random: rng.randomIntBetween(1, 3),
      sign: rng.randomItemFromArray([' ', '−']),
      order: rng.shuffleArray([0, 1, 2]),
    }
  },
  originalData: {
    x_s: 2,
    y_s: 3,
    a: 1,
    correct_random: 3,
    sign: ' ',
    order: [0, 1, 2],
  },
  constraint({ data }) {
    return data.x_s != 0 && data.y_s != 0
  },
  intro({ data }) {
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
            href="/content/NRW_MSA/KS_groß_Vorlage.png"
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
  tasks: [
    {
      points: 1,
      duration: 1,
      task({ data }) {
        const options = [
          <>
            f(x) = {data.a == -1 && '−'}(x {pp(-data.x_s, 'merge_op')}
            )²{pp(data.y_s, 'merge_op')}
          </>,
          <>
            f(x) = {data.a == 1 && '−'}(x {pp(data.x_s, 'merge_op')}
            )²{pp(data.y_s, 'merge_op')}
          </>,
          <>
            f(x) = {data.a == -1 && '−'}(x {pp(-data.x_s, 'merge_op')}
            )²{pp(-data.y_s, 'merge_op')}
          </>,
        ]
        const options_shuffled = data.order.map(i => options[i])
        return (
          <>
            <p>
              a) Wähle, welche der angegebenen Funktionsgleichungen zu dem
              Graphen von f passt.
            </p>

            <ul>
              <li>{options_shuffled[0]}</li>
              <li>{options_shuffled[1]}</li>
              <li>{options_shuffled[2]}</li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const options = [
          <>
            f(x) = {data.a == -1 && '−'}(x {pp(-data.x_s, 'merge_op')}
            )²{pp(data.y_s, 'merge_op')}
          </>,
          <>
            f(x) = {data.a == 1 && '−'}(x {pp(data.x_s, 'merge_op')}
            )²{pp(data.y_s, 'merge_op')}
          </>,
          <>
            f(x) = {data.a == -1 && '−'}(x {pp(-data.x_s, 'merge_op')}
            )²{pp(-data.y_s, 'merge_op')}
          </>,
        ]
        return (
          <>
            <ul>
              <li>
                Bestimme die Position des Scheitels aus der Abbildung: S(
                {data.x_s}|{data.y_s})
              </li>
              <li>
                Da die Parabel nach {data.a == 1 ? 'oben' : 'unten'} geöffnet
                ist, ist der Faktor vor der Klammer{' '}
                {data.a == 1 ? 'positiv' : 'negativ'}.
              </li>
            </ul>

            <p>
              Zusammengesetzt lautet der richtige Funktionsterm: <br></br>
              <strong>{options[0]}</strong>
            </p>
            <p>
              Achte darauf, dass die x-Koordinate des Scheitelpunkts mit
              umgekehrtem Vorzeichen in der Scheitelform auftaucht.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 2,
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
                <strong> {pp(-data.x_s, 'merge_op')}</strong>)² im Funktionsterm{' '}
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
}
