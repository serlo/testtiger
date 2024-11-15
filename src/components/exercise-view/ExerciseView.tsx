import { ExerciseViewStore } from './state/exercise-view-store'
import { ExerciseViewLayout } from './ExerciseViewLayout'
import { useEffect } from 'react'
import { setupExercise } from './state/actions'

interface ExerciseViewProps {
  id: number
}

export function ExerciseView({ id }: ExerciseViewProps) {
  useEffect(() => {
    if (ExerciseViewStore.getRawState().id !== id) {
      const hash = window.location.hash
      if (hash) {
        const obj = JSON.parse(decodeURIComponent(hash.substring(1)))
        setupExercise(id, obj.name, obj.pages)
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
