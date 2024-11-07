import { Exercise } from '@/data/types'
import { Color4, Color5 } from '@/helper/colors'
import {
  buildEquation,
  buildFrac,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'

interface DATA {
  prozent: number
  days: number
  fliegen: number
  days_2: number
}

export const exercise53: Exercise<DATA> = {
  title: 'Fruchtfliegen',
  source: '2024 Teil 2 Aufgabe 1',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {
      prozent: rng.randomIntBetween(1, 5) / 10 + 1,
      days: rng.randomIntBetween(20, 35),
      fliegen: rng.randomIntBetween(74, 120),
      days_2: rng.randomIntBetween(10, 16),
    }
  },
  originalData: {
    prozent: 1.3,
    days: 30,
    fliegen: 77,
    days_2: 11,
  },
  constraint({ data }) {
    const q = Math.round(Math.pow(data.fliegen / 20, 1 / 11) * 100) / 100
    const tag = Math.log(2) / Math.log(data.prozent / q)
    return data.prozent != 1.7 && data.prozent != 1.1 && tag < 7
  },
  intro({ data }) {
    const day1 = Math.round(10 * data.prozent)
    const day2 = Math.round(day1 * data.prozent)
    const day3 = Math.round(day2 * data.prozent)
    return (
      <>
        <p>
          Jasmin möchte für ein Biologieprojekt untersuchen, wie schnell sich
          Fruchtfliegen vermehren. Sie kauft dazu zwei Zuchtboxen und bezeichnet
          diese mit A und B. Zuchtbox A enthält anfänglich zehn Fruchtfliegen.
          Jasmin bewahrt die Box in ihrem warmen Zimmer auf und protokolliert in
          den folgenden Tagen die Anzahl der Tiere in der Box (Abbildung 1).
        </p>
        <svg width="320" height="130" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="10"
            y="10"
            width="300"
            height="22"
            fill="#D2ECF6"
            stroke="none"
          />

          <rect
            x="10"
            y="10"
            width="300"
            height="110"
            rx="4"
            ry="4"
            stroke="#007EC1"
            fill="transparent"
            strokeWidth="1"
          />

          <line
            x1="10"
            y1="32"
            x2="310"
            y2="32"
            stroke="#007EC1"
            strokeWidth="1"
          />
          <line
            x1="10"
            y1="54"
            x2="310"
            y2="54"
            stroke="#007EC1"
            strokeWidth="1"
          />
          <line
            x1="10"
            y1="76"
            x2="310"
            y2="76"
            stroke="#007EC1"
            strokeWidth="1"
          />
          <line
            x1="10"
            y1="98"
            x2="310"
            y2="98"
            stroke="#007EC1"
            strokeWidth="1"
          />

          <line
            x1="85"
            y1="10"
            x2="85"
            y2="120"
            stroke="#007EC1"
            strokeWidth="1"
          />

          <text
            x="47.5"
            y="26"
            fontSize="10"
            textAnchor="middle"
            fontWeight="bold"
            fill="black"
          >
            Tag x
          </text>
          <text x="47.5" y="48" fontSize="10" textAnchor="middle" fill="black">
            0
          </text>
          <text x="47.5" y="70" fontSize="10" textAnchor="middle" fill="black">
            1
          </text>
          <text x="47.5" y="92" fontSize="10" textAnchor="middle" fill="black">
            2
          </text>
          <text x="47.5" y="114" fontSize="10" textAnchor="middle" fill="black">
            3
          </text>

          <text
            x="197.5"
            y="26"
            fontSize="10"
            textAnchor="middle"
            fontWeight="bold"
            fill="black"
          >
            Anzahl Fruchtfliegen
          </text>
          <text x="197.5" y="48" fontSize="10" textAnchor="middle" fill="black">
            10
          </text>
          <text x="197.5" y="70" fontSize="10" textAnchor="middle" fill="black">
            {pp(day1)}
          </text>
          <text x="197.5" y="92" fontSize="10" textAnchor="middle" fill="black">
            {pp(day2)}
          </text>
          <text
            x="197.5"
            y="114"
            fontSize="10"
            textAnchor="middle"
            fill="black"
          >
            {pp(day3)}
          </text>
        </svg>
        <center>
          <Color5>
            <span style={{ fontSize: 'small' }}>
              Abbildung 1: Protokoll von Zuchtbox A
            </span>
          </Color5>
        </center>
      </>
    )
  },
  tasks: [
    {
      duration: 1,
      points: 2,
      task({ data }) {
        const prozentanzeige = data.prozent * 100 - 100
        return (
          <>
            <p>
              a) Die Anzahl der Fruchtfliegen in Zuchtbox A wächst täglich um
              ca. {prozentanzeige}%. <br /> Weise dies für den Übergang von Tag
              0 auf Tag 1 nach.
            </p>
          </>
        )
      },
      solution({ data }) {
        const day1 = Math.round(10 * data.prozent)
        const prozentanzeige = data.prozent * 100 - 100
        return (
          <>
            <p>
              Die Fruchtfliegenpopulation startet mit dem Grundwert von 10
              Fliegen und wächst auf den Wert von {day1} Fliegen.
            </p>
            <p>Mit der Formel für den Prozentsatz gilt:</p>
            {buildEquation([
              ['p', '=', <>{buildInlineFrac('W', 'G')}</>],
              ['', '=', <>{buildInlineFrac(<>{day1}</>, 10)}</>],
              ['', '=', pp(day1 / 10)],
              ['', '=', <>{pp((day1 / 10) * 100)} %</>],
            ])}
            <p>
              Die Anzahl der Fliegen ist also um{' '}
              <strong>{prozentanzeige} %</strong> auf {pp((day1 / 10) * 100)} %
              angewachsen.
            </p>
          </>
        )
      },
    },

    {
      points: 2,
      duration: 2,
      intro({ data }) {
        return (
          <>
            <p>
              Jasmin stellt die Funktion f mit der Funktionsgleichung f(x) = 10
              · {pp(data.prozent)}
              <sup>x</sup> auf, um die Anzahl f(x) der Fruchtfliegen am Tag x zu
              berechnen.
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              b) Bestimme die voraussichtliche Anzahl an Fruchtfliegen nach{' '}
              {data.days}&nbsp;Tagen.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Setze x = {data.days} ein und berechne:</p>
            {buildEquation([
              [
                <>f(x)</>,
                <>=</>,
                <>
                  10 · {pp(data.prozent)}
                  <sup>x</sup>
                </>,
              ],
              [
                <> f({data.days})</>,
                <>=</>,
                <>
                  10 · {pp(data.prozent)}
                  <sup>{data.days}</sup>
                </>,
              ],
              [
                <>
                  {' '}
                  <strong>f({data.days})</strong>
                </>,
                <>
                  <strong>
                    {(10 * Math.pow(data.prozent, data.days)) % 1 == 0
                      ? '='
                      : '≈'}
                  </strong>
                </>,
                <>
                  <strong>
                    {pp(Math.round(10 * Math.pow(data.prozent, data.days)))}
                  </strong>
                </>,
              ],
            ])}
            <p>
              Nach {data.days} Tagen gibt es voraussichtlich etwa{' '}
              <strong>
                {pp(Math.round(10 * Math.pow(data.prozent, data.days)))}{' '}
                Fruchtfliegen
              </strong>
              .
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 2,
      skillIntro({ data }) {
        return (
          <>
            <p>
              Jasmin stellt die Funktion f mit der Funktionsgleichung f(x) = 10
              · {pp(data.prozent)}
              <sup>x</sup> auf, um die Anzahl f(x) der Fruchtfliegen am Tag x zu
              berechnen.
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              c) Bestimme, nach wie vielen Tagen die Anzahl der Fruchtfliegen
              erstmals größer als 100 000 sein müsste.
            </p>
          </>
        )
      },
      solution({ data }) {
        const tage = Math.log(10000) / Math.log(data.prozent)
        return (
          <>
            <p>
              Mithilfe der Funktionsgleichung <br></br>f(x) = 10 ·{' '}
              {pp(data.prozent)}
              <sup>x</sup> kannst du die Anzahl der Fliegen am Tag x bestimmen.
            </p>
            <p>
              Setze für x systematisch Werte ein und überprüfe, wann die
              Population 100 000 erreicht.
            </p>

            <ul>
              <li>
                f({Math.floor(tage)}) = 10 · {pp(data.prozent)}{' '}
                <sup>{Math.floor(tage)}</sup>{' '}
                {(10 * Math.pow(data.prozent, Math.floor(tage))) % 1 == 0
                  ? '='
                  : '≈'}{' '}
                {pp(Math.round(10 * Math.pow(data.prozent, Math.floor(tage))))}{' '}
              </li>
              <li>
                f({Math.ceil(tage)}) = 10 · {pp(data.prozent)}{' '}
                <sup>{Math.ceil(tage)}</sup>{' '}
                {(10 * Math.pow(data.prozent, Math.ceil(tage))) % 1 == 0
                  ? '='
                  : '≈'}{' '}
                {pp(Math.round(10 * Math.pow(data.prozent, Math.ceil(tage))))}{' '}
              </li>
            </ul>
            <p>
              Die Population überschreitet 100 000 Fruchtfliegen nach{' '}
              <strong>{Math.ceil(tage)} Tagen</strong>.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 2,
      intro({ data }) {
        return (
          <>
            <p>
              Zuchtbox B enthält anfänglich 20 Fruchtfliegen (x = 0). Zur
              Berechnung der Anzahl der Fruchtfliegen in der Box an Tag x nutzt
              Jasmin daher die Funktion g mit g(x) = 20 · q<sup>x</sup>.
            </p>
          </>
        )
      },
      skillIntro({ data }) {
        return (
          <>
            <p>
              Jasmin möchte für ein Biologieprojekt untersuchen, wie schnell
              sich Fruchtfliegen vermehren. Sie kauft dazu zwei Zuchtboxen und
              bezeichnet diese mit A und B.
            </p>
          </>
        )
      },
      task({ data }) {
        const lös = pp(
          Math.round(Math.pow(data.fliegen / 20, 1 / data.days_2) * 100) / 100,
        )
        return (
          <>
            <p>
              d) Jasmin bewahrt die Zuchtbox B im kühleren Keller auf und stellt
              fest, dass sich die Fruchtfliegen dort langsamer vermehren als in
              ihrem warmen Zimmer. An Tag {data.days_2} sind es {data.fliegen}{' '}
              Fliegen.
              <br />
              Weise rechnerisch nach, dass q ≈ {lös} beträgt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const q = pp(
          Math.round(Math.pow(data.fliegen / 20, 1 / data.days_2) * 100) / 100,
        )
        return (
          <>
            <p>Verwende die Funktionsgleichung g(x) und berechne q.</p>
            {buildEquation([
              [
                <>g(x)</>,
                '=',
                <>
                  20 · q<sup>x</sup>
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
                      {data.fliegen} Fliegen an Tag {data.days_2}
                    </span>
                  </Color4>
                </>,
              ],
              [
                data.fliegen,
                '=',
                <>
                  20 · q<sup>{data.days_2}</sup>
                </>,
                '| : 20',
              ],
              [
                pp(data.fliegen / 20),
                '=',
                <>
                  q<sup>{data.days_2}</sup>
                </>,
                <>| {buildSqrt('', data.days_2)}</>,
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
                      Löse nach q mit der {data.days_2}. Wurzel
                    </span>
                  </Color4>
                </>,
              ],
              ['q', '=', <>{buildSqrt(pp(data.fliegen / 20), data.days_2)}</>],
              [
                <>
                  <strong>q</strong>
                </>,
                <>
                  <strong>≈</strong>
                </>,
                <>
                  <strong>{q}</strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 3,
      duration: 2,
      task({ data }) {
        return (
          <>
            <p>
              e) Jasmin vermutet: „Bei Zuchtbox B kommen in der zweiten Woche
              mehr als doppelt so viele Fruchtfliegen hinzu, als in der ersten
              Woche hinzugekommen sind.“
            </p>
            <p>Überprüfe ihre Vermutung mit einer Rechnung.</p>
          </>
        )
      },
      solution({ data }) {
        const q =
          Math.round(Math.pow(data.fliegen / 20, 1 / data.days_2) * 100) / 100

        const lös1 = Math.round(20 * Math.pow(q, 7))
        const lös2 = Math.round(20 * Math.pow(q, 14))
        return (
          <>
            <p>
              Verwende die Funktion g(x), um die Anzahl der Fliegen nach 7 Tagen
              und anschließend nach 14 Tagen zu berechnen:<br></br>
              <br />
              <strong>Erste Woche:</strong>
              <br /> g(7) = 20 · {pp(q)}
              <sup>7</sup> <br />
              g(7) ≈ {lös1}
            </p>
            <p>
              Damit kommen in der ersten Woche:<br></br> {lös1} - 20 ={' '}
              {lös1 - 20} Fruchtfliegen dazu.
            </p>
            <p>
              <strong>Zweite Woche:</strong>
              <br /> g(14) = 20 · {pp(q)}
              <sup>14</sup>
              <br />
              g(14) ≈ {lös2}{' '}
            </p>
            <p>
              Damit kommen in der zweiten Woche:<br></br> {lös2} - {lös1} ={' '}
              {lös2 - lös1} Fruchtfliegen dazu.
            </p>
            <p>
              {lös2 - lös1 > 2 * (lös1 - 20) ? (
                <>
                  Jasmins Vermutung stimmt, denn <br></br> {lös2 - lös1} {'>'} 2
                  · {lös1 - 20} = {2 * (lös1 - 20)}
                </>
              ) : (
                <>
                  Jasmins Vermutung stimmt nicht, denn <br></br>
                  {lös2 - lös1} {'>'} 2 · {lös1 - 20} = {2 * (lös1 - 20)}
                </>
              )}
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 3,
      task({ data }) {
        const q =
          Math.round(Math.pow(data.fliegen / 20, 1 / data.days_2) * 100) / 100

        function toX(n: number) {
          return 144.5 + n * 9.575
        }
        function toY(n: number) {
          return 468 - n * 9.575
        }
        function Points1(step: number): string {
          let points = ''
          for (let x = 0; x <= 20; x += step) {
            const y = 10 * Math.pow(data.prozent, x)
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        function Points2(step: number): string {
          let points = ''
          for (let x = 0; x <= 55; x += step) {
            const y = 20 * Math.pow(q, x)
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const plotPoints1 = Points1(0.1)
        const plotPoints2 = Points2(0.1)

        return (
          <>
            <p>In Abbildung 3 sind die Graphen A und B dargestellt.</p>
            <svg viewBox="0 0 480 500">
              <image
                href="/content/NRW_MSA/NRW_MSA_Fruchtfliegen_KS.PNG"
                height="500"
                width="480"
              />

              <text
                x={toX(1)}
                y={toY(17)}
                fontSize="20"
                textAnchor="middle"
                fontWeight="bold"
                fill="blue"
              >
                A
              </text>
              <text
                x={toX(1)}
                y={toY(27)}
                fontSize="20"
                textAnchor="middle"
                fontWeight="bold"
                fill="orange"
              >
                B
              </text>
              <text
                x="60"
                y="40"
                fontSize="15"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                Fruchtfliegen
              </text>
              <text
                x="370"
                y="490"
                fontSize="15"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                x in Tagen
              </text>
              <polyline
                points={plotPoints1}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={plotPoints2}
                stroke="orange"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 3: Graphen A und B
                </span>
              </Color5>
            </center>
            <p>f) Begründe, dass</p>
            <ol>
              <li>
                die Funktion f mit f(x) = 10 ⋅ {pp(data.prozent)}
                <sup>x</sup> durch Graph A dargestellt wird und
              </li>
              <li>
                die Funktion g mit g(x) = 20 ⋅ {pp(q)}
                <sup>x</sup> durch Graph B dargestellt wird.
              </li>
            </ol>
          </>
        )
      },
      solution({ data }) {
        const q =
          Math.round(Math.pow(data.fliegen / 20, 1 / data.days_2) * 100) / 100

        return (
          <>
            <ol>
              <li>
                Graph A hat bei x = 0 den Anfangswert 10, sowie die Funktion f.
                Ein weiterer Funktionswert von f ist f(1)={10 * data.prozent}{' '}
                und stimmt mit Graph A überein.
              </li>
              <li>
                Graph B hat bei x = 0 den Anfangswert 20, sowie die Funktion g.
                Ein weiterer Funktionswert von g ist g(1)={pp(20 * q)} und
                stimmt mit Graph B überein.
              </li>
            </ol>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 1,
      skillIntro({ data }) {
        const q =
          Math.round(Math.pow(data.fliegen / 20, 1 / data.days_2) * 100) / 100

        function toX(n: number) {
          return 144.5 + n * 9.575
        }
        function toY(n: number) {
          return 468 - n * 9.575
        }
        function Points1(step: number): string {
          let points = ''
          for (let x = 0; x <= 20; x += step) {
            const y = 10 * Math.pow(data.prozent, x)
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        function Points2(step: number): string {
          let points = ''
          for (let x = 0; x <= 55; x += step) {
            const y = 20 * Math.pow(q, x)
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const plotPoints1 = Points1(0.1)
        const plotPoints2 = Points2(0.1)
        return (
          <>
            <p>In Abbildung 3 sind die Graphen A und B dargestellt.</p>
            <svg viewBox="0 0 480 500">
              <image
                href="/content/NRW_MSA/NRW_MSA_Fruchtfliegen_KS.PNG"
                height="500"
                width="480"
              />

              <text
                x={toX(1)}
                y={toY(17)}
                fontSize="20"
                textAnchor="middle"
                fontWeight="bold"
                fill="blue"
              >
                A
              </text>
              <text
                x={toX(1)}
                y={toY(27)}
                fontSize="20"
                textAnchor="middle"
                fontWeight="bold"
                fill="orange"
              >
                B
              </text>
              <text
                x="60"
                y="40"
                fontSize="15"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                Fruchtfliegen
              </text>
              <text
                x="370"
                y="490"
                fontSize="15"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                x in Tagen
              </text>
              <polyline
                points={plotPoints1}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={plotPoints2}
                stroke="orange"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 3: Graphen A und B
                </span>
              </Color5>
            </center>
            <p>
              Graph A stellt die Anzahl der Fruchtfliegen in Zuchtbox A dar und
              Graph B die Anzahl in Zuchtbox B.
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              g) Bestimme mithilfe von Abbildung 3 den Tag, an dem die
              Zuchtboxen A und B etwa gleich viele Fruchtfliegen enthalten und
              gib die Anzahl an.
            </p>
          </>
        )
      },
      solution({ data }) {
        const q =
          Math.round(Math.pow(data.fliegen / 20, 1 / data.days_2) * 100) / 100

        const tag = Math.log(2) / Math.log(data.prozent / q)
        return (
          <>
            <p>
              Die Graphen schneiden sich etwa bei <br></br>x ={' '}
              {pp(Math.round(tag / 0.5) * 0.5)}. In den Zuchtboxen befinden sich
              also nach <strong>{pp(Math.round(tag / 0.5) * 0.5)} Tagen</strong>{' '}
              gleich viele Fruchtfliegen.
            </p>
            <p>
              An der y-Achse im Koordinatensystem kann die Anzahl der
              Fruchtfliegen abgelesen werden:{' '}
              <strong>
                {Math.round(10 * Math.pow(data.prozent, tag))} Fliegen
              </strong>
            </p>
          </>
        )
      },
    },
  ],
}
