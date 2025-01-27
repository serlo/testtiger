'use client'
import { Exercise } from '@/data/types'
import { Color1, Color2, Color3 } from '@/helper/colors'
import { getImageAndDescription } from '@/helper/get-image-and-description'
import { useState } from 'react'

interface DATA {
  task: number
}

function ToggleableGrid({
  imageHref,
  imageWidth,
  imageHeight,
  columns,
  rows,
  strokeColor = 'white',
  strokeWidth = 2,
  taskName,
}: {
  imageHref: string
  imageWidth: number
  imageHeight: number
  columns: number
  rows: number
  strokeColor?: string
  strokeWidth?: number
  taskName: string
}) {
  const [showGrid, setShowGrid] = useState(false)

  return (
    <>
      <p>Schätze die Anzahl der {taskName}. Notiere deinen Lösungsweg.</p>
      {showGrid ? (
        <svg viewBox={`0 0 ${imageWidth} ${imageHeight}`} className="my-8">
          <image href={imageHref} height={imageHeight} width={imageWidth} />
          {/* Vertical lines */}
          {Array.from({ length: columns - 1 }).map((_, index) => {
            const x = ((index + 1) * imageWidth) / columns
            return (
              <line
                key={`v-${index}`}
                x1={x}
                y1={0}
                x2={x}
                y2={imageHeight}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
              />
            )
          })}
          {/* Horizontal lines */}
          {Array.from({ length: rows - 1 }).map((_, index) => {
            const y = ((index + 1) * imageHeight) / rows
            return (
              <line
                key={`h-${index}`}
                x1={0}
                y1={y}
                x2={imageWidth}
                y2={y}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
              />
            )
          })}
        </svg>
      ) : (
        getImageAndDescription(imageHref, '')
      )}
      <div>
        <label className="cursor-pointer">
          <input
            type="checkbox"
            checked={showGrid}
            onChange={() => setShowGrid(!showGrid)}
          />{' '}
          Gitterlinien anzeigen
        </label>
      </div>
    </>
  )
}

export const exercise114: Exercise<DATA> = {
  title: 'Schätzen',
  source: '2022 Teil 1 Aufgabe 5',
  useCalculator: false,
  duration: 2,
  points: 3,
  generator(rng) {
    return { task: rng.randomIntBetween(1, 5) }
  },
  originalData: { task: 5 },
  learningPathData: { task: 4 },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    if ([4, 5].includes(data.task)) {
      const config =
        data.task === 4
          ? {
              imageHref: '/content/NRW_EESA/133_Reis.PNG',
              imageWidth: 328,
              imageHeight: 220,
              columns: 4,
              rows: 3,
              strokeColor: 'white',
              taskName: 'Reiskörner',
            }
          : {
              imageHref: '/content/NRW_EESA/114_Schätzen.png',
              imageWidth: 328,
              imageHeight: 310,
              columns: 4,
              rows: 4,
              strokeColor: 'black',
              taskName: 'Pinnwand-Nadeln',
            }
      return <ToggleableGrid {...config} />
    }

    return (
      <>
        <p>
          Schätze die Anzahl der {data.task === 1 && 'Röhrchen'}
          {data.task === 2 && 'Holzscheite'}
          {data.task === 3 && 'Bücher'}. Notiere deinen Lösungsweg.
        </p>
        {data.task === 1 &&
          getImageAndDescription('/content/NRW_MSA/NRW_MSA_Schätzen_1.jpg', '')}
        {data.task === 2 &&
          getImageAndDescription('/content/NRW_MSA/NRW_MSA_Schätzen_2.jpg', '')}
        {data.task === 3 &&
          getImageAndDescription('/content/NRW_MSA/NRW_MSA_Schätzen_3.jpg', '')}
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        {data.task === 1 && (
          <>
            <svg viewBox="0 0 328 170">
              <image
                href="/content/NRW_EESA/114_schaetzen_roehrchen_loesung.svg"
                width="328"
              />
            </svg>
            <p>
              Schätze zuerst die Anzahl der Röhrchen in{' '}
              <Color3>einem der 3 Kästen</Color3>.<br></br>
              <br></br>In der oberen Reihe im linken Kasten befinden sich{' '}
              <Color1>7 Röhrchen</Color1>.<br></br>An der linken Seite befinden
              sich <Color2>14 Röhrchen</Color2> übereinander.
              <br></br>
              <br></br>
              Damit sind im ersten Kasten etwa:<br></br> <Color1>7</Color1> ·{' '}
              <Color2>14 Röhrchen</Color2> = <b>98</b> Röhrchen.
              <br></br>
              <br></br> Im ganzen Insektenhotel sind damit ungefähr<br></br>{' '}
              <b>
                98 · <Color3>3</Color3> = 294 Röhrchen
              </b>
            </p>
            <p>
              Im letzten Schritt runden wir die Lösung, da wir bei einer
              Schätzung keine genauen Zahlen haben: <b>294 ≈ 290</b>
            </p>
            <p>
              Damit sind insgesamt etwa <b>290 Röhrchen</b> auf dem Bild.
            </p>
            <p>
              <b>Achtung:</b> Wenn du einen anderen Rechenweg genommen hast,
              kann es sein, dass dein Ergebnis ein bisschen abweicht. Du
              solltest aber auf eine Zahl <b>zwischen 280 und 330</b> kommen.
            </p>
          </>
        )}
        {data.task === 2 && (
          <>
            <svg viewBox="0 0 328 220">
              <image
                href="/content/NRW_EESA/114_schaetzen_holzscheite_loesung.svg"
                width="328"
              />
            </svg>
            <p>
              Bestimme die Anzahl der Holzscheite in der{' '}
              <Color1>untersten Reihe</Color1> und am{' '}
              <Color2>linken Rand</Color2>:<br></br>
              <br></br>In der <Color1>untersten Reihe</Color1> befinden sich
              etwa <Color1>18 Holzscheite</Color1>.<br></br>Am{' '}
              <Color2>linken Rand</Color2> befinden sich etwa{' '}
              <Color2>14 Holzscheite</Color2>.<br></br>
              <br></br>Hochgerechnet auf den ganzen Stapel ergeben sich etwa{' '}
              <br></br>
              <Color1>18</Color1> · <Color2>14</Color2> = <b>252 Holzscheite</b>
              .
            </p>
            <p>
              Wir runden die Lösung, da wir bei einer Schätzung keine genauen
              Zahlen haben: <b>252 ≈ 250</b>
            </p>
            <p>
              Damit sind insgesamt etwa <b>250 Holzscheite</b> auf dem Bild.
            </p>
            <p>
              <b>Achtung:</b> Wenn du einen anderen Rechenweg genommen hast,
              kann es sein, dass dein Ergebnis abweicht. Du solltest aber auf
              eine Zahl <b>zwischen 200 und 310</b> kommen.
            </p>
          </>
        )}
        {data.task === 3 && (
          <>
            <p>
              Das Bild zeigt insgesamt <Color1>10 Fächer</Color1> mit etwa
              gleich vielen Büchern pro Fach.<br></br>
              Zähle die Anzahl der <Color2>Bücher in einem Fach</Color2>.
              <br></br>
              In rechten, unteren Fach befinden sich zum Beispiel{' '}
              <Color2>24 Bücher</Color2>.<br></br>
              <br></br> Rechne damit die Gesamtzahl der Bücher hoch:{' '}
              <Color2>24</Color2> · <Color1>10</Color1> = <b>240 Bücher</b>.
            </p>
            <p>
              <b>Achtung:</b> Wenn du einen anderen Rechenweg genommen hast,
              kann es sein, dass dein Ergebnis abweicht. Du solltest aber auf
              eine Zahl <b>zwischen 210 und 270</b> kommen.
            </p>
          </>
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
              Oben ist das Bild zum Beispiel in <Color1>12 Bereiche</Color1>{' '}
              aufgeteilt.
            </p>
            <p>
              Zähle die Reiskörner in einem der 12 Bereiche: Im Bereich oben
              rechts befinden sich zum Beispiel etwa{' '}
              <Color2>31 Reiskörner</Color2>.
            </p>
            <p>
              Damit kannst du schätzen:{' '}
              <b>
                <Color2>31</Color2> · <Color1>12</Color1> = 372
              </b>
            </p>
            <p>
              Im letzten Schritt runden wir die Lösung, da wir bei einer
              Schätzung keine genauen Zahlen haben: <b>372 ≈ 370</b>
            </p>
            <p>
              Damit sind insgesamt etwa <b>370 Reiskörner</b> auf dem Bild.
            </p>
            <p>
              <b>Achtung:</b> Wenn du einen anderen Rechenweg genommen hast,
              kann es sein, dass dein Ergebnis ein bisschen abweicht. Du
              solltest aber auf eine Zahl <b>zwischen 340 und 400</b> kommen.
            </p>
          </>
        )}
        {data.task === 5 && (
          <>
            <svg viewBox="0 0 328 310">
              <image
                href="/content/NRW_EESA/114_Schätzen.png"
                height="310"
                width="328"
              />
              <rect
                x="10"
                y="10"
                width="300"
                height="280"
                stroke="black"
                fill="transparent"
                strokeWidth="2"
              />
              <line
                x2={300 / 4 + 10}
                y1={10}
                x1={300 / 4 + 10}
                y2={290}
                stroke="black"
                strokeWidth={2}
              />

              <line
                x2={(2 * 300) / 4 + 10}
                y1={10}
                x1={(2 * 300) / 4 + 10}
                y2={290}
                stroke="black"
                strokeWidth={2}
              />
              <line
                x2={(3 * 300) / 4 + 10}
                y1={10}
                x1={(3 * 300) / 4 + 10}
                y2={290}
                stroke="black"
                strokeWidth={2}
              />

              <line
                x2={10}
                y1={280 / 4 + 10}
                x1={310}
                y2={280 / 4 + 10}
                stroke="black"
                strokeWidth={2}
              />
              <line
                x2={10}
                y1={(2 * 280) / 4 + 10}
                x1={310}
                y2={(2 * 280) / 4 + 10}
                stroke="black"
                strokeWidth={2}
              />
              <line
                x2={10}
                y1={(3 * 280) / 4 + 10}
                x1={310}
                y2={(3 * 280) / 4 + 10}
                stroke="black"
                strokeWidth={2}
              />
            </svg>
            <p>
              Teile das Bild auf, in ein Raster mit gleich großen Bereichen.
              Oben ist das Bild zum Beispiel in <Color1>16 Bereiche</Color1>{' '}
              aufgeteilt.
            </p>
            <p>
              Zähle die Reiskörner in einem der 16 Bereiche: Im Bereich unten
              rechts befinden sich zum Beispiel etwa <Color2>11 Nadeln</Color2>.
            </p>
            <p>
              Damit kannst du schätzen:{' '}
              <b>
                <Color2>11</Color2> · <Color1>16</Color1> = 176
              </b>
            </p>
            <p>
              Im letzten Schritt runden wir die Lösung, da wir bei einer
              Schätzung keine genauen Zahlen haben: <b>176 ≈ 180</b>
            </p>
            <p>
              Damit sind insgesamt etwa <b>180 Nadeln</b> auf dem Bild.
            </p>
            <p>
              <b>Achtung:</b> Wenn du einen anderen Rechenweg genommen hast,
              kann es sein, dass dein Ergebnis ein bisschen abweicht. Du
              solltest aber auf eine Zahl <b>zwischen 150 und 230</b> kommen.
            </p>
          </>
        )}
      </>
    )
  },
}
