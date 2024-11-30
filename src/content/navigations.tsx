import { Navigation } from '@/data/types'

export const navigationData: { [key: number]: Navigation } = {
  1: {
    longTitle: 'Nordrhein-Westfalen - mittlerer Schulabschuss (MSA)',
    shortTitle: 'NRW - MSA',
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
                pages: [{ index: 'b', intro: [] }],
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
                pages: [{ index: 'e', intro: ['skill'] }],
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
          {
            name: 'Fläche und Umfang',
            skillExercises: [
              {
                id: 6,
                pages: [{ index: 'b', intro: ['global'] }],
              },
              {
                id: 30,
                pages: [
                  { index: 'e', intro: ['global', 'skill'] },
                  { index: 'f' },
                ],
              },
              {
                id: 46,
                pages: [{ index: 'c' }],
              },
              {
                id: 37,
                pages: [{ index: 'c', intro: ['global', 'skill'] }],
              },
              {
                id: 47,
                pages: [{ index: 'a', intro: ['global'] }],
              },
              {
                id: 30,
                pages: [{ index: 'd', intro: ['global', 'skill'] }],
              },
              {
                id: 55,
                pages: [
                  { index: 'b', intro: ['global'] },
                  { index: 'c' },
                  { index: 'd' },
                ],
              },
              {
                id: 7,
                pages: [{ index: 'b', intro: ['global'] }],
              },
            ],
          },
          {
            name: 'Figuren zeichnen',
            skillExercises: [
              {
                id: 37,
                pages: [{ index: 'd', intro: ['global', 'skill'] }],
              },
              {
                id: 7,
                pages: [{ index: 'a', intro: ['global'] }],
              },
              {
                id: 55,
                pages: [{ index: 'f' }],
              },
            ],
          },
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
                id: 17,
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
              {
                id: 53,
                pages: [{ index: 'g', intro: ['skill'] }],
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
                id: 53,
                pages: [{ index: 'f' }],
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
    path: [
      {
        title: 'Teil 1 - Grundlagen',
        lessons: [
          {
            type: 'new-skill',
            title: 'Zahlen und Größen',
            steps: [
              { exercise: { id: 48 } },
              { exercise: { id: 16 } },
              { exercise: { id: 50 } },
            ],
          },
          {
            type: 'new-skill',
            title: 'Schätzen und Überschlagen',
            steps: [{ exercise: { id: 20 } }, { exercise: { id: 14 } }],
          },
          {
            type: 'new-skill',
            title: 'Prozentrechnung',
            steps: [
              { exercise: { id: 5 } },
              {
                exercise: {
                  id: 15,
                  pages: [{ index: 'b', intro: ['global'] }],
                },
              },
            ],
          },
          {
            type: 'challenge',
            title: 'Challenge 1',
            steps: [
              { exercise: { id: 40 } },
              { exercise: { id: 20 } },
              { exercise: { id: 5 } },
            ],
          },
          {
            type: 'new-skill',
            title: 'Proportionalität',
            steps: [
              {
                exercise: {
                  id: 45,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
              {
                exercise: {
                  id: 18,
                  pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Umgang mit Formeln und Termen',
            steps: [
              {
                exercise: {
                  id: 39,
                  pages: [{ index: 'b', intro: [] }],
                },
              },
              {
                exercise: {
                  id: 9,
                  pages: [{ index: 'd', intro: [] }],
                },
              },
            ],
          },
          {
            type: 'repetition',
            title: 'Zahlen und Einheiten',
            steps: [
              { exercise: { id: 1, pages: [{ index: 'a' }, { index: 'b' }] } },
              {
                exercise: { id: 21 },
              },
            ],
          },
          {
            type: 'challenge',
            title: 'Challenge 2',
            steps: [
              {
                exercise: {
                  id: 46,
                  pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  2: {
    longTitle: 'Nordrhein-Westfalen - Erweiterte Erste Schulabschluss (EESA)',
    shortTitle: 'NRW - EESA',
    topics: [
      {
        title: 'Grundlagen - Zahlen und Größen',
        headerColor: 'primary',
        twColor: 'bg-blue-300',
        skillGroups: [
          {
            name: 'Zahlen & Einheiten',
            skillExercises: [
              { id: 100 },
              { id: 110 },
              { id: 120 },
              { id: 129 },
              { id: 101 },
              { id: 121 },
              { id: 130 },
            ],
          },
          { name: 'schriftliches Addieren', skillExercises: [{ id: 123 }] },
          {
            name: 'Proportionalität',
            skillExercises: [
              { id: 107, pages: [{ index: 'b', intro: ['global'] }] },
              { id: 136, pages: [{ index: 'a', intro: ['global'] }] },
              { id: 119, pages: [{ index: 'a', intro: ['global'] }] },
              { id: 135, pages: [{ index: 'e', intro: ['global', 'skill'] }] },
              { id: 136, pages: [{ index: 'b', intro: ['global', 'skill'] }] },
              { id: 106, pages: [{ index: 'b' }] },
              { id: 119, pages: [{ index: 'f', intro: ['skill'] }] },
              { id: 106, pages: [{ index: 'a', intro: ['global'] }] },
            ],
          },
          {
            name: 'Schätzen & Überschlagen',
            skillExercises: [{ id: 114 }, { id: 133 }, { id: 124 }],
          },
          {
            name: 'Prozentrechnung',
            skillExercises: [
              {
                id: 108,
                pages: [{ index: 'e', intro: ['skill'] }],
              },
              { id: 126, pages: [{ index: 'c' }] },
              { id: 132 },
            ],
          },
        ],
      },
      {
        title: 'Terme und Gleichungen',
        headerColor: 'danger',
        twColor: 'bg-red-500',
        skillGroups: [
          {
            name: 'Umgang mit Formeln und Termen',
            skillExercises: [
              { id: 102, pages: [{ index: 'a', intro: ['global'] }] },
              { id: 109, pages: [{ index: 'd', intro: ['skill'] }] },
            ],
          },
          {
            name: 'lineare Gleichungen',
            skillExercises: [
              { id: 102, pages: [{ index: 'b', intro: ['global'] }] },
            ],
          },
        ],
      },
      {
        title: 'Körper und Figuren',
        headerColor: 'warning',
        twColor: 'bg-yellow-400',
        skillGroups: [
          {
            name: 'Oberfläche und Volumen - Grundlage',
            skillExercises: [
              {
                id: 117,
                pages: [{ index: 'b', intro: ['global'] }, { index: 'c' }],
              },
              {
                id: 122,
              },
              {
                id: 137,
                pages: [{ index: 'a', intro: ['global'] }],
              },
              {
                id: 105,
                pages: [{ index: 'a' }],
              },
              {
                id: 105,
                pages: [{ index: 'b' }],
              },
              {
                id: 137,
                pages: [{ index: 'b', intro: ['global'] }, { index: 'c' }],
              },
            ],
          },
          {
            name: 'Oberfläche und Volumen - fortgeschritten',
            skillExercises: [
              { id: 109, pages: [{ index: 'e', intro: ['skill'] }] },
              { id: 137, pages: [{ index: 'd', intro: ['global'] }] },
            ],
          },
          {
            name: 'Einfluss von Parameteränderungen',
            skillExercises: [
              { id: 126, pages: [{ index: 'e', intro: ['skill'] }] },
            ],
          },
          {
            name: 'geometrische Sätze',
            skillExercises: [
              { id: 115, pages: [{ index: 'b' }] },
              { id: 111, pages: [{ index: 'b', intro: ['skill'] }] },
              { id: 108, pages: [{ index: 'a', intro: ['global'] }] },
              { id: 127, pages: [{ index: 'a', intro: ['global'] }] },
              { id: 135, pages: [{ index: 'b', intro: ['global'] }] },
            ],
          },
          {
            name: 'Fläche und Umfang',
            skillExercises: [
              { id: 111 },
              { id: 117, pages: [{ index: 'e', intro: ['skill'] }] },
              {
                id: 109,
                pages: [
                  { index: 'a', intro: ['global'] },
                  { index: 'c', intro: ['skill'] },
                ],
              },
              {
                id: 108,
                pages: [{ index: 'b', intro: ['global'] }],
              },
              {
                id: 108,
                pages: [{ index: 'd', intro: ['global', 'skill'] }],
              },
              { id: 127, pages: [{ index: 'b' }] },
              {
                id: 108,
                pages: [{ index: 'c', intro: ['skill'] }],
              },
              {
                id: 126,
                pages: [{ index: 'd', intro: ['skill'] }],
              },
              {
                id: 119,
                pages: [{ index: 'e', intro: ['skill'] }],
              },
            ],
          },
          {
            name: 'Figuren zeichnen',
            skillExercises: [
              { id: 109, pages: [{ index: 'b', intro: ['global'] }] },
              { id: 127, pages: [{ index: 'c', intro: ['global', 'skill'] }] },
              { id: 135, pages: [{ index: 'd', intro: ['global'] }] },
              { id: 115, pages: [{ index: 'a' }] },
            ],
          },
          {
            name: 'Maßstab',
            skillExercises: [
              { id: 107, pages: [{ index: 'a', intro: ['global'] }] },
              { id: 117, pages: [{ index: 'd', intro: ['skill'] }] },
            ],
          },
          {
            name: 'Mit Längen argumentieren',
            skillExercises: [
              { id: 117, pages: [{ index: 'a', intro: ['global'] }] },
              { id: 119, pages: [{ index: 'd' }] },
              { id: 135, pages: [{ index: 'c', intro: ['global', 'skill'] }] },
            ],
          },
          {
            name: 'Körpernetz & Symmetrie',
            skillExercises: [
              { id: 109, pages: [{ index: 'f', intro: ['skill'] }] },
              { id: 135, pages: [{ index: 'a', intro: ['global'] }] },
            ],
          },
        ],
      },
      {
        title: 'Funktionen und Graphen',
        headerColor: 'success',
        twColor: 'bg-green-600',
        skillGroups: [
          {
            name: 'Lineare Funktionen',
            skillExercises: [
              { id: 107, pages: [{ index: 'c', intro: ['global'] }] },
              { id: 136, pages: [{ index: 'c', intro: ['global'] }] },
              { id: 119, pages: [{ index: 'b', intro: ['global'] }] },
              {
                id: 136,
                pages: [
                  { index: 'e', intro: ['global', 'skill'] },
                  { index: 'f' },
                ],
              },
              { id: 119, pages: [{ index: 'c', intro: ['global', 'skill'] }] },
            ],
          },
          {
            name: 'Graphen',
            skillExercises: [
              {
                id: 107,
                pages: [
                  { index: 'd', intro: ['skill'] },
                  { index: 'e' },
                  { index: 'f' },
                ],
              },
              {
                id: 128,
                pages: [
                  { index: 'd', intro: ['global'] },
                  { index: 'e' },
                  { index: 'f' },
                ],
              },
              {
                id: 136,
                pages: [{ index: 'd', intro: ['skill'] }],
              },
              {
                id: 116,
              },
            ],
          },
        ],
      },
      {
        title: 'Zufall und Daten',
        headerColor: 'tertiary',
        twColor: 'bg-purple-600',
        skillGroups: [
          {
            name: 'Laplace Experimente',
            skillExercises: [
              {
                id: 103,
                pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
              },
              {
                id: 113,
                pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
              },
              {
                id: 126,
                pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
              },
              {
                id: 137,
                pages: [{ index: 'f', intro: ['skill'] }],
              },
            ],
          },
          {
            name: 'Diagramme und Kenngrößen',
            skillExercises: [
              { id: 104, pages: [{ index: 'a', intro: ['global'] }] },
              {
                id: 131,
                pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
              },
              {
                id: 112,
                pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
              },
              {
                id: 104,
                pages: [{ index: 'b', intro: ['global'] }],
              },
              {
                id: 125,
                pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
              },
            ],
          },
          {
            name: 'Tabellen',
            skillExercises: [
              {
                id: 128,
                pages: [
                  { index: 'a', intro: ['global'] },
                  { index: 'b' },
                  { index: 'c' },
                ],
              },
              {
                id: 137,
                pages: [{ index: 'e', intro: ['skill'] }],
              },
            ],
          },
        ],
      },
      {
        title: 'Digitale Werkzeuge',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'Tabellenkalkulation',
            skillExercises: [
              {
                id: 118,
                pages: [
                  { index: 'a', intro: ['global'] },
                  { index: 'b' },
                  { index: 'e' },
                ],
              },
              {
                id: 118,
                pages: [{ index: 'c', intro: ['global'] }, { index: 'd' }],
              },
              {
                id: 118,
                pages: [{ index: 'f', intro: ['global'] }],
              },
              {
                id: 127,
                pages: [{ index: 'd', intro: ['global'] }, { index: 'e' }],
              },
              {
                id: 134,
                pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
              },
            ],
          },
        ],
      },
    ],
    path: [],
  },
  3: {
    longTitle: 'Baden-Württemberg - Realschulabschluss',
    shortTitle: 'BW - RS',
    topics: [
      {
        title: 'TestTopic',
        headerColor: 'medium',
        twColor: 'bg-fuchsia-500',
        skillGroups: [
          {
            name: 'TestSkill',
            skillExercises: [
              {
                id: 200,
              },
            ],
          },
        ],
      },
    ],
    path: [],
  },
}
