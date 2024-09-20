import { Exercise } from '@/data/types'
import { buildFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  weg: number
  pace: number
  pace_2: number
  alpha_max: number
  width: number
  scale: number
  x_1: number
  x_2: number
  x_3: number
}

export const exercise45: Exercise<DATA> = {
  title: '2018 Prüfungsteil 2 /1) Brücke',
  useCalculator: true,
  duration: 10,
  points: [42],
  generator(rng) {
    return {
      weg: rng.randomIntBetween(20, 30) / 10,
      pace: rng.randomIntBetween(35, 45) / 10,
      pace_2: rng.randomIntBetween(3, 5) * 25,
      alpha_max: rng.randomIntBetween(65, 75) / 10,
      width: rng.randomIntBetween(250, 350) * 5,
      scale: rng.randomItemFromArray([5, 10, 20, 30]),
      x_1: rng.randomIntBetween(110, 160),
      x_2: rng.randomIntBetween(180, 220),
      x_3: rng.randomIntBetween(240, 280),
    }
  },
  constraint({ data }) {
    return true
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
            Max und Justus machen einen Ausflug von Frankfurt zur Brücke in
            Baunatal (Abbildung 1).
          </p>
          <p>
            Die Freunde gehen zu Fuß zum Bahnhof in Frankfurt. Der Fußweg hat
            eine Länge von {pp(data.weg)} km. Sie gehen mit einer
            durchschnittlichen Geschwindigkeit von {pp(data.pace)}.
          </p>
        </>
      )
    },
    tasks: [
      ({ data }) => {
        return (
          <>
            <p>
              a) Berechne, wie viele Minuten die beiden bis zum Bahnhof
              benötigen.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              Die Freunde fahren mit dem Zug um 7:30 Uhr in Frankfurt los und
              kommen 12:00 Uhr in Baunatal an. Der abgebildete Graph stellt
              vereinfacht den Verlauf ihrer Zugfahrt dar (Abbildung 2).
            </p>
            <svg viewBox="0 0 328 180">
              <image
                href="/content/NRW_MSA_Zug_KS.PNG"
                height="180"
                width="328"
              />
              <text
                x={data.x_1 - 3}
                y={104}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                x
              </text>
              <text
                x={data.x_2 - 3}
                y={87}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                x
              </text>
              <text
                x={data.x_3 - 3}
                y={56}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                x
              </text>
              <line
                x1={84}
                y1={144}
                x2={data.x_1}
                y2={102}
                stroke="blue"
                strokeWidth={2}
              />
              <line
                x2={data.x_2}
                y2={85}
                x1={data.x_1}
                y1={102}
                stroke="blue"
                strokeWidth={2}
              />
              <line
                x1={data.x_2}
                y1={85}
                x2={data.x_3}
                y2={54}
                stroke="blue"
                strokeWidth={2}
              />
              <line
                x2={304}
                y2={25}
                x1={data.x_3}
                y1={54}
                stroke="blue"
                strokeWidth={2}
              />
            </svg>
            <p>
              b) Auf welcher Teilstrecke fährt der Zug mit der höchsten
              Durchschnittsgeschwindigkeit?<br></br> Begründe deine
              Entscheidung.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              Um 8:30 Uhr fährt in Baunatal ein Güterzug nach Frankfurt los. Er
              fährt die Strecke mit einer durchschnittlichen Geschwindigkeit von{' '}
              {data.pace_2} Kilometern pro Stunde [km/h].
            </p>
            <p>
              c) Zeichne den Verlauf der Fahrt des Güterzugs in die Grafik ein
              (Abbildung 2). Entnimm der Grafik den Streckenabschnitt, auf dem
              sich die beiden Züge begegnen und gib die ungefähre Uhrzeit an.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              Der Zug durchfährt Kurven in Schräglage. Um diese Schräglage zu
              erreichen, werden die Gleise unterschiedlich hoch verlegt
              (Abbildung 3). Der Neigungswinkel α darf maximal{' '}
              {pp(data.alpha_max)}° betragen.
            </p>
            <p>
              Max behauptet: {'"'}Wenn der Neigungswinkel α ={' '}
              {pp(data.alpha_max)}° beträgt, dann beträgt der Höhenunterschied
              der Gleise{' '}
              {pp(
                roundToDigits(
                  (Math.sin((data.alpha_max / 360) * 2 * Math.PI) *
                    data.width) /
                    10,
                  2,
                ),
              )}{' '}
              cm.{'"'}
            </p>
            <p>Hat Max recht? Begründe mit einer Rechnung.</p>
            <svg viewBox="0 0 328 300">
              <image
                href="/content/NRW_Zug_Dreieck.PNG"
                height="300"
                width="328"
              />
              <text
                x={150}
                y={225}
                fontSize={10}
                textAnchor="right"
                stroke="black"
                transform="rotate(-10, 150, 225)"
              >
                {data.width} mm
              </text>
            </svg>
            <p>Abbildung 3: Zug in Schräglage</p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              In Baunatal fotografieren Max und Justus die Brücke für den
              Mathematikunterricht. Der Brückenbogen kann durch eine Parabel g
              der Form <br></br>g(x) = d · (x − e)² + f <br></br>angenähert
              werden (Abbildung 4).
            </p>
            <svg viewBox="0 0 328 150">
              <image
                href="/content/NRW_MSA_Brücke.PNG"
                height="150"
                width="328"
              />
              <text
                x={158}
                y={55}
                fontSize={20}
                textAnchor="right"
                stroke="white"
              >
                x
              </text>
              <text
                x={145}
                y={40}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                S({pp(data.scale * 2.5)}|{data.scale})
              </text>
              <text
                x={10}
                y={140}
                fontSize={20}
                textAnchor="right"
                stroke="white"
              >
                0
              </text>
              <text
                x={63}
                y={140}
                fontSize={20}
                textAnchor="right"
                stroke="white"
              >
                {pp(data.scale)}
              </text>
              <text
                x={5}
                y={55}
                fontSize={20}
                textAnchor="right"
                stroke="white"
              >
                {pp(data.scale)}
              </text>
              <text
                x={120}
                y={140}
                fontSize={20}
                textAnchor="right"
                stroke="white"
              >
                {pp(data.scale * 2)}
              </text>
              <text
                x={180}
                y={140}
                fontSize={20}
                textAnchor="right"
                stroke="white"
              >
                {pp(data.scale * 3)}
              </text>
              <text
                x={240}
                y={140}
                fontSize={20}
                textAnchor="right"
                stroke="white"
              >
                {pp(data.scale * 4)}
              </text>
              <text
                x={290}
                y={140}
                fontSize={20}
                textAnchor="right"
                stroke="white"
              >
                {pp(data.scale * 5)}
              </text>
            </svg>
            <p>
              Abbildung 4: Brücke, Brückenbogen durch eine Parabel angenähert.
              Alle Angaben sind in Metern.
            </p>
            <p>
              Begründe, dass die Funktionsgleichung g(x) ={' '}
              {pp(
                roundToDigits(-data.scale / Math.pow(data.scale * 2.5, 2), 4),
              )}{' '}
              · (x − {pp(data.scale * 2.5)})² + {pp(data.scale)} geeignet ist,
              um den Brückenbogen zu beschreiben.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              f) Justus legt den Ursprung des Koordinatensystems in den
              Scheitelpunkt der Parabel. Gib die veränderten Werte für e und f
              an. Wie verändert sich der Wert für d?
            </p>
          </>
        )
      },
    ],
    solutions: [
      ({ data }) => {
        return (
          <>
            <p>
              Rechne die Geschwindigkeit in Kilometer pro Minute um, um das
              Ergebnis in Minuten zu erhalten:
            </p>
            <p>
              {pp(data.pace)} : 60 = {pp(roundToDigits(data.pace / 60, 4))}
            </p>
            <p>
              Weg, Geschwindigkeit und Zeit hängen über dieses Gesetz zusammen:
            </p>
            <p>Zeit = {buildFrac('Strecke', 'Geschwindigkeit')}</p>
            <p>Setze ein und berechne die Zeit für den Fußweg:</p>
            <p>
              Zeit ={' '}
              {buildFrac(pp(data.weg), pp(roundToDigits(data.pace / 60, 4)))} ={' '}
              {pp(roundToDigits(data.weg / (data.pace / 60), 2))} ≈{' '}
              {pp(Math.round(data.weg / (data.pace / 60)))}
            </p>
            <p>
              Die Freunde brauchen etwa{' '}
              {pp(Math.round(data.weg / (data.pace / 60)))} Minuten für den
              Fußweg.
            </p>
          </>
        )
      },
      ({ data }) => {
        const züge = [
          (data.x_1 - 84) / (144 - 102),
          (data.x_2 - data.x_1) / (102 - 85),
          (data.x_3 - data.x_2) / (85 - 54),
          (304 - data.x_3) / (54 - 25),
        ].sort((a, b) => a - b)
        return (
          <>
            <p>
              Auf der Teilstrecke{' '}
              {züge[0] == (data.x_1 - 84) / (144 - 102) && '1'}
              {züge[0] == (data.x_2 - data.x_1) / (102 - 85) && '2'}
              {züge[0] == (data.x_3 - data.x_2) / (85 - 54) && '3'}
              {züge[0] == (304 - data.x_3) / (54 - 25) && '4'} fährt der Zug mit
              der höchsten Geschwindigkeit.
            </p>
            <p>
              Dort verläuft die Gerade am steilsten, was bedeutet, dass die
              meiste Strecke im Verhältnis zur Zeit zurückgelegt wird.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p></p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p></p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p></p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p></p>
          </>
        )
      },
    ],
  },
}
