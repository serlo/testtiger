import clsx from 'clsx'
import { ExerciseViewFooter } from './ExerciseViewFooter'
import { ExerciseViewStore } from './state/exercise-view-store'

export function ChatOverlay() {
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)

  const multiScreenExercise = ExerciseViewStore.useState(
    s => s.multiScreenExercise,
  )

  if (multiScreenExercise) {
    return null
  }

  return (
    <>
      <div
        className={clsx(
          'fixed inset-0 z-[100] pointer-events-none',
          chatOverlay == null ? 'hidden' : 'bg-gray-600/10 ',
        )}
        onClick={e => {
          ExerciseViewStore.update(s => {
            s.chatOverlay = null
            console.log('closing chat overlay')
            if (s.pickAndSolveMode) {
              s.pickAndSolveShowChat = false
            }
          })
        }}
      ></div>
      <div className="fixed left-0 right-0 bottom-0 bg-white z-[101]">
        <ExerciseViewFooter />
      </div>
    </>
  )
}
