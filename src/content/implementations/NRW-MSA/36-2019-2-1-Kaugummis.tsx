import { Exercise } from '@/data/types'
import { buildInlineFrac, buildSqrt } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import Fraction from 'fraction.js'

interface DATA {
  dia: number
  weight: number
  length: number
  height: number
  red: number
  white: number
}

export const exercise36: Exercise<DATA> = {
  title: '2019 Prüfungsteil 2 /1) Kaugummis',
  useCalculator: true,
  duration: 10,
  generator(rng) {
    return {
      dia: rng.randomIntBetween(10, 16),
      weight: rng.randomIntBetween(70, 130) / 100,
      length: rng.randomIntBetween(12, 19) + 0.5,
      height: rng.randomIntBetween(35, 45) + 0.5,
      red: rng.randomItemFromArray([2, 4, 6, 8]),
      white: rng.randomItemFromArray([18, 16, 14, 12]),
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
            Steffi hat zum Geburtstag einen Kaugummiautomten und eine Tüte mit
            Kaugummikugeln bekommen.
          </p>
        </>
      )
    },
    tasks: [
      ({ data }) => {
        return (
          <>
            <p>
              <br></br>
              a) Eine Kaugummikugel hat einen Durchmesser von {data.dia} mm.
            </p>

            <p>
              Bestätige durch eine Rechnung, dass das Volumen einer
              Kaugummikugel ca.{' '}
              {pp(
                Math.round(
                  (((4 / 3) * Math.pow(data.dia / 2, 3) * Math.PI) / 1000) *
                    100,
                ) / 100,
              )}{' '}
              cm³ beträgt.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>b) 1 cm³ Kaugummimasse wiegt {pp(data.weight)} g.</p>
            <p>
              Berechne, wie viel Kaugummikugeln in einer 300-Gramm-Packung sind.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              c) Der Behälter für die Kaugummikugeln ist {pp(data.length)} cm
              breit, {pp(data.length)} cm tief und {pp(data.height)} cm hoch.
              Steffi möchte wissen, wie viele Kaugummikugeln in den Behälter
              passen und rechnet ({pp(data.length)} · {pp(data.length)} ·{' '}
              {pp(data.height)}) :{' '}
              {pp(
                Math.round(
                  (((4 / 3) * Math.pow(data.dia / 2, 3) * Math.PI) / 1000) *
                    100,
                ) / 100,
              )}{' '}
              ≈{' '}
              {pp(
                Math.round(
                  ((data.length * data.length * data.height) /
                    (((4 / 3) * Math.pow(data.dia / 2, 3) * Math.PI) / 1000)) *
                    100,
                ) / 100,
              )}
            </p>
            <p>
              Erkläre Steffis Rechnung und beurteile, ob Steffis Rechnung
              geeignet ist, die Anzahl der Kaugummikugeln in der Realität zu
              berechnen.
            </p>
          </>
        )
      },
      ({ data }) => {
        function convertToFractionArray(value: number): [number, number] {
          if (value % 1 !== 0) {
            // Wenn der Wert eine Dezimalzahl ist
            const fraction = new Fraction(value)
            return [fraction.n, fraction.d] // Gibt den Zähler und Nenner als Array zurück
          }
          return [value, 1] // Falls keine Dezimalzahl, als Bruch x/1 darstellen
        }
        function convertToFractionString(value: number): JSX.Element | number {
          if (value % 1 !== 0) {
            const [zaehler, nenner] = convertToFractionArray(value)
            return buildInlineFrac(zaehler, nenner)
          }
          return value
        }
        return (
          <>
            <p>
              Steffi füllt eine Mischung aus {data.red} roten und {data.white}{' '}
              weißen Kaugummikugeln in den Automaten. Durch Drehen am Automaten
              enthält man zufällig eine rote oder eine weiße Kaugummikugel.
            </p>
            <p>
              d) Begründe, dass die Wahrscheinlichkeit, beim ersten Drehen eine
              rote Kaugummikugel zu erhalten,{' '}
              {convertToFractionString(data.red / (data.red + data.white))}{' '}
              beträgt.
            </p>
          </>
        )
      },
      ({ data }) => {
        function convertToFractionArray(value: number): [number, number] {
          if (value % 1 !== 0) {
            // Wenn der Wert eine Dezimalzahl ist
            const fraction = new Fraction(value)
            return [fraction.n, fraction.d] // Gibt den Zähler und Nenner als Array zurück
          }
          return [value, 1] // Falls keine Dezimalzahl, als Bruch x/1 darstellen
        }
        function convertToFractionString(value: number): JSX.Element | number {
          if (value % 1 !== 0) {
            const [zaehler, nenner] = convertToFractionArray(value)
            return buildInlineFrac(zaehler, nenner)
          }
          return value
        }
        return (
          <>
            <p>
              e) Das Baumdiagramm (Abbildung 2) zeigt die Wahrscheinlichkeiten,
              beim ersten und zweiten Drehen eine rote oder weiße Kaugummikugel
              zu erhalten.
            </p>
            <svg viewBox="0 0 700 500">
              <image
                href="/content/NRW_MSA_Kaugummi_Baumdiagramm.PNG"
                height="500"
                width="700"
              />
              <text
                x={150}
                y={200}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              ></text>
            </svg>
            <p> Ergänze die fehlenden Einträge im Baumdiagramm.</p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              f) Steffis Bruder behauptet: {'"'}Die Wahrscheinlichkeit, zwei
              verschiedenfarbige Kaugummikugeln zu erhalten, ist kleiner als 50
              %.{'"'}
            </p>
            <p>Hat er recht? Überprüfe mit einer Rechnung.</p>
          </>
        )
      },
    ],
    solutions: [
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
