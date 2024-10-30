import { Exercise } from '@/data/types'
import { Color5 } from '@/helper/colors'
import { buildInlineFrac, buildSqrt } from '@/helper/math-builder'

interface DATA {
  item_1: number
  item_2: number
  item_3: number
  order: Array<number>
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
    }
  },
  originalData: { item_1: 1, item_2: 0, item_3: 0, order: [2, 1, 0] },
  constraint({ data }) {
    return data.item_2 != data.item_3
  },
  intro({ data }) {
    return (
      <>
        <p>
          Kasimir zeichnet ein gleichseitiges Dreieck mit der Seitenlänge a = 10
          cm und einer Höhe h ˜ 8,7 cm (Abbildung 1).
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
        return (
          <>
            <p>
              a) Bestätige durch eine Rechnung, dass der Flächeninhalt des
              Dreiecks 43,5 cm² beträgt.
            </p>
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
        return (
          <>
            <p>
              Kasimir markiert auf jeder Dreieckseite den Mittelpunkt. Die
              Mittelpunkte verbindet er. Es entstehen vier gleiche kleine
              Dreiecke (Abbildung 2).
            </p>
            <svg viewBox="0 0 328 180">
              <image
                href="/content/NRW_EESA/109_Kasimir2.PNG"
                height="180"
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
              Zeichne die Figur (Abbildung 2) mit den Originalmaßen auf ein
              DIN-A4-Blatt.
            </p>
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
        return <></>
      },
      task({ data }) {
        return (
          <>
            <p>
              Bestätige durch eine Rechnung, dass der Flächeninhalt eines
              kleinen Dreiecks ca. 10,9 cm² beträgt.
            </p>
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
        return (
          <>
            <p>
              Kasimir klappt die drei äußeren hellen Dreiecke nach oben. Es
              entsteht eine besondere Pyramide, die Tetraeder genannt wird
              (Abbildung 3). Die Kantenlänge des Tetraeders beträgt 5 cm. Der
              Flächeninhalt der Grundfläche beträgt ca. 10,9 cm².
            </p>
            <svg viewBox="0 0 328 180">
              <image
                href="/content/NRW_EESA/109_Kasimir3.PNG"
                height="180"
                width="328"
              />
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
        return (
          <>
            <p>
              Zeige mit der Formel, dass h<sub>K​</sub> ​≈ 4,1 cm lang ist.
            </p>
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
        return <></>
      },
      task({ data }) {
        return (
          <>
            <p>
              Berechne mit der Körperhöhe h<sub>K​</sub>​ das Volumen des
              Tetraeders.
            </p>
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
              Abbildung 2 stellt das Netz eines Tetraeders dar. Welches Netz
              stellt ebenfalls das Netz eines Tetraeders dar? Entscheide
              jeweils.
            </p>
            <ul>{shuffledItems}</ul>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
