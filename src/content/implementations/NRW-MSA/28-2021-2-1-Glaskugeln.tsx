import { Exercise } from '@/data/types'
import { Color1, Color2 } from '@/helper/colors'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  dia: number
  paint: number
  control: number
  error_1: number
  error_2: number
  case: number
}

export const exercise28: Exercise<DATA> = {
  title: 'Glaskugeln',
  source: '2021 Teil 2 Aufgabe 1',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    return {
      dia: rng.randomIntBetween(6, 10),
      paint: rng.randomIntBetween(8, 12),
      control: rng.randomIntBetween(16, 24) * 100,
      error_1: rng.randomIntBetween(95, 99),
      error_2: rng.randomIntBetween(95, 99),
      case: rng.randomIntBetween(1, 3),
    }
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>Ein Unternehmen stellt lackierte Glaskugeln her (Abbildung 1).</p>
        <p>Die Glaskugeln haben einen Durchmesser von {data.dia} cm.</p>
        <img src="/content/NRW_MSA_Glaskugeln.jpg" alt="" />
        <p>Abbildung 1: Glaskugel</p>
      </>
    )
  },
  tasks: [
    {
      points: 3,
      task({ data }) {
        return (
          <>
            <p>a) Berechne das Volumen einer Glaskugel.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Berechne das Volumen der Kugel mit der Formel:</p>
            <p>V = {buildInlineFrac(4, 3)} · π · r³</p>
            <p>
              Der Radius beträgt: r = {buildInlineFrac('d', 2)} ={' '}
              {pp(data.dia / 2)} cm
            </p>
            <p>Setze die Werte ein und runde das Ergebnis:</p>
            <p>
              V = {buildInlineFrac(4, 3)} · π · {pp(data.dia / 2)}³
            </p>
            <p>
              V ≈{' '}
              {pp(
                roundToDigits((4 / 3) * Math.PI * Math.pow(data.dia / 2, 3), 2),
              )}{' '}
              cm³
            </p>
          </>
        )
      },
    },
    {
      points: 4,
      task({ data }) {
        return (
          <>
            <p>
              b) Nach der Herstellung der Form wird die Kugeloberfläche
              lackiert. Mit einem Liter Farbe kann eine Fläche von {data.paint}{' '}
              m² lackiert werden.
            </p>
            <p>
              Berechne, wie viele Glaskugeln mit einem Liter Farbe lackiert
              werden können.
            </p>
          </>
        )
      },
      solution({ data }) {
        const O = roundToDigits(4 * Math.PI * Math.pow(data.dia / 2, 2), 2)
        return (
          <>
            <p>Berechne zuerst die Oberfläche der Kugel mit der Formel:</p>
            <p>O = 4 · π · r²</p>
            <p>O = 4 · π · {data.dia / 2}²</p>
            <p>O = {pp(O)} cm²</p>
            <p>
              Die Farbe reicht für {data.paint} m². Rechne die Fläche in cm² um:
            </p>
            <p>
              {data.paint} m² = {data.paint * 100} dm² = {data.paint * 10000}{' '}
              cm²
            </p>
            <p>Berechne die Anzahl der Kugeln:</p>
            <p>
              {data.paint * 10000} : {pp(O)} ={' '}
              {pp(roundToDigits((data.paint * 10000) / O, 2))} ≈{' '}
              {pp(Math.floor((data.paint * 10000) / O))}
            </p>
            <p>
              Es können etwa {pp(Math.floor((data.paint * 10000) / O))} ganze
              Kugeln lackiert werden.
            </p>
          </>
        )
      },
    },
    {
      points: 4,
      task({ data }) {
        return (
          <>
            <p>
              c) Ein Praktikant behauptet: „Für eine Glaskugel mit doppeltem{' '}
              {data.case == 1 && 'Durchmesser'} {data.case == 2 && 'Radius'}{' '}
              {data.case == 3 && 'Durchmesser'} benötigt man{' '}
              {data.case == 1 && 'auch doppelt'}
              {data.case == 2 && 'dreimal'}
              {data.case == 3 && 'viermal'} so viel Farbe.“
            </p>
            <p>Hat der Praktikant recht? Begründe.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              {data.case == 1 ||
                (data.case == 3 &&
                  'Bei einer Verdoppelung des Durchmessers verdoppelt sich auch der Radius.')}
            </p>
            <p>
              Setze den verdoppelten Radius in die Formel ein und untersuche,
              wie sich die Oberfläche verändert:
            </p>
            <p>O&apos; = 4 · π · (2r)²</p>
            <p>O&apos; = 4 · π · 4r²</p>
            <p>O&apos; = 4 · (4 · π · r²)</p>
            <p>O&apos; = 4 · O</p>
            <p>
              Die Oberfläche einer Kugel mit doppeltem Durchmesser ist 4 mal so
              groß wie die Oberfläche der ursprünglichen Kugel.
            </p>
            <p>
              Damit ist die Aussage {data.case == 1 && 'falsch.'}
              {data.case == 2 && 'falsch.'}
              {data.case == 3 && 'richtig.'}
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
              d) Bevor die lackierten Glaskugeln verpackt werden, durchlaufen
              sie eine Qualitätskontrolle. Zuerst wird die Form, danach die
              Lackierung auf Fehler kontrolliert. Alle Glaskugeln mit einem
              Fehler werden direkt aussortiert. Das Baumdiagramm zeigt die
              Anteile. Die Anteile werden im Folgenden als Wahrscheinlichkeiten
              gedeutet.{' '}
            </p>
            <svg viewBox="0 0 700 500">
              <image
                href="/content/NRW_MSA_Glaskugeln_Baumdiagramm.PNG"
                height="500"
                width="700"
              />
              <text
                x={40}
                y={200}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {data.error_1} %
              </text>
              <text
                x={340}
                y={140}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {data.error_2} %
              </text>
            </svg>
            <p>Ergänze die drei fehlenden Angaben im Baumdiagramm.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>{100 - data.error_1} % der Kugeln haben eine Form mit Fehler.</p>
            <p>
              {100 - data.error_2} % der richtig geformten Kugeln haben eine
              Lackierung mit Fehler.
            </p>
            <svg viewBox="0 0 700 500">
              <image
                href="/content/NRW_MSA_Glaskugeln_Baumdiagramm.PNG"
                height="500"
                width="700"
              />
              <text
                x={40}
                y={200}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {data.error_1} %
              </text>
              <text
                x={30}
                y={360}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {100 - data.error_1} %
              </text>
              <text
                x={340}
                y={140}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {data.error_2} %
              </text>
              <text
                x={345}
                y={265}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {100 - data.error_2} %
              </text>
              <text
                x={490}
                y={265}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                Lackierung mit Fehler
              </text>
            </svg>
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
              e) Begründe, warum der untere Ast des Baumdiagramms nicht
              fortgeführt ist.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Der untere Ast des Baumdiagramms wird nicht fortgeführt, weil alle
              Glaskugeln, die eine Form mit Fehlern haben, direkt aussortiert
              werden. Sie werden keiner weiteren Kontrolle unterzogen.
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
            <p>f) Insgesamt werden {data.control} Glaskugeln kontrolliert. </p>
            <p>Berechne, wie viele fehlerfreie Glaskugeln zu erwarten sind.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Berechne zuerst die erwartete Anzahl der Kugeln{' '}
              <Color1>ohne Fehler in der Form</Color1>:
            </p>
            <p>
              {data.control} · <Color1>{pp(data.error_1 / 100)}</Color1> ={' '}
              {data.control * (data.error_1 / 100)}
            </p>
            <p>
              Berechne davon die erwartete Anzahl der Kugeln, die auch{' '}
              <Color2>keinen Fehler in der Lackierung</Color2> haben:
            </p>
            <p>
              {data.control * (data.error_1 / 100)} ·{' '}
              <Color2>{pp(data.error_2 / 100)}</Color2> ≈{' '}
              {Math.round(
                data.control * (data.error_1 / 100) * (data.error_2 / 100),
              )}{' '}
            </p>
            <p>
              Es werden etwa
              <strong>
                {' '}
                {Math.round(
                  data.control * (data.error_1 / 100) * (data.error_2 / 100),
                )}{' '}
              </strong>
              Kugeln ohne Fehler erwartet.
            </p>
          </>
        )
      },
    },
  ],
}
