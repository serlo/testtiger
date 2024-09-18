import { Exercise } from '@/data/types'
import { buildFrac, buildOverline } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  kante: number
  dichte: number
  zaehler: number
  nenner: number
  red: number
}

export const exercise7: Exercise<DATA> = {
  title: '2023 Prüfungsteil 2 /1) Herz',
  useCalculator: false,
  duration: 10,
  generator(rng) {
    return {
      kante: rng.randomIntBetween(4, 10),
      dichte: rng.randomIntBetween(101, 140),
      zaehler: rng.randomIntBetween(2, 5),
      nenner: rng.randomIntBetween(4, 5),
      red: rng.randomIntBetween(12, 22),
    }
  },
  constraint({ data }) {
    return (
      data.zaehler != data.nenner &&
      data.zaehler < data.nenner &&
      (data.red / (data.zaehler / data.nenner)) % 1 == 0
    )
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
  subtasks: {
    intro: ({ data }) => {
      return <></>
    },
    tasks: [
      ({ data }) => {
        return (
          <>
            <p>
              Eine Firma produziert herzförmige Dekoanhänger aus Metall. Jedes
              Herz besteht aus einem Quadrat mit der Kantenlänge {data.kante}{' '}
              cm, an das zwei Halbkreise mit einem Radius von jeweils{' '}
              {pp(data.kante / 2)} cm angesetzt sind (Abbildung).
            </p>
            <svg viewBox="0 0 700 500" className="min-w-[328px]">
              <image
                href="/content/NRW_MSA-23-2-1.PNG"
                height="500"
                width="700"
              />
              <text
                x={160}
                y={370}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {data.kante} cm
              </text>
              <text
                x={380}
                y={230}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {pp(data.kante / 2)} cm
              </text>
            </svg>
            <p>a) Zeichne ein Herz in Originalgröße in dein Heft.</p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              b) Bestätige rechnerisch, dass ein Herz einen Flächeninhalt von
              ca.{' '}
              {pp(
                roundToDigits(
                  data.kante * data.kante +
                    Math.PI * (data.kante / 2) * (data.kante / 2),
                  2,
                ),
              )}{' '}
              cm² hat.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              c) Die Herzen werden aus dünnen Metallblechen hergestellt. 1 dm²
              des Metallblechs wiegt {data.dichte} g.
            </p>
            <p>Berechne das Gewicht eines Herzens.</p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              d) Um die Breite b eines Herzens zu bestimmen, wird eine Skizze
              angefertigt (Abbildung). Hier gilt: Die Strecke{' '}
              {buildOverline('AB')} entspricht der Breite b.{' '}
              {buildOverline('AB')} geht durch die Mittelpunkte M1​ und M2​ der
              angesetzten Halbkreise.
            </p>
            <p>
              Zeige durch eine Rechnung, dass die Strecke{' '}
              {buildOverline('M1M2')}
              ​​ eine Länge von etwa{' '}
              {pp(
                roundToDigits(
                  Math.sqrt((data.kante / 2) * (data.kante / 2) * 2),
                  2,
                ),
              )}{' '}
              cm hat.{' '}
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>e) Berechne die Breite b eines Herzens.</p>
          </>
        )
      },

      ({ data }) => {
        function gcd(a: number, b: number): number {
          return b === 0 ? a : gcd(b, a % b)
        }
        function kürzeBruch(
          zähler: number,
          nenner: number,
        ): { zähler: number; nenner: number } {
          const teiler = gcd(zähler, nenner)
          return {
            zähler: zähler / teiler,
            nenner: nenner / teiler,
          }
        }
        const bruch = kürzeBruch(data.zaehler, data.nenner)
        return (
          <>
            <p>
              f) Die Herzen werden in den Farben rot und weiß produziert und
              farblich gemischt in Kartons verpackt. Beim Fabrikverkauf werden
              die Herzen angeboten. Die Kunden dürfen ohne hinzusehen
              nacheinander zwei Herzen aus dem Karton ziehen. Zu diesem
              Zufallsversuch gehört das folgende Baumdiagramm.
            </p>
            <svg viewBox="0 0 328 150">
              <image
                href="/content/NRW_MSA-Baumdiagramm.PNG"
                height="150"
                width="328"
              />
              <foreignObject x="50" y="-10" width={70} height={70}>
                {buildFrac(bruch.zähler, bruch.nenner)}
              </foreignObject>
            </svg>
            <p>
              In einem Karton sind {data.red} Herzen rot, die restlichen Herzen
              sind weiß. Begründe, dass sich in dem Karton insgesamt{' '}
              {data.red / (data.zaehler / data.nenner)} Herzen befinden.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              g) Gesucht ist die Wahrscheinlichkeit, dass zwei
              verschiedenfarbige Herzen gezogen werden.
            </p>
            <ol>
              <li>
                Ergänze im Baumdiagramm die dafür notwendigen
                Wahrscheinlichkeiten.
              </li>
              <li>
                Ergänze im Baumdiagramm die dafür notwendigen
                Wahrscheinlichkeiten.
              </li>
            </ol>
          </>
        )
      },
    ],
    solutions: [
      ({ data }) => {
        return (
          <>
            <p>
              {' '}
              zeichne ein Quadrat mit der Seitenlänge {data.kante} cm. Achte
              darauf, dass der Winkel, in dem das Quadrat zur Horizontalen
              steht, 45° beträgt.
              <svg viewBox="0 0 328 200" className="min-w-[328px]">
                <image
                  href="/content/NRW_MSA_Herz_Kon.PNG"
                  height="200"
                  width="328"
                />
                <text
                  x={220}
                  y={50}
                  fontSize={20}
                  textAnchor="right"
                  stroke="black"
                >
                  {data.kante} cm
                </text>
                <text
                  x={380}
                  y={230}
                  fontSize={30}
                  textAnchor="right"
                  stroke="black"
                >
                  {pp(data.kante / 2)} cm
                </text>
              </svg>
            </p>
            <p>
              Bestimme die Mittelpunkte der oberen Kanten. Stich mit dem Zirkel
              ein und zeichne jeweils einen Halbkreise mit dem Radius{' '}
              {pp(data.kante / 2)} cm.
            </p>
            <svg viewBox="0 0 328 200" className="min-w-[328px]">
              <image
                href="/content/NRW_MSA_Herz_Kon2.png"
                height="200"
                width="328"
              />
              <text
                x={225}
                y={90}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {data.kante / 2} cm
              </text>
              <text
                x={380}
                y={230}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {pp(data.kante / 2)} cm
              </text>
            </svg>
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
