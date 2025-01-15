import { exercisesData } from '@/content/exercises'
import { Lesson, Step } from '@/data/types'
import { countLetter } from '@/helper/count-letter'
import { Store } from 'pullstate'

export const storageKey = 'testtiger_player_progress_v0'
export type PlayerProfileStoreProps = {
  name: string
  currentExam: number
  progress: { [key: number]: ExamProgress }
  eventLog: { id: number; index: number; ts: number; type: 'kann-ich' }[]
  original: boolean
}

export const defaultPlayerProfileStoreValue: PlayerProfileStoreProps = {
  name: '',
  currentExam: 2,
  progress: {
    1: { selectedTopics: [], learningPathTags: [] },
    2: { selectedTopics: [], learningPathTags: [] },
    3: { selectedTopics: [], learningPathTags: [] },
  },
  eventLog: [],
  original: false,
}

interface ExamProgress {
  selectedTopics: number[]
  learningPathTags: string[]
}

export const PlayerProfileStore = new Store<PlayerProfileStoreProps>(
  defaultPlayerProfileStoreValue,
)

export function updatePlayerProfileStore(
  f: Parameters<typeof PlayerProfileStore.update>['0'],
) {
  PlayerProfileStore.update(f)
  localStorage.setItem(
    storageKey,
    JSON.stringify(PlayerProfileStore.getRawState()),
  )
}

export function isStepDone(step: Step) {
  if (step.exercise.pages) {
    return step.exercise.pages.every(page => {
      PlayerProfileStore.getRawState().eventLog.some(el => {
        return (
          el.id == step.exercise.id &&
          el.type == 'kann-ich' &&
          countLetter('a', el.index) == page.index
        )
      })
    })
  } else {
    return PlayerProfileStore.getRawState().eventLog.some(
      el => el.id == step.exercise.id && el.type == 'kann-ich',
    )
  }
}

export function isWholeLessonDonePercentage(lesson: Lesson) {
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
      step.exercise.pages.every(page => {
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
