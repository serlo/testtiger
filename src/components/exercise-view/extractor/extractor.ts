'use client'
import { Exercise } from '@/data/types'
import { Store } from 'pullstate'
import { renderToStaticMarkup } from 'react-dom/server'

export const ExtractorStore = new Store({ active: false })

// returning html string
export function extractor(exercise: Exercise<any>, data: object) {
  ExtractorStore.update(s => {
    s.active = true
  })
  let output = ''
  if ('tasks' in exercise) {
    output = renderToStaticMarkup(exercise.intro({ data }))
  } else {
    output = renderToStaticMarkup(exercise.task({ data }))
  }
  ExtractorStore.update(s => {
    s.active = false
  })
  return output
}

function toHtml(el: JSX.Element) {
  return renderToStaticMarkup(el)
}
