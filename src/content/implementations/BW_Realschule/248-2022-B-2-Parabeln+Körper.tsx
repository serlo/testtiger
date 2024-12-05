import { Exercise } from '@/data/types'

interface DATA {}

export const exercise248: Exercise<DATA> = {
  title: 'Parabeln + Körper',
  source: '2022 Wahlteil B - Aufgabe 2',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {}
  },
  originalData: {},
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return null
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Das Schaubild zeigt Ausschnitte der verschobenen Normalparabel p
              <sub>1</sub> und der nach unten geöffneten Parabel p<sub>2</sub>.
            </p>
            <svg viewBox="0 0 328 220">
              <image
                href="/content/BW_Realschule/227_KS.png"
                height="220"
                width="328"
              />

              <text
                x={315}
                y={160}
                fontSize={15}
                textAnchor="left"
                stroke="black"
              >
                x
              </text>
              <text
                x={105}
                y={20}
                fontSize={15}
                textAnchor="left"
                stroke="black"
              >
                y
              </text>
            </svg>
            <ul>
              <li>
                Bestimme die Funktionsgleichungen der beiden Parabeln. Entnimm
                dazu geeignete Werte aus dem Schaubild.
              </li>
            </ul>
            <p>
              Die Gerade g verläuft durch die beiden Scheitelpunkte S
              <sub>1</sub> und S<sub>2</sub>
            </p>
            <ul>
              <li>Berechne die Funktionsgleichung von g.</li>
            </ul>
            <p>
              Die Gerade h verläuft senkrecht zu g und geht durch den Punkt
              R(4|5).
            </p>
            <ul>
              <li>Berechne die Funktionsgleichung von h.</li>
            </ul>
            <ul>
              <li>
                Gib die Funktionsgleichung einer weiteren verschobenen nach oben
                geöffneten Normalparabel p<sub>3</sub> an, die keine Punkte mit
                p<sub>1</sub> und p<sub>2</sub> gemeinsam hat.
              </li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Ein zusammengesetzter Körper besteht aus einem regelmäßigen
              Fünfecksprisma mit aufgesetzter regelmäßiger fünfseitiger
              Pyramide.
            </p>
            <svg viewBox="0 0 328 220">
              <image
                href="/content/BW_Realschule/248_Körper.jpg"
                height="220"
                width="328"
              />
            </svg>
            <p>Es gilt:</p>
            <p>
              s = 12,6 cm<br></br>ε = 33,0° <br></br>h<sub>2</sub> = 5,6 cm
              (Höhe Prisma)
            </p>
            <p>Berechne den Oberflächeninhalt des zusammengesetzten Körpers.</p>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
