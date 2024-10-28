import { Exercise } from '@/data/types'

interface DATA {}

export const exercise127: Exercise<DATA> = {
  title: 'Tischgruppe',
  source: '2023 Teil 2 Aufgabe 2',
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
          ></text>
          <text
            x="150"
            y="100"
            fontSize="10"
            textAnchor="middle"
            fill="black"
            transform="rotate(45, 50, 100)"
          ></text>
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
        return (
          <>
            <p>
              a) Bestätige durch eine Rechnung, dass die längste Seite des
              Tisches etwa 85 cm lang ist.
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
        return <></>
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
