import { Exercise } from '@/data/types'
import { Color5 } from '@/helper/colors'

interface DATA {}

export const exercise107: Exercise<DATA> = {
  title: 'Roller-Tour',
  source: '2021 Teil 2 Aufgabe 1',
  useCalculator: true,
  duration: 30,
  generator(rng) {
    return {}
  },
  originalData: {},
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Melike und Robin planen eine Tour mit einem Motorroller. Sie wollen
          eine Woche unterwegs sein. Am ersten Tag wollen sie von Fröndenberg zu
          einem Campingplatz am Möhnesee fahren (Abbildung 1).
        </p>
        <svg viewBox="0 0 328 130">
          <image
            href="/content/NRW_EESA/107_Roller-Tour.PNG"
            height="130"
            width="328"
          />
        </svg>
        <center>
          <Color5>
            <span style={{ fontSize: 'small' }}>
              Abbildung 1: geplante Strecke von Fröndenberg zum Campingplatz am
              Möhnesee
            </span>
          </Color5>
        </center>
      </>
    )
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return <></>
      },
      task({ data }) {
        return (
          <>
            <p>
              a) Die Strecke ist ungefähr 30 km lang. Bestätige dies durch
              Messen und mithilfe des Maßstabs.
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      points: 42,
      intro({ data }) {
        return <></>
      },
      task({ data }) {
        return (
          <>
            <p>
              b) Melike und Robin gehen von einer durchschnittlichen
              Geschwindigkeit von 24 hkm​ aus. Berechne für die 30 km lange
              Strecke die Fahrzeit in Minuten. Notiere deinen Lösungsweg.
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      points: 42,
      intro({ data }) {
        return (
          <>
            <p>
              Für die Tour wollen Melike und Robin einen Motorroller für eine
              Woche mieten. Robin findet zwei Angebote (Abbildung 2).
            </p>
            <svg viewBox="0 0 328 110">
              <image
                href="/content/NRW_EESA/107_Roller-Tour4.PNG"
                height="110"
                width="328"
              />
            </svg>
            <svg viewBox="0 0 328 110">
              <image
                href="/content/NRW_EESA/107_Roller-Tour5.PNG"
                height="110"
                width="328"
              />
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 2: Angebote der Rollervermietungen {'"'}Easy Rent
                  {'"'} und {'"'}Rollerverleih24{'"'}
                </span>
              </Color5>
            </center>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              c) Die Kosten bei {'"'}Easy Rent{'"'} können mit dem Term 0,2 ⋅ x
              + 80 berechnet werden
            </p>
            <p>
              Gib die Bedeutung von x, von 0,2 und von 80 im Zusammenhang mit
              den Kosten an.
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      points: 42,
      intro({ data }) {
        return (
          <>
            <p>
              Melike und Robin wollen die Angebote miteinander vergleichen und
              erstellen dazu eine Grafik (Abbildung 3).
            </p>
            <svg viewBox="0 0 328 220">
              <image
                href="/content/NRW_EESA/107_Roller-Tour3.PNG"
                height="220"
                width="328"
              />
            </svg>
            <center>
              <Color5>
                <span style={{ fontSize: 'small' }}>
                  Abbildung 3: Vergleich der Angebote von {'"'}Easy Rent
                  {'"'} und {'"'}Rollerverleih24{'"'}
                </span>
              </Color5>
            </center>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              d) Erkläre, warum der Graph zum Angebot von {'"'}Rollerverleih24
              {'"'} im ersten Abschnitt waagerecht verläuft.
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      points: 42,
      intro({ data }) {
        return <></>
      },
      task({ data }) {
        return (
          <>
            <p>
              e) Die beiden Graphen schneiden sich. Gib die Koordinaten der
              beiden Schnittpunkte an.
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      points: 42,
      intro({ data }) {
        return <></>
      },
      task({ data }) {
        return (
          <>
            <p>
              f) Insgesamt wollen Melike und Robin ungefähr 170 km weit fahren.
              Welches Angebot ist günstiger? Gib die Kosten für das günstigere
              Angebot an.
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
