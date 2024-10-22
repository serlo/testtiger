import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  d1: number
  guess: number
}

export const exercise30: Exercise<DATA> = {
  title: 'Muster',
  source: '2021 Teil 2 Aufgabe 3',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    return {
      d1: rng.randomIntBetween(2, 6),
      guess: rng.randomIntBetween(20, 30) * 10,
    }
  },
  constraint({ data }) {
    const surface = data.d1 * data.d1 * 0.5
    return (data.guess / surface) % 1 != 0
  },
  intro({ data }) {
    return (
      <>
        <p>
          Jan möchte ein Muster aus rechtwinkligen gleichschenkligen Dreiecken
          konstruieren. Er beginnt mit dem Dreieck D<sub>1</sub>​ (Abbildung 1).
        </p>
        <svg viewBox="0 0 328 240">
          <image href="/content/NRW_MSA_Muster.PNG" height="240" width="328" />
          <text
            x={70}
            y={140}
            fontSize={20}
            textAnchor="right"
            stroke="black"
            transform="rotate(-90, 70, 140)"
          >
            {data.d1} cm
          </text>
        </svg>
        <p>
          Abbildung 1: Dreieck D<sub>1</sub>​
        </p>
      </>
    )
  },
  tasks: [
    {
      points: 3,
      task({ data }) {
        const hypo = roundToDigits(Math.sqrt(data.d1 * data.d1 * 2), 2)
        return (
          <>
            <p>
              a) Zeige mit einer Rechnung, dass die Länge der Hypotenuse von
              Dreieck D<sub>1</sub>​ ca. {pp(hypo)} cm beträgt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const hypo = roundToDigits(Math.sqrt(data.d1 * data.d1 * 2), 2)
        return (
          <>
            <p>
              Verwende den Satz des Pythagoras und berechne die Länge der
              Hypotenuse c:
            </p>
            {buildEquation([
              ['a² + b²', '=', 'c²'],
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
                    <span style={{ fontSize: 'small' }}>Einsetzen</span>
                  </Color4>
                </>,
              ],
              [data.d1 + '² + ' + data.d1 + '²', '=', 'c²'],
              [data.d1 * 2 * data.d1, '=', 'c²', '| √'],
              [
                'c',
                '≈',
                <>
                  <strong>{pp(hypo)} [cm]</strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 4,
      task({ data }) {
        return (
          <>
            <p>
              b) Jan setzt das Muster mit den beiden weiteren Dreiecken D
              <sub>2</sub>​ und D<sub>3</sub>​ fort (Abbildung 2). Ergänze das
              Dreieck D<sub>4</sub> zeichnerisch in Abbildung 2. Beschreibe, wie
              du vorgegangen bist.
            </p>
            <svg viewBox="0 0 328 240">
              <image
                href="/content/NRW_MSA_Muster_2.jpg"
                height="240"
                width="328"
              />
            </svg>
            <p>
              Abbildung 2: Muster bis Dreieck D<sub>3</sub>​ zu Teilaufgabe b) -
              d)
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die Hypotenuse von D<sub>3</sub>​ wird eine der beiden Katheten
              von D<sub>4</sub>​.
            </p>
            <svg viewBox="0 0 328 160">
              <image
                href="/content/NRW_MSA_Muster_Konst1.png"
                height="160"
                width="328"
              />
            </svg>
            <p>
              Trage am äußeren Punkt von D<sub>3</sub> ​einen rechten Winkel an.
              Hier entsteht die zweite Kathete von D<sub>4</sub>​.
            </p>
            <svg viewBox="0 0 328 160">
              <image
                href="/content/NRW_MSA_Muster_Konst2.png"
                height="160"
                width="328"
              />
            </svg>
            <p>
              Miss die Länge der Hypotenuse von D<sub>3</sub>​​.
            </p>
            <svg viewBox="0 0 328 160">
              <image
                href="/content/NRW_MSA_Muster_Konst3.png"
                height="160"
                width="328"
              />
            </svg>
            <p>
              Zeichne die zweite Kathete von D<sub>4</sub>​ mit der gemessenen
              Länge ein.
            </p>
            <svg viewBox="0 0 328 160">
              <image
                href="/content/NRW_MSA_Muster_Konst4.png"
                height="160"
                width="328"
              />
            </svg>
            <p>
              Verbinde die beiden Katheten von D<sub>4</sub>​ zur Hypotenuse.
            </p>
            <svg viewBox="0 0 328 160">
              <image
                href="/content/NRW_MSA_Muster_Konst5.png"
                height="160"
                width="328"
              />
            </svg>
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
              c) Jan kann nur acht Dreiecke zeichnen, ohne dass die Dreiecke
              sich überschneiden. Begründe dies mithilfe der Winkel.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <svg viewBox="0 0 328 200">
              <image
                href="/content/NRW_MSA_Muster_Skizze.png"
                height="200"
                width="328"
              />
            </svg>
            <p>
              Die Dreiecke sind gleichschenklig und rechtwinklig. Das bedeutet
              die spitzen Winkel betragen 45°. <br></br>
              <br></br>Ein Vollkreis hat 360°. <br></br>
              Die Anzahl der Dreiecke ist dann {buildInlineFrac(
                360,
                45,
              )} ​= <strong>8</strong>, bis der Vollkreis ausgefüllt ist.
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
              d) Zeige rechnerisch, dass der Flächeninhalt von Dreieck D
              <sub>2</sub>​ doppelt so groß ist wie der Flächeninhalt von
              Dreieck D<sub>1</sub>​.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Skizze der rechtwinkligen Dreiecke D<sub>1</sub> und D<sub>2</sub>
              :
            </p>
            <svg viewBox="0 0 328 220">
              <image
                href="/content/NRW_MSA_Muster_Skizze3.PNG"
                height="220"
                width="328"
              />
            </svg>
            <p>
              Hierbei ist a die Länge der Katheten von D<sub>1</sub>. Allgemein
              lässt sich die Länge der Hypotenuse c von D<sub>1</sub> mit dem
              Satz des Pythagoras bestimmen:
            </p>
            {buildEquation([
              ['c²', '=', 'a² + a²'],

              ['c²', '=', '2a²', '| √'],
              ['c', '=', buildSqrt('2a²')],
              ['c', '= a', buildSqrt('2')],
            ])}
            <p>
              Die Fläche von D<sub>2</sub> ergibt sich mit diesen Längen zu:
            </p>
            <p>
              A<sub>2</sub> = {buildInlineFrac(1, 2)} · a{buildSqrt('2')} · a
              {buildSqrt('2')}
            </p>
            <p>
              A<sub>2</sub> = a²
            </p>
            <p>
              Der Flächeninhalt von D<sub>1</sub> beträgt A<sub>1</sub> ={' '}
              {buildInlineFrac(1, 2)}a², weshalb der Flächeninhalt von D
              <sub>2</sub> tatsächlich doppelt so groß ist.{' '}
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        const surface = data.d1 * data.d1 * 0.5
        return (
          <>
            <p>
              e) Jan berechnet weitere Flächeninhalte der Dreiecke in seinem
              Muster (Abbildung 3) und hält die Ergebnisse in einer Tabelle
              fest.{' '}
            </p>
            <svg viewBox="0 0 328 270">
              <image
                href="/content/NRW_MSA_Muster_3.PNG"
                height="270"
                width="328"
              />
              <text
                x={121}
                y={41}
                fontSize={14}
                textAnchor="right"
                stroke="black"
              >
                {pp(surface)}
              </text>
              <text
                x={161}
                y={41}
                fontSize={14}
                textAnchor="right"
                stroke="black"
              >
                {pp(surface * 2)}
              </text>
              <text
                x={195}
                y={41}
                fontSize={14}
                textAnchor="right"
                stroke="black"
              >
                {pp(surface * 4)}
              </text>
              <text
                x={225}
                y={41}
                fontSize={14}
                textAnchor="right"
                stroke="black"
              >
                {pp(surface * 8)}
              </text>
              <text
                x={257}
                y={41}
                fontSize={14}
                textAnchor="right"
                stroke="black"
              >
                {pp(surface * 16)}
              </text>
            </svg>
            <p>
              Abbildung 3: Muster bis Dreieck D<sub>5</sub>​ verkleinert
              dargestellt
            </p>
            <p>
              Begründe, dass kein Dreieck in dem Muster einen Flächeninhalt von
              genau {data.guess} cm² hat.
            </p>
          </>
        )
      },
      solution({ data }) {
        const surface = data.d1 * data.d1 * 0.5
        return (
          <>
            <p>
              Die Flächeninhalte der Dreiecke in dem Muster sind ein Vielfaches
              von {pp(surface)}.
            </p>
            <p>
              {data.guess} ist nicht ohne Rest durch {pp(surface)} teilbar,
              sodass es niemals als Vielfaches in der Tabelle auftauchen kann:
            </p>
            <p>
              {data.guess} : {pp(surface)} ={' '}
              {pp(roundToDigits(data.guess / surface, 2))}
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
              f) Jan möchte das Muster aus Papier herstellen. Dazu schneidet er
              die einzelnen Dreiecke aus DIN-A4-Blättern ( 21 cm × 29,7 cm) aus.
            </p>
            <p>
              Jan behauptet: „Auch das Dreieck D<sub>8</sub>​ kann ich aus einem
              einzigen DIN-A4-Blatt ausschneiden.“
            </p>
            <p>Entscheide begründet, ob Jans Behauptung zutrifft.</p>
          </>
        )
      },
      solution({ data }) {
        const surface = data.d1 * data.d1 * 0.5
        const werte = roundToDigits(surface * Math.pow(2, 7), 2)
        return (
          <>
            <p>Ein DIN-A4-Blatt hat die Seitenlängen 29,7 cm und 21 cm.</p>
            <p>
              Das Dreieck D<sub>8</sub> hat eine Fläche von: <br></br>A
              <sub>8</sub> = {pp(surface)} cm² · 2<sup>7</sup> = {pp(werte)} cm²
            </p>
            <p>
              Aus dieser Fläche lässt sich die Länge einer Kathete berechnen.
              Verwende die Formel für die Dreiecksfläche und forme um:
            </p>
            {buildEquation([
              ['A', '=', buildInlineFrac('a²', 2), '| ·2'],
              ['2 · A', '=', 'a²', '| √'],
              [buildSqrt('2 · A'), '=', 'a'],
              ['a', '=', buildSqrt('2 · ' + werte)],
              [
                'a',
                '=',
                <>{pp(roundToDigits(Math.sqrt(2 * werte), 2))} [cm]</>,
              ],
            ])}
            <p>
              Die Katheten sind {pp(roundToDigits(Math.sqrt(2 * werte), 2))} cm
              lang und damit länger als die längste Seite des Papiers. Das
              Dreieck passt nicht auf das A4-Blatt und Jans Behauptung trifft
              nicht zu.{' '}
            </p>
          </>
        )
      },
    },
  ],
}
