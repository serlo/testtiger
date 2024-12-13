import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildOverline,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  bd: number
  beta: number
}

export const exercise258: Exercise<DATA> = {
  title: 'Figur',
  source: '2021 Pflichtteil A2 - Aufgabe 1',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      bd: rng.randomIntBetween(90, 120) / 10,
      beta: rng.randomIntBetween(61, 75),
    }
  },
  originalData: { bd: 10, beta: 67 },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Das gleichschenklige Dreieck ABC und das Quadrat ADEF überdecken sich
          teilweise.
        </p>
        <svg viewBox="0 0 328 190">
          <image
            href="/content/BW_Realschule/258_Figur.jpg"
            height="190"
            width="328"
          />
        </svg>
        <p>
          Es gilt:<br></br>
          {buildOverline('BD')} = {pp(data.bd)} cm<br></br>β = {pp(data.beta)}°
          <br></br>
          {buildOverline('AC')} = {buildOverline('BC')}
        </p>
        <p>Berechne den Umfang des Dreiecks GEC.</p>
      </>
    )
  },
  solution({ data }) {
    const bc = roundToDigits(
      data.bd / Math.cos((data.beta * 2 * Math.PI) / 360),
      2,
    )
    const cd = roundToDigits(
      Math.tan((data.beta * 2 * Math.PI) / 360) * data.bd,
      2,
    )
    const ge = roundToDigits((data.bd * (cd - data.bd)) / cd, 2)
    const cg = roundToDigits(
      Math.sqrt((cd - data.bd) * (cd - data.bd) + ge * ge),
      2,
    )
    return (
      <>
        <p>
          <strong>{buildOverline('CD')} berechnen</strong>
        </p>
        <p>
          Im rechtwinkligen Dreieck BCD kann {buildOverline('CD')} berechnet
          werden.
        </p>
        {buildEquation([
          [
            <>tan(β)</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{buildOverline('CD')}</>,
                <>{buildOverline('BD')}</>,
              )}
            </>,
          ],
          [
            <>tan({pp(data.beta)}°)</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{buildOverline('CD')}</>,
                <>{pp(data.bd)} cm</>,
              )}
            </>,
            <>
              | · <>{pp(data.bd)} cm</>,
            </>,
          ],
          [
            <>
              {pp(data.bd)} cm · tan({pp(data.beta)}°)
            </>,
            <>=</>,
            <>{buildOverline('CD')}</>,
          ],
          [<>{buildOverline('CD')}</>, <>≈</>, <>{pp(cd)} cm</>],
        ])}
        <p>
          <strong>{buildOverline('GE')} berechnen</strong>
        </p>
        <p>
          Im linken Teil des Dreiecks kann {buildOverline('GE')} mit dem
          Strahlensatz berechnet werden. Die blauen Seiten sind bekannt:
        </p>
        <svg viewBox="0 0 328 190">
          <image
            href="/content/BW_Realschule/258_Figur2.jpg"
            height="190"
            width="328"
          />
        </svg>
        <p>Der Strahlensatz lautet:</p>
        {buildEquation([
          [
            <>
              {buildInlineFrac(
                <>{buildOverline('GE')}</>,
                <>{buildOverline('AD')}</>,
              )}
            </>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>{buildOverline('CE')}</>,
                <>{buildOverline('CD')}</>,
              )}
            </>,
          ],

          [
            <>
              {buildInlineFrac(
                <>{buildOverline('GE')}</>,
                <>{buildOverline('AD')}</>,
              )}
            </>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>
                  {buildOverline('CD')} − {buildOverline('DE')}
                </>,
                <>{buildOverline('CD')}</>,
              )}
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
                  {buildOverline('BD')} = {buildOverline('AD')} ={' '}
                  {buildOverline('DE')} = {pp(data.bd)} cm
                </span>
              </Color4>
            </>,
          ],
          [
            <>
              {buildInlineFrac(
                <>{buildOverline('GE')}</>,
                <>{pp(data.bd)} cm</>,
              )}
            </>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>
                  {pp(cd)} cm − {pp(data.bd)} cm
                </>,
                <>{pp(cd)} cm</>,
              )}
            </>,
            <>| · {pp(data.bd)} cm</>,
          ],
          [
            <>{buildOverline('GE')}</>,
            <>=</>,
            <>
              {buildInlineFrac(<>{pp(cd - data.bd)} cm</>, <>{pp(cd)} cm</>)} ·{' '}
              {pp(data.bd)} cm
            </>,
          ],
          [<>{buildOverline('GE')}</>, <>≈</>, <>{pp(ge)} cm</>],
        ])}
        <p>
          <strong>{buildOverline('CG')} berechnen</strong>
        </p>
        <p>
          Im rechtinkligen Dreieck CGE kann {buildOverline('CG')} mit dem Satz
          des Pythagoras berechnet werden:
        </p>
        {buildEquation([
          [
            <>{buildOverline('CG')}²</>,
            <>=</>,
            <>
              {buildOverline('CE')}² + {buildOverline('GE')}²
            </>,
          ],
          [
            <>{buildOverline('CG')}²</>,
            <>=</>,
            <>
              ({pp(cd - data.bd)} cm)² + ({pp(ge)} cm)²
            </>,
            <>| √</>,
          ],
          [<>{buildOverline('CG')}</>, <>≈</>, <>{pp(cg)} cm</>],
        ])}
        <p>
          <strong>Umfang des Dreiecks GEC</strong>
        </p>
        <p>Berechne den Umfang aus den einzelnen Seitenlängen:</p>
        {buildEquation([
          [
            <>U</>,
            <>=</>,
            <>
              {buildOverline('CE')} + {buildOverline('CG')} +{' '}
              {buildOverline('GE')}
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              {pp(cd - data.bd)} cm + {pp(cg)} cm + {pp(ge)} cm
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              <strong>{pp(cd - data.bd + cg + ge)} cm</strong>
            </>,
          ],
        ])}
      </>
    )
  },
}
