import { Exercise } from '@/data/types'
import { Color1, Color2, Color4 } from '@/helper/colors'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
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
            <p>
              <strong>Maßstab bestimmen</strong>
            </p>
            <p> 15 mm am Mikroskop ≙ {pp(data.mass)} mm Zeichnung</p>
            <p>
              Teile beide Seiten durch 15. Dann erhältst du echte Länge, wenn am
              Mikroskop 1 mm gemessen wird:
            </p>
            <p>
              1 mm am Mikroskop ≙ {buildInlineFrac(pp(data.mass), 15)}{' '}
              {data.mass == 1 || data.mass == 2 ? false : '='}{' '}
              {data.mass == 1 || data.mass == 2
                ? false
                : buildInlineFrac(pp(data.mass * 2), 15 * 2)}{' '}
              mm in echt
            </p>
            <p>
              <strong>Länge und Breite der Milbe</strong>
            </p>
            <p>Multipliziere die Länge und Breite mit dem Maßstab:</p>
            <ul>
              <li>
                Länge: {data.length} ·{' '}
                {data.mass == 1 || data.mass == 2
                  ? buildInlineFrac(pp(data.mass), 15)
                  : buildInlineFrac(pp(data.mass * 2), 15 * 2)}{' '}
                = {pp(roundToDigits((data.length * data.mass) / 15, 2))} [mm]
              </li>
              <li>
                Breite: {data.width} ·{' '}
                {data.mass == 1 || data.mass == 2
                  ? buildInlineFrac(pp(data.mass), 15)
                  : buildInlineFrac(pp(data.mass * 2), 15 * 2)}{' '}
                = {pp(roundToDigits((data.width * data.mass) / 15, 2))} [mm]
              </li>
            </ul>

            <p>
              Die Milbe hat in echt eine{' '}
              <strong>
                Länge von etwa{' '}
                {pp(roundToDigits((data.length * data.mass) / 15, 2))} mm
              </strong>{' '}
              und eine{' '}
              <strong>
                Breite von etwa{' '}
                {pp(roundToDigits((data.width * data.mass) / 15, 2))} mm
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
              b) Im Frühjahr ermitteln sie die Anzahl der Milben im Bienenvolk.
            </p>
            <p>
              Im Internet finden sie die Faustregel, dass sich die Anzahl der
              Milben alle vier Wochen etwa verdoppelt. Sie kalkulieren die
              voraussichtliche Anzahl der Milben für die kommenden vier und acht
              Wochen. Die Werte halten sie in einer Tabelle fest.
            </p>
            <svg width="320" height="66" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="0"
                y="0"
                width="328"
                height="22"
                fill="#D2ECF6"
                stroke="none"
              />

              <rect
                x="0"
                y="0"
                width="328"
                height="66"
                rx="4"
                ry="4"
                stroke="#007EC1"
                fill="transparent"
                strokeWidth="1"
              />

              <line
                x1="0"
                y1="22"
                x2="328"
                y2="22"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="44"
                x2="328"
                y2="44"
                stroke="#007EC1"
                strokeWidth="1"
              />

              <text x="5" y="38" fontSize="10" fill="black">
                Zeit in Wochen
              </text>
              <text x="5" y="60" fontSize="10" fill="black">
                Anzahl der Milben
              </text>
              <line
                x1="100"
                y1="0"
                x2="100"
                y2="66"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="180"
                y1="00"
                x2="180"
                y2="66"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="255"
                y1="0"
                x2="255"
                y2="66"
                stroke="#007EC1"
                strokeWidth="1"
              />

              <text
                x="140"
                y="16"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                Wert 1
              </text>
              <text
                x="215"
                y="16"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                Wert 2
              </text>
              <text
                x="290"
                y="16"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                Wert 3
              </text>

              <text
                x={136}
                y={36}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                0
              </text>
              <text
                x={214}
                y={36}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                4
              </text>
              <text
                x={289}
                y={36}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                8
              </text>
              <text
                x={130}
                y={58}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {data.count}
              </text>
              <text
                x={214}
                y={58}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              ></text>
              <text
                x={289}
                y={58}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              ></text>
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
              ist die Anzahl der Milben das Doppelte des Ausgangswertes, also:
              <br></br>
              {data.count} ⋅ 2 = <strong>{data.count * 2} Milben</strong>
            </p>
            <p>
              Die Anzahl Milben nach 8 Wochen ist doppelt so groß, wie die
              Anzahl nach 4 Wochen. Der Wert nach 8 Wochen ist somit:<br></br>
              {data.count * 2} ⋅ 2 = <strong>{data.count * 4} Milben</strong>
            </p>
            <svg width="320" height="66" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="0"
                y="0"
                width="328"
                height="22"
                fill="#D2ECF6"
                stroke="none"
              />

              <rect
                x="0"
                y="0"
                width="328"
                height="66"
                rx="4"
                ry="4"
                stroke="#007EC1"
                fill="transparent"
                strokeWidth="1"
              />

              <line
                x1="0"
                y1="22"
                x2="328"
                y2="22"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="44"
                x2="328"
                y2="44"
                stroke="#007EC1"
                strokeWidth="1"
              />

              <text x="5" y="38" fontSize="10" fill="black">
                Zeit in Wochen
              </text>
              <text x="5" y="60" fontSize="10" fill="black">
                Anzahl der Milben
              </text>
              <line
                x1="100"
                y1="0"
                x2="100"
                y2="66"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="180"
                y1="00"
                x2="180"
                y2="66"
                stroke="#007EC1"
                strokeWidth="1"
              />
              <line
                x1="255"
                y1="0"
                x2="255"
                y2="66"
                stroke="#007EC1"
                strokeWidth="1"
              />

              <text
                x="140"
                y="16"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                Wert 1
              </text>
              <text
                x="215"
                y="16"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                Wert 2
              </text>
              <text
                x="290"
                y="16"
                fontSize="10"
                textAnchor="middle"
                fontWeight="bold"
                fill="black"
              >
                Wert 3
              </text>

              <text
                x={136}
                y={36}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                0
              </text>
              <text
                x={214}
                y={36}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                4
              </text>
              <text
                x={289}
                y={36}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                8
              </text>
              <text
                x={130}
                y={58}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {data.count}
              </text>
              <text
                x={208}
                y={58}
                fontSize={10}
                textAnchor="right"
                stroke="black"
              >
                {data.count * 2}
              </text>
              <text
                x={283}
                y={58}
                fontSize={10}
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
              Exponentialfunktion f:
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
              Den Wert <Color1>{data.count}</Color1> nimmt die Funktion zum
              Zeitpunkt x = 0 an, er ist also der <Color1>Anfangswert</Color1>.
            </p>
            <p>
              Der Wert <Color2>1,19</Color2> ist der{' '}
              <Color2>Wachstumsfaktor</Color2>. Er gibt an, dass die Anzahl der
              Milben sich jede Woche um 19 % vermehrt.{' '}
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
            <p>Verwende die Funktionsgleichung und setze die Werte ein:</p>
            {buildEquation([
              [
                <>f(x)</>,
                <> =</>,
                <>
                  {' '}
                  {data.count} · 1,19<sup>x</sup>
                </>,
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
                    <span style={{ fontSize: 'small' }}>x = 12</span>
                  </Color4>
                </>,
              ],
              [
                <>f(12)</>,
                <>=</>,
                <>
                  {data.count} ⋅ 1,19<sup>12</sup>
                </>,
              ],
              [
                <>f(12)</>,
                <>≈</>,
                <>{pp(Math.round(Math.pow(1.19, 12) * data.count))}</>,
              ],
            ])}

            <p>
              Nach 12 Wochen beträgt die Anzahl der Milben{' '}
              {pp(Math.round(Math.pow(1.19, 12) * data.count))} ≈{' '}
              {pp(roundToDigits(Math.pow(1.19, 12) * data.count, -2))}.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      skillIntro({ data }) {
        return (
          <>
            <p>
              Um die Entwicklung der Milben pro Woche vorauszusagen, beschreiben
              sie die Anzahl der Milben mit der folgenden Exponentialfunktion f:
            </p>
            <p>
              f(x) = {data.count} ⋅ 1,19<sup>x</sup>
            </p>
            <p>x ist die Zeit in Wochen, x = 0 ist der Beobachtungsbeginn.</p>
          </>
        )
      },
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
        const wochen = Math.ceil(
          roundToDigits(Math.log(data.goal / data.count) / Math.log(1.19), 2),
        )
        return (
          <>
            <p>
              Mithilfe der Funktionsgleichung <br></br>f(x) = {data.count} ⋅
              1,19
              <sup>x</sup> kannst du die Anzahl der Milben in Woche x bestimmen.{' '}
            </p>
            <p>
              Setze systematisch Werte für x ein und überprüfe, wann der Wert{' '}
              {data.goal} überschritten wird:
            </p>
            <p>
              f({wochen - 1}) = {data.count} ⋅ 1,19<sup>{wochen - 1}</sup> ≈{' '}
              {pp(Math.round(Math.pow(1.19, wochen - 1) * data.count))}
            </p>

            <p>
              f({wochen}) = {data.count} ⋅ 1,19<sup>{wochen}</sup> ≈{' '}
              {pp(Math.round(Math.pow(1.19, wochen) * data.count))}
            </p>

            <p>
              Der Wert von {data.goal} wird erst nach{' '}
              <strong>
                {pp(
                  Math.ceil(Math.log(data.goal / data.count) / Math.log(1.19)),
                )}{' '}
                ganzen Wochen{' '}
              </strong>{' '}
              überschritten.
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
              einmalig um 90 % reduziert.
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
              vergangen sind, bleiben 21 − 12 = 9 Wochen der Beobachtung übrig.
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
