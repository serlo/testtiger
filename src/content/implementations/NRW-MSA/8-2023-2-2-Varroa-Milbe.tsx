import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  mass: number
  length: number
  width: number
  count: number
  goal: number
}

export const exercise8: Exercise<DATA> = {
  title: 'Varroa-Milbe',
  source: '2023 Teil 2 Aufgabe 2',
  useCalculator: true,
  duration: 10,
  generator(rng) {
    return {
      mass: rng.randomIntBetween(1, 5) / 2,
      length: rng.randomIntBetween(55, 65),
      width: rng.randomIntBetween(40, 50),
      count: rng.randomIntBetween(221, 309),
      goal: rng.randomIntBetween(8, 13) * 1000,
    }
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Die Varroa-Milbe ist ein Schädling, der in jedem Bienenvolk lebt. Die
          Schülerinnen und Schüler der Bienen-AG untersuchen die Milbe mit einem
          Mikroskop.
        </p>
        <svg viewBox="0 0 700 500">
          <image href="/content/NRW_MSA_Milbe.PNG" height="500" width="700" />
          <text x={513} y={470} fontSize={30} textAnchor="right" stroke="black">
            {pp(data.mass)} mm
          </text>
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 3,
      task({ data }) {
        return (
          <>
            <p>
              a) Die Schülerinnen und Schüler messen die Länge {data.length} mm
              und Breite {data.width} mm am Mikroskop.
            </p>
            <p>
              Bestimme den Maßstab, wenn die {pp(data.mass)} mm in der Zeichnung
              15 mm am Mikroskop entsprechen. Berechne damit die tatsächliche
              Länge und Breite der Milbe.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Bestimme zuerst den Maßstab:</p>
            <p> 15 mm am Mikroskop ≙ {pp(data.mass)} mm</p>
            <p>
              Teile beide Seiten durch 15. Dann erhältst du das tatsächliche
              Maß, wenn am Mikroskop 1 mm gemessen wird:
            </p>
            <p>
              1 mm am Mikroskop ≙ {buildInlineFrac(pp(data.mass), 15)}{' '}
              {data.mass == 1 || data.mass == 2 ? false : '='}{' '}
              {data.mass == 1 || data.mass == 2
                ? false
                : buildInlineFrac(pp(data.mass * 2), 15 * 2)}{' '}
              mm in echt
            </p>
            <p>Berechne damit die Länge und Breite der Milbe in echt:</p>
            <p>
              Länge: {data.length} mm ≙ {data.length} ·{' '}
              {data.mass == 1 || data.mass == 2
                ? buildInlineFrac(pp(data.mass), 15)
                : buildInlineFrac(pp(data.mass * 2), 15 * 2)}{' '}
              mm = {pp(roundToDigits((data.length * data.mass) / 15, 2))} mm
            </p>
            <p>
              Breite: {data.width} mm ≙ {data.width} ·{' '}
              {data.mass == 1 || data.mass == 2
                ? buildInlineFrac(pp(data.mass), 15)
                : buildInlineFrac(pp(data.mass * 2), 15 * 2)}{' '}
              mm = {pp(roundToDigits((data.width * data.mass) / 15, 2))} mm
            </p>
            <p>
              Die Milbe hat in echt eine Länge von etwa{' '}
              {pp(roundToDigits((data.length * data.mass) / 15, 2))} mm und eine
              Breite von etwa{' '}
              {pp(roundToDigits((data.width * data.mass) / 15, 2))} mm.
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
              b) Im Frühjahr ermitteln sie die Anzahl der Milben im Bienenvolk.
            </p>
            <p>
              Im Internet finden sie die Faustregel, dass sich die Anzahl der
              Milben alle vier Wochen etwa verdoppelt. Sie kalkulieren die
              voraussichtliche Anzahl der Milben für die kommenden vier und acht
              Wochen. Die Werte halten sie in einer Tabelle fest.
            </p>
            <svg viewBox="0 0 700 200">
              <image
                href="/content/NRW_MSA_Milbe_Tabelle.PNG"
                height="200"
                width="700"
              />
              <text
                x={250}
                y={145}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {data.count}
              </text>
            </svg>
            <p>Ergänze die fehlenden Werte in der Tabelle.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die Anzahl der Milben verdoppelt sich alle 4 Wochen. Nach 4 Wochen
              ist die Anzahl der Milben das doppelte des Ausgangswertes, also:{' '}
              {data.count} ⋅ 2 = {data.count * 2} Milben.
            </p>
            <p>
              Die Anzahl Milben nach 8 Wochen ist doppelt so groß, wie die
              Anzahl nach 4 Wochen. Der Wert nach 8 Wochen ist somit:{' '}
              {data.count * 2} ⋅ 2 = {data.count * 4} Milben
            </p>
            <svg viewBox="0 0 700 200">
              <image
                href="/content/NRW_MSA_Milbe_Tabelle.PNG"
                height="200"
                width="700"
              />
              <text
                x={250}
                y={145}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {data.count}
              </text>
              <text
                x={420}
                y={145}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {data.count * 2}
              </text>
              <text
                x={580}
                y={145}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {data.count * 4}
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
              c) Um die Entwicklung der Milben pro Woche vorauszusagen,
              beschreiben sie die Anzahl der Milben mit der folgenden
              Exponentialfunktion f :
            </p>
            <p>
              f(x) = {data.count} ⋅ 1,19<sup>x</sup>
            </p>
            <p>x ist die Zeit in Wochen, x = 0 ist der Beobachtungsbeginn.</p>
            <p>
              Gib die Bedeutung der Werte {data.count} und 1,19 im Zusammenhang
              an.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Den Wert {data.count} nimmt die Funktion zum Zeitpunkt x=0 an, er
              ist also der Anfangswert.{' '}
            </p>
            <p>
              Der Wert 1,19 ist der Wachstumsfaktor. Er ist der Faktor, um den
              sich die Zahl der Milben innerhalb einer Woche vermehrt.{' '}
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
              d) Bestätige mithilfe der Funktionsgleichung, dass nach 12 Wochen
              ca. {pp(roundToDigits(Math.pow(1.19, 12) * data.count, -2))}{' '}
              Milben vorhanden sind.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Da in der Funktionsgleichung das x für die Anzahl an Wochen steht,
              musst du für das x die 12 einsetzen und erhältst:{' '}
            </p>
            <p>
              f(12) = {data.count} ⋅ 1,19<sup>12</sup> ≈{' '}
              {pp(Math.round(Math.pow(1.19, 12) * data.count))}
            </p>
            <p>
              Nach 12 Wochen beträgt die Anzahl{' '}
              {pp(Math.round(Math.pow(1.19, 12) * data.count))} ≈{' '}
              {pp(roundToDigits(Math.pow(1.19, 12) * data.count, -2))}.
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
              e) Bei einer Anzahl von ca. {data.goal} Milben würde das
              Bienenvolk so großen Schaden nehmen, dass es nicht überleben kann.
            </p>
            <p>
              Bestimme, nach wie vielen Wochen die Anzahl von {data.goal} Milben
              überschritten wird.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Mithilfe der Funktionsgleichung f(x) = {data.count} ⋅ 1,19
              <sup>x</sup> kannst du die Anzahl der Wochen bestimmen.{' '}
            </p>
            <p>
              Setze die Anzahl der Milben ein und löse die Gleichung nach x.
            </p>
            <p>
              {data.goal} = {data.count} ⋅ 1,19
              <sup>x</sup>
            </p>
            <p> Teile beide Seiten durch {data.count}.</p>
            <p>
              {pp(roundToDigits(data.goal / data.count, 2))} = 1,19
              <sup>x</sup>
            </p>
            <p>Wende den Logarithmus zur Basis 1,19 an:</p>
            <p>
              x = log<sub>1,19</sub>(
              {pp(roundToDigits(data.goal / data.count, 2))}) ≈{' '}
              {pp(
                roundToDigits(
                  Math.log(data.goal / data.count) / Math.log(1.19),
                  2,
                ),
              )}
            </p>
            <p>
              Der Wert von {data.goal} wird nach etwa{' '}
              {pp(Math.ceil(Math.log(data.goal / data.count) / Math.log(1.19)))}{' '}
              ganzen Wochen überschritten.
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
              f) Damit das Bienenvolk überlebt, wird nach 12 Wochen Ameisensäure
              eingesetzt. Dadurch wird die Anzahl von ca.{' '}
              {pp(roundToDigits(Math.pow(1.19, 12) * data.count, -2))} Milben
              einmalig um 90% reduziert.
            </p>
            <p>
              Weise nach, dass durch die Behandlung mit der Ameisensäure die
              Anzahl von 10000 Milben 21 Wochen nach Beobachtungsbeginn nicht
              überschritten wird.
            </p>
          </>
        )
      },
      solution({ data }) {
        const a = roundToDigits(Math.pow(1.19, 12) * data.count * 0.1, -1)
        return (
          <>
            <p>
              Berechne zunächst die Anzahl Milben, die nach der Behandlung mit
              Ameisensäure übrig sind.
            </p>
            <p>
              {pp(roundToDigits(Math.pow(1.19, 12) * data.count, -2))} ⋅ 0,1 ={' '}
              {pp(a)} Milben
            </p>
            <p>
              Diese Anzahl ist der neue Anfangswert. Mit dem Wachstumsfaktor
              1,19 können wir die Funktionsgleichung{' '}
            </p>
            <p>
              g(x) = {pp(a)} ⋅ 1,19<sup>x</sup>
            </p>
            <p>
              verwenden. Berechne den Wert nach 21 Wochen. Da 12 Wochen bereits
              vergangen sind bleiben 21 − 12 = 9 Wochen der Beobachtung übrig.
              Setze diesen Wert in die neue Funktionsgleichung ein:
            </p>
            <p>
              g(9) = {pp(a)} ⋅ 1,19<sup>9</sup> ≈{' '}
              {pp(Math.round(Math.pow(1.19, 9) * a))}
            </p>
            <p>
              Nach 21 Wochen sind es etwa {pp(a)} ⋅ 1,19<sup>9</sup> ≈{' '}
              {pp(Math.round(Math.pow(1.19, 9) * a))}, wodurch der Wert von
              10000 Milben auf jeden Fall unterschritten ist.
            </p>
          </>
        )
      },
    },
  ],
}
