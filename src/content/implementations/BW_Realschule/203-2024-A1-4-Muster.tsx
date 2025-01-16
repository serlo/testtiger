import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  szenario: number
  muster: number
  order: number[]
}

export const exercise203: Exercise<DATA> = {
  title: 'Muster',
  source: '2024 Pflichtteil A1 Aufgabe 4',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    return {
      szenario: rng.randomIntBetween(1, 4),
      muster: rng.randomIntBetween(4, 7),
      order: rng.shuffleArray([0, 1, 2, 3]),
    }
  },
  originalData: { szenario: 1, muster: 6, order: [0, 1, 2, 3] },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>Luana hat die ersten drei Muster aus Kärtchen gelegt.</p>
        {data.szenario == 1 && (
          <svg viewBox="0 0 328 140">
            <image
              href="/content/BW_Realschule/203_Muster1.jpg"
              height="140"
              width="328"
            />
          </svg>
        )}
        {data.szenario == 2 && (
          <svg viewBox="0 0 328 140">
            <image
              href="/content/BW_Realschule/203_Muster2.jpg"
              height="140"
              width="328"
            />
          </svg>
        )}
        {data.szenario == 3 && (
          <svg viewBox="0 0 328 140">
            <image
              href="/content/BW_Realschule/203_Muster3.jpg"
              height="140"
              width="328"
            />
          </svg>
        )}
        {data.szenario == 4 && (
          <svg viewBox="0 0 328 140">
            <image
              href="/content/BW_Realschule/203_Muster4.jpg"
              height="140"
              width="328"
            />
          </svg>
        )}
      </>
    )
  },
  tasks: [
    {
      duration: 1,

      points: 1,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              a) Wie viele Kärtchen benötigt Luana für das {data.muster}.
              Muster?
              <br></br>Begründe deine Antwort.{' '}
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              {data.szenario == 1 && (
                <>
                  In den Figuren kommen in jedem Schritt 4 Kärtchen dazu.{' '}
                  <br></br>
                  <br></br>Damit sind es in Figur {data.muster} insgesamt{' '}
                  <strong>{8 + 4 * (data.muster - 1)} Kärtchen</strong>.
                </>
              )}
              {data.szenario == 2 && (
                <>
                  Von Figur 1 zu Figur 2 kommen 7 Kärtchen dazu und von Figur 2
                  zu Figur 3 kommen 9 Kärtchen dazu. Die Kärtchen werden also
                  immer in ungeraden Zahlen mehr. <br></br>
                  <br></br>Figur {data.muster} besitzt dann insgesamt 25 +
                  <strong>{4 * (data.muster + 1)} Kärtchen</strong>.
                </>
              )}
              {data.szenario == 3 && (
                <>
                  Von Figur 1 zu Figur 2 kommen 6 Kärtchen, von Figur 2 zu Figur
                  3 kommen 8 Kärtchen dazu. <br></br>
                  <br></br>Die Kärtchen werden immer in geraden Zahlen mehr.
                  Figur {data.muster} besitzt dann insgesamt{' '}
                  <strong>
                    {(data.muster + 2) * (data.muster + 1)} Kärtchen
                  </strong>
                  .
                </>
              )}
              {data.szenario == 4 && (
                <>
                  In den Figuren kommen in jedem Schritt 4 Kärtchen dazu. Von
                  Figur 1 zu Figur {data.muster} müssen wir also{' '}
                  {data.muster - 1} · 4 = {(data.muster - 1) * 4} Kärtchen
                  dazurechnen.
                  <br></br>
                  <br></br>Damit sind es in Figur {data.muster} insgesamt{' '}
                  <br></br> 6 + {(data.muster - 1) * 4} ={' '}
                  <strong>{6 + 4 * (data.muster - 1)} Kärtchen</strong>.
                </>
              )}
            </p>
          </>
        )
      },
    },
    {
      duration: 2,
      points: 1,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const richtig_1 = [<>4n + 4</>, <>(n + 2)² − n²</>]
        const richtig_2 = [<>n²</>, <>(n + 1)² − 2n − 1</>]
        const richtig_3 = [<>(n + 1)(n + 2)</>, <>n² + 3n + 2</>]
        const richtig_4 = [<>6 + 4(n − 1)</>, <>4n + 2</>]
        const falsch_1 = [<>2n + 4</>, <>4n + 2</>]
        const falsch_2 = [<>9n</>, <>(n + 1)(n − 1)</>]
        const falsch_3 = [<>n(n + 1)</>, <>6 + 6n</>]
        const falsch_4 = [<>6n</>, <>6n − 6</>]
        const listItems1 = [
          <li key="1">{richtig_1[0]}</li>,
          <li key="2">{richtig_1[1]}</li>,
          <li key="3">{falsch_1[0]}</li>,
          <li key="4">{falsch_1[1]}</li>,
        ]
        const shuffledItems1 = data.order.map(i => listItems1[i])
        const listItems2 = [
          <li key="1">{richtig_2[0]}</li>,
          <li key="2">{richtig_2[1]}</li>,
          <li key="3">{falsch_2[0]}</li>,
          <li key="4">{falsch_2[1]}</li>,
        ]
        const shuffledItems2 = data.order.map(i => listItems2[i])
        const listItems3 = [
          <li key="1">{richtig_3[0]}</li>,
          <li key="2">{richtig_3[1]}</li>,
          <li key="3">{falsch_3[0]}</li>,
          <li key="4">{falsch_3[1]}</li>,
        ]
        const shuffledItems3 = data.order.map(i => listItems3[i])
        const listItems4 = [
          <li key="1">{richtig_4[0]}</li>,
          <li key="2">{richtig_4[1]}</li>,
          <li key="3">{falsch_4[0]}</li>,
          <li key="4">{falsch_4[1]}</li>,
        ]
        const shuffledItems4 = data.order.map(i => listItems4[i])
        return (
          <>
            <p>
              Luana möchte die Anzahl der Kärtchen bei jedem Muster berechnen.
              Sie hat vier Formeln zur Auswahl.<br></br>
              <br></br>
              Welche beiden Formeln sollte sie auswählen? Entscheide jeweils.{' '}
            </p>
            {data.szenario == 1 && <ul>{shuffledItems1}</ul>}
            {data.szenario == 2 && <ul>{shuffledItems2}</ul>}
            {data.szenario == 3 && <ul>{shuffledItems3}</ul>}
            {data.szenario == 4 && <ul>{shuffledItems4}</ul>}
            <p>n gibt die Stelle des jeweiligen Musters an</p>
            <p>s ist die Summe der Kärtchen eines Musters</p>
          </>
        )
      },
      solution({ data }) {
        const richtig_1 = [<>4n + 4</>, <>(n + 2)² − n²</>]
        const richtig_2 = [<>n²</>, <>(n + 1)² − 2n − 1</>]
        const richtig_3 = [<>(n + 1)(n + 2)</>, <>n² + 3n + 2</>]
        const richtig_4 = [<>6 + 4(n − 1)</>, <>4n + 2</>]
        const falsch_1 = [<>2n + 4</>, <>4n + 2</>]
        const falsch_2 = [<>9n</>, <>(n + 1)(n − 1)</>]
        const falsch_3 = [<>n(n + 1)</>, <>6 + 6n</>]
        const falsch_4 = [<>6n</>, <>6n − 6</>]
        return (
          <>
            <p>
              {data.szenario == 1 && (
                <>
                  Die Formeln {richtig_1[0]} und {richtig_1[1]} beschreiben die
                  Anzahl der Kärtchen korrekt.
                </>
              )}
              {data.szenario == 2 && (
                <>
                  Die Formeln {richtig_2[0]} und {richtig_2[1]} beschreiben die
                  Anzahl der Kärtchen korrekt.
                </>
              )}
              {data.szenario == 3 && (
                <>
                  Die Formeln {richtig_3[0]} und {richtig_3[1]} beschreiben die
                  Anzahl der Kärtchen korrekt.
                </>
              )}
              {data.szenario == 4 && (
                <>
                  Die Formeln {richtig_4[0]} und {richtig_4[1]} beschreiben die
                  Anzahl der Kärtchen korrekt.
                </>
              )}{' '}
            </p>
          </>
        )
      },
    },
  ],
}
