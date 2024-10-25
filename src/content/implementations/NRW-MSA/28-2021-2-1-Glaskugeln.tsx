import { Exercise } from '@/data/types'
import { Color1, Color2, Color4, Color5 } from '@/helper/colors'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
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
  originalData: {
    dia: 8,
    paint: 12,
    control: 2000,
    error_1: 97,
    error_2: 94,
    case: 1,
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
        <center>
          <Color5>
            <span style={{ fontSize: 'small' }}>Abbildung 1: Glaskugel</span>
          </Color5>
        </center>
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
            {buildEquation([
              [<>V</>, <>=</>, <>{buildInlineFrac(4, 3)} · π · r³</>],
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
                      Radius bestimmen und einsetzen
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(4, 3)} · π · {pp(data.dia / 2)}³
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  <strong>
                    {pp(
                      roundToDigits(
                        (4 / 3) * Math.PI * Math.pow(data.dia / 2, 3),
                        2,
                      ),
                    )}{' '}
                    [cm³]
                  </strong>
                </>,
              ],
            ])}
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
            <p>
              <strong>Oberfläche berechnen</strong>
            </p>
            <p>Berechne zuerst die Oberfläche der Kugel mit der Formel:</p>
            {buildEquation([
              [<>O</>, <>=</>, <>4 · π · r²</>],
              [<></>, <>=</>, <>4 · p · {data.dia / 2}²</>],
              [<></>, <>=</>, <>{pp(O)} [cm²]</>],
            ])}
            <p>
              <strong>Anzahl der Kugeln</strong>
            </p>
            <p>
              Ein Liter Farbe reicht für {data.paint} m². <br></br>Rechne diese
              Fläche in cm² um:
            </p>
            <p>
              {data.paint} m² = {data.paint * 100} dm² = {data.paint * 10000}{' '}
              cm²
            </p>

            <p>
              Berechne die Anzahl der Kugeln, die damit lackiert werden können:
            </p>
            <p>
              {data.paint * 10000} : {pp(O)} ={' '}
              {pp(roundToDigits((data.paint * 10000) / O, 2))} ≈{' '}
              {pp(Math.floor((data.paint * 10000) / O))}
            </p>
            <p>
              Es können etwa{' '}
              <strong>
                {pp(Math.floor((data.paint * 10000) / O))} ganze Kugeln
              </strong>{' '}
              lackiert werden.
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
            {data.case == 1 ||
              (data.case == 3 && (
                <>
                  <p>
                    Bei einer Verdoppelung des Durchmessers verdoppelt sich auch
                    der Radius.{' '}
                  </p>
                </>
              ))}

            <p>
              Setze den verdoppelten Radius in die Formel ein und untersuche,
              wie sich die Oberfläche verändert:
            </p>
            {buildEquation([
              [
                <>O&apos;</>,
                <>=</>,
                <>
                  4 · π · (<Color1>2</Color1>r)²
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
                    <span style={{ fontSize: 'small' }}>
                      Klammer auflösen mit Potenzregel
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  4 · π · <Color1>4</Color1>r²
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <Color1>4</Color1> · 4 · π · r²
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
                    <span style={{ fontSize: 'small' }}>
                      4 · π · r² ist ursprüngliche Oberfläche
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <Color1>4</Color1> O
                </>,
              ],
            ])}

            <p>
              Die Oberfläche einer Kugel mit doppeltem Durchmesser ist{' '}
              <Color1>4</Color1> mal so groß wie die Oberfläche der
              ursprünglichen Kugel.
            </p>
            <p>
              Damit ist die Aussage{' '}
              <strong>
                {data.case == 1 && 'falsch.'}
                {data.case == 2 && 'falsch.'}
                {data.case == 3 && 'richtig.'}
              </strong>
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      skillIntro({ data }) {
        return (
          <>
            <p>Ein Unternehmen stellt lackierte Glaskugeln her.</p>
          </>
        )
      },
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
            <svg viewBox="0 0 700 400">
              <image
                href="/content/NRW_MSA_Glaskugeln_Baumdiagramm.PNG"
                height="400"
                width="700"
              />
              <text
                x={25}
                y={170}
                fontSize={30}
                textAnchor="right"
                stroke="black"
              >
                {data.error_1} %
              </text>
              <text
                x={340}
                y={100}
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
            <ul>
              <li>
                {100 - data.error_1} % der Kugeln haben eine Form mit Fehler.
              </li>
              <li>
                {100 - data.error_2} % der richtig geformten Kugeln haben eine
                Lackierung mit Fehler.
              </li>
            </ul>
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
