import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  maenner_1: number
  frauen_1: number
  maenner_2: number
  frauen_2: number
  maenner_3: number
  frauen_3: number
  maenner_4: number
  frauen_4: number
  maenner_5: number
  frauen_5: number
  maenner_6: number
  frauen_6: number
  umfrage: number
}

export const exercise214: Exercise<DATA> = {
  title: '2022 Variante 1 /6) Diagramm auswerten',
  useCalculator: false,
  duration: -1,
  generator(rng) {
    return {
      maenner_1: rng.randomIntBetween(30, 42),
      frauen_1: rng.randomIntBetween(17, 24),
      maenner_2: rng.randomIntBetween(25, 31),
      frauen_2: rng.randomIntBetween(15, 17),
      maenner_3: rng.randomIntBetween(21, 26),
      frauen_3: rng.randomIntBetween(12, 14),
      maenner_4: rng.randomIntBetween(18, 24),
      frauen_4: rng.randomIntBetween(12, 16),
      maenner_5: rng.randomIntBetween(19, 23),
      frauen_5: rng.randomIntBetween(11, 15),
      maenner_6: rng.randomIntBetween(16, 22),
      frauen_6: rng.randomIntBetween(9, 13),
      umfrage: rng.randomIntBetween(110, 150),
    }
  },
  constraint({ data }) {
    return (
      data.maenner_2 != data.frauen_2 * 2 &&
      (data.maenner_4 > data.frauen_4 || data.maenner_5 > data.frauen_5) &&
      data.maenner_4 != data.frauen_4 &&
      data.maenner_5 != data.frauen_5 &&
      data.frauen_5 != data.frauen_6 &&
      data.frauen_3 != data.frauen_4 &&
      data.frauen_4 != data.frauen_5
    )
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
  subtasks: {
    tasks: [
      ({ data }) => {
        return (
          <>
            <p>
              Die Weltgesundheitsorganisation (WHO) empfiehlt eine körperliche
              Aktivität von mindestens 2,5 Stunden pro Woche.<br></br>Das
              Diagramm zeigt den Anteil der Männer und Frauen, die mindestens
              2,5 Stunden pro Woche körperlich aktiv sind.
            </p>
            <svg viewBox="0 0 700 500" className="h-[350px]">
              <image
                href="/content/NRW_MSA_Diagramm.png"
                height="500"
                width="700"
              />
              <rect
                x={145}
                y={405 - (39 / 5) * data.maenner_1} // obere linke Ecke
                width={25} // Breite des Rechtecks
                height={(39 / 5) * data.maenner_1} // Höhe des Rechtecks
                fill="orange" // Farbe des Rechtecks
                stroke="black"
                strokeWidth={2}
              />
              <text
                x={147}
                y={405 - (39 / 5) * data.maenner_1 - 10}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {data.maenner_1} %
              </text>
              <rect
                x={175}
                y={405 - (39 / 5) * data.frauen_1} // obere linke Ecke
                width={25} // Breite des Rechtecks
                height={(39 / 5) * data.frauen_1} // Höhe des Rechtecks
                fill="green" // Farbe des Rechtecks
                stroke="black"
                strokeWidth={2}
              />
              <text
                x={177}
                y={405 - (39 / 5) * data.frauen_1 - 10}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {data.frauen_1} %
              </text>
              <rect
                x={245}
                y={405 - (39 / 5) * data.maenner_2} // obere linke Ecke
                width={25} // Breite des Rechtecks
                height={(39 / 5) * data.maenner_2} // Höhe des Rechtecks
                fill="orange" // Farbe des Rechtecks
                stroke="black"
                strokeWidth={2}
              />
              <text
                x={245}
                y={405 - (39 / 5) * data.maenner_2 - 10}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {data.maenner_2} %
              </text>
              <rect
                x={275}
                y={405 - (39 / 5) * data.frauen_2} // obere linke Ecke
                width={25} // Breite des Rechtecks
                height={(39 / 5) * data.frauen_2} // Höhe des Rechtecks
                fill="green" // Farbe des Rechtecks
                stroke="black"
                strokeWidth={2}
              />
              <text
                x={275}
                y={405 - (39 / 5) * data.frauen_2 - 10}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {data.frauen_2} %
              </text>
              <rect
                x={340}
                y={405 - (39 / 5) * data.maenner_3} // obere linke Ecke
                width={25} // Breite des Rechtecks
                height={(39 / 5) * data.maenner_3} // Höhe des Rechtecks
                fill="orange" // Farbe des Rechtecks
                stroke="black"
                strokeWidth={2}
              />
              <text
                x={340}
                y={405 - (39 / 5) * data.maenner_3 - 10}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {data.maenner_3} %
              </text>
              <rect
                x={370}
                y={405 - (39 / 5) * data.frauen_3} // obere linke Ecke
                width={25} // Breite des Rechtecks
                height={(39 / 5) * data.frauen_3} // Höhe des Rechtecks
                fill="green" // Farbe des Rechtecks
                stroke="black"
                strokeWidth={2}
              />
              <text
                x={370}
                y={405 - (39 / 5) * data.frauen_3 - 10}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {data.frauen_3} %
              </text>
              <rect
                x={435}
                y={405 - (39 / 5) * data.maenner_4} // obere linke Ecke
                width={25} // Breite des Rechtecks
                height={(39 / 5) * data.maenner_4} // Höhe des Rechtecks
                fill="orange" // Farbe des Rechtecks
                stroke="black"
                strokeWidth={2}
              />
              <text
                x={435}
                y={405 - (39 / 5) * data.maenner_4 - 10}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {data.maenner_4} %
              </text>
              <rect
                x={465}
                y={405 - (39 / 5) * data.frauen_4} // obere linke Ecke
                width={25} // Breite des Rechtecks
                height={(39 / 5) * data.frauen_4} // Höhe des Rechtecks
                fill="green" // Farbe des Rechtecks
                stroke="black"
                strokeWidth={2}
              />
              <text
                x={465}
                y={405 - (39 / 5) * data.frauen_4 - 10}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {data.frauen_4} %
              </text>
              <rect
                x={530}
                y={405 - (39 / 5) * data.maenner_5} // obere linke Ecke
                width={25} // Breite des Rechtecks
                height={(39 / 5) * data.maenner_5} // Höhe des Rechtecks
                fill="orange" // Farbe des Rechtecks
                stroke="black"
                strokeWidth={2}
              />
              <text
                x={530}
                y={405 - (39 / 5) * data.maenner_5 - 10}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {data.maenner_5} %
              </text>
              <rect
                x={560}
                y={405 - (39 / 5) * data.frauen_5} // obere linke Ecke
                width={25} // Breite des Rechtecks
                height={(39 / 5) * data.frauen_5} // Höhe des Rechtecks
                fill="green" // Farbe des Rechtecks
                stroke="black"
                strokeWidth={2}
              />
              <text
                x={560}
                y={405 - (39 / 5) * data.frauen_5 - 10}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {data.frauen_5} %
              </text>
              <rect
                x={625}
                y={405 - (39 / 5) * data.maenner_6} // obere linke Ecke
                width={25} // Breite des Rechtecks
                height={(39 / 5) * data.maenner_6} // Höhe des Rechtecks
                fill="orange" // Farbe des Rechtecks
                stroke="black"
                strokeWidth={2}
              />
              <text
                x={625}
                y={405 - (39 / 5) * data.maenner_6 - 10}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {data.maenner_6} %
              </text>
              <rect
                x={655}
                y={405 - (39 / 5) * data.frauen_6} // obere linke Ecke
                width={25} // Breite des Rechtecks
                height={(39 / 5) * data.frauen_6} // Höhe des Rechtecks
                fill="green" // Farbe des Rechtecks
                stroke="black"
                strokeWidth={2}
              />
              <text
                x={655}
                y={405 - (39 / 5) * data.frauen_6 - 10}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {data.frauen_6} %
              </text>
            </svg>
            <p>
              a) Entscheide mithilfe des Diagramms ob die Aussage zutrifft oder
              nicht.
            </p>

            <p>
              Bei den 30-39-Jährigen ist der Anteil der Männer, die mindestens
              2,5 Stunden/Woche körperlich aktiv sind, mehr als doppelt so groß
              wie bei den Frauen.{' '}
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              b) Entscheide mithilfe des Diagramms ob die Aussage zutrifft oder
              nicht.
            </p>
            <p>
              Der Anteil der Männer, die mindestens 2,5 Stunden/Woche körperlich
              aktiv sind, ist in jeder Altersgruppe höher als der Anteil der
              Frauen der gleichen Altersgruppe.{' '}
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              c) Entscheide mithilfe des Diagramms ob die Aussage zutrifft oder
              nicht.
            </p>
            <p>
              Je älter Frauen werden, desto weniger entspricht ihre körperliche
              Aktivität der Empfehlung der WHO.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              d) In der Gruppe der 18- bis 29-Jährigen gaben {data.umfrage}{' '}
              Männer an, dass sie mindestens 2,5 Stunden pro Woche körperlich
              aktiv sind.
            </p>
            <p>
              Berechne, wieviele Männer in dieser Altersgruppe befragt wurden.
            </p>{' '}
          </>
        )
      },
    ],
    solutions: [
      ({ data }) => {
        return (
          <>
            <p>Unter den 30 - bis 39 - jährigen Personen sind die Anteile: </p>
            <p>{data.maenner_2} % unter den Männern</p>
            <p>{data.frauen_2} % unter den Frauen</p>
            <p>
              {data.maenner_2 > 2 * data.frauen_2
                ? 'Der Anteil der Männer ist damit mehr als doppelt so hoch, als der Anteil der Frauen.'
                : 'Damit ist Anteil der Männer nicht mehr als doppelt so hoch, als der Anteil der Frauen.'}
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              {data.maenner_1 > data.frauen_1 &&
              data.maenner_2 > data.frauen_2 &&
              data.maenner_3 > data.frauen_3 &&
              data.maenner_4 > data.frauen_4 &&
              data.maenner_5 > data.frauen_5 &&
              data.maenner_6 > data.frauen_6
                ? 'In allen Kategorien ist der Anteil der körperlich aktiven Männer höher als der der Frauen.'
                : 'Der Anteil der köperlich aktiven Frauen ist im Bereich der '}
              {data.maenner_4 < data.frauen_4
                ? '50 - bis 59 -jährigen Frauen höher.'
                : false}
              {data.maenner_5 < data.frauen_5
                ? '60 - bis 69 -jährigen Frauen höher.'
                : false}{' '}
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              {data.frauen_1 > data.frauen_2 &&
              data.frauen_2 > data.frauen_3 &&
              data.frauen_3 > data.frauen_4 &&
              data.frauen_4 > data.frauen_5 &&
              data.frauen_5 > data.frauen_6
                ? 'Diese Aussage trifft zu, der Anteil der körperlich aktiven Frauen wird in jeder Kategorie geringer.'
                : 'Diese Aussage trifft nicht zu. '}
              {data.frauen_3 < data.frauen_4
                ? 'Der Anteil der körperlich aktiven Frauen nimmt von 40-49 bis 50-59 beispielsweise zu.'
                : false}
              {data.frauen_3 > data.frauen_4 && data.frauen_4 < data.frauen_5
                ? 'Von 50-59 bis 60-69 steigt dieser Anteil beispielsweise an.'
                : false}
              {data.frauen_3 > data.frauen_4 &&
              data.frauen_4 > data.frauen_5 &&
              data.frauen_5 < data.frauen_6
                ? 'Von 60-69 bis 70-79 steigt dieser Anteil beispielsweise an.'
                : false}
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              {data.umfrage} Männer aus der Umfrage entsprechen {data.maenner_1}{' '}
              % der Grundgesamtheit.
            </p>
            <p>
              Mit der Formel für den Prozentwert lässt sich diese Rechnung mit
              dem Grundwert G schreiben als:
            </p>
            <p>
              G · {pp(data.maenner_1 / 100)} = {data.umfrage}
            </p>
            <p>Stelle die Formel um und bestimme den Grundwert G.</p>
            <p>
              G = {data.umfrage} : {pp(data.maenner_1 / 100)} ={' '}
              {pp(
                Math.round((data.umfrage / (data.maenner_1 / 100)) * 100) / 100
              )}
            </p>
            <p>
              Es wurden etwa {Math.round(data.umfrage / (data.maenner_1 / 100))}{' '}
              Männer befragt.
            </p>
          </>
        )
      },
    ],
  },
}
