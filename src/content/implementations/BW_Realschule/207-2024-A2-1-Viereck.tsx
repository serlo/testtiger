import { Exercise } from '@/data/types'
import {
  buildEquation,
  buildInlineFrac,
  buildOverline,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  bc: number
  ce: number
  eps: number
}

export const exercise207: Exercise<DATA> = {
  title: 'Rechteck',
  source: '2024 Pftlichtteil A2 Aufgabe 1',
  useCalculator: true,
  duration: 5,
  points: 4,
  generator(rng) {
    return {
      bc: rng.randomIntBetween(30, 50) / 10,
      ce: rng.randomIntBetween(55, 80) / 10,
      eps: rng.randomIntBetween(40, 55),
    }
  },
  originalData: { bc: 4.6, ce: 7.2, eps: 49 },
  constraint({ data }) {
    const cf = Math.sin((2 * Math.PI * data.eps) / 360) * data.ce
    return data.eps != 45 && data.bc < cf
  },
  task({ data }) {
    const cf = Math.sin((2 * Math.PI * data.eps) / 360) * data.ce
    const gamma = (360 * Math.cos(data.bc / cf)) / (2 * Math.PI)
    const gamma2 = 90 - data.eps
    const gamma3 = 90 - gamma - gamma2
    const cd = Math.cos((2 * Math.PI * gamma3) / 360) * data.ce
    const de = Math.sin((2 * Math.PI * gamma3) / 360) * data.ce
    const bf = Math.sin((2 * Math.PI * gamma) / 360) * cf

    return (
      <>
        <p>Im Rechteck ABCD gilt:</p>
        <p>
          {buildOverline(<>BC</>)} = {pp(data.bc)} cm<br></br>
          {buildOverline(<>CE</>)} = {pp(data.ce)} cm<br></br>ε = {pp(data.eps)}
          °
        </p>
        <svg viewBox="0 0 328 160">
          <image
            href="/content/BW_Realschule/207_Viereck.jpg"
            height="160"
            width="328"
          />
        </svg>
        <p>Berechne den Umfang des Vierecks ABCD.</p>
      </>
    )
  },
  solution({ data }) {
    const cf = Math.sin((2 * Math.PI * data.eps) / 360) * data.ce
    const gamma =
      (360 * Math.acos(data.bc / roundToDigits(cf, 2))) / (2 * Math.PI)
    const gamma2 = 90 - data.eps
    const gamma3 = 90 - gamma - gamma2
    const cd = Math.cos((2 * Math.PI * gamma3) / 360) * data.ce
    const de = Math.sin((2 * Math.PI * gamma3) / 360) * data.ce
    const bf = Math.sin((2 * Math.PI * gamma) / 360) * cf
    return (
      <>
        <p>
          Für den Umfang benötigst du die Seitenlängen von{' '}
          {buildOverline(<>BC</>)} und {buildOverline(<>CD</>)}.
        </p>
        <p>
          <strong>Länge von {buildOverline(<>CF</>)} berechnen</strong>
        </p>
        <p>
          Bestimme die Länge von {buildOverline(<>CF</>)} im rechtwinkligen
          Dreieck CEF:
        </p>
        {buildEquation([
          [
            <>sin(ε)</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{buildOverline(<>CF</>)}</>,
                <>{buildOverline(<>CE</>)}</>,
              )}
            </>,
          ],
          [
            <>sin({data.eps}°)</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{buildOverline(<>CF</>)}</>,
                <>{pp(data.ce)}</>,
              )}
            </>,
            <>| · {pp(data.ce)}</>,
          ],
          [
            <>{buildOverline(<>CF</>)}</>,
            <>=</>,
            <>
              sin({data.eps}°) · {pp(data.ce)}
            </>,
          ],
          [
            <>{buildOverline(<>CF</>)}</>,
            <>≈</>,
            <>{pp(roundToDigits(cf, 2))} cm</>,
          ],
        ])}
        <p>
          <strong>Winkel in C berechnen</strong>
        </p>
        <svg viewBox="0 0 328 160">
          <image
            href="/content/BW_Realschule/207_Viereck.jpg"
            height="160"
            width="328"
          />
          <path
            d="
    M 267 16                 
    L 200 16               
    A 90 90 0 0 0 205 33 
    Z                     
  "
            fill="lightgray"
            stroke="black"
            stroke-width="2"
          />
          <path
            d="
    M 267 16                 
    L 225 28               
    A 90 90 0 0 0 249 50 
    Z                     
  "
            fill="lightgray"
            stroke="black"
            stroke-width="2"
          />
          <path
            d="
  M 267 16                 
  L 244 58               
  A 90 90 0 0 0 266 65 
  Z                     
"
            fill="lightgray"
            stroke="black"
            stroke-width="2"
          />
          <text x={208} y={27} fontSize={15} textAnchor="right" stroke="black">
            α
          </text>
          <text x={243} y={37} fontSize={15} textAnchor="right" stroke="black">
            β
          </text>
          <text x={254} y={55} fontSize={15} textAnchor="right" stroke="black">
            γ
          </text>
        </svg>
        <p>Berechne γ im Dreieck BCF:</p>
        {buildEquation([
          [
            <>cos(γ)</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{buildOverline(<>BC</>)}</>,
                <>{buildOverline(<>CF</>)}</>,
              )}
            </>,
          ],
          [
            <>cos(γ)</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{pp(data.bc)}</>,
                <>{pp(roundToDigits(cf, 2))}</>,
              )}
            </>,
            <>
              | cos<sup>-1</sup>()
            </>,
          ],

          [
            <>γ</>,
            <>=</>,
            <>
              cos<sup>-1</sup>
              <span className="inline-block  scale-y-[2]">(</span>
              {buildInlineFrac(
                <>{pp(data.bc)}</>,
                <>{pp(roundToDigits(cf, 2))}</>,
              )}
              <span className="inline-block  scale-y-[2]">)</span>
            </>,
          ],
          [<>γ</>, <>≈</>, <>{pp(roundToDigits(gamma, 2))}°</>],
        ])}
        <p>Berechne β über die Winkelsumme im Dreieck CEF:</p>
        <p>
          β = 180° − 90° − {data.eps}° = {gamma2}°
        </p>
        <p>Berechne α mithilfe von β und γ:</p>
        <p>
          α = 90° − {gamma2}° − {pp(roundToDigits(gamma, 2))}° ={' '}
          {pp(90 - gamma2 - roundToDigits(gamma, 2))}°
        </p>
        <p>
          <strong>Länge von {buildOverline(<>CD</>)} berechnen</strong>
        </p>
        <p>Berechne die Länge von {buildOverline(<>CD</>)} im Dreieck CDE:</p>
        {buildEquation([
          [
            <>cos(α)</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{buildOverline(<>CD</>)}</>,
                <>{buildOverline(<>CE</>)}</>,
              )}
            </>,
          ],
          [
            <>cos({pp(90 - gamma2 - roundToDigits(gamma, 2))}°)</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{buildOverline(<>CD</>)}</>,
                <>{pp(data.ce)}</>,
              )}
            </>,
            <>| · {pp(data.ce)}</>,
          ],
          [
            <>{buildOverline(<>CD</>)}</>,
            <>=</>,
            <>
              cos({pp(90 - gamma2 - roundToDigits(gamma, 2))}°) · {pp(data.ce)}
            </>,
          ],
          [
            <>{buildOverline(<>CD</>)}</>,
            <>≈</>,
            <>{pp(roundToDigits(cd, 2))} cm</>,
          ],
        ])}
        <p>
          <strong>Umfang berechnen</strong>
        </p>
        {buildEquation([
          [
            <>U</>,
            <>=</>,
            <>
              2 · {buildOverline(<>CD</>)} +2 · {buildOverline(<>BC</>)}
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              2 · {pp(roundToDigits(cd, 2))} cm +2 ·{' '}
              {pp(roundToDigits(data.bc, 2))} cm
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              <strong>
                {pp(roundToDigits(cd, 2) * 2 + 2 * roundToDigits(data.bc, 2))}{' '}
                cm
              </strong>
            </>,
          ],
        ])}
      </>
    )
  },
}
