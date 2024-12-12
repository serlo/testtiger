import { Exercise } from '@/data/types'

interface DATA {
  frau1: number
  frau2: number
  frau3: number
  frau4: number
  frau5: number
  frau6: number
  frau7: number
  frau8: number
  frau9: number
  frau10: number
  frau11: number
  frau12: number
  frau13: number
  frau14: number
  frau15: number
  frau16: number
  frau17: number
  frau18: number
  frau19: number
  frau20: number
  frau21: number
  frau22: number
  frau23: number
  frau24: number
  frau25: number
  mann1: number
  mann2: number
  mann3: number
  mann4: number
  mann5: number
  mann6: number
  mann7: number
  mann8: number
  mann9: number
  mann10: number
  mann11: number
  mann12: number
  mann13: number
  mann14: number
  mann15: number
  mann16: number
  mann17: number
  mann18: number
  mann19: number
  mann20: number
  mann21: number
  mann22: number
  mann23: number
  mann24: number
  mann25: number
}

export const exercise263: Exercise<DATA> = {
  title: 'Boxplots',
  source: '2021 Pflichtteil A2 - Aufgabe 6',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      frau1: rng.randomIntBetween(4, 6),
      frau2: rng.randomIntBetween(4, 6),
      frau3: rng.randomIntBetween(4, 6),
      frau4: rng.randomIntBetween(4, 6),
      frau5: rng.randomIntBetween(4, 6),
      frau6: rng.randomIntBetween(7, 9),
      frau7: rng.randomIntBetween(7, 9),
      frau8: rng.randomIntBetween(7, 9),
      frau9: rng.randomIntBetween(7, 9),
      frau10: rng.randomIntBetween(1, 2),
      frau11: rng.randomIntBetween(1, 2),
      frau12: rng.randomIntBetween(15, 16),
      frau13: rng.randomIntBetween(15, 16),
      frau14: rng.randomIntBetween(15, 16),
      frau15: rng.randomIntBetween(3, 4),
      frau16: rng.randomIntBetween(3, 4),
      frau17: rng.randomIntBetween(3, 4),
      frau18: rng.randomIntBetween(3, 4),
      frau19: rng.randomIntBetween(3, 4),
      frau20: rng.randomIntBetween(10, 14),
      frau21: rng.randomIntBetween(10, 14),
      frau22: rng.randomIntBetween(10, 14),
      frau23: rng.randomIntBetween(10, 14),
      frau24: rng.randomIntBetween(10, 14),
      frau25: rng.randomIntBetween(15, 16),
      mann1: rng.randomIntBetween(1, 3),
      mann2: rng.randomIntBetween(1, 3),
      mann3: rng.randomIntBetween(1, 2),
      mann4: rng.randomIntBetween(1, 2),
      mann5: rng.randomIntBetween(1, 3),
      mann6: rng.randomIntBetween(5, 7),
      mann7: rng.randomIntBetween(5, 7),
      mann8: rng.randomIntBetween(4, 5),
      mann9: rng.randomIntBetween(4, 5),
      mann10: rng.randomIntBetween(8, 10),
      mann11: rng.randomIntBetween(8, 10),
      mann12: rng.randomIntBetween(8, 10),
      mann13: rng.randomIntBetween(8, 10),
      mann14: rng.randomIntBetween(8, 10),
      mann15: rng.randomIntBetween(11, 13),
      mann16: rng.randomIntBetween(11, 13),
      mann17: rng.randomIntBetween(2, 3),
      mann18: rng.randomIntBetween(11, 13),
      mann19: rng.randomIntBetween(11, 13),
      mann20: rng.randomIntBetween(14, 16),
      mann21: rng.randomIntBetween(4, 6),
      mann22: rng.randomIntBetween(4, 7),
      mann23: rng.randomIntBetween(4, 6),
      mann24: rng.randomIntBetween(14, 16),
      mann25: rng.randomIntBetween(14, 16),
    }
  },
  originalData: {
    frau1: 1,
    frau2: 2,
    frau3: 2,
    frau4: 3,
    frau5: 3,
    frau6: 3,
    frau7: 3,
    frau8: 4,
    frau9: 5,
    frau10: 5,
    frau11: 5,
    frau12: 6,
    frau13: 7,
    frau14: 7,
    frau15: 7,
    frau16: 7,
    frau17: 7,
    frau18: 8,
    frau19: 8,
    frau20: 8,
    frau21: 10,
    frau22: 10,
    frau23: 12,
    frau24: 14,
    frau25: 16,
    mann1: 1,
    mann2: 1,
    mann3: 2,
    mann4: 2,
    mann5: 3,
    mann6: 3,
    mann7: 3,
    mann8: 4,
    mann9: 5,
    mann10: 5,
    mann11: 6,
    mann12: 6,
    mann13: 7,
    mann14: 7,
    mann15: 7,
    mann16: 8,
    mann17: 8,
    mann18: 8,
    mann19: 9,
    mann20: 9,
    mann21: 11,
    mann22: 13,
    mann23: 13,
    mann24: 15,
    mann25: 16,
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    const frauen = [
      data.frau1,
      data.frau2,
      data.frau3,
      data.frau4,
      data.frau5,
      data.frau6,
      data.frau7,
      data.frau8,
      data.frau9,
      data.frau10,
      data.frau11,
      data.frau12,
      data.frau13,
      data.frau14,
      data.frau15,
      data.frau16,
      data.frau17,
      data.frau18,
      data.frau19,
      data.frau20,
      data.frau21,
      data.frau22,
      data.frau23,
      data.frau24,
      data.frau25,
    ]
    const männer = [
      data.mann1,
      data.mann2,
      data.mann3,
      data.mann4,
      data.mann5,
      data.mann6,
      data.mann7,
      data.mann8,
      data.mann9,
      data.mann10,
      data.mann11,
      data.mann12,
      data.mann13,
      data.mann14,
      data.mann15,
      data.mann16,
      data.mann17,
      data.mann18,
      data.mann19,
      data.mann20,
      data.mann21,
      data.mann22,
      data.mann23,
      data.mann24,
      data.mann25,
    ]
    const frauen1 = frauen.filter(element => element === 1).length
    const frauen2 = frauen.filter(element => element === 2).length
    const frauen3 = frauen.filter(element => element === 3).length
    const frauen4 = frauen.filter(element => element === 4).length
    const frauen5 = frauen.filter(element => element === 5).length
    const frauen6 = frauen.filter(element => element === 6).length
    const frauen7 = frauen.filter(element => element === 7).length
    const frauen8 = frauen.filter(element => element === 8).length
    const frauen9 = frauen.filter(element => element === 9).length
    const frauen10 = frauen.filter(element => element === 10).length
    const frauen11 = frauen.filter(element => element === 11).length
    const frauen12 = frauen.filter(element => element === 12).length
    const frauen13 = frauen.filter(element => element === 13).length
    const frauen14 = frauen.filter(element => element === 14).length
    const frauen15 = frauen.filter(element => element === 15).length
    const frauen16 = frauen.filter(element => element === 16).length

    const männer1 = männer.filter(element => element === 1).length
    const männer2 = männer.filter(element => element === 2).length
    const männer3 = männer.filter(element => element === 3).length
    const männer4 = männer.filter(element => element === 4).length
    const männer5 = männer.filter(element => element === 5).length
    const männer6 = männer.filter(element => element === 6).length
    const männer7 = männer.filter(element => element === 7).length
    const männer8 = männer.filter(element => element === 8).length
    const männer9 = männer.filter(element => element === 9).length
    const männer10 = männer.filter(element => element === 10).length
    const männer11 = männer.filter(element => element === 11).length
    const männer12 = männer.filter(element => element === 12).length
    const männer13 = männer.filter(element => element === 13).length
    const männer14 = männer.filter(element => element === 14).length
    const männer15 = männer.filter(element => element === 15).length
    const männer16 = männer.filter(element => element === 16).length

    function toX(n: number) {
      return 46 + (n * 233) / 19
    }
    function toY(n: number) {
      return (n * 112.5) / 5
    }
    return (
      <>
        <p>
          Im Rahmen einer Umfrage wurden 25 Männer und 25 Frauen getrennt
          voneinander befragt, wie viele Stunden sie pro Woche lesen. Die
          Ergebnisse dieser Befragungen sind in den beiden Boxplots dargestellt.
        </p>
        <svg viewBox="0 0 328 110">
          <image
            href="/content/BW_Realschule/263_Boxplot.jpg"
            height="110"
            width="328"
          />
          <line
            x1={toX(männer.sort((a, b) => a - b)[0])}
            y1={10}
            x2={toX(männer.sort((a, b) => a - b)[0])}
            y2={30}
            stroke="blue"
            strokeWidth={2}
          />
          <line
            x1={toX(männer.sort((a, b) => a - b)[24])}
            y1={10}
            x2={toX(männer.sort((a, b) => a - b)[24])}
            y2={30}
            stroke="blue"
            strokeWidth={2}
          />
          <line
            x1={toX(männer.sort((a, b) => a - b)[0])}
            y1={20}
            x2={toX(männer.sort((a, b) => a - b)[24])}
            y2={20}
            stroke="blue"
            strokeWidth={1}
          />
          <rect
            x={toX(männer.sort((a, b) => a - b)[5])}
            y={10}
            width={
              toX(männer.sort((a, b) => a - b)[18]) -
              toX(männer.sort((a, b) => a - b)[5])
            }
            height={20}
            fill="lightblue"
            stroke="blue"
          />
          <line
            x1={toX(
              (männer.sort((a, b) => a - b)[11] +
                männer.sort((a, b) => a - b)[12]) /
                2,
            )}
            y1={10}
            x2={toX(
              (männer.sort((a, b) => a - b)[11] +
                männer.sort((a, b) => a - b)[12]) /
                2,
            )}
            y2={30}
            stroke="blue"
            strokeWidth={2}
          />
          <line
            x1={toX(frauen.sort((a, b) => a - b)[0])}
            y1={80}
            x2={toX(frauen.sort((a, b) => a - b)[0])}
            y2={100}
            stroke="blue"
            strokeWidth={2}
          />
          <line
            x1={toX(frauen.sort((a, b) => a - b)[24])}
            y1={80}
            x2={toX(frauen.sort((a, b) => a - b)[24])}
            y2={100}
            stroke="blue"
            strokeWidth={2}
          />
          <line
            x1={toX(frauen.sort((a, b) => a - b)[0])}
            y1={90}
            x2={toX(frauen.sort((a, b) => a - b)[24])}
            y2={90}
            stroke="blue"
            strokeWidth={1}
          />
          <rect
            x={toX(frauen.sort((a, b) => a - b)[5])}
            y={80}
            width={
              toX(frauen.sort((a, b) => a - b)[18]) -
              toX(frauen.sort((a, b) => a - b)[5])
            }
            height={20}
            fill="lightblue"
            stroke="blue"
          />
          <line
            x1={toX(
              (frauen.sort((a, b) => a - b)[11] +
                frauen.sort((a, b) => a - b)[12]) /
                2,
            )}
            y1={80}
            x2={toX(
              (frauen.sort((a, b) => a - b)[11] +
                frauen.sort((a, b) => a - b)[12]) /
                2,
            )}
            y2={100}
            stroke="blue"
            strokeWidth={2}
          />
        </svg>
        <p>
          Außerdem sind die Ergebnisse der Befragungen in den beiden
          Säulendiagrammen abgebildet, wobei eines der Diagramme unvollständig
          ist.{' '}
        </p>
        <svg viewBox="0 0 328 150">
          <image
            href="/content/BW_Realschule/263_Diagramm.jpg"
            height="150"
            width="328"
          />

          <rect
            x={60}
            y={120 - toY(frauen1)}
            width="10"
            height={toY(frauen1)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={72}
            y={120 - toY(frauen2)}
            width="10"
            height={toY(frauen2)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={84.5}
            y={120 - toY(frauen3)}
            width="10"
            height={toY(frauen3)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={97}
            y={120 - toY(frauen4)}
            width="10"
            height={toY(frauen4)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={110}
            y={120 - toY(frauen5)}
            width="10"
            height={toY(frauen5)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={123}
            y={120 - toY(frauen6)}
            width="10"
            height={toY(frauen6)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={135.5}
            y={120 - toY(frauen7)}
            width="10"
            height={toY(frauen7)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={147.5}
            y={120 - toY(frauen8)}
            width="10"
            height={toY(frauen8)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={159.5}
            y={120 - toY(frauen9)}
            width="10"
            height={toY(frauen9)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={175}
            y={120 - toY(frauen10)}
            width="10"
            height={toY(frauen10)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={190.5}
            y={120 - toY(frauen11)}
            width="10"
            height={toY(frauen11)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={208}
            y={120 - toY(frauen12)}
            width="10"
            height={toY(frauen12)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={226}
            y={120 - toY(frauen13)}
            width="10"
            height={toY(frauen13)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={244}
            y={120 - toY(frauen14)}
            width="10"
            height={toY(frauen14)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={261}
            y={120 - toY(frauen15)}
            width="10"
            height={toY(frauen15)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={279.5}
            y={120 - toY(frauen16)}
            width="10"
            height={toY(frauen16)}
            fill="gray"
            stroke="black"
          />
        </svg>
        <svg viewBox="0 0 328 150">
          <image
            href="/content/BW_Realschule/263_Diagramm.jpg"
            height="150"
            width="328"
          />
          <rect
            x={60}
            y={120 - toY(männer1)}
            width="10"
            height={toY(männer1)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={72}
            y={120 - toY(männer2)}
            width="10"
            height={toY(männer2)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={84.5}
            y={120 - toY(männer3)}
            width="10"
            height={toY(männer3)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={97}
            y={120 - toY(männer4)}
            width="10"
            height={toY(männer4)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={110}
            y={120 - toY(männer5)}
            width="10"
            height={toY(männer5)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={123}
            y={120 - toY(männer6)}
            width="10"
            height={toY(männer6)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={135.5}
            y={120 - toY(männer7)}
            width="10"
            height={toY(männer7)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={147.5}
            y={120 - toY(männer8)}
            width="10"
            height={toY(männer8)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={159.5}
            y={120 - toY(männer9)}
            width="10"
            height={toY(männer9)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={175}
            y={120 - toY(männer10)}
            width="10"
            height={toY(männer10)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={190.5}
            y={120 - toY(männer11)}
            width="10"
            height={toY(männer11)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={208}
            y={120 - toY(männer12)}
            width="10"
            height={toY(männer12)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={226}
            y={120 - toY(männer13)}
            width="10"
            height={toY(männer13)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={244}
            y={120 - toY(männer14)}
            width="10"
            height={toY(männer14)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={261}
            y={120 - toY(männer15)}
            width="10"
            height={toY(männer15)}
            fill="gray"
            stroke="black"
          />
          <rect
            x={279.5}
            y={120 - toY(männer16)}
            width="10"
            height={toY(männer16)}
            fill="gray"
            stroke="black"
          />
        </svg>
        <ul>
          <li>
            Welcher Boxplot gehört zum vollständigen Diagramm? Begründe mithilfe
            der Kennwerte.
          </li>
        </ul>
        <p>
          Der andere Boxplot gehört zum unvollständigen Diagramm. Hier fehlen
          Säulen von 8 bis 16 Stunden Lesezeit.
        </p>
        <ul>
          <li>
            Ergänze mögliche Säulen im Diagramm für die Werte von 8 bis 16
            Stunden Lesezeit mithilfe des zugehörigen Boxplots.
          </li>
        </ul>
        <p>
          Finn behauptet: {'"'}Über die Hälfte der Männer liest 7 Stunden oder
          mehr pro Woche.{'"'}{' '}
        </p>
        <ul>
          <li>Hat Finn recht? Begründe.</li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
