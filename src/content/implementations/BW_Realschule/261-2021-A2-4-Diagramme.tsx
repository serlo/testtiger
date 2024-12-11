import { Exercise } from '@/data/types'

interface DATA {
  handel2013: number
  handel2014: number
  handel2015: number
  handel2016: number
  handel2017: number
  handel2018: number
  handel2019: number
}

export const exercise261: Exercise<DATA> = {
  title: 'Diagramme',
  source: '2021 Pflichtteil A2 - Aufgabe 4',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      handel2013: rng.randomIntBetween(300, 340) / 10,
      handel2014: rng.randomIntBetween(340, 380) / 10,
      handel2015: rng.randomIntBetween(380, 420) / 10,
      handel2016: rng.randomIntBetween(420, 470) / 10,
      handel2017: rng.randomIntBetween(470, 510) / 10,
      handel2018: rng.randomIntBetween(510, 570) / 10,
      handel2019: rng.randomIntBetween(570, 670) / 10,
    }
  },
  originalData: {
    handel2013: 32,
    handel2014: 35.6,
    handel2015: 39.9,
    handel2016: 44.2,
    handel2017: 48.9,
    handel2018: 53.6,
    handel2019: 58.5,
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Immer mehr Menschen kaufen im Internet ein. Die Grafik zeigt die
          Umsatzentwicklung des Onlinehandels in Deutschland.
        </p>
        <svg viewBox="0 0 328 270">
          <text x={164} y={20} fontSize={15} textAnchor="middle" stroke="black">
            Umsatz des Onlinehandels in Deutschland
          </text>
          <text x={164} y={40} fontSize={12} textAnchor="middle" stroke="black">
            (in Mrd. Euro)
          </text>
          <line
            x1={0}
            y1={250}
            x2={328}
            y2={250}
            stroke="black"
            strokeWidth={2}
          />
          <line
            x1={0}
            y1={225}
            x2={328}
            y2={225}
            stroke="black"
            strokeWidth={1}
          />
          <line
            x1={0}
            y1={200}
            x2={328}
            y2={200}
            stroke="black"
            strokeWidth={1}
          />
          <line
            x1={0}
            y1={175}
            x2={328}
            y2={175}
            stroke="black"
            strokeWidth={1}
          />
          <line
            x1={0}
            y1={150}
            x2={328}
            y2={150}
            stroke="black"
            strokeWidth={1}
          />
          <line
            x1={0}
            y1={125}
            x2={328}
            y2={125}
            stroke="black"
            strokeWidth={1}
          />
          <line
            x1={0}
            y1={100}
            x2={328}
            y2={100}
            stroke="black"
            strokeWidth={1}
          />
          <line
            x1={0}
            y1={75}
            x2={328}
            y2={75}
            stroke="black"
            strokeWidth={1}
          />
          <text
            x={(328 * 1) / 8}
            y={265}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            2013
          </text>
          <text
            x={(328 * 2) / 8}
            y={265}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            2014
          </text>
          <text
            x={(328 * 3) / 8}
            y={265}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            2015
          </text>
          <text
            x={(328 * 4) / 8}
            y={265}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            2016
          </text>
          <text
            x={(328 * 5) / 8}
            y={265}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            2017
          </text>
          <text
            x={(328 * 6) / 8}
            y={265}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            2018
          </text>
          <text
            x={(328 * 7) / 8}
            y={265}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            2019
          </text>
        </svg>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
