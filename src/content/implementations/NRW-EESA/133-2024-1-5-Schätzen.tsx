import { Exercise } from '@/data/types'
import { getImageAndDescription } from '@/helper/get-image-and-description'

interface DATA {
  task: number
}

export const exercise133: Exercise<DATA> = {
  title: 'Schätzen',
  source: '2024 Teil 1 Aufgabe 5',
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
          Bestimme näherungsweise die Anzahl der {data.task === 1 && 'Röhrchen'}
          {data.task === 2 && 'Holzscheite'}
          {data.task === 3 && 'Bücher'}
          {data.task === 4 && 'Reiskörner'} auf dem Bild. Beschreibe, wie du
          vorgegangen bist.
        </p>
        {data.task === 1 &&
          getImageAndDescription('/content/NRW_MSA/NRW_MSA_Schätzen_1.jpg', '')}
        {data.task === 2 &&
          getImageAndDescription('/content/NRW_MSA/NRW_MSA_Schätzen_2.jpg', '')}
        {data.task === 3 &&
          getImageAndDescription('/content/NRW_MSA/NRW_MSA_Schätzen_3.jpg', '')}
        {data.task === 4 &&
          getImageAndDescription('/content/NRW_EESA/133_Reis.PNG', '')}
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        {data.task === 1 && (
          <p>
            Schätze zuerst die Anzahl der Röhrchen in einem Kasten.<br></br>
            <br></br>In der oberen Reihe im linken Kasten befinden sich 7
            Röhrchen.
            <br></br>An der linken Seite befinden sich 14 Röhrchen übereinander.
            <br></br>
            <br></br>
            Damit sind im ersten Kasten etwa:<br></br> 7 · 14 = 98 Röhrchen.
            <br></br>
            <br></br> Im ganzen Insektenhotel sind damit<br></br> 98 · 3 ={' '}
            <b>294 Röhrchen</b>.
          </p>
        )}
        {data.task === 2 && (
          <p>
            Bestimme die Anzahl der Holzscheite in der obersten Reihe und am
            linken Rand:<br></br>
            <br></br>In der obersten Reihe befinden sich etwa 18 Holzscheite.
            <br></br>Am linken Rand befinden sich etwa 13 Holzscheite.<br></br>
            <br></br>Hochgerechnet auf den ganzen Stapel ergeben sich etwa{' '}
            <br></br>18 · 13 = <b>234 Holzscheite</b>.
          </p>
        )}
        {data.task === 3 && (
          <p>
            Das Bild zeigt insgesamt 10 Fächer mit etwa gleich vielen Büchern
            pro Fach.<br></br>
            Zähle die Anzahl der Bücher in einem Fach.<br></br>
            In rechten, unteren Fach befinden sich zum Beispiel 24 Bücher.
            <br></br>
            <br></br> Rechne damit die Gesamtzahl der Bücher hoch: 24 · 10 ={' '}
            <b>240 Bücher</b>.
          </p>
        )}
        {data.task === 4 && (
          <>
            <svg viewBox="0 0 328 220">
              <image
                href="/content/NRW_EESA/133_Reis.PNG"
                height="220"
                width="328"
              />
              <line
                x2={328 / 4}
                y1={0}
                x1={328 / 4}
                y2={220}
                stroke="white"
                strokeWidth={2}
              />
              <line
                x2={(2 * 328) / 4}
                y1={0}
                x1={(2 * 328) / 4}
                y2={220}
                stroke="white"
                strokeWidth={2}
              />
              <line
                x2={(3 * 328) / 4}
                y1={0}
                x1={(3 * 328) / 4}
                y2={220}
                stroke="white"
                strokeWidth={2}
              />

              <line
                x2={0}
                y1={220 / 3}
                x1={328}
                y2={220 / 3}
                stroke="white"
                strokeWidth={2}
              />
              <line
                x2={0}
                y1={(2 * 220) / 3}
                x1={328}
                y2={(2 * 220) / 3}
                stroke="white"
                strokeWidth={2}
              />
            </svg>
            <p>
              Teile das Bild auf, in ein Raster mit gleich großen Bereichen.
              <br></br>
              <br></br>Im oberen linken Bereich befinden sich etwa 32
              Reiskörner.
              <br></br>
              <br></br> Damit sind insgesamt etwa 32 · 12 ={' '}
              <b>384 Reiskörner</b> auf dem Bild.
            </p>
          </>
        )}
      </>
    )
  },
}
