import { Exercise } from '@/data/types'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac, ppPolynom } from '@/helper/pretty-print'

interface DATA {
  links1: number
  links2: number
  links3: number
  links4: number
  rechts1: number
  rechts2: number
  rechts3: number
  rechts4: number
  rechts5: number
}

export const exercise260: Exercise<DATA> = {
  title: 'Glücksrad',
  source: '2021 Pflichtteil A2 - Aufgabe 3',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      links1: rng.randomIntBetween(2, 5),
      links2: rng.randomIntBetween(2, 5),
      links3: rng.randomIntBetween(2, 5),
      links4: rng.randomIntBetween(2, 5),
      rechts1: rng.randomIntBetween(2, 5),
      rechts2: rng.randomIntBetween(2, 5),
      rechts3: rng.randomIntBetween(2, 5),
      rechts4: rng.randomIntBetween(2, 5),
      rechts5: rng.randomIntBetween(2, 5),
    }
  },
  originalData: {
    links1: 4,
    links2: 2,
    links3: 5,
    links4: 3,
    rechts1: 3,
    rechts2: 4,
    rechts3: 2,
    rechts4: 4,
    rechts5: 5,
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Die beiden Glücksräder werden gedreht. Wenn sie stehen bleiben,
          erkennt man im Sichtfenster eine zweistellige Zahl. Die Abbildung
          zeigt die Zahl {data.links1}
          {data.rechts1}.
        </p>
        <svg viewBox="0 0 328 120">
          <image
            href="/content/BW_Realschule/260_Glücksrad.jpg"
            height="120"
            width="328"
          />
          <text x={140} y={67} fontSize={20} textAnchor="middle" stroke="black">
            {data.links1}
          </text>
          <text x={65} y={67} fontSize={20} textAnchor="middle" stroke="black">
            {data.links3}
          </text>
          <text
            x={101}
            y={103}
            fontSize={20}
            textAnchor="middle"
            stroke="black"
          >
            {data.links2}
          </text>
          <text x={101} y={31} fontSize={20} textAnchor="middle" stroke="black">
            {data.links4}
          </text>
          <text x={183} y={67} fontSize={20} textAnchor="middle" stroke="black">
            {data.rechts1}
          </text>
          <text x={214} y={35} fontSize={20} textAnchor="middle" stroke="black">
            {data.rechts2}
          </text>
          <text x={255} y={45} fontSize={20} textAnchor="middle" stroke="black">
            {data.rechts3}
          </text>
          <text x={257} y={92} fontSize={20} textAnchor="middle" stroke="black">
            {data.rechts4}
          </text>
          <text x={215} y={99} fontSize={20} textAnchor="middle" stroke="black">
            {data.rechts5}
          </text>
        </svg>
        <p>Mit welcher Wahrscheinlichkeit ist im Sichtfenster </p>
        <ul>
          <li>eine Zahl mit zwei gleichen Ziffern zu sehen?</li>
          <li>eine durch 12 teilbare Zahl zu sehen?</li>
          <li>höchstens einmal die Ziffer 4 zu sehen?</li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    const link = [data.links1, data.links2, data.links3, data.links4]
    const recht = [data.rechts1, data.rechts2, data.rechts3, data.rechts4]
    const p22 =
      (link.filter(element => element === 2).length *
        recht.filter(element => element === 2).length) /
      20
    const p33 =
      (link.filter(element => element === 3).length *
        recht.filter(element => element === 3).length) /
      20
    const p44 =
      (link.filter(element => element === 4).length *
        recht.filter(element => element === 4).length) /
      20
    const p55 =
      (link.filter(element => element === 5).length *
        recht.filter(element => element === 5).length) /
      20
    const p24 =
      (link.filter(element => element === 2).length *
        recht.filter(element => element === 4).length) /
      20
    return (
      <>
        <p>
          <strong>Zwei gleiche Ziffern</strong>
        </p>
        <p>
          Unter dieses Ereignis zählen die Kombinationen:{' '}
          {link.filter(element => element === 2).length != 0 &&
            recht.filter(element => element === 2).length != 0 && (
              <>(2,2)</>
            )}{' '}
          {link.filter(element => element === 3).length != 0 &&
            recht.filter(element => element === 3).length != 0 && (
              <>(3,3)</>
            )}{' '}
          {link.filter(element => element === 4).length != 0 &&
            recht.filter(element => element === 4).length != 0 && (
              <>(4,4)</>
            )}{' '}
          {link.filter(element => element === 5).length != 0 &&
            recht.filter(element => element === 5).length != 0 && <>(5,5)</>}
          .
        </p>
        <p>
          Das Drehen einer zufälligen Zahl entspricht einem Laplace-Experiment.
          Berechne die Wahrscheinlichkeiten mit der Formel:
        </p>
        {link.filter(element => element === 2).length != 0 &&
          recht.filter(element => element === 2).length != 0 && (
            <>
              {buildEquation([
                [
                  <>
                    p<sub>22</sub>
                  </>,
                  <>=</>,
                  <>
                    {buildInlineFrac(<>Anzahl 2er links</>, 4)} ·{' '}
                    {buildInlineFrac(<>Anzahl 2er rechts</>, 5)}
                  </>,
                ],
                [
                  <></>,
                  <>=</>,
                  <>
                    {buildInlineFrac(
                      <>{link.filter(element => element === 2).length}</>,
                      4,
                    )}{' '}
                    ·{' '}
                    {buildInlineFrac(
                      <>{recht.filter(element => element === 2).length}</>,
                      5,
                    )}
                  </>,
                ],
                [
                  <></>,
                  <>=</>,
                  <>
                    {ppFrac(p22)} = {pp(p22)}
                  </>,
                ],
              ])}
            </>
          )}
        {link.filter(element => element === 3).length != 0 &&
          recht.filter(element => element === 3).length != 0 && (
            <>
              {buildEquation([
                [
                  <>
                    p<sub>33</sub>
                  </>,
                  <>=</>,
                  <>
                    {buildInlineFrac(<>Anzahl 3er links</>, 4)} ·{' '}
                    {buildInlineFrac(<>Anzahl 3er rechts</>, 5)}
                  </>,
                ],
                [
                  <></>,
                  <>=</>,
                  <>
                    {buildInlineFrac(
                      <>{link.filter(element => element === 3).length}</>,
                      4,
                    )}{' '}
                    ·{' '}
                    {buildInlineFrac(
                      <>{recht.filter(element => element === 3).length}</>,
                      5,
                    )}
                  </>,
                ],
                [
                  <></>,
                  <>=</>,
                  <>
                    {ppFrac(p33)} = {pp(p33)}
                  </>,
                ],
              ])}
            </>
          )}
        {link.filter(element => element === 4).length != 0 &&
          recht.filter(element => element === 4).length != 0 && (
            <>
              {buildEquation([
                [
                  <>
                    p<sub>44</sub>
                  </>,
                  <>=</>,
                  <>
                    {buildInlineFrac(<>Anzahl 4er links</>, 4)} ·{' '}
                    {buildInlineFrac(<>Anzahl 4er rechts</>, 5)}
                  </>,
                ],
                [
                  <></>,
                  <>=</>,
                  <>
                    {buildInlineFrac(
                      <>{link.filter(element => element === 4).length}</>,
                      4,
                    )}{' '}
                    ·{' '}
                    {buildInlineFrac(
                      <>{recht.filter(element => element === 4).length}</>,
                      5,
                    )}
                  </>,
                ],
                [
                  <></>,
                  <>=</>,
                  <>
                    {ppFrac(p44)} = {pp(p44)}
                  </>,
                ],
              ])}
            </>
          )}
        {link.filter(element => element === 5).length != 0 &&
          recht.filter(element => element === 5).length != 0 && (
            <>
              {buildEquation([
                [
                  <>
                    p<sub>55</sub>
                  </>,
                  <>=</>,
                  <>
                    {buildInlineFrac(<>Anzahl 5er links</>, 4)} ·{' '}
                    {buildInlineFrac(<>Anzahl 5er rechts</>, 5)}
                  </>,
                ],
                [
                  <></>,
                  <>=</>,
                  <>
                    {buildInlineFrac(
                      <>{link.filter(element => element === 5).length}</>,
                      4,
                    )}{' '}
                    ·{' '}
                    {buildInlineFrac(
                      <>{recht.filter(element => element === 5).length}</>,
                      5,
                    )}
                  </>,
                ],
                [
                  <></>,
                  <>=</>,
                  <>
                    {ppFrac(p55)} = {pp(p55)}
                  </>,
                ],
              ])}
            </>
          )}
        <p>Berechne damit die Wahrscheinlichkeit für das Ereignis:</p>
        <p>
          p ={' '}
          {ppPolynom([
            [p22, 'x', 0],
            [p33, 'x', 0],
            [p44, 'x', 0],
            [p55, 'x', 0],
          ])}{' '}
          = {pp(p22 + p33 + p44 + p55)} ={' '}
          <strong>{pp(100 * (p22 + p33 + p44 + p55))} %</strong>
        </p>
        <p>
          <strong>Durch 12 teilbare Zahl</strong>
        </p>
        <p>
          Verwende die 12er-Reihe: <br></br>12, 24, 36, 48, 60, ...
        </p>
        <p>
          {(link.filter(element => element === 2).length == 0 ||
            recht.filter(element => element === 4).length == 0) && (
            <>
              Keine der Zahlen kann mit den Ziffern gedreht werden. Damit ist
              die Wahrscheinlichkeit <strong>p = 0</strong>.
            </>
          )}
          {link.filter(element => element === 2).length > 0 &&
            recht.filter(element => element === 4).length > 0 && (
              <>
                Die Kombination (2,4) kann mit den Glücksrädern gedreht werden.
                <br></br>Berechne die Wahrscheinlichkeit:<br></br>
                <br></br>
                {buildEquation([
                  [
                    <>
                      p<sub>24</sub>
                    </>,
                    <>=</>,
                    <>
                      {buildInlineFrac(<>Anzahl 2er links</>, 4)} ·{' '}
                      {buildInlineFrac(<>Anzahl 4er rechts</>, 5)}
                    </>,
                  ],
                  [
                    <></>,
                    <>=</>,
                    <>
                      {buildInlineFrac(
                        <>{link.filter(element => element === 2).length}</>,
                        4,
                      )}{' '}
                      ·{' '}
                      {buildInlineFrac(
                        <>{recht.filter(element => element === 4).length}</>,
                        5,
                      )}
                    </>,
                  ],
                  [
                    <></>,
                    <>=</>,
                    <>
                      {ppFrac(p24)} = {pp(p24)}
                    </>,
                  ],
                ])}
                <p>
                  Die Wahrscheinlichkeit beträgt{' '}
                  <strong>{pp(100 * p24)} %</strong>.
                </p>
              </>
            )}
        </p>
        <p>
          <strong>Höchstens eine 4</strong>
        </p>
        <p>
          Berechne die Wahrscheinlichkeit geschickt über das Gegenereignis. Das
          Gegenereignis lautet:
        </p>
        <p>
          {'"'}
          <i>Zwei mal eine 4</i>
          {'"'}
        </p>

        <p>
          {link.filter(element => element === 4).length > 0 &&
            recht.filter(element => element === 4).length > 0 && (
              <>
                Die Wahrscheinlichkeit p<sub>44</sub> wurde schon berechnet:
                <br></br>p<sub>44</sub> = {pp(p44)}
                <br></br>
                <br></br>
                Damit ist die Gegenwahrscheinlichkeit:<br></br> 1 − {pp(p44)} ={' '}
                {pp(1 - p44)}
                <p>
                  Mit <strong>{pp(100 * (1 - p44))} %</strong> erscheint
                  höchstens eine 4.
                </p>
              </>
            )}
          {(link.filter(element => element === 4).length == 0 ||
            recht.filter(element => element === 4).length == 0) && (
            <>
              Die Kombination (4,4) kann mit den Glücksrädern aber nicht
              dargestellt werden.<br></br>
              <br></br>
              Damit ist die Wahrscheinlichkeit <strong>100 %</strong>, höchstens
              eine 4 zu erhalten.
            </>
          )}
        </p>
      </>
    )
  },
}
