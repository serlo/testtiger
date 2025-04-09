import { ExerciseViewStore } from './state/exercise-view-store'
import { ExerciseViewLayout } from './ExerciseViewLayout'
import { useEffect } from 'react'
import { setupExercise } from './state/actions'
import { handleLearningPathStepClick } from '../learning-path/LearningPathMap'
import { navigationData } from '@/content/navigations'
import { PlayerProfileStore } from '@/store/player-profile-store'

interface ExerciseViewProps {
  id: number
}

export function ExerciseView({ id }: ExerciseViewProps) {
  // TODO: The following constants are duplicated from LearningPathMap,
  // in order to avoid changing all positions manually in navigationData
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const path = navigationData[exam].path
  useEffect(() => {
    const partVerticalOffset = 2400 // Offset pro Part (Themenpfad)
    const additionalVerticalOffsetPerLesson = 80 // Zusätzlicher Offset pro Lesson innerhalb eines Parts
    const imageOffset = 7020 - 45 // Vertikaler Offset für die Hintergrundbilder
    const verticalScale = 1.1 // Skalierungsfaktor für y-Koordinaten der Elemente
    const circleRadius = 50 // Standardkreisradius (außer bei Challenge)
    const mapHeight =
      navigationData[exam].mapHeight + partVerticalOffset * path.length

    if (ExerciseViewStore.getRawState().id !== id) {
      const hash = window.location.hash
      if (hash) {
        const obj = JSON.parse(decodeURIComponent(hash.substring(1)))
        console.log('parse it', obj)
        if (obj.lessonPosition) {
          navigationData[obj.exam].path.forEach((path, index) => {
            const partOffset = index * partVerticalOffset
            path.lessons.forEach((lesson, lessonIndex) => {
              if (
                lesson.position?.x === obj.lessonPosition.x &&
                lesson.position?.y
                  ? lesson.position.y +
                      partOffset +
                      lessonIndex * additionalVerticalOffsetPerLesson ===
                    obj.lessonPosition.y
                  : undefined
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
