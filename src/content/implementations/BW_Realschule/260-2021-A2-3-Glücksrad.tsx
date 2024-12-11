import { Exercise } from '@/data/types'

interface DATA {
  links1: number
  links2: number
  links3: number
  links4: number
  rechts1: number
  rechts2: number
  rechts3: number
  rechts4: number
  rechts5: number
}

export const exercise260: Exercise<DATA> = {
  title: 'Glücksrad',
  source: '2021 Pflichtteil A2 - Aufgabe 3',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      links1: rng.randomIntBetween(2, 5),
      links2: rng.randomIntBetween(2, 5),
      links3: rng.randomIntBetween(2, 5),
      links4: rng.randomIntBetween(2, 5),
      rechts1: rng.randomIntBetween(2, 5),
      rechts2: rng.randomIntBetween(2, 5),
      rechts3: rng.randomIntBetween(2, 5),
      rechts4: rng.randomIntBetween(2, 5),
      rechts5: rng.randomIntBetween(2, 5),
    }
  },
  originalData: {
    links1: 4,
    links2: 2,
    links3: 5,
    links4: 3,
    rechts1: 3,
    rechts2: 4,
    rechts3: 2,
    rechts4: 4,
    rechts5: 5,
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Die beiden Glücksräder werden gedreht. Wenn sie stehen bleiben,
          erkennt man im Sichtfenster eine zweistellige Zahl. Die Abbildung
          zeigt die Zahl 43.
        </p>
        <svg viewBox="0 0 328 120">
          <image
            href="/content/BW_Realschule/260_Glücksrad.jpg"
            height="120"
            width="328"
          />
          <text x={140} y={67} fontSize={20} textAnchor="middle" stroke="black">
            {data.links1}
          </text>
          <text x={65} y={67} fontSize={20} textAnchor="middle" stroke="black">
            {data.links3}
          </text>
          <text
            x={101}
            y={103}
            fontSize={20}
            textAnchor="middle"
            stroke="black"
          >
            {data.links2}
          </text>
          <text x={101} y={31} fontSize={20} textAnchor="middle" stroke="black">
            {data.links4}
          </text>
          <text x={183} y={67} fontSize={20} textAnchor="middle" stroke="black">
            {data.rechts1}
          </text>
          <text x={214} y={35} fontSize={20} textAnchor="middle" stroke="black">
            {data.rechts2}
          </text>
          <text x={255} y={45} fontSize={20} textAnchor="middle" stroke="black">
            {data.rechts3}
          </text>
          <text x={257} y={92} fontSize={20} textAnchor="middle" stroke="black">
            {data.rechts4}
          </text>
          <text x={215} y={99} fontSize={20} textAnchor="middle" stroke="black">
            {data.rechts5}
          </text>
        </svg>
        <p>Mit welcher Wahrscheinlichkeit ist im Sichtfenster </p>
        <ul>
          <li>eine Zahl mit zwei gleichen Ziffern zu sehen?</li>
          <li>eine durch 12 teilbare Zahl zu sehen?</li>
          <li>höchstens einmal die Ziffer 4 zu sehen?</li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
