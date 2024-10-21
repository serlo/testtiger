import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { buildEquation, buildFrac, buildSqrt } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  gewicht: number
  volumen: number
  dicke: number
  prob_1: number
  prob_2: number
  case: number
}

export const exercise18: Exercise<DATA> = {
  title: 'Rösti',
  source: '2022 Teil 2 Aufgabe 1',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    return {
      gewicht: rng.randomIntBetween(60, 100),
      volumen: rng.randomIntBetween(50, 90),
      dicke: rng.randomIntBetween(2, 4),
      prob_1: rng.randomIntBetween(95, 99),
      prob_2: rng.randomIntBetween(95, 99),
      case: rng.randomIntBetween(1, 3),
    }
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return <></>
  },
  tasks: [
    {
      points: 2,
      duration: 5,
      task({ data }) {
        return (
          <>
            <p>
              Ein Unternehmen stellt nach eigenem Rezept aus Kartoffeln
              sogenannte Rösti her (Abbildung 1 und 2). Dazu wird der Teig in
              eine zylindrische Form gegossen (Abbildung 3) und anschließend
              gebacken. Für ein Rösti benötigt man {data.gewicht} g Teig.
            </p>
            <svg viewBox="0 0 700 430">
              <image
                href="/content/NRW_MSA_rösti.jpg"
                height="500"
                width="700"
              />
            </svg>
            <p>Abbildung 1: Rösti</p>
            <svg viewBox="0 0 700 450">
              <image
                href="/content/NRW_MSA_röstirezept.png"
                height="500"
                width="700"
              />
            </svg>
            <p>Abbildung 2: Rezept für Rösti-Teig</p>
            <svg viewBox="0 0 700 500">
              <image href="/content/NRW_MSA_zyl.jpg" height="500" width="700" />
            </svg>
            <p>Abbildung 3: zylindrische Form</p>
            <p>
              {' '}
              a) Zeige rechnerisch, dass aus der Teigmenge eines Rezeptes{' '}
              {Math.floor(710 / data.gewicht)} Rösti hergestellt werden können
              (Abbildung 2).
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Bestimme, wie viel der Teig eines Rezeptes wiegt, indem du die
              Masse aller einzelner Zutaten addierst:
            </p>
            <p>
              M<sub>ges</sub> = 520 g + 60 g + 110 g + 20 g = 710 g
            </p>
            <p>
              Teile die Gesamtmasse des Teigs 710 g durch die Teigmasse, die man
              für ein Rösti braucht:
            </p>
            <p>
              710 : {data.gewicht} = {pp(roundToDigits(710 / data.gewicht, 2))}
            </p>
            <p>
              Das entspricht{' '}
              {!Number.isInteger(710 / data.gewicht)
                ? 'etwas mehr als ' + Math.floor(710 / data.gewicht) + ' Rösti.'
                : 'genau ' + Math.floor(710 / data.gewicht) + ' Rösti.'}
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>b) 100 g Teig haben ein Volumen von {data.volumen} cm³.</p>
            <p>Berechne, wie viel Gramm ein Kubikzentimeter Teig wiegt.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>{data.volumen} cm³ entsprechen 100 g Teig:</p>
            {buildEquation([
              [<>{pp(data.volumen)} cm³</>, '≙', '100 g'],
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
                    <span style={{ fontSize: 'small' }}>: {data.volumen}</span>
                  </Color4>
                </>,
              ],
              ['1 cm³', '≙', <>{pp(roundToDigits(100 / data.volumen, 2))} g</>],
            ])}

            <p>
              Ein Kubikzentimeter wiegt also{' '}
              <b>{pp(roundToDigits(100 / data.volumen, 2))} g</b>.
            </p>
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
              c) Ein Rösti soll {data.dicke} cm dick sein und ein Volumen von{' '}
              {data.volumen} cm³ haben.
            </p>
            <p>
              Zeige, dass die zylindrische Form einen Durchmesser von ca.{' '}
              {pp(
                roundToDigits(
                  2 * Math.sqrt(data.volumen / (data.dicke * Math.PI)),
                  2,
                ),
              )}{' '}
              cm haben muss.
            </p>
          </>
        )
      },
      solution({ data }) {
        const r = roundToDigits(
          Math.sqrt(data.volumen / (data.dicke * Math.PI)),
          2,
        )
        return (
          <>
            <p>
              Das Volumen des zylinderförmigen Röstis wird berechnet mit der
              Formel:
            </p>
            <p>
              V<sub>Zylinder</sub> = r² · π · h
            </p>
            <p>
              Dabei sind r der Radius und h die Höhe des Zylinders.<br></br>
            </p>
            <p>Setze die Werte ein und berechne den Radius r:</p>
            <p>
              {data.volumen} = r² · {data.dicke}π
            </p>
            <p>
              {data.volumen} : {data.dicke}π = r²{' '}
            </p>
            <p>r = {buildSqrt(data.volumen + 'cm² : ' + data.dicke + 'π')}</p>
            <p>r = {pp(r)} cm</p>
            <p>Berechne den Durchmesser, in dem du den Radius verdoppelst:</p>
            <p>d = 2 · r = {pp(2 * r)} cm</p>
            <p>Der Durchmesser beträgt {pp(2 * r)} cm.</p>
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
              d) Das Unternehmen möchte zusätzlich Mini-Rösti herstellen. Ein
              Mini-Rösti soll auch {data.dicke} cm dick sein, aber nur das halbe
              Volumen haben. Ein Mitarbeiter behauptet: „Für ein Mini-Rösti
              brauchen wir eine Form mit {data.case == 1 && 'halbem'}
              {data.case == 2 && 'viertel'}
              {data.case == 3 && 'doppeltem'} Durchmesser!“ Hat er recht?{' '}
            </p>
            <p>Begründe deine Entscheidung.</p>
          </>
        )
      },
      solution({ data }) {
        const d = Math.sqrt(data.volumen / (data.dicke * Math.PI)) * 2
        return (
          <>
            <p>Berechne zuerst das Volumen des Mini-Röstis:</p>
            <p>
              {data.volumen} cm³ : 2 = {pp(data.volumen / 2)} cm³
            </p>
            <p>
              Das Mini-Rösti hat ein Volumen von {pp(data.volumen / 2)} cm³.
              <br></br>Vergleiche mit dem Volumen eines Zylinders mit{' '}
              {data.case == 1 && 'halbem '}
              {data.case == 2 && 'viertel '}
              {data.case == 3 && 'doppeltem '}
              Durchmesser d = {data.case == 1 && pp(roundToDigits(d / 2, 2))}
              {data.case == 2 && pp(roundToDigits(d / 4, 2))}
              {data.case == 3 && pp(roundToDigits(2 * d, 2))} cm:
            </p>

            <p>
              V<sub>Zylinder</sub> = r² · π · h
            </p>
            <p>
              V<sub>Zylinder</sub> = (
              {data.case == 1 && pp(roundToDigits(d / 4, 2))}
              {data.case == 2 && pp(roundToDigits(d / 8, 2))}
              {data.case == 3 && pp(roundToDigits(d, 2))} cm)² · π ·{' '}
              {data.dicke} cm
            </p>
            <p>
              V<sub>Zylinder</sub> ={' '}
              {data.case == 1 &&
                pp(roundToDigits(Math.pow(d / 4, 2) * Math.PI * data.dicke, 2))}
              {data.case == 2 &&
                pp(roundToDigits(Math.pow(d / 8, 2) * Math.PI * data.dicke, 2))}
              {data.case == 3 &&
                pp(
                  roundToDigits(Math.pow(d, 2) * Math.PI * data.dicke, 2),
                )}{' '}
              cm³
            </p>
            <p>
              Das Volumen eines Zylinders mit {data.case == 1 && 'halbem '}
              {data.case == 2 && 'viertel '}
              {data.case == 3 && 'doppeltem '} Durchmesser beträgt{' '}
              {data.case == 1 &&
                pp(roundToDigits(Math.pow(d / 4, 2) * Math.PI * data.dicke, 2))}
              {data.case == 2 &&
                pp(roundToDigits(Math.pow(d / 8, 2) * Math.PI * data.dicke, 2))}
              {data.case == 3 &&
                pp(
                  roundToDigits(Math.pow(d, 2) * Math.PI * data.dicke, 2),
                )}{' '}
              cm³. Das ist ein {data.case == 1 && 'Viertel '}
              {data.case == 2 && 'Sechzehntel '}
              {data.case == 3 && 'Vierfaches '} des Volumens des normalen
              Röstis. Also ist die Aussage{' '}
              <strong>
                {data.case == 1 && 'falsch'}
                {data.case == 2 && 'falsch'}
                {data.case == 3 && 'falsch'}
              </strong>
              .
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>
              e) Bevor die Rösti verpackt werden, wird zuerst das Gewicht und
              dann das Aussehen kontrolliert. Alle Rösti, deren Gewicht oder
              deren Aussehen nicht der Vorgabe entsprechen, werden aussortiert.
              Das Baumdiagramm zeigt die Anteile. Die Anteile werden im
              Folgenden als Wahrscheinlichkeiten gedeutet.
            </p>
            <svg viewBox="0 0 700 430">
              <image
                href="/content/NRW_MSA_Baumdiagramm_2.png"
                height="350"
                width="700"
              />
              <text
                x={35}
                y={150}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {data.prob_1} %
              </text>
              <text
                x={350}
                y={90}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {data.prob_2} %
              </text>
            </svg>
            <p>Ergänze die fehlenden Angaben im Baumdiagramm.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die Pfade im Baumdiagramm, die aus einem gemeinsamen Punkt kommen,
              ergeben zusammen immer 100 %.
            </p>
            <svg viewBox="0 0 700 430">
              <image
                href="/content/NRW_MSA_Baumdiagramm_2.png"
                height="350"
                width="700"
              />
              <text
                x={35}
                y={150}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {data.prob_1} %
              </text>
              <text
                x={350}
                y={90}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {data.prob_2} %
              </text>
              <text
                x={33}
                y={280}
                fontSize={30}
                textAnchor="right"
                stroke="green"
              >
                {100 - data.prob_1} %
              </text>
              <text
                x={353}
                y={200}
                fontSize={30}
                textAnchor="right"
                stroke="green"
              >
                {100 - data.prob_2} %
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
              f) Berechne, wie viel Prozent der Rösti insgesamt den Vorgaben
              entsprechen.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Der Pfad im Baumdiagramm, der das Ereignis &quot;Beide Vorgaben
              werden eingehalten&quot; beschreibt, ist der oberste.
            </p>
            <p>
              Die Wahrscheinlichkeit dieses Pfades berechnest du mit der
              Produktregel:
            </p>
            <p>
              P(&quot;Beide Vorgaben werden eingehalten&quot;) ={' '}
              {pp(data.prob_1 / 100)} · {pp(data.prob_2 / 100)} ={' '}
              {pp(roundToDigits(((data.prob_1 / 100) * data.prob_2) / 100, 4))}
            </p>
            <p>
              Damit beträgt die Wahrscheinlichkeit{' '}
              <strong>
                {pp(roundToDigits((data.prob_1 / 100) * data.prob_2, 4))} %
              </strong>
              , dass beide Vorgaben eingehalten werden.
            </p>
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
              g) Das Unternehmen kontrolliert an einem Tag 10000 Rösti. Wie
              viele Rösti werden vermutlich aussortiert, weil sie nicht den
              Vorgaben entsprechen? Notiere deine Rechnung.
            </p>
          </>
        )
      },
      solution({ data }) {
        const p = ((data.prob_1 / 100) * data.prob_2) / 100
        return (
          <>
            <p>
              <strong>Röstis, die den Vorgaben entsprechen</strong>
            </p>
            <p>
              Bei {pp(roundToDigits(p * 100, 2))} % der Röstis werden die
              Vorgaben eingehalten. Berechne die Anzahl der Röstis, die den
              Vorgaben entsprechen, mit der Formel für den Prozentwert:
            </p>
            {buildEquation([
              ['W', '=', 'G · p'],
              ['', '=', <>10000 · {pp(roundToDigits(p, 4))}</>],
              ['', '=', <>{pp(Math.round(p * 10000))}</>],
            ])}
            <p>
              <strong>Aussortierte Röstis</strong>
            </p>
            <p>Die aussortierten Röstis betragen demnach:</p>
            <p>
              10000 − {pp(Math.round(p * 10000))} ={' '}
              {10000 - Math.round(p * 10000)}
            </p>
            <p>
              <strong>{10000 - Math.round(p * 10000)} Röstis</strong> werden
              erwartungsgemäß aussortiert, weil sie den Vorgaben nicht
              entsprechen.
            </p>
          </>
        )
      },
    },
  ],
}
