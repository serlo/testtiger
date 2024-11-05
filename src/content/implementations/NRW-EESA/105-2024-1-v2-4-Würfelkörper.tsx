import { Exercise } from '@/data/types'
import { Color5 } from '@/helper/colors'
import { buildEquation } from '@/helper/math-builder'

interface DATA {
  höhe_1: number
  höhe_2: number
  length_1: number
  length_2: number
  depth: number
  case: number
}

export const exercise105: Exercise<DATA> = {
  title: 'Würfelkörper',
  source: '2021 Teil 1 Variante 2 Aufgabe 4',
  useCalculator: false,
  duration: 4,
  generator(rng) {
    return {
      höhe_1: rng.randomIntBetween(8, 14),
      höhe_2: rng.randomIntBetween(4, 7),
      length_1: rng.randomIntBetween(7, 10),
      length_2: rng.randomIntBetween(4, 6),
      depth: rng.randomIntBetween(2, 4),
      case: rng.randomIntBetween(1, 5),
    }
  },
  originalData: {
    case: 5,
    höhe_1: 10,
    höhe_2: 5,
    length_1: 8,
    length_2: 6,
    depth: 3,
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return null
  },
  tasks: [
    {
      points: 2,
      duration: 3,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>a) Berechne das Volumen des abgebildeten Körpers.</p>
            <p>Alle Maße sind in cm.</p>
            <svg viewBox="0 0 328 250">
              <image
                href="/content/NRW_EESA/105_Würfelkörper.PNG"
                height="250"
                width="328"
              />
              <text
                x="64"
                y="144"
                fontSize="15"
                textAnchor="middle"
                fill="black"
              >
                {data.höhe_1}
              </text>
              <text
                x="270"
                y="159"
                fontSize="15"
                textAnchor="middle"
                fill="black"
              >
                {data.höhe_2}
              </text>
              <text
                x="147"
                y="245"
                fontSize="15"
                textAnchor="middle"
                fill="black"
              >
                {data.length_1}
              </text>
              <text
                x="207"
                y="98"
                fontSize="15"
                textAnchor="middle"
                fill="black"
              >
                {data.length_2}
              </text>
              <text
                x="248"
                y="228"
                fontSize="13"
                textAnchor="middle"
                fill="black"
              >
                {data.length_2}
              </text>
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 1: Skizze des Körpers (nicht maßstabsgetreu)
                </span>
              </Color5>
            </center>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              <strong>Körper zerlegen</strong>
            </p>
            <p>
              Das Volumen des zusammengesetzten Körpers kann auf verschiedene
              Wege berechnet werden. Hier wird der Körper in einzelne Quader
              zerlegt:
            </p>
            <svg viewBox="0 0 328 250">
              <image
                href="/content/NRW_EESA/105_Würfelkörper.PNG"
                height="250"
                width="328"
              />
              <text
                x="64"
                y="144"
                fontSize="15"
                textAnchor="middle"
                fill="black"
              >
                {data.höhe_1}
              </text>
              <text
                x="270"
                y="159"
                fontSize="15"
                textAnchor="middle"
                fill="black"
              >
                {data.höhe_2}
              </text>
              <text
                x="147"
                y="245"
                fontSize="15"
                textAnchor="middle"
                fill="black"
              >
                {data.length_1}
              </text>
              <text
                x="207"
                y="98"
                fontSize="15"
                textAnchor="middle"
                fill="black"
              >
                {data.length_2}
              </text>
              <text
                x="248"
                y="228"
                fontSize="13"
                textAnchor="middle"
                fill="black"
              >
                {data.depth}
              </text>
              <text
                x="96"
                y="32"
                fontSize="13"
                textAnchor="middle"
                fill="#007EC1"
              >
                {data.length_1 - data.length_2}
              </text>
              <text
                x="123"
                y="82"
                fontSize="13"
                textAnchor="middle"
                fill="#007EC1"
              >
                {data.höhe_1 - data.höhe_2}
              </text>
              <line
                x1="75"
                y1="133"
                x2="114"
                y2="133"
                stroke="#007EC1"
                strokeWidth="2"
              />
              <line
                x1="114"
                y1="133"
                x2="144"
                y2="103"
                stroke="#007EC1"
                strokeWidth="2"
              />
              <line
                x1="105"
                y1="103"
                x2="144"
                y2="103"
                stroke="#007EC1"
                strokeWidth="2"
              />
              <line
                x2="75"
                y1="103"
                x1="105"
                y2="133"
                stroke="#007EC1"
                strokeWidth="2"
              />
            </svg>
            <p>
              Die Seitenlängen des kleinen Quaders können durch die anderen
              Seiten bestimmt werden.
            </p>
            <p>
              <strong>Volumen berechnen</strong>
            </p>
            <p>Berechne das Volumen der einzelnen Quader und addiere sie:</p>
            {buildEquation([
              [
                <>
                  V<sub>klein</sub>
                </>,
                <>=</>,
                <>a · b · c</>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {data.length_1 - data.length_2} · {data.depth} ·{' '}
                  {data.höhe_1 - data.höhe_2}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {(data.length_1 - data.length_2) *
                    (data.höhe_1 - data.höhe_2) *
                    data.depth}{' '}
                  [cm³]
                </>,
              ],
            ])}
            {buildEquation([
              [
                <>
                  V<sub>groß</sub>
                </>,
                <>=</>,
                <>a · b · c</>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {data.length_1} · {data.depth} · {data.höhe_2}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>{data.length_1 * data.depth * data.höhe_2} [cm³]</>,
              ],
            ])}
            <p>Das gesamte Volumen beträgt damit: </p>
            <p>
              V<sub>gesamt</sub> ={' '}
              {(data.length_1 - data.length_2) *
                (data.höhe_1 - data.höhe_2) *
                data.depth}{' '}
              + {data.length_1 * data.depth * data.höhe_2} ={' '}
              <strong>
                {(data.length_1 - data.length_2) *
                  (data.höhe_1 - data.höhe_2) *
                  data.depth +
                  data.length_1 * data.depth * data.höhe_2}{' '}
                [cm³]
              </strong>
            </p>
          </>
        )
      },
    },
    {
      points: 1,
      duration: 1,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const hrefs = '/content/NRW_EESA/105_Würfelkörper' + data.case + '.PNG'
        return (
          <>
            <p>
              b) Welcher der beiden Würfelkörper hat das größere Volumen?
              Entscheide.
            </p>
            <svg viewBox="0 0 328 150">
              <image href={hrefs} height="150" width="328" />
              <text
                x="60"
                y="50"
                fontSize="20"
                textAnchor="middle"
                fill="black"
              >
                A
              </text>
              <text
                x="270"
                y="50"
                fontSize="20"
                textAnchor="middle"
                fill="black"
              >
                B
              </text>
            </svg>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Zähle die einzelnen Würfel der Körper und vergleiche.</p>
            <p>
              <strong>Körper {data.case == 1 ? 'A' : 'B'}</strong> hat das
              größere Volumen.
            </p>
          </>
        )
      },
    },
  ],
}
