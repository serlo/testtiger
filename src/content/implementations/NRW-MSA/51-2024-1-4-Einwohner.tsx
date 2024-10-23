import { Exercise } from '@/data/types'
import { Color5 } from '@/helper/colors'
import { buildFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  berlin: number
  hamburg: number
  münchen: number
  köln: number
  frankfurt: number
  case: number
}

export const exercise51: Exercise<DATA> = {
  title: 'Einwohner',
  source: '2024 Teil 1 Aufgabe 4',
  useCalculator: false,
  duration: 4,
  generator(rng) {
    return {
      hamburg: rng.randomIntBetween(15, 22) / 10,
      berlin: rng.randomIntBetween(32, 40) / 10,
      münchen: rng.randomIntBetween(11, 19) / 10,
      köln: rng.randomIntBetween(8, 15) / 10,
      frankfurt: rng.randomIntBetween(5, 10) / 10,
      case: rng.randomIntBetween(1, 5),
    }
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          In der Tabelle (Abbildung 1) sind die Einwohnerzahlen der fünf
          bevölkerungsreichsten Städte Deutschlands abgebildet (Stand: 2021, auf
          Hunderttausend Einwohner gerundet).
        </p>

        <svg width="320" height="70" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="0"
            y="0"
            width="328"
            height="22"
            fill="#D2ECF6"
            stroke="none"
          />

          <rect
            x="0"
            y="0"
            width="328"
            height="60"
            rx="4"
            ry="4"
            stroke="#007EC1"
            fill="transparent"
            strokeWidth="1"
          />

          <line
            x1="0"
            y1="22"
            x2="328"
            y2="22"
            stroke="#007EC1"
            strokeWidth="1"
          />

          <text
            x="30"
            y="16"
            fontSize="10"
            textAnchor="middle"
            fontWeight="bold"
            fill="black"
          >
            Stadt
          </text>
          <text x="30" y="38" fontSize="10" textAnchor="middle" fill="black">
            Einwohner
          </text>
          <text x="30" y="48" fontSize="10" textAnchor="middle" fill="black">
            in Mio.
          </text>
          <line
            x1="60"
            y1="0"
            x2="60"
            y2="60"
            stroke="#007EC1"
            strokeWidth="1"
          />
          <line
            x1="110"
            y1="00"
            x2="110"
            y2="60"
            stroke="#007EC1"
            strokeWidth="1"
          />
          <line
            x1="170"
            y1="0"
            x2="170"
            y2="60"
            stroke="#007EC1"
            strokeWidth="1"
          />
          <line
            x1="230"
            y1="0"
            x2="230"
            y2="60"
            stroke="#007EC1"
            strokeWidth="1"
          />
          <line
            x1="262.5"
            y1="0"
            x2="262.5"
            y2="60"
            stroke="#007EC1"
            strokeWidth="1"
          />
          <text
            x="85"
            y="16"
            fontSize="10"
            textAnchor="middle"
            fontWeight="bold"
            fill="black"
          >
            Berlin
          </text>
          <text
            x="140"
            y="16"
            fontSize="10"
            textAnchor="middle"
            fontWeight="bold"
            fill="black"
          >
            Hamburg
          </text>
          <text
            x="200"
            y="16"
            fontSize="10"
            textAnchor="middle"
            fontWeight="bold"
            fill="black"
          >
            München
          </text>
          <text
            x="246.5"
            y="16"
            fontSize="10"
            textAnchor="middle"
            fontWeight="bold"
            fill="black"
          >
            Köln
          </text>
          <text
            x="295"
            y="16"
            fontSize="10"
            textAnchor="middle"
            fontWeight="bold"
            fill="black"
          >
            Frankfurt
          </text>
          <text x={75} y={48} fontSize={15} textAnchor="right" stroke="black">
            {pp(data.berlin)}
          </text>
          <text x={130} y={48} fontSize={15} textAnchor="right" stroke="black">
            {pp(data.hamburg)}
          </text>
          <text x={190} y={48} fontSize={15} textAnchor="right" stroke="black">
            {pp(data.münchen)}
          </text>
          <text x={235} y={48} fontSize={15} textAnchor="right" stroke="black">
            {pp(data.köln)}
          </text>
          <text x={282} y={48} fontSize={15} textAnchor="right" stroke="black">
            {pp(data.frankfurt)}
          </text>
        </svg>
        <center>
          <Color5>
            <span style={{ fontSize: 'small' }}>
              Abbildung 1: Einwohnerzahlen
            </span>
          </Color5>
        </center>
      </>
    )
  },
  tasks: [
    {
      points: 1,
      task({ data }) {
        return (
          <>
            <p>a) Gib den Median und die Spannweite an.</p>
          </>
        )
      },
      solution({ data }) {
        const array = [
          data.berlin,
          data.hamburg,
          data.münchen,
          data.köln,
          data.frankfurt,
        ].sort((a, b) => a - b)
        const median = array[2]
        return (
          <>
            <ol>
              <li>
                Der <strong>Median</strong> ist der mittlere Wert in der
                geordneten Datenliste. <br></br>
                <br></br>Hier ist der mittlere Wert{' '}
                <strong>{pp(median)} Mio.</strong>, denn es liegen 2 Werte
                darüber und 2 darunter.
              </li>
              <li>
                Die <strong>Spannweite</strong> ist die Differenz des größten
                Wertes und des kleinsten Wertes.<br></br> <br></br>
                {pp(array[4])} Mio. − {pp(array[0])} Mio. ={' '}
                <strong>{pp(array[4] - array[0])} Mio</strong>.
              </li>
            </ol>
          </>
        )
      },
    },
    {
      points: 1,
      task({ data }) {
        const mittel =
          (data.berlin +
            data.frankfurt +
            data.hamburg +
            data.köln +
            data.münchen) /
          5

        return (
          <>
            <p>
              b) Bestätige mit einer Rechnung, dass das arithmetische Mittel{' '}
              {(mittel * 10) % 1 == 0 ? '' : 'etwa'}{' '}
              {pp(roundToDigits(mittel, 1))} Mio. Einwohner beträgt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const mittel =
          (data.berlin +
            data.frankfurt +
            data.hamburg +
            data.köln +
            data.münchen) /
          5
        return (
          <>
            <p>
              Um das arithmetische Mittel zu berechnen, addierst du alle Werte
              und teilst das Ergebnis durch die Anzahl der Werte:
            </p>
            <p>
              {buildFrac(
                pp(data.berlin) +
                  ' + ' +
                  pp(data.hamburg) +
                  ' + ' +
                  pp(data.münchen) +
                  ' + ' +
                  pp(data.köln) +
                  ' + ' +
                  pp(data.frankfurt),
                5,
              )}{' '}
              ={' '}
              {buildFrac(
                pp(
                  data.berlin +
                    data.frankfurt +
                    data.hamburg +
                    data.köln +
                    data.münchen,
                ),
                5,
              )}{' '}
              = {pp(mittel)}
            </p>
            <p>
              Der Durchschnitt beträgt etwa{' '}
              <strong>{pp(roundToDigits(mittel, 1))} Mio</strong>. Einwohner.
            </p>
          </>
        )
      },
    },
    {
      points: 1,
      task({ data }) {
        return (
          <>
            <p>
              {data.case == 1 && (
                <>
                  <p>
                    c) Stuttgart hat weniger Einwohner als Frankfurt am Main und
                    liegt auf Platz sechs dieser Rangliste. <br></br> Erläutere,
                    wie sich die Spannweite verändert, wenn zusätzlich Stuttgart
                    berücksichtigt wird.
                  </p>
                </>
              )}
              {data.case == 2 && (
                <>
                  <p>
                    c) Erläutere, wie sich die Spannweite verändert, wenn
                    Hamburg genau so viele Einwohner hätte wie Berlin.
                  </p>
                </>
              )}
              {data.case == 3 && (
                <>
                  <p>
                    c) Erläutere, wie sich der Durchschnitt verändert, wenn alle
                    Städte einhunderttausend Einwohner mehr hätten.
                  </p>
                </>
              )}
              {data.case == 4 && (
                <>
                  <p>
                    c) Erläutere, wie sich der Median verändert, wenn Berlin 1
                    Mio. Einwohner mehr hätte.
                  </p>
                </>
              )}
              {data.case == 5 && (
                <>
                  <p>
                    c) Erläutere, wie sich der Durchschnitt verändert, wenn
                    Berlin 1 Mio. Einwohner mehr hätte.
                  </p>
                </>
              )}
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            {data.case == 1 && (
              <>
                <p>
                  Die Spannweite ist die Differenz des höchsten Wertes und des
                  niedrigsten Wertes. Da nun Stuttgart die niedrigste
                  Einwohnerzahl hat, wird die Spannweite größer. <br></br>Der
                  Wert der{' '}
                  <strong>
                    Spannweite wird um die Zahl größer, die Stuttgart weniger
                    Einwohner hat als Frankfurt
                  </strong>
                  .
                </p>
              </>
            )}
            {data.case == 2 && (
              <>
                <p>
                  Die Spannweite ist die Differenz des höchsten Wertes und des
                  niedrigsten Wertes. Der Wert wird nicht verändert, wenn er
                  mehrmals auftaucht, weshalb die{' '}
                  <strong>Spannweite gleich bleibt</strong>.
                </p>
              </>
            )}
            {data.case == 3 && (
              <>
                <p>
                  Der Durchschnitt ist der Mittelwert aller Einwohnerzahlen.
                  Wenn die Einwohnerzahl in jeder Stadt im Mittel um
                  einhunderttausend Einwohner zunimmt, ist der{' '}
                  <strong>
                    Durchschnitt ebenso um einhunderttausend größer
                  </strong>
                  .
                </p>
              </>
            )}
            {data.case == 4 && (
              <>
                <p>
                  Der Median ist der Wert in der Mitte der sortierten Liste. Die
                  Höhe des ersten Wertes (Berlin) hat keinen Einfluss auf den
                  Median. <strong>Er verändert sich also nicht.</strong>
                </p>
              </>
            )}
            {data.case == 5 && (
              <>
                <p>
                  Wenn Berlin 1 Mio. Einwohner mehr hätte, nimmt die
                  Einwohnerzahl im Mittel um
                  <br></br> 1 000 000 : 5 = 200 000 zu.<br></br>
                  <br></br>
                  Der Durchschnitt wird also um <strong>0,2 Mio.</strong>{' '}
                  größer.
                </p>
              </>
            )}
          </>
        )
      },
    },
  ],
}
