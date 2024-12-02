import { Exercise } from '@/data/types'

interface DATA {}

export const exercise228: Exercise<DATA> = {
  title: 'Kreisel',
  source: '2023 Pflichtteil A2 - Aufgabe 5',
  useCalculator: true,
  duration: 42,
  points: 3,
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
          Auf zwei Kreiseln befinden sich die Zahlen 1,2 und 3.<br></br>
          Die Felder eines Kreisels sind jeweils gleich groß.<br></br>
          Sie sind grau bzw. weiß gefärbt.<br></br>
          Die beiden Kreisel werden gedreht und bleiben auf einer Kante liegen.
        </p>
        <p>Berechne die Wahrscheinlichkeit für folgende Ereignisse: </p>
        <ul>
          <li>zwei gleiche Zahlen</li>
          <li>Kreis und Dreieck</li>
          <li>höchstens ein graues Feld</li>
        </ul>
        <svg viewBox="0 0 328 120">
          <image
            href="/content/BW_Realschule/228_Kreisel.jpg"
            height="120"
            width="328"
          />
        </svg>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
