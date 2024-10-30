import { Exercise } from '@/data/types'
import { getImageAndDescription } from '@/helper/get-image-and-description'

interface DATA {
  task: number
}

export const exercise20: Exercise<DATA> = {
  title: 'Schätzaufgabe',
  source: '2021 Teil 1 Aufgabe 1',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    // Entfernen von Duplikaten passiert automatisch beim Generieren
    const task = rng.randomItemFromArray([1, 2, 3, 4, 5])
    return { task }
  },
  originalData: {
    task: 1,
  },
  constraint({ data }) {
    return true
  },
  points: 2,
  task({ data }) {
    return (
      <>
        {data.task === 1 &&
          getImageAndDescription(
            '/content/NRW_MSA/NRW_MSA_Schätzen_1.jpg',
            'Schätze: Wie viele Röhrchen sind von dem Insektenhotel zu sehen? Beschreibe, wie du vorgegangen bist.',
          )}
        {data.task === 2 &&
          getImageAndDescription(
            '/content/NRW_MSA/NRW_MSA_Schätzen_2.jpg',
            'Schätze: Wie viele Holzscheite sind auf dem Bild zu sehen? Beschreibe, wie du vorgegangen bist.',
          )}
        {data.task === 3 &&
          getImageAndDescription(
            '/content/NRW_MSA/NRW_MSA_Schätzen_3.jpg',
            'Schätze: Wie viele Bücher sind auf dem Bild zu sehen? Beschreibe, wie du vorgegangen bist.',
          )}
        {data.task === 4 &&
          getImageAndDescription(
            '/content/NRW_MSA/NRW_MSA_Schätzen_4.jpg',
            'Schätze: Wie viele Bananen sind auf dem Bild zu sehen? Beschreibe, wie du vorgegangen bist.',
          )}
        {data.task === 5 &&
          getImageAndDescription(
            '/content/NRW_MSA/NRW_MSA_Schätzen_5.jpg',
            'Schätze: Wie viele Beeren sind auf dem Bild zu sehen? Beschreibe, wie du vorgegangen bist.',
          )}
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
          <p>
            Bestimme die Anzahl der Bananenstauden in der obersten Reihe und in
            der ersten Spalte links:<br></br>
            <br></br>In der obersten Reihe befinden sich etwa 5 Stauden.
            <br></br>In der ersten Spalte links befinden sich auch etwa 5
            Stauden.
            <br></br> In jeder dieser Stauden sind etwa 9 Bananen sichtbar
            (geschätzter Wert).
            <br></br>
            <br></br> Damit sind insgesamt etwa 5 · 5 · 9 = <b>225 Bananen</b>{' '}
            sichtbar auf dem Bild.
          </p>
        )}
        {data.task === 5 && (
          <p>
            Auf dem Bild sind vier verschiedene Sorten von Beeren zu erkennen.
            <br></br>
            <br></br> Es gibt 9 Schalen mit jeweils etwa <br></br>
            <b>6 · 8 = 48 Blaubeeren</b>.<br></br> Es gibt 4 Schalen mit jeweils
            etwa<br></br> <b>6 · 6 = 36 orangen Himbeeren</b>.<br></br> Es gibt
            6 Schalen mit jeweils etwa <br></br>
            <b>5 · 5 = 25 roten Himbeeren</b>.<br></br> Es gibt 6 Schalen mit
            jeweils etwa <br></br>
            <b>4 · 4 = 16 Brombeeren</b>.<br></br>
            <br></br>Insgesamt erhältst du damit etwa <br></br>9 · 48 + 4 · 36 +
            5 · 25 + 4 · 16 = <b>{9 * 48 + 4 * 36 + 5 * 25 + 4 * 16} Beeren</b>.
          </p>
        )}
      </>
    )
  },
}
