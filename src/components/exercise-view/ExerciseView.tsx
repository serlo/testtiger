import { ExerciseViewStore } from './state/exercise-view-store'
import { ExerciseViewLayout } from './ExerciseViewLayout'
import { useEffect } from 'react'
import { setupExercise } from './state/actions'
import { useHistory } from 'react-router'
import { handleLearningPathStepClick } from '../learning-path/LearningPathMap'
import { navigationData } from '@/content/navigations'

interface ExerciseViewProps {
  id: number
}

export function ExerciseView({ id }: ExerciseViewProps) {
  useEffect(() => {
    if (id == 123456 && ExerciseViewStore.getRawState().id !== 123456) {
      window.location.href = '/app/home'
      return
    }
    if (ExerciseViewStore.getRawState().id !== id) {
      const hash = window.location.hash
      if (hash) {
        const obj = JSON.parse(decodeURIComponent(hash.substring(1)))
        console.log('parse it', obj)
        if (obj.lessonPosition) {
          navigationData[obj.exam].path.forEach((path, index) => {
            path.lessons.forEach((lesson, lessonIndex) => {
              if (
                lesson.position?.x === obj.lessonPosition.x &&
                lesson.position?.y === obj.lessonPosition.y
              ) {
                obj.lesson = lesson
              }
            })
          })
          handleLearningPathStepClick({ ...obj })
        } else {
          setupExercise(id, obj.name, obj.pages, !!obj.toHome)
        }
      } else {
        setupExercise(id)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const exId = ExerciseViewStore.useState(s => s.id)

  if (exId == -1) {
    return null
  }

  return <ExerciseViewLayout />
}
