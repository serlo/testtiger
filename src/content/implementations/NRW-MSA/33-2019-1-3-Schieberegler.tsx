import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  c: number
  case: number
}

export const exercise33: Exercise<DATA> = {
  title: 'Schieberegler',
  source: '2019 Teil 1 Aufgabe 3',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {
      c: rng.randomIntBetween(1, 7),
      case: rng.randomIntBetween(0, 3),
    }
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    const c = data.c // Wert von c, der dynamisch aus den Daten kommt
    const generatePathData = (cValue: number): string => {
      // Berechnung für den Pfad basierend auf dem c-Wert
      return `M 100 ${0 - data.c * 40.3} C 220 ${541 - data.c * 40.3}, 240 ${541 - data.c * 40.3}, 360 ${0 - data.c * 40.3}`
    }
    return (
      <>
        <p>
          Isabelle zeichnet mit einer Geometriesoftware den Graphen einer
          quadratischen Funktion mit: f(x) = x² + c. Sie erstellt einen
          Schieberegler, mit dem sie den Wert für c verändern kann.
        </p>

        <svg viewBox="0 0 500 450">
          <image
            href="/content/NRW_MSA_2019_1_3_koordinatensystem.svg"
            height="450"
            width="500"
          />

          {/* Dynamischer Pfad mit dem Wert für c */}
          <path
            d={generatePathData(c)}
            stroke="blue"
            strokeWidth={4}
            fill="transparent"
          />
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 42,
      task({ data }) {
        return (
          <>
            <p>
              a) Der Schieberegler zeigt den Wert für c nicht an. Gib den Wert
              für c an.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Lies in der Graphik den Funktionswert an der Stelle x=0 ab.</p>
            <p>Der Wert von c beträgt {data.c}.</p>
          </>
        )
      },
    },
    {
      points: 42,
      task({ data }) {
        return (
          <>
            <p>
              b) Für welche Werte von c{' '}
              {data.case == 0 && (
                <>verläuft der Graph f vollständig oberhalb der x-Achse?</>
              )}
              {data.case == 1 && (
                <>verläuft der Graph f auch unterhalb der x-Achse?</>
              )}
              {data.case == 2 && (
                <>sind alle Funktionswerte von f größer als 2?</>
              )}
              {data.case == 3 && (
                <>sind alle Funktionswerte von f größer als -1?</>
              )}{' '}
              Gib den Bereich für c an.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            {data.case == 0 && (
              <>
                <p>
                  Der Graph verläuft für positive Werte von c oberhalb der
                  x-Achse:<br></br> c {' > '}0
                </p>
              </>
            )}
            {data.case == 1 && (
              <>
                <p>
                  Der Graph verläuft für negative Werte von c auch unterhalb der
                  x-Achse.<br></br> c {' < '}0
                </p>
              </>
            )}
            {data.case == 2 && (
              <>
                <p>
                  Wenn c größer als 2 ist, sind alle Funktionswerte von f größer
                  als 2.<br></br> c {' > '}2
                </p>
              </>
            )}
            {data.case == 3 && (
              <>
                <p>
                  Wenn c größer als -1 ist, sind alle Funktionswerte von f
                  größer als -1.<br></br> c {' > '}
                  {pp(-1)}
                </p>
              </>
            )}
          </>
        )
      },
    },
  ],
}
