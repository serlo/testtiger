import { Exercise } from '@/data/types'

interface DATA {
  xs: number
  ys: number
}

export const exercise244: Exercise<DATA> = {
  title: 'Parabel',
  source: '2022 Pflichtteil A2 - Aufgabe 4',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      xs: rng.randomIntBetween(2, 6),
      ys: rng.randomItemFromArray([-16, -9, -4]),
    }
  },
  originalData: { xs: 4, ys: -9 },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    function toX(n: number) {
      return 92 + n * 22
    }
    function toY(n: number) {
      return 150 - n * 22
    }
    function generateParabolaPoints(): string {
      let points = ''
      for (let x = -4; x <= 11; x += 0.1) {
        const y = (x - data.xs) * (x - data.xs) + data.ys
        points += `${toX(x)},${toY(y)} `
      }
      return points.trim()
    }
    const parabolaPoints = generateParabolaPoints()
    function parabola(x: number) {
      return (x - data.xs) * (x - data.xs) + data.ys
    }
    return (
      <>
        <p>
          Das Schaubild zeigt den Ausschnitt einer verschobenen Normalparabel p.
        </p>
        <svg viewBox="0 0 328 220">
          <image
            href="/content/BW_Realschule/227_KS.png"
            height="220"
            width="328"
          />
          <polyline
            points={parabolaPoints}
            stroke="blue"
            strokeWidth="2"
            fill="none"
          />
          <text x={315} y={160} fontSize={15} textAnchor="left" stroke="black">
            x
          </text>
          <text x={105} y={20} fontSize={15} textAnchor="left" stroke="black">
            y
          </text>
        </svg>
        <ul>
          <li>Bestimme die Funktionsgleichung von p.</li>
        </ul>
        <p>Die Wertetabelle gehört zur Parabel p.</p>
        <div
          className="relative overflow-hidden rounded-lg max-w-[250px] mx-auto"
          style={{
            transform: 'scale(1)',
            transformOrigin: 'top left',
          }}
        >
          <table className="table-auto rounded-lg shadow-md w-full text-left text-[9px]">
            <thead className="uppercase  text-[#404040]">
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] bg-[#D2ECF6]">
                  x
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  -3
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  -2
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  -1
                </td>

                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  0
                </td>
              </tr>
            </thead>
            <tbody
              className="bg-white text-gray-500"
              style={{ backgroundColor: '#FFFFFF', color: '#6b7280' }}
            >
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] bg-[#D2ECF6]">
                  y
                </td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]"></td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]"></td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]"></td>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li>Ergänze die fehlenden y-Werte in der Wertetabelle.</li>
        </ul>
        <p>
          {' '}
          Die Gerade g mit der Funktionsgleichung y = -2x + 2 schneidet die
          Parabel p in den Punkten A und B.{' '}
        </p>
        <ul>
          <li>Berechne die Koordinaten der Schnittpunkte A und B.</li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
