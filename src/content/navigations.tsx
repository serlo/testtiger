import { Navigation } from '@/data/types'

export const navigationData: { [key: number]: Navigation } = {
  1: {
    topics: [
      {
        title: 'Grundlagen - Zahlen und Größen',
        headerColor: 'primary',
        twColor: 'bg-blue-300',
        exercises: [201, 205, 214, 216, 220, 210],
      },
      {
        title: 'Terme und Gleichungen',
        headerColor: 'danger',
        twColor: 'bg-red-500',
        exercises: [203, 212, 213, 227, 235],
      },
      {
        title: 'Körper und Figuren',
        headerColor: 'warning',
        twColor: 'bg-yellow-400',
        exercises: [202, 206, 207, 211, 218, 219],
      },
      {
        title: 'Funktionen und Graphen',
        headerColor: 'success',
        twColor: 'bg-green-600',
        exercises: [204, 217, 223],
      },
      {
        title: 'Zufall und Daten',
        headerColor: 'tertiary',
        twColor: 'bg-purple-600',
        exercises: [215],
      },
      {
        title: 'Digitale Werkzeuge',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        exercises: [224, 234],
      },
    ],
  },
}
