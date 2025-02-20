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
          Schau dir den Abstand zwischen zwei Strichen am Zahlenstrahl an.
          Zwischen 0 und 1 sind es 5 Striche. Der Abstand zwischen zwei Strichen
          ist also immer 1 : 5 = 0,2.
        </p>
        <svg
          width="300"
          height="50"
          viewBox="0 0 300 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker
              id="arrow"
              markerWidth="10"
              markerHeight="10"
              refX="3"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L6,3 z" fill="#000" />
            </marker>
          </defs>

          <line
            x1="20"
            y1="20"
            x2="280"
            y2="20"
            stroke="black"
            stroke-width="2"
            marker-end="url(#arrow)"
          />

          <line x1="20" y1="18" x2="20" y2="22" stroke="black" />
          <line x1="52.5" y1="18" x2="52.5" y2="22" stroke="black" />
          <line x1="85" y1="18" x2="85" y2="22" stroke="black" />
          <line x1="117.5" y1="18" x2="117.5" y2="22" stroke="black" />
          <line x1="150" y1="18" x2="150" y2="22" stroke="black" />
          <line x1="182.5" y1="18" x2="182.5" y2="22" stroke="black" />
          <line x1="215" y1="18" x2="215" y2="22" stroke="black" />
          <line x1="247.5" y1="18" x2="247.5" y2="22" stroke="black" />
          <line x1="280" y1="18" x2="280" y2="22" stroke="black" />

          <text x="20" y="35" text-anchor="middle" font-size="12">
            0
          </text>
          <text x="150" y="35" text-anchor="middle" font-size="12">
            1
          </text>
          <text x="280" y="35" text-anchor="middle" font-size="12">
            2
          </text>
        </svg>
        <p>Wandle zuerst die Brüche in Dezimalzahlen um:</p>
        <p>
          {ppFrac([data.b, 10])} = {pp(data.b / 10)}
        </p>
        <p>
          {ppFrac(data.c)} = {pp(data.c)}
        </p>
        <p>
          Markiere nun die Zahlen auf dem Zahlenstrahl. Der Abstand zwischen
          zwei Strichen ist dabei immer 0,2.
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
