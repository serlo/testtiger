import { Exercise } from '@/data/types'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  s: number
  höhe: number
  alpha: number
  farbe: number
}

export const exercise259: Exercise<DATA> = {
  title: 'Körper',
  source: '2021 Pflichtteil A2 - Aufgabe 2',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return {
      s: rng.randomIntBetween(30, 60) / 10,
      höhe: rng.randomIntBetween(45, 90) / 10,
      alpha: rng.randomIntBetween(55, 75),
      farbe: rng.randomIntBetween(8, 12),
    }
  },
  originalData: { s: 3.7, höhe: 5.1, alpha: 72, farbe: 10 },
  constraint({ data }) {
    return (
      data.höhe >
      data.s *
        (Math.cos((2 * data.alpha * Math.PI) / 360) +
          Math.sin((2 * data.alpha * Math.PI) / 360))
    )
  },
  task({ data }) {
    return (
      <>
        <p>
          Ein Kunstwerk setzt sich aus einer Halbkugel und einem Kegel zusammen.
        </p>
        <svg viewBox="0 0 328 190">
          <image
            href="/content/BW_Realschule/259_Körper.jpg"
            height="190"
            width="328"
          />
        </svg>
        <p>
          Es gilt: <br></br>s = {pp(data.s)} m<br></br>h<sub>ges</sub> ={' '}
          {pp(data.höhe)} m<br></br>α = {pp(data.alpha)}°
        </p>
        <ul>
          <li>Berechne den Oberflächeninhalt des zusammengesetzten Körpers.</li>
        </ul>
        <p>
          Dieses Kunstwerk soll mit Farbe angestrichen werden. Eine
          1-Liter-Farbdose reicht für {pp(data.farbe)} m²
        </p>
        <ul>
          <li>Wie viele Dosen müssen gekauft werden?</li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    const radiuskegel = roundToDigits(
      Math.cos((data.alpha * 2 * Math.PI) / 360) * data.s,
      2,
    )
    const höhekegel = roundToDigits(
      Math.sin((data.alpha * 2 * Math.PI) / 360) * data.s,
      2,
    )
    const radius = roundToDigits(data.höhe - höhekegel, 2)
    const kegelfläche = roundToDigits(Math.PI * radiuskegel * data.s, 2)
    const kreisring = roundToDigits(
      Math.PI * (radius * radius - radiuskegel * radiuskegel),
      2,
    )
    const kugelfläche = roundToDigits(Math.PI * radius * radius * 2, 2)
    const surface_m2 = kegelfläche + kreisring + kugelfläche

    return (
      <>
        <p>
          <strong>Oberfläche des Körpers</strong>
        </p>
        <p>Die Oberfläche des Körpers besteht aus:</p>
        <ul>
          <li>Der Mantelfläche des Kegels</li>
          <li>Der Fläche des Kreisrings</li>
          <li>die Oberfläche der Halbkugel</li>
        </ul>
        <p>
          <strong>Mantelfläche des Kegels</strong>
        </p>
        <p>
          Für die Mantelfläche wird der Radius des Kegels benötigt. Berechne den
          Radius im rechtwinkligen Dreieck:
        </p>
        {buildEquation([
          [
            <>cos(α)</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>
                  r<sub>Kegel</sub>
                </>,
                <>s</>,
              )}
            </>,
          ],
          [
            <>cos({pp(data.alpha)}°)</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>
                  r<sub>Kegel</sub>
                </>,
                <>{pp(data.s)} m</>,
              )}
            </>,
            <>| · {pp(data.s)} m</>,
          ],
          [
            <>
              r<sub>Kegel</sub>
            </>,
            <>=</>,
            <>
              cos({pp(data.alpha)}°) · {pp(data.s)} m
            </>,
          ],
          [
            <>
              r<sub>Kegel</sub>
            </>,
            <>≈</>,
            <>{pp(radiuskegel)} m</>,
          ],
        ])}
        <p>Berechne damit die Mantelfläche des Kegels:</p>
        {buildEquation([
          [<>M</>, <>=</>, <>π · r · s</>],
          [
            <></>,
            <>=</>,
            <>
              π · {pp(radiuskegel)} m · {pp(data.s)} m
            </>,
          ],
          [<></>, <>≈</>, <>{pp(kegelfläche)} m²</>],
        ])}
        <p>
          <strong>Fläche des Kreisrings</strong>
        </p>
        <p>
          Der Radius der Kugel lässt sich aus der Gesamthöhe und der Höhe des
          Kegels berechnen. Berechne also die Höhe des Kegels:
        </p>
        {buildEquation([
          [
            <>sin(α)</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>
                  h<sub>Kegel</sub>
                </>,
                <>s</>,
              )}
            </>,
          ],
          [
            <>sin({pp(data.alpha)}°)</>,
            <>=</>,
            <>
              {buildInlineFrac(
                <>
                  h<sub>Kegel</sub>
                </>,
                <>{pp(data.s)} m</>,
              )}
            </>,
            <>| · {pp(data.s)} m</>,
          ],
          [
            <>
              h<sub>Kegel</sub>
            </>,
            <>=</>,
            <>
              sin({pp(data.alpha)}°) · {pp(data.s)} m
            </>,
          ],
          [
            <>
              h<sub>Kegel</sub>
            </>,
            <>≈</>,
            <>{pp(höhekegel)} m</>,
          ],
        ])}
        <p>Der Radius der Kugel ist damit:</p>
        <p>
          R = h<sub>ges</sub> − h<sub>Kegel</sub> = {pp(radius)} m
        </p>
        <p>Berechne damit die Fläche des Kreisrings:</p>
        {buildEquation([
          [
            <>A</>,
            <>=</>,
            <>
              π · (R² − r<sub>Kegel</sub>²)
            </>,
          ],
          [
            <></>,
            <>=</>,
            <>
              π · (({pp(radius)} m)² − ({pp(radiuskegel)} m)²)
            </>,
          ],
          [<></>, <>≈</>, <>{pp(kreisring)} m²</>],
        ])}
        <p>
          <strong>Oberfläche der Halbkugel</strong>
        </p>
        <p>
          Berechne die Oberfläche mit der Formel. Achte darauf, dass hier nur
          eine halbe Kugel vorliegt:
        </p>
        {buildEquation([
          [<>O</>, <>=</>, <>{ppFrac(1 / 2)} · 4 · π · r²</>],
          [
            <></>,
            <>=</>,
            <>
              {ppFrac(1 / 2)} · 4 · π · ({pp(radius)} m)²
            </>,
          ],
          [<></>, <>≈</>, <>{pp(kugelfläche)} m²</>],
        ])}
        <p>
          <strong>Farbdosen</strong>
        </p>
        <p>Die Oberfläche beträgt: {pp(surface_m2)} m²</p>
        <p>Berechne wie viele Farbdosen benötigt werden:</p>
        <p>
          {pp(surface_m2)} m² : {pp(data.farbe)} m² ={' '}
          <strong>{pp(roundToDigits(surface_m2 / data.farbe, 2))}</strong>
        </p>
        <p>
          Es werden{' '}
          <strong>{pp(Math.ceil(surface_m2 / data.farbe))} ganze Dosen</strong>{' '}
          benötigt.
        </p>
      </>
    )
  },
}
