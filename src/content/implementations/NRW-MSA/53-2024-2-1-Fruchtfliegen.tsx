import { Exercise } from '@/data/types'
import { buildFrac, buildInlineFrac, buildSqrt } from '@/helper/math-builder'
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
      prozent: rng.randomIntBetween(1, 9) / 10 + 1,
      days: rng.randomIntBetween(20, 60),
      fliegen: rng.randomIntBetween(74, 87),
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
            stroke-width="1"
          />

          <line
            x1="10"
            y1="32"
            x2="310"
            y2="32"
            stroke="#007EC1"
            stroke-width="1"
          />
          <line
            x1="10"
            y1="54"
            x2="310"
            y2="54"
            stroke="#007EC1"
            stroke-width="1"
          />
          <line
            x1="10"
            y1="76"
            x2="310"
            y2="76"
            stroke="#007EC1"
            stroke-width="1"
          />
          <line
            x1="10"
            y1="98"
            x2="310"
            y2="98"
            stroke="#007EC1"
            stroke-width="1"
          />

          <line
            x1="85"
            y1="10"
            x2="85"
            y2="120"
            stroke="#007EC1"
            stroke-width="1"
          />

          <text
            x="47.5"
            y="26"
            font-size="10"
            text-anchor="middle"
            font-weight="bold"
            fill="black"
          >
            Tag x
          </text>
          <text
            x="47.5"
            y="48"
            font-size="10"
            text-anchor="middle"
            fill="black"
          >
            0
          </text>
          <text
            x="47.5"
            y="70"
            font-size="10"
            text-anchor="middle"
            fill="black"
          >
            1
          </text>
          <text
            x="47.5"
            y="92"
            font-size="10"
            text-anchor="middle"
            fill="black"
          >
            2
          </text>
          <text
            x="47.5"
            y="114"
            font-size="10"
            text-anchor="middle"
            fill="black"
          >
            3
          </text>

          <text
            x="197.5"
            y="26"
            font-size="10"
            text-anchor="middle"
            font-weight="bold"
            fill="black"
          >
            Anzahl Fruchtfliegen
          </text>
          <text
            x="197.5"
            y="48"
            font-size="10"
            text-anchor="middle"
            fill="black"
          >
            10
          </text>
          <text
            x="197.5"
            y="70"
            font-size="10"
            text-anchor="middle"
            fill="black"
          >
            {pp(day1)}
          </text>
          <text
            x="197.5"
            y="92"
            font-size="10"
            text-anchor="middle"
            fill="black"
          >
            {pp(day2)}
          </text>
          <text
            x="197.5"
            y="114"
            font-size="10"
            text-anchor="middle"
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
              <strong>Tag 0:</strong> Die Fruchtfliegenpopulation startet mit 10
              Fliegen. <br />
              <br />
              <strong>Wachstumsrate:</strong>Es wird angegeben, dass die
              Population täglich um ca. {prozentanzeige}% wächst. <br /> <br />
              <strong>Berechnung für Tag 1:</strong> Für den Übergang von Tag 0
              zu Tag 1 ({prozentanzeige}% Zuwachs): <br />
              <i>
                Anzahl an Tag 1 = 10 · {pp(data.prozent)} = {day1}
              </i>{' '}
              <br />
              Dies stimmt mit der Tabelle überein.
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
              f({data.days}) ={' '}
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
        const text = 'log(' + pp(data.prozent) + ')'
        const bruch = ppFrac(
          Math.round(Math.log10(10000) / Math.log10(data.prozent)),
        )

        return (
          <>
            <p>
              <strong>Gegebene Funktion:</strong> f(x) = 10 · {pp(data.prozent)}
              <sup>x</sup> <br />
              <strong>Bedingung:</strong> f(x) &gt; 100 000 <br />
              <strong>Ausrechnen der Ungleichung:</strong> <br />
              10 · {pp(data.prozent)}
              <sup>x</sup> &gt; 100 000 | : 10 <br />
              {pp(data.prozent)}
              <sup>x</sup> &gt; 10 000
              <br />
              <strong>Logarithmus anwenden:</strong> <br />x &gt;
              {buildInlineFrac('log(10 000)', text)}
              <br />x = {bruch}
            </p>{' '}
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
              <br />
              {data.fliegen} = 20 · q<sup>11</sup> | · q<sup>11</sup> :{' '}
              {data.fliegen} <br />q = <sup>11</sup>
              {buildSqrt(buildFrac(data.fliegen, 20))} <br />q = {q}
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
              e) Jasmin vermutet: „Bei Zuchtbox B kommen in der zweiten Woche
              mehr als doppelt so viele Fruchtfliegen hinzu, als in der ersten
              Woche hinzugekommen sind.“
            </p>
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
              <strong>Erste Woche berechnen:</strong>
              <br /> g(x) = 20 · {pp(q)}
              <sup>7</sup> <br />
              g(x) = {lös1} <br /> <br />
              <strong>Zweite Woche berechnen:</strong>
              <br /> g(x) = 20 · {pp(q)}
              <sup>14</sup> - 47
              <br />
              g(x) = {lös2 - lös1} <br /> <br />
              Jasmins Vermutung stimmt nicht. <br />2 · {pp(lös1)} ≯ &nbsp;{' '}
              {pp(lös2 - lös1)}
            </p>
          </>
        )
      },
    },
  ],
}
