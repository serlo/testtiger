import { Exercise } from '@/data/types'
import { getImageAndDescription } from '@/helper/get-image-and-description'

interface DATA {
  task: number
}

export const exercise124: Exercise<DATA> = {
  title: 'Schätzen',
  source: '2023 Teil 1 Aufgabe 5',
  useCalculator: false,
  duration: 3,
  points: 3,
  generator(rng) {
    const task = rng.randomIntBetween(1, 4)
    return { task }
  },
  originalData: { task: 1 },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Bestimme näherungsweise die Anzahl der{' '}
          {data.task === 1 && 'Kaffeebohnen'}
          {data.task === 2 && 'Bälle'}
          {data.task === 3 && 'Beeren'}
          {data.task === 4 && 'Tomaten'} auf dem Bild. Beschreibe, wie du
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
          <svg viewBox="0 0 5234 3453">
            <image
              href="/content/NRW_EESA/124_Bälle.jpg"
              height="3453"
              width="5234"
            />
          </svg>
        )}
        {data.task === 3 && (
          <svg viewBox="0 0 3132 2072">
            <image
              href="/content/NRW_EESA/124_Beeren.jpg"
              height="2072"
              width="3132"
            />
          </svg>
        )}
        {data.task === 4 && (
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
            <p>Teile das Bild in ein Raster mit gleich großen Bereichen auf.</p>
            <svg viewBox="0 0 1469 1037">
              <image
                href="/content/NRW_EESA/124_Kaffeebohnen.jpeg"
                height="1037"
                width="1469"
              />
              <rect
                x="10"
                y="10"
                width="1440"
                height="1025"
                stroke="black"
                fill="transparent"
                strokeWidth="10"
              />
              <line
                x2={1440 / 5 + 10}
                y1={10}
                x1={1440 / 5 + 10}
                y2={1035}
                stroke="black"
                strokeWidth={10}
              />

              <line
                x2={(2 * 1440) / 5 + 10}
                y1={10}
                x1={(2 * 1440) / 5 + 10}
                y2={1035}
                stroke="black"
                strokeWidth={10}
              />
              <line
                x2={(3 * 1440) / 5 + 10}
                y1={10}
                x1={(3 * 1440) / 5 + 10}
                y2={1035}
                stroke="black"
                strokeWidth={10}
              />
              <line
                x2={(4 * 1440) / 5 + 10}
                y1={10}
                x1={(4 * 1440) / 5 + 10}
                y2={1035}
                stroke="black"
                strokeWidth={10}
              />
              <line
                x2={10}
                y1={1025 / 5 + 10}
                x1={1445}
                y2={1025 / 5 + 10}
                stroke="black"
                strokeWidth={10}
              />
              <line
                x2={10}
                y1={(2 * 1025) / 5 + 10}
                x1={1445}
                y2={(2 * 1025) / 5 + 10}
                stroke="black"
                strokeWidth={10}
              />
              <line
                x2={10}
                y1={(3 * 1025) / 5 + 10}
                x1={1445}
                y2={(3 * 1025) / 5 + 10}
                stroke="black"
                strokeWidth={10}
              />
              <line
                x2={10}
                y1={(4 * 1025) / 5 + 10}
                x1={1445}
                y2={(4 * 1025) / 5 + 10}
                stroke="black"
                strokeWidth={10}
              />
            </svg>
            <p>
              In einem durchschnittlich belegten Feld sind etwa 13 Kaffeebohnen.
              <br></br>
              <br></br> Damit sind insgesamt etwa 13 · 25 ={' '}
              <b>325 Kaffeebohnen</b> auf dem Bild.
            </p>
          </>
        )}
        {data.task === 2 && (
          <>
            <p>
              Teile das Bild auf in ein Raster mit gleich großen Bereichen auf.
            </p>
            <svg viewBox="0 0 5234 3453">
              <image
                href="/content/NRW_EESA/124_Bälle.jpg"
                height="3453"
                width="5234"
              />
              <rect
                x="10"
                y="10"
                width="5234"
                height="3453"
                stroke="black"
                fill="transparent"
                strokeWidth="30"
              />
              <line
                x2={5234 / 5 + 10}
                y1={10}
                x1={5234 / 5 + 10}
                y2={3463}
                stroke="black"
                strokeWidth={30}
              />

              <line
                x2={(2 * 5234) / 5 + 10}
                y1={10}
                x1={(2 * 5234) / 5 + 10}
                y2={3463}
                stroke="black"
                strokeWidth={30}
              />
              <line
                x2={(3 * 5234) / 5 + 10}
                y1={10}
                x1={(3 * 5234) / 5 + 10}
                y2={3463}
                stroke="black"
                strokeWidth={30}
              />
              <line
                x2={(4 * 5234) / 5 + 10}
                y1={10}
                x1={(4 * 5234) / 5 + 10}
                y2={3463}
                stroke="black"
                strokeWidth={30}
              />
              <line
                x2={10}
                y1={3453 / 5 + 10}
                x1={5239}
                y2={3453 / 5 + 10}
                stroke="black"
                strokeWidth={30}
              />
              <line
                x2={10}
                y1={(2 * 3453) / 5 + 10}
                x1={5239}
                y2={(2 * 3453) / 5 + 10}
                stroke="black"
                strokeWidth={30}
              />
              <line
                x2={10}
                y1={(3 * 3453) / 5 + 10}
                x1={5239}
                y2={(3 * 3453) / 5 + 10}
                stroke="black"
                strokeWidth={30}
              />
              <line
                x2={10}
                y1={(4 * 3453) / 5 + 10}
                x1={5239}
                y2={(4 * 3453) / 5 + 10}
                stroke="black"
                strokeWidth={30}
              />
            </svg>
            <p>
              In einem durchschnittlich belegten Feld sind etwa 18 Bälle.
              <br></br>
              <br></br> Damit sind insgesamt etwa 18 · 25 = <b>450 Bälle</b> auf
              dem Bild.
            </p>
          </>
        )}
        {data.task === 3 && (
          <>
            <p>Teile das Bild in ein Raster mit gleich großen Bereichen auf.</p>
            <svg viewBox="0 0 3132 2072">
              <image
                href="/content/NRW_EESA/124_Beeren.jpg"
                height="2072"
                width="3132"
              />
              <rect
                x="10"
                y="10"
                width="3132"
                height="2072"
                stroke="white"
                fill="transparent"
                strokeWidth="20"
              />
              <line
                x2={3132 / 5 + 10}
                y1={10}
                x1={3132 / 5 + 10}
                y2={2082}
                stroke="white"
                strokeWidth={20}
              />

              <line
                x2={(2 * 3132) / 5 + 10}
                y1={10}
                x1={(2 * 3132) / 5 + 10}
                y2={2082}
                stroke="white"
                strokeWidth={20}
              />
              <line
                x2={(3 * 3132) / 5 + 10}
                y1={10}
                x1={(3 * 3132) / 5 + 10}
                y2={2082}
                stroke="white"
                strokeWidth={20}
              />
              <line
                x2={(4 * 3132) / 5 + 10}
                y1={10}
                x1={(4 * 3132) / 5 + 10}
                y2={2082}
                stroke="white"
                strokeWidth={20}
              />
              <line
                x2={10}
                y1={2072 / 5 + 10}
                x1={3137}
                y2={2072 / 5 + 10}
                stroke="white"
                strokeWidth={20}
              />
              <line
                x2={10}
                y1={(2 * 2072) / 5 + 10}
                x1={3137}
                y2={(2 * 2072) / 5 + 10}
                stroke="white"
                strokeWidth={20}
              />
              <line
                x2={10}
                y1={(3 * 2072) / 5 + 10}
                x1={3137}
                y2={(3 * 2072) / 5 + 10}
                stroke="white"
                strokeWidth={20}
              />
              <line
                x2={10}
                y1={(4 * 2072) / 5 + 10}
                x1={3137}
                y2={(4 * 2072) / 5 + 10}
                stroke="white"
                strokeWidth={20}
              />
            </svg>
            <p>
              In einem durchschnittlich belegten Feld sind etwa 15 Beeren.
              <br></br>
              <br></br> Damit sind insgesamt etwa 15 · 25 = <b>375 Beeren</b>{' '}
              auf dem Bild.
            </p>
          </>
        )}
        {data.task === 4 && (
          <>
            <p>Teile das Bild in ein Raster mit gleich großen Bereichen auf.</p>
            <svg viewBox="0 0 2448 3264">
              <image
                href="/content/NRW_EESA/124_Tomaten.jpg"
                height="3264"
                width="2448"
              />
              <rect
                x="10"
                y="10"
                width="2448"
                height="3264"
                stroke="white"
                fill="transparent"
                strokeWidth="20"
              />
              <line
                x2={2448 / 5 + 10}
                y1={10}
                x1={2448 / 5 + 10}
                y2={3274}
                stroke="white"
                strokeWidth={20}
              />

              <line
                x2={(2 * 2448) / 5 + 10}
                y1={10}
                x1={(2 * 2448) / 5 + 10}
                y2={3274}
                stroke="white"
                strokeWidth={20}
              />
              <line
                x2={(3 * 2448) / 5 + 10}
                y1={10}
                x1={(3 * 2448) / 5 + 10}
                y2={3274}
                stroke="white"
                strokeWidth={20}
              />
              <line
                x2={(4 * 2448) / 5 + 10}
                y1={10}
                x1={(4 * 2448) / 5 + 10}
                y2={3274}
                stroke="white"
                strokeWidth={20}
              />
              <line
                x2={10}
                y1={3264 / 5 + 10}
                x1={2453}
                y2={3264 / 5 + 10}
                stroke="white"
                strokeWidth={20}
              />
              <line
                x2={10}
                y1={(2 * 3264) / 5 + 10}
                x1={2453}
                y2={(2 * 3264) / 5 + 10}
                stroke="white"
                strokeWidth={20}
              />
              <line
                x2={10}
                y1={(3 * 3264) / 5 + 10}
                x1={2453}
                y2={(3 * 3264) / 5 + 10}
                stroke="white"
                strokeWidth={20}
              />
              <line
                x2={10}
                y1={(4 * 3264) / 5 + 10}
                x1={2453}
                y2={(4 * 3264) / 5 + 10}
                stroke="white"
                strokeWidth={20}
              />
            </svg>
            <p>
              In einem durchschnittlich belegten Feld sind etwa 4 Kaffeebohnen.
              <br></br>
              <br></br> Damit sind insgesamt etwa 4 · 25 = <b>100 Tomaten</b>{' '}
              auf dem Bild.
            </p>
          </>
        )}
      </>
    )
  },
}
