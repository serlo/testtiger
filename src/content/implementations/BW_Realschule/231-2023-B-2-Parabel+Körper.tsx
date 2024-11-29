import { Exercise } from '@/data/types'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp, ppPolynom } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  x_s: number
  y_s: number
  gx: number
  gy: number
  b: number
  a: number
  hk: number
  hp: number
}

export const exercise231: Exercise<DATA> = {
  title: 'Parabel + Körper',
  source: '2023 Wahlteil B - Aufgabe 2',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      x_s: rng.randomIntBetween(0, 4),
      y_s: rng.randomIntBetween(-3, 5),
      gx: rng.randomIntBetween(2, 5),
      gy: rng.randomIntBetween(-6, -1),
      b: rng.randomIntBetween(-5, -1),
      a: rng.randomIntBetween(60, 95) / 10,
      hk: rng.randomIntBetween(130, 170) / 10,
      hp: rng.randomIntBetween(55, 90) / 10,
    }
  },
  originalData: {
    x_s: 2,
    y_s: -3,
    gx: 3,
    gy: -5,
    b: -2,
    a: 8.6,
    hk: 15.2,
    hp: 7.6,
  },
  constraint({ data }) {
    function parabola(x: number) {
      return (x - data.x_s) * (x - data.x_s) + data.y_s
    }
    const b = (parabola(4) - (16 + parabola(0))) / 4
    const m = (data.gy - data.b) / data.gx
    const p = b - m
    const q = parabola(0) - data.b
    return (
      b != 0 &&
      parabola(0) != 0 &&
      data.gy != data.b &&
      m % 1 == 0 &&
      (p / 2) * (p / 2) - q < 0
    )
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
        function parabola(x: number) {
          return (x - data.x_s) * (x - data.x_s) + data.y_s
        }
        return (
          <>
            <p>
              Zu einer verschobenen nach oben geöffneten Normalparabel p
              <sub>1</sub> gehört die unvollständige Wertetabelle.{' '}
            </p>
            <div
              className="relative overflow-hidden rounded-lg max-w-[250px] mx-auto"
              style={{
                transform: 'scale(1)',
                transformOrigin: 'top left',
              }}
            >
              <table className="table-auto rounded-lg shadow-md w-full text-left text-[9px]">
                <thead className="uppercase  text-[#404040]">
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] bg-[#D2ECF6]">
                      x
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      -1
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      0
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      1
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      2
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      3
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      4
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      5
                    </td>
                  </tr>
                </thead>
                <tbody
                  className="bg-white text-gray-500"
                  style={{ backgroundColor: '#FFFFFF', color: '#6b7280' }}
                >
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] bg-[#D2ECF6]">
                      y
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]"></td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      {parabola(0)}
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]"></td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]"></td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]"></td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      {parabola(4)}
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul>
              <li>
                Bestimme die Funktionsgleichung von p<sub>1</sub>.
              </li>
              <li>Vervollständige die Wertetabelle.</li>
            </ul>
            <p>
              Die Gerade g hat die Funktionsgleichung y = mx{' '}
              {pp(data.b, 'merge_op')} und geht durch den Punkt P(
              {pp(data.gx)}|{pp(data.gy)}).{' '}
            </p>
            <ul>
              <li>Berechne die Funktionsgleichung von g.</li>
              <li>
                Zeige rechnerisch, dass g keinen Schnittpunkt mit p<sub>1</sub>{' '}
                hat.
              </li>
              <li>
                Gib die Funktionsgleichung einer verschobenen nach oben
                geöffneten Normalparabel p<sub>2</sub> an, die keinen
                Schnittpunkt mit g und p<sub>1</sub> hat.
              </li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        function parabola(x: number) {
          return (x - data.x_s) * (x - data.x_s) + data.y_s
        }
        const b = (parabola(4) - (16 + parabola(0))) / 4
        const m = (data.gy - data.b) / data.gx
        const p = b - m
        const q = parabola(0) - data.b
        return (
          <>
            <p>
              <strong>Funktionsgleichung der Parabel</strong>
            </p>
            <p>
              Der Punkt (0|{parabola(0)}) ist der y-Achsenabschnitt der Parabel.
              Damit hat die Funktionsgleichung die Form:<br></br> y = x² + bx{' '}
              {pp(parabola(0), 'merge_op')}
            </p>
            <p>Setze den Punkt (4|{parabola(4)}) ein und bestimme b:</p>
            {buildEquation([
              [<>y</>, <>=</>, <>x² + bx {pp(parabola(0), 'merge_op')}</>],
              [
                <>{parabola(4)}</>,
                <>=</>,
                <>4² + 4b {pp(parabola(0), 'merge_op')}</>,
              ],
              [
                <>{parabola(4)}</>,
                <>=</>,
                <>4b {pp(16 + parabola(0), 'merge_op')}</>,
                <>| {pp(-(16 + parabola(0)), 'merge_op')}</>,
              ],
              [
                <>{pp(parabola(4) - (16 + parabola(0)))}</>,
                <>=</>,
                <>4b </>,
                <>| : 4</>,
              ],
              [<>b</>, <>=</>, <>{pp(b)}</>],
            ])}
            <p>
              Die Funktionsgleichung ist:{' '}
              <strong>
                y = x² {pp(b, 'merge_op')}x {pp(parabola(0), 'merge_op')}
              </strong>
            </p>
            <p>
              <strong>Wertetabelle ausfüllen</strong>
            </p>
            <p>
              Setze die fehlenden x-Werte in die Funktion ein und sülle die
              Tabelle aus:
            </p>
            <div
              className="relative overflow-hidden rounded-lg max-w-[100px] mx-auto"
              style={{
                transform: 'scale(1)',
                transformOrigin: 'top left',
              }}
            >
              <table className="table-auto rounded-lg shadow-md w-full text-left text-[9px]">
                <thead
                  className="uppercase bg-[#D2ECF6] text-[#404040]"
                  style={{ backgroundColor: '#D2ECF6', color: '#404040' }}
                >
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      x
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] border-r-[#6D5E5E]">
                      y
                    </td>
                  </tr>
                </thead>
                <tbody
                  className="bg-white text-gray-500"
                  style={{ backgroundColor: '#FFFFFF', color: '#6b7280' }}
                >
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      -1
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] border-r-[#6D5E5E]">
                      {parabola(-1)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      0
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] border-r-[#6D5E5E]">
                      {parabola(0)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      1
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] border-r-[#6D5E5E]">
                      {parabola(1)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      2
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] border-r-[#6D5E5E]">
                      {parabola(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      3
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] border-r-[#6D5E5E]">
                      {parabola(3)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      4
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] border-r-[#6D5E5E]">
                      {parabola(4)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E]">
                      5
                    </td>
                    <td className="py-1 border text-center font-bold p-1 border-[#6D5E5E] border-r-[#6D5E5E]">
                      {parabola(5)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Funktionsgleichung der Geraden</strong>
            </p>
            <p>
              Die Gerade verläuft durch den Punkt <br></br>P(
              {pp(data.gx)}|{pp(data.gy)}).
            </p>
            <p>Setze P ein und bestimme die Steigung m:</p>
            {buildEquation([
              [<>y</>, <>=</>, <>mx {pp(data.b, 'merge_op')}</>],
              [
                <>{pp(data.gy)}</>,
                <>=</>,
                <>
                  m · {pp(data.gx)} {pp(data.b, 'merge_op')}
                </>,
                <>| {pp(-data.b, 'merge_op')}</>,
              ],
              [
                <>{pp(data.gy - data.b)}</>,
                <>=</>,
                <>{pp(data.gx)}m</>,
                <>| : {pp(data.gx)}</>,
              ],
              [<>m</>, <>=</>, <>{pp(m)}</>],
            ])}
            <p>
              Damit ist der Funktionsterm:{' '}
              <strong>
                y = {ppPolynom([[m, 'x', 1]])} {pp(data.b, 'merge_op')}
              </strong>
            </p>
            <p>
              <strong>Schnittpunkt mit der Parabel</strong>
            </p>
            <p>
              Setze g und p<sub>1</sub> gleich und löse die Gleichung:
            </p>
            {buildEquation([
              [
                <>
                  {ppPolynom([[m, 'x', 1]])} {pp(data.b, 'merge_op')}
                </>,
                <>=</>,
                <>
                  x² {pp(b, 'merge_op')}x {pp(parabola(0), 'merge_op')}
                </>,
                <>| {pp(-data.b, 'merge_op')}</>,
              ],
              [
                <>{ppPolynom([[m, 'x', 1]])}</>,
                <>=</>,
                <>
                  x² {pp(b, 'merge_op')}x {pp(parabola(0) - data.b, 'merge_op')}
                </>,
                <>| {ppPolynom([[-m, 'x', 1]])}</>,
              ],
              [
                <>0</>,
                <>=</>,
                <>
                  x² {pp(b - m, 'merge_op')}x{' '}
                  {pp(parabola(0) - data.b, 'merge_op')}
                </>,
              ],
            ])}
            <p>
              Das ist eine quadratische Gleichung, die mit der pq-Formel gelöst
              werden kann.
            </p>

            {buildEquation([
              [
                <>
                  x<sub>1/2</sub>
                </>,
                <>=</>,
                <>
                  −{buildInlineFrac('p', 2)} ±{' '}
                  {buildSqrt(
                    <>
                      <span className="inline-block  scale-y-[2.6]">(</span>
                      {buildInlineFrac('p', 2)}
                      <span className="inline-block  scale-y-[2.6]">)</span>² −
                      q
                    </>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  −{buildInlineFrac(p, 2)} ±{' '}
                  {buildSqrt(
                    <>
                      <span className="inline-block  scale-y-[2.6]">(</span>
                      {buildInlineFrac(p, 2)}
                      <span className="inline-block  scale-y-[2.6]">)</span>² −{' '}
                      {q < 0 && <>(</>}
                      {pp(q)}
                      {q < 0 && <>)</>}
                    </>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  −{buildInlineFrac(p, 2)} ±{' '}
                  {buildSqrt(<>{pp((p / 2) * (p / 2) - q)}</>)}
                </>,
              ],
            ])}
            <p>
              Der Term unter der Wurzel ist negativ. Das bedeutet es gibt keine
              Lösung und die beiden Funktionen haben keinen gemeinsamen Punkt.
            </p>
            <p>
              <strong>
                Parabel p<sub>2</sub>
              </strong>
            </p>
            <p>
              Eine mögliche Funktion ist <br></br>y = x² {pp(b, 'merge_op')}x{' '}
              {pp(parabola(0) + 1, 'merge_op')}
            </p>
            <p>
              Sie liegt eine Einheit oberhalb p<sub>1</sub> und wird von p
              <sub>1</sub> links und rechts umgeben. Somit kann sich p
              <sub>2</sub> auch nicht mit der Gerade schneiden.
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
            <p>
              Aus einem Kegel wird eine regelmäßige fünfseitige Pyramide
              herausgearbeitet (siehe Abbildung). ie Eckpunkte der Grundfläche
              der fünfseitigen Pyramide liegen auf der Kreislinie der
              Grundfläche des Kegels.
            </p>
            <svg viewBox="0 0 328 190">
              <image
                href="/content/BW_Realschule/231_Körper.jpg"
                height="190"
                width="328"
              />
            </svg>
            <p>Es gilt: </p>
            <p>
              a = {pp(data.a)} cm (Grundkante der Pyramide)<br></br>h
              <sub>k</sub> = {pp(data.hk)} cm (Körperhöhe des Kegels)<br></br>h
              <sub>P</sub> = {pp(data.hp)} cm (Körperhöhe der Pyramide)
            </p>
            <p>
              Um wie viele cm² unterscheiden sich die Inhalte der Mantelflächen
              des Kegels und der Pyramide?
            </p>
          </>
        )
      },
      solution({ data }) {
        const r = roundToDigits(
          data.a / 2 / Math.sin((2 * Math.PI * 36) / 360),
          2,
        )
        const s = roundToDigits(Math.sqrt(r * r + data.hk * data.hk), 2)
        const mk = roundToDigits(Math.PI * s * r, 2)
        const spyr = roundToDigits(Math.sqrt(r * r + data.hp * data.hp), 2)
        const hdreieck = roundToDigits(
          Math.sqrt((data.a / 2) * (data.a / 2) + spyr * spyr),
          2,
        )
        const mp = roundToDigits(5 * ((data.a * hdreieck) / 2), 2)
        return (
          <>
            <p>
              <strong>Mantelfläche des Kegels</strong>
            </p>
            <p>Bestimme den Radius des Kegels mithilfe der Seite a.</p>
            <svg viewBox="0 0 328 160">
              <image
                href="/content/BW_Realschule/231_Körper2.jpg"
                height="160"
                width="328"
              />
            </svg>
            <p>Im rechtwinkligen Dreieck gilt:</p>
            {buildEquation([
              [
                <>sin(36°)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildInlineFrac(<>a</>, <>2</>)}</>,
                    <>r</>,
                  )}
                </>,
              ],
              [
                <>sin(36°)</>,
                <>=</>,
                <>{buildInlineFrac(<>{pp(data.a / 2)} cm</>, <>r</>)}</>,
                <>| · r</>,
              ],
              [
                <>r · sin(36°)</>,
                <>=</>,
                <>{pp(data.a / 2)} cm</>,
                <>| : sin(36°)</>,
              ],
              [<>r</>, <>≈</>, <>{pp(r)} cm</>],
            ])}
            <p>
              Berechne zudem die Schräge s des Kegels, mit dem Satz des
              Pythagoras:
            </p>
            {buildEquation([
              [
                <>s²</>,
                <>=</>,
                <>
                  r² + h<sub>K</sub>²
                </>,
              ],
              [
                <>s²</>,
                <>=</>,
                <>
                  ({pp(r)} cm)² + ({pp(data.hk)} cm)²
                </>,
                <>| √</>,
              ],
              [<>s</>, <>≈</>, <>{pp(s)} cm</>],
            ])}
            <p>Setze in die Formel für die Mantelfläche ein:</p>
            {buildEquation([
              [
                <>
                  M<sub>K</sub>
                </>,
                <>=</>,
                <>π · r · s</>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  π · {pp(r)} cm · {pp(s)} cm
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  <strong>{pp(mk)} cm²</strong>
                </>,
              ],
            ])}
            <p>
              <strong>Mantelfläche der Pyramide</strong>
            </p>
            <p>
              Die Mantelfläche besteht aus fünf gleichen Dreiecken. Für den
              Flächeninhalt wird die Grundlinie a der Dreiecke benötigt und die
              Höhe der Dreiecke h<sub>Dreieck</sub>.
            </p>
            <p>
              Berechne die Länge der Schräge s<sub>Pyr</sub>:
            </p>
            {buildEquation([
              [
                <>
                  s<sub>Pyr</sub>²
                </>,
                <>=</>,
                <>
                  r² + h<sub>Pyr</sub>²
                </>,
              ],
              [
                <>
                  s<sub>Pyr</sub>²
                </>,
                <>=</>,
                <>
                  ({pp(r)} cm)² + ({pp(data.hp)} cm)²
                </>,
                <>| √</>,
              ],
              [
                <>
                  s<sub>Pyr</sub>
                </>,
                <>≈</>,
                <>{pp(spyr)} cm</>,
              ],
            ])}
            <p>Bestimme damit die Höhe der Dreiecke: </p>
            {buildEquation([
              [
                <>
                  h<sub>Dreieck</sub>²
                </>,
                <>=</>,
                <>
                  <span className="inline-block  scale-y-[2]">(</span>
                  {buildInlineFrac('a', 2)}
                  <span className="inline-block  scale-y-[2]">)</span>² + s
                  <sub>Pyr</sub>²
                </>,
              ],
              [
                <>
                  h<sub>Dreieck</sub>²
                </>,
                <>=</>,
                <>
                  ({pp(data.a / 2)} cm)² + ({pp(spyr)} cm)²
                </>,
                <>| √</>,
              ],
              [
                <>
                  h<sub>Dreieck</sub>
                </>,
                <>≈</>,
                <>{pp(hdreieck)} cm</>,
              ],
            ])}
            <p>Berechne die Mantelflächen aus den einzelnen Dreiecken:</p>
            {buildEquation([
              [
                <>
                  M<sub>Pyr</sub>
                </>,
                <>=</>,
                <>
                  5 ·{' '}
                  {buildInlineFrac(
                    <>
                      a · h<sub>Dreieck</sub>
                    </>,
                    2,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  5 ·{' '}
                  {buildInlineFrac(
                    <>
                      {pp(data.a)} cm · {pp(hdreieck)} cm
                    </>,
                    2,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <strong>{pp(mp)} cm²</strong>
                </>,
              ],
            ])}
            <p>
              <strong>Differenz der Mantelflächen</strong>
            </p>
            <p>Berechne die Differenz:</p>
            <p>
              {mk > mp ? (
                <>
                  M<sub>K</sub> − M<sub>Pyr</sub> = {pp(mk)} cm² − {pp(mp)} cm²
                </>
              ) : (
                <>
                  M<sub>Pyr</sub> − M<sub>K</sub> = {pp(mp)} cm² − {pp(mk)} cm²
                </>
              )}
              <br></br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              = <strong>{pp(Math.abs(mk - mp))} cm²</strong>
            </p>
          </>
        )
      },
    },
  ],
}
