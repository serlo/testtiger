import { Exercise } from '@/data/types'
import { buildFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  preis: number
  breakfast: number
  dinner: number
  item_1: number
  item_2: number
  item_3: number
}

export const exercise34: Exercise<DATA> = {
  title: 'Tabellenkalkulation',
  source: '2019 / 1',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    return {
      preis: rng.randomIntBetween(12, 19),
      breakfast: rng.randomIntBetween(4, 8),
      dinner: rng.randomIntBetween(6, 9),
      item_1: rng.randomIntBetween(0, 3),
      item_2: rng.randomIntBetween(0, 3),
      item_3: rng.randomIntBetween(0, 3),
    }
  },
  constraint({ data }) {
    return data.breakfast < data.dinner && data.item_1 != data.item_2
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
  subtasks: {
    intro: ({ data }) => {
      return <></>
    },
    tasks: [
      ({ data }) => {
        // Funktion zum Mischen des Arrays
        function shuffleArray(array: any[]) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
          }
          return array
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
        const listItems = [
          <li key="1">{richtig[data.item_1]}</li>,
          <li key="2">{richtig[data.item_2]}</li>,
          <li key="3">{falsch[data.item_3]}</li>,
        ]
        const shuffledItems = shuffleArray(listItems)
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
      ({ data }) => {
        return (
          <>
            <p>
              Tarek möchte Geld sparen und deshalb kein Abendessen buchen.
              Berechne, wie viel Prozent von den Gesamtkosten er dann spart.
            </p>
          </>
        )
      },
    ],
    solutions: [
      ({ data }) => {
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
        return (
          <>
            <p>Die Formeln </p>
            <p>
              {' '}
              {'"'}
              {richtig[data.item_1]}
              {'"'}
            </p>
            <p>
              {' '}
              {'"'}
              {richtig[data.item_2]}
              {'"'}
            </p>
            <p>berechnen den Wert der Zelle C8 korrekt.</p>
            <p>
              <br></br>Die Formel {'"'}
              {falsch[data.item_3]}
              {'"'} nicht.
            </p>
          </>
        )
      },
      ({ data }) => {
        const zaehler = data.dinner * 7
        const nenner = pp(
          (data.preis + data.breakfast + data.dinner + data.preis * 0.05) * 7,
        )
        return (
          <>
            <p>
              Berechne den Anteil, den das Abendessen von den Gesamtkosten
              ausmacht:
            </p>
            <p>
              {buildFrac('Abendessen', 'Gesamtkosten')} ={' '}
              {buildFrac(zaehler, nenner)} ={' '}
              {pp(
                Math.round(
                  ((data.dinner * 7) /
                    ((data.dinner +
                      data.preis +
                      data.breakfast +
                      data.preis * 0.05) *
                      7)) *
                    10000,
                ) / 10000,
              )}
            </p>
            <p>
              Tarek würde{' '}
              {pp(
                Math.round(
                  ((data.dinner * 7) /
                    ((data.dinner +
                      data.preis +
                      data.breakfast +
                      data.preis * 0.05) *
                      7)) *
                    10000,
                ) / 100,
              )}{' '}
              % der Kosten sparen.
            </p>
            <p>
              Alternativ kann man auch mit den Kosten für eine Nacht rechnen.
              Das Ergebnis ist gleich, da das Abendessen den gleichen Anteil
              ausmacht.
            </p>
          </>
        )
      },
    ],
  },
}
