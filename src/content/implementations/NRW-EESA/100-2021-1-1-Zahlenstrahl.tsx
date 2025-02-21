import { Exercise } from '@/data/types'
import { Color1 } from '@/helper/colors'
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
          Schau dir die Abstände am Zahlenstrahl an:
          <br></br>
          Zwischen 0 und 1 gibt es 5 Abschnitte. Der Abstand zwischen zwei
          Strichen ist also immer 1 : 5 = 0,2.
          <svg
            width="350"
            height="50"
            viewBox="0 0 350 50"
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
                <path d="M0,0 L0,6 L6,3 Z" fill="black" />
              </marker>
            </defs>
            <line
              x1="20"
              y1="20"
              x2="320"
              y2="20"
              stroke="black"
              stroke-width="1"
              marker-end="url(#arrow)"
            />
            <line
              x1="30"
              y1="12"
              x2="30"
              y2="28"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="55.5"
              y1="16"
              x2="55.5"
              y2="24"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="80.9"
              y1="16"
              x2="80.9"
              y2="24"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="106.4"
              y1="16"
              x2="106.4"
              y2="24"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="131.8"
              y1="16"
              x2="131.8"
              y2="24"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="157.3"
              y1="12"
              x2="157.3"
              y2="28"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="182.7"
              y1="16"
              x2="182.7"
              y2="24"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="208.2"
              y1="16"
              x2="208.2"
              y2="24"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="233.6"
              y1="16"
              x2="233.6"
              y2="24"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="259.1"
              y1="16"
              x2="259.1"
              y2="24"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="284.6"
              y1="12"
              x2="284.6"
              y2="28"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="310"
              y1="16"
              x2="310"
              y2="24"
              stroke="black"
              stroke-width="1"
            />
            <text x="30" y="40" text-anchor="middle" font-size="12">
              0
            </text>
            <text x="157.3" y="40" text-anchor="middle" font-size="12">
              1
            </text>
            <text x="284.6" y="40" text-anchor="middle" font-size="12">
              2
            </text>
            <text x="55.5" y="38" text-anchor="middle" font-size="10">
              0,2
            </text>
            <text x="80.9" y="38" text-anchor="middle" font-size="10">
              0,4
            </text>
            <text x="106.4" y="38" text-anchor="middle" font-size="10">
              0,6
            </text>
            <text x="131.8" y="38" text-anchor="middle" font-size="10">
              0,8
            </text>
          </svg>
        </p>
        <p>
          Wenn es dir hilft, kannst du die Brüche in Dezimalzahlen umwandeln:
          <br></br>
          <Color1>
            {ppFrac([data.b, 10])}= {pp(data.b / 10)}
          </Color1>{' '}
          und{' '}
          <Color1>
            {ppFrac(data.c)} = {pp(data.c)}
          </Color1>
        </p>
        <p>
          <b>Markiere die Zahlen auf dem Zahlenstrahl:</b>
          <svg
            width="350"
            height="60"
            viewBox="0 0 350 60"
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
                <path d="M0,0 L0,6 L6,3 Z" fill="black" />
              </marker>
            </defs>
            <line
              x1="20"
              y1="30"
              x2="320"
              y2="30"
              stroke="black"
              stroke-width="1"
              marker-end="url(#arrow)"
            />
            <line
              x1="30"
              y1="22"
              x2="30"
              y2="38"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="55.5"
              y1="26"
              x2="55.5"
              y2="34"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="80.9"
              y1="26"
              x2="80.9"
              y2="34"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="106.4"
              y1="26"
              x2="106.4"
              y2="34"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="131.8"
              y1="26"
              x2="131.8"
              y2="34"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="157.3"
              y1="22"
              x2="157.3"
              y2="38"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="182.7"
              y1="26"
              x2="182.7"
              y2="34"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="208.2"
              y1="26"
              x2="208.2"
              y2="34"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="233.6"
              y1="26"
              x2="233.6"
              y2="34"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="259.1"
              y1="26"
              x2="259.1"
              y2="34"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="284.6"
              y1="22"
              x2="284.6"
              y2="38"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="310"
              y1="26"
              x2="310"
              y2="34"
              stroke="black"
              stroke-width="1"
            />
            <text x="30" y="50" text-anchor="middle" font-size="12">
              0
            </text>
            <text x="157.3" y="50" text-anchor="middle" font-size="12">
              1
            </text>
            <text x="284.6" y="50" text-anchor="middle" font-size="12">
              2
            </text>
            <text
              x={30 + 127.3 * data.a}
              y="34"
              text-anchor="middle"
              fill="blue"
              font-size="15"
            >
              x
            </text>
            <text
              x={30 + 127.3 * data.a}
              y="20"
              text-anchor="middle"
              fill="blue"
              font-size="12"
            >
              {pp(data.a)}
            </text>
            <text
              x={30 + 127.3 * data.c}
              y="34"
              text-anchor="middle"
              fill="blue"
              font-size="15"
            >
              x
            </text>

            <text
              x={30 + 127.3 * data.c}
              y="46"
              text-anchor="middle"
              fill="blue"
              font-size="12"
            >
              {pp(data.c)}
            </text>

            <text
              x={30 + 127.3 * data.d}
              y="34"
              text-anchor="middle"
              fill="blue"
              font-size="15"
            >
              x
            </text>
            <text
              x={30 + 127.3 * data.d}
              y="20"
              text-anchor="middle"
              fill="blue"
              font-size="12"
            >
              {pp(data.d)}
            </text>
            <text
              x={30 + 127.3 * (data.b / 10)}
              y="34"
              text-anchor="middle"
              fill="blue"
              font-size="15"
            >
              x
            </text>

            <text
              x={30 + 127.3 * (data.b / 10)}
              y="20"
              text-anchor="middle"
              fill="blue"
              font-size="12"
            >
              {pp(data.b / 10)}
            </text>
          </svg>
        </p>
      </>
    )
  },
}
