import { Exercise } from '@/data/types'
import { buildFrac, buildOverline } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  kante: number
  dichte: number
  zaehler: number
  nenner: number
}

export const exercise207: Exercise<DATA> = {
  title: '2023 Prüfungsteil 2 /1) Herz',
  useCalculator: false,
  duration: -10,
  generator(rng) {
    return {
      kante: rng.randomIntBetween(4, 10),
      dichte: rng.randomIntBetween(101, 140),
      zaehler: rng.randomIntBetween(2, 5),
      nenner: rng.randomIntBetween(4, 5),
    }
  },
  constraint({ data }) {
    return data.zaehler != data.nenner
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
  subtasks: {
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
            <svg viewBox="0 0 700 500" className="h-[250px]">
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
              {data.kante * data.kante +
                Math.PI * (data.kante / 2) * (data.kante / 2)}{' '}
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
        const Strecke = 'M' + <sub>1</sub> + 'M' + <sub>2</sub>
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
              ge durch eine Rechnung, dass die Strecke {buildOverline(Strecke)}
              ​​ eine Länge von etwa{' '}
              {Math.sqrt((data.kante / 2) * (data.kante / 2) * 2)} cm hat.{' '}
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
        return (
          <>
            <p>
              f) Die Herzen werden in den Farben rot und weiß produziert und
              farblich gemischt in Kartons verpackt. Beim Fabrikverkauf werden
              die Herzen angeboten. Die Kunden dürfen ohne hinzusehen
              nacheinander zwei Herzen aus dem Karton ziehen. Zu diesem
              Zufallsversuch gehört das folgende Baumdiagramm.
            </p>
            <svg viewBox="0 0 700 500" className="h-[250px]">
              <image
                href="/content/NRW_MSA-Baumdiagramm.PNG"
                height="500"
                width="700"
              />
              <text
                x={200}
                y={140}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {buildFrac(data.zaehler, data.nenner)}
              </text>
            </svg>
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
            <p></p>
          </>
        )
      },
    ],
  },
}