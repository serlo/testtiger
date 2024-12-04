import { Exercise } from '@/data/types'
import {
  buildEquation,
  buildInlineFrac,
  buildOverline,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  ac: number
  alpha: number
}

export const exercise241: Exercise<DATA> = {
  title: 'Dreieck',
  source: '2022 Pflichtteil A2 - Aufgabe 1',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      ac: rng.randomIntBetween(70, 110) / 10,
      alpha: rng.randomIntBetween(6, 9) * 5,
    }
  },
  originalData: { ac: 9.5, alpha: 40 },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>Im rechtwinkligen Dreieck ABC gilt:</p>
        <p>
          {buildOverline('AC')} = {pp(data.ac)} cm<br></br>α = {data.alpha}°
          <br></br>
          {buildOverline('BC')} = {buildOverline('BD')}
        </p>
        <svg viewBox="0 0 328 170">
          <image
            href="/content/BW_Realschule/241_Dreieck.jpg"
            height="170"
            width="328"
          />
        </svg>
        <p>Berechne den Umfang des Dreiecks ADC.</p>
      </>
    )
  },
  solution({ data }) {
    const ab = roundToDigits(
      data.ac / Math.cos((data.alpha * 2 * Math.PI) / 360),
      2,
    )
    const bc = roundToDigits(ab * Math.sin((data.alpha * 2 * Math.PI) / 360), 2)
    const beta = 180 - 90 - data.alpha
    const cd = roundToDigits(2 * bc * Math.sin((Math.PI * beta) / 360), 2)
    return (
      <>
        <p>
          Die Länge {buildOverline('AC')} = {pp(data.ac)} cm ist bereits
          gegeben. Berechne die Längen {buildOverline('AD')} und{' '}
          {buildOverline('CD.')}
        </p>
        <p>
          <strong>{buildOverline('AD')} berechnen</strong>
        </p>
        <p>
          AD ist ein Teil der Strecke AB. Berechne die Länge der Seite AB im
          rechtwinkligen Dreieck:
        </p>
        {buildEquation([
          [
            <>cos(α)</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{buildOverline('AC')}</>,
                <>{buildOverline('AB')}</>,
              )}
            </>,
          ],
          [
            <>cos({data.alpha}°)</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{pp(data.ac)} cm</>,
                <>{buildOverline('AB')}</>,
              )}
            </>,
            <>| · {buildOverline('AB')}</>,
          ],
          [
            <>
              cos({data.alpha}°) · {buildOverline('AB')}
            </>,
            <>=</>,
            <>{pp(data.ac)} cm</>,
            <>| : cos({data.alpha}°)</>,
          ],
          [
            <>{buildOverline('AB')}</>,
            <>=</>,
            <>
              {buildInlineFrac(<>{pp(data.ac)} cm</>, <>cos({data.alpha}°)</>)}
            </>,
          ],
          [<>{buildOverline('AB')}</>, <>≈</>, <>{pp(ab)} cm</>],
        ])}
        <p>
          Um die Länge {buildOverline('AD')} zu berechnen, wird{' '}
          {buildOverline('BD')} benötigt. Berechne dafür {buildOverline('BC')}{' '}
          im rechtwinkligen Dreieck:
        </p>
        <div>
          <span style={{ fontSize: '0.8em' }}>
            {buildEquation([
              [
                <>sin(α)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildOverline('BC')}</>,
                    <>{buildOverline('AB')}</>,
                  )}
                </>,
              ],
              [
                <>sin({data.alpha}°)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildOverline('BC')}</>,
                    <>{pp(ab)} cm</>,
                  )}
                </>,
                <>| · {pp(ab)} cm</>,
              ],
              [
                <>
                  sin({data.alpha}°) · {pp(ab)} cm
                </>,
                <>=</>,
                <>{buildOverline('BC')}</>,
              ],
              [<>{buildOverline('BC')}</>, <>≈</>, <>{pp(bc)} cm</>],
            ])}
          </span>
        </div>
        <p>Im gleichschenkligen Dreieck gilt damit:</p>
        <p>
          {buildOverline('BC')} = {pp(bc)} cm = {buildOverline('BD')}
        </p>
        <p>Berechne damit {buildOverline('AD')}:</p>
        <p>
          <div>
            <span style={{ fontSize: '0.8em' }}>
              {buildOverline('AD')} = {buildOverline('AB')} −{' '}
              {buildOverline('BD')} = {pp(ab)} cm − {pp(bc)} cm = {pp(ab - bc)}{' '}
              cm
            </span>
          </div>
        </p>
        <p>
          <strong>{buildOverline('CD')} berechnen</strong>
        </p>
        <p>
          {buildOverline('CD')} kann im gleichschenkligen Dreieck BCD berechnet
          werden.
        </p>
        <svg viewBox="0 0 328 170">
          <image
            href="/content/BW_Realschule/241_Dreieck2.jpg"
            height="170"
            width="328"
          />
        </svg>
        <p>Der Winkel β kann über die Winkelsumme berechnet werden:</p>
        <p>180° − 90° − α = {beta}°</p>
        <p>
          {buildOverline('CD')} kann über die rechtwinkligen Dreiecke innerhalb
          BCD berechnet werden:
        </p>
        <div>
          <span style={{ fontSize: '0.8em' }}>
            {buildEquation([
              [
                <>
                  sin<span className="inline-block  scale-y-[2]">(</span>
                  {buildInlineFrac(<>β</>, 2)}
                  <span className="inline-block  scale-y-[2]">)</span>
                </>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildInlineFrac(<>{buildOverline('CD')}</>, <>2</>)}</>,
                    <>{buildOverline('BD')}</>,
                  )}
                </>,
              ],
              [
                <>sin({beta / 2}°)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildInlineFrac(<>{buildOverline('CD')}</>, <>2</>)}</>,
                    <>{pp(bc)} cm</>,
                  )}
                </>,
                <>| · {pp(bc)} cm &nbsp;&nbsp;&nbsp;&nbsp;| · 2</>,
              ],
              [
                <>{buildOverline('CD')}</>,
                <>=</>,
                <>
                  2 · {pp(bc)} cm · sin({beta / 2}°)
                </>,
              ],
              [<>{buildOverline('CD')}</>, <>≈</>, <>{pp(cd)} cm</>],
            ])}
          </span>
        </div>
        <p>
          <strong>Umfang von ADC berechnen</strong>
        </p>
        {buildEquation([
          [
            <>U</>,
            <>=</>,
            <>
              {buildOverline('AD')} + {buildOverline('CD')} +{' '}
              {buildOverline('AC')}
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              {pp(ab - bc)} cm + {pp(cd)} cm + {pp(data.ac)} cm
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              <strong>{pp(ab - bc + cd + data.ac)} cm</strong>
            </>,
          ],
        ])}
      </>
    )
  },
}
