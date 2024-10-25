import { Exercise } from '@/data/types'
import { Color1, Color2, Color4, Color5 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  x_s: number
  y_s: number
  coin: boolean
  fake_a: number
  fake_x: number
  fake_y: number
  g: number
}

export const exercise29: Exercise<DATA> = {
  title: 'Blobbing',
  source: '2021 Teil 2 Aufgabe 2',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    return {
      x_s: rng.randomIntBetween(4, 7),
      y_s: rng.randomIntBetween(5, 8),
      coin: rng.randomBoolean(),
      fake_a: -rng.randomIntBetween(16, 25) / 100,
      fake_x: rng.randomIntBetween(3, 8),
      fake_y: rng.randomIntBetween(3, 8),
      g: rng.randomIntBetween(900, 1100) / 100,
    }
  },
  originalData: {
    x_s: 5,
    y_s: 6,
    coin: false,
    fake_a: -0.28,
    fake_x: 5,
    fake_y: 8,
    g: 9.81,
  },
  constraint({ data }) {
    return (
      (((1 - data.y_s) / (data.x_s * data.x_s)) * 100) % 1 == 0 &&
      data.fake_x != data.x_s &&
      data.fake_y != data.y_s &&
      (1 - data.y_s) / (data.x_s * data.x_s) != data.fake_a
    )
  },
  intro({ data }) {
    function getDuration(t: number) {
      return roundToDigits(Math.pow((2 * t) / data.g, 0.5), 2)
    }
    return (
      <>
        <p>Blobbing ist eine Wassersportart im Freien (Abbildung 1).</p>
        <img src="/content/NRW_MSA_Blobbing.jpg" alt="" />
        <center>
          <Color5>
            <span style={{ fontSize: 'small' }}>
              Abbildung 1: Ablauf eines Blobbingsprunges als überlagerte
              Aufnahme
            </span>
          </Color5>
        </center>

        <p>
          Eine vereinfachte Darstellung des Ablaufs ist in Abbildung 2
          dargestellt. Beim Blobbing liegt ein mit Luft gefülltes Kissen im
          Wasser.
        </p>
        <p>(1) Der Jumper springt vom Turm auf das Luftkissen.</p>
        <p>
          (2) Auf der anderen Seite des Kissens ist der Blobber. Durch den
          Sprung befördert der Jumper den Blobber in die Luft.
        </p>
        <p>
          (3) Der Blobber wird in die Luft geschleudert und landet dann im
          Wasser.
        </p>
        <img src="/content/NRW_MSA_Blobbing_2.png" alt="" />
        <center>
          <Color5>
            <span style={{ fontSize: 'small' }}>
              Abbildung 2: Vereinfachte Darstellung des Blobbing-Ablaufs (nicht
              maßstabsgetreu)
            </span>
          </Color5>
        </center>

        <p>
          Der Jumper kann zwischen verschiedenen Absprunghöhen wählen. Ein
          Sprung aus fünf Meter Höhe dauert ca. {pp(getDuration(5))}{' '}
          {getDuration(5) == 1 ? 'Sekunde' : 'Sekunden'}. Ein Sprung aus zehn
          Meter Höhe dauert ca. {pp(getDuration(10))} Sekunden.
        </p>
        <center>
          <svg width="180" height="132" xmlns="http://www.w3.org/2000/svg">
            <rect
              x="0"
              y="0"
              width="180"
              height="22"
              fill="#D2ECF6"
              stroke="none"
            />

            <rect
              x="0"
              y="0"
              width="180"
              height="132"
              rx="4"
              ry="4"
              stroke="#007EC1"
              fill="transparent"
              strokeWidth="1"
            />

            <line
              x1="0"
              y1="22"
              x2="180"
              y2="22"
              stroke="#007EC1"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="44"
              x2="180"
              y2="44"
              stroke="#007EC1"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="66"
              x2="180"
              y2="66"
              stroke="#007EC1"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="88"
              x2="180"
              y2="88"
              stroke="#007EC1"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="110"
              x2="180"
              y2="110"
              stroke="#007EC1"
              strokeWidth="1"
            />
            <text
              x="45"
              y="16"
              fontSize="10"
              textAnchor="middle"
              fontWeight="bold"
              fill="black"
            >
              Absprunghöhe
            </text>
            <text x="45" y="38" fontSize="10" textAnchor="middle" fill="black">
              0 m
            </text>
            <text x="135" y="38" fontSize="10" textAnchor="middle" fill="black">
              0 s
            </text>
            <text x="45" y="60" fontSize="10" textAnchor="middle" fill="black">
              3 m
            </text>
            <text x="135" y="60" fontSize="10" textAnchor="middle" fill="black">
              {pp(getDuration(3))} s
            </text>
            <text x="45" y="82" fontSize="10" textAnchor="middle" fill="black">
              5 m
            </text>
            <text x="135" y="82" fontSize="10" textAnchor="middle" fill="black">
              {pp(getDuration(5))} s
            </text>
            <text x="45" y="104" fontSize="10" textAnchor="middle" fill="black">
              10 m
            </text>
            <text
              x="135"
              y="104"
              fontSize="10"
              textAnchor="middle"
              fill="black"
            >
              {pp(getDuration(10))} s
            </text>
            <text x="45" y="126" fontSize="10" textAnchor="middle" fill="black">
              15 m
            </text>
            <text
              x="135"
              y="126"
              fontSize="10"
              textAnchor="middle"
              fill="black"
            >
              {pp(getDuration(15))} s
            </text>
            <line
              x1="90"
              y1="0"
              x2="90"
              y2="132"
              stroke="#007EC1"
              strokeWidth="1"
            />

            <text
              x="135"
              y="16"
              fontSize="10"
              textAnchor="middle"
              fontWeight="bold"
              fill="black"
            >
              Sprungdauer
            </text>

            <text
              x={75}
              y={48}
              fontSize={15}
              textAnchor="right"
              stroke="black"
            ></text>
            <text
              x={130}
              y={48}
              fontSize={15}
              textAnchor="right"
              stroke="black"
            ></text>
            <text
              x={190}
              y={48}
              fontSize={15}
              textAnchor="right"
              stroke="black"
            ></text>
            <text
              x={235}
              y={48}
              fontSize={15}
              textAnchor="right"
              stroke="black"
            ></text>
            <text
              x={282}
              y={48}
              fontSize={15}
              textAnchor="right"
              stroke="black"
            ></text>
          </svg>

          <Color5>
            <span style={{ fontSize: 'small' }}>
              Tabelle 1: Sprungdauer in Abhängigkeit von der Absprunghöhe
            </span>
          </Color5>
        </center>

        <img src="/content/NRW_MSA_Blobbing_4.jpg" alt="" />
      </>
    )
  },
  tasks: [
    {
      points: 3,
      task({ data }) {
        return (
          <>
            <p>
              a) Skizziere zu den Werten aus Tabelle 1 den passenden Graphen in
              dem abgebildeten Koordinatensystem (Abbildung 3).
            </p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 40 + n * (450 / 11.18)
        }
        function toY(n: number) {
          return 405 - n * ((4 * 450) / 11.18)
        }
        function generateParabolaPoints(step: number): string {
          let points = ''
          for (let x = 0; x <= 15; x += step) {
            const y = Math.pow((2 * x) / data.g, 0.5)
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints = generateParabolaPoints(0.1)
        return (
          <>
            <p>
              Skizziere zuerst die Punkte in ein Koordinatensystem. Der Graph
              verläuft glatt durch den Ursprung und die Punkte, ohne Kanten oder
              Sprünge.
            </p>
            <svg viewBox="0 0 700 500">
              <image
                href="/content/NRW_MSA_Blobbing_4.jpg"
                height="500"
                width="700"
              />
              <text
                x={toX(0) - 5}
                y={toY(0) + 5}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'×'}
              </text>
              <text
                x={toX(3) - 5}
                y={toY(Math.pow((2 * 3) / data.g, 0.5)) + 5}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'×'}
              </text>
              <text
                x={toX(5) - 5}
                y={toY(Math.pow((2 * 5) / data.g, 0.5)) + 5}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'×'}
              </text>
              <text
                x={toX(10) - 5}
                y={toY(Math.pow((2 * 10) / data.g, 0.5)) + 5}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'×'}
              </text>
              <text
                x={toX(15) - 5}
                y={toY(Math.pow((2 * 15) / data.g, 0.5)) + 5}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'×'}
              </text>
              <polyline
                points={parabolaPoints}
                stroke="blue"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </>
        )
      },
    },
    {
      points: 2,
      skillIntro({ data }) {
        function getDuration(t: number) {
          return roundToDigits(Math.pow((2 * t) / data.g, 0.5), 2)
        }
        return (
          <>
            <p>Blobbing ist eine Wassersportart im Freien (Abbildung 1).</p>
            <img src="/content/NRW_MSA_Blobbing.jpg" alt="" />
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 1: Ablauf eines Blobbingsprunges als überlagerte
                  Aufnahme
                </span>
              </Color5>
            </center>

            <p>
              Eine vereinfachte Darstellung des Ablaufs ist in Abbildung 2
              dargestellt. Beim Blobbing liegt ein mit Luft gefülltes Kissen im
              Wasser.
            </p>
            <p>(1) Der Jumper springt vom Turm auf das Luftkissen.</p>
            <p>
              (2) Auf der anderen Seite des Kissens ist der Blobber. Durch den
              Sprung befördert der Jumper den Blobber in die Luft.
            </p>
            <p>
              (3) Der Blobber wird in die Luft geschleudert und landet dann im
              Wasser.
            </p>
            <img src="/content/NRW_MSA_Blobbing_2.png" alt="" />
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 2: Vereinfachte Darstellung des Blobbing-Ablaufs
                  (nicht maßstabsgetreu)
                </span>
              </Color5>
            </center>

            <p>
              Der Jumper kann zwischen verschiedenen Absprunghöhen wählen. Ein
              Sprung aus fünf Meter Höhe dauert ca. {pp(getDuration(5))}{' '}
              {getDuration(5) == 1 ? 'Sekunde' : 'Sekunden'}. Ein Sprung aus
              zehn Meter Höhe dauert ca. {pp(getDuration(10))} Sekunden.
            </p>
            <center>
              <svg width="180" height="132" xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="0"
                  y="0"
                  width="180"
                  height="22"
                  fill="#D2ECF6"
                  stroke="none"
                />

                <rect
                  x="0"
                  y="0"
                  width="180"
                  height="132"
                  rx="4"
                  ry="4"
                  stroke="#007EC1"
                  fill="transparent"
                  strokeWidth="1"
                />

                <line
                  x1="0"
                  y1="22"
                  x2="180"
                  y2="22"
                  stroke="#007EC1"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1="44"
                  x2="180"
                  y2="44"
                  stroke="#007EC1"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1="66"
                  x2="180"
                  y2="66"
                  stroke="#007EC1"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1="88"
                  x2="180"
                  y2="88"
                  stroke="#007EC1"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1="110"
                  x2="180"
                  y2="110"
                  stroke="#007EC1"
                  strokeWidth="1"
                />
                <text
                  x="45"
                  y="16"
                  fontSize="10"
                  textAnchor="middle"
                  fontWeight="bold"
                  fill="black"
                >
                  Absprunghöhe
                </text>
                <text
                  x="45"
                  y="38"
                  fontSize="10"
                  textAnchor="middle"
                  fill="black"
                >
                  0 m
                </text>
                <text
                  x="135"
                  y="38"
                  fontSize="10"
                  textAnchor="middle"
                  fill="black"
                >
                  0 s
                </text>
                <text
                  x="45"
                  y="60"
                  fontSize="10"
                  textAnchor="middle"
                  fill="black"
                >
                  3 m
                </text>
                <text
                  x="135"
                  y="60"
                  fontSize="10"
                  textAnchor="middle"
                  fill="black"
                >
                  {pp(getDuration(3))} s
                </text>
                <text
                  x="45"
                  y="82"
                  fontSize="10"
                  textAnchor="middle"
                  fill="black"
                >
                  5 m
                </text>
                <text
                  x="135"
                  y="82"
                  fontSize="10"
                  textAnchor="middle"
                  fill="black"
                >
                  {pp(getDuration(5))} s
                </text>
                <text
                  x="45"
                  y="104"
                  fontSize="10"
                  textAnchor="middle"
                  fill="black"
                >
                  10 m
                </text>
                <text
                  x="135"
                  y="104"
                  fontSize="10"
                  textAnchor="middle"
                  fill="black"
                >
                  {pp(getDuration(10))} s
                </text>
                <text
                  x="45"
                  y="126"
                  fontSize="10"
                  textAnchor="middle"
                  fill="black"
                >
                  15 m
                </text>
                <text
                  x="135"
                  y="126"
                  fontSize="10"
                  textAnchor="middle"
                  fill="black"
                >
                  {pp(getDuration(15))} s
                </text>
                <line
                  x1="90"
                  y1="0"
                  x2="90"
                  y2="132"
                  stroke="#007EC1"
                  strokeWidth="1"
                />

                <text
                  x="135"
                  y="16"
                  fontSize="10"
                  textAnchor="middle"
                  fontWeight="bold"
                  fill="black"
                >
                  Sprungdauer
                </text>

                <text
                  x={75}
                  y={48}
                  fontSize={15}
                  textAnchor="right"
                  stroke="black"
                ></text>
                <text
                  x={130}
                  y={48}
                  fontSize={15}
                  textAnchor="right"
                  stroke="black"
                ></text>
                <text
                  x={190}
                  y={48}
                  fontSize={15}
                  textAnchor="right"
                  stroke="black"
                ></text>
                <text
                  x={235}
                  y={48}
                  fontSize={15}
                  textAnchor="right"
                  stroke="black"
                ></text>
                <text
                  x={282}
                  y={48}
                  fontSize={15}
                  textAnchor="right"
                  stroke="black"
                ></text>
              </svg>

              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Tabelle 1: Sprungdauer in Abhängigkeit von der Absprunghöhe
                </span>
              </Color5>
            </center>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              b) Überprüfe, ob es zwischen der Absprunghöhe und der Sprungdauer
              einen linearen Zusammenhang gibt. Notiere deinen Lösungsweg.
            </p>
          </>
        )
      },
      solution({ data }) {
        function getDuration(t: number) {
          return roundToDigits(Math.pow((2 * t) / data.g, 0.5), 2)
        }
        return (
          <>
            <p>
              Ein linearer Zusammenhang bedeutet, dass die Sprungdauer
              gleichmäßig mit der Sprunghöhe steigt.<br></br>
              <br></br> Wähle zwei Punkte und überprüfe ob die Zunahme der
              Sprungdauer gleichmäßig ist:
            </p>
            <ul>
              <li>
                Punkt 1: (5|
                {pp(getDuration(5))})
              </li>
              <li>
                Punkt 2: (10|
                {pp(getDuration(10))})
              </li>
            </ul>
            <p>
              Bei einer Höhe von 5 Metern beträgt die Sprungdauer{' '}
              <strong>{pp(getDuration(5))} Sekunden</strong> zu.
            </p>
            <p>
              Geht man auf die doppelte Höhe von 10 Metern, nimmt die
              Sprungdauer um {pp(getDuration(10))} − {pp(getDuration(5))} ={' '}
              <strong>{pp(getDuration(10) - getDuration(5))} Sekunden</strong>{' '}
              zu, anstatt um weitere {pp(getDuration(5))} Sekunden.
            </p>
            <p>
              Damit ist der Zusammenhang <strong>nicht linear</strong>.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      skillIntro({ data }) {
        return (
          <>
            <p>Blobbing ist eine Wassersportart im Freien (Abbildung 1).</p>
            <img src="/content/NRW_MSA_Blobbing.jpg" alt="" />
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 1: Ablauf eines Blobbingsprunges als überlagerte
                  Aufnahme
                </span>
              </Color5>
            </center>

            <p>
              Eine vereinfachte Darstellung des Ablaufs ist in Abbildung 2
              dargestellt. Beim Blobbing liegt ein mit Luft gefülltes Kissen im
              Wasser.
            </p>
            <p>(1) Der Jumper springt vom Turm auf das Luftkissen.</p>
            <p>
              (2) Auf der anderen Seite des Kissens ist der Blobber. Durch den
              Sprung befördert der Jumper den Blobber in die Luft.
            </p>
            <p>
              (3) Der Blobber wird in die Luft geschleudert und landet dann im
              Wasser.
            </p>
            <img src="/content/NRW_MSA_Blobbing_2.png" alt="" />
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 2: Vereinfachte Darstellung des Blobbing-Ablaufs
                  (nicht maßstabsgetreu)
                </span>
              </Color5>
            </center>
          </>
        )
      },
      task({ data }) {
        const a = (1 - data.y_s) / (data.x_s * data.x_s)
        function toX(n: number) {
          return 76 + n * (500 / 10.1)
        }
        function toY(n: number) {
          return 443 - n * (500 / 10.1)
        }
        function generateParabolaPoints(step: number): string {
          let points = ''
          for (let x = 0; x <= 7; x += step) {
            const y = a * (x - data.x_s) * (x - data.x_s) + data.y_s
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        function generateParabolaPoints2(step: number): string {
          let points = ''
          for (let x = 7; x <= 8; x += step) {
            const y = a * (x - data.x_s) * (x - data.x_s) + data.y_s
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints = generateParabolaPoints(0.1)
        const parabolaPoints2 = generateParabolaPoints2(0.1)
        return (
          <>
            <p>c) Abbildung 4 zeigt die Flugbahn eines Blobbers A.</p>
            <svg viewBox="0 0 700 500">
              <image
                href="/content/NRW_MSA_Blobbing_Plot.png"
                height="500"
                width="700"
              />
              <polyline
                points={parabolaPoints}
                stroke="blue"
                strokeWidth="3"
                fill="none"
              />
              <polyline
                points={parabolaPoints2}
                stroke="blue"
                strokeWidth="3"
                fill="none"
                stroke-dasharray="5,5"
              />
              <text
                x={toX(0) - 5}
                y={toY(1) + 5}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'×'}
              </text>
              <text
                x={toX(data.x_s) - 5}
                y={toY(data.y_s) + 5}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'×'}
              </text>
              <text
                x={toX(0) - 15}
                y={toY(1) - 15}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'P'}
              </text>
              <text
                x={toX(data.x_s) - 15}
                y={toY(data.y_s) - 15}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {'S'}
              </text>
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>Abbildung 4: Flugbahn</span>
              </Color5>
            </center>
            <p>
              Begründe mithilfe der Abbildung 4, dass sich die Funktion f mit{' '}
            </p>
            <p>
              f(x) = a · (x − {data.x_s})² + {data.y_s} und a{' < '}0
            </p>
            <p>zur Modellierung der Flugbahn von Blobber A eignet.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Aus der Skizze kannst du den Scheitel der Parabel ablesen: S(
              <Color1>{data.x_s}</Color1>|<Color2>{data.y_s}</Color2>)
            </p>
            <p>Die Funktion hat dann allgemein den Funktionsterm:</p>
            <p>
              f(x) = a · (x <Color1>− {data.x_s}</Color1>)² +{' '}
              <Color2>{data.y_s}</Color2>
            </p>
            <p>Da die Parabel nach unten geöffnet ist muss a{' < '}0 sein.</p>
          </>
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        const a = (1 - data.y_s) / (data.x_s * data.x_s)
        return (
          <>
            <p>
              d) Zeige durch eine Rechnung, dass der Streckfaktor a hier a ={' '}
              {pp(a)} beträgt.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Um a zu berechnen, setze einen Punkt auf der Parabel in den
              Funktionsterm ein und löse nach a. <br></br>
              <br></br>Setze zum Beispiel (0|1) in f(x) ein:
            </p>
            {buildEquation([
              [
                <>1</>,
                <>=</>,
                <>
                  a · (0 − {data.x_s})² + {data.y_s}
                </>,
              ],
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
                    <span style={{ fontSize: 'small' }}>Berechne</span>
                  </Color4>
                </>,
              ],
              [
                <>1</>,
                <>=</>,
                <>
                  a · {data.x_s * data.x_s} + {data.y_s}
                </>,
                <>| − {data.y_s}</>,
              ],
              [
                <>{1 - data.y_s}</>,
                <>=</>,
                <>a · {data.x_s * data.x_s}</>,
                <>| : {data.x_s * data.x_s}</>,
              ],
              [
                <>
                  <strong>a</strong>
                </>,
                <>
                  <strong>=</strong>
                </>,
                <>
                  <strong>{pp((1 - data.y_s) / Math.pow(data.x_s, 2))}</strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 3,
      skillIntro({ data }) {
        return (
          <>
            <p>Blobbing ist eine Wassersportart im Freien (Abbildung 1).</p>
            <img src="/content/NRW_MSA_Blobbing.jpg" alt="" />
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 1: Ablauf eines Blobbingsprunges als überlagerte
                  Aufnahme
                </span>
              </Color5>
            </center>

            <p>
              Eine vereinfachte Darstellung des Ablaufs ist in Abbildung 2
              dargestellt. Beim Blobbing liegt ein mit Luft gefülltes Kissen im
              Wasser.
            </p>
            <p>(1) Der Jumper springt vom Turm auf das Luftkissen.</p>
            <p>
              (2) Auf der anderen Seite des Kissens ist der Blobber. Durch den
              Sprung befördert der Jumper den Blobber in die Luft.
            </p>
            <p>
              (3) Der Blobber wird in die Luft geschleudert und landet dann im
              Wasser.
            </p>
            <img src="/content/NRW_MSA_Blobbing_2.png" alt="" />
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 2: Vereinfachte Darstellung des Blobbing-Ablaufs
                  (nicht maßstabsgetreu)
                </span>
              </Color5>
            </center>
          </>
        )
      },
      task({ data }) {
        const a = (1 - data.y_s) / (data.x_s * data.x_s)
        return (
          <>
            <p>
              e) Die Flugbahn von Blobber A kann somit durch die Funktion f mit{' '}
            </p>
            <p>
              f(x) = {pp(a)} · (x − {data.x_s})² + {data.y_s}
            </p>
            <p>beschrieben werden. Die Funktionsgleichung g mit </p>
            <p>
              g(x) = {pp(a)} x² {pp(-a * 2 * data.x_s, 'merge_op')}x + 1
            </p>
            <p>beschreibt dieselbe Flugbahn.</p>
            <p>
              Zeige durch Termumformungen, dass die Funktionsgleichungen von f
              und g dieselbe Parabel beschreiben.
            </p>
          </>
        )
      },
      solution({ data }) {
        const a = (1 - data.y_s) / (data.x_s * data.x_s)
        return (
          <>
            <p>Löse die Klammer auf und vereinfache den Term:</p>
            {buildEquation([
              [
                'f(x)',
                '=',
                <>
                  {pp(a)} · (x − {data.x_s})² + {data.y_s}
                </>,
              ],
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
                    <span style={{ fontSize: 'small' }}>
                      2. Binomische Formel
                    </span>
                  </Color4>
                </>,
              ],
              [
                '',
                '=',
                <>
                  {pp(a)} · (x² − 2 · x · {data.x_s} + {data.x_s}²) + {data.y_s}
                </>,
              ],

              [
                '',
                '=',
                <>
                  {pp(a)} · (x² − {2 * data.x_s}x + {data.x_s * data.x_s}) +{' '}
                  {data.y_s}
                </>,
              ],
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
                    <span style={{ fontSize: 'small' }}>Ausmultiplizieren</span>
                  </Color4>
                </>,
              ],
              [
                '',
                '=',
                <>
                  {pp(a)}x² {pp(-a * 2 * data.x_s, 'merge_op')}x{' '}
                  {pp(a * data.x_s * data.x_s)} + {data.y_s}
                </>,
              ],
              [
                '',
                '=',
                <>
                  {pp(a)}x² {pp(-a * 2 * data.x_s, 'merge_op')}x{' '}
                  {pp(a * data.x_s * data.x_s + data.y_s, 'merge_op')}
                </>,
              ],
              [<></>, <>=</>, <>g(x)</>],
            ])}
            <p>
              Die Funktionsterme von f und g stimmen nach einer Umformung
              überein. Das bedeutet, dass sie die gleiche Parabel beschreiben.{' '}
            </p>
          </>
        )
      },
    },
    {
      points: 4,
      task({ data }) {
        return (
          <>
            <p>f) Berechne, wie weit Blobber A geflogen ist.</p>
          </>
        )
      },
      solution({ data }) {
        const a = (1 - data.y_s) / (data.x_s * data.x_s)
        const D = roundToDigits(
          Math.pow(
            a * 2 * data.x_s * a * 2 * data.x_s -
              4 * a * (a * data.x_s * data.x_s + data.y_s),
            0.5,
          ),
          2,
        )
        return (
          <>
            <p>
              Die Sprungweite des Blobbers entspricht der positiven Nullstelle.
              Um die Nullstellen zu berechnen, setze die Funktionsgleichung
              gleich 0. Löse die quadratische Gleichung mit der pq-Formel.
            </p>

            {buildEquation([
              [
                <>g(x)</>,
                <>=</>,
                <>
                  {pp(a)} x² {pp(-a * 2 * data.x_s, 'merge_op')}x + 1
                </>,
              ],
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
                    <span style={{ fontSize: 'small' }}>0 setzen</span>
                  </Color4>
                </>,
              ],
              [
                <>0</>,
                <>=</>,
                <>
                  {pp(a)} x² {pp(-a * 2 * data.x_s, 'merge_op')}x + 1
                </>,
                <>| : ({pp(a)})</>,
              ],
              [
                <>0</>,
                <>=</>,
                <>
                  x² {pp(-1 * 2 * data.x_s, 'merge_op')}x{' '}
                  {pp(roundToDigits(1 / a, 2))}
                </>,
              ],
            ])}

            <p>Setze die Werte für p und q in die pq-Formel ein:</p>
            {buildEquation([
              [
                <>
                  x<sub>1/2</sub>
                </>,
                <>=</>,
                <>
                  − {buildInlineFrac('p', 2)} ±{' '}
                  {buildSqrt(
                    <>
                      <span className="inline-block  scale-y-[2.6]">(</span>
                      {buildInlineFrac('p', 2)}
                      <span className="inline-block  scale-y-[2.6]">)</span>² −
                      q
                    </>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  −{' '}
                  {buildInlineFrac(
                    <>({pp(-1 * 2 * data.x_s, 'merge_op')})</>,
                    2,
                  )}{' '}
                  ±{' '}
                  {buildSqrt(
                    <>
                      <span className="inline-block  scale-y-[2.6]">(</span>
                      {buildInlineFrac(
                        <>{pp(-1 * 2 * data.x_s, 'merge_op')}</>,
                        2,
                      )}
                      <span className="inline-block  scale-y-[2.6]">)</span>² −
                      ({pp(roundToDigits(1 / a, 2))})
                    </>,
                  )}
                </>,
              ],
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
                    <span style={{ fontSize: 'small' }}>Zusammenfassen</span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {pp(data.x_s)} ±{' '}
                  {buildSqrt(
                    <>
                      {pp(
                        -1 * data.x_s * (-1 * data.x_s) +
                          roundToDigits(1 / -a, 2),
                      )}
                    </>,
                  )}
                </>,
              ],
            ])}
            <strong>
              <p>
                x<sub>1</sub> ≈{' '}
                {pp(roundToDigits((a * 2 * data.x_s + D) / (2 * a), 2))}
              </p>
              <p>
                {' '}
                x<sub>2</sub> ≈{' '}
                {pp(roundToDigits((a * 2 * data.x_s - D) / (2 * a), 2))}
              </p>
            </strong>
            <p>
              Vom Sprungkissen (x = 0) ist der Blobber bis x<sub>2</sub> ≈{' '}
              {pp(roundToDigits((a * 2 * data.x_s - D) / (2 * a), 2))} geflogen.
              Die Sprungweite beträgt also{' '}
              <strong>
                {pp(roundToDigits((a * 2 * data.x_s - D) / (2 * a), 2))} m
              </strong>
              .
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        const a = (1 - data.y_s) / (data.x_s * data.x_s)
        return (
          <>
            <p>
              g) Die Flugbahn eines zweiten Blobbers B wird mit der Funktion h
              mit{' '}
            </p>
            <p>
              h(x) = {data.coin == true ? pp(a) : pp(data.fake_a)} · (x −{' '}
              {data.coin == true ? data.fake_x : data.x_s})² +{' '}
              {data.coin == true ? data.y_s : data.fake_y}
            </p>
            <p>beschrieben.</p>
            <p>
              Nenne eine Gemeinsamkeit und einen Unterschied der Flugbahn des
              zweiten Blobbers B im Vergleich zur Flugbahn von Blobber A.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            {data.coin == true ? (
              <p>
                <b>Mögliche Gemeinsamkeit:</b> Die Funktionen besitzen den{' '}
                <b>gleichen Öffnungsfaktor a</b>. Die Flugbahnen haben damit ein
                ähnliches Profil. <br></br>
                <br></br> <b>Möglicher Unterschied:</b> Die Funktionen haben{' '}
                <b>unterschiedliche Scheitelpunktkoordinaten</b>. Der höchste
                Punkt der Flugbahn ist daher unterschiedlich.
              </p>
            ) : (
              <p>
                <b>Mögliche Gemeinsamkeit:</b> Die Funktionen besitzen die{' '}
                <b>
                  gleiche Scheitelpunktkoordinate x<sub>s</sub>
                </b>
                . Damit erreichen die Flugbahnen beide ihren Höhepunkt nach x
                <sub>s</sub> = {data.x_s} Metern. <br></br>
                <br></br> <b>Möglicher Unterschied:</b> Die Funktionen haben{' '}
                <b>unterschiedliche Öffnungsfaktoren</b>. Sie besitzen eine
                unterschiedliche Form.
              </p>
            )}
          </>
        )
      },
    },
  ],
}
