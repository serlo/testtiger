import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  berlin: number
  hamburg: number
  münchen: number
  köln: number
  frankfurt: number
  case: number
}

export const exercise51: Exercise<DATA> = {
  title: 'Einwohner',
  source: '2024 Teil 1 Aufgabe 4',
  useCalculator: false,
  duration: 4,
  generator(rng) {
    return {
      hamburg: rng.randomIntBetween(15, 22) / 10,
      berlin: rng.randomIntBetween(32, 40) / 10,
      münchen: rng.randomIntBetween(11, 19) / 10,
      köln: rng.randomIntBetween(8, 15) / 10,
      frankfurt: rng.randomIntBetween(5, 10) / 10,
      case: rng.randomIntBetween(1, 5),
    }
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          In der Tabelle (Abbildung 2) sind die Einwohnerzahlen der fünf
          bevölkerungsreichsten Städte Deutschlands angebildet (Stand: 2021, auf
          Hunderttausend Einwohner gerundet).
        </p>
        <svg viewBox="0 0 328 35">
          <image
            href="/content/NRW_MSA_Einwohner.PNG"
            height="35"
            width="328"
          />
          <text x={90} y={28} fontSize={10} textAnchor="right" stroke="black">
            {pp(data.berlin)}
          </text>
          <text x={135} y={28} fontSize={10} textAnchor="right" stroke="black">
            {pp(data.hamburg)}
          </text>
          <text x={185} y={28} fontSize={10} textAnchor="right" stroke="black">
            {pp(data.münchen)}
          </text>
          <text x={230} y={28} fontSize={10} textAnchor="right" stroke="black">
            {pp(data.köln)}
          </text>
          <text x={280} y={28} fontSize={10} textAnchor="right" stroke="black">
            {pp(data.frankfurt)}
          </text>
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 1,
      task({ data }) {
        return (
          <>
            <p>a) Gib den Median und die Spannweite an.</p>
          </>
        )
      },
      solution({ data }) {
        const array = [
          data.berlin,
          data.hamburg,
          data.münchen,
          data.köln,
          data.frankfurt,
        ].sort((a, b) => a - b)
        const median = array[2]
        return (
          <>
            <p>
              Der Median ist der mittlere Wert in der geordneten Datenliste.
              <br></br>Hier ist der mittlere Wert {median} Mio., denn es liegen
              2 Werte darüber und 2 darunter.
            </p>
            <p>
              Die Spannweite ist die Differenz des größten Wertes und des
              kleinsten Wertes.<br></br>
              {pp(array[4])} Mio. − {pp(array[0])} Mio. ={' '}
              {pp(array[4] - array[0])} Mio.
            </p>
          </>
        )
      },
    },
    {
      points: 1,
      task({ data }) {
        const mittel =
          (data.berlin +
            data.frankfurt +
            data.hamburg +
            data.köln +
            data.münchen) /
          5

        return (
          <>
            <p>
              b) Bestätige mit einer Rechnung, dass das arithmetische Mittel{' '}
              {(mittel * 10) % 1 == 0 ? '' : 'etwa'}{' '}
              {pp(roundToDigits(mittel, 1))} Mio. Einwohner beträgt.
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      points: 1,
      task({ data }) {
        return (
          <>
            <p>
              c) Stuttgart hat weniger Einwohner als rankfurt am Main und liegt
              auf Platz sechs dieser Rangliste. <br></br> Erläutere, wie sich
              die Spannweite verändert, wenn zusätzlich Stuttgart berücksichtigt
              wird.
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
