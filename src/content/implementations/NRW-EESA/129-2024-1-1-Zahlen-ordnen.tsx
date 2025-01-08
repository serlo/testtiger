import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: boolean
  c: number
}

export const exercise129: Exercise<DATA> = {
  title: 'Zahlen ordnen',
  source: '2024 Teil 1 Aufgabe 1',
  useCalculator: false,
  duration: 2,
  points: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(-9, 2) / 10,
      b: rng.randomBoolean(),
      c: rng.randomIntBetween(11, 99) / 100,
    }
  },
  originalData: {
    a: -0.2,
    b: false,
    c: 0.35,
  },
  constraint({ data }) {
    function swapDecimalPlaces(c: number): number {
      // Konvertiere die Zahl zu einem String
      const cString = c.toFixed(2)

      // Extrahiere den ganzzahligen und den Dezimalteil
      const [integerPart, decimalPart] = cString.split('.')

      // Vertausche die Dezimalstellen
      const swappedDecimalPart = decimalPart[1] + decimalPart[0]

      // Baue die neue Zahl zusammen und konvertiere sie zurück zu einer Zahl
      const d = parseFloat(`${integerPart}.${swappedDecimalPart}`)

      return d
    }
    return (
      data.a != 0 &&
      data.c != 0 &&
      (data.c * 10) % 1 != 0 &&
      data.c != swapDecimalPlaces(data.c)
    )
  },
  task({ data }) {
    function swapDecimalPlaces(c: number): number {
      // Konvertiere die Zahl zu einem String
      const cString = c.toFixed(2)

      // Extrahiere den ganzzahligen und den Dezimalteil
      const [integerPart, decimalPart] = cString.split('.')

      // Vertausche die Dezimalstellen
      const swappedDecimalPart = decimalPart[1] + decimalPart[0]

      // Baue die neue Zahl zusammen und konvertiere sie zurück zu einer Zahl
      const d = parseFloat(`${integerPart}.${swappedDecimalPart}`)

      return d
    }
    return (
      <>
        <p>Ordne die Zahlen der Größe nach. Beginne mit der kleinsten Zahl.</p>
        <p>
          {pp(data.a)}{' '}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
          {pp(data.c)}{' '}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
          {data.b ? pp(data.a + 0.01) : pp(data.a - 0.01)}{' '}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
          {pp(swapDecimalPlaces(data.c))}
        </p>
      </>
    )
  },
  solution({ data }) {
    function swapDecimalPlaces(c: number): number {
      // Konvertiere die Zahl zu einem String
      const cString = c.toFixed(2)

      // Extrahiere den ganzzahligen und den Dezimalteil
      const [integerPart, decimalPart] = cString.split('.')

      // Vertausche die Dezimalstellen
      const swappedDecimalPart = decimalPart[1] + decimalPart[0]

      // Baue die neue Zahl zusammen und konvertiere sie zurück zu einer Zahl
      const d = parseFloat(`${integerPart}.${swappedDecimalPart}`)

      return d
    }
    const zahl_3 = data.b ? data.a + 0.01 : data.a - 0.01
    const array = [data.a, data.c, zahl_3, swapDecimalPlaces(data.c)].sort(
      (a, b) => a - b,
    )
    return (
      <>
        <p>
          {data.a < 0 && (
            <>
              Vergleiche die negativen Zahlen miteinander und die positiven
              Zahlen miteinander.
              <ul>
                <li>
                  {data.b ? (
                    <>
                      {pp(data.a)} ist kleiner als {pp(data.a + 0.01)}
                    </>
                  ) : (
                    <>
                      {pp(data.a - 0.01)} ist kleiner als {pp(data.a)}
                    </>
                  )}
                </li>
                <li>
                  {data.c < swapDecimalPlaces(data.c) ? (
                    <>
                      {data.c} ist kleiner als {pp(swapDecimalPlaces(data.c))}
                    </>
                  ) : (
                    <>
                      {pp(swapDecimalPlaces(data.c))} ist kleiner als{' '}
                      {pp(data.c)}
                    </>
                  )}
                </li>
              </ul>
            </>
          )}
        </p>
        <p>Ordne die Zahlen mit dem Operator {'"<"'}:</p>
        <p>
          <strong>
            {pp(array[0])} &nbsp;&nbsp;{' < '} &nbsp;&nbsp;{pp(array[1])}{' '}
            &nbsp;&nbsp;{' < '}&nbsp;&nbsp; {pp(array[2])}&nbsp;&nbsp; {' < '}{' '}
            &nbsp;&nbsp;{pp(array[3])}
          </strong>
        </p>
      </>
    )
  },
}
