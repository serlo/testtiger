import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  zahl: number
  exp1: number
  exp2: number
  exp3: number
  exp4: number
  takeaway1: number
  takeaway2: number
  takeaway3: number
  takeaway4: number
}

export const exercise202: Exercise<DATA> = {
  title: 'Terme in Zehnerpotenzschreibweise',
  source: '2024 Pflichtteil A1 Aufgabe 3',
  useCalculator: false,
  duration: 2,
  points: 3,
  generator(rng) {
    return {
      zahl: rng.randomIntBetween(11, 99),
      exp1: rng.randomIntBetween(2, 8),
      exp2: rng.randomIntBetween(2, 8),
      exp3: rng.randomIntBetween(2, 8),
      exp4: rng.randomIntBetween(2, 8),
      takeaway1: rng.randomIntBetween(1, 4),
      takeaway2: rng.randomIntBetween(1, 4),
      takeaway3: rng.randomIntBetween(1, 4),
      takeaway4: rng.randomIntBetween(1, 4),
    }
  },
  constraint({ data }) {
    return (
      data.zahl % 10 != 0 &&
      data.takeaway1 != data.takeaway2 &&
      data.takeaway1 != data.takeaway3 &&
      data.takeaway1 != data.takeaway4 &&
      data.takeaway2 != data.takeaway3 &&
      data.takeaway2 != data.takeaway4 &&
      data.takeaway3 != data.takeaway4 &&
      data.exp1 != data.exp2 &&
      data.exp1 != data.exp3 &&
      data.exp1 != data.exp4 &&
      data.exp2 != data.exp3 &&
      data.exp2 != data.exp4 &&
      data.exp3 != data.exp4 &&
      data.zahl * Math.pow(10, -data.takeaway1 + data.exp1) !=
        data.zahl * Math.pow(10, -data.takeaway2 + data.exp2) &&
      data.zahl * Math.pow(10, -data.takeaway1 + data.exp1) !=
        data.zahl * Math.pow(10, -data.takeaway3 + data.exp3) &&
      data.zahl * Math.pow(10, -data.takeaway1 + data.exp1) !=
        data.zahl * Math.pow(10, -data.takeaway4 + data.exp4) &&
      data.zahl * Math.pow(10, -data.takeaway2 + data.exp2) !=
        data.zahl * Math.pow(10, -data.takeaway3 + data.exp3) &&
      data.zahl * Math.pow(10, -data.takeaway2 + data.exp2) !=
        data.zahl * Math.pow(10, -data.takeaway4 + data.exp4) &&
      data.zahl * Math.pow(10, -data.takeaway3 + data.exp3) !=
        data.zahl * Math.pow(10, -data.takeaway4 + data.exp4)
    )
  },
  task({ data }) {
    return (
      <>
        <p>Gegeben sind vier Terme in Zehnerpotenzschreibweise:</p>
        <ol>
          <li>
            {pp(data.zahl * Math.pow(10, -data.takeaway1))} · 10
            <sup>{data.exp1}</sup>
          </li>
          <li>
            {pp(data.zahl * Math.pow(10, -data.takeaway2))} · 10
            <sup>{data.exp2}</sup>
          </li>
          <li>
            {pp(data.zahl * Math.pow(10, -data.takeaway3))} · 10
            <sup>{data.exp3}</sup>
          </li>
          <li>
            {pp(data.zahl * Math.pow(10, -data.takeaway4))} · 10
            <sup>{data.exp4}</sup>
          </li>
        </ol>
        <p>
          Welcher Term hat den größten Wert? <br></br>Gib diesen ohne
          Zehnerpotenzschreibweise an.
        </p>
      </>
    )
  },
  solution({ data }) {
    const array = [
      data.zahl * Math.pow(10, -data.takeaway1 + data.exp1),
      data.zahl * Math.pow(10, -data.takeaway2 + data.exp2),
      data.zahl * Math.pow(10, -data.takeaway3 + data.exp3),
      data.zahl * Math.pow(10, -data.takeaway4 + data.exp4),
    ]
    const maxValue = Math.max(...array) // Größte Zahl
    const maxIndex = array.indexOf(maxValue) // Index der größten Zahl
    return (
      <>
        <p>Berechne den Wert der Terme:</p>
        <ol>
          <li>
            {pp(data.zahl * Math.pow(10, -data.takeaway1))} · 10
            <sup>{data.exp1}</sup> ={' '}
            {pp(data.zahl * Math.pow(10, -data.takeaway1 + data.exp1))}
          </li>
          <li>
            {pp(data.zahl * Math.pow(10, -data.takeaway2))} · 10
            <sup>{data.exp2}</sup> ={' '}
            {pp(data.zahl * Math.pow(10, -data.takeaway2 + data.exp2))}
          </li>
          <li>
            {pp(data.zahl * Math.pow(10, -data.takeaway3))} · 10
            <sup>{data.exp3}</sup> ={' '}
            {pp(data.zahl * Math.pow(10, -data.takeaway3 + data.exp3))}
          </li>
          <li>
            {pp(data.zahl * Math.pow(10, -data.takeaway4))} · 10
            <sup>{data.exp4}</sup> ={' '}
            {pp(data.zahl * Math.pow(10, -data.takeaway4 + data.exp4))}
          </li>
        </ol>
        <p>
          Der größte Wert hat <strong>Term {maxIndex + 1}</strong> mit{' '}
          {array[maxIndex]}.
        </p>
      </>
    )
  },
}
