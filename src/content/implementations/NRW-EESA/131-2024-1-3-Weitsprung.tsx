import { Exercise } from '@/data/types'
import { Color2, Color4 } from '@/helper/colors'
import {
  buildEquation,
  buildFrac,
  buildInlineFrac,
  ExplanationBox,
} from '@/helper/math-builder'
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
  duration: 8,
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
  learningPathData: {
    sprung1: 4.5,
    sprung2: 3.5,
    sprung3: 4.1,
    sprung4: 3.9,
    sprung5: 4.4,
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
      duration: 4,
      intro({ data }) {
        return null
      },
      example() {
        return (
          <>
            <style>
              {`
        .explanation-box {
          border: 1px solid lightblue;
          padding: 0px 8px;
          background-color: #f9f9f9;
          border-radius: 8px;
        }
      `}
            </style>
            <p>
              Mika und seine Freundinnen und Freunde messen, wie groß sie sind
              und halten das Ergebnis in einer Tabelle fest.
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
                Name
              </text>
              <text
                x="47.5"
                y="48"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                Mika
              </text>
              <text
                x="47.5"
                y="70"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                Florian
              </text>
              <text
                x="47.5"
                y="92"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                Nisa
              </text>
              <text
                x="47.5"
                y="114"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                Leonie
              </text>
              <text
                x="47.5"
                y="136"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                Adam
              </text>
              <text
                x="160"
                y="26"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                Größe
              </text>
              <text
                x="160"
                y="48"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                1,43 m
              </text>
              <text
                x="160"
                y="70"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                1,33 m
              </text>
              <text
                x="160"
                y="92"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                1,38 m
              </text>
              <text
                x="160"
                y="114"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                1,32 m
              </text>
              <text
                x="160"
                y="136"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                1,39 m
              </text>
            </svg>
            <p>
              <b>a</b>) Gib den Median der Körpergröße an.
            </p>
            <Color2>
              <b>Antwort:</b> Der Median liegt bei <b>1,38 m</b>.
            </Color2>
            <ExplanationBox>
              <p>Erklärung:</p>
              <hr style={{ margin: '10px 0' }} />
              <p>
                Ordne die Körpergrößen von klein nach groß:<br></br>1,32
                m&nbsp;&nbsp;&nbsp; 1,33 m&nbsp;&nbsp; &nbsp; 1,38
                m&nbsp;&nbsp;&nbsp; 1,39 m&nbsp;&nbsp; &nbsp; 1,43 m
              </p>
              <p>
                Der <b>Median</b> ist der Wert, der <b>in der Mitte</b> liegt:{' '}
                <b>1,38 m</b>
              </p>
            </ExplanationBox>
            <br></br>
            <p>
              <b>b</b>) Gib die Spannweite der Körpergröße an.
            </p>
            <Color2>
              <b>Antwort:</b> Die Spannweite beträgt <b>0,11 m</b>.
            </Color2>
            <ExplanationBox>
              <p>Erklärung:</p>
              <hr style={{ margin: '10px 0' }} />
              <p>
                Die <b>Spannweite</b> ist der{' '}
                <b>Abstand zwischen größtem und kleinstem Wert</b>:<br></br>{' '}
                1,43 - 1,32 = <b>0,11 [m]</b>
              </p>
            </ExplanationBox>
            <br></br>
            <p>
              <b>c</b>) Gib den Mittelwert der Körpergröße an.
            </p>
            <Color2>
              <b>Antwort:</b> Der Mittelwert beträgt <b>1,37 m</b>.
            </Color2>
            <ExplanationBox>
              <p>Erklärung:</p>
              <hr style={{ margin: '10px 0' }} />
              <p>
                Addiere für den <b>Mittelwert</b> alle Körpergrößen und teile
                das Ergebnis durch 5:<br></br> (1,32 + 1,33 + 1,38 + 1,39 +
                1,43) : 5 = <b>1,37 [m]</b>
              </p>
            </ExplanationBox>
          </>
        )
      },
      task({ data }) {
        return (
          //a)
          <>
            <p>Gib die Spannweite und den Median der fünf Sprünge an.</p>
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
            <p>
              Ordne die Sprünge der Größe nach: <br></br>
              {pp(array[0])} m&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
              {pp(array[1])} m&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {pp(array[2])} m&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {pp(array[3])} m&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{pp(array[4])}{' '}
              m
            </p>
            <p>
              Der <b>Median</b> ist die Zahl, die in der Mitte liegt:{' '}
              <b>{pp(array[2])} m</b>.
            </p>
            Die <b>Spannweite</b> ist der Abstand zwischen dem kleinsten und dem
            größten Messwert: <br></br>
            {pp(array[4])} − {pp(array[0])} ={' '}
            <b>{pp(array[4] - array[0])} [m]</b>
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
        return (
          //b)
          <>
            <p>
              Berechne die durchschnittliche Sprungweite aus den fünf Sprüngen.
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
              Addiere für den Durchschnitt alle 5 Sprünge und teile das Ergbnis
              durch 5:
            </p>

            <p>
              (Sprung 1 + Sprung 2 + ... + Sprung 5) : 5<br></br>= (
              {pp(data.sprung1)} + {pp(data.sprung2)} + {pp(data.sprung3)} +{' '}
              {pp(data.sprung4)} + {pp(data.sprung5)}) : 5<br></br>={' '}
              {pp(
                roundToDigits(
                  data.sprung1 +
                    data.sprung2 +
                    data.sprung3 +
                    data.sprung4 +
                    data.sprung5,
                  2,
                ),
              )}{' '}
              : 5<br></br>={' '}
              {pp(
                roundToDigits(
                  (data.sprung1 +
                    data.sprung2 +
                    data.sprung3 +
                    data.sprung4 +
                    data.sprung5) /
                    5,
                  2,
                ),
              )}{' '}
              [m]
            </p>
            <p>
              <b>
                {' '}
                Der Durchschnitt beträgt{' '}
                {pp(
                  roundToDigits(
                    (data.sprung1 +
                      data.sprung2 +
                      data.sprung3 +
                      data.sprung4 +
                      data.sprung5) /
                      5,
                    2,
                  ),
                )}{' '}
                m.
              </b>
            </p>
          </>
        )
      },
    },
  ],
}
