import { Exercise } from '@/data/types'
import { buildEquation } from '@/helper/math-builder'
import { pp, ppFrac, ppPolynom } from '@/helper/pretty-print'

interface DATA {
  a_1: number
  c_1: number
  d_2: number
  e_2: number
  b_3: number
  c_3: number
  order: number[]
  color: string[]
  y: number
}

export const exercise209: Exercise<DATA> = {
  title: 'Parabeln',
  source: '2024 Pflichtteil A2 Aufgabe 3',
  useCalculator: true,
  duration: 6,
  points: 3.5,
  generator(rng) {
    return {
      a_1: rng.randomItemFromArray([-0.5, -1, 1, 0.5]),
      c_1: rng.randomItemFromArray([-1, 1, 2, 3, 4]),
      d_2: rng.randomItemFromArray([-2, -1, 1, 2, 3, 4]),
      e_2: rng.randomItemFromArray([-2, -1, 1, 2, 3, 4]),
      b_3: rng.randomItemFromArray([-2, -1, 1, 2, 3, 4]),
      c_3: rng.randomItemFromArray([1, 2, 3, 4]),
      order: rng.shuffleArray([0, 1, 2]),
      color: rng.shuffleArray(['orange', 'blue', 'green']),
      y: rng.randomItemFromArray([-2, -1, 1, 2, 3, 4, 5]),
    }
  },
  originalData: {
    a_1: -0.5,
    y: 2,
    c_1: 3,
    d_2: -3,
    e_2: 3,
    b_3: 4,
    c_3: 5,
    order: [0, 1, 2],
    color: ['orange', 'blue', 'green'],
  },
  constraint({ data }) {
    return data.y != data.e_2
  },
  task({ data }) {
    function toX(n: number) {
      return 163 + n * 32.8
    }
    function toY(n: number) {
      return 182 - n * 32.8
    }
    const listItems = [
      <li key="1">
        y ={' '}
        {ppPolynom([
          [data.a_1, 'x', 2],
          [data.c_1, 'x', 0],
        ])}
      </li>,
      <li key="2">y = (x {pp(-data.d_2, 'merge_op')})² + e</li>,
      <li key="3">
        y ={' '}
        {ppPolynom([
          [1, 'x', 2],
          [data.b_3, 'x', 1],
          [data.c_3, 'x', 0],
        ])}
      </li>,
    ]
    const shuffledItems = data.order.map(i => listItems[i])
    function generateParabolaPoints1(): string {
      let points = ''
      for (let x = -6; x <= 6; x += 0.1) {
        const y = data.a_1 * x * x + data.c_1
        points += `${toX(x)},${toY(y)} `
      }
      return points.trim()
    }
    function generateParabolaPoints2(): string {
      let points = ''
      for (let x = -6; x <= 6; x += 0.1) {
        const y = (x - data.d_2) * (x - data.d_2) + data.e_2
        points += `${toX(x)},${toY(y)} `
      }
      return points.trim()
    }
    function generateParabolaPoints3(): string {
      let points = ''
      for (let x = -6; x <= 6; x += 0.1) {
        const y = x * x + data.b_3 * x + data.c_3
        points += `${toX(x)},${toY(y)} `
      }
      return points.trim()
    }
    const parabolaPoints1 = generateParabolaPoints1()
    const parabolaPoints2 = generateParabolaPoints2()
    const parabolaPoints3 = generateParabolaPoints3()
    return (
      <>
        <p>Gegeben sind drei Funktionsgleichungen und drei Graphen.</p>
        <ol>{shuffledItems}</ol>
        <svg viewBox="0 0 328 250">
          <image
            href="/content/NRW_MSA/NRW_MSA_KS_Vorlage.png"
            height="250"
            width="328"
          />
          <polyline
            points={parabolaPoints1}
            stroke={data.color[0]}
            strokeWidth="2"
            fill="none"
          />
          <polyline
            points={parabolaPoints2}
            stroke={data.color[1]}
            strokeWidth="2"
            fill="none"
          />
          <polyline
            points={parabolaPoints3}
            stroke={data.color[2]}
            strokeWidth="2"
            fill="none"
          />
        </svg>
        <ul>
          <li>
            Welcher Graph gehört zu welcher Funktionsgleichung? Begründe deine
            Entscheidung.
          </li>
          <li>Bestimme den Wert für e mithilfe des Schaubildes.</li>
        </ul>
        <p>
          Die Gerade g verläuft durch den Scheitelpunkt S von der{' '}
          {data.color[1] == 'blue' && (
            <span className="text-blue-500">blauen</span>
          )}
          {data.color[1] == 'orange' && (
            <span className="text-orange-500">orangen</span>
          )}
          {data.color[1] == 'green' && (
            <span className="text-green-500">grünen</span>
          )}{' '}
          Parabel und durch den Punkt P(0|{pp(data.y)}).
        </p>
        <ul>
          <li>Bestimme die Funktionsgleichung der Geraden g.</li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    const listItems = [
      <li key="1">
        y ={' '}
        {ppPolynom([
          [data.a_1, 'x', 2],
          [data.c_1, 'x', 0],
        ])}
      </li>,
      <li key="2">y = (x {pp(-data.d_2, 'merge_op')})² + e</li>,
      <li key="3">
        y ={' '}
        {ppPolynom([
          [1, 'x', 2],
          [data.b_3, 'x', 1],
          [data.c_3, 'x', 0],
        ])}
      </li>,
    ]
    return (
      <>
        <p>
          <strong>Richtige Zuordnung</strong>
          {listItems[0]} gehört zur{' '}
          {data.color[0] == 'blue' && (
            <span className="text-blue-500">blauen</span>
          )}
          {data.color[0] == 'orange' && (
            <span className="text-orange-500">orangen</span>
          )}
          {data.color[0] == 'green' && (
            <span className="text-green-500">grünen</span>
          )}{' '}
          Parabel.
        </p>
        <p>
          {listItems[1]} gehört zur{' '}
          {data.color[1] == 'blue' && (
            <span className="text-blue-500">blauen</span>
          )}
          {data.color[1] == 'orange' && (
            <span className="text-orange-500">orangen</span>
          )}
          {data.color[1] == 'green' && (
            <span className="text-green-500">grünen</span>
          )}{' '}
          Parabel.
        </p>
        <p>
          {listItems[2]} gehört zur{' '}
          {data.color[2] == 'blue' && (
            <span className="text-blue-500">blauen</span>
          )}
          {data.color[2] == 'orange' && (
            <span className="text-orange-500">orangen</span>
          )}
          {data.color[2] == 'green' && (
            <span className="text-green-500">grünen</span>
          )}{' '}
          Parabel.
        </p>
        <p>
          <strong>Wert von e</strong>
        </p>
        <p>
          e ist die y-Koordinate des Scheitels von der{' '}
          {data.color[1] == 'blue' && (
            <span className="text-blue-500">blauen</span>
          )}
          {data.color[1] == 'orange' && (
            <span className="text-orange-500">orangen</span>
          )}
          {data.color[1] == 'green' && (
            <span className="text-green-500">grünen</span>
          )}{' '}
          Parabel. Bestimme e anhand des Graphen:
        </p>
        <p>
          <strong>e = {pp(data.e_2)}</strong>
        </p>
        <p>
          <strong>Gerade durch den Scheitelpunkt</strong>
        </p>
        <p>
          Die Gerade verläuft durch den Punkt <br></br>P(0|{pp(data.y)}) und den
          Scheitelpunkt S({pp(data.d_2)}|{pp(data.e_2)}).
        </p>
        <p>
          Aus dem Punkt P(0|{pp(data.y)}) ergibt sich der y-Achsenabschnitt:
        </p>
        <p>y = mx {pp(data.y, 'merge_op')}</p>
        <p>Setze den Punkt S ein und bestimme die Steigung m:</p>
        {buildEquation([
          [<>y</>, <>=</>, <>mx {pp(data.y, 'merge_op')}</>],
          [
            <>{pp(data.e_2)}</>,
            <>=</>,
            <>
              {pp(data.d_2)} m {pp(data.y, 'merge_op')}
            </>,
            <>| {pp(-data.y, 'merge_op')}</>,
          ],
          [
            <>{pp(data.e_2 - data.y)}</>,
            <>=</>,
            <>{pp(data.d_2)} m</>,
            <>| : {pp(data.d_2)}</>,
          ],
          [<>m</>, <>=</>, <>{ppFrac((data.e_2 - data.y) / data.d_2)}</>],
        ])}
        <p>
          Damit ist die Gerade: y ={' '}
          {((data.e_2 - data.y) / data.d_2) % 1 == 0 ? (
            <>{ppPolynom([[(data.e_2 - data.y) / data.d_2, 'x', 1]])}</>
          ) : (
            <>{ppFrac((data.e_2 - data.y) / data.d_2)} x</>
          )}{' '}
          {pp(data.y, 'merge_op')}
        </p>
      </>
    )
  },
}
