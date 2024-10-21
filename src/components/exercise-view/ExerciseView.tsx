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
      setupExercise(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const exId = ExerciseViewStore.useState(s => s.id)

  if (exId == -1) {
    return null
  }

  return (
    <>
      <ExerciseViewLayout />
      <style jsx global>{`
        body {
          background-color: #fef08a; /* placeholder color */
        }
      `}</style>
    </>
  )
}
