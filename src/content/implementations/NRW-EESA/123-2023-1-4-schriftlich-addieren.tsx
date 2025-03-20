import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
}

export const exercise123: Exercise<DATA> = {
  title: 'schriftlich addieren',
  source: '2023 Teil 1 Aufgabe 4',
  useCalculator: false,
  duration: 6,
  points: 3,
  generator(rng) {
    return {
      a: rng.randomIntBetween(2000, 3500) / 100,
      b: rng.randomIntBetween(100, 1000) / 100,
    }
  },
  originalData: {
    a: 32.73,
    b: 4.21,
  },
  learningPathData: {
    a: 25.75,
    b: 4.22,
  },
  constraint({ data }) {
    const aDigits = data.a.toFixed(2).toString().split('') // Ziffern von a als String-Array
    const bDigits = data.b.toFixed(2).toString().split('') // Ziffern von b als String-Array

    // Beispiel: Zugriff auf die erste Ziffer von a (vor dem Komma)
    const firstDigitA = parseInt(aDigits[0])
    const secondDigitA = parseInt(aDigits[1])
    const thirdDigitA = parseInt(aDigits[3])
    const forthDigitA = parseInt(aDigits[4])

    // Beispiel: Zugriff auf die erste Ziffer von b (vor dem Komma)
    const firstDigitB = parseInt(bDigits[0])
    const secondDigitB = parseInt(bDigits[2])
    const thirdDigitB = parseInt(bDigits[3])

    // Constraint mit Zugriff auf Ziffern
    return (
      firstDigitA + firstDigitB < 10 &&
      secondDigitA + secondDigitB < 10 &&
      thirdDigitA + thirdDigitB < 10 &&
      secondDigitA + firstDigitB < 10 &&
      thirdDigitA + secondDigitB < 10 &&
      forthDigitA + thirdDigitB < 10 &&
      data.a + 2 * data.b < 100
    )
  },
  task({ data }) {
    const aDigits = data.a.toFixed(2).toString().split('') // Ziffern von a als String-Array
    const bDigits = data.b.toFixed(2).toString().split('') // Ziffern von b als String-Array

    const c = data.a + data.b * 10
    const cDigits = c.toFixed(2).toString().split('') // Ziffern von b als String-Array

    const firstDigitA = parseInt(aDigits[0])
    const secondDigitA = parseInt(aDigits[1])
    const thirdDigitA = parseInt(aDigits[3])
    const fourthDigitA = parseInt(aDigits[4])

    const firstDigitB = parseInt(bDigits[0])
    const secondDigitB = parseInt(bDigits[2])
    const thirdDigitB = parseInt(bDigits[3])

    const firstDigitC = parseInt(cDigits[0])
    const secondDigitC = parseInt(cDigits[1])
    const thirdDigitC = parseInt(cDigits[3])
    const fourthDigitC = parseInt(cDigits[4])

    return (
      <>
        <p>
          Julienco rechnet {pp(data.a)} + {pp(data.b)} schriftlich. Er hat einen
          Fehler gemacht. Gib an, worin der Fehler liegt und rechne richtig.
        </p>
        <svg viewBox="0 0 289 149">
          <image
            href="/content/NRW_EESA/123_schriftlich_addieren.jpg"
            height="149"
            width="289"
          />
          <text x={31} y={40} fontSize={32} textAnchor="right" stroke="black">
            {pp(firstDigitA)}
          </text>
          <text x={53} y={40} fontSize={32} textAnchor="right" stroke="black">
            {pp(secondDigitA)}
          </text>
          <text x={71} y={40} fontSize={32} textAnchor="right" stroke="black">
            {','}
          </text>
          <text x={77} y={40} fontSize={32} textAnchor="right" stroke="black">
            {pp(thirdDigitA)}
          </text>
          <text x={100} y={40} fontSize={32} textAnchor="right" stroke="black">
            {pp(fourthDigitA)}
          </text>
          <text x={31} y={72} fontSize={32} textAnchor="right" stroke="black">
            {pp(firstDigitB)}
          </text>
          <text x={49} y={72} fontSize={32} textAnchor="right" stroke="black">
            {','}
          </text>
          <text x={56} y={72} fontSize={32} textAnchor="right" stroke="black">
            {pp(secondDigitB)}
          </text>
          <text x={77} y={72} fontSize={32} textAnchor="right" stroke="black">
            {pp(thirdDigitB)}
          </text>
          <text x={31} y={135} fontSize={32} textAnchor="right" stroke="black">
            {pp(firstDigitC)}
          </text>
          <text x={53} y={135} fontSize={32} textAnchor="right" stroke="black">
            {pp(secondDigitC)}
          </text>
          <text x={71} y={135} fontSize={32} textAnchor="right" stroke="black">
            {','}
          </text>
          <text x={77} y={135} fontSize={32} textAnchor="right" stroke="black">
            {pp(thirdDigitC)}
          </text>
          <text x={100} y={135} fontSize={32} textAnchor="right" stroke="black">
            {pp(fourthDigitC)}
          </text>
        </svg>
      </>
    )
  },
  onlyHints: true,
  correctionHints({ data }) {
    return (
      <>
        Bei dieser Aufgabe soll eine falsche Addition überprüft werden, der
        Fehler erklärt und die richtige Lösung berechnet werden. Der Fehler ist,
        dass die Dezimalstellen nicht richtig untereinander stehen. Die richtige
        Lösung der Addition ist {pp(data.a + data.b)}. Die Aufgabe ist gelöst,
        wenn das richtige Ergebnis der Addition bestimmt wurde. Gib trotzdem
        noch den Hinweis, dass der Fehler erklärt werden muss.
      </>
    )
  },
  solution({ data }) {
    const aDigits = data.a.toFixed(2).toString().split('') // Ziffern von a als String-Array
    const bDigits = data.b.toFixed(2).toString().split('') // Ziffern von b als String-Array

    const c = data.a + data.b
    const cDigits = c.toFixed(2).toString().split('') // Ziffern von b als String-Array

    const firstDigitA = parseInt(aDigits[0])
    const secondDigitA = parseInt(aDigits[1])
    const thirdDigitA = parseInt(aDigits[3])
    const fourthDigitA = parseInt(aDigits[4])

    const firstDigitB = parseInt(bDigits[0])
    const secondDigitB = parseInt(bDigits[2])
    const thirdDigitB = parseInt(bDigits[3])

    const firstDigitC = parseInt(cDigits[0])
    const secondDigitC = parseInt(cDigits[1])
    const thirdDigitC = parseInt(cDigits[3])
    const fourthDigitC = parseInt(cDigits[4])
    return (
      <>
        <p>
          Der Fehler ist, dass die Zahlen nicht richtig untereinander
          geschrieben wurden. Beim schriftlichen Addieren müssen die{' '}
          <b>Kommas immer genau untereinander</b> stehen.
        </p>
        <p>Richtig wäre die Rechnung so:</p>
        <svg viewBox="0 0 289 149">
          <image
            href="/content/NRW_EESA/123_schriftlich_addieren.jpg"
            height="149"
            width="289"
          />
          <text x={31} y={40} fontSize={32} textAnchor="right" stroke="black">
            {pp(firstDigitA)}
          </text>
          <text x={53} y={40} fontSize={32} textAnchor="right" stroke="black">
            {pp(secondDigitA)}
          </text>
          <text x={71} y={40} fontSize={32} textAnchor="right" stroke="black">
            {','}
          </text>
          <text x={77} y={40} fontSize={32} textAnchor="right" stroke="black">
            {pp(thirdDigitA)}
          </text>
          <text x={100} y={40} fontSize={32} textAnchor="right" stroke="black">
            {pp(fourthDigitA)}
          </text>
          <text x={53} y={72} fontSize={32} textAnchor="right" stroke="black">
            {pp(firstDigitB)}
          </text>
          <text x={71} y={72} fontSize={32} textAnchor="right" stroke="black">
            {','}
          </text>
          <text x={77} y={72} fontSize={32} textAnchor="right" stroke="black">
            {pp(secondDigitB)}
          </text>
          <text x={100} y={72} fontSize={32} textAnchor="right" stroke="black">
            {pp(thirdDigitB)}
          </text>
          <text x={31} y={135} fontSize={32} textAnchor="right" stroke="black">
            {pp(firstDigitC)}
          </text>
          <text x={53} y={135} fontSize={32} textAnchor="right" stroke="black">
            {pp(secondDigitC)}
          </text>
          <text x={71} y={135} fontSize={32} textAnchor="right" stroke="black">
            {','}
          </text>
          <text x={77} y={135} fontSize={32} textAnchor="right" stroke="black">
            {pp(thirdDigitC)}
          </text>
          <text x={100} y={135} fontSize={32} textAnchor="right" stroke="black">
            {pp(fourthDigitC)}
          </text>
        </svg>
      </>
    )
  },
}
