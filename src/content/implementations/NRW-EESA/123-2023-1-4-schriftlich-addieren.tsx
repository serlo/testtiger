import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
}

export const exercise123: Exercise<DATA> = {
  title: 'schriftlich addieren',
  source: '2023 Teil 1 Aufgabe 4',
  useCalculator: false,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      a: rng.randomIntBetween(2000, 3000) / 100,
      b: rng.randomIntBetween(100, 1000) / 100,
    }
  },
  originalData: {
    a: 32.73,
    b: 4.21,
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Julienco rechnet {pp(data.a)} + {pp(data.b)} schriftlich. Er hat einen
          Fehler gemacht. Gib an, worin der Fehler liegt und rechne richtig.
        </p>
        <svg viewBox="0 0 289 589">
          <image
            href="/content/NRW_EESA/123_schriftlich_addieren.jpg"
            height="589"
            width="289"
          />
          <text x={36} y={260} fontSize={32} textAnchor="right" stroke="black">
            {pp(data.a)}
          </text>
          <text x={36} y={292} fontSize={32} textAnchor="right" stroke="black">
            {pp(data.b)}
          </text>
          <text x={36} y={355} fontSize={32} textAnchor="right" stroke="black">
            {pp(data.a + data.b * 10)}
          </text>
        </svg>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Der Fehler ist, dass die Zahlen nicht richtig untereinander
          geschrieben wurden. Beim schriftlichen Addieren müssen die Kommas
          untereinander stehen.
        </p>
        <p>
          {' '}
          Anders gesagt, man fängt rechts an, die Zahlen untereinander zu
          schreiben und nicht links.
        </p>
        <p>Richtig gerechnet wäre die Rechnung so:</p>
        <svg viewBox="0 0 289 589">
          <image
            href="/content/NRW_EESA/123_schriftlich_addieren.jpg"
            height="589"
            width="289"
          />
          <text x={36} y={260} fontSize={32} textAnchor="right" stroke="black">
            {pp(data.a)}
          </text>
          <text x={53} y={292} fontSize={32} textAnchor="right" stroke="black">
            {pp(data.b)}
          </text>
          <text x={36} y={355} fontSize={32} textAnchor="right" stroke="black">
            {pp(data.a + data.b)}
          </text>
        </svg>
      </>
    )
  },
}
