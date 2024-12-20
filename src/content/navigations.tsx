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
        title: 'Grundlagen',
        lessons: [
          {
            type: 'new-skill',
            title: 'Zahlen und Einheiten',
            position: { x: 100, y: 200 },
            steps: [
              { exercise: { id: 1, pages: [{ index: 'a' }] } },
              { exercise: { id: 16 } },
              { exercise: { id: 50 } },
            ],
          },
          {
            type: 'new-skill',
            title: 'Schätzen und Überschlagen',
            position: { x: 250, y: 350 },
            steps: [{ exercise: { id: 20 } }, { exercise: { id: 14 } }],
          },
          {
            type: 'new-skill',
            title: 'Prozentrechnung',
            position: { x: 100, y: 500 },
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
            position: { x: 250, y: 650 },
            steps: [
              { exercise: { id: 40 } },
              { exercise: { id: 20 } },
              { exercise: { id: 5 } },
            ],
          },
          {
            type: 'new-skill',
            title: 'Proportionalität',
            position: { x: 100, y: 800 },
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
            position: { x: 250, y: 950 },
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
            position: { x: 100, y: 1100 },
            steps: [
              { exercise: { id: 1, pages: [{ index: 'b' }] } },
              {
                exercise: { id: 21 },
              },
            ],
          },
          {
            type: 'challenge',
            title: 'Challenge 2',
            position: { x: 250, y: 1250 },
            steps: [
              {
                exercise: {
                  id: 46,
                  pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Lineare Gleichungssysteme',
            position: { x: 100, y: 1400 },
            steps: [
              {
                exercise: {
                  id: 43,
                },
              },
              {
                exercise: {
                  id: 3,
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Quadratische Gleichungen 1',
            position: { x: 250, y: 1550 },
            steps: [
              {
                exercise: {
                  id: 52,
                  pages: [{ index: 'b' }],
                },
              },
              {
                exercise: {
                  id: 37,
                  pages: [{ index: 'g', intro: ['skill'] }],
                },
              },
            ],
          },
          {
            type: 'repetition',
            title: 'Schätzen und Überschlagen',
            position: { x: 100, y: 1700 },
            steps: [{ exercise: { id: 14 } }],
          },
          {
            type: 'challenge',
            title: 'Challenge 3',
            position: { x: 250, y: 1850 },
            steps: [
              {
                exercise: {
                  id: 92,
                  pages: [{ index: 'c' }, { index: 'd' }, { index: 'e' }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Oberfläche und Volumen 1',
            position: { x: 100, y: 2000 },
            steps: [
              {
                exercise: {
                  id: 26,
                  pages: [{ index: 'a' }, { index: 'b' }],
                },
              },
              {
                exercise: {
                  id: 42,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
              {
                exercise: {
                  id: 22,
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Geometrische Sätze 1',
            position: { x: 250, y: 2150 },
            steps: [
              {
                exercise: {
                  id: 6,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
              {
                exercise: {
                  id: 32,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
            ],
          },
          {
            type: 'repetition',
            title: 'Proportionalität',
            position: { x: 100, y: 2300 },
            steps: [
              {
                exercise: {
                  id: 7,
                  pages: [{ index: 'c', intro: ['skill'] }],
                },
              },
            ],
          },
          {
            type: 'challenge',
            title: 'Challenge 4',
            position: { x: 250, y: 2450 },
            steps: [
              {
                exercise: {
                  id: 12,
                },
              },
              {
                exercise: {
                  id: 38,
                  pages: [{ index: 'b', intro: ['global', 'skill'] }],
                },
              },
              {
                exercise: {
                  id: 30,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Länge von Strecken',
            position: { x: 100, y: 2600 },
            steps: [
              {
                exercise: {
                  id: 8,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Wertetabellen',
            position: { x: 250, y: 2750 },
            steps: [
              {
                exercise: {
                  id: 17,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
              {
                exercise: {
                  id: 29,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
            ],
          },
          {
            type: 'repetition',
            title: 'Prozentrechnung',
            position: { x: 100, y: 2900 },
            steps: [
              {
                exercise: {
                  id: 5,
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Punktproben und Funktionswerte',
            position: { x: 250, y: 3050 },
            steps: [
              {
                exercise: {
                  id: 52,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
              {
                exercise: {
                  id: 8,
                  pages: [{ index: 'd', intro: ['global', 'skill'] }],
                },
              },
            ],
          },
          {
            type: 'challenge',
            title: 'Challenge 5',
            position: { x: 100, y: 3200 },
            steps: [
              {
                exercise: {
                  id: 53,
                  pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
                },
              },
            ],
          },
          {
            type: 'repetition',
            title: 'Lineare Gleichungssysteme',
            position: { x: 250, y: 3350 },
            steps: [
              {
                exercise: {
                  id: 27,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Lineare Funktionen',
            position: { x: 100, y: 3500 },
            steps: [
              {
                exercise: {
                  id: 23,
                  pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
                },
              },
              {
                exercise: {
                  id: 27,
                  pages: [{ index: 'b' }],
                },
              },
              {
                exercise: {
                  id: 17,
                  pages: [{ index: 'b', intro: ['global'] }, { index: 'c' }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Graphen',
            position: { x: 250, y: 3650 },
            steps: [
              {
                exercise: {
                  id: 45,
                  pages: [{ index: 'b', intro: ['skill'] }, { index: 'c' }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Laplace-Experimente',
            position: { x: 100, y: 3800 },
            steps: [
              {
                exercise: {
                  id: 41,
                  pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
                },
              },
            ],
          },
          {
            type: 'challenge',
            title: 'Challenge 6',
            position: { x: 250, y: 3950 },
            steps: [
              {
                exercise: {
                  id: 37,
                  pages: [
                    { index: 'b', intro: ['global', 'skill'] },
                    { index: 'c' },
                    { index: 'd' },
                  ],
                },
              },
            ],
          },
          {
            type: 'repetition',
            title: 'Lineare Funktionen',
            position: { x: 100, y: 4100 },
            steps: [
              {
                exercise: {
                  id: 44,
                  pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Quadratische Funktionen 1',
            position: { x: 250, y: 4250 },
            steps: [
              {
                exercise: {
                  id: 4,
                  pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Diagramme und Kenngrößen',
            position: { x: 100, y: 4400 },
            steps: [
              {
                exercise: {
                  id: 51,
                  pages: [
                    { index: 'a', intro: ['global'] },
                    { index: 'b' },
                    { index: 'c' },
                  ],
                },
              },
              {
                exercise: {
                  id: 15,
                  pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Tabellenkalkulation',
            position: { x: 250, y: 4550 },
            steps: [
              {
                exercise: {
                  id: 34,
                  pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
                },
              },
              {
                exercise: {
                  id: 24,
                  pages: [
                    { index: 'a', intro: ['global'] },
                    { index: 'b' },
                    { index: 'c' },
                  ],
                },
              },
            ],
          },
          {
            type: 'challenge',
            title: 'Challenge 7',
            position: { x: 100, y: 4700 },
            steps: [
              {
                exercise: {
                  id: 48,
                },
              },
              {
                exercise: {
                  id: 49,
                },
              },
              {
                exercise: {
                  id: 50,
                },
              },
              {
                exercise: {
                  id: 51,
                },
              },
              {
                exercise: {
                  id: 52,
                },
              },
            ],
          },
        ],
      },
      {
        title: 'Skill-Profi',
        lessons: [
          {
            type: 'repetition',
            title: 'Laplace Experimente',
            position: { x: 100, y: 5000 },
            steps: [
              {
                exercise: {
                  id: 54,
                  pages: [{ index: 'd' }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Baumdiagramm und Pfadregeln',
            position: { x: 250, y: 5150 },
            steps: [
              {
                exercise: {
                  id: 54,
                  pages: [{ index: 'e', intro: ['skill'] }, { index: 'f' }],
                },
              },
              {
                exercise: {
                  id: 36,
                  pages: [{ index: 'e', intro: ['skill'] }, { index: 'f' }],
                },
              },
            ],
          },
          {
            type: 'repetition',
            title: 'Umgang mit Formeln und Termen',
            position: { x: 100, y: 5300 },
            steps: [
              {
                exercise: {
                  id: 39,
                  pages: [{ index: 'b' }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Termumformungen',
            position: { x: 250, y: 5450 },
            steps: [
              {
                exercise: {
                  id: 37,
                  pages: [{ index: 'f', intro: ['skill'] }],
                },
              },
              {
                exercise: {
                  id: 13,
                },
              },
              {
                exercise: {
                  id: 39,
                  pages: [{ index: 'e', intro: ['global'] }],
                },
              },
            ],
          },
          {
            type: 'challenge',
            title: 'Challenge 1',
            position: { x: 100, y: 5600 },
            steps: [
              {
                exercise: {
                  id: 18,
                  pages: [
                    { index: 'e', intro: ['skill'] },
                    { index: 'f' },
                    { index: 'g' },
                  ],
                },
              },
            ],
          },
          {
            type: 'repetition',
            title: 'Oberfläche und Volumen 1',
            position: { x: 250, y: 5750 },
            steps: [
              {
                exercise: {
                  id: 2,
                },
              },
              {
                exercise: {
                  id: 42,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Oberfläche und Volumen 2',
            position: { x: 100, y: 5900 },
            steps: [
              {
                exercise: {
                  id: 36,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
              {
                exercise: {
                  id: 54,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
              {
                exercise: {
                  id: 46,
                  pages: [{ index: 'd' }, { index: 'e' }],
                },
              },
            ],
          },
          {
            type: 'repetition',
            title: 'Länge von Strecken',
            position: { x: 250, y: 6050 },
            steps: [
              {
                exercise: {
                  id: 7,
                  pages: [{ index: 'e', intro: ['skill'] }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Einfluss von Parameteränderungen',
            position: { x: 100, y: 6200 },
            steps: [
              {
                exercise: {
                  id: 32,
                  pages: [{ index: 'b', intro: ['global'] }],
                },
              },
              {
                exercise: {
                  id: 42,
                  pages: [{ index: 'b', intro: ['global', 'skill'] }],
                },
              },
            ],
          },
          {
            type: 'challenge',
            title: 'Challenge 2',
            position: { x: 250, y: 6350 },
            steps: [
              {
                exercise: {
                  id: 28,
                },
              },
            ],
          },
          {
            type: 'repetition',
            title: 'Geometrische Sätze 1',
            position: { x: 100, y: 6500 },
            steps: [
              {
                exercise: {
                  id: 11,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Geometrische Sätze 2',
            position: { x: 250, y: 6650 },
            steps: [
              {
                exercise: {
                  id: 11,
                  pages: [{ index: 'b', intro: ['global'] }],
                },
              },
              {
                exercise: {
                  id: 47,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
              {
                exercise: {
                  id: 30,
                  pages: [{ index: 'c', intro: ['global', 'skill'] }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Fläche und Umfang',
            position: { x: 100, y: 6800 },
            steps: [
              {
                exercise: {
                  id: 6,
                  pages: [{ index: 'b', intro: ['global'] }],
                },
              },
              {
                exercise: {
                  id: 46,
                  pages: [{ index: 'c' }],
                },
              },
              {
                exercise: {
                  id: 7,
                  pages: [{ index: 'b', intro: ['global'] }],
                },
              },
            ],
          },
          {
            type: 'repetition',
            title: 'Diagramme und Kenngrößen',
            position: { x: 250, y: 6950 },
            steps: [
              {
                exercise: {
                  id: 51,
                  pages: [
                    { index: 'a', intro: ['global'] },
                    { index: 'b' },
                    { index: 'c' },
                  ],
                },
              },
            ],
          },
          {
            type: 'challenge',
            title: 'Challenge 3',
            position: { x: 100, y: 7100 },
            steps: [
              {
                exercise: {
                  id: 45,
                  pages: [
                    { index: 'a', intro: ['global'] },
                    { index: 'b' },
                    { index: 'c' },
                    { index: 'd' },
                  ],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Figuren zeichnen',
            position: { x: 250, y: 7250 },
            steps: [
              {
                exercise: {
                  id: 7,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
            ],
          },
          {
            type: 'repetition',
            title: 'Quadratische Funktionen 1',
            position: { x: 100, y: 7400 },
            steps: [
              {
                exercise: {
                  id: 33,
                  pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Quadratische Funktionen 2',
            position: { x: 250, y: 7550 },
            steps: [
              {
                exercise: {
                  id: 45,
                  pages: [{ index: 'e' }, { index: 'f' }],
                },
              },
              {
                exercise: {
                  id: 29,
                  pages: [
                    { index: 'c', intro: ['global'] },
                    { index: 'd' },
                    { index: 'f', intro: ['skill'] },
                    { index: 'g' },
                  ],
                },
              },
            ],
          },
          {
            type: 'challenge',
            title: 'Challenge 4',
            position: { x: 100, y: 7700 },
            steps: [
              {
                exercise: {
                  id: 31,
                },
              },
              {
                exercise: {
                  id: 32,
                },
              },
              {
                exercise: {
                  id: 33,
                },
              },
              {
                exercise: {
                  id: 34,
                },
              },
              {
                exercise: {
                  id: 35,
                },
              },
            ],
          },
          {
            type: 'repetition',
            title: 'Wertetabellen',
            position: { x: 250, y: 7850 },
            steps: [
              {
                exercise: {
                  id: 29,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Wachstum',
            position: { x: 100, y: 8000 },
            steps: [
              {
                exercise: {
                  id: 29,
                  pages: [{ index: 'b', intro: ['skill'] }],
                },
              },
              {
                exercise: {
                  id: 19,
                  pages: [{ index: 'f', intro: ['skill'] }],
                },
              },
              {
                exercise: {
                  id: 38,
                  pages: [{ index: 'f', intro: ['skill'] }],
                },
              },
            ],
          },
          {
            type: 'repetition',
            title: 'Punktproben und Funktionswerte',
            position: { x: 250, y: 8150 },
            steps: [
              {
                exercise: {
                  id: 38,
                  pages: [{ index: 'e', intro: ['skill'] }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Exponentialfunktion',
            position: { x: 100, y: 8300 },
            steps: [
              {
                exercise: {
                  id: 38,
                  pages: [{ index: 'd' }],
                },
              },
              {
                exercise: {
                  id: 46,
                  pages: [{ index: 'f' }],
                },
              },
              {
                exercise: {
                  id: 53,
                  pages: [{ index: 'd', intro: ['skill'] }, { index: 'e' }],
                },
              },
            ],
          },
          {
            type: 'challenge',
            title: 'Challenge 5',
            position: { x: 250, y: 8450 },
            steps: [
              {
                exercise: {
                  id: 29,
                },
              },
            ],
          },
          {
            type: 'repetition',
            title: 'Quadratische Gleichungen 1',
            position: { x: 100, y: 8600 },
            steps: [
              {
                exercise: {
                  id: 37,
                  pages: [{ index: 'g', intro: ['skill'] }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Exponentialgleichungen',
            position: { x: 250, y: 8750 },
            steps: [
              {
                exercise: {
                  id: 53,
                  pages: [{ index: 'c', intro: ['global', 'skill'] }],
                },
              },
              {
                exercise: {
                  id: 47,
                  pages: [{ index: 'c' }],
                },
              },
            ],
          },
          {
            type: 'repetition',
            title: 'Tabellenkalkulation',
            position: { x: 100, y: 8900 },
            steps: [
              {
                exercise: {
                  id: 49,
                  pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Muster erkennen und anwenden',
            position: { x: 250, y: 9050 },
            steps: [
              {
                exercise: {
                  id: 19,
                  pages: [{ index: 'e' }],
                },
              },
              {
                exercise: {
                  id: 9,
                  pages: [
                    { index: 'a', intro: ['global'] },
                    { index: 'b' },
                    { index: 'c' },
                  ],
                },
              },
              {
                exercise: {
                  id: 39,
                  pages: [
                    { index: 'a', intro: ['global'] },
                    { index: 'c', intro: ['skill'] },
                    { index: 'd' },
                    { index: 'f' },
                  ],
                },
              },
            ],
          },
          {
            type: 'challenge',
            title: 'Challenge 6',
            position: { x: 100, y: 9200 },
            steps: [
              {
                exercise: {
                  id: 8,
                },
              },
            ],
          },
        ],
      },
      {
        title: 'Prüfungsfit',
        lessons: [
          {
            type: 'challenge',
            title: 'Challenge 1',
            position: { x: 250, y: 9400 },
            steps: [{ exercise: { id: 7 } }],
          },
          {
            type: 'challenge',
            title: 'Challenge 2',
            position: { x: 100, y: 9500 },
            steps: [{ exercise: { id: 55 } }],
          },
          {
            type: 'challenge',
            title: 'Challenge 3',
            position: { x: 250, y: 9600 },
            steps: [{ exercise: { id: 37 } }],
          },
          {
            type: 'challenge',
            title: 'Challenge 4',
            position: { x: 100, y: 9700 },
            steps: [{ exercise: { id: 30 } }],
          },
          {
            type: 'challenge',
            title: 'Challenge 5',
            position: { x: 250, y: 9800 },
            steps: [{ exercise: { id: 38 } }],
          },
          {
            type: 'challenge',
            title: 'Challenge 6',
            position: { x: 100, y: 9900 },
            steps: [{ exercise: { id: 47 } }],
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
            name: 'Zahlen und Einheiten',
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
            name: 'Schätzen und Überschlagen',
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
            name: 'Körpernetz und Symmetrie',
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
    path: [
      {
        title: 'Grundlagen',
        lessons: [
          {
            type: 'new-skill',
            title: 'Zahlen und Einheiten',
            steps: [{ exercise: { id: 110 } }, { exercise: { id: 130 } }],
          },
          {
            type: 'new-skill',
            title: 'Schriftliches Addieren',
            steps: [{ exercise: { id: 123 } }],
          },
          {
            type: 'new-skill',
            title: 'Schätzen & Überschlagen',
            steps: [{ exercise: { id: 114 } }],
          },
          {
            type: 'challenge',
            title: 'Challenge 1',
            steps: [
              { exercise: { id: 129 } },
              { exercise: { id: 123 } },
              { exercise: { id: 133 } },
            ],
          },
          {
            type: 'new-skill',
            title: 'Proportionalität',
            steps: [
              {
                exercise: {
                  id: 106,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
              {
                exercise: {
                  id: 119,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Prozentrechnung',
            steps: [
              {
                exercise: {
                  id: 126,
                  pages: [{ index: 'c' }],
                },
              },
            ],
          },

          {
            type: 'challenge',
            title: 'Challenge 2',
            steps: [
              {
                exercise: {
                  id: 136,
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
                  id: 102,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Lineare Gleichungen',
            steps: [
              {
                exercise: {
                  id: 102,
                  pages: [{ index: 'b', intro: ['global'] }],
                },
              },
            ],
          },

          {
            type: 'challenge',
            title: 'Challenge 3',
            steps: [
              {
                exercise: {
                  id: 132,
                },
              },
              {
                exercise: {
                  id: 102,
                  pages: [{ index: 'b', intro: ['global'] }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Fläche & Umfang simpel',
            steps: [
              {
                exercise: {
                  id: 127,
                  pages: [{ index: 'b', intro: ['global'] }],
                },
              },
              {
                exercise: {
                  id: 109,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Figuren zeichnen',
            steps: [
              {
                exercise: {
                  id: 115,
                  pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
                },
              },
            ],
          },

          {
            type: 'challenge',
            title: 'Challenge 4',
            steps: [
              {
                exercise: {
                  id: 109,
                  pages: [
                    { index: 'a', intro: ['global'] },
                    { index: 'b' },
                    { index: 'c' },
                    { index: 'd' },
                  ],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Oberfläche und Volumen 1',
            steps: [
              {
                exercise: {
                  id: 117,
                  pages: [{ index: 'b', intro: ['global'] }, { index: 'c' }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Diagramme und Kenngrößen',
            steps: [
              {
                exercise: {
                  id: 112,
                  pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
                },
              },
              {
                exercise: {
                  id: 131,
                  pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
                },
              },
            ],
          },

          {
            type: 'challenge',
            title: 'Challenge 5',
            steps: [
              {
                exercise: {
                  id: 120,
                },
              },
              {
                exercise: {
                  id: 121,
                },
              },
              {
                exercise: {
                  id: 122,
                },
              },
              {
                exercise: {
                  id: 123,
                },
              },
              {
                exercise: {
                  id: 124,
                },
              },
              {
                exercise: {
                  id: 125,
                },
              },
            ],
          },

          {
            type: 'new-skill',
            title: 'Graphen',
            steps: [
              {
                exercise: {
                  id: 116,
                },
              },
              {
                exercise: {
                  id: 128,
                  pages: [
                    { index: 'd', intro: ['global'] },
                    { index: 'e' },
                    { index: 'f' },
                  ],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Laplace Experimente',
            steps: [
              {
                exercise: {
                  id: 113,
                  pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
                },
              },
            ],
          },

          {
            type: 'challenge',
            title: 'Challenge 6',
            steps: [
              {
                exercise: {
                  id: 100,
                },
              },
              {
                exercise: {
                  id: 101,
                },
              },
              {
                exercise: {
                  id: 102,
                },
              },
              {
                exercise: {
                  id: 103,
                },
              },
              {
                exercise: {
                  id: 104,
                },
              },
            ],
          },
        ],
      },
      {
        title: 'Skill-Profi',
        lessons: [
          {
            type: 'repetition',
            title: 'Graphen',
            steps: [
              {
                exercise: {
                  id: 136,
                  pages: [{ index: 'd', intro: ['skill'] }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Lineare Funktionen',
            steps: [
              {
                exercise: {
                  id: 136,
                  pages: [
                    { index: 'c', intro: ['global'] },
                    { index: 'e' },
                    { index: 'f' },
                  ],
                },
              },
              {
                exercise: {
                  id: 119,
                  pages: [{ index: 'b', intro: ['global'] }, { index: 'c' }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Tabellen',
            steps: [
              {
                exercise: {
                  id: 128,
                  pages: [
                    { index: 'a', intro: ['global'] },
                    { index: 'b' },
                    { index: 'c' },
                  ],
                },
              },
            ],
          },

          {
            type: 'challenge',
            title: 'Challenge 1',
            steps: [
              {
                exercise: {
                  id: 107,
                  pages: [
                    { index: 'b', intro: ['global'] },
                    { index: 'c' },
                    { index: 'd' },
                    { index: 'e' },
                    { index: 'f' },
                  ],
                },
              },
            ],
          },
          {
            type: 'repetition',
            title: 'Fläche & Umfang 1',
            steps: [
              {
                exercise: {
                  id: 111,
                  pages: [{ index: 'a' }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Satz des Pythagoras',
            steps: [
              {
                exercise: {
                  id: 111,
                  pages: [{ index: 'b', intro: ['global'] }],
                },
              },
              {
                exercise: {
                  id: 135,
                  pages: [{ index: 'b', intro: ['global'] }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Fläche und Umfang - Kreis',
            steps: [
              {
                exercise: {
                  id: 108,
                  pages: [{ index: 'c', intro: ['skill'] }],
                },
              },
              {
                exercise: {
                  id: 126,
                  pages: [{ index: 'd', intro: ['skill'] }],
                },
              },
              {
                exercise: {
                  id: 119,
                  pages: [{ index: 'e', intro: ['skill'] }],
                },
              },
            ],
          },

          {
            type: 'challenge',
            title: 'Challenge 2',
            steps: [
              {
                exercise: {
                  id: 108,
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Mit Längen argumentieren',
            steps: [
              {
                exercise: {
                  id: 119,
                  pages: [{ index: 'd' }],
                },
              },
            ],
          },
          {
            type: 'repetition',
            title: 'Oberfläche und Volumen 1',
            steps: [
              {
                exercise: {
                  id: 122,
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Oberfläche und Volumen 2',
            steps: [
              { exercise: { id: 105 } },
              { exercise: { id: 106, pages: [{ index: 'b' }] } },
              {
                exercise: {
                  id: 109,
                  pages: [{ index: 'e', intro: ['skill'] }],
                },
              },
            ],
          },
          {
            type: 'challenge',
            title: 'Challenge 3',
            steps: [
              {
                exercise: {
                  id: 137,
                },
              },
            ],
          },
          {
            type: 'repetition',
            title: 'Figuren zeichnen',
            steps: [
              {
                exercise: {
                  id: 115,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Maßstab',
            steps: [
              {
                exercise: {
                  id: 127,
                  pages: [{ index: 'c', intro: ['skill'] }],
                },
              },
              {
                exercise: {
                  id: 107,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Körpernetz & Symmetrie',
            steps: [
              {
                exercise: {
                  id: 135,
                  pages: [{ index: 'a', intro: ['global'] }],
                },
              },
              {
                exercise: {
                  id: 109,
                  pages: [{ index: 'f', intro: ['skill'] }],
                },
              },
            ],
          },
          {
            type: 'challenge',
            title: 'Challenge 4',
            steps: [
              {
                exercise: {
                  id: 117,
                },
              },
            ],
          },
          {
            type: 'repetition',
            title: 'Diagramme und Kenngrößen',
            steps: [
              {
                exercise: {
                  id: 104,
                  pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
                },
              },
            ],
          },
          {
            type: 'new-skill',
            title: 'Tabellenkalkulation',
            steps: [
              {
                exercise: {
                  id: 134,
                  pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
                },
              },
              {
                exercise: {
                  id: 127,
                  pages: [{ index: 'd', intro: ['global'] }, { index: 'e' }],
                },
              },
            ],
          },
          {
            type: 'repetition',
            title: 'Laplace Experimente',
            steps: [
              {
                exercise: {
                  id: 126,
                  pages: [{ index: 'a', intro: ['global'] }, { index: 'b' }],
                },
              },
            ],
          },

          {
            type: 'challenge',
            title: 'Challenge 5',
            steps: [
              {
                exercise: {
                  id: 135,
                },
              },
            ],
          },
        ],
      },
      {
        title: 'Prüfungsfit',
        lessons: [
          {
            type: 'challenge',
            title: 'Challenge 1',
            steps: [{ exercise: { id: 119 } }],
          },

          {
            type: 'challenge',
            title: 'Challenge 2',
            steps: [
              {
                exercise: {
                  id: 118,
                },
              },
            ],
          },

          {
            type: 'challenge',
            title: 'Challenge 3',
            steps: [
              {
                exercise: {
                  id: 127,
                },
              },
            ],
          },

          {
            type: 'challenge',
            title: 'Challenge 4',
            steps: [
              {
                exercise: {
                  id: 109,
                },
              },
            ],
          },
        ],
      },
    ],
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
