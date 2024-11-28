import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildOverline,
  buildSqrt,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'
import { handLeftOutline } from 'ionicons/icons'

interface DATA {
  bs: number
  phi: number
}

export const exercise208: Exercise<DATA> = {
  title: 'Pyramide',
  source: '2024 Pflichtteil A2 Aufgabe 2',
  useCalculator: true,
  duration: 4,
  points: 3.5,
  generator(rng) {
    return {
      bs: rng.randomIntBetween(6, 16),
      phi: rng.randomIntBetween(2, 6) * 10,
    }
  },
  originalData: { bs: 12, phi: 40 },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Eines der Manteldreiecke der regelmäßigen fünfseitigen Pyramide ist
          grau gefärbt.
        </p>
        <p>Es gilt:</p>
        <p>
          {buildOverline(<>BS</>)} = {data.bs} cm<br></br>ϕ = {data.phi}°
        </p>
        <svg viewBox="0 0 328 170">
          <image
            href="/content/BW_Realschule/208_Pyramide.jpg"
            height="170"
            width="328"
          />
        </svg>
        <p>Berechne das Volumen der Pyramide.</p>
      </>
    )
  },
  solution({ data }) {
    const x = Math.cos((2 * Math.PI * data.phi) / 2 / 360) * data.bs
    const a = 2 * Math.sin((2 * Math.PI * data.phi) / 2 / 360) * data.bs
    const y = roundToDigits(a, 2) / 2 / Math.tan((2 * Math.PI) / 10)
    const h = Math.sqrt(
      roundToDigits(x, 2) * roundToDigits(x, 2) -
        roundToDigits(y, 2) * roundToDigits(y, 2),
    )
    const G = 5 * 0.5 * roundToDigits(a, 2) * roundToDigits(y, 2)
    const volume = (1 / 3) * roundToDigits(G, 2) * roundToDigits(h, 2)
    return (
      <>
        <p>
          Für das Volumen der Pyramide benötigst du die Höhe und die
          Grundfläche.
        </p>
        <p>
          <strong>Höhe des Manteldreiecks und Grundseite</strong>
        </p>
        <p>Berechne dazu die Höhe x des Manteldreiecks und die Grundseite a:</p>
        <svg viewBox="0 0 328 170">
          <image
            href="/content/BW_Realschule/208_Pyramide.jpg"
            height="170"
            width="328"
          />
          <line
            x1={180}
            y1={157}
            x2={226}
            y2={135}
            stroke="blue"
            strokeWidth={2}
          />
          <line
            x1={160}
            y1={13}
            x2={205}
            y2={144}
            stroke="blue"
            strokeWidth={2}
          />
          <text x={210} y={158} fontSize={20} textAnchor="middle" stroke="blue">
            a
          </text>
          <text x={195} y={90} fontSize={20} textAnchor="middle" stroke="blue">
            x
          </text>
        </svg>
        {buildEquation([
          [
            <>
              cos<span className="inline-block  scale-y-[2]">(</span>
              {buildInlineFrac('ϕ', 2)}
              <span className="inline-block  scale-y-[2]">)</span>
            </>,
            <>=</>,
            <>{buildInlineFrac(<>x</>, <>{buildOverline(<>BS</>)}</>)}</>,
          ],
          [
            <>cos({data.phi / 2}°)</>,
            <>=</>,
            <>{buildInlineFrac(<>x</>, <>{data.bs} cm</>)}</>,
            <>| · {data.bs} cm</>,
          ],
          [
            <>x</>,
            <>=</>,
            <>
              cos({data.phi / 2}°) · {data.bs} cm
            </>,
          ],
          [<>x</>, <>=</>, <>{pp(roundToDigits(x, 2))} cm</>],
        ])}
        <p>Berechne a im gleichen Dreieck:</p>
        {buildEquation([
          [
            <>
              sin<span className="inline-block  scale-y-[2]">(</span>
              {buildInlineFrac('ϕ', 2)}
              <span className="inline-block  scale-y-[2]">)</span>
            </>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{buildInlineFrac('a', 2)}</>,
                <>{buildOverline(<>BS</>)}</>,
              )}
            </>,
          ],
          [
            <>sin({data.phi / 2}°)</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{buildInlineFrac('a', 2)}</>,
                <>{data.bs} cm</>,
              )}
            </>,
            <>| · {data.bs} cm </>,
          ],
          [
            <>{buildInlineFrac('a', 2)}</>,
            <>=</>,
            <>
              sin({data.phi / 2}°) · {data.bs} cm
            </>,
            <>| · 2</>,
          ],
          [<>a</>, <>=</>, <>{pp(roundToDigits(a, 2))} cm</>],
        ])}
        <p>
          <strong>Höhe der Grundseite und Höhe h</strong>
        </p>
        <p>
          Berechne damit die Höhe der Grundseite y und schließlich die Höhe der
          Pyramide h.
        </p>
        <svg viewBox="0 0 328 170">
          <image
            href="/content/BW_Realschule/208_Pyramide.jpg"
            height="170"
            width="328"
          />
          <line
            x1={180}
            y1={157}
            x2={226}
            y2={135}
            stroke="blue"
            strokeWidth={2}
          />
          <line
            x1={160}
            y1={13}
            x2={205}
            y2={144}
            stroke="blue"
            strokeWidth={2}
          />
          <line
            x1={160}
            y1={133}
            x2={205}
            y2={144}
            stroke="blue"
            strokeWidth={2}
          />
          <line
            x1={160}
            y1={133}
            x2={160}
            y2={13}
            stroke="blue"
            strokeWidth={2}
          />
          <text x={210} y={158} fontSize={20} textAnchor="middle" stroke="blue">
            a
          </text>
          <text x={195} y={90} fontSize={20} textAnchor="middle" stroke="blue">
            x
          </text>
          <text x={170} y={155} fontSize={20} textAnchor="middle" stroke="blue">
            y
          </text>
          <text x={145} y={90} fontSize={20} textAnchor="middle" stroke="blue">
            h
          </text>
        </svg>
        <p>Von oben sieht die Grundseite so aus:</p>
        <svg viewBox="0 0 328 170">
          <image
            href="/content/BW_Realschule/208_Grundseite.jpg"
            height="170"
            width="328"
          />
        </svg>
        <p>
          Im regelmäßigen Fünfeck teilen sich 5 Dreiecke den vollen Winkel von
          360°. Damit ist der Innenwinkel in der Mitte 72° in jedem Dreieck.
        </p>
        {buildEquation([
          [
            <>tan(36°)</>,
            <>=</>,
            <>{buildInlineFrac(<>{buildInlineFrac('a', 2)}</>, <>y</>)}</>,
          ],
          [
            <>tan(36°)</>,
            <>=</>,
            <>
              {buildInlineFrac(<>{pp(roundToDigits(a, 2) / 2)} cm</>, <>y</>)}
            </>,
            <>| · y </>,
          ],
          [
            <>tan(36°) · y</>,
            <>=</>,
            <>{pp(roundToDigits(a, 2) / 2)} cm</>,
            <>| : tan(36°)</>,
          ],
          [
            <>y</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{pp(roundToDigits(a, 2) / 2)} cm</>,
                <>tan(36°)</>,
              )}
            </>,
          ],
          [<>y</>, <>=</>, <>{pp(roundToDigits(y, 2))} cm</>],
        ])}
        <p>Berechne h mit dem Satz des Pythagoras:</p>
        {buildEquation([
          [<>y² + h²</>, <>=</>, <>x²</>],
          [
            <>{pp(roundToDigits(y, 2))}² + h²</>,
            <>=</>,
            <>{pp(roundToDigits(x, 2))}²</>,
            <>| − {pp(roundToDigits(y, 2))}²</>,
          ],
          [
            <>h</>,
            <>=</>,
            <>
              {buildSqrt(
                <>
                  {pp(roundToDigits(x, 2))}² − {pp(roundToDigits(y, 2))}²
                </>,
              )}
            </>,
          ],
          [<>h</>, <>=</>, <>{pp(roundToDigits(h, 2))} cm</>],
        ])}
        <p>
          <strong>Volumen berechnen</strong>
        </p>
        {buildEquation([
          [<>V</>, <>=</>, <>{buildInlineFrac(1, 3)} · G · h</>],
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
                  G besteht aus 5 Dreiecken
                </span>
              </Color4>
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              {buildInlineFrac(1, 3)} · 5 · {buildInlineFrac(<>a · y</>, 2)} · h
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              {buildInlineFrac(1, 3)} · 5 ·{' '}
              {buildInlineFrac(
                <>
                  {pp(roundToDigits(a, 2))} cm · {pp(roundToDigits(y, 2))} cm
                </>,
                2,
              )}{' '}
              · {pp(roundToDigits(h, 2))} cm
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              <strong>{pp(roundToDigits(volume, 2))} cm³</strong>
            </>,
          ],
        ])}{' '}
      </>
    )
  },
}
