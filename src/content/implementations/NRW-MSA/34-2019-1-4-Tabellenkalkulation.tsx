import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import {
  buildEquation,
  buildFrac,
  buildInlineFrac,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  preis: number
  breakfast: number
  dinner: number
  item_1: number
  item_2: number
  item_3: number
  order: number[]
}

const richtig = [
  '= B8 * B2',
  '= C10 - (C5 + C6 + C7)',
  '= C5 * 0,05',
  '= B5 * B2 * 0,05',
]

const falsch = [
  '= B5/3',
  '= C10 * 0,05',
  '= (C5 + C6 + C7) * 0,05',
  '= B8 * C4',
]

export const exercise34: Exercise<DATA> = {
  title: 'Tabellenkalkulation',
  source: '2019 Teil 1 Aufgabe 4',
  useCalculator: false,
  duration: 5,
  generator(rng) {
    return {
      preis: rng.randomIntBetween(12, 19),
      breakfast: rng.randomIntBetween(4, 8),
      dinner: rng.randomIntBetween(6, 9),
      item_1: rng.randomIntBetween(0, 3),
      item_2: rng.randomIntBetween(0, 3),
      item_3: rng.randomIntBetween(0, 3),
      order: rng.shuffleArray([0, 1, 2]),
    }
  },
  constraint({ data }) {
    return data.breakfast < data.dinner && data.item_1 != data.item_2
  },
  intro({ data }) {
    return <></>
  },
  tasks: [
    {
      points: 3,
      task({ data }) {
        const listItems = [
          <li key="1">{richtig[data.item_1]}</li>,
          <li key="2">{richtig[data.item_2]}</li>,
          <li key="3">{falsch[data.item_3]}</li>,
        ]
        const shuffledItems = data.order.map(i => listItems[i])
        return (
          <>
            <p>
              Tarek plant Urlaub in einer Jugendherberge. Mit einer
              Tabellenkalkulation berechnet er die Kosten für die
              Jugendherberge.
            </p>
            <svg viewBox="0 0 600 300">
              <image
                href="/content/NRW_MSA_Tabellenkalk_2.PNG"
                height="300"
                width="600"
              />
              <text
                x={395}
                y={160}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {data.preis}
              </text>
              <text
                x={558}
                y={160}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {data.preis * 7}
              </text>
              <text
                x={402}
                y={184}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {data.breakfast}
              </text>
              <text
                x={564}
                y={184}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {data.breakfast * 7}
              </text>
              <text
                x={402}
                y={206}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {data.dinner}
              </text>
              <text
                x={564}
                y={206}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {data.dinner * 7}
              </text>
              <text
                x={383}
                y={239}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {pp(data.preis * 0.05)}
              </text>
              <text
                x={551}
                y={239}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {pp(data.preis * 0.05 * 7)}
              </text>
              <text
                x={535}
                y={291}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {pp(
                  (data.preis +
                    data.breakfast +
                    data.dinner +
                    data.preis * 0.05) *
                    7,
                )}
              </text>
            </svg>
            <p>
              Abbildung: Tabellenblatt zur Berechnung der Kosten für die
              Jugendherberge.
            </p>
            <p>
              a) Entscheide jeweils, ob die Formel in diesem Zusammenhang
              geeignet ist, den Wert der Zelle C8 zu berechnen:
            </p>
            <ul>{shuffledItems}</ul>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Die Formeln </p>
            <ul>
              <li>
                {' '}
                {'"'}
                {richtig[data.item_1]}
                {'"'}
              </li>
              <li>
                {' '}
                {'"'}
                {richtig[data.item_2]}
                {'"'}
              </li>
            </ul>
            <p>
              berechnen den Wert der Zelle C8 <strong>korrekt</strong>.
            </p>
            <p>
              Die Formel {'"'}
              {falsch[data.item_3]}
              {'"'} <strong>nicht</strong>.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>
              b) Tarek möchte Geld sparen und deshalb kein Abendessen buchen.
              Berechne, wie viel Prozent von den Gesamtkosten er dann spart.
            </p>
          </>
        )
      },
      solution({ data }) {
        const zaehler = data.dinner * 7
        const nenner = pp(
          (data.preis + data.breakfast + data.dinner + data.preis * 0.05) * 7,
        )
        const p = roundToDigits(
          (data.dinner * 7) /
            ((data.dinner + data.preis + data.breakfast + data.preis * 0.05) *
              7),
          4,
        )
        return (
          <>
            <p>
              Berechne den prozentualen Anteil, den das Abendessen von den
              Gesamtkosten ausmacht:
            </p>
            {buildEquation([
              ['p', '=', <>{buildInlineFrac('W', 'G')}</>],
              ['', '=', <>{buildInlineFrac('Abendessen', 'Gesamtkosten')}</>],
              [
                '',
                <>
                  {' '}
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>Werte einsetzen</span>
                  </Color4>
                </>,
              ],
              ['', '=', <>{buildInlineFrac(zaehler, nenner)}</>],
              ['', '=', <>{pp(p)}</>],
            ])}

            <p>
              Tarek würde <strong>{pp(p * 100)} % </strong>der Kosten sparen.
            </p>
            <p>
              Alternativ kann man auch mit den Kosten für nur eine Nacht
              rechnen, mit dem gleichen Ergebnis.
            </p>
          </>
        )
      },
    },
  ],
}
