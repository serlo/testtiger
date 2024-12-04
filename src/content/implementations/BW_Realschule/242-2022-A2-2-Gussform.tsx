import { Exercise } from '@/data/types'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  anzahl: number
  radius: number
  t: number
  s: number
  aw: number
}

export const exercise242: Exercise<DATA> = {
  title: 'Gussform',
  source: '2022 Pflichtteil A2 - Aufgabe 2',
  useCalculator: false,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      anzahl: rng.randomIntBetween(6, 15) * 100,
      radius: rng.randomIntBetween(2, 6) * 0.5,
      t: rng.randomIntBetween(1, 3),
      s: rng.randomIntBetween(4, 6),
      aw: rng.randomIntBetween(8, 14),
    }
  },
  originalData: { anzahl: 1000, radius: 1.5, t: 1, s: 9, aw: 10 },
  constraint({ data }) {
    const wachskugeln = roundToDigits(
      data.anzahl * (4 / 3) * Math.PI * data.radius * data.radius * data.radius,
      2,
    )
    const a = data.aw - 2 * data.t
    const hs = roundToDigits(Math.sqrt(data.s * data.s - (a / 2) * (a / 2)), 2)
    const h = roundToDigits(Math.sqrt(hs * hs - (a / 2) * (a / 2)), 2)
    return hs > a / 2
  },
  task({ data }) {
    return (
      <>
        <p>
          {data.anzahl} Wachskugeln werden eingeschmolzen. Sie haben jeweils
          einen Radius von {pp(data.radius)} cm. Mit diesem eingeschmolzenen
          Wachs werden quadratische Pyramiden gegossen. Dazu wird die
          abgebildete Gussform verwendet. Diese wird vollständig mit Wachs
          gefüllt.{' '}
        </p>
        <svg viewBox="0 0 328 250">
          <image
            href="/content/BW_Realschule/242_Körper.jpg"
            height="250"
            width="328"
          />
        </svg>
        <p>Es gilt:</p>
        <p>
          a<sub>w</sub> = {pp(data.aw)} cm (Grundkante Würfel)<br></br>s ={' '}
          {pp(data.s)} cm
          <br></br>t = {pp(data.t)} cm
        </p>
        <p>
          Wie viele solcher Pyramiden können mit dem eingeschmolzenen Wachs
          gegossen werden?
        </p>
      </>
    )
  },
  solution({ data }) {
    const wachskugeln = roundToDigits(
      data.anzahl * (4 / 3) * Math.PI * data.radius * data.radius * data.radius,
      2,
    )
    const a = data.aw - 2 * data.t
    const hs = roundToDigits(Math.sqrt(data.s * data.s - (a / 2) * (a / 2)), 2)
    const h = roundToDigits(Math.sqrt(hs * hs - (a / 2) * (a / 2)), 2)
    const volumen = roundToDigits((1 / 3) * a * a * h, 2)
    return (
      <>
        <p>
          <strong>Volumen der Kugeln</strong>
        </p>
        <p>Berechne das Volumen der {data.anzahl} Wachskugeln:</p>
        {buildEquation([
          [
            <>
              {data.anzahl} · V<sub>Kugel</sub>
            </>,
            <>=</>,
            <>
              {data.anzahl} · {ppFrac(4 / 3)} · π · r³
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              {data.anzahl} · {ppFrac(4 / 3)} · π · ({pp(data.radius)} cm)³
            </>,
          ],
          [<></>, <>≈</>, <>{pp(wachskugeln)} cm³</>],
        ])}
        <p>
          <strong>Volumen der Gussform</strong>
        </p>
        <p>
          Die Gussform hat die Form einer quadratischen Pyramide. Für das
          Volumen wird die Höhe h und die Grundseite a der Pyramide benötigt.
          Bestimme a:
        </p>
        <p>
          a = a<sub>w</sub> − 2 · t = {pp(a)} cm
        </p>
        <p>
          Berechne die Höhe der Seitenfläche der Pyramide mit dem Satz des
          Pythagoras:
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
                <>({data.s} cm)²</>,
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
        <p>
          Mit der selben Rechnung kann die Höhe h der Pyramide berechnet werden:
        </p>
        <div>
          <span style={{ fontSize: '0.7em' }}>
            {buildEquation([
              [
                <>
                  <span className="inline-block  scale-y-[2]">(</span>
                  {buildInlineFrac('a', 2)}
                  <span className="inline-block  scale-y-[2]">)</span>² + h ²
                </>,
                <>=</>,
                <>
                  h<sub>s</sub>²
                </>,
              ],
              [
                <>({pp(a / 2)} cm)² + h²</>,
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
        <p>Berchne das Volumen der Pyramide:</p>
        {buildEquation([
          [<>V</>, <>=</>, <>{ppFrac(1 / 3)} · G · h</>],
          [<></>, <>=</>, <>{ppFrac(1 / 3)} · a² · h</>],
          [
            <></>,
            <>=</>,
            <>
              {ppFrac(1 / 3)} · ({pp(a)} cm)² · ({pp(h)} cm)
            </>,
          ],
          [<></>, <>≈</>, <>{pp(volumen)} cm³</>],
        ])}
        <p>
          <strong>Anzahl der gegossenen Pyramiden</strong>
        </p>
        <p>
          Das Volumen der Wachskugeln wird in die Gussform gegossen. Berechne,
          wie viele Pyramiden sich damit füllen lassen:
        </p>
        <p>
          {pp(wachskugeln)} cm³ : {pp(volumen)} cm³ ={' '}
          <strong>{pp(roundToDigits(wachskugeln / volumen, 2))}</strong>
        </p>
        <p>
          Es lassen sich{' '}
          <strong>
            {pp(Math.floor(roundToDigits(wachskugeln / volumen, 2)))} ganze
            Pyramiden
          </strong>{' '}
          gießen.
        </p>
      </>
    )
  },
}
