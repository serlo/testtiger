import { Exercise } from '@/data/types'
import { buildFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  sprung1: number
  sprung2: number
  sprung3: number
  sprung4: number
  sprung5: number
}

export const exercise131: Exercise<DATA> = {
  title: 'Weitsprung',
  source: '2024 Teil 1 Aufgabe 3',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {
      sprung1: rng.randomIntBetween(35, 45) / 10,
      sprung2: rng.randomIntBetween(35, 45) / 10,
      sprung3: rng.randomIntBetween(35, 45) / 10,
      sprung4: rng.randomIntBetween(35, 45) / 10,
      sprung5: rng.randomIntBetween(35, 45) / 10,
    }
  },
  originalData: {
    sprung1: 3.8,
    sprung2: 3.6,
    sprung3: 4.3,
    sprung4: 4.2,
    sprung5: 4.1,
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Sonja übt Weitsprung. Ihre ersten fünf Sprünge hat sie in einer
          Tabelle notiert.
        </p>
        <svg width="320" height="150" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="10"
            y="10"
            width="220"
            height="22"
            fill="#D2ECF6"
            stroke="none"
          />

          <rect
            x="10"
            y="10"
            width="220"
            height="132"
            rx="4"
            ry="4"
            stroke="#007EC1"
            fill="transparent"
            strokeWidth="1"
          />

          <line
            x1="10"
            y1="32"
            x2="230"
            y2="32"
            stroke="#007EC1"
            strokeWidth="1"
          />
          <line
            x1="10"
            y1="54"
            x2="230"
            y2="54"
            stroke="#007EC1"
            strokeWidth="1"
          />
          <line
            x1="10"
            y1="76"
            x2="230"
            y2="76"
            stroke="#007EC1"
            strokeWidth="1"
          />
          <line
            x1="10"
            y1="98"
            x2="230"
            y2="98"
            stroke="#007EC1"
            strokeWidth="1"
          />
          <line
            x1="10"
            y1="120"
            x2="230"
            y2="120"
            stroke="#007EC1"
            strokeWidth="1"
          />
          <line
            x1="85"
            y1="10"
            x2="85"
            y2="142"
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
            Sprung
          </text>
          <text x="47.5" y="48" fontSize="10" textAnchor="middle" fill="black">
            1
          </text>
          <text x="47.5" y="70" fontSize="10" textAnchor="middle" fill="black">
            2
          </text>
          <text x="47.5" y="92" fontSize="10" textAnchor="middle" fill="black">
            3
          </text>
          <text x="47.5" y="114" fontSize="10" textAnchor="middle" fill="black">
            4
          </text>
          <text x="47.5" y="136" fontSize="10" textAnchor="middle" fill="black">
            5
          </text>
          <text
            x="160"
            y="26"
            fontSize="10"
            textAnchor="middle"
            fontWeight="bold"
            fill="black"
          >
            Sonjas Sprungweiten
          </text>
          <text x="160" y="48" fontSize="10" textAnchor="middle" fill="black">
            {pp(data.sprung1)} m
          </text>
          <text x="160" y="70" fontSize="10" textAnchor="middle" fill="black">
            {pp(data.sprung2)} m
          </text>
          <text x="160" y="92" fontSize="10" textAnchor="middle" fill="black">
            {pp(data.sprung3)} m
          </text>
          <text x="160" y="114" fontSize="10" textAnchor="middle" fill="black">
            {pp(data.sprung4)} m
          </text>
          <text x="160" y="136" fontSize="10" textAnchor="middle" fill="black">
            {pp(data.sprung5)} m
          </text>
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
            <p>a) Gib die Spannweite und den Median der fünf Sprünge an.</p>
          </>
        )
      },
      solution({ data }) {
        const array = [
          data.sprung1,
          data.sprung2,
          data.sprung3,
          data.sprung4,
          data.sprung5,
        ].sort((a, b) => a - b)
        const median = array[2]
        return (
          <>
            <ul>
              <li>
                Der <strong>Median</strong> ist der mittlere Wert in der
                geordneten Datenliste. <br></br>
                <br></br>Hier ist der mittlere Wert{' '}
                <strong>{pp(median)} m</strong>, denn es liegen 2 Werte darüber
                und 2 darunter.
              </li>
              <li>
                Die <strong>Spannweite</strong> ist die Differenz des größten
                Wertes und des kleinsten Wertes:<br></br>
                {pp(array[4])} − {pp(array[0])} ={' '}
                <strong>{pp(array[4] - array[0])} [m]</strong>.
              </li>
            </ul>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 2,
      intro({ data }) {
        return <></>
      },
      task({ data }) {
        return (
          <>
            <p>
              b) Berechne die durchschnittliche Sprungweite aus den fünf
              Sprüngen.
            </p>
          </>
        )
      },
      solution({ data }) {
        const mittel =
          (data.sprung1 +
            data.sprung2 +
            data.sprung3 +
            data.sprung4 +
            data.sprung5) /
          5
        return (
          <>
            <p>
              Um den Durchschnitt zu berechnen, addierst du alle Werte und
              teilst das Ergebnis durch die Anzahl der Werte:
            </p>
            <p>
              {buildFrac(
                pp(data.sprung1) +
                  ' + ' +
                  pp(data.sprung2) +
                  ' + ' +
                  pp(data.sprung3) +
                  ' + ' +
                  pp(data.sprung4) +
                  ' + ' +
                  pp(data.sprung5),
                5,
              )}{' '}
              ={' '}
              {buildFrac(
                pp(
                  data.sprung1 +
                    data.sprung2 +
                    data.sprung3 +
                    data.sprung4 +
                    data.sprung5,
                ),
                5,
              )}{' '}
              = {pp(mittel)}
            </p>
            <p>
              Der Durchschnitt beträgt{' '}
              <strong>{pp(roundToDigits(mittel, 2))} Meter</strong>.
            </p>
          </>
        )
      },
    },
  ],
}
