import { Exercise } from '@/data/types'
import { Color4, Color5 } from '@/helper/colors'
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
  originalData: {
    kante: 6,
    dichte: 117,
    zaehler: 3,
    nenner: 4,
    red: 15,
  },
  constraint({ data }) {
    return (
      data.zaehler != data.nenner &&
      data.zaehler < data.nenner &&
      (data.red / (data.zaehler / data.nenner)) % 1 == 0
    )
  },
  intro({ data }) {
    return (
      <>
        <p>
          Eine Firma produziert herzförmige Dekoanhänger aus Metall. Jedes Herz
          besteht aus einem Quadrat mit der Kantenlänge {data.kante} cm, an das
          zwei Halbkreise mit einem Radius von jeweils {pp(data.kante / 2)} cm
          angesetzt sind (Abbildung 1).
        </p>
        <svg viewBox="0 0 700 500" className="min-w-[328px]">
          <image href="/content/NRW_MSA-23-2-1.PNG" height="500" width="700" />
          <text x={160} y={370} fontSize={30} textAnchor="right" stroke="black">
            {data.kante} cm
          </text>
          <text x={380} y={230} fontSize={30} textAnchor="right" stroke="black">
            {pp(data.kante / 2)} cm
          </text>
        </svg>
        <center>
          <Color5>
            <span style={{ fontSize: 'small' }}>
              Abbildung 1: Zeichnung des Herzes
            </span>
          </Color5>
        </center>
      </>
    )
  },
  tasks: [
    {
      points: 3,
      task({ data }) {
        return (
          <>
            <p>a) Zeichne ein Herz in Originalgröße in dein Heft.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Zeichne ein Quadrat mit der Seitenlänge <br></br>
              {data.kante} cm. Achte darauf, dass der Winkel, in dem das Quadrat
              zur Horizontalen steht, 45° beträgt.
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
              ein und zeichne jeweils einen Halbkreis mit dem Radius{' '}
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
      points: 3,
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
              {data.kante * data.kante} [cm²]
            </p>
            <p>
              Die beiden Halbkreise ergeben eine Gesamtfläche eines Kreises:
            </p>
            <p>
              A<sub>Kreis</sub> = π · r² = π · {pp(data.kante / 2)}² ≈{' '}
              {pp(roundToDigits(A, 2))} [cm²]{' '}
            </p>
            <p>
              Damit ist die Gesamtfläche: <br></br>A<sub>ges</sub> ={' '}
              {data.kante * data.kante} + {pp(roundToDigits(A, 2))} ={' '}
              <strong>
                {pp(roundToDigits(data.kante * data.kante + A, 2))} [cm²]
              </strong>
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      skillIntro({ data }) {
        const A = Math.PI * (data.kante / 2) * (data.kante / 2)
        return (
          <>
            <p>
              Eine Firma produziert herzförmige Dekoanhänger aus Metall. Ein
              Herz hat eine Gesamtfläche von{' '}
              {pp(roundToDigits(data.kante * data.kante + A, 2))} [cm²].
            </p>
          </>
        )
      },
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
            <p>Rechne zuerst die Fläche eines Herzens in dm² um:</p>
            <p>
              {pp(roundToDigits(A, 2))} cm² ≈ {pp(roundToDigits(A / 100, 2))}{' '}
              dm²
            </p>
            <p>1 dm² des Metallsblechs wiegt {data.dichte} g:</p>
            {buildEquation([
              [<>1 dm³</>, '≙', <>{data.dichte} g</>],
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
                      · {pp(roundToDigits(A / 100, 2))} (Fläche von 1 Herz)
                    </span>
                  </Color4>
                </>,
              ],
              [
                <>{pp(roundToDigits(A / 100, 2))} dm³</>,
                '≙',
                <>{pp(roundToDigits((data.dichte * A) / 100, 2))} g</>,
              ],
            ])}
            <p>
              Ein Herz wiegt damit{' '}
              <b>{pp(roundToDigits((A / 100) * data.dichte, 2))} g</b>.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      skillIntro({ data }) {
        return (
          <>
            <p>
              Eine Firma produziert herzförmige Dekoanhänger aus Metall. Jedes
              Herz besteht aus einem Quadrat mit der Kantenlänge {data.kante}{' '}
              cm, an das zwei Halbkreise mit einem Radius von jeweils{' '}
              {pp(data.kante / 2)} cm angesetzt sind.
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              d) Um die Breite b eines Herzens zu bestimmen, wird eine Skizze
              angefertigt (Abbildung 2). Hier gilt: Die Strecke{' '}
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
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 2: Skizze der Breite b
                </span>
              </Color5>
            </center>
            <p>
              Zeige durch eine Rechnung, dass die Strecke{' '}
              {buildOverline('M1M2')} ​​eine Länge von etwa <br></br>
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
              Radius r der Halbkreise.
            </p>

            <p>
              Mit dem Satz des Pythagoras kannst du die Länge der Hypotenuse
              berechnen:
            </p>

            {buildEquation([
              [<>{buildOverline(<>M1M2</>)}²</>, '=', <>r² + r²</>],
              [
                '',
                '=',
                pp(data.kante / 2) + '² + ' + pp(data.kante / 2) + '²',
                '',
              ],
              ['', '=', pp(m1m2), '| √'],
              [
                <>{buildOverline('M1M2')}</>,
                '≈',
                <>{pp(roundToDigits(Math.pow(m1m2, 0.5), 2))} [cm]</>,
              ],
            ])}

            <p>
              Die Strecke {buildOverline('M1M2')} ist{' '}
              <strong>{pp(roundToDigits(Math.pow(m1m2, 0.5), 2))} cm</strong>{' '}
              lang.
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
              Eine Firma produziert herzförmige Dekoanhänger aus Metall. Jedes
              Herz besteht aus einem Quadrat mit der Kantenlänge {data.kante}{' '}
              cm, an das zwei Halbkreise mit einem Radius von jeweils{' '}
              {pp(data.kante / 2)} cm angesetzt sind.
            </p>
            <p>
              Um die Breite b eines Herzens zu bestimmen, wird eine Skizze
              angefertigt (Abbildung 2). Hier gilt: Die Strecke{' '}
              {buildOverline('AB')} entspricht der Breite b.{' '}
              {buildOverline('AB')} geht durch die Mittelpunkte M1 und M2 der
              angesetzten Halbkreise.
            </p>
            <svg viewBox="0 0 328 200" className="min-w-[328px]">
              <image
                href="/content/NRW_MSA_Herz_Skizze.png"
                height="200"
                width="328"
              />
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 2: Skizze der Breite b
                </span>
              </Color5>
            </center>
            <p>
              Die Strecke {buildOverline('M1M2')} hat eine Länge von etwa{' '}
              <br></br>
              {pp(
                roundToDigits(
                  Math.sqrt((data.kante / 2) * (data.kante / 2) * 2),
                  2,
                ),
              )}{' '}
              cm.{' '}
            </p>
          </>
        )
      },
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
              die bekannte Streckenlängen haben. r ist hierbei der Radius der
              Halbkreise.
            </p>

            {buildEquation([
              [<>b</>, '=', <>r + {buildOverline('M1M2')} + r</>],
              [
                '',
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
                '',
                '=',
                <>
                  {pp(
                    2 * (data.kante / 2) +
                      roundToDigits(
                        Math.pow(
                          (data.kante / 2) * (data.kante / 2) +
                            (data.kante / 2) * (data.kante / 2),
                          0.5,
                        ),
                        2,
                      ),
                  )}{' '}
                  [cm]
                </>,
              ],
            ])}
            <p>
              Die Breite des Herzes beträgt{' '}
              <strong>
                {pp(
                  2 * (data.kante / 2) +
                    roundToDigits(
                      Math.pow(
                        (data.kante / 2) * (data.kante / 2) +
                          (data.kante / 2) * (data.kante / 2),
                        0.5,
                      ),
                      2,
                    ),
                )}{' '}
                cm
              </strong>
              .
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
            <p>Eine Firma produziert herzförmige Dekoanhänger aus Metall.</p>
          </>
        )
      },
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
              <rect
                x="45"
                y="30"
                width="24"
                height="35"
                rx="4"
                ry="4"
                fill="#F9B9BA"
              />
              <foreignObject x="50" y="30" width={70} height={70}>
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
                '|: ' + (data.zaehler / data.nenner) * 100,
              ],
              [
                pp(data.red / ((data.zaehler / data.nenner) * 100)) + ' Herz',
                '≙',
                '1 %',
                '|· 100',
              ],
              [
                <>
                  <strong>
                    {Math.round(1 / (data.zaehler / data.nenner / data.red))}{' '}
                    Herzen
                  </strong>
                </>,
                <>
                  <strong>≙</strong>
                </>,
                <>
                  <strong>100 %</strong>
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
            <ol>
              <li>
                <p>
                  Berechne zuerst die Wahrscheinlichkeit, beim ersten Zug ein
                  weißes Herz zu ziehen (p(w)). Die Wahrscheinlichkeiten für den
                  ersten Zug müssen in Summe 1 ergeben:
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
                  <rect
                    x="65"
                    y="65"
                    width="24"
                    height="35"
                    rx="4"
                    ry="4"
                    fill="#F9B9BA"
                  />
                  <foreignObject x="70" y="65" width={20} height={60}>
                    <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
                      {buildFrac(bruch.zähler, bruch.nenner)}
                    </div>
                  </foreignObject>
                  <rect
                    x="65"
                    y="110"
                    width="24"
                    height="35"
                    rx="4"
                    ry="4"
                    fill="#F3FBFF"
                  />
                  <foreignObject x="70" y="110" width={20} height={60}>
                    <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
                      {buildFrac(bruch2.zähler, bruch2.nenner)}
                    </div>
                  </foreignObject>
                  <rect
                    x="197.5"
                    y="35.5"
                    width="24"
                    height="35"
                    rx="4"
                    ry="4"
                    fill="#F9B9BA"
                  />
                  <foreignObject x="200" y="35" width={30} height={60}>
                    <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
                      {buildFrac(bruch3.zähler, bruch3.nenner)}
                    </div>
                  </foreignObject>
                  <rect
                    x="197.5"
                    y="75.5"
                    width="24"
                    height="35"
                    rx="4"
                    ry="4"
                    fill="#F3FBFF"
                  />
                  <foreignObject x="200" y="75" width={30} height={60}>
                    <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
                      {buildFrac(bruch4.zähler, bruch4.nenner)}
                    </div>
                  </foreignObject>
                  <rect
                    x="237"
                    y="105"
                    width="24"
                    height="35"
                    rx="4"
                    ry="4"
                    fill="#F9B9BA"
                  />
                  <foreignObject x="240" y="105" width={30} height={60}>
                    <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
                      {buildFrac(bruch5.zähler, bruch5.nenner)}
                    </div>
                  </foreignObject>
                  <rect
                    x="237"
                    y="154"
                    width="24"
                    height="35"
                    rx="4"
                    ry="4"
                    fill="#F3FBFF"
                  />
                  <foreignObject x="240" y="154" width={30} height={60}>
                    <div style={{ fontSize: '8px', fontWeight: 'bold' }}>
                      {buildFrac(bruch6.zähler, bruch6.nenner)}
                    </div>
                  </foreignObject>
                </svg>
              </li>
              <li>
                <p>
                  Für die Wahrscheinlichkeit betrachte die beiden Pfade, die zum
                  Ereignis {'"'}Unterschiedliche Farben{'"'} passen.
                </p>
                <p>
                  Verwende die Pfadregeln, um die Wahrscheinlichkeit zu
                  berechnen:
                </p>
                {buildEquation([
                  [
                    <>p(rw;wr)</>,
                    <>=</>,
                    <>
                      {buildFrac(bruch.zähler, bruch.nenner)} ·{' '}
                      {buildFrac(bruch4.zähler, bruch4.nenner)} +{' '}
                      {buildFrac(bruch2.zähler, bruch2.nenner)} ·{' '}
                      {buildFrac(bruch5.zähler, bruch5.nenner)}
                    </>,
                  ],
                  [
                    <></>,
                    <>=</>,
                    <>
                      {' '}
                      {pp(
                        roundToDigits(
                          ((data.red * (gesamt - data.red)) /
                            (gesamt * (gesamt - 1))) *
                            2,
                          4,
                        ),
                      )}
                    </>,
                  ],
                ])}

                <p>
                  Die Wahrscheinlichkeit beträgt{' '}
                  <strong>
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
                  </strong>
                  .
                </p>
              </li>
            </ol>
          </>
        )
      },
    },
  ],
}
