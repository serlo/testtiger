import { Navigation } from '@/data/types'

export const navigationData: { [key: number]: Navigation } = {
  1: {
    topics: [
      {
        title: 'Grundlagen - Zahlen und Größen',
        headerColor: 'primary',
        twColor: 'bg-blue-300',
        exercises: [
          1, 5, 8, 14, 16, 20, 10, 21, 47, 22, 25, 26, 31, 32, 40, 48, 50, 51,
        ],
      },
      {
        title: 'Terme und Gleichungen',
        headerColor: 'danger',
        twColor: 'bg-red-500',
        exercises: [3, 9, 12, 13, 27, 35, 39, 43],
      },
      {
        title: 'Körper und Figuren',
        headerColor: 'warning',
        twColor: 'bg-yellow-400',
        exercises: [2, 6, 7, 11, 18, 19, 28, 36, 38, 46, 30, 36, 42, 52],
      },
      {
        title: 'Funktionen und Graphen',
        headerColor: 'success',
        twColor: 'bg-green-600',
        exercises: [4, 17, 23, 192, 29, 45, 33, 44],
      },
      {
        title: 'Zufall und Daten',
        headerColor: 'tertiary',
        twColor: 'bg-purple-600',
        exercises: [15, 41],
      },
      {
        title: 'Digitale Werkzeuge',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        exercises: [24, 34, 49],
      },
    ],
  },
}
