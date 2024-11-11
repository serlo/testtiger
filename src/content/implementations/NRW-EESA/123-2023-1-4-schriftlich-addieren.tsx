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
  duration: 3,
  points: 3,
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
        <svg viewBox="0 0 289 149">
          <image
            href="/content/NRW_EESA/123_schriftlich_addieren.jpg"
            height="149"
            width="289"
          />
          <text x={33} y={40} fontSize={32} textAnchor="right" stroke="black">
            {pp(data.a)}
          </text>
          <text x={31} y={72} fontSize={32} textAnchor="right" stroke="black">
            {pp(data.b)}
          </text>
          <text x={33} y={135} fontSize={32} textAnchor="right" stroke="black">
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
          Anders gesagt: Man fängt rechts an, die Zahlen untereinander zu
          schreiben und nicht links.
        </p>
        <p>Richtig gerechnet wäre die Rechnung so:</p>
        <svg viewBox="0 0 289 189">
          <image
            href="/content/NRW_EESA/123_schriftlich_addieren.jpg"
            height="189"
            width="289"
          />
          <text x={36} y={60} fontSize={32} textAnchor="right" stroke="black">
            {pp(data.a)}
          </text>
          <text x={53} y={92} fontSize={32} textAnchor="right" stroke="black">
            {pp(data.b)}
          </text>
          <text x={36} y={155} fontSize={32} textAnchor="right" stroke="black">
            {pp(data.a + data.b)}
          </text>
        </svg>
      </>
    )
  },
}
