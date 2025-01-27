'use client'
import { Exercise } from '@/data/types'
import { getImageAndDescription } from '@/helper/get-image-and-description'
import { useState } from 'react'

interface DATA {
  task: number
}

function GitterComponent() {
  const [showGitter, setShowGitter] = useState(false)
  return (
    <>
      <p> Schätze die Anzahl der Reiskörner. Notiere deinen Lösungsweg.</p>
      {showGitter ? (
        <svg viewBox="0 0 328 220" className="my-8">
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
      ) : (
        getImageAndDescription('/content/NRW_EESA/133_Reis.PNG', '')
      )}
      <div>
        <label className="cursor-pointer">
          <input
            type="checkbox"
            onChange={() => {
              setShowGitter(!showGitter)
            }}
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
    if (data.task == 4) return <GitterComponent />
    return (
      <>
        <p>
          Schätze die Anzahl der {data.task === 1 && 'Röhrchen'}
          {data.task === 2 && 'Holzscheite'}
          {data.task === 3 && 'Bücher'}
          {data.task === 4 && 'Reiskörner'}
          {data.task === 5 && 'Pinnwand-Nadeln'}. Notiere deinen Lösungsweg.
        </p>
        {data.task === 1 &&
          getImageAndDescription('/content/NRW_MSA/NRW_MSA_Schätzen_1.jpg', '')}
        {data.task === 2 &&
          getImageAndDescription('/content/NRW_MSA/NRW_MSA_Schätzen_2.jpg', '')}
        {data.task === 3 &&
          getImageAndDescription('/content/NRW_MSA/NRW_MSA_Schätzen_3.jpg', '')}
        {data.task === 4 &&
          getImageAndDescription('/content/NRW_EESA/133_Reis.PNG', '')}
        {data.task === 5 &&
          getImageAndDescription('/content/NRW_EESA/114_Schätzen.png', '')}
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
            </p>
            <p>
              Zähle die Reiskörner in einem der Bereiche: Im oberen rechten
              Bereich befinden sich zum Beispiel etwa 31 Reiskörner.
            </p>
            <p>
              Das Bild ist in 12 Bereiche eingeteilt. Multipliziere die Anzahl
              der Reiskörner mit 31 Reiskörnern: 31 · 12 = 372
            </p>
            <p>
              Im letzten Schritt runden wir die Lösung, da wir bei einer
              Schätzung keine genauen Zahlen haben: 372 ≈ 370
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
              <br></br>
              <br></br>Im oberen linken Bereich befinden sich 10 Nadeln.
              <br></br>
              <br></br> Damit sind insgesamt etwa 16 · 10 = <b>160 Nadeln</b>{' '}
              auf dem Bild.
            </p>
          </>
        )}
      </>
    )
  },
}
