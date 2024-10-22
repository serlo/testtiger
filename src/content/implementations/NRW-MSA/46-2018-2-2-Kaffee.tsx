import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'
import build from 'next/dist/build'

interface DATA {
  liter: number
  percent: number
  usage: number
  trash: number
  becher: number
  karinHatRecht: boolean
  dia: number
  width: number
  length: number
  höhe: number
  Vstumpf: number
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
  source: '2018 Teil 2 Aufgabe 2',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    const usage = rng.randomIntBetween(20, 40)
    const dia = rng.randomIntBetween(7, 10)
    const höhe = rng.randomIntBetween(15, 23) / 2
    return {
      liter: rng.randomIntBetween(140, 200),
      percent: rng.randomIntBetween(2, 8),
      trash: rng.randomIntBetween(20, 35) * 10000,
      usage,
      becher: Math.round((usage * 83000000) / (365 * 24)),
      karinHatRecht: rng.randomBoolean(),
      dia,
      width: rng.randomIntBetween(22, 30),
      length: rng.randomIntBetween(42, 50),
      höhe,
      Vstumpf:
        (((dia - 1) / 2) * ((dia - 1) / 2) +
          ((dia - 1) / 2) * (dia / 2) +
          (dia / 2) * (dia / 2)) *
        ((Math.PI * höhe) / 3),
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
      (data.length * data.width) / ((data.dia * data.dia) / 10000) <
        Math.round(data.becher) && data.trash != roundToDigits(data.becher, -4)
    )
  },
  intro({ data }) {
    return (
      <>
        <p>
          Kaffee ist das Lieblingsgetränk in Deutschland. Im Durchschnitt trinkt
          jede Person etwa {data.liter} Liter Kaffee im Jahr, davon{' '}
          {data.percent} % aus Pappbechern.
        </p>
      </>
    )
  },
  tasks: [
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>
              a) Berechne, wie viele Liter Kaffee jede Person durchschnittlich
              im Jahr aus Pappbechern trinkt.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Jede Person trinkt {data.liter} Liter Kaffee, davon {data.percent}{' '}
              % aus Pappbechern. Setze in die Formel für den Prozentwert ein:
            </p>
            {buildEquation([
              ['W', '=', 'G · p'],
              [
                '',
                '=',
                <>
                  {data.liter} · {pp(data.percent / 100)}
                </>,
              ],
              [
                '',
                '=',
                <>
                  <strong>{pp((data.liter * data.percent) / 100)} [ℓ]</strong>
                </>,
              ],
            ])}

            <p>
              Jedes Jahr trinkt eine Person im Durchschnitt{' '}
              <strong>{pp((data.liter * data.percent) / 100)} Liter </strong>
              Kaffee aus Pappbechern.
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
              b) Pro Jahr benutzt jede Person durchschnittlich {pp(data.usage)}{' '}
              Pappbecher. In Deutschland leben derzeit ca. 83 Millionen
              Menschen. Karin behauptet: {'"'}Jede Stunde werden in Deutschland
              ungefähr{' '}
              {data.karinHatRecht == true
                ? pp(roundToDigits(data.becher, -4))
                : pp(data.trash)}{' '}
              Pappbecher in den Müll geworfen.{'"'}
            </p>
            <p>Hat Karin recht? Begründe.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Berechne, wie viele Pappbecher jährlich in Deutschland verbraucht
              werden:
            </p>
            <p>
              {data.usage} · 83 000 000 = {data.usage * 83000000} [Becher]
            </p>
            <p> Berechne, wie viele Stunden ein Jahr enthält:</p>
            <p>365 · 24 = {365 * 24}</p>
            <p>Teile die Anzahl der Becher durch die Anzahl der Stunden:</p>
            <p>
              {data.usage * 83000000} : {365 * 24} ≈ {pp(data.becher)} [Becher]
            </p>
            <p>
              {data.becher} entsprechen{' '}
              {data.karinHatRecht == true ? 'ungefähr' : 'nicht'}{' '}
              {data.karinHatRecht == true
                ? pp(roundToDigits(data.becher, -4))
                : pp(data.trash)}{' '}
              Bechern. Damit hat Karin{' '}
              {data.karinHatRecht == true ? 'recht.' : 'nicht recht.'}
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      task({ data }) {
        return (
          <>
            <p>
              Die obere Öffnung eines handelsüblichen Pappbechers hat einen
              Durchmesser von {data.dia} cm.
            </p>
            <p>
              c) Der Boden einer Sporthalle mit {data.width} m Breite und{' '}
              {data.length} m Länge reicht nicht aus, um{' '}
              {pp(roundToDigits(data.becher, -4))} so wie in Abbildung 1
              nebeneinander aufzustellen.
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
      solution({ data }) {
        return (
          <>
            <p>
              <strong>Fläche eines Bechers</strong>
            </p>
            <p>
              In dieser Anordnung benötigt jeder Pappbecher eine quadratische
              Fläche von:
            </p>
            <p>
              {data.dia} · {data.dia} = {data.dia * data.dia} [cm²]
            </p>{' '}
            <p>
              Das entspricht einer Fläche von <br></br>
              {data.dia * data.dia} cm² ≙ {pp((data.dia * data.dia) / 10000)} m²
            </p>
            <p>
              <strong>Anzahl der Becher</strong>
            </p>
            <p>Die Sporthalle hat eine Grundfläche von </p>
            <p>
              A = {data.length} · {data.width} = {data.length * data.width}{' '}
              [m²].
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
              Damit <strong>reicht der Boden nicht aus</strong>, um die{' '}
              {pp(roundToDigits(data.becher, -4))} Becher aufzustellen.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      task({ data }) {
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
            <img src="/content/NRW_MSA_Kegelstumpf.PNG" width={328} alt="" />
            <p>Abbildung 2: Kegelstumpf</p>
            <p>
              d) Der Pappbecher hat folgende Maße: r<sub>1</sub> ={' '}
              {pp((data.dia - 1) / 2)} cm, r<sub>2</sub> = {pp(data.dia / 2)} cm
              und h = {pp(data.höhe)} cm.
            </p>
            <p>
              Bestätige mithilfe der Formel, dass das Volumen eines solchen
              Bechers ca. {roundToDigits(data.Vstumpf, -1)} ml beträgt.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Setze die Angaben in die Formel ein und berechne das Volumen:</p>
            {buildEquation([
              [
                'V',
                '=',
                <>
                  (r<sub>1</sub>
                  <sup>2</sup> + r<sub>1</sub> · r<sub>2</sub> + r<sub>2</sub>
                  <sup>2</sup>) · {buildInlineFrac('π · h', 3)}
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
                    <span style={{ fontSize: 'small' }}>Werte einsetzen</span>
                  </Color4>
                </>,
              ],
              [
                '',
                '=',
                <>
                  ({pp((data.dia - 1) / 2)}² + {pp((data.dia - 1) / 2)} ·{' '}
                  {pp(data.dia / 2)} + {pp(data.dia / 2)}²) ·{' '}
                  {buildInlineFrac(<>π · {data.höhe}</>, '3')}
                </>,
              ],
              [
                '',
                '≈',
                <>
                  <strong>{pp(roundToDigits(data.Vstumpf, 2))} [cm³]</strong>
                </>,
              ],
            ])}

            <p>
              Ein cm³ entspricht einem ml. <br></br>Damit fasst der Becher
              ungefähr {roundToDigits(data.Vstumpf, -1)} ml.
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
      solution({ data }) {
        const V =
          Math.pow(((data.dia - 1) / 2 + data.dia / 2) / 2, 2) *
          Math.PI *
          data.höhe
        const diff = roundToDigits(
          roundToDigits(data.Vstumpf, 2) - roundToDigits(V, 2),
          2,
        )
        return (
          <>
            <p>
              <strong>Volumen mit mittlerem Radius</strong>
            </p>
            <p>Der Mittelwert der Radien beträgt:</p>
            <p>
              {buildInlineFrac(
                pp((data.dia - 1) / 2) + ' + ' + pp(data.dia / 2),
                2,
              )}{' '}
              = {pp(((data.dia - 1) / 2 + data.dia / 2) / 2)} [cm]
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
                <>
                  π · {pp(((data.dia - 1) / 2 + data.dia / 2) / 2)}² ·{' '}
                  {pp(data.höhe)}
                </>,
              ],
              ['', '≈', <>{pp(roundToDigits(V, 2))} [cm³]</>],
            ])}{' '}
            <p>
              <strong>Prozentuale Abweichung</strong>
            </p>
            <p>
              Die Abweichung zum Ergebnis des Kegelstumpfes aus (d) beträgt:
            </p>
            <p>
              {pp(roundToDigits(data.Vstumpf, 2))} − {pp(roundToDigits(V, 2))} ={' '}
              {pp(diff)} [cm³]
            </p>
            <p>
              Teile die Abweichung durch das Volumen des Kegelstumpfes, um die
              prozentuale Abweichung zu erhalten:
            </p>
            <p>
              {buildInlineFrac(pp(diff), pp(roundToDigits(data.Vstumpf, 2)))} ≈{' '}
              {pp(roundToDigits(diff / roundToDigits(data.Vstumpf, 2), 4))} ≙{' '}
              <strong>
                {pp(
                  roundToDigits(
                    (diff / roundToDigits(data.Vstumpf, 2)) * 100,
                    2,
                  ),
                )}{' '}
                %
              </strong>{' '}
              {' < '} 1 %
            </p>
            <p>
              <strong>Karin hat recht.</strong>
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      task({ data }) {
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
            <svg viewBox="0 0 328 460">
              <image
                href="/content/NRW_MSA_Kaffee_Plot.png"
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
                x={65}
                y={15}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                Temperatur T in °C
              </text>
              <text
                x={225}
                y={455}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                Zeit t in min
              </text>
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
      solution({ data }) {
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
                Der Anfangswert {data.start} wird mit der Potenz multipliziert.
              </li>
            </ul>
            <p>
              {' '}
              Damit kann nur der Funktionsterm <br></br>
              <strong>
                T(t) = {data.start} · {pp(data.decay)}
                <sup>t</sup>{' '}
              </strong>
              den Temperaturverlauf beschreiben.
            </p>
          </>
        )
      },
    },
  ],
}
