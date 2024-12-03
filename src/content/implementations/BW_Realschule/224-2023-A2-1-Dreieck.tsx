import { Exercise } from '@/data/types'
import {
  buildEquation,
  buildInlineFrac,
  buildOverline,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  cd: number
  gamma: number
}

export const exercise224: Exercise<DATA> = {
  title: 'Dreieck',
  source: '2023 Pflichtteil A2 - Aufgabe 1',
  useCalculator: true,
  duration: 42,
  points: 3.5,
  generator(rng) {
    return {
      cd: rng.randomIntBetween(50, 70) / 10,
      gamma: rng.randomIntBetween(380, 440) / 10,
    }
  },
  originalData: { cd: 6.3, gamma: 41.8 },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Im rechtwinkligen Dreieck ABC liegen die beiden gleichschenkligen
          Dreiecke ABD und BCD.
        </p>
        <svg viewBox="0 0 328 180">
          <image
            href="/content/BW_Realschule/224_Dreieck.jpg"
            height="180"
            width="328"
          />
        </svg>
        <p>Es gilt:</p>
        <p>
          {buildOverline('CD')} = {pp(data.cd)} cm<br></br>γ = {pp(data.gamma)}°
          <br></br>
          {buildOverline('AD')} = {buildOverline('BD')}
          <br></br>
          {buildOverline('BD')} = {buildOverline('CD')}
        </p>
        <ul>
          <li>Berechne den Umfang des Dreiecks ABD.</li>
          <li>Berechne den Flächeninhalt des Dreiecks ABD.</li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    const af = roundToDigits(
      Math.sin((2 * Math.PI * data.gamma) / 360) * data.cd,
      2,
    )
    const df = roundToDigits(
      Math.cos((2 * Math.PI * data.gamma) / 360) * data.cd,
      2,
    )
    return (
      <>
        <p>
          <strong>Umfang des Dreiecks ABD</strong>
        </p>
        <p>Das Dreieck CDB ist gleichschenklig. Damit gilt:</p>
        <p>
          {buildOverline('CD')} = {pp(data.cd)} cm = {buildOverline('BD')}
        </p>
        <p>
          Da das Dreieck ABD auch gleichschenklig ist, gilt für{' '}
          {buildOverline('AD')}:
        </p>
        <p>
          {buildOverline('BD')} = {pp(data.cd)} cm = {buildOverline('AD')}
        </p>
        <p>
          Um die Länge der Seite AB zu berechnen, wird die Höhe der Seite AB im
          Punkt D benötigt:
        </p>

        <svg viewBox="0 0 328 180">
          <image
            href="/content/BW_Realschule/224_Dreieck2.jpg"
            height="180"
            width="328"
          />
        </svg>
        <p>Im Punkt D befindet sich ebenfalls der Winkel γ als Stufenwinkel.</p>
        <p>
          Berechne die Länge {buildOverline('AF')} im rechtwinkligen Dreieck:
        </p>
        {buildEquation([
          [
            <>sin(γ)</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{buildOverline('AF')}</>,
                <>{buildOverline('AD')}</>,
              )}
            </>,
          ],
          [
            <>sin({pp(data.gamma)}°)</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{buildOverline('AF')}</>,
                <>{pp(data.cd)} cm</>,
              )}
            </>,
            <>| · {pp(data.cd)} cm</>,
          ],
          [
            <>
              {pp(data.cd)} cm · sin({pp(data.gamma)}°)
            </>,
            <>=</>,
            <>{buildOverline('AF')}</>,
          ],
          [<>{buildOverline('AF')}</>, <>≈</>, <>{pp(af)} cm</>],
        ])}
        <p>
          Damit beträgt: <br></br> {buildOverline('AB')} = 2 ·{' '}
          {buildOverline('AF')} = {pp(2 * af)} cm
        </p>
        <p>Berechne den Umfang:</p>
        {buildEquation([
          [
            <>U</>,
            <>=</>,
            <>
              {buildOverline('AB')} + {buildOverline('BD')} +{' '}
              {buildOverline('AD')}
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              {pp(data.cd)} cm + {pp(data.cd)} cm + {pp(2 * af)} cm
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              <strong>{pp(2 * data.cd + 2 * af)} cm</strong>
            </>,
          ],
        ])}
        <p>
          <strong>Flächeninhalt des Dreiecks</strong>
        </p>
        <p>
          Berechne die Höhe {buildOverline('DF')} im rechtwinkligen Dreieck DAF:
        </p>
        {buildEquation([
          [
            <>cos(γ)</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{buildOverline('DF')}</>,
                <>{buildOverline('AD')}</>,
              )}
            </>,
          ],
          [
            <>cos({pp(data.gamma)}°)</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{buildOverline('DF')}</>,
                <>{pp(data.cd)} cm</>,
              )}
            </>,
            <>| · {pp(data.cd)} cm</>,
          ],
          [
            <>
              {pp(data.cd)} cm · cos({pp(data.gamma)}°)
            </>,
            <>=</>,
            <>{buildOverline('DF')}</>,
          ],
          [<>{buildOverline('DF')}</>, <>≈</>, <>{pp(df)} cm</>],
        ])}
        <p>Berechne den Flächennihalt aus der Höhe und der Grundlinie AB:</p>
        {buildEquation([
          [
            <>A</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>
                  {buildOverline('AB')} · {buildOverline('DF')}
                </>,
                2,
              )}
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>
                  {pp(data.cd)} cm · {pp(df)} cm
                </>,
                2,
              )}
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              <strong>{pp(roundToDigits((data.cd * df) / 2, 2))} cm²</strong>
            </>,
          ],
        ])}
      </>
    )
  },
}
