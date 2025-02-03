import { Exercise } from '@/data/types'
import { pp, ppFrac } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
  d: number
}

export const exercise100: Exercise<DATA> = {
  title: 'Zahlenstrahl',
  source: '2021 Teil 1 Aufgabe 1',
  useCalculator: false,
  duration: 6,
  points: 3,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 9) / 10,
      b: rng.randomIntBetween(1, 9),
      c: rng.randomIntBetween(1, 9) / 10,
      d: rng.randomIntBetween(11, 20) / 10,
    }
  },
  originalData: { a: 0.4, b: 6, c: 0.8, d: 1.8 },
  learningPathData: { a: 0.8, b: 4, c: 0.5, d: 1.2 },
  constraint({ data }) {
    return data.a - data.c > 0.4 && data.a != data.c && data.b != data.c
  },

  task({ data }) {
    return (
      <>
        <p>Markiere die Zahlen auf dem Zahlenstrahl.</p>
        <p>
          {pp(data.a)}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {ppFrac([data.b, 10])}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {pp(data.d)}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {ppFrac(data.c)}
        </p>
        <svg viewBox="0 0 328 40">
          <image
            href="/content/NRW_EESA/100_Zahlenstrahl.png"
            height="40"
            width="328"
          />
        </svg>
      </>
    )
  },
  solution({ data }) {
    function toX(n: number) {
      return 14.7 + n * 135
    }

    return (
      <>
        <p>
          Wandle die Brüche in Dezimalzahlen um und markiere die Zahlen auf dem
          Zahlenstrahl.
        </p>
        <svg viewBox="0 0 328 110">
          <image
            href="/content/NRW_EESA/100_Zahlenstrahl.png"
            height="110"
            width="328"
          />
          <text
            x={toX(data.a)}
            y={56}
            fontSize={15}
            textAnchor="middle"
            stroke="blue"
          >
            ×
          </text>
          <text
            x={toX(data.a)}
            y={73}
            fontSize={14}
            textAnchor="middle"
            stroke="blue"
            strokeWidth={0.1}
          >
            {pp(data.a)}
          </text>
          <text
            x={toX(data.b / 10)}
            y={56}
            fontSize={15}
            textAnchor="middle"
            stroke="blue"
          >
            ×
          </text>
          <foreignObject x={toX(data.b / 10) - 12} y="0" width={60} height={50}>
            <div style={{ fontSize: '12px', color: 'blue' }}>
              {ppFrac([data.b, 10])} = {pp(data.b / 10)}
            </div>
          </foreignObject>
          <text
            x={toX(data.d)}
            y={56}
            fontSize={15}
            textAnchor="middle"
            stroke="blue"
          >
            ×
          </text>
          <text
            x={toX(data.d)}
            y={73}
            fontSize={14}
            textAnchor="middle"
            stroke="blue"
            strokeWidth={0.1}
          >
            {pp(data.d)}
          </text>
          <text
            x={toX(data.c)}
            y={56}
            fontSize={15}
            textAnchor="middle"
            stroke="blue"
          >
            ×
          </text>
          <foreignObject x={toX(data.c) - 12} y="55" width={60} height={50}>
            <div style={{ fontSize: '12px', color: 'blue' }}>
              {ppFrac(data.c)} = {pp(data.c)}
            </div>
          </foreignObject>
        </svg>
      </>
    )
  },
}
