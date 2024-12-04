import { Exercise } from '@/data/types'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  fuß: number
  basket: number
}

export const exercise245: Exercise<DATA> = {
  title: 'Losverkauf',
  source: '2022 Pflichtteil A2 - Aufgabe 5',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      fuß: rng.randomIntBetween(8, 20),
      basket: rng.randomIntBetween(8, 20),
    }
  },
  originalData: { fuß: 12, basket: 8 },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    const nieten = 100 - data.fuß - data.basket
    return (
      <>
        <p>
          Die Klasse 5c verkauft Lose beim Schulfest. Es gibt folgende Gewinne:{' '}
          {data.fuß} Fußbälle und {data.basket} Basketbälle. Die restlichen{' '}
          {nieten} Lose sind Nieten.{' '}
        </p>
        <p>Francesca möchte zwei Lose ziehen. </p>
        <p>Wie groß ist die Wahrscheinlichkeit, dass sie </p>
        <ul>
          <li>zwei Nieten zieht?</li>
          <li>einen Fußball und einen Basketball gewinnt?</li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    const nieten = 100 - data.fuß - data.basket
    return (
      <>
        <p>
          <strong>Zwei Nieten</strong>
        </p>
        <p>
          Das zufällige Ziehen eines Loses ist ein Laplace-Experiment. Berechne
          die Wahrscheinlichkeit für eine Niete mit der Formel:
        </p>
        {buildEquation([
          [
            <>p</>,
            <>=</>,
            <>{buildInlineFrac(<>Anzahl Nieten</>, <>Lose insgesamt</>)}</>,
          ],
          [<></>, <>=</>, <>{buildInlineFrac(<>{nieten}</>, <>100</>)}</>],
          [<></>, <></>, <></>],
        ])}
        <p>Beim zweiten Zug ist eine Niete weniger vorhanden:</p>
        {buildEquation([
          [
            <>p</>,
            <>=</>,
            <>{buildInlineFrac(<>Anzahl Nieten</>, <>Lose insgesamt</>)}</>,
          ],
          [<></>, <>=</>, <>{buildInlineFrac(<>{nieten - 1}</>, <>99</>)}</>],
          [<></>, <></>, <></>],
        ])}
        <p>
          Berechne die Wahrscheinlichkeit, diese Nieten hintereinander zu
          ziehen:
        </p>
        {buildEquation([
          [
            <>p</>,
            <>=</>,
            <>
              {buildInlineFrac(<>{nieten}</>, <>100</>)} ·{' '}
              {buildInlineFrac(<>{nieten - 1}</>, <>99</>)}
            </>,
          ],
          [<></>, <>=</>, <>{ppFrac((nieten * (nieten - 1)) / 9900)}</>],
          [
            <></>,
            <>=</>,
            <>{pp(roundToDigits((nieten * (nieten - 1)) / 9900, 4))}</>,
          ],
          [
            <></>,
            <>=</>,
            <>
              <strong>
                {pp(100 * roundToDigits((nieten * (nieten - 1)) / 9900, 4))} %
              </strong>
            </>,
          ],
        ])}
        <p>
          <strong>Fußball und Basketball</strong>
        </p>
        <p>
          Es gibt zwei Möglichkeiten, genau einen Fußball und einen Basketball
          zu gewinnen. Berechne die Wahrscheinlichkeiten p<sub>FB</sub> und p
          <sub>BF</sub>:
        </p>
        <div>
          <span style={{ fontSize: '0.8em' }}>
            {buildEquation([
              [
                <>
                  p<sub>FB</sub>
                </>,
                <>=</>,
                <>
                  {buildInlineFrac(<>Fußballlose</>, <>Lose insgesamt</>)} ·{' '}
                  {buildInlineFrac(
                    <>Basketballlose</>,
                    <>Lose insgesamt - 1</>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(<>{data.fuß}</>, <>100</>)} ·{' '}
                  {buildInlineFrac(<>{data.basket}</>, <>99</>)}
                </>,
              ],
              [<></>, <>=</>, <>{ppFrac((data.fuß * data.basket) / 9900)}</>],
            ])}
            {buildEquation([
              [
                <>
                  p<sub>BF</sub>
                </>,
                <>=</>,
                <>
                  {buildInlineFrac(<>Basketballlose</>, <>Lose insgesamt</>)} ·{' '}
                  {buildInlineFrac(<>Fußballlose</>, <>Lose insgesamt - 1</>)}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(<>{data.basket}</>, <>100</>)} ·{' '}
                  {buildInlineFrac(<>{data.fuß}</>, <>99</>)}
                </>,
              ],
              [<></>, <>=</>, <>{ppFrac((data.fuß * data.basket) / 9900)}</>],
            ])}
          </span>
        </div>
        <p>Die Wahrscheinlichkeit ergibt insgesamt:</p>
        <p>
          p = 2 · {ppFrac((data.fuß * data.basket) / 9900)} ={' '}
          <strong>
            {ppFrac((2 * data.fuß * data.basket) / 9900)} ={' '}
            {pp(roundToDigits((100 * (2 * data.fuß * data.basket)) / 9900, 2))}{' '}
            %
          </strong>
        </p>
      </>
    )
  },
}
