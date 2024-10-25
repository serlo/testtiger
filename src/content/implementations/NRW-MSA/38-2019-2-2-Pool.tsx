import { Exercise } from '@/data/types'
import { Color1, Color2, Color3, Color4, Color5 } from '@/helper/colors'
import { buildEquation, buildSqrt } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  höhe: number
  surface: number
  water: number
  terra: number
  growth: number
  day: number
}

export const exercise38: Exercise<DATA> = {
  title: 'Pool',
  source: '2019 Teil 2 Aufgabe 2',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    return {
      höhe: rng.randomIntBetween(9, 16) / 10,
      surface: rng.randomIntBetween(800, 1200) / 100,
      water: rng.randomIntBetween(1, 5) * 5,
      terra: rng.randomIntBetween(60, 90),
      growth: rng.randomIntBetween(2, 5) * 5,
      day: rng.randomIntBetween(3, 8),
    }
  },
  originalData: {
    höhe: 1.5,
    surface: 9.62,
    water: 20,
    terra: 80,
    growth: 20,
    day: 6,
  },
  constraint({ data }) {
    return (
      (data.surface / 20, 2) * Math.pow(data.growth / 100 + 1, data.day) <
      data.surface
    )
  },
  intro({ data }) {
    return (
      <>
        <p>
          Familie Sommer hat ein Schwimmbecken gekauft (Abbildung 1). Das
          Schwimmbecken ist {pp(data.höhe)} m hoch und hat ein Volumen von{' '}
          {pp(roundToDigits(data.surface * data.höhe, 2))} m².
        </p>
        <img src="/content/NRW_MSA_Pool.svg" width={328} alt="" />
        <center>
          <Color5>
            <span style={{ fontSize: 'small' }}>
              Abbildung 1: Schwimmbecken (nicht maßstabsgetreu)
            </span>
          </Color5>
        </center>
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
              a) Bestätige durch eine Rechnung, dass der Flächeninhalt der
              Grundfläche des Schwimmbeckens {pp(data.surface)} m² beträgt.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Das Schwimmbecken hat die Form eines Zylinders. Für das Volumen
              gilt:
            </p>
            <p>V = G · h</p>
            <p>
              Dabei bezeichnet G die Grundfläche des Schwimmbeckens und h die
              Höhe.
            </p>
            <p>
              Setze die Werte ein und löse die Formel nach der Grundfläche auf:
            </p>
            {buildEquation([
              ['V', '=', 'G · h'],
              [
                pp(roundToDigits(data.surface * data.höhe, 2)),
                '=',
                <>G · {pp(data.höhe)}</>,
                <>| : {pp(data.höhe)}</>,
              ],
              [
                'G',
                '=',
                <>
                  {pp(roundToDigits(data.surface * data.höhe, 2))} :{' '}
                  {pp(data.höhe)}
                </>,
              ],
              [
                <>
                  <strong>G</strong>
                </>,
                <>
                  <strong>≈</strong>
                </>,
                <>
                  <strong>{pp(data.surface)} [m²]</strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 3,
      skillIntro({ data }) {
        return (
          <>
            <p>Die Grundfläche beträgt G = {pp(data.surface)} [m²].</p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              b) Das Becken wird bis {data.water} cm unterhalb des Randes mit
              Wasser gefüllt. Berechne, wie viele Liter Wasser in das Becken
              gefüllt werden.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Berechne das Volumen des zylinderförmigen Pools mit der Formel:
            </p>
            <p>V = G · h</p>
            <ul>
              <li>Die Grundfläche G beträgt {pp(data.surface)} m².</li>
              <li>
                Die Höhe h des Wassers beträgt: <br></br>
                {pp(data.höhe)} − {pp(data.water / 100)} ={' '}
                {pp(data.höhe - data.water / 100)} [m]
              </li>
            </ul>

            <p>Setze ein und berechne:</p>

            {buildEquation([
              ['V', '=', 'G · h'],
              [
                '',
                '=',
                <>
                  {pp(data.surface)} · {pp(data.höhe - data.water / 100)}
                </>,
              ],
              [
                '',
                '≈',
                <>
                  {pp(
                    roundToDigits(
                      data.surface * (data.höhe - data.water / 100),
                      2,
                    ),
                  )}{' '}
                  [m³]
                </>,
              ],
            ])}
            <p>
              Das Volumen beträgt{' '}
              <strong>
                {pp(
                  roundToDigits(
                    data.surface * (data.höhe - data.water / 100),
                    2,
                  ),
                )}{' '}
                m³
              </strong>
              .
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
              c) Das Becken steht auf einer quadratischen Terrasse, die an zwei
              Seiten jeweils {data.terra} cm übersteht (Abbildung 2). Bestimme
              rechnerisch die Maße der Terrasse.
            </p>
            <svg viewBox="0 0 328 270">
              <image
                href="/content/NRW_MSA_Pool.png"
                height="270"
                width="328"
              />
              <text
                x={210}
                y={90}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {data.terra} cm
              </text>
              <text
                x={130}
                y={220}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {data.terra} cm
              </text>
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 2: Skizze des Schwimmbeckens auf der Terrasse (nicht
                  maßstabsgetreu).
                </span>
              </Color5>
            </center>
          </>
        )
      },
      solution({ data }) {
        const r = roundToDigits(Math.pow(data.surface / Math.PI, 0.5), 2)
        return (
          <>
            <p>
              Die Kantenlänge des Quadrats ergibt sich durch den Überstand mit{' '}
              {data.terra} cm ≙ {pp(data.terra / 100)} m und dem Durchmesser des
              Pools.
            </p>
            <p>
              <strong>Durchmesser berechnen</strong>
            </p>
            <p>
              Bestimme den Durchmesser aus der kreisförmigen Grundfläche:{' '}
              {pp(data.surface)} m²
            </p>
            {buildEquation([
              ['G', '=', 'π · r²'],
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
                      Einsetzen und nach r umformen
                    </span>
                  </Color4>
                </>,
              ],
              [pp(data.surface), '=', 'π · r²', '|: π'],
              [<>{pp(data.surface)} : π</>, '=', 'r²', '| √'],
              ['r', '=', buildSqrt(pp(data.surface) + ' : π')],
              [<>r</>, <>≈</>, <>{pp(r)} [m]</>],
            ])}{' '}
            <p>
              Der Durchmesser beträgt damit:<br></br> d = 2r = {pp(2 * r)} [m]
            </p>
            <p>
              <strong>Kantenlänge bestimmen</strong>
            </p>
            <p>
              {' '}
              Die quadratische Terrasse hat damit eine Kantenlänge von{' '}
              {pp(2 * r)} + {pp(data.terra / 100)} =
              <strong> {pp(2 * r + data.terra / 100)} [m]</strong>
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      intro({ data }) {
        return (
          <>
            <p>
              Familie Sommer fährt in den Urlaub. In dieser Zeit wachsen Algen
              auf der Wasseroberfläche des Schwimmbeckens. Am Tag der Abreise
              bedecken die Algen schon ca.{' '}
              {pp(roundToDigits(data.surface / 20, 2))} m² der Wasseroberfläche
              und vermehren sich täglich um {data.growth} %. Das Wachstum der
              Algen auf der Wasseroberfläche kann mit der folgenden
              Exponentialfunktion f beschrieben werden:{' '}
            </p>
            <p>
              f(x) = {pp(roundToDigits(data.surface / 20, 2))} ·{' '}
              {pp(data.growth / 100 + 1)}
              <sup>x</sup>
            </p>
            <p>x ist die Zeit in Tagen; x = 0 ist der Tag der Abreise.</p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              d) Erläutere die Bedeutung der Werte{' '}
              {pp(roundToDigits(data.surface / 20, 2))} und{' '}
              {pp(data.growth / 100 + 1)} sowie die Bedeutung von f(x) im
              Zusammenhang mit dem Wachstum der Algen.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <ul>
              <li>
                Der Wert{' '}
                <Color1>{pp(roundToDigits(data.surface / 20, 2))} m²</Color1>{' '}
                ist die Fläche, die zum Beginn der Beobachtung (x = 0) von Algen
                besetzt wird. Er heißt auch <Color1>Anfangswert</Color1>.{' '}
              </li>
              <li>
                Der Wert <Color2>{pp(data.growth / 100 + 1)}</Color2> ist der{' '}
                <Color2>Wachstumsfaktor</Color2> der Funktion, der den täglichen
                Zuwachs von {data.growth} % Algen beschreibt.
              </li>
              <li>
                <Color3>f(x)</Color3>, also die Funktionswerte der Funktion,
                geben die von Algen besetzte{' '}
                <Color3>Fläche in Abhängigkeit der Tage</Color3> an.
              </li>
            </ul>
          </>
        )
      },
    },
    {
      points: 2,
      skillIntro({ data }) {
        return (
          <>
            <p>
              Familie Sommer fährt in den Urlaub. In dieser Zeit wachsen Algen
              auf der Wasseroberfläche ihres Schwimmbeckens. Am Tag der Abreise
              bedecken die Algen schon ca.{' '}
              {pp(roundToDigits(data.surface / 20, 2))} m² der Wasseroberfläche
              und vermehren sich täglich um {data.growth} %. Das Wachstum der
              Algen auf der Wasseroberfläche kann mit der folgenden
              Exponentialfunktion f beschrieben werden:{' '}
            </p>
            <p>
              f(x) = {pp(roundToDigits(data.surface / 20, 2))} ·{' '}
              {pp(data.growth / 100 + 1)}
              <sup>x</sup>
            </p>
            <p>x ist die Zeit in Tagen; x = 0 ist der Tag der Abreise.</p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              e) Berechne, wie viele Quadratmeter der Wasseroberfläche nach{' '}
              {data.day} Tagen bedeckt sind.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Das Wachstum der Algen wird mit der Funktion f beschrieben. Setze
              x = {data.day} ein und berechne die Fläche.
            </p>
            {buildEquation([
              [
                <>f(x)</>,
                <>=</>,
                <>
                  {pp(roundToDigits(data.surface / 20, 2))} ·{' '}
                  {pp(data.growth / 100 + 1)}
                  <sup>x</sup>
                </>,
              ],
              [
                <>f({data.day})</>,
                <>=</>,
                <>
                  {pp(roundToDigits(data.surface / 20, 2))} ·{' '}
                  {pp(data.growth / 100 + 1)}
                  <sup>{data.day}</sup>
                </>,
              ],
              [
                <>
                  <strong>f({data.day})</strong>
                </>,
                <>≈</>,
                <>
                  <strong>
                    {pp(
                      roundToDigits(
                        (data.surface / 20) *
                          Math.pow(data.growth / 100 + 1, data.day),
                        2,
                      ),
                    )}{' '}
                    [m²]
                  </strong>
                </>,
              ],
            ])}
            <p>
              Nach {data.day} Tagen sind{' '}
              <strong>
                {pp(
                  roundToDigits(
                    (data.surface / 20) *
                      Math.pow(data.growth / 100 + 1, data.day),
                    2,
                  ),
                )}{' '}
                m²
              </strong>{' '}
              der Wasseroberfläche bedeckt.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      skillIntro({ data }) {
        return (
          <>
            <p>
              Familie Sommer fährt in den Urlaub. In dieser Zeit wachsen Algen
              auf der Wasseroberfläche ihres Schwimmbeckens. Am Tag der Abreise
              bedecken die Algen schon ca.{' '}
              {pp(roundToDigits(data.surface / 20, 2))} m² der Wasseroberfläche
              und vermehren sich täglich um {data.growth} %. Das Wachstum der
              Algen auf der Wasseroberfläche kann mit der folgenden
              Exponentialfunktion f beschrieben werden:{' '}
            </p>
            <p>
              f(x) = {pp(roundToDigits(data.surface / 20, 2))} ·{' '}
              {pp(data.growth / 100 + 1)}
              <sup>x</sup>
            </p>
            <p>x ist die Zeit in Tagen; x = 0 ist der Tag der Abreise.</p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              f) Das Algenwachstum lässt sich mit der Funktionsgleichung nur für
              einen begrenzten Zeitraum darstellen. Erkläre, warum dies so ist.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Wenn die Fläche des Schwimmbeckens vollständig mit Algen bewachsen
              ist, stoppt das Wachstum. <br></br>
              <br></br>Die Funktion kann das Wachstum also nur bis zu dem
              Zeitpunkt beschreiben, bis der Funktionswert {pp(data.surface)} m²
              erreicht wird.
            </p>
          </>
        )
      },
    },
  ],
}
