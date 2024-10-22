'use client'
import { Exercise } from '@/data/types'
import { renderToStaticMarkup } from 'react-dom/server'
import { ExtractorStore } from './extractor-store'

// returning html string
export function extractor(exercise: Exercise<any>, data: object) {
  ExtractorStore.active = true
  let output = ''
  if ('tasks' in exercise) {
    output = renderToStaticMarkup(exercise.intro({ data }))
  } else {
    output = renderToStaticMarkup(exercise.task({ data }))
  }
  ExtractorStore.active = false
  return output
}

function toHtml(el: JSX.Element) {
  return renderToStaticMarkup(el)
}
