import { Exercise } from '@/data/types'
import { buildSqrt } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  gewicht: number
  volumen: number
  dicke: number
  prob_1: number
  prob_2: number
}

export const exercise18: Exercise<DATA> = {
  title: '2022 Prüfungsteil 2 /1) Rösti',
  useCalculator: false,
  duration: 10,
  generator(rng) {
    return {
      gewicht: rng.randomIntBetween(60, 100),
      volumen: rng.randomIntBetween(50, 90),
      dicke: rng.randomIntBetween(2, 4),
      prob_1: rng.randomIntBetween(95, 99),
      prob_2: rng.randomIntBetween(95, 99),
    }
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
  subtasks: {
    intro: ({ data }) => {
      return <></>
    },
    tasks: [
      ({ data }) => {
        return (
          <>
            <p>
              Ein Unternehmen stellt nach eigenem Rezept aus Kartoffeln
              sogenannte Rösti her (Abbildung 1 und 2). Dazu wird der Teig in
              eine zylindrische Form gegossen (Abbildung 3) und anschließend
              gebacken. Für ein Rösti benötigt man {data.gewicht} g Teig.
            </p>
            <svg viewBox="0 0 700 430" className="h-[250px]">
              <image
                href="/content/NRW_MSA_rösti.jpg"
                height="500"
                width="700"
              />
            </svg>
            <p>Abbildung 1: Rösti</p>
            <svg viewBox="0 0 700 450" className="h-[180px]">
              <image
                href="/content/NRW_MSA_röstirezept.png"
                height="500"
                width="700"
              />
            </svg>
            <p>Abbildung 2: Rezept für Rösti-Teig</p>
            <svg viewBox="0 0 700 500" className="h-[180px]">
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

      ({ data }) => {
        return (
          <>
            <p>b) 100 g Teig haben ein Volumen von {data.volumen} cm³.</p>
            <p>Berechne, wie viel Gramm ein Kubikzentimeter Teig wiegt.</p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              c) Ein Rösti soll {data.dicke} cm dick sein und ein Volumen von{' '}
              {data.volumen} cm³ haben.
            </p>
            <p>
              Zeige, dass die zylindrische Form einen Durchmesser von ca.{' '}
              {pp(
                Math.round(
                  2 * Math.sqrt(data.volumen / (data.dicke * Math.PI)) * 100,
                ) / 100,
              )}{' '}
              cm haben muss.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              d) Das Unternehmen möchte zusätzlich Mini-Rösti herstellen. Ein
              Mini-Rösti soll auch {data.dicke} cm dick sein, aber nur das halbe
              Volumen haben. Ein Mitarbeiter behauptet: „Für ein Mini-Rösti
              brauchen wir eine Form mit halbem Durchmesser!“ Hat er recht?{' '}
            </p>
            <p>Begründe deine Entscheidung.</p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              e) Bevor die Rösti verpackt werden, wird zuerst das Gewicht und
              dann das Aussehen kontrolliert. Alle Rösti, deren Gewicht oder
              deren Aussehen nicht der Vorgabe entsprechen, werden aussortiert.
              Das Baumdiagramm zeigt die Anteile. Die Anteile werden im
              Folgenden als Wahrscheinlichkeiten gedeutet.
            </p>
            <svg viewBox="0 0 700 430" className="h-[250px]">
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
      ({ data }) => {
        return (
          <>
            <p>
              f) Berechne, wie viel Prozent der Rösti insgesamt den Vorgaben
              entsprechen.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            g) Das Unternehmen kontrolliert an einem Tag 10000 Rösti. Wie viele
            Rösti werden vermutlich aussortiert, weil sie nicht den Vorgaben
            entsprechen? Notiere deine Rechnung.
          </>
        )
      },
    ],
    solutions: [
      ({ data }) => {
        return (
          <>
            <p>
              Bestimme, wie viel der Teig eines Rezepts wiegt, indem du die
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
              710 : {data.gewicht} ={' '}
              {pp(Math.round((710 / data.gewicht) * 100) / 100)}
            </p>
            <p>
              Das entspricht{' '}
              {pp(710 / data.gewicht).includes(',') == true
                ? 'etwas mehr als ' + Math.floor(710 / data.gewicht) + ' Rösti.'
                : 'genau ' + Math.floor(710 / data.gewicht) + ' Rösti.'}
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>{data.volumen} cm³ entsprechen 100 g Teig.</p>
            <p>
              Berechne mit dem Dreisatz, wie viel 1 cm³ wiegt:<br></br>
            </p>
            <p>
              1 cm³ = 100 : {data.volumen} g ={' '}
              {pp(Math.round((100 / data.volumen) * 100) / 100)} g
            </p>
            <p>
              Ein Kubikzentimeter wiegt also{' '}
              {pp(Math.round((100 / data.volumen) * 100) / 100)} g.
            </p>
          </>
        )
      },
      ({ data }) => {
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
            <p>r = {buildSqrt(data.volumen + ': ' + data.dicke + 'π')}</p>
            <p>
              r ={' '}
              {pp(
                Math.round(
                  100 * Math.sqrt(data.volumen / (data.dicke * Math.PI)),
                ) / 100,
              )}
            </p>
            <p>Berechne den Durchmesser, in dem du den Radius verdoppelst:</p>
            <p>
              d = 2 · r ={' '}
              {pp(
                Math.round(
                  2 * Math.sqrt(data.volumen / (data.dicke * Math.PI)) * 100,
                ) / 100,
              )}
            </p>
            <p>
              Der Durchmesser beträgt{' '}
              {pp(
                Math.round(
                  2 * Math.sqrt(data.volumen / (data.dicke * Math.PI)) * 100,
                ) / 100,
              )}{' '}
              cm.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>Berechne zuerst das Volumen des Mini-Röstis:</p>
            <p>
              {data.volumen} : 2 = {pp(data.volumen / 2)}
            </p>
            <p>
              Das Mini-Rösti hat ein Volumen von {pp(data.volumen / 2)} cm³.
              <br></br>Vergleiche mit dem Volumen eines Zylinders mit halbem
              Durchmesser d ={' '}
              {pp(
                Math.round(
                  Math.sqrt(data.volumen / (data.dicke * Math.PI)) * 100,
                ) / 100,
              )}{' '}
              cm:
            </p>

            <p>
              V<sub>Zylinder</sub> = r² · π · h
            </p>
            <p>
              V<sub>Zylinder</sub> ={' '}
              {pp(
                Math.round(
                  Math.sqrt(data.volumen / (data.dicke * Math.PI)) * 50,
                ) / 100,
              )}
              ² · π · {data.dicke}
            </p>
            <p>
              V<sub>Zylinder</sub> ={' '}
              {pp(
                Math.round(
                  Math.pow(
                    Math.sqrt(data.volumen / (data.dicke * Math.PI)) / 2,
                    2,
                  ) *
                    Math.PI *
                    data.dicke *
                    100,
                ) / 100,
              )}
            </p>
            <p>
              Das Volumen eines Zylinders mit halbem Durchmesser beträgt{' '}
              {pp(
                Math.round(
                  Math.pow(
                    Math.sqrt(data.volumen / (data.dicke * Math.PI)) / 2,
                    2,
                  ) *
                    Math.PI *
                    data.dicke *
                    100,
                ) / 100,
              )}{' '}
              cm³. Die Aussage stimmt <strong>nicht</strong>.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              Die Pfade im Baumdiagramm, die aus einem gemeinsamen Punkt kommen,
              ergeben zusammen immer 100 %.
            </p>
            <svg viewBox="0 0 700 430" className="h-[250px]">
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
      ({ data }) => {
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
              {pp(
                Math.round(
                  (((data.prob_1 / 100) * data.prob_2) / 100) * 10000,
                ) / 10000,
              )}
            </p>
            <p>
              Damit beträgt die Wahrscheinlichkeit{' '}
              {pp(
                Math.round(
                  (((data.prob_1 / 100) * data.prob_2) / 100) * 10000,
                ) / 100,
              )}{' '}
              %, dass beide Vorgaben eingehalten werden.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              Bei{' '}
              {pp(
                Math.round(
                  (((data.prob_1 / 100) * data.prob_2) / 100) * 10000,
                ) / 100,
              )}{' '}
              % der Röstis werden die Vorgaben eingehalten. Die Anzahl beträgt:
            </p>
            <p>
              10000 ·{' '}
              {pp(
                Math.round(
                  (((data.prob_1 / 100) * data.prob_2) / 100) * 10000,
                ) / 10000,
              )}{' '}
              ={' '}
              {pp(
                Math.round((((data.prob_1 / 100) * data.prob_2) / 100) * 10000),
              )}
            </p>
            <p>Die aussortierten Röstis betragen demnach:</p>
            <p>
              10000 −{' '}
              {pp(
                Math.round((((data.prob_1 / 100) * data.prob_2) / 100) * 10000),
              )}{' '}
              ={' '}
              {10000 -
                Math.round((((data.prob_1 / 100) * data.prob_2) / 100) * 10000)}
            </p>
            <p>
              {10000 -
                Math.round(
                  (((data.prob_1 / 100) * data.prob_2) / 100) * 10000,
                )}{' '}
              Röstis werden erwartungsgemäßg aussortiert, weil sie den Vorgaben
              nicht entsprechen.
            </p>
          </>
        )
      },
    ],
  },
}
