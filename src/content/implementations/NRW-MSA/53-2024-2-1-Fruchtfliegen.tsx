import { Exercise } from '@/data/types'
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
    }
  },
  constraint({ data }) {
    return data.prozent != 1.7 && data.prozent != 1.1
  },
  intro({ data }) {
    const day1 = Math.round(10 * data.prozent)
    const day2 = Math.round(day1 * data.prozent)
    const day3 = Math.round(day2 * data.prozent)
    return (
      <>
        <p>
          Jasmin möchte für ein Biologieprojekt untersuchen, wie schnell sich
          Fruchtfliegen (Abbildung 1) vermehren. Sie kauft dazu zwei Zuchtboxen
          und bezeichnet diese mit A und B. Zuchtbox A enthält anfänglich zehn
          Fruchtfliegen. Jasmin bewahrt die Box in ihrem warmen Zimmer auf und
          protokolliert in den folgenden Tagen die Anzahl der Tiere in der Box
          (Abbildung 2).
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
      </>
    )
  },
  tasks: [
    {
      points: 42,
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
      points: 42,
      task({ data }) {
        return (
          <>
            <p>
              Jasmin stellt die Funktion f mit der Funktionsgleichung f(x) = 10
              · {pp(data.prozent)}
              <sup>x</sup> auf, um die Anzahl f(x) der Fruchtfliegen am Tag x zu
              berechnen.
            </p>
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
            <p>
              <strong>
                Einsetzen von {data.days}&nbsp;Tagen in die Funktion:
              </strong>{' '}
              <br />
              f({data.days}) = 10 · {pp(data.prozent)} <sup>{data.days}</sup>{' '}
              <br />
              f({data.days}){' '}
              {(10 * Math.pow(data.prozent, data.days)) % 1 == 0 ? '=' : '≈'}{' '}
              {pp(Math.round(10 * Math.pow(data.prozent, data.days)))} <br />{' '}
              <br />
              Nach {data.days} Tagen gibt es voraussichtlich etwa{' '}
              {pp(Math.round(10 * Math.pow(data.prozent, data.days)))}{' '}
              Fruchtfliegen.
            </p>
          </>
        )
      },
    },
    {
      points: 42,
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
              <strong>{Math.ceil(tage)} vollen Tagen</strong>.
            </p>
          </>
        )
      },
    },
    {
      points: 42,
      task({ data }) {
        const lös = pp(
          Math.round(Math.pow(data.fliegen / 20, 1 / 11) * 100) / 100,
        )
        return (
          <>
            <p>
              Zuchtbox B enthält anfänglich 20 Fruchtfliegen (x = 0). Zur
              Berechnung der Anzahl der Fruchtfliegen in der Box an Tag x nutzt
              Jasmin daher die Funktion g mit g(x) = 20 · q<sup>x</sup>.
            </p>
            <p>
              d) Jasmin bewahrt die Zuchtbox B im kühleren Keller auf und stellt
              fest, dass sich die Fruchfliegen dort langsamer vermehren als in
              ihrem warmen Zimmer. An Tag 11 sind es {data.fliegen} Fliegen.
              <br />
              Weise rechnerisch nach, dass q ≈ {lös} beträgt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const q = pp(
          Math.round(Math.pow(data.fliegen / 20, 1 / 11) * 100) / 100,
        )
        return (
          <>
            <p>
              <strong>Aufstellen der Gleichung:</strong>
            </p>
            {buildEquation([
              [
                data.fliegen,
                '=',
                <>
                  20 · q<sup>11</sup>
                </>,
                '| : 20',
              ],
              [
                pp(data.fliegen / 20),
                '=',
                <>
                  q<sup>11</sup>
                </>,
                <>| {buildSqrt('', 11)}</>,
              ],
              ['q', '=', <>{buildSqrt(pp(data.fliegen / 20), 11)}</>],
              ['q', '≈', q],
            ])}
          </>
        )
      },
    },
    {
      points: 42,
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
        const q = Math.round(Math.pow(data.fliegen / 20, 1 / 11) * 100) / 100
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
  ],
}
