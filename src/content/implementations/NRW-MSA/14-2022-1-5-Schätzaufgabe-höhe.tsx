import { Exercise } from '@/data/types'

interface DATA {
  task: number
}
let availableTasks = [1, 2, 3, 4, 5] // Initiales Array der Aufgaben

export const exercise14: Exercise<DATA> = {
  title: '2022 Variante 1 /5) Höhe schätzen',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    if (availableTasks.length === 0) {
      availableTasks = [1, 2, 3, 4, 5] // Fülle das Array wieder auf, wenn es leer ist
    }
    const task = rng.randomItemFromArray(availableTasks) // Generiere eine Zufallsaufgabe
    return { task }
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    const getImageAndDescription = (
      taskNumber: number,
      imageUrl: string,
      description: string,
    ) => (
      <>
        <svg viewBox="0 0 700 500">
          <image href={imageUrl} height="500" width="700" />
        </svg>
        <p>{description}</p>
      </>
    )

    return (
      <>
        {data.task === 1 &&
          getImageAndDescription(
            1,
            '/content/NRW_MSA_2022_v1_5_1.png',
            'Der „General Sherman Tree“ ist ein Riesenmammutbaum und steht im US-Bundesstaat Kalifornien. Bestimme näherungsweise den Durchmesser des Baumes in Schulterhöhen des Mannes. Beschreibe dein Vorgehen.',
          )}
        {data.task === 2 &&
          getImageAndDescription(
            2,
            '/content/NRW_MSA_2022_v1_5_2.jpg',
            'Bestimme näherungsweise die Höhe des Gebäudes bis zur Spitze in Höhen der Figur. Beschreibe dein Vorgehen.',
          )}
        {data.task === 3 &&
          getImageAndDescription(
            3,
            '/content/NRW_MSA_2022_v1_5_3.jpg',
            'Bestimme näherungsweise die Höhe der Kirche bis zur Spitze in Höhen der Frau mit der blauen Jacke. Beschreibe dein Vorgehen.',
          )}
        {data.task === 4 &&
          getImageAndDescription(
            4,
            '/content/NRW_MSA_2022_v1_5_4.PNG',
            'Bestimme näherungsweise die Höhe des Leuchtturms bis zur Spitze in Höhen des Mannes. Beschreibe dein Vorgehen.',
          )}
        {data.task === 5 &&
          getImageAndDescription(
            5,
            '/content/NRW_MSA_2022_v1_5_5.PNG',
            'Bestimme näherungsweise die Höhe des Baumes in Höhen der Frau. Beschreibe dein Vorgehen.',
          )}
      </>
    )
  },
  solution({ data }) {
    const getImageAndDescription = (
      taskNumber: number,
      imageUrl: string,
      description: string,
    ) => (
      <>
        <svg viewBox="0 0 700 500">
          <image href={imageUrl} height="500" width="700" />
        </svg>
        <p>{description}</p>
      </>
    )
    return (
      <>
        {data.task === 1 &&
          getImageAndDescription(
            1,
            '/content/NRW_MSA_2022_v1_5_1_sol.png',
            'Der Durchmesser beträgt etwa vier Schulterhöhen des Mannes. Das kann zum Beispiel bestimmt werden, indem mit dem Lineal grob die Maße verglichen werden.',
          )}
        {data.task === 2 &&
          getImageAndDescription(
            2,
            '/content/NRW_MSA_2022_v1_5_2_sol.PNG',
            'Die Höhe des Gebäudes entspricht etwa 6,5 mal die Höhe der Figur. Das kann zum Beispiel bestimmt werden, indem mit dem Lineal grob die Maße verglichen werden.',
          )}
        {data.task === 3 &&
          getImageAndDescription(
            3,
            '/content/NRW_MSA_2022_v1_5_3_sol.PNG',
            'Die Höhe der Kirche entspricht etwa 13 mal die Höhe der Frau. Das kann zum Beispiel bestimmt werden, indem mit dem Lineal grob die Maße verglichen werden.',
          )}
        {data.task === 4 &&
          getImageAndDescription(
            4,
            '/content/NRW_MSA_2022_v1_5_4_sol.PNG',
            'Die Höhe des Leuchtturms entspricht etwa 12 mal die Höhe des Mannes. Das kann zum Beispiel bestimmt werden, indem mit dem Lineal grob die Maße verglichen werden.',
          )}
        {data.task === 5 &&
          getImageAndDescription(
            5,
            '/content/NRW_MSA_2022_v1_5_5_sol.PNG',
            'Die Höhe des Baumes entspricht etwa 5,25 mal die Höhe der Frau. Das kann zum Beispiel bestimmt werden, indem mit dem Lineal grob die Maße verglichen werden.',
          )}
      </>
    )
  },
}
