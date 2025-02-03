import { Exercise } from '@/data/types'
import { Color1, Color2 } from '@/helper/colors'
import { getImageAndDescription } from '@/helper/get-image-and-description'

interface DATA {
  task: number
}

export const exercise124: Exercise<DATA> = {
  title: 'Schätzen',
  source: '2023 Teil 1 Aufgabe 5',
  useCalculator: false,
  duration: 6,
  points: 3,
  generator(rng) {
    const task = rng.randomIntBetween(1, 3)
    return { task }
  },
  originalData: { task: 1 },
  learningPathData: { task: 2 },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Bestimme näherungsweise die Anzahl der{' '}
          {data.task === 1 && 'Kaffeebohnen'}
          {data.task === 2 && 'Beeren'}
          {data.task === 3 && 'Tomaten'} auf dem Bild. Beschreibe, wie du
          vorgegangen bist!
        </p>
        {data.task === 1 && (
          <svg viewBox="0 0 1469 1037">
            <image
              href="/content/NRW_EESA/124_Kaffeebohnen.jpeg"
              height="1037"
              width="1469"
            />
          </svg>
        )}
        {data.task === 2 && (
          <svg viewBox="0 0 3132 2072">
            <image
              href="/content/NRW_EESA/124_Beeren.jpg"
              height="2072"
              width="3132"
            />
          </svg>
        )}
        {data.task === 3 && (
          <svg viewBox="0 0 2448 3264">
            <image
              href="/content/NRW_EESA/124_Tomaten.jpg"
              height="3264"
              width="2448"
            />
          </svg>
        )}
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        {data.task === 1 && (
          <>
            <svg viewBox="0 0 1469 1037">
              <image
                href="/content/NRW_EESA/124_Kaffeebohnen.jpeg"
                height="1037"
                width="1469"
              />

              <line
                x2={1469 / 4}
                y1={0}
                x1={1469 / 4}
                y2={1037}
                stroke="black"
                strokeWidth={10}
              />

              <line
                x2={(2 * 1469) / 4}
                y1={0}
                x1={(2 * 1469) / 4}
                y2={1037}
                stroke="black"
                strokeWidth={10}
              />
              <line
                x2={(3 * 1469) / 4}
                y1={0}
                x1={(3 * 1469) / 4}
                y2={1037}
                stroke="black"
                strokeWidth={10}
              />

              <line
                x2={0}
                y1={1037 / 4}
                x1={1469}
                y2={1037 / 4}
                stroke="black"
                strokeWidth={10}
              />
              <line
                x2={0}
                y1={(2 * 1037) / 4}
                x1={1469}
                y2={(2 * 1037) / 4}
                stroke="black"
                strokeWidth={10}
              />
              <line
                x2={0}
                y1={(3 * 1037) / 4}
                x1={1469}
                y2={(3 * 1037) / 4}
                stroke="black"
                strokeWidth={10}
              />
              <line
                x2={0}
                y1={1037 / 4}
                x1={1469 / 4}
                y2={1037 / 4}
                stroke="green"
                strokeWidth={15}
              />
              <line
                x2={0}
                y1={(2 * 1037) / 4}
                x1={1469 / 4}
                y2={(2 * 1037) / 4}
                stroke="green"
                strokeWidth={15}
              />
              <line
                x2={8}
                y1={1037 / 4}
                x1={8}
                y2={(2 * 1037) / 4}
                stroke="green"
                strokeWidth={15}
              />
              <line
                x2={1469 / 4}
                y1={1037 / 4}
                x1={1469 / 4}
                y2={(2 * 1037) / 4}
                stroke="green"
                strokeWidth={15}
              />
            </svg>
            <p>
              Teile das Bild auf, in ein Raster mit gleich großen Bereichen.
              Oben ist das Bild zum Beispiel in <Color1>16 Bereiche</Color1>{' '}
              aufgeteilt.
            </p>
            <p>
              Zähle die Bohnen in einem Bereich, der eine mittlere Anzahl an
              Bohnen enthält: Im grün markierten Bereich befinden sich zum
              Beispiel etwa <Color2>22 Bohnen</Color2>.
            </p>
            <p>
              Damit kannst du schätzen:{' '}
              <b>
                <Color2>22</Color2> · <Color1>16</Color1> = 352
              </b>
            </p>
            <p>
              Im letzten Schritt runden wir die Lösung, da wir bei einer
              Schätzung keine genauen Zahlen haben: <b>352 ≈ 350</b>
            </p>
            <p>
              Damit sind <b>insgesamt etwa 350 Bohnen auf dem Bild</b>.
            </p>
            <p>
              <b>Achtung:</b> Wenn du einen anderen Rechenweg genommen hast,
              kann es sein, dass dein Ergebnis ein bisschen abweicht. Du
              solltest aber auf eine Zahl <b>zwischen 300 und 390</b> kommen.
            </p>
          </>
        )}
        {data.task === 2 && (
          <>
            <svg viewBox="0 0 3132 2072">
              <image
                href="/content/NRW_EESA/124_Beeren.jpg"
                height="2072"
                width="3132"
              />

              <line
                x2={3132 / 4}
                y1={0}
                x1={3132 / 4}
                y2={2072}
                stroke="white"
                strokeWidth={20}
              />

              <line
                x2={(2 * 3132) / 4}
                y1={0}
                x1={(2 * 3132) / 4}
                y2={2072}
                stroke="white"
                strokeWidth={20}
              />
              <line
                x2={(3 * 3132) / 4}
                y1={0}
                x1={(3 * 3132) / 4}
                y2={2072}
                stroke="white"
                strokeWidth={20}
              />

              <line
                x2={0}
                y1={2072 / 4}
                x1={3132}
                y2={2072 / 4}
                stroke="white"
                strokeWidth={20}
              />
              <line
                x2={0}
                y1={(2 * 2072) / 4}
                x1={3132}
                y2={(2 * 2072) / 4}
                stroke="white"
                strokeWidth={20}
              />
              <line
                x2={0}
                y1={(3 * 2072) / 4}
                x1={3132}
                y2={(3 * 2072) / 4}
                stroke="white"
                strokeWidth={20}
              />
            </svg>
            <p>
              Teile das Bild auf, in ein Raster mit gleich großen Bereichen.
              Oben ist das Bild zum Beispiel in <Color1>16 Bereiche</Color1>{' '}
              aufgeteilt.
            </p>
            <p>
              Zähle die Beeren in einem der 16 Bereiche: Im Bereich oben rechts
              befinden sich zum Beispiel etwa <Color2>21 Beeren</Color2>.
            </p>
            <p>
              Damit kannst du schätzen:{' '}
              <b>
                <Color2>21</Color2> · <Color1>16</Color1> = 336
              </b>
            </p>
            <p>
              Im letzten Schritt runden wir die Lösung, da wir bei einer
              Schätzung keine genauen Zahlen haben: <b>336 ≈ 340</b>
            </p>
            <p>
              Damit sind <b>insgesamt etwa 340 Beeren auf dem Bild</b>.
            </p>
            <p>
              <b>Achtung:</b> Wenn du einen anderen Rechenweg genommen hast,
              kann es sein, dass dein Ergebnis ein bisschen abweicht. Du
              solltest aber auf eine Zahl <b>zwischen 290 und 380</b> kommen.
            </p>
          </>
        )}
        {data.task === 3 && (
          <>
            <svg viewBox="0 0 2448 3264">
              <image
                href="/content/NRW_EESA/124_Tomaten.jpg"
                height="3264"
                width="2448"
              />

              <line
                x2={2448 / 3}
                y1={0}
                x1={2448 / 3}
                y2={3264}
                stroke="white"
                strokeWidth={20}
              />

              <line
                x2={(2 * 2448) / 3}
                y1={0}
                x1={(2 * 2448) / 3}
                y2={3264}
                stroke="white"
                strokeWidth={20}
              />

              <line
                x2={0}
                y1={3264 / 3}
                x1={2448}
                y2={3264 / 3}
                stroke="white"
                strokeWidth={20}
              />
              <line
                x2={0}
                y1={(2 * 3264) / 3}
                x1={2448}
                y2={(2 * 3264) / 3}
                stroke="white"
                strokeWidth={20}
              />
            </svg>
            <p>
              Teile das Bild auf, in ein Raster mit gleich großen Bereichen.
              Oben ist das Bild zum Beispiel in <Color1>9 Bereiche</Color1>{' '}
              aufgeteilt.
            </p>
            <p>
              Zähle die Tomaten in einem der 9 Bereiche: Im Bereich unten links
              befinden sich zum Beispiel etwa <Color2>12 Tomaten</Color2>.
            </p>
            <p>
              Damit kannst du schätzen:{' '}
              <b>
                <Color2>12</Color2> · <Color1>9</Color1> = 108
              </b>
            </p>
            <p>
              Im letzten Schritt runden wir die Lösung, da wir bei einer
              Schätzung keine genauen Zahlen haben: <b>108 ≈ 110</b>
            </p>
            <p>
              Damit sind <b>insgesamt etwa 110 Tomaten auf dem Bild</b>.
            </p>
            <p>
              <b>Achtung:</b> Wenn du einen anderen Rechenweg genommen hast,
              kann es sein, dass dein Ergebnis ein bisschen abweicht. Du
              solltest aber auf eine Zahl <b>zwischen 90 und 120</b> kommen.
            </p>
          </>
        )}
      </>
    )
  },
}
