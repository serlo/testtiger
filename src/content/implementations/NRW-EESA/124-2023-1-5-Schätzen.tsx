import { Exercise } from '@/data/types'
import { getImageAndDescription } from '@/helper/get-image-and-description'

interface DATA {
  task: number
}

export const exercise124: Exercise<DATA> = {
  title: 'Schätzen',
  source: '2023 Teil 1 Aufgabe 5',
  useCalculator: false,
  duration: 42,
  points: 42,
  generator(rng) {
    const task = rng.randomIntBetween(1, 4)
    return { task }
  },
  originalData: { task: 4 },
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
          {data.task === 4 && 'Regen'} auf dem Bild. Beschreibe, wie du
          vorgegangen bist!
        </p>
        {data.task === 1 && (
          <svg viewBox="0 0 1037 1469">
            <image
              href="public/content/NRW_EESA/124_Kaffeebohnen.jpeg"
              height="1469"
              width="1037"
            />
          </svg>
        )}
        {data.task === 2 && (
          <svg viewBox="0 0 5234 3453">
            <image
              href="public/content/NRW_EESA/124_Bälle.jpg"
              height="3453"
              width="5234"
            />
          </svg>
        )}
        {data.task === 3 && (
          <svg viewBox="0 0 3132 2072">
            <image
              href="public/content/NRW_EESA/124_Beeren.jpg"
              height="2072"
              width="3132"
            />
          </svg>
        )}
        {data.task === 4 && (
          <svg viewBox="0 0 2448 3264">
            <image
              href="public/content/NRW_EESA/124_Regen.jpg"
              height="3264"
              width="2448"
            />
          </svg>
        )}
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
