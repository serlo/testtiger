import { Exercise } from '@/data/types'
import { kürzeBruch } from '@/helper/kuerze-bruch'
import {
  buildEquation,
  buildFrac,
  buildInlineFrac,
  buildOverline,
  buildSqrt,
} from '@/helper/math-builder'
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
  title: 'Herz',
  source: '2023 Teil 2 Aufgabe 1',
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
  intro({ data }) {
    return <></>
  },
  tasks: [
    {
      task({ data }) {
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
      solution({ data }) {
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
    },
    {
      task({ data }) {
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
      solution({ data }) {
        const A = Math.PI * (data.kante / 2) * (data.kante / 2)
        return (
          <>
            <p>
              Berechne die Gesamtfläche, indem du die Fläche des Quadrats und
              eines Kreises berechnest:
            </p>
            <p>
              A<sub>Quadrat</sub> = {data.kante} · {data.kante} ={' '}
              {data.kante * data.kante} cm²
            </p>
            <p>
              Die beiden Halbkreise ergeben eine Gesamtfläche eines Kreises:
            </p>
            <p>
              A<sub>Kreis</sub> = π · r² = π · {pp(data.kante / 2)}² ≈{' '}
              {pp(roundToDigits(A, 2))} cm²{' '}
            </p>
            <p>
              Damit ist die Gesamtfläche: <br></br>A<sub>ges</sub> ={' '}
              {data.kante * data.kante} + {pp(roundToDigits(A, 2))} ={' '}
              {pp(roundToDigits(data.kante * data.kante + A, 2))} cm²
            </p>
          </>
        )
      },
    },
    {
      task({ data }) {
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
      solution({ data }) {
        const A =
          data.kante * data.kante +
          Math.PI * (data.kante / 2) * (data.kante / 2)
        return (
          <>
            <p>Rechne die Fläches eines Herzes um in dm²:</p>
            <p>
              {pp(roundToDigits(A, 2))} cm² ≈ {pp(roundToDigits(A / 100, 2))}{' '}
              dm²
            </p>
            <p>1 dm² wiegt {data.dichte} g. Ein Herz wiegt damit:</p>
            <p>
              {pp(roundToDigits(A / 100, 2))} · {data.dichte} ={' '}
              {pp(roundToDigits((A / 100) * data.dichte, 2))} g
            </p>
          </>
        )
      },
    },
    {
      task({ data }) {
        return (
          <>
            <p>
              d) Um die Breite b eines Herzens zu bestimmen, wird eine Skizze
              angefertigt (Abbildung). Hier gilt: Die Strecke{' '}
              {buildOverline('AB')} entspricht der Breite b.{' '}
              {buildOverline('AB')} geht durch die Mittelpunkte M1​ und M2​ der
              angesetzten Halbkreise.
            </p>
            <svg viewBox="0 0 328 200" className="min-w-[328px]">
              <image
                href="/content/NRW_MSA_Herz_Skizze.png"
                height="200"
                width="328"
              />
            </svg>
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
      solution({ data }) {
        const m1m2 =
          (data.kante / 2) * (data.kante / 2) +
          (data.kante / 2) * (data.kante / 2)
        return (
          <>
            <p>
              Das Dreieck M<sub>1</sub>M<sub>2</sub>C ist rechtwinklig mit der
              gesuchten Strecke als Hypotenuse.
            </p>
            <p>
              Die Seitenlängen sind bereits gegeben, denn sie entsprechen dem
              Radius der Halbkreise.
            </p>

            <p>
              Mit dem Satz des Pythagoras kannst du eine fehlende Seite im
              rechtwinkligen Dreieck berechnen:
            </p>
            {buildEquation([
              ['M1M2²', '=', 'r² + r²', 'Einsetzen der Werte'],
              [
                '',
                '=',
                pp(data.kante / 2) + '² + ' + pp(data.kante / 2) + '²',
                '',
              ],
              ['', '=', pp(m1m2), ''],
            ])}
            <p>
              Berechne die Streckenlänge von M1M2, indem du die Quadratwurzel
              auf beiden Seiten anwendest:
            </p>
            <p>
              M1M2 = {buildSqrt(pp(m1m2))} ={' '}
              {pp(roundToDigits(Math.pow(m1m2, 0.5), 2))} cm
            </p>
          </>
        )
      },
    },
    {
      task({ data }) {
        return (
          <>
            <p>e) Berechne die Breite b eines Herzens.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die Breite b setzt sich aus verschiedenen Teilstrecken zusammen,
              die bekannte Streckenlängen haben.
            </p>
            {buildEquation([
              ['b', '=', 'r + M1M2 + r'],
              [
                'b',
                '=',
                pp(data.kante / 2) +
                  ' + ' +
                  pp(
                    roundToDigits(
                      Math.pow(
                        (data.kante / 2) * (data.kante / 2) +
                          (data.kante / 2) * (data.kante / 2),
                        0.5,
                      ),
                      2,
                    ),
                  ) +
                  ' + ' +
                  pp(data.kante / 2),
              ],
              [
                'b',
                '=',
                pp(
                  2 * (data.kante / 2) +
                    roundToDigits(
                      Math.pow(
                        (data.kante / 2) * (data.kante / 2) +
                          (data.kante / 2) * (data.kante / 2),
                        0.5,
                      ),
                      2,
                    ),
                ) + ' cm',
              ],
            ])}
          </>
        )
      },
    },
    {
      task({ data }) {
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
              <foreignObject x="50" y="15" width={70} height={70}>
                <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
                  {buildFrac(bruch.zähler, bruch.nenner)}
                </div>
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
      solution({ data }) {
        const bruch = kürzeBruch(data.zaehler, data.nenner)
        return (
          <>
            <p>
              Berechne die Gesamtzahl der Herzen, wenn {data.red} Herzen dem
              Anteil {buildInlineFrac(bruch.zähler, bruch.nenner)} ={' '}
              {(data.zaehler / data.nenner) * 100} % entsprechen.
            </p>
            <p>Mit dem Dreisatz lautet die Rechnung:</p>
            {buildEquation([
              [
                pp(data.red) + ' Herzen',
                '≙',
                (data.zaehler / data.nenner) * 100 + ' %',
              ],
              [
                '1 Herz',
                '≙',
                pp(data.zaehler / data.nenner / data.red) + ' %',
                '|: ' + pp(data.zaehler / data.nenner / data.red),
              ],
              [
                Math.round(1 / (data.zaehler / data.nenner / data.red)) +
                  ' Herzen',
                '≙',
                '100 %',
              ],
            ])}
          </>
        )
      },
    },
    {
      task({ data }) {
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
              <li>Berechne die gesuchte Wahrscheinlichkeit.</li>
            </ol>
          </>
        )
      },
      solution({ data }) {
        const gesamt = data.red / (data.zaehler / data.nenner)
        const bruch = kürzeBruch(data.zaehler, data.nenner)
        const bruch2 = kürzeBruch(data.nenner - data.zaehler, data.nenner)
        const bruch3 = kürzeBruch(data.red - 1, gesamt - 1)
        const bruch4 = kürzeBruch(gesamt - data.red, gesamt - 1)
        const bruch5 = kürzeBruch(data.red, gesamt - 1)
        const bruch6 = kürzeBruch(gesamt - data.red - 1, gesamt - 1)
        return (
          <>
            <p>
              (1) Berechne zuerst die Wahrscheinlichkeit, ein weißes Herz zu
              ziehen (p(w)). Beide Wahrscheinlichkeiten müssen in Summe 1
              ergeben:
            </p>
            <p>
              p(w) = 1 − {buildInlineFrac(bruch.zähler, bruch.nenner)} ={' '}
              {buildInlineFrac(bruch2.zähler, bruch2.nenner)}
            </p>
            <p>
              Beim zweiten Ziehen enthält der Karton ein Herz der gezogenen
              Farbe weniger. Das muss für die Wahrscheinlichkeiten
              berücksichtigt werden. Das Baumdiagramm ist:
            </p>
            <svg viewBox="0 0 328 220">
              <image
                href="/content/NRW_MSA-Baumdiagramm.PNG"
                height="220"
                width="328"
              />
              <foreignObject x="50" y="50" width={20} height={60}>
                <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
                  {buildFrac(bruch.zähler, bruch.nenner)}
                </div>
              </foreignObject>
              <foreignObject x="50" y="130" width={20} height={60}>
                <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
                  {buildFrac(bruch2.zähler, bruch2.nenner)}
                </div>
              </foreignObject>
              <foreignObject x="200" y="25" width={30} height={60}>
                <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
                  {buildFrac(bruch3.zähler, bruch3.nenner)}
                </div>
              </foreignObject>
              <foreignObject x="200" y="85" width={30} height={60}>
                <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
                  {buildFrac(bruch4.zähler, bruch4.nenner)}
                </div>
              </foreignObject>
              <foreignObject x="240" y="95" width={30} height={60}>
                <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
                  {buildFrac(bruch5.zähler, bruch5.nenner)}
                </div>
              </foreignObject>
              <foreignObject x="240" y="160" width={30} height={60}>
                <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
                  {buildFrac(bruch6.zähler, bruch6.nenner)}
                </div>
              </foreignObject>
            </svg>
            <p>
              (2) Für die Wahrscheinlichkeit betrachte die beiden Pfade, die zum
              Ereignis {'"'}Unterschiedliche Farben{'"'} passen.
            </p>
            <p>
              Verwende die Pfadregeln, um die Wahrscheinlichkeit zu berechnen:
            </p>
            <p>
              p(rw;wr) = {buildFrac(bruch.zähler, bruch.nenner)} ·{' '}
              {buildFrac(bruch4.zähler, bruch4.nenner)} +{' '}
              {buildFrac(bruch2.zähler, bruch2.nenner)} ·{' '}
              {buildFrac(bruch5.zähler, bruch5.nenner)}
            </p>
            <p>
              p(rw;wr) ={' '}
              {pp(
                roundToDigits(
                  ((data.red * (gesamt - data.red)) / (gesamt * (gesamt - 1))) *
                    2,
                  4,
                ),
              )}
            </p>
            <p>
              Die Wahrscheinlichkeit beträgt{' '}
              {pp(
                100 *
                  roundToDigits(
                    ((data.red * (gesamt - data.red)) /
                      (gesamt * (gesamt - 1))) *
                      2,
                    4,
                  ),
              )}{' '}
              %
            </p>
          </>
        )
      },
    },
  ],
}
