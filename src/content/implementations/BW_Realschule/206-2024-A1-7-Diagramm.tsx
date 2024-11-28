import { Exercise } from '@/data/types'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  auto: number
  fahrrad: number
  bahn: number
  gesamt: number
  case: number
  frauen: number
  elektro: number
}

export const exercise206: Exercise<DATA> = {
  title: 'Diagramm',
  source: '2024 Pflichtteil A1 Aufgabe 7',
  useCalculator: false,
  duration: 4,
  points: 1.5,
  generator(rng) {
    return {
      auto: rng.randomIntBetween(4, 20) * 10,
      fahrrad: rng.randomIntBetween(4, 20) * 10,
      bahn: rng.randomIntBetween(4, 20) * 10,
      gesamt: rng.randomIntBetween(3, 5) * 100,
      case: rng.randomIntBetween(1, 4),
      frauen: rng.randomIntBetween(2, 4) * 10,
      elektro: rng.randomIntBetween(2, 8) * 5,
    }
  },
  originalData: {
    auto: 150,
    fahrrad: 100,
    bahn: 80,
    gesamt: 400,
    case: 3,
    frauen: 40,
    elektro: 15,
  },
  constraint({ data }) {
    const sonst = data.gesamt - data.auto - data.bahn - data.fahrrad
    return (
      data.gesamt > data.auto + data.fahrrad + data.bahn &&
      sonst < 200 &&
      sonst > 30 &&
      ((data.elektro / 100) * data.auto * (data.frauen / 100)) % 1 == 0
    )
  },
  intro({ data }) {
    const sonst = data.gesamt - data.auto - data.bahn - data.fahrrad
    return (
      <>
        <p>
          {data.gesamt} Personen wurden befragt, mit welchem Verkehrsmittel sie
          zur Arbeit fahren (siehe Diagramm).
        </p>
        <svg viewBox="0 0 328 190">
          <text x={164} y={18} fontSize={16} textAnchor="middle" stroke="black">
            Benutzte Verkehrsmittel
          </text>
          <text x={45} y={60} fontSize={10} textAnchor="left" stroke="black">
            Auto
          </text>

          <text x={30} y={95} fontSize={10} textAnchor="left" stroke="black">
            Fahrrad
          </text>
          <text x={43} y={130} fontSize={10} textAnchor="left" stroke="black">
            Bahn
          </text>
          <text x={26} y={165} fontSize={10} textAnchor="left" stroke="black">
            Sonstige
          </text>
          <rect
            x="80"
            y="30"
            width="200"
            height="160"
            fill="none"
            stroke="black"
          />
          <line
            x1={180}
            y1={30}
            x2={180}
            y2={190}
            stroke="black"
            strokeWidth={1}
          />
          <line
            x1={130}
            y1={30}
            x2={130}
            y2={190}
            stroke="black"
            strokeWidth={1}
          />
          <line
            x1={230}
            y1={30}
            x2={230}
            y2={190}
            stroke="black"
            strokeWidth={1}
          />
          <rect
            x="80"
            y="47"
            width={data.auto}
            height="20"
            fill="gray"
            stroke="black"
          />
          <rect
            x="80"
            y="82"
            width={data.fahrrad}
            height="20"
            fill="gray"
            stroke="black"
          />
          <rect
            x="80"
            y="117"
            width={data.bahn}
            height="20"
            fill="gray"
            stroke="black"
          />
          <rect
            x="80"
            y="152"
            width={sonst}
            height="20"
            fill="gray"
            stroke="black"
          />
          <text
            x={80 + data.auto - 25}
            y={61}
            fontSize={12}
            textAnchor="left"
            stroke="white"
          >
            {data.auto}
          </text>
          <text
            x={80 + data.fahrrad - 25}
            y={96}
            fontSize={12}
            textAnchor="left"
            stroke="white"
          >
            {data.fahrrad}
          </text>
          <text
            x={80 + data.bahn - 25}
            y={131}
            fontSize={12}
            textAnchor="left"
            stroke="white"
          >
            {data.bahn}
          </text>
          <text
            x={80 + sonst - 25}
            y={166}
            fontSize={12}
            textAnchor="left"
            stroke="white"
          >
            {sonst}
          </text>
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 0.5,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              a) Gib den prozentualen Anteil der Personen an, die{' '}
              {data.case == 1 && 'mit dem Auto '}
              {data.case == 2 && 'mit dem Fahrrad '}
              {data.case == 3 && 'mit der Bahn '}
              {data.case == 4 && 'mit einem sonstigen Verkehrsmittel '}
              zur Arbeit fahren.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Berechne den Prozentsatz:</p>
            {buildEquation([
              [<>p</>, <>=</>, <>{buildInlineFrac('W', 'G')}</>],
              [
                <></>,
                <>=</>,
                <>{buildInlineFrac(<>{data.bahn}</>, <>{data.gesamt}</>)}</>,
              ],
              [<></>, <>=</>, <>{pp(data.bahn / data.gesamt)}</>],
              [
                <></>,
                <>=</>,
                <>
                  <strong>{pp((100 * data.bahn) / data.gesamt)} %</strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 1,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              b) {data.frauen} % der Personen, die mit dem Auto fahren, sind
              Frauen. Von diesen Frauen benutzen {data.elektro} % ein
              Elektroauto.<br></br> Berechne die Anzahl der Frauen, die mit
              einem Elektroauto zur Arbeit fahren.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              {data.auto} Personen fahren mit dem Auto. Berechne den
              Prozentwert, also die Anzahl der Frauen:
            </p>
            {buildEquation([
              [<>W</>, <>=</>, <>G · p</>],
              [
                <></>,
                <>=</>,
                <>
                  {data.auto} · {pp(data.frauen / 100)}
                </>,
              ],
              [<></>, <>=</>, <>{data.auto * (data.frauen / 100)}</>],
            ])}
            <p>
              Berechne von diesen {data.auto * (data.frauen / 100)} Frauen, den
              Prozentwert, die ein Elektroauto fahren:
            </p>
            {buildEquation([
              [<>W</>, <>=</>, <>G · p</>],
              [
                <></>,
                <>=</>,
                <>
                  {data.elektro} · {data.auto * (data.frauen / 100)}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <strong>
                    {(data.elektro / 100) * data.auto * (data.frauen / 100)}
                  </strong>
                </>,
              ],
            ])}
            <p>
              Es fahren{' '}
              <strong>
                {(data.elektro / 100) * data.auto * (data.frauen / 100)} Frauen
              </strong>{' '}
              mit einem Elektroauto.
            </p>
          </>
        )
      },
    },
  ],
}
