import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  length: number
  outerWidth: number
  outerHeight: number
  price: number
}

export const exercise26: Exercise<DATA> = {
  title: 'Volumen und Preis',
  source: '2021 Teil 1 Aufgabe 3 (Variante 2)',
  useCalculator: true,
  duration: 5,
  generator(rng) {
    return {
      length: rng.randomIntBetween(100, 200) / 100,
      outerWidth: rng.randomIntBetween(200, 400) / 100,
      outerHeight: rng.randomIntBetween(0, 100) / 100,
      price: rng.randomIntBetween(35, 45),
    }
  },
  originalData: {
    length: 2.88,
    outerWidth: 1.94,
    outerHeight: 0.4,
    price: 39,
  },

  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p> Herr Celik hat einen alten LKW gekauft.</p>

        <svg viewBox="0 0 537 520">
          <image
            href="/content/NRW_MSA/NRW_MSA_2021_v2_3.jpg"
            width="537"
            height="520"
          />
          <text x={230} y={250} fontSize={30} textAnchor="right" stroke="black">
            {pp(data.length)} m
          </text>
          <text x={50} y={180} fontSize={30} textAnchor="right" stroke="black">
            {pp(data.outerWidth)} m
          </text>
          <text x={25} y={335} fontSize={30} textAnchor="right" stroke="black">
            {pp(data.outerHeight)} m
          </text>
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 1,
      duration: 2,
      task({ data }) {
        return (
          <>
            <p> a) Berechne das Volumen des quaderförmigen Laderaums. </p>
          </>
        )
      },
      correctionHints({ data }) {
        return (
          <>
            Überprüfe, dass die Antwort einen vollständigen Rechenweg enthält
            und nicht nur das Endergebnis.
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Das Volumen eines Quaders berechnest du mit der Formel:</p>
            {buildEquation([
              ['V', '=', 'l · b · h'],
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
                      Einsetzen der Werte
                    </span>
                  </Color4>
                </>,
              ],
              [
                '',
                '=',
                <>
                  {pp(data.length)} · {pp(data.outerWidth)} ·{' '}
                  {pp(data.outerHeight)}
                </>,
              ],
              [
                '',
                '=',
                <>
                  {pp(
                    roundToDigits(
                      data.length * data.outerWidth * data.outerHeight,
                      2,
                    ),
                  )}{' '}
                  [m³]
                </>,
              ],
            ])}
            <p>
              {' '}
              Das Volumen des quaderförmigen Laderaums beträgt{' '}
              <b>
                {pp(
                  roundToDigits(
                    data.length * data.outerWidth * data.outerHeight,
                    2,
                  ),
                )}{' '}
                m³
              </b>
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 5,
      task({ data }) {
        return (
          <>
            <p>
              b) Der Boden und die inneren Seitenwände des Laderaums müssen neu
              lackiert werden. Die Kosten für das Lackieren betragen{' '}
              {data.price} € pro angefangenen Quadratmeter (m<sup>2</sup>).
              Berechne den Preis der neuen Lackierung.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Bestimme die zu lackierenden Flächen:
              <p />
              <ul>
                <li>1 x Boden</li>
                <li>2 x lange Seitenwand</li>
                <li>2 x kurze Seitenwand</li>
              </ul>
              <p>Berechne nun den Flächeninhalt der einzelnen Flächen:</p>
              {buildEquation([
                [
                  <>
                    A<sub>Boden</sub>
                  </>,
                  <>=</>,
                  <>l · b</>,
                ],
                [
                  <></>,
                  <>=</>,
                  <>
                    {pp(data.length)} · {pp(data.outerWidth)}
                  </>,
                ],
                [
                  <></>,
                  <>=</>,
                  <>
                    {pp(data.length * data.outerWidth)} [m<sup>2</sup>]
                  </>,
                ],
              ])}
              {buildEquation([
                [
                  <>
                    A<sub>lange Seitenwand</sub>
                  </>,
                  <>=</>,
                  <>b · h</>,
                ],
                [
                  <></>,
                  <>=</>,
                  <>
                    {pp(data.outerWidth)} · {pp(data.outerHeight)}
                  </>,
                ],
                [
                  <></>,
                  <>=</>,
                  <>
                    {pp(data.outerWidth * data.outerHeight)} [m<sup>2</sup>]
                  </>,
                ],
              ])}
              {buildEquation([
                [
                  <>
                    A<sub>kurze Seitenwand</sub>
                  </>,
                  <>=</>,
                  <>l · h</>,
                ],
                [
                  <></>,
                  <>=</>,
                  <>
                    {pp(data.length)} · {pp(data.outerHeight)}
                  </>,
                ],
                [
                  <></>,
                  <>=</>,
                  <>
                    {pp(data.length * data.outerHeight)} [m<sup>2</sup>]
                  </>,
                ],
              ])}
              <p>
                Jetzt kannst du die drei Flächen zusammenrechnen (Achtung: du
                brauchst die Seitenwände zweimal):
              </p>
              {buildEquation([
                [
                  <>
                    A<sub>gesamt</sub>
                  </>,
                  <>=</>,
                  <>
                    A<sub>Boden</sub> + 2 · A<sub>lange Seitenwand</sub>
                  </>,
                ],
                [
                  <></>,
                  <></>,
                  <>
                    + 2 · A<sub>kurze Seitenwand</sub>
                  </>,
                ],
                [
                  <></>,
                  <>=</>,
                  <>
                    {pp(data.length * data.outerWidth)} + 2 ·{' '}
                    {pp(data.outerWidth * data.outerHeight)} + 2 ·{' '}
                    {pp(data.length * data.outerHeight)}{' '}
                  </>,
                ],
                [
                  <></>,
                  <>≈</>,
                  <>
                    {pp(
                      roundToDigits(
                        data.length * data.outerWidth +
                          2 * (data.outerWidth * data.outerHeight) +
                          2 * (data.length * data.outerHeight),
                        2,
                      ),
                    )}{' '}
                    [m<sup>2</sup>]
                  </>,
                ],
              ])}
              <p>
                Die Lackierung kostet {data.price} € pro angefangenem
                Quadratmeter. <br></br>Es sind{' '}
                {pp(
                  roundToDigits(
                    data.length * data.outerWidth +
                      2 * (data.outerWidth * data.outerHeight) +
                      2 * (data.length * data.outerHeight),
                    2,
                  ),
                )}{' '}
                m<sup>2</sup> zu lackieren, das heißt, der{' '}
                {pp(
                  roundToDigits(
                    data.length * data.outerWidth +
                      2 * (data.outerWidth * data.outerHeight) +
                      2 * (data.length * data.outerHeight) +
                      0.5,
                    0,
                  ),
                )}
                . Quadratmeter ist angefangen.{' '}
              </p>
              <p>
                Berechne{' '}
                {pp(
                  roundToDigits(
                    data.length * data.outerWidth +
                      2 * (data.outerWidth * data.outerHeight) +
                      2 * (data.length * data.outerHeight),
                    0,
                  ),
                )}{' '}
                · {data.price} ={' '}
                {pp(
                  roundToDigits(
                    data.length * data.outerWidth +
                      2 * (data.outerWidth * data.outerHeight) +
                      2 * (data.length * data.outerHeight),
                    0,
                  ) * data.price,
                )}
                .
              </p>
              <p>
                Die neue Lackierung kostet{' '}
                <strong>
                  {pp(
                    roundToDigits(
                      data.length * data.outerWidth +
                        2 * (data.outerWidth * data.outerHeight) +
                        2 * (data.length * data.outerHeight),
                      0,
                    ) * data.price,
                  )}{' '}
                  €
                </strong>
                .
              </p>
            </p>
          </>
        )
      },
    },
  ],
}
