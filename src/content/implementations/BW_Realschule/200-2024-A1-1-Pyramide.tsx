import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { buildEquation } from '@/helper/math-builder'
import { ppFrac } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
  pyr: number
}

export const exercise200: Exercise<DATA> = {
  title: 'Quadratische Pyramide',
  source: '2024 Pflichtteil A1 Aufgabe 1',
  useCalculator: false,
  duration: 3,
  points: 1.5,
  generator(rng) {
    return {
      a: rng.randomIntBetween(3, 6),
      b: rng.randomIntBetween(2, 6),
      c: rng.randomIntBetween(2, 6),
      pyr: rng.randomIntBetween(3, 6),
    }
  },
  constraint({ data }) {
    return (
      data.a != data.b &&
      ((data.a * data.b * data.c * 3) / (data.pyr * data.pyr)) % 1 == 0
    )
  },
  task({ data }) {
    return (
      <>
        <p>
          Das Volumen eines Quaders und das Volumen einer quadratischen Pyramide
          sind gleich groß.{' '}
        </p>
        <svg viewBox="0 0 328 170">
          <image
            href="/content/BW_Realschule/200_Körper.jpg"
            height="170"
            width="328"
          />
        </svg>
        <p>Für den Quader gilt: </p>
        <ul>
          <li>a = {data.a} cm</li>
          <li>b = {data.b} cm</li>
          <li>c = {data.c} cm</li>
        </ul>
        <p>
          Für die quadratische Pyramide gilt: a<sub>Pyr</sub> = {data.pyr} cm
        </p>
        <p>Berechne die Höhe der quadratischen Pyramide.</p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>Berechne das Volumen des Quaders:</p>
        {buildEquation([
          [<>V</>, <>=</>, <>a · b · c</>],
          [
            <></>,
            <>=</>,
            <>
              {data.a} cm · {data.b} cm · {data.c} cm
            </>,
          ],
          [<></>, <>=</>, <>{data.a * data.b * data.c} cm³</>],
        ])}
        <p>Setze das Volumen für das Volumen der Pyramide ein:</p>
        {buildEquation([
          [
            <>{data.a * data.b * data.c} cm³</>,
            <>=</>,
            <>{ppFrac(1 / 3)} · G · h</>,
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
                  Grundfläche G = a<sub>Pyr</sub>²{' '}
                </span>
              </Color4>
            </>,
          ],
          [
            <>{data.a * data.b * data.c} cm³</>,
            <>=</>,
            <>
              {ppFrac(1 / 3)} · a<sub>Pyr</sub>² · h
            </>,
          ],
          [
            <>{data.a * data.b * data.c} cm³</>,
            <>=</>,
            <>
              {ppFrac(1 / 3)} · {data.pyr * data.pyr} cm² · h
            </>,
            <>| · 3 &nbsp;&nbsp;&nbsp;| : {data.pyr * data.pyr}</>,
          ],
          [
            <>
              <strong>h</strong>
            </>,
            <>
              <strong>=</strong>
            </>,
            <>
              <strong>
                {(data.a * data.b * data.c * 3) / (data.pyr * data.pyr)} cm
              </strong>
            </>,
          ],
        ])}
      </>
    )
  },
}
