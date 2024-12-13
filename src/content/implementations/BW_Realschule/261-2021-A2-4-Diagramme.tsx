import { Exercise } from '@/data/types'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  handel2013: number
  handel2014: number
  handel2015: number
  handel2016: number
  handel2017: number
  handel2018: number
  handel2019: number
  mode: number
  elektronik: number
  freizeit: number
  wohnen: number
  gesundheit: number
  büro: number
  smart: number
}

export const exercise261: Exercise<DATA> = {
  title: 'Diagramme',
  source: '2021 Pflichtteil A2 - Aufgabe 4',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      handel2013: rng.randomIntBetween(300, 340) / 10,
      handel2014: rng.randomIntBetween(340, 380) / 10,
      handel2015: rng.randomIntBetween(380, 420) / 10,
      handel2016: rng.randomIntBetween(420, 470) / 10,
      handel2017: rng.randomIntBetween(470, 510) / 10,
      handel2018: rng.randomIntBetween(510, 570) / 10,
      handel2019: rng.randomIntBetween(570, 670) / 10,
      mode: rng.randomIntBetween(250, 280) / 10,
      elektronik: rng.randomIntBetween(200, 250) / 10,
      freizeit: rng.randomIntBetween(120, 150) / 10,
      wohnen: rng.randomIntBetween(120, 150) / 10,
      gesundheit: rng.randomIntBetween(40, 70) / 10,
      büro: rng.randomIntBetween(10, 20) / 10,
      smart: rng.randomIntBetween(40, 70),
    }
  },
  originalData: {
    handel2013: 32,
    handel2014: 35.6,
    handel2015: 39.9,
    handel2016: 44.2,
    handel2017: 48.9,
    handel2018: 53.6,
    handel2019: 58.5,
    mode: 26.9,
    elektronik: 24.9,
    freizeit: 14.5,
    wohnen: 13.4,
    gesundheit: 6.2,
    büro: 1.7,
    smart: 53,
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    const sonstiges =
      100 -
      data.mode -
      data.elektronik -
      data.freizeit -
      data.wohnen -
      data.gesundheit -
      data.büro
    function PolarToCartesian(
      centerX: number,
      centerY: number,
      radius: number,
      angleInDegrees: number,
    ) {
      const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180.0)
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
      }
    }

    function DescribeArc(
      x: number,
      y: number,
      radius: number,
      startAngle: number,
      endAngle: number,
    ) {
      const start = PolarToCartesian(x, y, radius, endAngle)
      const end = PolarToCartesian(x, y, radius, startAngle)
      const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
      return [
        'M',
        x,
        y,
        'L',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y,
        'Z',
      ].join(' ')
    }
    function LabelPosition(
      centerX: number,
      centerY: number,
      radius: number,
      angle: number,
    ) {
      return PolarToCartesian(centerX, centerY, radius * 0.7, angle)
    }

    function PieChart() {
      const centerX = 164
      const centerY = 125
      const radius = 100
      const sector1 = (360 * data.mode) / 100
      const sector2 = (360 * data.elektronik) / 100
      const sector3 = (360 * data.freizeit) / 100
      const sector4 = (360 * data.wohnen) / 100
      const sector5 = (360 * data.gesundheit) / 100
      const sector6 = (360 * data.büro) / 100
      const sector7 = (360 * sonstiges) / 100

      const path1 = DescribeArc(centerX, centerY, radius, 0, sector1)
      const path2 = DescribeArc(
        centerX,
        centerY,
        radius,
        sector1,
        sector1 + sector2,
      )
      const path3 = DescribeArc(
        centerX,
        centerY,
        radius,
        sector1 + sector2,
        sector1 + sector2 + sector3,
      )
      const path4 = DescribeArc(
        centerX,
        centerY,
        radius,

        sector1 + sector2 + sector3,
        sector1 + sector2 + sector3 + sector4,
      )
      const path5 = DescribeArc(
        centerX,
        centerY,
        radius,
        sector1 + sector2 + sector3 + sector4,
        sector1 + sector2 + sector3 + sector4 + sector5,
      )
      const path6 = DescribeArc(
        centerX,
        centerY,
        radius,
        sector1 + sector2 + sector3 + sector4 + sector5,
        sector1 + sector2 + sector3 + sector4 + sector5 + sector6,
      )
      const path7 = DescribeArc(
        centerX,
        centerY,
        radius,
        sector1 + sector2 + sector3 + sector4 + sector5 + sector6,
        sector1 + sector2 + sector3 + sector4 + sector5 + sector6 + sector7,
      )
      const label1Pos = LabelPosition(centerX, centerY, radius, sector1 / 2)
      const label2Pos = LabelPosition(
        centerX,
        centerY,
        radius - 20,
        sector1 + sector2 / 2,
      )
      const label3Pos = LabelPosition(
        centerX,
        centerY,
        radius - 20,
        sector1 + sector2 + sector3 / 2,
      )
      const label4Pos = LabelPosition(
        centerX,
        centerY,
        radius - 20,
        sector1 + sector2 + sector3 + sector4 / 2,
      )
      const label5Pos = LabelPosition(
        centerX,
        centerY,
        radius - 20,
        sector1 + sector2 + sector3 + sector4 + sector5 / 2,
      )
      const label6Pos = LabelPosition(
        centerX,
        centerY,
        radius - 20,
        sector1 + sector2 + sector3 + sector4 + sector5 + sector6 / 2,
      )
      const label7Pos = LabelPosition(
        centerX,
        centerY,
        radius - 20,
        sector1 + sector2 + sector3 + sector4 + sector5 + sector6 + sector7 / 2,
      )
      const label1Pos2 = LabelPosition(
        centerX,
        centerY,
        radius + 40,
        sector1 / 2,
      )
      const label2Pos2 = LabelPosition(
        centerX,
        centerY,
        radius + 40,
        sector1 + sector2 / 2,
      )
      const label3Pos2 = LabelPosition(
        centerX,
        centerY,
        radius + 40,
        sector1 + sector2 + sector3 / 2,
      )
      const label4Pos2 = LabelPosition(
        centerX,
        centerY,
        radius + 40,
        sector1 + sector2 + sector3 + sector4 / 2,
      )
      const label5Pos2 = LabelPosition(
        centerX,
        centerY,
        radius + 40,
        sector1 + sector2 + sector3 + sector4 + sector5 / 2,
      )
      const label6Pos2 = LabelPosition(
        centerX,
        centerY,
        radius + 40,
        sector1 + sector2 + sector3 + sector4 + sector5 + sector6 / 2,
      )
      const label7Pos2 = LabelPosition(
        centerX,
        centerY,
        radius + 40,
        sector1 + sector2 + sector3 + sector4 + sector5 + sector6 + sector7 / 2,
      )
      return (
        <>
          <svg viewBox="0 0 328 190">
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke="black"
              strokeWidth="3"
            />
            <path d={path1} fill="gray" />
            <path d={path2} fill="lightblue" />
            <path d={path3} fill="yellow" />
            <path d={path4} fill="lightgreen" />
            <path d={path5} fill="orange" />
            <path d={path6} fill="gray" />
            <path d={path7} fill="white" />
            <text
              x={label1Pos.x}
              y={label1Pos.y}
              fontSize="15"
              textAnchor="middle"
              fill="black"
            >
              {pp(data.mode)} %
            </text>

            <text
              x={label2Pos.x}
              y={label2Pos.y}
              fontSize="15"
              textAnchor="middle"
              fill="black"
            >
              {pp(data.elektronik)} %
            </text>
            <text
              x={label3Pos.x}
              y={label3Pos.y}
              fontSize="15"
              textAnchor="middle"
              fill="black"
            >
              {pp(data.freizeit)} %
            </text>
            <text
              x={label4Pos.x}
              y={label4Pos.y}
              fontSize="15"
              textAnchor="middle"
              fill="black"
            >
              {pp(data.wohnen)} %
            </text>
            <text
              x={label5Pos.x}
              y={label5Pos.y}
              fontSize="12"
              textAnchor="middle"
              fill="black"
            >
              {pp(data.gesundheit)} %
            </text>
            <text
              x={label6Pos.x}
              y={label6Pos.y}
              fontSize="12"
              textAnchor="middle"
              fill="black"
            >
              {pp(data.büro)} %
            </text>
            <text
              x={label7Pos.x}
              y={label7Pos.y}
              fontSize="15"
              textAnchor="middle"
              fill="black"
            >
              {pp(sonstiges)} %
            </text>
            <text
              x={label1Pos2.x}
              y={label1Pos2.y}
              fontSize="12"
              textAnchor="middle"
              fill="black"
            >
              Mode und Accessoires
            </text>
            <text
              x={label2Pos2.x}
              y={label2Pos2.y}
              fontSize="12"
              textAnchor="middle"
              fill="black"
            >
              Elektronik
            </text>
            <text
              x={label3Pos2.x}
              y={label3Pos2.y}
              fontSize="12"
              textAnchor="middle"
              fill="black"
            >
              Freizeit und Hobby
            </text>
            <text
              x={label4Pos2.x}
              y={label4Pos2.y}
              fontSize="12"
              textAnchor="middle"
              fill="black"
            >
              Wohnen und Heimwerken
            </text>
            <text
              x={label5Pos2.x - 20}
              y={label5Pos2.y}
              fontSize="10"
              textAnchor="middle"
              fill="black"
            >
              Gesundheit
            </text>
            <text
              x={label6Pos2.x - 10}
              y={label6Pos2.y}
              fontSize="10"
              textAnchor="middle"
              fill="black"
            >
              Büro und Schreibwaren
            </text>
            <text
              x={label7Pos2.x}
              y={label7Pos2.y}
              fontSize="12"
              textAnchor="middle"
              fill="black"
            >
              Sonstiges
            </text>
          </svg>
        </>
      )
    }
    function toY(n: number) {
      return ((n / 10) * 174) / 7
    }
    return (
      <>
        <p>
          Immer mehr Menschen kaufen im Internet ein. Die Grafik zeigt die
          Umsatzentwicklung des Onlinehandels in Deutschland.
        </p>
        <svg viewBox="0 0 328 270">
          <text x={164} y={20} fontSize={15} textAnchor="middle" stroke="black">
            Umsatz des Onlinehandels in Deutschland
          </text>
          <text x={164} y={40} fontSize={12} textAnchor="middle" stroke="black">
            (in Mrd. Euro)
          </text>
          <line
            x1={0}
            y1={250}
            x2={328}
            y2={250}
            stroke="black"
            strokeWidth={2}
          />
          <line
            x1={0}
            y1={225}
            x2={328}
            y2={225}
            stroke="black"
            strokeWidth={1}
          />
          <line
            x1={0}
            y1={200}
            x2={328}
            y2={200}
            stroke="black"
            strokeWidth={1}
          />
          <line
            x1={0}
            y1={175}
            x2={328}
            y2={175}
            stroke="black"
            strokeWidth={1}
          />
          <line
            x1={0}
            y1={150}
            x2={328}
            y2={150}
            stroke="black"
            strokeWidth={1}
          />
          <line
            x1={0}
            y1={125}
            x2={328}
            y2={125}
            stroke="black"
            strokeWidth={1}
          />
          <line
            x1={0}
            y1={100}
            x2={328}
            y2={100}
            stroke="black"
            strokeWidth={1}
          />
          <line
            x1={0}
            y1={75}
            x2={328}
            y2={75}
            stroke="black"
            strokeWidth={1}
          />
          <text
            x={(328 * 1) / 8}
            y={265}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            2013
          </text>
          <text
            x={(328 * 2) / 8}
            y={265}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            2014
          </text>
          <text
            x={(328 * 3) / 8}
            y={265}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            2015
          </text>
          <text
            x={(328 * 4) / 8}
            y={265}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            2016
          </text>
          <text
            x={(328 * 5) / 8}
            y={265}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            2017
          </text>
          <text
            x={(328 * 6) / 8}
            y={265}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            2018
          </text>
          <text
            x={(328 * 7) / 8}
            y={265}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            2019
          </text>
          <rect
            x={31}
            y={249 - toY(data.handel2013)}
            width="20"
            height={toY(data.handel2013)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={26}
            y={249 - toY(data.handel2013) - 22}
            width="30"
            height={15}
            fill="white"
            stroke="none"
          />
          <text
            x={41}
            y={249 - toY(data.handel2013) - 10}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            {pp(data.handel2013)}
          </text>
          <rect
            x={72}
            y={249 - toY(data.handel2014)}
            width="20"
            height={toY(data.handel2014)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={67}
            y={249 - toY(data.handel2014) - 22}
            width="30"
            height={15}
            fill="white"
            stroke="none"
          />
          <text
            x={82}
            y={249 - toY(data.handel2014) - 10}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            {pp(data.handel2014)}
          </text>
          <rect
            x={113}
            y={249 - toY(data.handel2015)}
            width="20"
            height={toY(data.handel2015)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={108}
            y={249 - toY(data.handel2015) - 20}
            width="30"
            height={10}
            fill="white"
            stroke="none"
          />
          <text
            x={123}
            y={249 - toY(data.handel2015) - 10}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            {pp(data.handel2015)}
          </text>
          <rect
            x={154}
            y={249 - toY(data.handel2016)}
            width="20"
            height={toY(data.handel2016)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={149}
            y={249 - toY(data.handel2016) - 20}
            width="30"
            height={10}
            fill="white"
            stroke="none"
          />
          <text
            x={164}
            y={249 - toY(data.handel2016) - 10}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            {pp(data.handel2016)}
          </text>
          <rect
            x={195}
            y={249 - toY(data.handel2017)}
            width="20"
            height={toY(data.handel2017)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={190}
            y={249 - toY(data.handel2017) - 20}
            width="30"
            height={10}
            fill="white"
            stroke="none"
          />
          <text
            x={205}
            y={249 - toY(data.handel2017) - 10}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            {pp(data.handel2017)}
          </text>
          <rect
            x={236}
            y={249 - toY(data.handel2018)}
            width="20"
            height={toY(data.handel2018)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={231}
            y={249 - toY(data.handel2018) - 20}
            width="30"
            height={10}
            fill="white"
            stroke="none"
          />
          <text
            x={246}
            y={249 - toY(data.handel2018) - 10}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            {pp(data.handel2018)}
          </text>
          <rect
            x={277}
            y={249 - toY(data.handel2019)}
            width="20"
            height={toY(data.handel2019)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={272}
            y={249 - toY(data.handel2019) - 20}
            width="30"
            height={10}
            fill="white"
            stroke="none"
          />
          <text
            x={287}
            y={249 - toY(data.handel2019) - 10}
            fontSize={12}
            textAnchor="middle"
            stroke="black"
          >
            {pp(data.handel2019)}
          </text>
        </svg>
        <ul>
          <li>
            Um wie viel Prozent ist der Umsatz des Onlinehandels von 2016 bis
            2019 insgesamt gestiegen?
          </li>
        </ul>
        <p>
          Das Kreisdiagramm zeigt die Umsatzanteile verschiedener Bereiche am
          Gesamtumsatz des Onlinehandels im Jahr 2017.
        </p>
        <svg width="328" height="270">
          <text x={164} y={15} fontSize={15} textAnchor="middle" stroke="black">
            Umsatzanteile am Onlinehandel 2017
          </text>
          {PieChart()}
        </svg>
        <ul>
          <li>
            Wie hoch war der Umsatz (in Euro) für den Bereich {'"'}Freizeit und
            Hobby{'"'}?
          </li>
        </ul>
        <p>
          Laut einer Untersuchung entfielen im Jahr 2017 allein {data.smart} %
          des Bereichs {'"'}Elektronik{'"'} auf den Onlinehandel mit
          Smartphones.{' '}
        </p>
        <ul>
          <li>
            Wie viel Euro wurden nach dieser Untersuchung im Onlinehandel für
            Smartphones ausgegeben?
          </li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          <strong>Zuwachs in Prozent</strong>
        </p>
        <ul>
          <li>
            Im Jahr 2016 wurden {pp(data.handel2016)} Mrd. € Umsatz erzielt.
          </li>
          <li>
            Im Jahr 2019 wurden {pp(data.handel2019)} Mrd. € Umsatz erzielt.
          </li>
        </ul>
        <p>Berechne den Prozentsatz mit der Formel:</p>
        {buildEquation([
          [<>p</>, <>=</>, <>{buildInlineFrac(<>W</>, <>G</>)}</>],
          [
            <></>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{pp(data.handel2019)} Mrd. €</>,
                <>{pp(data.handel2016)} Mrd. €</>,
              )}
            </>,
          ],
          [
            <></>,
            <>≈</>,
            <>{pp(roundToDigits(data.handel2019 / data.handel2016, 4))}</>,
          ],
          [
            <></>,
            <>=</>,
            <>
              {pp(100 * roundToDigits(data.handel2019 / data.handel2016, 4))} %
            </>,
          ],
        ])}
        <p>Der Zuwachs beträgt damit:</p>
        <p>
          {pp(100 * roundToDigits(data.handel2019 / data.handel2016, 4))} % −
          100 % ={' '}
          <strong>
            {pp(
              100 * roundToDigits(data.handel2019 / data.handel2016, 4) - 100,
            )}{' '}
            %
          </strong>
        </p>
        <p>
          <strong>
            Umsatz im Bereich {'"'}Freizeit und Hobby{'"'}
          </strong>
        </p>
        <p>
          In 2017 beträgt der Umsatz {pp(data.handel2017)} Mrd. €. Im Bereiech{' '}
          {'"'}Freizeit und Hobby{'"'} wurden <br></br>
          {pp(data.freizeit)} % des Umsatzes erzielt.
        </p>
        <p>
          Wandle den Prozentsatz in eine Dezimalzahl um: <br></br>
          {pp(data.freizeit)} % ≙ {pp(data.freizeit / 100)}
        </p>
        <p>Berechne den Prozentwert mit der Formel:</p>
        {buildEquation([
          [<>W</>, <>=</>, <>G · p</>],
          [
            <></>,
            <>=</>,
            <>
              {pp(data.handel2017)} Mrd. € · {pp(data.freizeit / 100)}
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              <strong>
                {pp((data.handel2017 * data.freizeit) / 100)} Mrd. €
              </strong>
            </>,
          ],
        ])}
        <p>
          <strong>Ausgaben für Smartphones</strong>
        </p>
        <p>
          Wandle den Prozentsatz des Bereichs {'"'}Elektronik
          {'"'} in eine Dezimalzahl um: <br></br>
          {pp(data.elektronik)} % ≙ {pp(data.elektronik / 100)}
        </p>
        <p>
          Berechne den Prozentwert des Umsatzes, der im Bereich {'"'}Elektronik
          {'"'} erzielt wurde.
        </p>

        {buildEquation([
          [<>W</>, <>=</>, <>G · p</>],
          [
            <></>,
            <>=</>,
            <>
              {pp(data.handel2017)} Mrd. € · {pp(data.elektronik / 100)}
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              <strong>
                {pp((data.handel2017 * data.elektronik) / 100)} Mrd. €
              </strong>
            </>,
          ],
        ])}
        <p>
          Hiervon wurden {data.smart} % ≙ {pp(data.smart / 100)} mit Smartphones
          erzielt. Berechne diesen Anteil:
        </p>
        <p>
          {pp((data.handel2017 * data.elektronik) / 100)} Mrd. € ·{' '}
          {pp(data.smart / 100)} ={' '}
          <strong>
            {pp((data.handel2017 * data.elektronik * data.smart) / 10000)} Mrd.
            €
          </strong>
        </p>
      </>
    )
  },
}
