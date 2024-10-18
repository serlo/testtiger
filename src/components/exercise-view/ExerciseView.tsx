import { generateSeed } from '@/data/generate-seed'
import { ExerciseViewStore, setupExercise } from './state/exercise-view-store'
import { generateData } from '@/data/generate-data'
import { exercisesData } from '@/content/exercises'
import { ExerciseViewLayout } from './ExerciseViewLayout'
import { useEffect } from 'react'

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
