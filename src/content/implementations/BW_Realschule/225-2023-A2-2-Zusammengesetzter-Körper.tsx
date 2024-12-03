import { Exercise } from '@/data/types'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  s: number
  alpha: number
  höhe: number
}

export const exercise225: Exercise<DATA> = {
  title: 'Zusammengesetzter Körper',
  source: '2023 Pflichtteil A2 - Aufgabe 2',
  useCalculator: true,
  duration: 42,
  points: 4,
  generator(rng) {
    return {
      s: rng.randomIntBetween(130, 180) / 10,
      alpha: rng.randomIntBetween(600, 699) / 10,
      höhe: rng.randomIntBetween(200, 250) / 10,
    }
  },
  originalData: { s: 16.3, alpha: 68.9, höhe: 20.6 },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Ein zusammengesetzter Körper besteht aus einem quadratischen Prisma
          mit aufgesetzter quadratischer Pyramide. Dieser zusammengesetzte
          Körper wurde durch einen Parallelschnitt halbiert. Die Schnittfäche A
          <sub>s</sub> ist grau eingefärbt.{' '}
          <svg viewBox="0 0 328 220">
            <image
              href="/content/BW_Realschule/225_Körper.jpg"
              height="220"
              width="328"
            />
          </svg>
        </p>
        <p>Es gilt: </p>
        <p>
          s = {pp(data.s)} cm<br></br>α = {pp(data.alpha)}°<br></br>h
          <sub>ges</sub> = {pp(data.höhe)} cm{' '}
        </p>
        <p>
          Berechne den Flächeninhalt der Schnittfläche A<sub>s</sub>.
        </p>
      </>
    )
  },
  solution({ data }) {
    const a = roundToDigits(
      2 * Math.cos((data.alpha * 2 * Math.PI) / 360) * data.s,
      2,
    )
    const hs = roundToDigits(Math.sqrt(data.s * data.s - (a / 2) * (a / 2)), 2)
    const h = roundToDigits(Math.sqrt(hs * hs - (a / 2) * (a / 2)), 2)

    return (
      <>
        <p>
          <strong>Fläche des Dreiecks</strong>
        </p>
        <svg viewBox="0 0 328 220">
          <image
            href="/content/BW_Realschule/225_Körper2.jpg"
            height="220"
            width="328"
          />
        </svg>
        <p>Berechne die Länge von a im rechtwinkligen Dreieck:</p>
        <div>
          <span style={{ fontSize: '0.8em' }}>
            {buildEquation([
              [
                <>cos(α)</>,
                <>=</>,
                <>{buildInlineFrac(<>{buildInlineFrac('a', 2)}</>, <>s</>)}</>,
              ],
              [
                <>cos({pp(data.alpha)}°)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildInlineFrac('a', 2)}</>,
                    <>{pp(data.s)} cm</>,
                  )}
                </>,
                <>| · {pp(data.s)} cm</>,
              ],
              [
                <>{buildInlineFrac('a', 2)}</>,
                <>=</>,
                <>
                  cos({pp(data.alpha)}°) · {pp(data.s)} cm
                </>,
                <>| · 2</>,
              ],
              [
                <>a</>,
                <>=</>,
                <>
                  2 · cos({pp(data.alpha)}°) · {pp(data.s)} cm
                </>,
                <>| · 2</>,
              ],
              [<>a</>, <>≈</>, <>{pp(a)} cm</>],
            ])}
          </span>
        </div>
        <p>
          Berechne die Höhe des schrägen Dreiecks mit dem Satz des Pythagoras:
        </p>
        <div>
          <span style={{ fontSize: '0.7em' }}>
            {buildEquation([
              [
                <>
                  <span className="inline-block  scale-y-[2]">(</span>
                  {buildInlineFrac('a', 2)}
                  <span className="inline-block  scale-y-[2]">)</span>² + h
                  <sub>s</sub>²
                </>,
                <>=</>,
                <>s²</>,
              ],
              [
                <>
                  ({pp(a / 2)} cm)² + h<sub>s</sub>²
                </>,
                <>=</>,
                <>({pp(data.s)} cm)²</>,
                <>| − ({pp(a / 2)} cm)²</>,
              ],
              [
                <>
                  h<sub>s</sub>²
                </>,
                <>=</>,
                <>
                  ({pp(data.s)} cm)² − ({pp(a / 2)} cm)²
                </>,
                <>| √</>,
              ],
              [
                <>
                  h<sub>s</sub>
                </>,
                <>≈</>,
                <>{pp(hs)} cm</>,
              ],
            ])}
          </span>
        </div>
        <p>Damit lässt sich die Höhe h der Pyramide berechnen:</p>
        <div>
          <span style={{ fontSize: '0.7em' }}>
            {buildEquation([
              [
                <>
                  <span className="inline-block  scale-y-[2]">(</span>
                  {buildInlineFrac('a', 2)}
                  <span className="inline-block  scale-y-[2]">)</span>² + h²
                </>,
                <>=</>,
                <>
                  h<sub>s</sub>²
                </>,
              ],
              [
                <>({pp(a / 2)} cm)² + h</>,
                <>=</>,
                <>({pp(hs)} cm)²</>,
                <>| − ({pp(a / 2)} cm)²</>,
              ],
              [
                <>h²</>,
                <>=</>,
                <>
                  ({pp(hs)} cm)² − ({pp(a / 2)} cm)²
                </>,
                <>| √</>,
              ],
              [<>h</>, <>≈</>, <>{pp(h)} cm</>],
            ])}
          </span>
        </div>
        <p>Bestimme damit die Fläche des grauen Dreiecks:</p>
        {buildEquation([
          [
            <>
              A<sub>1</sub>
            </>,
            <>=</>,
            <>{buildInlineFrac(<>a · h</>, 2)}</>,
          ],
          [
            <></>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>
                  {pp(a)} cm · {pp(h)} cm
                </>,
                2,
              )}
            </>,
          ],
          [
            <></>,
            <>≈</>,
            <>
              <strong>{pp(roundToDigits(a * h, 2))} cm²</strong>
            </>,
          ],
        ])}
        <p>
          <strong>Fläche des Rechtecks</strong>
        </p>
        <p>Berechne die Höhe des quadratischen Prismas:</p>
        {buildEquation([
          [
            <>
              h<sub>Prisma</sub>
            </>,
            <>=</>,
            <>
              h<sub>ges</sub> − h
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              {pp(data.höhe)} cm − {pp(h)} cm
            </>,
          ],
          [<></>, <>=</>, <>{pp(data.höhe - h)} cm</>],
        ])}
        <p>Bestimme damit die graue Rechtecksfläche:</p>
        {buildEquation([
          [
            <>
              A<sub>2</sub>
            </>,
            <>=</>,
            <>
              a · h<sub>Prisma</sub>
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              {pp(a)} cm · {pp(data.höhe - h)} cm
            </>,
          ],
          [
            <></>,
            <>≈</>,
            <>
              <strong>{pp(roundToDigits(a * (data.höhe - h), 2))} cm²</strong>
            </>,
          ],
        ])}
        <p>
          <strong>
            Fläche A<sub>s</sub> berechnen
          </strong>
        </p>
        <p>Insgesamt beträgt der Flächeninhalt:</p>
        <p>
          A<sub>s</sub> = {pp(roundToDigits(a * h, 2))} cm² +{' '}
          {pp(roundToDigits(a * (data.höhe - h), 2))} cm² ={' '}
          <strong>
            {pp(
              roundToDigits(a * h, 2) + roundToDigits(a * (data.höhe - h), 2),
            )}{' '}
            cm²
          </strong>
        </p>
      </>
    )
  },
}
