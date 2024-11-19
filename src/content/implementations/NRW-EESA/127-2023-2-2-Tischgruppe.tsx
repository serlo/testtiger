import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { buildEquation, buildSqrt } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  kathete: number
  menge_stuhl: number
  menge_tisch: number
  menge_stuhl_l: number
  menge_tisch_l: number
  preis_stuhl: number
  preis_tisch: number
  preis_stuhl_l: number
  preis_tisch_l: number
  item_1: number
  item_2: number
  item_3: number
  order: Array<number>
}
const richtig = [
  '= (D6/100)*119',
  '= D6+D7',
  '= D6*1,19',
  '= (D2+D3+D4+D5)*1,19',
]

const falsch = ['= D6*0,19', '= D6+1,19', '= D2+D3+D4+D5', '= D6*D7']
export const exercise127: Exercise<DATA> = {
  title: 'Tischgruppe',
  source: '2023 Teil 2 Aufgabe 2',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    return {
      item_1: rng.randomIntBetween(0, 3),
      item_2: rng.randomIntBetween(0, 3),
      item_3: rng.randomIntBetween(0, 3),
      kathete: rng.randomIntBetween(4, 9) * 10,
      menge_stuhl: rng.randomIntBetween(6, 12) * 10,
      menge_tisch: rng.randomIntBetween(6, 12) * 10,
      menge_stuhl_l: rng.randomIntBetween(2, 7),
      menge_tisch_l: rng.randomIntBetween(2, 7),
      preis_stuhl: rng.randomIntBetween(90, 120),
      preis_tisch: rng.randomIntBetween(120, 160),
      preis_stuhl_l: rng.randomIntBetween(120, 160),
      preis_tisch_l: rng.randomIntBetween(20, 25) * 20,
      order: rng.shuffleArray([0, 1, 2]),
    }
  },
  originalData: {
    item_1: 1,
    item_2: 0,
    item_3: 0,
    kathete: 60,
    menge_stuhl: 90,
    menge_tisch: 90,
    menge_stuhl_l: 3,
    menge_tisch_l: 3,
    preis_stuhl: 106,
    preis_tisch: 141,
    preis_stuhl_l: 139,
    preis_tisch_l: 450,
    order: [2, 1, 0],
  },
  constraint({ data }) {
    return data.item_1 != data.item_2
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
            x="100"
            y="130"
            fontSize="15"
            textAnchor="middle"
            fill="black"
            transform="rotate(-45, 100, 130)"
          >
            {data.kathete} cm
          </text>
          <text
            x="227"
            y="130"
            fontSize="15"
            textAnchor="middle"
            fill="black"
            transform="rotate(45, 227, 130)"
          >
            {data.kathete} cm
          </text>
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 3,
      duration: 2,
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
        const hypo = Math.round(Math.sqrt(2 * data.kathete * data.kathete))
        return (
          <>
            <p>
              Der Tisch bildet ein rechtwinkliges Dreieck. Berechne die Länge
              der Hypotenuse c mit dem Satz des Pythagoras:
            </p>
            {buildEquation([
              [
                <>c²</>,
                <>=</>,
                <>
                  {data.kathete}² + {data.kathete}²
                </>,
              ],
              [
                <>c²</>,
                <>=</>,
                <>
                  {data.kathete * data.kathete} + {data.kathete * data.kathete}
                </>,
                <>| √</>,
              ],
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
                      c mit der Quadratwurzel berechnen
                    </span>
                  </Color4>
                </>,
              ],
              [
                <>c</>,
                <>=</>,
                <>{buildSqrt(data.kathete * data.kathete * 2)}</>,
              ],
              [
                <>c</>,
                <>≈</>,
                <>
                  <strong>
                    {pp(
                      roundToDigits(
                        Math.sqrt(data.kathete * data.kathete * 2),
                        2,
                      ),
                    )}{' '}
                    [cm]
                  </strong>
                </>,
              ],
            ])}
            <p>
              Die längste Seite des Tisches ist etwa <strong>{hypo} cm</strong>{' '}
              lang.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 2,
      intro({ data }) {
        const hypo = Math.round(Math.sqrt(2 * data.kathete * data.kathete))
        return (
          <>
            <p>
              Vier dreieckige Tische können zu einer quadratischen Tischgruppe
              zusammengestellt werden (Abbildung 2).
            </p>
            <svg viewBox="0 0 328 250">
              <image
                href="/content/NRW_EESA/127_Tischgruppe2.PNG"
                height="250"
                width="328"
              />
              <text
                x="122"
                y="190"
                fontSize="15"
                textAnchor="middle"
                fill="black"
                transform="rotate(-45, 122, 190)"
              >
                {data.kathete} cm
              </text>
              <text
                x="205"
                y="190"
                fontSize="15"
                textAnchor="middle"
                fill="black"
                transform="rotate(45, 205, 190)"
              >
                {data.kathete} cm
              </text>
              <text
                x="164"
                y="235"
                fontSize="15"
                textAnchor="middle"
                fill="black"
              >
                {hypo} cm
              </text>
            </svg>
          </>
        )
      },
      task({ data }) {
        const hypo = Math.round(Math.sqrt(2 * data.kathete * data.kathete))
        return (
          <>
            <p>b) Berechne den Flächeninhalt dieser Tischgruppe.</p>

            <p>Gib das Ergebnis in Quadratmetern (m²) an.</p>
          </>
        )
      },
      solution({ data }) {
        const hypo = Math.round(Math.sqrt(2 * data.kathete * data.kathete))
        return (
          <>
            <p>
              Die Seitenlänge des Quadrats beträgt {hypo} cm = {pp(hypo / 100)}{' '}
              m. Setze dies in die Formel für den Flächeninhalt eines Quadrats
              ein:
            </p>
            {buildEquation([
              [<>A</>, <>=</>, <>a²</>],

              [<></>, <>=</>, <>{pp(hypo / 100)}²</>],
              [
                <></>,
                <>
                  <strong>≈</strong>
                </>,
                <>
                  <strong>
                    {pp(roundToDigits((hypo * hypo) / 10000, 2))} [m²]
                  </strong>
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 3,
      duration: 5,
      skillIntro({ data }) {
        const hypo = Math.round(Math.sqrt(2 * data.kathete * data.kathete))
        return (
          <>
            <p>
              Vier dreieckige Tische können zu einer quadratischen Tischgruppe
              zusammengestellt werden (Abbildung 2).
            </p>
            <svg viewBox="0 0 328 250">
              <image
                href="/content/NRW_EESA/127_Tischgruppe2.PNG"
                height="250"
                width="328"
              />
              <text
                x="122"
                y="190"
                fontSize="15"
                textAnchor="middle"
                fill="black"
                transform="rotate(-45, 122, 190)"
              >
                {data.kathete} cm
              </text>
              <text
                x="205"
                y="190"
                fontSize="15"
                textAnchor="middle"
                fill="black"
                transform="rotate(45, 205, 190)"
              >
                {data.kathete} cm
              </text>
              <text
                x="164"
                y="235"
                fontSize="15"
                textAnchor="middle"
                fill="black"
              >
                {hypo} cm
              </text>
            </svg>
          </>
        )
      },
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              c) Zeichne die Tischgruppe im Maßstab <br></br>1 : 10.
            </p>
          </>
        )
      },
      solution({ data }) {
        const hypo = Math.round(Math.sqrt(2 * data.kathete * data.kathete))
        return (
          <>
            <p>
              Die Seitenlänge des Quadrats hat im Maßstab 1:10 eine Länge von{' '}
              <strong>{pp(hypo / 10)} cm</strong>.
            </p>
            <p>Zeichne ein Quadrat mit dieser Seitenlänge.</p>
            <svg viewBox="0 0 328 200">
              <image
                href="/content/NRW_EESA/127_Tischgruppe4.PNG"
                height="200"
                width="328"
              />
              <text
                x="164"
                y="180"
                fontSize="15"
                textAnchor="middle"
                fill="black"
              >
                {pp(hypo / 10)} cm
              </text>
            </svg>
            <p>
              Zeichne die Diagonalen, um die Tischgruppe fertig zu zeichnen.
            </p>
            <svg viewBox="0 0 328 200">
              <image
                href="/content/NRW_EESA/127_Tischgruppe2.PNG"
                height="200"
                width="328"
              />
              <text
                x="164"
                y="180"
                fontSize="15"
                textAnchor="middle"
                fill="black"
              >
                {pp(hypo / 10)} cm
              </text>
            </svg>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 2,
      intro({ data }) {
        return (
          <>
            <p>Zuerst bekommen die 5. Klassen neue Tische und Stühle.</p>

            <p>
              Für eine erste Kostenberechnung benutzt die Schule folgende
              Tabellenkalkulation:
            </p>
            <div
              className="relative overflow-hidden rounded-lg max-w-[320px] mx-auto "
              style={{
                transform: 'scale(1)',
                transformOrigin: 'top left',
              }}
            >
              <table className="table-auto rounded-lg shadow-md w-full text-left text-[9px] ">
                <thead
                  className="uppercase bg-[#D2ECF6] text-[#404040]"
                  style={{ backgroundColor: '#D2ECF6', color: '#404040' }}
                >
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]"></td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      A
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      B
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      C
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      D
                    </td>
                  </tr>
                </thead>
                <tbody
                  className="bg-white text-gray-500"
                  style={{ backgroundColor: '#FFFFFF', color: '#6b7280' }}
                >
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      1
                    </td>
                    <td className="py-1 border text-left font-bold p-1 text-black ">
                      Produkt
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      Menge
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      Einzelpreis in €
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      Gesamtpreis in €
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center  p-1 border-[#6D5E5E]">
                      2
                    </td>
                    <td className="py-1 border text-left  p-1 text-black">
                      Stuhl
                    </td>
                    <td className="py-1 border text-center  p-1">
                      {data.menge_stuhl}
                    </td>
                    <td className="py-1 border text-center  p-1">
                      {data.preis_stuhl}
                    </td>
                    <td className="py-1 border text-center  p-1">
                      {data.menge_stuhl * data.preis_stuhl}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center  p-1 border-[#6D5E5E]">
                      3
                    </td>
                    <td className="py-1 border text-left  p-1 text-black">
                      dreieckiger Tisch
                    </td>
                    <td className="py-1 border text-center  p-1">
                      {' '}
                      {data.menge_tisch}
                    </td>
                    <td className="py-1 border text-center  p-1">
                      {' '}
                      {data.preis_tisch}
                    </td>
                    <td className="py-1 border text-center  p-1"></td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center  p-1 border-[#6D5E5E]">
                      4
                    </td>
                    <td className="py-1 border text-left  p-1 text-black">
                      Stuhl (Lehrkraft)
                    </td>
                    <td className="py-1 border text-center  p-1">
                      {data.menge_stuhl_l}
                    </td>
                    <td className="py-1 border text-center  p-1">
                      {' '}
                      {data.preis_stuhl_l}
                    </td>
                    <td className="py-1 border text-center  p-1">
                      {data.menge_stuhl_l * data.preis_stuhl_l}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center  p-1 border-[#6D5E5E]">
                      5
                    </td>
                    <td className="py-1 border text-left  p-1 text-black">
                      Tisch (Lehrkraft)
                    </td>
                    <td className="py-1 border text-center  p-1">
                      {data.menge_tisch_l}
                    </td>
                    <td className="py-1 border text-center  p-1">
                      {data.preis_tisch_l}
                    </td>
                    <td className="py-1 border text-center  p-1">
                      {data.menge_tisch_l * data.preis_tisch_l}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center  p-1 border-[#6D5E5E]">
                      6
                    </td>
                    <td className="py-1 border text-left  p-1 text-black"></td>
                    <td className="py-1 border text-center  p-1"></td>
                    <td className="py-1 border text-center  p-1">
                      Nettobetrag
                    </td>
                    <td className="py-1 border text-center  p-1">
                      {data.menge_stuhl * data.preis_stuhl +
                        data.menge_stuhl_l * data.preis_stuhl_l +
                        data.preis_tisch * data.menge_tisch +
                        data.menge_tisch_l * data.preis_tisch_l}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center  p-1 border-[#6D5E5E]">
                      7
                    </td>
                    <td className="py-1 border text-left  p-1 text-black"></td>
                    <td className="py-1 border text-center  p-1"></td>
                    <td className="py-1 border text-center  p-1">19 % MwSt.</td>
                    <td className="py-1 border text-center  p-1">
                      {pp(
                        (data.menge_stuhl * data.preis_stuhl +
                          data.menge_stuhl_l * data.preis_stuhl_l +
                          data.preis_tisch * data.menge_tisch +
                          data.menge_tisch_l * data.preis_tisch_l) *
                          0.19,
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center  p-1 border-[#6D5E5E]">
                      8
                    </td>
                    <td className="py-1 border text-left  p-1 text-black"></td>
                    <td className="py-1 border text-center  p-1"></td>
                    <td className="py-1 border text-center font-bold p-1">
                      Bruttobetrag
                    </td>
                    <td className="py-1 border text-center font-bold p-1">
                      {pp(
                        (data.menge_stuhl * data.preis_stuhl +
                          data.menge_stuhl_l * data.preis_stuhl_l +
                          data.preis_tisch * data.menge_tisch +
                          data.menge_tisch_l * data.preis_tisch_l) *
                          1.19,
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
        return (
          <>
            <p>
              Der Gesamtpreis ergibt sich aus der Stückzahl und dem Stückpreis:
            </p>
            <p>
              {data.menge_tisch} · {data.preis_tisch} ={' '}
              <strong>{data.menge_tisch * data.preis_tisch} [€]</strong>
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      duration: 2,
      intro({ data }) {
        return <></>
      },
      task({ data }) {
        const listItems = [
          <li key="1">{richtig[data.item_1]}</li>,
          <li key="2">{richtig[data.item_2]}</li>,
          <li key="3">{falsch[data.item_3]}</li>,
        ]
        const shuffledItems = data.order.map(i => listItems[i])
        return (
          <>
            <p>
              e) Mit welchen Formeln kann der Wert in Zelle D8 berechnet werden?
              Wähle aus.
            </p>
            <ul>{shuffledItems}</ul>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              D8 enthält der Bruttobetrag, der sich aus dem Nettobetrag (D6) und
              den Steuern zusammensetzt.
            </p>
            <p>
              Die Formeln{' '}
              <ul>
                <li>
                  {'"'}
                  {richtig[data.item_1]}
                  {'"'}
                </li>{' '}
                und{' '}
                <li>
                  {'"'}
                  {richtig[data.item_2]}
                  {'"'}
                </li>
              </ul>{' '}
              beschreiben das.
            </p>
          </>
        )
      },
    },
  ],
}
