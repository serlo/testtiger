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
          {
            name: 'Termumformungen',
            skillExercises: [
              { id: 13 },
              {
                id: 37,
                pages: [{ index: 'f', intro: ['skill'] }],
              },
              {
                id: 9,
                pages: [{ index: 'f', intro: ['global'] }],
              },
              {
                id: 39,
                pages: [{ index: 'e', intro: ['global'] }],
              },
              {
                id: 29,
                pages: [{ index: 'e', intro: ['skill'] }],
              },
            ],
          },
          {
            name: 'Muster erkennen und anwenden',
            skillExercises: [
              {
                id: 39,
                pages: [
                  { index: 'a', intro: ['global'] },
                  { index: 'c', intro: ['skill'] },
                  { index: 'd' },
                  { index: 'f' },
                ],
              },
              {
                id: 19,
                pages: [{ index: 'e' }],
              },
              {
                id: 8,
                pages: [{ index: 'b', intro: ['global'] }],
              },
              {
                id: 9,
                pages: [
                  { index: 'a', intro: ['global'] },
                  { index: 'b' },
                  { index: 'c' },
                ],
              },
              {
                id: 30,
                pages: [{ index: 'b', intro: ['global'] }],
              },
              {
                id: 47,
                pages: [{ index: 'b', intro: ['global'] }, { index: 'f' }],
              },
            ],
          },
          {
            name: 'Exponentialgleichungen',
            skillExercises: [
              {
                id: 47,
                pages: [{ index: 'c', intro: ['global'] }],
              },
              {
                id: 8,
                pages: [{ index: 'e', intro: ['global'] }],
              },
              {
                id: 53,
                pages: [{ index: 'c', intro: ['global', 'skill'] }],
              },
            ],
          },
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
          {
            name: 'Oberfläche und Volumen - Grundlage',
            skillExercises: [
              {
                id: 26,
                pages: [{ index: 'a', intro: ['global'] }],
              },
              {
                id: 26,
                pages: [{ index: 'b', intro: ['global'] }],
              },
              {
                id: 2,
              },
              {
                id: 42,
                pages: [{ index: 'a', intro: ['global'] }],
              },
              {
                id: 22,
              },
              {
                id: 38,
                pages: [{ index: 'b', intro: ['global', 'skill'] }],
              },
            ],
          },

          {
            name: 'Geometrische Sätze - Grundlage',
            skillExercises: [
              {
                id: 6,
                pages: [{ index: 'a', intro: ['global'] }],
              },
              {
                id: 32,
                pages: [{ index: 'a', intro: ['global'] }],
              },
              {
                id: 11,
                pages: [{ index: 'a', intro: ['global'] }],
              },
              {
                id: 55,
                pages: [{ index: 'g' }],
              },
            ],
          },
          {
            name: 'Länge von Strecken',
            skillExercises: [
              {
                id: 8,
                pages: [{ index: 'a', intro: ['global'] }],
              },
              {
                id: 7,
                pages: [{ index: 'e', intro: ['skill'] }],
              },
            ],
          },
          {
            name: 'Oberfläche und Volumen - Fortgeschritten',
            skillExercises: [
              {
                id: 38,
                pages: [{ index: 'a', intro: ['global'] }, { index: 'c' }],
              },
              {
                id: 18,
                pages: [{ index: 'c', intro: ['global'] }, { index: 'd' }],
              },
              {
                id: 54,
                pages: [{ index: 'a', intro: ['global'] }],
              },
              {
                id: 54,
                pages: [{ index: 'b', intro: ['global'] }],
              },
              {
                id: 46,
                pages: [{ index: 'd' }, { index: 'e' }],
              },
              {
                id: 36,
                pages: [{ index: 'a', intro: ['global'] }],
              },
              {
                id: 28,
                pages: [
                  { index: 'a', intro: ['global'] },
                  { index: 'b' },
                  { index: 'c' },
                ],
              },
              {
                id: 19,
                pages: [
                  { index: 'a', intro: ['global'] },
                  { index: 'b' },
                  { index: 'c' },
                  { index: 'd' },
                ],
              },
            ],
          },
          {
            name: 'Einfluss von Parameteränderungen',
            skillExercises: [
              {
                id: 42,
                pages: [{ index: 'b', intro: ['global'] }],
              },
              {
                id: 32,
                pages: [{ index: 'b', intro: ['global'] }],
              },
            ],
          },
          {
            name: 'Geometrische Sätze - Fortgeschritten',
            skillExercises: [
              {
                id: 11,
                pages: [{ index: 'b', intro: ['global'] }],
              },
              {
                id: 30,
                pages: [{ index: 'c', intro: ['global', 'skill'] }],
              },
              {
                id: 47,
                pages: [{ index: 'a', intro: ['global'] }],
              },
              {
                id: 30,
                pages: [
                  { index: 'a', intro: ['global'] },
                  { index: 'c', intro: ['skill'] },
                ],
              },
              {
                id: 7,
                pages: [{ index: 'd', intro: ['global', 'skill'] }],
              },
              {
                id: 55,
                pages: [{ index: 'a', intro: ['global'] }],
              },
              {
                id: 55,
                pages: [{ index: 'e', intro: ['global'] }],
              },
              {
                id: 55,
                pages: [{ index: 'f' }],
              },
              {
                id: 45,
                pages: [{ index: 'd' }],
              },
            ],
          },
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
          {
            name: 'Wertetabellen',
            skillExercises: [
              {
                id: 11,
                pages: [{ index: 'a', intro: ['global'] }],
              },
              {
                id: 29,
                pages: [{ index: 'a', intro: ['global'] }],
              },
            ],
          },
          {
            name: 'Punktproben und Funktionswerte',
            skillExercises: [
              {
                id: 52,
                pages: [{ index: 'a', intro: ['global'] }],
              },
              {
                id: 37,
                pages: [{ index: 'a', intro: ['global'] }],
              },
              {
                id: 8,
                pages: [{ index: 'd', intro: ['global', 'skill'] }],
              },
              {
                id: 38,
                pages: [{ index: 'e', intro: ['skill'] }],
              },
              {
                id: 53,
                pages: [{ index: 'b', intro: ['global'] }],
              },
            ],
          },
          {
            name: 'Lineare Funktionen',
            skillExercises: [
              {
                id: 44,
                pages: [{ index: 'a', intro: ['global'] }],
              },
              {
                id: 44,
                pages: [{ index: 'b', intro: ['global'] }],
              },
              {
                id: 23,
                pages: [{ index: 'a', intro: ['global'] }],
              },
              {
                id: 23,
                pages: [{ index: 'b' }],
              },
              {
                id: 27,
                pages: [{ index: 'b' }],
              },
              {
                id: 17,
                pages: [{ index: 'b', intro: ['global'] }],
              },
              {
                id: 17,
                pages: [{ index: 'c', intro: ['global'] }],
              },
            ],
          },
          {
            name: 'Quadratische Funktion - Grundlage',
            skillExercises: [
              {
                id: 33,
                pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
              },

              {
                id: 4,
                pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
              },
            ],
          },
          {
            name: 'Graphen',
            skillExercises: [
              {
                id: 45,
                pages: [{ index: 'b', intro: ['global'] }, { index: 'c' }],
              },
            ],
          },
          {
            name: 'Quadratische Funktion - Fortgeschritten',
            skillExercises: [
              {
                id: 45,
                pages: [{ index: 'e' }, { index: 'f' }],
              },
              {
                id: 29,
                pages: [
                  { index: 'c', intro: ['skill'] },
                  { index: 'd' },
                  { index: 'e' },
                  { index: 'f' },
                  { index: 'g' },
                ],
              },
              {
                id: 37,
                pages: [{ index: 'b', intro: ['global', 'skill'] }],
              },
              {
                id: 37,
                pages: [{ index: 'g', intro: ['skill'] }],
              },
            ],
          },
          {
            name: 'Wachstum',
            skillExercises: [
              {
                id: 29,
                pages: [{ index: 'b', intro: ['skill'] }],
              },
              {
                id: 19,
                pages: [{ index: 'f', intro: ['skill'] }],
              },
              {
                id: 38,
                pages: [{ index: 'f', intro: ['skill'] }],
              },
            ],
          },
          {
            name: 'Exponentialfunktion',
            skillExercises: [
              {
                id: 38,
                pages: [{ index: 'd' }],
              },
              {
                id: 8,
                pages: [{ index: 'c', intro: ['global'] }],
              },
              {
                id: 46,
                pages: [{ index: 'f', intro: ['skill'] }],
              },
              {
                id: 53,
                pages: [{ index: 'd', intro: ['skill'] }, { index: 'e' }],
              },
              {
                id: 8,
                pages: [{ index: 'f', intro: ['global', 'skill'] }],
              },
            ],
          },
        ],
      },
      {
        title: 'Zufall und Daten',
        headerColor: 'tertiary',
        twColor: 'bg-purple-600',
        /*exercises: [15, 41],*/
        skillGroups: [
          {
            name: 'Laplace-Experimente',
            skillExercises: [
              {
                id: 41,
                pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
              },
              {
                id: 36,
                pages: [{ index: 'd', intro: ['global'] }],
              },
              {
                id: 54,
                pages: [{ index: 'd' }],
              },
            ],
          },
          {
            name: 'Diagramme und Kenngrößen',
            skillExercises: [
              {
                id: 15,
                pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
              },
              {
                id: 51,
                pages: [
                  { index: 'a', intro: ['global'] },
                  { index: 'b' },
                  { index: 'c' },
                ],
              },
            ],
          },
          {
            name: 'Baumdiagramm und Pfadregeln',
            skillExercises: [
              {
                id: 36,
                pages: [{ index: 'e', intro: ['skill'] }, { index: 'f' }],
              },
              {
                id: 28,
                pages: [
                  { index: 'd', intro: ['skill'] },
                  { index: 'e' },
                  { index: 'f' },
                ],
              },
              {
                id: 18,
                pages: [{ index: 'e', intro: ['skill'] }, { index: 'f' }],
              },
              {
                id: 7,
                pages: [{ index: 'f', intro: ['skill'] }, { index: 'g' }],
              },
              {
                id: 54,
                pages: [{ index: 'e', intro: ['skill'] }, { index: 'f' }],
              },
            ],
          },
        ],
      },
      {
        title: 'Digitale Werkzeuge',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        /*exercises: [24, 34, 49],*/
        skillGroups: [
          {
            name: 'Tabellenkalkulation',
            skillExercises: [
              {
                id: 34,
                pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
              },
              {
                id: 24,
                pages: [
                  { index: 'a', intro: ['global'] },
                  { index: 'b' },
                  { index: 'c' },
                ],
              },
              {
                id: 49,
                pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
              },
              {
                id: 47,
                pages: [{ index: 'd', intro: ['global'] }, { index: 'e' }],
              },
            ],
          },
        ],
      },
    ],
  },
}
