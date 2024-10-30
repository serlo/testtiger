import { Exercise } from '@/data/types'
import { Color4, Color5 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  item_1: number
  item_2: number
  item_3: number
  order: Array<number>
  a: number
}
const richtig = [
  '/content/NRW_EESA/109_Kasimir6.PNG',
  '/content/NRW_EESA/109_Kasimir10.PNG',
  ,
]

const falsch = [
  '/content/NRW_EESA/109_Kasimir4.PNG',
  '/content/NRW_EESA/109_Kasimir5.PNG',
  '/content/NRW_EESA/109_Kasimir7.PNG',
  '/content/NRW_EESA/109_Kasimir8.PNG',
  '/content/NRW_EESA/109_Kasimir9.PNG',
]
export const exercise109: Exercise<DATA> = {
  title: 'Kasimir bastelt',
  source: '2021 Teil 2 Aufgabe 3',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    return {
      item_1: rng.randomIntBetween(0, 1),
      item_2: rng.randomIntBetween(0, 4),
      item_3: rng.randomIntBetween(0, 4),
      order: rng.shuffleArray([0, 1, 2]),
      a: rng.randomIntBetween(6, 12),
    }
  },
  originalData: { item_1: 0, item_2: 2, item_3: 1, order: [1, 2, 0], a: 10 },
  constraint({ data }) {
    return data.item_2 != data.item_3
  },
  intro({ data }) {
    const h = roundToDigits(
      Math.sqrt(data.a * data.a - (data.a * data.a) / 4),
      1,
    )
    return (
      <>
        <p>
          Kasimir zeichnet ein gleichseitiges Dreieck mit der Seitenlänge a ={' '}
          {data.a}
          cm und einer Höhe h = {pp(h)} cm (Abbildung 1).
        </p>
        <svg viewBox="0 0 328 180">
          <image
            href="/content/NRW_EESA/109_Kasimir1.PNG"
            height="180"
            width="328"
          />
        </svg>
        <center>
          <Color5>
            <span style={{ fontSize: 'small' }}>
              Abbildung 1: gleichseitiges Dreieck
            </span>
          </Color5>
        </center>
      </>
    )
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const h = roundToDigits(
          Math.sqrt(data.a * data.a - (data.a * data.a) / 4),
          1,
        )
        const surface = (h * data.a) / 2
        return (
          <>
            <p>
              a) Bestätige durch eine Rechnung, dass der Flächeninhalt des
              Dreiecks {pp(roundToDigits(surface, 2))} cm² beträgt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const h = roundToDigits(
          Math.sqrt(data.a * data.a - (data.a * data.a) / 4),
          1,
        )
        const surface = (h * data.a) / 2
        return (
          <>
            <p>Berechne den Flächeninhalt des Dreiecks mit der Formel:</p>
            {buildEquation([
              [<>A</>, <>=</>, <>{ppFrac(1 / 2)} · a · h</>],
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
                    <span style={{ fontSize: 'small' }}>Werte einsetzen</span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {ppFrac(1 / 2)} · {data.a} · {pp(h)}
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>{pp(roundToDigits(0.5 * data.a * h, 2))} [cm²]</>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 42,
      intro({ data }) {
        return (
          <>
            <p>
              Kasimir markiert auf jeder Dreieckseite den Mittelpunkt. Die
              Mittelpunkte verbindet er. Es entstehen vier gleiche kleine
              Dreiecke (Abbildung 2).
            </p>
            <svg viewBox="0 0 328 140">
              <image
                href="/content/NRW_EESA/109_Kasimir2.PNG"
                height="140"
                width="328"
              />
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 2: Einteilung des Dreiecks
                </span>
              </Color5>
            </center>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              b) Zeichne die Figur (Abbildung 2) mit den Originalmaßen auf ein
              DIN-A4-Blatt.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <svg viewBox="0 0 328 140">
              <image
                href="/content/NRW_EESA/109_Kasimir1.PNG"
                height="140"
                width="328"
              />
            </svg>
            <p>
              Konstruiere zuerst das gleichseitige Dreieck mit der Seitenlänge a
              = {data.a} cm.
            </p>
            <p>
              Bestimme anschließend mit dem Lineal die Mittelpunkte der Seiten
              und markiere sie. Verbinde sie, um die Figur fertigzustellen.
            </p>
            <svg viewBox="0 0 328 140">
              <image
                href="/content/NRW_EESA/109_Kasimir2.PNG"
                height="140"
                width="328"
              />
            </svg>
          </>
        )
      },
    },
    {
      points: 42,
      intro({ data }) {
        return <></>
      },
      task({ data }) {
        const h = roundToDigits(
          Math.sqrt(data.a * data.a - (data.a * data.a) / 4),
          1,
        )
        const surface = (h * data.a) / 2
        return (
          <>
            <p>
              c) Bestätige durch eine Rechnung, dass der Flächeninhalt eines
              kleinen Dreiecks ca. {pp(roundToDigits(surface / 4, 1))} cm²
              beträgt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const h = roundToDigits(
          Math.sqrt(data.a * data.a - (data.a * data.a) / 4),
          1,
        )
        const surface = (h * data.a) / 2
        return (
          <>
            <p>
              Das große Dreieck besteht aus 4 identischen kleinen Dreiecken.
            </p>
            <p>Teile die Gesamtfläche durch 4:</p>
            <p>
              {pp(roundToDigits(surface, 1))} : 4 ={' '}
              {pp(roundToDigits(surface / 4, 1))} [cm²]
            </p>
          </>
        )
      },
    },
    {
      points: 42,
      intro({ data }) {
        const h = roundToDigits(
          Math.sqrt(data.a * data.a - (data.a * data.a) / 4),
          1,
        )
        const surface = (h * data.a) / 2
        return (
          <>
            <p>
              Kasimir klappt die drei äußeren hellen Dreiecke nach oben. Es
              entsteht eine besondere Pyramide, die Tetraeder genannt wird
              (Abbildung 3). Die Kantenlänge des Tetraeders beträgt{' '}
              {pp(data.a / 2)} cm. Der Flächeninhalt der Grundfläche beträgt ca.{' '}
              {pp(roundToDigits(surface / 4, 1))} cm².
            </p>
            <svg viewBox="0 0 328 180">
              <image
                href="/content/NRW_EESA/109_Kasimir3.PNG"
                height="180"
                width="328"
              />
              <text
                x="205"
                y="160"
                fontSize="15"
                textAnchor="middle"
                fill="black"
                transform="rotate(-25, 205, 160)"
              >
                b = {pp(data.a / 2)} cm
              </text>
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 3: Tetraeder
                </span>
              </Color5>
            </center>
            <p>
              Die Körperhöhe h<sub>K​</sub> eines Tetraeders kann mit folgender
              Formel berechnet werden:
            </p>
            <p>
              h<sub>K​</sub> = {buildInlineFrac(<>{buildSqrt(6)}</>, 3)} · b
            </p>
          </>
        )
      },
      task({ data }) {
        const hk = (Math.sqrt(6) / 3) * (data.a / 2)
        return (
          <>
            <p>
              d) Zeige mit der Formel, dass h<sub>K​</sub> ​≈{' '}
              {pp(roundToDigits((Math.sqrt(6) / 3) * (data.a / 2), 1))} cm lang
              ist.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Setze den Wert von b aus der Abbildung in die Formel ein:</p>
            {buildEquation([
              [
                <>
                  h<sub>K​</sub>
                </>,
                <>=</>,
                <>{buildInlineFrac(<>{buildSqrt(6)}</>, 3)} · b</>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(<>{buildSqrt(6)}</>, 3)} · {pp(data.a / 2)}
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  {pp(roundToDigits((Math.sqrt(6) / 3) * (data.a / 2), 1))} [cm]
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 42,
      intro({ data }) {
        return <></>
      },
      task({ data }) {
        return (
          <>
            <p>
              e) Berechne mit der Körperhöhe h<sub>K​</sub>​ das Volumen des
              Tetraeders.
            </p>
          </>
        )
      },
      solution({ data }) {
        const h = Math.sqrt(data.a * data.a - (data.a * data.a) / 4)
        const surface = (h * data.a) / 2
        return (
          <>
            <p>Berechne das Volumen mit der Formel für Pyramiden:</p>
            {buildEquation([
              [<>V</>, <>=</>, <>{buildInlineFrac(<>G · h</>, <>3</>)}</>],
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
                      Werte aus c) und d) einsetzen
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>
                      {pp(roundToDigits(surface / 4, 1))} ·{' '}
                      {pp(roundToDigits((Math.sqrt(6) / 3) * (data.a / 2), 1))}
                    </>,
                    <>3</>,
                  )}
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  <strong>
                    {pp(
                      roundToDigits(
                        (1 / 3) *
                          roundToDigits((Math.sqrt(6) / 3) * (data.a / 2), 1) *
                          roundToDigits(surface / 4, 1),
                        2,
                      ),
                    )}{' '}
                    [cm³]
                  </strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 42,
      intro({ data }) {
        return <></>
      },
      task({ data }) {
        const listItems = [
          <li key="1">
            <svg viewBox="0 0 328 120">
              <image href={richtig[data.item_1]} height="120" width="328" />
            </svg>
          </li>,
          <li key="2">
            <svg viewBox="0 0 328 120">
              <image href={falsch[data.item_2]} height="120" width="328" />
            </svg>
          </li>,

          <li key="3">
            <svg viewBox="0 0 328 120">
              <image href={falsch[data.item_3]} height="120" width="328" />
            </svg>
          </li>,
        ]
        const shuffledItems = data.order.map(i => listItems[i])
        return (
          <>
            <p>
              f) Abbildung 2 stellt das Netz eines Tetraeders dar. Welches Netz
              stellt ebenfalls das Netz eines Tetraeders dar? Entscheide
              jeweils.
            </p>
            <ul>{shuffledItems}</ul>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Das Netz</p>
            <svg viewBox="0 0 328 100">
              <image href={richtig[data.item_1]} height="100" width="328" />
            </svg>
            <p>beschreibt tatsächlich einen Tetraeder.</p>
            <p>Die Netze</p>
            <svg viewBox="0 0 328 100">
              <image href={falsch[data.item_2]} height="100" width="328" />
            </svg>
            <svg viewBox="0 0 328 100">
              <image href={falsch[data.item_3]} height="100" width="328" />
            </svg>
            <p>beschreiben keinen Tetraeder.</p>
          </>
        )
      },
    },
  ],
}
