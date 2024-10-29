import { Exercise } from '@/data/types'
import { Color5 } from '@/helper/colors'
import { ppFrac } from '@/helper/pretty-print'

interface DATA {}

export const exercise119: Exercise<DATA> = {
  title: 'Bambus',
  source: '2022 Teil 2 Aufgabe 3',
  useCalculator: true,
  duration: 30,
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
        return (
          <>
            <p>
              Der Riesenbambus ist eine besondere Bambuspflanze, die sehr
              schnell und sehr hoch wachsen kann.
            </p>
            <p>
              Unter idealen Bedingungen wächst sie ca. 70 cm pro Tag. Ein
              Riesenbambus kann bis zu 35 Meter hoch werden.
            </p>
            <svg viewBox="0 0 328 160">
              <image
                href="/content/NRW_EESA/119_Bambus.PNG"
                height="160"
                width="328"
              />

              <text
                x="136"
                y="75"
                fontSize="13"
                textAnchor="middle"
                fill="black"
              ></text>
            </svg>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              a) Eine Bambuspflanze hat eine Höhe von <br></br>3 m. Bestimme die
              Höhe dieser Bambuspflanze nach 10 Tagen unter idealen Bedingungen.
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
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              b) Unter idealen Bedingungen kann das Wachstum der Bambuspflanze
              mit der Gleichung y = {ppFrac(10 / 7)} ​x + 3 beschrieben werden.
            </p>
            <p>Zeichne die Gerade in ein Koordinatensystem ein.</p>
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
              Berechne mithilfe der Gleichung, nach wie vielen Tagen die
              Bambuspflanze eine Höhe von 17,5 m erreicht.
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
              Herr Paulsen möchte einen Zaun aus Bambusrohren bauen (Abbildung
              2).
            </p>
            <svg viewBox="0 0 328 160">
              <image
                href="/content/NRW_EESA/119_Bambus2.PNG"
                height="160"
                width="328"
              />
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 2: Zaun aus Bambusrohren
                </span>
              </Color5>
            </center>
            <p>
              Der Zaun soll eine Länge von 6,5 m haben. Die Bambusrohre sind
              annähernd zylinderförmig und haben einen Durchmesser von etwa 5
              cm.
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              Berechne die Anzahl an Bambusrohren, die für den Zaun benötigt
              werden.
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
              Bambusrohre sind innen hohl, außen bestehen sie aus Holz
              (Abbildung 3).
            </p>
            <svg viewBox="0 0 328 80">
              <image
                href="/content/NRW_EESA/119_Bambu3.PNG"
                height="80"
                width="328"
              />
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 3: Bambusrohr
                </span>
              </Color5>
            </center>
            <p>
              Die Querschnittsfläche von einem Bambusrohr ist ein Kreisring
              (Abbildung 4).
            </p>
            <svg viewBox="0 0 328 80">
              <image
                href="/content/NRW_EESA/119_Bambus4.PNG"
                height="80"
                width="328"
              />
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 4: Modell des Querschnitts eines Bambusrohrs
                </span>
              </Color5>
            </center>
            <p>
              Die Bambusrohre für den Zaun haben folgende Maße: Der Außenkreis
              hat einen Radius von r<sub>1</sub>​ = 2,5 cm und der Innenkreis
              einen Radius von r<sub>2</sub> ​= 2 cm.
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              Zeige durch eine Rechnung, dass der Flächeninhalt des Kreisrings A
              ≈ 7,1 cm² beträgt.
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
              Herr Paulsen kauft 130 Bambusrohre, die jeweils eine Länge von 180
              cm haben.{' '}
            </p>
            <p>
              Ein Kubikzentimeter (cm³) Bambusholz wiegt 0,7 Gramm (g). Zum
              Transport kann er einen Anhänger nutzen. Auf dem Anhänger dürfen
              bis zu 250 kg geladen werden.
            </p>
            <ul>
              <li>Berechne das Gewicht der gekauften Bambusrohre.</li>
              <li>
                Entscheide, ob das erlaubte Ladegewicht des Anhängers
                eingehalten wird.
              </li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
