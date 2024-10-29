import { Exercise } from '@/data/types'
import { Color1, Color5 } from '@/helper/colors'
import { pp } from '@/helper/pretty-print'

interface DATA {
  grundbetrag: number
  prüfung: number
  stunden: number
  more_stunden: number
  stundenpreis: number
  sonderpreis: number
  sparen: number
  month: number
  item_1: number
  item_2: number
  item_3: number
  order: number[]
  rabatt: number
}
const richtig = ['=B5*C5']

const falsch = ['=B5+C5', '=SUMME(D2:D4)', '=B4*C4']
export const exercise118: Exercise<DATA> = {
  title: 'Führerschein',
  source: '2022 Teil 2 Aufgabe 2',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    return {
      rabatt: rng.randomIntBetween(2, 4) * 50,
      grundbetrag: rng.randomIntBetween(5, 8) * 50,
      prüfung: rng.randomIntBetween(5, 9) * 30,
      stunden: rng.randomIntBetween(4, 9),
      more_stunden: rng.randomIntBetween(12, 18),
      stundenpreis: rng.randomIntBetween(8, 12) * 5,
      sonderpreis: rng.randomIntBetween(10, 16) * 5,
      sparen: rng.randomIntBetween(3, 9),
      month: rng.randomIntBetween(3, 6) * 10,
      item_1: 0,
      item_2: rng.randomIntBetween(0, 2),
      item_3: rng.randomIntBetween(0, 2),
      order: rng.shuffleArray([0, 1, 2]),
    }
  },

  originalData: {
    rabatt: 100,
    grundbetrag: 300,
    more_stunden: 15,
    item_1: 0,
    item_2: 0,
    item_3: 1,
    order: [0, 1, 2],
    prüfung: 210,
    stunden: 10,
    stundenpreis: 45,
    sonderpreis: 60,
    sparen: 4,
    month: 40,
  },
  constraint({ data }) {
    return data.item_2 != data.item_3 && data.grundbetrag - data.rabatt > 0
  },
  intro({ data }) {
    return (
      <>
        <p>
          Alina möchte ihren Autoführerschein machen. Zur Berechnung der Kosten
          für den Führerschein erstellt sie eine Tabelle mithilfe einer
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
                <td className="py-1 border text-center font-bold p-1 text-black "></td>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  Anzahl geplanter Fahrstunden
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  Einzelpreis in €
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  Gesamtpreis in €
                </td>
              </tr>
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  2
                </td>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  Grundbetrag
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black"></td>
                <td className="py-1 border text-center font-bold p-1  text-black"></td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {data.grundbetrag}
                </td>
              </tr>
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  3
                </td>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  Prüfung
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black"></td>
                <td className="py-1 border text-center font-bold p-1  text-black"></td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {data.prüfung}
                </td>
              </tr>
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  4
                </td>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  Übungsstunden
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {data.stunden}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {data.stundenpreis}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black"></td>
              </tr>
              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  5
                </td>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  Sonderfahrten
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  12
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {data.sonderpreis}
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {12 * data.sonderpreis}
                </td>
              </tr>

              <tr>
                <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                  6
                </td>
                <td className="py-1 border text-center font-bold p-1 text-black">
                  Gesamtkosten
                </td>
                <td className="py-1 border text-center font-bold p-1  text-black"></td>
                <td className="py-1 border text-center font-bold p-1  text-black"></td>
                <td className="py-1 border text-center font-bold p-1  text-black">
                  {data.stunden * data.stundenpreis +
                    data.grundbetrag +
                    data.prüfung +
                    12 * data.sonderpreis}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
              a) Alina hat bereits{' '}
              {data.stunden * data.stundenpreis +
                data.grundbetrag +
                data.prüfung +
                12 * data.sonderpreis -
                data.month * data.sparen}{' '}
              € gespart. Sie kann jeden Monat weitere {data.month} € sparen.
            </p>
            <p>
              Wie viele Monate muss sie noch für den Führerschein sparen?
              Notiere deinen Rechenweg.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Bereche, wie viel Geld Alina noch fehlt um die Gesamtkosten zu
              bezahlen:
            </p>
            <p>
              {data.stunden * data.stundenpreis +
                data.grundbetrag +
                data.prüfung +
                12 * data.sonderpreis}{' '}
              −{' '}
              {data.stunden * data.stundenpreis +
                data.grundbetrag +
                data.prüfung +
                12 * data.sonderpreis -
                data.month * data.sparen}{' '}
              = {data.month * data.sparen} [€]
            </p>
            <p>
              Alina fehlen noch {data.month * data.sparen} €. Berechne, wie
              viele Monate sie darauf sparen muss:
            </p>
            <p>
              {data.month * data.sparen} : {data.month} ={' '}
              <strong>{data.sparen} Monate</strong>{' '}
            </p>
            <p>
              Alina muss noch <strong>{data.sparen} Monate</strong> sparen, um
              die Gesamtkosten bezahlen zu können.
            </p>
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
            <p>b) Berechne den Gesamtpreis für die Übungsstunden.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Jede Übungsstunde kostet {data.stundenpreis} €. Multipliziere den
              Preis mit der Anzahl der Stunden:
            </p>
            <p>
              {data.stunden} · {data.stundenpreis} ={' '}
              <strong>{data.stunden * data.stundenpreis} [€]</strong>
            </p>
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
        const listItems = [
          <li key="1">{richtig[data.item_1]}</li>,
          <li key="2">{falsch[data.item_2]}</li>,
          <li key="3">{falsch[data.item_3]}</li>,
        ]
        const shuffledItems = data.order.map(i => listItems[i])
        return (
          <>
            <p>
              c) Mit welcher Formel kann der Wert in Zelle D5 berechnet werden?
              Entscheide für jede Formel.
            </p>
            <ul>{shuffledItems}</ul>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Nur die Formel</p>
            <ul>
              <li>
                <strong>{richtig[data.item_1]}</strong>
              </li>
            </ul>
            <p>berechnet den Wert in D5. Die Formeln </p>
            <ul>
              <li>{falsch[data.item_2]}</li>
              <li>{falsch[data.item_3]}</li>
            </ul>
            <p>sind falsch.</p>
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
            <p>
              d) Alina vermutet, dass sie mehr als zehn Übungsstunden benötigt.
            </p>
            <p>
              Welche Werte ändern sich in der Tabellenkalkulation, wenn Alina
              mehr als zehn Übungsstunden benötigt? Gib alle Zellen an, deren
              Wert sich ändert.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Wenn Alina mehr Übungsstunden benötigt, ändern sich die Zellen:
            </p>
            <ul>
              <li>
                <strong>B4</strong>, die Anzahl der Übungsstunden
              </li>
              <li>
                <strong>D4</strong>, der Gesamtpreis der Übungsstunden
              </li>
              <li>
                <strong>D6</strong>, die Gesamtkosten insgesamt
              </li>
            </ul>
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
            <p>
              e) Alina nimmt an, dass sie {data.more_stunden} Übungsstunden
              benötigt.
            </p>
            <p>
              Bestimme die Gesamtkosten, die Alina für den Führerschein jetzt
              einplanen muss.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Verwende die Tabelle aus der Aufgabenstellung mit der neuen Anzahl
              von Übungsstunden:
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
                    <td className="py-1 border text-center font-bold p-1 text-black "></td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      Anzahl geplanter Fahrstunden
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      Einzelpreis in €
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      Gesamtpreis in €
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      2
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      Grundbetrag
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black"></td>
                    <td className="py-1 border text-center font-bold p-1  text-black"></td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      {data.grundbetrag}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      3
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      Prüfung
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black"></td>
                    <td className="py-1 border text-center font-bold p-1  text-black"></td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      {data.prüfung}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      4
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      Übungsstunden
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      <Color1>{data.more_stunden}</Color1>
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      <Color1>{data.stundenpreis}</Color1>
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      <Color1>{data.stundenpreis * data.more_stunden}</Color1>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      5
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      Sonderfahrten
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      12
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      {data.sonderpreis}
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      {12 * data.sonderpreis}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      6
                    </td>
                    <td className="py-1 border text-center font-bold p-1 text-black">
                      Gesamtkosten
                    </td>
                    <td className="py-1 border text-center font-bold p-1  text-black"></td>
                    <td className="py-1 border text-center font-bold p-1  text-black"></td>
                    <td className="py-1 border text-center font-bold p-1  text-black">
                      {data.grundbetrag +
                        data.prüfung +
                        12 * data.sonderpreis +
                        data.stundenpreis * data.more_stunden}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Dabei kannst du den Gesamtpreis der Übungsstunden berechnen mit:
            </p>
            <p>
              {data.more_stunden} · {data.stundenpreis} ={' '}
              {data.more_stunden * data.stundenpreis} [€]
            </p>
            <p>Berechne die Gesamtkosten aus den einzelnen Preisen:</p>
            <p>
              {data.grundbetrag} + {data.prüfung} +{' '}
              {data.more_stunden * data.stundenpreis} + {12 * data.sonderpreis}{' '}
              ={' '}
              <strong>
                {data.grundbetrag +
                  data.prüfung +
                  12 * data.sonderpreis +
                  data.stundenpreis * data.more_stunden}{' '}
                [€]
              </strong>
            </p>
          </>
        )
      },
    },
    {
      points: 42,
      intro({ data }) {
        return (
          <>
            <p>Die Fahrschule wirbt mit einem neuen Angebot (Abbildung 1).</p>
            <svg viewBox="0 0 328 110">
              <image
                href="/content/NRW_EESA/118_Führerschein.PNG"
                height="110"
                width="328"
              />
              <text
                x="160"
                y="80"
                fontSize="15"
                textAnchor="middle"
                fill="black"
              >
                {data.grundbetrag - data.rabatt} €
              </text>
              <text
                x="95"
                y="80"
                fontSize="15"
                textAnchor="middle"
                fill="black"
              >
                {data.grundbetrag} €
              </text>
              <text
                x="240"
                y="55"
                fontSize="15"
                textAnchor="middle"
                fill="black"
              >
                {pp(Math.round((100 * data.rabatt) / data.grundbetrag))}
              </text>
              <line
                x1={70}
                y1={85}
                x2={120}
                y2={65}
                stroke="black"
                strokeWidth={2}
              />
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 1: Angebot der Fahrschule
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
              f) Alina behauptet: {'"'}Ich spare damit etwa{' '}
              {pp(Math.round((100 * data.rabatt) / data.grundbetrag))} % der
              Gesamtkosten für meinen Führerschein.{'"'} Hat Alina recht?
            </p>

            <p>Begründe deine Entscheidung.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Alina hat <strong>nicht</strong> recht.
            </p>
            <p>
              Alina spart insgesamt {data.rabatt} €. Das entspricht zwar{' '}
              {pp(Math.round((100 * data.rabatt) / data.grundbetrag))} % vom
              Grundbetrag, jedoch nicht von den Gesamtkosten.{' '}
            </p>
          </>
        )
      },
    },
  ],
}
