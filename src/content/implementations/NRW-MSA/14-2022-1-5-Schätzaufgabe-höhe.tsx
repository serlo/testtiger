import { Exercise } from '@/data/types'
import { getImageAndDescription } from '@/helper/get-image-and-description'
import { buildEquation } from '@/helper/math-builder'

interface DATA {
  task: number
}

export const exercise14: Exercise<DATA> = {
  title: 'Schätzen',
  source: '2022 Teil 1 Aufgabe 5',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    const task = rng.randomItemFromArray([1, 2, 3, 4, 5])
    return { task }
  },
  originalData: {
    task: 1,
  },
  constraint({ data }) {
    return true
  },
  points: 3,
  task({ data }) {
    return (
      <>
        {data.task === 1 &&
          getImageAndDescription(
            '/content/NRW_MSA_2022_v1_5_1.png',
            'Der „General Sherman Tree“ ist ein Riesenmammutbaum und steht im US-Bundesstaat Kalifornien. Bestimme näherungsweise den Durchmesser des Baumes. Beschreibe dein Vorgehen.',
          )}
        {data.task === 2 &&
          getImageAndDescription(
            '/content/NRW_MSA_2022_v1_5_2.jpg',
            'Bestimme näherungsweise die Höhe des Gebäudes bis zur Spitze. Beschreibe dein Vorgehen.',
          )}
        {data.task === 3 &&
          getImageAndDescription(
            '/content/NRW_MSA_2022_v1_5_3.jpg',
            'Bestimme näherungsweise die Höhe der Kirche bis zur Spitze. Beschreibe dein Vorgehen.',
          )}
        {data.task === 4 &&
          getImageAndDescription(
            '/content/NRW_MSA_2022_v1_5_4.PNG',
            'Bestimme näherungsweise die Höhe des Leuchtturms bis zur Spitze. Beschreibe dein Vorgehen.',
          )}
        {data.task === 5 &&
          getImageAndDescription(
            '/content/NRW_MSA_2022_v1_5_5.PNG',
            'Bestimme näherungsweise die Höhe des Baumes. Beschreibe dein Vorgehen.',
          )}
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        {data.task === 1 &&
          getImageAndDescription(
            '/content/NRW_MSA_2022_v1_5_1_sol.png',
            'Der Durchmesser beträgt etwa vier mal die Höhe des Mannes. Das kann zum Beispiel bestimmt werden, indem mit dem Lineal grob die Maße verglichen werden.',
          )}
        {data.task === 1 && (
          <>
            <p>
              Verwendet man 1,80 m als Höhe des Mannes, beträgt der Durchmesser
              des Baumes etwa:{' '}
            </p>
            <p>4 · 1,8 = 7,2 [m]</p>
          </>
        )}
        {data.task === 2 &&
          getImageAndDescription(
            '/content/NRW_MSA_2022_v1_5_2_sol.PNG',
            'Die Höhe des Gebäudes entspricht etwa 6,5 mal die Höhe der Figur. Das kann zum Beispiel bestimmt werden, indem mit dem Lineal grob die Maße verglichen werden.',
          )}
        {data.task === 2 && (
          <>
            <p>
              Verwendet man 1,80 m als Höhe des Mannes, beträgt die Höhe des
              Hauses etwa:{' '}
            </p>
            <p>6,5 · 1,8 = 11,7 [m]</p>
          </>
        )}
        {data.task === 3 &&
          getImageAndDescription(
            '/content/NRW_MSA_2022_v1_5_3_sol.PNG',
            'Die Höhe der Kirche entspricht etwa 13 mal die Höhe der Frau. Das kann zum Beispiel bestimmt werden, indem mit dem Lineal grob die Maße verglichen werden.',
          )}
        {data.task === 3 && (
          <>
            <p>
              Verwendet man 1,65 m als Höhe der Frau, beträgt die Höhe der
              Kirche etwa:{' '}
            </p>
            <p>13 · 1,65 = 21,45 [m]</p>
          </>
        )}
        {data.task === 3 && <></>}
        {data.task === 4 &&
          getImageAndDescription(
            '/content/NRW_MSA_2022_v1_5_4_sol.PNG',
            'Die Höhe des Leuchtturms entspricht etwa 12 mal die Höhe des Mannes. Das kann zum Beispiel bestimmt werden, indem mit dem Lineal grob die Maße verglichen werden.',
          )}
        {data.task === 4 && (
          <>
            <p>
              Verwendet man 1,80 m als Höhe des Mannes, beträgt die Höhe des
              Leuchtturms etwa:{' '}
            </p>
            <p>12 · 1,8 = 21,6 [m]</p>
          </>
        )}
        {data.task === 5 &&
          getImageAndDescription(
            '/content/NRW_MSA_2022_v1_5_5_sol.PNG',
            'Die Höhe des Baumes entspricht etwa 5,25 mal die Höhe der Frau. Das kann zum Beispiel bestimmt werden, indem mit dem Lineal grob die Maße verglichen werden.',
          )}
        {data.task === 5 && (
          <>
            <p>
              Verwendet man 1,65 m als Höhe der Frau, beträgt die Höhe des
              Baumes etwa:{' '}
            </p>
            <p>5,25 · 1,65 ≈ 8,66 [m]</p>
          </>
        )}
      </>
    )
  },
}
