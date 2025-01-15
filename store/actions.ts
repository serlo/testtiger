import { exercisesData } from '@/content/exercises'
import { Lesson } from '@/data/types'
import { countLetter } from '@/helper/count-letter'
import { UiStore } from '.'
import { PlayerProfileStore } from './player-profile-store'

export const setName = (name: string) => {
  UiStore.update(s => {
    s.name = name
  })
}

export function isWholeLessonDonePercentage(lesson: Lesson) {
  if (lesson.steps.length == 0) return 0
  let relevantKeys = findRelevantKeys(lesson)

  return (
    relevantKeys.filter(key =>
      PlayerProfileStore.getRawState().progress[
        PlayerProfileStore.getRawState().currentExam
      ].learningPathTags.includes(key),
    ).length / relevantKeys.length
  )
}

export function findRelevantKeys(lesson: Lesson) {
  let relevantKeys = []

  if (lesson.steps.length == 1) {
    const step = lesson.steps[0]
    if (step.exercise.pages) {
      step.exercise.pages.forEach(page => {
        relevantKeys.push(`${lesson.title}#${step.exercise.id}#${page.index}#`)
      })
    } else {
      relevantKeys.push(`${lesson.title}#${step.exercise.id}#single#`)
    }
  } else if (lesson.steps.length > 1) {
    let context = 1
    for (const step of lesson.steps) {
      if (step.exercise.pages) {
        step.exercise.pages.every(page => {
          const key = `${lesson.title}#${page.index}#${context}`
          relevantKeys.push(key)
        })
      } else {
        const content = exercisesData[step.exercise.id]
        if ('tasks' in content) {
          for (let i = 0; i < content.tasks.length; i++) {
            const key = `${lesson.title}#${countLetter('a', i)}#${context}`
            relevantKeys.push(key)
          }
        } else {
          const key = `${lesson.title}#single#${context}`
          relevantKeys.push(key)
        }
      }
      context++
    }
  }

  return relevantKeys
}
