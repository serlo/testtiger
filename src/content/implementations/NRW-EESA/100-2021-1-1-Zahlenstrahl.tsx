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
  duration: 42,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 9) / 10,
      b: rng.randomIntBetween(1, 9) / 10,
      c: rng.randomIntBetween(1, 9) / 10,
      d: rng.randomIntBetween(11, 20) / 10,
    }
  },
  originalData: { a: 0.4, b: 0.6, c: 1.8, d: 0.8 },
  constraint({ data }) {
    return data.a - data.c > 0.2 && data.a != data.c && data.b != data.c
  },

  task({ data }) {
    return (
      <>
        <p>Markiere die Zahlen auf dem Zahlenstrahl.</p>
        <p>
          {pp(data.a)}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {ppFrac(data.b)}
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
          >
            {pp(data.a)}
          </text>
          <text
            x={toX(data.b)}
            y={56}
            fontSize={15}
            textAnchor="middle"
            stroke="blue"
          >
            ×
          </text>
          <foreignObject x={toX(data.b) - 8} y="0" width={60} height={50}>
            <div style={{ fontSize: '12px', color: 'blue' }}>
              {ppFrac(data.b)} = {pp(data.b)}
            </div>
          </foreignObject>
          <text
            x={toX(data.c)}
            y={56}
            fontSize={15}
            textAnchor="middle"
            stroke="blue"
          >
            ×
          </text>
          <text
            x={toX(data.c)}
            y={73}
            fontSize={14}
            textAnchor="middle"
            stroke="blue"
          >
            {pp(data.c)}
          </text>
          <text
            x={toX(data.d)}
            y={56}
            fontSize={15}
            textAnchor="middle"
            stroke="blue"
          >
            ×
          </text>
          <foreignObject x={toX(data.d) - 8} y="0" width={60} height={50}>
            <div style={{ fontSize: '12px', color: 'blue' }}>
              {ppFrac(data.d)} = {pp(data.d)}
            </div>
          </foreignObject>
        </svg>
      </>
    )
  },
}