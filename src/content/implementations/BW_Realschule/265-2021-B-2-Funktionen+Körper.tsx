import { Exercise } from '@/data/types'
import { Color1 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildOverline,
} from '@/helper/math-builder'
import { pp, ppPolynom } from '@/helper/pretty-print'

interface DATA {
  xs: number
  ys: number
  ax: number
}

export const exercise265: Exercise<DATA> = {
  title: 'Funktionen + Körper',
  source: '2021 Wahlteil B - Aufgabe 2',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      xs: rng.randomIntBetween(-8, -1),
      ys: rng.randomIntBetween(-6, 4),
      ax: rng.randomIntBetween(-8, -1),
    }
  },
  originalData: { xs: -3, ys: -2, ax: -4 },
  constraint({ data }) {
    return data.xs != data.ax
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
        const ay = (data.ax - data.xs) * (data.ax - data.xs) + data.ys
        return (
          <>
            <p>
              Der Punkt A({pp(data.ax)}|{pp(ay)}) liegt auf der Parabel p
              <sub>1</sub> mit der Funktionsgleichung <br></br>y = x² + bx{' '}
              {pp(data.ys, 'merge_op')}. Die Gerade g schneidet die Parabel p
              <sub>1</sub> im Punkt A und im Scheitelpunkt S<sub>1</sub>.
            </p>
            <ul>
              <li>
                Berechne die Funktionsgleichungen der Parabel p<sub>1</sub> und
                der Geraden g.
              </li>
            </ul>
            <p>
              Durch Spiegelung des Scheitelpunkts S<sub>1</sub> an der y-Achse
              entsteht der Punkt S<sub>2</sub>. S<sub>2</sub> ist der
              Scheitelpunkt einer nach oben geöffneten verschobenen
              Normalparabel p<sub>2</sub>.
            </p>
            <ul>
              <li>
                Gib die Funktionsgleichung von p<sub>2</sub> in der Form y = x²
                + bx + c an.
              </li>
            </ul>
            <p>
              Der Schnittpunkt der Geraden g mit der y-Achse ist der
              Scheitelpunkt S<sub>3</sub> der Parabel p<sub>3</sub>. Die Parabel
              p<sub>3</sub> der Form <br></br>y = ax² + c geht außerdem durch
              die Scheitelpunkte S<sub>1</sub> und S<sub>2</sub>.
            </p>
            <ul>
              <li>
                Berechne die Funktionsgleichung der Parabel p<sub>3</sub>.
              </li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const ay = (data.ax - data.xs) * (data.ax - data.xs) + data.ys
        const c = data.ys + data.xs * data.xs
        const b = (ay - (data.ax * data.ax + c)) / data.ax
        const m = (ay - data.ys) / (data.ax - data.xs)
        return (
          <>
            <p>
              <strong>Funktionsgleichungen von p und g</strong>
            </p>
            <p>Setze den Punkt A in den Funktionsterm ein und bestimme b:</p>
            {buildEquation([
              [<>y</>, <>=</>, <>x² + bx {pp(c, 'merge_op')}</>],
              [
                <>{pp(ay)}</>,
                <>=</>,
                <>
                  {pp(data.ax, 'embrace_neg')}² + b ·{' '}
                  {pp(data.ax, 'embrace_neg')} {pp(c, 'merge_op')}
                </>,
              ],
              [
                <>{pp(ay)}</>,
                <>=</>,
                <>
                  {pp(data.ax * data.ax)} {pp(data.ax, 'merge_op')}b{' '}
                  {pp(c, 'merge_op')}
                </>,
              ],
              [
                <>{pp(ay)}</>,
                <>=</>,
                <>
                  {pp(data.ax * data.ax + c)} {pp(data.ax, 'merge_op')}b{' '}
                </>,
                <>| {pp(-(data.ax * data.ax + c), 'merge_op')}</>,
              ],
              [
                <>{pp(ay - (data.ax * data.ax + c))}</>,
                <>=</>,
                <>{pp(data.ax, 'merge_op')}b </>,
                <>| : {pp(data.ax, 'embrace_neg')}</>,
              ],
              [<>b</>, <>=</>, <>{pp(b)} </>],
            ])}
            <p>
              Der Funktionsterm ist damit:<br></br>
              <strong>
                y = x² {pp(b, 'merge_op')}x {pp(c, 'merge_op')}
              </strong>
            </p>
            <p>
              Bestimme die Scheitelform, um den Scheitelpunkt S<sub>1</sub> und
              anschließend die Gleichung der Geraden g zu bestimmen.
            </p>
            <p>Bestimme die Scheitelform mit einer quadratischen Ergänzung:</p>
            {buildEquation([
              [
                <>y</>,
                <>=</>,
                <>
                  x² <Color1>{pp(b, 'merge_op')}</Color1>x + {pp(c)}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  x² {pp(b, 'merge_op')}x +{' '}
                  <span className="inline-block  scale-y-[2]">(</span>
                  {buildInlineFrac(
                    <>
                      <Color1>{pp(Math.abs(b))}</Color1>
                    </>,
                    <>2</>,
                  )}
                  <span className="inline-block  scale-y-[2]">)</span>² +{' '}
                  {pp(c)} − <span className="inline-block  scale-y-[2]">(</span>
                  {buildInlineFrac(
                    <>
                      <Color1>{pp(Math.abs(b))}</Color1>
                    </>,
                    <>2</>,
                  )}
                  <span className="inline-block  scale-y-[2]">)</span>²
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  (x {pp(b / 2, 'merge_op')})² + {pp(c)} {pp(-Math.abs(b / 2))}²
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  (x {pp(b / 2, 'merge_op')})²{' '}
                  {pp(c - (b / 2) * (b / 2), 'merge_op')}
                </>,
              ],
            ])}
            <p>
              Der Scheitelpunkt ist S<sub>1</sub>({pp(data.xs)}|{pp(data.ys)}) .
            </p>
            <p>
              Stelle die Funktionsgleichung der Geraden auf. Setze die Punkte A
              und S in die allgemeine Geradengleichung ein:
            </p>
            <p>
              I &nbsp;&nbsp;&nbsp; {pp(ay)} = m · {pp(data.ax, 'embrace_neg')} +
              b<br></br>
              II &nbsp;&nbsp;&nbsp; {pp(data.ys)} = m ·{' '}
              {pp(data.xs, 'embrace_neg')} + b
            </p>
            <p>Subtrahiere die Gleichungen voneinander, um b zu eliminieren:</p>
            <p>
              I − II:&nbsp;&nbsp; {pp(ay - data.ys)} = {pp(data.ax)}m −{' '}
              {pp(data.xs, 'embrace_neg')}m
            </p>
            <p>
              {pp(ay - data.ys)} = {pp(data.ax - data.xs)}m
              &nbsp;&nbsp;&nbsp;&nbsp;| : {pp(data.ax - data.xs, 'embrace_neg')}
            </p>
            <p>m = {pp(m)}</p>
            <p>Setze m in eine der Gleichungen ein und bestimme b:</p>
            <p>
              I &nbsp;&nbsp;&nbsp; {pp(ay)} = {pp(m)} ·{' '}
              {pp(data.ax, 'embrace_neg')} + b &nbsp;&nbsp;| − {pp(m * data.ax)}
            </p>
            <p>b = {pp(ay - m * data.ax)}</p>
            <p>
              <strong>
                y<sub>g</sub> = {ppPolynom([[m, 'x', 1]])}{' '}
                {pp(ay - m * data.ax, 'merge_op')}
              </strong>
            </p>
            <p>
              <strong>
                Funktionsgleichung von p<sub>2</sub>
              </strong>
            </p>
            <p>
              Bestimme den Scheitelpunkt S<sub>2</sub> durch Spiegelung an der
              y-Achse:
            </p>
            <p>
              S<sub>1</sub>({pp(data.xs)}|{pp(data.ys)}
              )&nbsp;&nbsp;
              <span className="inline-block  scale-x-[1.5]">↦</span>
              &nbsp;&nbsp;S<sub>2</sub>({pp(-data.xs)}|{pp(data.ys)})
            </p>
            <p>
              Setze den Scheitelpunkt in die Scheitelform ein und löse die
              Klammer auf:
            </p>
            {buildEquation([
              [
                <>y</>,
                <>=</>,
                <>
                  (x {pp(data.xs, 'merge_op')})² {pp(data.ys, 'merge_op')}
                </>,
              ],
              [
                <>y</>,
                <>=</>,
                <>
                  (x² {pp(2 * data.xs, 'merge_op')}x{' '}
                  {pp(data.xs * data.xs, 'merge_op')}) {pp(data.ys, 'merge_op')}
                </>,
              ],
              [
                <>
                  <strong>y</strong>
                </>,
                <>
                  <strong>=</strong>
                </>,
                <>
                  <strong>
                    x² {pp(2 * data.xs, 'merge_op')}x {pp(c, 'merge_op')}
                  </strong>
                </>,
              ],
            ])}
            <p>
              <strong>
                Funktionsgleichung von p<sub>3</sub>
              </strong>
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
              In einer quadratischen Pyramide liegt das gleichschenklige Dreieck
              EFS.
            </p>
            <svg viewBox="0 0 328 190">
              <image
                href="/content/BW_Realschule/265_Körper.jpg"
                height="190"
                width="328"
              />
            </svg>
            <p>
              Es gilt:<br></br>
              {buildOverline('AB')} = {buildOverline('EF')} = 12,6 cm<br></br>α
              = 72,0° <br></br>
              {buildOverline('EF')} || {buildOverline('AC')}
            </p>
            <ul>
              <li>Berechne den Flächeninhalt des Dreiecks EFS.</li>
              <li>Berechne das Volumen der quadratischen Pyramide.</li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
