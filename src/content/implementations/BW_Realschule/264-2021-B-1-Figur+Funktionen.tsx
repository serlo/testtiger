import { Exercise } from '@/data/types'
import {
  buildEquation,
  buildInlineFrac,
  buildOverline,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'
import { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES } from 'react'

interface DATA {
  ab: number
  alpha: number
  ce: number
  x1: number
  x2: number
  n1: number
  n2: number
}

export const exercise264: Exercise<DATA> = {
  title: 'Figur + Funktionen',
  source: '2021 Wahlteil B - Aufgabe 1',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      ab: rng.randomIntBetween(100, 150) / 10,
      alpha: rng.randomIntBetween(50, 75),
      ce: rng.randomIntBetween(60, 90) / 10,
      x1: rng.randomIntBetween(1, 4),
      x2: rng.randomIntBetween(5, 8),
      n1: rng.randomIntBetween(1, 4),
      n2: rng.randomIntBetween(6, 9),
    }
  },
  originalData: { ab: 13.2, alpha: 55, ce: 8, x1: 1, x2: 3, n1: -1, n2: 5 },
  constraint({ data }) {
    return true
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
              Gegeben sind das rechtwinklige Dreieck ABC und das
              gleichschenklige Dreieck ADE.
            </p>
            <svg viewBox="0 0 328 190">
              <image
                href="/content/BW_Realschule/264_Figur.jpg"
                height="190"
                width="328"
              />
            </svg>
            <p>
              Es gilt: <br></br>
              {buildOverline('AB')} = {pp(data.ab)} cm <br></br>α ={' '}
              {pp(data.alpha)}°<br></br>
              {buildOverline('CE')} = {pp(data.ce)} cm<br></br>
              {buildOverline('AE')} = {buildOverline('DE')}
            </p>
            <ul>
              <li>Berechne die Länge von {buildOverline('DF')}.</li>
              <li>Berechne den Umfang des Vierecks ABFE.</li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const ac = roundToDigits(
          data.ab / Math.cos((2 * Math.PI * data.alpha) / 360),
          2,
        )
        const df = ac - data.ce - data.ce
        const bf = roundToDigits(
          df * Math.sin((2 * Math.PI * data.alpha) / 360),
          2,
        )
        return (
          <>
            <p>
              <strong>Länge von {buildOverline('DF')}</strong>
            </p>
            <p>
              Berechne die Länge {buildOverline('AC')} im rechtwinkligen Dreieck
              ABC:
            </p>
            {buildEquation([
              [
                <>cos(α)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildOverline('AB')}</>,
                    <>{buildOverline('AC')}</>,
                  )}
                </>,
              ],
              [
                <>cos({pp(data.alpha)}°)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{pp(data.ab)} cm</>,
                    <>{buildOverline('AC')}</>,
                  )}
                </>,
                <>| · {buildOverline('AC')}</>,
              ],
              [
                <>
                  {buildOverline('AC')} · cos({pp(data.alpha)}°)
                </>,
                <>=</>,
                <>{pp(data.ab)} cm</>,
                <>| : cos({pp(data.alpha)}°)</>,
              ],
              [
                <>{buildOverline('AC')}</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{pp(data.ab)} cm</>,
                    <>cos({pp(data.alpha)}°)</>,
                  )}
                </>,
              ],
              [
                <>{buildOverline('AC')}</>,
                <>≈</>,
                <>
                  <strong>{pp(ac)} cm</strong>
                </>,
              ],
            ])}
            <p>Bestimme die Länge {buildOverline('AE')}:</p>
            <p>
              {buildOverline('AE')} = {buildOverline('AC')} −{' '}
              {buildOverline('CE')} = <strong>{pp(ac - data.ce)} cm</strong>
            </p>
            <p>
              Damit ist auch: {buildOverline('DE')} ={' '}
              <strong>{pp(ac - data.ce)} cm</strong>
            </p>

            <p>
              Um die Länge {buildOverline('DF')} über {buildOverline('EF')} zu
              bestimmen, muss begründet werden, dass das Dreieck CEF
              gleichschenklig ist:
            </p>
            <svg viewBox="0 0 328 190">
              <image
                href="/content/BW_Realschule/264_Figur2.jpg"
                height="190"
                width="328"
              />
            </svg>
            <ul>
              <li>
                β = 180° − 2 · {pp(data.alpha)}° = {pp(180 - 2 * data.alpha)}°
              </li>
              <li>
                γ = 180° − {pp(180 - 2 * data.alpha)}° = {pp(2 * data.alpha)}°
              </li>
              <li>δ = 180° − 90° − α = {pp(180 - 90 - data.alpha)}°</li>
              <li>
                ε = 180° − {pp(2 * data.alpha)}° − {pp(180 - 90 - data.alpha)}°
                = {pp(180 - 90 - data.alpha)}°
              </li>
            </ul>
            <p>
              Da die Winkel δ und ε gleich sind, ist das Dreieck
              gleichschenklig. Das bedeutet:<br></br> {buildOverline('EF')} ={' '}
              {buildOverline('CE')} = <strong>{pp(data.ce)} cm</strong>
            </p>
            <p>Berechne damit {buildOverline('DF')}:</p>
            <p>
              {buildOverline('DF')} = {buildOverline('DE')} −{' '}
              {buildOverline('EF')} ={' '}
              <strong>{pp(ac - data.ce - data.ce)} cm</strong>
            </p>
            <p>
              <strong>Umfang von ABFE</strong>
            </p>
            <p>
              Berechne die Länge {buildOverline('BF')} im rechtwinkligen Dreieck
              BDF.
            </p>
            <div>
              <span style={{ fontSize: '0.9em' }}>
                {buildEquation([
                  [
                    <>sin(α)</>,
                    <>=</>,
                    <>
                      {buildInlineFrac(
                        <>{buildOverline('BF')}</>,
                        <>{buildOverline('DF')}</>,
                      )}
                    </>,
                  ],
                  [
                    <>sin({pp(data.alpha)}°)</>,
                    <>=</>,
                    <>
                      {buildInlineFrac(
                        <>{buildOverline('BF')}</>,
                        <>{pp(df)} cm</>,
                      )}
                    </>,
                    <>| · {pp(df)} cm</>,
                  ],
                  [
                    <>{buildOverline('BF')}</>,
                    <>=</>,
                    <>
                      sin({pp(data.alpha)}°) · {pp(df)} cm
                    </>,
                  ],
                  [
                    <>{buildOverline('BF')}</>,
                    <>≈</>,
                    <>
                      <strong>{pp(bf)} cm</strong>
                    </>,
                  ],
                ])}
              </span>
            </div>
            <p>
              Berechne aus den einzelnen Seitenlängen den Umfang des Vierecks:
            </p>
            <div>
              <span style={{ fontSize: '0.9em' }}>
                {buildEquation([
                  [
                    <>U</>,
                    <>=</>,
                    <>
                      {buildOverline('BF')} + {buildOverline('EF')} +{' '}
                      {buildOverline('AE')} + {buildOverline('AB')}
                    </>,
                  ],
                  [
                    <></>,
                    <>=</>,
                    <>
                      {pp(bf)} cm + {pp(data.ce)} cm + {pp(ac - data.ce)} cm +{' '}
                      {pp(data.ab)} cm
                    </>,
                  ],
                  [
                    <></>,
                    <>=</>,
                    <>
                      <strong>
                        {pp(bf + data.ce + ac - data.ce + data.ab)} cm
                      </strong>
                    </>,
                  ],
                ])}
              </span>
            </div>
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
        const x1 = data.x1
        const x2 = data.x2
        const y1 = (data.x1 - data.n1) * (data.x1 - data.n2)
        const y2 = (data.x2 - data.n1) * (data.x2 - data.n2)
        return (
          <>
            <p>
              Die Punkte A({pp(data.x1)}|{pp(y1)}) und B({pp(data.x2)}|{pp(y2)})
              liegen auf einer nach oben geöffneten verschobenen Normalparabel
              p.
            </p>
            <ul>
              <li>
                Gib die Funktionsgleichung der Parabel p in der Normalform{' '}
                <br></br>y = x² + bx + c an.
              </li>
            </ul>
            <p>
              Die Schnittpunkte der Parabel p mit der x-Achse und die Punkte A
              und B bilden ein Viereck.{' '}
            </p>
            <ul>
              <li>Berechne den Flächeninhalt dieses Vierecks.</li>
            </ul>
            <p>
              Die Geraden g und h verlaufen jeweils auf den Diagonalen des
              Vierecks. Sie schneiden sich im Punkt Q.
            </p>
            <ul>
              <li>Berechne die Koordinaten des Schnittpunktes Q.</li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const x1 = data.x1
        const x2 = data.x2
        const y1 = (data.x1 - data.n1) * (data.x1 - data.n2)
        const y2 = (data.x2 - data.n1) * (data.x2 - data.n2)
        const b = (y1 - y2 - (x1 * x1 - x2 * x2)) / (x1 - x2)
        return (
          <>
            <p>
              Die Parabel p<sub>2</sub> verläuft durch die Punkte A(
              {pp(x1)}|{pp(y1)}) und B({pp(x2)}|{pp(y2)}
              ).
            </p>
            <p>
              Setze die Punkte jeweils in die allgemeine Form y = x² + bx + c
              ein:
            </p>
            <p>
              I &nbsp;&nbsp;&nbsp; {pp(y1)} = {pp(x1, 'embrace_neg')}² + b ·{' '}
              {pp(x1, 'embrace_neg')} + c<br></br>II &nbsp;&nbsp;&nbsp; {pp(y2)}{' '}
              = {pp(x2, 'embrace_neg')}² + b · {pp(x2, 'embrace_neg')} + c
            </p>
            <p>
              Die Gleichungen I und II beschreiben ein lineares
              Gleichungssystem. Löse es, um die Parameter b und c der Parabel zu
              bestimmen:
            </p>
            <p>
              I &nbsp;&nbsp;&nbsp; {pp(y1)} = {pp(x1 * x1)} {pp(x1, 'merge_op')}
              b + c<br></br>II &nbsp;&nbsp;&nbsp; {pp(y2)} = {pp(x2 * x2)}{' '}
              {pp(x2, 'merge_op')}b + c
            </p>
            <p>
              Subtrahiere die Gleichungen voneinander, um c aus dem Gleichungen
              zu entfernen:
            </p>
            <p>
              I - II: {pp(y1)} − {pp(y2, 'embrace_neg')} = {pp(x1 * x1)} −{' '}
              {pp(x2 * x2)} {pp(x1, 'merge_op')}b {pp(-x2, 'merge_op')}b
            </p>
            <p>Fasse die Terme zusammen und löse die Gleichung nach b:</p>
            {buildEquation([
              [
                <>{pp(y1 - y2)}</>,
                <>=</>,
                <>
                  {pp(x1 * x1 - x2 * x2)} {pp(x1 - x2, 'merge_op')}b
                </>,
                <>| {pp(-(x1 * x1 - x2 * x2), 'merge_op')}</>,
              ],
              [
                <>{pp(y1 - y2 - (x1 * x1 - x2 * x2))}</>,
                <>=</>,
                <>{pp(x1 - x2)}b</>,
                <>| : {pp(x1 - x2, 'embrace_neg')}</>,
              ],
              [
                <>b</>,
                <>=</>,
                <>{pp((y1 - y2 - (x1 * x1 - x2 * x2)) / (x1 - x2))}</>,
              ],
            ])}
            <p>
              Sezte den Wert für b in eine der Gleichungen ein. In I eingesetzt:
            </p>
            {buildEquation([
              [
                <>{pp(y1)} </>,
                <>=</>,
                <>
                  {pp(x1 * x1)} {pp(x1, 'merge_op')} · {pp(b, 'embrace_neg')} +
                  c
                </>,
              ],
              [
                <>{pp(y1)}</>,
                <>=</>,
                <>{pp(x1 * x1 + x1 * b)} + c</>,
                <>| {pp(-(x1 * x1 + x1 * b), 'merge_op')}</>,
              ],
              [<>c</>, <>=</>, <>{pp(y1 - (x1 * x1 + x1 * b))}</>],
            ])}
            <p>Damit lautet der Funktionsterm:</p>
            <p>
              <strong>
                y = x² {pp(b, 'merge_op')}x{' '}
                {pp(y1 - (x1 * x1 + x1 * b), 'merge_op')}
              </strong>
            </p>
          </>
        )
      },
    },
  ],
}
