import { Exercise } from '@/data/types'
import { Color1, Color2, Color3 } from '@/helper/colors'
import { getImageAndDescription } from '@/helper/get-image-and-description'

interface DATA {
  task: number
}

export const exercise133: Exercise<DATA> = {
  title: 'Schätzen',
  source: '2024 Teil 1 Aufgabe 5',
  useCalculator: false,
  duration: 6,
  points: 3,
  generator(rng) {
    const task = rng.randomIntBetween(1, 4)
    return { task }
  },
  originalData: { task: 4 },
  learningPathData: { task: 3 },
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
                98 · <Color3>3</Color3> = 294 [Röhrchen]
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
              <Color1>18</Color1> · <Color2>14</Color2> ={' '}
              <b>252 [Holzscheite]</b>.
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
              <Color2>24</Color2> · <Color1>10</Color1> = <b>240 [Bücher]</b>.
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
                <Color2>31</Color2> · <Color1>12</Color1> = 372 [Reiskörner]
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
      </>
    )
  },
}
