import { Exercise } from '@/data/types'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { ppFrac } from '@/helper/pretty-print'

interface DATA {
  case: number
  k11: number
  k12: number
  k13: number
  k14: number
  k15: number
  k21: number
  k22: number
  k23: number
}

export const exercise228: Exercise<DATA> = {
  title: 'Kreisel',
  source: '2023 Pflichtteil A2 - Aufgabe 5',
  useCalculator: true,
  duration: 42,
  points: 3,
  generator(rng) {
    return {
      case: rng.randomIntBetween(1, 3),
      k11: rng.randomIntBetween(1, 3),
      k12: rng.randomIntBetween(1, 3),
      k13: rng.randomIntBetween(1, 3),
      k14: rng.randomIntBetween(1, 3),
      k15: rng.randomIntBetween(1, 3),
      k21: rng.randomIntBetween(1, 3),
      k22: rng.randomIntBetween(1, 3),
      k23: rng.randomIntBetween(1, 3),
    }
  },
  originalData: {
    case: 1,
    k11: 1,
    k12: 2,
    k13: 2,
    k14: 1,
    k15: 3,
    k21: 1,
    k22: 3,
    k23: 2,
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    const array1 = [data.k11, data.k12, data.k13, data.k14, data.k15]
    const array2 = [data.k21, data.k22, data.k23]
    return (
      <>
        <p>
          Auf zwei Kreiseln befinden sich die Zahlen 1,2 und 3.<br></br>
          Die Felder eines Kreisels sind jeweils gleich groß.<br></br>
          Sie sind grau bzw. weiß gefärbt.<br></br>
          Die beiden Kreisel werden gedreht und bleiben auf einer Kante liegen.
        </p>
        <p>Berechne die Wahrscheinlichkeit für folgende Ereignisse: </p>
        <ul>
          <li>zwei gleiche Zahlen</li>
          <li>1 und 3</li>
          <li>
            {data.case == 1 && <>höchstens ein graues Feld</>}
            {data.case == 2 && <>genau ein graues Feld</>}
            {data.case == 3 && <>mindestens ein graues Feld</>}
          </li>
        </ul>
        <svg viewBox="0 0 328 120">
          <image
            href="/content/BW_Realschule/228_Kreisel.jpg"
            height="120"
            width="328"
          />
          <text x={62} y={52} fontSize={20} textAnchor="right" stroke="black">
            {array1[0]}
          </text>
          <text x={90} y={42} fontSize={20} textAnchor="right" stroke="black">
            {array1[1]}
          </text>
          <text x={115} y={65} fontSize={20} textAnchor="right" stroke="black">
            {array1[2]}
          </text>
          <text x={110} y={95} fontSize={20} textAnchor="right" stroke="black">
            {array1[3]}
          </text>
          <text x={75} y={85} fontSize={20} textAnchor="right" stroke="black">
            {array1[4]}
          </text>
          <text x={222} y={60} fontSize={20} textAnchor="right" stroke="black">
            {array2[0]}
          </text>
          <text x={249} y={72} fontSize={20} textAnchor="right" stroke="black">
            {array2[1]}
          </text>
          <text x={230} y={95} fontSize={20} textAnchor="right" stroke="black">
            {array2[2]}
          </text>
        </svg>
      </>
    )
  },
  solution({ data }) {
    const array1_1 = [data.k11, data.k12, data.k13, data.k14, data.k15].filter(
      element => element === 1,
    ).length
    const array1_2 = [data.k11, data.k12, data.k13, data.k14, data.k15].filter(
      element => element === 2,
    ).length
    const array1_3 = [data.k11, data.k12, data.k13, data.k14, data.k15].filter(
      element => element === 3,
    ).length
    const array2_1 = [data.k21, data.k22, data.k23].filter(
      element => element === 1,
    ).length
    const array2_2 = [data.k21, data.k22, data.k23].filter(
      element => element === 2,
    ).length
    const array2_3 = [data.k21, data.k22, data.k23].filter(
      element => element === 3,
    ).length
    return (
      <>
        <p>
          Die Wahrscheinlichkeit von Ereignissen wie {'"'}Kreisel zeigen 1 und 1
          {'"'}, werden durch {'"'}p<sub>11</sub>
          {'"'} dargestellt.
        </p>
        <p>
          <strong>Zwei gleiche Zahlen</strong>
        </p>
        <p>
          Berechne die Wahrscheinlichkeiten p<sub>11</sub>, p<sub>22</sub> und p
          <sub>33</sub>:
        </p>

        {buildEquation([
          [
            <>
              p<sub>11</sub>
            </>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>
                  {'"'}1{'"'} auf Kreisel 1
                </>,
                <>Felder Kreisel 1</>,
              )}{' '}
              ·{' '}
              {buildInlineFrac(
                <>
                  {'"'}1{'"'} auf Kreisel 2
                </>,
                <>Felder Kreisel 2</>,
              )}
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              {buildInlineFrac(<>{array1_1}</>, <>5</>)} ·{' '}
              {buildInlineFrac(<>{array2_1}</>, <>3</>)}
            </>,
          ],
          [<></>, <>=</>, <>{ppFrac((array1_1 / 5) * (array2_1 / 3))}</>],
          [
            <>
              p<sub>22</sub>
            </>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>
                  {'"'}2{'"'} auf Kreisel 1
                </>,
                <>Felder Kreisel 1</>,
              )}{' '}
              ·{' '}
              {buildInlineFrac(
                <>
                  {'"'}2{'"'} auf Kreisel 2
                </>,
                <>Felder Kreisel 2</>,
              )}
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              {buildInlineFrac(<>{array1_2}</>, <>5</>)} ·{' '}
              {buildInlineFrac(<>{array2_2}</>, <>3</>)}
            </>,
          ],
          [<></>, <>=</>, <>{ppFrac((array1_2 / 5) * (array2_2 / 3))}</>],
          [
            <>
              p<sub>33</sub>
            </>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>
                  {'"'}3{'"'} auf Kreisel 1
                </>,
                <>Felder Kreisel 1</>,
              )}{' '}
              ·{' '}
              {buildInlineFrac(
                <>
                  {'"'}3{'"'} auf Kreisel 2
                </>,
                <>Felder Kreisel 2</>,
              )}
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              {buildInlineFrac(<>{array1_3}</>, <>5</>)} ·{' '}
              {buildInlineFrac(<>{array2_3}</>, <>3</>)}
            </>,
          ],
          [<></>, <>=</>, <>{ppFrac((array1_3 / 5) * (array2_3 / 3))}</>],
        ])}
        <p>Addiere die Wahrscheinlichkeiten:</p>
        <p>
          p<sub>11</sub> + p<sub>22</sub> + p<sub>33</sub> ={' '}
          {ppFrac((array1_1 / 5) * (array2_1 / 3))} +{' '}
          {ppFrac((array1_2 / 5) * (array2_2 / 3))} +{' '}
          {ppFrac((array1_3 / 5) * (array2_3 / 3))} ={' '}
          <strong>
            {ppFrac(
              (array1_1 * array2_1 +
                array1_2 * array2_2 +
                array1_3 * array2_3) /
                15,
            )}
          </strong>
        </p>
        <p>
          <strong>Wahrscheinlichkeit von 1 und 3</strong>
        </p>
        <p>
          Es gibt zwei Möglichkeiten, wie dieses Ereignis eintritt. Berechne p
          <sub>13</sub> und p<sub>31</sub>:
        </p>
        {buildEquation([
          [
            <>
              p<sub>13</sub>
            </>,
            <>=</>,
            <>
              {buildInlineFrac(<>{array1_1}</>, <>5</>)} ·{' '}
              {buildInlineFrac(<>{array2_3}</>, <>3</>)}
            </>,
          ],
          [<></>, <>=</>, <>{ppFrac((array1_1 * array2_3) / 15)}</>],
          [
            <>
              p<sub>31</sub>
            </>,
            <>=</>,
            <>
              {buildInlineFrac(<>{array1_3}</>, <>5</>)} ·{' '}
              {buildInlineFrac(<>{array2_1}</>, <>3</>)}
            </>,
          ],
          [<></>, <>=</>, <>{ppFrac((array1_3 * array2_1) / 15)}</>],
        ])}
        <p>
          Zusammen ist die Wahrscheinlichkeit für das Ereignis {'"'}1 und 3{'"'}
          :
        </p>
        <p>
          {ppFrac((array1_1 * array2_3) / 15)} +{' '}
          {ppFrac((array1_3 * array2_1) / 15)} ={' '}
          <strong>
            {ppFrac((array1_1 * array2_3 + array1_3 * array2_1) / 15)}
          </strong>
        </p>
        <p>
          <strong>
            {data.case == 1 && <>Höchstens ein graues Feld</>}
            {data.case == 2 && <>Genau ein graues Feld</>}
            {data.case == 3 && <>Mindestens ein graues Feld</>}
          </strong>
        </p>
        <p>
          {data.case == 1 && (
            <>
              Für dieses Ereignis dürfen <strong>nicht</strong> beide Kreisel
              ein graues Feld anzeigen. Berechne die Wahrscheinlichkeit also
              über das Gegenereignis:
              <p>
                p<sub>gg</sub> = {ppFrac((2 * 1) / 15)}
              </p>
              <p>Damit ist die Wahrscheinlichkeit:</p>
              <p>
                1 − p<sub>ww</sub> = 1 − {ppFrac((2 * 1) / 15)} ={' '}
                <strong>{ppFrac((15 - 2 * 1) / 15)}</strong>
              </p>
            </>
          )}
          {data.case == 2 && (
            <>
              Für dieses Ereignis muss einer der Kreisel ein graues Feld
              anzeigen, während der andere ein weißes anzeigt. Berechne p
              <sub>wg</sub> und p<sub>gw</sub>:
              <p>
                p<sub>wg</sub> = {ppFrac(3 / 5)} · {ppFrac(1 / 3)} ={' '}
                {ppFrac(3 / 15)}
              </p>
              <p>
                p<sub>gw</sub> = {ppFrac(2 / 5)} · {ppFrac(2 / 3)} ={' '}
                {ppFrac(4 / 15)}
              </p>
              <p>
                Zusammen ergibt die Wahrscheinlichkeit für {'"'}Genau ein graues
                Feld{'"'}:
              </p>
              <p>
                {ppFrac(3 / 15)} + {ppFrac(4 / 15)} ={' '}
                <strong>{ppFrac(7 / 15)}</strong>
              </p>
            </>
          )}
          {data.case == 3 && (
            <>
              Für dieses Ereignis dürfen <strong>nicht</strong> beide Kreisel
              ein weißes Feld anzeigen. Berechne die Wahrscheinlichkeit also
              über das Gegenereignis:
              <p>
                p<sub>ww</sub> = {ppFrac((3 * 2) / 15)}
              </p>
              <p>Damit ist die Wahrscheinlichkeit:</p>
              <p>
                1 − p<sub>ww</sub> = 1 − {ppFrac((3 * 2) / 15)} ={' '}
                <strong>{ppFrac((15 - 3 * 2) / 15)}</strong>
              </p>
            </>
          )}
        </p>
      </>
    )
  },
}
