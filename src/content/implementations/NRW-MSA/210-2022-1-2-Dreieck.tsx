import { Exercise } from '@/data/types'
import { buildInlineFrac, buildSqrt } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  c: number
}

export const exercise210: Exercise<DATA> = {
  title: '2022 Variante 1 /2) Dreieck',
  useCalculator: false,
  duration: -1,

  generator(rng) {
    return {
      a: rng.randomIntBetween(180, 240) / 10,
      c: rng.randomIntBetween(24, 30),
    }
  },
  constraint({ data }) {
    return data.a != data.c
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
  subtasks: {
    tasks: [
      ({ data }) => {
        return (
          <>
            <svg viewBox="0 0 720 480" className="h-[260px]">
              <image
                href="/content/NRW_MSA_Dreieck.jpg"
                height="500"
                width="700"
              />
            </svg>
            <p>
              In dem abgebildeten Dreieck gilt: a = {pp(data.a)} cm und c ={' '}
              {data.c} cm.
            </p>
            <p>a) Berechne die Länge der Seite b.</p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>b) Berechne die Größe des Winkels α.</p>
          </>
        )
      },
    ],
    solutions: [
      ({ data }) => {
        return (
          <>
            <p>
              In diesem rechtwinkligen Dreieck sind zwei Seitenlängen gegeben.
              Verwende den Satz des Pythagoras:
            </p>
            <p>a² + b² = c²</p>

            <p>
              Forme die Gleichung um, da die Seitenlänge von b berechnet wird:
            </p>
            <p>b² = c² − a²</p>

            <p>Setze die gegebenen Seitenlängen:</p>
            <p>
              b² = {data.c}² − {pp(data.a)}²
            </p>

            <p>Wende die Quadratwurzel an und bestimme b.</p>
            <p>b = {buildSqrt(data.c + '² − ' + pp(data.a) + '²')}</p>
            <p>
              b ={' '}
              {pp(
                Math.round(Math.sqrt(data.c * data.c - data.a * data.a) * 100) /
                  100
              )}
            </p>
            <p>
              Die Seite b ist ungefähr{' '}
              {pp(
                Math.round(Math.sqrt(data.c * data.c - data.a * data.a) * 100) /
                  100
              )}{' '}
              cm lang.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>In einem rechtwinkligen Dreieck gilt:</p>
            <p>sin(α) = {buildInlineFrac('Gegenkathete', 'Hypotenuse')}</p>

            <p>
              Diese Seiten entsprechen im rechtwinkligen Dreieck oben den Seiten
              a und c:
            </p>
            <p>sin(α) = {buildInlineFrac('a', 'c')}</p>
            <p>Setze die Seitenlängen ein:</p>
            <p>sin(α) = {buildInlineFrac(pp(data.a), data.c)}</p>
            <p>
              Verwende die Umkehrfunktion sin<sup>-1</sup>() und berechne α:
            </p>
            <p>
              α = sin<sup>-1</sup>
              <span className="inline-block  scale-y-[2.6]">(</span>
              {buildInlineFrac(pp(data.a), data.c)}
              <span className="inline-block  scale-y-[2.6]">)</span>
            </p>
            <p>
              α ={' '}
              {pp(
                Math.round(
                  (Math.asin(data.a / data.c) / (2 * Math.PI)) * 360 * 100
                ) / 100
              )}
              °
            </p>
            <p>
              Der Winkel α ist ungefähr{' '}
              {pp(
                Math.round(
                  (Math.asin(data.a / data.c) / (2 * Math.PI)) * 360 * 100
                ) / 100
              )}
              ° groß.
            </p>
          </>
        )
      },
    ],
  },
}
