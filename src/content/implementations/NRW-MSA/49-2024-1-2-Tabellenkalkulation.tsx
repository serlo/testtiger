import { Exercise } from '@/data/types'

interface DATA {
  case: number
  case_2: number
}

export const exercise49: Exercise<DATA> = {
  title: 'Tabellenkalkulation',
  source: '2024 Teil 1 Aufgabe 2',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      case: rng.randomIntBetween(1, 5),
      case_2: rng.randomIntBetween(1, 5),
    }
  },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return <></>
  },
  tasks: [
    {
      points: 1,
      task({ data }) {
        return (
          <>
            <p>
              Eine Schülerfirma führt eine Tabellenkalkulation über ihre
              Verkaufsaktion zum Valentinstag (Abbildung 1).
            </p>
            <svg viewBox="0 0 328 70">
              <image
                href="/content/NRW_MSA_Tabellenkalkulation24.PNG"
                height="70"
                width="328"
              />
            </svg>
            <p>Abbildung 1: Tabellenkalkulation über die Verkaufsaktion</p>
            <p>
              a) Gib eine Formel an, mit der der Wert in Zelle{' '}
              {data.case == 1 && 'F2'}
              {data.case == 2 && 'F3'}
              {data.case == 3 && 'F4'}
              {data.case == 4 && 'E2'}
              {data.case == 5 && 'E3'} berechnet werden kann.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            {data.case == 1 && (
              <>
                <p>
                  F2 bezeichnet den Gesamtgewinn durch die Blumen. Dieser
                  berechnet sich durch die Stückzahl, multipliziert mit dem
                  Gewinn pro Stück, also {'"'}= B2 * E2{'"'}.
                </p>
              </>
            )}
            {data.case == 2 && (
              <>
                <p>
                  F3 bezeichnet den Gesamtgewinn durch die Schokoladenherzen.
                  Dieser berechnet sich durch die Stückzahl, multipliziert mit
                  dem Gewinn pro Stück, also {'"'}= B3 * E3{'"'}.
                </p>
              </>
            )}
            {data.case == 3 && (
              <>
                <p>
                  F4 bezeichnet den Gesamtgewinn durch die Verkaufsaktion.
                  Dieser berechnet sich aus den einzelnen Gewinne, also {'"'}=
                  F2 + F3{'"'}.
                </p>
              </>
            )}
            {data.case == 4 && (
              <>
                <p>
                  E2 bezeichnet den Gewinn pro Stück, also dem Verkaufspreis
                  abzüglich dem Einkaufspreis. Die Formel lautet: {'"'}= C2 - D2
                  {'"'}
                </p>
              </>
            )}
            {data.case == 5 && (
              <>
                <p>
                  E3 bezeichnet den Gewinn pro Stück, also dem Verkaufspreis
                  abzüglich dem Einkaufspreis. Die Formel lautet: {'"'}= C3 - D3
                  {'"'}
                </p>
              </>
            )}
          </>
        )
      },
    },
    {
      points: 1,
      task({ data }) {
        return (
          <>
            <p>
              b){' '}
              {data.case_2 == 1 && (
                <>
                  Die Schülerfirma erhält zusätzlich einen Rabatt auf den
                  Einkaufspreis der Schokoladenherzen.
                </>
              )}
              {data.case_2 == 2 && (
                <>
                  Die Schülerfirma erhält zusätzlich einen Rabatt auf den
                  Einkaufspreis der Blumen.
                </>
              )}
              {data.case_2 == 3 && (
                <>Der Verkaufspreis der Blumen wird höher.</>
              )}
              {data.case_2 == 4 && (
                <>Der Verkaufspreis der Schokoladenherzen wird höher.</>
              )}
              {data.case_2 == 5 && (
                <>
                  Von den Blumen werden beim nächsten Verkaufstag mehr verkauft.
                </>
              )}{' '}
              Gib an, welche Zellen sich dadurch verändern.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            {data.case_2 == 1 && (
              <>
                Ändert sich der Einkaufspreis der Schokoladenherzen, ändern sich
                Gewinn pro Stück (E3), der Gesamtgewinn durch die Herzen (F3)
                und somit auch der Gesamtgewinn der Verkaufsaktion (F4).
              </>
            )}
            {data.case_2 == 2 && (
              <>
                Ändert sich der Einkaufspreis der Blumen, ändern sich Gewinn pro
                Stück (E2), der Gesamtgewinn durch die Blumen (F2) und somit
                auch der Gesamtgewinn der Verkaufsaktion (F4).
              </>
            )}
            {data.case_2 == 3 && (
              <>
                Ändert sich der Verkaufspreis der Blumen, verändert sich der
                Gewinn pro Blume (E2), der Gesamtgewinn der Blumen (F2) und auch
                der Gesamtgewinn der Verkaufsaktion (F4).
              </>
            )}
            {data.case_2 == 4 && (
              <>
                Ändert sich der Verkaufspreis der Schokoladenherzen, verändert
                sich der Gewinn pro Herz (E2), der Gesamtgewinn der Herzen (F2)
                und auch der Gesamtgewinn der Verkaufsaktion (F4).
              </>
            )}
            {data.case_2 == 5 && (
              <>
                Werden mehr Blumen verkauft, steigt der Gesamtgewinn durch die
                Blumen (F2) und damit auch der Gesamtgewinn der Verkaufsaktion
                (F4).
              </>
            )}
          </>
        )
      },
    },
  ],
}