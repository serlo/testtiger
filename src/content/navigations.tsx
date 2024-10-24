import { Navigation } from '@/data/types'

export const navigationData: { [key: number]: Navigation } = {
  1: {
    topics: [
      {
        title: 'Grundlagen - Zahlen und Größen',
        headerColor: 'primary',
        twColor: 'bg-blue-300',
        /*exercises: [
          1, 5, 8, 14, 16, 20, 10, 21, 47, 22, 25, 26, 31, 32, 40, 48, 50, 51,
        ],*/
        skillGroups: [
          {
            name: 'Zahlen und Einheiten',
            skillExercises: [
              { id: 40, pages: [{ index: 'a' }] },
              { id: 40, pages: [{ index: 'b' }] },
              { id: 31 },
              { id: 25 },
              { id: 1, pages: [{ index: 'a' }] },
              { id: 1, pages: [{ index: 'b' }] },
              { id: 48 },
              { id: 21 },
              { id: 16 },
              { id: 32, pages: [{ index: 'c', intro: ['global'] }] },
              { id: 50 },
              { id: 10 },
            ],
          },
          {
            name: 'Proportionalität',
            skillExercises: [
              {
                id: 45,
                pages: [{ index: 'a', intro: ['global'] }],
              },
              {
                id: 45,
                pages: [{ index: 'b', intro: ['skill'] }],
              },
              {
                id: 18,
                pages: [{ index: 'b' }],
              },
              {
                id: 36,
                pages: [{ index: 'b', intro: ['skill'] }],
              },
              {
                id: 7,
                pages: [{ index: 'c', intro: ['skill'] }],
              },
            ],
          },
          {
            name: 'Schätzen und Überschlagen',
            skillExercises: [
              { id: 20 },
              { id: 14 },
              {
                id: 36,
                pages: [{ index: 'c', intro: ['skill'] }],
              },
            ],
          },
          {
            name: 'Prozentrechnung',
            skillExercises: [
              {
                id: 15,
                pages: [{ index: 'b', intro: ['global'] }],
              },
              { id: 5 },
              {
                id: 46,
                pages: [{ index: 'a', intro: ['global'] }],
              },
              {
                id: 18,
                pages: [{ index: 'g', intro: ['skill'] }],
              },
              {
                id: 53,
                pages: [{ index: 'a', intro: ['global'] }],
              },
              {
                id: 54,
                pages: [{ index: 'c', intro: ['skill'] }],
              },
            ],
          },
        ],
      },
      {
        title: 'Terme und Gleichungen',
        headerColor: 'danger',
        twColor: 'bg-red-500',
        /*exercises: [3, 9, 12, 13, 27, 35, 39, 43],*/
        skillGroups: [
          {
            name: 'Umgang mit Formeln und Termen',
            skillExercises: [
              {
                id: 39,
                pages: [{ index: 'b', intro: ['global'] }],
              },
              {
                id: 37,
                pages: [{ index: 'e', intro: ['skill'] }],
              },
              {
                id: 9,
                pages: [
                  { index: 'c', intro: ['global'] },
                  { index: 'd', intro: [] },
                ],
              },
              {
                id: 54,
                pages: [{ index: 'c', intro: ['skill'] }],
              },
            ],
          },
          {
            name: 'lineare Gleichungssysteme',
            skillExercises: [
              { id: 43 },
              { id: 35 },
              {
                id: 27,
                pages: [{ index: 'a' }],
              },
              { id: 12 },
              { id: 3 },
            ],
          },
          {
            name: 'Quadratische Gleichungen',
            skillExercises: [
              {
                id: 52,
                pages: [{ index: 'b' }],
              },
              {
                id: 37,
                pages: [{ index: 'g', intro: ['skill'] }],
              },
              {
                id: 9,
                pages: [{ index: 'e', intro: ['global', 'skill'] }],
              },
            ],
          },
          { name: 'Termumformungen', skillExercises: [] },
          { name: 'Muster erkennen und anwenden', skillExercises: [] },
          { name: 'Exponentialgleichungen', skillExercises: [] },
        ],
      },
      {
        title: 'Körper und Figuren',
        headerColor: 'warning',
        twColor: 'bg-yellow-400',
        /*exercises: [
          2, 6, 7, 11, 18, 19, 28, 36, 38, 46, 30, 36, 42, 52, 55, 54,
        ],*/
        skillGroups: [
          { name: 'Oberfläche und Volumen - Grundlage', skillExercises: [] },

          { name: 'Geometrische Sätze', skillExercises: [] },
          { name: 'Länge von Strecken', skillExercises: [] },
          {
            name: 'Oberfläche und Volumen - Fortgeschritten',
            skillExercises: [],
          },
          { name: 'Einfluss von Parameteränderungen', skillExercises: [] },
          { name: 'Geometrische Sätze', skillExercises: [] },
          { name: 'Fläche und Umfang', skillExercises: [] },
          { name: 'Figuren zeichnen', skillExercises: [] },
        ],
      },
      {
        title: 'Funktionen und Graphen',
        headerColor: 'success',
        twColor: 'bg-green-600',
        /*exercises: [4, 17, 23, 192, 29, 45, 33, 44, 53],*/
        skillGroups: [
          { name: 'Wertetabellen', skillExercises: [] },
          { name: 'Punktproben und Funktionswerte', skillExercises: [] },
          { name: 'Lineare Funktionen', skillExercises: [] },
          { name: 'Quadratische Funktion - Grundlage', skillExercises: [] },
          { name: 'Graphen', skillExercises: [] },
          {
            name: 'Quadratische Funktion - Fortgeschritten',
            skillExercises: [],
          },
          { name: 'Wachstum', skillExercises: [] },
          { name: 'Exponentialfunktion', skillExercises: [] },
        ],
      },
      {
        title: 'Zufall und Daten',
        headerColor: 'tertiary',
        twColor: 'bg-purple-600',
        /*exercises: [15, 41],*/
        skillGroups: [
          { name: 'Laplace-Experimente', skillExercises: [] },
          { name: 'Diagramme und Kenngrößen', skillExercises: [] },
          { name: 'Baumdiagramm und Pfadregeln', skillExercises: [] },
        ],
      },
      {
        title: 'Digitale Werkzeuge',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        /*exercises: [24, 34, 49],*/
        skillGroups: [{ name: 'Tabellenkalkulation', skillExercises: [] }],
      },
    ],
  },
}
