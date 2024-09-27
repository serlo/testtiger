import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  length: number
  outerWidth: number
  outerHeight: number
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
            <p> Berechne das Volumen des quaderförmigen Laderaums. </p>
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
            {pp(data.length)} m · {pp(data.outerWidth)} m ·{' '}
            {pp(data.outerHeight)} m ={' '}
            {pp(
              roundToDigits(
                data.length * data.outerWidth * data.outerHeight,
                2,
              ),
            )}{' '}
            m³
            <p>
              <b>Antwort:</b> Das Volumen des quaderförmigen Laderaums beträgt{' '}
              {pp(
                roundToDigits(
                  data.length * data.outerWidth * data.outerHeight,
                  2,
                ),
              )}{' '}
              m³.
            </p>
          </>
        )
      },
    },
    {
      points: 42,
      task({ data }) {
        return <></>
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
