import { Exercise } from '@/data/types'
import { Color1 } from '@/helper/colors'
import { buildSqrt } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  a: number
  b: number
  case: number
  r: number
}

export const exercise32: Exercise<DATA> = {
  title: 'Rechteck',
  source: '2019 Teil 1 Aufgabe 2',
  useCalculator: false,
  duration: 4,
  generator(rng) {
    return {
      a: rng.randomIntBetween(3, 12),
      b: rng.randomIntBetween(2, 10),
      case: rng.randomIntBetween(0, 3),
      r: rng.randomIntBetween(1, 6) * 6,
    }
  },
  constraint({ data }) {
    return data.a > data.b && data.a * data.b != data.r
  },
  intro({ data }) {
    return (
      <>
        <>
          <img
            src="/content/NRW_MSA_2019_1_2_rechteck.svg"
            alt="Rechteck mit Diagonale"
            className="w-[250px] mx-auto"
          />
          <p>
            Ein Rechteck hat die Seitenlängen a = {data.a} cm und b = {data.b}{' '}
            cm.
          </p>
        </>
      </>
    )
  },
  tasks: [
    {
      points: 2,
      task({ data }) {
        return <>a) Berechne die Länge der Diagonale d.</>
      },
      solution({ data }) {
        return (
          <>
            <p>
              Verwende den Satz des Pythagoras. Zwei Seiten des Rechtecks bilden
              mit der Diagonale ein rechtwinkliges Dreieck. In diesem gilt:
            </p>
            <p>a² + b² = d²</p>

            <p>Setze die gegebenen Seitenlängen ein:</p>
            <p>
              {data.a}² + {pp(data.b)}² = d²
            </p>

            <p>Ziehe die Quadratwurzel und bestimme d:</p>
            <p>
              d = {buildSqrt(data.a + '² + ' + data.b + '²')}{' '}
              {Math.sqrt(data.a * data.a + data.b * data.b) % 1 == 0
                ? '='
                : '≈'}{' '}
              {pp(
                roundToDigits(Math.sqrt(data.a * data.a + data.b * data.b), 2),
              )}
            </p>
            <p>
              Die Diagonale d ist{' '}
              {Math.sqrt(data.a * data.a + data.b * data.b) % 1 == 0
                ? ''
                : 'ungefähr'}{' '}
              {pp(
                roundToDigits(Math.sqrt(data.a * data.a + data.b * data.b), 2),
              )}{' '}
              cm lang.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        const text = ['verdoppelt', 'verdreifacht', 'vervierfacht', 'halbiert']
        return (
          <>
            b) Wie verändert sich der Flächeninhalt dieses Rechtecks, wenn man
            jede Seitenlänge {text[data.case]}? Begründe.
          </>
        )
      },
      solution({ data }) {
        const text = ['verdoppelt', 'verdreifacht', 'vervierfacht', 'halbiert']
        const zahl = [2, 3, 4, 0.5]
        return (
          <>
            <p>Den Flächeninhalt eines Rechtecks berechnest du mit:</p>
            <p>A = Länge · Breite</p>
            <p>
              Setze die <Color1>{text[data.case]}en</Color1> Seitenlängen ein:
            </p>
            <p>
              A = <Color1>{ppFrac(zahl[data.case])}</Color1> · {data.a} cm ·{' '}
              <Color1>{ppFrac(zahl[data.case])}</Color1> · {data.b} cm{' '}
            </p>
            <p>
              A = <Color1>{ppFrac(zahl[data.case])}</Color1> ·
              <Color1>{ppFrac(zahl[data.case])}</Color1> · {data.a} cm ·{' '}
              {data.b} cm{' '}
            </p>
            <p>
              A = <Color1>{ppFrac(zahl[data.case] * zahl[data.case])}</Color1> ·{' '}
              {data.a} cm · {data.b} cm{' '}
            </p>
            <p>
              Wenn man die Seitenlängen {text[data.case]}, beträgt der neue
              Flächeninhalt{' '}
              <strong>
                {(data.case == 1 || data.case == 2 || data.case == 0) && 'das '}
                {ppFrac(zahl[data.case] * zahl[data.case])}
                {(data.case == 1 || data.case == 2 || data.case == 0) &&
                  '-fache'}{' '}
                des ursprünglichen Flächeninhalts
              </strong>
              .
            </p>
          </>
        )
      },
    },
    {
      points: 1,
      task({ data }) {
        return (
          <>
            c) Ein anderes Rechteck hat einen Flächeninhalt von {data.r} cm².
            Wie lang könnten die Seiten sein? Gib zwei unterschiedliche
            Möglichkeiten an.
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Suche zwei Zahlenpaare, die miteinander multipliziert {data.r}{' '}
              ergeben.
            </p>
            {data.r == 6 && (
              <>
                <p>Die Seiten des Rechtecks können z.B.</p>
                <p>
                  {' '}
                  <strong> 1 cm und 6 cm </strong>
                </p>
                <p> oder </p>
                <p>
                  {' '}
                  <strong> 3 cm und 2 cm </strong>{' '}
                </p>
                <p>lang sein.</p>
              </>
            )}
            {data.r == 12 && (
              <>
                <p>Die Seiten des Rechtecks können z.B.</p>
                <p>
                  {' '}
                  <strong> 2 cm und 6 cm </strong>{' '}
                </p>
                <p> oder </p>
                <p>
                  {' '}
                  <strong> 3 cm und 4 cm </strong>
                </p>
                <p>lang sein.</p>
              </>
            )}
            {data.r == 18 && (
              <>
                <p>Die Seiten des Rechtecks können z.B.</p>
                <p>
                  {' '}
                  <strong> 3 cm und 6 cm </strong>{' '}
                </p>
                <p> oder </p>
                <p>
                  {' '}
                  <strong> 2 cm und 9 cm </strong>{' '}
                </p>
                <p>lang sein.</p>
              </>
            )}
            {data.r == 24 && (
              <>
                <p>Die Seiten des Rechtecks können z.B.</p>
                <p>
                  {' '}
                  <strong> 4 cm und 6 cm </strong>{' '}
                </p>
                <p> oder </p>
                <p>
                  {' '}
                  <strong> 3 cm und 8 cm </strong>{' '}
                </p>
                <p>lang sein.</p>
              </>
            )}
            {data.r == 30 && (
              <>
                <p>Die Seiten des Rechtecks können z.B.</p>
                <p>
                  {' '}
                  <strong> 5 cm und 6 cm </strong>{' '}
                </p>
                <p> oder </p>
                <p>
                  {' '}
                  <strong> 3 cm und 10 cm </strong>{' '}
                </p>
                <p>lang sein.</p>
              </>
            )}
            {data.r == 36 && (
              <>
                <p>Die Seiten des Rechtecks können z.B.</p>
                <p>
                  {' '}
                  <strong> 6 cm und 6 cm </strong>{' '}
                </p>
                <p> oder </p>
                <p>
                  {' '}
                  <strong> 9 cm und 4 cm </strong>{' '}
                </p>
                <p>lang sein.</p>
              </>
            )}
          </>
        )
      },
    },
  ],
}
