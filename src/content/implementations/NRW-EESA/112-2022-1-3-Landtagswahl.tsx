import { Exercise } from '@/data/types'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  stimmen: number
  spd: number
  cdu: number
  grüne: number
  fdp: number
  piraten: number
  linke: number
  stupids: number
  partei: string
  item_1: number
  item_2: number
  item_3: number
}

export const exercise112: Exercise<DATA> = {
  title: 'Landtagswahl',
  source: '2022 Teil 1 Aufgabe 3',
  useCalculator: true,
  duration: 4,
  generator(rng) {
    return {
      stimmen: rng.randomIntBetween(8000000, 9000000),
      spd: rng.randomIntBetween(280, 340) / 10,
      cdu: rng.randomIntBetween(280, 330) / 10,
      grüne: rng.randomIntBetween(60, 75) / 10,
      fdp: rng.randomIntBetween(90, 150) / 10,
      piraten: rng.randomIntBetween(5, 15) / 10,
      linke: rng.randomIntBetween(50, 65) / 10,
      stupids: rng.randomIntBetween(60, 80) / 10,
      partei: rng.randomItemFromArray(['CDU', 'SPD', 'FDP', 'Grüne']),
      item_1: rng.randomIntBetween(0, 6),
      item_2: rng.randomIntBetween(0, 6),
      item_3: rng.randomIntBetween(0, 6),
    }
  },
  originalData: {
    stimmen: 8487413,
    spd: 31.2,
    cdu: 33,
    grüne: 6.4,
    fdp: 12.6,
    piraten: 1,
    linke: 4.9,
    stupids: 7.4,
    partei: 'CDU',
    item_1: 0,
    item_2: 1,
    item_3: 2,
  },
  constraint({ data }) {
    return (
      data.item_1 != data.item_2 &&
      data.item_1 != data.item_3 &&
      data.item_2 != data.item_3
    )
  },
  intro({ data }) {
    const andere =
      100 -
      data.cdu -
      data.fdp -
      data.grüne -
      data.linke -
      data.piraten -
      data.spd -
      data.stupids
    return (
      <>
        <p>
          Im Jahr 2017 wurde in Nordrhein-Westfalen ein neuer Landtag gewählt.
          Das Ergebnis der Wahl ist in der Abbildung dargestellt.
        </p>
        <svg width="328" height="250">
          <text x={154} y={20} fill="black" fontSize="15" textAnchor="middle">
            Ergebnis
          </text>
          <text x={220} y={40} fill="black" fontSize="10" textAnchor="middle">
            Landtagswahl Nordrhein-Westfalen 2017
          </text>
          <text x={30} y={240} fill="black" fontSize="10" textAnchor="middle">
            SPD
          </text>
          <text
            x={30}
            y={215 - data.spd * 6}
            fill="black"
            fontSize="10"
            textAnchor="middle"
          >
            {pp(data.spd)} %
          </text>
          <text x={70} y={240} fill="black" fontSize="10" textAnchor="middle">
            CDU
          </text>
          <text
            x={70}
            y={215 - data.cdu * 6}
            fill="black"
            fontSize="10"
            textAnchor="middle"
          >
            {pp(data.cdu)} %
          </text>
          <text x={110} y={240} fill="black" fontSize="10" textAnchor="middle">
            Grüne
          </text>
          <text
            x={110}
            y={215 - data.grüne * 6}
            fill="black"
            fontSize="10"
            textAnchor="middle"
          >
            {pp(data.grüne)} %
          </text>
          <text x={150} y={240} fill="black" fontSize="10" textAnchor="middle">
            FDP
          </text>
          <text
            x={150}
            y={215 - data.fdp * 6}
            fill="black"
            fontSize="10"
            textAnchor="middle"
          >
            {pp(data.fdp)} %
          </text>
          <text x={190} y={240} fill="black" fontSize="10" textAnchor="middle">
            Piraten
          </text>
          <text
            x={190}
            y={215 - data.piraten * 6}
            fill="black"
            fontSize="10"
            textAnchor="middle"
          >
            {pp(data.piraten)} %
          </text>
          <text x={230} y={234} fill="black" fontSize="10" textAnchor="middle">
            Die
          </text>
          <text x={230} y={246} fill="black" fontSize="10" textAnchor="middle">
            Linke
          </text>
          <text
            x={230}
            y={215 - data.linke * 6}
            fill="black"
            fontSize="10"
            textAnchor="middle"
          >
            {pp(data.linke)} %
          </text>
          <text x={270} y={240} fill="black" fontSize="10" textAnchor="middle">
            AfD
          </text>
          <text
            x={270}
            y={215 - data.stupids * 6}
            fill="black"
            fontSize="10"
            textAnchor="middle"
          >
            {pp(data.stupids)} %
          </text>
          <text x={310} y={240} fill="black" fontSize="10" textAnchor="middle">
            Andere
          </text>
          <text
            x={310}
            y={215 - andere * 6}
            fill="black"
            fontSize="10"
            textAnchor="middle"
          >
            {pp(andere)} %
          </text>
          <line
            x1={0}
            y1={221}
            x2={328}
            y2={221}
            stroke="black"
            strokeWidth={1}
          />
          <rect
            x={18}
            y={220 - data.spd * 6} // obere linke Ecke
            width={25} // Breite des Rechtecks
            height={data.spd * 6} // Höhe des Rechtecks
            fill="red" // Farbe des Rechtecks
            stroke="black"
            strokeWidth={2}
          />
          <rect
            x={57}
            y={220 - data.cdu * 6} // obere linke Ecke
            width={25} // Breite des Rechtecks
            height={data.cdu * 6} // Höhe des Rechtecks
            fill="black" // Farbe des Rechtecks
            stroke="black"
            strokeWidth={2}
          />
          <rect
            x={97}
            y={220 - data.grüne * 6} // obere linke Ecke
            width={25} // Breite des Rechtecks
            height={data.grüne * 6} // Höhe des Rechtecks
            fill="green" // Farbe des Rechtecks
            stroke="black"
            strokeWidth={2}
          />
          <rect
            x={136}
            y={220 - data.fdp * 6} // obere linke Ecke
            width={25} // Breite des Rechtecks
            height={data.fdp * 6} // Höhe des Rechtecks
            fill="yellow" // Farbe des Rechtecks
            stroke="black"
            strokeWidth={2}
          />
          <rect
            x={177}
            y={220 - data.piraten * 6} // obere linke Ecke
            width={25} // Breite des Rechtecks
            height={data.piraten * 6} // Höhe des Rechtecks
            fill="orange" // Farbe des Rechtecks
            stroke="black"
            strokeWidth={2}
          />
          <rect
            x={217}
            y={220 - data.linke * 6} // obere linke Ecke
            width={25} // Breite des Rechtecks
            height={data.linke * 6} // Höhe des Rechtecks
            fill="violet" // Farbe des Rechtecks
            stroke="black"
            strokeWidth={2}
          />
          <rect
            x={256}
            y={220 - data.stupids * 6} // obere linke Ecke
            width={25} // Breite des Rechtecks
            height={data.stupids * 6} // Höhe des Rechtecks
            fill="blue" // Farbe des Rechtecks
            stroke="black"
            strokeWidth={2}
          />
          <rect
            x={296}
            y={220 - andere * 6} // obere linke Ecke
            width={25} // Breite des Rechtecks
            height={andere * 6} // Höhe des Rechtecks
            fill="gray" // Farbe des Rechtecks
            stroke="black"
            strokeWidth={2}
          />
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 2,
      duration: 2,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              a) Bei der Landtagswahl gaben {data.stimmen} Personen ihre Stimme
              ab. Berechne, wie viele Stimmen die {data.partei} erhielt.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Wandle die Prozentzahl des Wahlergebnisses in einer Dezimalzahl
              um:
            </p>
            <p>
              {data.partei == 'CDU' && (
                <>
                  {pp(data.cdu)} % = {pp(data.cdu / 100)}
                </>
              )}
              {data.partei == 'SPD' && (
                <>
                  {pp(data.spd)} % = {pp(data.spd / 100)}
                </>
              )}
              {data.partei == 'Grüne' && (
                <>
                  {pp(data.grüne)} % = {pp(data.grüne / 100)}
                </>
              )}
              {data.partei == 'FDP' && (
                <>
                  {pp(data.fdp)} % = {pp(data.fdp / 100)}
                </>
              )}
            </p>
            <p>
              Verwende die Formel für den Prozentwert, um die Anzahl der Stimmen
              für die {data.partei} zu bestimmen.
            </p>
            {buildEquation([
              [<>W</>, <>=</>, <>G · p</>],
              [
                <></>,
                <>=</>,
                <>
                  {data.stimmen} ·{' '}
                  {data.partei == 'CDU' && <>{pp(data.cdu / 100)}</>}
                  {data.partei == 'SPD' && <>{pp(data.spd / 100)}</>}
                  {data.partei == 'Grüne' && <>{pp(data.grüne / 100)}</>}
                  {data.partei == 'FDP' && <>{pp(data.fdp / 100)}</>}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {data.partei == 'CDU' && (
                    <>{pp((data.stimmen * data.cdu) / 100)}</>
                  )}
                  {data.partei == 'SPD' && (
                    <>{pp((data.stimmen * data.spd) / 100)}</>
                  )}
                  {data.partei == 'Grüne' && (
                    <>{pp((data.stimmen * data.grüne) / 100)}</>
                  )}
                  {data.partei == 'FDP' && (
                    <>{pp((data.stimmen * data.fdp) / 100)}</>
                  )}
                </>,
              ],
            ])}
            <p>
              Die {data.partei} erhält ungefähr
              <strong>
                {' '}
                {data.partei == 'CDU' && (
                  <>{pp(Math.round((data.stimmen * data.cdu) / 100))}</>
                )}
                {data.partei == 'SPD' && (
                  <>{pp(Math.round((data.stimmen * data.spd) / 100))}</>
                )}
                {data.partei == 'Grüne' && (
                  <>{pp(Math.round((data.stimmen * data.grüne) / 100))}</>
                )}
                {data.partei == 'FDP' && (
                  <>{pp(Math.round((data.stimmen * data.fdp) / 100))}</>
                )}{' '}
                Stimmen
              </strong>
              .
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 2,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const aussagen = [
          'SPD und CDU erreichten zusammen über 50 % der Stimmen.',
          'Jede fünfte Stimme wurde für "Die Linke" gegeben.',
          'SPD, Grüne und "Die Linke" haben zusammen mehr Stimmen als CDU und FDP zusammen bekommen.',
          'Jede zehnte Stimme wurde für die "Grüne" gegeben.',
          'Mehr als ein Zehntel aller Stimmen gehen an die "FDP".',
          'Die "Piraten" erhalten weniger als 2 % aller Stimmen.',
          'Alle Parteien (außer "Andere") haben zusammen mehr als 80 % der Stimmen.',
        ]
        return (
          <>
            <p>b) Entscheide jeweils, ob die Aussagen wahr oder falsch sind:</p>
            <ul>
              <li>{aussagen[data.item_1]}</li>
              <li>{aussagen[data.item_2]}</li>
              <li>{aussagen[data.item_3]}</li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const andere =
          100 -
          data.cdu -
          data.fdp -
          data.grüne -
          data.linke -
          data.piraten -
          data.spd -
          data.stupids
        const aussagen = [
          'SPD und CDU erreichten zusammen über 50 % der Stimmen.',
          'Jede fünfte Stimme wurde für "Die Linke" gegeben.',
          'SPD, Grüne und "Die Linke" haben zusammen mehr Stimmen als CDU und FDP zusammen bekommen.',
          'Jede zehnte Stimme wurde für die "Grüne" gegeben.',
          'Mehr als ein Zehntel aller Stimmen gehen an die "FDP".',
          'Die "Piraten" erhalten weniger als 2 % aller Stimmen.',
          'Alle Parteien (außer "Andere") haben zusammen mehr als 80 % der Stimmen.',
        ]
        const result = [
          <>
            <p>
              Die SPD und CDU haben zusammen:<br></br> {pp(data.spd)} % +{' '}
              {pp(data.cdu)} % = {pp(data.cdu + data.spd)} %.<br></br>Diese
              Aussage ist <strong>richtig</strong>.
            </p>
          </>,
          <>
            <p>
              &quot;Jede fünfte Stimme&quot; wäre ein Anteil von 20 %. So viele
              Stimmen hat &quot;Die Linke&quot; nicht erreicht.<br></br>Diese
              Aussage ist <strong>falsch</strong>.
            </p>
          </>,
          <>
            <p>
              SPD, Grüne und Die Linke haben zusammen{' '}
              {pp(data.spd + data.grüne + data.linke)} % der Stimmen. Die CDU
              und FDP haben zusammen {pp(data.fdp + data.cdu)} %. <br></br>Damit
              ist die Aussage{' '}
              {data.spd + data.grüne + data.linke > data.fdp + data.cdu ? (
                <>
                  <strong>richtig.</strong>
                </>
              ) : (
                <>
                  <strong>falsch.</strong>
                </>
              )}
            </p>
          </>,
          <>
            <p>
              &quot;Jede zehnte Stimme&quot; entspricht dem Anteil von 10 %. Die
              Grüne hat weniger Stimmen.<br></br>Diese Aussage ist{' '}
              <strong>richtig</strong>.
            </p>
          </>,
          <>
            <p>
              Die FDP hat {pp(data.fdp)} % der Stimmen. Ein Zehntel aller
              Stimmen entsprechen 10 %.<br></br>
              <br></br>Diese Aussage ist also{' '}
              {data.fdp > 10 ? (
                <>
                  <strong>richtig</strong>
                </>
              ) : (
                <>
                  <strong>falsch</strong>
                </>
              )}
              .
            </p>
          </>,
          <>
            <p>
              Die Piraten erreichen {pp(data.piraten)} %.<br></br>
              <br></br>Diese Aussage ist also <strong>richtig</strong>.
            </p>
          </>,
          <>
            <p>
              Die Parteien erreichen zusammen <br></br>
              {pp(100 - andere)} % der Stimmen.
              <br></br>Diese Aussage ist <strong>richtig</strong>.
            </p>
          </>,
        ]
        return (
          <>
            <ul>
              <li>{aussagen[data.item_1]}</li>
              {result[data.item_1]}
              <li>{aussagen[data.item_2]}</li>
              {result[data.item_2]}
              <li>{aussagen[data.item_3]}</li>
              {result[data.item_3]}
            </ul>
          </>
        )
      },
    },
  ],
}
