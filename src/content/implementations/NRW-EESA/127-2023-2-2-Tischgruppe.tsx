import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  kathete: number
}

export const exercise127: Exercise<DATA> = {
  title: 'Tischgruppe',
  source: '2023 Teil 2 Aufgabe 2',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    return { kathete: rng.randomIntBetween(4, 9) * 10 }
  },
  originalData: { kathete: 60 },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Die Hauptschule am Hafen möchte für ihre Klassenräume neue Tische und
          Stühle bestellen. Sie entscheidet sich für dreieckige Tische
          (Abbildung 1).
        </p>
        <svg viewBox="0 0 328 220">
          <image
            href="/content/NRW_EESA/127_Tischgruppe.PNG"
            height="220"
            width="328"
          />
          <text
            x="150"
            y="100"
            fontSize="10"
            textAnchor="middle"
            fill="black"
            transform="rotate(-45, 150, 100)"
          >
            {data.kathete} cm
          </text>
          <text
            x="150"
            y="100"
            fontSize="10"
            textAnchor="middle"
            fill="black"
            transform="rotate(45, 50, 100)"
          >
            {data.kathete} cm
          </text>
        </svg>
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
        const hypo = Math.round(Math.sqrt(2 * data.kathete * data.kathete))
        return (
          <>
            <p>
              a) Bestätige durch eine Rechnung, dass die längste Seite des
              Tisches etwa {pp(hypo)} cm lang ist.
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
        const hypo = Math.round(Math.sqrt(2 * data.kathete * data.kathete))
        return (
          <>
            <p>
              Vier dreieckige Tische können zu einer quadratischen Tischgruppe
              zusammengestellt werden (Abbildung 2).
            </p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/NRW_EESA/127_Tischgruppe.PNG"
                height="328"
                width="328"
              />
              <text
                x="280"
                y="200"
                fontSize="10"
                textAnchor="middle"
                fill="black"
                transform="rotate(-45, 150, 100)"
              >
                {data.kathete} cm
              </text>
              <text
                x="50"
                y="200"
                fontSize="10"
                textAnchor="middle"
                fill="black"
                transform="rotate(45, 50, 100)"
              >
                {data.kathete} cm
              </text>
              <text
                x="164"
                y="300"
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                {hypo} cm
              </text>
            </svg>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Berechne den Flächeninhalt dieser Tischgruppe.</p>

            <p>Gib das Ergebnis in Quadratmetern ( m²) an.</p>
          </>
        )
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
            <p>c) Zeichne die Tischgruppe im Maßstab 1 : 10.</p>
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
            <p>Zuerst bekommen die 5. Klassen neue Tische und Stühle.</p>

            <p>
              Für eine erste Kostenberechnung benutzt die Schule folgende
              Tabellenkalkulation:
            </p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/NRW_EESA/127_Tischgruppe3.png"
                height="328"
                width="328"
              />
            </svg>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>d) Berechne den Gesamtpreis für die dreieckigen Tische.</p>
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
        return <></>
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
