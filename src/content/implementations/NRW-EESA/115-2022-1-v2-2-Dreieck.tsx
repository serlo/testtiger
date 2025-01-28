import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  alpha: number
  beta: number
  gamma: number
  alpha_1: number
  b: number
  c: number
}

export const exercise115: Exercise<DATA> = {
  title: 'Dreieck',
  source: '2022 Teil 1 Variante 2 Aufgabe 2',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {
      alpha: rng.randomIntBetween(40, 60),
      beta: rng.randomIntBetween(55, 65),
      gamma: rng.randomIntBetween(35, 60),
      alpha_1: rng.randomIntBetween(6, 9) * 5,
      b: rng.randomIntBetween(30, 38) / 10,
      c: rng.randomIntBetween(39, 45) / 10,
    }
  },
  originalData: { alpha: 53, beta: 57, gamma: 40, alpha_1: 35, b: 3.7, c: 4 },
  learningPathData: {
    alpha: 57,
    beta: 64,
    gamma: 58,
    alpha_1: 45,
    b: 3.5,
    c: 4.2,
  },
  exampleData: {
    alpha: 57,
    beta: 64,
    gamma: 58,
    alpha_1: 40,
    b: 3.6,
    c: 4.0,
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return null
  },
  tasks: [
    {
      points: 3,
      duration: 4,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          //a)
          <>
            <p>Im Folgenden gelten die im Dreieck üblichen Bezeichnungen.</p>

            <p>
              Zeichne ein Dreieck ΔABC mit den Seitenlängen b = {pp(data.b)} cm,
              c = {pp(data.c)} cm und dem Winkel α = {data.alpha_1}°.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Beginne damit die Grundlinie c mit der Länge {pp(data.c)} cm zu
              konstruieren:
            </p>
            <svg viewBox="0 0 328 30">
              <image
                href="/content/NRW_EESA/115_Dreieck1.PNG"
                height="30"
                width="328"
              />
              <text
                x="164"
                y="25"
                fontSize="12"
                textAnchor="middle"
                fill="black"
              >
                c = {pp(data.c)} cm
              </text>
            </svg>
            <p>Zeichne im Punkt A einen Winkel von {data.alpha_1}°:</p>
            <svg viewBox="0 0 328 120">
              <image
                href="/content/NRW_EESA/Dreieck12.svg"
                height="120"
                width="328"
              />
              <text
                x="144"
                y="95"
                fontSize="12"
                textAnchor="middle"
                fill="black"
              >
                {pp(data.alpha_1)}°
              </text>
              <text
                x="164"
                y="115"
                fontSize="12"
                textAnchor="middle"
                fill="black"
              >
                c = {pp(data.c)} cm
              </text>
            </svg>
            <p>
              Markiere Punkt C im Abstand von b = {pp(data.b)} cm zu Punkt A.
            </p>
            <svg viewBox="0 0 328 120">
              <image
                href="/content/NRW_EESA/Dreieck2neu.svg"
                height="120"
                width="328"
              />
              <text
                x="164"
                y="115"
                fontSize="12"
                textAnchor="middle"
                fill="black"
              >
                c = {pp(data.c)} cm
              </text>
              <text
                x="120"
                y="55"
                fontSize="12"
                textAnchor="middle"
                fill="black"
              >
                b = {pp(data.b)} cm
              </text>
              <text
                x="144"
                y="95"
                fontSize="12"
                textAnchor="middle"
                fill="black"
              >
                {pp(data.alpha_1)}°
              </text>
            </svg>
            <p>Verbinde die Punkte B und C, um das Dreieck fertigzustellen.</p>
            <svg viewBox="0 0 328 140">
              <image
                href="/content/NRW_EESA/115_Dreieck3.PNG"
                height="140"
                width="328"
              />
              <text
                x="170"
                y="130"
                fontSize="12"
                textAnchor="middle"
                fill="black"
              >
                c = {pp(data.c)} cm
              </text>
              <text
                x="125"
                y="60"
                fontSize="12"
                textAnchor="middle"
                fill="black"
              >
                b = {pp(data.b)} cm
              </text>
              <text
                x="130"
                y="110"
                fontSize="12"
                textAnchor="middle"
                fill="black"
              >
                {pp(data.alpha_1)}°
              </text>
            </svg>
          </>
        )
      },
    },
    {
      points: 3,
      duration: 1,
      intro({ data }) {
        return (
          <>
            <svg viewBox="0 0 328 180">
              <image
                href="/content/NRW_EESA/115_Dreieck.PNG"
                height="180"
                width="328"
              />
              <text
                x="112"
                y="141"
                fontSize="12"
                textAnchor="middle"
                fill="black"
              >
                {data.alpha}°
              </text>
              <text
                x="210"
                y="140"
                fontSize="12"
                textAnchor="middle"
                fill="black"
              >
                {data.beta}°
              </text>
              <text
                x="175"
                y="55"
                fontSize="12"
                textAnchor="middle"
                fill="black"
              >
                {data.gamma}°
              </text>
            </svg>
          </>
        )
      },
      task({ data }) {
        return (
          //b)
          <>
            <p>
              Kann das oben abgebildete Dreieck mit den angegebenen Winkelmaßen
              gezeichnet werden?
            </p>{' '}
            <p>Entscheide und begründe deine Entscheidung.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            {data.alpha + data.beta + data.gamma != 180 && (
              <p>
                Die Winkelsumme des Dreiecks ergibt{' '}
                {data.alpha + data.beta + data.gamma}°. Die Winkelsumme eines
                Dreiecks beträgt 180°, weshalb das abgebildete Dreieck nicht
                existieren kann.
              </p>
            )}
            {data.alpha + data.beta + data.gamma == 180 && (
              <p>
                Das Dreieck kann konstruiert werden, ist allerdings nicht
                eindeutig. Das abgebildete Dreieck enthält keine Angaben zu den
                Seitenlängen, sodass es in verschiedenen Größen konstruiert
                werden könnte.
              </p>
            )}
          </>
        )
      },
    },
  ],
}
