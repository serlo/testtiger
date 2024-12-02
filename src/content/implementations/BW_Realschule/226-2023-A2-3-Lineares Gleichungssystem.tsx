import { Exercise } from '@/data/types'
import { Color1 } from '@/helper/colors'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'

interface DATA {
  links: number
  rechts: number
  zähler: number
  nenner: number
  konstante: number
}

export const exercise226: Exercise<DATA> = {
  title: 'Lineares Gleichungssystem',
  source: '2023 Pflichtteil A2 - Aufgabe 3',
  useCalculator: true,
  duration: 42,
  points: 3,
  generator(rng) {
    return {
      links: rng.randomIntBetween(2, 6),
      rechts: rng.randomIntBetween(1, 6),
      zähler: rng.randomIntBetween(-2, -9),
      nenner: rng.randomIntBetween(2, 4),
      konstante: rng.randomIntBetween(2, 6),
    }
  },
  originalData: { links: 3, rechts: 1, zähler: 5, nenner: 2, konstante: 8 },
  constraint({ data }) {
    const konstante = data.konstante * data.links
    return (
      data.links != data.rechts &&
      (konstante + data.zähler * data.links) /
        (data.links * data.links * data.nenner - data.links - data.rechts) !=
        0 &&
      ((konstante + data.zähler * data.links) /
        (data.links * data.links * data.nenner - data.links - data.rechts)) %
        1 ==
        0
    )
  },
  task({ data }) {
    const konstante = data.konstante * data.links
    return (
      <>
        <p>Löse das Gleichungssystem.</p>
        <ol>
          <li>
            {data.links}(x − y) = {data.rechts}y + {konstante}{' '}
          </li>
          <li>
            {data.links}y ={' '}
            {buildInlineFrac(
              <>x {pp(data.zähler, 'merge_op')}</>,
              <>{data.nenner}</>,
            )}
          </li>
        </ol>
      </>
    )
  },
  solution({ data }) {
    const konstante = data.konstante * data.links
    const y =
      (konstante + data.zähler * data.links) /
      (data.links * data.links * data.nenner - data.links - data.rechts)
    const x = data.links * y * data.nenner - data.zähler
    return (
      <>
        <p>
          Multipliziere die Klammer aus und trenne den Bruch auf, um die
          Gleichungen zu vereinfachen:
        </p>
        <ol>
          <li>
            {data.links}x − {data.links}y = {data.rechts}y + {konstante}{' '}
          </li>
          <li>
            {data.links}y = {buildInlineFrac(<>x</>, <>{data.nenner}</>)}
            {ppFrac(data.zähler / data.nenner, 'merge_op')}
          </li>
        </ol>
        <p>
          Es gibt verschiedene Lösungsverfahren, die sich hier eignen. Mit dem
          Einsetzungsverfahren wird versucht, die zweite Gleichung nach x
          umzustellen:
        </p>
        {buildEquation([
          [
            <>{data.links}y</>,
            <>=</>,
            <>
              {buildInlineFrac(<>x</>, <>{data.nenner}</>)}
              {ppFrac(data.zähler / data.nenner, 'merge_op')}
            </>,
            <>| · {data.nenner} </>,
          ],
          [
            <>{data.links * data.nenner}y</>,
            <>=</>,
            <>x {pp(data.zähler, 'merge_op')}</>,
            <>| {pp(-data.zähler, 'merge_op')}</>,
          ],
          [
            <>x</>,
            <>=</>,
            <>
              {data.links * data.nenner}y {pp(-data.zähler, 'merge_op')}
            </>,
          ],
        ])}
        <p>Setze x in Gleichung 1 ein und bestimme den Wert von y:</p>
        {buildEquation([
          [
            <>
              {data.links}
              <Color1>x</Color1> − {data.links}y
            </>,
            <>=</>,
            <>
              {data.rechts}y + {konstante}
            </>,
          ],
          [
            <>
              {data.links}
              <Color1>
                ({data.links * data.nenner}y {pp(-data.zähler, 'merge_op')})
              </Color1>{' '}
              − {data.links}y
            </>,
            <>=</>,
            <>
              {data.rechts}y + {konstante}
            </>,
          ],
          [
            <>
              {data.links * data.links * data.nenner}y{' '}
              {pp(-data.zähler * data.links, 'merge_op')} − {data.links}y
            </>,
            <>=</>,
            <>
              {data.rechts}y + {konstante}
            </>,
            <>| {pp(-data.rechts, 'merge_op')}y</>,
          ],
          [
            <>
              {data.links * data.links * data.nenner - data.links - data.rechts}
              y {pp(-data.zähler * data.links, 'merge_op')}
            </>,
            <>=</>,
            <>{konstante}</>,
            <>| {pp(data.zähler * data.links, 'merge_op')}</>,
          ],
          [
            <>
              {data.links * data.links * data.nenner - data.links - data.rechts}
              y
            </>,
            <>=</>,
            <>{pp(konstante + data.zähler * data.links)}</>,
            <>
              | :{' '}
              {data.links * data.links * data.nenner - data.links - data.rechts}
            </>,
          ],
          [<>y</>, <>=</>, <>{ppFrac(y)}</>, <></>],
        ])}
        <p>Setze y in eine der Gleichungen ein und bestimme x:</p>
        <p>
          {buildEquation([
            [
              <>
                {data.links} · <Color1>y</Color1>
              </>,
              <>=</>,
              <>
                {buildInlineFrac(<>x</>, <>{data.nenner}</>)}
                {ppFrac(data.zähler / data.nenner, 'merge_op')}
              </>,
            ],
            [
              <>
                {data.links} · <Color1>{pp(y, 'embrace_neg')}</Color1>
              </>,
              <>=</>,
              <>
                {buildInlineFrac(<>x</>, <>{data.nenner}</>)}
                {ppFrac(data.zähler / data.nenner, 'merge_op')}
              </>,
              <>| {ppFrac(-data.zähler / data.nenner, 'merge_op')}</>,
            ],
            [
              <>{ppFrac(data.links * y - data.zähler / data.nenner)}</>,
              <>=</>,
              <>{buildInlineFrac(<>x</>, <>{data.nenner}</>)}</>,
              <>| · {data.nenner}</>,
            ],
            [<>x</>, <>=</>, <>{pp(x)}</>],
          ])}
        </p>
        <p>
          Damit ist die Lösungsmenge <br></br>
          <strong>
            L = {'{'}( {pp(x)}|{pp(y)}){'}'}
          </strong>
        </p>
      </>
    )
  },
}
