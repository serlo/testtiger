import { Exercise } from '@/data/types'
import {
  buildEquation,
  buildFrac,
  buildInlineFrac,
} from '@/helper/math-builder'
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
  max: boolean
  max_mm: number
}

export const exercise45: Exercise<DATA> = {
  title: 'Brücke',
  source: '2018 Teil 2 Aufgabe 1',
  useCalculator: true,
  duration: 30,
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
      max: rng.randomBoolean(),
      max_mm: rng.randomIntBetween(1501, 1999) / 100,
    }
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Max und Justus machen einen Ausflug von Frankfurt zur Brücke in
          Baunatal (Abbildung 1).
        </p>
        <svg viewBox="0 0 328 180">
          <image
            href="/content/NRW_MSA_Cotterbridge.PNG"
            height="180"
            width="328"
          />
        </svg>
        <p>
          Die Freunde gehen zu Fuß zum Bahnhof in Frankfurt. Der Fußweg hat eine
          Länge von {pp(data.weg)} km. Sie gehen mit einer durchschnittlichen
          Geschwindigkeit von {pp(data.pace)} Kilometern pro Stunde [km/h].
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
              a) Berechne, wie viele Minuten die beiden bis zum Bahnhof
              benötigen.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Rechne die Geschwindigkeit in Kilometer pro Minute um, um das
              Ergebnis in Minuten zu erhalten:
            </p>
            <p>
              {pp(data.pace)}
              {buildInlineFrac('km', 'h')} : 60 {buildInlineFrac('min', 'h')}={' '}
              {pp(roundToDigits(data.pace / 60, 4))}
              {buildInlineFrac('km', 'min')}
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
    },
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>
              Die Freunde fahren mit dem Zug um 7:45 Uhr in Frankfurt los und
              kommen 11:45 Uhr in Baunatal an. Der abgebildete Graph stellt
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
                x1={87}
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
                x2={306}
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
      solution({ data }) {
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
    },
    {
      points: 3,
      task({ data }) {
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
      solution({ data }) {
        return (
          <>
            <svg viewBox="0 0 328 181">
              <image
                href="/content/NRW_MSA_Zug_KS.PNG"
                height="181"
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
                y={88}
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
                x1={84 + 3}
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
                x2={306}
                y2={25}
                x1={data.x_3}
                y1={54}
                stroke="blue"
                strokeWidth={2}
              />
              <line
                x2={134 + ((187.5 / data.pace_2) * 60 * 15.8) / 15}
                y2={146}
                x1={134}
                y1={25}
                stroke="orange"
                strokeWidth={2}
              />
            </svg>
            <p>
              Die orange Gerade stellt die Fahrt des Güterzugs dar. Hierbei ist
              wichtig, dass die Gerade fällt, da der Güterzug entgegengesetzt
              fährt.
            </p>
            <p>
              Die Züge begegnen sich in
              {(62 * ((187.5 * 60 * 15.8) / (data.pace_2 * 15))) / 121 >
              data.x_2 - 134
                ? ' Streckenabschnitt 3. '
                : ' Streckenabschnitt 2. '}
              Bestimme den Schnittpunkt der Geraden und lies die Uhrzeit am
              Koordinatensystem ab.{' '}
            </p>
          </>
        )
      },
    },
    {
      points: 4,
      task({ data }) {
        const ergebnis = roundToDigits(
          (Math.sin((data.alpha_max / 360) * 2 * Math.PI) * data.width) / 10,
          2,
        )
        return (
          <>
            <p>
              Der Zug durchfährt Kurven in Schräglage. Um diese Schräglage zu
              erreichen, werden die Gleise unterschiedlich hoch verlegt
              (Abbildung 3). Der Neigungswinkel α darf maximal{' '}
              {pp(data.alpha_max)}° betragen.
            </p>
            <p>
              d) Max behauptet: {'"'}Wenn der Neigungswinkel α ={' '}
              {pp(data.alpha_max)}° beträgt, dann beträgt der Höhenunterschied
              der Gleise {data.max ? pp(ergebnis) : pp(data.max_mm)} cm.{'"'}
            </p>
            <p>Hat Max recht? Begründe mit einer Rechnung.</p>
            <svg viewBox="0 0 328 300">
              <image
                href="/content/NRW_MSA_2018_2_1_Zuggrafik.svg"
                height="300"
                width="328"
              />
              <text
                x={160}
                y={277}
                fontSize={10}
                textAnchor="right"
                stroke="black"
                transform="rotate(-14, 150, 225)"
              >
                {data.width} mm
              </text>
            </svg>
            <p>Abbildung 3: Zug in Schräglage</p>
          </>
        )
      },
      solution({ data }) {
        const ergebnis = roundToDigits(
          (Math.sin((data.alpha_max / 360) * 2 * Math.PI) * data.width) / 10,
          2,
        )
        return (
          <>
            {' '}
            <p>
              Im rechtwinkligen Dreieck in Abbildung 3 sind die Gegenkathete von
              α und die Hypotenuse gegeben. Das Verhältnis dieser Seiten wird
              durch den Sinus beschrieben:
            </p>
            <p>
              sin(α) = {buildFrac('Gegenkathete', 'Hypotenuse')} ={' '}
              {buildFrac('u', data.width + ' mm')}
            </p>
            <p>
              Stelle die Gleichung um, um den Höhenunterschied u zu berechnen:
            </p>
            <p>
              u = sin({data.alpha_max}°) · {data.width + ' mm'} ≈{' '}
              {pp(
                roundToDigits(
                  Math.sin((data.alpha_max / 360) * 2 * Math.PI) * data.width,
                  2,
                ),
              )}{' '}
              mm
            </p>
            <p>
              Damit entspricht der Höhenunterschied etwa{' '}
              {Math.abs(ergebnis - data.max_mm) < 0.1
                ? pp(data.max_mm)
                : pp(ergebnis)}{' '}
              cm. Max hat {!data.max && 'nicht'} recht.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      task({ data }) {
        const a = roundToDigits(-data.scale / Math.pow(data.scale * 2.5, 2), 4)
        function toX(n: number) {
          return 10 + n * 2
        }
        function toY(n: number) {
          return 116 - n * 2.1
        }
        function generateParabolaPoints(
          a: number,

          step: number,
        ): string {
          let points = ''
          for (let x = 0; x <= 150; x += step) {
            const y =
              a * 0.95 * (x - data.scale * 2.5) * (x - data.scale * 2.5) +
              data.scale
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints = generateParabolaPoints(a, 0.1)
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
              <polyline
                points={parabolaPoints}
                stroke="blue"
                strokeWidth="2.5"
                fill="none"
                transform="rotate(-1.3)"
              />
              <text
                x={210}
                y={114}
                fontSize={20}
                textAnchor="right"
                stroke="white"
              >
                x
              </text>
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
              e) Begründe, dass die Funktionsgleichung g(x) ={' '}
              {pp(
                roundToDigits(-data.scale / Math.pow(data.scale * 2.5, 2), 4),
              )}{' '}
              · (x − {pp(data.scale * 2.5)})² + {pp(data.scale)} geeignet ist,
              um den Brückenbogen zu beschreiben.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Der Scheitel S({pp(data.scale * 2.5)}|{pp(data.scale)}) kann aus
              der Skizze abgelesen und in die allgemeine Scheitelform der
              Parabel eingesetzt werden:
            </p>

            {buildEquation([
              ['g(x)', '=', 'd · (x − e)² + f'],
              [
                '',
                '=',
                'd · (x − ' + pp(data.scale * 2.5) + ')² + ' + pp(data.scale),
              ],
            ])}

            <p>
              Der Öffnungsfaktor d muss noch bestimmt werden. Dazu können wir
              den Punkt (0|0) in die Funktionsgleichung einsetzen, da sich
              dieser auf der Parabel befinden muss.
            </p>

            {buildEquation([
              [
                '0',
                '=',
                'd · (0 − ' + pp(data.scale * 2.5) + ')² + ' + pp(data.scale),
              ],
              [
                '0',
                '=',
                pp(Math.pow(data.scale * 2.5, 2)) + ' · d + ' + pp(data.scale),
              ],
              [
                pp(-data.scale),
                '=',
                pp(Math.pow(data.scale * 2.5, 2)) + ' · d',
              ],
              [
                'd',
                '=',
                pp(
                  roundToDigits(-data.scale / Math.pow(data.scale * 2.5, 2), 4),
                ),
              ],
            ])}
            <p>
              Damit ist die vollständige Funktionsgleichung, wie angegeben:{' '}
            </p>
            <p>
              g(x) ={' '}
              {pp(
                roundToDigits(-data.scale / Math.pow(data.scale * 2.5, 2), 4),
              )}{' '}
              · (x − {pp(data.scale * 2.5)})² + {pp(data.scale)}
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
              f) Justus legt den Ursprung des Koordinatensystems in den
              Scheitelpunkt der Parabel. Gib die veränderten Werte für e und f
              an. Wie verändert sich der Wert für d?
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Der Wert für d verändert sich nicht, denn die Form der Parabel
              bleibt gleich, unabhängig von der Position des Ursprungs.
            </p>
            <p>
              Der neue Scheitelpunkt liegt im Ursprung (0|0), welcher in die
              Scheitelform eingesetzt werden kann:
            </p>

            <p>
              g(x) ={' '}
              {pp(
                roundToDigits(-data.scale / Math.pow(data.scale * 2.5, 2), 4),
              )}{' '}
              · (x − 0)² + 0
            </p>
            <p>Damit sind die Werte e = 0 und f = 0.</p>
            <p>Der Term vereinfacht sich zu:</p>
            <p>
              g(x) ={' '}
              {pp(
                roundToDigits(-data.scale / Math.pow(data.scale * 2.5, 2), 4),
              )}{' '}
              x²
            </p>
          </>
        )
      },
    },
  ],
}
