import { Exercise } from '@/data/types'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  liter: number
  percent: number
  usage: number
  trash: number
  bool: boolean
  dia: number
  width: number
  length: number
  höhe: number
  start: number
  decay: number
  order: number[]
  error_1: number
  error_2: number
  error_3: number
  error_4: number
  error_5: number
}

export const exercise46: Exercise<DATA> = {
  title: 'Kaffee',
  source: '2018 Prüfungsteil 2 / 2',
  useCalculator: true,
  duration: 10,
  points: [42],
  generator(rng) {
    return {
      liter: rng.randomIntBetween(140, 200),
      percent: rng.randomIntBetween(2, 8),
      usage: rng.randomIntBetween(20, 40),
      trash: rng.randomIntBetween(20, 35) * 10000,
      bool: rng.randomBoolean(),
      dia: rng.randomIntBetween(7, 10),
      width: rng.randomIntBetween(22, 30),
      length: rng.randomIntBetween(42, 50),
      höhe: rng.randomIntBetween(15, 23) / 2,
      start: rng.randomIntBetween(65, 90),
      decay: rng.randomIntBetween(85, 95) / 100,
      order: rng.shuffleArray([0, 1, 2]),
      error_1: rng.randomIntBetween(-5, 5),
      error_2: rng.randomIntBetween(-5, 5),
      error_3: rng.randomIntBetween(-5, 5),
      error_4: rng.randomIntBetween(-5, 5),
      error_5: rng.randomIntBetween(-5, 5),
    }
  },
  constraint({ data }) {
    return (
      data.trash !=
        Math.round((data.usage * 83000000) / (365 * 24) / 10000) * 10000 &&
      (data.length * data.width) / ((data.dia * data.dia) / 10000) <
        Math.round((data.usage * 83000000) / (365 * 24) / 10000)
    )
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
  subtasks: {
    intro: ({ data }) => {
      return (
        <>
          <p>
            Kaffee ist das Lieblingsgetränk in Deutschland. Im Durchschnitt
            trinkt jede Person etwa {data.liter} Liter Kaffee im Jahr, davon{' '}
            {data.percent} % aus Pappbechern.
          </p>
        </>
      )
    },
    tasks: [
      ({ data }) => {
        return (
          <>
            <p>
              a) Berechne, wie viele Liter Kaffee jede Person durchschnittlich
              im Jahr aus Pappbechern trinkt.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              b) Pro Jahr benutzt jede Person durchschnittlich {data.usage}{' '}
              Pappbecher. In Deutschland leben derzeit ca. 82 Millionen
              Menschen. Karin behauptet: {'"'}Jede Stunde werden in Deutschland
              ungefähr{' '}
              {data.bool == true
                ? Math.round((data.usage * 83000000) / (365 * 24) / 10000) *
                  10000
                : data.trash}{' '}
              Pappbecher in den Müll geworfen.{'"'}
            </p>
            <p>Hat Karin recht? Begründe.</p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              Die obere Öffnung eines handelsüblichen Pappbechers hat einen
              Durchmesser von {data.dia} cm.
            </p>
            <p>
              c) Der Boden eines Sporthalle mit {data.width} m Breite und{' '}
              {data.length} m Länge reicht nicht aus, um{' '}
              {Math.round((data.usage * 83000000) / (365 * 24) / 10000) * 10000}{' '}
              so wie in Abbildung 1 nebeneinander aufzustellen.
            </p>
            <svg viewBox="0 0 328 120">
              <image
                href="/content/NRW_MSA_Kaffee.PNG"
                height="120"
                width="328"
              />
            </svg>
            <p>Bestätige dies durch eine Rechnung.</p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              Ein Pappbecher hat die Form eines Kegelstumpfes (Abbildung 2).
            </p>
            <p>
              Das Volumen des Kegelstumpfes lässt sich mit der folgenden Formel
              berechnen:
            </p>
            <p>
              V = (r<sub>1</sub>
              <sup>2</sup> + r<sub>1</sub> · r<sub>2</sub> + r<sub>2</sub>
              <sup>2</sup>) · {buildInlineFrac('π · h', 3)}
            </p>
            <svg viewBox="0 0 328 240">
              <image
                href="/content/NRW_MSA_Kegelstumpf.PNG"
                height="240"
                width="328"
              />
            </svg>
            <p>Abbildung 2: Kegelstumpf</p>
            <p>
              d) Der Pappbecher hat folgende Maße: r<sub>1</sub> ={' '}
              {pp((data.dia - 1) / 2)} cm, r<sub>2</sub> = {pp(data.dia / 2)}{' '}
              und h = {pp(data.höhe)} cm.
            </p>
            <p>
              Bestätige mithilfe der Formel, dass das Volumen eines solchen
              Bechers ca.{' '}
              {Math.round(
                ((((data.dia - 1) / 2) * ((data.dia - 1) / 2) +
                  ((data.dia - 1) / 2) * (data.dia / 2) +
                  (data.dia / 2) * (data.dia / 2)) *
                  ((Math.PI * data.höhe) / 3)) /
                  10,
              ) * 10}{' '}
              ml beträgt.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              e) Karin berechnet das Volumen näherungsweise mit der Formel für
              den Zylinder. Als Radius nimmt sie den Mittelwert der beiden
              Radien des Kegelstumpfes, die Höhe bleibt gleich.<br></br> Karin
              behauptet: {'"'}Das Ergebnis weicht um weniger als 1 % vom
              Ergebnis des Kegelstumpfes ab.{'"'} <br></br>Hat sie recht?
              Begründe deine Antwort mit einer Rechnung.
            </p>
          </>
        )
      },
      ({ data }) => {
        function toX(n: number) {
          return 56 + (n / 10) * (221 / 5)
        }
        function toY(n: number) {
          return 417 - (n / 10) * (221 / 5)
        }
        function generateParabolaPoints(step: number): string {
          let points = ''
          for (let x = 0; x <= 55; x += step) {
            const y = data.start * Math.pow(data.decay, x)
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const plotPoints = generateParabolaPoints(0.1)

        const listItems = [
          <li key="1">
            T(t) = {data.start} · {pp(data.decay)}
            <sup>t</sup>
          </li>,
          <li key="2">
            T(t) = {pp(data.decay)}
            <sup>t</sup> + {data.start}
          </li>,
          <li key="3">
            T(t) = {data.start} · {pp(1 + data.decay)}
          </li>,
        ]

        // Gemischte Liste der Elemente
        const shuffledItems = data.order.map(i => listItems[i])
        return (
          <>
            <p>
              Karin misst die Temperatur des Kaffees zu verschiedenen Zeiten.
              Sie stellt die Messwerte graphisch dar (Abbildung 3). Der
              abgebildete Graph stellt eine gute Näherung für den
              Abkühlungsprozess dar.
            </p>
            <p>
              f) Entscheide, welche Funktionsgleichung zu dem Graphen gehört.
              Begründe deine Entscheidung.
            </p>
            <svg viewBox="0 0 328 440">
              <image
                href="/content/NRW_MSA_Kaffee_Plot.PNG"
                height="440"
                width="328"
              />
              <polyline
                points={plotPoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <text
                x={73}
                y={toY(data.start * Math.pow(data.decay, 5)) + data.error_1 * 4}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                x
              </text>
              <text
                x={95.5}
                y={
                  toY(data.start * Math.pow(data.decay, 10)) + data.error_2 * 4
                }
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                x
              </text>
              <text
                x={118}
                y={
                  toY(data.start * Math.pow(data.decay, 15)) + data.error_3 * 3
                }
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                x
              </text>
              <text
                x={139}
                y={
                  toY(data.start * Math.pow(data.decay, 20)) + data.error_4 * 3
                }
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                x
              </text>
              <text
                x={161.5}
                y={
                  toY(data.start * Math.pow(data.decay, 25)) + data.error_5 * 3
                }
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                x
              </text>
            </svg>
            <p>Abbildung 3: Temperatur des Kaffees zu verschiedenen Zeiten</p>
            <ul>{shuffledItems}</ul>
          </>
        )
      },
    ],
    solutions: [
      ({ data }) => {
        return (
          <>
            <p>
              Jede Person trinkt {data.liter} Liter Kaffee, davon {data.percent}{' '}
              % aus Pappbechern. Berechne den Anteil:
            </p>
            <p>
              {data.liter} · {pp(data.percent / 100)} ={' '}
              {pp((data.liter * data.percent) / 100)} Liter
            </p>
            <p>
              Jedes Jahr trinkt eine Person im Durchschnitt{' '}
              {pp((data.liter * data.percent) / 100)} Liter Kaffee aus
              Pappbechern.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              Berechne, wie viele Pappbecher jährlich in Deutschland verbraucht
              werden:
            </p>
            <p>
              {data.usage} · 83 000 000 = {data.usage * 83000000} Becher
            </p>
            <p> Berechne, wie viele Stunden ein Jahr enthält:</p>
            <p>365 · 24 = {365 * 24}</p>
            <p>Teile die Anzahl der Becher durch die Anzahl der Stunden:</p>
            <p>
              {data.usage * 83000000} : {365 * 24} ≈{' '}
              {Math.round((data.usage * 83000000) / (365 * 24))} Becher
            </p>
            <p>
              {Math.round((data.usage * 83000000) / (365 * 24))} entsprechen
              ungefähr{' '}
              {Math.round((data.usage * 83000000) / (365 * 24) / 10000) * 10000}{' '}
              Bechern. Damit hat Karin{' '}
              {data.bool == true ? 'recht.' : 'nicht recht.'}
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              In dieser Anordnung nimmt jeder Pappbecher eine quadratische
              Fläche von
            </p>
            <p>
              {data.dia} · {data.dia} = {data.dia * data.dia} cm²
            </p>{' '}
            <p>in Anspruch.</p>
            <p>
              Das entspricht einer Fläche von {data.dia * data.dia} cm² ≙{' '}
              {pp((data.dia * data.dia) / 10000)} m²
            </p>
            <p>Die Spothalle hat eine Grundfläche von </p>
            <p>
              A = {data.length} · {data.width} = {data.length * data.width} m².
            </p>
            <p>
              Damit passen {data.length * data.width} :{' '}
              {pp((data.dia * data.dia) / 10000)} ≈{' '}
              {Math.floor(
                (data.length * data.width) / ((data.dia * data.dia) / 10000),
              )}{' '}
              Becher in die Halle.
            </p>
            <p>
              Damit reicht der Boden nicht aus, um die{' '}
              {Math.round((data.usage * 83000000) / (365 * 24) / 10000) * 10000}{' '}
              Becher aufzustellen.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>Setze die Angaben in die Formel ein und berechne das Volumen:</p>

            <p>
              V = ({pp((data.dia - 1) / 2)}² + {pp((data.dia - 1) / 2)} ·
              {pp(data.dia / 2)} + {pp(data.dia / 2)}²) ·{' '}
              {buildInlineFrac('π · h', '3')}
            </p>
            <p>
              V ≈{' '}
              {pp(
                roundToDigits(
                  (((data.dia - 1) / 2) * ((data.dia - 1) / 2) +
                    ((data.dia - 1) / 2) * (data.dia / 2) +
                    (data.dia / 2) * (data.dia / 2)) *
                    ((Math.PI * data.höhe) / 3),
                  2,
                ),
              )}
              cm³
            </p>
            <p>
              Damit fasst der Becher ungefähr{' '}
              {Math.round(
                ((((data.dia - 1) / 2) * ((data.dia - 1) / 2) +
                  ((data.dia - 1) / 2) * (data.dia / 2) +
                  (data.dia / 2) * (data.dia / 2)) *
                  ((Math.PI * data.höhe) / 3)) /
                  10,
              ) * 10}{' '}
              ml.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>Der Durchschnitt der Radien beträgt:</p>
            <p>
              {buildInlineFrac(
                pp((data.dia - 1) / 2) + ' + ' + pp(data.dia / 2),
                2,
              )}{' '}
              = {pp(((data.dia - 1) / 2 + data.dia / 2) / 2)} cm
            </p>
            <p>
              Berechne das Volumen des Zylinders mit Radius{' '}
              {pp(((data.dia - 1) / 2 + data.dia / 2) / 2)} cm mit der Formel:
            </p>
            {buildEquation([
              ['V', '=', 'π · r² · h'],
              [
                '',
                '=',
                'π · ' +
                  pp(((data.dia - 1) / 2 + data.dia / 2) / 2) +
                  '² · ' +
                  pp(data.höhe),
              ],
              [
                '',
                '≈',

                pp(
                  roundToDigits(
                    Math.pow(((data.dia - 1) / 2 + data.dia / 2) / 2, 2) *
                      Math.PI *
                      data.höhe,
                    2,
                  ),
                ) + ' cm³',
              ],
            ])}{' '}
            <p>Die Abweichung zum Ergebnis des Kegelstumpfes beträgt:</p>
            <p>
              {pp(
                roundToDigits(
                  (((data.dia - 1) / 2) * ((data.dia - 1) / 2) +
                    ((data.dia - 1) / 2) * (data.dia / 2) +
                    (data.dia / 2) * (data.dia / 2)) *
                    ((Math.PI * data.höhe) / 3),
                  2,
                ),
              )}{' '}
              −{' '}
              {pp(
                roundToDigits(
                  Math.pow(((data.dia - 1) / 2 + data.dia / 2) / 2, 2) *
                    Math.PI *
                    data.höhe,
                  2,
                ),
              )}{' '}
              ={' '}
              {pp(
                roundToDigits(
                  roundToDigits(
                    (((data.dia - 1) / 2) * ((data.dia - 1) / 2) +
                      ((data.dia - 1) / 2) * (data.dia / 2) +
                      (data.dia / 2) * (data.dia / 2)) *
                      ((Math.PI * data.höhe) / 3),
                    2,
                  ) -
                    roundToDigits(
                      Math.pow(((data.dia - 1) / 2 + data.dia / 2) / 2, 2) *
                        Math.PI *
                        data.höhe,
                      2,
                    ),
                  2,
                ),
              )}{' '}
              cm³
            </p>
            <p>
              Teile die Abweichung durch das Volumen des Kegelstumpfes um die
              prozentuale Abweichung zu erhalten:
            </p>
            <p>
              {pp(
                roundToDigits(
                  roundToDigits(
                    (((data.dia - 1) / 2) * ((data.dia - 1) / 2) +
                      ((data.dia - 1) / 2) * (data.dia / 2) +
                      (data.dia / 2) * (data.dia / 2)) *
                      ((Math.PI * data.höhe) / 3),
                    2,
                  ) -
                    roundToDigits(
                      Math.pow(((data.dia - 1) / 2 + data.dia / 2) / 2, 2) *
                        Math.PI *
                        data.höhe,
                      2,
                    ),
                  2,
                ),
              )}{' '}
              :{' '}
              {pp(
                roundToDigits(
                  (((data.dia - 1) / 2) * ((data.dia - 1) / 2) +
                    ((data.dia - 1) / 2) * (data.dia / 2) +
                    (data.dia / 2) * (data.dia / 2)) *
                    ((Math.PI * data.höhe) / 3),
                  2,
                ),
              )}{' '}
              ≈{' '}
              {pp(
                roundToDigits(
                  (roundToDigits(
                    (((data.dia - 1) / 2) * ((data.dia - 1) / 2) +
                      ((data.dia - 1) / 2) * (data.dia / 2) +
                      (data.dia / 2) * (data.dia / 2)) *
                      ((Math.PI * data.höhe) / 3),
                    2,
                  ) -
                    roundToDigits(
                      Math.pow(((data.dia - 1) / 2 + data.dia / 2) / 2, 2) *
                        Math.PI *
                        data.höhe,
                      2,
                    )) /
                    roundToDigits(
                      (((data.dia - 1) / 2) * ((data.dia - 1) / 2) +
                        ((data.dia - 1) / 2) * (data.dia / 2) +
                        (data.dia / 2) * (data.dia / 2)) *
                        ((Math.PI * data.höhe) / 3),
                      2,
                    ),
                  4,
                ),
              )}{' '}
              ≙{' '}
              {pp(
                roundToDigits(
                  (roundToDigits(
                    (((data.dia - 1) / 2) * ((data.dia - 1) / 2) +
                      ((data.dia - 1) / 2) * (data.dia / 2) +
                      (data.dia / 2) * (data.dia / 2)) *
                      ((Math.PI * data.höhe) / 3),
                    2,
                  ) -
                    roundToDigits(
                      Math.pow(((data.dia - 1) / 2 + data.dia / 2) / 2, 2) *
                        Math.PI *
                        data.höhe,
                      2,
                    )) /
                    roundToDigits(
                      (((data.dia - 1) / 2) * ((data.dia - 1) / 2) +
                        ((data.dia - 1) / 2) * (data.dia / 2) +
                        (data.dia / 2) * (data.dia / 2)) *
                        ((Math.PI * data.höhe) / 3),
                      2,
                    ),
                  4,
                ) * 100,
              )}{' '}
              % {' < '} 1 %
            </p>
            <p>Karin hat recht.</p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              {' '}
              Der Abkühlungsprozess wird durch eine exponentielle
              Temperaturabnahme dargestellt.
            </p>
            <ul>
              <li>
                Der Zerfallsfaktor {pp(data.decay)} muss kleiner 1 als sein,
                sonst wachsen die Temperaturwerte an.
              </li>
              <li>
                Der Anfangswert {data.start} wird mit der Potenz multipliziert,
                da der Graph sonst die Temperatur {data.start}°C anstrebt.
              </li>
            </ul>
            <p>
              {' '}
              Damit kann nur der Funktionsterm <br></br>T(t) = {data.start} ·{' '}
              {pp(data.decay)}
              <sup>t</sup> den Temperaturverlauf beschreiben.
            </p>
          </>
        )
      },
    ],
  },
}
