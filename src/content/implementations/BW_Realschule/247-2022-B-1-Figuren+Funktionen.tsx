import { Exercise } from '@/data/types'
import {
  buildEquation,
  buildInlineFrac,
  buildOverline,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  ab: number
  af: number
}

export const exercise247: Exercise<DATA> = {
  title: 'Figuren + Funktionen',
  source: '2022 Wahlteil B - Aufgabe 1',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return { ab: rng.randomIntBetween(8, 14), af: rng.randomIntBetween(10, 16) }
  },
  originalData: { ab: 14, af: 12 },
  constraint({ data }) {
    const ag = roundToDigits(
      Math.sqrt(data.af * data.af - (data.ab / 2) * (data.ab / 2)),
      2,
    )
    return ag + 2 < data.ab
  },
  intro({ data }) {
    return null
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
              Im Quadrat ABCD liegen die beiden gleichschenkligen Dreiecke ABF
              und DEF.
            </p>
            <svg viewBox="0 0 328 190">
              <image
                href="/content/BW_Realschule/247_Figur.jpg"
                height="190"
                width="328"
              />
            </svg>
            <p>Es gilt:</p>
            <p>
              {buildOverline('AB')} = {data.ab} cm<br></br>
              {buildOverline('AF')} = {data.af} cm<br></br>
              {buildOverline('AF')} = {buildOverline('BF')}
              <br></br>
              {buildOverline('EF')} = {buildOverline('DF')}
              <br></br>
            </p>
            <ul>
              <li>Berechne den Flächeninhalt des Dreiecks AFE.</li>
              <li>Berechne den Winkel ε.</li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const ag = roundToDigits(
          Math.sqrt(data.af * data.af - (data.ab / 2) * (data.ab / 2)),
          2,
        )
        const ge = roundToDigits(data.ab - ag, 2)
        const ae = ag - ge
        const alpha = roundToDigits(
          (360 * Math.atan(ge / (data.ab / 2))) / (2 * Math.PI),
          2,
        )
        const alphaepsilon = roundToDigits(
          (360 * Math.atan(ag / (data.ab / 2))) / (2 * Math.PI),
          2,
        )
        return (
          <>
            <p>
              <strong>Fläche von AFE</strong>
            </p>
            <p>
              Berechne zuerst die Höhe {buildOverline('GF')} und die Länge{' '}
              {buildOverline('AE')}.
            </p>
            <svg viewBox="0 0 328 210">
              <image
                href="/content/BW_Realschule/247_Figur2.jpg"
                height="210"
                width="328"
              />
            </svg>
            <p>
              Die Höhe {buildOverline('GF')} entspricht genau der halben Strecke
              AB:
            </p>
            <p>
              {buildOverline('GF')} = {buildOverline('AB')} : 2 = {data.ab} cm :
              2 = {pp(data.ab / 2)} cm
            </p>
            <p>
              Im rechtwinkligen Dreieck AFG lässt sich die Länge{' '}
              {buildOverline('AG')} mit dem Satz des Pythagoras berechnen:
            </p>
            <div>
              <span style={{ fontSize: '0.8em' }}>
                {buildEquation([
                  [
                    <>{buildOverline('AF')}²</>,
                    <>=</>,
                    <>
                      {buildOverline('AG')}² + {buildOverline('GF')}²
                    </>,
                  ],
                  [
                    <>({pp(data.af)} cm)²</>,
                    <>=</>,
                    <>
                      {buildOverline('AG')}² + ({pp(data.ab / 2)} cm)²
                    </>,
                    <>| − ({pp(data.ab / 2)} cm)²</>,
                  ],
                  [
                    <>{buildOverline('AG')}²</>,
                    <>=</>,
                    <>
                      ({pp(data.af)} cm)² − ({pp(data.ab / 2)} cm)²
                    </>,
                    <>| √</>,
                  ],
                  [<>{buildOverline('AG')}</>, <>≈</>, <>{pp(ag)} cm</>],
                ])}
              </span>
            </div>
            <p>Berechne damit {buildOverline('DG')}:</p>
            {buildEquation([
              [
                <>{buildOverline('DG')}</>,
                <>=</>,
                <>
                  {buildOverline('AD')} − {buildOverline('AG')}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {pp(data.ab)} cm − {pp(ag)} cm
                </>,
              ],
              [<></>, <>=</>, <>{pp(ge)} cm</>],
            ])}

            <p>Damit ist {buildOverline('AE')}:</p>
            {buildEquation([
              [
                <>{buildOverline('AE')}</>,
                <>=</>,
                <>
                  {buildOverline('AG')} − {buildOverline('GE')}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {pp(ag)} cm − {pp(ge)} cm
                </>,
              ],
              [<></>, <>=</>, <>{pp(ae)} cm</>],
            ])}
            <p>Berechne die Dreiecksfläche:</p>
            {buildEquation([
              [
                <>A</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>
                      {buildOverline('AE')} · {buildOverline('GF')}
                    </>,
                    <>2</>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>
                      {pp(ae)} cm · {pp(data.ab / 2)} cm
                    </>,
                    <>2</>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <strong>{pp((ae * (data.ab / 2)) / 2)} cm²</strong>
                </>,
              ],
            ])}
            <p>
              <strong>ε berechnen</strong>
            </p>
            <p>Bestimme die Größe von α im rechtwinkligen Dreieck EFG:</p>
            {buildEquation([
              [
                <>tan(α)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildOverline('GE')}</>,
                    <>{buildOverline('GF')}</>,
                  )}
                </>,
              ],
              [
                <>tan(α)</>,
                <>=</>,
                <>
                  {buildInlineFrac(<>{pp(ge)} cm</>, <>{pp(data.ab / 2)} cm</>)}
                </>,
                <>
                  | tan<sup>-1</sup>()
                </>,
              ],
              [<>α</>, <>≈</>, <>{pp(alpha)}°</>],
            ])}
            <p>
              Mit der gleichen Rechnung kann im rechtwinkligen Dreieck AFG der
              zusammengesetzte Winkel α + ε berechnet werden:
            </p>
            {buildEquation([
              [
                <>tan(α + ε)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildOverline('AG')}</>,
                    <>{buildOverline('GF')}</>,
                  )}
                </>,
              ],
              [
                <>tan(α + ε)</>,
                <>=</>,
                <>
                  {buildInlineFrac(<>{pp(ag)} cm</>, <>{pp(data.ab / 2)} cm</>)}
                </>,
                <>
                  | tan<sup>-1</sup>()
                </>,
              ],
              [<>α + ε</>, <>≈</>, <>{pp(alphaepsilon)}°</>],
            ])}
            <p>Berechne damit ε:</p>
            <p>
              ε = {pp(alphaepsilon)}° − {pp(alpha)}° ={' '}
              <strong>{pp(alphaepsilon - alpha)}°</strong>
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
            <p>Die Gerade g hat die Funktionsgleichung y = x + 2.</p>
            <p>
              Die Parabel p<sub>1</sub> hat die Funktionsgleichung y = - x² + 8.
            </p>
            <p>
              Die Parabel p<sub>1</sub> schneidet die Gerade g in den Punkten P
              und Q.
            </p>
            <ul>
              <li>Berechne die Koordinaten der Schnittpunkte P und Q.</li>
            </ul>
            <p>
              Durch die beiden Schnittpunkte P und Q verläuft die verschobene
              nach oben geöffnete Normalparabel p<sub>2</sub>.
            </p>
            <ul>
              <li>
                Berechne die Koordinaten des Scheitelpunkts S<sub>2</sub> von p
                <sub>2</sub>.
              </li>
            </ul>
            <p>
              Robin behauptet: {'"'}Das Dreieck mit den Punkten P und Q und S
              <sub>2</sub> ist rechtwinklig.{'"'}{' '}
            </p>
            <ul>
              <li>Hat Robin Recht? Begründe deine Antwort rechnerisch.</li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
