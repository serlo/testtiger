'use client'
import { Exercise } from '@/data/types'
import { renderToStaticMarkup } from 'react-dom/server'
import { ExtractorStore } from './extractor-store'
import { countLetter } from '@/helper/count-letter'

// returning html string
export function extractor(exercise: Exercise<any>, data: object) {
  ExtractorStore.active = true
  let output = ''
  if ('tasks' in exercise) {
    output += 'Hier beginnt das Intro der Aufgabe:\n\n'
    output += renderToStaticMarkup(exercise.intro({ data }))
    exercise.tasks.forEach((t, i) => {
      output += '\n\nTeilaufgabe ' + countLetter('a', i) + ')\n\n'
      output +=
        renderToStaticMarkup(t.task({ data })) +
        '\n\nLösung:\n\n' +
        renderToStaticMarkup(t.solution({ data }))
    })
    for (const t of exercise.tasks) {
    }
  } else {
    output =
      renderToStaticMarkup(exercise.task({ data })) +
      '\n\nLösung:\n\n' +
      renderToStaticMarkup(exercise.solution({ data }))
  }
  ExtractorStore.active = false
  return output
}
