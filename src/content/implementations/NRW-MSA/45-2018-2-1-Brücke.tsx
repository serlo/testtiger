import { Exercise } from '@/data/types'
import { Color2, Color3, Color4, Color5 } from '@/helper/colors'
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
  originalData: {
    weg: 2.4,
    pace: 4,
    pace_2: 100,
    alpha_max: 7.1,
    width: 1435,
    scale: 20,
    x_1: 170,
    x_2: 187,
    x_3: 221,
    max: true,
    max_mm: 17.7,
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
            href="/content/NRW_MSA/NRW_MSA_Cotterbridge.PNG"
            height="180"
            width="328"
          />
        </svg>
        <center>
          <Color5>
            <span style={{ fontSize: 'small' }}>Abbildung 1: Brücke</span>
          </Color5>
        </center>
        <p>
          Die Freunde gehen zu Fuß zum Bahnhof in Frankfurt. Der Fußweg hat eine
          Länge von {pp(data.weg)} km. Sie gehen mit einer durchschnittlichen
          Geschwindigkeit von <br></br>
          {pp(data.pace)} Kilometern pro Stunde [km/h].
        </p>
      </>
    )
  },
  tasks: [
    {
      correctionHints({ data }) {
        return (
          <>Achte darauf, dass ein vollständiger Rechenweg angegeben wird.</>
        )
      },
      points: 2,
      duration: 2,
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
            <p>Du kannst das zum Beispiel mit dem Dreisatz berechnen. </p>
            <p>
              Die Freunde brauchen für {pp(data.pace)} km eine Stunde, also 60
              Minuten:
            </p>

            {buildEquation([
              [<>{pp(data.pace)} km</>, '≙', '60 min'],
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
                    <span style={{ fontSize: 'small' }}>: {pp(data.pace)}</span>
                  </Color4>
                </>,
              ],
              ['1 km', '≙', <>{pp(roundToDigits(60 / data.pace, 2))} min</>],
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
                    <span style={{ fontSize: 'small' }}>· {pp(data.weg)}</span>
                  </Color4>
                </>,
              ],
              [
                <>{pp(data.weg)} km</>,
                '≙',
                <>{pp(roundToDigits((data.weg * 60) / data.pace, 2))} min</>,
              ],
            ])}

            <p>
              Die Freunde brauchen{' '}
              {(data.weg / (data.pace / 60)) % 1 != 0 && 'etwa'}{' '}
              <strong>
                {pp(roundToDigits(data.weg / (data.pace / 60), 0))} Minuten
              </strong>{' '}
              für den Fußweg.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 1,
      skillIntro({ data }) {
        return (
          <>
            <p>
              Max und Justus machen einen Ausflug von Frankfurt zur Brücke in
              Baunatal.
            </p>
          </>
        )
      },
      intro({ data }) {
        return (
          <>
            <p>
              Die Freunde fahren mit dem Zug um 7:45 Uhr in Frankfurt los und
              kommen 11:45 Uhr in Baunatal an. Der abgebildete Graph stellt
              vereinfacht den Verlauf ihrer Zugfahrt dar (Abbildung 2).
            </p>
            <svg viewBox="0 0 328 180">
              <image
                href="/content/NRW_MSA/NRW_MSA_Zug_KS.PNG"
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
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 2: Verlauf der Zugfahrt
                </span>
              </Color5>
            </center>
          </>
        )
      },
      correctionHints({ data }) {
        return (
          <>
            Bestimme den Abschnitt, dessen Gerade am steilsten verläuft.
            Überprüfe genau, ob der Abschnitt, der in der Antwort genannt wird,
            diesem entspricht.
          </>
        )
      },
      task({ data }) {
        return (
          <>
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
              Auf der{' '}
              <strong>
                Teilstrecke {züge[0] == (data.x_1 - 84) / (144 - 102) && '1'}
                {züge[0] == (data.x_2 - data.x_1) / (102 - 85) && '2'}
                {züge[0] == (data.x_3 - data.x_2) / (85 - 54) && '3'}
                {züge[0] == (304 - data.x_3) / (54 - 25) && '4'}
              </strong>{' '}
              fährt der Zug mit der höchsten Geschwindigkeit.
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
      duration: 6,
      intro({ data }) {
        return (
          <>
            <p>
              Um 8:30 Uhr fährt in Baunatal ein Güterzug nach Frankfurt los. Er
              fährt die Strecke mit einer durchschnittlichen Geschwindigkeit von{' '}
              {data.pace_2} Kilometern pro Stunde [km/h].
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
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
                href="/content/NRW_MSA/NRW_MSA_Zug_KS.PNG"
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
              Die <Color3>orange Gerade</Color3> stellt die Fahrt des Güterzugs
              dar. Hierbei ist wichtig, dass die Gerade fällt, da der Güterzug
              in die entgegengesetzte Richtung fährt.
            </p>
            <p>
              Die Züge begegnen sich in
              <strong>
                {(62 * ((187.5 * 60 * 15.8) / (data.pace_2 * 15))) / 121 >
                data.x_2 - 134
                  ? ' Streckenabschnitt 3. '
                  : ' Streckenabschnitt 2. '}
              </strong>
              Bestimme den Schnittpunkt der Geraden und lies die Uhrzeit am
              Koordinatensystem ab.{' '}
            </p>
          </>
        )
      },
    },
    {
      points: 4,
      duration: 3,
      correctionHints({ data }) {
        return (
          <>
            Das hat höchste Priorität: Überprüfe, dass der Graph korrekt
            eingezeichnet ist und entgegengesetzt zum Graphen des Zugs verläuft.
            Das Koordinatensystem soll eine Achsenbeschriftung haben, ansonsten
            ist die Antwort nicht korrekt.
          </>
        )
      },
      intro({ data }) {
        return (
          <>
            <p>
              Der Zug durchfährt Kurven in Schräglage. Um diese Schräglage zu
              erreichen, werden die Gleise unterschiedlich hoch verlegt
              (Abbildung 3). Der Neigungswinkel a darf maximal{' '}
              {pp(data.alpha_max)}° betragen.
            </p>
          </>
        )
      },
      task({ data }) {
        const ergebnis = roundToDigits(
          (Math.sin((data.alpha_max / 360) * 2 * Math.PI) * data.width) / 10,
          2,
        )
        return (
          <>
            <p>
              d) Max behauptet: {'"'}Wenn der Neigungswinkel α ={' '}
              {pp(data.alpha_max)}° beträgt, dann beträgt der Höhenunterschied
              der Gleise {data.max ? pp(ergebnis) : pp(data.max_mm)} cm.{'"'}
            </p>
            <p>Hat Max recht? Begründe mit einer Rechnung.</p>
            <svg viewBox="0 0 328 300">
              <image
                href="/content/NRW_MSA/NRW_MSA_2018_2_1_Zuggrafik.svg"
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
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 3: Zug in Schräglage
                </span>
              </Color5>
            </center>
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
            {buildEquation([
              [
                <>&nbsp;&nbsp;&nbsp;&nbsp;sin(α)</>,
                '=',
                <>{buildInlineFrac('Gegenkathete', 'Hypotenuse')}</>,
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
                      Werte aus Abbildung 3 einsetzen
                    </span>
                  </Color4>
                </>,
              ],
            ])}
            {buildEquation([
              [
                <>sin({pp(data.alpha_max)}°)</>,
                '=',
                <>{buildInlineFrac('u', data.width)}</>,
                <>| · {data.width}</>,
              ],
            ])}
            {buildEquation([
              [
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;u
                </>,
                '=',
                <>
                  sin({pp(data.alpha_max)}°) · {data.width}
                </>,
              ],
              [
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </>,
                '=',
                <>
                  <strong>
                    {pp(
                      roundToDigits(
                        Math.sin((data.alpha_max / 360) * 2 * Math.PI) *
                          data.width,
                        2,
                      ),
                    )}{' '}
                    [mm]
                  </strong>
                </>,
              ],
            ])}
            <p>
              Damit entspricht der Höhenunterschied etwa{' '}
              {Math.abs(ergebnis - data.max_mm) < 0.1
                ? pp(data.max_mm)
                : pp(ergebnis)}{' '}
              cm. <strong>Max hat {!data.max && 'nicht'} recht.</strong>
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 4,
      intro({ data }) {
        const a = roundToDigits(-30 / Math.pow(30 * 2.5, 2), 4)
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
            const y = a * 0.95 * (x - 30 * 2.5) * (x - 30 * 2.5) + 30
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
              der Form <br></br>g(x) = d · (x - e)² + f <br></br>angenähert
              werden (Abbildung 4).
            </p>
            <svg viewBox="0 0 328 150">
              <image
                href="/content/NRW_MSA/NRW_MSA_Brücke.PNG"
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
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 4: Brücke, Brückenbogen durch eine Parabel
                  angenähert. Alle Angaben sind in Metern.
                </span>
              </Color5>
            </center>
          </>
        )
      },
      task({ data }) {
        const a = roundToDigits(-30 / Math.pow(30 * 2.5, 2), 4)
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
            const y = a * 0.95 * (x - 30 * 2.5) * (x - 30 * 2.5) + 30
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints = generateParabolaPoints(a, 0.1)
        return (
          <>
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
                <>
                  {' '}
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      setze ein: e = {pp(data.scale * 2.5)} und f ={' '}
                      {pp(data.scale)}
                    </span>
                  </Color4>
                </>,
              ],
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
                '',
                <>
                  {' '}
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>Berechne</span>
                  </Color4>
                </>,
              ],
              [
                '0',
                '=',
                pp(Math.pow(data.scale * 2.5, 2)) + ' · d + ' + pp(data.scale),
                <>| − {data.scale}</>,
              ],
              [
                pp(-data.scale),
                '=',
                pp(Math.pow(data.scale * 2.5, 2)) + ' · d',
                <>| : {pp(Math.pow(data.scale * 2.5, 2))}</>,
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
            <strong>
              <p>
                g(x) ={' '}
                {pp(
                  roundToDigits(-data.scale / Math.pow(data.scale * 2.5, 2), 4),
                )}{' '}
                · (x − {pp(data.scale * 2.5)})² + {pp(data.scale)}
              </p>
            </strong>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 3,
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
              Der Wert für <strong>d verändert sich nicht</strong>, denn die
              Form der Parabel bleibt gleich, unabhängig von der Position des
              Ursprungs.
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
            <p>
              Damit sind die Werte <strong>e = 0 und f = 0</strong>.
            </p>
            <p>Der Funktionsterm vereinfacht sich zu:</p>
            <strong>
              <p>
                g(x) ={' '}
                {pp(
                  roundToDigits(-data.scale / Math.pow(data.scale * 2.5, 2), 4),
                )}{' '}
                x²
              </p>
            </strong>
          </>
        )
      },
    },
  ],
}
