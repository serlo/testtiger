import { Exercise } from '@/data/types'
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
  useCalculator: false,
  duration: 5,
  generator(rng) {
    return {
      length: rng.randomIntBetween(100, 200) / 100,
      outerWidth: rng.randomIntBetween(200, 400) / 100,
      outerHeight: rng.randomIntBetween(0, 100) / 100,
      price: rng.randomIntBetween(35, 45),
    }
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
            href="/content/NRW_MSA_2021_v2_3.jpg"
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
      task({ data }) {
        return (
          <>
            <p> a) Berechne das Volumen des quaderförmigen Laderaums. </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            Das Volumen eines Quaders wird mit dieser Formel berechnet:{' '}
            <b>
              V<sub>Quader</sub> = l · b · h.
            </b>
            <br></br>
            <br></br>
            Setze nun die Werte aus der Abbildung ein: V<sub>Quader</sub> ={' '}
            {pp(data.length)} · {pp(data.outerWidth)} · {pp(data.outerHeight)} ={' '}
            {pp(
              roundToDigits(
                data.length * data.outerWidth * data.outerHeight,
                2,
              ),
            )}{' '}
            [m³]
            <p>
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
              .
            </p>
          </>
        )
      },
    },
    {
      points: 3,
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
              <ul>
                <li>1 x Boden</li>
                <li>2 x lange Seitenwand</li>
                <li>2 x kurze Seitenwand</li>
              </ul>
              Berechne nun den Flächeninhalt der einzelnen Flächen:<br></br>
              <br></br>A<sub>Boden</sub> = l · b = {pp(data.length)} m ·{' '}
              {pp(data.outerWidth)} m<br></br>={' '}
              {pp(data.length * data.outerWidth)} m<sup>2</sup>
              <br></br>
              <br></br>A<sub>lange Seitenwand</sub> = b · h ={' '}
              {pp(data.outerWidth)} m · {pp(data.outerHeight)} m <br></br> ={' '}
              {pp(data.outerWidth * data.outerHeight)} m<sup>2</sup>
              <br></br>
              <br></br>A<sub>kurze Seitenwand</sub> = l · h = {pp(data.length)}{' '}
              m · {pp(data.outerHeight)} m <br></br> ={' '}
              {pp(data.length * data.outerHeight)} m<sup>2</sup>
              <br></br>
              <br></br>
              Jetzt kannst du die drei Flächen zusammenrechnen (Achtung: du
              brauchst die Seitenwände zweimal):
              <br></br>
              <br></br>A<sub>gesamt</sub> = A<sub>Boden</sub> + 2 · A
              <sub>lange Seitenwand</sub> <br></br>{' '}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+
              2 · A
              <sub>
                kurze Seitenwand
                <br></br>
                <br></br>
              </sub>
              A<sub>gesamt</sub>= {pp(data.length * data.outerWidth)} m
              <sup>2</sup> + 2 · {pp(data.outerWidth * data.outerHeight)} m
              <sup>2</sup> <br></br>{' '}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+
              2 · {pp(data.length * data.outerHeight)} m<sup>2</sup> ≈{' '}
              {pp(
                roundToDigits(
                  data.length * data.outerWidth +
                    2 * (data.outerWidth * data.outerHeight) +
                    2 * (data.length * data.outerHeight),
                  2,
                ),
              )}{' '}
              m<sup>2</sup>.<br></br>
              <br></br>
              Die Lackierung kostet {data.price} € pro angefangenem
              Quadratmeter. Es sind{' '}
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
              . Quadratmeter ist angefangen. <br></br>Berechne{' '}
              {pp(
                roundToDigits(
                  data.length * data.outerWidth +
                    2 * (data.outerWidth * data.outerHeight) +
                    2 * (data.length * data.outerHeight),
                  0,
                ),
              )}{' '}
              · {data.price} € ={' '}
              {pp(
                roundToDigits(
                  data.length * data.outerWidth +
                    2 * (data.outerWidth * data.outerHeight) +
                    2 * (data.length * data.outerHeight),
                  0,
                ) * data.price,
              )}{' '}
              €.
              <br></br>
              <br></br>
              Die neue Lackierung kostet{' '}
              {pp(
                roundToDigits(
                  data.length * data.outerWidth +
                    2 * (data.outerWidth * data.outerHeight) +
                    2 * (data.length * data.outerHeight),
                  0,
                ) * data.price,
              )}{' '}
              €.
            </p>
          </>
        )
      },
    },
  ],
}
