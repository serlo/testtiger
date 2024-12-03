import { Exercise } from '@/data/types'

interface DATA {}

export const exercise246: Exercise<DATA> = {
  title: 'Paketdiagramm',
  source: '2022 Pflichtteil A2 - Aufgabe 6',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return {}
  },
  originalData: {},
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Die Paketzustellungen in Deutschland haben in den letzten Jahren
          zugenommen. Im Schaubild ist diese Entwicklung dargestellt.{' '}
        </p>
        <svg viewBox="0 0 328 160">
          <image
            href="/content/BW_Realschule/246_Diagramm.jpg"
            height="160"
            width="328"
          />
        </svg>
        <ul>
          <li>
            Um wie viel Prozent haben die Paketzustellungen von 2014 bis 2019
            insgesamt zugenommen?
          </li>
        </ul>
        <p>
          Der Dienstleister DHL hatte im Jahr 2019 einen Anteil von 57,0 % an
          den gesamten Zustellungen.{' '}
        </p>
        <ul>
          <li>Wie viele Pakete wurden von DHL im Jahr 2019 zugestellt?</li>
        </ul>
        <p>
          Im Jahr 2020 nahm die Anzahl der Paketzustellungen um 9,7 % zu. Im
          darauffolgenden Jahr 2021 stieg die Anzahl der Paketzustellungen um
          12,5 %.{' '}
        </p>
        <ul>
          <li>
            Trage die Werte für 2020 und 2021 in das oben abgebildete Diagramm
            ein.
          </li>
        </ul>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
