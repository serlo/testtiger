import { Exercise } from '@/data/types'
import { ppFrac } from '@/helper/pretty-print'

interface DATA {
  kugeln: number
  percent: number
  g: number
}

export const exercise201: Exercise<DATA> = {
  title: 'Kugeln ziehen',
  source: '2024 Prüfungsteil A1 Aufgabe 2',
  useCalculator: false,
  duration: 1,
  points: 1,
  generator(rng) {
    return {
      kugeln: rng.randomItemFromArray([10, 20, 50]),
      percent: rng.randomItemFromArray([10, 20, 25, 30, 50]),
      g: rng.randomIntBetween(1, 10),
    }
  },
  constraint({ data }) {
    return data.g + (data.percent / 100) * data.kugeln < data.kugeln
  },
  task({ data }) {
    return (
      <>
        <p>
          In einem Behälter liegen rote (r) grüne (g) und blaue (b) Kugeln. Es
          sind insgesamt {data.kugeln} Kugeln, die alle gleich groß sind. Marvin
          zieht zwei Kugeln ohne Zurücklegen.
        </p>
        <svg viewBox="0 0 328 190">
          <image
            href="/content/BW_Realschule/201_Baum.jpg"
            height="190"
            width="328"
          />
          <text x={112} y={47} fontSize={12} textAnchor="middle" stroke="black">
            {data.percent} %
          </text>
          <foreignObject x={153} y={18} width={20} height={45}>
            <div
              style={{
                fontSize: '12px',
                color: 'black',
                transform: 'scale(0.7)',
              }}
            >
              {ppFrac([data.g, data.kugeln])}
            </div>
          </foreignObject>
        </svg>
        <p>
          Ergänze in den beiden leeren Feldern die Wahrscheinlichkeitsangaben.{' '}
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          <strong>Wahrscheinlichkeit im 1. Zug</strong>
        </p>
        <p>Wandle die Prozentangabe für die roten Kugeln um:</p>
        <p>
          {data.percent} % = {ppFrac([data.percent, 100])} ={' '}
          {ppFrac([data.percent / (100 / data.kugeln), data.kugeln])}
        </p>
        <p>
          Die Wahrscheinlichkeiten im ersten Zug ergeben zusammen 1. Berechne
          damit die Wahrscheinlichkeit für (b):
        </p>
        <p>
          1 − {ppFrac([data.percent / (100 / data.kugeln), data.kugeln])} −{' '}
          {ppFrac([data.g, data.kugeln])} ={' '}
          <strong>
            {ppFrac([
              data.kugeln - data.g - data.percent / (100 / data.kugeln),
              data.kugeln,
            ])}
          </strong>
        </p>
        <p>
          <strong>Wahrscheinlichkeit im 2. Zug</strong>
        </p>
        <p>
          Im zweiten Zug sind 19 Kugeln übrig.{' '}
          {data.percent / (100 / data.kugeln)} davon sind rot.
        </p>
        <p>
          Die Wahrscheinlichkeit beträgt:{' '}
          <strong>{ppFrac(data.percent / (100 / data.kugeln) / 19)}</strong>
        </p>
        <svg viewBox="0 0 328 190">
          <image
            href="/content/BW_Realschule/201_Baum.jpg"
            height="190"
            width="328"
          />
          <text x={112} y={47} fontSize={12} textAnchor="middle" stroke="black">
            {data.percent} %
          </text>

          <foreignObject x={153} y={18} width={20} height={45}>
            <div
              style={{
                fontSize: '12px',
                color: 'black',
                transform: 'scale(0.7)',
              }}
            >
              {ppFrac([data.g, data.kugeln])}
            </div>
          </foreignObject>
          <foreignObject x={207} y={18} width={20} height={45}>
            <div
              style={{
                fontSize: '12px',
                color: 'black',
                transform: 'scale(0.7)',
              }}
            >
              {ppFrac([
                data.kugeln - data.g - data.percent / (100 / data.kugeln),
                data.kugeln,
              ])}
            </div>
          </foreignObject>
          <foreignObject x={128} y={111} width={20} height={45}>
            <div
              style={{
                fontSize: '12px',
                color: 'black',
                transform: 'scale(0.7)',
              }}
            >
              {ppFrac([data.percent / (100 / data.kugeln), 19])}
            </div>
          </foreignObject>
        </svg>
      </>
    )
  },
}
