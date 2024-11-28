import { Exercise } from '@/data/types'

interface DATA {
  value1: number
  value2: number
  value3: number
}

export const exercise204: Exercise<DATA> = {
  title: 'Sinus',
  source: '2024 Pflichtteil A1 Aufgabe 5',
  useCalculator: false,
  duration: 1,
  points: 1,
  generator(rng) {
    return {
      value1: rng.randomIntBetween(1, 72) * 5,
      value2: rng.randomIntBetween(1, 72) * 5,
      value3: rng.randomIntBetween(1, 72) * 5,
    }
  },
  originalData: {
    value1: 25,
    value2: 125,
    value3: 225,
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>Welcher Sinuswert ist positiv, welcher negativ? Entscheide. </p>
        <ul>
          <li>sin({data.value1}°)</li>
          <li>sin({data.value2}°)</li>
          <li>sin({data.value3}°)</li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>Eine Skizze des Graphen der Sinusfunktion ist hilfreich:</p>
        <svg viewBox="0 0 328 190">
          <image
            href="/content/BW_Realschule/203_Sinus.png"
            height="190"
            width="328"
          />
        </svg>
        <ul>
          <li>
            sin({data.value1}°) ist{' '}
            <strong>{Math.sin(data.value1) < 0 ? 'negativ' : 'positiv'}</strong>
          </li>
          <li>
            sin({data.value2}°) ist{' '}
            <strong>{Math.sin(data.value2) < 0 ? 'negativ' : 'positiv'}</strong>
          </li>
          <li>
            sin({data.value3}°) ist{' '}
            <strong>{Math.sin(data.value3) < 0 ? 'negativ' : 'positiv'}</strong>
          </li>
        </ul>
      </>
    )
  },
}
