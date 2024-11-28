import { Exercise } from '@/data/types'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  zehn: number
  zwanzig: number
  dreißig: number
  vierzig: number

  nutzer_2019: number
  nutzer_2020: number
  nutzer_2021: number
  nutzer_2022: number
  nutzer_2023: number
  anzahl: number
  case: number
}

export const exercise212: Exercise<DATA> = {
  title: 'Diagramm',
  source: '2024 Pflichtteil A2 Aufgabe 6',
  useCalculator: true,
  duration: 7,
  points: 3,
  generator(rng) {
    return {
      zehn: rng.randomIntBetween(20, 26),
      zwanzig: rng.randomIntBetween(20, 24),
      dreißig: rng.randomIntBetween(20, 23),
      vierzig: rng.randomIntBetween(15, 22),

      nutzer_2019: rng.randomIntBetween(105, 120) * 1000,
      nutzer_2020: rng.randomIntBetween(300, 345) * 1000,
      nutzer_2021: rng.randomIntBetween(380, 405) * 1000,
      nutzer_2022: rng.randomIntBetween(415, 425) * 1000,
      nutzer_2023: rng.randomIntBetween(450, 475) * 1000,
      anzahl: rng.randomIntBetween(400, 600) * 100,
      case: rng.randomIntBetween(1, 3),
    }
  },
  originalData: {
    zehn: 25,
    zwanzig: 22,
    dreißig: 22,
    vierzig: 20,
    nutzer_2019: 113000,
    nutzer_2020: 340000,
    nutzer_2021: 400000,
    nutzer_2022: 420000,
    nutzer_2023: 500220,
    anzahl: 47500,
    case: 1,
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
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
    const fünfzig = 100 - data.zehn - data.zwanzig - data.dreißig - data.vierzig
    function PieChart() {
      const centerX = 164
      const centerY = 125
      const radius = 100
      const sector1 = (360 * data.zehn) / 100 // Größe des ersten Sektors in Grad
      const sector2 = (360 * data.zwanzig) / 100 // Größe des zweiten Sektors in Grad
      const sector3 = (360 * data.dreißig) / 100 // Größe des dritten Sektors in Grad
      const sector4 = (360 * data.vierzig) / 100 // Größe des dritten Sektors in Grad
      const sector5 = (360 * fünfzig) / 100 // Größe des dritten Sektors in Grad

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
      const label1Pos2 = LabelPosition(
        centerX,
        centerY,
        radius + 60,
        sector1 / 2,
      )
      const label2Pos2 = LabelPosition(
        centerX,
        centerY,
        radius + 60,
        sector1 + sector2 / 2,
      )
      const label3Pos2 = LabelPosition(
        centerX,
        centerY,
        radius + 60,
        sector1 + sector2 + sector3 / 2,
      )
      const label4Pos2 = LabelPosition(
        centerX,
        centerY,
        radius + 60,
        sector1 + sector2 + sector3 + sector4 / 2,
      )
      const label5Pos2 = LabelPosition(
        centerX,
        centerY,
        radius + 60,
        sector1 + sector2 + sector3 + sector4 + sector5 / 2,
      )
      return (
        <svg width="328" height="270">
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

          <text
            x={label1Pos.x}
            y={label1Pos.y}
            fontSize="20"
            textAnchor="middle"
            fill="black"
          >
            {data.zehn} %
          </text>

          <text
            x={label2Pos.x}
            y={label2Pos.y}
            fontSize="20"
            textAnchor="middle"
            fill="black"
          >
            {data.zwanzig} %
          </text>
          <text
            x={label3Pos.x}
            y={label3Pos.y}
            fontSize="20"
            textAnchor="middle"
            fill="black"
          >
            {data.dreißig} %
          </text>
          <text
            x={label4Pos.x}
            y={label4Pos.y}
            fontSize="20"
            textAnchor="middle"
            fill="black"
          >
            {data.vierzig} %
          </text>
          <text
            x={label5Pos.x}
            y={label5Pos.y}
            fontSize="20"
            textAnchor="middle"
            fill="black"
          >
            {fünfzig} %
          </text>
          <text
            x={label5Pos.x}
            y={label5Pos.y}
            fontSize="20"
            textAnchor="middle"
            fill="black"
          >
            {fünfzig} %
          </text>
          <text
            x={label1Pos2.x + 30}
            y={label1Pos2.y}
            fontSize="15"
            textAnchor="middle"
            fill="black"
          >
            10 bis 19 Jahre
          </text>
          <text
            x={label2Pos2.x}
            y={label2Pos2.y}
            fontSize="15"
            textAnchor="middle"
            fill="black"
          >
            20 bis 29 Jahre
          </text>
          <text
            x={label3Pos2.x}
            y={label3Pos2.y + 10}
            fontSize="15"
            textAnchor="middle"
            fill="black"
          >
            30 bis 39 Jahre
          </text>
          <text
            x={label4Pos2.x + 5}
            y={label4Pos2.y - 25}
            fontSize="15"
            textAnchor="middle"
            fill="black"
          >
            40 bis 49 Jahre
          </text>
          <text
            x={label5Pos2.x}
            y={label5Pos2.y}
            fontSize="15"
            textAnchor="middle"
            fill="black"
          >
            über 50 Jahre
          </text>
        </svg>
      )
    }
    function toY(n: number) {
      return n * (191.5 / 500000)
    }
    return (
      <>
        <p>
          Das Diagramm zeigt die Entwicklung der Nutzerzahlen der App {'"'}
          Perfect Fit{'"'}.
        </p>
        <ul>
          <li>
            Um wie viel Prozent ist die Anzahl der Nutzer von 2020 bis 2022
            insgesamt gestiegen?
          </li>
        </ul>
        <p>
          Im Jahr 2023 stiegen die Nutzerzahlen um{' '}
          {pp(
            roundToDigits(100 * (data.nutzer_2023 / data.nutzer_2022) - 100, 1),
          )}{' '}
          % gegenüber dem Vorjahr an.
        </p>
        <ul>
          <li>Zeichne die Säule des Jahres 2023 in das Diagramm ein.</li>
        </ul>
        <svg viewBox="0 0 328 250">
          <image
            href="/content/BW_Realschule/212_Diagramm1.jpg"
            height="250"
            width="328"
          />
          <rect
            x="83"
            y={215 - toY(data.nutzer_2019)}
            width="20"
            height={toY(data.nutzer_2019)}
            fill="gray"
            stroke="black"
          />
          <rect
            x="134"
            y={215 - toY(data.nutzer_2020)}
            width="20"
            height={toY(data.nutzer_2020)}
            fill="gray"
            stroke="black"
          />
          <rect
            x="185"
            y={215 - toY(data.nutzer_2021)}
            width="20"
            height={toY(data.nutzer_2021)}
            fill="gray"
            stroke="black"
          />
          <rect
            x="235"
            y={215 - toY(data.nutzer_2022)}
            width="20"
            height={toY(data.nutzer_2022)}
            fill="gray"
            stroke="black"
          />
          <text
            x={228}
            y={210 - toY(data.nutzer_2022)}
            fontSize={10}
            textAnchor="right"
            stroke="black"
          >
            {data.nutzer_2022}
          </text>
          <text
            x={176}
            y={210 - toY(data.nutzer_2021)}
            fontSize={10}
            textAnchor="right"
            stroke="black"
          >
            {data.nutzer_2021}
          </text>
          <text
            x={126}
            y={210 - toY(data.nutzer_2020)}
            fontSize={10}
            textAnchor="right"
            stroke="black"
          >
            {data.nutzer_2020}
          </text>
          <text
            x={77}
            y={210 - toY(data.nutzer_2019)}
            fontSize={10}
            textAnchor="right"
            stroke="black"
          >
            {data.nutzer_2019}
          </text>
        </svg>

        <p>
          Von den {data.case == 1 && <>10 - bis 19</>}
          {data.case == 2 && <>20 - bis 29</>}
          {data.case == 3 && <>30 - bis 39</>}
          -jährigen Nutzern im Jahr 2022 sind {data.anzahl} Frauen.
        </p>
        <ul>
          <li>
            Berechne den prozentualen Anteil der Frauen an den{' '}
            {data.case == 1 && <>10 - bis 19</>}
            {data.case == 2 && <>20 - bis 29</>}
            {data.case == 3 && <>30 - bis 39</>}
            -jährigen Nutzern.
          </li>
        </ul>
        <svg width="328" height="270">
          {PieChart()}
        </svg>
      </>
    )
  },
  solution({ data }) {
    function toY(n: number) {
      return n * (191.5 / 500000)
    }
    return (
      <>
        <p>
          <strong>Ansteig der Nutzer berechnen</strong>
        </p>
        <p>Berechne den Prozentsatz des Anstiegs mit der Formel:</p>
        {buildEquation([
          [<>p</>, <>=</>, <>{buildInlineFrac('W', 'G')}</>],
          [
            <></>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{data.nutzer_2022}</>,
                <>{data.nutzer_2020}</>,
              )}
            </>,
          ],
          [
            <></>,
            <>≈</>,
            <>{pp(roundToDigits(data.nutzer_2022 / data.nutzer_2020, 2))}</>,
          ],
          [
            <></>,
            <>≙</>,
            <>
              {pp(100 * roundToDigits(data.nutzer_2022 / data.nutzer_2020, 2))}{' '}
              %
            </>,
          ],
        ])}
        <p>
          Der Anstieg beträgt damit etwa<br></br>{' '}
          {pp(100 * roundToDigits(data.nutzer_2022 / data.nutzer_2020, 2))} % −
          100 % ={' '}
          <strong>
            {pp(
              100 * roundToDigits(data.nutzer_2022 / data.nutzer_2020, 2) - 100,
            )}{' '}
            %
          </strong>
        </p>
        <p>
          <strong>Säule des Jahres 2023</strong>
        </p>
        <p>
          Berechne die Anzahl der Nutzer im Jahr 2023. Diese betragen{' '}
          {pp(
            roundToDigits(100 * (data.nutzer_2023 / data.nutzer_2022) - 100, 1),
          )}{' '}
          % mehr als im Jahr 2022:
        </p>
        <p>
          {data.nutzer_2022} · 1,
          {pp(
            10 *
              roundToDigits(
                100 * (data.nutzer_2023 / data.nutzer_2022) - 100,
                1,
              ),
          )}{' '}
          ≈ {data.nutzer_2023}
        </p>
        <p>Zeichne die Säule in das Diagramm ein:</p>
        <svg viewBox="0 0 328 250">
          <image
            href="/content/BW_Realschule/212_Diagramm1.jpg"
            height="250"
            width="328"
          />
          <rect
            x="83"
            y={215 - toY(data.nutzer_2019)}
            width="20"
            height={toY(data.nutzer_2019)}
            fill="gray"
            stroke="black"
          />
          <rect
            x="134"
            y={215 - toY(data.nutzer_2020)}
            width="20"
            height={toY(data.nutzer_2020)}
            fill="gray"
            stroke="black"
          />
          <rect
            x="185"
            y={215 - toY(data.nutzer_2021)}
            width="20"
            height={toY(data.nutzer_2021)}
            fill="gray"
            stroke="black"
          />
          <rect
            x="235"
            y={215 - toY(data.nutzer_2022)}
            width="20"
            height={toY(data.nutzer_2022)}
            fill="gray"
            stroke="black"
          />
          <rect
            x="282"
            y={215 - toY(data.nutzer_2023)}
            width="20"
            height={toY(data.nutzer_2023)}
            fill="gray"
            stroke="black"
          />
          <text
            x={228}
            y={210 - toY(data.nutzer_2022)}
            fontSize={10}
            textAnchor="right"
            stroke="black"
          >
            {data.nutzer_2022}
          </text>
          <text
            x={176}
            y={210 - toY(data.nutzer_2021)}
            fontSize={10}
            textAnchor="right"
            stroke="black"
          >
            {data.nutzer_2021}
          </text>
          <text
            x={126}
            y={210 - toY(data.nutzer_2020)}
            fontSize={10}
            textAnchor="right"
            stroke="black"
          >
            {data.nutzer_2020}
          </text>
          <text
            x={77}
            y={210 - toY(data.nutzer_2019)}
            fontSize={10}
            textAnchor="right"
            stroke="black"
          >
            {data.nutzer_2019}
          </text>
          <text
            x={274}
            y={210 - toY(data.nutzer_2023)}
            fontSize={10}
            textAnchor="right"
            stroke="black"
          >
            {data.nutzer_2023}
          </text>
        </svg>
        <p>
          <strong>Prozentualer Anteil der Frauen</strong>
        </p>
        <p>
          Die {data.case == 1 && <>10 - bis 19</>}
          {data.case == 2 && <>20 - bis 29</>}
          {data.case == 3 && <>30 - bis 39</>}
          -jährigen Nutzern machen {data.case == 1 && <>{data.zehn} %</>}
          {data.case == 2 && <>{data.zwanzig} %</>}
          {data.case == 3 && <>{data.dreißig} %</>} der Nutzer aus. Im Jahr 2022
          entspricht das:
        </p>
        <p>
          {data.nutzer_2022} · {data.case == 1 && <>{pp(data.zehn / 100)} </>}
          {data.case == 2 && <>{pp(data.zwanzig / 100)} </>}
          {data.case == 3 && <>{pp(data.dreißig / 100)}</>} ={' '}
          {data.case == 1 && <>{pp((data.nutzer_2022 * data.zehn) / 100)} </>}
          {data.case == 2 && (
            <>{pp((data.nutzer_2022 * data.zwanzig) / 100)} </>
          )}
          {data.case == 3 && <>{pp((data.nutzer_2022 * data.dreißig) / 100)}</>}{' '}
          Personen
        </p>
        <p>Hiervon sind {data.anzahl} Frauen. Berechne den Prozentsatz:</p>
        <p>
          p = {buildInlineFrac('W', 'G')} =
          {buildInlineFrac(
            <>{data.anzahl}</>,
            <>
              {data.case == 1 && (
                <>{pp((data.nutzer_2022 * data.zehn) / 100)} </>
              )}
              {data.case == 2 && (
                <>{pp((data.nutzer_2022 * data.zwanzig) / 100)} </>
              )}
              {data.case == 3 && (
                <>{pp((data.nutzer_2022 * data.dreißig) / 100)}</>
              )}
            </>,
          )}{' '}
          ≈{' '}
          {data.case == 1 && (
            <>
              {pp(
                roundToDigits(
                  data.anzahl / ((data.nutzer_2022 * data.zehn) / 100),
                  4,
                ),
              )}{' '}
            </>
          )}
          {data.case == 2 && (
            <>
              {pp(
                roundToDigits(
                  data.anzahl / ((data.nutzer_2022 * data.zwanzig) / 100),
                  4,
                ),
              )}{' '}
            </>
          )}
          {data.case == 3 && (
            <>
              {pp(
                roundToDigits(
                  data.anzahl / ((data.nutzer_2022 * data.dreißig) / 100),
                  4,
                ),
              )}
            </>
          )}{' '}
          ={' '}
          <strong>
            {data.case == 1 && (
              <>
                {pp(
                  100 *
                    roundToDigits(
                      data.anzahl / ((data.nutzer_2022 * data.zehn) / 100),
                      4,
                    ),
                )}{' '}
              </>
            )}
            {data.case == 2 && (
              <>
                {pp(
                  100 *
                    roundToDigits(
                      data.anzahl / ((data.nutzer_2022 * data.zwanzig) / 100),
                      4,
                    ),
                )}{' '}
              </>
            )}
            {data.case == 3 && (
              <>
                {pp(
                  100 *
                    roundToDigits(
                      data.anzahl / ((data.nutzer_2022 * data.dreißig) / 100),
                      4,
                    ),
                )}{' '}
              </>
            )}{' '}
            %
          </strong>
        </p>
      </>
    )
  },
}
