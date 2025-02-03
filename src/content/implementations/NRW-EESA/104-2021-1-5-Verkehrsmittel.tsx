import { Exercise } from '@/data/types'
import { Color5 } from '@/helper/colors'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  fuß: number
  fahrrad: number
  öffi: number
  personen: number
}

export const exercise104: Exercise<DATA> = {
  title: 'Verkehrsmittel',
  source: '2021 Teil 1 Aufgabe 5',
  useCalculator: true,
  duration: 8,
  generator(rng) {
    return {
      fuß: rng.randomIntBetween(15, 35),
      fahrrad: rng.randomIntBetween(10, 15),
      öffi: rng.randomIntBetween(20, 40),
      personen: rng.randomIntBetween(40, 60) * 10,
    }
  },
  originalData: { fuß: 25, fahrrad: 10, öffi: 34, personen: 550 },
  learningPathData: { fuß: 35, fahrrad: 13, öffi: 40, personen: 400 },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          {data.personen} Personen wurden gefragt, wie sie ihren Weg zur Arbeit
          zurücklegen. Das Ergebnis ist in der Tabelle dargestellt:
        </p>
        <svg width="320" height="81" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="10"
            y="10"
            width="270"
            height="44"
            fill="#D2ECF6"
            stroke="none"
          />

          <rect
            x="10"
            y="10"
            width="270"
            height="70"
            rx="4"
            ry="4"
            stroke="#007EC1"
            fill="transparent"
            strokeWidth="1"
          />

          <line
            x1="10"
            y1="54"
            x2="280"
            y2="54"
            stroke="#007EC1"
            strokeWidth="1"
          />
          <line
            x1="225"
            y1="10"
            x2="225"
            y2="80"
            stroke="#007EC1"
            strokeWidth="1"
          />
          <line
            x1="78"
            y1="10"
            x2="78"
            y2="80"
            stroke="#007EC1"
            strokeWidth="1"
          />
          <line
            x1="137"
            y1="10"
            x2="137"
            y2="80"
            stroke="#007EC1"
            strokeWidth="1"
          />
          <text
            x="46"
            y="37"
            fontSize="10"
            textAnchor="middle"
            fontWeight="bold"
            fill="black"
          >
            Zu Fuß
          </text>
          <text
            x="180"
            y="30"
            fontSize="10"
            textAnchor="middle"
            fontWeight="bold"
            fill="black"
          >
            Öffentliche
          </text>
          <text
            x="180"
            y="42"
            fontSize="10"
            textAnchor="middle"
            fontWeight="bold"
            fill="black"
          >
            Verkehrsmittel
          </text>
          <text
            x="252"
            y="37"
            fontSize="10"
            textAnchor="middle"
            fontWeight="bold"
            fill="black"
          >
            Auto
          </text>
          <text x="46" y="70" fontSize="10" textAnchor="middle" fill="black">
            {data.fuß} %
          </text>
          <text x="110" y="70" fontSize="10" textAnchor="middle" fill="black">
            {data.fahrrad} %
          </text>
          <text x="182" y="70" fontSize="10" textAnchor="middle" fill="black">
            {data.öffi} %
          </text>
          <text x="255" y="70" fontSize="10" textAnchor="middle" fill="black">
            {100 - data.fuß - data.fahrrad - data.öffi} %
          </text>
          <text
            x="108"
            y="37"
            fontSize="10"
            textAnchor="middle"
            fontWeight="bold"
            fill="black"
          >
            Fahrrad
          </text>
          <text
            x="160"
            y="48"
            fontSize="10"
            textAnchor="middle"
            fill="black"
          ></text>
          <text
            x="160"
            y="70"
            fontSize="10"
            textAnchor="middle"
            fill="black"
          ></text>
          <text
            x="160"
            y="92"
            fontSize="10"
            textAnchor="middle"
            fill="black"
          ></text>
          <text
            x="160"
            y="114"
            fontSize="10"
            textAnchor="middle"
            fill="black"
          ></text>
          <text
            x="160"
            y="136"
            fontSize="10"
            textAnchor="middle"
            fill="black"
          ></text>
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 2,
      duration: 4,
      intro({ data }) {
        return <></>
      },
      task({ data }) {
        return (
          //a)
          <>
            <p>
              Berechne, wie viele der gefragten Personen mit öffentlichen
              Verkehrsmitteln zur Arbeit fahren.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Berechne den Anteil mit der Formel für den <b>Prozentwert</b>.
            </p>
            <p>Wandle dazu den Prozentsatz in eine Dezimalzahl um:</p>
            <p>
              {data.öffi} % ≙ {pp(data.öffi / 100)}
            </p>
            <p>Setze in die Formel ein und berechne:</p>
            {buildEquation([
              [<>W</>, <>=</>, <>G · p</>],
              [
                <></>,
                <>=</>,
                <>
                  {data.personen} · {pp(data.öffi / 100)}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <strong>
                    {pp(roundToDigits((data.personen * data.öffi) / 100, 2))}
                  </strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 2,
      duration: 4,
      intro({ data }) {
        return null
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
        function PieChart() {
          const centerX = 164
          const centerY = 125
          const radius = 120
          const sector1 = (360 * data.öffi) / 100 // Größe des ersten Sektors in Grad
          const sector2 = (360 * data.fahrrad) / 100 // Größe des zweiten Sektors in Grad
          const sector3 = (360 * data.fuß) / 100 // Größe des dritten Sektors in Grad

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
          const label1Pos = LabelPosition(centerX, centerY, radius, sector1 / 2)
          const label2Pos = LabelPosition(
            centerX,
            centerY,
            radius,
            sector1 + sector2 / 2,
          )
          const label3Pos = LabelPosition(
            centerX,
            centerY,
            radius,
            sector1 + sector2 + sector3 / 2,
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
              <path d={path3} fill="none" />

              <text
                x={label1Pos.x}
                y={label1Pos.y}
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                Öffentliche
              </text>
              <text
                x={label1Pos.x}
                y={label1Pos.y + 11}
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                Verkehrsmittel
              </text>
              <text
                x={label2Pos.x}
                y={label2Pos.y}
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                Fahrrad
              </text>
            </svg>
          )
        }

        return (
          //b)
          <>
            <p>Die Ergebnisse werden in einem Kreisdiagramm dargestellt.</p>
            <p>Vervollständige das Kreisdiagramm.</p>
            <svg width="328" height="270">
              <circle
                cx="164"
                cy="125"
                r="120"
                fill="none"
                stroke="black"
                strokeWidth={3}
              />
              {PieChart()}
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 1: Verkehrsmittel für den Arbeitsweg
                </span>
              </Color5>
            </center>
          </>
        )
      },
      solution({ data }) {
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
          const radius = 120
          const sector1 = (360 * data.öffi) / 100 // Größe des ersten Sektors in Grad
          const sector2 = (360 * data.fahrrad) / 100 // Größe des zweiten Sektors in Grad
          const sector3 = (360 * data.fuß) / 100 // Größe des dritten Sektors in Grad
          const sector4 =
            (360 * (100 - data.öffi - data.fahrrad - data.fuß)) / 100

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
            sector1 + sector2,
            sector1 + sector2 + sector3 + sector4,
          )
          const label1Pos = LabelPosition(centerX, centerY, radius, sector1 / 2)
          const label2Pos = LabelPosition(
            centerX,
            centerY,
            radius,
            sector1 + sector2 / 2,
          )
          const label3Pos = LabelPosition(
            centerX,
            centerY,
            radius,
            sector1 + sector2 + sector3 / 2,
          )
          const label4Pos = LabelPosition(
            centerX,
            centerY,
            radius,
            sector1 + sector2 + sector3 + sector4 / 2,
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
              <path d={path3} fill="lightgreen" />
              <path d={path4} fill="none" />
              <text
                x={label1Pos.x}
                y={label1Pos.y}
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                Öffentliche
              </text>
              <text
                x={label1Pos.x}
                y={label1Pos.y + 11}
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                Verkehrsmittel
              </text>
              <text
                x={label2Pos.x}
                y={label2Pos.y}
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                Fahrrad
              </text>
              <text
                x={label3Pos.x}
                y={label3Pos.y}
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                zu Fuß
              </text>
              <text
                x={label4Pos.x}
                y={label4Pos.y}
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                Auto
              </text>
            </svg>
          )
        }
        return (
          <>
            <p>Winkel berechnen: </p>
            <p>Im Kreisdiagramm fehlen zwei Sektoren:</p>
            <ul>
              <li>
                {'"'}Zu Fuß{'"'}, mit {data.fuß} %
              </li>
              <li>
                {'"'}Auto{'"'}, mit {100 - data.fahrrad - data.fuß - data.öffi}{' '}
                %
              </li>
            </ul>
            <p>
              Berechne den Winkel, den die Kreissektoren jeweils besitzen.
              Multipliziere den Prozentsatz dazu mit den 360° des Kreises:
            </p>
            <ul>
              <li>
                {'"'}Zu Fuß{'"'}: 360° · {pp(data.fuß / 100)} ={' '}
                <b>{pp((360 * data.fuß) / 100)}°</b>
              </li>
              <li>
                {'"'}Auto{'"'}: 360° ·{' '}
                {pp((100 - data.fahrrad - data.fuß - data.öffi) / 100)} ={' '}
                <b>
                  {pp(
                    360 * ((100 - data.fahrrad - data.fuß - data.öffi) / 100),
                  )}
                  °
                </b>
              </li>
            </ul>
            <hr style={{ margin: '10px 0' }} />
            <p>Kreisdiagramm zeichnen: </p>
            <p>
              Zeichne die Sektoren mit den berechneten Winkeln mithilfe eines
              Geodreiecks ein:
            </p>
            <svg width="328" height="270">
              <circle
                cx="164"
                cy="125"
                r="120"
                fill="none"
                stroke="black"
                strokeWidth={3}
              />
              {PieChart()}
            </svg>
          </>
        )
      },
    },
  ],
}
